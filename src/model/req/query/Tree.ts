import { getRootNode, TreeNode } from './TreeNode'
import { BaseQuery } from '../base/BaseQuery'

export interface Tree<T extends BaseQuery> {
  // 过滤树的字段
  filterTreeText: string
  // 树的属性重命名
  treeProps: TreeProps
  // 根节点
  rootNode: TreeNode
  // 单击被选中节点，给右侧表格列表查询使用，默认是根节点，因为mounted里会初始化表格，而tree初始化这个字段在初始化表格之后
  checkedNodeClick: TreeNode
  // 点击下拉图标选中的节点，给树滚动加载使用
  checkedNodeDropdown?: TreeNode
  // 当前被点击节点懒加载子树的数据
  loadChildrenTreeData: Array<TreeNode>
  // 最开始默认展开的node对应的keys
  defaultExpandedKeys: Array<number>
  // tree分页查询对象
  listQuery: T
  // 树查询结果返回节点的总数
  total: number
}

export interface TreeProps {
  label: string
  isLeaf: string
}

/**
 * 初始化树
 * @param rootNodeName 根节点名称
 * @param query 查询条件
 */
export function getTree<T extends BaseQuery>(rootNodeName: string, query: T): Tree<T> {
  return {
    // 过滤树的字段
    filterTreeText: '',
    // 树的属性重命名
    treeProps: {
      label: 'name',
      isLeaf: 'isLeaf'
    },
    // 根节点
    rootNode: {
      id: 1,
      name: rootNodeName,
      parentId: 0,
      isLeaf: false
    },
    // 单击被选中节点，给右侧表格列表查询使用，默认是根节点，因为mounted里会初始化表格，而tree初始化这个字段在初始化表格之后
    checkedNodeClick: getRootNode(),
    // 点击下拉图标选中的节点，给树滚动加载使用
    checkedNodeDropdown: undefined,
    // 当前被点击节点懒加载子树的数据
    loadChildrenTreeData: [],
    // 最开始默认展开的node对应的keys
    defaultExpandedKeys: [],
    // tree分页查询对象
    listQuery: query,
    // 树查询结果返回节点的总数
    total: 0
  }
}
