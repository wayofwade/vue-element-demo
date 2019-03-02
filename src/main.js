/*
* 这个是主文件
* components/common/下面为通用的组件，具体使用方法在组件内有注释
* */
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/normalize.css' // 全局的css，改变饿了么ui最外层的空白间隙
import '@/styles/global.scss'
import '@/styles/collapse.scss'

Vue.use(ElementUI, { // 配置就是用小的
  size: 'small'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
