import {queryProductListPage} from '@/api/product'
const app = {
  state: {
    productList: []
  },
  mutations: {
    SET_PRODUCT_LIST: (state, list) => {
      state.productList = list
    }
  },
  actions: {
    getProductListPage ({ commit }, obj) {
      return new Promise((resolve, reject) => {
        queryProductListPage(obj).then(res => {
          if (res.code === 200) {
            commit('SET_PRODUCT_LIST', res.result)
            resolve()
          }
        }).catch(err => reject(err))
      })
    }
  }
}

export default app
