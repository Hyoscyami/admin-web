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
  /** 是否启用，1：启用，0：禁用 */
  status: number
}
