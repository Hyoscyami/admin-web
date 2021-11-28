<template>
  <div class="app-container">
    <el-form ref="addFormRef" :model="form" label-width="400px;">
      <el-row :gutter="20" class="row-margin">
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.approveList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :on-success="handleUploadSuccess"
          >
            <el-button size="small" type="primary">上传呆账核销申请报告</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.applyList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove2"
              :on-preview="handlePreview"
              :on-success="handleUploadSuccess2"
          >
            <el-button size="small" type="primary">上传呆账核销申请报告</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.otherApplyMaterials"
              :on-exceed="handleExceed"
              :on-remove="handleRemove8"
              :on-success="handleUploadSuccess8"
          >
            <el-button size="small" type="primary">上传其他申报材料</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-margin">
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.loanCertificateList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove4"
              :on-success="handleUploadSuccess4"
          >
            <el-button size="small" type="primary">上传借据或垫款凭证</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.loanContractList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove3"
              :on-success="handleUploadSuccess3"
          >
            <el-button size="small" type="primary">上传借款合同或协议</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.riskFiveLevelList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove6"
              :on-success="handleUploadSuccess6"
          >
            <el-button size="small" type="primary">上传风险五级分类认定表</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-margin">
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.loanBalanceQueryList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove7"
              :on-success="handleUploadSuccess7"
          >
            <el-button size="small" type="primary">上传贷款余额查询表</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="row-margin">
        <span>您需上传以下税收证据：{{ evidenceDescription }}</span>
      </el-row>
      <el-row :gutter="20" class="row-margin">
        <el-col :span="12" v-for="item in fileVO.evidenceList" :key="item.id" class="row-margin">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="item.fileVOList"
              :on-exceed="handleExceed"
              :on-remove="(file, fileList) => handleEvidenceRemove(file, fileList, item )"
              :on-preview="handlePreview"
              :on-success="(response, file, fileList) => handleEvidenceUploadSuccess( response, file, fileList, item )"
          >
            <el-button size="small" type="primary">{{ item.name }}
            </el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="row-margin">
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.accountDocumentList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove9"
              :on-success="handleUploadSuccess9"
          >
            <el-button size="small" type="primary">上传核销会计凭证</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.loanAccountDocumentList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove5"
              :on-success="handleUploadSuccess5"
          >
            <el-button size="small" type="primary">上传放款会计凭证</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :file-list="fileVO.revokeAccountDocumentList"
              :on-exceed="handleExceed"
              :on-remove="handleRemove5"
              :on-success="handleUploadSuccess5"
          >
            <el-button size="small" type="primary">上传核销收回凭证</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-form-item>
        <el-select v-model="form.fileCompleteStatus" placeholder="请选择文档完善状态" clearable>
          <el-option label="未完善" :value="false"/>
          <el-option label="已完善" :value="true"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="formSubmit">提交</el-button>
        <el-button @click="closeCurrentTag">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import {ApiResponse} from "@/model/resp/base/ApiResponse";
import {listAllFiles, missMaterialAdd} from "@/api/file/file";
import {BadDebtFileVO, useBadDebtFileVO} from "@/model/vo/BadDebtFileVO";
import {reactive, computed} from "vue";
import {errorMsg} from "../../utils/common";
import {useBadDebtConfirmReq} from "../../model/req/other/BadDebtConfirmReq";
import {handlePreview} from "../../composables/deferred-declaration";
import {useEvidenceFileReq} from "../../model/req/other/EvidenceFileReq";
import {getNewestFileConfigVOById} from "../../api/bad-debt/confirm";
import {BadDebtWriteOffVO, useBadDebtVO} from "../../model/vo/BadDebtWriteOffVO";

