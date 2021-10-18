<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery" :types-select="table.typesSelect"
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
          prop="orgName"
          label="所属机构"
      />
      <el-table-column
          prop="writeOffDate"
          label="核销年度"
          :formatter="formatDate"
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
          prop="status"
          label="文件类型"
      >
        <template #default="scope">
          {{ convertTypeToChinese(scope.row) }}
        </template>
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

          <a :download="`${scope.row.name}`" :href="`${scope.row.url}`">
            <el-button size="small" class="filter-item" type="primary">下载</el-button>
          </a>
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
  addFormRef,
  formatDate,
  getList, init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table
} from "@/composables/file";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {convertStatusToChinese} from '@/composables/bad-debt/evidence';
import {convertTypeToChinese} from "@/composables/deferred-declaration";

export default {
  name: "FileManagement",
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
      convertTypeToChinese
    }
  }
}
</script>

<style scoped>

</style>

