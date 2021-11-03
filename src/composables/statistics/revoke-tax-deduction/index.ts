import { reactive, ref } from 'vue'
import {
  revokeTaxDeductionList as list,
  revokeTaxDeductionListExport
} from '@/api/statistics/statistics'
import { useTable } from '../../../model/req/query/Table'
import { formatYYYY } from '../../../utils/time'
import { TaxDeductionVO } from '../../../model/vo/TaxDeductionVO'
import { useRevokeTaxDeductionColumns } from '../../../model/vo/TaxDeductionColumns'
import {
  QueryBadDebtRevokeReq,
  useQueryBadDebtRevokeReq
} from '../../../model/req/query/QueryBadDebtRevokeReq'

// 初始化表格的对象
const initTable = useTable<TaxDeductionVO, QueryBadDebtRevokeReq>(useQueryBadDebtRevokeReq(20))
// 父机构表格数据
export const table = reactive(initTable)

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 对话框新增表单ref
export const addFormRef = ref(null)
// 核销收回已税前扣除查询 表格展示列
export const columns = reactive(useRevokeTaxDeductionColumns())
// 对话框展示
export const dialogVisible = ref(false)
//导出加载
export const exportLoading = ref(false)

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
  if (table.listQuery.revokeDate) {
    table.listQuery.revokeDate = formatYYYY(table.listQuery.revokeDate)
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

//导出
export function exportList() {
  exportLoading.value = true
  revokeTaxDeductionListExport(table.listQuery).then((response) => {
    window.open(response.data)
    exportLoading.value = false
  })
}
