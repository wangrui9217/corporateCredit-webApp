<template>
  <div class="main-with-header">
    <common-header :showBack="false">
      <div slot="save" class="save">
        <img src="./../../../static/img/common/close.png" class="close" @click="returnIndex"/>
      </div>
    </common-header>
    <div class="common-padding pt-63">
      <verification-input :inputNum.sync="form.code"></verification-input>
      <p class="tip" v-if="lastTime !== 0">{{lastTime}}S后重新发送</p>
      <p class="tip send" v-else @click="sendMessage">重新发送</p>
      <mt-button class="common-parimary-btn" @click="goNext">下一步</mt-button>
    </div>

  </div>
</template>
<script>
import {sendMessage, checkPhoneCode} from '@/api/login'
import {mapMutations, mapState} from 'vuex'
export default{
  data () {
    return {
      form: {
        code: ''
      },
      InvalidTime: 120,
      lastTime: null
    }
  },
  components: {},
  mounted () {
    this.sendMessage()
  },
  methods: {
    countDown () {
      this.lastTime = this.InvalidTime
      const interval = setInterval(() => {
        this.lastTime --
        if (this.lastTime === 0) {
          clearInterval(interval)
        }
      }, 1000)
    },
    sendMessage () {
      const data = {
        userPhone: this.$store.state.app.user.userPhone
      }
      sendMessage(data).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.$toast('发送验证码成功')
          this.countDown()
        }
      })
    },
    returnIndex () {
      this.$router.go(-1)
    },
    goNext () {
      if (this.form.code.length !== 6) {
        this.$toast('请输入正确的验证码')
        return
      }
      const data = {
        userPhone: this.$store.state.app.user.userPhone,
        code: this.form.code
      }
      checkPhoneCode(data).then(res => {
        if (res.code === 200) {
          this.$router.replace({name: 'set-deal-pwd', params: {state: 1}})
        }
      })
    }
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
  .pt-63{
    padding-top: 63px/2;
  }
  .send{
    color: @lightBlue !important;
    z-index: 100;
    position: relative;
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
