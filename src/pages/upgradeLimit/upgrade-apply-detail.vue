<template>
  <div class="common-main-contaner">
    <div class="main-with-header box">
      <common-header></common-header>
      <div class="common-padding">
        <p class="text-1">让我们更了解您！</p>
        <div class="museui-setting">
          <mu-text-field v-model="value" label="企业是干什么的？"  label-float ></mu-text-field>
          <mu-text-field v-model="value1" label="企业一年销售额多少？"  label-float ></mu-text-field>
          <mu-text-field v-model="value2" label="现在有多少银行借款？"  label-float ></mu-text-field>
          <mu-text-field v-model="value3" label="这次需要多少贷款？"  label-float ></mu-text-field>
          <mu-text-field v-model="value4" label="担保方式是什么？"  label-float ></mu-text-field>
        </div>
      </div>
    </div>
    <div class="bottom">
      <mt-button class="common-parimary-btn common-btn-margin" @click="goApply">
        提交申请
      </mt-button>
      <p class="bottom-text">本服务由XX银行提供</p>
    </div>
  </div>

</template>
<script>
export default{
  data () {
    return {
      value: '',
      value1: '',
      value2: '',
      value3: '',
      value4: ''
    }
  },
  components: {},
  methods: {
    goApply () {
      this.$router.push('./upgrade-apply-result')
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .bottom{
    position: fixed;
    bottom: 48px/2;
    width: 100%;
    text-align: center;
    .bottom-text{
      line-height: 32px/2;
      color: rgba(153, 153, 153, 1);
      font-size: 24px/2;
    }
  }
  .text-1{
    line-height: 90px/2;
    color: rgba(51, 51, 51, 1);
    font-size: 60px/2;
    padding: 80px/2 0 77px/2;
  }
  .box{
    height: 100vh;
    overflow: auto;
    padding-bottom: 304px/2;
  }
</style>
