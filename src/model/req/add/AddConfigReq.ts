export interface AddConfigReq {
  
  code: string
  
  name: string
  
  value?: string

  
  sort: number

  
  description?: string

  
  status: number
}

export interface ConfigRule {
  name: Array<Object>
  code: Array<Object>
  sort: Array<Object>
  value: Array<Object>
  status: Array<Object>
}


export function useConfigRule(): ConfigRule {
  return {
    code: [
      { required: true, message: '请输入码值', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    name: [{ required: true, message: '请输入字典名称', trigger: 'change' }],
    value: [{ message: '请输入值', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    sort: [{ required: true, message: '请填写排序值', trigger: 'change' }]
  }
}

export function useAddConfigReq(): AddConfigReq {
  return { code: '', name: '', sort: 1, status: 1 }
}
