<template>
  <el-form ref="searchFormRef" :model="listQuery" :inline="true">
    <el-form-item label="标题" prop="borrowerName">
      <el-input v-model="listQuery.borrowerName" placeholder="模糊查询标题" @keyup.enter.native="searchFormSubmit"/>
    </el-form-item>
    <el-form-item label="状态" prop="type">
      <el-select v-model="listQuery.status" placeholder="请选择状态" multiple clearable filterable>
        <el-option label="未发布" :value="1"/>
        <el-option label="已发布" :value="2"/>
        <el-option label="已下架" :value="3"/>
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
