import { BaseVO } from '../resp/base/BaseVO'

export interface StatisticVO extends BaseVO {
  /** 展示名称，可能是贷款类型名称，可能是机构名称 */
  name: string
  /** 已核销呆账笔数，取“呆账核销状态”为“已核销呆账”、“拟申报税前扣除”、“已申报税前扣除”、“延后申报税前扣除”总数 */
  writtenOffCount: number
  /** 已核销呆账金额，取“呆账核销状态”为“已核销呆账”、“拟申报税前扣除”、“已申报税前扣除”、“延后申报税前扣除”本金之和 */
  writtenOffAmount: number
  /** 已申报税前扣除笔数，取“呆账核销状态”为“拟申报税前扣除”和“已申报税前扣除”总数 */
  declareTaxDeductionCount: number
  /** 已申报税前扣除金额，取“呆账核销状态”为“拟申报税前扣除”和“已申报税前扣除”本金之和 */
  declareTaxDeductionAmount: number
  /** 已申报税前扣除比例，（“拟申报税前扣除”金额 + “已申报税前扣除”金额）÷表中“已核销呆账”金额×100% */
  declareTaxDeductionProportion: number
  /** 未申报税前扣除笔数，取“呆账核销状态”为“已核销呆账”、“延后申报税收确认”总数 */
  unDeclareTaxDeductionCount: number
  /** 未申报税前扣除金额，取取“呆账核销状态”为“已核销呆账”、“延后申报税收确认”本金之和 */
  unDeclareTaxDeductionAmount: number
  /** 未申报税前扣除比例，取“呆账核销状态”为“已核销呆账”、“延后申报税收确认”总数 ÷ 已核销呆账金额 */
  unDeclareTaxDeductionProportion: number
  /** 核销收回笔数，总数 */
  revokeCount: number
  /** 核销收回金额， 本金之和 */
  revokeAmount: number
  /** 核销收回税前扣除，总数 */
  revokedCount: number
  /** 核销收回税前扣除， 本金之和 */
  revokedAmount: number
  /** 核销收回比例，核销收回金额除以已核销呆账金额 */
  revokedProportion: number
  /** 核销未收回笔数，已核销呆账笔数-核销收回笔数 */
  unRevokeCount: number
  /** 核销未收回金额， 已核销呆账金额-核销收回金额 */
  unRevokeAmount: number
  /**
   * 核销未收回比例
   */
  unRevokeProportion: number
}

export function useStatisticVO(): StatisticVO {
  return {
    createTime: '',
    creatorName: '',
    declareTaxDeductionAmount: 0,
    declareTaxDeductionCount: 0,
    declareTaxDeductionProportion: 0,
    id: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    revokeAmount: 0,
    revokeCount: 0,
    revokedAmount: 0,
    revokedCount: 0,
    revokedProportion: 0,
    unDeclareTaxDeductionAmount: 0,
    unDeclareTaxDeductionCount: 0,
    unDeclareTaxDeductionProportion: 0,
    unRevokeAmount: 0,
    unRevokeCount: 0,
    writtenOffAmount: 0,
    writtenOffCount: 0
  }
}
