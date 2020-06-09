import { setToken, setUser, getToken, getUser } from '@/utils/auth'
import { login } from '@/api/login'
const user = {
    state: {
        token: getToken(),
        user: getUser()
    },
    mutations: {
        SET_TOKEN(state, token) {
            state.token = token;
            setToken(token);
        },
        SET_USER(state, user) {
            state.user = user;
            setUser(user);
        }
    },
    actions: {
        Login({ commit }, form) {
            return new Promise((resolve, reject) => {
                login(form.username.trim(), form.password).then(response => {
                    const resp = response.data;
                    if(resp.status==1){
                       const respData=resp.data;
                        commit('SET_TOKEN', respData.token);
                        commit('SET_USER', respData.userName);
                        resolve(respData);
                    }
              
                }).catch(errpr => {
                    reject(error)
                })
            })
        }
    }
}

export default user