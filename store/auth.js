

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
  },
  getAuthUser({commit, getters, state}) {
    const authUser = getters.authUser

    if (authUser) { return Promise.resolve(authUser) }

    return this.$axios.$get('/api/v1/users/me')
      .then((user) => {
        commit('setAuthUser', user)
        return state.user
      })
      .catch((error) => {
        commit('setAuthUser', null)
        return Promise.reject(error)
      })
  }
}

export const mutations = {
  setAuthUser(state, user) {
    state.user = user
  }
}










