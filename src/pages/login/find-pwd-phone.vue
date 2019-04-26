<template>
  <div class="login">
    <common-header></common-header>
    <div class="contain">
      <div class="input">
        <span class="color-333 NumberPhone">
          + 86<img src="../../../static/img/close.png" alt="" class="imgNose">
        </span>
        <div class="tel">
          <input class="color-333 font32" type="tel"  v-model="form.userPhone" placeholder="请输入手机号码">
        </div>
      </div>
      <mt-button class="common-parimary-btn common-btn-margin" @click="getSafeCode" >获取验证码</mt-button>
      <router-link to="/login" class="login-by-pwd">密码登录</router-link>
    </div>

    <div class="dialog" v-if="showDialog">
      <div class="dialog-bg"></div>
      <div class="dialog-box">
        <div class="dialog-inner">
          <div class="title">输入图中验证码</div>
          <img :src="imgUrl" alt="" class="yzm-1">
          <p class="yzm-2" id="refreshCode" @click="getCode">看不清？点击刷新</p>
          <input placeholder="请输入验证码" class="yzm-3" v-model="form.imgAuthCode"/>
        </div>
        <div class="dialog-bottom">
          <div @click="showDialog=false">取消</div>
          <div class="dialog-bottom-confirm" @click="checkCode">确认</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {checkImagesCode} from '@/api/login'
  import {mapMutations, mapState} from 'vuex'
  export default {
    data () {
      return {
        form: {
          userPhone: '',
          imgAuthCode: '',
          imgAuthCodeToken: ''
        },
        imgUrl: '',
        showDialog: false
      }
    },
    methods: {
      ...mapMutations({
        setFindPwdInfo: 'SET_FIND_PWD_INFO'
      }),
      initState () {
        this.form = {...this.form, ...this.findPwdInfo}
      },
      getSafeCode () {
        if (!this.$filter.isPhone(this.form.userPhone)) {
          return
        }
        this.showDialog = true
        this.getCode()
      },
      // 验证图片验证码
      checkCode () {
        checkImagesCode(this.form).then(res => {
          console.log(res)
          if (res.code === 200) {
            // 校验成功 保存手机号和推荐人
            const obj = {
              userPhone: this.form.userPhone
            }
            this.setFindPwdInfo(obj)
            this.$router.push('/find-pwd-check-phone')
          }
        })
      },
      getCode () {
        this.form.imgAuthCode = ''
        const tempToken = (new Date()).getTime() + Math.random() + 'zyj'
        this.form.imgAuthCodeToken = tempToken
        this.imgUrl = process.env.BASE_API + `app/api/app/userLogin/imgAuthCode.jpg?imgAuthCodeToken=${tempToken}`
      }
    },
    computed: {
      ...mapState({
        findPwdInfo: state => state.app.findPwdInfo
      })
    },
    mounted () {
      this.initState()
    }
  }
</script>
<style scoped lang="less">
  .dialog{
    .dialog-bg{
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      opacity: 0.5;
      background: #000;
      z-index: 2000;
    }
    .dialog-box{
      background-color: #fff;
      opacity: 1;
      z-index: 2001;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
      width: 85%;
      border-radius: 0.08rem;
      font-size: 0.42666667rem;
      overflow: hidden;
      transition: .2s;
      text-align: center;
      .title{
        padding: 0.4rem 0 0;
        text-align: center;
        margin-bottom: 0;
        font-size: 0.42666667rem;
        font-weight: 700;
        color: #333;
      }
      .dialog-bottom{
        height: 80px/2;
        display: flex;
        border-top: 4px/2 solid rgb(239,239,239);
        &>div{
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .dialog-bottom-confirm{
          color: #26a2ff;
        }
      }
      .yzm-1{
        width: 60%;
        height: 96px;
      }
      .yzm-2{
        font-size: 28px/2;
        color: #2B64FF;
        letter-spacing: 0;
        text-align: center;
        line-height: 52px/2;
      }
      .yzm-3{
        width: 456px/2;
        height: 72px/2;
        margin: 30px/2 auto;
        text-align: center;
      }
    }
  }



  .login-by-pwd{
    font-size: 28px/2;
    color: #666666;
    text-align: center;
    line-height: 40px/2;
  }
  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px/2;
    background-color: #ffffff;
  }
  .header {
    padding: 30px/2 30px/2 0;
    .back {
      width: 20px/2;
      height: 35px/2;
      display: block;
      background-size: contain;
    }
  }
  .contain {
    padding: 100px/2 40px/2 0;
    .input {
      position: relative;
      text-indent: 52px/2;
      input {
        line-height: 70px/2;
      }
      .tel {
        height: 104px/2;
        line-height: 104px/2;
        border-bottom: 1px/2 solid #e5e5e5;
        margin-top: 68px/2;
        padding-left: 64px/2;
        background-size: 22px/2 32px/2;
      }
      .code {
        height: 104px/2;
        position: relative;
        border-bottom: 1px/2 solid #e5e5e5;
        line-height: 104px/2;
        background-size: 26px/2 32px/2;
        font-family: PingFang-SC-Regular;
        .code-content {
          position: absolute;
          display: inline-block;
          right: 0;
          bottom: 16px/2;
          width: 220px/2;
          height: 70px/2;
          background-color: #b8c2cc;
        }
      }
    }
    .getSafeCode {
      width: 686px/2;
      height: 88px/2;
      text-align: center;
      margin: 80px/2 0 24px/2;
      opacity: 0.6;
      background-image: linear-gradient(-270deg, #4F95FF 0%, #2B64FF 100%);
      border-radius: 44px/2;
      font-size: 34px/2;
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .disable {
      background-image: url(../../../static/img/login_btn@2x.png);
    }
    .box {
      width: 600px/2;
      border-radius: 20px/2;
      padding: 20px/2 40px/2 40px/2;
      h4 {
        text-align: center;
        font-family: "PingFang-SC-Bold";
      }
      p {
        margin-top: 30px/2;
        line-height: 36px/2;
      }
      .protocol {
        margin: 50px/2 0 30px/2;
        span {
          display: block;
        }
      }
      .btn {
        margin: 0 20px/2;
        button {
          width: 200px/2;
          height: 80px/2;
          background-color: #fff;
          border: 1px/2 solid #ccc;
          border-radius: 5px/2;
        }
      }
    }
    .registerProtocol_box,
    .pricacyProtocol_box {
      padding: 20px/2;
      width: 600px/2;
      height: 1100px/2;
      border-radius: 20px/2;
      .protocol_inner {
        overflow: auto;
        height: 1060px/2;
      }
    }
    /*短信验证样式*/
    .verification{
      width: 100%;
      background: #fff;
      padding: 16px/2;
    }
    .SMS{
      text-align: right;
    }
    .NumberPhone{
      position: absolute;
      top: 26px/2;
      left: -55px/2;
      font-size: 32px/2;
    }
    .imgNose{
      display: inline-block;
      width: 26px/2;
      height: 16px/2;
    }
  }
</style>
