import { BaseQuery } from '../base/BaseQuery'

export interface QueryDictReq extends BaseQuery {
  /** 父ID */
  parentId?: number
  /** 码值 */
  code?: string
  /** 值 */
  value?: string
  /** 描述 */
  description?: string
  /** 距离parentId对应节点的最小距离，不传则返回本下级，传了值则筛选distance>=minDistance */
  minDistance?: number
  /** 距离parentId对应节点的最大距离，不传则返回本下级，传了值则筛选distance<=maxDistance */
  maxDistance?: number
}

/**
 * 初始化数据字典表格查询
 */
export function useQueryDictReq(): QueryDictReq {
  return {
    page: 1,
    size: 20,
    code: '',
    value: '',
    description: '',
    types: undefined,
    name: '',
    parentId: 0,
    status: undefined,
    minDistance: undefined,
    maxDistance: undefined
  }
}
