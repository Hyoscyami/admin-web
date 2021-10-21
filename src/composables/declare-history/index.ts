import { reactive, ref } from 'vue'
import { list } from '@/api/declare-history/declare-history'
import { useTable } from '@/model/req/query/Table'
import { formatYYYY } from '@/utils/time'
import { DeclareHistoryVO } from '../../model/vo/DeclareHistoryVO'
import {
  QueryDeclareHistoryReq,
  useQueryDeclareHistoryReq
} from '../../model/req/query/QueryDeclareHistoryReq'

// 初始化表格的对象
const initTable = useTable<DeclareHistoryVO, QueryDeclareHistoryReq>(useQueryDeclareHistoryReq(20))
// 父机构表格数据
export const table = reactive(initTable)

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)

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
  if (table.listQuery.declareYear) {
    table.listQuery.declareYear = formatYYYY(table.listQuery.declareYear)
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
export function formatDate(_row: any, _column: any, cellValue: any): string {
  return formatYYYY(cellValue)
}
