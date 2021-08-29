<template>
  <el-dialog
      :model-value="dialog.visible"
      :title="dialog.textMap[dialog.dialogStatus]"
      :before-close="cancelAddForm"
  >
    <el-form ref="addFormRef" :model="dialog.form" :rules="dialog.rules" label-width="80px">
      <el-form-item label="所属组织" prop="orgId">
        <Cascader v-model:orgId="dialog.form.orgId"></Cascader>
      </el-form-item>
      <el-form-item label="借款人名称" prop="borrowerName">
        <el-input v-model="dialog.form.borrowerName" autocomplete="off" tabindex="1"/>
      </el-form-item>
      <el-form-item label="借款人证件号码" prop="borrowerIdNo">
        <el-input v-model="dialog.form.borrowerIdNo" autocomplete="off" tabindex="2"/>
      </el-form-item>
      <el-form-item label="贷款账号" prop="loanAccountNo">
        <el-input v-model="dialog.form.loanAccountNo" autocomplete="off" tabindex="3"/>
      </el-form-item>
      <el-form-item label="会计凭证号码" prop="accountingDocumentNo">
        <el-input v-model="dialog.form.accountingDocumentNo" autocomplete="off" tabindex="4"/>
      </el-form-item>
      <el-form-item label="借款日期" prop="borrowTime">
        <el-date-picker
            v-model="dialog.form.borrowTime"
            :disabled-date="disabledDate"
            type="date"
            format="YYYYMMDD"
            placeholder="请选择借款日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="到期日期" prop="expireTime">
        <el-date-picker
            v-model="dialog.form.expireTime"
            :disabled-date="disabledDate"
            type="date"
            format="YYYYMMDD"
            placeholder="请选择到期日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="核销日期" prop="writeOffDate">
        <el-date-picker
            v-model="dialog.form.writeOffDate"
            :disabled-date="disabledDate"
            type="date"
            format="YYYYMMDD"
            placeholder="请选择核销日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="借款金额" prop="loanAmount">
        <el-input v-model="dialog.form.loanAmount" autocomplete="off" tabindex="5"/>
      </el-form-item>
      <el-form-item label="本金" prop="capital">
        <el-input v-model="dialog.form.capital" autocomplete="off" tabindex="6"/>
      </el-form-item>
      <el-form-item label="表内利息" prop="onBalanceSheetInterest">
        <el-input v-model="dialog.form.onBalanceSheetInterest" autocomplete="off" tabindex="7"/>
      </el-form-item>
      <el-form-item label="表外利息" prop="offBalanceSheetInterest">
        <el-input v-model="dialog.form.offBalanceSheetInterest" autocomplete="off" tabindex="8"/>
      </el-form-item>
      <el-form-item label="应收费用" prop="charges">
        <el-input v-model="dialog.form.charges" autocomplete="off" tabindex="9"/>
      </el-form-item>
    </el-form>
    <template #footer>
            <span class="dialog-footer">
              <el-button @click="cancelAddForm">取 消</el-button>
              <el-button type="primary" @click="addFormSubmit">确 定</el-button>
            </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {PropType, ref} from 'vue';
import {Dialog} from "../../../../model/vo/Dialog";
import {BadDebtWriteOffVO} from "../../../../model/vo/BadDebtWriteOffVO";
import {AddBadDebtReq, BadDebtRule} from "../../../../model/req/add/AddBadDebtReq";
import {UpdateBadDebtReq} from "../../../../model/req/update/UpdateBadDebtReq";
import Cascader from "../../../../components/Cascader/index.vue";

export default {
  name: "Dialog",
  components: {Cascader},
  props: {
    dialog: {
      type: Object as PropType<Dialog<BadDebtWriteOffVO, BadDebtRule, AddBadDebtReq, UpdateBadDebtReq>>,
      required: true
    }
  },
  emits: ["cancel-add-form", "add-form-submit"],
  setup(props, {attrs, slots, emit}) {
    function cancelAddForm() {
      emit("cancel-add-form")
    }

    function addFormSubmit() {
      emit("add-form-submit")
    }

    const addFormRef = ref(null)

    function disabledDate(time) {
      return time.getTime() > Date.now()
    }

    return {cancelAddForm, addFormSubmit, addFormRef, disabledDate}
  }
}
</script>

<style scoped>

</style>
