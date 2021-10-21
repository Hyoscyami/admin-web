<template>
  <el-form ref="searchFormRef" :model="listQuery" :inline="true">
    <el-form-item label="申报年份" prop="declareYear">
      <el-date-picker
          v-model="listQuery.declareYear"
          :disabled-date="disabledDate"
          type="year"
          format="YYYY"
          placeholder="请选择申报年份">
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
import {QueryDeclareHistoryReq} from "../../../model/req/query/QueryDeclareHistoryReq";

export default defineComponent({
  name: "SearchForm",
  components: {Cascader},

  props: {
    listQuery: {
      type: Object as PropType<QueryDeclareHistoryReq>,
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
    return {searchFormSubmit, resetSearchForm, searchFormRef, disabledDate}
  }
})
</script>

<style scoped>

</style>
