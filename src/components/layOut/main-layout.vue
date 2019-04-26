<template>
  <div>
    <transition :name="$store.state.app.transitionName">
      <keep-alive>
        <router-view  v-if="$route.meta.keepAlive" class="child-view"></router-view>
      </keep-alive>
    </transition>
    <transition :name="$store.state.app.transitionName">
      <router-view v-if="!$route.meta.keepAlive" class="child-view"></router-view>
    </transition>
    <main-footer v-if="homePage.includes($route.name)"></main-footer>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        homePage: ['index', 'project', 'credit', 'mine']
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
