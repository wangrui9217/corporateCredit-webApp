<template>
  <div class="box">
    <div class="main-with-header common-bg has-bottom">
      <common-header></common-header>
      <common-step :activeStep="4" v-if="hideSubmit" :option="['企业信息','法人信息','人脸识别','股东授权','征信授权','授信成功']"></common-step>
      <div class="text-1">尊敬的客户：为了维护您的权益，请在签署本合同前，仔细阅读本合同各条款（特别是含有黑体字标题或黑体字文字的条款），注意本合同涉及数量和质量、价款或者费用、履行期限和方式、安全注意事项和风险警示、售后服务、民事责任、管辖等内容的条款。请关注个人金融信息保护的相关法律法规，了解自己的权利义务，合理审慎提供个人金融信息，维护自身合法权益。如您有疑问或不明之处，请向开户银行咨询，或者咨询您的律师和有关专业人士。如需进行业务咨询和投诉，请拨打银行客服热线。


        　　根据《人民币银行结算账户管理办法》及相关法律法规，开户申请人（客户）与开户银行（本协议中指中国农业银行股份有限公司）经协商一致，签订本协议。



        　　第一条　开户申请人（客户）选择在开户银行开立个人人民币银行Ⅰ类结算账户（以下简称“结算账户”），开户银行接受开户申请人（客户）申请，为开户申请人（客户）提供结算账户服务。



        　　第二条　开户申请人（客户）须按国家支付结算相关法律法规和与开户银行的约定使用支付结算工具，并向开户银行支付各项结算和服务费用。开户申请人（客户）应审慎使用开户银行结算账户与开户银行或第三方机构办理各项支付结算业务，开户银行根据开户申请人（客户）的支付指令或其授权的第三方机构提交的支付指令办理支付结算业务。



        　　第三条　开户申请人（客户）在开户银行开立结算账户时应填写个人综合金融服务申请，并提供相应证明文件，接受开户银行审核，开户银行受理后，开户申请人（客户）应对相关业务凭证记载内容进行核对确认。



        　　开户申请人（客户）承诺所提交的开户资料真实、准确、完整、有效，如有违反，愿承担相应责任。



        　　开户申请人（客户）遗失或更换预留个人印章或更换签字样本的，应依照开户银行规定向开户银行提供经签名确认的书面申请及个人身份证件。



        　　第四条　开户申请人（客户）撤销在开户银行开立的结算账户时，应与开户银行核对该账户存款余额，开户银行核对无误后方可办理销户手续。



        　　第五条　开户申请人（客户）在开户银行开立、使用和撤销结算账户应遵守《人民币银行结算账户管理办法》及相关法律法规的规定。开户申请人（客户）使用结算账户办理结算业务时，应遵守该业务的约定。



        　　第六条　开户申请人（客户）使用结算账户办理现金存取时应遵守中国人民银行关于现金管理的有关规定。



        　　第七条　开户申请人（客户）不得利用结算账户进行偷逃税款、逃废债务、套取现金、洗钱及其他违法犯罪活动。



        　　第八条　开户申请人（客户）不得出租、出借结算账户，不得利用结算账户套取银行信用。



        　　第九条　开户申请人（客户）未按《人民币银行结算账户管理办法》及相关法律法规的规定及本协议约定使用支付结算工具，或者未支付结算和服务费用的，开户银行有权停止其结算账户的使用。



        　　第十条　双方同意对开户申请人（客户）在开户银行开立、使用和撤销结算账户及相关行为接受中国人民银行监管。



        　　第十一条　出现错账时，开户银行将根据实际交易情况进行账务处理。开户申请人（客户）获得不当得利的，为节省开户申请人（客户）时间、维护开户申请人（客户）利益，在不损害开户申请人（客户）合法权益的情况下，开户银行可以扣划不当得利相关款项并通知开户申请人（客户）。



        　　第十二条　开户银行的服务价格依据相关法律法规规定的程序制定和调整，并在营业场所和开户银行门户网站公示。开户银行将严格按照依据相关法律法规制定和调整的服务价格收取费用。开户银行调整服务价格或变更服务协议，开户申请人（客户）不同意的，有权在清偿本合同项下全部债务后解除本协议；各方协商一致的，也可以变更相关服务和对应协议内容。为履行本合同需向第三方支付的费用由各方依据相关法律法规的规定承担，法律法规未作规定的，由各方协商承担。开户银行因增值税等国家税收相关法律法规调整而调整服务价格的，不受本款前述内容约束。</div>
    </div>
    <div class="bottom-fix">
      <div class="bottom-text-1">
        <mu-checkbox v-model="checkbox" :disabled="!hideSubmit"></mu-checkbox>
        <div>我已阅读并同意授权
          <router-link to="./agreement?id=1" class="book-name">《企业信用报告查询授权书》</router-link>、
          <router-link to="./agreement?id=2" class="book-name">《个人信用报告查询授权书》</router-link>
        </div>
      </div>
      <mt-button class="common-parimary-btn1" @click="goNext" v-if="hideSubmit">申请额度</mt-button>
    </div>
  </div>

</template>
<script>
import {saveCreditApplyInfo} from '@/api/credit'
import {mapState} from 'vuex'
export default{
  data () {
    return {
      checkbox: this.$route.query.state
    }
  },
  components: {},
  methods: {
    goNext () {
      if (!this.checkbox) {
        this.$toast('请阅读并同意')
        return
      }
      // this.$store.commit('SET_APPROVE', this.checkbox)
      const companyModel = this.creditInfo
      saveCreditApplyInfo(companyModel).then(res => {
        if (res.code === 200) {
          this.$router.push('/credit-applystatus')
        }
      })
    }
  },
  computed: {
    hideSubmit () {
      return !this.$route.query.state
    },
    ...mapState({
      creditInfo: state => state.app.creditInfo
    })
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .box{
    height: 100vh;
  }
  .has-bottom{
    padding-bottom: 204px/2;
  }
  .text-1{
    background-color: #fff;
    margin-top: 16px/2;
    padding: 32px/2;
    font-size: 28px/2;
    line-height: 40px/2;
    color: #333333;
  }
  .bottom-fix{
    position: fixed;
    width: 100%;
    background-color: #fff;
    padding: 32px/2;
    bottom: 0;
    .bottom-text-1{
      display: flex;
      color: rgba(153, 153, 153, 1);
      font-size: 28px/2;
      margin-bottom: 32px/2;
      .book-name{
        color: @lightBlue;
      }
    }
  }
</style>
