import Vue from 'vue'
import Router from 'vue-router'
import commonLayout from '../components/layOut/common-layout'
import mainLayout from '../components/layOut/main-layout'
import store from './../store'

// 主页
const index = r => require.ensure([], () => r(require('../pages/main/index.vue')), 'index')
// 合同详情
const agreement = r => require.ensure([], () => r(require('../pages/credit/agreement')))
// 产品
const project = r => require.ensure([], () => r(require('../pages/project/index.vue')))
const projectDetail = r => require.ensure([], () => r(require('../pages/project/project-detail')))
const projectApply = r => require.ensure([], () => r(require('../pages/project/project-apply')))
const projectApplyResult = r => require.ensure([], () => r(require('../pages/project/project-apply-result')))
const projectApplyEnsure = r => require.ensure([], () => r(require('../pages/project/project-apply-ensure')))
const projectApplySign = r => require.ensure([], () => r(require('../pages/project/project-apply-sign')))
// 用信
const credit = r => require.ensure([], () => r(require('../pages/credit/index.vue')))
const creditEnterprise = r => require.ensure([], () => r(require('../pages/credit/credit-enterprise.vue')))
const creditLegalperson = r => require.ensure([], () => r(require('../pages/credit/credit-legalperson.vue')))
const creditAuthorization = r => require.ensure([], () => r(require('../pages/credit/credit-authorization.vue')))
const creditApplystatus = r => require.ensure([], () => r(require('../pages/credit/credit-applystatus.vue')))
const creditRecord = r => require.ensure([], () => r(require('../pages/credit/credit-record')))
const creditLimit = r => require.ensure([], () => r(require('../pages/credit/credit-limit')))
const creditMine = r => require.ensure([], () => r(require('../pages/credit/credit-mine')))
const creditEntrance = r => require.ensure([], () => r(require('../pages/credit/credit-entrance')))
const creditShareholder = r => require.ensure([], () => r(require('../pages/credit/credit-shareholder')))
const creditFaceRecognition = r => require.ensure([], () => r(require('../pages/credit/credit-faceRecognition')))
// 提额
const upgradeApply = r => require.ensure([], () => r(require('../pages/upgradeLimit/upgrade-apply')))
const upgradeApplyInfo = r => require.ensure([], () => r(require('../pages/upgradeLimit/upgrade-apply-info')))
const upgradeApplyFinance = r => require.ensure([], () => r(require('../pages/upgradeLimit/upgrade-apply-finance')))
const upgradeApplyAssets = r => require.ensure([], () => r(require('../pages/upgradeLimit/upgrade-apply-assets')))
const upgradeApplyGuarantee = r => require.ensure([], () => r(require('../pages/upgradeLimit/upgrade-apply-guarantee')))
const upgradeApplyResult = r => require.ensure([], () => r(require('../pages/upgradeLimit/upgrade-apply-result')))
const upgradeApplyDetail = r => require.ensure([], () => r(require('../pages/upgradeLimit/upgrade-apply-detail')))
const upgradeApplyIndex = r => require.ensure([], () => r(require('../pages/upgradeLimit/upgrade-apply-index')))
// 我的
const mine = r => require.ensure([], () => r(require('../pages/mine/index.vue')))
// 登录注册
const login = r => require.ensure([], () => r(require('../pages/login/loginIndex.vue')))
const register = r => require.ensure([], () => r(require('../pages/login/register.vue')))
const checkPhone = r => require.ensure([], () => r(require('../pages/login/checkPhone.vue')))
const setPwd = r => require.ensure([], () => r(require('../pages/login/setPwd.vue')))
const setDealPwd = r => require.ensure([], () => r(require('../pages/login/setDealPwd.vue')))
const setDealPwdCheck = r => require.ensure([], () => r(require('../pages/login/set-deal-pwd-checkPhone')))
const setNewPwd = r => require.ensure([], () => r(require('../pages/login/setNewPwd')))
const resetPwdResult = r => require.ensure([], () => r(require('../pages/login/reset-pwd-result')))
const findPwdPhoone = r => require.ensure([], () => r(require('../pages/login/find-pwd-phone')))
const findPwdCheckPhoone = r => require.ensure([], () => r(require('../pages/login/find-pwd-checkPhone')))
const findPwdReset = r => require.ensure([], () => r(require('../pages/login/find-pwd-reset')))
// 借款
const loanRecord = r => require.ensure([], () => r(require('../pages/loan/loan-record')))
// 关于
const about = r => require.ensure([], () => r(require('../pages/others/about')))
const setting = r => require.ensure([], () => r(require('../pages/others/setting')))
const message = r => require.ensure([], () => r(require('../pages/others/message')))
const suggestion = r => require.ensure([], () => r(require('../pages/others/suggestion')))
// 账户
const addAccount = r => require.ensure([], () => r(require('../pages/account/add-account')))
const mineAccount = r => require.ensure([], () => r(require('../pages/account/mine-account')))
// 还款
const repaymentApply = r => require.ensure([], () => r(require('../pages/repayment/repayment-apply')))
const repaymentResult = r => require.ensure([], () => r(require('../pages/repayment/repayment-result')))
const repaymentIndex = r => require.ensure([], () => r(require('../pages/repayment/repayment-index')))
const repaymentDetail = r => require.ensure([], () => r(require('../pages/repayment/repayment-detail')))
const threeCards = r => require.ensure([], () => r(require('../components/common/threeCards')))

