<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
    <div class="filter-container">
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
          prop="orgNo"
          label="机构代码"
      />
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
          prop="accountingDocumentNo"
          label="会计凭证号"
      />
      <el-table-column
          prop="writeOffCapital"
          label="核销金额（本金）"
      />
      <el-table-column
          prop="writeOffDate"
          label="核销日期"
          :formatter="formatDate"
      />
      <el-table-column
          prop="capital"
          label="收回金额（本金）"
      />
      <el-table-column
          prop="revokeAmount"
          label="核销收回税前扣除金额"
      />
      <el-table-column
          prop="revokeDate"
          label="收回日期"
          :formatter="formatDate"
      />
      <el-table-column
          prop="writeOffStatus"
          label="呆账核销状态"
      >
        <template #default="scope">
          {{ convertStatusToChinese(scope.row.writeOffStatus) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          label="核销收回状态"
      >
        <template #default="scope">
          {{ convertRevokeStatus(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
      >
        <template #default="scope">
          <el-button type="text" size="small">
            <router-link :to="{ path: '/write-off-recover/make-up/edit',query: { id:scope.row.id }}">编辑
            </router-link>
          </el-button>
          <el-button type="text" size="small" v-if="canOperate(scope.row)">
            <router-link :to="{ path: '/write-off-recover/verify/import',query: { id:scope.row.id }}">操作
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
import Pagination from "@/components/Pagination/index.vue";
import {
  addFormRef,
  delRow,
  formatDate,
  getList,
  init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table,
  convertOperateStatus,
  canOperate,
  convertRevokeStatus,
  dialogVisible,
  cancelAddForm,
  addFormSubmit,
  openDialog,
  updateBatchBadDebtForm, handleSelectionChange
} from "@/composables/write-off-recover/verify";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {convertStatusToChinese} from '@/composables/bad-debt/evidence';


export default {
  name: "WriteOffRecoverVerify",
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
      convertStatusToChinese,
      convertOperateStatus,
      canOperate,
      convertRevokeStatus,
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

