import { reactive, ref } from 'vue'
import {
  listPreTaxDeductionYears,
  totalWriteOffRevokeCount,
  writeOffRevokeCount as list,
  writeOffRevokeCountExport
} from '@/api/statistics/statistics'
import { SelectGroup, useTable } from '@/model/req/query/Table'
import { formatYYYY } from '@/utils/time'
import { listChildrenByCode } from '@/api/sys/dict'
import { DictEnum } from '@/enums/DictEnum'
import { DictVO } from '@/model/vo/DictVO'
import { StatisticVO } from '../../../model/vo/StatisticVO'
import { QueryStatisticReq, useQueryStatisticReq } from '../../../model/req/query/QueryStatisticReq'
import { entityList } from '../../../api/sys/org'
import { useQueryOrgReq } from '../../../model/req/query/QueryOrgReq'
import * as echarts from 'echarts'

// 初始化表格的对象
const initTable = useTable<StatisticVO, QueryStatisticReq>(useQueryStatisticReq(20))
//默认为按机构查询
initTable.listQuery.type = 2
// 父机构表格数据
export const table = reactive(initTable)

// 表格ref
export const tableRef = ref(null)
// 搜索表格的搜索表单
export const searchFormRef = ref(null)
// 级联选择
// 对话框新增表单ref
export const addFormRef = ref(null)
//表格合计
export const tableTotal = ref<Array<string | number>>(['合计'])
//导出加载
export const exportLoading = ref(false)
// echarts笔数数据
export const echartsCountData = ref<Array<object>>([])
//金额
export const echartsAmountData = ref<Array<object>>([])
// echart
export const echart = echarts

// 初始化
export function init() {
  // 初始化资产类型
  // listTypes()
  //初始化年份
  listYears()
  //初始化组织
  listOrgs()
  // 初始化表格
  searchFormSubmit()
}

// 搜索机构表单查询
export function searchFormSubmit() {
  table.listQuery.page = 1
  getList()
}

// 获取资产类型下拉框
export function listTypes() {
  listChildrenByCode(DictEnum.ASSERT_TYPE).then((response) => {
    if (table.typesSelect) {
      table.typesSelect.length = 0
    }
    response.data.forEach((item: DictVO) => {
      const type: SelectGroup = {
        id: item.id,
        text: item.name,
        value: item.id
      }
      if (table.typesSelect) {
        table.typesSelect.push(type)
      }
    })
  })
}

// 获取组织下拉框
export function listOrgs() {
  entityList(useQueryOrgReq(20)).then((response) => {
    if (table.orgsSelect) {
      table.orgsSelect.length = 0
    }
    response.data.forEach((item: DictVO) => {
      const type: SelectGroup = {
        id: item.id,
        text: item.name,
        value: item.id
      }
      if (table.orgsSelect) {
        table.orgsSelect.push(type)
      }
    })
  })
}

// 获取可选择年份下拉框
export function listYears() {
  listPreTaxDeductionYears().then((response) => {
    if (table.yearsSelect) {
      table.yearsSelect.length = 0
    }
    response.data.forEach((item: number) => {
      const type: SelectGroup = {
        id: item,
        text: item.toString(),
        value: item
      }
      if (table.yearsSelect) {
        table.yearsSelect.push(type)
      }
    })
  })
}

// 获取父机构列表数据
export function getList() {
  table.listLoading = true
  if (table.listQuery.orgId) {
    table.listQuery.orgIds = [table.listQuery.orgId]
  }
  list(table.listQuery).then((response) => {
    table.tableData = response.data.records
    table.total = response.data.total
    table.listLoading = false
  })
  //刷新表格合计总数
  getSummaries()
}

// 表格的搜索表单重置
export function resetSearchForm() {
  // @ts-ignore
  searchFormRef.value.searchFormRef.resetFields()
}

// 根据类型刷新表格
export function filterTableType(data: any) {
  // 重置查询条件
  table.listQuery.page = 1
  if (data.status != undefined && data.status.length === 0) {
    // @ts-ignore
    table.listQuery.status.length = 0
  }
  if (data.type != undefined && data.type.length === 0) {
    // @ts-ignore
    table.listQuery.types.length = 0
  }
  console.log('data:', data)
  // @ts-ignore
  table.listQuery.status = table.listQuery.status.concat(data.status).filter((item) => item != null)
  // @ts-ignore
  table.listQuery.types = table.listQuery.types.concat(data.type).filter((item) => item != null)

  // 刷新表格数据
  getList()
}

// 日期转换
export function formatDate(_row: any, _column: any, cellValue: any): string {
  return formatYYYY(cellValue)
}

// 比例显示
export function formatProportion(_row: any, _column: any, cellValue: any): string {
  return cellValue + '%'
}

//表格合计行
function getSummaries() {
  totalWriteOffRevokeCount(table.listQuery).then((response) => {
    tableTotal.value = ['合计']
    tableTotal.value.push(response.data.writtenOffCount)
    tableTotal.value.push(response.data.writtenOffAmount)
    tableTotal.value.push(response.data.revokeCount)
    tableTotal.value.push(response.data.revokeAmount)
    tableTotal.value.push(response.data.revokedProportion + '%')
    tableTotal.value.push(response.data.unRevokeCount)
    tableTotal.value.push(response.data.unRevokeAmount)
    tableTotal.value.push(response.data.unRevokeProportion + '%')
    if (echartsCountData.value.length > 0) {
      echartsCountData.value.length = 0
    }
    if (echartsAmountData.value.length > 0) {
      echartsAmountData.value.length = 0
    }
    //初始化echarts
    echartsCountData.value.push({
      value: response.data.revokeCount,
      name: '核销收回笔数'
    })
    echartsCountData.value.push({
      value: response.data.unRevokeCount,
      name: '核销未收回笔数'
    })
    echartsAmountData.value.push({
      value: response.data.revokeAmount,
      name: '核销收回金额'
    })
    echartsAmountData.value.push({
      value: response.data.unRevokeAmount,
      name: '核销未收回金额'
    })
    // 初始化echarts
    initEcharts()
  })
}

//表格合计行
export function getTableTotal() {
  return tableTotal.value
}

//导出
export function exportList() {
  exportLoading.value = true
  writeOffRevokeCountExport(table.listQuery).then((response) => {
    window.open(response.data)
    exportLoading.value = false
  })
}

//初始化echarts
export function initEcharts() {
  type EChartsOption = echarts.EChartsOption

  // @ts-ignore
  const myChartCount = echart.init(document.getElementById('echartCount'))
  // @ts-ignore
  const myChartAmount = echart.init(document.getElementById('echartAmount'))
  //笔数
  let countOption: EChartsOption
  //金额
  let amountOption: EChartsOption

  countOption = reactive({
    title: {
      text: '核销收回情况笔数分析',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    label: {
      alignTo: 'edge',
      formatter: '{b}\n{c} 笔;\n比例:{d}%',
      minMargin: 5,
      edgeDistance: 10,
      lineHeight: 15,
      rich: {
        time: {
          fontSize: 10,
          color: '#999'
        }
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '40%',
        data: echartsCountData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })
  amountOption = reactive({
    title: {
      text: '核销收回情况金额分析',
      subtext: '',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    label: {
      alignTo: 'edge',
      formatter: '{b}\n{c} 元;\n比例:{d}%',
      minMargin: 5,
      edgeDistance: 10,
      lineHeight: 15,
      rich: {
        time: {
          fontSize: 10,
          color: '#999'
        }
      }
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '40%',
        data: echartsAmountData.value,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  })

  myChartCount.setOption(countOption)
  myChartAmount.setOption(amountOption)
}
