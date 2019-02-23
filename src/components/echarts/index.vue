<!--
ecahrts使用方法：
1-登录https://echarts.baidu.com/echarts2/doc/example.html 点击进入具体的图表
2-把此项目的lineChart.vue的this.chart.setOption({})里面的对象改为echarts官网的options的数据就可以
-->
<template>
  <div id="all">
    <div id="topChart">
      <div id="top-left">
        <v-last-week :id="1"></v-last-week>
      </div>
      <div id="top-right">
        <v-last-week :id="2"></v-last-week>
      </div>
    </div>
    <div id="bottomChart">
      <div id="bottom-left">
        <v-dept-size :id="3"></v-dept-size>
      </div>
      <div id="bottom-right">
        <v-dept-tables :id="4"></v-dept-tables>
      </div>
    </div>
  </div>
</template>

<script>
import vLastWeek from './components/lineChart'
import vDeptTables from './components/radarChart.vue'
import vDeptSize from './components/pieChart.vue'
export default {
  components: { vLastWeek, vDeptTables, vDeptSize },
  data () {
    return {
      deptTables: 'deptTables',
      TpAndDpAndSys: { // 三个数据
        topic: {typeSize: '', tableSize: ''},
        system: {typeSize: '', tableSize: ''},
        dp: {typeSize: '', tableSize: ''}
      },
      phySize: '555', // 物理存储
      modelData: [ // 模型层次的数据 == 如果不写数据会报错但是不影响程序运行
        {
          name: 'DWD', counts: 666, phy: 30490
        },
        {
          name: 'DWD', counts: 666, phy: 30490
        },
        {
          name: 'DWD', counts: 666, phy: 30490
        }
      ]
    }
  },
  created () {
    this.getPhySize() // 总的物理存储
    this.getTpAndDpAndSys() // 得到三个数据
    this.getModelData() // 得到模型的数据
  },
  methods: {
    getPhySize () {
    },
    getTpAndDpAndSys () {
    },
    getModelData () {
    }
  }
}
</script>

<style scoped>
#all{
  width:100%;
  height:100%;
  padding: 0;
  margin: 0;
  background-color: whitesmoke;
}
#topChart{
  width:100%;
  height:48%;
  background-color: whitesmoke;
  padding: 20px 10px;
  box-sizing: border-box;
}
#top-left{
  width:calc(50% - 10px);
  height:100%;
  background-color: white;
  float: left;
  margin-right: 20px;
}
#top-right{
  width:calc(50% - 10px);
  height:100%;
  background-color: white;
  float:right;
}
#bottomChart{
  width:100%;
  height:45%;
  padding: 20px 10px;
  box-sizing: border-box;
  background-color: whitesmoke;
}
#bottom-left{
  width:calc(50% - 10px);
  height:100%;
  background-color: white;
  float: left;
  margin-right: 20px;
}
#bottom-right{
  width:calc(50% - 10px);
  height:100%;
  background-color: white;
  float:right;
}
#comp{
  width:100%;
  height:7%;
}
</style>
