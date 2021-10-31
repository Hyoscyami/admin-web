<template>
  <div class="app-container">
    <el-descriptions title="申报详情">
      <el-descriptions-item label="申报年份">
        <el-tag>{{ tableVO.declareYear }}</el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions>
      <el-descriptions-item label="A105090资产损失税前扣除及纳税调整明细表">
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
            <td>{{ tableVO.financeAdjustTaxAmount }}</td>
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
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions>
      <el-descriptions-item label="A105000纳税调整项目明细表">
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
            <td></td>
            <td></td>
            <td></td>
            <td></td>
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
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary">
      <a :href="`/api/declare-history/export?id=${id}`">下载</a>
    </el-button>
    <el-button @click="closeCurrentTag">返回</el-button>
  </div>
</template>

<script lang="ts">
import {reactive} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ApiResponse} from "../../model/resp/base/ApiResponse";
import {CommonEnum} from "../../enums/CommonEnum";
import {errorMsg} from "../../utils/common";
import {detail} from "../../api/declare-history/declare-history";
import {useDeclareHistoryVO} from "../../model/vo/DeclareHistoryVO";

export default {
  name: "DeclarationManagementDetail",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // 两个表格的数据
    const tableVO = reactive(useDeclareHistoryVO())
    //待编辑数据的ID
    const id = route.query.id
    //获取详情
    detail(id).then((response: ApiResponse<object>) => {
      if (response.code !== CommonEnum.SUCCESS_CODE) {
        errorMsg(response.msg)
      } else {
        Object.assign(tableVO, response.data)
      }
    })

    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    return {
      closeCurrentTag, tableVO, id
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
