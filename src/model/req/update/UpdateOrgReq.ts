export interface UpdateOrgReq {
  /** id */
  id: number
  /**父ID*/
  parentId: number
  /** 组织类型 */
  type: number
  /** 组织名称 */
  name: string
  /** 状态，1：启用，2：禁用 */
  status: number
  /** 排序值，默认为1 */
  sort: number
}
