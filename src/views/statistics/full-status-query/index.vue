<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery" :types-select="table.typesSelect"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
    <div class="filter-container">
      <el-button type="primary" @click="openDialog">
        选择展示列
      </el-button>
      <el-button type="primary" @click="exportList" :loading="exportLoading">导出</el-button>
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
          prop="orgName"
          label="所属机构"
          v-if="columns.orgName"
      />
      <el-table-column
          prop="borrowerName"
          label="借款人"
          v-if="columns.borrowerName"
      />
      <el-table-column
          prop="borrowerIdNo"
          label="借款人证件号"
          v-if="columns.borrowerIdNo"
      />
      <el-table-column
          prop="loanAccountNo"
          label="贷款账号"
          v-if="columns.loanAccountNo"
      />
      <el-table-column
          prop="assetBalance"
          label="资产余额"
          v-if="columns.assetBalance"
      />
      <el-table-column
          prop="assetTypeName"
          label="资产类型"
          v-if="columns.assetTypeName"
      />
      <el-table-column
          prop="borrowTime"
          label="借款日期"
          :formatter="formatDay"
          v-if="columns.borrowTime"
      />
      <el-table-column
          prop="expireTime"
          label="到期日期"
          :formatter="formatDay"
          v-if="columns.expireTime"
      />
      <el-table-column
          prop="capital"
          label="核销金额（本金）"
          v-if="columns.capital"
      />
      <el-table-column
          prop="onBalanceSheetInterest"
          label="核销金额（表内利息）"
          v-if="columns.onBalanceSheetInterest"
      />
      <el-table-column
          prop="offBalanceSheetInterest"
          label="核销金额（表外利息）"
          v-if="columns.offBalanceSheetInterest"
      />
      <el-table-column
          prop="revokeOnBalanceSheetInterest"
          label="收回金额（表内利息）"
          v-if="columns.revokeOnBalanceSheetInterest"
      />
      <el-table-column
          prop="revokeOffBalanceSheetInterest"
          label="收回金额（表外利息）"
          v-if="columns.revokeOffBalanceSheetInterest"
      />
      <el-table-column
          prop="charges"
          label="核销金额（应收费用）"
          v-if="columns.charges"
      />
      <el-table-column
          prop="writeOffDate"
          label="核销年度"
          :formatter="formatYear"
          v-if="columns.writeOffDate"
      />
      <el-table-column
          prop="confirmationConditionsName"
          label="认定条件"
          v-if="columns.confirmationConditionsName"
      />
      <el-table-column
          prop="revokeCapital"
          label="收回金额（本金）"
          v-if="columns.revokeCapital"
      />
      <el-table-column
          prop="revokeDate"
          label="收回年度"
          :formatter="formatYear"
          v-if="columns.revokeDate"
      />
      <el-table-column
          prop="preTaxYear"
          label="税前扣除年度"
          v-if="columns.preTaxYear"
      />
      <el-table-column
          prop="accountingDocumentNo"
          label="核销会计凭证"
          v-if="columns.accountingDocumentNo"
      />
      <el-table-column
          prop="revokeAccountingDocumentNo"
          label="收回会计凭证"
          v-if="columns.revokeAccountingDocumentNo"
      />
      <el-table-column
          prop="writeOffStatus"
          label="呆账核销状态"
          v-if="columns.writeOffStatus"
      >
        <template #default="scope">
          {{ convertStatusToChinese(scope.row.writeOffStatus) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          label="核销收回状态"
          v-if="columns.status"
      >
        <template #default="scope">
          {{ convertStatusToChinese(scope.row.status) }}
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
    <el-dialog
        :model-value="dialogVisible"
        title="选择表格展示列"
        :before-close="cancelAddForm"
    >
      <div>
        <el-checkbox label="核销机构" v-model="columns.orgName"></el-checkbox>
        <el-checkbox label="贷款账号" v-model="columns.loanAccountNo"></el-checkbox>
        <el-checkbox label="借款人" v-model="columns.borrowerName"></el-checkbox>
        <el-checkbox label="借款人证件号" v-model="columns.borrowerIdNo"></el-checkbox>
        <el-checkbox label="资产余额" v-model="columns.assetBalance"></el-checkbox>
        <el-checkbox label="核销金额（本金）" v-model="columns.capital"></el-checkbox>
        <el-checkbox label="核销年度" v-model="columns.writeOffDate"></el-checkbox>
        <el-checkbox label="资产类型" v-model="columns.assetTypeName"></el-checkbox>
        <el-checkbox label="认定条件" v-model="columns.confirmationConditionsName"></el-checkbox>
        <el-checkbox label="税前扣除年度" v-model="columns.preTaxYear"></el-checkbox>
        <el-checkbox label="核销收回状态" v-model="columns.status"></el-checkbox>
        <el-checkbox label="呆账核销状态" v-model="columns.writeOffStatus"></el-checkbox>
        <el-checkbox label="借款日期" v-model="columns.borrowTime"></el-checkbox>
        <el-checkbox label="到期日期" v-model="columns.expireTime"></el-checkbox>
        <el-checkbox label="核销金额（表内利息）" v-model="columns.onBalanceSheetInterest"></el-checkbox>
        <el-checkbox label="核销金额（表外利息）" v-model="columns.offBalanceSheetInterest"></el-checkbox>
        <el-checkbox label="核销金额（应收费用）" v-model="columns.charges"></el-checkbox>
        <el-checkbox label="收回金额（表内利息）" v-model="columns.revokeOnBalanceSheetInterest"></el-checkbox>
        <el-checkbox label="收回金额（表外利息）" v-model="columns.revokeOffBalanceSheetInterest"></el-checkbox>
        <el-checkbox label="收回金额（应收费用）" v-model="columns.revokeCharges"></el-checkbox>
        <el-checkbox label="核销会计凭证号码" v-model="columns.accountingDocumentNo"></el-checkbox>
        <el-checkbox label="收回会计凭证号码" v-model="columns.revokeAccountingDocumentNo"></el-checkbox>
      </div>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancelAddForm">关闭</el-button>
            </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Pagination from "@/components/Pagination/index.vue";
import {
  addFormRef,
  formatYear,
  formatDay,
  getList, init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table, taxDeductionColumns, dialogVisible, cancelAddForm, openDialog, exportLoading, exportList, formatDay
} from "@/composables/statistics/full-status-query";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {convertStatusToChinese} from '@/composables/bad-debt/evidence'

export default {
  name: "StatisticsFullStatusQuery",
  components: {SearchForm, Pagination},
  setup() {
    // 初始化
    init()
    return {
      table,
      searchFormRef,
      searchFormSubmit,
      resetSearchForm,
      getList,
      cellClass,
      headerClass,
      formatYear,
      formatDay,
      addFormRef,
      convertStatusToChinese,
      columns: taxDeductionColumns,
      dialogVisible,
      cancelAddForm,
      openDialog,
      exportLoading,
      exportList
    }
  }
}
</script>

<style scoped>

</style>
