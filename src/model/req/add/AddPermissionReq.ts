export interface AddPermissionReq {
  /** 权限名称 */
  name: string
  /** 父id，根节点为0 */
  parentId: number
  /** 权限类型，1:页面，2:按钮 */
  type: number
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
}
