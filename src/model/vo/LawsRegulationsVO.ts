import { BaseVO } from '../resp/base/BaseVO'

export interface LawsRegulationsVO extends BaseVO {
  /** 组织id,即org.id */
  orgId: number

  /** 法律法规名称 */
  name: string

  /** 法律法规内容 */
  content: string

  type: number
  /** 所属组织路径 */
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
