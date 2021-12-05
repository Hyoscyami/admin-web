import { nextTick, reactive, ref } from 'vue'
import { dictConvert, isBlank, isNotEmptyCollection, successMsg, warningMsg } from '@/utils/common'
import { DictEnum } from '../../../enums/DictEnum'
import { add, del, list, update } from '@/api/sys/operator'
import { CommonEnum } from '@/enums/CommonEnum'
import { toRaw } from '@vue/reactivity'
import { useTable } from '@/model/req/query/Table'
import { OperatorVO, useOperatorVO } from '@/model/vo/OperatorVO'
import { getTree } from '@/model/req/query/Tree'
import { useDialog } from '../../../model/vo/Dialog'
import { QueryOperatorReq, useQueryOperatorReq } from '../../../model/req/query/QueryOperatorReq'
import {
  AddOperatorReq,
  OperatorRule,
  useAddOperatorReq,
  useOperatorRule,
  userOrgRoleForm
} from '../../../model/req/add/AddOperatorReq'
import {
  UpdateOperatorReq,
  useUpdateOperatorReq
} from '../../../model/req/update/UpdateOperatorReq'
import { listChildrenByCode } from '../../../api/sys/dict'
import { QueryOrgReq, useQueryOrgReq } from '../../../model/req/query/QueryOrgReq'
import { OrgVO, useOrgVO } from '../../../model/vo/OrgVO'
import { list as getOrgList, tree as getOrgTree } from '@/api/sys/org'
import { list as getRoleList } from '@/api/sys/role'
import { useQueryRoleReq } from '../../../model/req/query/QueryRoleReq'
import { doEncrypt } from '../../../utils/password-utils'

// 初始化树的对象
const initTree = getTree<QueryOrgReq, OrgVO>(useQueryOrgReq(100), useOrgVO())

// 初始化表格的对象
const initTable = useTable<OperatorVO, QueryOperatorReq>(useQueryOperatorReq(20))

// 树相关
export const tree = reactive(initTree)
// 员工表格数据
export const table = reactive(initTable)

// 对话框初始化
const initDialog = useDialog<OperatorVO, OperatorRule, AddOperatorReq, UpdateOperatorReq>(
  useOperatorVO(),
  useOperatorRule(),
  useAddOperatorReq()
)
//对话框
export const dialog = reactive(initDialog)
// 树ref
export const treeRef = ref(null)
// 对话框新增表单ref
export const dialogFormRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
//组织角色对话框
export const dialogOrgRole = reactive(userOrgRoleForm())

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

// 搜索数据字典表单查询
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

// 打开新增数据字典对话框
export function openAddDialog() {
  if (!tree.checkedNodeClick.id) {
    warningMsg('请先在左侧选择节点')
    return
  }
  dialog.visible = true
  dialog.dialogStatus = CommonEnum.CREATE
  getSelectOrg('')
}

/**
 *  选择组织后change事件
 * @param orgId
 */
export function selectOrgChange(orgId: number) {
  dialog.form.orgRoles[0].roleId = undefined
  getSelectRole(orgId, '')
}

/**
 * 根据选择的组织ID，查询组织下的角色列表
 * @param orgId
 * @param roleName
 */
export function getSelectRole(orgId: number, roleName: string) {
  let queryRoleReq = useQueryRoleReq(10000)
  queryRoleReq.name = roleName
  queryRoleReq.orgId = orgId
  queryRoleReq.maxDistance = 0
  getRoleList(queryRoleReq).then((response) => {
    dialogOrgRole.roleList = response.data.records
  })
}

/**
 * 获取新增和编辑时弹框的组织下拉框
 * @param orgName
 */
export function getSelectOrg(orgName: string) {
  let queryOrgReq = useQueryOrgReq(10000)
  queryOrgReq.name = orgName
  getOrgList(queryOrgReq).then((response) => {
    dialogOrgRole.orgList = response.data.records
  })
}

// 查看详情
export async function viewDetail(row: any) {
  dialog.viewDialogVisible = true
  Object.assign(dialog.viewDetailData, row)
  dialog.viewDetailData.statusStr = await dictConvert(DictEnum.DICT_STATUS, String(row.status))
}

// 新增数据字典表单提交
export function addFormSubmit() {
  // @ts-ignore
  dialogFormRef.value.validate((valid) => {
    if (valid) {
      if (dialog.form.password) {
        // @ts-ignore
        dialog.form.password = doEncrypt(dialog.form.password)
      }
      if (dialog.dialogStatus === CommonEnum.CREATE) {
        add(dialog.form).then(() => {
          // 关闭弹框
          cancelDialog()
          // 刷新表格
          getList()
          // 刷新树
          initOrgTree()
        })
      } else if (dialog.dialogStatus === CommonEnum.UPDATE) {
        update(dialog.form).then(() => {
          // 关闭弹框
          cancelDialog()
          // 刷新表格
          getList()
          // 刷新树
          initOrgTree()
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
  // dialog.form.orgRoles[0].orgId = undefined
  // dialog.form.orgRoles[0].roleId = undefined
}

// 查看详情字典弹框取消
export function cancelView() {
  dialog.viewDialogVisible = false
}

// 获取列表数据
export function getList() {
  table.listLoading = true
  table.listQuery.orgId = toRaw(tree).checkedNodeClick.id
  table.listQuery.minDistance = 0
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
  //初始化组织列表
  getSelectOrg('')
  console.log('dialog', dialog)
  if (dialog.form.orgRoles && dialog.form.orgRoles[0].orgId) {
    //初始化角色列表
    getSelectRole(dialog.form.orgRoles[0].orgId, '')
  }
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
      console.log('初始化了node:', node)
      const rootNode = node.childNodes[0]
      rootNode.expanded = true
      // 默认选中根节点
      // @ts-ignore
      treeRef.value.lazyTreeRef.setCurrentKey(rootNode.id, true)
      console.log('rootNode:', rootNode)
      Object.assign(tree.checkedNodeClick, rootNode)
      console.log('初始化了:tree.checkedNodeClick', tree.checkedNodeClick)
    }).then(() => node.childNodes[0].loadData())
    return resolve([useOrgVO()])
  }
  if (node.level > 0) {
    console.log('开始获取数据:', node)
    await getChildrenNode(node.data.id)
    return resolve(tree.loadChildrenTreeData)
  }
}

// 清除node的子节点查看下一页的标识
export function clearHasNext(node: any) {
  const childNodes = node.parent.childNodes
  // 取消之前下一页的链接
  // @ts-ignore
  const lastNode = treeRef.value.getNode(childNodes[childNodes.length - 1].data.id)
  lastNode.data.hasNext = false
}

// 加载下一页的数据
export function loadNextPageData() {
  tree.listQuery.page = tree.listQuery.page + 1
  Object.assign(tree.listQuery.parentId, tree.checkedNodeDropdown.data.id)
  tree.listQuery.minDistance = 1
  tree.listQuery.maxDistance = 1
  getOrgList(tree.listQuery).then((response) => {
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
  await getOrgList(tree.listQuery).then((response) => {
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
  table.listQuery.orgId = data.id
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
  const param = useUpdateOperatorReq()
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

/**
 * 检验新增和编辑员工时的密码
 * @param _rule
 * @param value
 * @param callback
 */
export function validatePassword(_rule: any, value: string, callback: any) {
  if (dialog.dialogStatus === CommonEnum.CREATE && value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
