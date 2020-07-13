import router from '@/router/index';
import { getUserInfo } from "@/api/login/login";
import store from '@/store/index';

router.beforeEach((to, from, next) => {
    let title = to.meta.title;
    let path = to.path;
    const token = store.state.user.token;
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
        if (to.path === '/login') {
            next();
        } else {
            const userInfo = store.state.user.user;
            store.dispatch('initRoutes');
            //如果当前用户信息存在
            if (userInfo) {
                next();
                store.dispatch("addTab", {
                    title: title,
                    path: path
                });
            }
            //如果当前用户信息不存在
            else {
                getUserInfo(token).then(response => {
                    const resp = response.data;
                    if (resp.flag) {
                        localStorage.setItem('my-vue-user', resp.userName);
                        next();
                        store.dispatch("addTab", {
                            title: title,
                            path: path
                        });
                    } else {
                        next({ path: '/login' })
                    }
                })
            }
        }
    }
})