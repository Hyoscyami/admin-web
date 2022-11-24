import { BaseVO } from '../resp/base/BaseVO'

export interface ImportResultVO extends BaseVO {
  
  name: string
  
  filePath: string
  
  resultFilePath: string
  
  orgId: number
  
  type: number
  
  successCount: number
  
  failCount: number
  
  count: number
}


export function useImportResultVO(): ImportResultVO {
  return {
    count: 0,
    createTime: '',
    creatorName: '',
    failCount: 0,
    filePath: '',
    id: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    resultFilePath: '',
    successCount: 0,
    type: 0
  }
}
