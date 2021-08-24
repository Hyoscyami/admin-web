import { nextTick, reactive, ref } from 'vue'
import { dictConvert, isBlank, isNotEmptyCollection, successMsg, warningMsg } from '@/utils/common'
import { DictEnum } from '../../../enums/DictEnum'
import {
  add,
  del,
  getMaxSort,
  list,
  listChildrenByCode,
  update
} from '@/api/bad-debt/import-result'
import { CommonEnum } from '@/enums/CommonEnum'
import { toRaw } from '@vue/reactivity'
import {
  QueryImportResultReq,
  useQueryImportResultReq
} from '../../../model/req/query/QueryImportResultReq'
import { DictVO } from '../../../model/vo/DictVO'
import { ImportResultVO } from '../../../model/vo/ImportResultVO'
import { SelectGroup, useTable } from '../../../model/req/query/Table'
import { useAddOrgReq } from '../../../model/req/add/AddOrgReq'

// 初始化表格的对象
const initTable = useTable<ImportResultVO, QueryImportResultReq>(useQueryImportResultReq(20))
// 父机构表格数据
export const table = reactive(initTable)

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
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
  searchFormRef.value.resetFields()
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
  table.listQuery = useQueryOrgReq(100)
  if (table.listQuery.status) {
    table.listQuery.status.push(value)
  }
  // 刷新表格数据
  getList()
}
// 组织类型转换
export function convertTypeToChinese(row: any): string {
  if (row.type === 1) {
    return '实体组织'
  } else if (row.type === 2) {
    return '部门'
  }
  return '-'
}
