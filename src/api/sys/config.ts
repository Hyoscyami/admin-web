import request from '@/utils/request'
import { AddConfigReq } from '@/model/req/add/AddConfigReq'
import { UpdateConfigReq } from '../../model/req/update/UpdateConfigReq'
import { QueryConfigReq } from '../../model/req/query/QueryConfigReq'

export function add(data: AddConfigReq | UpdateConfigReq) {
  return request({
    url: '/config/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function del(id: number) {
  return request({
    url: '/config/delete',
    method: 'get',
    params: { id }
  })
}

export function getMaxSort() {
  return request({
    url: '/config/getMaxSort',
    method: 'get'
  })
}

export function list(data: QueryConfigReq) {
  return request({
    url: '/config/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function update(data: AddConfigReq | UpdateConfigReq) {
  return request({
    url: '/config/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
