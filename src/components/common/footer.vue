<template>
  <div class="foot">
    <router-link :to="{name: 'index'}">
      <img src="./../../../static/img/tabbar_home_sel@2x.png" v-if="isActive === 'index'">
      <img src="./../../../static/img/tabbar_home_nor@2x.png" v-else>
      <span>首页</span>
    </router-link>
    <router-link :to="{name: 'project'}">
      <img src="./../../../static/img/tabbar_chanpin_sel@2x.png" v-if="isActive === 'project'">
      <img src="./../../../static/img/tabbar_chanpin_nor@2x.png" v-else>
      <span>产品</span>
    </router-link>
    <router-link :to="{name: 'credit'}">
      <img src="./../../../static/img/tabbar_yongxin_sel@2x.png" v-if="isActive === 'credit'">
      <img src="./../../../static/img/tabbar_yongxin_nor@2x.png" v-else>
      <span>用信</span>
    </router-link>
    <router-link :to="{name: 'mine'}">
      <img src="./../../../static/img/tabbar_mine_sel@2x.png" v-if="isActive === 'mine'">
      <img src="./../../../static/img/tabbar_mine_nor@2x.png" v-else>
      <span>我的</span>
    </router-link>
  </div>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      handleChange (val) {
        this.bottomNav = val
      }
    },
    computed: {
      isActive () {
        return this.$route.name
      }
    }
  }
</script>

<style lang="less" scoped>
  .foot{
    border-top: 4px/2 solid #eee;
    background-color: #fff;
    font-size: 20px/2;
    line-height: 1.4;
    height: 98px/2;
    position: fixed;
    display: flex;
    z-index:99;
    justify-content: space-around;
    align-items: center;
    bottom: 0;
    width: 100%;
    img{
      width: 48px/2;
    }
    &>a{
      padding: 0 20px;
      color:#333;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

</style>
