const state = {
    //左侧导航树折叠状态
    isCollapse: false,
    logoShow: false,
    //当前导航栏中被选中的对象
    currentNav: {
        title: '首页',
        path: '/home',
        meta: { title: "首页" },
    },
    //导航栏
    tabnavBox: [
        {
            title: '首页',
            path: '/home',
            meta: { title: "首页" },
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
    closeSelectedTag(state, arg) {
        let index = state.tabnavBox.findIndex(function (value, key) {
            return value.path === arg.tabItem.path
        })
        state.tabnavBox.splice(index, 1)
        if (arg.tabItem.path === arg.fullPath) {
            //优先选中后面的导航Tab
            let tabActive = state.tabnavBox[index] || state.tabnavBox[index - 1]
            arg.router.push(tabActive.path)
            state.currentNav = tabActive;
        }
    },
    addTab(state, arg) {
        state.currentNav = arg;
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
            path: '/home',
            meta: { title: "首页" },
        }]
        if (arg.all) {
            arg.router.push('/home')
            return false
        }
        state.tabnavBox.push(arg.tabItem)
        arg.router.push(arg.tabItem.path)
        state.currentNav = arg.tabItem;
    },
    removeAllTab(state, arg) {
        state.tabnavBox = [{
            title: '首页',
            path: '/home',
            meta: { title: "首页" },
        }]
        if(state.currentNav.path=="/home"){
            return;
        }
        arg.router.push('/home');
    }
}

const actions = {
    collapse({ commit }, arg) {
        commit('collapse', arg)
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
    removeAllTab({ commit }, arg) {
        commit('removeAllTab', arg)
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}