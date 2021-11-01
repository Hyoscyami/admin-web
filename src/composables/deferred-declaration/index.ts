import { reactive, ref } from 'vue'
import { DictEnum } from '@/enums/DictEnum'
import { list } from '@/api/deferred-declaration/deferred-declaration'
import { listChildrenByCode } from '@/api/sys/dict'
import { QueryBadDebtReq, useQueryBadDebtReq } from '@/model/req/query/QueryBadDebtReq'
import { DictVO } from '@/model/vo/DictVO'
import { BadDebtWriteOffVO } from '@/model/vo/BadDebtWriteOffVO'
import { SelectGroup, useTable } from '@/model/req/query/Table'
import { formatYYYYMMDD } from '@/utils/time'
import { CommonEnum } from '@/enums/CommonEnum'
import { errorMsg } from '@/utils/common'
import { ApiResponse } from '@/model/resp/base/ApiResponse'
import { StatusEnum } from '@/enums/StatusEnum'
import { TypeEnum } from '../../enums/TypeEnum'
import { taxDeductionListExport } from '../../api/statistics/statistics'

// 初始化表格的对象
const initTable = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
// 父机构表格数据
export const table = reactive(initTable)
//认定条件
export const confirmConditions = reactive([])
//资产类型
export const assetTypes = reactive([])
// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 对话框新增表单ref
export const addFormRef = ref(null)
//导出加载
export const exportLoading = ref(false)

// 初始化
export function init() {
  // 详情页面初始化
  detailInit()
  // 初始化表格
  searchFormSubmit()
}

// 详情页面初始化
export function detailInit() {
  // 获取认定条件
  listConfirmConditions()
  // 获取资产类型
  listAssertTypes()
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
      // @ts-ignore
      confirmConditions.push(status)
    })
  })
}

// 获取资产类型
export function listAssertTypes() {
  listChildrenByCode(DictEnum.ASSERT_TYPE).then((response) => {
    assetTypes.length = 0
    response.data.forEach((item: DictVO) => {
      const type: SelectGroup = {
        id: item.id,
        text: item.name,
        value: Number(item.id)
      }
      // @ts-ignore
      assetTypes.push(type)
    })
  })
}

// 获取类型下拉框
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
  table.listQuery.status = [
    StatusEnum.WAITING_OVERDUE_ONE_YEAR,
    StatusEnum.WAITING_BANKRUPTCY_THREE_YEARS,
    StatusEnum.WAITING_CLOSE_THREE_YEARS,
    StatusEnum.WAITING_REVOKE_THREE_YEARS,
    StatusEnum.WAITING_STOP_OPERATION_THREE_YEARS,
    StatusEnum.WAITING_DEATH_THREE_YEARS,
    StatusEnum.WAITING_INCAPACITATED_THREE_YEARS,
    StatusEnum.WAITING_MISSING_THREE_YEARS,
    StatusEnum.WAITING_INVESTIGATION_TWO_YEARS,
    StatusEnum.WAITING_EVIDENCE_YEARS,
    StatusEnum.WAITING_LAW_YEARS
  ]
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

// 类型转换
export function convertTypeToChinese(row: any): string {
  if (row.type === TypeEnum.FILE_ACCOUNT_DOCUMENT) {
    return '会计凭证'
  } else if (row.type === TypeEnum.FILE_CONFIRM_EVIDENCE) {
    return '税收确认证据'
  } else if (row.type === TypeEnum.FILE_BAD_DEBT_APPROVE) {
    return '呆账核销申报审批表'
  } else if (row.type === TypeEnum.FILE_BAD_DEBT_APPLY) {
    return '呆账核销申请报告'
  } else if (row.type === TypeEnum.FILE_LOAN_CONTRACT) {
    return '借款合同或协议'
  } else if (row.type === TypeEnum.FILE_LOAN_CERTIFICATE) {
    return '借款或垫款凭证'
  } else if (row.type === TypeEnum.FILE_LOAN_ACCOUNT_DOCUMENT) {
    return '放款会计凭证'
  } else if (row.type === TypeEnum.FILE_REVOKE_ACCOUNT_DOCUMENT) {
    return '核销收回会计凭证'
  } else if (row.type === TypeEnum.FILE_RISK_FIVE_LEVEL) {
    return '风险五级'
  } else if (row.type === TypeEnum.FILE_LOAN_BALANCE_QUERY) {
    return '贷款余额查询'
  } else if (row.type === TypeEnum.FILE_OTHER_APPLICATION_MATERIALS) {
    return '其他申报材料'
  }
  return ''
}

// 日期转换
export function formatDate(_row: any, _column: any, cellValue: any): string {
  return formatYYYYMMDD(cellValue)
}

/**
 * 文件上传超过数量限制处理
 */
export function handleExceed(files: any, fileList: any) {
  console.log('files,fileList', files, fileList)
  errorMsg('上传文件超过限制')
}

/**
 * 文件上传成功后处理
 * @param response
 */
export function handleUploadSuccess(response: ApiResponse<string>, _file: any, _fileList: any) {
  if (response.code !== CommonEnum.SUCCESS_CODE) {
    errorMsg(response.msg)
  }
}

/**
 * 文件预览
 */
export function handlePreview(file: any) {
  window.open(
    'https://view.officeapps.live.com/op/view.aspx?src=' + window.location.host + file.url
  )
}

//导出
export function exportList() {
  exportLoading.value = true
  taxDeductionListExport(table.listQuery).then((response) => {
    window.open(response.data)
    exportLoading.value = false
  })
}
