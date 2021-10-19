<template>
  <el-container>
    <el-main>
      <el-row>
        <el-table
            v-loading="table.listLoading"
            class="el-table"
            :cell-style="cellClass"
            :header-cell-style="headerClass"
            :data="table.tableData"
            style="width: 100%;margin-bottom: 20px;"
            border
        >
          <el-table-column
              prop="orgNo"
              label="机构代码"
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
              prop="writeOffCapital"
              label="核销金额（本金）"
          />
          <el-table-column
              prop="writeOffDate"
              label="核销日期"
              :formatter="formatDate"
          />
          <el-table-column
              prop="capital"
              label="收回金额（本金）"
          />
          <el-table-column
              prop="revokeDate"
              label="收回日期"
              :formatter="formatDate"
          />
          <el-table-column
              prop="writeOffStatus"
              label="呆账核销状态"
          >
            <template #default="scope">
              {{ convertStatusToChinese(scope.row.writeOffStatus) }}
            </template>
          </el-table-column>
          <el-table-column
              prop="status"
              label="核销收回状态"
          >
            <template #default="scope">
              {{ convertStatusToChinese(scope.row.status) }}
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="会计凭证号" prop="accountingDocumentNo">
          <el-col :span="6">
            <el-input v-model="form.accountingDocumentNo" placeholder="请输入会计凭证号"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <span>核销收回税前扣除金额: </span><span style="color: red;">{{ deductionAmount }}</span><span> 元</span>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-upload
              action="/api/file/upload"
              multiple
              :headers="headers"
              :limit="1"
              :file-list="tableVO.accountDocumentFiles"
              :on-exceed="handleExceed"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleUploadSuccess"
          >
            <el-button size="small" type="primary">点击上传会计凭证</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-col :span="6">
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button @click="closeCurrentTag">关闭</el-button>
          </el-col>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {defineComponent, onMounted, reactive, ref, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {importAccountDocument} from "../../../api/write-off-recover/make-up";
import {cellClass, headerClass} from "../../../composables/sys/dict";
import Pagination from "../../../components/Pagination/index.vue";
import {useImportAccountReq} from "../../../model/req/other/ImportAccountDocumentReq";
import {formatDate, handleExceed} from '@/composables/write-off-recover/verify'
import {ApiResponse} from "../../../model/resp/base/ApiResponse";
import {CommonEnum} from "../../../enums/CommonEnum";
import {errorMsg} from "../../../utils/common";
import {detail} from "../../../api/write-off-recover/make-up";
import {BadDebtRevokeVO, useBadDebtRevokeVO} from "../../../model/vo/BadDebtRevokeVO";
import {useTable} from "../../../model/req/query/Table";
import {QueryBadDebtRevokeReq, useQueryBadDebtRevokeReq} from "../../../model/req/query/QueryBadDebtRevokeReq";
import {
  convertStatusToChinese
} from "@/composables/write-off-recover/make-up";
import {format} from "../../../utils/time";
import {dialog} from "../../../composables/sys/operator";

export default defineComponent({
  name: "WriteOffRecoverVerifyImport",
  components: {Pagination},
  setup(props, {attrs, slots, emit}) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    //上传文件的请求头
    const headers = reactive({'X-Auth-Token': store.state.user.token})
    //表单
    let form = reactive(useImportAccountReq())
    //待编辑数据的ID
    const id = route.query.id
    form.id = id
    const formRef = ref(null)
    //表格展示
    const tableVO = reactive(useBadDebtRevokeVO())
    //初始化数据
    onMounted(async () => {
      //获取详情
      await detail(id).then((response: ApiResponse<BadDebtRevokeVO>) => {
        Object.assign(tableVO, response.data)
        // @ts-ignore
        form.accountingDocumentNo = response.data.accountingDocumentNo
      })
    })
    // 表格
    const table = useTable<BadDebtRevokeVO, QueryBadDebtRevokeReq>(useQueryBadDebtRevokeReq(20))
    table.listLoading = false
    table.tableData = [tableVO]
    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    // 表单规则
    const rules = []
    //表单提交
    const onSubmit = () => {
      importAccountDocument(form).then((response: ApiResponse<any>) => {
        if (response.code !== CommonEnum.SUCCESS_CODE) {
          errorMsg(response.msg)
        } else {
          closeCurrentTag()
        }
      })
    }
    //上传文件成功
    const handleUploadSuccess = function handleUploadSuccess(response: ApiResponse<string>, file: any, fileList: any) {
      if (response.code !== CommonEnum.SUCCESS_CODE) {
        errorMsg(response.msg)
      }
      tableVO.accountDocumentFiles = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
      form.fileName = file.name
      form.filePath = response.data
    }
    //删除文件
    const handleRemove = function handleRemove(file, fileList) {
      form.applyList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
      form.fileName = undefined
      form.filePath = undefined
    }
    //预览文件
    const handlePreview = function (file) {
      window.open(file.response.data)
    }
    // 核销收回税前扣除金额
    const deductionAmount = computed(() => {
      if (tableVO.capital <= tableVO.writeOffCapital) {
        return tableVO.capital
      }
      return tableVO.writeOffCapital
    })
    return {
      closeCurrentTag,
      form,
      cellClass,
      headerClass,
      formRef,
      rules,
      formatDate,
      handleExceed,
      handleUploadSuccess,
      headers,
      onSubmit,
      handlePreview,
      table,
      tableVO,
      convertStatusToChinese,
      deductionAmount, handleRemove
    }
  }
})
</script>

<style scoped>

</style>
