import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'
import directive from './utils/directive'
// 第三方jquery
// import '../static/js/zepto.min.js'
// css reset UI框架里面有了,但是mint-ui沒有

// 字体图标
import './public/font/font-awesome.min.css'

// px2rem
import 'lib-flexible/flexible.js'

import components from './components/common'
Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase())
  Vue.component(name, components[key])
})

// 全局公共方法&&&获取字典表
// store.dispatch('getDictionaryTabel')
import filterService from './utils/filter'
import dictionaryService from './utils/dictionary-service'
Vue.prototype.$filter = filterService
Vue.prototype.$dict = dictionaryService

// 全部加载ui框架
// mint-ui
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI);
// muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
Vue.use(MuseUI)
// 加载默认css
import './public/theme.less'
import './public/reset.less'
import './public/common.less'

import PeonyCircle from 'peony-circle'
Vue.use(PeonyCircle)

// 获取publicKey
// store.dispatch('getPublicKey')
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
const option = {fullscreenEl: false}
Vue.use(preview, option)



new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App)
})
