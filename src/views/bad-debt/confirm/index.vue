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
      <el-button type="primary" @click="openDialog">批量录入会计凭证号</el-button>
    </div>
    <el-table
        v-loading="table.listLoading"
        class="el-table"
        :cell-style="cellClass"
        :header-cell-style="headerClass"
        :data="table.tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        border
    >
      <el-table-column type="selection" width="55"/>
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
          prop="assetBalance"
          label="资产余额"
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
            <router-link v-if="scope.row.accountingDocumentNo"
                         :to="{ path: '/bad-debt/confirm/import',query: { accountingDocumentNo:scope.row.accountingDocumentNo,id:scope.row.id }}">
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
        v-model:page="table.listQuery.page"
        v-model:limit="table.listQuery.size"
        @pagination="getList"
    />
    <el-dialog
        :model-value="dialogVisible"
        title="录入会计凭证号"
        :before-close="cancelAddForm"
    >
      <el-input v-model="updateBatchBadDebtForm.accountingDocumentNo"/>
      <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancelAddForm">关闭</el-button>
              <el-button type="primary" @click="addFormSubmit">确 定</el-button>
            </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Pagination from "../../../components/Pagination/index.vue";
import {
  addFormRef,
  delRow,
  formatDate,
  getList, handleSelectionChange, init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table, dialogVisible, cancelAddForm, addFormSubmit, openDialog, updateBatchBadDebtForm
} from "../../../composables/bad-debt/confirm";
import {cellClass, headerClass} from "../../../composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";

export default {
  name: "BadDebtConfirm",
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
      formatDate,
      delRow,
      addFormRef,
      handleSelectionChange,
      dialogVisible,
      cancelAddForm,
      addFormSubmit,
      openDialog,
      updateBatchBadDebtForm
    }
  }
}
</script>

<style scoped>

</style>
