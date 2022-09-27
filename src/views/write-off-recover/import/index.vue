<template>
  <div class="app-container">
    <el-row :gutter="20">
      <div class="filter-container">
        <!--              <el-form ref="searchFormRef" :model="table.listQuery" :inline="true">-->
        <!--                <el-form-item label="导入文件名称" prop="name">-->
        <!--                  <el-input v-model="table.listQuery.name" placeholder="模糊查询名称" @keyup.enter.native="searchFormSubmit"/>-->
        <!--                </el-form-item>-->
        <!--                <el-form-item>-->
        <!--                  <el-button type="primary" @click="searchFormSubmit">查询</el-button>-->
        <!--                  <el-button @click="resetSearchForm">重置</el-button>-->
        <!--                </el-form-item>-->
        <!--              </el-form>-->
        <el-row>
          <el-button size="small" class="filter-item" type="primary">
            <a download="核销收回导入模板.xlsx" href="/data/template/import-revoke-template.xlsx">下载导入模板</a>
          </el-button>
          <el-upload
              class="upload-demo"
              action="/api/bad-debt-revoke/importData"
              accept=".xls,.xlsx"
              multiple
              :headers="headers"
              :show-file-list="false"
              :on-exceed="handleExceed"
              :on-success="handleUploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <template #tip>
              <span class="el-upload__tip">只能上传 xlsx 文件</span>
            </template>
          </el-upload>
        </el-row>
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
            {{ convertStatusToChinese(scope.row) }}
          </template>
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="导入时间"
            :formatter="formatDate"
        />
        <el-table-column
            fixed="right"
            label="操作"
            width="150"
        >
          <template #default="scope">
            <el-button v-if="scope.row.failCount > 0" type="text" size="small"><a
                :href="`${scope.row.resultFilePath}`" download="`核销数据导入错误报告.xlsx">下载错误报告</a>
            </el-button>
            <el-button type="text" size="small" @click="handlePreview(scope.row.filePath)">查看
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
    </el-row>
  </div>
</template>

<script lang="ts">
import Pagination from '@/components/Pagination/index.vue'
import {cellClass, headerClass} from '@/composables/sys/dict'
import {reactive} from 'vue'
import {useStore} from 'vuex'
import {
  getList,
  init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table,
  convertStatusToChinese, handleExceed, handleUploadSuccess, formatDate
} from '../../../composables/write-off-recover/import'
import {handlePreview} from "../../../composables/bad-debt/import";

export default {
  name: 'WriteOffRecoverImport',
  components: {Pagination},
  setup() {
    // 初始化
    init()
    const store = useStore()
    //上传文件的请求头
    const headers = reactive({'X-Auth-Token': store.state.user.token})
    return {
      table,
      searchFormRef,
      searchFormSubmit,
      resetSearchForm,
      getList,
      cellClass,
      headerClass,
      convertStatusToChinese,
      handleExceed, headers, handleUploadSuccess, formatDate, handlePreview
    }
  }
}
</script>

<style lang="scss" scoped>
$bg: #283443;
.el-table {
  border: #0e2231 solid 1px;
}

.upload-demo {
  margin-left: 20px;
}
</style>
