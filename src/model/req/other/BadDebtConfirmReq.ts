import { FileReq } from './FileReq'

export interface BadDebtConfirmReq {
  /** 呆账核销数据id */
  id?: number
  /** 呆账核销申报审批表 */
  approveList: Array<FileReq>
  /** 呆账核销申请报告 */
  applyList: Array<FileReq>
  /** 借款合同或协议 */
  loanContractList: Array<FileReq>
  /** 借款或垫款凭证 */
  loanCertificateList: Array<FileReq>
  /** 放款会计凭证 */
  loanAccountDocumentList: Array<FileReq>
  /**
   * 风险五级
   */
  riskFiveLevelList: Array<FileReq>
  /**
   * 贷款余额查询
   */
  loanBalanceQueryList: Array<FileReq>
  /**
   * 其他申报材料
   */
  otherApplyMaterials: Array<FileReq>
  /** 附加证据列表，ID是basic_file_config_evidence的id */
  evidenceList: Array<FileReq>
  // 资产类型
  assetType?: number
  //认定条件，对应dict表的id
  confirmationConditions?: number
  // 认定条件中文名称
  confirmationConditionsName?: string
  //资产类型中文名称
  assetTypeName?: string
  /** 状态，是拟申报税前扣除的话将已核销呆账更新为拟申报税前扣除，是延后申报税前扣除的话，选择等待逾期时间满1年等细分状态 */
  status?: number
}

export function useBadDebtConfirmReq(): BadDebtConfirmReq {
  return {
    assetType: undefined,
    confirmationConditions: undefined,
    applyList: [],
    approveList: [],
    evidenceList: [],
    loanAccountDocumentList: [],
    loanCertificateList: [],
    loanContractList: [],
    loanBalanceQueryList: [],
    otherApplyMaterials: [],
    riskFiveLevelList: []
  }
}
