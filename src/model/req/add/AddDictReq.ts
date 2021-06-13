export interface AddDictReq {
  /**
   * 父id
   */
  parentId: number

  /**
   * 码值
   */
  code: string
  /**
   * 字段名称
   */
  name: string
  /**
   * 值
   */
  value?: string

  /**
   * 排序，从1开始
   */
  sort: number

  /**
   * 描述
   */
  description?: string

  /**
   * 是否启用，1：启用，0：禁用
   */
  status: number
}

/**
 * 数据字典规则
 */
export interface DictRule {
  code: []
  name: []
  value: []
  description: []
  status: []
  sort: []
}

/**
 * 初始化数据字典表单规则
 */
export function useDictRule(): DictRule {
  return {
    code: [],
    description: [],
    name: [],
    sort: [],
    status: [],
    value: []
  }
}
/**
 * 初始化新增的数据字典
 */
export function useAddDictReq(): AddDictReq {
  return {
    code: '',
    description: undefined,
    name: '',
    parentId: 1,
    sort: 0,
    status: 0,
    value: undefined
  }
}
