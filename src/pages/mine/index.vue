<template>
  <div class="main main-with-bottom common-bg">
    <div class="main-head">
      <img src="./../../../static/img/mine/bg_wode.png"/>
      <div class="text-1">
        <div>
          <img src="./../../../static/img/mine/imag_touxiang_wode.png" class="img-1"/>
          <span>{{$filter.encryptPhone(user.userPhone)}}</span>
        </div>
        <div>
          <router-link to="/message">
            <img src="./../../../static/img/mine/personal_message_red@2x.png" class="img-2"/>
          </router-link>
          <router-link to="/setting">
            <img src="./../../../static/img/mine/personal_setting@2x.png" class="img-3"/>
          </router-link>
        </div>
      </div>
      <div class="contain">
        <div class="contain-text-1">待还金额(元)</div>
        <div class="contain-text-2">
          <div>{{$filter.numberFormat(mineInfo.repaymentCount)}}</div>
          <router-link to="./repayment-index" class="contain-text-3">还 款</router-link>
        </div>
        <div class="contain-text-4">
          <router-link to="/credit-limit">
            <div class="contain-text-5">可用额度(元)</div>
            <div>{{$filter.numberFormat(Number(mineInfo.creditTotalAmount) - Number(mineInfo.useCreAmountCount))}}</div>
          </router-link>
          <router-link to="/credit-mine">
            <div class="contain-text-5">我的借款(元)</div>
            <div>{{$filter.numberFormat(mineInfo.useCreAmountCount)}}</div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="list-box">
      <div class="list">
        <span class="text-2">授信资料</span>
      </div>

      <router-link :to="mineInfo.companyEntryStatus === 1?`/credit-enterprise?state=1&&companyId=${companyModel.id}`: '/credit-enterprise'" class="common-tabel-list common-padding">
        <div>企业信息</div>
        <div>
          <span class="text-1" v-if="mineInfo.companyEntryStatus === 1">已完成</span>
          <span class="text-2" v-else>未完成</span>
          <img src="./../../../static/img/common/right.png" class="text-right"/>
        </div>
      </router-link>
      <router-link :to="mineInfo.legalEntryStatus === 1? `/credit-legalperson?state=1&&companyId=${companyModel.id}`: '/credit-enterprise'" class="common-tabel-list common-padding">
        <div>法人信息</div>
        <div>
          <span class="text-1" v-if="mineInfo.legalEntryStatus === 1">已完成</span>
          <span class="text-2" v-else>未完成</span>
          <img src="./../../../static/img/common/right.png" class="text-right"/>
        </div>
      </router-link>
      <router-link :to="mineInfo.creditEntryStatus === 1? `/credit-authorization?state=1&&companyId=${companyModel.id}`: '/credit-enterprise'" class="common-tabel-list common-padding">
        <div>征信报告</div>
        <div>
          <span class="text-1" v-if="mineInfo.creditEntryStatus === 1">已完成</span>
          <span class="text-2" v-else>未完成</span>
          <img src="./../../../static/img/common/right.png" class="text-right"/>
        </div>
      </router-link>


      <template v-if="mineInfo.creditEntryStatus === 1&&0">
        <router-link :to="`/upgrade-apply-finance?companyId=${companyModel.id}`" class="common-tabel-list common-padding">
          <div>财务信息</div>
          <div>
            <span class="text-1" v-if="mineInfo.financeEntryStatus === 1">已完成</span>
            <span class="text-2" v-else>未完成</span>
            <img src="./../../../static/img/common/right.png" class="text-right"/>
          </div>
        </router-link>
        <router-link :to="`/upgrade-apply-assets?companyId=${companyModel.id}`" class="common-tabel-list common-padding">
          <div>资产信息</div>
          <div>
            <span class="text-1" v-if="mineInfo.assetsEntryStatus === 1">已完成</span>
            <span class="text-2" v-else>未完成</span>
            <img src="./../../../static/img/common/right.png" class="text-right"/>
          </div>
        </router-link>
        <router-link :to="`/upgrade-apply-guarantee?companyId=${companyModel.id}`" class="common-tabel-list common-padding">
          <div>担保信息</div>
          <div>
            <span class="text-1" v-if="mineInfo.guaranteeEntryStatus === 1">已完成</span>
            <span class="text-2" v-else>未完成</span>
            <img src="./../../../static/img/common/right.png" class="text-right"/>
          </div>
        </router-link>
      </template>


      <!--<router-link to="/credit-record" class="common-tabel-list common-padding mt-16">-->
        <!--<div>借款记录</div>-->
        <!--<div>-->
          <!--<img src="./../../../static/img/common/right.png" class="text-right"/>-->
        <!--</div>-->
      <!--</router-link>-->
      <router-link to="/mine-account" class="common-tabel-list common-padding" v-if="mineInfo.creditEntryStatus === 1">
        <div>对公账户</div>
        <div>
          <img src="./../../../static/img/common/right.png" class="text-right"/>
        </div>
      </router-link>

    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default{
  data () {
    return {
      hasFinish: false
    }
  },
  components: {},
  methods: {
  },
  mounted () {
    this.$store.dispatch('queryMineInfo')
  },
  computed: {
    ...mapState({
      mineInfo: state => state.app.mineInfo,
      user: state => state.app.user
    }),
    companyModel () {
      return this.mineInfo.companyModel || {}
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .common-tabel-list{
    .text-1{
      color: #999999;
    }
    .text-2{
      color: @lightBlue;
    }
  }
  .mt-16{
    margin-top: 16px/2;
  }
  .right{
    width: 18px/2;
  }
  .main-head{
    position: relative;
    &>img{
      width: 100%;
    }
    .text-1{
      position: absolute;
      width: 100%;
      display: flex;
      justify-content: space-between;
      height: 88px/2;
      align-items: center;
      font-size: 32px/2;
      color: #FFFFFF;
      top: 40px/2;
      padding: 0 32px/2;
      .img-1{
        width: 56px/2;
        margin-right: 16px/2;
      }
      .img-2{
        width: 48px/2;
        margin-right: 24px/2;
      }
      .img-3{
        width: 48px/2;
      }
    }
    .contain{
      position: absolute;
      background: #FFFFFF;
      border-radius: 16px/2;
      width: 686px/2;
      height: 332px/2;
      left: 32px/2;
      top: 160px/2;
      box-shadow: 2px 2px 20px #999999;
      padding-left: 32px/2;
      .contain-text-1{
        opacity: 0.8;
        font-size: 28px/2;
        color: #999999;
        line-height: 40px/2;
        padding-top: 32px/2;
      }
      .contain-text-2{
        display: flex;
        height: 90px/2;
        align-items: center;
        justify-content: space-between;
        font-size: 80px/2;
        color: #333333;
      }
      .contain-text-3{
        background-image: linear-gradient(-270deg, #4F95FF 0%, #2B64FF 100%);
        border-radius: 30px/2 0px 0px 30px/2;
        font-size: 26px/2;
        color: #FFFFFF;
        width: 136px/2;
        height: 60px/2;
        justify-content: center;
        display: flex;
        align-items: center;

      }
      .contain-text-4{
        display: flex;
        padding-top: 55px/2;
        &>a{
          width: 50%;
          font-size: 40px/2;
          color: #333333;
          line-height: 56px/2;
          .contain-text-5{
            opacity: 0.8;
            font-size: 24px/2;
            color: #999999;
            line-height: 32px/2;
          }
        }
      }
    }
  }
  .list{
    height: 104px/2;
    font-size: 32px/2;
    color: #333333;
    display: flex;
    padding: 0 32px/2;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    .text-1{
      color: #999999;
    }
    .text-2{
      color: #333333;
    }
    .text-3{
      color: @lightBlue;
    }
  }
  .list-box{
    margin-top: 204px/2;
    background-color: #f3f4fb;
    padding-bottom: 50px/2;
  }
</style>
