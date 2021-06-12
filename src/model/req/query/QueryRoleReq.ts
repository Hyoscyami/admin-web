import { BaseQuery } from '../base/BaseQuery'

export interface QueryRoleReq extends BaseQuery {
  /** 组织ID */
  orgId: number
  /** 距离parentId对应节点的最小距离，不传则返回本下级，传了值则筛选distance>=minDistance */
  minDistance: number
  /** 距离parentId对应节点的最大距离，不传则返回本下级，传了值则筛选distance<=maxDistance */
  maxDistance: number
}
