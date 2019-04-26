<template>
  <div class="main-with-header common-bg main-with-bottom">
    <common-header></common-header>
    <div v-if="!messageList || (messageList instanceof Array && messageList.length === 0)" class="common-img-empty">
      <img src="./../../../static/img/empty/empty2.png"/>
    </div>
    <div class="message-box common-padding" v-for="(item, index) in 7" :key="index">
      <div class="time">3-09 10:22</div>
      <div class="content">
        <div class="title">您有合同待签署</div>
        <div class="info">您的产品订单审核成功，签署合同后将收到你申请的借款。</div>
      </div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      messageList: []
    }
  },
  components: {},
  methods: {
  }
}
</script>
<style lang='less' scoped>
  @import "../../public/comment";
  .message-box{
    .time{
      height: 70px/2;
      font-size: 22px/2;
      color: #999999;
      text-align: center;
      line-height: 70px/2;
    }
    .content{
      background-color: #fff;
      padding: 0 32px/2 32px/2;
      .title{
        font-family: PingFang-SC-Medium;
        font-weight: bold;
        font-size: 32px/2;
        color: #333333;
        line-height: 86px/2;
      }
      .info{
        font-size: 28px/2;
        color: #666666;
        text-align: justify;
        line-height: 40px/2;
      }
    }
  }
</style>
