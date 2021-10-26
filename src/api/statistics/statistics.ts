import { QueryBadDebtReq } from '@/model/req/query/QueryBadDebtReq'
import request from '@/utils/request'
import { QueryBadDebtRevokeReq } from '@/model/req/query/QueryBadDebtRevokeReq'

export function taxDeductionList(data: QueryBadDebtReq) {
  return request({
    url: '/statistics/taxDeductionList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function unDeclareList(data: QueryBadDebtReq) {
  return request({
    url: '/statistics/revoke/taxDeductionList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function revokeUnDeclareList(data: QueryBadDebtRevokeReq) {
  return request({
    url: '/statistics/revoke/unDeclareList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function fullStatusQuery(data: QueryBadDebtReq) {
  return request({
    url: '/statistics/fullStatusQuery',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function preTaxDeduction(data: QueryBadDebtReq) {
  return request({
    url: '/statistics/preTaxDeduction',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
