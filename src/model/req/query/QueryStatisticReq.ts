import { BaseQuery } from '../base/BaseQuery'

export interface QueryStatisticReq extends BaseQuery {
  
  assetTypes: Array<number>
  
  type: number
  
  queryType: number
  
  searchType: number
  
  orgId: number
  
  orgIds: Array<number>
  
  year: string
  
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
