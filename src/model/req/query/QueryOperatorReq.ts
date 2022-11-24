import { BaseQuery } from '../base/BaseQuery'

export interface QueryOperatorReq extends BaseQuery {
  
  orgId: number
  
  phone?: string
  
  username?: string
  
  minDistance: number
  
  maxDistance?: number
}


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
