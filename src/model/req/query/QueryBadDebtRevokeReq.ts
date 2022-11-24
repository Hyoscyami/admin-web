import { BaseQuery } from '../base/BaseQuery'

export interface QueryBadDebtRevokeReq extends BaseQuery {
  
  orgId?: number

  
  borrowerName?: string

  
  borrowerIdNo?: string

  
  loanAccountNo?: string
  
  revokeDate?: string
  
  selectOrg?: []
}


export function useQueryBadDebtRevokeReq(size: number): QueryBadDebtRevokeReq {
  return { name: '', page: 1, size }
}
