import { FileReq } from './FileReq'
import { EvidenceFileReq } from './EvidenceFileReq'

export interface BadDebtConfirmReq {
  
  id?: number
  
  basicFileConfigId?: number
  
  approveList: Array<FileReq>
  
  applyList: Array<FileReq>
  
  loanContractList: Array<FileReq>
  
  loanCertificateList: Array<FileReq>
  
  loanAccountDocumentList: Array<FileReq>
  
  riskFiveLevelList: Array<FileReq>
  
  loanBalanceQueryList: Array<FileReq>
  
  otherApplyMaterials: Array<FileReq>
  
  revokeAccountDocumentList: Array<FileReq>
  
  evidenceList: Array<EvidenceFileReq>

  assetType?: number

  confirmationConditions?: number

  confirmationConditionsName?: string

  assetTypeName?: string
  
  status?: Array<number>

  declareYear?: string
  
  evidenceDescription?: string
  
  fileCompleteStatus?: number
}

export function useBadDebtConfirmReq(): BadDebtConfirmReq {
  return {
    assetType: undefined,
    confirmationConditions: undefined,
    applyList: [],
    approveList: [],
    evidenceList: [],
    loanAccountDocumentList: [],
    loanCertificateList: [],
    loanContractList: [],
    loanBalanceQueryList: [],
    otherApplyMaterials: [],
    riskFiveLevelList: [],
    revokeAccountDocumentList: []
  }
}
