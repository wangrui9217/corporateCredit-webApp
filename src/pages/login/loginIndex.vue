<template>
  <div class="login">
    <div class="contain">
      <div class="prompt">
        <div class="title">
          <img src="./../../../static/img/logo_sing.png"/>
        </div>
        <p class="color-333 font28 notice">小微企业信贷</p>
      </div>
      <div class="museui-setting-login">
        <mu-text-field v-model="form.userPhone" label="输入手机号" label-float ></mu-text-field>
        <mu-text-field v-model="form.password" label="输入密码" label-float type="password"></mu-text-field>
      </div>
      <!--<div class="input">-->
        <!--<div class="tel">-->
          <!--<input class="color-333 font32" type="tel" v-model="form.userPhone">-->
        <!--</div>-->
        <!--<div class="code">-->
          <!--<input class="color-333 font32" type="password" placeholder="请输入密码" v-model="form.password">-->
        <!--</div>-->
      <!--</div>-->
      <mt-button class="common-parimary-btn common-btn-margin" @click="login">登录</mt-button>
      <div class="btn-group">
        <div>
          <router-link to="/find-pwd-phone" class="text-1">忘记密码</router-link>
        </div>
        <div>
          <router-link to="/register">免费注册</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {appLogin} from '@/api/login'
  import {mapState, mapMutations} from 'vuex'
  export default {
    data () {
      return {
        form: {
          password: '',
          userPhone: ''
        }
      }
    },
    components: {},
    mounted () {
      this.init()
      // console.log(111, this.$filter.encrypt('zhangyajun'), 11)
    },
    methods: {
      init () {
        this.form = {...this.form, ...this.$store.state.app.loginInfo}
      },
      login () {
        if (!this.$filter.isPhone(this.form.userPhone)) {
          return
        }
        if (!this.form.password) {
          this.$toast('请输入密码')
          return
        }
        // this.$router.push({ path: '/index' })
        this.$indicator.open('登录中...')
        appLogin(this.form)
          .then(res => {
            this.setToken(res.result.token)
            this.setUser(res.result.user)
            this.setLoginInfo(this.form)
            this.$store.dispatch('getDictionaryTabel').then(() => {
              this.$indicator.close()
              this.$router.push({ name: 'index' })
              this.$store.dispatch('mainPageInit') // 弹出合同、首页初始化
            }).catch(() => { this.$indicator.close() })
          }).catch(() => { this.$indicator.close() })
      },
      ...mapMutations({
        setToken: 'SET_TOKEN',
        initRegistInfo: 'INIT_REGIST_INFO',
        setUser: 'SET_USER',
        setLoginInfo: 'SET_LOGIN_INFO'
      })
    }
  }
</script>

<style scoped lang="less">
  .btn-group {
    font-size: 28px/2;
    color: #666666;
    line-height: 40px/2;
    display: flex;
    justify-content: space-between;
    height: 40px/2;
    align-items: center;
    .text-1 {
      margin-right: 33px/2;
    }
  }

  .login {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px/2;
    background-color: #ffffff;
  }

  .header {
    /*padding: 30px/2 30px/2 0;*/
    .back {
      width: 20px/2;
      height: 35px/2;
      display: block;
      background: url(../../../static/img/back.png) left no-repeat;
      background-size: contain;
    }
  }

  .contain {
    padding: 184px/2 40px/2 0;
    .prompt {
      .title {
        text-align: center;
        & > img {
          width: 128px/2;
        }
      }
      .notice {
        font-size: 36px/2;
        text-align: center;
        margin-top: 48px/2;
      }
    }

    .input {
      margin-bottom: 64px/2;
      text-indent: 52px/2;
      input {
        line-height: 70px/2;
      }
      .tel {
        height: 104px/2;
        line-height: 104px/2;
        border-bottom: 1px/2 solid #e5e5e5;
        margin-top: 68px/2;
        /*background: url(../../assets/images/icons/icon_phone@2x.png) left 20rem /
          @ratio no-repeat;*/
        background-size: 22px/2 32px/2;
      }
      .code {
        height: 104px/2;
        position: relative;
        border-bottom: 1px/2 solid #e5e5e5;
        /* margin-top: 68px/2;*/
        line-height: 104px/2;
        /*background: url(../../assets/images/icons/icon_yanzhengma@2x.png) left
          20px/2 no-repeat;*/
        background-size: 26px/2 32px/2;
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
      margin: 64px/2 0 32px/2;
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
    /*短信验证样式*/
    .verification {
      width: 100%;
      background: #fff;
      padding: 16px/2;
    }
    .SMS {
      text-align: right;
    }
    .nosre {
      padding-left: 33px/2;
    }
  }
</style>
