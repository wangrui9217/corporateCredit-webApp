import request from '@/utils/request'
const baseController = 'app/'

export function saveCreditApplyInfo (data) {
  return request({
    url: baseController + 'api/app/company/saveCreditApplyInfo',
    method: 'post',
    data
  })
}

export function getCreditList (data) {
  return request({
    url: baseController + 'api/app/product/getCreditList',
    method: 'post',
    data
  })
}

export function getCreditDetail (data) {
  return request({
    url: baseController + `api/app/product/getCreditDetail/${data}`,
    method: 'get'
  })
}

export function signContract (data) {
  return request({
    url: baseController + `api/app/product/signContract/${data}`,
    method: 'get'
  })
}

export function getUseCreditDetails (data) {
  return request({
    url: baseController + `api/app/product/getUseCreditDetails/${data}`,
    method: 'get'
  })
}

export function saveComanyAmountNumber (data) {
  return request({
    url: baseController + `api/app/product/saveComanyAmountNumber`,
    method: 'post',
    data
  })
}

export function getOcrBusLicense (data) {
  return request({
    url: `thirdparty/api/ocrImage/getOcrBusLicense`,
    method: 'post',
    data
  })
}

export function getOcrIdCard (data, side) {
  return request({
    url: `thirdparty/api/ocrImage/getOcrIdCard/${side}`,
    method: 'post',
    data
  })
}

export function getMyLoanList (data) {
  return request({
    url: baseController + `api/app/repayment/getMyLoanList`,
    method: 'post',
    data
  })
}

