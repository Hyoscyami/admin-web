import { BaseVO } from '../resp/base/BaseVO'
import { FileVO } from './FileVO'

export interface BadDebtFileVO extends BaseVO {
  /** 呆账核销申报审批表 */
  approveList: Array<FileVO>
  /** 呆账核销申请报告 */
  applyList: Array<FileVO>
  /** 借款合同或协议 */
  loanContractList: Array<FileVO>
  /** 借款或垫款凭证 */
  loanCertificateList: Array<FileVO>
  /** 放款会计凭证 */
  loanAccountDocumentList: Array<FileVO>
  /** 风险五级 */
  riskFiveLevelList: Array<FileVO>
  /** 贷款余额查询 */
  loanBalanceQueryList: Array<FileVO>
  /** 其他申报材料 */
  otherApplyMaterials: Array<FileVO>
  /** 附加证据列表，ID是basic_file_config_evidence的id */
  evidenceList: Array<FileVO>
}

export function useBadDebtFileVO(): BadDebtFileVO {
  return {
    applyList: [],
    approveList: [],
    createTime: '',
    creatorName: '',
    evidenceList: [],
    id: 0,
    loanAccountDocumentList: [],
    loanBalanceQueryList: [],
    loanCertificateList: [],
    loanContractList: [],
    modifierName: '',
    modifyTime: '',
    name: '',
    otherApplyMaterials: [],
    riskFiveLevelList: []
  }
}
