import { OrgVO } from '../../vo/OrgVO'
import { RoleVO } from '../../vo/RoleVO'

export interface AddOperatorReq {
  /** 姓名 */
  name?: String
  /** 登录账号 */
  username: string
  /** 密码 */
  password: String
  /** 状态，1：启用，2：禁用 */
  status: number
  /** 用户对应的组织角色列表 */
  orgRoles: Array<OrgRole>
}

/**
 * 机构角色关系
 */
export interface OrgRole {
  /**
   * 机构ID
   */
  orgId?: number
  /**
   * 角色ID
   */
  roleId?: number
}
//组织角色表单选择
export interface OrgRoleForm {
  /**
   * 组织列表
   */
  orgList: Array<OrgVO>
  /**
   * 角色列表
   */
  roleList: Array<RoleVO>
}
export function userOrgRoleForm(): OrgRoleForm {
  return {
    orgList: [],
    roleList: []
  }
}
/**
 * 初始化新增的数据字典
 */
export function useAddOperatorReq(): AddOperatorReq {
  return {
    name: '',
    orgRoles: [
      {
        orgId: undefined,
        roleId: undefined
      }
    ],
    password: '',
    status: 0,
    username: ''
  }
}

/**
 * 规则
 */
export interface OperatorRule {
  username: Array<Object>
  name: Array<Object>
  password: Array<Object>
  status: Array<Object>
  orgRoles: Array<Object>
}

/**
 * 初始化表单规则
 */
export function useOperatorRule(): OperatorRule {
  return {
    name: [{ required: true, message: '请输入用户名称', trigger: 'change' }],
    username: [{ required: true, message: '请输入账号', trigger: 'change' }],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    orgRoles: [{ required: true, message: '请选择组织和角色', trigger: 'change' }]
  }
}