Vue.use(Router)
const routes = [{
  path: '/',
  component: mainLayout,
  redirect: '/login',
  children: [
    {path: 'index', name: 'index', component: index,meta: {title: '首页'}},
    {path: 'project', name: 'project', component: project,meta: {title: '产品'}},
    {path: 'credit', name: 'credit', component: credit,meta: {title: '用信'}},
    {path: 'mine', name: 'mine', component: mine,meta: {title: '我的'}},
    // 登录注册
    {path: '/login', name: 'login', component: login},
    {path: '/register', component: register,meta: {title: '注册'} },
    {path: '/checkPhone', component: checkPhone,meta: {title: '验证手机号'} },
    {path: '/setPwd', component: setPwd,meta: {title: '设置登录密码'} },
    {path: '/set-deal-pwd', name: 'set-deal-pwd',component: setDealPwd,meta: {title: '设置交易密码'} },
    {path: '/set-deal-pwd-check', component: setDealPwdCheck,meta: {title: '手机验证码'} },
    {path: '/setNewPwd', component: setNewPwd,meta: {title: '设置新密码'} },
    {path: '/reset-pwd-result', component: resetPwdResult,meta: {title: '设置密码'} },
    {path: '/find-pwd-phone', component: findPwdPhoone,meta: {title: '输入手机号'} },
    {path: '/find-pwd-check-phone', component: findPwdCheckPhoone,meta: {title: '验证手机号'} },
    {path: '/find-pwd-reset', component: findPwdReset,meta: {title: '设置新密码'} },
    {path: '/three-cards', component: threeCards,meta: {title: '设置新密码'} },
    // 产品
    {path: '/project-detail', component: projectDetail,meta: {title: '信用快贷'}},
    {path: '/project-apply', component: projectApply,meta: {title: '产品申请'} },
    {path: '/project-apply-result', component: projectApplyResult,meta: {title: '产品申请'} },
    {path: '/project-apply-ensure', component: projectApplyEnsure,meta: {title: '产品申请确认'} },
    {path: '/project-apply-sign', component: projectApplySign,meta: {title: '签署电子合同'} },
    // 提额
    {path: '/upgrade-apply', component: upgradeApply,meta: {title: '提额申请'} },
    {path: '/upgrade-apply-info', component: upgradeApplyInfo,meta: {title: '额度申请'} },
    {path: '/upgrade-apply-finance', component: upgradeApplyFinance,meta: {title: '财务信息'} },
    {path: '/upgrade-apply-assets', component: upgradeApplyAssets,meta: {title: '资产信息'} },
    {path: '/upgrade-apply-guarantee', component: upgradeApplyGuarantee,meta: {title: '担保信息'} },
    {path: '/upgrade-apply-result', component: upgradeApplyResult,meta: {title: '额度申请'} },
    {path: '/upgrade-apply-index', component: upgradeApplyIndex,meta: {title: '提额申请'} },
    {path: '/upgrade-apply-detail', component: upgradeApplyDetail,meta: {title: '提额申请'} },
    // 用信
    {path: '/credit-enterprise', component: creditEnterprise,meta: {title: '企业信息'} },
    {path: '/credit-legalperson', component: creditLegalperson,meta: {title: '法人信息'} },
    {path: '/credit-authorization', component: creditAuthorization,meta: {title: '征信授权'} },
    {path: '/credit-applystatus', component: creditApplystatus,meta: {title: '额度申请'} },
    {path: '/credit-record', component: creditRecord,meta: {title: '授信记录'} },
    {path: '/credit-limit', component: creditLimit,meta: {title: '授信额度'} },
    {path: '/credit-mine', component: creditMine,meta: {title: '我的借款'} },
    {path: '/credit-entrance', component: creditEntrance,meta: {title: '申请额度'} },
    {path: '/credit-shareholder', component: creditShareholder,meta: {title: '申请额度'} },
    {path: '/credit-faceRecognition', component: creditFaceRecognition,meta: {title: '人脸识别'} },
    // 借款
    {path: '/loan-record', component: loanRecord, meta: {title: '用信详情'} },
    // 关于
    {path: '/about', component: about, meta: {title: '关于'} },
    {path: '/setting', component: setting, meta: {title: '设置'} },
    {path: '/message', component: message, meta: {title: '消息'} },
    {path: '/suggestion', component: suggestion, meta: {title: '意见反馈'} },
    // 账户
    {path: '/add-account', component: addAccount, meta: {title: '添加对公账户'} },
    {path: '/mine-account', component: mineAccount, meta: {title: '对公账户'} },
    // 还款
    {path: '/repayment-apply', component: repaymentApply, meta: {title: '还款'} },
    {path: '/repayment-result', component: repaymentResult, meta: {title: '还款'} },
    {path: '/repayment-index', component: repaymentIndex, meta: {title: '还款'} },
    {path: '/repayment-detail', component: repaymentDetail, meta: {title: '还款明细'} },
    // 合同详情
    {path: '/agreement', component: agreement, meta: {title: '合同详情'} },
  ]
}]

