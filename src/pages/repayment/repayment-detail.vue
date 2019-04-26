<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div class="header">
      <p class="text-1">应还总额(元)</p>
      <p class="text-2">{{result.returnAmount}}</p>
      <p class="text-3">还款日期：{{$filter.dateFormat(result.repaymentTime)}}</p>
      <div class="list">
        <div>
          <div>当前期数</div>
          <div>{{result.period}}期</div>
        </div>
        <div>
          <div>已还金额</div>
          <div class="text-4">0</div>
        </div>
      </div>
    </div>
    <div class="box common-padding">
      <div class="list">
        <div>
          <div>2019-01-01</div>
          <div>企业信贷1期</div>
        </div>
        <div>
          <div>{{result.amountNumber}}</div>
          <div>1310.00</div>
        </div>
      </div>
      <div class="container">
        <div>本金：{{result.useCreAmount}}</div>
        <div>利息：{{result.interestLoan}}</div>
        <div>手续费：{{result.serviceCharge}}</div>
        <div>违约金：0</div>
        <div>罚金：0</div>
      </div>
    </div>
  </div>
</template>
<script>
import {getRepaymentDetail} from '@/api/repayment'
export default{
  data () {
    return {
      result: '',
      //   period:'',
      //   repaymentTime:'',
      //   returnAmount:'',
      //
      // repanyDetail:{
      //   interestLoan:'',
      //   serviceCharge:'',
      //   useCreAmount:'',
      // }
    }
  },
  components: {},
  methods: {
    getRepaymentDetail () {
      const id = this.$route.query.id
      getRepaymentDetail(id).then(res => {
        if (res.code === 200) {
          this.result = res.result
        }
        // this.repanyDetail = res;
        // this.period = res.result.period;
        // this.repaymentTime = res.result.repaymentTime;
        // this.returnAmount = res.result.returnAmount;
        // this.amountNumber = res.result.amountNumber
      })
    }
  },
  mounted () {
    this.getRepaymentDetail()
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .header{
    color: #999;
    height: 429px/2;
    text-align: center;
    background-color: #fff;
    .text-1{
      opacity: 0.8;
      font-size: 28px/2;
      line-height: 40px/2;
      padding-top: 48px/2;
    }
    .text-2{
      font-family: DINAlternate-Bold;
      font-size: 80px/2;
      color: #333333;
      line-height: 90px/2;
    }
    .text-3{
      opacity: 0.8;
      font-size: 28px/2;
      line-height: 40px/2;
      padding-top: 16px/2;
    }
    .list{
      display: flex;
      &>div{
        flex: 1;
        text-align: center;
        padding-top: 65px/2;
        opacity: 0.8;
        font-size: 28px/2;
        color: #999999;
        line-height: 40px/2;
      }
      .text-4{
        font-family: DINAlternate-Bold;
        font-size: 36px/2;
        color: #333333;
        line-height: 50px/2;
        opacity: 1;
      }
      &>div>div:nth-child(1){}
      &>div>div:nth-child(2){}
    }
  }
  .box{
    background-color: #fff;
    height: 353px/2;
    margin-bottom: 8px/2;
    .list{
      height: 168px/2;
      display: flex;
      align-items: center;
      &>div{
        flex: 1;
      }
      &>div:nth-child(2){
        text-align: right;
      }
      &>div>div:nth-child(1){
        font-size: 28px/2;
        color: #999999;
        line-height: 40px/2;
      }
      &>div>div:nth-child(2){
        font-family: PingFang-SC-Medium;
        font-size: 32px/2;
        color: #333333;
        line-height: 56px/2;
      }
    }
    .container{
      font-size: 28px/2;
      color: #666666;
      line-height: 40px/2;
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20px/2;
      &>div{
        width: 40%;
      }
    }
  }
</style>
