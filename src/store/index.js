// vuex使用开始，有用于购物车事件
import Vue from 'vue'
import Vuex from 'vuex'

//1.安装插件
Vue.use(Vuex)

//2.创建store对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCart(state, payload) {
      state.cartList.push(payload)
    }
  }
})

//3.挂载到vue实例上
export default store