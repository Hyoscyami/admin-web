<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
    <div class="filter-container">
      <el-button type="primary">
        <router-link :to="{ name: 'BadDebtConfirmAdd'}">新增</router-link>
      </el-button>
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
      <el-table-column
          prop="accountingDocumentNo"
          label="会计凭证号码"
      />
      <el-table-column
          prop="importAmount"
          label="导入金额"
      />
      <el-table-column
          fixed="right"
          label="操作"
          width="150"
      >
        <template #default="scope">
          <el-button type="text" size="small">
            <router-link :to="{ path: '/bad-debt/confirm/edit',query: { id:scope.row.id }}">编辑
            </router-link>
          </el-button>
          <el-button type="text" size="small">
            <router-link
                :to="{ path: '/bad-debt/confirm/import',query: { accountingDocumentNo:scope.row.accountingDocumentNo }}">
              导入会计凭证
            </router-link>
          </el-button>
          <el-popconfirm
              title="确定删除吗？"
              @confirm="delRow(scope.row)"
          >
            <template #reference>
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <pagination
        v-show="table.total>0"
        :total="table.total"
        :page.sync="table.listQuery.page"
        :limit.sync="table.listQuery.size"
        @pagination="getList"
    />
    <!--    新增-->
    <Dialog ref="addFormRef" :dialog="dialog" @cancel-add-form="cancelAddForm" @add-form-submit="addFormSubmit"/>
  </div>
</template>

<script lang="ts">
import Pagination from "../../../components/Pagination/index.vue";
import {
  addFormRef,
  addFormSubmit,
  cancelAddForm,
  convertStatusToChinese,
  currentTab,
  delRow,
  dialog,
  formatDate,
  getList,
  getSecondList,
  handleTabClick,
  init,
  openAddDialog,
  resetSearchForm,
  resetSecondSearchForm,
  searchFormRef,
  searchFormSubmit,
  searchSecondFormSubmit,
  secondSearchFormRef,
  secondTable,
  secondTableRef,
  table,
  updateDetail
} from "../../../composables/bad-debt/confirm";
import {cellClass, headerClass} from "../../../composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import Dialog from "./components/Dialog.vue";

export default {
  name: "BadDebtConfirm",
  components: {Dialog, SearchForm, Pagination},
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
      convertStatusToChinese, currentTab, formatDate, secondTable, secondTableRef, secondSearchFormRef,
      searchSecondFormSubmit, getSecondList, resetSecondSearchForm, handleTabClick, updateDetail,
      delRow, cancelAddForm, dialog, addFormSubmit, openAddDialog, addFormRef
    }
  }
}
</script>

<style scoped>

</style>
