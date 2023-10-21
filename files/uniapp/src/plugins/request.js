import store from '../store/index.js'
import {
  getTimestamp
} from './time-helper.js'
import {
  getHeader
} from './auth.js'
import {
  md5
} from './encrypt-helper.js'

let request = (config) => {
  //请求前，检查是否登录
  //要求必须已有授权token才能够继续请求
  config.header = { ...config.header,
    ...getHeader()
  }

  let login = store.state.user.login
  if (login) {
    let userId = login.userId
    let userSecret = login.userSecret
    let timestamp = getTimestamp()
    let url = getRequestUrl(config)
    let body = config.data ? JSON.stringify(config.data) : ''
    let signStr = `${userId}.${url}.${body}.${timestamp}.${userSecret}`
    console.log(signStr)
    let signature = md5(signStr)
    config.header.signature = `${userId}.${timestamp}.${signature}`
  }

  if (config.url) {
    let url = store.state.system.settings.api.url
    if (url.endsWith("/")) {
      url = url.substring(0, url.length - 1)
    }
    config.url = url + config.url
  }

  return uni.request(config).then(res => {
    //提示网络错误
    if (res.length == 1) {
      uni.showToast({
        title: res[0].errMsg,
        duration: 5 * 1000,
        icon: 'none'
      })
      return res[0].errMsg
    }

    //接口调用成功
    let data = res[1].data
    //响应拦截器
    // 200 成功，501 验证失败
    if (data.code == 'Ok' || data.code == 'ValidationError') {
      //不是所有的地方，都需要提示查询成功
      return data
    }

    //500服务器错误
    uni.showToast({
      title: data.message,
      duration: 5 * 1000,
      icon: 'none'
    })
    //终止后续方法的执行
    return Promise.reject(data.message)
  })
}

//获取实际请求的全路径
function getRequestUrl(config) {
  let url = config.url
  if (config.params) {
    let arr = []
    Object.keys(config.params).forEach((key, i) => {
      if (config.params[key] != null) {
        arr.push(key + '=' + encodeURIComponent(config.params[key]))
      }
    })
    if (arr.length > 0) {
      url += '?' + arr.join('&')
    }
  }
  return url
}

export default request
