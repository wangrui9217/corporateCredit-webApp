<template>
  <div>
    <!--<div class="common-mask" v-if="hideMask"></div>-->
    <header :class="className">
      <div class="go-back" v-if="showBack" @click="goBack">
        <img src="./../../../static/img/common/left.png"/>
      </div>
      <p class="title">{{title||renderTitle}}</p>
      <slot name="save"></slot>
    </header>
  </div>

</template>

<script>
  import {MessageBox} from 'mint-ui'
  export default {
    data() {
      return {
      }
    },
    computed: {
      renderTitle: function () {
        const path = this.$route.meta
        return path.title || '标题'
      },
      hideMask () {
        return this.$route.query.state
      }
    },
    methods: {
      goBack: function () {
        // if(this.hasEdit){
        //   MessageBox.confirm('信息未保存，确认要退出吗？').then(action => {
        //     console.log('action',action)
        //     if(action === 'confirm'){
        //       this.$router.go(-1)
        //     }
        //   })
        // }else{
        //   this.$router.go(-1)
        // }
        this.$router.go(-1)
      }
    },
    props: {
      showBack: {
        type: Boolean,
        default: true
      },
      className: {
        default: ''
      },
      title: {},
      hasEdit: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="less" scoped>
  header{
    height: 88px/2;
    background-color: #fff;
    z-index: 99;
    position: fixed;
    text-align: center;
    width: 100%;
    font-family: PingFang-SC-Medium;
    top: 0;
    .go-back{
      position: absolute;
      left: 0;
      top: 0;
      color: #666666;
      padding: 0 32px/2;
      font-size: 20px;
      line-height: 88px/2;
      img{
        width: 18px/2;
      }
    }
    .title{
      font-size: 36px/2;
      color: #333333;
      line-height: 88px/2;
    }
  }
</style>
