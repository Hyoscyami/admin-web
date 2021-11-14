<template>
  <el-form ref="searchFormRef" :model="listQuery" :inline="true">
    <el-form-item label="所属组织" prop="orgId">
      <Cascader v-model:orgId="listQuery.orgId" v-model:selectedOrg="selectOrg"></Cascader>
    </el-form-item>
    <el-form-item label="登录账号" prop="borrowerName">
      <el-input v-model="listQuery.username" placeholder="精确查询登录账号" @keyup.enter.native="searchFormSubmit"/>
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
import {SelectGroup} from "@/model/req/query/Table";
import {QueryLoginLogReq} from "@/model/req/query/QueryLoginLogReq";

export default defineComponent({
  name: "SearchForm",
  components: {Cascader},

  props: {
    listQuery: {
      type: Object as PropType<QueryLoginLogReq>,
      required: true
    },
    typesSelect: {
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

    const searchFormRef = ref(null)
    const selectOrg = []
    return {searchFormSubmit, resetSearchForm, searchFormRef, selectOrg}
  }
})
</script>

<style scoped>

</style>
