import request from '@/utils/request'
import { AddPermissionReq } from '../../model/req/add/AddPermissionReq'
import { QueryPermissionReq } from '../../model/req/query/QueryPermissionReq'
import { UpdatePermissionReq } from '../../model/req/update/UpdatePermissionReq'

export function add(data: AddPermissionReq) {
  return request({
    url: '/permission/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function del(id: number) {
  return request({
    url: '/permission/delete',
    method: 'get',
    params: { id }
  })
}

export function getMaxSort(id: number) {
  return request({
    url: '/permission/getMaxSort',
    method: 'get',
    params: { parentId: id }
  })
}

export function getTree(data: QueryPermissionReq) {
  return request({
    url: '/permission/tree',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
export function update(data: UpdatePermissionReq) {
  return request({
    url: '/permission/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function getPermissions() {
  return request({
    url: '/permission/getByToken',
    method: 'get'
  })
}
