<template>
  <div class="app-container">
    <el-descriptions title="（一）报告资料" column="2">
      <el-descriptions-item label="呆账核销申请报告" width="300px">
        <el-tag size="small" v-for="item in fileVO.applyList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="呆账核销申报审批表" width="300px">
        <el-tag size="small" v-for="item in fileVO.approveList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="其他申报材料" width="300px">
        <el-tag size="small" v-for="item in fileVO.otherApplyMaterials" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="（二）业务资料" column="2">
      <el-descriptions-item label="借款或垫款凭证">
        <el-tag size="small" v-for="item in fileVO.loanCertificateList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="借款合同或协议">
        <el-tag size="small" v-for="item in fileVO.loanContractList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="风险五级分类认定表">
        <el-tag size="small" v-for="item in fileVO.riskFiveLevelList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="贷款余额查询">
        <el-tag size="small" v-for="item in fileVO.loanBalanceQueryList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions :title="evidenceDescription" column="2">
      <el-descriptions-item :label="`${item.name}`" v-for="item in fileVO.evidenceList" :key="item.id">
        <el-tag size="small" style="margin-right:10px;" v-for="file in item.fileVOList" :key="file.id">
          <a :download="`${file.name}`" :href="`${file.url}`">{{ file.name }}</a>
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions title="（四）会计资料" column="2">
      <el-descriptions-item label="核销会计凭证" width="300px">
        <el-tag size="small" v-for="item in fileVO.accountDocumentList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="放款会计凭证" width="300px">
        <el-tag size="small" v-for="item in fileVO.loanAccountDocumentList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="收回会计凭证" width="300px">
        <el-tag size="small" v-for="item in fileVO.revokeAccountDocumentList" :key="item.id" style="margin-right:10px;">
          <a :download="`${item.name}`" :href="`${item.url}`">{{ item.name }}</a>
        </el-tag>
      </el-descriptions-item>
    </el-descriptions>
    <el-button type="primary" @click="closeCurrentTag">返回</el-button>
  </div>
</template>

<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ApiResponse} from "@/model/resp/base/ApiResponse";
import {listAllFiles, listBadDebtAllFiles} from "@/api/file/file";
import {BadDebtFileVO, useBadDebtFileVO} from "@/model/vo/BadDebtFileVO";
import {reactive, computed} from "vue";
import {getNewestFileConfigVOById} from "../../api/bad-debt/confirm";
import {BadDebtWriteOffVO, useBadDebtVO} from "../../model/vo/BadDebtWriteOffVO";

export default {
  name: "FileManagementDetail",
  setup() {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    //数据的ID
    const id = route.query.id
    // 呆账核销数据所有文件
    const fileVO = reactive(useBadDebtFileVO())
    //获取详情
    listAllFiles(Number(id)).then((response: ApiResponse<BadDebtFileVO>) => {
      Object.assign(fileVO, response.data)
    })
    //呆账核销VO
    const badDebtWriteOffVO = reactive(useBadDebtVO())
    //档案和基本详情
    getNewestFileConfigVOById(Number(id)).then((response: ApiResponse<BadDebtWriteOffVO>) => {
      Object.assign(badDebtWriteOffVO, response.data)
    })
    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    //税收证据描述
    const evidenceDescription = computed(() => {
      if (badDebtWriteOffVO.basicFileConfigVO && badDebtWriteOffVO.basicFileConfigVO.evidenceDescription) {
        return '（三）证据资料(' + badDebtWriteOffVO.basicFileConfigVO.evidenceDescription + ')'
      }
      return ''
    })
    return {
      fileVO, closeCurrentTag, evidenceDescription
    }
  }
}
</script>

<style scoped>

</style>
