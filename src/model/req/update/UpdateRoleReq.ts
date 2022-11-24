export interface UpdateRoleReq {
  
  id: number
  
  parentId?: number
  
  orgId?: string
  
  name: string
  
  sort: number
  
  status: number
  
  permissionIds: Array<number>
}


export function useUpdateRoleReq(): UpdateRoleReq {
  return {
    id: 1,
    name: '',
    permissionIds: [],
    sort: 1,
    status: 1,
    orgId: ''
  }
}
