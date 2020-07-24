import { getCategory } from "api/news.js";
const state = {
    categorys: []
}
const mutations = {
    setCategorys(state, value) {
        state.categorys = value
        localStorage.setItem('categorys',JSON.stringify(state.categorys))
    }
    
}
const actions = {
    //获取分类信息
    getCategoryFn({ commit }) {
        getCategory().then((val) => {
            if (val.resCode === 0) {
                let newArr = val.data.data.sort((a, b) => { 
                    return a.id - b.id;
                });
                commit('setCategorys', newArr)
            }
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}

