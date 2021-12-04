import { nextTick, reactive, ref } from 'vue'
import { dictConvert, isBlank, isNotEmptyCollection, successMsg, warningMsg } from '@/utils/common'
import { DictEnum } from '@/enums/DictEnum'
import { add, del, getDetail, getMaxSort, list, listChildrenByCode, update } from '@/api/sys/role'
import { CommonEnum } from '@/enums/CommonEnum'
import { toRaw } from '@vue/reactivity'
import { getTree } from '../../../model/req/query/Tree'
import { QueryRoleReq, useQueryRoleReq } from '../../../model/req/query/QueryRoleReq'
import { RoleVO, useRoleVO } from '../../../model/vo/RoleVO'
import { useTable } from '../../../model/req/query/Table'
import { useDialog } from '../../../model/vo/Dialog'
import { AddRoleReq, RoleRule, useAddRoleReq, useRoleRule } from '../../../model/req/add/AddRoleReq'
import { UpdateRoleReq, useUpdateRoleReq } from '../../../model/req/update/UpdateRoleReq'
import { list as listOrg, tree as getOrgTree } from '@/api/sys/org'
import { QueryOrgReq, useQueryOrgReq } from '../../../model/req/query/QueryOrgReq'
import { OrgVO, useOrgVO } from '../../../model/vo/OrgVO'
import { getPermissions } from '../../../api/sys/permission'
import { formatYYYYMMDD } from '../../../utils/time'

// 初始化树的对象
const initTree = getTree<QueryOrgReq, OrgVO>(useQueryOrgReq(100), useOrgVO())
// 初始化表格的对象
const initTable = useTable<RoleVO, QueryRoleReq>(useQueryRoleReq(20))
// 对话框初始化
const initDialog = useDialog<RoleVO, RoleRule, AddRoleReq, UpdateRoleReq>(
  useRoleVO(),
  useRoleRule(),
  useAddRoleReq()
)
// 树相关
export const tree = reactive(initTree)
// 父角色表格数据
export const table = reactive(initTable)
// 对话框
export const dialog = reactive(initDialog)
// 树ref
export const treeRef = ref(null)
// 权限树
export const permissionTreeRef = ref(null)
// 对话框新增角色表单ref
export const addFormRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)

// 初始化
export function init() {
  // 初始化状态
  listStatus()
  //获取组织树
  initOrgTree()
  // 初始化表格
  searchFormSubmit()
}

// 状态转换
export function viewDetailDataStatus() {
  return dictConvert(DictEnum.DICT_STATUS, String(dialog.viewDetailData.status))
}

//获取组织树
export function initOrgTree() {
  getOrgTree().then((response) => {
    tree.data = response.data
  })
}

// 获取状态下拉框
export function listStatus() {
  listChildrenByCode(DictEnum.DICT_STATUS).then((response) => {
    table.statusSelect = response.data
  })
}

// 搜索角色表单查询
export function searchFormSubmit() {
  table.listQuery.page = 1
  getList()
}

// 搜索tree
export function filterTree(searchText: string, data: any): boolean {
  if (isBlank(searchText)) {
    return true
  }
  return data.name.indexOf(searchText) !== -1
}

// 打开新增角色对话框
export function openAddDialog() {
  if (isBlank(tree.checkedNodeClick.id)) {
    warningMsg('请先在左侧选择节点')
    return
  }

  dialog.visible = true
  dialog.dialogStatus = CommonEnum.CREATE
  dialog.viewDetailData.permissionIds.length = 0
  //初始化新增的时候权限树
  initAddDetailTree()
  getMaxSortValue(tree.checkedNodeClick.id)
  Object.assign(dialog.form.parentId, tree.checkedNodeClick.id)
}

//初始化新增的时候权限树
function initAddDetailTree() {
  getPermissions().then((response) => {
    dialog.viewDetailData.permissionVOS = response.data
  })
}

