import router from '@/router/index';
import store from '@/store/index';

router.beforeEach((to, from, next) => {
    let title = to.meta.title;
    let path = to.path;
    const token = store.getters.token;
    //如果没有token信息
    if (!token) {
        if (to.path !== '/login' && to.path !== '/register') {
            next({ path: '/login' })
        } else {
            next()
        }
    }
    //如果含有token信息
    else {
        let initMenuFlag = store.getters.initMenuFlag;
        console.log("初始化左侧菜单："+initMenuFlag);
        //如果已经初始化菜单完毕
        if (initMenuFlag) {
            //已经存在token并且左侧路由菜单已经初始化完毕，不允许跳转登录页面
            if (to.path === '/login' || to.path === '/register') {
                next();
            } else {
                store.dispatch("addTab", {
                    title: title,
                    path: path
                });
                next();
            }
        } else {
            //初始化左侧路由菜单
            store.dispatch("newRoutes");
            store.dispatch("initMenu");
            router.addRoutes(store.getters.addRouters)
            next("/");
        }
    }
})