export interface FileReq {
  /**
   * 上传文件名
   */
  name: string
  /**
   * 上传文件路径
   */
  url: string
}

export function useFileReqList(): Array<FileReq> {
  return []
}
