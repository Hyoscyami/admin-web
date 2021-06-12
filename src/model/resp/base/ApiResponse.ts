export interface ApiResponse<T> {
  /**
   * 返回码
   */
  code: string
  /**
   * 描述
   */
  msg: string
  /**
   * 返回数据
   */
  data: T
}
