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
              <el-input v-model="form.loanAccountNo" autocomplete="off" tabindex="3"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="会计凭证号码" prop="accountingDocumentNo">
              <el-input v-model="form.accountingDocumentNo" autocomplete="off" tabindex="4"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收回日期" prop="revokeDate">
              <el-date-picker
                  v-model="form.revokeDate"
                  :disabled-date="disabledDate"
                  type="date"
                  format="YYYYMMDD"
                  placeholder="请选择核销收回日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="收回本金" prop="capital">
              <el-input v-model="form.capital" autocomplete="off" tabindex="7"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收回表内利息" prop="onBalanceSheetInterest">
              <el-input v-model="form.onBalanceSheetInterest" autocomplete="off" tabindex="8"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收回表外利息" prop="offBalanceSheetInterest">
              <el-input v-model="form.offBalanceSheetInterest" autocomplete="off" tabindex="9"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="收回应收费用" prop="charges">
              <el-input v-model="form.charges" autocomplete="off" tabindex="10"/>
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
import {defineComponent, reactive} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import Cascader from "../../../components/Cascader/index.vue";
import {detail, update} from "../../../api/write-off-recover/make-up";
import {CommonEnum} from "../../../enums/CommonEnum";
import {errorMsg} from "../../../utils/common";
import {ApiResponse} from "../../../model/resp/base/ApiResponse";
import {useUpdateBadDebtRevokeReq} from "../../../model/req/update/UpdateBadDebtRevokeReq";
import {useRevokeRule} from "../../../model/req/add/AddBadDebtRevokeReq";

export default defineComponent({
  name: "WriteOffRecoverMakeUpEdit",
  components: {Cascader},
  setup(props, {attrs, slots, emit}) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    //待编辑数据的ID
    const id = route.query.id
    //表单
    let form = reactive(useUpdateBadDebtRevokeReq())
    //获取详情
    detail(id).then((response: ApiResponse<object>) => {
      if (response.code !== CommonEnum.SUCCESS_CODE) {
        errorMsg(response.msg)
      } else {
        Object.assign(form, response.data)
      }
    })
    const rules = useRevokeRule()
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
      update(form).then((response: ApiResponse<object>) => {
        if (response.code !== CommonEnum.SUCCESS_CODE) {
          errorMsg(response.msg)
        } else {
          //提交成功，关闭当前页面
          closeCurrentTag()
        }
      })
    }
    return {closeCurrentTag, form, disabledDate, formSubmit, rules}
  }
})
</script>

<style scoped>

</style>
