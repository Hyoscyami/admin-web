import { BaseVO } from '../resp/base/BaseVO'

export interface OperatorLogVO extends BaseVO {
  
  orgId: number

  
  orgName: string

  
  orgPath: string

  
  permissionId: number

  
  permissionName: string

  
  permissionPath: string

  
  dataId: number

  
  type: number

  
  content: string

  
  creatorName: string
}

export function useOperatorLogVO(): OperatorLogVO {
  return {
    content: '',
    createTime: '',
    creatorName: '',
    dataId: 0,
    id: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    orgName: '',
    orgPath: '',
    permissionId: 0,
    permissionName: '',
    permissionPath: '',
    type: 0
  }
}
