import request from '@/utils/request'
const baseController = 'file/'

export function uploadFileByBase64Str (data) {
  return request({
    url: baseController + 'api/file/uploadFileByBase64Str',
    method: 'post',
    data
  })
}

