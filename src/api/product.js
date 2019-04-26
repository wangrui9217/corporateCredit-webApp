import request from '@/utils/request'
const baseController = 'app/'

export function queryProductListPage (data) {
  return request({
    url: baseController + 'api/app/product/queryProductListPage',
    method: 'post',
    data
  })
}

export function getProductById (append) {
  return request({
    url: baseController + `api/app/product/getProductById/${append}`,
    method: 'get'
  })
}

export function applyProductInfo (data) {
  return request({
    url: baseController + `api/app/product/applyProductInfo`,
    method: 'post',
    data
  })
}

