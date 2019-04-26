<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div class="top mb-6">
      <div>
        <div class="text-1">授信总金额(元)</div>
        <div class="text-2">200,000</div>
      </div>
      <div>
        <div class="text-1">用信总额度(元)</div>
        <div class="text-2">200,000</div>
      </div>

    </div>
    <div class="list common-padding" v-for="(item, index) in 7" :key="index">
      <div class="list-1">
        <div class="text-1">额度已过期</div>
        <div class="text-2">2018-12-12</div>
      </div>
      <div>-100,000.00</div>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
    }
  },
  components: {},
  methods: {
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .mb-6{
    margin-bottom: 12px/2;
  }
  .top{
    height: 192px/2;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &>div{
      flex: 1;
    }
    .text-1{
      opacity: 0.8;
      font-size: 28px/2;
      color: #999999;
      text-align: center;
      line-height: 40px/2;
    }
    .text-2{
      font-size: 48px/2;
      color: #333333;
      text-align: center;
      line-height: 68px/2;
      font-weight: bold;
    }
  }
  .list{
    height: 128px/2;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 36px/2;
    color: #333333;
    .list-1{
      .text-1{
        font-family: PingFang-SC-Medium;
        font-size: 30px/2;
        color: #333333;
        line-height: 40px/2;
      }
      .text-2{
        font-size: 24px/2;
        color: #999999;
        line-height: 32px/2;
      }
    }
  }
</style>
