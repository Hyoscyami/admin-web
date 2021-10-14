import {BaseVO} from "../resp/base/BaseVO";

export interface BadDebtConfirmResultVO extends BaseVO {
    /** 呆账核销数据ID，即bad_debt_write_off.id */
    badDebtWriteOffId: number;
    /** 基础档案设置id，即basic_file_config.id */
    basicFileConfigId: number;

    /** 认定条件，对应dict表的id */
    confirmationConditions: number;
    /** 认定条件中文名称 */
    confirmationConditionsName: number;
    /** 资产类型，对应dict表的id */
    assetType: number;
    /** 资产类型中文名称 */
    assetTypeName: number;
    /** 起始时间，如果是贷款逾期类型，则为呆账核销数据的到期日期，如果是其他类型，则为页面选择时间 */
    startTime: number;

    type: number;
}