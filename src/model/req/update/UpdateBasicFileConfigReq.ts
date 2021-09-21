import { DictVO } from '../../vo/DictVO'

export interface UpdateBasicFileConfigReq {
  /** 档案ID */
  id: number
  /** 组织id,即org.id */
  orgId: number

  /** 认定条件，对应dict表的id */
  confirmationConditions: number

  /** 认定条件中文名称 */
  confirmationConditionsName: string

  /** 资产类型，对应dict表的id */
  assetType: number

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

  /** 逾期天数类型，1：任何时间，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  daysOverdueType: number

  /** 关联事项类型，对应dict表的id */
  relationType: number

  /** 关联事项中文名称 */
  relationTypeName?: string
  /** 已达时间，单位为天 */
  elapsedTime?: number

  /** 已达时间类型，1：任何时间，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  elapsedTimeType: number

  /** 税收确认证据确认描述 */
  evidenceDescription: string
  /** 证据列表，申报回显上传按钮使用 */
  evidenceList: Array<DictVO>
  /**
   *附加证据列表对应的数据字典ID列表，编辑档案的时候回显用
   */
  evidenceDictIds: Array<number>
}

export function useUpdateBasicFileConfigReq(): UpdateBasicFileConfigReq {
  return {
    evidenceList: [],
    assetType: 0,
    assetTypeName: '',
    confirmationConditions: 0,
    confirmationConditionsName: '',
    daysOverdueType: 0,
    elapsedTimeType: 0,
    evidenceDescription: '',
    id: 0,
    orgId: 0,
    relationType: 0,
    evidenceDictIds: []
  }
}
