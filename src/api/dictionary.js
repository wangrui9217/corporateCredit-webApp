import request from '@/utils/request'
const baseController = 'auth/'

export function queryDicListWithPage (data) {
  return request({
    url: baseController + 'api/dictionary/queryDicListWithPage',
    method: 'post',
    data
  })
}

export function getPublicHost (data) {
  return request({
    url: baseController + 'api/dictionary/getPublicHost',
    method: 'get',
    data
  })
}

export function findDicByGroup () {
  return request({
    url: baseController + 'api/dictionary/findDicByGroup',
    method: 'get'
  })
}

export function findAreaList () {
  return request({
    url: baseController + 'api/dictionary/findAreaList',
    method: 'get'
  })
}
