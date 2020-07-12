import { loginIn } from "api/login.js";
import { setToken, setUserName, removeToken, removeUserName } from 'utils/app.js'
const state = {
    userData: '',
    to_ken: ''
}
const mutations = {
    SET_USERNAME(state, value) {
        state.userData = value
    },
    SET_TOKEN(state, value) {
        state.to_ken = value
    },
    logout(state, value) {
        state.userData = ''
        state.to_ken = ''
    }
}
const actions = {
    login({ commit }, value) {
        return new Promise((resolve, reject) => {
            loginIn(value).then(response => {
                let data = response.data
                commit('SET_USERNAME', data.username)
                commit('SET_TOKEN', data.token)
                setToken(data.token)
                setUserName(data.username)
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    exit({ commit }, value) {
        return new Promise((resolve, reject) => {
            removeToken()
            removeUserName()
            commit('logout')
            resolve()
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
