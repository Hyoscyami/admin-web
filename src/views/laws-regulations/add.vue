<template>
  <el-container>
    <el-main>
      <el-form ref="addFormRef" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="制度法规标题" prop="name">
          <el-input v-model="form.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="制度法规内容" prop="content">
          <TEditor ref="editor" v-model:value="form.content"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="formSubmit">提交</el-button>
          <el-button @click="closeCurrentTag">取消</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import TEditor from "@/components/Tinymce/index.vue";
import {ref, defineComponent, reactive} from 'vue'
import {useAddLawsRegulationsReq, useLawsRegulationsRule} from "../../model/req/add/AddLawsRegulationsReq";
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {add} from "@/api/laws-regulations/laws-regulations";
import {ApiResponse} from "../../model/resp/base/ApiResponse";
import {CommonEnum} from "../../enums/CommonEnum";
import {errorMsg} from "../../utils/common";

export default defineComponent({
  name: "LawsRegulationsAdd",
  components: {TEditor},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // 对话框新增机构表单ref
    const addFormRef = ref(null)
    //新增表单
    const form = reactive(useAddLawsRegulationsReq())
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
          add(form).then((response: ApiResponse<object>) => {
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
    return {addFormRef, form, closeCurrentTag, rules, formSubmit}
  }
})
</script>

<style scoped>

</style>
