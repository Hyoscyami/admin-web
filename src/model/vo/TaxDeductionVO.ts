import { BaseVO } from '../resp/base/BaseVO'

export interface TaxDeductionVO extends BaseVO {
  
  orgId: number
  
  orgName: string
  
  completeOrgName: string
  
  borrowerName: string
  
  borrowerIdNo: string
  
  loanAccountNo: string
  
  borrowTime: string
  
  expireTime: string
  
  assetBalance: number
  
  capital: number
  
  revokeCapital: number
  
  revokeDate: string
  
  onBalanceSheetInterest: number
  
  offBalanceSheetInterest: number
  
  charges: number
  
  revokeOnBalanceSheetInterest: number
  
  revokeOffBalanceSheetInterest: number
  
  revokeCharges: number
  
  accountingDocumentNo: string
  
  writeOffDate: string
  
  confirmationConditionsName: string
  
  assetTypeName: string
  
  preTaxYear: string
  
  warningLeftDays: number
  
  relationTypeName: string
}

export function useTaxDeductionVO(): TaxDeductionVO {
  return {
    accountingDocumentNo: '',
    assetTypeName: '',
    id: 0,
    borrowTime: '',
    borrowerIdNo: '',
    borrowerName: '',
    capital: 0,
    charges: 0,
    completeOrgName: '',
    confirmationConditionsName: '',
    createTime: '',
    creatorName: '',
    expireTime: '',
    loanAccountNo: '',
    assetBalance: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    offBalanceSheetInterest: 0,
    onBalanceSheetInterest: 0,
    orgId: 0,
    orgName: '',
    preTaxYear: '',
    revokeCapital: 0,
    revokeCharges: 0,
    revokeDate: '',
    revokeOffBalanceSheetInterest: 0,
    revokeOnBalanceSheetInterest: 0,
    warningLeftDays: 0,
    writeOffDate: '',
    relationTypeName: ''
  }
}
