


export const mutations = {
  setItems(state, {resource, items}) {
    state[resource].items = items
  }
}

export const actions = {
  async nuxtServerInit({commit, dispatch}) {
    await dispatch('auth/getAuthUser').catch(() => console.log('Not Authenticated!'))
    await dispatch('hero/fetchHero').catch(() => console.log('Cannot fetch page data'))
  }
}
