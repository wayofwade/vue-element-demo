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
      YData: ['2002', '3424', '655', '4345', '4543', '565', '4566']
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
        backgroundColor: 'white',
        title: {
          text: '最近一周数据增量',
          textStyle: {
            color: 'black'
          },
          left: '36%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: 'black'
            }
          }
        },
        legend: {
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ['数据增量'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: 'orange'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: this.XData
        }],
        yAxis: [{
          type: 'value',
          name: '单位（条）',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: 'blue'
            }
          }
        }],
        series: [{
          name: '数据增量',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12

            }
          },
          data: this.YData
        }]
      })
    }
  }
}
</script>