const router = new Router({
  routes, linkActiveClass: 'my-active'
})
let routersArr = []
const mainPage = ['index', 'project', 'credit', 'mine']
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    routersArr = []
  }
  if (routersArr.length === 0) {
    routersArr.push(from.path)
    routersArr.push(to.path)
  } else {
    if (routersArr.indexOf(to.path) !== -1) {
      store.commit('SET_TRANSTIONNAME', 'slide-right')
      routersArr.splice(routersArr.indexOf(from.path), 1)
    } else {
      store.commit('SET_TRANSTIONNAME', 'slide-left')
      routersArr.push(to.path)
    }
    if (mainPage.includes(to.name) && mainPage.includes(from.name)) {
      if (mainPage.indexOf(to.name) > mainPage.indexOf(from.name)) {
        store.commit('SET_TRANSTIONNAME', 'slide-left')
      } else {
        store.commit('SET_TRANSTIONNAME', 'slide-right')
      }
    } else if (mainPage.includes(to.name) && !mainPage.includes(from.name)) {
      routersArr = [to.path]
    }
  }
  next()
})
router.afterEach(() => {
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
})

/**router.beforeEach((to,from,next)=>{
  var accessToken=localStorage.getItem('access_toke')
    if(accessToken){
      if(to.path==='/login'||to.path==='/register'||to.path==='/resetPwd'){
        if(user&&user!='null'){
          //console.log('用户信息的cookie存在')
          if(user.user_code == 1){
            next({path:'/main'})
          }else if(user.user_code == 0){
            next({path:'/supplier'})
          }
        }else{
          next()
        }
      }else{
        next()
      }
      next()
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}
        // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
})
 **/
export default router
