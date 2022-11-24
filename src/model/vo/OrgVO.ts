import { BaseVO } from '../resp/base/BaseVO'

export interface OrgVO extends BaseVO {

  name: string

  orgNo: string

  completePath: string

  isLeaf: boolean

  type: number

  hasNext: boolean

  children?: Array<OrgVO>
}


export function useOrgVO(): OrgVO {
  return {
    children: undefined,
    completePath: '',
    createTime: '',
    creatorName: '',
    id: 1,
    isLeaf: false,
    modifierName: '',
    modifyTime: '',
    name: '总行',
    orgNo: '',
    status: 0,
    type: 0,
    hasNext: false
  }
}
