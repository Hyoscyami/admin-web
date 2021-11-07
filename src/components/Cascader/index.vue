<template>
  <el-cascader
      :options="options"
      ref="cascaderRef"
      v-model="selectedOrg"
      :props="cascaderProps"
      @change="handleChange"
      placeholder="请选择所属组织"
      filterable
      clearable></el-cascader>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive, toRefs, ref} from 'vue';
import {entityTree} from "../../api/sys/org";
import {useQueryOrgReq} from "../../model/req/query/QueryOrgReq";

export default defineComponent({
  name: "Cascader",
  emits: ['update:orgId', 'update:selectedOrg'],
  props: {
    //回显数据
    selectedOrg: {
      type: Array as PropType<number[]>,
      default() {
        return [];
      }
    },
    //选中的组织ID
    orgId: {
      type: Number
    },
    cascaderProps: {
      type: Object,
      default(): Object {
        return {checkStrictly: true, label: 'name', value: 'id'}
      }
    }
  },
  setup(props, {attrs, slots, emit}) {
    const queryOrgReq = useQueryOrgReq(20);
    queryOrgReq.page = undefined
    queryOrgReq.size = undefined
    const orgTree = reactive({
      options: []
    })
    //组织树
    entityTree(queryOrgReq).then((response) => {
      orgTree.options = response.data
    })

    function handleChange(value) {
      if (value) {
        emit('update:orgId', value[value.length - 1])
      } else {
        emit('update:orgId', undefined)
      }
    }

    const cascaderRef = ref(null)

    const selectedOrg = computed({
      get() {
        return props.selectedOrg;
      },
      set(value) {
        emit('update:selectedOrg', value)
      }
    })
    return {handleChange, ...toRefs(orgTree), selectedOrg, cascaderRef}
  }
})
</script>

<style scoped>

</style>
