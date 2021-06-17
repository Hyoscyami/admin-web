export interface BaseVO {
  /** id */
  id: number
  /** 名称 */
  name: string
  /** 状态，1：启用，2：禁用 */
  status?: number
  /** 排序值，默认为1 */
  sort?: number
  /** 创建时间 */
  createTime: string
  /** 更新时间 */
  modifyTime: string
  /** 创建人ID */
  creatorName: string
  /** 修改人ID */
  modifierName: string
  /** 状态对应的中文含义 */
  statusStr?: string
}
