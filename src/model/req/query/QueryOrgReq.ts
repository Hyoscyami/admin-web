import { BaseQuery } from '../base/BaseQuery'

export interface QueryOrgReq extends BaseQuery {
  
  orgNo: string
  
  parentId: number
  
  minDistance: number
  
  maxDistance?: number
}


export function useQueryOrgReq(size: number): QueryOrgReq {
  return {
    maxDistance: undefined,
    minDistance: 0,
    name: '',
    orgNo: '',
    page: 1,
    parentId: 1,
    size,
    status: [],
    types: []
  }
}
