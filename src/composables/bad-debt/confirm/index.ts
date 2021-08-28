import { reactive, ref } from 'vue'
import { DictEnum } from '../../../enums/DictEnum'
import { groupByAccountingDocumentNo, list } from '@/api/bad-debt/confirm'
import { listChildrenByCode } from '@/api/sys/dict'
import { QueryBadDebtReq, useQueryBadDebtReq } from '../../../model/req/query/QueryBadDebtReq'
import { DictVO } from '../../../model/vo/DictVO'
import { BadDebtWriteOffVO } from '../../../model/vo/BadDebtWriteOffVO'
import { SelectGroup, useTable } from '../../../model/req/query/Table'
import { formatYYYYMMDD } from '../../../utils/time'

// 初始化表格的对象
const initTable = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
// 父机构表格数据
export const table = reactive(initTable)
//当前tab页
export const currentTab = ref('first')
// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)

// 待导入会计凭证
const initSecondTable = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
// 父机构表格数据
export const secondTable = reactive(initSecondTable)
//当前tab页
// 表格ref
export const secondTableRef = ref(null)
// 搜索表格的搜索表单
export const secondSearchFormRef = ref(null)

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

// 搜索机构表单查询
export function searchSecondFormSubmit() {
  secondTable.listQuery.page = 1
  getSecondList()
}

// 获取父机构列表数据
export function getSecondList() {
  secondTable.listLoading = true
  groupByAccountingDocumentNo(secondTable.listQuery).then((response) => {
    secondTable.tableData = response.data.records
    secondTable.total = response.data.total
    secondTable.listLoading = false
  })
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

// 状态转换
export function convertStatusToChinese(row: any): string {
  if (row.status === 1) {
    return '导入中'
  } else if (row.status === 2) {
    return '导入完成'
  }
  return '-'
}

// 日期转换
export function formatDate(row: any): string {
  return formatYYYYMMDD(row.createTime)
}

/**
 * 点击tab页切换
 * @param tab
 * @param _event
 */
export function handleTabClick(tab: any, _event: any) {
  if (tab.index === '0') {
    //待核销确认
    searchFormSubmit()
  } else if (tab.index === '1') {
    //待导入会计凭证
    searchSecondFormSubmit()
  }
}
