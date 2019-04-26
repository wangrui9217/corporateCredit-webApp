import request from '@/utils/request'
const baseController = 'app/'

export function getMyPageStatus () {
  return request({
    url: baseController + 'api/app/systemMySet/getMyPageStatus',
    method: 'get'
  })
}

export function getAmountNumberInfo () {
  return request({
    url: baseController + 'api/app/systemMySet/getAmountNumberInfo',
    method: 'get'
  })
}

export function setPayPassWord (data) {
  return request({
    url: baseController + 'api/app/systemMySet/setPayPassWord',
    method: 'post',
    data
  })
}

export function getPublicAccount (id) {
  return request({
    url: baseController + `api/app/product/getPublicAccount/${id}`,
    method: 'get'
  })
}
