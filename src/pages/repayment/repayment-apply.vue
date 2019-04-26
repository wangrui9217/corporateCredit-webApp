<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div class="box common-padding">
      <div class="text-1">还款金额</div>
      <div class="text-3">
        <div>¥</div>
        <div>
          <input type="number" placeholder="请输入还款金额"/>
        </div>
      </div>
      <div class="text-2">需还款金额为10,000元</div>
    </div>
    <div class="mt-8">
      <common-select label="还款期数" placeholder="请选择还款期数" :selectedValue.sync="value1" :option="options" keyName="label" value="value"></common-select>
      <common-select label="还款方式" placeholder="请选择还款方式" :selectedValue.sync="value1" :option="options" keyName="label" value="value"></common-select>
    </div>

    <mt-button class="common-parimary-btn common-btn-margin" @click="goApply">
      确认还款
    </mt-button>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
export default{
  data () {
    return {
      checkbox: false,
      options: [{label: '男性',value: 111},{label: '女性',value: 222}],
      value1: ''
    }
  },
  components: {},
  methods: {
    goApply () {
      MessageBox.prompt(' ', '请输入交易密码', {inputPlaceholder: '测试文字',inputType: 'password'}).then(({ value, action }) => {
        if (value === '111') {
          this.$router.push('/repayment-result')
        } else {
          this.$toast('密码错误')
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .mt-8{
    margin-top: 16px/2;
  }
  .box{
    height: 345px/2;
    background: #FFFFFF;
    .text-1{
      font-size: 34px/2;
      color: #333333;
      line-height: 112px/2;
    }
    .text-2{
      font-size: 28px/2;
      color: #999999;
      line-height: 100px/2;
    }
    .text-3{
      display: flex;
      font-size: 60px/2;
      color: #333333;
      text-align: right;
      height: 96px/2;
      align-items: center;
      &>div:nth-child(1){
        margin-right: 20px/2;
      }
    }
  }
  .list{
    width: 100%;
    height: 104px/2;
    display: flex;
    align-items: center;
    font-size: 32px/2;
    color: #333333;
    background-color: #fff;
    margin: 16px/2 0 64px/2;
    label{
      width: 193px/2;
    }
    .text-1{
      font-size: 28px/2;
      color: #999999;
    }
    .text-2{
      color: @lightBlue;
    }
  }
  .apply-detail{
    font-size: 28px/2;
    color: #999999;
    display: flex;
    align-items: center;
    line-height: 40px/2;
    padding-top: 32px/2;
    padding-bottom: 64px/2;
    .text-1{
      color: @lightBlue;
    }
    .check-box{
      margin-right: 10px/2;
    }
  }
</style>
