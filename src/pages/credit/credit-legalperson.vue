<template>
  <div class="main-with-header common-bg main-with-bottom">
    <common-header>
      <!--<div slot="save" class="save">保存</div>-->
    </common-header>
    <common-step :activeStep="1" :option="['企业信息','法人信息','人脸识别','股东授权','征信授权','授信成功']" v-if="hideSubmit"></common-step>
    <div class="upload-img common-padding">
      <ul class="business-type no-margin">
        <li class="list ">
          <label>法人身份证照片</label>
        </li>
      </ul>
      <div class="upload-idcard">
        <idcard-upload :imageList.sync="imgModal" :showAdd="false" :readonly="!hideSubmit">
          <div slot="upload-img" class="upload-img-1">
            <img src="./../../../static/img/credit/idcard.png"/>
          </div>
        </idcard-upload>
        <idcard-upload :imageList.sync="imgModal1" :showAdd="false" :readonly="!hideSubmit">
          <div slot="upload-img" class="upload-img-1">
            <img src="./../../../static/img/credit/idcard2.png"/>
          </div>
        </idcard-upload>
      </div>
    </div>

    <div class="mint-cell-box">
      <mt-field label="姓名" placeholder="请输入姓名" v-model="companyLegal.legalName" readonly></mt-field>
      <mt-field label="性别" placeholder="请输入性别" v-model="companyLegal.legalSex" readonly></mt-field>
      <!--<common-select label="性别" placeholder="请选择性别" :selectedValue.sync="companyLegal.legalSex" :option="options" keyName="key" value="value" readonly></common-select>-->
      <mt-field label="证件号码" placeholder="请输入证件号码" v-model="companyLegal.legalCard" readonly></mt-field>
      <!--选填-->
      <location-select label="居住地址" placeholder="请选择居住地址" :selectedValue.sync="companyLegal.legalAddress" :readonly="!hideSubmit"></location-select>
      <mt-field label="详细地址" placeholder="请输入详细地址" v-model="companyLegal.legalAddressDetail" :readonly="!hideSubmit"></mt-field>
      <common-select label="学历" placeholder="请选择学历" :readonly="!hideSubmit" :selectedValue.sync="companyLegal.highestEducation" :option="$dict.getOptionByCode('007')" keyName="name" value="value"></common-select>
      <!--end-->
      <mt-field label="民族" placeholder="请输入民族" v-model="companyLegal.nation" readonly></mt-field>
      <mt-field label="出生日期" placeholder="请输入出生日期" v-model="companyLegal.birthTime" readonly></mt-field>
      <!--<date-pick label="出生日期" placeholder="请选择出生日期" :selectedTime.sync="companyLegal.birthTime" readonly></date-pick>-->
      <mt-field label="户籍地址" placeholder="请输入户籍地址" v-model="companyLegal.cardAddress" readonly></mt-field>
    </div>
    <mt-button class="common-parimary-btn common-btn-margin" @click="goNext" v-if="hideSubmit">下一步</mt-button>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {queryCustomer, queryResourceList} from "@/api/company"
