import { BaseVO } from '../resp/base/BaseVO'
import { BadDebtFileVO, useBadDebtFileVO } from './BadDebtFileVO'
import { BasicFileConfigVO } from './BasicFileConfigVO'
import { BadDebtConfirmResultVO } from './BadDebtConfirmResultVO'


export interface BadDebtWriteOffVO extends BaseVO {
  
  orgId: number

  
  debtNo: string

  
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

  
  type: number
  
  orgNo: string
  
  importAmount: number
  
  parentOrgIds?: Array<number>
  
  overdueDays?: number
  
  confirmResultVO?: BadDebtConfirmResultVO
  
  basicFileConfigVO?: BasicFileConfigVO
  
  badDebtFileVO?: BadDebtFileVO
  
  statusMsg?: string
}

export function useBadDebtVO(): BadDebtWriteOffVO {
  return {
    accountingDocumentNo: '',
    borrowTime: '',
    borrowerIdNo: '',
    borrowerName: '',
    capital: 0,
    charges: 0,
    createTime: '',
    creatorName: '',
    debtNo: '',
    expireTime: '',
    id: 0,
    importAmount: 0,
    loanAccountNo: '',
    assetBalance: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    offBalanceSheetInterest: 0,
    onBalanceSheetInterest: 0,
    orgId: 0,
    orgNo: '',
    type: 0,
    writeOffDate: '',
    overdueDays: undefined,
    badDebtFileVO: useBadDebtFileVO()
  }
}
