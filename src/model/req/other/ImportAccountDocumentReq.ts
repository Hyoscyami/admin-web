export interface ImportAccountDocumentReq {
  /**
   * ID，可空
   */
  id?: number
  /** 会计凭证号 */
  accountingDocumentNo: string
  /** 会计核销金额 */
  writeOffAmount?: number
  /**
   * 核销收回税前扣除金额
   */
  revokeAmount?: number
  /** 文件路径 */
  filePath: string
  /** 文件名称 */
  fileName: string
}

export interface ImportAccountDocumentRule {
  writeOffAmount: Array<Object>
}

export function useImportAccountReq(): ImportAccountDocumentReq {
  return { fileName: '', filePath: '', accountingDocumentNo: '', writeOffAmount: undefined }
}
