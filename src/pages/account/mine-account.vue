<template>
  <div class="main-with-header common-bg main-with-bottom">
    <common-header></common-header>
    <div v-if="loaded">
      <div class="result" v-if="accountList.length === 0">
        <div>
          <img src="./../../../static/img/account/imag_wzh@2x.png" class="result-img" @click="goAdd"/>
          <p class="text-1">添加对公账户</p>
          <!--<div class="text-2"> 没有对公账户，-->
            <!--<div @click="goAdd" class="text-4">申请对公账户</div>-->
          <!--</div>-->
        </div>
      </div>
      <ul class="my-account" v-if="accountList.length !== 0">
        <li class="box" v-for="(item, index) in accountList" :key="index">
          <img src="./../../../static/img/account/imag_zhanghu_bg.png" class="box-bg"/>
          <div class="box-container">
            <div class="text-1">
              <img src="./../../../static/img/account/logo_yinhang.png"/>
            </div>
            <div class="text-box">
              <div class="text-2">{{item.companyOpenBank}}</div>
              <!--<div class="text-3">借记卡</div>-->
              <div class="text-3">{{$filter.bankCardAttribution(item.accountNumber) ? $filter.bankCardAttribution(item.accountNumber).bankName + $filter.bankCardAttribution(item.accountNumber).cardTypeName : '未知'}}</div>
              <div class="text-4">{{$filter.formatBankCardNumber(item.accountNumber)}}</div>
            </div>
          </div>

        </li>
        <p class="text-add-account" @click="goAdd">继续添加对公账户</p>
      </ul>
    </div>
  </div>
</template>
<script>
  import {getPublicAccount} from '@/api/mine'
  import {mapState} from 'vuex'
  export default{
    data () {
      return {
        state: 'success',
        accountList: [],
        loaded: false
      }
    },
    components: {},
    mounted () {
      this.getAmountNumberInfo()
    },
    computed: {
      ...mapState({
        mineInfo: state => state.app.mineInfo,
        user: state => state.app.user
      }),
      companyModel () {
        return this.mineInfo.companyModel || {}
      }
    },
    methods: {
      goAdd () {
        this.$router.push(`/add-account?companyId=${this.companyModel.id}&&companyName=${this.companyModel.companyName}`)
      },
      getAmountNumberInfo () {
        this.$indicator.open('加载中...')
        const id = this.companyModel.id
        getPublicAccount(id).then(res => {
          this.$indicator.close()
          this.loaded = true
          if (res.code === 200) {
            this.accountList = res.result instanceof Array ? res.result : []
          }
        }).catch(() => {
          this.$indicator.close()
        })
      }
    }
  }
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .my-account{
    .box{
      width: 706px/2;
      height: 262px/2;
      margin: 0 auto;
      position: relative;
      .box-bg{
        width: 100%;
        height: 100%;
      }
      .box-container{
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        top: 0;
        display: flex;
        padding: 36px/2 0 0 42px/2;
        .text-1{
          width: 88px/2;
          margin-right: 20px/2;
          img{
            width: 100%;
          }
        }
        .text-2{
          font-size: 32px/2;
          color: #FFFFFF;
          letter-spacing: 0;
          line-height: 50px/2;
        }
        .text-3{
          opacity: 0.8;
          font-size: 24px/2;
          color: #FFFFFF;
          letter-spacing: 0;
          line-height: 65px/2;
        }
        .text-4{
          font-size: 34px/2;
          color: #FFFFFF;
          letter-spacing: 2px/2;
          line-height: 50px/2;
        }
      }
    }
  }
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
    .text-4{
      color: @lightBlue;
    }
  }
  .text-add-account{
    color: @lightBlue;
    padding: 20px;
    font-size: 26px/2;
  }
</style>
