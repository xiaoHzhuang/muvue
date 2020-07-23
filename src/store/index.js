import Vue from "vue";
import Vuex from "vuex";
import staff from './modules/staff';
import layout from './modules/layout';
import routeData from './modules/routerData';
import { setToken, setUser, getToken, getUser } from '@/utils/auth';
import { login } from '@/api/login/login';
import { removeToken } from "../utils/auth";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: getToken(),
    user: getUser(),
    initMenuFlag: false
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      setToken(token);
    },
    SET_USER(state, user) {
      state.user = user;
      setUser(user);
    },
    removeToken(state) {
      state.token = null;
      state.user = null;
     state.initMenuFlag= false
      removeToken();
    },
    initMenu(state) {
      state.initMenuFlag = true;
    }
  },//简单赋值
  actions: {
    Login({ commit }, form) {
      return new Promise((resolve, reject) => {
        login(form.username.trim(), form.password).then(response => {
          const resp = response.data;
          if (resp.status == 1) {
            const respData = resp.data;
            commit('SET_TOKEN', respData.token);
            commit('SET_USER', respData.userName);
            resolve(resp);
          } else {
            resolve(resp);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    removeToken({ commit }) {
      commit('removeToken');
    },
    initMenu({ commit }) {
      commit('initMenu');
    }
  },//逻辑运算
  modules: { staff, layout, routeData },
  getters: {
    token: state => state.token,
    user: state => state.user,
    initMenuFlag:state=>state.initMenuFlag,
  }
});
