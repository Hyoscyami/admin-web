export interface AddOrgReq {
  /** 组织类型 */
  type: number
  /** 组织名称 */
  name: string
  /** 机构编号 */
  orgNo: string
  /** 父级id */
  parentId: number
  /** 状态，1：启用，2：禁用 */
  status: number
  /** 排序值，默认为1 */
  sort: number
}

/**
 * 数据字典规则
 */
export interface OrgRule {
  name: Array<Object>
  orgNo: Array<Object>
  type: Array<Object>
  status: Array<Object>
  sort: Array<Object>
}

/**
 * 新增机构规则
 * @constructor
 */
export function useOrgRule(): OrgRule {
  return {
    name: [{ required: true, message: '请输入机构名称', trigger: 'change' }],
    orgNo: [{ required: true, message: '请输入机构代码', trigger: 'change' }],
    type: [{ required: true, message: '请选择机构类型', trigger: 'change' }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    sort: [{ required: true, message: '请填写排序值', trigger: 'change' }]
  }
}

/**
 * 初始化
 */
export function useAddOrgReq(): AddOrgReq {
  return {
    name: '',
    orgNo: '',
    parentId: 1,
    sort: 1,
    status: 1,
    type: 1
  }
}
