import {
  validateAssetBalance,
  validateCapital,
  validateCharges,
  validateOffBalanceSheetInterest,
  validateOnBalanceSheetInterest
} from '../../../composables/bad-debt/confirm'

export interface AddBadDebtReq {
  
  orgId?: number
  
  borrowerName: string

  
  borrowerIdNo: string

  
  loanAccountNo: string

  
  accountingDocumentNo?: string
  
  borrowTime: string

  
  expireTime: string

  
  writeOffDate: string

  
  assetBalance?: number

  
  capital?: number

  
  onBalanceSheetInterest?: number

  
  offBalanceSheetInterest?: number

  
  charges?: number
  
  parentOrgIds?: Array<number>
  
  status?: number
  
  declareYear?: string
  
  assetType?: number
}


export interface BadDebtRule {
  
  orgId: Array<Object>
  
  borrowerName: Array<Object>

  
  borrowerIdNo: Array<Object>

  
  loanAccountNo: Array<Object>

  
  accountingDocumentNo?: Array<Object>
  
  borrowTime: Array<Object>

  
  expireTime: Array<Object>

  
  writeOffDate: Array<Object>

  
  assetBalance: Array<Object>

  
  capital: Array<Object>

  
  onBalanceSheetInterest: Array<Object>

  
  offBalanceSheetInterest: Array<Object>

  
  charges: Array<Object>
  
  status?: Array<Object>
}


export function useBadDebtRule(): BadDebtRule {
  return {
    orgId: [{ required: true, message: '请选择组织', trigger: 'change' }],
    borrowTime: [{ required: true, message: '请选择借款日期', trigger: 'change' }],
    borrowerIdNo: [{ required: true, message: '请输入借款人证件号码', trigger: 'change' }],
    borrowerName: [{ required: true, message: '借款人名称', trigger: 'change' }],
    capital: [{ required: true, trigger: 'change', validator: validateCapital }],
    charges: [{ required: true, trigger: 'change', validator: validateCharges }],
    expireTime: [{ required: true, message: '请选择到期日期', trigger: 'change' }],
    loanAccountNo: [{ required: true, message: '请输入贷款账号', trigger: 'change' }],
    assetBalance: [
      {
        required: true,
        trigger: 'change',
        validator: validateAssetBalance
      }
    ],
    offBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOffBalanceSheetInterest
      }
    ],
    onBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOnBalanceSheetInterest
      }
    ],
    writeOffDate: [{ required: true, message: '请选择核销日期', trigger: 'change' }]
  }
}


export function useBadDebtRevokeRule(): BadDebtRule {
  return {
    orgId: [{ required: true, message: '请选择组织', trigger: 'change' }],
    status: [{ required: true, message: '请选择呆账核销状态', trigger: 'change' }],
    borrowTime: [{ required: true, message: '请选择借款日期', trigger: 'change' }],
    borrowerIdNo: [{ required: true, message: '请输入借款人证件号码', trigger: 'change' }],
    borrowerName: [{ required: true, message: '借款人名称', trigger: 'change' }],
    capital: [{ required: true, trigger: 'change', validator: validateCapital }],
    charges: [{ required: true, trigger: 'change', validator: validateCharges }],
    expireTime: [{ required: true, message: '请选择到期日期', trigger: 'change' }],
    loanAccountNo: [{ required: true, message: '请输入贷款账号', trigger: 'change' }],
    assetBalance: [
      {
        required: true,
        trigger: 'change',
        validator: validateAssetBalance
      }
    ],
    offBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOffBalanceSheetInterest
      }
    ],
    onBalanceSheetInterest: [
      {
        required: true,
        trigger: 'change',
        validator: validateOnBalanceSheetInterest
      }
    ],
    writeOffDate: [{ required: true, message: '请选择核销日期', trigger: 'change' }]
  }
}

export function useAddBadDebtReq(): AddBadDebtReq {
  return {
    orgId: undefined,
    borrowTime: '',
    borrowerIdNo: '',
    borrowerName: '',
    capital: undefined,
    charges: undefined,
    expireTime: '',
    loanAccountNo: '',
    assetBalance: undefined,
    offBalanceSheetInterest: undefined,
    onBalanceSheetInterest: undefined,
    writeOffDate: ''
  }
}
