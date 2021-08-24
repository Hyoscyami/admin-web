import { BaseQuery } from '../base/BaseQuery'

/**
 * 呆账核销导入结果
 */
export interface QueryImportResultReq extends BaseQuery {}

/**
 * 初始化
 */
export function useQueryImportResultReq(size: number): QueryImportResultReq {
  return {
    name: '',
    page: 1,
    size,
    status: [],
    types: []
  }
}
