import request from "../plugins/request";

export function getSetting() {
  return request.get('/system/setting')
}
