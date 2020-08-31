import router from '@/router/index';
import { getUserInfo } from "@/api/login/login";
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
        //如果已经初始化菜单完毕
        if (initMenuFlag) {
            //已经存在token并且左侧路由菜单已经初始化完毕，不允许跳转登录页面
            if (to.path === '/login' || to.path === '/register') {
                next();
                // next("/");
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

        //已经存在token不允许跳转登录页面
        // if (to.path === '/login' || to.path === '/register') {
        //     next("/");
        // } else {
        //     const userInfo = store.getters.user;
        //     store.dispatch('initRoutes');
        //     //如果当前用户信息存在
        //     if (userInfo) {
        //         next();
        //         store.dispatch("addTab", {
        //             title: title,
        //             path: path
        //         });
        //     }
        //     //如果当前用户信息不存在
        //     else {
        //         getUserInfo(token).then(response => {
        //             const resp = response.data;
        //             if (resp.flag) {
        //                 localStorage.setItem('my-vue-user', resp.userName);
        //                 next();
        //                 store.dispatch("addTab", {
        //                     title: title,
        //                     path: path
        //                 });
        //             } else {
        //                 next({ path: '/login' })
        //             }
        //         })
        //     }
        // }
    }
})