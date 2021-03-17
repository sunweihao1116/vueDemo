import Vue from 'vue';
import Router from 'vue-router';

const HelloWorld = () => import(/* webpackChunkName: "HelloWorld" */ '@/pages/HelloWorld');
const code = () => import(/* webpackChunkName: "Navigation" */ '@/pages/code');
const verify = () => import(/* webpackChunkName: "verify" */ '@/pages/verify');
const water = () => import(/* webpackChunkName: "water" */ '@/pages/water');
const piano = () => import(/* webpackChunkName: "piano" */ '@/pages/piano');
const address = () => import(/* webpackChunkName: "address" */ '@/pages/address');
const echarts = () => import(/* webpackChunkName: "echarts" */ '@/pages/echarts');
const elTree = () => import(/* webpackChunkName: "elTree" */ '@/pages/elTree');
const tab = () => import(/* webpackChunkName: "tab" */ '@/pages/tab');
const scrollLeft = () => import(/* webpackChunkName: "scrollLeft" */ '@/pages/scrollLeft');
const listHover = () => import(/* webpackChunkName: "listHover" */ '@/pages/listHover');
const vueDraggable = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/vueDraggable');
const datePicker = () => import(/* webpackChunkName: "datePicker" */ '@/pages/datePicker');
const overFlowX = () => import(/* webpackChunkName: "overFlowX" */ '@/pages/overflow-x');
const selectDom = () => import(/* webpackChunkName: "selectDom" */ '@/pages/selectDom');
const Login = () => import(/* webpackChunkName: "Login" */ '@/pages/Login');
const takePhoto = () => import(/* webpackChunkName: "takePhoto" */ '@/pages/takePhoto');
const faceinView = () => import(/* webpackChunkName: "faceinView" */ '@/pages/facein-view');
const signaturePad = () => import(/* webpackChunkName: "signaturePad" */ '@/pages/signature_pad');
const luckyDraw = () => import(/* webpackChunkName: "windowDemo" */ '@/pages/luckyDraw');

const novel = () => import(/* webpackChunkName: "novel" */ '@/pages/yqkxs/yqkxs');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/luckyDraw',
      name: 'luckyDraw',
      component: luckyDraw,
    },
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
    // novel
    {
      path: '/novel/:id',
      component: novel,
    },
  ],
});
