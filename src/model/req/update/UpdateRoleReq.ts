export interface UpdateRoleReq {
  /** 角色ID */
  id: number
  /**
   * 父ID
   */
  parentId?: number
  /**
   * 组织ID
   */
  orgId?: string
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

/**
 * 初始化
 */
export function useUpdateRoleReq(): UpdateRoleReq {
  return {
    id: 1,
    name: '',
    permissionIds: [],
    sort: 1,
    status: 1,
    orgId: ''
  }
}
