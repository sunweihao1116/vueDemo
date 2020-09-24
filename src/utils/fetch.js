import axios from 'axios';

const fetch = (url, params, method) => {
  const config = {
    url,
    method: method.toLocaleUpperCase() || 'GET',
  };
  if (config.method === 'GET' || config.method === 'DELETE') {
    config.params = params;
  } else {
    config.data = params;
  }
  if (!config.url) {
    return;
  }
  config.data = config.data || {};
  return new Promise((resolve, reject) => {
    axios(config).then(res => {
      const data = res.data;
      resolve(data);
    }).catch(err => {
      const error = { message: '请求失败' };
      if (err.message) {
        error.message = err.message;
      }
      reject(error);
    });
  });
};
export default fetch;
