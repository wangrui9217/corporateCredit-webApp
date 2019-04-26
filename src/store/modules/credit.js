import {getCreditList} from '@/api/credit'
const app = {
  state: {
    creditList: []
  },
  mutations: {
    SET_CREDIT_LIST: (state, list) => {
      state.creditList = list
    }
  },
  actions: {
    getCreditListPage ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        getCreditList(obj).then(res => {
          if (res.code === 200) {
            commit('SET_CREDIT_LIST', res.result)
            resolve()
          }
        }).catch(err => reject(err))
      })
    }
  }
}

export default app
