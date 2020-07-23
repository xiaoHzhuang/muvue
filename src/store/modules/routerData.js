import { defaultRouter, addRouter } from "@/router/index"

const state = {
    routers: [],// 所有有权限的路由表，用来生成菜单列表
    addRouters: []//模块下的对应的动态路由表
}

const mutations = {
    setRouters: (state) => {
        state.addRouters = addRouter; // 保存动态路由用来addRouter
        let tempDefaultRouters = [...defaultRouter];
        let tempAddRouters=[...addRouter];
        state.routers = tempDefaultRouters.concat(tempAddRouters); // 所有有权限的路由表，用来生成菜单列表
    },
    initRoutes: (state) => {
        state.routers = defaultRouter;
    },
    newRoutes: (state) => {
        commit("setRouters")
    }
}

const actions = {
    addRouters({ commit }, routersArray) {
        commit('setRouters', routersArray);
    },
    initRoutes({ commit }) {
        commit('initRoutes');
    },
    newRoutes({ commit }) {
        commit('setRouters');
    }
}

const getters = {
    routers: state => state.routers,
    addRouters: state => state.addRouters,
}

export default {
    state,
    getters,
    mutations,
    actions
}