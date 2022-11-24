import { BaseQuery } from '../base/BaseQuery'

export interface QueryRoleReq extends BaseQuery {
  
  parentId: number
  
  orgId: number
  
  minDistance: number
  
  maxDistance?: number
}


export function useQueryRoleReq(size: number): QueryRoleReq {
  return {
    maxDistance: undefined,
    minDistance: 0,
    name: '',
    orgId: 1,
    page: 1,
    size,
    parentId: 1
  }
}
