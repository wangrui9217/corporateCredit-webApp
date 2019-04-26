<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div class="mb-16">
      <div class="head common-padding">
        <div class="title-1">合同编号：888888888</div>
        <router-link :to="`project-apply-sign?id=${$route.query.id}&&state=1`"  class="title-2">查看合同</router-link>
      </div>
      <div class="content">
        <p class="content-1">借款金额(元)</p>
        <p class="content-2">{{$filter.numberFormat(result.useCreAmount)}}</p>
        <!--<router-link to="/repayment-apply" class="common-parimary-btn content-3">去还款</router-link>-->
      </div>
    </div>
    <div class="list-box">
      <div class="list-1">
        <div>期限</div>
        <div>应还金额</div>
        <div>还款日</div>
        <div>状态</div>
      </div>
      <!--<mt-loadmore class="my-loadmore" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom"-->
                   <!--:bottom-all-loaded="false"  topDropText="释放刷新"-->
                   <!--topLoadingText="刷新中..." bottomPullText="上拉加载更多" bottomDropText="释放加载"-->
                   <!--ref="loadNoticeMore">-->
      <!--</mt-loadmore>-->
      <div class="empty" v-if="productList.length === 0">暂无</div>
      <div v-for="(item,index) in productList" :key="index">
        <div class="list-1">
          <div>{{item.period}}期</div>
          <div>{{$filter.numberFormat(item.returnAmount)}}</div>
          <div>{{$filter.dateFormat(item.repaymentTime, 'yyyy-MM-dd')}}</div>
          <div class="color-999" @click="changeState(index)">
            <span class="tips tips-1" v-if="item.useCreditStatus === 1">用信待审核</span>
            <span class="tips tips-3" v-if="item.useCreditStatus === 2">审核不通过</span>
            <span class="tips tips-2" v-if="item.useCreditStatus === 3">待尽调</span>
            <span class="tips tips-2" v-if="item.useCreditStatus === 4">尽调待审核</span>
            <span class="tips tips-2" v-if="item.useCreditStatus === 5">尽调审核不通过</span>
            <span class="tips tips-2" v-if="item.useCreditStatus === 6">待签合同</span>
            <span class="tips tips-2" v-if="item.useCreditStatus === 7">待放款</span>
            <span class="tips tips-2" v-if="item.useCreditStatus === 8">待还款</span>
            <span class="tips tips-2" v-if="item.useCreditStatus === 9">还款成功</span>
            <img src="./../../../static/img/common/left.png" class="arrow" :class="{'arrow-top': isShow(index)}"/>
          </div>
        </div>
        <transition name="fade">
        <ul class="hidden-content" v-if="isShow(index)">
          <li class="hidden-content-li">
            <div class="text-1">本金</div>
            <div>{{item.useCreAmount || '暂无'}}</div>
          </li>
          <li class="hidden-content-li">
            <div class="text-1">利息</div>
            <div>{{item.interestLoan || '暂无'}}</div>
          </li>
          <li class="hidden-content-li">
            <div class="text-1">手续费</div>
            <div>{{item.serviceCharge || '暂无'}}</div>
          </li>
        </ul>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import {getCreditDetail} from '@/api/credit'
export default{
  data () {
    return {
      result: '',
      show: false,
      showList: [],
      params: {
        pageIndex: 1,
        size: null
      },
      pageSize: 1,
      productList: []
    }
  },
  components: {},
  mounted () {
    this.getUseCreditDetails()
  },
  methods: {
    // loadTop () {
    //   // this.params.size = this.pageSize
    //   this.getProductListPage(this.params).then(() => {
    //     this.$refs['loadNoticeMore'].onTopLoaded()
    //   })
    // },
    // loadBottom () {
    //   this.params.size = this.params.size + this.pageSize
    //   this.getProductListPage(this.params).then(() => {
    //     this.$refs['loadNoticeMore'].onBottomLoaded()
    //   })
    // },
    getUseCreditDetails () {
      const id = this.$route.query.id
      getCreditDetail(id).then(res => {
        if (res.code === 200) {
          this.result = res.result
          this.productList.push(res.result)
        }
      })
    },
    changeState (index) {
      if (this.showList.indexOf(index) === -1) {
        this.showList.push(index)
      } else {
        this.showList.splice(this.showList.indexOf(index), 1)
      }
    },
    isShow (index) {
      return this.showList.indexOf(index) !== -1
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .fade-enter-active, .fade-leave-active {
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  }
  .arrow{
    width: 16px/2;
    transform: rotate(-90deg);
    transition: all 0.3s;
  }
  .arrow-top{
    transform: rotate(90deg);
  }
  .empty{
    padding: 25px/2 0;
    text-align: center;
    font-size: 30px/2;
  }
  .mb-16{
    margin-bottom: 16px/2;
  }
  .head{
    font-size: 26px/2;
    color: #666666;
    height: 64px/2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-1{}
    .title-2{
      color: @lightBlue;
    }
  }
  .content{
    height: 350px/2;
    text-align: center;
    background-color: #fff;
    .content-1{
      color: #999999;
      line-height: 40px/2;
      opacity: 0.8;
      font-size: 28px/2;
      padding-top: 56px/2;
      margin: 0 auto 8px/2;
    }
    .content-2{
      color: #333333;
      line-height: 90px/2;
      font-size: 80px/2;
    }
    .content-3{
      width: 280px/2;
      height: 76px/2;
      margin-top: 24px/2;
    }
  }
  .color-999{
    color: #999999;
  }
  .list-box{
    background-color: #fff;
    overflow: scroll;
    .list-1{
      height: 80px/2;
      display: flex;
      color: rgba(102, 102, 102, 1);
      font-size: 28px/2;
      text-align: center;
      align-items: center;
      flex-wrap: nowrap;
      &>div{
        flex: 1;
      }
    }
  }
  .hidden-content{
    display: flex;
    height: 136px/2;
    align-items: center;
    font-size: 28px/2;
    .hidden-content-li{
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      .text-1{
        color: #999999;
        margin-bottom: 8px/2;
      }
    }
  }
</style>
