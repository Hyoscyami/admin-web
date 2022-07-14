export interface QueryConfirmConditionsReq {
    /**
     * 资产类型ID
     */
    assetTypeId?:number,
    /**
     * 呆账核销ID
     */
    badDebtWriteOffId?:number
}

/**
 * 初始化认定条件查询
 */
export function useQueryConfirmConditionReq():QueryConfirmConditionsReq{
    return {
    }
}