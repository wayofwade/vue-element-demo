<template>
<div>
  <el-container>
    <el-header>
      <Head class="head-right"></Head>
    </el-header>
    <el-container>
      <div class="main-div">
        <div class="left-div">
            <el-menu
              default-active="0"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              @select="selectTab"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b">
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>常用的组件</span>
                </template>
                  <el-menu-item index="0">websocket测试</el-menu-item>
                  <el-menu-item index="1">常用table</el-menu-item>
                  <el-menu-item index="2">树形table</el-menu-item>
                  <el-menu-item index="3">form表单</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>不常用的组件</span>
                </template>
                <el-menu-item index="6">Echarts</el-menu-item>
                <el-menu-item index="1-2">组件2</el-menu-item>
                <el-menu-item index="1-3">组件3</el-menu-item>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>封装的组件</span>
                </template>
                <el-menu-item index="1-1">组件1</el-menu-item>
                <el-menu-item index="1-2">组件2</el-menu-item>
                <el-menu-item index="1-3">组件3</el-menu-item>
              </el-submenu>
            </el-menu>
        </div>
        <div class="right-div">
          <router-view @fromRouteName="getRouteName"></router-view>
        </div>
      </div>
    </el-container>
  </el-container>
</div>
</template>

<script>
import Head from '@/components/home/head.vue'
import sideBar from '@/components/home/sideBar.vue'
const routeList = [
  {index: 1, path: '/table/normalTable'},
  {index: 0, path: '/layout/chatService'},
  {index: 2, path: '/table/treeTable'},
  {index: 3, path: '/formData/index'},
  {index: 6, path: '/echarts/index'}
] // 路由的list
export default {
  name: 'HelloWorld',
  components: { Head, sideBar },
  data () {
    return {
      routeName: '',
      hello: 'hello',
      asyncRouterMap1: [],
      flag: true,
      tags: []
    }
  },
  created () {
  },
  methods: {
    getRouteByIndex (indexs) { // 查询路由
      let path = routeList.filter((item, index) => {
        return Number(indexs) === Number(item.index)
      })
      return path[0].path
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    selectTab (key, keyPath) { // 选择的彩蛋
      console.log(key, keyPath)
      let path = this.getRouteByIndex(key)
      console.log('路径=' + path)
      this.$router.push(path)
    },
    handleSetLineChartData (val) {
      console.log(val)
    },
    getRouteName (val) {
      this.routeName = val
    }
  }
}
</script>

<style scoped>
.head-right{
  padding: 0px;
  box-sizing: border-box;
}
  .name{
    height: 60px;
    width: 300px;
    position:absolute;
    top: 0;
    left: 0;
    text-align: center;
    font-size: 30px;
    line-height: 60px;
    color: #fff;
    background: #324057;
  }
  .main-div{
    height: calc(100vh - 60px);
    /*background-color: #545c64;*/
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .left-div{
    width: 240px;
    text-align: left;
    margin-right: 2px;
    background-color: #545c64;
  }
  .el-menu-vertical-demo{
    width: 240px;
  }
.right-div{
  flex: 1;
  width: calc(100vw - 242px);
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
  width:200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
  width: calc(100vw - 200px);
}

body > .el-container {
  margin-bottom: 40px;
}
</style>
