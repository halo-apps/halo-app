import axios from 'axios'
import {getToken} from "./auth";
import vuetifyToast from 'vuetify-toast'

const request = axios.create({
  baseURL: window.settings.api.url
})

request.interceptors.request.use(config => {
  config.headers['authorization'] = getToken()
  return config
})

request.interceptors.response.use(({data}) => {
  if (data.code == 401) {
    // vue.$router.push('/login')
  } else if (data.code == 500) {
    vuetifyToast.error(data.message)
    //打印全局消息
    return Promise.reject(data.message)
  } else {
    //成功
    return data
  }
}, error => {
  //网络错误
  vuetifyToast.error(error)
  return Promise.reject(error)
})

export default request
