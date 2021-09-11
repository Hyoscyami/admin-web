<template>
  <el-container>
    <el-main>
      <el-form ref="addFormRef" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="认定条件" prop="confirmationConditions">
              <el-select v-model="form.confirmationConditions" placeholder="请选择认定条件" clearable>
                <el-option v-for="item in confirmConditions" :key="item.id" :label="item.text" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类型" prop="assetType">
              <el-select v-model="form.assetType" placeholder="请选择资产类型" clearable>
                <el-option v-for="item in assertTypes" :key="item.id" :label="item.text" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联事项" prop="relationType">
              <el-select v-model="form.relationType" placeholder="请选择关联事项" clearable>
                <el-option v-for="item in relationTypes" :key="item.id" :label="item.text" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="最小核销金额" prop="minAmountWrittenOff">
              <el-input v-model="form.minAmountWrittenOff"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最大核销金额" prop="maxAmountWrittenOff">
              <el-input v-model="form.maxAmountWrittenOff"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核销金额类型" prop="amountWrittenOffType">
              <el-radio-group v-model="form.amountWrittenOffType">
                <el-radio :label="1">任意核销金额</el-radio>
                <el-radio :label="2">核销金额区间</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="逾期天数" prop="daysOverdue">
              <el-input v-model="form.daysOverdue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="逾期天数类型" prop="daysOverdueType">
              <el-select v-model="form.daysOverdueType" placeholder="请选择逾期天数类型" clearable>
                <el-option label="任何时间" :value="1"/>
                <el-option label="小于" :value="2"/>
                <el-option label="小于等于" :value="3"/>
                <el-option label="等于" :value="4"/>
                <el-option label="大于" :value="5"/>
                <el-option label="大于等于" :value="6"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="已达时间" prop="elapsedTime">
              <el-input v-model="form.elapsedTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已达时间类型" prop="elapsedTimeType">
              <el-select v-model="form.elapsedTimeType" placeholder="请选择已达时间类型" clearable>
                <el-option label="小于" :value="2"/>
                <el-option label="小于等于" :value="3"/>
                <el-option label="等于" :value="4"/>
                <el-option label="大于" :value="5"/>
                <el-option label="大于等于" :value="6"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="税收确认证据" prop="evidenceList">
          <el-select v-model="form.evidenceList" placeholder="请选择税收确认证据" clearable multiple filterable>
            <el-option v-for="item in evidenceList" :key="item.id" :label="item.text" :value="item.value"/>
          </el-select>
        </el-form-item>
        <el-form-item label="税收确认证据描述" prop="evidenceDescription">
          <el-input type="textarea" v-model="form.evidenceDescription"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formSubmit">提交</el-button>
          <el-button @click="closeCurrentTag">取消</el-button>
        </el-form-item>
      </el-form>

    </el-main>
  </el-container>
</template>

<script lang="ts">
import {defineComponent, reactive, ref} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {cancelAddForm} from '@/composables/bad-debt/confirm'
import {CommonEnum} from "@/enums/CommonEnum";
import {errorMsg} from "@/utils/common";
import {ApiResponse} from "@/model/resp/base/ApiResponse";
import {
  assertTypes,
  confirmConditions,
  evidenceList,
  initAdd,
  relationTypes
} from "../../composables/basic-file-config";
import {userAddBasicFileConfigReq} from "../../model/req/add/AddBasicFileConfigReq";
import {add} from "../../api/basic-file-config/file-config";

export default defineComponent({
  name: "FileConfigAdd",
  components: {},

  setup(props, {attrs, slots, emit}) {
    //初始化
    initAdd()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    //新增表单
    const form = reactive(userAddBasicFileConfigReq())
    const addFormRef = ref(null)
    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }

    //新增表单
    const formSubmit = () => {
      addFormRef.value.validate((valid) => {
        if (valid) {
          add(form).then((response: ApiResponse<object>) => {
            if (response.code !== CommonEnum.SUCCESS_CODE) {
              errorMsg(response.msg)
            } else {
              //提交成功，关闭当前页面
              closeCurrentTag()
            }
          })
        } else {
          return false
        }
      })
    }
    const rules = {
      amountWrittenOffType: [{trigger: 'blur', validator: validateAmountWrittenOffType}],
      assetType: [{required: true, message: '请选择资产类型', trigger: 'change'}],
      confirmationConditions: [{required: true, message: '请选择认定条件', trigger: 'change'}],
      daysOverdueType: [{required: true, message: '请选择逾期天数类型', trigger: 'change'}],
      evidenceDescription: [{required: true, message: '请填写税收证据确认描述', trigger: 'change'}],
    }

    /**
     * 检验核销金额类型
     * @param _rule
     * @param value
     * @param callback
     */
    function validateAmountWrittenOffType(_rule: any, value: number, callback: any) {
      if (!value) {
        callback(new Error('检验核销金额类型必填'))
      }
      // 核销金额区间时，最小核销金额和最大核销金额必填
      if (value == 2) {
        if (!form.minAmountWrittenOff) {
          callback(new Error('当选择核销金额区间时，最小核销金额必填'))
        }
        if (!form.maxAmountWrittenOff) {
          callback(new Error('当选择核销金额区间时，最大核销金额必填'))
        }
        if (form.minAmountWrittenOff < 0) {
          callback(new Error('最小核销金额不能为负数'))
        }
        if (form.maxAmountWrittenOff < form.minAmountWrittenOff) {
          callback(new Error('最大核销金额不能小于最小核销金额'))
        }
      }
      callback()
    }

    return {
      closeCurrentTag, form, addFormRef, cancelAddForm, formSubmit, rules, confirmConditions, assertTypes, relationTypes
      , evidenceList
    }
  }
})
</script>

<style scoped>

</style>
