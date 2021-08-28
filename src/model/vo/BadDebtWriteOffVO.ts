import { BaseVO } from '../resp/base/BaseVO'

/**
 * 呆账核销数据
 */
export interface BadDebtWriteOffVO extends BaseVO {
  /** 组织id,即org.id */
  orgId: number

  /** 呆账核销编号 */
  debtNo: string

  /** 借款人名称 */
  borrowerName: string

  /** 借款人证件号码 */
  borrowerIdNo: string

  /** 贷款账号 */
  loanAccountNo: string

  /** 会计凭证号码 */
  accountingDocumentNo: string

  /** 借款日期 */
  borrowTime: string

  /** 到期日期 */
  expireTime: string

  /** 核销日期 */
  writeOffDate: string

  /** 借款金额 */
  loanAmount: number

  /** 还款金额 */
  repayAmount: number

  /** 本金 */
  capital: number

  /** 表内利息 */
  onBalanceSheetInterest: number

  /** 表外利息 */
  offBalanceSheetInterest: number

  /** 应收费用 */
  charges: number

  /** 呆账核销类型 */
  type: number
  /** 机构编号 */
  orgNo: string
  /** 导入金额 */
  importAmount: number
}
