<template>
  <div class="chart" :id="chart" style="height:100%;width:100%;"></div>
</template>
<style scoped>
</style>
<script>
import echarts from 'echarts'
export default {
  props: ['id'],
  data () {
    // 在初始化的时候赋值就可以
    return {
      chart: 'chart' + this.id,
      XData: ['03-19', '03-20', '03-21', '03-22', '03-25', '03-26', '03-27'],
      YData: ['2002', '3424', '655', '4345', '4543', '565', '4566'],
      xAxis: [
        {
          type: 'category',
          data: ['Cosco', 'CMA', 'APL', 'OOCL', 'Wanhai', 'Zim']
        }
      ],
      yAxis: [
        {
          type: 'value',
          boundaryGap: [0, 0.1]
        }
      ]
    }
  },
  created () {
    // this.getData() // 去掉注释的时候把mounted的方法去掉
  },
  mounted () {
    this.initChart() // 初始化图标
  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getData () { // 获取数据
    },
    createRandomItemStyle () {
      return {
        normal: {
          color: 'rgb(' + [
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160),
            Math.round(Math.random() * 160)
          ].join(',') + ')'
        }
      }
    },
    initChart () {
      this.chart = echarts.init(document.getElementById(this.chart)) // echarts渲染要根据id的
      this.chart.setOption(
        {
          title: {
            text: '预算 vs 开销',
            subtext: '虚构'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            orient: 'vertical',
            x: 'right',
            y: 'bottom',
            data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          polar: [
            {
              indicator: [
                {text: '销售（sales）', max: 6000},
                {text: '管理（Administration）', max: 16000},
                {text: '信息技术（Information Techology）', max: 30000},
                {text: '客服（Customer Support）', max: 38000},
                {text: '研发（Development）', max: 52000},
                {text: '市场（Marketing）', max: 25000}
              ]
            }
          ],
          calculable: true,
          series: [
            {
              name: '预算 vs 开销（Budget vs spending）',
              type: 'radar',
              data: [
                {
                  value: [4300, 10000, 28000, 35000, 50000, 19000],
                  name: '预算分配（Allocated Budget）'
                },
                {
                  value: [5000, 14000, 28000, 31000, 42000, 21000],
                  name: '实际开销（Actual Spending）'
                }
              ]
            }
          ]
        }
      )
    }
  }
}
</script>
