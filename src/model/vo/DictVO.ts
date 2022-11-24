import { BaseVO } from '../resp/base/BaseVO'

export interface DictVO extends BaseVO {

  parentId: number

  isLeaf: boolean

  hasNext: boolean

  code: string

  value: string

  completePath: string

  description: string

  creatorName: string

  modifierName: string
}


export function useDictVO(): DictVO {
  return {
    id: 1,
    completePath: '',
    hasNext: false,
    isLeaf: false,
    parentId: 0,
    code: '',
    name: '根节点',
    value: '',
    description: '',
    status: 1,
    statusStr: '',
    sort: 1,
    createTime: '',
    creatorName: '',
    modifyTime: '',
    modifierName: ''
  }
}
