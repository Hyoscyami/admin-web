<template>
  <div class="app-container">
    <el-steps :active="active" finish-status="success">
      <el-step title="第一步" description="请先选择申报年度"></el-step>
      <el-step title="第二步" description="确认A105000纳税调整项目明细表"></el-step>
      <el-step title="第三步" description="确认A105000纳税调整项目明细表"></el-step>
    </el-steps>
    <!--    第一步-->
    <el-row v-if="active === 0" style="margin-top: 20px;">
      <el-form ref="addFormRef" :model="firstForm" label-width="120px">
        <el-form-item label="申报年度">
          <el-date-picker
              v-model="firstForm.year"
              :disabled-date="disabledDate"
              type="year"
              format="YYYY"
              placeholder="请选择申报年度">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="firstFormSubmit">下一步</el-button>
          <el-button @click="closeCurrentTag">取消</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <!--    第二步-->
    <el-row v-if="active === 1" style="margin-top: 20px;">
      <table class="dataTable">
        <tr>
          <td>项目</td>
          <td>资产损失直接计入本年损益金额</td>
          <td>资产损失准备金核销金额</td>
          <td>资产处置收入</td>
          <td>赔偿收入</td>
          <td>资产计税基础</td>
          <td>资产损失的税收金额</td>
          <td>纳税调整金额</td>
        </tr>
        <tr>
          <td>债权性投资损失</td>
          <td></td>
          <td>{{ tableVO.debtWriteOffAmount }}</td>
          <td></td>
          <td></td>
          <td>{{ tableVO.debtLossTaxAmount }}</td>
          <td>{{ tableVO.assetReserveLossTaxAmount }}</td>
          <td>{{ tableVO.financeLossTaxAmount }}</td>
        </tr>
        <tr>
          <td>金融企业债权性投资损失</td>
          <td></td>
          <td>{{ tableVO.financeReserveWriteOffAmount }}</td>
          <td></td>
          <td></td>
          <td>{{ tableVO.financeAssetBasicLossTaxAmount }}</td>
          <td>{{ tableVO.financeLossTaxAmount }}</td>
          <td>{{ tableVO.financeAdjustTaxAmount }}</td>
        </tr>
        <tr>
          <td>贷款损失</td>
          <td></td>
          <td>{{ tableVO.loanLossWriteOffAmount }}</td>
          <td></td>
          <td></td>
          <td>{{ tableVO.loanLossTaxAmount }}</td>
          <td>{{ tableVO.loanLossTaxAmount }}</td>
          <td>{{ tableVO.loanLossAdjustTaxAmount }}</td>
        </tr>
        <tr>
          <td>符合条件的涉农和中小企业贷款损失</td>
          <td></td>
          <td>{{ tableVO.farmerWriteOffAmount }}</td>
          <td></td>
          <td></td>
          <td>{{ tableVO.farmerTaxAmount }}</td>
          <td>{{ tableVO.farmerTaxAmount }}</td>
          <td>{{ tableVO.farmerAdjustTaxAmount }}</td>
        </tr>
        <tr>
          <td>单户贷款余额 300 万（含）以下的贷款损失</td>
          <td></td>
          <td>{{ tableVO.singleWriteOffAmount }}</td>
          <td></td>
          <td></td>
          <td>{{ tableVO.singleTaxAmount }}</td>
          <td>{{ tableVO.singleTaxAmount }}</td>
          <td>{{ tableVO.singleAdjustTaxAmount }}</td>
        </tr>
        <tr>
          <td>单户贷款余额 300 万元至 1000 万元（含）的 贷款损失</td>
          <td></td>
          <td>{{ tableVO.singleMiddleWriteOffAmount }}</td>
          <td></td>
          <td></td>
          <td>{{ tableVO.singleMiddleTaxAmount }}</td>
          <td>{{ tableVO.singleMiddleTaxAmount }}</td>
          <td>{{ tableVO.singleMiddleAdjustTaxAmount }}</td>
        </tr>
        <tr>
          <td>其他债权性投资损失</td>
          <td></td>
          <td>{{ tableVO.otherLossWriteOffAmount }}</td>
          <td></td>
          <td></td>
          <td>{{ tableVO.otherLossTaxAmount }}</td>
          <td>{{ tableVO.otherLossTaxAmount }}</td>
          <td>{{ tableVO.otherLossAdjustTaxAmount }}</td>
        </tr>
      </table>
      <el-button style="margin-top: 12px" @click="before" v-if="active > 0">上一步</el-button>
      <el-button style="margin-top: 12px" @click="next" v-if="active < 2">下一步</el-button>
    </el-row>
    <!--    第三步-->
    <div v-if="active === 2" style="margin-top: 20px;">
      <el-row style="margin-top: 12px">
        <table class="dataTable">
          <tr>
            <td>项目</td>
            <td>账载金额</td>
            <td>税收金额</td>
            <td>调增金额</td>
            <td>调减金额</td>
          </tr>
          <tr>
            <td>一、收入类调整项目（2+3+⋯8+10+11）</td>
            <td>*</td>
            <td>*</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>（二）未按权责发生制原则确认的收入（填写 A105020）</td>
            <td>*</td>
            <td></td>
            <td></td>
            <td>*</td>
          </tr>
          <tr>
            <td>（三）投资收益（填写 A105030）</td>
            <td>账载金额</td>
            <td>税收金额</td>
            <td>调增金额</td>
            <td>调减金额</td>
          </tr>
          <tr>
            <td>（四）按权益法核算长期股权投资对初始投资成本调整确认收益</td>
            <td>*</td>
            <td>*</td>
            <td>*</td>
            <td></td>
          </tr>
          <tr>
            <td>（五）交易性金融资产初始投资调整</td>
            <td>*</td>
            <td>*</td>
            <td></td>
            <td>*</td>
          </tr>
          <tr>
            <td>（六）公允价值变动净损益</td>
            <td></td>
            <td>*</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>（七）不征税收入</td>
            <td>*</td>
            <td>*</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>其中：专项用途财政性资金（填写 A105040）</td>
            <td>*</td>
            <td>*</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>（八）销售折扣、折让和退回</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>（九）其他</td>
            <td>{{ tableVO.bookedAmount }}</td>
            <td>{{ tableVO.taxAmount }}</td>
            <td>{{ tableVO.increaseAmount }}</td>
            <td>{{ tableVO.reductionAmount }}</td>
          </tr>
        </table>
      </el-row>
      <el-row style="margin-top: 12px">
        <el-button @click="before" v-if="active > 0">上一步</el-button>
        <el-button type="primary" @click="submit" v-if="active === 2">提交</el-button>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import {reactive, ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ApiResponse} from "../../model/resp/base/ApiResponse";
