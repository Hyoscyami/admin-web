import { SelectGroup } from '../query/Table'

export interface UpdatePermissionReq {
  /** id */
  id: number
  /** 权限名称 */
  name: string
  /** 权限类型，1：页面，2：按钮 */
  type: number
  /** 状态，1：启用，2：禁用 */
  status: number
  /** 父id */
  parentId: number
  /** 页面路径 */
  path: string
  /** 组件 */
  component: string
  /** 图标路径 */
  icon: string
  /** 是否隐藏，1：隐藏，0：不隐藏 */
  hidden: boolean
  /** 排序，从1开始 */
  sort: number
}

/**
 * 新增或更新的权限表单
 */
export interface PermissionForm extends UpdatePermissionReq {
  // 表单状态
  formStatus: string
  // 可选权限类型，下拉框使用
  typeSelect: Array<SelectGroup>
  // 可选组件，下拉框使用
  componentSelect: Array<SelectGroup>
  // 图标可选，下拉框使用
  iconSelect: Array<SelectGroup>
  // 状态可选。下拉框使用
  statusSelect: Array<SelectGroup>
}

/**
 * 初始化权限表单
 */
export function usePermissionForm(): PermissionForm {
  return {
    component: '',
    componentSelect: [],
    formStatus: '',
    hidden: false,
    icon: '',
    iconSelect: [],
    id: 0,
    name: '',
    parentId: 0,
    path: '',
    sort: 0,
    status: 0,
    statusSelect: [],
    type: 0,
    typeSelect: []
  }
}
/**
 * 初始化
 */
export function useUpdatePermissionReq(): UpdatePermissionReq {
  return {
    component: '',
    hidden: false,
    icon: '',
    id: 0,
    name: '',
    parentId: 0,
    path: '',
    sort: 1,
    status: 1,
    type: 1
  }
}
