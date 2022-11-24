import { SelectGroup } from '../query/Table'

export interface UpdatePermissionReq {
  
  id: number
  
  name: string
  
  type: number
  
  status: number
  
  parentId: number
  
  path: string
  
  pageName?: string
  
  component: string
  
  icon: string
  
  hidden: boolean
  
  sort: number
}


export interface PermissionForm extends UpdatePermissionReq {

  formStatus: string

  typeSelect: Array<SelectGroup>

  componentSelect: Array<SelectGroup>

  iconSelect: Array<SelectGroup>

  statusSelect: Array<SelectGroup>
}


export function usePermissionForm(): PermissionForm {
  return {
    component: '',
    componentSelect: [],
    formStatus: '',
    hidden: false,
    icon: '',
    iconSelect: [],
    id: 0,
    name: '',
    parentId: 0,
    path: '',
    sort: 0,
    status: 0,
    statusSelect: [],
    type: 0,
    typeSelect: [],
    pageName: undefined
  }
}

export function useUpdatePermissionReq(): UpdatePermissionReq {
  return {
    component: '',
    hidden: false,
    icon: '',
    id: 0,
    name: '',
    parentId: 0,
    path: '',
    sort: 1,
    status: 1,
    type: 1,
    pageName: undefined
  }
}
