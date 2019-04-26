<template>
  <div class="main-with-header main-with-bottom">
    <common-header :showBack="false"></common-header>



    <div class="swiper">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in 4" :key="index">
          <img src="./../../../static/img/common/lunbo.png">
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="borrow">
      <div class="text-1">我要贷款</div>
      <infinite-scroll @loadMore="loadMore" ref="infinite-scroll" :showBottom="false">
        <div slot="content">
          <div class="box" v-for="(item ,index) in productList" :key="index">
            <div class="text-2 ellipsis">
              <span class="mr-30">{{item.proName}}</span>
              {{item.proTrait}}</div>
            <div class="text-3">
              <div>
                <div class="text-4">{{item.proRate}}%</div>
                <div>贷款年利率</div>
              </div>
              <div>
                <div class="text-5">{{item.loanTrem}}个{{item.loanTremType}}</div>
                <div>贷款期限</div>
              </div>
            </div>
            <mt-button class="common-btn" @click="goDetail(item.id)">立即申请</mt-button>
          </div>
        </div>
      </infinite-scroll>
    </div>

    <!--</mt-loadmore>-->

    <div class="tips">
      <img src="./../../../static/img/project/imag_guanggaoci_chanpin.png"/>
    </div>

  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
export default{
  data () {
    return {
      params: {
        pageIndex: 1,
        size: null
      },
      pageSize: 3
    }
  },
  components: {},
  mounted () {
  },
  created () {
  },
  activated () {
  },
  methods: {
    loadMore () {
      const infiniteScroll = this.$refs['infinite-scroll']
      infiniteScroll.loading = true
      this.params.size = this.params.size + this.pageSize
      this.getProductListPage(this.params).then(() => {
        infiniteScroll.loading = false
        // console.log(this.productList.length, this.params.size)
        if (this.productList.length < this.params.size) {
          infiniteScroll.isEnd = true
          infiniteScroll.loadDisabled = true
        }
      })
    },
    goDetail (id) {
      this.$router.push({path: '/project-detail', query: {id}})
    },
    ...mapActions({
      getProductListPage: 'getProductListPage'
    })
  },
  computed: {
    ...mapState({
      productList: state => state.product.productList
    })
  }
}
</script>
<style lang='less' scoped>
  .borrow{
    padding: 0 32px/2;
    .text-1{
      font-size: 36px/2;
      color: #333333;
      line-height: 50px/2;
    }
    .box{
      background-color: #F3F4FB;
      height: 294px/2;
      text-align: center;
      margin-bottom: 40px /2;
      .common-btn{
        margin: 16px/2 auto 0;
      }
    }
    .text-2{
      font-size: 32px/2;
      color: #333333;
      line-height: 46px/2;
      padding-top: 32px/2;
      .mr-30{
        margin-right: 30px/2;
      }
    }
    .text-3{
      display: flex;
      justify-content: center;
      align-items: center;
      &>div{
        width: 208px/2;
        text-align: center;
        font-size: 24px/2;
        color: #999999;
        line-height: 32px/2;
      }
      .text-4{
        font-size: 48px/2;
        color: #FF3253;
        text-align: center;
        line-height: 68px/2;
      }
      .text-5{
        font-size: 32px/2;
        color: #333333;
        text-align: center;
        line-height: 68px/2;
      }
    }
  }
  .swiper{
    height: 176px/2;
    width: 686px/2;
    margin: 0 auto 56px/2;
    background-color: #4F95FF;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .tips{
    img{
      width: 312px/2;
      margin: 0 auto;
      display: block;
    }
  }

</style>
