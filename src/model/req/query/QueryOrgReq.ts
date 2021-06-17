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

/**
 * 初始化
 */
export function useQueryOrgReq(size: number): QueryOrgReq {
  return {
    maxDistance: 0,
    minDistance: 1,
    name: '',
    orgNo: '',
    page: 1,
    parentId: 1,
    size,
    status: [],
    types: []
  }
}
