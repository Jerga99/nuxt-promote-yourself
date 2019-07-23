

export const state = () => ({
  user: null
})


export const actions = {
  login({commit}, loginData) {
    debugger
    return this.$axios.$post('/api/v1/users/login', loginData)
      .then(user => {
        debugger
        commit('setAuthUser', user)
      })
      .catch(error => {
        return Promise.reject(error)
      })
  }
}

export const mutations = {
  setAuthUser(state, user) {
    state.user = user
  }
}
