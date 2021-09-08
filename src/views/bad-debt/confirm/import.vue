<template>
  <el-container>
    <el-main>
      <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="会计核销金额" prop="writeOffAmount">
          <el-col :span="6">
            <el-input v-model="form.writeOffAmount" placeholder="请输入会计核销金额"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <span>当前会计导入金额: </span><span style="color: red;">{{ sumCapital }}</span><span> 元</span>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="10">
            <el-upload
                action="/api/file/upload"
                multiple
                :headers="headers"
                :limit="1"
                :on-exceed="handleExceed"
                :on-success="handleUploadSuccess"
            >

              <el-button size="small" v-show="form.writeOffAmount == sumCapital" type="primary">点击上传会计凭证</el-button>
            </el-upload>
          </el-col>
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
import {defineComponent, reactive, ref, unref} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {importAccountDocument, sumCapitalByAccountingDocumentNo} from "../../../api/bad-debt/confirm";
import {cellClass, headerClass} from "../../../composables/sys/dict";
import Pagination from "../../../components/Pagination/index.vue";
import {useImportAccountReq} from "../../../model/req/other/ImportAccountDocumentReq";
import {formatDate, getThirdList as getList, handleExceed, thirdTable as table} from '@/composables/bad-debt/confirm'
import {ApiResponse} from "../../../model/resp/base/ApiResponse";
import {CommonEnum} from "../../../enums/CommonEnum";
import {errorMsg} from "../../../utils/common";

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
    form.accountingDocumentNo = accountingDocumentNo
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
      form.fileName = file.name
      form.filePath = response.data
    }
    return {
      closeCurrentTag, form, getList, cellClass, headerClass, table, sumCapital, formRef, rules, formatDate,
      handleExceed, handleUploadSuccess, headers, onSubmit
    }
  }
})
</script>

<style scoped>

</style>
