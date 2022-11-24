import { BaseQuery } from '../base/BaseQuery'

export interface QueryPermissionReq extends BaseQuery {
  
  parentId: number
  
  path: string
  
  minDistance: number
  
  maxDistance?: number
}


export function useQueryPermissionReq(): QueryPermissionReq {
  return {
    maxDistance: undefined,
    minDistance: 1,
    name: '',
    page: 1,
    parentId: 0,
    path: '',
    size: 100
  }
}
