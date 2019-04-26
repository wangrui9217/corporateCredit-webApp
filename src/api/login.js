import request from '@/utils/request'
const baseController = 'app/'

export function appLogin (data) {
  return request({
    url: baseController + 'api/app/userLogin/appLogin',
    method: 'post',
    data
  })
}

export function appRegister (data) {
  return request({
    url: baseController + 'api/app/userLogin/appRegister',
    method: 'post',
    data
  })
}

export function imgAuthCode (params) {
  return request({
    url: baseController + 'api/app/userLogin/imgAuthCode.jpg',
    method: 'get',
    params
  })
}

export function checkImagesCode (data) {
  return request({
    url: baseController + 'api/app/userLogin/checkImagesCode',
    method: 'post',
    data
  })
}

export function sendMessage (data) {
  return request({
    url: baseController + 'api/app/sms/sendMessage',
    method: 'post',
    data
  })
}

export function checkPhoneCode (data) {
  return request({
    url: baseController + 'api/app/userLogin/checkPhoneCode',
    method: 'post',
    data
  })
}

export function retrievePassword (data) {
  return request({
    url: baseController + 'api/app/userLogin/retrievePassword',
    method: 'post',
    data
  })
}

export function appLogout (data) {
  return request({
    url: baseController + 'api/app/userLogin/appLogout',
    method: 'post',
    data
  })
}

export function getPublicKey () {
  return request({
    url: baseController + 'api/app/userLogin/getPublicKey',
    method: 'get'
  })
}

export function checkUserPhone (data) {
  return request({
    url: baseController + 'api/app/userLogin/checkUserPhone',
    method: 'post',
    data
  })
}

