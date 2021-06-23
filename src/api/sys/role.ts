import request from '@/utils/request'
import { AddRoleReq } from '../../model/req/add/AddRoleReq'
import { QueryRoleReq } from '../../model/req/query/QueryRoleReq'
import { UpdateRoleReq } from '../../model/req/update/UpdateRoleReq'

export function add(data: AddRoleReq | UpdateRoleReq) {
  return request({
    url: '/role/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function del(id: number) {
  return request({
    url: '/role/delete',
    method: 'get',
    params: { id }
  })
}

export function getMaxSort(id: number) {
  return request({
    url: '/role/getMaxSort',
    method: 'get',
    params: { orgId: id }
  })
}

export function list(data: QueryRoleReq) {
  return request({
    url: '/role/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function listChildrenById(id: number) {
  return request({
    url: '/listChildrenById',
    method: 'get',
    params: { id }
  })
}

export function listChildrenByCode(code: string) {
  return request({
    url: '/dict/listChildrenByCode',
    method: 'get',
    params: { code }
  })
}

export function update(data: AddRoleReq | UpdateRoleReq) {
  return request({
    url: '/role/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function getDetailByCode(code: string) {
  return request({
    url: '/role/getDetailByCode',
    method: 'get',
    params: { code }
  })
}
