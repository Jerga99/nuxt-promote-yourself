

export const state = () => ({
  item: null
})


export const actions = {
  createHero({commit, state}, courseHeroData) {
    return this.$axios.$post('/api/v1/product-heroes', courseHeroData)
      .then(hero => {
        commit('setHero', hero)
        return state.item
      })
      .catch(error => Promise.reject(error))
  }
}

export const mutations = {
  setHero(state, hero) {
    state.item = hero
  }
}
