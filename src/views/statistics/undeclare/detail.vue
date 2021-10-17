<template>
  <div class="app-container">
    <el-descriptions title="文件列表">
      <el-descriptions-item label="附加证据列表">
        <el-tag size="small" v-for="item in fileVO.evidenceList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts">
import {useRoute} from "vue-router";
import {ApiResponse} from "../../../model/resp/base/ApiResponse";
import {listBasicMaterials} from "../../../api/file/file";
import {BadDebtFileVO, useBadDebtFileVO} from "../../../model/vo/BadDebtFileVO";
import {reactive} from "vue";

export default {
  name: "StatisticsTaxDeductionDetail",
  setup() {
    const route = useRoute()
    //数据的ID
    const id = route.query.id
    // 呆账核销数据所有文件
    const fileVO = reactive(useBadDebtFileVO())
    //获取详情
    listBasicMaterials(Number(id)).then((response: ApiResponse<BadDebtFileVO>) => {
      Object.assign(fileVO, response.data)
    })
    return {
      fileVO
    }
  }
}
</script>

<style scoped>

</style>
