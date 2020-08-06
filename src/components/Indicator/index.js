import Vue from 'vue';

// console.log(require('./src/indicator.vue'));
const Indicator = Vue.extend(require('./src/indicator.vue').default); // eslint-disable-line
let instance;

export default {
  open(options = {}) {
    if (!instance) {
      instance = new Indicator();
    }
    if (instance.visible) return;
    instance.text = typeof options === 'string' ? options : options.text || '';
    document.body.appendChild(instance.$mount().$el);
    Vue.nextTick(() => {
      instance.visible = true;
    });
    // setTimeout(() => {
    //   this.close();
    // }, 3000);
  },

  close() {
    if (instance) {
      instance.visible = false;
    }
  },
};
