import { BaseVO } from '../resp/base/BaseVO'

export interface OperatorLogVO extends BaseVO {
  /** 组织id */
  orgId: number

  /** 组织名称 */
  orgName: string

  /** 组织所属路径 */
  orgPath: string

  /** 操作模块，对应permission.id */
  permissionId: number

  /** 权限名称 */
  permissionName: string

  /** 权限全路径 */
  permissionPath: string

  /** 操作数据id，和各表的主键关联 */
  dataId: number

  /** 操作类型，1：增加，2：删除，3：修改，4：查询 */
  type: number

  /** 操作内容 */
  content: string

  /** 创建人名称 */
  creatorName: string
}

export function useOperatorLogVO(): OperatorLogVO {
  return {
    content: '',
    createTime: '',
    creatorName: '',
    dataId: 0,
    id: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    orgName: '',
    orgPath: '',
    permissionId: 0,
    permissionName: '',
    permissionPath: '',
    type: 0
  }
}
