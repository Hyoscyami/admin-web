import { BaseVO } from '../resp/base/BaseVO'

export interface FileVO extends BaseVO {
  /** 关联id，不同的type关联不同的表 */
  relationId: number

  /** 文件类型 */
  type: number

  /** 文件名称 */
  name: string

  /** 文件地址 */
  url: string
}
