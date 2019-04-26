<template>
  <div class="main-with-header">
    <common-header></common-header>
    <div class="common-padding">
      <p class="text-1">
        您好！<br/>
        欢迎加入小微企业信贷
      </p>
      <div class="text-2">
        <mu-checkbox v-model="checkbox"></mu-checkbox>
        <div>
          我已阅读并同意
          <router-link to="./agreement?id=1" class="text-3">《授信相关协议》</router-link>
        </div>
      </div>
      <mt-button class="common-parimary-btn" @click="goApply">申请额度</mt-button>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      checkbox: false
    }
  },
  components: {},
  methods: {
    goApply () {
      if (!this.checkbox) {
        this.$toast({
          message: '请已阅读并同意相关协议',
          position: 'bottom'
        })
        return
      }
      this.$router.push('./credit-enterprise')
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .text-1{
    font-family: PingFang-SC-Regular;
    font-size: 48px/2;
    color: #333333;
    line-height: 72px/2;
    padding: 160px/2 0;
  }
  .text-2{
    font-family: PingFang-SC-Regular;
    font-size: 28px/2;
    color: #999999;
    line-height: 40px;
    display: flex;
    align-items: center;
    margin-bottom: 20px/2;
  }
  .text-3{
    color: @lightBlue;
  }
</style>
