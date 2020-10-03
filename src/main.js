import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/myIcon.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.use(ElementUI);
Vue.config.productionTip = process.env.NODE_ENV === 'production';
import '@/router/permission';
import '@/utils/commonJs';
import i18n from './i18n/i18n';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created() {
  }
}).$mount("#app");
