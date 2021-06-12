import { BaseVO } from '../base/BaseVO'

export interface ConfigVO extends BaseVO {
  /**
   * 码值
   */
  code: string

  /**
   * 值
   */
  value: string

  /**
   * 排序，默认从1开始
   */
  sort: number

  /**
   * 描述
   */
  description: string

  /**
   * 状态，1：启用，2：禁用
   */
  status: number
}
