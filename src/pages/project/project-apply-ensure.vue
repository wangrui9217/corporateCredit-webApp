<template>
  <div class="box">
    <common-header className="no-bg"></common-header>
    <div class="container">
      <p class="text-1">借款额度(元)</p>
      <p class="text-2">{{$filter.numberFormat(result.useCreAmount)}}</p>
      <ul>
        <li>产品名称</li>
        <li class="info">{{result.productName}}</li>
      </ul>
      <ul>
        <li>借款用途</li>
        <li class="info">{{$dict.getNameByCodeAndValue('002', result.purpose)}}</li>
      </ul>
      <ul>
        <li>还款期数</li>
        <li class="info">{{result.period}}期</li>
      </ul>
      <ul>
        <li>还款方式</li>
        <li class="info">{{$dict.getNameByCodeAndValue('002', result.refundWay)}}</li>
      </ul>
      <ul>
        <li>借款利率(年)</li>
        <li class="info">{{result.proRate}}%</li>
      </ul>
      <ul>
        <li>利息</li>
        <li class="info">{{result.interestLoan}}元</li>
      </ul>
      <ul>
        <li>对公账户</li>
        <li class="info">{{result.accountNumber}}</li>
      </ul>
      <mt-button class="common-parimary-btn1 my-btn" @click="goNext">签署电子合同</mt-button>
    </div>
    <p class="bottom-tip">急速审批·通过率高·灵活分期</p>
  </div>
</template>
<script>
import {getCreditDetail} from '@/api/credit'
export default{
  data () {
    return {
      result: ''
    }
  },
  components: {},
  mounted () {
    this.getProductListPage()
  },
  methods: {
    goNext () {
      this.$router.push(`/project-apply-sign?id=${this.$route.query.id}`)
    },
    getProductListPage () {
      const id = this.$route.query.id
      getCreditDetail(id).then(res => {
        if (res.code === 200) {
          this.result = res.result
        }
      })
    }
  }
}
</script>
<style lang='less'>
  .box{
    .no-bg{
      background-color: transparent;
      .go-back{
        color: #fff;
      }
     .title{
        color: #fff;
      }
    }
  }
</style>
<style lang='less' scoped>
  .box{
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(-45deg, #1546FF 0%, #6060FE 62%, #9E57FF 100%);
    border-radius: 4px;
    .no-bg{
      background-color: transparent;
      /deep/.go-back{
        color: #fff;
      }
      /deep/.title{
        color: #fff;
      }
    }
  }
  .container{
    width: 686px/2;
    height: 1028px/2;
    position: relative;
    background:  url("./../../../static/img/credit/bg-ensure.png") no-repeat;
    background-size: 100% 100%;
    margin: 195px/2 auto 0;
    text-align: center;
    .text-1{
      font-size: 32px/2;
      color: #999999;
      text-align: center;
      line-height: 46px/2;
      padding: 64px/2 0 0;
    }
    .text-2{
      font-size: 80px/2;
      color: #333333;
      padding: 7px/2 0 83px/2;
    }
    .my-btn{
      margin-top: 50px/2;
      width: 400px/2;
      background-image: linear-gradient(-270deg, #4F95FF 0%, #2B64FF 100%);
      border-radius: 40px/2;
      height: 80px/2;
    }
    ul{
      display: flex;
      font-size: 32px/2;
      color: #999999;
      padding: 13px/2 90px/2;
      line-height: 46px/2;
      text-align: left;
      .info{
        color: #333333;
      }
      &>li:nth-child(1){
        width: 40%;
      }
      &>li:nth-child(2){
        width: 60%;
      }
    }
  }
  .bottom-tip{
    padding-top: 30px/2;
    opacity: 0.32;
    font-size: 24px/2;
    color: #FFFFFF;
    line-height: 32px/2;
    text-align: center;
  }
</style>
