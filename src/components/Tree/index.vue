<template>
  <el-col :span="6">
    <el-input
        v-model="tree.filterTreeText"
        placeholder="输入关键字进行过滤"
    />
    <div
        class="tree-box"
    >
      <el-tree
          ref="treeRef"
          :props="tree.treeProps"
          node-key="id"
          :data="tree.data"
          :default-expanded-keys="tree.defaultExpandedKeys"
          :expand-on-click-node="false"
          :highlight-current="true"
          :filter-node-method="handleFilterNode"
          @node-click="handleNodeClick"
      >
      </el-tree>
    </div>
  </el-col>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from 'vue';
import {Tree} from "../../model/req/query/Tree";

export default defineComponent({
  name: "Tree",
  props: {
    tree: {
      type: Object as PropType<Tree<any, any>>,
      required: true
    }
  },
  setup(props, {attrs, slots, emit}) {

    function handleNodeClick(data: any) {
      emit("node-click", data)
    }

    function handleFilterNode(value: string, data: any) {
      emit("filter-node", value, data)
    }

    const treeRef = ref(null)
    return {handleNodeClick, handleFilterNode, treeRef}
  }
})
</script>

<style scoped>

</style>
