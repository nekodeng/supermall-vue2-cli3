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
          <div class="sells-count">{{shop.sells}}</div>
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
  .shop-middle-item {
    text-align: center;
  }
  .shop-top img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 8px;
  }
  .shop-middle {
    display: flex;
    padding: 12px;
  }
  .shop-middle-right, .shop-middle-left {
    flex: 1;
    display: flex;
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
    border-bottom: 5px solid #f2f5f8;;
  }
  .shop-top img {
    vertical-align: middle;
  }
  .enter-shop {
    background-color: #eee;
    padding: 8px 16px;
    text-align: center;
    width: 40%;
    margin: 0 auto;
  }
  .shop-bottom {
    margin-top: 12px;
  }
  .shop-middle-right {
    padding-left: 6px;
  }
  .info-sells, .info-goods {
    flex: 1;
    padding-top: 6px;
  }
  .sells-count, .goods-count {
    margin-bottom: 6px;
  }
  .shop-middle-right table tr {
    margin-bottom: 4px;
  }
</style>