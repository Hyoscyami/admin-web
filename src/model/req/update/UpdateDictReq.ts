export interface UpdateDictReq {
  
  id: number
  
  status: number

  
  parentId: number

  
  code: string

  
  value: string

  
  sort: number

  
  description: string
}


export function useUpdateDictReq(): UpdateDictReq {
  return {
    code: '',
    description: '',
    id: 0,
    parentId: 0,
    sort: 0,
    status: 0,
    value: ''
  }
}
