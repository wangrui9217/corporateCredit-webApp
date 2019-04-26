import {Toast} from 'mint-ui'
import { JSEncrypt } from 'jsencrypt'
import { bankCardAttribution } from './bankFormat.js'
import CryptoJS from 'crypto-js'
import store from './../store'
function padLeftZero (str) {
  return ('00' + str).substr(str.length)
}
const filterService = {
  isPhone (phone) {
    const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    const callNumber = /^0\d{2,3}-?\d{7,8}$/
    if (!myreg.test(phone) && !callNumber.test(phone)) {
      Toast('请输入正确格式的手机号')
      return false
    } else {
      return true
    }
  },
  isIdCard (id) {
    var myreg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (!myreg.test(id)) {
      Toast('请输入正确格式的身份证号')
      return false
    } else {
      return true
    }
  },
  isPassword (pwd) {
    if (pwd.trim().length < 6) {
      Toast('密码长度至少6位')
      return false
    } else {
      return true
    }
  },
  numberFormat (number, decimals, decPoint, thousandsSep) {
    /*
    * 参数说明：
    * number：要格式化的数字
    * decimals：保留几位小数
    * dec_point：小数点符号
    * thousands_sep：千分位符号
    * */
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    var n = !isFinite(+number) ? 0 : +number,

      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
      dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
      s = '',
      toFixedFix = function (n, prec) {
        var k = Math.pow(10, prec)
        return '' + Math.floor(n * k) / k
      }
    s = (prec ? toFixedFix(n, prec) : '' + Math.floor(n)).split('.')
    var re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  },
  dateFormat (dateValue, fmt = 'yyyy-MM-dd') {
    // yyyy-MM-dd HH:mm:ss
    if (!dateValue) {
      return '未知'
    }
    let date = new Date(dateValue)
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
      }
    }
    return fmt
  },
  isObjectEmpty (obj) {
    let flag = false
    Object.keys(obj).forEach((key) => {
      if (obj[key] === '') {
        flag = true
        console.log(key, '1')
      } else if ((obj[key] instanceof Array) && obj[key].length === 0) {
        flag = true
        console.log(key, '2')
      } else if ((Object.prototype.toString.call(obj[key]) === '[object Object]') && Object.keys(obj[key]).length === 0) {
        flag = true
        console.log(key, '3')
      }
    })
    return flag
  },
  encrypt (word) {
    // let publicKey = store.state.app.publicKey
    // let encryptor = new JSEncrypt()
    // encryptor.setPublicKey(publicKey)
    // let rsaPassWord = encryptor.encrypt(str)
    // return rsaPassWord
    // keyStr = keyStr ? keyStr : 'abcdefgabcdefg12'
    const keyStr = 'QWERASDF12454WE2'
    var key = CryptoJS.enc.Utf8.parse(keyStr)
    var srcs = CryptoJS.enc.Utf8.parse(word)
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7})
    return encrypted.toString()
  },
  /**
   * 手机号脱敏显示转换器
   */
  encryptPhone (value) {
    if (!value || value === '') {
      return ''
    }
    return value.substr(0, 3) + '****' + value.substr(7)
  },
  /**
   * 身份证脱敏显示转换器
   */
  encryptIDCardFour (value) {
    if (!value || value === '') {
      return ''
    }
    return value.substr(0, 3) + '****' + value.substr(-4)
  },
  /**
   * 银行卡号码格式化
   * @param value 要格式化的银行卡号
   */
  formatBankCardNumber (value) {
    let result = new String(value)
    return result.replace(/(\d{4})(?=\d)/g, '$1' + '-')
  },
  bankCardAttribution
}
export default filterService
