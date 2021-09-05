import { BaseQuery } from '../base/BaseQuery'

export interface QueryBasicFileConfigReq extends BaseQuery {
  /** 认定条件，对应dict表的ID */
  confirmationConditions?: Array<number>
  /** 资产类型，对应dict表的id */
  assetTypes?: Array<number>
  /** 关联事项类型 */
  relationTypes?: Array<number>
}

export function userQueryBasicFileConfigReq(size: number): QueryBasicFileConfigReq {
  return {
    name: '',
    page: 1,
    size
  }
}
