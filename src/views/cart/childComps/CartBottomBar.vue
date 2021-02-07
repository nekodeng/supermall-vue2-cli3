<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
        class="check-button" 
        :is-checked="isSelectAll"
        @click.native="checkClick"
        ></check-button>
      <span>全选</span>
    </div>

    <div class="price">合计：{{totalPrice}}</div>

    <div class="calculate">去下单：({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartBottomBar',
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {//若判断到全选中，那么变为false
        this.$store.state.cartList.forEach(item => item.checked = false)
      } else {//若判断为没有全选中，那么变为true
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  computed: {
    totalPrice() {
      return '¥ ' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length
    },
    isSelectAll() {
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if(this.$store.state.cartList.length === 0) return false 
      return !(this.$store.state.cartList.find(item => !item.checked))
    }
    
  }
}
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    display: flex;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin: 0 6px 0 8px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }
  .price {
    margin-left: 20px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    color: #fff;
    background-color: red;
    text-align: center;
    font-size: 15px;
  }
</style>