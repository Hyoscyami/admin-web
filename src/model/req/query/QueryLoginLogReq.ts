import { BaseQuery } from '../base/BaseQuery'

export interface QueryLoginLogReq extends BaseQuery {
  
  type: number
  
  phone: string
  
  orgId?: number
  
  orgName: string
  
  orgPath: string
  
  creatorName: string
  
  username?: string
}

export function useQueryLoginLogReq(size: number): QueryLoginLogReq {
  return {
    creatorName: '',
    name: '',
    orgId: undefined,
    orgName: '',
    orgPath: '',
    page: 1,
    phone: '',
    size,
    type: 0
  }
}
