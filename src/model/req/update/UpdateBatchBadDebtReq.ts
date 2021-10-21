export interface UpdateBatchBadDebtReq {
  ids: Array<number>
  accountingDocumentNo: string
}

export function useUpdateBatchBadDebtReq(): UpdateBatchBadDebtReq {
  return { accountingDocumentNo: '', ids: [] }
}
