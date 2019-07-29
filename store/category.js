


export const state = () => ({
  items: []
})

export const getters = {
  hasCategories(state) {
    return state.items.length > 0
  }
}

export const actions = {
  fetchCategories({state, commit, getters}) {
    if (getters.hasCategories) return

    return this.$axios.$get('/api/v1/categories')
      .then(categories => {
        commit('setCategories', categories)
        return state.items
      })
      .catch(error => Promise.reject(error))
  }
}

export const mutations = {
  setCategories(state, categories) {
    state.items = categories
  }
}
