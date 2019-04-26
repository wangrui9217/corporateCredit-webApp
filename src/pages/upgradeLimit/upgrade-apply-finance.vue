<template>
  <div class="main-with-header main-with-bottom common-bg">
    <common-header :hasEdit.sync="hasEdit">
      <div slot="save" class="save" @click="submit">保存</div>
    </common-header>
    <div></div>
    <img-upload title="利润表" :imageList.sync="profitStatements" :deleteIds.sync="financeForm.deleteIds" :hasEdit.sync="hasEdit"></img-upload>
    <img-upload title="资产负债表" :imageList.sync="balanceSheets" :deleteIds.sync="financeForm.deleteIds" :hasEdit.sync="hasEdit"></img-upload>
    <img-upload title="现金流量表" :imageList.sync="cashFlowSheets" :deleteIds.sync="financeForm.deleteIds" :hasEdit.sync="hasEdit"></img-upload>
    <img-upload title="其他" :imageList.sync="financialInfoOthers"  :deleteIds.sync="financeForm.deleteIds" :hasEdit.sync="hasEdit"></img-upload>
  </div>
</template>
<script>
import {updateResourceEntry,queryResourceList} from "@/api/company"
export default{
  data () {
    return {
      companyId: this.$route.query.companyId,
      customerId: this.$route.query.customerId,
      financeForm: {
        financeEntryStatus: 1,
        resourceList: [],
        deleteIds: [],
        customerId: this.$route.query.customerId
      },
      profitStatements: [], // 利润表
      balanceSheets: [], //资产负债表
      cashFlowSheets: [],//现金流量表
      financialInfoOthers: [],
      paramster: {
        ownerId: this.$route.query.companyId,
        ownerType: "COMPANY"
      },
      hasEdit: false,
      originIds: []

    }
  },
  components: {
  },
  methods: {
    submit(){
      this.profitStatements.filter(v => {
        v.category = 'profitStatements'
      })
      this.balanceSheets.map(v => {
        v.category = 'balanceSheets'
      })
      this.cashFlowSheets.map(v => {
        v.category = 'cashFlowSheets'
      })
      this.financialInfoOthers.map(v => {
        v.category = 'financialInfoOthers'
      })
      if (this.profitStatements.length === 0) {
        this.$toast('请上传利润表信息')
        return
      }else if(this.balanceSheets.length === 0){
        this.$toast('请上传资产负债表信息')
        return
      }else if(this.cashFlowSheets.length === 0){
        this.$toast('请上传现金流量表信息')
        return
      }else{
        this.financeForm.resourceList = [...this.profitStatements, ...this.balanceSheets, ...this.cashFlowSheets, ...this.financialInfoOthers]
        this.financeForm.resourceList.map(v => {
          v.ownerId = this.companyId
          v.ownerType = "COMPANY"
          v.resourceName = v.attachmentName
          v.resourceUrl = v.attachmentPath
          v.resourceType = v.fileType
          delete v.attachmentName
          delete v.attachmentPath
          delete v.attachmentUrl
          delete v.group
          delete v.fileType
        })
        console.log('this.financeForm',this.financeForm)
        updateResourceEntry(this.financeForm).then(res => {
          if (res.code === 200) {
            this.$router.go(-1)
            this.$toast('信息提交成功')
          }
        })
      }
    },
    getResourceList(){
      queryResourceList(this.paramster).then(res => {
        if (res.code === 200) {
          console.log('res.result', res.result)
          let result = res.result
          result.map(v => {
            v.attachmentName = v.resourceName
            v.attachmentPath = v.resourceUrl
          })
          // this.originIds = result.map(v => {return v.id})
          result.forEach(v => {
            switch(v.category){
              case 'profitStatements':
                this.profitStatements.push(v)
                break
              case 'balanceSheets':
                this.balanceSheets.push(v)
                break
              case 'cashFlowSheets':
                this.cashFlowSheets.push(v)
                break
              case 'financialInfoOthers':
                this.financialInfoOthers.push(v)
                break
            }
          })
        }
      })
    }
  },
  created(){
    this.getResourceList()
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
</style>
