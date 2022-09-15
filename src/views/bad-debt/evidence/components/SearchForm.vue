<template>
  <el-form ref="searchFormRef" :model="listQuery" :inline="true">
    <el-form-item label="借款人名称" prop="borrowerName">
      <el-input v-model="listQuery.borrowerName" placeholder="模糊查询名称" @keyup.enter.native="searchFormSubmit"/>
    </el-form-item>
    <el-form-item label="借款人证件号码" prop="borrowerIdNo">
      <el-input v-model="listQuery.borrowerIdNo" placeholder="精确查询证件号"
                @keyup.enter.native="searchFormSubmit"/>
    </el-form-item>
    <el-form-item label="贷款账号" prop="loanAccountNo">
      <el-input v-model="listQuery.loanAccountNo" placeholder="精确贷款账号"
                @keyup.enter.native="searchFormSubmit"/>
    </el-form-item>
    <el-form-item label="会计凭证号码" prop="accountingDocumentNo">
      <el-input v-model="listQuery.accountingDocumentNo" placeholder="精确查询会计凭证号码"
                @keyup.enter.native="searchFormSubmit"/>
    </el-form-item>
    <el-form-item label="所属组织" prop="orgId">
      <Cascader v-model:orgId="listQuery.orgId" v-model:selectedOrg="selectOrg"></Cascader>
    </el-form-item>
    <el-form-item label="核销年度" prop="declareYear">
      <el-date-picker
          v-model="listQuery.writeOffYear"
          :disabled-date="disabledDate"
          type="year"
          format="YYYY"
          placeholder="请选择核销年度">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="核销状态">
      <el-select v-model="listQuery.status" filterable clearable multiple placeholder="请选择核销状态">
        <el-option label="已核销呆账" :value="2"/>
        <el-option label="拟申报税前扣除" :value="3"/>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchFormSubmit">查询</el-button>
      <el-button @click="resetSearchForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {QueryBadDebtReq} from "../../../../model/req/query/QueryBadDebtReq";
import Cascader from '@/components/Cascader/index.vue'

export default defineComponent({
  name: "SearchForm",
  components: {Cascader},

  props: {
    listQuery: {
      type: Object as PropType<QueryBadDebtReq>,
      required: true
    }
  },
  setup(props, {attrs, slots, emit}) {
    function searchFormSubmit() {
      emit("search-form-submit")
    }

    function resetSearchForm() {
      emit("reset-search-form")
    }

    //时间选择，禁用时间
    function disabledDate(time) {
      return time.getTime() > Date.now()
    }

    const searchFormRef = ref(null)
    const selectOrg = ref([])
    return {searchFormSubmit, resetSearchForm, searchFormRef, selectOrg, disabledDate}
  }
})
</script>

<style scoped>

</style>
