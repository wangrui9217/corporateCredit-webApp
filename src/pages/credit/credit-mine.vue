<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div class="main-head">
      <img src="./../../../static/img/credit/bg_yongxin.png"/>
      <div class="main-header-inner">
        <p class="text-1">借款中总额(元)</p>
        <p class="text-2">
          {{creditList instanceof Array && creditList.length > 0 ?   (creditList[0].useCreAmountTotal ? $filter.numberFormat(creditList[0].useCreAmountTotal) : '未知') : '未知'}}
        </p>
        <!--<p>-->
          <!--<span class="text-3">用信总额</span>-->
          <!--<span class="text-4">300,000元</span>-->
        <!--</p>-->
      </div>
    </div>
    <mt-navbar v-model="active" class="common-navbar">
      <mt-tab-item id="tab-container1">进行中</mt-tab-item>
      <mt-tab-item id="tab-container2">已结束</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="active" :swipeable="true">
      <mt-tab-container-item id="tab-container1">
        <infinite-scroll @loadMore="loadMore" ref="infinite-scroll">
          <div slot="content">
            <div v-if="!creditList || (creditList instanceof Array && creditList.length === 0)" class="common-img-empty">
            <img src="./../../../static/img/empty/emtpy.png"/>
            </div>
            <div class="contract" v-for="(item, index) in creditList" :key="index" @click="goApply(item)">
              <div class="text-1" >
                <span>用信编号{{item.useCreNo}}</span>
                <div class="tips tips-1" v-if="item.useCreditStatus === 0">已用信</div>
                <div class="tips tips-1" v-if="item.useCreditStatus === 1">用信待审核</div>
                <div class="tips tips-3" v-if="item.useCreditStatus === 2">审核不通过</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 3">待尽调</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 4">尽调待审核</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 5">尽调审核不通过</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 6">待签合同</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 7">待放款</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 8">待还款</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 9">还款成功</div>
              </div>
              <div class="text-2">
                <div>
                  <div class="text-3 ellipsis">{{item.proName}}</div>
                  <div class="text-4">{{item.proRate}}%</div>
                  <div class="text-5">贷款年利率</div>
                </div>
                <div class="top-padding">
                  <div class="text-3">额度最高{{item.maxQuota}}元</div>
                  <div class="text-6">{{item.period}}期</div>
                  <div class="text-5">贷款期限</div>
                </div>
                <div>
                  <div class="text-6 text-7">{{$filter.dateFormat(item.useCreTime, 'yyyy-MM-dd')}}</div>
                  <div class="text-5">申请时间</div>
                </div>
              </div>
            </div>
          </div>
        </infinite-scroll>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <infinite-scroll @loadMore="loadMore2" ref="infinite-scroll2">
          <div slot="content">
            <div v-if="!creditList2 || (creditList2 instanceof Array && creditList2.length === 0)" class="common-img-empty">
              <img src="./../../../static/img/empty/emtpy.png"/>
            </div>
            <div class="contract" v-for="(item, index) in creditList2" :key="index" @click="goApply(item)">
              <div class="text-1" >
                <span>用信编号{{item.useCreNo}}</span>
                <div class="tips tips-1" v-if="item.useCreditStatus === 0">已用信</div>
                <div class="tips tips-1" v-if="item.useCreditStatus === 1">用信待审核</div>
                <div class="tips tips-3" v-if="item.useCreditStatus === 2">审核不通过</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 3">待尽调</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 4">尽调待审核</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 5">尽调审核不通过</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 6">待签合同</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 7">待放款</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 8">待还款</div>
                <div class="tips tips-2" v-if="item.useCreditStatus === 9">还款成功</div>
              </div>
              <div class="text-2">
                <div>
                  <div class="text-3 ellipsis">{{item.proName}}</div>
                  <div class="text-4">{{item.proRate}}%</div>
                  <div class="text-5">贷款年利率</div>
                </div>
                <div class="top-padding">
                  <div class="text-3">额度最高{{item.maxQuota}}元</div>
                  <div class="text-6">{{item.period}}期</div>
                  <div class="text-5">贷款期限</div>
                </div>
                <div>
                  <div class="text-6 text-7">{{$filter.dateFormat(item.useCreTime, 'yyyy-MM-dd')}}</div>
                  <div class="text-5">申请时间</div>
                </div>
              </div>
            </div>
          </div>
        </infinite-scroll>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
  import {getMyLoanList} from '@/api/credit'
  export default {
    data () {
      return {
        active: 'tab-container1',
        creditList: [],
        creditList2: [],
        params: {
          pageIndex: 1,
          size: null,
          orderId: '',
          status: 0
        },
        params2: {
          pageIndex: 1,
          size: null,
          orderId: '',
          status: 1
        },
        pageSize: 3
      }
    },
    components: {},
    mounted () {
    },
    methods: {
      loadMore () {
        this.params.orderId = this.orderId
        const infiniteScroll = this.$refs['infinite-scroll']
        infiniteScroll.loading = true
        this.params.size = this.params.size + this.pageSize
        getMyLoanList(this.params).then(res => {
          if (res.code === 200) {
            this.creditList = res.result
          }
          infiniteScroll.loading = false
          if (this.creditList.length < this.params.size) {
            infiniteScroll.isEnd = true
            infiniteScroll.loadDisabled = true
          }
        }).catch(() => {
          infiniteScroll.loading = false
        })
      },
      loadMore2 () {
        this.params2.orderId = this.orderId
        const infiniteScroll = this.$refs['infinite-scroll2']
        infiniteScroll.loading = true
        this.params2.size = this.params2.size + this.pageSize
        getMyLoanList(this.params2).then(res => {
          if (res.code === 200) {
            this.creditList2 = res.result
          }
          infiniteScroll.loading = false
          if (this.creditList2.length < this.params2.size) {
            infiniteScroll.isEnd = true
            infiniteScroll.loadDisabled = true
          }
        }).catch(() => {
          infiniteScroll.loading = false
        })
      },
      goApply (item) {
        if (item.useCreditStatus === 6) {
          this.$router.push(`/project-apply-ensure?id=${item.id}`)
          return
        } else if (item.useCreditStatus > 7) {
          this.$router.push(`/loan-record?id=${item.id}`)
        }
      }
    },
    computed: {
      orderId () {
        let mineInfo = this.$store.state.app.mineInfo || {}
        return mineInfo.orderId
      }
    },
  }
