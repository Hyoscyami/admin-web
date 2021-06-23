import { BaseVO } from '../resp/base/BaseVO'

export interface OrgVO extends BaseVO {
  /** 组织名称 */
  name: string
  /** 机构编号 */
  orgNo: string
  /** 所属组织路径 */
  completePath: string
  /** 是否为叶子节点，1：是，0：否 */
  isLeaf: boolean
  /** 组织类型 */
  type: number
  /**
   * 是否有子节点
   */
  hasNext: boolean
}

/**
 * 初始化
 */
export function useOrgVO(): OrgVO {
  return {
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
