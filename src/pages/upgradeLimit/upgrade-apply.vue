<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div class="box common-padding">
      <div class="text-1">提额额度</div>
      <div class="text-3">
        <div>¥</div>
        <div>
          <input type="number" placeholder="请输入提额额度" v-model="surveyForm.creditAmount"/>
          <!-- <mt-field type="number" label="" placeholder="请输入提额额度" v-model="surveyForm.creditAmount"></mt-field> -->
        </div>
      </div>
      <div class="text-2" v-text="'当前额度' + surveyForm.amount +  ' 元'"></div>
    </div>
    <div class="mt-8">
      <common-select label="提额原因" placeholder="请选择提额原因" :selectedValue.sync="surveyForm.applyReason" :option="options" keyName="name" value="value"></common-select>
    </div>

    <mt-button class="common-parimary-btn common-btn-margin" @click="goApply">
      提额申请
    </mt-button>
  </div>
</template>
<script>
import {queryOrderSurveying, submitSurvey} from '@/api/company'
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
      if(this.surveyForm.creditAmount === null){
        this.$toast('请输入额度')
      }else if(this.surveyForm.applyReason === null){
        this.$toast('请选择提额原因')
      }else{
        submitSurvey(this.surveyForm).then(res => {
          if(res.code === 200){
            this.$router.push('/upgrade-apply-info')
            this.$toast('提额申请成功，请补全相关信息')
          }
        })
      }
      console.log('parseInt(this.surveyForm.amount',parseInt(this.surveyForm.amount))
      console.log('this.applyReason',this.surveyForm.applyReason)
      console.log('this.surveyForm.creditAmount', parseInt(this.surveyForm.creditAmount))
    },
    getOrderSurvey(){
      queryOrderSurveying({}).then(res => {
        if(res.code === 200){
          this.surveyForm = res.result
        }
      })
    }
  },
  created(){
    this.getOrderSurvey()
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .mt-8{
    margin-top: 16px/2;
  }
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
