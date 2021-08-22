import { BaseVO } from '../resp/base/BaseVO'
import { OrgRole } from '../req/add/AddOperatorReq'

export interface OperatorVO extends BaseVO {
  /**
   * 手机号
   */
  phone: string
  /**
   * 登录账号
   */
  username: String
  /**
   * 头像
   */
  avatar: string
  /**
   * 所属组织路径
   */
  orgPath: string
  /**
   * 组织角色
   */
  orgRoles: Array<OrgRole>
  /**
   * 是否能编辑
   */
  canEdit?: boolean
  /**
   * 是否能删除
   */
  canDel?: boolean
}

/**
 * 初始化
 */
export function useOperatorVO(): OperatorVO {
  return {
    orgPath: '',
    avatar: '',
    phone: '',
    username: '',
    id: 1,
    orgRoles: [],
    name: '张三',
    status: 1,
    statusStr: '',
    sort: 1,
    createTime: '',
    creatorName: '',
    modifyTime: '',
    modifierName: '',
    canEdit: undefined,
    canDel: undefined
  }
}
