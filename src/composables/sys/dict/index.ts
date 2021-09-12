import { nextTick, reactive, ref } from 'vue'
import { dictConvert, isBlank, isNotEmptyCollection, successMsg, warningMsg } from '@/utils/common'
import { DictEnum } from '../../../enums/DictEnum'
import { add, del, getMaxSort, list, listChildrenByCode, update } from '@/api/sys/dict'
import { CommonEnum } from '@/enums/CommonEnum'
import { toRaw } from '@vue/reactivity'
import { useTable } from '@/model/req/query/Table'
import { DictVO, useDictVO } from '@/model/vo/DictVO'
import { QueryDictReq, useQueryDictReq } from '@/model/req/query/QueryDictReq'
import { getTree } from '@/model/req/query/Tree'
import { useDialog } from '../../../model/vo/Dialog'
import { AddDictReq, DictRule, useAddDictReq, useDictRule } from '../../../model/req/add/AddDictReq'
import { UpdateDictReq, useUpdateDictReq } from '../../../model/req/update/UpdateDictReq'

// 初始化树的对象
const initTree = getTree<QueryDictReq, DictVO>(useQueryDictReq(100), useDictVO())

// 初始化表格的对象
const initTable = useTable<DictVO, QueryDictReq>(useQueryDictReq(20))

// 树相关
export const tree = reactive(initTree)
// 父数据字典表格数据
export const table = reactive(initTable)

// 对话框初始化
const initDialog = useDialog<DictVO, DictRule, AddDictReq, UpdateDictReq>(
  useDictVO(),
  useDictRule(),
  useAddDictReq()
)
//对话框
export const dialog = reactive(initDialog)
// 树ref
export const treeRef = ref(null)
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

// 搜索tree
export function filterTree(searchText: string) {
  // 重置树的搜索条件
  resetQuery()
  if (isBlank(searchText)) {
    tree.listQuery.maxDistance = 1
  }
  tree.listQuery.parentId = toRaw(tree).rootNode.id
  tree.listQuery.name = searchText
  list(tree.listQuery).then((response) => {
    tree.total = response.data.total
    if (treeRef.value) {
      // @ts-ignore
      treeRef.value.lazyTreeRef.updateKeyChildren(toRaw(tree).rootNode.id, response.data.records)
    }
  })
}

// 打开新增数据字典对话框
export function openAddDialog() {
  if (!tree.checkedNodeClick.id) {
    warningMsg('请先在左侧选择节点')
    return
  }
  dialog.visible = true
  dialog.dialogStatus = CommonEnum.CREATE
  getMaxSortValue(tree.checkedNodeClick.id)
  dialog.form.parentId = toRaw(tree).checkedNodeClick.id
  dialog.form.code = toRaw(tree).checkedNodeClick.code
  dialog.form.status = CommonEnum.STATUS_ENABLE
}

// 查看详情
export async function viewDetail(row: any) {
  dialog.viewDialogVisible = true
  Object.assign(dialog.viewDetailData, row)
  dialog.viewDetailData.statusStr = await dictConvert(DictEnum.DICT_STATUS, String(row.status))
}

// 获取当前最大排序值
export function getMaxSortValue(id: number) {
  getMaxSort(id).then((response) => {
    dialog.form.sort = response.data + 1
  })
}

