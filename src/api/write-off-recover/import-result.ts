import request from '@/utils/request'
import { AddOrgReq } from '../../model/req/add/AddOrgReq'
import { UpdateOrgReq } from '../../model/req/update/UpdateOrgReq'
import { QueryImportResultReq } from '../../model/req/query/QueryImportResultReq'

export function list(data: QueryImportResultReq) {
  return request({
    url: '/bad-debt-revoke/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}

export function update(data: AddOrgReq | UpdateOrgReq) {
  return request({
    url: '/org/update',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}
