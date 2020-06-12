const state = {
    isCollapse: false,
    logoShow: false,
    currentNav: {},
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
    currentNav: state => state.currentNav
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
    closeSelectedTag(state, arg) {
        let index = state.tabnavBox.findIndex(function (value, key) {
            return value.path === arg.tabItem.path
        })
        state.tabnavBox.splice(index, 1)
        if (arg.tabItem.path === arg.fullPath) {
            let tabActive = state.tabnavBox[index] || state.tabnavBox[index - 1]
            arg.router.push(tabActive.path)
        }
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
    },
    openMenu(state, arg) {
        state.currentNav = arg
    },
    removeOtherTab(state, arg) {
        state.tabnavBox = [{
            title: '首页',
            path: '/home'
        }]
        if (arg.all) {
            arg.router.push('/home')
            return false
        }
        debugger
        state.tabnavBox.push(arg.tabItem)
        arg.router.push(arg.tabItem.path)
    },
}

const actions = {
    collapse({ commit }, arg) {
        commit('collapse', arg)
    },
    removeTab({ commit }, arg) {
        commit('removeTab', arg.tabPath);
    },
    closeSelectedTag({ commit }, arg) {
        commit('closeSelectedTag', arg)
    },
    addTab({ commit }, arg) {
        commit('addTab', arg)
    },
    openMenu({ commit }, arg) {
        commit('openMenu', arg)
    },
    removeOtherTab({ commit }, arg) {
        commit('removeOtherTab', arg)
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}