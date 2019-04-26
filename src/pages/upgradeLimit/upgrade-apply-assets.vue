<template>
  <div class="main-with-header main-with-bottom common-bg">
    <common-header>
      <div slot="save" class="save" @click="submit">保存</div>
    </common-header>
    <div></div>
    <img-upload title="银行流水" :imageList.sync="bankStatements" :deleteIds.sync="assetForm.deleteIds"></img-upload>
    <img-upload title="征信报告" :imageList.sync="creditReports" :deleteIds.sync="assetForm.deleteIds"></img-upload>
    <img-upload title="其他" :imageList.sync="assetInfoOthers" :deleteIds.sync="assetForm.deleteIds"></img-upload>
  </div>
</template>
<script>
import {updateResourceEntry,queryResourceList} from "@/api/company"
export default{
  data () {
    return {
      companyId: this.$route.query.companyId,
      customerId: this.$route.query.customerId,
      assetForm: {
        assetsEntryStatus: 1,
        resourceList: [],
        deleteIds: [],
        customerId: this.$route.query.customerId
      },
      bankStatements: [],  // 银行流水
      creditReports: [], //征性报告
      assetInfoOthers: [],
      paramster: {
        ownerId: this.$route.query.companyId,
        ownerType: "COMPANY"
      },

    }
  },
  components: {
  },
  methods: {
    submit(){
      this.bankStatements.filter(v => {
        v.category = 'bankStatements'
      })
      this.creditReports.map(v => {
        v.category = 'creditReports'
      })
      this.assetInfoOthers.map(v => {
        v.category = 'assetInfoOthers'
      })
      if (this.bankStatements.length === 0) {
        this.$toast('请上传银行信息')
        return
      }else if(this.creditReports.length === 0){
        this.$toast('请上传征信报告')
        return
      }else{
        this.assetForm.resourceList = [...this.bankStatements, ...this.creditReports, ...this.assetInfoOthers]
        this.assetForm.resourceList.map(v => {
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
        console.log('this.assetForm',this.assetForm)
        updateResourceEntry(this.assetForm).then(res => {
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
          result.forEach(v => {
            switch(v.category){
              case 'bankStatements':
                this.bankStatements.push(v)
                break
              case 'creditReports':
                this.creditReports.push(v)
                break
              case 'assetInfoOthers':
                this.assetInfoOthers.push(v)
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
