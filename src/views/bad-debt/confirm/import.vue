<template>
  <el-container>
    <el-main>
      <el-form ref="formRef" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="会计核销金额" prop="writeOffAmount">
          <el-col :span="6">
            <el-input v-model="form.writeOffAmount" placeholder="请输入会计核销金额"></el-input>
          </el-col>
          <el-col :span="5" :offset="1">
            <span>当前导入核销金额: </span><span style="color: red;">{{ sumCapital }}</span><span> 元</span>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-upload
                action="/api/file/upload"
                multiple
                :headers="headers"
                :limit="1"
                :disabled="uploadDisable"
                :on-exceed="handleExceed"
                :on-preview="handlePreview"
                :on-success="handleUploadSuccess"
            >
              <el-button size="small" :disabled="uploadDisable" type="primary">点击上传会计凭证</el-button>
            </el-upload>
          </el-col>
          <el-col :span="12" :offset="1" v-if="riskTips">
            <span style="color: red;">风险提示: </span><span>会计核销金额大于导入金额，请再次核对</span>
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
import {computed, defineComponent, reactive, ref, unref} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {importAccountDocument, sumCapitalByAccountingDocumentNo} from "../../../api/bad-debt/confirm";
import {cellClass, dialog, headerClass} from "../../../composables/sys/dict";
import Pagination from "../../../components/Pagination/index.vue";
import {useImportAccountReq} from "../../../model/req/other/ImportAccountDocumentReq";
import {formatDate, handleExceed} from '@/composables/bad-debt/confirm'
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
    //表单
    let form = reactive(useImportAccountReq())
    form.accountingDocumentNo = accountingDocumentNo
    //核销本金总额
    let sumCapital = ref(0)
    const formRef = ref(null)
    //上传表单禁用，会计核销金额和导入金额不相等，则禁用
    const uploadDisable = computed(() => {
      return form.writeOffAmount < sumCapital.value
    })
    // 风险提示，会计核销基恩大于导入金额
    const riskTips = computed(() => {
      return form.writeOffAmount > sumCapital.value
    })
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
        callback(new Error('会计核销金额和导入核销金额不相等，请检查后再导入'))
      }
      callback()
    }

    //初始化数据
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
    //预览文件
    const handlePreview = function (file) {
      window.open(file.response.data)
    }
    return {
      closeCurrentTag, form, cellClass, headerClass, sumCapital, formRef, rules, formatDate,
      handleExceed, handleUploadSuccess, headers, onSubmit, uploadDisable, handlePreview, riskTips
    }
  }
})
</script>

<style scoped>

</style>
