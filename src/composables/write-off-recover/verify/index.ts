import { reactive, ref } from 'vue'
import { DictEnum } from '../../../enums/DictEnum'
import { del, list } from '@/api/write-off-recover/make-up'
import { listChildrenByCode } from '@/api/sys/dict'
import {
  QueryBadDebtRevokeReq,
  useQueryBadDebtRevokeReq
} from '../../../model/req/query/QueryBadDebtRevokeReq'
import { DictVO } from '../../../model/vo/DictVO'
import { BadDebtRevokeVO } from '../../../model/vo/BadDebtRevokeVO'
import { SelectGroup, useTable } from '../../../model/req/query/Table'
import { formatYYYY, formatYYYYMMDD } from '../../../utils/time'
import { CommonEnum } from '../../../enums/CommonEnum'
import { errorMsg, successMsg } from '../../../utils/common'
import { ApiResponse } from '../../../model/resp/base/ApiResponse'
import { StatusEnum } from '../../../enums/StatusEnum'

// 初始化表格的对象
const initTable = useTable<BadDebtRevokeVO, QueryBadDebtRevokeReq>(useQueryBadDebtRevokeReq(20))
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
  if (table.listQuery.revokeDate) {
    table.listQuery.revokeDate = formatYYYY(table.listQuery.revokeDate)
  }
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
  table.listQuery = useQueryBadDebtRevokeReq(100)
  if (table.listQuery.status) {
    table.listQuery.status.push(value)
  }
  // 刷新表格数据
  getList()
}

// 状态转换
// 状态转换
export function convertStatusToChinese(status: number): string {
  if (status === StatusEnum.IMPORTED) {
    return '待呆账核销'
  } else if (status === StatusEnum.WRITTEN_OFF) {
    return '已呆账核销'
  } else if (status === StatusEnum.PRE_TAX_DEDUCTION) {
    return '拟申报税前扣除'
  } else if (status === StatusEnum.WAITING_OVERDUE_ONE_YEAR) {
    return '等待逾期时间满1年'
  } else if (status === StatusEnum.WAITING_BANKRUPTCY_THREE_YEARS) {
    return '等待宣告破产满3年'
  } else if (status === StatusEnum.WAITING_CLOSE_THREE_YEARS) {
    return '等待关闭、解散或撤销满3年'
  } else if (status === StatusEnum.WAITING_REVOKE_THREE_YEARS) {
    return '等待停止经营活动或下落不明满3年'
  } else if (status === StatusEnum.WAITING_STOP_OPERATION_THREE_YEARS) {
    return '等待停止经营活动或下落不明满3年'
  } else if (status === StatusEnum.WAITING_DEATH_THREE_YEARS) {
    return '等待自然人死亡满3年'
  } else if (status === StatusEnum.WAITING_INCAPACITATED_THREE_YEARS) {
    return '等待丧失能力满3年'
  } else if (status === StatusEnum.WAITING_MISSING_THREE_YEARS) {
    return '等待自然人失踪满3年'
  } else if (status === StatusEnum.WAITING_INVESTIGATION_TWO_YEARS) {
    return '等待侦查时间满2年'
  } else if (status === StatusEnum.WAITING_EVIDENCE_YEARS) {
    return '等待补充证据'
  } else if (status === StatusEnum.WAITING_LAW_YEARS) {
    return '等待诉诸法律'
  } else if (status === StatusEnum.DECLARE_PRE_TAX_DEDUCTION) {
    return '已申报税前扣除'
  }
  return '-'
}

// 日期转换
export function formatDate(_row: any, _column: any, cellValue: any): string {
  if (cellValue) {
    return formatYYYYMMDD(cellValue)
  }
  return ''
}

// 删除
export function delRow(row: any) {
  del(row.id).then(() => {
    successMsg('操作成功')
    // 刷新表格数据
    searchFormSubmit()
  })
}

/**
 * 文件上传成功后处理
 * @param response
 * @param _file
 * @param _fileList
 */
export function handleUploadSuccess(response: ApiResponse<string>, _file: any, _fileList: any) {
  if (response.code !== CommonEnum.SUCCESS_CODE) {
    errorMsg(response.msg)
  }
}

/**
 * 检验本金
 * @param _rule
 * @param value
 * @param callback
 */
export function validateCapital(_rule: any, value: number, callback: any) {
  if (!value) {
    callback(new Error('本金必填'))
  }
  if (value < 0) {
    callback(new Error('本金不能为负数'))
  }
  callback()
}

/**
 * 检验应收费用
 * @param _rule
 * @param value
 * @param callback
 */
export function validateCharges(_rule: any, value: number, callback: any) {
  if (!value) {
    callback(new Error('应收费用必填'))
  }
  if (value < 0) {
    callback(new Error('应收费用不能为负数'))
  }
  callback()
}

/**
 * 检验表内利息
 * @param _rule
 * @param value
 * @param callback
 */
export function validateOnBalanceSheetInterest(_rule: any, value: number, callback: any) {
  if (!value) {
    callback(new Error('表内利息必填'))
  }
  if (value < 0) {
    callback(new Error('表内利息不能为负数'))
  }
  callback()
}

/**
 * 检验表外利息
 * @param _rule
 * @param value
 * @param callback
 */
export function validateOffBalanceSheetInterest(_rule: any, value: number, callback: any) {
  if (!value) {
    callback(new Error('表外利息必填'))
  }
  if (value < 0) {
    callback(new Error('表外利息不能为负数'))
  }
  callback()
}

/**
 * 文件上传超过数量限制处理
 */
export function handleExceed(files: any, fileList: any) {
  console.log('files,fileList', files, fileList)
  errorMsg('上传文件超过限制')
}
