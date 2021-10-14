import {BaseVO} from '../resp/base/BaseVO'
import {BadDebtFileVO, useBadDebtFileVO} from './BadDebtFileVO'
import {BasicFileConfigVO} from './BasicFileConfigVO'
import {BadDebtConfirmResultVO} from "./BadDebtConfirmResultVO";

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
    /**
     * 组织路径
     */
    parentOrgIds?: Array<number>
    /**
     * 逾期天数，当前日期-到期日期
     */
    overdueDays?: number
    /**
     * 最新核销确认结果记录
     */
    confirmResultVO?: BadDebtConfirmResultVO
    /**
     *匹配到的基础档案设置
     */
    basicFileConfigVO?: BasicFileConfigVO
    /**
     * 所有基础材料和附加证据
     */
    badDebtFileVO?: BadDebtFileVO
}

export function useBadDebtVO(): BadDebtWriteOffVO {
    return {
        accountingDocumentNo: '',
        borrowTime: '',
        borrowerIdNo: '',
        borrowerName: '',
        capital: 0,
        charges: 0,
        createTime: '',
        creatorName: '',
        debtNo: '',
        expireTime: '',
        id: 0,
        importAmount: 0,
        loanAccountNo: '',
        loanAmount: 0,
        modifierName: '',
        modifyTime: '',
        name: '',
        offBalanceSheetInterest: 0,
        onBalanceSheetInterest: 0,
        orgId: 0,
        orgNo: '',
        repayAmount: 0,
        type: 0,
        writeOffDate: '',
        overdueDays: undefined,
        badDebtFileVO: useBadDebtFileVO()
    }
}
