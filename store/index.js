export const state = () => ({
  // $store.state.name
  name: '',
  lat: null,
  lng: null,
})
export const getters = {
  //$store.getters["computed"]
  computed(state) {
    return state.name
  },
}
export const mutations = {
  //$store.commit("mutation")
  mutation(state, payload) {
    state.name = payload.name
    state.lat = payload.lat
    state.lng = payload.lng
  },
}
export const actions = {
  //$store.dispatch("action")
  action({ commit, dispatch, state }, payload) {
    commit('mutation', payload)
  },
}
