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
    <el-form-item label="文档完善状态" prop="fileCompleteStatus">
      <el-select v-model="listQuery.fileCompleteStatus" filterable placeholder="请选择文档完善状态" clearable>
        <el-option label="已完善" :value="1"/>
        <el-option label="未完善" :value="0"/>
      </el-select>
    </el-form-item>
    <el-form-item label="所属组织" prop="orgId">
      <Cascader v-model:orgId="listQuery.orgId" v-model:selectedOrg="selectOrg"></Cascader>
    </el-form-item>
    <el-form-item label="组织搜索类型">
      <el-radio-group v-model="listQuery.searchType">
        <el-radio :label="1">本级</el-radio>
        <el-radio :label="2">本下级</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="申报年度" prop="declareYear">
      <el-date-picker
          v-model="listQuery.declareYear"
          :disabled-date="disabledDate"
          type="year"
          format="YYYY"
          placeholder="请选择申报年度">
      </el-date-picker>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchFormSubmit">查询</el-button>
      <el-button @click="resetSearchForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {QueryBadDebtReq} from "@/model/req/query/QueryBadDebtReq";
import Cascader from '@/components/Cascader/index.vue'
import {SelectGroup} from "../../../model/req/query/Table";

export default defineComponent({
  name: "SearchForm",
  components: {Cascader},

  props: {
    listQuery: {
      type: Object as PropType<QueryBadDebtReq>,
      required: true
    },
    typesSelect: {
      type: Array as PropType<SelectGroup[]>,
      required: true
    },
    orgsSelect: {
      type: Array as PropType<SelectGroup[]>,
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
    const selectOrg = []
    return {searchFormSubmit, resetSearchForm, searchFormRef, selectOrg, disabledDate}
  }
})
</script>

<style scoped>

</style>
