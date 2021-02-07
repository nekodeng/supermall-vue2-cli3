import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

//vue懒加载插件VueLazyload
Vue.use(VueLazyload)

//解决移动端300毫秒延迟问题插件fastclick
FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
