export const state = () => ({
  // $store.state.name
  currentPos: null,
  name: '',
  goalPos: null,
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
    state.goalPos = { lat: payload.lat, lng: payload.lng }
  },
  currentPos(state, payload) {
    state.currentPos = { lat: payload.lat, lng: payload.lng }
  },
}
export const actions = {
  //$store.dispatch("action")
  action({ commit, dispatch, state }, payload) {
    commit('mutation', payload)
  },
}
