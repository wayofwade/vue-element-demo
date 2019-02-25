
<template>
  <div>
    <el-dialog :close-on-click-modal="ifDialog" :title="flagMessage" :visible.sync="dialogAddMessage" center  width="700px" @close="closeDialog()" v-loading.fullscreen.lock="loading">
      <el-form :label-position="labelPosition"  :model="addOrUpdateModel" :rules="rules"  label-suffix=":"  ref="formData" :label-width="formLabelWidth" class="demo-ruleForm">
        <el-form-item label="名称" :label-width="formLabelWidth" prop="title">
          <el-input v-model="addOrUpdateModel.title" class="inputDialog">
          </el-input>
        </el-form-item>
        <el-form-item label="组名">
          <el-select v-model="addOrUpdateModel.gid" @change="changeGID"
                     placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="addOrUpdateModel.des" class="inputDialog"
                    type="textarea"
                    :rows="2">
          </el-input>
        </el-form-item>

        <el-form-item label="链接" :label-width="formLabelWidth" prop="url">
          <el-input v-model="addOrUpdateModel.url" class="inputDialog">
          </el-input>
        </el-form-item>

        <!--任务详情图-->
        <el-form-item label="图标" :label-width="formLabelWidth" style="width: 300px;height: 100px;">
          <div style="width: 300px;color: darkgray;">小于100KB</div>
          <el-upload
            :data="iconData"
            class="avatar-uploader"
            name="files"
            :action="uploadUrl"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="uploadError"
            v-model="addOrUpdateModel.icon"
          >
            <!-- <img v-if="imgInfo.imgSrc" :src="imgInfo.imgSrc" class="avatar">-->
            <div v-if="imgInfo.imgSrc" style="text-align: center">
              <img style="width: 60px; height:60px;style: block;" class="avatar" :src="imgInfo.imgSrc | imgSrcFilter" :key="imgInfo.imgSrc">
            </div>
            <i v-else class="el-icon-plus avatar-uploader-icon bor"></i>
          </el-upload>
        </el-form-item>
        <!--任务详情图-->

        <el-form-item label="排序" :label-width="formLabelWidth" prop="order">
          <el-input v-model="addOrUpdateModel.order" class="inputDialog">
          </el-input>
        </el-form-item>

        <el-form-item label="默认展示">
          <el-select v-model="addOrUpdateModel.defaultShow" placeholder="请选择" clearable>
            <el-option label="正常显示" value="1"></el-option>
            <el-option label="未登录展示" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否开启白名单">
          <el-select v-model="addOrUpdateModel.whiteUser" @change="changeWhite" clearable placeholder="请选择活动区域">
            <el-option label="开启" value="1"></el-option>
            <el-option label="关闭" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="白名单配置" :label-width="formLabelWidth" prop="whiteUserConfig">
          <el-input v-model="addOrUpdateModel.whiteUserConfig" class="inputDialog">
          </el-input>
        </el-form-item>
        <el-form-item label="最低支持版本" :label-width="formLabelWidth" prop="minVersion">
          <el-input v-model="addOrUpdateModel.minVersion" class="inputDialog">
          </el-input>
        </el-form-item>
        <el-form-item label="最高支持版本" :label-width="formLabelWidth" prop="maxVersion">
          <el-input v-model="addOrUpdateModel.maxVersion" class="inputDialog">
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('formData')">保存</el-button>
        <el-button type="primary" @click="handlerClose">取消</el-button>
      </div>

    </el-dialog>
  </div>
</template>

