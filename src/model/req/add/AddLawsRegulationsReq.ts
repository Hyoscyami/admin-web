export interface AddLawsRegulationsReq {
  /** 法律法规名称 */
  name: string

  /** 法律法规内容 */
  content: string
}

export function useAddLawsRegulationsReq(): AddLawsRegulationsReq {
  return { content: '', name: '' }
}

export interface LawsRegulationsRule {
  name: Array<Object>
  content: Array<Object>
}

export function useLawsRegulationsRule(): LawsRegulationsRule {
  return {
    name: [{ required: true, message: '请填写标题', trigger: 'change' }],
    content: [{ required: true, message: '请填写内容', trigger: 'change' }]
  }
}
