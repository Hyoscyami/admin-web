<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
    <div class="filter-container">
      <el-button type="primary">
        <router-link :to="{ name: 'LawsRegulationsAdd'}">新增</router-link>
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
          prop="completePath"
          label="所属机构"
      />
      <el-table-column
          prop="name"
          label="标题"
      />
      <el-table-column
          prop="creatorName"
          label="创建人"
      />
      <el-table-column
          prop="createTime"
          label="创建时间"
          :formatter="formatDate"
      />
      <el-table-column
          prop="modifierName"
          label="最后修改人"
      />
      <el-table-column
          prop="修改时间"
          label="导入时间"
          :formatter="formatDate"
      />
      <el-table-column
          prop="status"
          label="状态"
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
            <router-link :to="{ path: '/laws-regulations/edit',query: { id:scope.row.id }}">编辑
            </router-link>
          </el-button>
          <el-popconfirm
              title="确定发布吗？"
              v-if="scope.row.status === StatusEnum.LAWS_REGULATIONS_UNPUBLISHED"
              @confirm="updateStatus(scope.row)"
          >
            <template #reference>
              <el-button type="text" size="small">
                发布
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
              title="确定下架吗？"
              v-if="scope.row.status === StatusEnum.LAWS_REGULATIONS_PUBLISHED"
              @confirm="updateStatus(scope.row)"
          >
            <template #reference>
              <el-button type="text" size="small">下架
              </el-button>
            </template>
          </el-popconfirm>
          <el-popconfirm
              title="确定上架吗？"
              v-if="scope.row.status === StatusEnum.LAWS_REGULATIONS_OFF_SHELF"
              @confirm="updateStatus(scope.row)"
          >
            <template #reference>
              <el-button type="text" size="small">上架
              </el-button>
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
  formatDate,
  getList, init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table, convertStatusToChinese, updateStatus
} from "@/composables/laws-regulations";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {StatusEnum} from "@/enums/StatusEnum";

export default {
  name: "LawsRegulations",
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
      convertStatusToChinese, updateStatus, StatusEnum
    }
  }
}
</script>

<style scoped>

</style>
