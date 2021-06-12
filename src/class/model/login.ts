export interface Login {
  /**
   * 用户名
   */
  username: string
  /**
   * 密码
   */
  password: string
  /**
   * 验证码ID
   */
  verifyCodeId: string
  /**
   * 验证码
   */
  verifyCode: string
  /**
   * 记住我
   */
  rememberMe: string
}
