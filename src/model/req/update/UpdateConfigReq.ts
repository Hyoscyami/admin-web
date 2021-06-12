export interface UpdateConfigReq {
  /**
   * id
   */
  id: number
  /**
   * 状态，1：启用，2：禁用
   */
  status?: number

  /**
   * 码值
   */
  code: string

  /**
   * 值
   */
  value: string

  /**
   * 排序，从1开始
   */
  sort: number

  /**
   * 描述
   */
  description?: string
}
