<template>
  <el-form ref="searchFormRef" :model="listQuery" :inline="true">
    <el-form-item label="所属组织" prop="orgId">
      <Cascader v-model:orgId="listQuery.orgId" v-model:selectedOrg="selectOrg"></Cascader>
    </el-form-item>
    <el-form-item label="核销年度" prop="revokeDate">
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
import Cascader from '@/components/Cascader/index.vue'
import {QueryBadDebtRevokeReq} from "@/model/req/query/QueryBadDebtRevokeReq";

export default defineComponent({
  name: "SearchForm",
  components: {Cascader},

  props: {
    listQuery: {
      type: Object as PropType<QueryBadDebtRevokeReq>,
      required: true
    }
  },
  setup(props, {attrs, slots, emit}) {
    function searchFormSubmit() {
      emit("search-form-submit")
    }

    //时间选择，禁用时间
    function disabledDate(time) {
      return time.getTime() > Date.now()
    }

    function resetSearchForm() {
      emit("reset-search-form")
    }

    const searchFormRef = ref(null)
    const selectOrg = []
    return {searchFormSubmit, resetSearchForm, searchFormRef, selectOrg, disabledDate}
  }
})
</script>

<style scoped>

</style>
