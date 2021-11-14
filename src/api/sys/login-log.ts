import request from '../../utils/request'
import { QueryOperatorLogReq } from '../../model/req/query/QueryOperatorLogReq'
import { QueryLoginLogReq } from '../../model/req/query/QueryLoginLogReq'

export function list(data: QueryLoginLogReq) {
  return request({
    url: '/login-log/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
