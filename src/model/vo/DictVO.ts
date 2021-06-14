import { BaseVO } from '../resp/base/BaseVO'

export interface DictVO extends BaseVO {
  /** 节点父ID */
  parentId: number
  /** 是否为叶子节点 */
  isLeaf: boolean
  /** 是否有下一页 */
  hasNext: boolean
  /** 码值 */
  code: string
  /** 值 */
  value: string
  /** 排序，从1开始 */
  sort: number
  /** 完整路径 */
  completePath: string
  /** 描述 */
  description: string
  /** 是否启用，1：启用，0：禁用 */
  status?: number
  /** 创建人 */
  creatorName: string
  /** 修改人ID */
  modifierName: string
}

/**
 * 初始化
 */
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
    sort: 1,
    createTime: '',
    creatorName: '',
    modifyTime: '',
    modifierName: ''
  }
}
