import Vue from 'vue';
import Router from 'vue-router';

const HelloWorld = () => import(/* webpackChunkName: "Navigation" */ '@/pages/HelloWorld');
const code = () => import(/* webpackChunkName: "Navigation" */ '@/pages/code');
const verify = () => import(/* webpackChunkName: "Navigation" */ '@/pages/verify');
const water = () => import(/* webpackChunkName: "Navigation" */ '@/pages/water');
const piano = () => import(/* webpackChunkName: "Navigation" */ '@/pages/piano');
const address = () => import(/* webpackChunkName: "Navigation" */ '@/pages/address');
const echarts = () => import(/* webpackChunkName: "Navigation" */ '@/pages/echarts');
const elTree = () => import(/* webpackChunkName: "elTree" */ '@/pages/elTree');
const tab = () => import(/* webpackChunkName: "elTree" */ '@/pages/tab');
const scrollLeft = () => import(/* webpackChunkName: "elTree" */ '@/pages/scrollLeft');
const listHover = () => import(/* webpackChunkName: "listHover" */ '@/pages/listHover');
const vueDraggable = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/vueDraggable');
const datePicker = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/datePicker');
const overFlowX = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/overflow-x');
const selectDom = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/selectDom');
const Login = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/Login');
const takePhoto = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/takePhoto');
const faceinView = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/facein-view');
const signaturePad = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/signature_pad');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/signaturePad',
      name: 'signaturePad',
      component: signaturePad,
    },
    {
      path: '/faceinView',
      name: 'faceinView',
      component: faceinView,
    },
    {
      path: '/list-hover',
      name: 'listHover',
      component: listHover,
    },
    {
      path: '/select',
      name: 'selectDom',
      component: selectDom,
    },
    {
      path: '/overflow-x',
      component: overFlowX,
    },
    {
      path: '/',
      name: 'Code',
      component: code,
    },
    {
      path: '/verify',
      name: 'verify',
      component: verify,
    },
    {
      path: '/scrollLeft',
      name: 'scrollLeft',
      component: scrollLeft,
    },
    {
      path: '/water',
      name: 'water',
      component: water,
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/piano',
      name: 'piano',
      component: piano,
    },
    {
      path: '/address',
      name: 'address',
      component: address,
    },
    {
      path: '/echarts',
      name: 'echarts',
      component: echarts,
    },
    {
      path: '/el-tree',
      name: 'elT',
      component: elTree,
    },
    {
      path: '/tab',
      name: 'tab',
      component: tab,
    },
    {
      path: '/drag',
      name: 'vueDraggable',
      component: vueDraggable,
    },
    {
      path: '/date-picker',
      name: 'datePicker',
      component: datePicker,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/takePhoto',
      name: 'takePhoto',
      component: takePhoto,
    },
  ],
});
