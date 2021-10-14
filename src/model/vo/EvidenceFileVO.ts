import { FileVO } from './FileVO'

export interface EvidenceFileVO {
  id: number
  name: string
  fileVOList: Array<FileVO>
}
