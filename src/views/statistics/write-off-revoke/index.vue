<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery" :types-select="table.typesSelect"
                  :years-select="table.yearsSelect" :orgs-select="table.orgsSelect"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
    </div>
    <div class="filter-container">
      <el-button type="primary" @click="exportList" :loading="exportLoading">导出</el-button>
    </div>
    <el-table
        v-loading="table.listLoading"
        class="el-table"
        :cell-style="cellClass"
        :header-cell-style="headerClass"
        :data="table.tableData"
        :summary-method="getTableTotal"
        show-summary
        style="width: 100%"
        border
        v-show="table.listQuery.queryType === 1"
    >
      <el-table-column
          prop="name"
          label="类型"
      />
      <el-table-column label="已核销呆账" align="center">
        <el-table-column
            prop="writtenOffCount"
            label="笔数"
        />
        <el-table-column
            prop="writtenOffAmount"
            label="金额"
        />
      </el-table-column>
      <el-table-column label="核销收回" align="center">
        <el-table-column
            prop="revokeCount"
            label="笔数"
        />
        <el-table-column
            prop="revokeAmount"
            label="金额"
        />
        <el-table-column
            prop="revokedProportion"
            :formatter="formatProportion"
            label="比例"
        />
      </el-table-column>
      <el-table-column label="核销未收回" align="center">
        <el-table-column
            prop="unRevokeCount"
            label="笔数"
        />
        <el-table-column
            prop="unRevokeAmount"
            label="金额"
        />
        <el-table-column
            prop="unRevokeProportion"
            :formatter="formatProportion"
            label="金额"
        />
      </el-table-column>
    </el-table>

    <pagination
        v-show="table.total>0 && table.listQuery.queryType === 1"
        :total="table.total"
        v-model:page="table.listQuery.page"
        v-model:limit="table.listQuery.size"
        @pagination="getList"
    />
    <!--    图形-->
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="echartCount" style="width: 800px;height:600px;" v-show="table.listQuery.queryType === 2">

        </div>
      </el-col>
      <el-col :span="12">
        <div id="echartAmount" style="width: 600px;height:600px;" v-show="table.listQuery.queryType === 2">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Pagination from "@/components/Pagination/index.vue";
import {
  addFormRef,
  formatDate,
  formatProportion,
  getList,
  getTableTotal,
  init,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table, exportList, exportLoading, echart
} from "@/composables/statistics/write-off-revoke";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {convertStatusToChinese} from '@/composables/bad-debt/evidence';
import {convertTypeToChinese, handlePreview} from "@/composables/deferred-declaration";
import {onUnmounted} from 'vue'

export default {
  name: "StatisticsWriteOffRevoke",
  components: {SearchForm, Pagination},
  setup() {
    // 初始化
    init()
    onUnmounted(() => {
      echart.dispose
    })
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
      convertTypeToChinese, handlePreview, formatProportion, getTableTotal, exportList, exportLoading, echart
    }
  }
}
</script>
