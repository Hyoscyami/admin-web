import { BaseVO } from '../resp/base/BaseVO'
import { FileVO } from './FileVO'

export interface BadDebtRevokeVO extends BaseVO {
  /** 核销撤回组织id,即org.id */
  orgId: number

  /** 呆账核销借款人名称 */
  borrowerName?: string

  /** 呆账核销借款人证件号码 */
  borrowerIdNo?: string

  /** 呆账核销贷款账号 */
  loanAccountNo: string
  /**
   * 资产余额
   */
  assetBalance?: number
  /**
   * 会计凭证号
   */
  accountingDocumentNo?: string
  /** 呆账核销本金 */
  writeOffCapital: number
  /**
   *核销收回税前扣除金额
   */
  revokeAmount?: number
  /** 核销收回本金 */
  capital: number

  /** 呆账核销日期 */
  writeOffDate: string

  /** 核销收回日期 */
  revokeDate: string
  /** 呆账核销类型 */
  type: number

  /** 核销收回机构编号 */
  orgNo: string
  /** 呆账核销状态 */
  writeOffStatus: number
  /** 所属组织id列表 */
  parentOrgIds: Array<number>
  /**
   * 核销收回会计凭证文件列表
   */
  accountDocumentFiles: Array<FileVO>
}

export function useBadDebtRevokeVO(): BadDebtRevokeVO {
  return {
    writeOffCapital: 0,
    capital: 0,
    createTime: '',
    creatorName: '',
    id: 0,
    loanAccountNo: '',
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    orgNo: '',
    parentOrgIds: [],
    revokeDate: '',
    type: 0,
    writeOffDate: '',
    writeOffStatus: 0,
    accountDocumentFiles: []
  }
}
