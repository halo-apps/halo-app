import {
  getSettings
} from '../../plugins/settings-helper.js'

const state = {
  settings: null, //当前环境的配置信息
  title: null, //表示下一个要显示页面的标题
}

const mutations = {
  SET_TITLE: (state, title) => {
    state.title = title
  },
  SET_SETTINGS: (state, settings) => {
    state.settings = settings
  },
}

const actions = {
  //设置下一个要进入的页面标题，防止显示默认标题
  setTitle({
    commit
  }, title) {
    commit('SET_TITLE', title)
  },
  getSettings({
    commit
  }, settings) {
    return new Promise((resolve, reject) => {
      getSettings().then(settings => {
        commit('SET_SETTINGS', settings)
        resolve(settings)
      }).catch((res) => {
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
