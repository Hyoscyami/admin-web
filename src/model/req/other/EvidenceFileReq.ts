import {FileReq} from './FileReq'

export interface EvidenceFileReq {
    
    id: number
    
    name: string
    
    evidenceList: Array<FileReq>
}

export function useEvidenceFileReq(): EvidenceFileReq {
    return {id: 0, evidenceList: [], name: ''}
}
