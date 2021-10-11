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