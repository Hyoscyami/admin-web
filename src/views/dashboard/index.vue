<template>
  <div class="dashboard-container">
    <h1 align="center">欢迎进入"资产损失税收管理系统"！</h1>
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
