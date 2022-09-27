<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery" :types-select="table.typesSelect"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
    <el-table
        v-loading="table.listLoading"
        class="el-table" max-height="600"
        :cell-style="cellClass"
        :header-cell-style="headerClass"
        :data="table.tableData"
        style="width: 100%"
        border
    >
      <el-table-column
          prop="orgName"
          label="所属机构"
      />
      <el-table-column
          prop="creatorName"
          label="登录人"
      />
      <el-table-column
          prop="ip"
          label="登录IP"
      />
      <el-table-column
          prop="createTime"
          label="登录时间"
          :formatter="formatDate"
      />
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
  getList, init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table
} from "@/composables/sys/login-log";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {convertStatusToChinese} from '@/composables/bad-debt/evidence';
import {convertTypeToChinese, handlePreview} from "@/composables/deferred-declaration";

export default {
  name: "SysLoginLog",
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
      convertTypeToChinese, handlePreview
    }
  }
}
</script>

<style scoped>

</style>

