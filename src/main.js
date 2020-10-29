// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import config from './config'
Vue.use(config)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import iView from 'iview'
import 'iview/dist/styles/iview.css'
Vue.use(iView)

import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: false,
  connection: Vue.prototype.SocketConnectURL,
  options: { path: Vue.prototype.SocketConnectPATH }
}))

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
new Vue({
  data() {
    return { value: '' }
  }
})

import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
Vue.directive('highlight',function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
