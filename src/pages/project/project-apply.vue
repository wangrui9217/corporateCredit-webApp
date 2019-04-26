<template>
  <div class="main-with-header common-bg main-with-bottom">
    <common-header></common-header>
    <div class="box common-padding">
      <div class="text-1">借款额度</div>
      <div class="text-3">
        <div>¥</div>
        <div>
          <input type="number" v-model="loanAmount" :placeholder="productInfo.minQuota + '元~' + productInfo.maxQuota + '元'"/>
        </div>
      </div>
      <div class="text-2">可借款总额度{{$filter.numberFormat(productInfo.creditAmount)}}元</div>
    </div>

    <div class="list common-padding">
      <label>产品名称</label>
      <div>
        {{productInfo.proName}}
      </div>
    </div>
    <!--<div class="list common-padding">-->
      <!--<label>期数</label>-->
      <!--<div>-->
        <!--1期-->
      <!--</div>-->
    <!--</div>-->
    <common-select label="借款用途" placeholder="请选择借款用途" :selectedValue.sync="value3" :option="$dict.getOptionByCode('010')" keyName="name" value="value"></common-select>
    <common-select label="期数" placeholder="请选择期数" :selectedValue.sync="value2" :option="options2" keyName="label" value="value"></common-select>
    <common-select label="还款方式" placeholder="请选择还款方式" :selectedValue.sync="value1" :option="options" keyName="label" value="value"></common-select>
    <div class="list common-padding">
      <label>借款利率(年)</label>
      <div>
        {{productInfo.proRate}}%
      </div>
    </div>
    <div class="list common-padding">
      <label>利息</label>
      <div>
        {{interestLoan}}元
      </div>
    </div>
    <common-select label="对公账户" placeholder="请选择对公账户" :selectedValue.sync="value4" :option="accountList" keyName="accountNumber" value="id"></common-select>
    <!--<div class="list common-padding">-->
      <!--<label>对公账户</label>-->
      <!--<div>-->
        <!--{{productInfo.accountName}}-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="list common-padding">-->
      <!--<div class="text-1">-->
        <!--没有对公账户，-->
        <!--<router-link to="/add-account" class="text-2">申请对公账户</router-link>-->
      <!--</div>-->
    <!--</div>-->
    <div class="apply-detail common-padding">
      <span class="check-box">
        <mu-checkbox v-model="checkbox"></mu-checkbox>
      </span>
      我已阅读并同意
      <router-link to="./agreement?id=2" class="text-1">《借款申请书》</router-link>
    </div>
    <mt-button class="common-parimary-btn" @click="goApply">
      确认申请
    </mt-button>
  </div>
</template>
<script>
import {getProductById, applyProductInfo} from '@/api/product'
import {getPublicAccount} from '@/api/mine'
export default{
  data () {
    return {
      checkbox: false,
      productInfo: '',
      loanAmount: '',
      value1: 111,
      options: [{label: '一次性还本付息', value: 111}],
      value2: 1,
      // options2: [{label: '1期', value: 1}, {label: '6期', value: 6}, {label: '12期', value: 12}, {label: '24期', value: 24}],
      options2: [{label: '1期', value: 1}],
      value3: '',
      accountList: [],
      value4: ''
    }
  },
  components: {},
  methods: {
    goApply () {
      if (!this.loanAmount || Number(this.loanAmount) > Number(this.productInfo.creditAmount) || Number(this.loanAmount) > Number(this.productInfo.maxQuota)) {
        this.$toast('请输入有效借款金额')
        return
      }
      if (!this.value3) {
        this.$toast('请选择借款用途')
        return
      }
      if (!this.value4) {
        this.$toast('请选择对公账户')
        return
      }
      if (!this.checkbox) {
        this.$toast('请阅读并同意条款')
        return
      }
      const data = {
        loanAmount: this.loanAmount,
        periods: this.value2,
        proRate: this.productInfo.proRate,
        productId: this.$route.query.id,
        interestLoan: this.interestLoan,
        accountId: this.value4,
        purpose: this.value3
      }
      this.$indicator.open()
      applyProductInfo(data).then(res => {
        this.$indicator.close()
        if (res.code === 200) {
          this.$router.push('/project-apply-result')
        }
      }).catch(() => { this.$indicator.close() })
    },
    getProductDetail () {
      this.$indicator.open()
      const params = this.$route.query.id
      getProductById(params).then(res => {
        this.$indicator.close()
        if (res.code === 200) {
          this.productInfo = res.result
        }
      }).catch(() => {
        this.$indicator.close()
      })
    },
    getAmountNumberInfo () {
      this.$indicator.open()
      const id = this.$store.state.app.mineInfo.companyModel.id
      getPublicAccount(id).then(res => {
        this.$indicator.close()
        this.loaded = true
        if (res.code === 200) {
          const result = res.result instanceof Array ? res.result : []
          this.accountList = result.map(val => {
            val.accountNumber = `${val.bankName}(尾数${val.accountNumber.substring(val.accountNumber.length - 4)})`
            return val
          })
        }
      }).catch(() => {
        this.$indicator.close()
      })
    }
  },
  computed: {
    interestLoan () {
      const myDate = new Date()
      // console.log(myDate.getDate())
      return (Number(this.loanAmount) * this.productInfo.proRate / 100 / 365).toFixed(2)
    }
  },
  mounted () {
    this.getProductDetail()
    this.getAmountNumberInfo()
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
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
    justify-content: space-between;
    font-size: 32px/2;
    color: #333333;
    background-color: #fff;
    margin-bottom: 5px/2;
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
