export interface AddBasicFileConfigReq {
  /** 认定条件，对应dict表的code */
  confirmationConditions: string

  /** 认定条件中文名称 */
  confirmationConditionsName: string

  /** 资产类型，对应dict表的code */
  assetType: Array<string>

  /** 资产类型中文名称 */
  assetTypeName: string

  /** 最小核销金额 */
  minAmountWrittenOff?: number
  /** 最小核销金额类型，5：不含，6：含 */
  minAmountType?: number
  /** 最大核销金额 */
  maxAmountWrittenOff?: number
  /** 最大核销金额类型，2：不含，3：含 */
  maxAmountType?: number
  /** 逾期天数，单位为天 */
  daysOverdue?: number

  /** 逾期天数类型，1：任何金额，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  daysOverdueType?: number
  /** 关联事项类型，对应dict表的code */
  relationType: string

  /** 关联事项中文名称 */
  relationTypeName: string

  /** 起始时间，对应dict表的code */
  startTime: string

  /** 起始时间中文名称 */
  startTimeName: string

  /** 已达时间，单位为天 */
  elapsedTime?: number

  /** 已达时间类型，1：任何金额，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  elapsedTimeType?: number

  /** 税收确认证据确认描述 */
  evidenceDescription: string

  /** 税收确认证据列表，对应dict表的id列表 */
  evidenceList: Array<number>
}

export function userAddBasicFileConfigReq(): AddBasicFileConfigReq {
  return {
    assetType: [],
    assetTypeName: '',
    confirmationConditions: '',
    confirmationConditionsName: '',
    elapsedTime: undefined,
    elapsedTimeType: undefined,
    evidenceDescription: '',
    evidenceList: [],
    daysOverdueType: undefined,
    relationType: '',
    relationTypeName: '',
    startTime: '',
    startTimeName: ''
  }
}

export interface FileConfigRule {
  /** 认定条件，对应dict表的code */
  confirmationConditions: Array<Object>

  /** 资产类型，对应dict表的code */
  assetType: Array<Object>

  /** 逾期天数类型，1：任何金额，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  daysOverdueType: Array<Object>

  /** 税收确认证据确认描述 */
  evidenceDescription: Array<Object>

  /** 税收确认证据列表，对应dict表的id列表 */
  evidenceList: Array<Object>
}
