import qs from 'qs'
import store from '../store'

export function getRouteFromUrl(url) {
  let segments = url.split('?')
  let result = {path: null, query: {}}
  if (segments.length > 1) {
    result.path = segments[0]
    result.query = qs.parse(segments[1])
  } else if (segments.length == 1) {
    result.path = segments[0]
  }
  return result
}

export function getRouteFromLink(link, row) {
  let href = link.href //防止更改原变量
  link.values.forEach(value => {
    href = link.href.replace(`{${value}}`, row[value])
  })
  let route = getRouteFromUrl(href)
  return route
}

export function generateMenuAndBack($route) {
  let result = {
    m: $route.query.m,
    return_url: $route.fullPath
  }
  // console.log(decodeURIComponent(result.return_url))
  return result
}

export function getPageTitle(title) {
  let name = store.state.system.setting.name
  let systemName = name ? name : '加载中...'
  if (title) {
    return `${title} - ${systemName}`
  }
  return `${systemName}`
}
