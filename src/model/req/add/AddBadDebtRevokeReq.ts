import {
  validateCapital,
  validateCharges,
  validateOffBalanceSheetInterest,
  validateOnBalanceSheetInterest
} from '../../../composables/write-off-recover/make-up'

export interface AddBadDebtRevokeReq {
  
  orgId?: number

  
  borrowerName: string

  
  borrowerIdNo: string

  
  loanAccountNo: string

  
  accountingDocumentNo?: string

  
  capital?: number

  
  onBalanceSheetInterest?: number

  
  offBalanceSheetInterest?: number

  
  charges?: number

  
  revokeDate?: string
}

export function useAddBadDebtRevokeReq(): AddBadDebtRevokeReq {
  return {
    borrowerIdNo: '',
    borrowerName: '',
    loanAccountNo: ''
  }
}

export interface RevokeRule {
  
  orgId: Array<Object>

  
  borrowerName: Array<Object>

  
  borrowerIdNo: Array<Object>

  
  loanAccountNo: Array<Object>

  
  accountingDocumentNo: Array<Object>

  
  capital: Array<Object>

  
  onBalanceSheetInterest: Array<Object>

  
  offBalanceSheetInterest: Array<Object>

  
  charges: Array<Object>

  
  revokeDate: Array<Object>
}

export function useRevokeRule(): RevokeRule {
  return {
    accountingDocumentNo: [{ required: true, message: '请填写会计凭证号', trigger: 'change' }],
    borrowerIdNo: [{ required: true, message: '请填写借款人证件号码', trigger: 'change' }],
    borrowerName: [{ required: true, message: '请填写借款人名称', trigger: 'change' }],
    capital: [
      {
        required: true,
        trigger: 'change',
        validator: validateCapital
      }
    ],
    charges: [
      {
        required: true,
        trigger: 'change',
        validator: validateCharges
      }
    ],
    loanAccountNo: [{ required: true, message: '请输入贷款账号', trigger: 'change' }],
    offBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOnBalanceSheetInterest
      }
    ],
    onBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOffBalanceSheetInterest
      }
    ],
    orgId: [{ required: true, message: '请选择组织', trigger: 'change' }],
    revokeDate: [{ required: true, message: '请选择收回日期', trigger: 'change' }]
  }
}
