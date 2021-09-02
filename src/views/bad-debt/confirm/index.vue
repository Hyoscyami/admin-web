<template>
  <div class="app-container">
    <div class="filter-container">
      <SearchForm ref="searchFormRef" v-show="currentTab === 'first'" :list-query="table.listQuery"
                  @search-form-submit="searchFormSubmit"
                  @reset-search-form="resetSearchForm"></SearchForm>
      <SearchForm ref="secondSearchFormRef" v-show="currentTab === 'second'" :list-query="secondTable.listQuery"
                  @search-form-submit="searchSecondFormSubmit"
                  @reset-search-form="resetSecondSearchForm"></SearchForm>
    </div>
    <div class="filter-container" v-show="currentTab === 'first'">
      <el-button type="primary" @click="testClose">
        关闭
        <!--        <router-link to="/bad-debt/confirm/add">新增</router-link>-->
      </el-button>
    </div>
    <el-tabs v-model="currentTab" type="card" @tab-click="handleTabClick">
      <el-tab-pane label="完善会计凭证" name="first">
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
              prop="borrowTime"
              label="借款日期"
              :formatter="formatDate"
          />
          <el-table-column
              prop="writeOffDate"
              label="到期日期"
              :formatter="formatDate"
          />
          <el-table-column
              prop="loanAmount"
              label="借款金额"
          />
          <el-table-column
              prop="repayAmount"
              label="还款金额"
          />
          <el-table-column label="核销金额">
            <el-table-column
                prop="capital"
                label="本金"
            />
            <el-table-column
                prop="onBalanceSheetInterest"
                label="表内利息"
            />
            <el-table-column
                prop="offBalanceSheetInterest"
                label="表外利息"
            />
            <el-table-column
                prop="charges"
                label="应收费用"
            />
          </el-table-column>
          <el-table-column
              prop="accountingDocumentNo"
              label="会计凭证号码"
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
            :page.sync="table.listQuery.page"
            :limit.sync="table.listQuery.size"
            @pagination="getList"
        />
      </el-tab-pane>
      <el-tab-pane label="待导入会计凭证" name="second">
        <el-table
            v-loading="secondTable.listLoading"
            class="el-table"
            :cell-style="cellClass"
            :header-cell-style="headerClass"
            :data="secondTable.tableData"
            style="width: 100%"
            border
        >
          <el-table-column
              type="selection"
              width="55"
          />
          <el-table-column
              prop="accountingDocumentNo"
              label="会计凭证号码"
          />
          <el-table-column
              prop="capital"
              label="导入数据金额"
          />
          <el-table-column
              fixed="right"
              label="操作"
              width="150"
          >
            <template #default="scope">
              <el-button type="text" size="small" @click="updateDetail(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>

        <pagination
            v-show="secondTable.total>0"
            :total="secondTable.total"
            :page.sync="secondTable.listQuery.page"
            :limit.sync="secondTable.listQuery.size"
            @pagination="getSecondList"
        />
      </el-tab-pane>
    </el-tabs>
    <!--    新增-->
    <Dialog ref="addFormRef" :dialog="dialog" @cancel-add-form="cancelAddForm" @add-form-submit="addFormSubmit"/>
  </div>
</template>

<script lang="ts">
import Pagination from "../../../components/Pagination/index.vue";
import {
  addFormSubmit,
  cancelAddForm,
  convertStatusToChinese,
  currentTab,
  delRow,
  dialog,
  formatDate,
  getList,
  getSecondList,
  handleTabClick,
  init,
  openAddDialog,
  resetSearchForm,
  resetSecondSearchForm,
  searchFormRef,
  searchFormSubmit,
  searchSecondFormSubmit,
  secondSearchFormRef,
  secondTable,
  secondTableRef,
  table,
  updateDetail, addFormRef
} from "../../../composables/bad-debt/confirm";
import {cellClass, headerClass} from "../../../composables/sys/dict";
import SearchForm from "./components/SearchForm.vue";
import Dialog from "./components/Dialog.vue";
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  name: "BadDebtConfirm",
  components: {Dialog, SearchForm, Pagination},
  setup() {
    // 初始化
    init()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const testClose = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    return {
      table,
      searchFormRef,
      searchFormSubmit,
      resetSearchForm,
      getList,
      cellClass,
      headerClass,
      convertStatusToChinese, currentTab, formatDate, secondTable, secondTableRef, secondSearchFormRef,
      searchSecondFormSubmit, getSecondList, resetSecondSearchForm, handleTabClick, updateDetail,
      delRow, cancelAddForm, dialog, addFormSubmit, openAddDialog, addFormRef, testClose
    }
  }
}
</script>

<style scoped>

</style>
