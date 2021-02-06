// import {debouce} from "./utils"

// export const itemListenerMixin = {
//   data() {
//     return {
//       itemImgListener: null
//     }
//   },
//   mounted() {
//     let newRefresh = debouce(this.$refs.scroll.refresh, 100)
//     this.itemImgListener = () => {
//       newRefresh()
//     }
//     this.$bus.$on('itemImgLoad', this.itemImgListener)
//   }
// }

// 封装回到顶部按钮
// import BackTop from 'components/content/backTop/BackTop'
// export const backTopMixin = {
//   components: {
//     BackTop
//   },
//   data() {
//     return {
//       isShowBackTop: false
//     }
//   },
//   methods: {
//     backTop() {
//       this.$refs.scroll.scrollTo(0, 0, 300)
//     },
//     listenShowBackTop(position) {
//       this.isShowBackTop = -position.y > BACK_POSITION
//     }
//   }
// }