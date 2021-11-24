import { reactive, ref } from 'vue'
import * as echarts from 'echarts'
import { totalPreTaxDeduction } from '../../api/statistics/statistics'
import { useTable } from '../../model/req/query/Table'
import { StatisticVO } from '../../model/vo/StatisticVO'
import { QueryStatisticReq, useQueryStatisticReq } from '../../model/req/query/QueryStatisticReq'

// echarts笔数数据
export const echartsCountData = ref<Array<object>>([])
//金额
export const echartsAmountData = ref<Array<object>>([])
// echart
export const echart = echarts
// 初始化表格的对象
const initTable = useTable<StatisticVO, QueryStatisticReq>(useQueryStatisticReq(20))
// 父机构表格数据
export const table = reactive(initTable)

export function init() {
  //核销数据表格合计
  getSummaries()
}

//表格合计行
function getSummaries() {
  totalPreTaxDeduction(table.listQuery).then((response) => {
    if (echartsCountData.value.length > 0) {
      echartsCountData.value.length = 0
    }
    if (echartsAmountData.value.length > 0) {
      echartsAmountData.value.length = 0
    }
    //初始化echarts
    echartsCountData.value.push({
      value: response.data.declareTaxDeductionCount,
      name: '已申报税前扣除笔数'
    })
    echartsCountData.value.push({
      value: response.data.unDeclareTaxDeductionCount,
      name: '未申报税前扣除笔数'
    })
    echartsAmountData.value.push({
      value: response.data.declareTaxDeductionAmount,
      name: '已申报税前扣除金额'
    })
    echartsAmountData.value.push({
      value: response.data.unDeclareTaxDeductionAmount,
      name: '未申报税前扣除金额'
    })
    // 初始化echarts
    initEcharts()
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
      text: '核销税前扣除情况笔数分析',
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
        radius: '30%',
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
      text: '核销税前扣除情况金额分析',
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
        radius: '30%',
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
