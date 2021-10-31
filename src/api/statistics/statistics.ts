import { QueryBadDebtReq } from '@/model/req/query/QueryBadDebtReq'
import request from '@/utils/request'
import { QueryBadDebtRevokeReq } from '@/model/req/query/QueryBadDebtRevokeReq'
import { QueryStatisticReq } from '../../model/req/query/QueryStatisticReq'

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
    url: '/statistics/unDeclareList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function revokeTaxDeductionList(data: QueryBadDebtRevokeReq) {
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

export function preTaxDeduction(data: QueryStatisticReq) {
  return request({
    url: '/statistics/preTaxDeduction',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function writeOffRevokeCount(data: QueryStatisticReq) {
  return request({
    url: '/statistics/writeOffRevokeCount',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function revokeCount(data: QueryStatisticReq) {
  return request({
    url: '/statistics/revokeCount',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function totalPreTaxDeduction(data: QueryStatisticReq) {
  return request({
    url: '/statistics/totalPreTaxDeduction',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function totalWriteOffRevokeCount(data: QueryStatisticReq) {
  return request({
    url: '/statistics/totalWriteOffRevokeCount',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function listPreTaxDeductionYears() {
  return request({
    url: '/statistics/listPreTaxDeductionYears',
    method: 'get'
  })
}
