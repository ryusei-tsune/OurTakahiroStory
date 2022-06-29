export const state = () => ({
  // $store.state.name
  name: '',
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
    state.name = payload.data
  },
}
export const actions = {
  //$store.dispatch("action")
  action({ commit, dispatch, state }, payload) {
    commit('mutation', payload)
  },
}
