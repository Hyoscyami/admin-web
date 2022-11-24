import { BaseVO } from '../resp/base/BaseVO'

export interface PermissionVO extends BaseVO {
  
  type: number
  
  pageName?: string
  
  parentId: number
  
  isLeaf: boolean
  
  isRoot: boolean
  
  hasNext: boolean
  
  path: string
  
  component: string
  
  icon: string
  
  hidden: boolean
  
  deleted: number
  
  children?: Array<PermissionVO>
}


export function usePermissionVO(): PermissionVO {
  return {
    children: undefined,
    component: '',
    createTime: '',
    creatorName: '',
    deleted: 0,
    hasNext: false,
    hidden: false,
    icon: '',
    id: 1,
    isLeaf: false,
    isRoot: false,
    modifierName: '',
    modifyTime: '',
    name: '菜单',
    parentId: 0,
    path: '',
    sort: 1,
    status: 1,
    type: 1
  }
}
