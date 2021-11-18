import { BaseQuery } from '../base/BaseQuery'

export interface QueryStatisticReq extends BaseQuery {
  /** 资产类型，对应dict.id */
  assetTypes: Array<number>
  /**
   * 展示类型
   *
   */
  type: number
  /**
   * 查询方式，1：按表格，2：按图形
   */
  queryType: number
  /**
   * 搜索类型，1：本级，2：本下级
   */
  searchType: number
  /** 组织id */
  orgId: number
  /** 组织id列表 */
  orgIds: Array<number>
  /** 年份 */
  year: string
  /** 按年度展示时 mapper.xml用到 */
  years: Array<number>
}

export function useQueryStatisticReq(size: number): QueryStatisticReq {
  return {
    assetTypes: [],
    name: '',
    orgId: 0,
    orgIds: [],
    queryType: 1,
    page: 1,
    size,
    type: 1,
    year: '',
    searchType: 1,
    years: []
  }
}
