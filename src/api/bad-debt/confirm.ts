import request from '@/utils/request'
import { UpdateBadDebtReq } from '../../model/req/update/UpdateBadDebtReq'
import { QueryBadDebtReq } from '../../model/req/query/QueryBadDebtReq'

export function del(id: number) {
  return request({
    url: '/bad-debt-write-off/delete',
    method: 'get',
    params: { id }
  })
}

export function list(data: QueryBadDebtReq) {
  return request({
    url: '/bad-debt-write-off/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function groupByAccountingDocumentNo(data: QueryBadDebtReq) {
  return request({
    url: '/bad-debt-write-off/groupByAccountingDocumentNo',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function importAccountDocument(data: QueryBadDebtReq) {
  return request({
    url: '/bad-debt-write-off/importAccountDocument',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function update(data: UpdateBadDebtReq) {
  return request({
    url: '/bad-debt-write-off/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}
