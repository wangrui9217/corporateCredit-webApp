<template>
  <div class="common-main-contaner">
    <div class="main-with-header">
      <common-header></common-header>
      <div class="box common-padding">
        <p class="hello">您好！</p>
        <div class="text-1">期望额度</div>
        <div class="text-3">
          <div>¥</div>
          <div>
            <input type="number" placeholder="请输入期望额度" v-model="surveyForm.creditAmount" autofocus="autofocus"/>
          </div>
        </div>
        <div class="text-2">预授信额度{{$filter.numberFormat(indexInfo.creditAmount)}}元</div>
      </div>
    </div>
    <div class="bottom">
      <mt-button class="common-parimary-btn common-btn-margin" @click="goApply" :class="{'common-btn-disabled': !surveyForm.creditAmount}">
        提额申请
      </mt-button>
      <p class="bottom-text">本服务由XX银行提供</p>
    </div>
  </div>

</template>
<script>
  import {queryOrderSurveying, applyCarryAmount} from '@/api/company'
  import {mapState} from 'vuex'
  export default{
    data () {
      return {
        checkbox: false,
        options: this.$dict.getOptionByCode('010'),
        value1: '',
        surveyForm: {
          creditAmount: '',
          amount: '',
          applyReason: ''
        }
      }
    },
    components: {},
    methods: {
      goApply () {
        // else if(parseInt(this.surveyForm.amount) < parseInt(this.surveyForm.creditAmount)){
        //   this.$toast('提额额度不能大于当前额度')
        // }
        if (!this.surveyForm.creditAmount) {
          this.$toast('请输入额度')
          return
        }
        if (Number(this.surveyForm.creditAmount) <= Number(this.indexInfo.creditAmount)) {
          console.log(this.surveyForm.creditAmount, this.indexInfo.creditAmount)
          this.$toast('期望额度应大于预授信额度')
          return
        }
        const data = {
          applyAmount: this.surveyForm.creditAmount
        }
        applyCarryAmount(data).then(res => {
          if (res.code === 200) {
            this.$router.push('/upgrade-apply-result')
          }
        })
        // this.$router.push('/upgrade-apply-detail')
        // if(this.surveyForm.creditAmount === null){
        //   this.$toast('请输入额度')
        // }else{
        //   submitSurvey(this.surveyForm).then(res => {
        //     if(res.code === 200){
        //       this.$router.push('/upgrade-apply-info')
        //       this.$toast('提额申请成功，请补全相关信息')
        //     }
        //   })
        // }
      }
    },
    created () {
    },
    computed: {
      ...mapState({
        indexInfo: state => state.app.indexInfo
      })
    }
  }
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .hello{
    line-height: 90px/2;
    color: rgba(51, 51, 51, 1);
    font-size: 60px/2;
    padding: 80px/ 2 0 64px/2;
  }
  .bottom{
    position: fixed;
    bottom: 48px/2;
    width: 100%;
    text-align: center;
    .bottom-text{
      line-height: 32px/2;
      color: rgba(153, 153, 153, 1);
      font-size: 24px/2;
    }
  }
  .mt-8{
    margin-top: 16px/2;
  }
  .box{
    //height: 345px/2;
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
    font-size: 32px/2;
    color: #333333;
    background-color: #fff;
    margin: 16px/2 0 64px/2;
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
