
<template>
  <div>
    <el-dialog :close-on-click-modal="ifDialog" :title="flagMessage" :visible.sync="dialogAddMessage" center  width="480px" @close="closeDialog()" v-loading="loading">
      <el-form :label-position="labelPosition"  :model="addOrUpdateModel" :rules="rules" ref="formData" label-width="100px" class="demo-ruleForm">

        <el-form-item label="分类名称" :label-width="formLabelWidth" prop="order">
          <el-input v-model="addOrUpdateModel.order" class="inputDialog">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('formData')">保存</el-button>
        <el-button @click="handlerClose">取消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AddMessage',
  components: {},
  data () {
    return {
      type: '', // 查看增加还是编辑
      labelPosition: 'left',
      loading: false,
      addOrUpdateModel: {
        order: '', // 名字
        level: 0, // 目录等级
        id: '' // id
      },
      ifDialog: false, // 点击窗口外不关闭
      flagMessage: '编辑',
      flag: '', // 1-添加add  2-编辑update  3-外部调用out
      formLabelWidth: '80px', // 宽度
      dialogAddMessage: false, // dialog
      rules: { // 规则
        order: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 1, max: 14, message: '长度在 1 到 14 个字符', trigger: 'blur change' }
        ]
      }
    }
  },
  created () { // 1-添加 2-只穿ID 3-编辑回显
  },
  mounted () {
  },
  methods: {
    handlerClose () {
      this.dialogAddMessage = false
    },
    clearFormData () { // 重新打开的时候清空
      this.addOrUpdateModel.title = ''
      this.addOrUpdateModel.order = ''
      this.addOrUpdateModel.level = 0
      this.addOrUpdateModel.id = ''
    },
    showDialog (model) {
      this.clearFormData()
      console.log(model)
      this.type = model.type
      if (model.type === 0) {
        this.flagMessage = '添加分类'
      } else if (model.type === 1) {
        this.flagMessage = '添加子目录'
        this.addOrUpdateModel.id = model.categoryId
        this.addOrUpdateModel.level = model.level
      } else if (model.type === 2) {
        this.flagMessage = '编辑分类' // 回显title
        this.addOrUpdateModel.order = model.title
        this.addOrUpdateModel.id = model.categoryId
        this.addOrUpdateModel.level = model.level
      }
      this.dialogAddMessage = true
      this.$nextTick(() => {
        this.$refs['formData'].clearValidate() // 去掉验证
      })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.saveFormData()
        } else {
          this.loading = false
          return false
        }
      })
    },
    saveFormData () { // 保存页面
      console.log(this.addOrUpdateModel)
      let searchData = {
        title: this.addOrUpdateModel.order
      }
      if (this.type === 2) { // 编辑不要目录
        searchData.categoryId = this.addOrUpdateModel.id
      } else if (this.type === 0) { // 添加最高目录
        searchData.parentId = 0
        searchData.level = this.addOrUpdateModel.level + 1
      } else if (this.type === 1) {
        searchData.parentId = this.addOrUpdateModel.id
        searchData.level = this.addOrUpdateModel.level + 1
      }
      this.$message.success('操作成功')
      this.loading = false
      this.dialogAddMessage = false
      this.$emit('updateList')
    },
    closeDialog () { // 关闭的时候清清楚相关数据
    }
  }
}
</script>

<style scoped>
  .inputDialog{
    width: 300px;
    margin-left: 3px;
  }

</style>
