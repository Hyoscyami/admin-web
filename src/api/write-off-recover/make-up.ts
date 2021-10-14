import request from '@/utils/request'
import {QueryBadDebtRevokeReq} from '../../model/req/query/QueryBadDebtRevokeReq'
import {AddBadDebtRevokeReq} from '../../model/req/add/AddBadDebtRevokeReq'
import {UpdateBadDebtRevokeReq} from '../../model/req/update/UpdateBadDebtRevokeReq'
import {ImportAccountDocumentReq} from '../../model/req/other/ImportAccountDocumentReq'

export function detail(id: number) {
    return request({
        url: '/bad-debt-revoke/detail',
        method: 'get',
        params: {id}
    })
}

export function makeUpList(data: QueryBadDebtRevokeReq) {
    return request({
        url: '/bad-debt-revoke/makeUpList',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data
    })
}

export function verifyListVO(data: QueryBadDebtRevokeReq) {
    return request({
        url: '/bad-debt-revoke/verifyList',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data
    })
}

export function list(data: QueryBadDebtRevokeReq) {
    return request({
        url: '/bad-debt-revoke/list',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data
    })
}

export function add(data: AddBadDebtRevokeReq | UpdateBadDebtRevokeReq) {
    return request({
        url: '/bad-debt-revoke/add',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    })
}

export function del(id: number) {
    return request({
        url: '/bad-debt-revoke/delete',
        method: 'get',
        params: {id}
    })
}

export function update(data: AddBadDebtRevokeReq | UpdateBadDebtRevokeReq) {
    return request({
        url: '/bad-debt-revoke/update',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    })
}

export function importAccountDocument(data: ImportAccountDocumentReq) {
    return request({
        url: '/bad-debt-revoke/importAccountDocument',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    })
}
