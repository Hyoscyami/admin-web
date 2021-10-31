import { reactive, ref } from 'vue'
import { useTable } from '@/model/req/query/Table'
import { format } from '@/utils/time'
import { CommonEnum } from '@/enums/CommonEnum'
import { errorMsg, successMsg } from '@/utils/common'
import { ApiResponse } from '@/model/resp/base/ApiResponse'
import { LawsRegulationsVO } from '../../model/vo/LawsRegulationsVO'
import {
  QueryLawsRegulationsReq,
  useQueryLawsRegulationsReq
} from '../../model/req/query/QueryLawsRegulationsReq'
import { StatusEnum } from '../../enums/StatusEnum'
import { useUpdateLawsRegulationsReq } from '../../model/req/update/UpdateLawsRegulationsReq'
import { list, updateStatus as sendUpdateStatus } from '@/api/laws-regulations/laws-regulations'

// 初始化表格的对象
const initTable = useTable<LawsRegulationsVO, QueryLawsRegulationsReq>(
  useQueryLawsRegulationsReq(20)
)
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
  // 初始化表格
  searchFormSubmit()
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

// 日期转换
export function formatDate(_row: any, _column: any, cellValue: any): string {
  return format(cellValue)
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

// 状态转换
export function convertStatusToChinese(status: number): string {
  if (status === StatusEnum.LAWS_REGULATIONS_UNPUBLISHED) {
    return '未发布'
  } else if (status === StatusEnum.LAWS_REGULATIONS_PUBLISHED) {
    return '已发布'
  } else if (status === StatusEnum.LAWS_REGULATIONS_OFF_SHELF) {
    return '已下架'
  }
  return ''
}

//更新状态
export function updateStatus(row: any) {
  const req = useUpdateLawsRegulationsReq()
  req.id = row.id
  if (row.status === StatusEnum.LAWS_REGULATIONS_UNPUBLISHED) {
    req.status = StatusEnum.LAWS_REGULATIONS_PUBLISHED
  } else if (row.status === StatusEnum.LAWS_REGULATIONS_PUBLISHED) {
    req.status = StatusEnum.LAWS_REGULATIONS_OFF_SHELF
  } else if (row.status === StatusEnum.LAWS_REGULATIONS_OFF_SHELF) {
    req.status = StatusEnum.LAWS_REGULATIONS_PUBLISHED
  }
  sendUpdateStatus(req).then(() => {
    successMsg('操作成功')
    //刷新列表
    getList()
  })
}
