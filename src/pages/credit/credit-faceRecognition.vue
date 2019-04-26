<template>
  <div class="main-with-header">
    <common-header></common-header>
    <common-step :activeStep="2"  :option="['企业信息','法人信息','人脸识别','股东授权','征信授权','授信成功']"></common-step>
    <div></div>
    <mt-button class="common-parimary-btn common-btn-margin" @click="goNext">下一步</mt-button>
  </div>
</template>
<script>
export default{
  data () {
    return {
    }
  },
  components: {},
  methods: {
    goNext () {
      this.$router.push('./credit-shareholder')
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
</style>
