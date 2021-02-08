export default {
  //mutations中的用法尽量完成的事情单一一点
  addCounter(state, payload){
    payload.count ++
  },
  addToCart(state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}