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
  /**
   * 页面名称
   */
  pageName?: string
  /** 是否隐藏，1：是，0：否 */
  hidden: boolean
  /** 排序，默认为1 */
  sort: number
  /** 是否启用，1：启用，0：禁用 */
  status: number
}

/**
 * 新增和编辑权限规则
 */
export interface PermissionRule {
  name: Array<Object>
  type: Array<Object>
  path: Array<Object>
  status: Array<Object>
  hidden: Array<Object>
}

/**
 * 初始化
 */
export function usePermissionRule(): PermissionRule {
  return {
    name: [{ required: true, message: '请输入权限名称', trigger: 'change' }],
    type: [{ required: true, message: '请选择权限类型', trigger: 'change' }],
    path: [{ required: true, message: '请输入路径', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    hidden: [{ required: true, message: '请选择是否展示', trigger: 'change' }]
  }
}

/**
 * 初始化
 */
export function useAddPermissionReq(): AddPermissionReq {
  return {
    component: '',
    hidden: false,
    icon: '',
    name: '',
    parentId: 0,
    path: '',
    sort: 0,
    status: 0,
    type: 0,
    pageName: undefined
  }
}
