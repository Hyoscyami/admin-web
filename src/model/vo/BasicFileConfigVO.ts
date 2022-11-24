import { BaseVO } from '../resp/base/BaseVO'
import { BasicFileConfigEvidenceVO } from './BasicFileConfigEvidenceVO'

export interface BasicFileConfigVO extends BaseVO {
  
  orgId: number

  
  confirmationConditions: number

  
  confirmationConditionsName: string

  
  assetType: number

  
  assetTypeName: string

  
  minAmountWrittenOff: number

  
  maxAmountWrittenOff: number
  
  writtenOffAmountStr: string
  
  amountWrittenOffType: number
  
  daysOverdue: number
  
  daysOverdueTypeStr: string
  
  daysOverdueType: number

  
  relationType: number

  
  relationTypeName: string

  
  startTime: number

  
  startTimeName: string

  
  elapsedTime: number

  
  elapsedTimeType: number

  
  evidenceDescription: string

  
  type: number
  
  warningLeftDays: number
  
  evidenceList: Array<BasicFileConfigEvidenceVO>
}

export function useBasicFileConfigVO(): BasicFileConfigVO {
  return {
    amountWrittenOffType: 0,
    assetType: 0,
    assetTypeName: '',
    confirmationConditions: 0,
    confirmationConditionsName: '',
    createTime: '',
    creatorName: '',
    daysOverdue: 0,
    daysOverdueType: 0,
    daysOverdueTypeStr: '',
    elapsedTime: 0,
    elapsedTimeType: 0,
    evidenceDescription: '',
    evidenceList: [],
    id: 0,
    maxAmountWrittenOff: 0,
    minAmountWrittenOff: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    warningLeftDays: 0,
    relationType: 0,
    relationTypeName: '',
    startTime: 0,
    startTimeName: '',
    type: 0,
    writtenOffAmountStr: ''
  }
}
