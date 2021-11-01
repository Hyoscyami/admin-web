import {BaseQuery} from '../base/BaseQuery'

/**
 * 呆账核销数据
 */
export interface QueryBadDebtReq extends BaseQuery {
    /**
     * 组织id,即org.id
     */
    orgId?: number

    /**
     * 呆账核销编号
     */
    debtNo?: string

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
     * 会计凭证号码
     */
    accountingDocumentNo?: string
    /**
     * 核销年份
     */
    writeOffYear?: string
    /**
     * 税前扣除年度
     */
    preTaxYear?: string
    /**
     * 申报年度
     */
    declareYear?: string
}

/**
 * 初始化呆账核销
 * @param size
 */
export function useQueryBadDebtReq(size: number): QueryBadDebtReq {
    return {name: '', page: 1, size}
}
