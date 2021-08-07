import request from '@/utils/request'
import { AddOperatorReq } from '../../model/req/add/AddOperatorReq'
import { UpdateOperatorReq } from '../../model/req/update/UpdateOperatorReq'
import { QueryOperatorReq } from '../../model/req/query/QueryOperatorReq'

export function add(data: AddOperatorReq | UpdateOperatorReq) {
  return request({
    url: '/operator/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function del(id: number) {
  return request({
    url: '/operator/delete',
    method: 'get',
    params: { id }
  })
}

export function list(data: QueryOperatorReq) {
  return request({
    url: '/operator/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function update(data: AddOperatorReq | UpdateOperatorReq) {
  return request({
    url: '/operator/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}
