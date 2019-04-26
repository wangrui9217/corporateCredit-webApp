<template>
  <div class="main main-with-bottom">
    <div class="main-top">
        <img src="./../../../static/img/home/home_bg@2x.png" class="main-top-bg"/>
        <div class="main-text">
          <div class="text-1">小微企业信贷 </div>
          <template v-if="indexInfo.creditAmount">
            <div class="text-2">我的额度(元)</div>
            <div class="text-3">{{$filter.numberFormat(indexInfo.creditAmount)}}</div>
          </template>
          <template v-else>
            <div class="text-empty">暂无额度</div>
          </template>

          <div class="text-4">
            <div>
              <img src="./../../../static/img/home/home_miaosu@2x.png"/>
              <span>30秒到账</span>
            </div>
            <div>
              <img src="./../../../static/img/home/home_lixi@2x.png"/>
              <span>按日计息</span>
            </div>
            <div>
              <img src="./../../../static/img/home/home_suijie@2x.png"/>
              <span>随借随还</span>
            </div>
          </div>
          <!--<div class="text-5">授信申请审批中…</div>-->
          <!--<div class="text-5">授信申请失败</div>-->
          <div class="text-5" v-if="indexInfo.orderStatus === 'RAISE_AMOUNT'"> 提额申请审批中<span class="loading"></span></div>
          <div class="apply-btn" @click="upgradeLimit" v-if="(indexInfo.creditStatus === '' || indexInfo.creditStatus === '2') && indexInfo.orderStatus === 'SUCCESS'">提升额度</div>
          <div class="apply-btn" @click="goApply" v-if="Object.keys(indexInfo).length === 0 || !indexInfo">申请额度</div>

        </div>
      </div>

    <div class="swiper">
        <mt-swipe :auto="4000">
          <mt-swipe-item v-for="(item, index) in imgList" :key="index">
            <img :src="item">
          </mt-swipe-item>
        </mt-swipe>
      </div>


    <!--<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="false" ref="loadmore">-->
      <div class="borrow">
        <div class="text-1">我要贷款</div>

        <div class="box" v-for="item in 1" :key="item">
          <div class="text-2">信用快贷 额度最高300万</div>
          <div class="text-3">
            <div>
              <div class="text-4">3.988%</div>
              <div>贷款年利率</div>
            </div>
            <div>
              <div class="text-5">12个月</div>
              <div>贷款期限</div>
            </div>
          </div>
          <div class="common-btn" @click="goApplyApplication">立即申请</div>
        </div>

      </div>
    <!--</mt-loadmore>-->

  </div>
</template>
<script>
import { MessageBox } from 'mint-ui'
// import { loginByUsername } from '@/api/login'
import {mapState, mapMutations, mapActions} from 'vuex'
export default{
  data () {
    return {
      openAlert: false,
      imgList: ['./../../../static/img/common/lunbo.png', './../../../static/img/common/lunbo.png', './../../../static/img/common/lunbo.png', './../../../static/img/common/lunbo.png']
    }
  },
  components: {},
  mounted () {
    this.queryDetail()
  },
  methods: {
    ...mapMutations({
      setToken: 'SET_TOKEN'
    }),
    ...mapActions({
      queryDetail: 'queryDetail'
    }),
    goApplyApplication () {
      this.$toast('敬请期待')
    },
    upgradeLimit () {
      this.$router.push('./upgrade-apply-index')
    },
    goApply () {
      this.$router.push('/credit-entrance')
    },
    loadTop () {},
    loadBottom () {},
    allLoaded () {},
    openAlertDialog () {
      MessageBox.confirm('', {
        title: '签署合同',
        message: '您有一个产品订单审核成功，签署合同后将收到你申请的借款。',
        showCancelButton: true,
        confirmButtonText: '签署合同'
      }).then(action => {
        console.log(111)
      })
    }
  },
  computed: {
    ...mapState({
      token: state => state.app.token,
      indexInfo: state => state.app.indexInfo
    })
  }
}
</script>
<style lang='less' scoped>
  .loading:after {
    overflow: hidden;
    display: inline-block;
    vertical-align: bottom;
    position: absolute;
    animation: ellipsis 2s infinite;
    content: "\2026"; /* ascii code for the ellipsis character */
  }
  @keyframes ellipsis {
    from {
      width: 2px;
    }
    to {
      width: 15px;
    }
  }
  .main-top{
  position: relative;
  .main-top-bg{
    width: 100%;
  }
  .main-text{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .text-1{
      margin-top: 59px/2;
      font-size: 36px/2;
      color: #FFFFFF;
      text-align: center;
      line-height: 50px/2;
    }
    .text-2{
      margin-top: 102px/2;
      font-size: 28px/2;
      color: #FFFFFF;
      text-align: center;
      line-height: 40px/2;
    }
    .text-empty{
      margin-top: 142px/2;
      font-size: 34px/2;
      color: #FFFFFF;
      text-align: center;
      line-height: 40px/2;
      margin-bottom: 54px/2;
    }
    .text-3{
      font-size: 80px/2;
      color: #FFFFFF;
      text-align: center;
      line-height: 94px/2;
    }
    .text-4{
      margin: 22px/2 0 55px/2;
      opacity: 0.8;
      font-family: PingFang-SC-Regular;
      font-size: 24px/2;
      color: #FFFFFF;
      line-height: 32px/2;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 24px/2;
        margin-right: 5px/2;
      }
      div{
        padding: 0 24px/2;
      }
      div+div{
        border-left: 1px solid #fff;
      }
    }
    .text-5{
      font-size: 32px/2;
      color: #FFFFFF;
      text-align: center;
    }
    .apply-btn{
      border: 1px solid #FFFFFF;
      border-radius: 30px/2;
      margin: 0 auto;
      font-size: 26px/2;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 352px/2;
      height: 60px/2;
    }
  }

}
.borrow{
  padding: 0 32px/2;
  .text-1{
    font-size: 36px/2;
    color: #333333;
    line-height: 50px/2;
  }
  .box{
    background-color: #F3F4FB;
    height: 294px/2;
    text-align: center;
    margin-bottom: 40px /2;
    .common-btn{
      margin: 16px/2 auto 0;
    }
  }
  .text-2{
    font-size: 32px/2;
    color: #333333;
    line-height: 46px/2;
    padding-top: 32px/2;
  }
  .text-3{
    display: flex;
    justify-content: center;
    align-items: center;
    &>div{
      width: 208px/2;
      text-align: center;
      font-size: 24px/2;
      color: #999999;
      line-height: 32px/2;
    }
    .text-4{
      font-size: 48px/2;
      color: #FF3253;
      text-align: center;
      line-height: 68px/2;
    }
    .text-5{
      font-size: 32px/2;
      color: #333333;
      text-align: center;
      line-height: 68px/2;
    }
  }
}
.swiper{
  height: 176px/2;
  width: 686px/2;
  margin: 0 auto 56px/2;
  background-color: #4F95FF;
  img{
    width: 100%;
    height: 100%;
  }
}

</style>
