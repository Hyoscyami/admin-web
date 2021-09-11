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
          prop="writeOffDate"
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
      <el-form-item label="贷款类型" prop="confirmationConditions">
        <el-select v-model="form.confirmationConditions" placeholder="请选择贷款类型" clearable>
          <el-option v-for="item in confirmConditions" :key="item.id" :label="item.text" :value="item.value"/>
        </el-select>
      </el-form-item>
      <el-form-item label="逾期天数" prop="minAmountWrittenOff">
        <el-input v-model="form.minAmountWrittenOff" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="认定条件" prop="confirmationConditions">
        <el-select v-model="form.confirmationConditions" placeholder="请选择认定条件" clearable>
          <el-option v-for="item in confirmConditions" :key="item.id" :label="item.text" :value="item.value"/>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Pagination from "../../../components/Pagination/index.vue";
import {
  addFormRef,
  addFormSubmit,
  cancelAddForm,
  convertStatusToChinese,
  formatDate,
  getList,
  init,
  table
} from "../../../composables/bad-debt/confirm";
import {cellClass, headerClass} from "../../../composables/sys/dict";
import SearchForm from "../confirm/components/SearchForm.vue";

export default {
  name: "BadDebtEvidenceVerify",
  components: {SearchForm, Pagination},
  setup() {
    // 初始化
    init()
    return {
      table,
      getList,
      cellClass,
      headerClass,
      convertStatusToChinese, formatDate,
      cancelAddForm, addFormSubmit, addFormRef
    }
  }
}
</script>

<style scoped>

</style>
