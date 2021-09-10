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
//认定条件
export const confirmConditions = reactive([])
//资产类型
export const assertTypes = reactive([])
//关联事项类型
export const relationTypes = reactive([])
//税收确认证据
export const evidenceList = reactive([])

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)

// 初始化
export function init() {
  // 初始化认定条件
  listConfirmConditions()
  // 初始化资产类型
  listAssertTypes()
  // 初始化表格
  searchFormSubmit()
}

//新增初始化
export function initAdd() {
  // 初始化认定条件
  listConfirmConditions()
  // 初始化资产类型
  listAssertTypes()
  //关联事项类型
  listRelationTypes()
  // 税收确认证据
  listEvidences()
}

// 获取认定条件
export function listConfirmConditions() {
  listChildrenByCode(DictEnum.CONFIRM_CONDITION).then((response) => {
    confirmConditions.length = 0
    response.data.forEach((item: DictVO) => {
      const status: SelectGroup = {
        id: item.id,
        text: item.name,
        value: Number(item.id)
      }
      confirmConditions.push(status)
    })
  })
}

// 获取资产类型
export function listAssertTypes() {
  listChildrenByCode(DictEnum.ASSERT_TYPE).then((response) => {
    assertTypes.length = 0
    response.data.forEach((item: DictVO) => {
      const type: SelectGroup = {
        id: item.id,
        text: item.name,
        value: Number(item.id)
      }
      if (table.typesSelect) {
        assertTypes.push(type)
      }
    })
  })
}

// 获取关联事项类型
export function listRelationTypes() {
  listChildrenByCode(DictEnum.RELATION_TYPE).then((response) => {
    relationTypes.length = 0
    response.data.forEach((item: DictVO) => {
      const type: SelectGroup = {
        id: item.id,
        text: item.name,
        value: Number(item.id)
      }
      if (table.typesSelect) {
        relationTypes.push(type)
      }
    })
  })
}

// 获取税收确认证据
export function listEvidences() {
  listChildrenByCode(DictEnum.EVIDENCE).then((response) => {
    evidenceList.length = 0
    response.data.forEach((item: DictVO) => {
      const type: SelectGroup = {
        id: item.id,
        text: item.name,
        value: Number(item.id)
      }
      if (table.typesSelect) {
        evidenceList.push(type)
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
