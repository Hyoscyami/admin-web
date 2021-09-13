import { BaseVO } from '../resp/base/BaseVO'
import { BasicFileConfigEvidenceVO } from './BasicFileConfigEvidenceVO'

export interface BasicFileConfigVO extends BaseVO {
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
  minAmountWrittenOff: number

  /** 最大核销金额 */
  maxAmountWrittenOff: number
  /** 核销金额展示列 */
  writtenOffAmountStr: string
  /** 核销金额类型，1：任何金额，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  amountWrittenOffType: number
  /** 逾期天数，单位为天 */
  daysOverdue: number
  /** 逾期天数展示列 */
  daysOverdueTypeStr: string
  /** 逾期天数类型，1：任何时间，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  daysOverdueType: number

  /** 关联事项类型，对应dict表的id */
  relationType: number

  /** 关联事项中文名称 */
  relationTypeName: string

  /** 起始时间，对应dict表的id */
  startTime: number

  /** 起始时间中文名称 */
  startTimeName: string

  /** 已达时间，单位为天 */
  elapsedTime: number

  /** 已达时间类型，1：任何时间，2：小于，3：小于等于，4：等于，5：大于，6：大于等于 */
  elapsedTimeType: number

  /** 税收确认证据确认描述 */
  evidenceDescription: string

  /** 基础档案类型 */
  type: number
  /**
   * 预警剩余时间
   */
  warningLeftDays: number
  /** 证据列表 */
  evidenceList: Array<BasicFileConfigEvidenceVO>
}

export function useBasicFileConfigVO(): BasicFileConfigVO {
  return {
    amountWrittenOffType: 0,
    assetType: 0,
    assetTypeName: '',
    confirmationConditions: 0,
    confirmationConditionsName: '',
    createTime: '',
    creatorName: '',
    daysOverdue: 0,
    daysOverdueType: 0,
    daysOverdueTypeStr: '',
    elapsedTime: 0,
    elapsedTimeType: 0,
    evidenceDescription: '',
    evidenceList: [],
    id: 0,
    maxAmountWrittenOff: 0,
    minAmountWrittenOff: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    warningLeftDays: 0,
    relationType: 0,
    relationTypeName: '',
    startTime: 0,
    startTimeName: '',
    type: 0,
    writtenOffAmountStr: ''
  }
}
