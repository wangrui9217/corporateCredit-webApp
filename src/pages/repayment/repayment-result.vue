<template>
  <div class="main-with-header">
    <common-header :showBack="false"></common-header>
    <div class="result">
      <div v-if="state === 'fail'">
        <img src="./../../../static/img/project/imag_shibai@2x.png" class="result-img"/>
        <p class="text-1">您的借款申请失败</p>
        <p class="text-2">您申请的产品未能成功放款，<br/>
          请拨打 252646 联系我们的客服。</p>
      </div>
      <div v-if="state === 'success'">
        <img src="./../../../static/img/project/imag_chenggong@2x.png" class="result-img"/>
        <p class="text-1">还款成功</p>
        <p class="text-4">
          <span>¥</span>
          <span>200,000</span>
        </p>
      </div>
      <router-link class="text-3" :to="{name: 'index'}">返回首页</router-link>
    </div>
  </div>
</template>
<script>
  export default{
    data () {
      return {
        state: 'success'
      }
    },
    components: {},
    methods: {
    }
  }
</script>
<style lang='less' scoped>
  .result{
    margin: 80px/2 auto 0;
    text-align: center;
    .result-img{
      width: 400px/2;
    }
    .text-1{
      font-size: 36px/2;
      color: #333333;
      line-height: 46px/2;
      font-family: PingFang-SC-Medium;
    }
    .text-2{
      font-size: 30px/2;
      color: #999999;
      text-align: center;
      line-height: 42px/2;
      padding: 32px/2 0 64px/2;
    }
    .text-3{
      border: 2px/2 solid #2B64FF;
      border-radius: 40px/2;
      width: 360px/2;
      height: 80px/2;
      font-size: 32px/2;
      color: #2B64FF;
      text-align: center;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text-4{
      padding: 32px/2 0 64px/2;
      font-size: 64px/2;
      color: #333333;
      line-height: 64px/2;
      &>span:nth-child(1){
        font-size: 36px/2;
      }
    }
  }
</style>
