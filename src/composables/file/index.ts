import {reactive, ref} from 'vue'
import {docList as list} from '@/api/file/file'
import {QueryBadDebtReq, useQueryBadDebtReq} from '@/model/req/query/QueryBadDebtReq'
import {DocManageVO} from '@/model/vo/DocManageVO'
import {SelectGroup, useTable} from '@/model/req/query/Table'
import {formatYYYY} from '@/utils/time'
import {CommonEnum} from '@/enums/CommonEnum'
import {errorMsg} from '@/utils/common'
import {ApiResponse} from '@/model/resp/base/ApiResponse'
import {StatusEnum} from '@/enums/StatusEnum'
import {listChildrenByCode} from "../../api/sys/dict";
import {DictEnum} from "../../enums/DictEnum";
import {DictVO} from "../../model/vo/DictVO";

// 初始化表格的对象
const initTable = useTable<DocManageVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
// 父机构表格数据
export const table = reactive(initTable)

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 对话框新增表单ref
export const addFormRef = ref(null)

// 初始化
export function init() {
    // 初始化类型
    listTypes()
    // 初始化表格
    searchFormSubmit()
}

// 搜索机构表单查询
export function searchFormSubmit() {
    table.listQuery.page = 1
    getList()
}

// 获取状态下拉框
export function listTypes() {
    listChildrenByCode(DictEnum.FILE_TYPES).then((response) => {
        if (table.typesSelect) {
            table.typesSelect.length = 0
        }
        response.data.forEach((item: DictVO) => {
            const type: SelectGroup = {
                id: item.id,
                text: item.name,
                value: Number(item.value)
            }
            if (table.typesSelect) {
                table.typesSelect.push(type)
            }
        })
    })
}

// 获取父机构列表数据
export function getList() {
    table.listLoading = true
    table.listQuery.status = [StatusEnum.IMPORTED]
    list(table.listQuery).then((response) => {
        table.tableData = response.data.records
        table.total = response.data.total
        table.listLoading = false
    })
}

// 表格的搜索表单重置
export function resetSearchForm() {
    // @ts-ignore
    searchFormRef.value.searchFormRef.resetFields()
}

// 根据类型刷新表格
export function filterTableType(data: any) {
    // 重置查询条件
    table.listQuery.page = 1
    if (data.status != undefined && data.status.length === 0) {
        // @ts-ignore
        table.listQuery.status.length = 0
    }
    if (data.type != undefined && data.type.length === 0) {
        // @ts-ignore
        table.listQuery.types.length = 0
    }
    console.log('data:', data)
    // @ts-ignore
    table.listQuery.status = table.listQuery.status.concat(data.status).filter((item) => item != null)
    // @ts-ignore
    table.listQuery.types = table.listQuery.types.concat(data.type).filter((item) => item != null)

    // 刷新表格数据
    getList()
}

// 根据状态刷新表格
export function filterTableStatus(value: number) {
    // 重置查询条件
    table.listQuery = useQueryBadDebtReq(100)
    if (table.listQuery.status) {
        table.listQuery.status.push(value)
    }
    // 刷新表格数据
    getList()
}

// 日期转换
export function formatDate(_row: any, _column: any, cellValue: any): string {
    return formatYYYY(cellValue)
}


/**
 * 文件上传超过数量限制处理
 */
export function handleExceed(files: any, fileList: any) {
    console.log('files,fileList', files, fileList)
    errorMsg('上传文件超过限制')
}

/**
 * 文件上传成功后处理
 * @param response
 */
export function handleUploadSuccess(response: ApiResponse<string>, file: any, fileList: any) {
    if (response.code !== CommonEnum.SUCCESS_CODE) {
        errorMsg(response.msg)
    }
    console.log('file,fileList', file, fileList)
}
