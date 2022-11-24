import { BaseQuery } from '../base/BaseQuery'


export interface QueryImportResultReq extends BaseQuery {}


export function useQueryImportResultReq(size: number): QueryImportResultReq {
  return {
    name: '',
    page: 1,
    size,
    status: [],
    types: []
  }
}
