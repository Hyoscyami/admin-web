import { BaseQuery } from '../base/BaseQuery'

export interface QueryBadDebtRevokeReq extends BaseQuery {
  /**
   * 组织id,即org.id
   */
  orgId?: number

  /**
   * 借款人名称
   */
  borrowerName?: string

  /**
   * 借款人证件号码
   */
  borrowerIdNo?: string

  /**
   * 贷款账号
   */
  loanAccountNo?: string
  /**
   * 核销收回年度
   */
  revokeDate?: string
}

/**
 * 初始化呆账核销
 * @param size
 */
export function useQueryBadDebtRevokeReq(size: number): QueryBadDebtRevokeReq {
  return { name: '', page: 1, size }
}
