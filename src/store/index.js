import Vue from "vue";
import Vuex from "vuex";
import staff from './modules/staff';
import user from './modules/user';
import layout from './modules/layout';
import routeData from './modules/routerData';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},//简单赋值
  actions: {},//逻辑运算
  modules: {staff,user,layout,routeData}
});
