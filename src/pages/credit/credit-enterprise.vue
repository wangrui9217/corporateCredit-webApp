<template>
  <div class="main-with-header common-bg main-with-bottom">
    <common-header>
      <!--<div slot="save" class="save">保存</div>-->
    </common-header>
    <common-step :activeStep="0" v-if="hideSubmit" :option="['企业信息','法人信息','人脸识别','股东授权','征信授权','授信成功']"></common-step>
    <!--<img-upload title="上传营业执照" :imageList.sync="imgModal"></img-upload>-->
    <div class="upload-img common-padding">
      <ul class="business-type no-margin">
        <li class="list ">
          <label>上传营业执照</label>
        </li>
      </ul>
      <div class="upload-business">
        <idcard-upload :imageList.sync="imgModal" :showAdd="false" :readonly="!hideSubmit">
          <div slot="upload-img" class="upload-img-1">
            <img src="./../../../static/img/common/add.png" class="add-plus"/>
            <!--<img src="./../../../static/img/credit/idcard.png"/>-->
          </div>
        </idcard-upload>
      </div>
    </div>
    <div class="mint-cell-box">
      <mt-field label="企业名称" placeholder="请输入企业名称" v-model="companyModel.companyName" readonly></mt-field>
      <mt-field label="统一社会信用代码" placeholder="请输入统一社会信用代码" v-model="companyModel.companyCredit" readonly></mt-field>
      <!--选填-->
      <mt-field label="企业地址" placeholder="请输入企业现经营地址" v-model="companyModel.companyAddress" :readonly="!hideSubmit"></mt-field>

      <mt-field label="电话(选填)" placeholder="请输入电话" type="tel" v-model="companyModel.companyTelephone" :readonly="!hideSubmit"></mt-field>
      <mt-field label="邮箱(选填)" placeholder="请输入邮箱" type="email" v-model="companyModel.companyEmail" :readonly="!hideSubmit"></mt-field>

      <mt-field label="经营范围" placeholder="请输入公司经营范围"  v-model="companyModel.businessScope" :readonly="!hideSubmit" type="textarea" rows="3"></mt-field>
      <!--end-->
      <!--<common-select label="企业类型" placeholder="请选择企业类型" :selectedValue.sync="companyModel.companyType" :option="companyTypeOption" keyName="name" value="value" :readonly="true"></common-select>-->
      <mt-field label="企业类型" placeholder="请输入企业类型" v-model="companyModel.companyType" readonly></mt-field>
      <mt-field label="注册地址" placeholder="请输入注册地址" v-model="companyModel.registeredAddress" readonly></mt-field>
      <mt-field label="法定代表人" placeholder="请输入法定代表人" v-model="companyModel.legalReplaceName" readonly></mt-field>
      <mt-field label="注册资本" placeholder="请输入注册资本"  v-model="companyModel.registeredCapital" readonly></mt-field>
      <!--<date-pick label="成立日期" placeholder="请选择成立日期" :selectedTime.sync="companyModel.establishmentTime" :readonly="true"></date-pick>-->
      <!--<date-pick label="营业期限" placeholder="请选择营业期限" :selectedTime.sync="companyModel.businessPeriod" :readonly="true"></date-pick>-->
      <mt-field label="成立日期" placeholder="请输入成立日期"  v-model="companyModel.establishmentTime" readonly></mt-field>
      <mt-field label="营业期限" placeholder="请输入营业期限"  v-model="companyModel.businessPeriod" readonly></mt-field>
    </div>
    <mt-button class="common-parimary-btn common-btn-margin" @click="goNext" v-if="hideSubmit">下一步</mt-button>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {queryCustomer, queryResourceList} from "@/api/company"
