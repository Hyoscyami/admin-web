export interface AddBasicFileConfigReq {
  
  confirmationConditions: string

  
  confirmationConditionsName: string

  
  assetType: Array<string>

  
  assetTypeName: string

  
  minAmountWrittenOff?: number
  
  minAmountType?: number
  
  maxAmountWrittenOff?: number
  
  maxAmountType?: number
  
  daysOverdue?: number

  
  daysOverdueType?: number
  
  relationType: string

  
  relationTypeName: string

  
  startTime: string

  
  startTimeName: string

  
  elapsedTime?: number

  
  elapsedTimeType?: number

  
  evidenceDescription: string

  
  evidenceList: Array<number>
}

export function userAddBasicFileConfigReq(): AddBasicFileConfigReq {
  return {
    assetType: [],
    assetTypeName: '',
    confirmationConditions: '',
    confirmationConditionsName: '',
    elapsedTime: undefined,
    elapsedTimeType: undefined,
    evidenceDescription: '',
    evidenceList: [],
    daysOverdueType: undefined,
    relationType: '',
    relationTypeName: '',
    startTime: '',
    startTimeName: ''
  }
}

export interface FileConfigRule {
  
  confirmationConditions: Array<Object>

  
  assetType: Array<Object>

  
  daysOverdueType: Array<Object>

  
  evidenceDescription: Array<Object>

  
  evidenceList: Array<Object>
}
