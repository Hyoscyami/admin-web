import { BaseVO } from '../resp/base/BaseVO'

export interface PermissionVO extends BaseVO {
  /** 权限类型，1:页面，2:按钮 */
  type: number
  /** 节点父ID */
  parentId: number
  /** 是否为叶子节点 */
  isLeaf: boolean
  /** 是否为根节点 */
  isRoot: boolean
  /** 是否有下一页 */
  hasNext: boolean
  /** 菜单路径 */
  path: string
  /** 组件 */
  component: string
  /** 图标路径 */
  icon: string
  /** 是否隐藏，1：是，0：否 */
  hidden: boolean
  /** 排序，默认为1 */
  sort: number
  /** 是否启用，1：启用，0：禁用 */
  status: number
  /** 是否被删除，1：被删除，0：未删除 */
  deleted: number
  /** 子节点 */
  children: Array<PermissionVO>
}
