export interface UpdateLawsRegulationsReq {
  id?: number
  
  name: string

  
  content: string
  
  status: number
}

export function useUpdateLawsRegulationsReq(): UpdateLawsRegulationsReq {
  return { content: '', name: '', status: 0 }
}
