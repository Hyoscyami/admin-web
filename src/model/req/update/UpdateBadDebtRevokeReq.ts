export interface UpdateBadDebtRevokeReq {
  
  id: number
  
  orgId?: number

  
  borrowerName: string

  
  borrowerIdNo: string

  
  loanAccountNo: string

  
  accountingDocumentNo?: string

  
  capital: number

  
  onBalanceSheetInterest: number

  
  offBalanceSheetInterest: number

  
  charges: number

  
  revokeDate: string

  parentOrgIds?: Array<number>
}

export function useUpdateBadDebtRevokeReq(): UpdateBadDebtRevokeReq {
  return {
    borrowerIdNo: '',
    borrowerName: '',
    capital: 0,
    charges: 0,
    id: 0,
    loanAccountNo: '',
    offBalanceSheetInterest: 0,
    onBalanceSheetInterest: 0,
    orgId: 0,
    revokeDate: ''
  }
}
