import { BaseQuery } from '../base/BaseQuery'

export interface QueryOrgReq extends BaseQuery {
  /** 组织编号 */
  orgNo: string
  /** 组织id，根据parentId搜索本下级 */
  parentId: number
  /** 距离parentId对应节点的最小距离，不传则返回本下级，传了值则筛选distance>=minDistance */
  minDistance: number
  /** 距离parentId对应节点的最大距离，不传则返回本下级，传了值则筛选distance<=maxDistance */
  maxDistance: number
}
