import { BaseVO } from '../resp/base/BaseVO'

export interface ImportResultVO extends BaseVO {
  /** 文件名 */
  name: string
  /** 文件路径 */
  filePath: string
  /** 导入结果文件路径，只有fail_count>0时才会有值 */
  resultFilePath: string
  /** 组织ID，即org.id */
  orgId: number
  /**
   * 类型
   */
  type: number
  /** 导入成功数量 */
  successCount: number
  /** 导入失败数量 */
  failCount: number
  /** 导入总条数 */
  count: number
}

/**
 * 初始化
 */
export function useImportResultVO(): ImportResultVO {
  return {
    count: 0,
    createTime: '',
    creatorName: '',
    failCount: 0,
    filePath: '',
    id: 0,
    modifierName: '',
    modifyTime: '',
    name: '',
    orgId: 0,
    resultFilePath: '',
    successCount: 0,
    type: 0
  }
}
