const state = {
    isCollapse: false,
    logoShow: false,
}

const getters={
    isCollapse(state){
        return state.isCollapse;
    },
    logoShow(state){
        return state.logoShow;
    }
}

const mutations = {
    collapse(state, arg) {
        state.isCollapse = !state.isCollapse
        if (state.logoShow) {
            setTimeout(function () {
                state.logoShow = false
            }, 300)
        } else {
            state.logoShow = true
        }
    },
}

const actions = {
    collapse({ commit }, arg) {
        commit('collapse', arg)
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}