import {CommonEnum} from "../../enums/CommonEnum";
import {errorMsg, isBlank} from "../../utils/common";
import {declareDetail} from "../../api/deferred-declaration/deferred-declaration";
import {formatYYYY} from "../../utils/time";
import {useDeclareDetailVO} from "../../model/vo/DeclareDetailVO";

export default {
  name: "DeclarationManagement",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // 当前步骤
    const active = ref(0)
    // 申报表单
    const firstForm = reactive({
      year: ''
    })
    // 两个表格的数据
    const tableVO = reactive(useDeclareDetailVO())

    // 上一步
    function before() {
      active.value--
    }

    //点击下一步
    function next() {
      active.value++
    }

    // 表单提交
    function submit() {
      //关闭当前标签页
      closeCurrentTag()
    }

    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }

    //时间选择，禁用时间
    function disabledDate(time) {
      return time.getTime() > Date.now()
    }

    // 申报年份表单ref
    const addFormRef = ref(null)
    //新增表单
    const firstFormSubmit = () => {
      if (!isBlank(firstForm.year)) {
        declareDetail(formatYYYY(firstForm.year)).then((response: ApiResponse<object>) => {
          if (response.code !== CommonEnum.SUCCESS_CODE) {
            errorMsg(response.msg)
          } else {
            //提交成功，进入下一步
            Object.assign(tableVO, response.data)
            next()
          }
        })
      } else {
        errorMsg('请选择申报日期')
        return false
      }
    }
    return {
      active,
      next,
      before,
      submit,
      firstForm,
      disabledDate,
      addFormRef,
      firstFormSubmit,
      closeCurrentTag, tableVO
    }
  }
}
</script>

<style scoped>
.dataTable {
  border-collapse: collapse;
}

.dataTable tr td {
  border: 1px solid black;
}
</style>
