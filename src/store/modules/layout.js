const state = {
    isCollapse: false,
    logoShow: false,
    tabnavBox: [
        {
            title: '首页',
            path: '/home'
        },
        {
            title: '员工管理',
            path: '/staff'
        }
    ]
}

const getters = {
    isCollapse(state) {
        return state.isCollapse;
    },
    logoShow(state) {
        return state.logoShow;
    },
    tabnavBox: state => state.tabnavBox,
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
    removeTab(state, tabPath) {
        state.tabnavBox = state.tabnavBox.filter(tab => tab.path !== tabPath);
    },
    addTab(state, arg) {
        for (let i = 0; i < state.tabnavBox.length; i++) {
            if (state.tabnavBox[i].path === arg.path) {
                return;
            }
        }
        state.tabnavBox.push({
            title: arg.title,
            path: arg.path
        })
    }
}

const actions = {
    collapse({ commit }, arg) {
        commit('collapse', arg)
    },
    removeTab({ commit }, arg) {
        console.log("  removeTab({ commit }, arg) :" + arg);
        commit('removeTab', arg.tabPath);
    },
    addTab({ commit }, arg) {
        commit('addTab', arg)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}