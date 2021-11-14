import { BaseQuery } from '../base/BaseQuery'

export interface QueryLoginLogReq extends BaseQuery {
  /** 登录类型，1：PC端登录 */
  type: number
  /** 手机号 */
  phone: string
  /** 组织id */
  orgId?: number
  /** 组织名称 */
  orgName: string
  /** 组织所属路径 */
  orgPath: string
  /** 创建人名称 */
  creatorName: string
  /**
   * 登录账号
   */
  username?: string
}

export function useQueryLoginLogReq(size: number): QueryLoginLogReq {
  return {
    creatorName: '',
    name: '',
    orgId: undefined,
    orgName: '',
    orgPath: '',
    page: 1,
    phone: '',
    size,
    type: 0
  }
}
