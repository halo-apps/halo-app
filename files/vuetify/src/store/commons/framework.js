const state = {
  token: null,
}


const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
}


const actions = {
  // user login
  login({commit}, userInfo) {
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
