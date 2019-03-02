<!--在页面中直接引用此组件
1-邮件组件的引用
<to-email :toEmailVisible="toEmailDialog" @close="closeEmailDialog" @save="sendEmail" ref="emailDialog">
</to-email>
2-邮件的按钮
<el-form-item style="">
  <el-button style="margin-left: 0px;" icon="el-icon-message" @click="emailDialog">邮件导出</el-button>
</el-form-item>
3-引入文件
  import toEmail from '@/components/common/toEmail/toEmail.vue'
components: { toEmail },
4-data的数据
data: {
toEmailDialog: false
}
5-methods里面的方法
emailDialog () {
  this.toEmailDialog = true
this.$refs.emailDialog.clearForm()
},
sendEmail(value) {
  console.log(value)
},
closeEmailDialog () {
  this.toEmailDialog = false
}
-->
<template>
    <div class="formBody qqMoney-toEmail">
        <el-dialog title="邮件导出" :visible="toEmailVisible" :before-close="close" width="500px" class="g-edit-dialog g-scroll-dialog">
            <el-form label-position="right" label-width="100px" :model="emailFormModel" @submit.native.prevent
                     :inline="true" :rules="emailFormRules" class="form-inline" ref="emailForm">

                <el-form-item label="邮箱地址" class="inline-input" prop="email">
                  <el-input type="text" auto-complete="off" v-model="emailFormModel.email">
                    <template slot="append">@qq.com</template>
                  </el-input>
                </el-form-item>

                <el-row class="excel-info">
                  信息将以邮件的形式稍后发送到邮箱，请注意查收!
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sendEmail">发 送</el-button>
                <el-button @click="close">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {isQQEmail} from 'utils/rules'
export default {
  name: 'toEmail',
  props: {
    toEmailVisible: {
      type: Boolean
    }
  },
  data () {
    return {
      emailFormModel: {
        email: null
      },
      emailFormRules: {
        email: [
          { required: true, trigger: ['change', 'blur'], message: '不能为空' },
          { validator: isQQEmail, trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    sendEmail () {
      let isValid = true
      this.$refs.emailForm.validate(res => {
        isValid = isValid && res
      })
      this.$nextTick(() => {
        let errorLen = document
          .querySelector('.qqMoney-toEmail')
          .querySelectorAll('.el-form-item__error').length
        if (errorLen === 0) {
          this.$emit('save', this.emailFormModel.email + '@qq.com')
        }
      })
    },
    clearForm () {
      this.$nextTick(() => {
        this.$refs.emailForm.resetFields()
      })
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.qqMoney-toEmail {
  /deep/ .el-dialog__body {
    padding: 15px 20px 40px 20px;
    .el-input {
      width: 300px !important;
    }
  }
}
  .inline-input {
    margin-top: 10px;
  }

  .excel-info {
    margin-left: 22px;
    margin-top: 10px;
    color: #909399;
  }
</style>
