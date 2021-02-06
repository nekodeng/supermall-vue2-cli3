<template>
  <div class="shop-info">
    <!-- 店铺头部 -->
    <div class="shop-top">
      <img :src="shop.logo" >
      <span class="title">{{shop.name}}</span>
    </div>

    <!-- 店铺中部 -->
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
          <div class="sell-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goodstext">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}"><span>{{item.isBetter ? '高':'低'}}</span></td>
          </tr>
        </table>
      </div>
    </div>

    <!-- 店铺底部 -->
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .shop-top img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .shop-middle-right .score-better
  {
    color: #f13e3a!important;
  }
  .shop-middle-right .better-more span {
    background-color: #f13e3a!important;
  }
  .shop-middle-right .score {
    color: #5ea732;
  }
  .shop-middle-right .better span {
    background-color: #5ea732;
    color: #fff;
    text-align: center;
  }
  .shop-info {
    padding: 12px;
  }
  .shop-top img {
    vertical-align: middle;
  }
</style>