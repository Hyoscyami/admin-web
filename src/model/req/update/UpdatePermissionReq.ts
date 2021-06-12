export interface UpdatePermissionReq {
  /** id */
  id: number
  /** 权限名称 */
  name: string
  /** 权限类型，1：页面，2：按钮 */
  type: number
  /** 状态，1：启用，2：禁用 */
  status: number
  /** 父id */
  parentId: number
  /** 页面路径 */
  path: string
  /** 组件 */
  component: string
  /** 图标路径 */
  icon: string
  /** 是否隐藏，1：隐藏，0：不隐藏 */
  hidden: string
  /** 排序，从1开始 */
  sort: number
}
