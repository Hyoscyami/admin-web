import { OrgRole } from '../add/AddOperatorReq'

export interface UpdateOperatorReq {
  /**
   * 员工ID
   */
  id: number
  /** 姓名 */
  name: String
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
 * 初始化
 */
export function useUpdateOperatorReq(): UpdateOperatorReq {
  return {
    id: 0,
    name: '',
    orgRoles: [],
    password: '',
    status: 0,
    username: ''
  }
}
