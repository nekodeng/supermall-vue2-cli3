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