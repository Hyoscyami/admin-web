import { BaseVO } from '../resp/base/BaseVO'

export interface RoleVO extends BaseVO {
  /**
   * 父ID
   */
  parentId: number
  /** 是否有下一页 */
  hasNext: boolean
  /**
   * 角色类型，1：组织角色
   *
   */
  type: number
}

/**
 * 初始化
 */
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
    hasNext: false
  }
}
