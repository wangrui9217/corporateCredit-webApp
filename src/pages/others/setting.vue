<template>
  <div class="main-with-header common-bg">
    <common-header></common-header>
    <router-link to="/setNewPwd" class="common-tabel-list common-padding">
      <div>登录密码</div>
      <div>
        <span class="text-1">修改密码</span>
        <img src="./../../../static/img/common/right.png" class="text-right"/>
      </div>
    </router-link>
    <div @click="setDeal" class="common-tabel-list common-padding">
      <div>交易密码</div>
      <div>
        <!--<span class="text-2">未设置</span>-->
        <img src="./../../../static/img/common/right.png" class="text-right"/>
      </div>
    </div>
    <router-link to="/suggestion" class="common-tabel-list common-padding mt-16">
      <div>意见反馈</div>
      <div>
        <img src="./../../../static/img/common/right.png" class="text-right"/>
      </div>
    </router-link>
    <router-link to="/about" class="common-tabel-list common-padding">
      <div>关于</div>
      <div>
        <img src="./../../../static/img/common/right.png" class="text-right"/>
      </div>
    </router-link>

    <div class="mt-16 login-out text-2" @click="logOutShow">安全退出</div>

    <mt-actionsheet
      :actions= "data"
      v-model="sheetVisible">
    </mt-actionsheet>



  </div>
</template>
<script>
import {MessageBox} from 'mint-ui'
import {appLogout} from '@/api/login'
export default{
  data () {
    return {
      sheetVisible: false,
      data: [{
        name: '退出',
        method: this.logOut
      }]
    }
  },
  components: {},
  methods: {
    setDeal () {
      MessageBox.confirm('', {
        title: '温馨提示',
        message: `将发送验证码至${this.$filter.encryptPhone(this.$store.state.app.user.userPhone)}, </br>是否继续?`,
        showCancelButton: true,
        confirmButtonText: '确认'
      }).then(action => {
        this.$router.push('/set-deal-pwd-check')
      })
    },
    logOut () {
      const data = {
        token: this.$store.state.app.token
      }
      this.$store.commit('SET_TOKEN', '')
      this.$router.replace('/')
      // appLogout(data).then(res => {
      //   if (res.code === 200) {
      //   }
      // })
    },
    logOutShow () {
      this.sheetVisible = true
    }
  }
}
</script>
<style lang='less' scoped>
  @import "./../../public/comment";
  .common-tabel-list{
    .text-1{
      color: #999999;
    }
  }
  .mt-16{
    margin-top: 16px/2;
  }
  .text-2{
    color: #F5222D;
  }
  .login-out{
    height: 104px/2;
    font-size: 32px/2;
   display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }
</style>
