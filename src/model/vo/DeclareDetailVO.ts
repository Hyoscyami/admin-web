export interface DeclareDetailVO {
  
  debtWriteOffAmount: number
  
  debtLossTaxAmount: number
  
  financeAssetBasicLossTaxAmount: number
  
  financeReserveWriteOffAmount: number
  
  financeBasicLossTaxAmount: number
  
  assetReserveLossTaxAmount: number
  
  assetAdjustTaxAmount: number
  
  financeLossTaxAmount: number
  
  financeAdjustTaxAmount: number
  
  loanLossWriteOffAmount: number
  
  loanLossTaxAmount: number
  
  loanLossAdjustTaxAmount: number
  
  farmerWriteOffAmount: number
  
  farmerTaxAmount: number
  
  farmerAdjustTaxAmount: number
  
  singleWriteOffAmount: number
  
  singleTaxAmount: number
  
  singleAdjustTaxAmount: number
  
  singleMiddleWriteOffAmount: number
  
  singleMiddleTaxAmount: number
  
  singleMiddleAdjustTaxAmount: number
  
  otherLossWriteOffAmount: number
  
  otherLossTaxAmount: number
  
  otherLossAdjustTaxAmount: number
  
  bookedAmount: number
  
  taxAmount: number
  
  increaseAmount: number
  
  reductionAmount: number
}

export function useDeclareDetailVO(): DeclareDetailVO {
  return {
    assetAdjustTaxAmount: 0,
    assetReserveLossTaxAmount: 0,
    bookedAmount: 0,
    debtLossTaxAmount: 0,
    financeAssetBasicLossTaxAmount: 0,
    debtWriteOffAmount: 0,
    farmerAdjustTaxAmount: 0,
    farmerTaxAmount: 0,
    farmerWriteOffAmount: 0,
    financeAdjustTaxAmount: 0,
    financeBasicLossTaxAmount: 0,
    financeLossTaxAmount: 0,
    financeReserveWriteOffAmount: 0,
    increaseAmount: 0,
    loanLossAdjustTaxAmount: 0,
    loanLossTaxAmount: 0,
    loanLossWriteOffAmount: 0,
    otherLossAdjustTaxAmount: 0,
    otherLossTaxAmount: 0,
    otherLossWriteOffAmount: 0,
    reductionAmount: 0,
    singleAdjustTaxAmount: 0,
    singleMiddleAdjustTaxAmount: 0,
    singleMiddleTaxAmount: 0,
    singleMiddleWriteOffAmount: 0,
    singleTaxAmount: 0,
    singleWriteOffAmount: 0,
    taxAmount: 0
  }
}
