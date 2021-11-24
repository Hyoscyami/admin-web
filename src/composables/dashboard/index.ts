import { reactive, ref } from 'vue'
import * as echarts from 'echarts'
import { totalPreTaxDeduction, totalWriteOffRevokeCount } from '../../api/statistics/statistics'
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
// echarts笔数数据
export const echartsCountData2 = ref<Array<object>>([])
//金额
export const echartsAmountData2 = ref<Array<object>>([])
// echart
export const echart2 = echarts
// 初始化表格的对象
const initTable2 = useTable<StatisticVO, QueryStatisticReq>(useQueryStatisticReq(20))
// 父机构表格数据
export const table2 = reactive(initTable2)

export function init() {
  //核销数据表格合计
  getSummaries()
  //核销收回数据合计
  getSummaries2()
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

//表格合计行
function getSummaries2() {
  totalWriteOffRevokeCount(table.listQuery).then((response) => {
    if (echartsCountData2.value.length > 0) {
      echartsCountData2.value.length = 0
    }
    if (echartsAmountData2.value.length > 0) {
      echartsAmountData2.value.length = 0
    }
    //初始化echarts
    echartsCountData2.value.push({
      value: response.data.revokeCount,
      name: '核销收回笔数'
    })
    echartsCountData2.value.push({
      value: response.data.unRevokeCount,
      name: '核销未收回笔数'
    })
    echartsAmountData2.value.push({
      value: response.data.revokeAmount,
      name: '核销收回金额'
    })
    echartsAmountData2.value.push({
      value: response.data.unRevokeAmount,
      name: '核销未收回金额'
    })
    // 初始化echarts
    initEcharts2()
  })
}

//初始化echarts
export function initEcharts2() {
  type EChartsOption = echarts.EChartsOption

  // @ts-ignore
  const myChartCount = echart2.init(document.getElementById('echartCount2'))
  // @ts-ignore
  const myChartAmount = echart2.init(document.getElementById('echartAmount2'))
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
        radius: '30%',
        data: echartsCountData2.value,
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
        radius: '30%',
        data: echartsAmountData2.value,
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
