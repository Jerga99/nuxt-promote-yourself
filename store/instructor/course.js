


export const state = () => ({
  items: [],
  item: {}
})


export const actions = {
  fetchInstructorCourses({commit}) {
    return this.$axios.$get('/api/v1/products/user-products')
      .then((courses) => {
        commit('setCourses', courses)
        return state.items
      })
      .catch(error => Promise.reject(error))
  },
  fetchCourseById({commit, state}, courseId) {
    return this.$axios.$get(`/api/v1/products/${courseId}`)
      .then(course => {
        commit('setCourse', course)
        return state.item
      })
  },
  createCourse(_, courseData) {
    return this.$axios.$post('/api/v1/products', courseData)
  }
}

export const mutations = {
  setCourses(state, courses) {
    state.items = courses
  },
  setCourse(state, course) {
    state.item = course
  }
}








