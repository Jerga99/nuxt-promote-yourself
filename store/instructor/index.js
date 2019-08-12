

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
  },
  activateHero({commit}, heroId) {
    return this.$axios.$patch(`/api/v1/product-heroes/${heroId}`)
      .then(activeHero => {
        commit('hero/setHero', activeHero, {root: true})
        return activeHero
      })
      .catch(error => Promise.reject(error))
  }
}

export const mutations = {
  setHeroes(state, heroes) {
    state.heroes = heroes
  }
}