</script>
<style lang='less' scoped>
  .bg {
    background-color: rgb(243, 244, 251);
  }

  .tips {
    border-radius: 24px/2;
    width: 152px/2;
    height: 48px/2;
    font-size: 26px/2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .tips-1 {
    background: #E6EBFF;
    color: #1546FF;
  }

  .tips-2 {
    background: #EAFFE6;
    color: #45BC2E;
  }

  .tips-3 {
    background: #FFE6EA;
    color: #FF3253;
  }

  .main-head {
    position: relative;
    width: 705px/2;
    margin: 32px/2  auto 0;
    & > img {
      width: 100%;
    }
    .main-header-inner {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      text-align: center;
      color: #FFFFFF;
      .text-1 {
        font-size: 28px/2;
        line-height: 40px/2;
        padding-top: 82px/2;
      }
      .text-2 {
        font-size: 80px/2;
        line-height: 90px/2;
        padding-bottom: 16px/2;
      }
      .text-3 {
        opacity: 0.79;
        font-size: 28px/2;
        line-height: 40px/2;
      }
      .text-4 {
        font-size: 36px/2;
        line-height: 46px/2;
      }
    }
  }

  .contract {
    background-color: #fff;
    height: 304px/2;
    margin-bottom: 16px/2;
    padding: 24px/2 32px/2;
    .text-1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 28px/2;
      color: #999999;
      height: 87px/2;
      border-bottom: 2px solid rgb(243, 244, 251);
    }
    .text-2 {
      padding-top: 24px/2;
      display: flex;
      & > div {
        width: 33%;
      }
      .text-3 {
        font-size: 32px/2;
        color: #666666;
        line-height: 46px/2;
      }
      .text-4 {
        font-size: 48px/2;
        color: #FF3253;
        line-height: 68px/2;
      }
      .text-5 {
        font-size: 24px/2;
        color: #999999;
        line-height: 32px/2;
      }
      .text-6 {
        font-size: 32px/2;
        color: #333333;
        line-height: 68px/2;
      }
      .text-7 {
        padding-top: 46px/2;
      }
    }
  }

</style>
