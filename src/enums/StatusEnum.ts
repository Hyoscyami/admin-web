export enum StatusEnum {
    /**
     * 数据导入
     */
    IMPORTED = 1,
    /**
     *已核销呆账
     */
    WRITTEN_OFF = 2,
    /**
     * 拟申报税前扣除
     */
    PRE_TAX_DEDUCTION = 3,
    /**
     * 等待逾期时间满1年
     */
    WAITING_OVERDUE_ONE_YEAR = 4,
    /**
     *等待宣告破产满3年
     */
    WAITING_BANKRUPTCY_THREE_YEARS = 5,
    /**
     *等待关闭、解散或撤销满3年
     */
    WAITING_CLOSE_THREE_YEARS = 6,
    /**
     * 等待注销、吊销满3年
     */
    WAITING_REVOKE_THREE_YEARS = 7,
    /**
     *等待停止经营活动或下落不明满3年
     */
    WAITING_STOP_OPERATION_THREE_YEARS = 8,
    /**
     *等待自然人死亡满3年
     */
    WAITING_DEATH_THREE_YEARS = 9,
    /**
     * 等待丧失能力满3年
     */
    WAITING_INCAPACITATED_THREE_YEARS = 10,
    /**
     *等待自然人失踪满3年
     */
    WAITING_MISSING_THREE_YEARS = 11,
    /**
     *等待侦查时间满2年
     */
    WAITING_INVESTIGATION_TWO_YEARS = 12,
    /**
     *等待补充证据
     */
    WAITING_EVIDENCE_YEARS = 13,
    /**
     *等待诉诸法律
     */
    WAITING_LAW_YEARS = 14,
    /**
     * 已申报税前扣除
     */
    DECLARE_PRE_TAX_DEDUCTION = 15,
    //延后申报税前扣除
    WAITING_DECLARE = 16,
    // 核销收回审核成功
    REVOKE_VERIFY_SUCCESS = 17,
    //法律法规
    //未发布
    LAWS_REGULATIONS_UNPUBLISHED = 1,
    //已发布
    LAWS_REGULATIONS_PUBLISHED = 2,
    //已下架
    LAWS_REGULATIONS_OFF_SHELF = 3
}
