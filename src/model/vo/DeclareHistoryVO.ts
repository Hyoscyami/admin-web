import {BaseVO} from '../resp/base/BaseVO'

export interface DeclareHistoryVO extends BaseVO {
    /** 申报年度 */
    declareYear: number
    /** 债券性投资损失-资产损失准备金核销金额，等于financeWriteOffAmount */
    debtWriteOffAmount: number
    /** 债券性投资损失-资产计税基础，等于financeLossTaxAmount */
    debtLossTaxAmount: number
    /**
     *金融企业债权性投资损失-资产计税基础，等于loanLossTaxAmount+otherLossTaxAmount
     */
    financeAssetBasicLossTaxAmount: number
    /** 金融企业债权性投资损失-资产损失准备金核销金额，等于loanLossWriteOffAmount+otherLossWriteOffAmount */
    financeReserveWriteOffAmount: number
    /** 债券性投资损失-资产计税基础，等于loanLossTaxAmount+otherLossTaxAmount */
    financeBasicLossTaxAmount: number
    /** 债券性投资损失-资产损失税收金额,等于assetAdjustTaxAmount */
    assetReserveLossTaxAmount: number
    /** 债券性投资损失-纳税调整金额，等于financeAdjustTaxAmount */
    assetAdjustTaxAmount: number
    /** 金融企业债权性投资损失-资产损失税收金额，等于loanLossTaxAmount+otherLossTaxAmount */
    financeLossTaxAmount: number
    /** 金融企业债权性投资损失-纳税调整金额，等于 */
    financeAdjustTaxAmount: number
    /**
     * 贷款损失-资产损失准备金核销金额，等于资产类型为 涉农对公贷款 中小企业贷款 其他非农对公贷款 农户贷款 个人经营贷款 个人消费贷款 银行卡透支
     * 助学贷款，且呆账核销状态为“拟申报税前扣除”和”延后申报税前扣除“的核销金额（本金）的所有数据合计
     */
    loanLossWriteOffAmount: number
    /**
     * 贷款损失-资产计税基础，等于资产类型为 涉农对公贷款 中小企业贷款 其他非农对公贷款 农户贷款 个人经营贷款 个人消费贷款 银行卡透支
     * 助学贷款，且呆账核销状态为“拟申报税前扣除”的所有核销金额（本金）合计
     */
    loanLossTaxAmount: number
    /** 贷款损失-纳税调整金额，等于loanLossWriteOffAmount-loanLossTaxAmount */
    loanLossAdjustTaxAmount: number
    /** 符合条件的涉农和中小企业贷款损失-资产损失准备金核销金额 */
    farmerWriteOffAmount: number
    /** 符合条件的涉农和中小企业贷款损失-资产计税基础 */
    farmerTaxAmount: number
    /** 符合条件的涉农和中小企业贷款损失-纳税调整金额，等于farmerWriteOffAmount-farmerTaxAmount */
    farmerAdjustTaxAmount: number
    /** 单户贷款余额 300 万（含）以下的贷款损失-资产损失准备金核销金额 */
    singleWriteOffAmount: number
    /** 单户贷款余额 300 万（含）以下的贷款损失-资产计税基础 */
    singleTaxAmount: number
    /** 单户贷款余额 300 万（含）以下的贷款损失-纳税调整金额，等于singleWriteOffAmount-singleTaxAmount */
    singleAdjustTaxAmount: number
    /** 单户贷款余额 300 万元至 1000 万元（含）的 贷款损失-资产损失准备金核销金额 */
    singleMiddleWriteOffAmount: number
    /** 单户贷款余额 300 万元至 1000 万元（含）的 贷款损失-资产计税基础 */
    singleMiddleTaxAmount: number
    /** 单户贷款余额 300 万元至 1000 万元（含）的 贷款损失-纳税调整金额，等于singleMiddleWriteOffAmount-singleMiddleTaxAmount */
    singleMiddleAdjustTaxAmount: number
    /** 其他债权性投资损失-资产损失准备金核销金额 */
    otherLossWriteOffAmount: number
    /** 其他债权性投资损失-资产计税基础 */
    otherLossTaxAmount: number
    /** 其他债权性投资损失-纳税调整金额，等于otherLossWriteOffAmount-otherLossTaxAmount */
    otherLossAdjustTaxAmount: number
    /** 账载金额 */
    bookedAmount: number
    /** 税收金额 */
    taxAmount: number
    /** 调增金额 */
    increaseAmount: number
    /** 调减金额 */
    reductionAmount: number
    remark: string
}

export function useDeclareHistoryVO(): DeclareHistoryVO {
    return {
        assetAdjustTaxAmount: 0,
        assetReserveLossTaxAmount: 0,
        bookedAmount: 0,
        createTime: '',
        creatorName: '',
        debtLossTaxAmount: 0,
        debtWriteOffAmount: 0,
        declareYear: 0,
        farmerAdjustTaxAmount: 0,
        farmerTaxAmount: 0,
        farmerWriteOffAmount: 0,
        financeAdjustTaxAmount: 0,
        financeAssetBasicLossTaxAmount: 0,
        financeBasicLossTaxAmount: 0,
        financeLossTaxAmount: 0,
        financeReserveWriteOffAmount: 0,
        id: 0,
        increaseAmount: 0,
        loanLossAdjustTaxAmount: 0,
        loanLossTaxAmount: 0,
        loanLossWriteOffAmount: 0,
        modifierName: '',
        modifyTime: '',
        name: '',
        otherLossAdjustTaxAmount: 0,
        otherLossTaxAmount: 0,
        otherLossWriteOffAmount: 0,
        reductionAmount: 0,
        singleAdjustTaxAmount: 0,
        singleMiddleAdjustTaxAmount: 0,
        singleMiddleTaxAmount: 0,
        singleMiddleWriteOffAmount: 0,
        singleTaxAmount: 0,
        singleWriteOffAmount: 0, remark: "",
        taxAmount: 0
    }
}