import {getOcrIdCard} from "@/api/credit"
export default{
  data () {
    return {
      location: ['810', '900', '903'],
      imgModal: {},
      imgModal1: {},
      companyLegal: {
        // baseResourceModel: [],
        cardAddress: '',
        highestEducation: '',
        legalAddress: [],
        legalAddressDetail: '',
        legalCard: '',
        legalName: '',
        legalSex: '',
        birthTime: '',
        nation: ''
      },
      options: [{key: '男', value: '1'}, {key: '女', value: '0'}]
    }
  },
  components: {},
  watch: {
    imgModal (oldval, newval) {
      if (Object.keys(this.imgModal).length !== 0 && this.imgModal.fileStr) {
        const data = {
          fileStr: this.imgModal.fileStr,
          filePath: ''
          // filePath: this.publicHost + this.imgModal.attachmentPath
        }
        this.$indicator.open()
        getOcrIdCard(data, 'front').then(res => {
          this.$indicator.close()
          if (res.code === 200) {
            let result = res.result
            this.companyLegal.cardAddress = result.address
            this.companyLegal.birthTime = this.birthFormat(result.birth)
            this.companyLegal.legalCard = result.cardNumber
            this.companyLegal.legalName = result.name
            this.companyLegal.nation = result.nation
            this.companyLegal.legalSex = result.sex
          }
        }).catch(() => {
          this.$indicator.close()
        })
      }
    },
    imgModal1 (oldval, newval) {
      if (Object.keys(this.imgModal1).length !== 0 && this.imgModal1.fileStr) {
        const data = {
          fileStr: this.imgModal1.fileStr,
          filePath: ''
          // filePath: this.publicHost + this.imgModal.attachmentPath
        }
        getOcrIdCard(data, 'back').then(res => {
        })
      }
    }
  },
  // mounted () {
  //   this.initData()
  // },
  methods: {
    initData () {
      Object.keys(this.companyLegal).forEach(key => {
        this.companyLegal[key] = this.creditInfo[key] || this.companyLegal[key]
      })
      const baseResourceModel = this.creditInfo.baseResourceModel || []
      this.imgModal = baseResourceModel.find(val => val.category === 'FrontOfIdentityCard') || {}
      this.imgModal1 = baseResourceModel.find(val => val.category === 'ReverseOfIdentityCard') || {}
      if (Object.keys(this.imgModal).length !== 0) {
        this.imgModal = {
          category: 'FrontOfIdentityCard',
          fileType: this.imgModal.resourceType,
          attachmentPath: this.imgModal.resourceUrl,
          attachmentName: this.imgModal.resourceName
        }
      }
      if (Object.keys(this.imgModal1).length !== 0) {
        this.imgModal1 = {
          category: 'ReverseOfIdentityCard',
          fileType: this.imgModal1.resourceType,
          attachmentPath: this.imgModal1.resourceUrl,
          attachmentName: this.imgModal1.resourceName
        }
      }
    },
    validateInput () {
      let flag = false
      Object.keys(this.companyLegal).forEach((key) => {
        if (this.companyLegal[key] === '') {
          flag = true
          console.log(key, 'key')
        }
      })
      return flag
    },
    goNext () {
      if (Object.keys(this.imgModal).length === 0) {
        this.$toast('请上传身份正面照片')
        return
      }
      if (Object.keys(this.imgModal1).length === 0) {
        this.$toast('请上传身份反面照片')
        return
      }
      // if (this.$filter.isObjectEmpty(this.companyLegal)) {
      //   this.$toast('请完善信息')
      //   return
      // }
      // if (!this.$filter.isIdCard(this.companyLegal.legalCard)) {
      //   return
      // }
      this.imgModal = {
        category: 'FrontOfIdentityCard',
        resourceType: this.imgModal.fileType,
        resourceUrl: this.imgModal.attachmentPath,
        resourceName: this.imgModal.attachmentName
      }
      this.imgModal1 = {
        category: 'ReverseOfIdentityCard',
        resourceType: this.imgModal1.fileType,
        resourceUrl: this.imgModal1.attachmentPath,
        resourceName: this.imgModal1.attachmentName
      }
      let baseResourceModel = this.creditInfo.baseResourceModel || []
      this.addItem(baseResourceModel, this.imgModal)
      this.addItem(baseResourceModel, this.imgModal1)
      this.companyLegal = {...this.companyLegal, baseResourceModel}
      this.setCreditInfo(this.companyLegal)
      this.$router.push('./credit-faceRecognition')
    },
    addItem (arry, obj) {
      if (arry.some(val => val.category === obj.category)) {
        arry.map(val => {
          if (val.category === obj.category) {
            arry.splice(arry.indexOf(val), 1, obj)
          }
        })
      } else {
        arry.push(obj)
      }
    },
    ...mapMutations({
      setCreditInfo: 'SET_CREDIT_INFO'
    }),
    getCustomer () {
      this.$indicator.open('加载中...')
      queryCustomer().then(res => {
        this.$indicator.close()
        if (res.code === 200) {
          this.companyLegal = res.result.companyModel
          this.companyLegal.legalAddress = this.companyLegal.legalAddress.split(',')
        }
      }).catch(() => {
        this.$indicator.close()
      })
      queryResourceList({category: '', ownerId: this.$route.query.companyId}).then(res => {
        if (res.code === 200 && res.result instanceof Array) {
          this.imgModal = res.result.find(val => val.category === 'FrontOfIdentityCard') || {}
          this.imgModal1 = res.result.find(val => val.category === 'ReverseOfIdentityCard') || {}
          if (Object.keys(this.imgModal).length !== 0) {
            this.imgModal = {
              category: 'businessLicense',
              fileType: this.imgModal.resourceType,
              attachmentPath: this.imgModal.resourceUrl,
              attachmentName: this.imgModal.resourceName
            }
          }
          if (Object.keys(this.imgModal1).length !== 0) {
            this.imgModal1 = {
              category: 'businessLicense',
              fileType: this.imgModal1.resourceType,
              attachmentPath: this.imgModal1.resourceUrl,
              attachmentName: this.imgModal1.resourceName
            }
          }
        }
      }).catch(() => {
      })
    },
    birthFormat (date) {
      const str = date.toString()
      return `${str.substring(0, 4)}-${str.substring(4, 6)}-${str.substring(6, 8)}`
    }
  },
  mounted () {
    if (this.hideSubmit) {
      this.initData()
    } else {
      this.getCustomer()
    }
    // this.getCustomer()
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
<style lang="less">
  .upload-idcard{
    .receive-img{
      width: 327px/2;
      height: 160px/2;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      .result-img{
        max-width: 100%;
        max-height: 100%;
      }
    }
  }
</style>
<style lang='less' scoped>
  @import "./../../public/comment";
  .save{
    position: absolute;
    right: 0;
    top: 0;
    font-size: 32px/2;
    color: @lightBlue;
    text-align: right;
    line-height: 88px/2;
    padding-right: 25px/2;
  }
  .upload-img{
    height: 296px/2;
    margin: 20px 0;
    background-color: #fff;
    .no-margin{
      margin: 0;
    }
    .upload-idcard{
      display: flex;
      justify-content: space-between;
      img{
        width: 327px/2;
        height: 160px/2;
      }
      .upload-img-1{
        img{
          width: 327px/2;
          height: 160px/2;
        }
      }
    }
    .upload-text{
      background: #F2F2F2;
      width: 160px/2;
      height: 160px/2;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .upload-plus{
      color: #A7A7A7;
      /*font-size: 50px;*/
    }
  }
  .list{
    width: 100%;
    height: 104px/2;
    display: flex;
    align-items: center;
    font-size: 32px/2;
    color: #333333;
    background-color: #fff;
    margin-bottom: 5px/2;
    label{
      width: 260px/2;
    }
    .text-1{
      font-size: 28px/2;
      color: #999999;
    }
    .text-2{
      color: @lightBlue;
    }
  }
  .business-type{
    margin: 20px auto;
  }
</style>
