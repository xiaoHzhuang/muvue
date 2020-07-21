import { defaultRouter,layOutRouter,essentialRouters} from "@/router/index"

const state = {
    routers: [],// 所有有权限的路由表，用来生成菜单列表
    addRouters:[]//模块下的对应的动态路由表
}

const mutations = {
    setRouters: (state, routers) => {
        // state.addRouters = routers // 保存动态路由用来addRouter
        // const tempLayOutRouter=layOutRouter;
        // for(let i=0;i<tempLayOutRouter[0].children.length;i++){
        //     routers.push(tempLayOutRouter[0].children[i]);
        // }
        // const layOutRouterChildren=routers;
        // tempLayOutRouter[0].children=layOutRouterChildren;
        // const tempEssentialRouters=essentialRouters;
        // const tempDefaultRouter=tempEssentialRouters.concat(tempLayOutRouter);
        // state.routers = tempDefaultRouter; 
    },
    initRoutes: (state)=>{
        state.routers = defaultRouter;
    }
}

const actions = {
    addRouters({ commit },routersArray) {
        commit('setRouters', routersArray);
    },
    initRoutes({ commit}) {
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