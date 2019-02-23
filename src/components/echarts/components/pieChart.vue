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
    initChart () {
      this.chart = echarts.init(document.getElementById(this.chart)) // echarts渲染要根据id的
      this.chart.setOption({
        title: {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
              type: ['pie', 'funnel'],
              option: {
                funnel: {
                  x: '25%',
                  width: '50%',
                  funnelAlign: 'left',
                  max: 1548
                }
              }
            },
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
              {value: 135, name: '视频广告'},
              {value: 1548, name: '搜索引擎'}
            ]
          }
        ]
      })
    }
  }
}
</script>
