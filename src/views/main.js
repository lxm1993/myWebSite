// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import app from './home/index'
import router from 'router'
import $ from 'jquery'
import store from 'src/store'
import axios from 'axios'
import 'assets/css/reset.css'

// 将axios挂载到vue对象的原型下边以实现全局通用
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { app }
})
  