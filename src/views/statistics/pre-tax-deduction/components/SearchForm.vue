<template>
  <el-form ref="searchFormRef" :model="listQuery" :inline="true">
    <el-form-item label="统计方式">
      <el-select v-model="listQuery.type" filterable placeholder="请选择资产类型">
        <el-option label="分类型展示" :value="1"/>
        <el-option label="分机构展示" :value="2"/>
        <el-option label="分年度展示" :value="3"/>
      </el-select>
    </el-form-item>
    <el-form-item label="资产类型" prop="assetTypes" v-if="listQuery.type === 1">
      <el-select v-model="listQuery.assetTypes" multiple filterable placeholder="请选择资产类型" clearable>
        <el-option v-for="item in typesSelect" :key="item.id" :label="item.text" :value="item.value"/>
      </el-select>
    </el-form-item>
    <el-form-item label="所属组织" prop="orgId" v-if="listQuery.type === 2">
      <Cascader ref="cascaderRef" v-model:orgId="listQuery.orgId"></Cascader>
    </el-form-item>
    <el-form-item label="核销年度" prop="year" v-if="listQuery.type === 3">
      <el-date-picker
          v-model="listQuery.year"
          :disabled-date="disabledDate"
          type="year"
          format="YYYY"
          placeholder="请选择核销年度">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="展示方式">
      <el-radio-group v-model="listQuery.queryType">
        <el-radio :label="1">按表格</el-radio>
        <el-radio :label="2">按图形</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchFormSubmit">查询</el-button>
      <el-button @click="resetSearchForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue';
import Cascader from '@/components/Cascader/index.vue'
import {SelectGroup} from "@/model/req/query/Table";
import {QueryStatisticReq} from "../../../../model/req/query/QueryStatisticReq";

export default defineComponent({
  name: "SearchForm",
  components: {Cascader},

  props: {
    listQuery: {
      type: Object as PropType<QueryStatisticReq>,
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
    //级联选择
    const cascaderRef = ref(null)
    const selectOrg = ref([])
    //组织级联选择属性
    const cascaderProps = {label: 'name', value: 'id', multiple: true}

    //时间选择，禁用时间
    function disabledDate(time) {
      return time.getTime() > Date.now()
    }

    return {searchFormSubmit, resetSearchForm, searchFormRef, selectOrg, disabledDate, cascaderProps, cascaderRef}
  }
})
</script>

<style scoped>

</style>
