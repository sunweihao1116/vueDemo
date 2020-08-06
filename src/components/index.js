import Vue from 'vue';
import Indicator from './Indicator';

const install = Vue => { // eslint-disable-line
  Vue.$indicator = Vue.prototype.$indicator = Indicator; // eslint-disable-line
};
install(Vue);

export default {
  install,
  Indicator,
};
