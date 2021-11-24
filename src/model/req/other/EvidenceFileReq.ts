import {FileReq} from './FileReq'

export interface EvidenceFileReq {
    /** 附加证据id，即basic_file_config_evidence.id */
    id: number
    /** 附加证据对应中文名称 */
    name: string
    /** 附加证据文件 列表 */
    evidenceList: Array<FileReq>
}

export function useEvidenceFileReq(): EvidenceFileReq {
    return {id: 0, evidenceList: [], name: ''}
}
