import { BaseQuery } from '../base/BaseQuery'

export interface QueryStatisticReq extends BaseQuery {
  /** 资产类型，对应dict.id */
  assetTypes: Array<number>
  /**
   * 展示类型
   *
   */
  type: number
  /** 组织id */
  orgId: number
  /** 组织id列表 */
  orgIds: Array<number>
  /** 年份 */
  year: number
  /** 按年度展示时 mapper.xml用到 */
  years: Array<number>
}
