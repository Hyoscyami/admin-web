import { nextTick, reactive, ref } from 'vue'
import { dictConvert, isBlank, isNotEmptyCollection, successMsg, warningMsg } from '@/utils/common'
import { DictEnum } from '../../../enums/DictEnum'
import { add, del, getMaxSort, list, listChildrenByCode, update } from '@/api/sys/org'
import { CommonEnum } from '@/enums/CommonEnum'
import { toRaw } from '@vue/reactivity'
import { QueryOrgReq, useQueryOrgReq } from '../../../model/req/query/QueryOrgReq'
import { getTree } from '../../../model/req/query/Tree'
import { DictVO } from '../../../model/vo/DictVO'
import { OrgVO, useOrgVO } from '../../../model/vo/OrgVO'
import { SelectGroup, useTable } from '../../../model/req/query/Table'
import { useDialog } from '../../../model/vo/Dialog'
import { AddOrgReq, OrgRule, useAddOrgReq, useOrgRule } from '../../../model/req/add/AddOrgReq'
import { UpdateOrgReq } from '../../../model/req/update/UpdateOrgReq'

// 初始化树的对象
const initTree = getTree<QueryOrgReq, OrgVO>(useQueryOrgReq(100), useOrgVO())
// 初始化表格的对象
const initTable = useTable<OrgVO, QueryOrgReq>(useQueryOrgReq(20))
// 对话框初始化
const initDialog = useDialog<OrgVO, OrgRule, AddOrgReq, UpdateOrgReq>(
  useOrgVO(),
  useOrgRule(),
  useAddOrgReq()
)
// 树相关
export const tree = reactive(initTree)
// 父机构表格数据
export const table = reactive(initTable)

// 对话框
export const dialog = reactive(initDialog)
// 树ref
export const treeRef = ref(null)
// 表格ref
export const tableRef = ref(null)
// 对话框新增机构表单ref
export const addFormRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 初始化
export function init() {
  // 初始化状态
  listStatus()
  // 初始化类型
  listTypes()
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

// 搜索tree
export function filterTree(searchText: string) {
  // 重置树的搜索条件
  resetTreeQuery()
  console.log('searchText:', searchText)
  if (isBlank(searchText)) {
    tree.listQuery.maxDistance = 1
  }
  tree.listQuery.parentId = toRaw(tree).rootNode.id
  tree.listQuery.name = searchText
  list(tree.listQuery).then((response) => {
    tree.total = response.data.total
    // @ts-ignore
    treeRef.value.lazyTreeRef.updateKeyChildren(toRaw(tree).rootNode.id, response.data.records)
  })
}

// 打开新增机构对话框
export function openAddDialog() {
  if (isBlank(tree.checkedNodeClick.id)) {
    warningMsg('请先在左侧选择节点')
    return
  }
  dialog.visible = true
  dialog.dialogStatus = CommonEnum.CREATE
  getMaxSortValue(tree.checkedNodeClick.id)
  dialog.form.parentId = toRaw(tree).checkedNodeClick.id
  console.log('table.typeSelect:', table.typesSelect)
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
// 新增机构表单提交
export function addFormSubmit() {
  // @ts-ignore
  addFormRef.value.validate((valid) => {
    if (valid) {
      if (dialog.dialogStatus === CommonEnum.CREATE) {
        add(dialog.form).then((response) => {
          // 关闭弹框
          cancelAddForm()
          // 刷新表格
          getList()
          // 刷新树
          // @ts-ignore
          treeRef.value.lazyTreeRef.append(response.data, tree.checkedNodeClick)
          console.log('返回数据:,tree.checkedNodeClick', response, tree.checkedNodeClick)
          tree.checkedNodeClick.isLeaf = false
        })
      } else if (dialog.dialogStatus === CommonEnum.UPDATE) {
        update(dialog.form).then(() => {
          // 关闭弹框
          cancelAddForm()
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
// 新增机构表单取消
export function cancelAddForm() {
  dialog.visible = false
  // @ts-ignore
  addFormRef.value.resetFields()
}
// 查看详情字典弹框取消
export function cancelView() {
  dialog.viewDialogVisible = false
}
// 获取父机构列表数据
export function getList() {
  table.listLoading = true
  table.listQuery.parentId = toRaw(tree).checkedNodeClick.id
  list(table.listQuery).then((response) => {
    table.tableData = response.data.records
    table.total = response.data.total
    table.listLoading = false
  })
}
// 修改机构详情
export function updateDetail(row: any) {
  dialog.dialogStatus = CommonEnum.UPDATE
  dialog.visible = true
  Object.assign(dialog.form, row)
}
// 删除机构
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
    return resolve([useOrgVO()])
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
  resetTreeQuery()
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
  const param = useAddOrgReq()
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
// 根据类型刷新表格
export function filterTableType(data: any) {
  // 重置查询条件
  table.listQuery.page = 1
  console.log('listQuery:', table.listQuery)
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
  table.listQuery = useQueryOrgReq(100)
  if (table.listQuery.status) {
    table.listQuery.status.push(value)
  }
  // 刷新表格数据
  getList()
}
// 组织类型转换
export function convertTypeToChinese(row: any): string {
  if (row.type === 1) {
    return '实体组织'
  } else if (row.type === 2) {
    return '部门'
  }
  return '-'
}
