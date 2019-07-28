


export const state = () => ({
  items: []
})


export const actions = {
  fetchInstructorCourses({commit}) {
    return this.$axios.$get('/api/v1/products/user-products')
      .then((courses) => {
        commit('setCourses', courses)
        return state.items
      })
      .catch(error => Promise.reject(error))
  }
}

export const mutations = {
  setCourses(state, courses) {
    state.items = courses
  }
}
