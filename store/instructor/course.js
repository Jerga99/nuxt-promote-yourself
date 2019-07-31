


export const state = () => ({
  items: [],
  item: {},
  canUpdateCourse: false
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
  },
  updateCourse({state, commit}) {
    const course = state.item
    return this.$axios.$patch(`/api/v1/products/${course._id}`, course)
      .then(course => {
        commit('setCourse', course)
        commit('setCanUpdateCourse', false)
        return state.item
      })
      .catch(error => Promise.reject(error))
  },
  // TODO: cache previous value and verify if you can update course
  // TODO: set canUpdate only when course values has beed updated
  updateLine({commit}, {index, value, field}) {
    commit('setLineValue', {index, value, field})
    commit('setCanUpdateCourse', true)
  },
  updateCourseValue({commit}, {value, field}) {
    commit('setCourseValue', {value, field})
    commit('setCanUpdateCourse', true)
  }
}

export const mutations = {
  setCourses(state, courses) {
    state.items = courses
  },
  setCourse(state, course) {
    state.item = course
  },
  setCourseValue(state, {value, field}) {
    state.item[field] = value
  },
  setCanUpdateCourse(state, canUpdate) {
    state.canUpdateCourse = canUpdate
  },
  addLine(state, field) {
    state.item[field].push({value: ''})
  },
  removeLine(state, {field, index}) {
    state.item[field].splice(index, 1)
  },
  setLineValue(state, {index, value, field}) {
    state.item[field][index].value = value
  }
}








