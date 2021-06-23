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
          ref="lazyTreeRef"
          :props="tree.treeProps"
          node-key="id"
          :load="loadNode"
          :default-expanded-keys="tree.defaultExpandedKeys"
          :expand-on-click-node="false"
          :highlight-current="true"
          lazy
          @node-click="handleNodeClick"
          @node-expand="handleNodeExpand"
          @node-collapse="handleNodeCollapse"
      >
        <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <el-space spacer="|">
                  <el-link v-if="data.hasNext" href="javascript:void(0);" @click.stop="viewNextPage(node)">下一页</el-link>
                </el-space>
              </span>
        </template>
      </el-tree>
    </div>
  </el-col>
</template>

<script lang="ts">
import {defineComponent, PropType,ref} from 'vue';
import {Tree} from "../../model/req/query/Tree";

export default defineComponent({
  name: "LazyTree",
  props: {
    tree: {
      type: Object as PropType<Tree<any, any>>,
      required:true
    }
  },
  setup(props,{ attrs, slots, emit }) {
    function loadNode(node: any, resolve: any) {
      emit("load",node,resolve)
    }
    function handleNodeClick(data:any) {
      emit("node-click",data)
    }
    function handleNodeExpand(data: any) {
      emit("node-expand",data)
    }
    function handleNodeCollapse(data: any) {
      emit("node-collapse",data)
    }
    function viewNextPage(clickedNode: any) {
      emit("view-next-page",clickedNode)
    }
    const lazyTreeRef = ref(null)
    return {loadNode,handleNodeClick,handleNodeExpand,handleNodeCollapse,viewNextPage,lazyTreeRef}
  }
})
</script>

<style scoped>

</style>
