<template>
  <div id="detail">
    <!-- 详情页头部导航栏 -->
    <div class="detail-item">
      <nav-bar>
        <!-- 返回按钮 -->
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" />
        </div>

        <!-- 导航栏 -->
        <div slot="center" class="title">
          <div 
          v-for="(item, index) in titles" 
          :key="item.title" 
          class="title-item"
          :class="{active: index === currentIndex}"
          @click="titleClick(index)"
          >{{item}}</div>
        </div>
      </nav-bar>
    </div>

    <!-- 详情页轮播图 -->
    <detail-swiper :top-images="topImages"></detail-swiper>

    <!-- 商品信息栏 -->
    <detail-base-info :goods="goods"></detail-base-info>

    <!-- 商家信息栏 -->
    <detail-shop-info :shop="shop"></detail-shop-info>





    <ul>
    <li>发的啥饭的</li>
    <li>发的啥饭的</li>
     <li>发的啥饭的</li>
    <li>发的啥饭的</li>
     <li>发的啥饭的</li>
    <li>发的啥饭的</li>
     <li>发的啥饭的</li>
    <li>发的啥饭的</li>
     <li>发的啥饭的</li>
    <li>发的啥饭的</li>
     <li>发的啥饭的</li>
    <li>发的啥饭的</li>
     <li>发的啥饭的</li>
    <li>发的啥饭的</li>
     <li>发的啥饭的</li>
    <li>发的啥饭的</li>
  </ul>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'

import {getDetail, Goods, Shop} from "network/detail"

export default {
  name: "Detail",
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  data() {
    return {
      iid: null,
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  created() {
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      const data = res.result
      console.log(res)
      //1.获取顶部的轮播图片数据
      this.topImages = res.result.itemInfo.topImages

      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo, 
        data.columns, 
        data.shopInfo.services
      )

      // 3.创建店铺信息
      this.shop = new Shop (data.shopInfo)
    }) 
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index
    },
    backClick() {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
  .title {
    display: flex;
  }
  .title-item {
    flex: 1;
    font-size: 14px;
  }
  .active {
    color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
  </style>