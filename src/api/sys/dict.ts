import request from '@/utils/request'
import { AddDictReq } from '../../model/req/add/AddDictReq'
import { UpdateDictReq } from '../../model/req/update/UpdateDictReq'
import { QueryDictReq } from '../../model/req/query/QueryDictReq'

export function add(data: AddDictReq | UpdateDictReq) {
  return request({
    url: '/dict/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function del(id: number) {
  return request({
    url: '/dict/delete',
    method: 'get',
    params: { id }
  })
}

export function getMaxSort(id: number) {
  return request({
    url: '/dict/getMaxSort',
    method: 'get',
    params: { parentId: id }
  })
}

export function list(data: QueryDictReq) {
  return request({
    url: '/dict/list',
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

export function update(data: AddDictReq | UpdateDictReq) {
  return request({
    url: '/dict/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function getDetailByCode(code: string) {
  return request({
    url: '/dict/getDetailByCode',
    method: 'get',
    params: { code }
  })
}
