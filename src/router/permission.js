import router from '@/router/index';
import {getUserInfo} from "@/api/login";
import store from '@/store/index';

router.beforeEach((to,from,next)=>{
    const token=store.state.user.token;
    if(!token){
        if(to.path!=='/login' && to.path!=='/register'){
            next({path:'/login'})
        }else{
            next()
        }
    }else{
        if(to.path==='/login'){
            next();
        }else{
            const userInfo=store.state.user.user;
            store.dispatch('initRoutes');
            if(userInfo){
                next();
            }else{
                getUserInfo(token).then(response=>{
                    const resp=response.data;
                    if(resp.flag){
                        localStorage.setItem('my-vue-user',resp.userName);
                        next();
                    }else{
                        next({path:'/login'})
                    }
                })
            }
        }
    }
})
