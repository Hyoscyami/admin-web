import { BaseVO } from '../resp/base/BaseVO'

export interface BasicFileConfigEvidenceVO extends BaseVO {
  /** 档案id，即basic_file_config的id */
  basicFileConfigId: number

  /** 数据字典id,即dict.id */
  dictId: number

  /** 证据名称 */
  name: string

  /** 类型 */
  type: number
}
