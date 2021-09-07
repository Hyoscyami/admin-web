import { reactive, ref } from 'vue'
import { dictConvert, successMsg } from '@/utils/common'
import { DictEnum } from '../../../enums/DictEnum'
import { add, del, getMaxSort, list, update } from '@/api/sys/config'
import { listChildrenByCode } from '@/api/sys/dict'
import { CommonEnum } from '@/enums/CommonEnum'
import { useTable } from '@/model/req/query/Table'
import { useDialog } from '../../../model/vo/Dialog'
import { useUpdateDictReq } from '../../../model/req/update/UpdateDictReq'
import { QueryConfigReq, useQueryConfigReq } from '../../../model/req/query/QueryConfigReq'
import { ConfigVO, useConfigVO } from '../../../model/vo/ConfigVO'
import {
  AddConfigReq,
  ConfigRule,
  useAddConfigReq,
  useConfigRule
} from '../../../model/req/add/AddConfigReq'
import { UpdateConfigReq } from '../../../model/req/update/UpdateConfigReq'

// 初始化表格的对象
const initTable = useTable<ConfigVO, QueryConfigReq>(useQueryConfigReq(20))

// 父数据字典表格数据
export const table = reactive(initTable)

// 对话框初始化
const initDialog = useDialog<ConfigVO, ConfigRule, AddConfigReq, UpdateConfigReq>(
  useConfigVO(),
  useConfigRule(),
  useAddConfigReq()
)
//对话框
export const dialog = reactive(initDialog)
// 对话框新增数据字典表单ref
export const dialogFormRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)

// 初始化
export function init() {
  // 初始化状态
  listStatus()
  // 初始化表格
  searchFormSubmit()
}

// 状态转换
export function viewDetailDataStatus() {
  return dictConvert(DictEnum.DICT_STATUS, String(dialog.viewDetailData.status))
}

// 获取状态下拉框
export function listStatus() {
  listChildrenByCode(DictEnum.DICT_STATUS).then((response) => {
    table.statusSelect = response.data
  })
}

// 搜索数据字典表单查询
export function searchFormSubmit() {
  table.listQuery.page = 1
  getList()
}

// 打开新增数据字典对话框
export function openAddDialog() {
  dialog.visible = true
  dialog.dialogStatus = CommonEnum.CREATE
  dialog.form.status = CommonEnum.STATUS_ENABLE
}

// 查看详情
export async function viewDetail(row: any) {
  dialog.viewDialogVisible = true
  Object.assign(dialog.viewDetailData, row)
  dialog.viewDetailData.statusStr = await dictConvert(DictEnum.DICT_STATUS, String(row.status))
}

// 获取当前最大排序值
export function getMaxSortValue() {
  getMaxSort().then((response) => {
    dialog.form.sort = response.data + 1
  })
}

// 新增数据字典表单提交
export function addFormSubmit() {
  // @ts-ignore
  dialogFormRef.value.validate((valid) => {
    if (valid) {
      if (dialog.dialogStatus === CommonEnum.CREATE) {
        add(dialog.form).then(() => {
          // 关闭弹框
          cancelDialog()
          // 刷新表格
          getList()
        })
      } else if (dialog.dialogStatus === CommonEnum.UPDATE) {
        update(dialog.form).then(() => {
          // 关闭弹框
          cancelDialog()
          // 刷新表格
          getList()
        })
      }
    } else {
      return false
    }
  })
}

// 新增数据字典表单取消
export function cancelDialog() {
  dialog.visible = false
  // @ts-ignore
  dialogFormRef.value.resetFields()
}

// 查看详情字典弹框取消
export function cancelView() {
  dialog.viewDialogVisible = false
}

// 获取父数据字典列表数据
export function getList() {
  table.listLoading = true
  list(table.listQuery).then((response) => {
    table.tableData = response.data.records
    table.total = response.data.total
    table.listLoading = false
  })
}

// 修改数据字典详情
export function updateDetail(row: any) {
  dialog.dialogStatus = CommonEnum.UPDATE
  dialog.visible = true
  Object.assign(dialog.form, row)
}

// 删除数据字典
export function delRow(row: any) {
  del(row.id).then(() => {
    successMsg('操作成功')
    // 刷新表格数据
    searchFormSubmit()
  })
}

// 更新状态
export function updateStatus(data: any) {
  if (!data.id) {
    return
  }
  const param = useUpdateDictReq()
  Object.assign(param, data)
  if (param.status === 1) {
    param.status = 0
  } else {
    param.status = 1
  }

  update(param).then(() => {
    successMsg('操作成功')
    data.status = param.status
  })
}

// 表格的搜索表单重置
export function resetSearchForm() {
  // @ts-ignore
  searchFormRef.value.resetFields()
}
