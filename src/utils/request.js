import axios from 'axios'
import store from '@/store'
import { Toast } from 'mint-ui'
import router from '../router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 30000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers['X-UserToken'] = store.state.app.token
    return config
  },
  error => {
    // Do something with request error
    console.log(error, '=====error========') // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 200) {
      Toast(res.message)
      // // 401:Token 过期了;
      if (res.code === 401) {
        router.push('/')
      }
      // console.log(res, 888)

      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log(error, '=====error======', error.message) // for debug
    Toast(error.message)
    // router.push('/')
    return Promise.reject(error)
  }
)

export default service
