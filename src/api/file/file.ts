import { QueryBadDebtReq } from '../../model/req/query/QueryBadDebtReq'
import request from '../../utils/request'
import { BadDebtConfirmReq } from '../../model/req/other/BadDebtConfirmReq'

//文档管理
export function list(data: QueryBadDebtReq) {
  return request({
    url: '/bad-debt-write-off/list',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data
  })
}

export function listBadDebtAllFiles(id: number) {
  return request({
    url: '/file/list/babDebtAllFiles',
    method: 'get',
    params: { id }
  })
}

export function listAllFiles(id: number) {
  return request({
    url: '/file/list/allFiles',
    method: 'get',
    params: { id }
  })
}

export function listBasicMaterials(id: number) {
  return request({
    url: '/file/list/basicMaterials',
    method: 'get',
    params: { id }
  })
}

export function missMaterialAdd(data: BadDebtConfirmReq) {
  return request({
    url: '/file/missMaterial/add',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: JSON.stringify(data)
  })
}
