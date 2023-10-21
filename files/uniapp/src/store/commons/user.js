import {
  login,
  logout,
  getInfo,
  getMenu
} from '../../api/user'

const state = {
  token: null,
  login: uni.getStorageSync('login'), //登陆后的用户信息
  user: null,
  menu: null, //菜单信息
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    //要同步调用，否则无法立马拉取菜单
    uni.setStorageSync('token', token)
  },
  SET_LOGIN: (state, login) => {
    state.login = login
    //要同步调用，否则无法立马拉取菜单
    uni.setStorageSync('login', login)
  },
  SET_USER: (state, user) => {
    state.user = user
    uni.setStorage({
      key: 'user',
      data: user
    })
  },
  SET_MENU: (state, menu) => {
    state.menu = menu
  }
}

const actions = {
  //登录,并保存身份凭据
  login({
    commit
  }, form) {
    return new Promise((resolve, reject) => {
      login(form).then(({
        data
      }) => {
        commit('SET_LOGIN', data)
        //只保存token
        commit('SET_TOKEN', data.token)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  //登录完成后,获取用户信息
  getInfo({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(({
          data
        }) => {
          commit('SET_USER', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  //获取菜单
  getMenu({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      getMenu()
        .then(({
          data
        }) => {
          commit('SET_MENU', data)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  //退出，自动清除token
  logout({
    commit,
    state
  }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', null)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
