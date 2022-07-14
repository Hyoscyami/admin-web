import request from "../../utils/request";
import {QueryConfirmConditionsReq} from "../../model/req/query/QueryConfirmConditionsReq";

export function query(data: QueryConfirmConditionsReq) {
    return request({
        url: '/confirmation-condition-rule/listChildrenByCode',
        method: 'post',
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        },
        data: JSON.stringify(data)
    })
}