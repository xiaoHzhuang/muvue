import { defaultRouter } from "@/router/index"

const state = {
    routers: [],// 所有有权限的路由表，用来生成菜单列表
    addRouters: []//模块下的对应的动态路由表
}

const mutations = {
    setRouters: (state, routers) => {
        state.addRouters = routers; // 保存动态路由用来addRouter
        let container = new Set();
        for (let router of routers) {
            container.add(router.path);
        }
        for (let router of state.routers) {
            if (router.path == "/") {
                for (let childRouter of router.children) {
                        if(container.has(childRouter.path)){
                            childRouter.hidden=false;
                        }else{
                            childRouter.hidden=true;
                        }
                }
            }
        }
    },
    initRoutes: (state) => {
        state.routers = defaultRouter;
    }
}

const actions = {
    addRouters({ commit }, routersArray) {
        commit('setRouters', routersArray);
    },
    initRoutes({ commit }) {
        commit('initRoutes');
    }
}

const getters = {
    routers: state => state.routers,
}

export default {
    state,
    getters,
    mutations,
    actions
}