//初始化详情和编辑时的树
function initViewDetailTree(row: RoleVO) {
  getDetail(row.id).then((response) => {
    dialog.viewDetailData.permissionVOS = response.data.permissionVOS
    dialog.viewDetailData.permissionIds = response.data.permissionIds
    nextTick(() => {
      // @ts-ignore
      permissionTreeRef.value.setCheckedKeys(dialog.viewDetailData.permissionIds)
    })
  })
}

// 查看详情
export function viewDetail(row: any) {
  dialog.viewDialogVisible = true
  getDetail(row.id).then((response) => {
    dialog.viewDetailData = response.data
    if (dialog.viewDetailData.permissionVOS) {
      dialog.viewDetailData.permissionIds = dialog.viewDetailData.permissionVOS.map((item) => {
        return item.id
      })
    }
  })
}

// 获取当前最大排序值
export function getMaxSortValue(id: number) {
  getMaxSort(id).then((response) => {
    dialog.form.sort = response.data + 1
  })
}

// 新增角色表单提交
export function addFormSubmit() {
  // @ts-ignore
  addFormRef.value.validate((valid) => {
    if (valid) {
      dialog.form.orgId = tree.checkedNodeClick.id
      // @ts-ignore
      dialog.form.permissionIds = permissionTreeRef.value
        .getCheckedKeys()
        // @ts-ignore
        .concat(permissionTreeRef.value.getHalfCheckedKeys())
      if (dialog.dialogStatus === CommonEnum.CREATE) {
        add(dialog.form).then(() => {
          // 关闭弹框
          cancelAddForm()
          // 刷新表格
          getList()
        })
      } else if (dialog.dialogStatus === CommonEnum.UPDATE) {
        // @ts-ignore
        dialog.form.permissionIds = permissionTreeRef.value
          .getCheckedKeys()
          // @ts-ignore
          .concat(permissionTreeRef.value.getHalfCheckedKeys())
        update(dialog.form).then(() => {
          // 关闭弹框
          cancelAddForm()
          // 刷新表格
          getList()
        })
      }
    } else {
      return false
    }
  })
}

// 新增角色表单取消
export function cancelAddForm() {
  dialog.visible = false
  // @ts-ignore
  addFormRef.value.resetFields()
}

// 查看详情字典弹框取消
export function cancelView() {
  dialog.viewDialogVisible = false
}

// 获取父角色列表数据
export function getList() {
  table.listLoading = true
  table.listQuery.orgId = toRaw(tree).checkedNodeClick.id
  list(table.listQuery).then((response) => {
    table.tableData = response.data.records
    table.total = response.data.total
    table.listLoading = false
  })
}

// 修改角色详情
export function updateDetail(row: any) {
  dialog.dialogStatus = CommonEnum.UPDATE
  dialog.visible = true
  Object.assign(dialog.form, row)
  //回显权限
  initViewDetailTree(row)
}

// 删除角色
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
    return resolve([tree.rootNode])
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
  listOrg(tree.listQuery).then((response) => {
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
  resetTreeQuery()
  tree.listQuery.parentId = id
  tree.listQuery.minDistance = 1
  tree.listQuery.maxDistance = 1
  await listOrg(tree.listQuery).then((response) => {
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
  Object.assign(tree.checkedNodeClick, data)
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
  const param = useUpdateRoleReq()
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
export function resetTreeQuery() {
  tree.listQuery.page = 1
  tree.listQuery.size = 100
  tree.listQuery.parentId = 0
  tree.listQuery.status = undefined
  tree.listQuery.name = ''
  tree.listQuery.orgNo = ''
  tree.total = 0
  tree.listQuery.minDistance = 1
  tree.listQuery.maxDistance = undefined
}

// 表格的搜索表单重置
export function resetSearchForm() {
  // @ts-ignore
  searchFormRef.value.resetFields()
}

// 角色类型转中文
export function convertTypeToChinese(): string {
  return '组织角色'
}

// 日期转换
export function formatDate(_row: any, _column: any, cellValue: any): string {
  return formatYYYYMMDD(cellValue)
}
