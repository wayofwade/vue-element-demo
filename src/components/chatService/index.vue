<template>
  <div class='main-div' v-loading='fullScreenLoading'>
    <!--聊天的列表-->
    <div class='chat-list'>
      <div v-for='(item, index) in personList' :key='index'>
        <div class='chat-one top5' :style='{backgroundColor: item.color}' @click='chatToWho(index)'>
          <div class='chat-list-pic top5'>
            <img class='imgs' src='../../assets/image/克莱汤普森.jpg'>
          </div>
          <div class='chat-list-text'>
            <span class='chat-name'>{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--聊天的列表-->
    <div class='chat-detail'>
      <div class='chat-top'>
        <div class='chat-top-div top5'>
          <div class='chat-top-pic top5'>
            <img class='imgs' src='../../assets/image/克莱汤普森.jpg'>
          </div>
          <div class='chat-top-person-des'>
            <span class='chat-name'>浙江省-杭州市-西湖区({{nickName ? nickName : '匿名'}})</span>
          </div>
        </div>
      </div>
      <div class='chat-mid'>
        <!--右边的人--->
        <div class='chat-mid-line' style='clear: both' v-for='(item, index) in chatList' :key='index'>
          <div class='chat-mid-right' v-if='item.right'>
            <div class='chat-mid-right-text'>
              <div class='chat-right-text-detail'>
                {{item.text}}<!-- -{{index}}-->
              </div>
              <div class='if-read-div'>
                <span :class="item.isRead ? 'if-read-text-yes' :'if-read-text'">
                  {{getIfReadText(item.isRead)}}
                </span>
              </div>
            </div>
            <div class='chat-mid-right-pic'>
              <img class='imgs' src='../../assets/image/克莱汤普森.jpg'>
            </div>
          </div>
          <div class='chat-mid-left' v-else>
            <div class='chat-mid-left-pic'>
              <img class='imgs' src='../../assets/image/克莱汤普森.jpg'>
            </div>
            <div class='chat-mid-left-text'>
              <div class='chat-left-text-detail'>
                {{item.text}}<!-- -{{index}}-->
              </div>
            </div>
          </div>
        </div>
        <!--右边的人--->
      </div>
      <div class='chat-foot'>
        <div class='chat-foot-input'>
          <el-input
            class='chat-foot-input-text'
            type='textarea'
            :rows='9'
            placeholder='请输入内容'
            v-model='inputText'>
          </el-input>
        </div>
        <div class='chat-foot-btn'>
          <el-button class='sb-btn-left' size='mini' type='success' @click='addChat(0)' :disabled='ifDisable()'>左边发送</el-button>
          <el-button class='sb-btn-right' size='mini' type='primary' @click='addChat(1)' :disabled='ifDisable()'>右边发送</el-button>
        </div>
      </div>
    </div>
    <!--<mqtt-vue></mqtt-vue>-->
  </div>
</template>

<script>
export default {
  components: { }, // 引入组件
  name: '',
  data () {
    return {
      fullScreenLoading: true,
      count: 0,
      personList: [{name: '德玛西亚', color: 'whitesmoke'}, {name: '德邦总管', color: 'white'}, {name: '流浪法师', color: 'white'}], // 聊天的人员列表
      chatList: [],
      inputText: '', // 输入的文字
      received_messages: [],
      style: {
        'backgroundColor': 'white'
      },
      nickName: '' // 聊天人的名字
    }
  },
  created () { // 在index.html引入的jquery以及静态资源，在created里是不能使用的
  },
  mounted () {
    setTimeout(() => {
      this.fullScreenLoading = false
    }, 1500)
  },
  methods: {
    buffer2obj (buffer, proto) { // proto字节流转对象，传入字节流，proto对象
      let pm = proto.deserializeBinary(buffer)
      return pm.toObject()
    },
    uft2asc (data) { // 字节流转字符串
      return data.toString('ascii', 0, data.length)
    },
    // uuid随机生成
    getuuid () {
      let uid = []
      let hexDigits = '0123456789abcdefghijklmnopqrst'
      for (let i = 0; i < 32; i++) {
        uid[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
      }
      uid[6] = '4'
      uid[15] = hexDigits.substr((uid[15] & 0x3) | 0x8, 1)
      let uuid = uid.join('')
      return uuid
    },
    ifDisable () {
      return false
    },
    getIfReadText (value) {
      return value ? '已读' : '未读'
    },
    addChat (value) {
      this.count += 1
      let items = {
        right: value > 0,
        isRead: this.count % 2 === 0,
        text: this.inputText
      }
      this.pushMessage(items) // 往vuex插入一条消息
      this.inputText = ''
      this.initScroll()
    },
    pushMessage (items) { // 添加消息
      this.chatList.push(items)
    },
    initScroll () { // 修改滚动条的
      this.$nextTick(() => {
        let showContent = document.querySelector('.chat-mid')
        showContent.scrollTop = showContent.scrollHeight
      })
    }
  }
}
</script>

<style scoped>
  .main-div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: white;
  }

  .chat-list {
    width: 200px;
    background-color: white;
    margin-right: 2px;
  }

  .chat-detail {
    float: none;
    clear: both;
    overflow: auto;
    flex: 1;
    min-width: 300px;
    background-color: whitesmoke;
  }

  .chat-one {
    height: 60px;
    background-color: white;
    min-height: 60px;
    /*margin-top: 20px*/
    display: flex;
    flex-wrap: wrap;
    flex-flow: row;
    justify-content: flex-start;
  }

  .chat-top-div {
    height: 60px;
    background-color: whitesmoke;
    min-height: 60px;
    display: flex;
    flex-wrap: wrap;
    flex-flow: row;
    justify-content: flex-start;
  }

  .chat-name {
    line-height: 60px;
  }

  .chat-top {
    height: 60px;
    background-color: lightyellow;
  }

  .chat-mid {
    height: 500px;
    max-height: 500px;
    overflow: auto;
    background-color: whitesmoke;
    border: solid 1px lightsteelblue;
  }

  .chat-foot {
    height: calc(100% - 570px);
    background-color: whitesmoke;
    padding: 20px 40px;
    box-sizing: border-box;
  }

  .chat-foot-input {
    width: calc(100% - 10px);
    height: 200px;
  }

  .chat-foot-input-text {
    width: 100%;
    height: 100%;
  }

  .chat-foot-btn {
    margin-top: 20px;
  }

  .chat-mid-left {
    min-height: 60px;
    background-color: whitesmoke;
    max-width: 500px;
    float: left;
    display: flex;
    flex-wrap: wrap;
    flex-flow: row;
    justify-content: flex-start;
  }

  .chat-mid-right {
    min-height: 60px;
    background-color: whitesmoke;
    max-width: 500px;
    float: right;
    display: flex;
    flex-wrap: wrap;
    flex-flow: row;
    justify-content: flex-start;
  }

  .chat-mid-left-text {
    background-color: whitesmoke;
    padding: 15px 15px 15px 5px;
    box-sizing: border-box;
  }

  .chat-list-text {
  }

  .chat-mid-right-text {
    background-color: whitesmoke;
    padding: 15px 5px 15px 15px;
    box-sizing: border-box;
  }

  .chat-right-text-detail {
    background-color: #6cb5f4;
    padding: 10px 9px;
    box-sizing: border-box;
    text-align: left;
    border-radius: 5px;
    line-height: 25px;
  }

  .chat-left-text-detail {
    background-color: #6cb5f4;
    padding: 10px 15px;
    box-sizing: border-box;
    border-radius: 5px;
  }

  .chat-mid-left-pic {
    /*width: 80px;*/
  }

  .chat-mid-right-pic {
    padding-top: 10px;
    box-sizing: border-box;
    /*width: 80px;*/
  }

  .chat-list-pic {
    width: 70px;
  }

  .chat-top-pic {
    width: 104px;
  }

  .chat-mid-line {
    min-height: 100px;
    background-color: whitesmoke;
    padding: 3px 10px 1px 10px;
    box-sizing: border-box;
  }

  .imgs {
    width: 50px;
    height: 50px;
    border-radius: 25px;
  }

  .top5 {
    margin-top: 5px;
  }

  .sb-btn-right {
    float: right;
  }
  .sb-btn-left {
    float: left;
  }
  .if-read-div{
    text-align: right;
  }
  .if-read-text-yes{
    color: darkgrey;
    font-size: 10px;
    text-align: right;
  }
  .if-read-text{
    font-size: 10px;
    text-align: right;
    color: #3d9df0;
  }
</style>
