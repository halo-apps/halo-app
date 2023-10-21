//获取请求接口的地址和参数
export function getApiUrl(query) {
  let newQuery = JSON.parse(JSON.stringify(query))
  delete newQuery.route
  let queryString = serialize(newQuery)
  let result = `${query.route}${queryString}`
  return result
}

//从菜单信息获取跳转地址
export function getUrlFromMenu(menu) {
  let segments = menu.url.split('?')
  let queryString = `?route=${segments[0]}`
  if (segments.length > 1) {
    queryString += `&${segments[1]}`
  }
  let result = `/src/pages/standards/${menu.pageType}${queryString}`
  return result
}

//把对象序列化成查询字符串
//不使用qs,是防止qs.stringify编码后的字符串，小程序没法自动识别
export function serialize(query) {
  let keys = Object.keys(query)
  if (keys.length > 0) {
    let result = '?'
    keys.forEach((n, i) => {
      result += `${n}=${query[n]}`
      if (i != keys.length - 1)
        result += "&"
    })
    return result
  }
  return ''
}

//反序列化成对象
export function deserialize(queryString) {
  let segments = queryString.split('?')
  let result = {}
  let pars = segments[1].split('&')
  pars.forEach(par => {
    let kv = par.split('=')
    result[kv[0]] = kv[1]
  })
  return result
}
