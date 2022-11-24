import { BaseQuery } from '../base/BaseQuery'

export interface QueryDeclareHistoryReq extends BaseQuery {

  declareYear?: string
}

export function useQueryDeclareHistoryReq(): QueryDeclareHistoryReq {
  return { declareYear: '', name: '', page: 1, size: 20 }
}
