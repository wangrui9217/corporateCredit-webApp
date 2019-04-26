<template>
  <div class="main-with-header main-with-bottom common-bg">
    <common-header>
      <div slot="save" class="save" @click="submit">保存</div>
    </common-header>
    <div></div>
    <img-upload title="车辆信息" :imageList.sync="carInfos" :deleteIds.sync="guaranteeForm.deleteIds"></img-upload>
    <img-upload title="房产信息" :imageList.sync="houseInfos" :deleteIds.sync="guaranteeForm.deleteIds"></img-upload>
    <img-upload title="其他" :imageList.sync="guaranteeInfoOthers" :deleteIds.sync="guaranteeForm.deleteIds"></img-upload>
  </div>
</template>
<script>
import {updateResourceEntry,queryResourceList} from "@/api/company"
export default{
  data () {
    return {
      companyId: this.$route.query.companyId,
      customerId: this.$route.query.customerId,
      guaranteeForm: {
        guaranteeEntryStatus: 1,
        resourceList: [],
        deleteIds: [],
        customerId: this.$route.query.customerId
      },
      carInfos: [],  // 车辆信息
      houseInfos: [], //房产信息
      guaranteeInfoOthers: [],
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
      this.carInfos.filter(v => {
        v.category = 'carInfos'
      })
      this.houseInfos.map(v => {
        v.category = 'houseInfos'
      })
      this.guaranteeInfoOthers.map(v => {
        v.category = 'guaranteeInfoOthers'
      })
      if (this.carInfos.length === 0) {
        this.$toast('请上传车辆信息')
        return
      }else if(this.houseInfos.length === 0){
        this.$toast('请上传房产信息')
        return
      }else{
        this.guaranteeForm.resourceList = [...this.carInfos, ...this.houseInfos, ...this.guaranteeInfoOthers]
        this.guaranteeForm.resourceList.map(v => {
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
        console.log('this.guaranteeForm',this.guaranteeForm)
        updateResourceEntry(this.guaranteeForm).then(res => {
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
              case 'carInfos':
                this.carInfos.push(v)
                break
              case 'houseInfos':
                this.houseInfos.push(v)
                break
              case 'guaranteeInfoOthers':
                this.guaranteeInfoOthers.push(v)
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
