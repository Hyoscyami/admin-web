export interface AddDictReq {
  
  parentId: number

  
  code: string
  
  name: string
  
  value?: string

  
  sort: number

  
  description?: string

  
  status: number
}


export interface DictRule {
  code: Array<Object>
  name: Array<Object>
  value: Array<Object>
  description: Array<Object>
  status: Array<Object>
  sort: Array<Object>
}


export function useDictRule(): DictRule {
  return {
    code: [
      { required: true, message: '请输入码值', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    name: [{ required: true, message: '请输入字典名称', trigger: 'change' }],
    value: [{ message: '请输入值', trigger: 'change' }],
    description: [{ message: '请输入描述信息', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    sort: [{ required: true, message: '请填写排序值', trigger: 'change' }]
  }
}

export function useAddDictReq(): AddDictReq {
  return {
    code: '',
    description: undefined,
    name: '',
    parentId: 1,
    sort: 0,
    status: 0,
    value: undefined
  }
}
