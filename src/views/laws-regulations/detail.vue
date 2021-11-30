<template>
  <div>
    <h1 align="center">{{ form.title }}</h1>
    <el-row>
      <div v-html="form.content"></div>
    </el-row>
    <el-button @click="closeCurrentTag">返回</el-button>
  </div>
</template>

<script lang="ts">
import TEditor from "@/components/Tinymce/index.vue";
import {defineComponent, reactive, ref} from 'vue'
import {useAddLawsRegulationsReq, useLawsRegulationsRule} from "../../model/req/add/AddLawsRegulationsReq";
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {detail, update} from "@/api/laws-regulations/laws-regulations";
import {ApiResponse} from "../../model/resp/base/ApiResponse";
import {CommonEnum} from "../../enums/CommonEnum";
import {errorMsg} from "../../utils/common";
import hasPermission from '@/utils/permission'

export default defineComponent({
  name: "LawsRegulationsDetail",
  components: {TEditor},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    //待编辑数据的ID
    const id = route.query.id
    // 对话框新增机构表单ref
    const addFormRef = ref(null)
    //新增表单
    const form = reactive(useAddLawsRegulationsReq())
    //获取详情
    detail(id).then((response: ApiResponse<object>) => {
      if (response.code !== CommonEnum.SUCCESS_CODE) {
        errorMsg(response.msg)
      } else {
        Object.assign(form, response.data)
      }
    })
    //规则
    const rules = useLawsRegulationsRule()
    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    //新增表单
    const formSubmit = () => {
      addFormRef.value.validate((valid) => {
        if (valid) {
          update(form).then((response: ApiResponse<object>) => {
            if (response.code !== CommonEnum.SUCCESS_CODE) {
              errorMsg(response.msg)
            } else {
              //提交成功，关闭当前页面
              closeCurrentTag()
            }
          })
        } else {
          return false
        }
      })
    }
    return {addFormRef, form, closeCurrentTag, rules, formSubmit, hasPermission}
  }
})
</script>

<style scoped>

</style>
