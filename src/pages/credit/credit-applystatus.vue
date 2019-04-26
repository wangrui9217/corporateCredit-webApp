<template>
  <div class="main-with-header">
    <common-header :showBack="false"></common-header>
    <div class="text-1">
      <img src="./../../../static/img/credit/imag_dengdai@2x.png" v-if="status==='wait'"/>
      <img src="./../../../static/img/credit/imag_chenggong.png" v-if="status==='success'||status==='success1'"/>
      <img src="./../../../static/img/credit/imag_shibai@2x.png" v-if="status==='fail'"/>
      <div class="text-2" v-if="status==='wait'">
        <p class="text-3">请等待…</p>
        <p class="text-4">您的申请已受理，正在审核中…</p>
        <router-link class="text-5" :to="{name: 'index'}">返回首页</router-link>
      </div>
      <div class="text-2" v-if="status==='success'">
        <p class="text-3">申请成功</p>
        <p class="text-4">您的申请已受理，<br/>
          我们将尽快处理，谢谢！</p>
        <router-link class="text-5" :to="{name: 'index'}">{{lastTime}}s返回首页</router-link>
      </div>
      <div class="text-2" v-if="status==='success1'">
        <p class="text-3">额度申请成功</p>
        <router-link class="text-6" :to="{name: 'index'}">查看</router-link>
        <router-link class="text-5" :to="{name: 'index'}">返回首页</router-link>
      </div>
      <div class="text-2" v-if="status==='fail'">
        <p class="text-3 text-7">抱歉，您未获得授信额度</p>
        <p class="text-4 ">如有疑问请拨打客户电话<span class="text-8"> 69790</span></p>
        <router-link class="text-5" :to="{name: 'index'}">{{lastTime}}s返回首页</router-link>
      </div>

    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      status: 'success',
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
  @import "./../../public/comment";
  .text-1{
    text-align: center;
    padding-top: 80px/2;
    img{
      width: 400px/2;
    }
    .text-2{
      .text-4{
        font-size: 30px/2;
        color: #999999;
        text-align: center;
        line-height: 42px/2;
        margin-bottom: 64px/2;
      }
      .text-3{
        font-size: 36px/2;
        color: #333333;
        text-align: center;
        line-height: 46px/2;
        padding: 32px/2 0 64px/2;
      }
      .text-5{
        width: 360px/2;
        height: 80px/2;
        font-size: 32px/2;
        color: @lightBlue;
        border: 2px/2 solid @lightBlue;
        border-radius: 40px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
      }
      .text-6{
        width: 360px/2;
        height: 80px/2;
        font-size: 32px/2;
        color: #fff;
        background-image: linear-gradient(-270deg, #4F95FF 0%, #2B64FF 100%);
        border-radius: 40px/2;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        margin-bottom: 52px/2;
      }
      .text-7{
        color: #F62833;
      }
      .text-8{
        color: #151515;
      }
    }
  }
</style>
