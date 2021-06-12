export interface AddConfigReq {
  /**
   * 码值
   */
  code: string
  /**
   * 字段名称
   */
  name: string
  /**
   * 值
   */
  value?: string

  /**
   * 排序，从1开始
   */
  sort: number

  /**
   * 描述
   */
  description?: string

  /**
   * 是否启用，1：启用，0：禁用
   */
  status: number
}
