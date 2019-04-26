<template>
  <div class="main-with-header main-with-bottom common-bg">
    <common-header></common-header>
    <common-step :activeStep="3" :option="['企业信息','法人信息','人脸识别','股东授权','征信授权','授信成功']" v-if="hideSubmit"></common-step>
    <div>
    <img-upload title="董事会决议（加盖公章）" :imageList.sync="imgModalList"></img-upload>
      <mt-button class="common-parimary-btn common-btn-margin" @click="nextStep" v-if="hideSubmit">下一步</mt-button>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {queryResourceList} from "@/api/company"
export default{
  data () {
    return {
      imgModalList: [],
      imgList: []
    }
  },
  components: {
  },
  methods: {
    ...mapMutations({
      setCreditInfo: 'SET_CREDIT_INFO'
    }),
    nextStep () {
      this.imgList = this.imgModalList.map(val => {
        return {
          category: 'boardDirectors',
          resourceType: val.fileType,
          resourceUrl: val.attachmentPath,
          resourceName: val.attachmentName
        }
      })
      let creditInfo = this.creditInfo
      let baseResourceModel = this.creditInfo.baseResourceModel || []
      baseResourceModel = baseResourceModel.filter(val => val.category !== 'boardDirectors')
      baseResourceModel = [...baseResourceModel, ...this.imgList]
      creditInfo.baseResourceModel = baseResourceModel
      this.setCreditInfo(creditInfo)
      this.$router.push('./credit-authorization')
    },
    initData () {
      const baseResourceModel = this.creditInfo.baseResourceModel || []
      let imgModalTemp = baseResourceModel.filter(val => val.category === 'boardDirectors')
      this.imgModalList = imgModalTemp.map(val => {
        return {
          category: 'boardDirectors',
          fileType: val.resourceType,
          attachmentPath: val.resourceUrl,
          attachmentName: val.resourceName
        }
      })
    },
    getCustomer () {
      queryResourceList({category: '', ownerId: this.$route.query.companyId}).then(res => {
        if (res.code === 200 && res.result instanceof Array) {
          let imgModalTemp = res.result.filter(val => val.category === 'boardDirectors')
          this.imgModalList = imgModalTemp.map(val => {
            return {
              category: 'boardDirectors',
              fileType: val.resourceType,
              attachmentPath: val.resourceUrl,
              attachmentName: val.resourceName
            }
          })
        }
      }).catch(() => {
      })
    }
  },
  created () {
    if (this.hideSubmit) {
      this.initData()
    } else {
      this.getCustomer()
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
</style>
