<template>
  <el-cascader
      :options="orgTree"
      v-model="selectedOrg"
      :props="{ checkStrictly: true,label:'name',value:'id' }"
      @change="handleChange"
      clearable></el-cascader>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, reactive} from 'vue';
import {tree} from "../../api/sys/org";
import {useQueryOrgReq} from "../../model/req/query/QueryOrgReq";
import {useOrgVO} from "../../model/vo/OrgVO";

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
    }
  },
  setup(props, {attrs, slots, emit}) {
    const queryOrgReq = useQueryOrgReq(20);
    queryOrgReq.page = undefined
    queryOrgReq.size = undefined
    let orgTree = reactive([useOrgVO()])
    //组织树
    tree(queryOrgReq).then((response) => {
      Object.assign(orgTree, response.data)
    })

    function handleChange(value) {
      console.log('value', value)
      if (value) {
        emit('update:orgId', value[value.length - 1])
      } else {
        emit('update:orgId', undefined)
      }
    }

    const selectedOrg = computed({
      get() {
        return props.selectedOrg;
      },
      set(value) {
        emit('update:selectedOrg', value)
      }
    })
    console.log('selectedOrg', selectedOrg)
    return {handleChange, orgTree, selectedOrg}
  }
})
</script>

<style scoped>

</style>
