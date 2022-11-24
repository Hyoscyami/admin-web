import { BaseVO } from '../resp/base/BaseVO'
import { FileVO } from './FileVO'

export interface BadDebtRevokeVO extends BaseVO {
  
  orgId: number

  
  borrowerName?: string

  
  borrowerIdNo?: string

  
  loanAccountNo: string
  
  assetBalance?: number
  
  accountingDocumentNo?: string
  
  writeOffCapital: number
  
  revokeAmount?: number
  
  capital: number

  
  writeOffDate: string

  
  revokeDate: string
  
  type: number

  
  orgNo: string
  
  writeOffStatus: number
  
  parentOrgIds: Array<number>
  
  accountDocumentFiles: Array<FileVO>
}

export function useBadDebtRevokeVO(): BadDebtRevokeVO {
  return {
    writeOffCapital: 0,
    capital: 0,
    createTime: '',
    creatorName: '',
    id: 0,
    loanAccountNo: '',
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    orgNo: '',
    parentOrgIds: [],
    revokeDate: '',
    type: 0,
    writeOffDate: '',
    writeOffStatus: 0,
    accountDocumentFiles: []
  }
}
