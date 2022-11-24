import { BaseVO } from '../resp/base/BaseVO'

export interface LawsRegulationsVO extends BaseVO {
  
  orgId: number

  
  name: string

  
  content: string

  type: number
  
  completePath: string
}

export function useLawsRegulationsVO(): LawsRegulationsVO {
  return {
    completePath: '',
    content: '',
    createTime: '',
    creatorName: '',
    id: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    type: 0
  }
}
