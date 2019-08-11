import Vue from 'vue'


function separateBlogs(blogs) {
  const published = []
  const drafts = []

  blogs.forEach(blog => {
    blog.status === 'active' ? drafts.push(blog) : published.push(blog)
  })

  return {published, drafts}
}

export const state = () => ({
  items: {
    drafts: [],
    published: []
  },
  item: {},
  isSaving: false
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
  },
  fetchUserBlogs({commit, state}) {
    return this.$axios.$get('/api/v1/blogs/me')
      .then(blogs => {
        const { published, drafts } = separateBlogs(blogs)
        commit('setBlogs', {resource: 'drafts', items: drafts})
        commit('setBlogs', {resource: 'published', items: published})

        return { published, drafts }
      })
  },
  deleteBlog({commit, state}, blog) {
    const resource = blog.status === 'active' ? 'drafts' : 'published'
    return this.$axios.$delete(`/api/v1/blogs/${blog._id}`)
      .then(_ => {
        const index = state.items[resource].findIndex((b) => b._id === blog._id )
        commit('deleteBlog', {resource, index})
        return true
      })
      .catch(error => Promise.reject(error))
  },
  updatePublishedBlog({commit, state}, {id, data}) {
    return this.$axios.$patch(`/api/v1/blogs/${id}`, data)
      .then(blog => {
        const index = state.items['published'].findIndex(b => b._id === id)
        commit('setPublishedBlog', {index, blog})
        return blog
      })
      .catch(error => Promise.reject(error))
  },
  updateBlog({commit, state}, {data, id}) {
    commit('setIsSaving', true)
    return this.$axios.$patch(`/api/v1/blogs/${id}`, data)
      .then(blog => {
        commit('setBlog', blog)
        commit('setIsSaving', false)
        return state.item
      })
      .catch(error => {
        commit('setIsSaving', false)
        return Promise.reject(error)
      })
  }
}

export const mutations = {
  setBlog(state, blog) {
    state.item = blog
  },
  setPublishedBlog(state, {index, blog}) {
    Vue.set(state.items.published, index, blog)
  },
  setBlogs(state, {resource, items}) {
    state.items[resource] = items
  },
  deleteBlog(state, {resource, index}) {
    state.items[resource].splice(index, 1)
  },
  setIsSaving(state, isSaving) {
    state.isSaving = isSaving
  }
}






