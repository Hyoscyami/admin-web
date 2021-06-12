export interface AddRoleReq {
  /**
   * 角色类型
   */
  type: number
  /** 角色名称 */
  name: string
  /** 组织ID */
  orgId: string
  /** 排序值 */
  sort: number
  /**
   * 状态
   */
  status: number
  /** 权限ID列表 */
  permissionIds: Array<number>
}
