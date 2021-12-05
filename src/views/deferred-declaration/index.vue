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
          prop="writeOffYear"
          label="核销年度"
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
      <el-table-column
          prop="capital"
          label="核销金额本金"
      />
      <el-table-column
          prop="relationTypeName"
          label="关联事项类型"
      />
      <el-table-column
          prop="warningLeftDays"
          label="预警剩余天数"
      />
      <el-table-column
          prop="statusMsg"
          label="呆账核销状态"
      >
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="150"
      >
        <template #default="scope">
          <el-button type="text" size="small" v-if="hasPermission('/deferred-declaration/verify/submit')">
            <router-link
                :to="{ path: '/deferred-declaration/verify',query: { id:scope.row.id }}">
              审核
            </router-link>
          </el-button>
          <el-button type="text" size="small" v-if="hasPermission('/deferred-declaration/upload')">
            <router-link
                :to="{ path: '/deferred-declaration/upload',query: { id:scope.row.id }}">
              上传文件
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
  addFormRef,
  formatDate,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table,
  init, getList
} from "@/composables/deferred-declaration";
import {cellClass, headerClass} from "@/composables/sys/dict";
import {convertStatusToChinese} from '@/composables/bad-debt/evidence';
import SearchForm from "@/views/bad-debt/confirm/components/SearchForm.vue";
import hasPermission from '@/utils/permission'

export default {
  name: "DeferredDeclaration",
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
      addFormRef, getList, hasPermission
    }
  }
}
</script>

<style scoped>

</style>
