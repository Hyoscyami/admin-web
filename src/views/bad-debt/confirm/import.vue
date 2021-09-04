<template>
  <el-container>
    <el-main>
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
        <el-table-column label="核销金额" align="center">
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
            <el-button type="text" size="small">
              <router-link :to="{ path: '/bad-debt/confirm/edit',query: { id:scope.row.id }}">编辑
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
          :page.sync="table.listQuery.page"
          :limit.sync="table.listQuery.size"
          @pagination="getList"
      />
      <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="会计核销金额" prop="writeOffAmount">
          <el-col :span="6">
            <el-input v-model="form.writeOffAmount" placeholder="请输入会计核销金额"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <span>当前会计导入金额: </span><span style="color: red;">{{ sumCapital }}</span><span> 元</span>
          </el-col>
        </el-form-item>
      </el-form>
      <el-upload
          action="/api/file/upload"
          multiple
          :headers="headers"
          :limit="1"
          :show-file-list="false"
          :on-exceed="handleExceed"
          :on-success="handleUploadSuccess"
      >
        <el-button size="small" v-show="form.writeOffAmount == sumCapital" type="primary">点击上传会计凭证</el-button>
      </el-upload>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {defineComponent, reactive, ref, unref} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {sumCapitalByAccountingDocumentNo} from "../../../api/bad-debt/confirm";
import {cellClass, headerClass} from "../../../composables/sys/dict";
import Pagination from "../../../components/Pagination/index.vue";
import {useImportAccountReq} from "../../../model/req/other/ImportAccountDocumentReq";
import {getThirdList as getList, thirdTable as table, formatDate} from '@/composables/bad-debt/confirm'
import {handleExceed, handleUploadSuccess} from '@/composables/bad-debt/import'

export default defineComponent({
  name: "BadDebtConfirmImport",
  components: {Pagination},
  setup(props, {attrs, slots, emit}) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    //上传文件的请求头
    const headers = reactive({'X-Auth-Token': store.state.user.token})
    //会计凭证号码
    const accountingDocumentNo = route.query.accountingDocumentNo
    table.listQuery.accountingDocumentNo = accountingDocumentNo
    //表单
    let form = reactive(useImportAccountReq())
    //核销本金总额
    let sumCapital = ref(0)
    const formRef = ref(null)
    //获取核销本金总额
    const getSumCapital = (accountDocumentNo: string) => {
      sumCapitalByAccountingDocumentNo(accountDocumentNo).then((response) => {
        sumCapital.value = response.data
      })
    }
    //表单校验规则
    const rules = {
      writeOffAmount: [
        {
          required: true,
          trigger: 'blur',
          validator: validateWriteOffAmount
        }
      ]
    }

    /**
     * 检验会计核销金额
     * @param _rule
     * @param value
     * @param callback
     */
    function validateWriteOffAmount(
        _rule: any,
        value: number,
        callback: any
    ) {
      if (!value) {
        callback(new Error('会计核销金额必填'))
      }
      if (value < 0) {
        callback(new Error('会计核销金额为负数'))
      }
      if (value != unref(sumCapital)) {
        callback(new Error('会计核销金额和会计导入金额不相等，请检查后再导入'))
      }
      callback()
    }

    //初始化数据
    //刷新列表
    getList()
    //获取核销本金总额
    getSumCapital(accountingDocumentNo)

    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }

    return {
      closeCurrentTag, form, getList, cellClass, headerClass, table, sumCapital, formRef, rules, formatDate,
      handleExceed, handleUploadSuccess, headers
    }
  }
})
</script>

<style scoped>

</style>
