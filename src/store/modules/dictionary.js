import {getPublicHost, findDicByGroup, findAreaList} from '@/api/dictionary'
const dictionary = {
  state: {
    table: '',
    publicHost: '',
    areaList: []
  },
  mutations: {
    SET_TABEL: (state, table) => {
      state.table = table
    },
    SET_PublicHost: (state, table) => {
      state.publicHost = table
    },
    SET_AREALIST: (state, list) => {
      state.areaList = list
    }
  },
  actions: {
    findAreaList ({ commit }) {
      return new Promise((resolve, reject) => {
        findAreaList().then(res => {
          if (res.code === 200) {
            commit('SET_AREALIST', res.result)
            resolve()
            return
          }
          reject()
        }).catch(() => {
          reject()
        })
      })
    },
    /**
     * 清除登录数据
     */
    clearUserLoginData ({ commit }) {
      commit('INIT_REGIST_INFO')
      commit('SET_INDEX_INFO', {})
      commit('SET_CREDIT_LIST', [])
      commit('SET_PRODUCT_LIST', [])
      commit('SET_MINE_INFO', {})
    },
    getDictionaryTabel ({dispatch, commit}) {
      return new Promise((resolve, reject) => {
        dispatch('clearUserLoginData')
        Promise.all([
          dispatch('queryDicListWithPage'),
          dispatch('getPublicHost'),
          dispatch('findAreaList')
        ]).then(() => resolve()).catch(() => reject())
      })
    },
    queryDicListWithPage ({ commit }) {
      return new Promise((resolve, reject) => {
        findDicByGroup().then(res => {
          if (res.code === 200) {
            commit('SET_TABEL', res.result)
            resolve()
            return
          }
          reject()
        }).catch(() => {
          reject()
        })
      })
    },
    getPublicHost ({ commit }) {
      return new Promise((resolve, reject) => {
        getPublicHost().then(res => {
          if (res.code === 200) {
            const result = res.result
            commit('SET_PublicHost', result.FDFSHost)
            resolve()
            return
          }
          reject()
        }).catch(() => {
          reject()
        })
      })
    }
  }
}

export default dictionary
