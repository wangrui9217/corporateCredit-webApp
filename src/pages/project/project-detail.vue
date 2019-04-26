<template>
  <div class="main-with-header common-bg" >
    <common-header :title="productInfo.proName"></common-header>
    <div class="project-detail">
      <div class="box">
        <div class="text-2">{{productInfo.proName}}</div>
        <div class="text-3">
          <div>
            <div class="text-4">{{productInfo.proRate}}<span class="text-1">%</span></div>
            <div class="year">七日年化收益率</div>
          </div>
          <div class="project-time">
            <div class="text-5">{{productInfo.loanTrem}}<span class="text-6">{{productInfo.loanTremType}}</span></div>
            <div class="project-stage">产品期限</div>
          </div>
        </div>
      </div>
      <div class="money-range" >
        <div class="money-range-left">
          <span>借款金额范围</span>
          <span>还款方式</span>
        </div>
        <div class="money-range-right">
          <span>{{productInfo.minQuota}}元~{{productInfo.maxQuota}}元</span>
          <span>{{$dict.getNameByCodeAndValue('002', productInfo.refundWay)}}</span>
        </div>
      </div>
      <div class="project-content" >
        <div >
          <div class="project-content-text1 "><h4><span class="project-content-Characteristic"></span>产品特点</h4></div>
          <div class="project-content-text2"> {{productInfo.proTrait}}</div>
        </div>
        <div>
          <div class="project-content-text4"><h4><span class="project-content-Characteristic"></span>产品介绍</h4></div>
          <div >
           <div class="project-content-detail">
             <div class="project-content-detailText1">产品名称</div>
             <div class="project-content-detailText2">{{productInfo.proName}}</div>
          </div>
            <div class="project-content-detail">
              <div class="project-content-detailText1">产品类型</div>
              <div class="project-content-detailText2">{{$dict.getNameByCodeAndValue('001', productInfo.proType)}}</div>
            </div>
            <div class="project-content-detail">
              <div class="project-content-detailText1">风险说明</div>
              <div  class="project-content-detailText2">{{productInfo.remark}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="project-footer">
        <div class="project-footer-btn" @click="goApply">立即申请</div>
      </div>
    </div>

  </div>
</template>
<script>
  import {getProductById} from '@/api/product'
  import {MessageBox} from 'mint-ui'
  import {getPublicAccount} from '@/api/mine'
  export default {
    data () {
      return {
        productInfo: {},
        accountList: []
      }
    },
    components: {},
    methods: {
      goApply () {
        // this.$router.push(`/project-apply?id=${this.$route.query.id}`)
        if (!this.productInfo.companyId) {
          MessageBox.confirm('', {
            title: '提示',
            message: '当前没有申请额度，是否前往申请？',
            showCancelButton: true,
            confirmButtonText: '前往'
          }).then(action => {
            this.$router.push(`/credit-enterprise`)
          })
        } else if (this.accountList.length === 0) {
          MessageBox.confirm('', {
            title: '提示',
            message: '当前没有对公账户，是否前往添加？',
            showCancelButton: true,
            confirmButtonText: '前往'
          }).then(action => {
            this.$router.push(`/add-account?companyId=${this.productInfo.companyId}&&companyName=${this.productInfo.companyName}`)
          })
        } else {
          this.$router.push(`/project-apply?id=${this.$route.query.id}`)
        }
      },
      getProductDetail () {
        const params = this.$route.query.id
        this.$indicator.open('加载中...')
        getProductById(params).then(res => {
          if (res.code === 200) {
            this.productInfo = res.result
            this.$indicator.close()
          }
        }).catch(res => {
          this.$indicator.close()
        })
      },
      getAmountNumberInfo () {
        this.$indicator.open()
        const id = this.$store.state.app.mineInfo.companyModel.id
        getPublicAccount(id).then(res => {
          this.$indicator.close()
          this.loaded = true
          if (res.code === 200) {
            this.accountList = res.result instanceof Array ? res.result : []
          }
        }).catch(() => {
          this.$indicator.close()
        })
      }
    },
    activated () {
    },
    mounted () {
      this.getProductDetail()
      this.getAmountNumberInfo()
    }
  }
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .box {
    height: 280px/2;
    background-image: linear-gradient(-270deg, #4F95FF 0%, #2B64FF 100%);
  }
  .text-1 {
    font-size: 32px/2;
    color: #fff;
    line-height: 90px/2;
  }
  .text-2 {
    font-size: 32px/2;
    color: #FFFFFF;
    line-height: 46px/2;
    padding: 48px/2  0  16px/2 32px/2;
  }

  .text-3 {
    display: flex;
    justify-content: left;
    align-items: left;
    & > div {
      width: 208px/2;
      text-align: left;
      font-size: 24px/2;
      color: #999999;
      line-height: 32px/2;
    }
    .text-4 {
      height: 90px/2;
      font-size: 64px/2;
      color: #FFFFFF;
      line-height: 90px/2;
      padding-left: 32px/2;
    }
    .project-time {
      margin-left: 212.1px/2;
    }
    .text-5 {
      font-size: 36px/2;
      color: #FFF;
      line-height: 90px/2;
    }
    .text-6 {
      font-size: 28px/2;
      color: #FFF;
      line-height: 90px/2;
    }
    .year {
      opacity: 0.8;
      font-size: 24px/2;
      color: #FFFFFF;
      line-height: 24px/2;
      padding-left: 32px/2;
    }
    .project-stage {
      opacity: 0.8;
      font-size: 24px/2;
      color: #FFFFFF;
      line-height: 24px/2;
    }

  }

  .money-range {
    height: 160px/2;
    display: flex;
    background: #fff;
    margin-bottom: 16px/2;
    justify-content: space-between;
    .money-range-left {
      padding: 32px/2 0 16px/2 32px/2;
      align-items: left;
      font-size: 28px/2;
      color: #999999;
      line-height: 40px/2;
      span {
        display: block;
        text-align: left;
        height: 40px/2;
        line-height: 40px/2;
        margin-bottom: 16px/2;
      }
    }
    .money-range-right {
      padding: 32px/2 32px/2 16px/2 32px/2;
      font-size: 28px/2;
      color: #333333;
      text-align: right;
      line-height: 40px/2;
      span {
        display: block;
        text-align: right;
        height: 40px/2;
        line-height: 40px/2;
        margin-bottom: 16px/2;
      }
    }
  }
.project-content{
  padding: 32px/2;
  background: #fff;
  .project-content-text1{
    height: 46px/2;
    line-height: 46px/2;
    margin-bottom: 24px/2;
    .project-content-Characteristic{
      margin-right: 8px/2;
      background: #FFFFFF;
      border: 4px/2 solid @lightBlue;
      width: 16px/2;
      height: 16px/2;
      display: inline-block;
      border-radius: 50%;
    }
    h4{
      font-size: 32px/2;
      color: #333333;
      line-height: 46px/2;
    }
  }
  .project-content-text2{
    font-size: 28px/2;
    color: #666666;
    line-height: 40px/2;
    margin-bottom: 16px/2;
  }
  .project-content-text3{
    font-size: 28px/2;
    color: #666666;
    line-height: 40px/2;
  }
  .project-content-text4{
    height: 46px/2;
    line-height: 46px/2;
    margin-bottom: 24px/2;
    margin-top: 64px/2;
    .project-content-Characteristic{
      margin-right: 8px/2;
      background: #FFFFFF;
      border: 4px/2 solid @lightBlue;
      width: 16px/2;
      height: 16px/2;
      display: inline-block;
      border-radius: 50%;
    }
    h4{
      font-size: 32px/2;
      color: #333333;
      line-height: 46px/2;
    }
  }
  .project-content-detail{
    display: flex;
    justify-content: space-between;
    align-items: left;
    line-height: 40px/2;
    font-size: 28px/2;
    margin-bottom: 8px/2;
    .project-content-detailText2{
      text-align: left;
      width: 524px/2;
      color: #666666;
    }
    .project-content-detailText1{
      color: #999999;
    }
  }
  .project-content-detail2{
    display: flex;
    justify-content: space-between;
    align-items: left;
    line-height: 40px/2;
    font-size: 28px/2;
    .project-content-detailText2{
      text-align: left;
      width: 524px/2;
      color: #666666;
    }
    .project-content-detailText1{
      color: #999999;
    }
  }
  .project-content-detail3{
    display: flex;
    justify-content: space-between;
    align-items: left;
    line-height: 40px/2;
    font-size: 28px/2;
    .project-content-detailText2{
      text-align: left;
      width: 524px/2;
      color: #666666;
    }
    .project-content-detailText1{
      color: #999999;
    }
  }
}

  .project-footer {
    height: 98px/2;
    width: 100%;
    line-height: 98px/2;
    background-image: linear-gradient(-270deg, #4F95FF 0%, #2B64FF 100%);
    position: fixed;
    bottom: 0;
    .project-footer-btn{
      font-size: 36px/2;
      color: #FFFFFF;
      letter-spacing: 0.58px/2;
      text-align: center;
    }
  }
</style>
