export interface BaseQuery {
  /** 页码 */
  page?: number
  /** 页大小 */
  size?: number
  /** 类型 */
  types?: Array<number>
  /** 是否启用，1：启用，0：禁用 */
  status?: Array<number>
  /** 名称 */
  name: string
}
