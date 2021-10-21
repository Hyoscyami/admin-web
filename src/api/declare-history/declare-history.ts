import request from '../../utils/request'
import { QueryDeclareHistoryReq } from '../../model/req/query/QueryDeclareHistoryReq'

export function list(data: QueryDeclareHistoryReq) {
  return request({
    url: '/declare-history/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function detail(id: number) {
  return request({
    url: '/declare-history/detail',
    method: 'get',
    params: { id }
  })
}
