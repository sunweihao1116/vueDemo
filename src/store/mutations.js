/* eslint no-param-reassign: ["error", { "props": false }] */
import base64 from '../utils/base64';

const parseToken = t => {
  const i = t.split('.')[1];
  return JSON.parse(base64.decode(i));
};

export default {
  DELEGATE_CHANGE(state, val) {
    state.delegate = val;
  },
  FONTRATE_CHANGE(state, val) {
    state.fontRate = val;
  },
  CODE_CHANGE(state, val) {
    state.code = val;
  }
};
