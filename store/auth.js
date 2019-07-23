

export const state = () => ({
  user: null
})

export const getters = {
  authUser(state) {
    return state.user || null
  },
  isAuthenticated(state) {
    return !!state.user
  },
  isAdmin(state) {
    return state.user &&
           state.user.role &&
           state.user.role === 'admin'
  }
}

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
