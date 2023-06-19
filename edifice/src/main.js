import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router'
import store from './store'
import "@/style/index.scss"; // 全局scss
import * as ElIconModules from '@element-plus/icons-vue'

import SlideVerify from 'vue-monoplasty-slide-verify';
import axios from 'axios'
import VueSuperSlide from 'vue-superslide'

import VueParticles from 'vue-particles'





//解决ResizeObserver loop limit exceeded报错
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver{
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}

const app=createApp(App);


app.use(store);
app.use(router);
app.mount('#app');
app.use(ElementPlus);
app.use(SlideVerify);
app.use(VueSuperSlide);
app.use(VueParticles);  

for (const iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
      const item = ElIconModules[iconName]
      app.component(iconName, item)
    }
  }

import global from './global.js'
app.config.globalProperties.global = global;
app.config.globalProperties.$axios = axios;
axios.defaults.baseURL="/api"
