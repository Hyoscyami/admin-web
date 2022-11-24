import { BaseVO } from '../resp/base/BaseVO'
import { OrgRole } from '../req/add/AddOperatorReq'

export interface OperatorVO extends BaseVO {
  
  phone: string
  
  username: String
  
  avatar: string
  
  orgPath: string
  
  orgRoles: Array<OrgRole>
  
  canEdit?: boolean
  
  canDel?: boolean
}


export function useOperatorVO(): OperatorVO {
  return {
    orgPath: '',
    avatar: '',
    phone: '',
    username: '',
    id: 1,
    orgRoles: [],
    name: '张三',
    status: 1,
    statusStr: '',
    sort: 1,
    createTime: '',
    creatorName: '',
    modifyTime: '',
    modifierName: '',
    canEdit: undefined,
    canDel: undefined
  }
}
