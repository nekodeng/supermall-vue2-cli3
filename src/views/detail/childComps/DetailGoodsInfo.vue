<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
    <div class="info-list">
      <img 
      v-for="(item, index) in detailInfo.detailImage[0].list" 
      :key="index"
      :src="item"
      @load="imgLoad"
       >
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailGoodsInfo',
  props: {
    detailInfo: {
      type: Object
    }
  },
  data() {
    return {
      counter: 0,
      imagesLength: 0
    }
  },
  methods: {
    imgLoad() {
      //判断所有的图片加载完了，那么就进行一次回调就可以了
      if (++this.counter === this.imagesLength) {
        this.$emit('imageLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      //目的为了获取图片的个数
      this.imagesLength = this.detailInfo.detailImage[0].list.length
    }
  }
}
</script>

<style scoped>
  .info-list img {
    width: 100%;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 5px solid #f2f5f8;
  }
  .goods-info {
    padding: 10px;
  }
  .desc {
    padding: 12px;
    border-bottom: 5px solid #f2f5f8;;
  }
</style>