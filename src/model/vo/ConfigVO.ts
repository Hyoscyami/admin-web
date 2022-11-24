import { BaseVO } from '../resp/base/BaseVO'

export interface ConfigVO extends BaseVO {

  code: string


  value: string


  sort: number


  description: string


  status: number
}

export function useConfigVO(): ConfigVO {
  return {
    code: '',
    createTime: '',
    creatorName: '',
    description: '',
    id: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    sort: 0,
    status: 0,
    value: ''
  }
}
