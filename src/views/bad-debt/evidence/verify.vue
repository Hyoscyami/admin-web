<template>
  <div class="app-container">
    <el-table
        v-loading="table.listLoading"
        class="el-table"
        :cell-style="cellClass"
        :header-cell-style="headerClass"
        :data="table.tableData"
        style="width: 100%"
        border
    >
      <el-table-column
          prop="borrowerName"
          label="借款人"
      />
      <el-table-column
          prop="borrowerIdNo"
          label="借款人证件号"
      />
      <el-table-column
          prop="loanAccountNo"
          label="贷款账号"
      />
      <el-table-column
          prop="borrowTime"
          label="借款日期"
          :formatter="formatDate"
      />
      <el-table-column
          prop="expireTime"
          label="到期日期"
          :formatter="formatDate"
      />
      <el-table-column
          prop="loanAmount"
          label="借款金额"
      />
      <el-table-column
          prop="repayAmount"
          label="还款金额"
      />
      <el-table-column label="核销金额" align="center">
        <el-table-column
            prop="capital"
            label="本金"
        />
        <el-table-column
            prop="onBalanceSheetInterest"
            label="表内利息"
        />
        <el-table-column
            prop="offBalanceSheetInterest"
            label="表外利息"
        />
        <el-table-column
            prop="charges"
            label="应收费用"
        />
      </el-table-column>
    </el-table>
    <el-form ref="addFormRef" :model="form" label-width="120px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="贷款类型" prop="confirmationConditions">
            <el-select v-model="matchFileConfigReq.assetType" placeholder="请选择贷款类型" @change="matchConfig" clearable>
              <el-option v-for="item in assertTypes" :key="item.id" :label="item.text" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="逾期天数">
            <span style="color: red;">{{ tableVO.overdueDays }}</span> 天
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认定条件" prop="confirmationConditions">
            <el-select v-model="matchFileConfigReq.confirmationConditions" @change="matchConfig" placeholder="请选择认定条件"
                       clearable>
              <el-option v-for="item in confirmConditions" :key="item.id" :label="item.text" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="关联事项类型">
            <span></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="起始时间">
            <el-date-picker
                v-model="tableVO.expireTime"
                :disabled-date="disabledDate"
                type="date"
                format="YYYYMMDD"
                placeholder="请选择起始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import Pagination from "../../../components/Pagination/index.vue";
import {defineComponent, reactive} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {
  addFormRef,
  convertStatusToChinese,
  formatDate, confirmConditions, assertTypes
} from "../../../composables/bad-debt/evidence";
import {init} from '@/composables/bad-debt/evidence';
import {cellClass, headerClass} from "../../../composables/sys/dict";
import SearchForm from "../confirm/components/SearchForm.vue";
import {useBadDebtConfirmReq} from "../../../model/req/other/BadDebtConfirmReq";
import {detail, match} from "../../../api/bad-debt/confirm";
import {ApiResponse} from "../../../model/resp/base/ApiResponse";
import {BadDebtWriteOffVO, useBadDebtVO} from "../../../model/vo/BadDebtWriteOffVO";
import {useMatchBasicFileConfigReq} from "../../../model/vo/MatchBasicFileConfigReq";
import {useTable} from "../../../model/req/query/Table";
import {QueryBadDebtReq, useQueryBadDebtReq} from "../../../model/req/query/QueryBadDebtReq";
import {successMsg} from "../../../utils/common";
import {useBasicFileConfigVO} from "../../../model/vo/BasicFileConfigVO";

export default defineComponent({
  name: "BadDebtEvidenceVerify",
  components: {SearchForm, Pagination},
  setup() {
    // 初始化
    init()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    //待编辑数据的ID
    const id = route.query.id
    //表单
    const form = reactive(useBadDebtConfirmReq())
    //匹配档案
    const matchFileConfigReq = reactive(useMatchBasicFileConfigReq())
    matchFileConfigReq.id = id
    //表格展示
    const tableVO = reactive(useBadDebtVO())
    //获取详情
    detail(id).then((response: ApiResponse<object>) => {
      Object.assign(tableVO, response.data)
    })
    //档案设置
    const basicFileConfigVO = reactive(useBasicFileConfigVO())
    //匹配档案
    const matchConfig = () => {
      //选择了资产类型和认定条件后
      if (matchFileConfigReq.assetType && matchFileConfigReq.confirmationConditions) {
        successMsg("开始匹配基础档案")
        match(matchFileConfigReq).then((response) => {
          if (response.data) {
            Object.assign(response.data, basicFileConfigVO)
          }
        })
      }
    }
    const table = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
    table.listLoading = false
    table.tableData = [tableVO]

    //时间选择，禁用时间
    function disabledDate(time) {
      return time.getTime() > Date.now()
    }

    return {
      table,
      cellClass,
      headerClass,
      convertStatusToChinese, formatDate,
      addFormRef, tableVO, form, matchFileConfigReq, confirmConditions, assertTypes,
      matchConfig, disabledDate, basicFileConfigVO
    }
  }
})
</script>

<style scoped>

</style>