import {getOcrBusLicense} from "@/api/credit"
export default{
  data () {
    return {
      options: [{key: '男性', value: 111}, {key: '女性', value: 222}],
      companyTypeOption: [{name: '有限责任公司', value: '有限责任公司'}, {name: '股份有限公司', value: '股份有限公司'}],
      imgModal: {},
      companyModel: {
        companyName: '',
        companyCredit: '',
        companyAddress: '',
        companyTelephone: '',
        companyEmail: '',
        businessScope: '',
        companyType: '',
        registeredAddress: '',
        legalReplaceName: '',
        registeredCapital: '',
        establishmentTime: '',
        businessPeriod: ''
      },
      test: {}
    }
  },
  components: {},
  watch: {
    imgModal (oldval, newval) {
      if (Object.keys(this.imgModal).length !== 0 && this.imgModal.fileStr) {
        let fileStr = this.imgModal.fileStr
        const data = {
          fileStr: fileStr
          // filePath: this.publicHost + this.imgModal.attachmentPath
        }
        this.$indicator.open()
        getOcrBusLicense(data).then(res => {
          this.$indicator.close()
          if (res.code === 200) {
            let result = res.result
            this.companyModel.companyName = result.companyName
            // this.companyModel.companyCredit = result.socialCode
            this.companyModel.companyCredit = result.identityNum
            this.companyModel.companyAddress = result.address
            this.companyModel.companyType = result.type
            this.companyModel.establishmentTime = result.establishDate
            this.companyModel.legalReplaceName = result.legalName
            this.companyModel.registeredCapital = result.registeredMoney
            this.companyModel.businessPeriod = result.expiryDate
            this.companyModel.businessScope = result.businessScope
            this.companyModel.registeredAddress = result.address
          }
        }).catch(() => {
          this.$indicator.close()
        })
      }
    }
  },
  methods: {
    initData () {
      Object.keys(this.companyModel).forEach(key => {
        this.companyModel[key] = this.creditInfo[key] || this.companyModel[key]
      })
      const baseResourceModel = this.creditInfo.baseResourceModel || []
      this.imgModal = baseResourceModel.find(val => val.category === 'businessLicense') || {}
      if (Object.keys(this.imgModal).length !== 0) {
        this.imgModal = {
          category: 'businessLicense',
          fileType: this.imgModal.resourceType,
          attachmentPath: this.imgModal.resourceUrl,
          attachmentName: this.imgModal.resourceName
        }
      }
    },
    goNext () {
      if (Object.keys(this.imgModal).length === 0) {
        this.$toast('请上传营业执照')
        return
      }
      // if (this.$filter.isObjectEmpty(this.companyModel)) {
      //   this.$toast('请完善信息')
      //   return
      // }
      // if (!this.$filter.isPhone(this.companyModel.companyTelephone)) {
      //   return
      // }
      this.imgModal = {
        category: 'businessLicense',
        resourceType: this.imgModal.fileType,
        resourceUrl: this.imgModal.attachmentPath,
        resourceName: this.imgModal.attachmentName
      }
      let baseResourceModel = this.creditInfo.baseResourceModel || []
      this.addItem(baseResourceModel, this.imgModal)
      this.companyModel = {...this.companyModel, baseResourceModel}
      this.setCreditInfo(this.companyModel)
      this.$router.push('/credit-legalperson')
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
          this.companyModel = res.result.companyModel
          // this.companyModel.establishmentTime = this.$filter.dateFormat(this.companyModel.establishmentTime, 'yyyy-MM-dd')
          // this.companyModel.approvalTime = this.$filter.dateFormat(this.companyModel.approvalTime, 'yyyy-MM-dd')
          // this.queries.companyId
        }
      }).catch(() => {
        this.$indicator.close()
      })
      queryResourceList({category: '', ownerId: this.$route.query.companyId}).then(res => {
        if (res.code === 200 && res.result instanceof Array) {
          this.imgModal = res.result.find(val => val.category === 'businessLicense') || {}
          if (Object.keys(this.imgModal).length !== 0) {
            this.imgModal = {
              category: 'businessLicense',
              fileType: this.imgModal.resourceType,
              attachmentPath: this.imgModal.resourceUrl,
              attachmentName: this.imgModal.resourceName
            }
          }
          console.log(this.imgModal, 8888)
        }
      }).catch(() => {
      })
    }
  },
  mounted () {
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
    }),
    publicHost () {
      return this.$store.state.dictionary.publicHost + '/'
    }
  }
}
</script>
<style lang="less">
  .upload-business{
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
  .upload-img{
    height: 296px/2;
    margin: 20px 0;
    background-color: #fff;
    .no-margin{
      margin: 0;
    }
    .upload-business{
      display: flex;
      justify-content: space-between;
      img{
      }
      .upload-img-1{
        width: 327px/2;
        height: 160px/2;
        background-color: #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: center;
        .add-plus{
          height: 70%;
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
</style>
