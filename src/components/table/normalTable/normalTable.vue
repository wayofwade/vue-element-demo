<template>
  <div id="all">
      <div id="tableList">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline collapseForm searchForm">
          <el-form-item label="ID">
            <el-input v-model="searchForm.id" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="searchForm.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" @change="changeStatus" placeholder="状态" size="mini" clearable>
              <el-option label="全部" value=""></el-option>
              <el-option label="正常" value=0></el-option>
              <el-option label="不正常" value=1></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" style="margin-left: 30px;" size="mini" @click="searchButton()">搜索</el-button>
          <el-button type="primary" style="margin-left: 30px;" size="mini" @click="addTables">添加</el-button>
          <el-button style="margin-left: 30px;" icon="el-icon-message" @click="emailDialog">邮件导出</el-button>
        </el-form>

    <el-table id="tables"
                :data="tableData"
                 max-height="550"
                :default-sort = "{prop: 'updateTime'}">
        <el-table-column
          type="selection"
          width="55"
          align="center">
        </el-table-column>
        <el-table-column
          prop="id"
          width="0"
          v-if="false">
        </el-table-column>
        <el-table-column
          label="名字"
          width="100">
          <template slot-scope="scope">
              <el-button style="margin-left: 10px" type="text" size="medium" @click="tableDetail(scope.row)">
                {{scope.row.name}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="年龄"
          width="100"
          align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              {{ scope.row.age}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="地址"
          width="180"
          align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.address }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别"
          width="80"
          align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="80"
          align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="更新时间"
          sortable
          width="250"
          prop="updateTime"
          align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
            <el-button
              size="mini"
              type="success"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleChange(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div id="pageList">
      <div id="block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          layout="total, prev, pager, next, jumper"
          :page-size = "page.size"
          :total="page.fileTotal">
        </el-pagination>
      </div>
    </div>
    <to-email :ifTimeRange="false" :ifShowTime="true" :toEmailVisible="toEmailDialog"
              @close="closeEmailDialog" @save="sendEmail"></to-email>
  </div>
</template>

<script>
import toEmail from '@/components/common/toEmail/toEmailWithTime.vue'
export default {
  components: { toEmail },
  data () {
    return {
      toEmailDialog: false,
      searchForm: { // 搜索条件的
        id: '',
        status: '',
        name: ''
      },
      page: { // 分页相关
        fileTotal: 200,
        pageSize: 20,
        currentPage: 1
      },
      tableData: [
        {id: 1, name: '德玛西亚', age: 24, address: '北京', sex: '男', updateTime: '2018-09-10', status: '正常'},
        {id: 2, name: '赵信', age: 24, address: '上海', sex: '男', updateTime: '2018-09-09', status: '正常'},
        {id: 3, name: '剑圣', age: 89, address: '杭州', sex: '男', updateTime: '2018-09-12', status: '正常'},
        {id: 4, name: '蛮王', age: 24, address: '北京', sex: '男', updateTime: '2018-10-09', status: '正常'},
        {id: 5, name: '潘僧', age: 24, address: '北京', sex: '男', updateTime: '2018-03-09', status: '正常'},
        {id: 6, name: '狗头', age: 24, address: '北京', sex: '男', updateTime: '2018-09-09', status: '正常'},
        {id: 7, name: '石头人', age: 24, address: '北京', sex: '男', updateTime: '2018-04-09', status: '正常'},
        {id: 8, name: '诺克', age: 24, address: '北京', sex: '男', updateTime: '2018-09-09', status: '正常'},
        {id: 9, name: '潘僧', age: 24, address: '北京', sex: '男', updateTime: '2018-05-09', status: '正常'},
        {id: 10, name: '狗头', age: 24, address: '北京', sex: '男', updateTime: '2018-09-09', status: '正常'},
        {id: 11, name: '石头人', age: 24, address: '北京', sex: '男', updateTime: '2018-06-09', status: '正常'}
      ] // 分页列表
    }
  },
  created () {
    this.$emit('fromRouteName', this.$route.name)
  },
  methods: {
    emailDialog () {
      this.toEmailDialog = true
    },
    sendEmail (value) { // 打印邮件信息
      console.log('打印的就是弹窗里的信息')
      console.log(value)
      this.toEmailDialog = false
      this.$message({
        message: '发送成功',
        type: 'success',
        showClose: true,
        duration: '2000'
      })
    },
    closeEmailDialog () {
      this.toEmailDialog = false
    },
    searchButton () {
    },
    changeStatus (val) {
      console.log(val)
    },
    handleCurrentChange (val) { // 翻页的时候==
      this.page.currentPage = val
      console.log(val)
    },
    handleClose (tag) { // 关闭标签
    },
    tableDetail (row) { // 详情
      console.log('hello')
      this.$message({
        message: '点击成功',
        duration: '1500',
        type: 'success',
        showClose: true
      })
    },
    addTables () { // 添加数据表的弹窗 =》 添加数据源里面的表
    }
  }
}
</script>

<style scoped>
  #all{
    height: 100%;
    width:100%;
  }
  #tableList{
    padding: 10px;
    box-sizing: border-box;
    width:100%;
    height:95%;
    background-color: white;
  }
  #tables{
    width: 100%;
    height:calc(100% - 70px);
  }
  .searchForm{
    text-align: left;
    padding: 10px 10px 3px 10px;
    box-sizing: border-box;
  }
  #pageList{
    width:100%;
    height:5%;
    background-color: white;
  }
  .three-tab-pane{
    height:500px;
  }
  #block{
    position: absolute;
    right:50px;
  }
  .detail{
    height: 85%;
    margin-top: 80px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
