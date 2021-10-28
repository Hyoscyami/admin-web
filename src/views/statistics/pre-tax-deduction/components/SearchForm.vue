<template>
  <el-form ref="searchFormRef" :model="listQuery" :inline="true">
    <el-form-item label="资产类型" prop="type" tabindex="2">
      <el-select v-model="table.listQuery.assetTypes" multiple filterable placeholder="请选择资产类型" clearable>
        <el-option v-for="item in assertTypes" :key="item.id" :label="item.text" :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="所属组织" prop="orgId">
      <Cascader v-model:orgId="listQuery.orgId" v-model:selectedOrg="selectOrg"></Cascader>
    </el-form-item>
    <el-form-item label="核销年度" prop="writeOffYear">
      <el-date-picker
          v-model="listQuery.writeOffYear"
          :disabled-date="disabledDate"
          type="year"
          format="YYYY"
          placeholder="请选择核销年度">
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
import {SelectGroup} from "@/model/req/query/Table";

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
