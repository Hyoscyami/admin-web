import { BaseQuery } from '../base/BaseQuery'

export interface QueryBasicFileConfigReq extends BaseQuery {
  
  confirmationConditions?: Array<number>
  
  assetTypes?: Array<number>
  
  relationTypes?: Array<number>
}

export function userQueryBasicFileConfigReq(size: number): QueryBasicFileConfigReq {
  return {
    name: '',
    page: 1,
    size
  }
}
