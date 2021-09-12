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
    <el-form ref="addFormRef" :model="form" :rules="rules" label-width="120px">
      <el-col :span="8">
        <el-form-item label="贷款类型" prop="confirmationConditions">
          <el-select v-model="matchFileConfigReq.assetType" placeholder="请选择贷款类型" @change="matchConfig" clearable>
            <el-option v-for="item in assertTypes" :key="item.id" :label="item.text" :value="item.value"/>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="逾期天数" prop="minAmountWrittenOff">
          <el-input v-model="tableVO.overdueDays" :disabled="true"></el-input>
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
  formatDate,
} from "../../../composables/bad-debt/confirm";
import {confirmConditions, assertTypes} from '@/composables/basic-file-config'
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
    //匹配档案
    const matchConfig = () => {
      if (matchFileConfigReq.assetType && matchFileConfigReq.confirmationConditions) {
        match(matchFileConfigReq).then((response) => {

        })
      }
    }
    const table = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
    table.listLoading = false
    table.tableData = [tableVO]
    return {
      table,
      cellClass,
      headerClass,
      convertStatusToChinese, formatDate,
      addFormRef, tableVO, form, matchFileConfigReq, confirmConditions, assertTypes,
      matchConfig
    }
  }
})
</script>

<style scoped>

</style>
