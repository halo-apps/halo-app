import {getMenu, submitLogin} from "../../api/user";
import {getToken, setToken} from "../../plugins/auth";
import {getRouteFromUrl} from "../../plugins/url-helper";
import store from "../index";
import PageType from "../../views/PageType";
import Layout from "../../views/Layout";

const state = {
  token: null,//用户登录标识（有值表示登录）
  menu: null, //菜单接口数据
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  // user login
  login({commit}, form) {
    return new Promise((resolve, reject) => {
      submitLogin(form).then(({data}) => {
        commit('SET_TOKEN', data.token)
        resolve(data.token)
      }).catch(() => {
        reject()
      })
    })
  },
  //获取用户菜单信息
  getMenu({commit, state}) {
    return new Promise((resolve, reject) => {
      //菜单已加载，自动忽略
      getMenu().then(({data}) => {
        commit('SET_MENU', data)
        let routes = getRoutes(data)
        resolve(routes)
      }).catch(() => {
        reject()
      })
    })
  },
  //获取令牌
  getToken({commit, state}) {
    let token = getToken()
    if (token)
      commit('SET_TOKEN', token)
    return token
  }
}

//根据路径获取路由信息
export function getMenuByPath(path) {
  for (let i = 0; i < state.menu.menus.length; i++) {
    let menu = state.menu.menus[i]
    let tmp = getMenuChildrenByPath(menu, path)
    if (tmp) {
      return tmp//跳出并结束执行
    }
  }
  return null
}

//根据路径获取菜单信息
function getMenuChildrenByPath(menu, path) {
  if (menu.url == path)
    return menu
  for (let i = 0; i < menu.children; i++) {
    let child = menu.children[i]
    if (child.url == path)
      return child
    else
      return getMenuChildrenByPath(child, path)
  }
}

//填充子路由信息
function getRouteChildren(menu, route) {
  if (!route.children)
    route.children = []
  //动态构建路由
  menu.children.forEach(child => {
    let tmp = getRoute(child)
    getRouteChildren(child, tmp)
    route.children.push(tmp)
  })
  return route
}

//填充路由信息
function getRoute(menu) {
  let urlRoute = getRouteFromUrl(menu.url)
  let route = {
    name: menu.id,
    path: urlRoute.path,
    meta: {title: menu.name, pageType: menu.pageType},
    component: PageType
  }
  return route
}

//递归处理得到Vue路由信息
function getRoutes(menu) {
  let setting = store.state.system.setting
  let redirect = getRouteFromUrl(setting.home)
  let root = {
    path: '/',
    redirect: redirect,
    component: Layout,
    meta: {title: setting.name},
    children: []
  }

  menu.menus.forEach(item => {
    let route = getRoute(item)
    getRouteChildren(item, route)
    root.children.push(route)
  })

  //构建隐藏路由
  menu.hidden.forEach(item => {
    let route = getRoute(item)
    root.children.push(route)
  })
  return [root]
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
