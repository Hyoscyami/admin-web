<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form ref="searchFormRef" :model="table.listQuery" :inline="true">
        <el-form-item label="认定条件" prop="type" tabindex="2">
          <el-select v-model="table.listQuery.confirmationConditions" placeholder="请选择认定条件" clearable>
            <el-option v-for="item in confirmConditions" :key="item.id" :label="item.text" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="资产类型" prop="type" tabindex="2">
          <el-select v-model="table.listQuery.assetTypes" placeholder="请选择资产类型" clearable>
            <el-option v-for="item in assertTypes" :key="item.id" :label="item.text" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchFormSubmit">查询</el-button>
          <el-button @click="resetSearchForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="filter-container">
      <el-button type="primary">
        <router-link :to="{ name: 'FileConfigAdd'}">新增</router-link>
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
          prop="confirmationConditionsName"
          label="认定条件"
      />
      <el-table-column
          prop="assetTypeName"
          label="资产类型"
      />
      <el-table-column
          prop="writtenOffAmountStr"
          label="核销金额"
      />
      <el-table-column
          prop="daysOverdueTypeStr"
          label="逾期天数"
      />
      <el-table-column
          fixed="right"
          label="操作"
          width="150"
      >
        <template #default="scope">
          <el-button type="text" size="small">
            <router-link :to="{ path: '/file-config/edit',query: { id:scope.row.id }}">编辑
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
import Pagination from "../../components/Pagination/index.vue";
import {cellClass, headerClass} from "@/composables/sys/dict";
import {
  getList,
  table,
  tableRef,
  searchFormRef,
  searchFormSubmit,
  resetSearchForm, init, confirmConditions, assertTypes
} from '@/composables/basic-file-config'

export default {
  name: "FileConfig",
  components: {Pagination},
  setup(props, {attrs, slots, emit}) {
    // 初始化
    init()
    return {
      getList,
      table,
      tableRef,
      searchFormRef,
      searchFormSubmit,
      resetSearchForm,
      cellClass, headerClass,
      confirmConditions, assertTypes
    }
  }
}
</script>

<style scoped>

</style>
