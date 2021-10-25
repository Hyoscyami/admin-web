export interface UpdateBadDebtRevokeReq {
  /** ID */
  id: number
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
  capital: number

  /** 表内利息 */
  onBalanceSheetInterest: number

  /** 表外利息 */
  offBalanceSheetInterest: number

  /** 应收费用 */
  charges: number

  /** 收回日期 */
  revokeDate: string
  //级联选择用
  parentOrgIds?: Array<number>
}

export function useUpdateBadDebtRevokeReq(): UpdateBadDebtRevokeReq {
  return {
    borrowerIdNo: '',
    borrowerName: '',
    capital: 0,
    charges: 0,
    id: 0,
    loanAccountNo: '',
    offBalanceSheetInterest: 0,
    onBalanceSheetInterest: 0,
    orgId: 0,
    revokeDate: ''
  }
}
