<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery" :types-select="table.typesSelect"
                  :orgs-select="table.orgsSelect"
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
          prop="declareYear"
          label="申报年度"
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
          prop="fileCompleteStatus"
          label="文档完善状态"
      >
        <template #default="scope">
          {{ convertFileCompleteStatus(scope.row) }}
        </template>
      </el-table-column>
      <el-table-column
          prop="status"
          label="呆账核销状态"
      >
        <template #default="scope">
          {{ convertStatusToChinese(scope.row.status) }}
        </template>
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150"
      >
        <template #default="scope">
          <el-button type="text" size="small">
            <router-link :to="{ path: '/file-management/detail',query: { id:scope.row.id }}">详情
            </router-link>
          </el-button>
          <el-button type="text" size="small"
                     v-if="(scope.row.status === 3 || scope.row.status === 15) && hasPermission('/file-management/edit')">
            <router-link :to="{ path: '/file-management/edit',query: { id:scope.row.id }}">编辑
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
import Pagination from "@/components/Pagination/index.vue";
import {
  addFormRef, convertFileCompleteStatus,
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
import {convertTypeToChinese, handlePreview} from "@/composables/deferred-declaration";
import hasPermission from '@/utils/permission'

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
      convertTypeToChinese, handlePreview, convertFileCompleteStatus, hasPermission
    }
  }
}
</script>

<style scoped>

</style>

