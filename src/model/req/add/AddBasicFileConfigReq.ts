import { DictVO } from '../../vo/DictVO'

export interface AddBasicFileConfigReq {
  /** 认定条件，对应dict表的code */
  confirmationConditions: string

  /** 认定条件中文名称 */
  confirmationConditionsName: string

  /** 资产类型，对应dict表的code */
  assetType: string

  /** 资产类型中文名称 */
  assetTypeName: string

  /** 最小核销金额 */
  minAmountWrittenOff?: number

  /** 最大核销金额 */
  maxAmountWrittenOff?: number

  /** 逾期天数，单位为天 */
  daysOverdue?: number

  /** 逾期天数类型，1：任何金额，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */

  /** 关联事项类型，对应dict表的code */
  relationType: string

  /** 关联事项中文名称 */
  relationTypeName: string

  /** 起始时间，对应dict表的code */
  startTime: string

  /** 起始时间中文名称 */
  startTimeName: string

  /** 已达时间，单位为天 */
  elapsedTime: number

  /** 已达时间类型，1：任何金额，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  elapsedTimeType: number

  /** 税收确认证据确认描述 */
  evidenceDescription: string

  /** 税收确认证据列表，对应dict表的id列表 */
  evidenceList: Array<DictVO>
}

export function userAddBasicFileConfigReq(): AddBasicFileConfigReq {
  return {
    assetType: '',
    assetTypeName: '',
    confirmationConditions: '',
    confirmationConditionsName: '',
    elapsedTime: 0,
    elapsedTimeType: 0,
    evidenceDescription: '',
    evidenceList: [],
    relationType: '',
    relationTypeName: '',
    startTime: '',
    startTimeName: ''
  }
}
