<template>
  <div class="main-with-header">
    <common-header :showBack="false">
      <div slot="save" class="save">
        <img src="./../../../static/img/common/close.png" class="close" @click="returnIndex"/>
      </div>
    </common-header>
    <div class="common-padding">
      <div class="common-input-box mt-64">
        <input class="common-input" type="password"   placeholder="请输入密码" v-model="form.password">
      </div>
      <div class="common-input-box">
        <input class="common-input" type="password"   placeholder="请再次输入密码" v-model="password">
      </div>
      <mt-button class="common-parimary-btn common-btn-margin" @click="login">立即登录</mt-button>
    </div>
  </div>
</template>
<script>
import {retrievePassword} from '@/api/login'
import {mapState, mapMutations} from 'vuex'
export default{
  data () {
    return {
      form: {
        password: ''
      },
      password: ''
    }
  },
  components: {},
  methods: {
    returnIndex () {
      this.$router.replace('/find-pwd-phone')
    },
    login () {
      if (this.password !== this.form.password) {
        this.$toast('两次输入的密码不一致')
        return
      }
      if (!this.$filter.isPassword(this.password)) {
        return
      }
      const registerParams = {
        password: this.password,
        userPhone: this.findPwdInfo.userPhone
      }
      retrievePassword(registerParams).then(res => {
        if (res.code === 200) {
          this.$toast('登录成功')
          this.setToken(res.result.token)
          this.setUser(res.result.user)
          this.$store.dispatch('getDictionaryTabel').then(() => {
            this.$router.replace({ name: 'index' })
          }).catch(() => {})
        } else {
          this.$toast(res.message)
        }
      })
    },
    ...mapMutations({
      setToken: 'SET_TOKEN',
      setUser: 'SET_USER'
    })
  },
  computed: {
    ...mapState({
      findPwdInfo: state => state.app.findPwdInfo
    })
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .mt-64{
    margin-top: 64px/2;
  }
  .input{
    margin-top: 63px/2;
    height: 104px/2;
    width: 100%;
    font-size: 34px/2;
  }
  .tip{
    font-size: 28px/2;
    color: #999999;
    letter-spacing: 0.45px/2;
    text-align: left;
    margin: 32px/2 0 96px/2;
  }
  .code {
    height: 104px/2;
    position: relative;
    border-bottom: 1px/2 solid #e5e5e5;
    line-height: 104px/2;
    background-size: 26px/2 32px/2;
  }
  .text-1{
    width: 100%;
    letter-spacing: 60px/2;
    text-align: center;
  }
  .close{
    width: 32px/2;
    height: 32px/2;
  }
</style>
