import { FileReq } from './FileReq'

export interface EvidenceFileReq {
  /** 附加证据id，即basic_file_config_evidence.id */
  badDebtEvidenceId: number
  /** 附加证据对应中文名称 */
  evidenceName: string
  /** 附加证据文件 列表 */
  evidenceList: Array<FileReq>
}

export function useEvidenceFileReq(): EvidenceFileReq {
  return { badDebtEvidenceId: 0, evidenceList: [], evidenceName: '' }
}
