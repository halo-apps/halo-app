import request from '../plugins/request'

export function getTree(url) {
  return request.get(url)
}

export function sortTree(url, data) {
  return request.post(url, data)
}
