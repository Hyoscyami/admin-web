import {
  validateCapital,
  validateCharges,
  validateOffBalanceSheetInterest,
  validateOnBalanceSheetInterest
} from '../../../composables/write-off-recover/make-up'

export interface AddBadDebtRevokeReq {
  /** 组织id,即org.id */
  orgId?: number

  /** 借款人名称 */
  borrowerName: string

  /** 借款人证件号码 */
  borrowerIdNo: string

  /** 贷款账号 */
  loanAccountNo: string

  /** 会计凭证号码 */
  accountingDocumentNo?: string

  /** 本金 */
  capital?: number

  /** 表内利息 */
  onBalanceSheetInterest?: number

  /** 表外利息 */
  offBalanceSheetInterest?: number

  /** 应收费用 */
  charges?: number

  /** 收回日期 */
  revokeDate?: string
}

export function useAddBadDebtRevokeReq(): AddBadDebtRevokeReq {
  return {
    borrowerIdNo: '',
    borrowerName: '',
    loanAccountNo: ''
  }
}

export interface RevokeRule {
  /** 组织id,即org.id */
  orgId: Array<Object>

  /** 借款人名称 */
  borrowerName: Array<Object>

  /** 借款人证件号码 */
  borrowerIdNo: Array<Object>

  /** 贷款账号 */
  loanAccountNo: Array<Object>

  /** 会计凭证号码 */
  accountingDocumentNo: Array<Object>

  /** 本金 */
  capital: Array<Object>

  /** 表内利息 */
  onBalanceSheetInterest: Array<Object>

  /** 表外利息 */
  offBalanceSheetInterest: Array<Object>

  /** 应收费用 */
  charges: Array<Object>

  /** 收回日期 */
  revokeDate: Array<Object>
}

export function useRevokeRule(): RevokeRule {
  return {
    accountingDocumentNo: [{ required: true, message: '请填写会计凭证号', trigger: 'change' }],
    borrowerIdNo: [{ required: true, message: '请填写借款人证件号码', trigger: 'change' }],
    borrowerName: [{ required: true, message: '请填写借款人名称', trigger: 'change' }],
    capital: [
      {
        required: true,
        trigger: 'change',
        validator: validateCapital
      }
    ],
    charges: [
      {
        required: true,
        trigger: 'change',
        validator: validateCharges
      }
    ],
    loanAccountNo: [{ required: true, message: '请输入贷款账号', trigger: 'change' }],
    offBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOnBalanceSheetInterest
      }
    ],
    onBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOffBalanceSheetInterest
      }
    ],
    orgId: [{ required: true, message: '请选择组织', trigger: 'change' }],
    revokeDate: [{ required: true, message: '请选择收回日期', trigger: 'change' }]
  }
}
