export interface AddRoleReq {
  /**
   * 角色类型
   */
  type: number
  /**
   * 父ID
   */
  parentId: number
  /** 角色名称 */
  name: string
  /** 组织ID */
  orgId: string
  /** 排序值 */
  sort: number
  /**角色范围*/
  scope: number
  /**
   * 状态
   */
  status: number
  /** 权限ID列表 */
  permissionIds: Array<number>
}

/**
 * 角色规则
 */
export interface RoleRule {
  code: Array<Object>
  name: Array<Object>
  value: Array<Object>
  description: Array<Object>
  status: Array<Object>
  sort: Array<Object>
}

/**
 * 初始化
 */
export function useRoleRule(): RoleRule {
  return {
    code: [
      { required: true, message: '请输入码值', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    name: [{ required: true, message: '请输入角色名称', trigger: 'change' }],
    value: [{ message: '请输入值', trigger: 'change' }],
    description: [{ message: '请输入描述信息', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    sort: [{ required: true, message: '请填写排序值', trigger: 'change' }]
  }
}
/**
 * 初始化
 */
export function useAddRoleReq(): AddRoleReq {
  return {
    name: '',
    orgId: '',
    permissionIds: [],
    sort: 1,
    status: 1,
    type: 3,
    parentId: 1,
    scope: 2
  }
}
