import { BaseQuery } from '../base/BaseQuery'

export interface QueryDictReq extends BaseQuery {
  
  parentId?: number
  
  code?: string
  
  value?: string
  
  description?: string
  
  minDistance?: number
  
  maxDistance?: number
}


export function useQueryDictReq(size: number): QueryDictReq {
  return {
    page: 1,
    size,
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
