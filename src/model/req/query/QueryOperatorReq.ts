import { BaseQuery } from '../base/BaseQuery'

export interface QueryOperatorReq extends BaseQuery {
  /** 组织ID */
  orgId: number
  /** 手机号 */
  phone?: string
  /** 登录账号 */
  username?: string
  /** 距离parentId对应节点的最小距离，不传则返回本下级，传了值则筛选distance>=minDistance */
  minDistance: number
  /** 距离parentId对应节点的最大距离，不传则返回本下级，传了值则筛选distance<=maxDistance */
  maxDistance?: number
}

/**
 * 初始化查询
 */
export function useQueryOperatorReq(size: number): QueryOperatorReq {
  return {
    page: 1,
    size,
    types: undefined,
    name: '',
    minDistance: 0,
    orgId: 0,
    status: undefined
  }
}
