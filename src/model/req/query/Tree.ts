import { BaseQuery } from '../base/BaseQuery'
import { BaseVO } from '../../resp/base/BaseVO'

export interface Tree<T extends BaseQuery, V extends BaseVO> {

  filterTreeText: string

  treeProps: TreeProps

  data: Array<V>

  rootNode: V

  checkedNodeClick: any

  checkedNodeDropdown?: any

  loadChildrenTreeData: Array<V>

  defaultExpandedKeys: Array<number>

  listQuery: T

  total: number
}

export interface TreeProps {
  label: string
  isLeaf: string
}


export function getTree<T extends BaseQuery, V extends BaseVO>(query: T, vo: V): Tree<T, V> {
  return {

    filterTreeText: '',

    data: [],

    treeProps: {
      label: 'name',
      isLeaf: 'isLeaf'
    },

    rootNode: vo,

    checkedNodeClick: vo,

    checkedNodeDropdown: undefined,

    loadChildrenTreeData: [],

    defaultExpandedKeys: [],

    listQuery: query,

    total: 0
  }
}
