const state = {
    navState: JSON.parse(sessionStorage.getItem('navState')) || false
}
const mutations = {
    navChange(state) {
        state.navState = !state.navState
        sessionStorage.setItem('navState', JSON.stringify(state.navState))
    }
}
const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions

}

