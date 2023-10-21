import {getSetting} from "../../api/system";

const state = {
  setting: null,//系统配置信息
}

const mutations = {
  SET_SETTING: (state, setting) => {
    state.setting = setting
    document.title = setting.name
  }
}


const actions = {
  //获取系统配置
  getSetting({commit, state}) {
    return new Promise((resolve, reject) => {
      getSetting().then(({data}) => {
        commit('SET_SETTING', data)
        resolve(data)
      }).catch(() => {
        reject()
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
