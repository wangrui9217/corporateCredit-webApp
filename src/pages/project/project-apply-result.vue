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
        <p class="text-1">产品申请提交成功</p>
        <p class="text-2"> 您的申请信息已提交，<br/>
          用户借款将在一个工作日内放款。</p>
      </div>
      <router-link class="text-3" :to="{name: 'index'}">{{lastTime}}s返回首页</router-link>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      state: 'success',
      lastTime: 10,
      interval: ''
    }
  },
  components: {},
  methods: {
    countTime () {
      this.interval = setInterval(() => {
        this.lastTime --
        if (this.lastTime === 0) {
          clearInterval(this.interval)
          this.$router.push({name: 'index'})
        }
      }, 1000)
    }
  },
  destroyed () {
    clearInterval(this.interval)
  },
  mounted () {
    this.countTime()
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
      font-family: PingFang-SC-Medium;
      font-size: 36px/2;
      color: #333333;
      line-height: 46px/2;
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
  }
</style>
