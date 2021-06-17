import { reactive, ref } from 'vue'
import { add, getMaxSort, getTree as getApiTree, update } from '@/services/sys/permission'
import { isNotEmptyCollection, successMsg, warningMsg } from '@/utils/common'
import { listChildrenByCode } from '@/services/sys/dict'
import { DictEnum } from '@/enums/DictEnum'
import { CommonEnum } from '@/enums/CommonEnum'
import { toRaw } from '@vue/reactivity'
import {
  QueryPermissionReq,
  useQueryPermissionReq
} from '../../../model/req/query/QueryPermissionReq'
import { PermissionVO, usePermissionVO } from '../../../model/vo/PermissionVO'
import { getTree } from '../../../model/req/query/Tree'
import { usePermissionForm } from '../../../model/req/update/UpdatePermissionReq'
import { usePermissionRule } from '../../../model/req/add/AddPermissionReq'

const queryPermissionReq = useQueryPermissionReq()
// 初始化树的对象
const initTreeObj = getTree<QueryPermissionReq, PermissionVO>(queryPermissionReq, usePermissionVO())
// 树相关
export const tree = reactive(initTreeObj)

// 表单对应对象
export const form = reactive(usePermissionForm())
// 重置表单
function resetForm() {
  form.id = 1
  form.parentId = 1
  form.name = ''
  form.type = 1
  form.path = ''
  form.component = ''
  form.icon = ''
  form.hidden = false
  form.sort = 1
  form.status = 1
}
// 新增和编辑表单规则
export const rules = usePermissionRule()
// treeRef
export const treeRef = ref(null)
// formRef
export const formRef = ref(null)
// 初始化树
export function initTree() {
  // 重置树查询条件
  resetTreeQuery()
  tree.listQuery.minDistance = 0
  tree.listQuery.parentId = toRaw(tree).rootNode.id
  getApiTree(tree.listQuery).then((response) => {
    tree.data = response.data
    if (isNotEmptyCollection(tree.data)) {
      tree.defaultExpandedKeys.push(tree.data[0].id)
    }
  })
}

/**
 * 重置树
 */
export function resetTreeQuery() {
  tree.listQuery = useQueryPermissionReq()
}
// 节点被点击
export function handleNodeClick(node: any) {
  Object.assign(tree.checkedNodeClick, node)
  Object.assign(form, node)
  form.formStatus = CommonEnum.UPDATE
}

// 初始化statusSelect
export function initStatusSelect() {
  listChildrenByCode(DictEnum.DICT_STATUS).then((response) => {
    form.statusSelect = response.data
  })
}

// 初始化权限类型
export function initTypeSelect() {
  listChildrenByCode(DictEnum.PERMISSION_TYPES).then((response) => {
    form.typeSelect = response.data
  })
}

// 初始化权限图标
export function initIconSelect() {
  listChildrenByCode(DictEnum.PERMISSION_ICON).then((response) => {
    form.iconSelect = response.data
  })
}

// 保存被选择的节点
export function save() {
  if (!canSubmit()) {
    return
  }
  // @ts-ignore
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('tree.formStatus', tree)
      if (CommonEnum.CREATE === form.formStatus) {
        add(form).then((response) => {
          successMsg('新增成功')
          // @ts-ignore
          treeRef.value.append(response.data, tree.checkedNodeClick)
        })
      } else if (CommonEnum.UPDATE === form.formStatus) {
        update(form).then(() => {
          successMsg('编辑成功')
          // @ts-ignore
          const node = treeRef.value.getNode(tree.checkedNodeClick.id)
          Object.assign(node.data, form)
        })
      }
    } else {
      return false
    }
  })
}
// 是否能提交表单
function canSubmit() {
  if (tree.checkedNodeClick.id === undefined) {
    warningMsg('请先在左侧点击权限进行选择')
    return false
  }
  return true
}
// 初始化
export function init() {
  // 初始化树
  initTree()
  // 初始化status
  initStatusSelect()
  // 初始化权限类型
  initTypeSelect()
  // 初始化权限图标
  initIconSelect()
}

// 点击新增
export function handleAddClick() {
  form.formStatus = CommonEnum.CREATE
  if (!canSubmit()) {
    return
  }
  // 重置表单
  resetForm()
  form.parentId = tree.checkedNodeClick.id
  form.path = tree.checkedNodeClick.path
  form.status = 1
  getMaxSort(tree.checkedNodeClick.id).then((response) => {
    form.sort = response.data + 1
  })
}

// 点击编辑
export function handleEditClick() {
  form.formStatus = CommonEnum.UPDATE
  if (!canSubmit()) {
    return
  }
  Object.assign(form, tree.checkedNodeClick)
}
// 搜索tree
export function filterTree(searchText: string) {
  console.log('搜索:', searchText)
  // @ts-ignore
  treeRef.value.filter(searchText)
}
// 过滤节点，全量加载树的时候用
export function filterNode(value: any, data: any) {
  if (!value) return true
  return data.name.indexOf(value) !== -1
}
