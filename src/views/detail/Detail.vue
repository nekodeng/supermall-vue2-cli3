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
          @titleClick="titleClick(index)"
          ref="nav"
          >{{item}}</div>
        </div>
      </nav-bar>
    </div>

    <!-- 详情中间部分信息 -->
    <scroll class="content" ref="scroll" :probe-type="4" @scroll="contenScroll">

    <!-- 详情页轮播图 -->
    <detail-swiper :top-images="topImages"></detail-swiper>

    <!-- 商品信息栏 -->
    <detail-base-info :goods="goods"></detail-base-info>

    <!-- 商家信息栏 -->
    <detail-shop-info :shop="shop"></detail-shop-info>

    <!-- 商品介绍栏 -->
    <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>

    <!-- 商品参数栏 -->
    <detail-param-info ref="params" :param-info="paramInfo" @imageLoad="imageLoad"></detail-param-info>

    <!-- 评论信息栏 -->
    <detail-comment-info ref="comment" :comment-info="commentInfo" @imageLoad="imageLoad"></detail-comment-info>

    <!-- 详情页推荐栏 -->
    <goods-list ref="recommend" :goods="recommends" @imageLoad="imageLoad"></goods-list>
    </scroll>

    <!-- 详情底部bar -->
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <!-- 回到顶部按钮 -->
    <back-top @click.native="backTop" v-show="isShowBackTop"/>

    <!-- 加入购物车时的提示弹窗Toast -->
    <toast :message="message" :show="show"></toast>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Toast from 'components/common/toast/Toast'

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail"

export default {
  name: "Detail",
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    Toast
  },
  data() {
    return {
      iid: null,
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themTopYs: [],
      isShowBackTop: false,
      goodsInfo: {},
      message: '',
      show: false
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

      //4.获取商品的详情数据
      this.detailInfo = data.detailInfo

      //5.获取商品参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //6.取出评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

      //7.创建商品的对象
      this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    }) 
  
    //3.请求详情页推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  // updated() {
  //   this.themTopYs.push(0)
  //   this.themTopYs.push(this.$refs.params.$el.offsetTop)
  //   this.themTopYs.push(this.$refs.comment.$el.offsetTop)
  //   this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
  // },
  methods: {
    backClick() {
      this.$router.back()
    },

    imageLoad() {
      this.$refs.scroll.refresh()

      this.themTopYs = []
      this.themTopYs.push(0)
      this.themTopYs.push(this.$refs.params.$el.offsetTop)
      this.themTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themTopYs.push(this.$refs.recommend.$el.offsetTop)
    },

    titleClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scrollTo(0, -this.themTopYs[index], 200)
    },

    // 回到顶部
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
      this.isShowBackTop = false
    },

    contenScroll(position) {
      //1.获取y值
      const positionY = -position.y

      //2.positionY和主题中的值进行对比
      let length = this.themTopYs.length
      for(let i=0; i < length; i++) {
        if(this.currentIndex !== i && ((i < length - 1 &&
         positionY >= this.themTopYs[i] &&
          positionY < this.themTopYs[i+1]) ||
          (i === length - 1 && positionY > this.themTopYs[i]))) {
            this.currentIndex = i
            this.$refs.nav.currentIndex = this.currentIndex
          }
      }

      //3.判断backtop是否显示
      this.isShowBackTop = (-position.y) > 1000
    },

    // 监听购物车点击事件
    addToCart() {
      //1.获取购物车里的商品信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goodsInfo.title
      product.desc = this.goodsInfo.desc
      product.price = this.goodsInfo.realPrice
      product.iid = this.iid

      //2.将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        this.show = true
        this.message = res
        setTimeout(() => {
          this.show = false
          this.message = ''
        },1500)
      })
     
    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    background-color: #fff;
    z-index: 9;
    height: 100vh;
  }
  .detail-item {
    position: inherit;
    z-index: 9;
    background-color: #fff;
  }
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
  .content {
    height: calc(100% - 44px - 49px);
  }
  .back img {
    width: 32%;
  }
  </style>