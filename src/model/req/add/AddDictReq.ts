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
  code: Array<Object>
  name: Array<Object>
  value: Array<Object>
  description: Array<Object>
  status: Array<Object>
  sort: Array<Object>
}

/**
 * 初始化数据字典表单规则
 */
export function useDictRule(): DictRule {
  return {
    code: [
      { required: true, message: '请输入码值', trigger: 'blur' },
      { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' }
    ],
    name: [{ required: true, message: '请输入字典名称', trigger: 'change' }],
    value: [{ message: '请输入值', trigger: 'change' }],
    description: [{ message: '请输入描述信息', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    sort: [{ required: true, message: '请填写排序值', trigger: 'change' }]
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
