<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
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
      <el-table-column
          prop="status"
          label="呆账核销状态"
      >
        <template #default="scope">
          {{ convertStatusToChinese(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150"
      >
        <template #default="scope">
          <el-button type="text" size="small">
            <router-link
                :to="{ path: '/bad-debt/evidence/verify',query: { id:scope.row.id }}">
              审核
            </router-link>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="table.total>0"
        :total="table.total"
        v-model:page="table.listQuery.page"
        v-model:limit="table.listQuery.size"
        @pagination="getList"
    />
  </div>
</template>

<script lang="ts">
import Pagination from "../../../components/Pagination/index.vue";
import {
  addFormRef,
  convertStatusToChinese,
  formatDate,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table,
  init, getList
} from "../../../composables/bad-debt/evidence";
import {cellClass, headerClass} from "../../../composables/sys/dict";
import SearchForm from "../confirm/components/SearchForm.vue";

export default {
  name: "BadDebtEvidence",
  components: {SearchForm, Pagination},
  setup() {
    // 初始化
    init()
    return {
      table,
      searchFormRef,
      searchFormSubmit,
      resetSearchForm,
      cellClass,
      headerClass,
      convertStatusToChinese, formatDate,
      addFormRef, getList
    }
  }
}
</script>

<style scoped>

</style>
