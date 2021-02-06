<template>
  <div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
    <div class="info-header">
      <span class="header-title">用户评价</span>
      <span class="header-more">更多<i class="arrow-right"></i></span>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" >
      <span>{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="date">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item, index) in commentInfo.images" :key="index" >
      </div>
    </div>
  </div>
  <div v-else class="no-comment">当前还没有评论哦</div>
</template>

<script>
import {formatDate} from 'common/utils'

export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    showDate(value) {
      //1.将时间戳转成Date对象
      const date = new Date(value * 1000)

      //2.将date格式化
      return formatDate(date, 'yyyy/MM/dd')
    }
  }
}
</script>

<style>
  .comment-info {
    padding: 12px;
    border-bottom: 5px solid #f2f5f8;
    margin-bottom: 12px;
  }
  .info-header {
    position: relative;
    width: 100%;
    padding: 10px;
  }
  .info-user {
    padding: 10px 0;
  }
  .header-more {
    position: absolute;
    right: 12px;
  }
  .info-user img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    vertical-align: middle;
  }
  .info-user span {
    color: #222;
    font-size: 18px;
    margin-left: 6px;
  }
  .info-imgs img {
    width: 50%;
    padding: 4px;
  }
  .info-other {
    padding: 10px 0;
  }
  .info-other .date {
    margin-right: 6px;
  }
  .no-comment {
    padding: 20px 12px;
    text-align: center;
    border-bottom: 5px solid #f2f5f8;
    margin-bottom: 12px;
    font-size: 14px;
  }
</style>