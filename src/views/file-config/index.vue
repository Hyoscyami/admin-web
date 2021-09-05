<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="filter-container">
        <el-form ref="searchFormRef" :model="table.listQuery" :inline="true">
          <el-form-item label="导入文件名称" prop="name">
            <el-input v-model="table.listQuery.name" placeholder="模糊查询名称" @keyup.enter.native="searchFormSubmit"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchFormSubmit">查询</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </el-form-item>
        </el-form>
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
            <el-button type="text" size="small" @click="updateDetail(scope.row)">编辑</el-button>
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
    </el-row>
  </div>

</template>

<script lang="ts">
import Pagination from "../../components/Pagination/index.vue";
import {init} from "../../composables/bad-debt/confirm";

export default {
  name: "FileConfig",
  components: {Pagination},
  setup() {
    // 初始化
    init()
    return {}
  }
}
</script>

<style scoped>

</style>
