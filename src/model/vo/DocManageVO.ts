import {BaseVO} from "../resp/base/BaseVO";

export interface DocManageVO extends BaseVO {
    
    orgId?: number
    
    orgNo: string
    
    orgName: string
    
    writeOffDate: string
    
    borrowerName: string
    
    borrowerIdNo: string
    
    loanAccountNo: string
    
    type: number
    
    name: string
    
    url: string
}

export function userDocManageVO(): DocManageVO {
    return {
        borrowerIdNo: "",
        borrowerName: "",
        createTime: "",
        creatorName: "",
        id: 0,
        loanAccountNo: "",
        modifierName: "",
        modifyTime: "",
        name: "",
        orgName: "",
        orgNo: "",
        type: 0,
        url: "",
        writeOffDate: ""
    }
}
