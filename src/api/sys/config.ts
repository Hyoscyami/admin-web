import request from '@/utils/request'
import { AddConfigReq } from '@/model/req/add/AddConfigReq'
import { UpdateConfigReq } from '../../model/req/update/UpdateConfigReq'

export function add(data: AddConfigReq) {
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

export function list(data: UpdateConfigReq) {
  return request({
    url: '/config/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function update(data: UpdateConfigReq) {
  return request({
    url: '/config/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
