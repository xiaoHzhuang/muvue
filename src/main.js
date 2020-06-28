import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.use(ElementUI);
Vue.config.productionTip = process.env.NODE_ENV==='production';
import '@/router/permission';
import '@/utils/commonJs';


new Vue({
  router,
  store,
  render: h => h(App),
  created() {
  },
}).$mount("#app");
