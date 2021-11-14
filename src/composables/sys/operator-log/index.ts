import { reactive, ref } from 'vue'
import { list } from '@/api/sys/operator-log'
import { SelectGroup, useTable } from '@/model/req/query/Table'
import { format } from '@/utils/time'
import { listChildrenByCode } from '@/api/sys/dict'
import { DictEnum } from '@/enums/DictEnum'
import { DictVO } from '@/model/vo/DictVO'
import { OperatorLogVO } from '@/model/vo/OperatorLogVO'
import { QueryOperatorLogReq, useQueryOperatorLogReq } from '@/model/req/query/QueryOperatorLogReq'

// 初始化表格的对象
const initTable = useTable<OperatorLogVO, QueryOperatorLogReq>(useQueryOperatorLogReq(20))
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
  // listTypes()
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
  return format(cellValue)
}

//操作类型
export function convertTypeToChinese(row: any): string {
  if (row.type === 1) {
    return '新增'
  }
  if (row.type === 2) {
    return '删除'
  }
  if (row.type === 3) {
    return '修改'
  }
  if (row.type === 4) {
    return '查询'
  }
}
