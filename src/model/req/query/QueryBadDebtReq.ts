import { BaseQuery } from '../base/BaseQuery'


export interface QueryBadDebtReq extends BaseQuery {
  
  orgId?: number
  
  orgIds?: Array<number>
  
  debtNo?: string

  
  borrowerName?: string

  
  borrowerIdNo?: string
  
  searchType: number
  
  loanAccountNo?: string

  
  accountingDocumentNo?: string
  
  writeOffYear?: string
  
  preTaxYear?: string
  
  declareYear?: string
  
  selectOrg?: []
  
  fileCompleteStatus?: number
}


export function useQueryBadDebtReq(size: number): QueryBadDebtReq {
  return { name: '', page: 1, size, searchType: 1 }
}
