// 呆账核销已申报税前扣除表格的展示列
export interface TaxDeductionColumns {
  /** 组织名称 */
  orgName: boolean
  /** 借款人名称 */
  borrowerName: boolean
  /** 借款人证件号码 */
  borrowerIdNo: boolean
  /** 贷款账号 */
  loanAccountNo: boolean
  /** 借款日期 */
  borrowTime: boolean
  /** 到期日期 */
  expireTime: boolean
  /** 资产余额 */
  assetBalance: boolean
  /** 核销本金 */
  capital: boolean
  /** 核销收回本金 */
  revokeCapital: boolean
  /** 核销收回日期 */
  revokeDate: boolean
  /** 表内利息 */
  onBalanceSheetInterest: boolean
  /** 表外利息 */
  offBalanceSheetInterest: boolean
  /** 应收费用 */
  charges: boolean
  /** 核销收回表内利息 */
  revokeOnBalanceSheetInterest: boolean
  /** 核销收回表外利息 */
  revokeOffBalanceSheetInterest: boolean
  /** 核销收回应收费用 */
  revokeCharges: boolean
  /** 会计凭证号码 */
  accountingDocumentNo: boolean
  /** 核销日期 */
  writeOffDate: boolean
  /** 认定条件名称 */
  confirmationConditionsName: boolean
  /** 资产类型名称 */
  assetTypeName: boolean
  /** 税前扣除时间 */
  preTaxYear: boolean
  /** 预警剩余时间，单位为天 */
  warningLeftDays: boolean
  /**
   * 呆账收回状态
   */
  status: boolean
  /**
   * 呆账核销状态
   */
  writeOffStatus: boolean
  /**
   * 关联事项中文名称
   */
  relationTypeName: boolean
  /**
   * 申报年度
   */
  declareYear: boolean
  /**
   * 核销收回会计凭证号
   */
  revokeAccountingDocumentNo: boolean
}

//呆账核销已申报税前扣除查询
export function useTaxDeductionColumns(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetTypeName: true,
    borrowTime: false,
    borrowerIdNo: true,
    borrowerName: true,
    capital: true,
    charges: false,
    confirmationConditionsName: true,
    declareYear: true,
    expireTime: false,
    loanAccountNo: true,
    assetBalance: false,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: true,
    preTaxYear: false,
    revokeCapital: false,
    revokeCharges: false,
    revokeDate: false,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    warningLeftDays: false,
    writeOffDate: true,
    status: false,
    writeOffStatus: true,
    relationTypeName: false
  }
}

//呆账核销未申报税前扣除查询
export function useUnDeclareColumns(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetTypeName: false,
    borrowTime: false,
    borrowerIdNo: true,
    borrowerName: true,
    capital: true,
    writeOffStatus: true,
    charges: false,
    confirmationConditionsName: false,
    expireTime: false,
    loanAccountNo: true,
    declareYear: false,
    assetBalance: true,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: true,
    preTaxYear: false,
    revokeCapital: false,
    revokeCharges: false,
    revokeDate: false,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    warningLeftDays: true,
    writeOffDate: true,
    status: false,
    relationTypeName: true
  }
}

//核销收回已税前扣除查询
export function useRevokeTaxDeductionColumns(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetTypeName: false,
    borrowTime: false,
    writeOffStatus: false,
    borrowerIdNo: true,
    borrowerName: true,
    capital: true,
    charges: false,
    confirmationConditionsName: false,
    expireTime: false,
    loanAccountNo: true,
    assetBalance: true,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: true,
    preTaxYear: false,
    declareYear: true,
    revokeCapital: true,
    revokeCharges: false,
    revokeDate: true,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    warningLeftDays: true,
    writeOffDate: true,
    status: true,
    relationTypeName: true
  }
}

//核销收回未税前扣除查询
export function useRevokeUnDeclareColumns(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetTypeName: false,
    borrowTime: false,
    writeOffStatus: false,
    borrowerIdNo: true,
    borrowerName: true,
    declareYear: false,
    capital: true,
    charges: false,
    confirmationConditionsName: false,
    expireTime: false,
    loanAccountNo: true,
    assetBalance: true,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: true,
    preTaxYear: false,
    revokeCapital: true,
    revokeCharges: false,
    revokeDate: true,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    warningLeftDays: true,
    writeOffDate: true,
    status: true,
    relationTypeName: true
  }
}

//单个债务人全状态查询
export function useFullStatusQuery(): TaxDeductionColumns {
  return {
    accountingDocumentNo: false,
    assetBalance: true,
    assetTypeName: true,
    borrowTime: true,
    borrowerIdNo: true,
    declareYear: false,
    borrowerName: true,
    capital: true,
    charges: false,
    confirmationConditionsName: true,
    expireTime: true,
    loanAccountNo: true,
    offBalanceSheetInterest: false,
    onBalanceSheetInterest: false,
    orgName: false,
    preTaxYear: false,
    relationTypeName: false,
    revokeCapital: true,
    revokeCharges: false,
    revokeDate: true,
    revokeOffBalanceSheetInterest: false,
    revokeOnBalanceSheetInterest: false,
    status: true,
    warningLeftDays: false,
    writeOffDate: true,
    writeOffStatus: true,
    revokeAccountingDocumentNo: false
  }
}
