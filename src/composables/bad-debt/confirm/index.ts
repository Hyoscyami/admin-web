import { reactive, ref } from 'vue'
import { DictEnum } from '../../../enums/DictEnum'
import { del, list } from '@/api/bad-debt/confirm'
import { listChildrenByCode } from '@/api/sys/dict'
import { QueryBadDebtReq, useQueryBadDebtReq } from '../../../model/req/query/QueryBadDebtReq'
import { DictVO } from '../../../model/vo/DictVO'
import { BadDebtWriteOffVO } from '../../../model/vo/BadDebtWriteOffVO'
import { SelectGroup, useTable } from '../../../model/req/query/Table'
import { formatYYYYMMDD } from '../../../utils/time'
import { CommonEnum } from '../../../enums/CommonEnum'
import { errorMsg, successMsg } from '../../../utils/common'
import { ApiResponse } from '../../../model/resp/base/ApiResponse'
import { StatusEnum } from '../../../enums/StatusEnum'

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
  table.listQuery.status = [StatusEnum.IMPORTED]
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
  table.listQuery = useQueryBadDebtReq(100)
  if (table.listQuery.status) {
    table.listQuery.status.push(value)
  }
  // 刷新表格数据
  getList()
}

// 状态转换
export function convertStatusToChinese(row: any): string {
  if (row.status === StatusEnum.IMPORTED) {
    return '待呆账核销'
  } else if (row.status === StatusEnum.WRITTEN_OFF) {
    return '已呆账核销'
  }
  return '-'
}

// 日期转换
export function formatDate(_row: any, _column: any, cellValue: any): string {
  return formatYYYYMMDD(cellValue)
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
 * 检验借款金额
 * @param _rule
 * @param value
 * @param callback
 */
export function validateLoanAmount(_rule: any, value: number, callback: any) {
  if (!value) {
    callback(new Error('借款金额必填'))
  }
  if (value < 0) {
    callback(new Error('借款金额不能为负数'))
  }
  callback()
}

/**
 * 检验还款金额
 * @param _rule
 * @param value
 * @param callback
 */
export function validateRepayAmount(_rule: any, value: number, callback: any) {
  if (!value) {
    callback(new Error('还款金额必填'))
  }
  if (value < 0) {
    callback(new Error('还款金额不能为负数'))
  }
  callback()
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
export function handleUploadSuccess(response: ApiResponse<string>, file: any, fileList: any) {
  if (response.code !== CommonEnum.SUCCESS_CODE) {
    errorMsg(response.msg)
  }
  console.log('file,fileList', file, fileList)
}
