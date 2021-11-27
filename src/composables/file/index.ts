import { reactive, ref } from 'vue'
import { DictEnum } from '@/enums/DictEnum'
import { list } from '@/api/file/file'
import { listChildrenByCode } from '@/api/sys/dict'
import { QueryBadDebtReq, useQueryBadDebtReq } from '@/model/req/query/QueryBadDebtReq'
import { DictVO } from '@/model/vo/DictVO'
import { BadDebtWriteOffVO } from '@/model/vo/BadDebtWriteOffVO'
import { SelectGroup, useTable } from '@/model/req/query/Table'
import { formatYYYY, formatYYYYMMDD } from '@/utils/time'
import { useUpdateBatchBadDebtReq } from '@/model/req/update/UpdateBatchBadDebtReq'
import { TypeEnum } from '@/enums/TypeEnum'
import { StatusEnum } from '../../enums/StatusEnum'

// 初始化表格的对象
const initTable = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
// 父机构表格数据
export const table = reactive(initTable)

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 对话框新增表单ref
export const addFormRef = ref(null)
// 对话框显示
export const dialogVisible = ref(false)
// 批量更新会计凭证号
export const updateBatchBadDebtForm = reactive(useUpdateBatchBadDebtReq())

// 初始化
export function init() {
  // 初始化状态
  listStatus()
  // 初始化类型
  listTypes()
  // 初始化表格
  searchFormSubmit()
}

// 获取状态下拉框
export function listStatus() {
  listChildrenByCode(DictEnum.DICT_STATUS).then((response) => {
    table.statusSelect.length = 0
    response.data.forEach((item: DictVO) => {
      const status: SelectGroup = {
        id: item.id,
        text: item.name,
        value: Number(item.value)
      }
      table.statusSelect.push(status)
    })
  })
}

// 获取状态下拉框
export function listTypes() {
  listChildrenByCode(DictEnum.ORG_TYPES).then((response) => {
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

// 搜索机构表单查询
export function searchFormSubmit() {
  table.listQuery.page = 1
  getList()
}

// 获取父机构列表数据
export function getList() {
  table.listLoading = true
  table.listQuery.types = [TypeEnum.SYS_ADD]
  if (table.listQuery.writeOffYear) {
    table.listQuery.writeOffYear = formatYYYY(table.listQuery.writeOffYear)
  }
  if (table.listQuery.fileCompleteStatus === 1 || table.listQuery.fileCompleteStatus === 0) {
    table.listQuery.status = [StatusEnum.PRE_TAX_DEDUCTION, StatusEnum.DECLARE_PRE_TAX_DEDUCTION]
  } else {
    table.listQuery.status = []
  }
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
  table.listQuery.orgId = undefined
  table.listQuery.declareYear = undefined
}

// 表格的搜索表单重置
export function resetSecondSearchForm() {
  // @ts-ignore
  secondSearchFormRef.value.searchFormRef.resetFields()
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
  return formatYYYYMMDD(cellValue)
}

export function convertFileCompleteStatus(row: any): string {
  if (row.status === StatusEnum.WAITING_DECLARE || row.status === StatusEnum.IMPORTED) {
    return ''
  }
  if (row.fileCompleteStatus === true) {
    return '已完善'
  }
  return '未完善'
}
