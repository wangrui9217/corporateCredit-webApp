import request from '@/utils/request'
const baseController = 'app/'

// 查看客户资料状态
export function queryCustomer () {
  return request({
    url: baseController + 'api/app/company/queryCustomer',
    method: 'get'
  })
}

// 提交资料
export function updateResourceEntry (data) {
  return request({
    url: baseController + 'api/app/company/updateResourceEntry',
    method: 'post',
    data
  })
}

// 查看资料
export function queryResourceList (data) {
  return request({
    url: baseController + 'api/app/company/queryResourceList',
    method: 'post',
    data
  })
}

// 查看授信额度
export function queryOrderSurveying (data) {
  return request({
    url: baseController + 'api/app/company/queryOrderSurveying',
    method: 'post',
    data
  })
}

// 提额申请
export function applyCarryAmount (data) {
  return request({
    url: baseController + 'api/app/company/applyCarryAmount',
    method: 'post',
    data
  })
}

// 提交尽调提额信息
export function submitSurvey (data) {
  return request({
    url: baseController + 'api/app/company/submitSurvey',
    method: 'post',
    data
  })
}

// 首页-额度详情
export function queryDetail () {
  return request({
    url: baseController + 'api/app/company/queryDetail',
    method: 'get'
  })
}