export default {
  name: "FileManagementEdit",
  components: {},

  setup() {
    const router = useRouter()
    const store = useStore()
    const route = useRoute()
    //数据的ID
    const id = route.query.id
    //表单
    const form = reactive(useBadDebtConfirmReq())
    // 呆账核销数据所有文件
    const fileVO = reactive(useBadDebtFileVO())
    //呆账核销VO
    const badDebtWriteOffVO = reactive(useBadDebtVO())
    //获取文件详情
    listAllFiles(Number(id)).then((response: ApiResponse<BadDebtFileVO>) => {
      Object.assign(fileVO, response.data)
      Object.assign(form, response.data)
      if (form.evidenceList) {
        form.evidenceList.forEach((evidence) => {
          evidence.evidenceList = evidence.fileVOList
        })
      }
      form.id = id
    })
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
    //上传文件的请求头
    const headers = reactive({'X-Auth-Token': store.state.user.token})

    /**
     * 文件上传超过数量限制处理
     */
    function handleExceed(files: any, fileList: any) {
      errorMsg('上传文件超过限制')
    }

    // 上传呆账核销申报审批表成功
    function handleUploadSuccess(response, file, fileList) {
      form.approveList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除呆账核销申报审批表成功
    function handleRemove(file, fileList) {
      form.approveList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 上传呆账核销申请报告
    function handleUploadSuccess2(response, file, fileList) {
      form.applyList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除呆账核销申请报告成功
    function handleRemove2(file, fileList) {
      form.applyList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 上传借款合同或协议
    function handleUploadSuccess3(response, file, fileList) {
      form.loanContractList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除借款合同或协议成功
    function handleRemove3(file, fileList) {
      form.loanContractList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 上传借据或垫款凭证
    function handleUploadSuccess4(response, file, fileList) {
      form.loanCertificateList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除借据或垫款凭证成功
    function handleRemove4(file, fileList) {
      form.loanCertificateList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 上传放款会计凭证
    function handleUploadSuccess5(response, file, fileList) {
      form.loanAccountDocumentList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 上传风险五级凭证
    function handleUploadSuccess6(response, file, fileList) {
      form.riskFiveLevelList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 上传贷款余额查询凭证
    function handleUploadSuccess7(response, file, fileList) {
      form.loanBalanceQueryList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 上传其他申报材料凭证
    function handleUploadSuccess8(response, file, fileList) {
      form.otherApplyMaterials = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除放款会计凭证成功
    function handleRemove5(file, fileList) {
      form.loanAccountDocumentList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除风险五级成功
    function handleRemove6(file, fileList) {
      form.riskFiveLevelList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除贷款余额查询成功
    function handleRemove7(file, fileList) {
      form.loanBalanceQueryList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除其他申报材料成功
    function handleRemove8(file, fileList) {
      form.otherApplyMaterials = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 上传核销会计凭证
    function handleUploadSuccess9(response, file, fileList) {
      form.accountDocumentList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除核销会计凭证成功
    function handleRemove9(file, fileList) {
      form.accountDocumentList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

// 上传附加证件
    function handleEvidenceUploadSuccess(response, file, fileList, item) {
      // 是否存在
      let isExist = form.evidenceList.some((evidence) => evidence.id === item.id)
      if (isExist) {
        form.evidenceList.forEach((evidence) => {
          if (evidence.id === item.id) {
            console.log('item替换', item, 'evidence', evidence)
            //存在，则替换掉文件列表
            evidence.evidenceList = fileList.map(file => ({
              name: file.name,
              url: file.response.data
            }))
          }
        })
      } else {
        // 不存在，push文件
        let evidence = reactive(useEvidenceFileReq())
        evidence.id = item.id
        evidence.name = item.name
        evidence.evidenceList = fileList.map(file => ({
          name: file.name,
          url: file.response.data
        }))
        form.evidenceList.push(evidence)
      }
    }

    // 处理附加证据删除
    function handleEvidenceRemove(file, fileList, item) {
      // 是否存在
      let isExist = form.evidenceList.some((evidence) => evidence.id === item.id)
      if (isExist) {
        form.evidenceList.forEach((evidence) => {
          if (evidence.id === item.id) {
            //存在，则替换掉文件列表
            evidence.evidenceList = fileList.map(file => ({
              name: file.name,
              url: file.response.data
            }))
          }
        })
      }
    }

//新增表单
    const formSubmit = () => {
      missMaterialAdd(form).then((response) => {
        closeCurrentTag()
      })
    }
    //税收证据描述
    const evidenceDescription = computed(() => {
      if (badDebtWriteOffVO.basicFileConfigVO && badDebtWriteOffVO.basicFileConfigVO.evidenceDescription) {
        return badDebtWriteOffVO.basicFileConfigVO.evidenceDescription
      }
      return ''
    })
    return {
      fileVO,
      closeCurrentTag,
      headers,
      handleExceed,
      form,
      handleUploadSuccess,
      handleUploadSuccess2,
      handleUploadSuccess3,
      handleUploadSuccess4,
      handleUploadSuccess5,
      handleUploadSuccess6,
      handleUploadSuccess7,
      handleUploadSuccess8,
      handleRemove,
      handleRemove2,
      handleRemove3,
      handleRemove4,
      handleRemove5,
      handleRemove6,
      handleRemove7,
      handleRemove8,
      handleUploadSuccess9,
      handleRemove9,
      handlePreview,
      handleEvidenceUploadSuccess,
      handleEvidenceRemove,
      formSubmit, evidenceDescription
    }
  }
}
</script>

<style scoped>
.row-margin {
  margin-bottom: 20px;
}
</style>
