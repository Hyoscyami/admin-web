export interface UpdateBadDebtReq {
  
  id: number
  
  borrowerName: string

  
  borrowerIdNo: string

  
  loanAccountNo: string

  
  accountingDocumentNo: string

  
  borrowTime: string

  
  expireTime: string

  
  writeOffDate: string

  
  assetBalance: number

  
  capital: number

  
  onBalanceSheetInterest: number

  
  offBalanceSheetInterest: number

  
  charges: number
  
  parentOrgIds?: Array<number>
}


export function useUpdateBadDebtReq(): UpdateBadDebtReq {
  return {
    accountingDocumentNo: '',
    borrowTime: '',
    borrowerIdNo: '',
    borrowerName: '',
    capital: 0,
    charges: 0,
    expireTime: '',
    id: 0,
    loanAccountNo: '',
    assetBalance: 0,
    offBalanceSheetInterest: 0,
    onBalanceSheetInterest: 0,
    writeOffDate: ''
  }
}
