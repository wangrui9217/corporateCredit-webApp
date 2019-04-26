<template>
  <div class="main-with-header">
    <common-header>
      <router-link to="/credit-record" slot="save" class="save color-666">授信记录</router-link>
    </common-header>
    <div class="box">
      <template lang="html">
        <peony-circle :size="280" :stroke-width="6" :trail-width="6" :percent="percent" :stroke-color="strokeColor" :trail-color="trailColor" :anticlockwise="true">
        </peony-circle>
      </template>
      <div class="position-1">
        <p class="text-1">可用授信额度(元)</p>
        <p class="text-2">{{$filter.numberFormat(Number($store.state.app.mineInfo.creditTotalAmount) - Number($store.state.app.mineInfo.useCreAmountCount))}}</p>
        <p class="text-3">总额度(元)</p>
        <p class="text-4">{{$filter.numberFormat($store.state.app.mineInfo.creditTotalAmount)}}</p>
      </div>

    </div>
    <p class="text-5">授信额度不可循环使用，<br/>
      使用完毕以后需要重新授信</p>
    <router-link to="/project" class="common-parimary-btn common-btn-margin btn btn-1">我要借款</router-link>
    <router-link to="/upgrade-apply" class="common-parimary-btn  btn btn-2">提升额度</router-link>
  </div>
</template>
<script>
export default{
  data () {
    return {
      percent: 0,
      strokeColor: ['#1546FF', '#9E57FF'],
      trailColor: '#ececec'
    }
  },
  components: {},
  mounted () {
    setTimeout(() => {
      this.getData()
    }, 5)
  },
  methods: {
    getData () {
      this.percent = (Number(this.$store.state.app.mineInfo.creditTotalAmount) - Number(this.$store.state.app.mineInfo.useCreAmountCount))/Number(this.$store.state.app.mineInfo.creditTotalAmount) * 100
    }
  }
}
</script>
<style lang="less">
  .box{
    .peony-circle{
      margin: 0 auto;
    }
    .peony-circle__content{
      display: none;
    }
  }
</style>
<style lang='less' scoped>
  @import "./../../public/comment";
  .color-666{
    color: #666666;
  }
  .btn{
    height: 88px/2;
    width: 480px/2;
  }
  .btn-2{
    background-image: none;
    color: #333333;
  }
  .box{
    margin-top: 100px/2;
    text-align: center;
    position: relative;
    .position-1{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .text-1{
      font-size: 28px/2;
      color: #999999;
      line-height: 40px/2;
    }
    .text-2{
      font-size: 80px/2;
      color: #333333;
      line-height: 94px/2;
      margin-bottom: 30px/2;
    }
    .text-3{
      font-size: 28px/2;
      color: #999999;
      line-height: 40px/2;
    }
    .text-4{
      font-size: 36px/2;
      color: #333333;
      line-height: 50px/2;
    }
  }
  .text-5{
    text-align: center;
    font-size: 26px/2;
    color: #999999;
    line-height: 36px/2;
    margin-top: 50px/2;
  }
</style>
