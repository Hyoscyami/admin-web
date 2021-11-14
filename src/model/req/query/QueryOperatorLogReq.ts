import { BaseQuery } from '../base/BaseQuery'

export interface QueryOperatorLogReq extends BaseQuery {
  /** 组织id */
  orgId?: number
  /** 组织ID列表 */
  orgIds: Array<number>
  /** 登录账号 */
  username: string
  /** 手机号 */
  phone: string
  /** 权限id */
  permissionId?: number
  /** 操作类型 */
  type: number
}

export function useQueryOperatorLogReq(size: number): QueryOperatorLogReq {
  return {
    name: '',
    orgId: undefined,
    orgIds: [],
    page: 1,
    permissionId: undefined,
    phone: '',
    size,
    type: 0,
    username: ''
  }
}
