export interface UpdateRoleReq {
  /** 角色ID */
  id: number
  /** 角色名称 */
  name: string
  /** 排序值 */
  sort: number
  /**
   * 状态
   */
  status: number
  /** 权限ID */
  permissionIds: Array<number>
}
