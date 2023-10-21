import request from "../plugins/request";

export function getMenu() {
  return request.get('/user/menu')
}

export function submitLogin(data) {
  return request.post('/login', data)
}
