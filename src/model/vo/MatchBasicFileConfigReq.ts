export interface MatchBasicFileConfigReq {
  /** 呆账核销数据id */
  id: number
  /** 资产类型，对应dict表的id */
  assetType?: number
  /** 认定条件，对应dict表的id */
  confirmationConditions?: number
  /** 关联事项类型，对应dict表的id */
  relationType: number
  /** 工作人员手动填写的开始时间 */
  startTime: string
}

export function useMatchBasicFileConfigReq(): MatchBasicFileConfigReq {
  return {
    assetType: undefined,
    confirmationConditions: undefined,
    id: 0,
    relationType: 0,
    startTime: ''
  }
}
