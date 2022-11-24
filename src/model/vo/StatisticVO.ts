import { BaseVO } from '../resp/base/BaseVO'

export interface StatisticVO extends BaseVO {
  
  name: string
  
  writtenOffCount: number
  
  writtenOffAmount: number
  
  declareTaxDeductionCount: number
  
  declareTaxDeductionAmount: number
  
  declareTaxDeductionProportion: number
  
  unDeclareTaxDeductionCount: number
  
  unDeclareTaxDeductionAmount: number
  
  unDeclareTaxDeductionProportion: number
  
  revokeCount: number
  
  revokeAmount: number
  
  revokedCount: number
  
  revokedAmount: number
  
  revokedProportion: number
  
  unRevokeCount: number
  
  unRevokeAmount: number
  
  unRevokeProportion: number
}

export function useStatisticVO(): StatisticVO {
  return {
    createTime: '',
    creatorName: '',
    declareTaxDeductionAmount: 0,
    declareTaxDeductionCount: 0,
    declareTaxDeductionProportion: 0,
    id: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    revokeAmount: 0,
    revokeCount: 0,
    revokedAmount: 0,
    revokedCount: 0,
    revokedProportion: 0,
    unDeclareTaxDeductionAmount: 0,
    unDeclareTaxDeductionCount: 0,
    unDeclareTaxDeductionProportion: 0,
    unRevokeAmount: 0,
    unRevokeCount: 0,
    writtenOffAmount: 0,
    writtenOffCount: 0
  }
}
