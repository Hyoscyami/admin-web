<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" :list-query="table.listQuery" :types-select="table.typesSelect"
                  :years-select="table.yearsSelect" :orgs-select="table.orgsSelect"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
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
      <el-table-column label="已税前申报扣除" align="center">
        <el-table-column
            prop="declareTaxDeductionCount"
            label="笔数"
        />
        <el-table-column
            prop="declareTaxDeductionAmount"
            label="金额"
        />
        <el-table-column
            prop="declareTaxDeductionProportion"
            :formatter="formatProportion"
            label="比例"
        />
      </el-table-column>
      <el-table-column label="未税前申报扣除" align="center">
        <el-table-column
            prop="unDeclareTaxDeductionCount"
            label="笔数"
        />
        <el-table-column
            prop="unDeclareTaxDeductionAmount"
            label="金额"
        />
      </el-table-column>
    </el-table>
    <!--    图形-->
    <div id="main" style="width: 1000px;height:600px;" v-show="table.listQuery.queryType === 2">

    </div>
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
  addFormRef, echart, echartsData, echartXData,
  formatDate,
  formatProportion,
  getList,
  getTableTotal,
  init, initEcharts,
  resetSearchForm,
  searchFormRef,
  searchFormSubmit,
  table
} from "@/composables/statistics/pre-tax-deduction";
import {cellClass, headerClass} from "@/composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import {convertStatusToChinese} from '@/composables/bad-debt/evidence';
import {convertTypeToChinese, handlePreview} from "@/composables/deferred-declaration";
import {onMounted, onUnmounted} from 'vue'

export default {
  name: "StatisticsPreTaxDeduction",
  components: {SearchForm, Pagination},
  setup() {
    // 初始化
    init()
    // onMounted(() => {
    //   initEcharts()
    // })
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
      convertTypeToChinese, handlePreview, formatProportion, getTableTotal, echartsData, echart, echartXData
    }
  }
}
</script>

<style scoped>

</style>
