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
          prop="declareYear"
          label="申报年度"
      />
      <el-table-column
          prop="createTime"
          label="申报时间"
          :formatter="formatDetailDate"
      />
      <el-table-column
          prop="creatorName"
          label="申报人"
      />
      <el-table-column
          prop="status"
          label="申报状态"
      >
        <template #default="scope">
          {{ convertStatus(scope.row.status) }}
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
import Pagination from "@/components/Pagination/index.vue";
import {
  formatDate,
  getList,
  init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table
} from "@/composables/declare-history";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {convertStatus, formatDetailDate} from '@/composables/bad-debt/evidence';

export default {
  name: "DeclarationManagementHistory",
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
      convertStatus, formatDetailDate
    }
  }
}
</script>
