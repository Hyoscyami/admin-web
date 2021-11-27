<template>
  <div class="dashboard-container">
    <h1 align="center">欢迎进入"资产损失税收管理系统"！</h1>
    <!--    核销-->
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="echartCount" style="width: 700px;height:300px;">

        </div>
      </el-col>
      <el-col :span="12">
        <div id="echartAmount" style="width: 600px;height:300px;">

        </div>
      </el-col>
    </el-row>
    <!--    收回-->
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="echartCount2" style="width: 700px;height:300px;">

        </div>
      </el-col>
      <el-col :span="12">
        <div id="echartAmount2" style="width: 600px;height:300px;">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {mapGetters} from 'vuex'
import {onUnmounted} from 'vue'
import {init, myChartCount, myChartAmount, myChartCount2, myChartAmount2} from "@/composables/dashboard";

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  setup() {
    init()
    onUnmounted(() => {
      myChartCount.value.dispose()
      myChartAmount.value.dispose()
      myChartCount2.value.dispose()
      myChartAmount2.value.dispose()
    })
    return {}
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
