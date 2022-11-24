export interface AddOrgReq {
  
  type: number
  
  name: string
  
  orgNo: string
  
  parentId: number
  
  status: number
  
  sort: number
}


export interface OrgRule {
  name: Array<Object>
  orgNo: Array<Object>
  type: Array<Object>
  status: Array<Object>
  sort: Array<Object>
}


export function useOrgRule(): OrgRule {
  return {
    name: [{ required: true, message: '请输入机构名称', trigger: 'change' }],
    orgNo: [{ required: true, message: '请输入机构代码', trigger: 'change' }],
    type: [{ required: true, message: '请选择机构类型', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    sort: [{ required: true, message: '请填写排序值', trigger: 'change' }]
  }
}


export function useAddOrgReq(): AddOrgReq {
  return {
    name: '',
    orgNo: '',
    parentId: 1,
    sort: 1,
    status: 1,
    type: 1
  }
}
