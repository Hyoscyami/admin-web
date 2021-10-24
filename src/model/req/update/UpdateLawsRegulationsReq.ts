export interface UpdateLawsRegulationsReq {
  id?: number
  /** 法律法规名称 */
  name: string

  /** 法律法规内容 */
  content: string
  /**
   * 状态
   */
  status: number
}

export function useUpdateLawsRegulationsReq(): UpdateLawsRegulationsReq {
  return { content: '', name: '', status: 0 }
}
