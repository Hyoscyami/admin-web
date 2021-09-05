import request from '@/utils/request'
import { QueryBasicFileConfigReq } from '../../model/req/query/QueryBasicFileConfigReq'
import { AddBasicFileConfigReq } from '../../model/req/add/AddBasicFileConfigReq'
import { UpdateBasicFileConfigReq } from '../../model/req/update/UpdateBasicFileConfigReq'

export function del(id: number) {
  return request({
    url: '/basic-file-config/delete',
    method: 'get',
    params: { id }
  })
}

export function detail(id: number) {
  return request({
    url: '/basic-file-config/detail',
    method: 'get',
    params: { id }
  })
}

export function list(data: QueryBasicFileConfigReq) {
  return request({
    url: '/basic-file-config/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function update(data: AddBasicFileConfigReq | UpdateBasicFileConfigReq) {
  return request({
    url: '/basic-file-config/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function add(data: AddBasicFileConfigReq | UpdateBasicFileConfigReq) {
  return request({
    url: '/basic-file-config/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}
