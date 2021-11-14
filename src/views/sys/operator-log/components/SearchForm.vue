<template>
  <el-form ref="searchFormRef" :model="listQuery" :inline="true">
    <el-form-item label="所属组织" prop="orgId">
      <Cascader v-model:orgId="listQuery.orgId" v-model:selectedOrg="selectOrg"></Cascader>
    </el-form-item>
    <el-form-item label="登录账号" prop="borrowerName">
      <el-input v-model="listQuery.username" placeholder="精确查询登录账号" @keyup.enter.native="searchFormSubmit"/>
    </el-form-item>
    <el-form-item label="操作类型" prop="type" tabindex="2">
      <el-select v-model="listQuery.types" placeholder="请选择操作类型" multiple clearable filterable>
        <el-option label="增加" :value="1"/>
        <el-option label="删除" :value="2"/>
        <el-option label="修改" :value="3"/>
        <el-option label="查询" :value="4"/>
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
import Cascader from '@/components/Cascader/index.vue'
import {SelectGroup} from "@/model/req/query/Table";
import {QueryOperatorLogReq} from "@/model/req/query/QueryOperatorLogReq";

export default defineComponent({
  name: "SearchForm",
  components: {Cascader},

  props: {
    listQuery: {
      type: Object as PropType<QueryOperatorLogReq>,
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
