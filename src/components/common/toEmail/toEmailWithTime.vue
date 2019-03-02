<!--在页面中直接引用此组件
1-邮件组件的引用
    <to-email :ifTimeRange="false" :ifShowTime="true" :toEmailVisible="toEmailDialog"
               @close="closeEmailDialog" @save="sendEmail"></to-email>
2-邮件的按钮
<el-form-item style="">
  <el-button style="margin-left: 0px;" icon="el-icon-message" @click="emailDialog">邮件导出</el-button>
</el-form-item>
3-引入文件
  import toEmail from '@/components/common/toEmail/toEmailWithTime.vue'
components: { toEmail },
4-data的数据
data: {
toEmailDialog: false
}
5-methods里面的方法
emailDialog () {
  this.toEmailDialog = true
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
        <el-dialog title="邮件导出" :visible="toEmailVisible" :before-close="close" width="580px" class="g-edit-dialog g-scroll-dialog">
            <el-form label-position="right" label-width="100px" :model="emailFormModel" :inline="true" :rules="emailFormRules" class="form-inline" ref="emailForm">
                  <el-form-item label="导出日期" prop="times" class="inline-input" v-if="ifShowTime">
                    <div v-if="ifTimeRange">
                    <el-date-picker
                      v-model="emailFormModel.times"
                      type="datetimerange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
                    </el-date-picker>
                    </div>
                    <div v-else>
                      <el-date-picker
                        v-model="emailFormModel.times"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                      </el-date-picker>
                    </div>
                  </el-form-item>
              <el-row style="margin-top: 15px;">
                <el-form-item label="邮箱地址" class="inline-input" prop="email">
                  <el-input type="text" auto-complete="off" v-model="emailFormModel.email">
                    <template slot="append">@qq.com</template>
                  </el-input>
                </el-form-item>
                </el-row>
                <el-row class="excel-info">
                  信息将以邮件的形式稍后发送到邮箱，请注意查收!
                </el-row>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="sendEmail('emailForm')">发 送</el-button>
                <el-button @click="close">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
  components: {},
  name: 'toEmail',
  watch: {
    toEmailVisible (news, old) { // 每次修改状态的时候会清除form
      this.clearForm()
    }
  },
  props: {
    toEmailVisible: {
      type: Boolean
    },
    ifShowTime: {
      type: Boolean
    },
    ifTimeRange: {
      type: Boolean
    }
  },
  data () {
    /**
     * qq邮箱验证
     * @param rule
     * @param value
     * @param callback
     */
    let isQQEmail = (rule, value, callback) => {
      value = value ? value.replace('', '') + '@qq.com' : value
      let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      let flag = reg.test(value)
      if (value && !flag) {
        callback(new Error('邮箱格式不正确'))
      }
      callback()
    }
    return {
      emailFormModel: {
        times: [], // 时间的
        email: null
      },
      emailFormRules: {
        email: [
          { required: true, trigger: ['change', 'blur'], message: '不能为空' },
          { validator: isQQEmail, trigger: ['change', 'blur'] }
        ],
        times: [
          { required: true, trigger: ['change', 'blur'], message: '不能为空' }
        ]
      }
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    sendEmail (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.emailFormModel))
          obj.email = obj.email + '@qq.com'
          this.$emit('save', obj)
        } else {
          console.log('error submit!!')
          return false
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
.formBody{
  text-align: left;
}
.qqMoney-toEmail {
  /deep/ .el-dialog__body {
    padding: 15px 20px 40px 20px;
    .el-input {
      width: 214px !important;
    }
  }
}
  .excel-info {
    margin-left: 50px;
    margin-top: 10px;
    color: #909399;
  }
  .form-inline {
    margin-top: 20px;
  }
</style>
