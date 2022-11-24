export interface AddLawsRegulationsReq {
  
  name: string

  
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
