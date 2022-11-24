export interface AddPermissionReq {
  
  name: string
  
  parentId: number
  
  type: number
  
  path: string
  
  component: string
  
  icon: string
  
  pageName?: string
  
  hidden: boolean
  
  sort: number
  
  status: number
}


export interface PermissionRule {
  name: Array<Object>
  type: Array<Object>
  path: Array<Object>
  status: Array<Object>
  hidden: Array<Object>
}


export function usePermissionRule(): PermissionRule {
  return {
    name: [{ required: true, message: '请输入权限名称', trigger: 'change' }],
    type: [{ required: true, message: '请选择权限类型', trigger: 'change' }],
    path: [{ required: true, message: '请输入路径', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    hidden: [{ required: true, message: '请选择是否展示', trigger: 'change' }]
  }
}


export function useAddPermissionReq(): AddPermissionReq {
  return {
    component: '',
    hidden: false,
    icon: '',
    name: '',
    parentId: 0,
    path: '',
    sort: 0,
    status: 0,
    type: 0,
    pageName: undefined
  }
}
