import request from '@/utils/request'
import { AddOrgReq } from '../../model/req/add/AddOrgReq'
import { ApiResponse } from '../../model/resp/base/ApiResponse'
import { Page } from '../../model/resp/base/Page'
import { OrgVO } from '../../model/resp/vo/OrgVO'
import { UpdateOrgReq } from '../../model/req/update/UpdateOrgReq'

export function add(data: AddOrgReq) {
  return request({
    url: '/org/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function del(id: number) {
  return request({
    url: '/org/delete',
    method: 'get',
    params: { id }
  })
}

export function getMaxSort(id: number) {
  return request({
    url: '/org/getMaxSort',
    method: 'get',
    params: { parentId: id }
  })
}

export function list(data: ApiResponse<Page<OrgVO>>) {
  return request({
    url: '/org/list',
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

export function update(data: UpdateOrgReq) {
  return request({
    url: '/org/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function getDetailByCode(code: string) {
  return request({
    url: '/org/getDetailByCode',
    method: 'get',
    params: { code }
  })
}
