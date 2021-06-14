export interface UpdateDictReq {
  /**
   * id
   */
  id: number
  /**
   * 状态，1：启用，2：禁用
   */
  status: number

  /**
   * 父id
   */
  parentId: number

  /**
   * 码值
   */
  code: string

  /**
   * 值
   */
  value: string

  /**
   * 排序，从1开始
   */
  sort: number

  /**
   * 描述
   */
  description: string
}

/**
 * 初始化
 */
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
