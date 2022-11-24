export interface LoginLogVO {

  type: number


  ip: string

  username: string

  phone: string


  orgId: number


  orgName: string


  orgPath: string


  creatorName: string
}

export function useLoginLogVO(): LoginLogVO {
  return {
    creatorName: '',
    ip: '',
    orgId: 0,
    orgName: '',
    orgPath: '',
    phone: '',
    type: 0,
    username: ''
  }
}
