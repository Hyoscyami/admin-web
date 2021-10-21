<template>
  <div class="app-container">
    <el-table
        v-loading="table.listLoading"
        class="el-table"
        :cell-style="cellClass"
        :header-cell-style="headerClass"
        :data="table.tableData"
        style="width: 100%;margin-bottom: 20px;"
        border
    >
      <el-table-column
          prop="borrowerName"
          label="借款人"
      />
      <el-table-column
          prop="borrowerIdNo"
          label="借款人证件号"
      />
      <el-table-column
          prop="loanAccountNo"
          label="贷款账号"
      />
      <el-table-column
          prop="borrowTime"
          label="借款日期"
          :formatter="formatDate"
      />
      <el-table-column
          prop="expireTime"
          label="到期日期"
          :formatter="formatDate"
      />
      <el-table-column
          prop="loanAmount"
          label="借款金额"
      />
      <el-table-column
          prop="repayAmount"
          label="还款金额"
      />
      <el-table-column label="核销金额" align="center">
        <el-table-column
            prop="capital"
            label="本金"
        />
        <el-table-column
            prop="onBalanceSheetInterest"
            label="表内利息"
        />
        <el-table-column
            prop="offBalanceSheetInterest"
            label="表外利息"
        />
        <el-table-column
            prop="charges"
            label="应收费用"
        />
      </el-table-column>
    </el-table>
    <el-form ref="addFormRef" :model="form" label-width="130px">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="资产类型" prop="confirmationConditions">
            <el-select v-model="matchFileConfigReq.assetType" placeholder="请选择资产类型" @change="matchConfig" clearable>
              <el-option v-for="item in assetTypes" :key="item.id" :label="item.text" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="逾期天数">
            <span style="color: red;">{{ tableVO.overdueDays }}</span> 天
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="认定条件" prop="confirmationConditions">
            <el-select v-model="matchFileConfigReq.confirmationConditions" @change="matchConfig" placeholder="请选择认定条件"
                       clearable>
              <el-option v-for="item in confirmConditions" :key="item.id" :label="item.text" :value="item.value"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="关联事项类型">
            <span>{{ basicFileConfigVO.relationTypeName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="起始时间">
            <el-date-picker
                v-model="matchFileConfigReq.startTime"
                :disabled-date="disabledDate"
                type="date"
                format="YYYYMMDD"
                @change="matchConfig"
                placeholder="请选择起始时间">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="预警剩余时间">
            <span style="color: red;">{{ basicFileConfigVO.warningLeftDays }}</span> 天
          </el-form-item>
        </el-col>
        <el-form-item label="税收确认证据描述">
          <span>{{ basicFileConfigVO.evidenceDescription }}</span>
        </el-form-item>
      </el-row>
      <el-row class="row-margin">
        <el-form-item label="税收确认证据">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :on-exceed="handleExceed"
              :on-remove="(file, fileList) => handleEvidenceRemove(file, fileList, item )"
              :on-preview="handlePreview"
              :on-success="(response, file, fileList) => handleEvidenceUploadSuccess( response, file, fileList, item )"
              v-for="item in basicFileConfigVO.evidenceList" :key="item.id"
          >
            <el-button size="small" type="primary">上传{{ item.name }}</el-button>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row class="row-margin">
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :on-exceed="handleExceed"
              :on-remove="handleRemove"
              :on-preview="handlePreview"
              :on-success="handleUploadSuccess"
          >
            <el-button size="small" type="primary">上传呆账核销申报审批表</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
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
              :on-exceed="handleExceed"
              :on-remove="handleRemove3"
              :on-success="handleUploadSuccess3"
          >
            <el-button size="small" type="primary">上传借款合同或协议</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="row-margin">
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
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
              :on-exceed="handleExceed"
              :on-remove="handleRemove6"
              :on-success="handleUploadSuccess6"
          >
            <el-button size="small" type="primary">上传风险五级</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="row-margin">
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :on-exceed="handleExceed"
              :on-remove="handleRemove7"
              :on-success="handleUploadSuccess7"
          >
            <el-button size="small" type="primary">上传贷款余额查询</el-button>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
              class="upload-demo"
              action="/api/file/upload"
              multiple
              :headers="headers"
              :on-exceed="handleExceed"
              :on-remove="handleRemove8"
              :on-success="handleUploadSuccess8"
          >
            <el-button size="small" type="primary">上传其他申报材料</el-button>
          </el-upload>
        </el-col>
      </el-row>
      <el-row class="row-margin">
        <el-col :span="8">
          <el-form-item label="审核结果" prop="daysOverdueType">
            <el-select v-model="form.status" placeholder="请选择审核结果" multiple clearable>
              <el-option label="拟申报税前扣除" :value="3"/>
              <el-option label="等待逾期时间满1年" :value="4"/>
              <el-option label="等待宣告破产满3年" :value="5"/>
              <el-option label="等待关闭、解散或撤销满3年" :value="6"/>
              <el-option label="等待注销、吊销满3年" :value="7"/>
              <el-option label="等待停止经营活动或下落不明满3年" :value="8"/>
              <el-option label="等待自然人死亡满3年" :value="9"/>
              <el-option label="等待丧失能力满3年" :value="10"/>
              <el-option label="等待自然人失踪满3年" :value="11"/>
              <el-option label="等待侦查时间满2年" :value="12"/>
              <el-option label="等待补充证据" :value="13"/>
              <el-option label="等待诉诸法律" :value="14"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="needDeclareYear">
          <el-form-item label="申报年份" prop="declareYear">
            <el-date-picker
                v-model="form.declareYear"
                :disabled-date="disabledDate"
                type="year"
                format="YYYY"
                placeholder="请选择申报年份">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="formSubmit">提交</el-button>
        <el-button @click="closeCurrentTag">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Pagination from "../../../components/Pagination/index.vue";
import {defineComponent, reactive, ref, toRaw, computed} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {
  addFormRef,
  assetTypes,
  confirmConditions,
  convertStatusToChinese,
  formatDate,
  handleExceed,
  handlePreview
} from "../../../composables/bad-debt/evidence";
import {init} from '@/composables/bad-debt/evidence';
import {cellClass, headerClass} from "../../../composables/sys/dict";
import SearchForm from "../confirm/components/SearchForm.vue";
import {useBadDebtConfirmReq} from "../../../model/req/other/BadDebtConfirmReq";
import {confirm, detail, match} from "../../../api/bad-debt/confirm";
import {ApiResponse} from "../../../model/resp/base/ApiResponse";
import {BadDebtWriteOffVO, useBadDebtVO} from "../../../model/vo/BadDebtWriteOffVO";
import {useMatchBasicFileConfigReq} from "../../../model/vo/MatchBasicFileConfigReq";
import {useTable} from "../../../model/req/query/Table";
import {QueryBadDebtReq, useQueryBadDebtReq} from "../../../model/req/query/QueryBadDebtReq";
import {errorMsg, successMsg} from "../../../utils/common";
import {useBasicFileConfigVO} from "../../../model/vo/BasicFileConfigVO";
import {CommonEnum} from "../../../enums/CommonEnum";
import {useEvidenceFileReq} from "../../../model/req/other/EvidenceFileReq";
import {formatYYYY} from "../../../utils/time";

export default defineComponent({
  name: "BadDebtEvidenceVerify",
  components: {SearchForm, Pagination},
  setup() {
    // 初始化
    init()
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    //待编辑数据的ID
    const id = route.query.id
    //表单
    const form = reactive(useBadDebtConfirmReq())
    form.id = id
    //匹配档案
    const matchFileConfigReq = reactive(useMatchBasicFileConfigReq())
    matchFileConfigReq.id = id
    //表格展示
    const tableVO = reactive(useBadDebtVO())
    //上传文件的请求头
    const headers = reactive({'X-Auth-Token': store.state.user.token})
    //获取详情
    detail(id).then((response: ApiResponse<object>) => {
      Object.assign(tableVO, response.data)
    })
    //档案设置
    const basicFileConfigVO = reactive(useBasicFileConfigVO())
    //匹配档案
    const
        matchConfig = () => {
          //选择了资产类型和认定条件后
          if (matchFileConfigReq.assetType && matchFileConfigReq.confirmationConditions) {
            successMsg('开始匹配基础档案')
            match(matchFileConfigReq).then((response) => {
              if (response.data) {
                Object.assign(basicFileConfigVO, response.data)
              } else {
                errorMsg('未匹配到基础档案')
                Object.assign(basicFileConfigVO, useBasicFileConfigVO())
              }
            })
          }
        }
    const table = useTable<BadDebtWriteOffVO, QueryBadDebtReq>(useQueryBadDebtReq(20))
    table.listLoading = false
    table.tableData = [tableVO]

    //时间选择，禁用时间
    function disabledDate(time) {
      return time.getTime() > Date.now()
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
      form.otherApplyMaterials = fileList.map(file => ({
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
      form.loanAccountDocumentList = fileList.map(file => ({
        name: file.name,
        url: file.response.data
      }))
    }

    // 删除放款会计凭证成功
    function handleRemove5(file, fileList) {
      form.loanCertificateList = fileList.map(file => ({
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

    //关闭当前标签页
    const closeCurrentTag = () => {
      store.dispatch('tagsView/delCurrentViews', {
        view: route,
        $router: router
      })
    }
    //新增表单
    const formSubmit = () => {
      form.assetType = toRaw(matchFileConfigReq).assetType
      form.assetTypeName = toRaw(basicFileConfigVO).assetTypeName
      form.confirmationConditions = toRaw(matchFileConfigReq).confirmationConditions
      form.confirmationConditionsName = toRaw(basicFileConfigVO).confirmationConditionsName
      form.startTime = toRaw(tableVO).expireTime
      form.basicFileConfigId = toRaw(basicFileConfigVO).id
      if (form.declareYear) {
        form.declareYear = formatYYYY(form.declareYear)
      }
      confirm(form).then((response: ApiResponse<object>) => {
        if (response.code !== CommonEnum.SUCCESS_CODE) {
          errorMsg(response.msg)
        } else {
          //提交成功，关闭当前页面
          closeCurrentTag()
        }
      })
    }

    // 上传附加证件
    function handleEvidenceUploadSuccess(response, file, fileList, item) {
      // 是否存在
      let isExist = form.evidenceList.some((evidence) => evidence.id === item.id)
      if (isExist) {
        form.evidenceList.forEach((evidence) => {
          //存在，则替换掉文件列表
          evidence.evidenceList = fileList.map(file => ({
            name: file.name,
            url: file.response.data
          }))
        })
      } else {
        // 不存在，push文件
        let evidence = reactive(useEvidenceFileReq())
        evidence.badDebtEvidenceId = item.id
        evidence.evidenceName = item.name
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
          //存在，则替换掉文件列表
          evidence.evidenceList = fileList.map(file => ({
            name: file.name,
            url: file.response.data
          }))
        })
      }
    }

    // 是否需要显示申报年度
    const needDeclareYear = computed(() => {
      if (!form.status) {
        return false
      }
      return form.status.some(status => status === 3)
    })

    return {
      table,
      cellClass,
      headerClass,
      convertStatusToChinese,
      formatDate,
      addFormRef,
      tableVO,
      form,
      matchFileConfigReq,
      confirmConditions,
      assetTypes,
      matchConfig,
      disabledDate,
      basicFileConfigVO,
      headers,
      handleExceed,
      handleUploadSuccess,
      handleUploadSuccess2,
      handleUploadSuccess3,
      handleUploadSuccess4,
      handleUploadSuccess5,
      handleUploadSuccess6,
      handleUploadSuccess7,
      handleUploadSuccess8,
      handlePreview,
      handleRemove,
      handleRemove2,
      handleRemove3,
      handleRemove4,
      handleRemove5,
      handleRemove6,
      handleRemove7,
      handleRemove8,
      closeCurrentTag,
      formSubmit,
      handleEvidenceUploadSuccess,
      handleEvidenceRemove, needDeclareYear
    }
  }
})
</script>

<style scoped>
.row-margin {
  margin-bottom: 20px;
}
</style>
