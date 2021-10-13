import {QueryBadDebtReq} from "../../model/req/query/QueryBadDebtReq";
import request from "../../utils/request";

//文档管理
export function docList(data: QueryBadDebtReq) {
    return request({
        url: '/file/docList',
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
        params: {id}
    })
}

export function listBasicMaterials(id: number) {
    return request({
        url: '/file/list/basicMaterials',
        method: 'get',
        params: {id}
    })
}