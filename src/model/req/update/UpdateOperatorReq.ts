import { OrgRole } from '../add/AddOperatorReq'

export interface UpdateOperatorReq {
  
  id: number
  
  name: String
  
  username: string
  
  password: String
  
  status: number
  
  orgRoles: Array<OrgRole>
}


export function useUpdateOperatorReq(): UpdateOperatorReq {
  return {
    id: 0,
    name: '',
    orgRoles: [],
    password: '',
    status: 0,
    username: ''
  }
}
