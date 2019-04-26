import {MessageBox} from 'mint-ui'
import {queryDetail} from '@/api/company'
import {getMyPageStatus} from '@/api/mine'
import {getPublicKey} from '@/api/login'
import router from './../../router'
import store from './../../store'
const app = {
  state: {
    token: '',
    user: {},
    registInfo: {
      userPhone: '',
      managerNumber: ''
    },
    publicKey: '',
    loginInfo: {},
    findPwdInfo: {},
    creditInfo: {},
    approved: false,
    indexInfo: '',
    transitionName: '',
    mineInfo: {}
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, token) => {
      state.user = token
    },
    SET_REGIST_INFO: (state, obj) => {
      state.registInfo = Object.assign(state.registInfo, obj)
    },
    SET_FIND_PWD_INFO: (state, obj) => {
      state.findPwdInfo = Object.assign(state.findPwdInfo, obj)
    },
    INIT_REGIST_INFO: (state) => {
      state.creditInfo = {}
    },
    SET_CREDIT_INFO: (state, obj) => {
      state.creditInfo = Object.assign(state.creditInfo, obj)
    },
    SET_APPROVE: (state, flag) => {
      state.approved = flag
    },
    SET_INDEX_INFO: (state, obj) => {
      state.indexInfo = obj
    },
    SET_TRANSTIONNAME: (state, name) => {
      state.transitionName = name
    },
    SET_MINE_INFO: (state, obj) => {
      state.mineInfo = obj
    },
    SET_LOGIN_INFO: (state, obj) => {
      state.loginInfo = obj
    },
    SET_PUBLIC_KEY: (state, str) => {
      state.publicKey = str
    }
  },
  actions: {
    loginSetToken ({ commit }) {
      commit('SET_TOKEN')
    },
    signContract ({dispatch}) {
      dispatch('getCreditListPage', {pageIndex: 1, size: 3}).then(() => {
        let creditList = store.state.credit.creditList || []
        let creditTemp = creditList.find(val => val.useCreditStatus === 6)
        if (creditTemp) {
          MessageBox.confirm('', {
            title: '签署合同',
            message: '您有一个产品订单审核成功，签署合同后将收到你申请的借款。',
            showCancelButton: true,
            confirmButtonText: '签署合同'
          }).then(action => {
            router.push(`/project-apply-ensure?id=${creditTemp.id}`)
          })
        }
      })
    },
    mainPageInit ({dispatch}) {
      dispatch('signContract') // 合同
      dispatch('queryDetail') // 首页
      dispatch('queryMineInfo') // 个人中心
    },
    queryDetail ({ commit }) {
      queryDetail().then(res => {
        if (res.code === 200) {
          commit('SET_INDEX_INFO', res.result ? res.result : {})
        }
      })
    },
    queryMineInfo ({ commit }) {
      getMyPageStatus().then(res => {
        if (res.code === 200) {
          commit('SET_MINE_INFO', res.result ? res.result : {})
        }
      })
    },
    getPublicKey ({ commit }) {
      getPublicKey().then(res => {
        if (res.code === 200) {
          commit('SET_PUBLIC_KEY', res.result)
        }
      })
    }
  }
}

export default app
