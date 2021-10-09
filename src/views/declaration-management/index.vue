<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="第一步" description="请先选择申报年度"></el-step>
    <el-step title="第二步" description="确认A105000纳税调整项目明细表"></el-step>
    <el-step title="第三步" description="确认A105000纳税调整项目明细表"></el-step>
  </el-steps>
  <el-button style="margin-top: 12px" @click="before" v-if="active > 0">上一步</el-button>
  <el-button style="margin-top: 12px" @click="next" v-if="active < 2">下一步</el-button>
  <el-button style="margin-top: 12px" @click="next" v-if="active === 2">提交</el-button>
</template>

<script lang="ts">
import {ref} from 'vue'
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";

export default {
  name: "DeclarationManagement",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    // 当前步骤
    const active = ref(0)

    // 上一步
    function before() {
      active.value--
    }

    //点击下一步
    function next() {
      active.value++
      //两张表都确认完毕
      if (active.value === 3) {
        //关闭当前页面
        closeCurrentTag()
      }
    }

    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    return {active, next, before}
  }
}
</script>

<style scoped>

</style>
