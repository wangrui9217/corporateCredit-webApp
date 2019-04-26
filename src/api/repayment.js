import request from '@/utils/request'
const baseController = 'app/'

export function getRepaymentListWithPage (data) {
  return request({
    url: baseController + 'api/app/repayment/getRepaymentListWithPage',
    method: 'post',
    data
  })
}

export function getRepaymentDetail (data) {
  return request({
    url: baseController + `api/app/repayment/getRepaymentDetail/${data}`,
    method: 'get'
  })
}

