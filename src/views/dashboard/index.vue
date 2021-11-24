<template>
  <div class="dashboard-container">
    <!--    核销-->
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="echartCount" style="width: 700px;height:400px;">

        </div>
      </el-col>
      <el-col :span="12">
        <div id="echartAmount" style="width: 600px;height:400px;">

        </div>
      </el-col>
    </el-row>
    <!--    核销收回-->
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="echartCount2" style="width: 700px;height:400px;">

        </div>
      </el-col>
      <el-col :span="12">
        <div id="echartAmount2" style="width: 600px;height:400px;">

        </div>
      </el-col>
    </el-row>
    <!--    收回-->
    <el-row :gutter="20">
      <el-col :span="12">
        <div id="echartCount3" style="width: 800px;height:400px;">

        </div>
      </el-col>
      <el-col :span="12">
        <div id="echartAmount3" style="width: 600px;height:400px;">

        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {mapGetters} from 'vuex'
import {onUnmounted} from 'vue'
import {init, echart, echart2} from "@/composables/dashboard";

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
      echart.dispose
      echart2.dispose
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
