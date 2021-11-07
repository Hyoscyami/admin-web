<template>
  <el-container>
    <el-main>
      <el-form ref="addFormRef" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="所属组织" prop="orgId">
              <Cascader v-model:orgId="form.orgId" v-model:selectedOrg="form.parentOrgIds"></Cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款人名称" prop="borrowerName">
              <el-input v-model="form.borrowerName" autocomplete="off" tabindex="1"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款人证件号码" prop="borrowerIdNo">
              <el-input v-model="form.borrowerIdNo" autocomplete="off" tabindex="2"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="贷款账号" prop="loanAccountNo">
              <el-input v-model="form.loanAccountNo" autocomplete="off" tabindex="3" disabled/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会计凭证号码" prop="accountingDocumentNo">
              <el-input v-model="form.accountingDocumentNo" autocomplete="off" tabindex="4"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="借款日期" prop="borrowTime">
              <el-date-picker
                  v-model="form.borrowTime"
                  :disabled-date="disabledDate"
                  type="date"
                  format="YYYYMMDD"
                  placeholder="请选择借款日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="到期日期" prop="expireTime">
              <el-date-picker
                  v-model="form.expireTime"
                  :disabled-date="disabledDate"
                  type="date"
                  format="YYYYMMDD"
                  placeholder="请选择到期日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核销日期" prop="writeOffDate">
              <el-date-picker
                  v-model="form.writeOffDate"
                  :disabled-date="disabledDate"
                  type="date"
                  format="YYYYMMDD"
                  placeholder="请选择核销日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产余额" prop="assetBalance">
              <el-input v-model="form.assetBalance" autocomplete="off" tabindex="5"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="核销本金" prop="capital">
              <el-input v-model="form.capital" autocomplete="off" tabindex="7"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核销表内利息" prop="onBalanceSheetInterest">
              <el-input v-model="form.onBalanceSheetInterest" autocomplete="off" tabindex="8"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="核销表外利息" prop="offBalanceSheetInterest">
              <el-input v-model="form.offBalanceSheetInterest" autocomplete="off" tabindex="9"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="核销应收费用" prop="charges">
              <el-input v-model="form.charges" autocomplete="off" tabindex="10"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="呆账核销状态" prop="daysOverdueType">
              <el-select v-model="form.status" placeholder="请选择呆账核销状态" clearable>
                <el-option label="已核销呆账" :value="2"/>
                <el-option label="已申报税前扣除" :value="15"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="资产类型" prop="assetType">
              <el-select v-model="form.assetType" placeholder="请选择资产类型" filterable
                         clearable>
                <el-option v-for="item in assetTypes" :key="item.id" :label="item.text" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="申报年份" prop="declareYear" v-if="form.status === 15">
              <el-date-picker
                  v-model="form.declareYear"
                  :disabled-date="disabledDate"
                  type="year"
                  format="YYYY"
                  placeholder="请选择申报年份">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
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
import Cascader from "../../../components/Cascader/index.vue";
import {useAddBadDebtReq, useBadDebtRevokeRule} from "../../../model/req/add/AddBadDebtReq";
import {revoke} from "../../../api/bad-debt/confirm";
import {CommonEnum} from "../../../enums/CommonEnum";
import {errorMsg} from "../../../utils/common";
import {ApiResponse} from "../../../model/resp/base/ApiResponse";
import {detail} from "../../../api/write-off-recover/make-up";
import {listChildrenByCode} from "../../../api/sys/dict";
import {DictEnum} from "../../../enums/DictEnum";
import {DictVO} from "../../../model/vo/DictVO";
import {SelectGroup} from "../../../model/req/query/Table";
import {assetTypes} from "../../../composables/write-off-recover/make-up";
import {formatYYYY} from "../../../utils/time";

export default defineComponent({
  name: "WriteOffRecoverMakeUpRevoke",
  components: {Cascader},
  setup(props, {attrs, slots, emit}) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // 对话框新增机构表单ref
    const addFormRef = ref(null)
    //待编辑数据的ID
    const id = route.query.id
    //新增表单
    const form = reactive(useAddBadDebtReq())
    form.onBalanceSheetInterest = 0
    form.offBalanceSheetInterest = 0
    form.charges = 0
    const rules = useBadDebtRevokeRule()
    //资产类型
    const assetTypes = reactive([])
    //获取详情
    detail(id).then((response: ApiResponse<object>) => {
      if (response.code !== CommonEnum.SUCCESS_CODE) {
        errorMsg(response.msg)
      } else {
        Object.assign(form, response.data)
        form.status = undefined
      }
    })
    //获取资产类型
    listChildrenByCode(DictEnum.ASSERT_TYPE).then((response) => {
      assetTypes.length = 0
      response.data.forEach((item: DictVO) => {
        const type: SelectGroup = {
          id: item.id,
          text: item.name,
          value: Number(item.id)
        }
        assetTypes.push(type)
      })
    })

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

    //新增表单
    const formSubmit = () => {
      addFormRef.value.validate((valid) => {
        if (valid) {
          if (form.declareYear) {
            form.declareYear = formatYYYY(form.declareYear)
          }
          revoke(form).then((response: ApiResponse<object>) => {
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
    return {closeCurrentTag, form, disabledDate, formSubmit, rules, addFormRef, assetTypes}
  }
})
</script>

<style scoped>

</style>
