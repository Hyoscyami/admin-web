import {BaseVO} from "../resp/base/BaseVO";

export interface BadDebtConfirmResultVO extends BaseVO {
    
    badDebtWriteOffId: number;
    
    basicFileConfigId: number;

    
    confirmationConditions: number;
    
    confirmationConditionsName: number;
    
    assetType: number;
    
    assetTypeName: number;
    
    startTime: number;

    type: number;
}
