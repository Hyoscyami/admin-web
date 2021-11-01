import { reactive, ref } from 'vue'
import {
  listPreTaxDeductionYears,
  totalWriteOffRevokeCount,
  writeOffRevokeCount as list
} from '@/api/statistics/statistics'
import { SelectGroup, useTable } from '@/model/req/query/Table'
import { formatYYYY } from '@/utils/time'
import { listChildrenByCode } from '@/api/sys/dict'
import { DictEnum } from '@/enums/DictEnum'
import { DictVO } from '@/model/vo/DictVO'
import { StatisticVO } from '../../../model/vo/StatisticVO'
import { QueryStatisticReq, useQueryStatisticReq } from '../../../model/req/query/QueryStatisticReq'
import { entityList } from '../../../api/sys/org'
import { useQueryOrgReq } from '../../../model/req/query/QueryOrgReq'

// 初始化表格的对象
const initTable = useTable<StatisticVO, QueryStatisticReq>(useQueryStatisticReq(20))
//默认为按机构查询
initTable.listQuery.type = 2
// 父机构表格数据
export const table = reactive(initTable)

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 级联选择
// 对话框新增表单ref
export const addFormRef = ref(null)
//表格合计
export const tableTotal = ref<Array<string | number>>(['合计'])

// 初始化
export function init() {
  // 初始化资产类型
  // listTypes()
  //初始化年份
  listYears()
  //初始化组织
  listOrgs()
  // 初始化表格
  searchFormSubmit()
}

// 搜索机构表单查询
export function searchFormSubmit() {
  table.listQuery.page = 1
  getList()
}

// 获取资产类型下拉框
export function listTypes() {
  listChildrenByCode(DictEnum.ASSERT_TYPE).then((response) => {
    if (table.typesSelect) {
      table.typesSelect.length = 0
    }
    response.data.forEach((item: DictVO) => {
      const type: SelectGroup = {
        id: item.id,
        text: item.name,
        value: item.id
      }
      if (table.typesSelect) {
        table.typesSelect.push(type)
      }
    })
  })
}

// 获取组织下拉框
export function listOrgs() {
  entityList(useQueryOrgReq(20)).then((response) => {
    if (table.orgsSelect) {
      table.orgsSelect.length = 0
    }
    response.data.forEach((item: DictVO) => {
      const type: SelectGroup = {
        id: item.id,
        text: item.name,
        value: item.id
      }
      if (table.orgsSelect) {
        table.orgsSelect.push(type)
      }
    })
  })
}

// 获取可选择年份下拉框
export function listYears() {
  listPreTaxDeductionYears().then((response) => {
    if (table.typesSelect) {
      table.typesSelect.length = 0
    }
    response.data.forEach((item: number) => {
      const type: SelectGroup = {
        id: item,
        text: item.toString(),
        value: item
      }
      if (table.yearsSelect) {
        table.yearsSelect.push(type)
      }
    })
  })
}

// 获取父机构列表数据
export function getList() {
  table.listLoading = true
  if (table.listQuery.orgId) {
    table.listQuery.orgIds = [table.listQuery.orgId]
  }
  list(table.listQuery).then((response) => {
    table.tableData = response.data.records
    table.total = response.data.total
    table.listLoading = false
  })
  //刷新表格合计总数
  getSummaries()
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

// 日期转换
export function formatDate(_row: any, _column: any, cellValue: any): string {
  return formatYYYY(cellValue)
}

// 比例显示
export function formatProportion(_row: any, _column: any, cellValue: any): string {
  return cellValue + '%'
}

//表格合计行
function getSummaries() {
  totalWriteOffRevokeCount(table.listQuery).then((response) => {
    tableTotal.value.push(response.data.writtenOffCount)
    tableTotal.value.push(response.data.writtenOffAmount)
    tableTotal.value.push(response.data.revokeCount)
    tableTotal.value.push(response.data.revokeAmount)
    tableTotal.value.push(response.data.revokedProportion + '%')
    tableTotal.value.push(response.data.unRevokeCount)
    tableTotal.value.push(response.data.unRevokeAmount)
  })
}

//表格合计行
export function getTableTotal() {
  return tableTotal.value
}
