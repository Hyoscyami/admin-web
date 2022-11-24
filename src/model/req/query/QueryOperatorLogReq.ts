import { BaseQuery } from '../base/BaseQuery'

export interface QueryOperatorLogReq extends BaseQuery {
  
  orgId?: number
  
  orgIds: Array<number>
  
  username: string
  
  phone: string
  
  permissionId?: number
  
  type: number
}

export function useQueryOperatorLogReq(size: number): QueryOperatorLogReq {
  return {
    name: '',
    orgId: undefined,
    orgIds: [],
    page: 1,
    permissionId: undefined,
    phone: '',
    size,
    type: 0,
    username: ''
  }
}
