import request from "../plugins/request";

export function getList(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
export function getDetail(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
export function getUpdate(url, params) {
  return request({
    url: url,
    method: 'get',
    params
  })
}
export function submitUpdate(url, data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
