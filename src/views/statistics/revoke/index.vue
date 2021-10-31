<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery" :types-select="table.typesSelect"
                  :years-select="table.yearsSelect"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
    <el-table
        v-loading="table.listLoading"
        class="el-table"
        :cell-style="cellClass"
        :header-cell-style="headerClass"
        :data="table.tableData"
        :summary-method="getTableTotal"
        show-summary
        style="width: 100%"
        border
    >
      <el-table-column
          prop="name"
          label="类型"
      />
      <el-table-column label="核销收回" align="center">
        <el-table-column
            prop="revokeCount"
            label="笔数"
        />
        <el-table-column
            prop="revokeAmount"
            label="金额"
        />
      </el-table-column>
      <el-table-column label="核销收回税前扣除" align="center">
        <el-table-column
            prop="revokedCount"
            label="笔数"
        />
        <el-table-column
            prop="revokedAmount"
            label="金额"
        />
        <el-table-column
            prop="revokedProportion"
            :formatter="formatProportion"
            label="比例"
        />
      </el-table-column>
      <el-table-column label="核销金额未税前扣除" align="center">
        <el-table-column
            prop="unRevokeCount"
            label="笔数"
        />
        <el-table-column
            prop="unRevokeAmount"
            label="金额"
        />
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
import Pagination from "@/components/Pagination/index.vue";
import {
  addFormRef,
  formatDate,
  formatProportion,
  getList,
  getTableTotal,
  init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table
} from "@/composables/statistics/write-off-revoke";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {convertStatusToChinese} from '@/composables/bad-debt/evidence';
import {convertTypeToChinese, handlePreview} from "@/composables/deferred-declaration";

export default {
  name: "StatisticsRevoke",
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
      addFormRef,
      convertStatusToChinese,
      convertTypeToChinese, handlePreview, formatProportion, getTableTotal
    }
  }
}
</script>
