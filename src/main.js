// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VirtualCollection from 'vue-virtual-collection';
import App from './App.vue';
import router from './router';
import './assets/css/bounceInDown.css';
import rem from './utils/rem';
import icons from './common/icons';
// import myCharts from './comm/js/myCharts';

// Vue.use(myCharts);
Vue.prototype.$icons = icons;
rem();

Vue.use(VirtualCollection);
Vue.config.productionTip = false;
Vue.config.performance = true;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
