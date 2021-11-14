export interface LoginLogVO {
  /** 登录类型，1：PC端登录 */
  type: number

  /** 登录ip，ipv4格式，使用INET_ATON()和INET_NTOA()互相转换 */
  ip: string
  /** 登录账号 */
  username: string
  /** 手机号 */
  phone: string

  /** 组织id */
  orgId: number

  /** 组织名称 */
  orgName: string

  /** 组织所属路径 */
  orgPath: string

  /** 创建人名称 */
  creatorName: string
}

export function useLoginLogVO(): LoginLogVO {
  return {
    creatorName: '',
    ip: '',
    orgId: 0,
    orgName: '',
    orgPath: '',
    phone: '',
    type: 0,
    username: ''
  }
}
