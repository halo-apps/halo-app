import store from '../store/index.js'

//从storage中获取身份令牌信息
export function getHeader() {
  let header = {
    platform: '2',
  }
  let login = store.state.user.login
  if (login.token) {
    header.authorization = `Bearer ${login.token}`
  }
  return header
}
