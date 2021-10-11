import {BaseVO} from "../resp/base/BaseVO";

export interface DocManageVO extends BaseVO {
    /** 组织id,即org.id */
    orgId?: number
    /** 机构编号 */
    orgNo: string
    /** 机构名称 */
    orgName: string
    /**
     * 核销年度
     */
    writeOffDate: string
    /** 借款人名称 */
    borrowerName: string
    /** 借款人证件号码 */
    borrowerIdNo: string
    /** 贷款账号 */
    loanAccountNo: string
    /**
     * 文件类型
     */
    type: number
    /** 文件名称 */
    name: string
    /** 文件地址 */
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