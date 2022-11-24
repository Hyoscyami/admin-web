import { BaseQuery } from '../base/BaseQuery'

export interface QueryLawsRegulationsReq extends BaseQuery {

  orgId?: number
}

export function useQueryLawsRegulationsReq(size: number): BaseQuery {
  return { name: '', page: 1, size }
}
