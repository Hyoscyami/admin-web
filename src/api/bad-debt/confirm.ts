import request from '@/utils/request'
import { UpdateBadDebtReq } from '../../model/req/update/UpdateBadDebtReq'
import { QueryBadDebtReq } from '../../model/req/query/QueryBadDebtReq'
import { AddBadDebtReq } from '../../model/req/add/AddBadDebtReq'
import { ImportAccountDocumentReq } from '../../model/req/other/ImportAccountDocumentReq'

export function del(id: number) {
  return request({
    url: '/bad-debt-write-off/delete',
    method: 'get',
    params: { id }
  })
}

export function detail(id: number) {
  return request({
    url: '/bad-debt-write-off/detail',
    method: 'get',
    params: { id }
  })
}

export function sumCapitalByAccountingDocumentNo(accountDocumentNo: string) {
  return request({
    url: '/bad-debt-write-off/sumCapitalByAccountingDocumentNo',
    method: 'get',
    params: { accountDocumentNo }
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

export function importAccountDocument(data: ImportAccountDocumentReq) {
  return request({
    url: '/bad-debt-write-off/importAccountDocument',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function update(data: AddBadDebtReq | UpdateBadDebtReq) {
  return request({
    url: '/bad-debt-write-off/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function add(data: AddBadDebtReq | UpdateBadDebtReq) {
  return request({
    url: '/bad-debt-write-off/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}
