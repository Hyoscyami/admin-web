import { reactive, ref } from 'vue'
import { DictEnum } from '../../../enums/DictEnum'
import { add, del, groupByAccountingDocumentNo, list, update } from '@/api/bad-debt/confirm'
import { listChildrenByCode } from '@/api/sys/dict'
import { QueryBadDebtReq, useQueryBadDebtReq } from '../../../model/req/query/QueryBadDebtReq'
import { DictVO } from '../../../model/vo/DictVO'
import { BadDebtWriteOffVO, useBadDebtVO } from '../../../model/vo/BadDebtWriteOffVO'
import { SelectGroup, useTable } from '../../../model/req/query/Table'
import { formatYYYYMMDD } from '../../../utils/time'
import { useDialog } from '../../../model/vo/Dialog'
import { UpdateBadDebtReq } from '../../../model/req/update/UpdateBadDebtReq'
import {
  AddBadDebtReq,
  BadDebtRule,
  useAddBadDebtReq,
  useBadDebtRule
} from '../../../model/req/add/AddBadDebtReq'
import { CommonEnum } from '../../../enums/CommonEnum'
import { errorMsg, successMsg } from '../../../utils/common'
import { ApiResponse } from '../../../model/resp/base/ApiResponse'
import { StatusEnum } from '../../../enums/StatusEnum'

// 初始化表格的对象
const initTable = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
initTable.listQuery.status = [StatusEnum.IMPORTED]
// 父机构表格数据
export const table = reactive(initTable)
//当前tab页
export const currentTab = ref('first')
// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 对话框新增表单ref
export const addFormRef = ref(null)

// 对话框初始化
const initDialog = useDialog<BadDebtWriteOffVO, BadDebtRule, AddBadDebtReq, UpdateBadDebtReq>(
  useBadDebtVO(),
  useBadDebtRule(),
  useAddBadDebtReq()
)
// 对话框
export const dialog = reactive(initDialog)

// 待导入会计凭证
const initSecondTable = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
initSecondTable.listQuery.status = [StatusEnum.IMPORTED]
// 父机构表格数据
export const secondTable = reactive(initSecondTable)
//当前tab页
// 表格ref
export const secondTableRef = ref(null)
// 搜索表格的搜索表单
export const secondSearchFormRef = ref(null)

// 待导入会计凭证
const initThirdTable = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
initThirdTable.listQuery.status = [StatusEnum.IMPORTED]
// 父机构表格数据
export const thirdTable = reactive(initThirdTable)

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

// 获取导入会计凭证的核销数据列表
export function getThirdList() {
  thirdTable.listLoading = true
  list(thirdTable.listQuery).then((response) => {
    thirdTable.tableData = response.data.records
    thirdTable.total = response.data.total
    thirdTable.listLoading = false
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

// 打开新增对话框
export function openAddDialog() {
  dialog.form = useAddBadDebtReq()
  dialog.visible = true
  dialog.dialogStatus = CommonEnum.CREATE
}

// 编辑对话框
export function updateDetail(row: any) {
  dialog.dialogStatus = CommonEnum.UPDATE
  dialog.visible = true
  Object.assign(dialog.form, row)
}

// 删除
export function delRow(row: any) {
  del(row.id).then(() => {
    successMsg('操作成功')
    // 刷新表格数据
    searchFormSubmit()
  })
}

// 新增表单取消
export function cancelAddForm() {
  dialog.visible = false
  // @ts-ignore
  addFormRef.value.addFormRef.resetFields()
  if (dialog.viewDetailData.parentOrgIds) {
    dialog.viewDetailData.parentOrgIds.length = 0
  }
}

// 新增机构表单提交
export function addFormSubmit() {
  // @ts-ignore
  addFormRef.value.addFormRef.validate((valid) => {
    if (valid) {
      if (dialog.dialogStatus === CommonEnum.CREATE) {
        add(dialog.form).then((response: any) => {
          if (response.code !== CommonEnum.SUCCESS_CODE) {
            errorMsg(response.msg)
          } else {
            // 关闭弹框
            cancelAddForm()
            // 刷新表格
            getList()
          }
        })
      } else if (dialog.dialogStatus === CommonEnum.UPDATE) {
        update(dialog.form).then((response: any) => {
          if (response.code !== CommonEnum.SUCCESS_CODE) {
            errorMsg(response.msg)
          } else {
            // 关闭弹框
            cancelAddForm()
            // 刷新表格
            getList()
          }
        })
      }
    } else {
      return false
    }
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
