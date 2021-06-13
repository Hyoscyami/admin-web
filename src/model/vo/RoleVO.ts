import { BaseVO } from '../resp/base/BaseVO'

export interface RoleVO extends BaseVO {
  /**
   * 角色类型，1：组织角色
   *
   */
  type: number
}
