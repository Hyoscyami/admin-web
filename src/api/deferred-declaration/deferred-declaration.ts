import { QueryBadDebtReq } from '@/model/req/query/QueryBadDebtReq'
import request from '@/utils/request'

export function list(data: QueryBadDebtReq) {
  return request({
    url: '/bad-debt-write-off/waitingList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function declare(year: string) {
  return request({
    url: '/bad-debt-write-off/declare',
    method: 'get',
    params: { year }
  })
}

export function declareDetail(year: string) {
  return request({
    url: '/bad-debt-write-off/declare/detail',
    method: 'get',
    params: { year }
  })
}
