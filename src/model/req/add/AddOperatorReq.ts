import { OrgVO } from '../../vo/OrgVO'
import { RoleVO } from '../../vo/RoleVO'
import { validatePassword } from '../../../composables/sys/operator'

export interface AddOperatorReq {
  
  name?: String
  
  username: string
  
  password: String
  
  status: number
  
  orgRoles: Array<OrgRole>
}


export interface OrgRole {
  
  orgId?: number
  
  roleId?: number
}


export interface OrgRoleForm {
  
  orgList: Array<OrgVO>
  
  roleList: Array<RoleVO>
}

export function userOrgRoleForm(): OrgRoleForm {
  return {
    orgList: [],
    roleList: []
  }
}


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
    status: 1,
    username: ''
  }
}


export interface OperatorRule {
  username: Array<Object>
  name: Array<Object>
  password: Array<Object>
  status: Array<Object>
  orgRoles: Array<Object>
}


export function useOperatorRule(): OperatorRule {
  return {
    name: [{ required: true, message: '请输入用户名称', trigger: 'change' }],
    username: [{ required: true, message: '请输入账号', trigger: 'change' }],
    password: [{ trigger: 'blur', validator: validatePassword }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    orgRoles: [{ required: true, message: '请选择组织和角色', trigger: 'change' }]
  }
}
