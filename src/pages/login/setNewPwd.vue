<template>
  <div class="main-with-header">
    <common-header></common-header>
    <div class="common-padding">
      <div class="common-input-box mt-64">
        <input class="common-input" type="password"   placeholder="请输入原密码" v-model="form.password1">
      </div>
      <div class="common-input-box">
        <input class="common-input" type="password"   placeholder="请输入新密码" v-model="form.password2">
      </div>
      <div class="common-input-box">
        <input class="common-input" type="password"   placeholder="请再次输入新密码" v-model="form.password3">
      </div>
      <mt-button class="common-parimary-btn common-btn-margin" @click="login">确定</mt-button>
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
        password1: '',
        password2: '',
        password3: ''
      }
    }
  },
  components: {},
  methods: {
    login () {
      if (this.$filter.isObjectEmpty(this.form)) {
        this.$toast('请完善信息')
        return
      }
      if (this.form.password2 !== this.form.password3) {
        this.$toast('两次输入的密码不一致')
        return
      }
      if (!this.$filter.isPassword(this.form.password2)) {
        return
      }
      const registerParams = {
        userPhone: this.user.userPhone,
        oldPassword: this.form.password1,
        password: this.form.password2
      }
      retrievePassword(registerParams).then(res => {
        if (res.code === 200) {
          this.$toast('修改成功')
          this.setToken(res.result.token)
          this.setUser(res.result.user)
          this.$store.dispatch('getDictionaryTabel').then(() => {
            this.$router.go(-1)
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
      user: state => state.app.user
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
