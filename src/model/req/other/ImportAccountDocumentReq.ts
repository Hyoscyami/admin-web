export interface ImportAccountDocumentReq {
  /** 核销数据表ID */
  ids: Array<number>
  /** 会计核销金额 */
  writeOffAmount: number
  /** 文件路径 */
  filePath: string
  /** 文件名称 */
  fileName: string
}

export function useImportAccountReq(): ImportAccountDocumentReq {
  return { fileName: '', filePath: '', ids: [], writeOffAmount: 0 }
}
