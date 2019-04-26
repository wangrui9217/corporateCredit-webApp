var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 亚军
    BASE_API: '"http://192.168.21.49/"'
  // 外网
  // BASE_API: '"http://116.236.220.216:14000/"'
  // 黄磊
  // BASE_API: '"http://192.168.21.30/"'
  // BASE_API: '"http://172.16.10.39:8080/"'
  // BASE_API: '"http://192.168.21.37:9000"'
  //   BASE_API: '"http://192.168.21.33/"'
})
