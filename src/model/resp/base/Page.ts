export interface Page<T> {
  /**
   * 总数
   */
  total: number
  /**
   * 数据
   */
  records: T
}
