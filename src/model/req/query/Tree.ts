import { BaseQuery } from '../base/BaseQuery'
import { BaseVO } from '../../resp/base/BaseVO'

export interface Tree<T extends BaseQuery, V extends BaseVO> {
  // 过滤树的字段
  filterTreeText: string
  // 树的属性重命名
  treeProps: TreeProps
  // 树的数据
  data: Array<V>
  // 根节点
  rootNode: V
  // 单击被选中节点，给右侧表格列表查询使用，默认是根节点，因为mounted里会初始化表格，而tree初始化这个字段在初始化表格之后
  checkedNodeClick: any
  // 点击下拉图标选中的节点，给树滚动加载使用
  checkedNodeDropdown?: any
  // 当前被点击节点懒加载子树的数据
  loadChildrenTreeData: Array<V>
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
 * @param query 查询条件
 * @param vo 根节点
 */
export function getTree<T extends BaseQuery, V extends BaseVO>(query: T, vo: V): Tree<T, V> {
  return {
    // 过滤树的字段
    filterTreeText: '',
    // 树的数据
    data: [],
    // 树的属性重命名
    treeProps: {
      label: 'name',
      isLeaf: 'isLeaf'
    },
    // 根节点
    rootNode: vo,
    // 单击被选中节点，给右侧表格列表查询使用，默认是根节点，因为mounted里会初始化表格，而tree初始化这个字段在初始化表格之后
    checkedNodeClick: vo,
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
