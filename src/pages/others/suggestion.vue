<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <div>
      <div class="title common-padding">
        <span>问题与意见</span>
        <span>{{suggest.length}}/200</span>
      </div>
      <div class="info">
        <textarea class="detail" v-model="suggest" placeholder="请描述您的问题，我们将及时跟进解决…"></textarea>
      </div>
    </div>
    <div>
      <div class="title common-padding">
        <span>图片(选填，提供问题截图)</span>
        <span>{{imageList.length}}/4</span>
      </div>
      <div class="box">
        <img-upload :imageList.sync="imageList" :showTitle="false"></img-upload>
      </div>
    </div>
    <mt-button class="common-parimary-btn common-btn-margin" @click="commit">提交</mt-button>
  </div>
</template>
<script>
export default{
  data () {
    return {
      suggest: '',
      imageList: []
    }
  },
  components: {},
  methods: {
    commit () {
      if (this.suggest === '') {
        this.$toast('输入内容不能为空')
        return
      }
      if (this.suggest.length > 200) {
        this.$toast('输入长度超过限制')
        return
      }
      if (this.imageList.length > 4) {
        this.$toast('上传图片超过限制')
        return
      }
      this.$indicator.open('提交中...')
      setTimeout(() => {
        this.$indicator.close()
        this.$toast('您的信息反馈已成功提交，感谢您的参与！')
        this.$router.go(-1)
      }, 3000)
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .title{
    height: 88px/2;
    font-size: 28px/2;
    color: #999999;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .info{
    height: 320px/2;
    background-color: #fff;
    padding: 30px/2;
    font-size: 28px/2;
    .detail{
      width: 100%;
      height: 100%;
    }
  }
  .box{
    padding-top: 30px/2;
    background-color: #fff;
  }
</style>
