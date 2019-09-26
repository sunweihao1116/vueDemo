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
const upload = () => import(/* webpackChunkName: "elTree" */ '@/pages/facein-view');
const listHover = () => import(/* webpackChunkName: "listHover" */ '@/pages/listHover');
const vueDraggable = () => import(/* webpackChunkName: "vueDraggable" */ '@/pages/vueDraggable');

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/list-hover',
      name: 'listHover',
      component: listHover,
    },
    {
      path: '/upload',
      name: '',
      component: upload,
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
  ],
});
