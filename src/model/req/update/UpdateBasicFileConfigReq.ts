import { DictVO } from '../../vo/DictVO'

export interface UpdateBasicFileConfigReq {
  
  id: number
  
  orgId: number

  
  confirmationConditions: number

  
  confirmationConditionsName: string

  
  assetType: number

  
  assetTypeName: string

  
  minAmountWrittenOff?: number
  
  minAmountType?: number
  
  maxAmountWrittenOff?: number
  
  maxAmountType?: number
  
  daysOverdue?: number

  
  daysOverdueType: number

  
  relationType: number

  
  relationTypeName?: string
  
  elapsedTime?: number

  
  elapsedTimeType: number

  
  evidenceDescription: string
  
  evidenceList: Array<DictVO>
  
  evidenceDictIds: Array<number>
}

export function useUpdateBasicFileConfigReq(): UpdateBasicFileConfigReq {
  return {
    evidenceList: [],
    assetType: 0,
    assetTypeName: '',
    confirmationConditions: 0,
    confirmationConditionsName: '',
    daysOverdueType: 0,
    elapsedTimeType: 0,
    evidenceDescription: '',
    id: 0,
    orgId: 0,
    relationType: 0,
    evidenceDictIds: []
  }
}
