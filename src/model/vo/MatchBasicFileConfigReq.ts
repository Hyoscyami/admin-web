export interface MatchBasicFileConfigReq {
  
  id: number
  
  assertType?: number
  
  confirmationConditions?: number
  
  relationType: number
  
  startTime: string
}

export function useMatchBasicFileConfigReq(): MatchBasicFileConfigReq {
  return {
    assertType: undefined,
    confirmationConditions: undefined,
    id: 0,
    relationType: 0,
    startTime: ''
  }
}
