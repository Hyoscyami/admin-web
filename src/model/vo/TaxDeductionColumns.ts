
export interface TaxDeductionColumns {
  
  orgName: boolean
  
  borrowerName: boolean
  
  borrowerIdNo: boolean
  
  loanAccountNo: boolean
  
  borrowTime: boolean
  
  expireTime: boolean
  
  assetBalance: boolean
  
  capital: boolean
  
  revokeCapital: boolean
  
  revokeDate: boolean
  
  onBalanceSheetInterest: boolean
  
  offBalanceSheetInterest: boolean
  
  charges: boolean
  
  revokeOnBalanceSheetInterest: boolean
  
  revokeOffBalanceSheetInterest: boolean
  
  revokeCharges: boolean
  
  accountingDocumentNo: boolean
  
  writeOffDate: boolean
  
  confirmationConditionsName: boolean
  
  assetTypeName: boolean
  
  preTaxYear: boolean
  
  warningLeftDays: boolean
  
  status: boolean
  
  writeOffStatus: boolean
  
  relationTypeName: boolean
  
  declareYear: boolean
  
  revokeAccountingDocumentNo: boolean
}


export function useTaxDeductionColumns(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetTypeName: true,
    borrowTime: false,
    borrowerIdNo: true,
    borrowerName: true,
    capital: true,
    charges: false,
    confirmationConditionsName: true,
    declareYear: true,
    expireTime: false,
    loanAccountNo: true,
    assetBalance: false,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: true,
    preTaxYear: false,
    revokeCapital: false,
    revokeCharges: false,
    revokeDate: false,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    warningLeftDays: false,
    writeOffDate: true,
    status: false,
    writeOffStatus: true,
    relationTypeName: false
  }
}


export function useUnDeclareColumns(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetTypeName: false,
    borrowTime: false,
    borrowerIdNo: true,
    borrowerName: true,
    capital: true,
    writeOffStatus: true,
    charges: false,
    confirmationConditionsName: false,
    expireTime: false,
    loanAccountNo: true,
    declareYear: false,
    assetBalance: true,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: true,
    preTaxYear: false,
    revokeCapital: false,
    revokeCharges: false,
    revokeDate: false,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    warningLeftDays: true,
    writeOffDate: true,
    status: false,
    relationTypeName: true
  }
}


export function useRevokeTaxDeductionColumns(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetTypeName: false,
    borrowTime: false,
    writeOffStatus: false,
    borrowerIdNo: true,
    borrowerName: true,
    capital: true,
    charges: false,
    confirmationConditionsName: false,
    expireTime: false,
    loanAccountNo: true,
    assetBalance: true,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: true,
    preTaxYear: false,
    declareYear: true,
    revokeCapital: true,
    revokeCharges: false,
    revokeDate: true,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    warningLeftDays: true,
    writeOffDate: true,
    status: true,
    relationTypeName: true
  }
}


export function useRevokeUnDeclareColumns(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetTypeName: false,
    borrowTime: false,
    writeOffStatus: false,
    borrowerIdNo: true,
    borrowerName: true,
    declareYear: false,
    capital: true,
    charges: false,
    confirmationConditionsName: false,
    expireTime: false,
    loanAccountNo: true,
    assetBalance: true,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: true,
    preTaxYear: false,
    revokeCapital: true,
    revokeCharges: false,
    revokeDate: true,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    warningLeftDays: true,
    writeOffDate: true,
    status: true,
    relationTypeName: true
  }
}


export function useFullStatusQuery(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetBalance: true,
    assetTypeName: true,
    borrowTime: true,
    borrowerIdNo: true,
    declareYear: false,
    borrowerName: true,
    capital: true,
    charges: false,
    confirmationConditionsName: true,
    expireTime: true,
    loanAccountNo: true,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: false,
    preTaxYear: false,
    relationTypeName: false,
    revokeCapital: true,
    revokeCharges: false,
    revokeDate: true,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    status: true,
    warningLeftDays: false,
    writeOffDate: true,
    writeOffStatus: true,
    revokeAccountingDocumentNo: false
  }
}
