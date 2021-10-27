import {reactive, ref} from 'vue'
import {taxDeductionList as list} from '@/api/statistics/statistics'
import {useTable} from '../../../model/req/query/Table'
import {formatYYYY} from '../../../utils/time'
import {QueryBadDebtReq, useQueryBadDebtReq} from '../../../model/req/query/QueryBadDebtReq'
import {TaxDeductionVO} from '../../../model/vo/TaxDeductionVO'
import {useTaxDeductionColumns, useUnDeclareColumns} from '../../../model/vo/TaxDeductionColumns'

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
// 呆账核销已申报税前扣除查询 表格展示列
export const taxDeductionColumns = reactive(useTaxDeductionColumns())
// 呆账核销未申报税前扣除查询 表格展示列
export const unDeclareColumns = reactive(useUnDeclareColumns())
// 对话框展示
export const dialogVisible = ref(false)

// 初始化
export function init() {
    // 初始化表格
    searchFormSubmit()
}

// 搜索机构表单查询
export function searchFormSubmit() {
    table.listQuery.page = 1
    getList()
}

// 获取父机构列表数据
export function getList() {
    table.listLoading = true
    if (table.listQuery.writeOffYear) {
        table.listQuery.writeOffYear = formatYYYY(table.listQuery.writeOffYear)
    }
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

// 新增机构表单取消
export function cancelAddForm() {
    dialogVisible.value = false
}

// 打开对话框
export function openDialog() {
    dialogVisible.value = true
}
