import { BaseVO } from '../resp/base/BaseVO'
import { FileVO } from './FileVO'
import { EvidenceFileVO } from './EvidenceFileVO'

export interface BadDebtFileVO extends BaseVO {
  
  accountDocumentList: Array<FileVO>
  
  approveList: Array<FileVO>
  
  applyList: Array<FileVO>
  
  loanContractList: Array<FileVO>
  
  loanCertificateList: Array<FileVO>
  
  loanAccountDocumentList: Array<FileVO>
  
  riskFiveLevelList: Array<FileVO>
  
  loanBalanceQueryList: Array<FileVO>
  
  otherApplyMaterials: Array<FileVO>
  
  evidenceList: Array<EvidenceFileVO>
}

export function useBadDebtFileVO(): BadDebtFileVO {
  return {
    applyList: [],
    accountDocumentList: [],
    approveList: [],
    createTime: '',
    creatorName: '',
    evidenceList: [],
    id: 0,
    loanAccountDocumentList: [],
    loanBalanceQueryList: [],
    loanCertificateList: [],
    loanContractList: [],
    modifierName: '',
    modifyTime: '',
    name: '',
    otherApplyMaterials: [],
    riskFiveLevelList: []
  }
}
