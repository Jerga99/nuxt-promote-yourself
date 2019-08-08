



export const state = () => ({
  items: {
    all: [],
    featured: []
  }
})

export const actions = {
  fetchBlogs({commit, state}) {
    return this.$axios.$get('/api/v1/blogs')
      .then(data => {
        debugger
        const { blogs } = data
        commit('setBlogs', {resource: 'all', blogs})
        return state.items.all
      })
      .catch(error => Promise.reject(error))
  }
}


export const mutations = {
  setBlogs(state, {resource, blogs}) {
    state.items[resource] = blogs
  }
}
