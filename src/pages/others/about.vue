<template>
  <div class="main-with-header">
    <common-header></common-header>
    <div class="box">
      <img src="./../../../static/img/logo_sing.png"/>
      <p class="text-1">小微企业信贷</p>
      <p class="text-2">版本号 V 1.0</p>
    </div>
    <router-link to="" class="common-tabel-list common-padding">
      <div>功能介绍</div>
      <div>
        <img src="./../../../static/img/common/right.png" class="text-right"/>
      </div>
    </router-link>
    <router-link to="" class="common-tabel-list common-padding">
      <div>去评分</div>
      <div>
        <img src="./../../../static/img/common/right.png" class="text-right"/>
      </div>
    </router-link>
    <div to="" class="common-tabel-list common-padding" @click="update">
      <div>版本更新</div>
      <div>
        <img src="./../../../static/img/common/right.png" class="text-right"/>
      </div>
    </div>


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
    update () {
      this.$indicator.open('加载中...')
      setTimeout(() => {
        this.$indicator.close()
        this.$toast('当前已是最新版本')
      }, 3000)
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .box{
    height: 354px/2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img{
      width: 128px/2;
      height: 128px/2;
    }
    .text-1{
      font-size: 36px/2;
      color: #333333;
      line-height: 50px/2;
      margin: 24px/2 auto 4px/2;
    }
    .text-2{
      font-size: 26px/2;
      color: #999999;
      line-height: 36px/2;
    }
  }
</style>
