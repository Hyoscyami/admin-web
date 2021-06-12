export interface BaseQuery {
  /** 页码 */
  page: number
  /** 页大小 */
  size: number
  /** 分页起始偏移量 */
  offset: number
  /** 类型 */
  types: Array<number>
  /** 是否启用，1：启用，0：禁用 */
  status: number
  /** 名称 */
  name: string
}
