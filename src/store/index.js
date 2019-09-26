import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import { getURLParameter } from '../utils/index';
import { wechat, getBBToken, getNCToken } from '../service/index';

Vue.use(Vuex);

const DelegateCode = getURLParameter('delegate_code') || process.env.DELEGATE;

const state = {
  tokenTypes: {
    mbTokenType: {
      type: 'mbToken',
      url: 'Login',
      name: `weitingWebToken_${DelegateCode}`,
      token: '',
      jwtInfo: {},
      loginApi: wechat,
    },
    bbTokenType: {
      type: 'bbToken',
      url: 'BroadbandLogin',
      name: `weitingBBToken_${DelegateCode}`,
      token: '',
      jwtInfo: {},
      loginApi: getBBToken,
    },
    ncTokenType: {
      type: 'ncToken',
      // url: 'NewCardPackages',
      url: 'BroadbandDetail',
      name: `weitingNCToken_${DelegateCode}`,
      token: '',
      jwtInfo: {},
      loginApi: getNCToken,
    },
  },
  code: '',
  // weChat
  // delegate: '2010003',
  // wxAppid: 'wx31ba03608917bf29',

  // 20180912
  // delegate: '2010005',
  // wxAppid: 'wx488e92a58d28ac83',
  //
  // 测试 20180915 割接
  // delegate: '2010005',
  // wxAppid: 'wx03ba175d13909da2',

  delegate: '',
  wxAppid: '',
  initUrl: '',
  lock: false,
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});
