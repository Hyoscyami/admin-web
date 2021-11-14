import request from '../../utils/request'
import { QueryOperatorLogReq } from '../../model/req/query/QueryOperatorLogReq'

export function list(data: QueryOperatorLogReq) {
  return request({
    url: '/operator-log/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
