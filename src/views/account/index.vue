<template>
  <el-container>
    <el-main>
      <el-form ref="dialogFormRef" :model="form" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off" tabindex="1"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" show-password autocomplete="off" tabindex="2"/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="confirmPassword" show-password autocomplete="off" tabindex="3"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="closeCurrentTag">取 消</el-button>
          <el-button type="primary" @click="formSubmit">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {useAddOperatorReq} from "../../model/req/add/AddOperatorReq";
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {reactive, ref} from 'vue'
import {updateAccount} from "../../api/sys/operator";
import {doEncrypt} from "../../utils/password-utils";
import {errorMsg} from "../../utils/common";

export default {
  name: "Account",
  setup() {
    const form = reactive(useAddOperatorReq())
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    form.name = store.getters.name
    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    const formSubmit = () => {
      if (form.password !== confirmPassword.value) {
        errorMsg('两次输入密码不一致，请重新输入')
        return;
      }
      if (form.password && form.length < 6) {
        errorMsg('密码长度过短，请输入6位以上密码')
        return;
      }
      form.password = doEncrypt(form.password)
      updateAccount(form).then(() => {
        // 关闭弹框
        closeCurrentTag()
      })
    }
    const confirmPassword = ref('')
    return {form, closeCurrentTag, formSubmit, confirmPassword}
  }
}
</script>

<style scoped>

</style>
