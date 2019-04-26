<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div v-if="repanymentList instanceof Array && repanymentList.length > 0">
      <div class="item common-padding" v-for="(item, index) in repanymentList" :key="index" @click="goDetail(item.id)">
        <p class="text-1">{{item.proName}}</p>
        <div class="list">
          <div class="repanymeny">
            <div class="ellipsis">{{item.returnAmount}}</div>
            <div class="repanymeny2">应还金额(元)</div>
          </div>
          <div v-if="getLeftDays(item.repaymentTime) >= 0" class="repanymeny">
            <div>{{getLeftDays(item.repaymentTime)}}</div>
            <div class="repanymeny2">剩余还款日(天)</div>
          </div>
          <div v-else class="repanymeny">
            <div class="text-red">{{getLeftDays(item.repaymentTime)}}</div>
            <div class="text-red">逾期天数(天)</div>
          </div>
          <div class="repanymeny">
            <div>{{$filter.dateFormat(item.repaymentTime)}}</div>
            <div class="repanymeny2">还款日期</div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" v-else>
      <img src="./../../../static/img/empty/emtpy.png"/>
      <p>都还清了</p>
    </div>

  </div>
</template>
<script>
import {getRepaymentListWithPage} from '@/api/repayment'
import {mapState} from 'vuex'
export default{
  data () {
    return {
      repanymentList: []
    }
  },
  components: {},
  methods: {
    getLeftDays (date) {
      let s1 = new Date(date)
      let s2 = new Date()
      let days = s1.getTime() - s2.getTime()
      let count = parseInt(days / (1000 * 60 * 60 * 24))
      return count
    },
    goDetail (id) {
      this.$router.push({path: './repayment-detail', query: {id: id}})
    },
    getRepaymentListWithPage () {
      if (!this.mineInfo.orderId) {
        this.repanymentList = []
        return
      }
      const data = {
        orderId: this.mineInfo.orderId,
        pageIndex: 1,
        size: 10

      }
      getRepaymentListWithPage(data).then(res => {
        this.repanymentList = res.result
      })
    }
  },
  mounted () {
    this.getRepaymentListWithPage()
  },
  computed: {
    ...mapState({
      mineInfo: state => state.app.mineInfo
    })
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .empty{
    text-align: center;
    padding-top: 120px/2;
    img{
      width: 400px/2;
    }
    p{
      font-size: 32px/2;
      color: #666666;
      letter-spacing: 1.96px;
      line-height: 46px/2;
    }
  }
  .item{
    height: 216px/2;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    margin-bottom: 8px/2;
    .text-1{
      font-size: 32px/2;
      color: #666666;
      line-height: 46px/2;
      height: 94px/2;
      display: flex;
      align-items: center;
    }
    .list{
      flex: 1;
      display: flex;
      flex-wrap: nowrap;
      &>div{
        width: 33.33%;
      }
      &>div>div:nth-child(1){
        font-size: 36px/2;
        color: #333333;
        line-height: 50px/2;
        font-family: DINAlternate-Bold;
      }
      &>div>div:nth-child(2){
        font-size: 24px/2;
        color: #999999;
        line-height: 32px/2;
      }
      .text-red{
        color: #FF3253 !important;
      }
    }
    .repanymeny{
      position: relative;
    }
    .repanymeny2{
      position: absolute;
      bottom: 35px/2;
    }
  }
</style>
