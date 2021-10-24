import request from '../../utils/request'
import { QueryLawsRegulationsReq } from '../../model/req/query/QueryLawsRegulationsReq'
import { AddLawsRegulationsReq } from '../../model/req/add/AddLawsRegulationsReq'
import { UpdateLawsRegulationsReq } from '../../model/req/update/UpdateLawsRegulationsReq'

export function list(data: QueryLawsRegulationsReq) {
  return request({
    url: '/laws-regulations/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function update(data: AddLawsRegulationsReq | UpdateLawsRegulationsReq) {
  return request({
    url: '/laws-regulations/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function updateStatus(data: AddLawsRegulationsReq | UpdateLawsRegulationsReq) {
  return request({
    url: '/laws-regulations/updateStatus',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function add(data: AddLawsRegulationsReq | UpdateLawsRegulationsReq) {
  return request({
    url: '/laws-regulations/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function del(id: number) {
  return request({
    url: '/laws-regulations/delete',
    method: 'get',
    params: { id }
  })
}

export function detail(id: number) {
  return request({
    url: '/laws-regulations/detail',
    method: 'get',
    params: { id }
  })
}
