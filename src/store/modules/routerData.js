import { defaultRouter } from "@/router/index"

const state = {
    defaultRouters: [],
}

const mutations = {
    setRouters: (state, routers) => {
        state.addRouters = routers // 保存动态路由用来addRouter
        state.routers = defaultRouters.concat(routers) // 所有有权限的路由表，用来生成菜单列表
    },
    initRoutes: (state)=>{
        state.defaultRouters = defaultRouter;
    }
}


const actions = {
    addRouters({ commit, routersArray }) {
        commit('setRouters', routersArray);
    },
    initRoutes({ commit}) {
        commit('initRoutes');
    }
}

const getters = {
    routers: state => state.defaultRouters,
}


export default {
    state,
    getters,
    mutations,
    actions
}