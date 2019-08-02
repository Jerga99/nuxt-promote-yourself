

export const state = () => ({
  item: {}
})

export const actions = {
  createBlog(_, blogData) {
    return this.$axios.$post('/api/v1/blogs', blogData)
      .then(blog => blog)
      .catch(error => Promise.reject(error))
  },
  fetchBlogById({commit}, blogId) {
    return this.$axios.$get(`/api/v1/blogs/${blogId}`)
      .then(blog => commit('setBlog', blog))
  }
}

export const mutations = {
  setBlog(state, blog) {
    state.item = blog
  }
}
