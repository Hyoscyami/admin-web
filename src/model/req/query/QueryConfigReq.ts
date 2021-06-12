import { BaseQuery } from '../base/BaseQuery'

export interface QueryConfigReq extends BaseQuery {
  /** 码值 */
  code: string
  /** 值 */
  value: string
  /** 描述 */
  description: string
}
