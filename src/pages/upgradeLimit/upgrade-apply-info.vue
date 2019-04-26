<template>
  <div class="main-with-header common-bg main-with-bottom">
    <common-header></common-header>
    <div class="top common-padding">
      提交您的申请信息
    </div>
    <div class="container mb-16">
      <router-link :to="customer.companyEntryStatus === 1?`/credit-enterprise?state=1&&companyId=${companyModel.id}`: '/credit-enterprise'" class="list">
        <span>企业信息</span>
        <span class="right-box">
          <span :class="getFinishStatus(customer.companyEntryStatus).value === 0 ? 'text-3' : 'text-1'" v-text="getFinishStatus(customer.companyEntryStatus).label"></span>
          <img src="./../../../static/img/common/right.png" class="right"/>
        </span>
      </router-link>
      <router-link :to="customer.legalEntryStatus === 1? `/credit-legalperson?state=1&&companyId=${companyModel.id}`: '/credit-enterprise'" class="list">
        <span>法人信息</span>
        <span class="right-box">
          <span :class="getFinishStatus(customer.legalEntryStatus).value === 0 ? 'text-3' : 'text-1'" v-text="getFinishStatus(customer.legalEntryStatus).label"></span>
          <img src="./../../../static/img/common/right.png" class="right"/>
        </span>
      </router-link>
      <router-link :to="customer.creditEntryStatus === 1? `/credit-authorization?state=1&&companyId=${companyModel.id}`: '/credit-enterprise'" class="list">
        <span>征信报告</span>
        <span class="right-box">
          <span :class="getFinishStatus(customer.creditEntryStatus).value === 0 ? 'text-3' : 'text-1'" v-text="getFinishStatus(customer.creditEntryStatus).label"></span>
          <img src="./../../../static/img/common/right.png" class="right"/>
        </span>
      </router-link>
    </div>
    <div class="container">
      <router-link :to="{path: '/upgrade-apply-finance', query: queries}" class="list">
        <span>财务信息</span>
        <span class="right-box">
        <span :class="getFinishStatus(customer.financeEntryStatus).value === 0 ? 'text-3' : 'text-1'" v-text="getFinishStatus(customer.financeEntryStatus).label"></span>
        <img src="./../../../static/img/common/right.png" class="right"/>
      </span>
      </router-link>
      <router-link :to="{path: '/upgrade-apply-assets/', query: queries}" class="list">
        <span>资产信息</span>
        <span class="right-box">
        <span :class="getFinishStatus(customer.assetsEntryStatus).value === 0 ? 'text-3' : 'text-1'" v-text="getFinishStatus(customer.assetsEntryStatus).label"></span>
        <img src="./../../../static/img/common/right.png" class="right"/>
      </span>
      </router-link>
      <router-link :to="{path: '/upgrade-apply-guarantee', query: queries}" class="list">
        <span>担保信息</span>
        <span class="right-box">
        <span :class="getFinishStatus(customer.guaranteeEntryStatus).value === 0 ? 'text-3' : 'text-1'" v-text="getFinishStatus(customer.guaranteeEntryStatus).label"></span>
        <img src="./../../../static/img/common/right.png" class="right"/>
      </span>
      </router-link>
    </div>
    <mt-button class="common-parimary-btn my-btn" @click="applyCarryAmount">申请额度</mt-button>
  </div>
</template>
<script>
import {queryCustomer,applyCarryAmount} from "@/api/company"
export default{
  data () {
    return {
      finishStatus: [
        {value: 0, label: "未完成"},
        {value: 1, label: "已完成"}
      ],
      customer: {},
      queries: {},
      hasFinish: []
    }

  },
  components: {},
  computed: {
    companyModel () {
      return this.customer.companyModel || {}
    }
  },
  methods: {
    getCustomer(){
      queryCustomer().then(res => {
        if (res.code === 200) {
          this.customer = res.result
          this.queries = {customerId: this.customer.id, companyId: this.customer.companyModel.id}
          this.hasFinish = [this.customer.companyEntryStatus, this.customer.legalEntryStatus,this.customer.creditEntryStatus,this.customer.assetsEntryStatus,this.customer.guaranteeEntryStatus]
          // this.queries.companyId
        }
      })
    },
    getFinishStatus(status){
      console.log('status',status)
      let _status = {}
      if(status != null){
        this.finishStatus.forEach(v=>{
          if(v.value === status){
            _status = v
          }
        })
      }else{
       _status = this.finishStatus[0]
      }
      return _status
    },
    applyCarryAmount(){
      console.log('this.hasFinish',this.hasFinish)
      if(this.hasFinish.includes(0)){
        this.$toast('请补全相关资料')
      }else {
        applyCarryAmount({}).then(res => {
          if(res.code === 200){
            this.$router.push('/upgrade-apply-result')
          }
        })
      }
    }
  },
  mounted(){
    // this.getCustomer()
  },
  created(){
     this.$nextTick(function () {
      this.getCustomer()
     })
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .top{
    font-size: 56px/2;
    color: #333333;
    line-height: 232px/2;
    height: 232px/2;
  }
  .list{
    height: 104px/2;
    font-size: 32px/2;
    color: #333333;
    display: flex;
    padding: 0 32px/2;
    align-items: center;
    justify-content: space-between;
    .text-1{
      color: #999999;
    }
    .text-2{
      color: #333333;
    }
    .text-3{
      color: @lightBlue;
    }
    .right{
      width: 18px/2;
    }
  }
  .container{
    background-color: #fff;
  }
  .my-btn{
    margin-top: 64px/2;
  }
  .mb-16{
    margin-bottom: 16px/2;
  }
  [v-cloak] {
  display: none;
}
</style>
