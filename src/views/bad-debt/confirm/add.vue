<template>
  {{ dialog }}
</template>

<script lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
  name: "BadDebtConfirmAdd",
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const dialog = route.params.dialog
    console.log('params', JSON.stringify(dialog))
    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    return {closeCurrentTag, dialog}
  }
}
</script>

<style scoped>

</style>
