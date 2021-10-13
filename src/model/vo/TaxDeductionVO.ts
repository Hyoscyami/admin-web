import {BaseVO} from "../resp/base/BaseVO";

export interface TaxDeductionVO extends BaseVO {
    /** 组织id */
    orgId: number;
    /** 组织名称 */
    orgName: string;
    /** 完整组织名称，本级/../根节点 */
    completeOrgName: string
    /** 借款人名称 */
    borrowerName: string
    /** 借款人证件号码 */
    borrowerIdNo: string
    /** 贷款账号 */
    loanAccountNo: string
    /** 借款日期 */
    borrowTime: string
    /** 到期日期 */
    expireTime: string
    /** 还款金额 */
    repayAmount: number
    /** 借款金额 */
    loanAmount: number
    /** 核销本金 */
    capital: number
    /** 核销收回本金 */
    revokeCapital: number
    /** 核销收回日期 */
    revokeDate: string;
    /** 表内利息 */
    onBalanceSheetInterest: number
    /** 表外利息 */
    offBalanceSheetInterest: number
    /** 应收费用 */
    charges: number
    /** 核销收回表内利息 */
    revokeOnBalanceSheetInterest: number
    /** 核销收回表外利息 */
    revokeOffBalanceSheetInterest: number
    /** 核销收回应收费用 */
    revokeCharges: number
    /** 会计凭证号码 */
    accountingDocumentNo: string
    /** 核销日期 */
    writeOffDate: string
    /** 认定条件名称 */
    confirmationConditionsName: string
    /** 资产类型名称 */
    assetTypeName: string
    /** 税前扣除时间 */
    preTaxDate: string
    /** 预警剩余时间，单位为天 */
    warningLeftDays: number,
    /**
     * 关联事项中文名称
     */
    relationTypeName: string
}

export function useTaxDeductionVO(): TaxDeductionVO {
    return {
        accountingDocumentNo: "",
        assetTypeName: "",
        id: 0,
        borrowTime: "",
        borrowerIdNo: "",
        borrowerName: "",
        capital: 0,
        charges: 0,
        completeOrgName: "",
        confirmationConditionsName: "",
        createTime: "",
        creatorName: "",
        expireTime: "",
        loanAccountNo: "",
        loanAmount: 0,
        modifierName: "",
        modifyTime: "",
        name: "",
        offBalanceSheetInterest: 0,
        onBalanceSheetInterest: 0,
        orgId: 0,
        orgName: "",
        preTaxDate: "",
        repayAmount: 0,
        revokeCapital: 0,
        revokeCharges: 0,
        revokeDate: "",
        revokeOffBalanceSheetInterest: 0,
        revokeOnBalanceSheetInterest: 0,
        warningLeftDays: 0,
        writeOffDate: "",
        relationTypeName: ""
    }
}