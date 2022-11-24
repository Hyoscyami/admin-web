import { BaseQuery } from '../base/BaseQuery'

export interface QueryConfigReq extends BaseQuery {
  
  code: string
  
  value: string
  
  description: string
}

export function useQueryConfigReq(size: number): QueryConfigReq {
  return { code: '', description: '', name: '', page: 1, size, value: '' }
}
