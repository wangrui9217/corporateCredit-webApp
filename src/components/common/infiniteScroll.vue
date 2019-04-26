<template>
  <div class="real-content"
       v-infinite-scroll="loadMore"
       infinite-scroll-disabled="loadDisabled"
       infinite-scroll-distance="10">
    <slot name="content"></slot>
    <div class="more_loading" v-if="showBottom">
      <mt-spinner type="snake" color="#00ccff" :size="20" v-show="loading"></mt-spinner>
      <span v-show="isEnd">已全部加载</span>
    </div>
  </div>
</template>
<script>
export default{
  data () {
    return {
      loading: false,
      loadDisabled: false,
      isEnd: false,
    }
  },
  props: {
    showBottom: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  methods: {
    loadMore () {
      this.$emit('loadMore')
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .real-content{
    /*overflow: scroll;*/
  }
</style>
