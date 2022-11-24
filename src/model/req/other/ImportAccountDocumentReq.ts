export interface ImportAccountDocumentReq {
  
  id?: number
  
  accountingDocumentNo: string
  
  writeOffAmount?: number
  
  revokeAmount?: number
  
  filePath: string
  
  fileName: string
}

export interface ImportAccountDocumentRule {
  writeOffAmount: Array<Object>
}

export function useImportAccountReq(): ImportAccountDocumentReq {
  return { fileName: '', filePath: '', accountingDocumentNo: '', writeOffAmount: undefined }
}
