import { BaseVO } from '../resp/base/BaseVO'
import { PermissionVO } from './PermissionVO'

export interface RoleVO extends BaseVO {

  parentId: number

  hasNext: boolean

  type: number

  permissionVOS: Array<PermissionVO>

  permissionIds: Array<number>
}


export function useRoleVO(): RoleVO {
  return {
    createTime: '',
    creatorName: '',
    id: 1,
    modifierName: '',
    modifyTime: '',
    name: '角色',
    type: 1,
    parentId: 0,
    hasNext: false,
    permissionVOS: [],
    permissionIds: []
  }
}
