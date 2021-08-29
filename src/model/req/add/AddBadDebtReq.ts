import {
  validateCapital,
  validateCharges,
  validateLoanAmount,
  validateOffBalanceSheetInterest,
  validateOnBalanceSheetInterest,
  validateRepayAmount
} from '../../../composables/bad-debt/confirm'

export interface AddBadDebtReq {
  /**
   * 组织ID
   */
  orgId?: number
  /**
   * 借款人名称
   */
  borrowerName: string

  /**
   * 借款人证件号码
   */
  borrowerIdNo: string

  /**
   * 贷款账号
   */
  loanAccountNo: string

  /**
   * 会计凭证号码
   */
  accountingDocumentNo?: string
  /**
   * 借款日期
   */
  borrowTime: string

  /**
   * 到期日期
   */
  expireTime: string

  /**
   * 核销日期
   */
  writeOffDate: string

  /**
   * 借款金额
   */
  loanAmount?: number

  /**
   * 还款金额
   */
  repayAmount?: number

  /**
   * 本金
   */
  capital?: number

  /**
   * 表内利息
   */
  onBalanceSheetInterest?: number

  /**
   * 表外利息
   */
  offBalanceSheetInterest?: number

  /**
   * 应收费用
   */
  charges?: number
}

/**
 * 数据字典规则
 */
export interface BadDebtRule {
  /**
   * 组织ID
   */
  orgId: Array<Object>
  /**
   * 借款人名称
   */
  borrowerName: Array<Object>

  /**
   * 借款人证件号码
   */
  borrowerIdNo: Array<Object>

  /**
   * 贷款账号
   */
  loanAccountNo: Array<Object>

  /**
   * 会计凭证号码
   */
  accountingDocumentNo?: Array<Object>
  /**
   * 借款日期
   */
  borrowTime: Array<Object>

  /**
   * 到期日期
   */
  expireTime: Array<Object>

  /**
   * 核销日期
   */
  writeOffDate: Array<Object>

  /**
   * 借款金额
   */
  loanAmount: Array<Object>

  /**
   * 还款金额
   */
  repayAmount: Array<Object>

  /**
   * 本金
   */
  capital: Array<Object>

  /**
   * 表内利息
   */
  onBalanceSheetInterest: Array<Object>

  /**
   * 表外利息
   */
  offBalanceSheetInterest: Array<Object>

  /**
   * 应收费用
   */
  charges: Array<Object>
}

/**
 * 新增机构规则
 * @constructor
 */
export function useBadDebtRule(): BadDebtRule {
  return {
    orgId: [{ required: true, message: '请选择组织', trigger: 'change' }],
    borrowTime: [{ required: true, message: '请选择借款日期', trigger: 'change' }],
    borrowerIdNo: [{ required: true, message: '请输入借款人证件号码', trigger: 'change' }],
    borrowerName: [{ required: true, message: '借款人名称', trigger: 'change' }],
    capital: [{ required: true, trigger: 'change', validator: validateCapital }],
    charges: [{ required: true, trigger: 'change', validator: validateCharges }],
    expireTime: [{ required: true, message: '请选择到期日期', trigger: 'change' }],
    loanAccountNo: [{ required: true, message: '请输入贷款账号', trigger: 'change' }],
    loanAmount: [
      {
        required: true,
        trigger: 'change',
        validator: validateLoanAmount
      }
    ],
    offBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOffBalanceSheetInterest
      }
    ],
    onBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOnBalanceSheetInterest
      }
    ],
    repayAmount: [
      {
        required: true,
        trigger: 'change',
        validator: validateRepayAmount
      }
    ],
    writeOffDate: [{ required: true, message: '请选择核销日期', trigger: 'change' }]
  }
}

export function useAddBadDebtReq(): AddBadDebtReq {
  return {
    orgId: undefined,
    borrowTime: '',
    borrowerIdNo: '',
    borrowerName: '',
    capital: undefined,
    charges: undefined,
    expireTime: '',
    loanAccountNo: '',
    loanAmount: undefined,
    offBalanceSheetInterest: undefined,
    onBalanceSheetInterest: undefined,
    repayAmount: undefined,
    writeOffDate: ''
  }
}
