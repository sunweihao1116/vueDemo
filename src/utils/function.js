// 防止重复提交
export const createSubmitHandler = (fn) => {
  let isSubmitting = false
  return async function (...args) {
    if (isSubmitting) {
      console.log('请勿重复提交')
      return
    }
    isSubmitting = true
    try {
      // 等待异步操作完成
      const result = await fn.apply(this, args)
      return result
    } finally {
      isSubmitting = false // 无论成功失败都解锁
    }
  }
};

// 初始化多请求回调
export const initAsyncRequests = (requests, onComplete) => {
  return function() {
    const promises = requests.map(fn => {
      try {
        return Promise.resolve(fn()).catch(e => e);
      } catch (e) {
        return Promise.resolve(e);
      }
    });
    Promise.allSettled(promises).finally(onComplete);
  };
};
