<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div class="mt-1">
      <mt-field label="企业名称" placeholder="请输入企业名称" v-model="companyModel.companyName" readonly></mt-field>
      <mt-field label="对公账号" placeholder="请输入对公账户号码" v-model="companyModel.account" type="number"></mt-field>
    </div>
    <mt-button class="common-parimary-btn common-btn-margin" @click="nextStep">下一步</mt-button>
  </div>
</template>
<script>
import {saveComanyAmountNumber} from '@/api/credit'
export default{
  data () {
    return {
      companyModel: {
        companyName: this.$route.query.companyName,
        account: ''
      }
    }
  },
  components: {},
  methods: {
    nextStep () {
      const data = {
        amountNumber: this.companyModel.account,
        companyId: this.$route.query.companyId
      }
      saveComanyAmountNumber(data).then(res => {
        if (res.code === 200) {
          this.$toast(res.message)
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .mt-1{
    margin-top: 64px/2;
  }
</style>