// 新增数据字典表单提交
export function addFormSubmit() {
  // @ts-ignore
  dialogFormRef.value.validate((valid) => {
    if (valid) {
      if (dialog.dialogStatus === CommonEnum.CREATE) {
        add(dialog.form).then((response) => {
          // 关闭弹框
          cancelDialog()
          // 刷新表格
          getList()
          // 刷新树
          // @ts-ignore
          treeRef.value.lazyTreeRef.append(response.data, tree.checkedNodeClick)
          tree.checkedNodeClick.isLeaf = false
        })
      } else if (dialog.dialogStatus === CommonEnum.UPDATE) {
        update(dialog.form).then(() => {
          // 关闭弹框
          cancelDialog()
          // 刷新表格
          getList()
          // 刷新树
          filterTree('')
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
  table.listQuery.parentId = toRaw(tree).checkedNodeClick.id
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

/**
 * 加载子树数据的方法，仅当 lazy 属性为true 时生效
 * @param node 节点
 * @param resolve
 * @returns {*}
 */
export async function loadNode(node: any, resolve: any) {
  tree.checkedNodeDropdown = node
  if (node.level === 0) {
    // 最开始的时候，默认根节点被选中
    // 默认展开第二级
    nextTick(() => {
      const rootNode = node.childNodes[0]
      rootNode.expanded = true
      // 默认选中根节点
      // @ts-ignore
      treeRef.value.lazyTreeRef.setCurrentKey(rootNode.id, true)
      tree.checkedNodeClick.id = rootNode.data.id
    }).then(() => node.childNodes[0].loadData())
    return resolve([useDictVO()])
  }
  if (node.level > 0) {
    await getChildrenNode(node.data.id)
    return resolve(tree.loadChildrenTreeData)
  }
}

// 清除node的子节点查看下一页的标识
export function clearHasNext(node: any) {
  const childNodes = node.parent.childNodes
  // 取消之前下一页的链接
  // @ts-ignore
  const lastNode = treeRef.value.lazyTreeRef.getNode(childNodes[childNodes.length - 1].data.id)
  lastNode.data.hasNext = false
}

// 加载下一页的数据
export function loadNextPageData() {
  tree.listQuery.page = tree.listQuery.page + 1
  Object.assign(tree.listQuery.parentId, tree.checkedNodeDropdown.data.id)
  tree.listQuery.minDistance = 1
  tree.listQuery.maxDistance = 1
  list(tree.listQuery).then((response) => {
    tree.total = response.data.total
    // 数据不为空
    if (isNotEmptyCollection(response.data.records)) {
      // 追加树节点
      tree.loadChildrenTreeData = response.data.records
      tree.loadChildrenTreeData.forEach((node) => {
        // @ts-ignore
        tree.value.append(node, tree.checkedNodeDropdown)
      })
      // 设置最后一个节点是否有下一页链接
      setHasNext()
    }
  })
}

/**
 * 根据id获取直接子节点
 * @param id 当前节点id
 */
export async function getChildrenNode(id: number) {
  // 重置查询条件
  resetQuery()
  tree.listQuery.parentId = id
  tree.listQuery.minDistance = 1
  tree.listQuery.maxDistance = 1
  await list(tree.listQuery).then((response) => {
    tree.loadChildrenTreeData = response.data.records
    tree.total = response.data.total
    // 设置最后一个节点是否有下一页链接
    setHasNext()
  })
}

// 设置最后一个节点是否有下一页链接
export function setHasNext() {
  if (isNotEmptyCollection(tree.loadChildrenTreeData)) {
    const lastNode = tree.loadChildrenTreeData[tree.loadChildrenTreeData.length - 1]
    lastNode.hasNext = tree.listQuery.page * tree.listQuery.size < tree.total
  }
}

// 节点被点击
export function handleNodeClick(data: any) {
  // 保存被选择节点
  tree.checkedNodeClick = data
  table.listQuery.parentId = data.id
  // 刷新表格
  getList()
}

// 节点被展开
export function handleNodeExpand(data: any) {
  // 保存被选择节点
  Object.assign(tree.checkedNodeDropdown, data)
}

// 节点被关闭
export function handleNodeCollapse(data: any) {
  // 保存被选择节点，此时传当前被关闭的节点的父节点，因为当前节点被关闭，有下拉分页的需求最多是当前节点的父节点
  Object.assign(tree.checkedNodeDropdown, data.parent)
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

// 点击下一页
export function viewNextPage(clickedNode: any) {
  // 加载下一页的数据
  loadNextPageData()
  // 清除之前的下一页超链接
  clearHasNext(clickedNode)
}

// 重置树的搜索条件
export function resetQuery() {
  tree.listQuery.page = 1
  tree.listQuery.parentId = undefined
  tree.listQuery.code = ''
  tree.listQuery.description = ''
  tree.listQuery.status = undefined
  tree.listQuery.name = ''
  tree.total = 0
  tree.listQuery.minDistance = 1
  tree.listQuery.maxDistance = undefined
}

// 表格的搜索表单重置
export function resetSearchForm() {
  // @ts-ignore
  searchFormRef.value.resetFields()
}

// 单元格样式
export function cellClass() {
  return { borderColor: '#0e2231' }
}

// 表头样式
export function headerClass() {
  return { borderColor: '#0e2231', background: '#b1b3b8', color: '#151617' }
}
