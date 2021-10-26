<template>
  <div class="app-container">
    <el-descriptions title="附加证据列表">
      <el-descriptions-item :label="`${item.name}`" v-for="item in fileVO.evidenceList" :key="item.id">
        <el-tag size="small" style="margin-right:10px;" v-for="file in item.fileVOList" :key="file.id">
          <a :download="`${file.name}`" :href="`${file.url}`">{{ file.name }}</a>
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="closeCurrentTag">返回</el-button>
  </div>
</template>

<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ApiResponse} from "../../../model/resp/base/ApiResponse";
import {listBasicMaterials} from "../../../api/file/file";
import {BadDebtFileVO, useBadDebtFileVO} from "../../../model/vo/BadDebtFileVO";
import {reactive} from "vue";

export default {
  name: "StatisticsTaxDeductionDetail",
  setup() {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    //数据的ID
    const id = route.query.id
    // 呆账核销数据所有文件
    const fileVO = reactive(useBadDebtFileVO())
    //获取详情
    listBasicMaterials(Number(id)).then((response: ApiResponse<BadDebtFileVO>) => {
      Object.assign(fileVO, response.data)
    })
    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    return {
      fileVO, closeCurrentTag
    }
  }
}
</script>

<style scoped>

</style>
