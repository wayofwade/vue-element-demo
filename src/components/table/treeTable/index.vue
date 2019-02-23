<template>
  <div class="contains" v-loading.fullscreen.lock="fullscreenLoading">
    <to-email :toEmailVisible="toEmailDialog" @close="closeEmailDialog" @save="sendEmail" ref="emailDialog">
    </to-email>
    <div class="head-wrap searchForm">
      <!--添加折叠-->
      <el-form :inline="true" class="demo-form-inline collapseForm">
         <el-button type="success" icon="el-icon-plus" @click="addTop" size="small">添加</el-button>
      </el-form>
    </div>
    <div class="tableDiv">
    <tree-table ref="recTree" :list.sync="treeDataSource" @actionFunc="actionFunc" @deleteFunc="deleteFunc" @addChild="addChild"
                @handlerExpand="handlerExpand" @orderByFunc="orderByFunc"></tree-table>
    </div>
    <!--编辑的对话框-->
    <add-dialog ref="addDialog" @updateList="getList"></add-dialog>
    <!--编辑的对话框-->
  </div>
</template>
<script>
import treeTable from './tree-table.vue'
import addDialog from './addDialog.vue'
export default {
  data () {
    return {
      fullscreenLoading: false, // loading
      toEmailDialog: false, // 邮件
      treeDataSource: [],
      formLabelWidth: '120px',
      form: {
        name: '',
        region: ''
      }
    }
  },
  components: {
    treeTable, addDialog
  },
  mounted () {
    this.getList()
    /* this.$nextTick(() => {
      setTimeout(
        () => that.expendTree(this.treeDataSource[0]), 800
      )
    }) */
  },
  methods: {
    getList () { // 获取所有的list
      this.treeDataSource = [
        {title: '标题1',
          level: '等级',
          count: 12,
          status: 0,
          children: [ {title: '子标题', level: '等级', count: 12, status: 0} ]},
        {title: '标题2', level: '等级', count: 12, status: 0},
        {title: '标题3', level: '等级', count: 12, status: 0},
        {title: '标题4', level: '等级', count: 12, status: 0},
        {title: '标题5', level: '等级', count: 12, status: 0},
        {title: '标题6', level: '等级', count: 12, status: 0},
        {title: '标题7', level: '等级', count: 12, status: 0},
        {title: '标题8', level: '等级', count: 12, status: 0}
      ]
    },
    expendTree (model) {
      model.isExpand = true
      model.bLeft = 34
      model.isExpand = !model.isExpand
    },
    orderByFunc (val) {
      alert('排序')
      alert(val)
    },
    actionFunc (model) { // 编辑页面的弹窗=type=2
      let data = {
        type: 2
      }
      let models = Object.assign(data, model)
      this.$refs.addDialog.showDialog(models)
    },
    addTop () { // 添加根目录=type=0
      let data = {
        type: 0
      }
      this.$refs.addDialog.showDialog(data)
    },
    deleteFunc (m) {
      alert('删除')
    },
    addChild (model) { // type=1
      // 判断level 》 2的时候就不能添加子节点
      if (model.level > 2) {
        this.$message({
          message: '不能添加三级目录',
          type: 'warning',
          duration: 1000
        })
        return false
      }
      let data = {
        type: 1
      }
      let models = Object.assign(data, model)
      this.$refs.addDialog.showDialog(models)
    },
    handlerExpand (m) {
      console.log('展开/收缩')
      console.log(m)
      m.isExpand = !m.isExpand
    },
    sendEmail (value) {
      console.log(value)
    },
    closeEmailDialog () {
      this.toEmailDialog = false
    }
  }
}
</script>

<style scoped>
  .contains {
   /* width: 960px;*/
    margin: 10px auto;
  }
  .searchForm{
    padding: 20px 50px 10px 50px;
    box-sizing: border-box;
    text-align: left;
  }
  .tableDiv{
    padding: 0 20px;
    box-sizing: border-box;
  }
</style>
