

export const state = () => ({

})

export const actions = {
  createBlog(_, blogData) {
    return this.$axios.$post('/api/v1/blogs', blogData)
      .then(blog => blog)
      .catch(error => Promise.reject(error))
  }
}

export const mutations = {

}
