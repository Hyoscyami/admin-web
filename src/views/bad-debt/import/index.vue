<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="filter-container">
        <el-form ref="searchFormRef" :model="table.listQuery" :inline="true">
          <el-form-item label="导入文件名称" prop="name">
            <el-input v-model="table.listQuery.name" placeholder="模糊查询名称"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchFormSubmit">查询</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button class="filter-item" type="primary">
          下载导入模板
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
            type="selection"
            width="55"
        />
        <el-table-column
            prop="name"
            label="文件名称"
        />
        <el-table-column
            prop="successCount"
            label="导入成功数量"
        />
        <el-table-column
            prop="failCount"
            label="导入失败数量"
        />
        <el-table-column
            prop="count"
            label="总数量"
        />
        <el-table-column
            prop="status"
            label="状态"
        >
          <template #default="scope">
            {{convertStatusToChinese(scope.row)}}
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="150"
        >
          <template #default="scope">
            <el-button v-if="scope.row.failCount > 0" type="text" size="small">下载错误报告</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
          v-show="table.total>0"
          :total="table.total"
          :page.sync="table.listQuery.page"
          :limit.sync="table.listQuery.size"
          @pagination="getList"
      />
    </el-row>
  </div>
</template>

<script lang="ts">
import Pagination from '@/components/Pagination/index.vue'
import {cellClass, headerClass} from '@/composables/sys/dict'
import {
  getList,
  init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table,
    convertStatusToChinese
} from '@/composables/bad-debt/import'

export default {
  name: 'BadDebtImport',
  components: {Pagination},
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
      convertStatusToChinese
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #283443;
.el-table {
  border: #0e2231 solid 1px;
}
</style>
