<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
    <!--    <div class="filter-container">-->
    <!--      <el-button type="primary">-->
    <!--        <router-link :to="{ name: 'WriteOffRecoverMakeUpAdd'}">新增</router-link>-->
    <!--      </el-button>-->
    <!--    </div>-->
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
          prop="capital"
          label="收回金额（本金）"
      />
      <el-table-column
          prop="accountingDocumentNo"
          label="会计凭证号"
      />
      <el-table-column
          prop="revokeDate"
          label="收回日期"
          :formatter="formatDate"
      />
      <el-table-column
          fixed="right"
          label="操作"
          width="150"
      >
        <el-button type="text" size="small">
          <router-link :to="{ path: '/write-off-recover/make-up/edit',query: { id:scope.row.id }}">编辑
          </router-link>
        </el-button>
        <template #default="scope">
          <el-button type="text" size="small"
                     v-if="scope.row.writeOffStatus === undefined || scope.row.writeOffStatus === null">
            <router-link :to="{ path: '/write-off-recover/make-up/revoke',query: { id:scope.row.id }}">补录
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
  </div>
</template>

<script lang="ts">
import Pagination from "@/components/Pagination/index.vue";
import {
  addFormRef,
  delRow,
  formatDate,
  getList, init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table
} from "@/composables/write-off-recover/make-up";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "@/views/bad-debt/confirm/components/SearchForm.vue";

export default {
  name: "WriteOffRecoverMakeUp",
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
      delRow, addFormRef
    }
  }
}
</script>

<style scoped>

</style>