<script>
import {checkQQUrl} from 'utils/rules'
export default {
  name: 'AddMessage',
  components: {},
  props: ['options'],
  data () {
    let ifNumber = (rule, value, callback) => { // 正整数
      let p = /^[0-9]*$/
      let f = false
      if (p.exec(value) == null) { // null的话不是数字
      } else {
        f = true
      }
      if (f) {
        callback()
      } else {
        callback(new Error('请输入整数数字'))
      }
    }
    let maxBigger = (rule, value, callback) => {
      if (this.addOrUpdateModel.minVersion && this.addOrUpdateModel.maxVersion && (this.addOrUpdateModel.maxVersion < this.addOrUpdateModel.minVersion)) {
        callback(new Error('最高版本要大于最低版本'))
      } else {
        callback()
      }
    }
    return {
      iconData: { // 任务详情图片
        maxSize: 100 * 1024
      },
      imgInfo: {
        imgSrc: '',
        fid: '' // 图片id
      },
      uploadUrl: '', // 上传url
      labelPosition: 'left',
      ifHaveError: false,
      loading: false,
      addOrUpdateModel: {
        id: '', // id
        url: '', // 链接
        buttonType: '', // 类型
        title: '', // 名称
        des: '', // 描述
        icon: '', // 图表
        order: '', // int
        whiteUser: '', // 是否开启白名单
        whiteUserConfig: '', // 白名单配置
        defaultShow: '', // 默认展示
        minVersion: '',
        maxVersion: ''
      },
      ifDialog: false, // 点击窗口外不关闭
      flagMessage: '添加',
      formLabelWidth: '120px', // 宽度
      dialogAddMessage: false, // dialog
      needNotRule: [],
      needRule: [{ required: true, message: '不能为空', trigger: 'change blur' }],
      rules: { // 规则
        whiteUserConfig: [],
        title: [
          { required: true, message: '不能为空', trigger: 'blur change' }
        ],
        order: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { validator: ifNumber, trigger: 'blur change' }
        ],
        minVersion: [
          { validator: ifNumber, trigger: 'blur change' },
          { validator: maxBigger, trigger: 'blur change' }
        ],
        maxVersion: [
          { validator: ifNumber, trigger: 'blur change' },
          { validator: maxBigger, trigger: 'blur change' }
        ],
        url: [{ validator: checkQQUrl, trigger: 'blur change' }]
      }
    }
  },
  created () { // 1-添加 2-只穿ID 3-编辑回显
  },
  mounted () {
  },
  watch: {
    addOrUpdateModel: { handler (cval, oval) {}
    }
  },
  methods: {
    handlerClose () {
      this.dialogAddMessage = false
    },
    changeBox () {
      console.log(this.addOrUpdateModel.season)
    },
    clearFormData (row) { // 重新打开的时候清空
      let imgInfo = {
        imgSrc: '',
        fid: '' // 图片id
      }
      this.imgInfo = imgInfo
      if (row) {
        this.setForm(row)
      } else {
        this.$nextTick(() => {
          this.$refs['formData'].clearValidate() // undefined
        })
        this.dialogAddMessage = true
      }
    },
    setForm (row) { // 编辑设置表单
      this.$nextTick(() => {
        this.$refs['formData'].clearValidate() // undefined
      })
      this.dialogAddMessage = true
    },
    showDialog (value, row) {
      this.clearFormData(row)
      this.dialogAddMessage = true
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        console.log(this.addOrUpdateModel)
        if (valid) {
          this.loading = true
          this.addToTop()
        } else {
          this.loading = false
          console.log('error submit!!')
          return false
        }
      })
    },
    addToTop () { // 添加操作
    },
    closeDialog () { // 关闭的时候清清楚相关数据
      this.dialogAddMessage = false
    },
    changeGID (value) {
      console.log(value)
    },
    changeWhite () {},
    uploadSuccess (res, file) {
    },
    beforeAvatarUpload (file) {
    },
    uploadError () {}
  }
}
</script>

<style lang="scss" scoped>
  $inputWidth: 350px;
  .inputDialog{
    width: $inputWidth;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 62px;
    height: 62px;
  }
  .avatar-uploader:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 62px;
    height: 62px;
    display: block;
    border: 1px blue;
  }

</style>
