

export const state = () => ({
  heroes: []
})

export const actions = {
  fetchHeroes({state, commit}) {
    return this.$axios.$get('/api/v1/product-heroes')
      .then(heroes => {
        commit('setHeroes', heroes)
        return state.heroes
      })
  }
}

export const mutations = {
  setHeroes(state, heroes) {
    state.heroes = heroes
  }
}
