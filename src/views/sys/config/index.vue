<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="filter-container">
        <el-form ref="searchFormRef" :model="table.listQuery" :inline="true">
          <el-form-item label="名称" prop="name" @keyup.enter.native="searchFormSubmit">
            <el-input v-model="table.listQuery.name" placeholder="名称"/>
          </el-form-item>
          <el-form-item label="码值" prop="code">
            <el-input v-model="table.listQuery.code" placeholder="码值"/>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-select v-model="table.listQuery.status" placeholder="状态" clearable>
              <el-option v-for="item in table.statusSelect" :key="item.id" :label="item.name" :value="item.value"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchFormSubmit">查询</el-button>
            <el-button @click="resetSearchForm">重置</el-button>
          </el-form-item>
        </el-form>
        <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="openAddDialog">
          新增
        </el-button>
      </div>
      <el-table
          v-loading="table.listLoading"
          :data="table.tableData" max-height="600"
          style="width: 100%"
      >
        <el-table-column
            type="selection"
            width="55"
        />
        <el-table-column
            prop="name"
            label="名称"
        />
        <el-table-column
            prop="code"
            label="码值"
        />
        <el-table-column
            prop="value"
            label="值"
        />
        <el-table-column
            prop="description"
            label="描述"
        />
        <el-table-column
            prop="status"
            label="状态"
        >
          <template #default="scope">
            <el-switch
                :model-value="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="updateStatus(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="150"
        >
          <template #default="scope">
            <el-button type="text" size="small" @click="updateDetail(scope.row)">编辑</el-button>
            <el-popconfirm
                title="这是一段内容确定删除吗？"
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
          v-model:limit="table.listQuery.limit"
          @pagination="getList"
      />
      <!--新增或编辑弹框-->
      <el-dialog
          :model-value="dialog.visible"
          :title="dialog.textMap[dialog.dialogStatus]"
          :before-close="cancelDialog"
      >
        <el-form ref="dialogFormRef" :model="dialog.form" :rules="dialog.rules" label-width="80px">
          <el-form-item label="名称" prop="name">
            <el-input v-model="dialog.form.name" autocomplete="off" tabindex="1"/>
          </el-form-item>
          <el-form-item label="码值" prop="code">
            <el-input v-model="dialog.form.code" autocomplete="off" tabindex="2"/>
          </el-form-item>
          <el-form-item label="值" prop="value">
            <el-input v-model="dialog.form.value" autocomplete="off" tabindex="3"/>
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="dialog.form.description" autocomplete="off" tabindex="4"/>
          </el-form-item>
          <el-form-item label="排序值" prop="sort">
            <el-input v-model="dialog.form.sort" autocomplete="off" tabindex="5"/>
          </el-form-item>
          <el-form-item label="状态" prop="status" tabindex="6">
            <el-radio-group v-model="dialog.form.status">
              <el-radio v-model="dialog.form.status" :label="1">启用</el-radio>
              <el-radio v-model="dialog.form.status" :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="cancelDialog">取 消</el-button>
            <el-button type="primary" @click="addFormSubmit">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </el-row>
  </div>
</template>

<script lang="ts">
import Pagination from '@/components/Pagination/index.vue'
import {
  dialog,
  table,
  cancelDialog,
  addFormSubmit,
  updateDetail,
  delRow,
  resetSearchForm,
  openAddDialog,
  getList, searchFormSubmit, updateStatus, init, searchFormRef, dialogFormRef
} from '@/composables/sys/config'

export default {
  name: 'SysConfig',
  components: {Pagination},
  setup() {
    //初始化
    init()
    return {
      table,
      dialog,
      cancelDialog,
      addFormSubmit,
      updateDetail,
      delRow,
      resetSearchForm,
      openAddDialog,
      getList,
      searchFormSubmit, updateStatus, searchFormRef, dialogFormRef
    }
  }
}
</script>

<style scoped>
.tree-box {
  height: 400px;
  overflow: auto;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
