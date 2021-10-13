import {reactive, ref} from 'vue'
import {list} from '@/api/write-off-recover/make-up'
import {useTable} from '../../../model/req/query/Table'
import {formatYYYY} from '../../../utils/time'
import {QueryBadDebtReq, useQueryBadDebtReq} from "../../../model/req/query/QueryBadDebtReq";
import {TaxDeductionVO} from "../../../model/vo/TaxDeductionVO";
import {useTaxDeductionColumns} from "../../../model/vo/TaxDeductionColumns";

// 初始化表格的对象
const initTable = useTable<TaxDeductionVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
// 父机构表格数据
export const table = reactive(initTable)

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 对话框新增表单ref
export const addFormRef = ref(null)
// 表格展示列
export const columns = reactive(useTaxDeductionColumns())

// 初始化
export function init() {
    // 初始化表格
    searchFormSubmit()
}

// 搜索机构表单查询
export function searchFormSubmit() {
    table.listQuery.page = 1
    if (table.listQuery.writeOffYear) {
        table.listQuery.writeOffYear = formatYYYY(table.listQuery.writeOffYear)
    }
    getList()
}

// 获取父机构列表数据
export function getList() {
    table.listLoading = true
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

// 日期转换
export function formatYear(_row: any, _column: any, cellValue: any): string {
    if (cellValue) {
        return formatYYYY(cellValue)
    }
    return ''
}

// 日期转换
export function formatYYYYMMDD(_row: any, _column: any, cellValue: any): string {
    if (cellValue) {
        return formatYYYY(cellValue)
    }
    return ''
}
