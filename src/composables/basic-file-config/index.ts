import { reactive, ref } from 'vue'
import { DictEnum } from '@/enums/DictEnum'
import { list } from '@/api/basic-file-config/file-config'
import { DictVO } from '@/model/vo/DictVO'
import { SelectGroup, useTable } from '@/model/req/query/Table'
import { BasicFileConfigEvidenceVO } from '../../model/vo/BasicFileConfigEvidenceVO'
import {
  QueryBasicFileConfigReq,
  userQueryBasicFileConfigReq
} from '../../model/req/query/QueryBasicFileConfigReq'
import { listChildrenByCode } from '../../api/sys/dict'

// 初始化表格的对象
const initTable = useTable<BasicFileConfigEvidenceVO, QueryBasicFileConfigReq>(
  userQueryBasicFileConfigReq(20)
)
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
