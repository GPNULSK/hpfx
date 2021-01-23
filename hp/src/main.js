// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios";
import VueAxios from "vue-axios";

import element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import './assets/css/reset.css'
import VueWechatTitle from 'vue-wechat-title';
import store from "./store";
import XLSX from 'xlsx'


Vue.use(VueWechatTitle)
Vue.use(VueAxios,Axios);
Vue.use(element)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})