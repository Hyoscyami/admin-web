export interface UpdateBadDebtReq {
  /**
   * 呆账核销数据id
   */
  id: number
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
  accountingDocumentNo: string

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
  loanAmount: number

  /**
   * 还款金额
   */
  repayAmount: number

  /**
   * 本金
   */
  capital: number

  /**
   * 表内利息
   */
  onBalanceSheetInterest: number

  /**
   * 表外利息
   */
  offBalanceSheetInterest: number

  /**
   * 应收费用
   */
  charges: number
}

/**
 * 初始化呆帐核销数据
 */
export function useBadDebtReq(): UpdateBadDebtReq {
  return {
    accountingDocumentNo: '',
    borrowTime: '',
    borrowerIdNo: '',
    borrowerName: '',
    capital: 0,
    charges: 0,
    expireTime: '',
    id: 0,
    loanAccountNo: '',
    loanAmount: 0,
    offBalanceSheetInterest: 0,
    onBalanceSheetInterest: 0,
    repayAmount: 0,
    writeOffDate: ''
  }
}
