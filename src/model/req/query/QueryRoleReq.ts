import { BaseQuery } from '../base/BaseQuery'

export interface QueryRoleReq extends BaseQuery {
  /**
   * 父ID
   */
  parentId: number
  /** 组织ID */
  orgId: number
  /** 距离parentId对应节点的最小距离，不传则返回本下级，传了值则筛选distance>=minDistance */
  minDistance: number
  /** 距离parentId对应节点的最大距离，不传则返回本下级，传了值则筛选distance<=maxDistance */
  maxDistance: number
}

/**
 * 初始化
 */
export function useQueryRoleReq(size: number): QueryRoleReq {
  return {
    maxDistance: 0,
    minDistance: 1,
    name: '',
    orgId: 1,
    page: 1,
    size,
    parentId: 1
  }
}
