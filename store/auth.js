

export const state = () => ({
  user: null
})


export const actions = {
  login({commit, state}, loginData) {
    return this.$axios.$post('/api/v1/users/login', loginData)
      .then(user => {
        commit('setAuthUser', user)
        return state.user
      })
      .catch(error => Promise.reject(error))
  }
}

export const mutations = {
  setAuthUser(state, user) {
    state.user = user
  }
}
