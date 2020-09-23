// Promises/A+: https://promisesaplus.com/
// new MyPromise
// then 的链式调用&值穿透特性
const PANDING = 'PANDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

// 链式调用
const resolvePromise = (myPromise2, x, resolve, reject) => {
  // 自己等待自己完成是错误的实现，用一个类型错误，结束掉 promise
  if (myPromise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  // Promise/A+ 2.3.3.3.3 只能调用一次
  let called = false;
  // 后续的条件要严格判断 保证代码能和别的库一起使用
  if ((typeof x === 'object' && x != null) || typeof x === 'function') {
    try {
      const then = x.then;
      if (typeof then === 'function') {
        then.call(x, y => {
          called = true;
          // 递归解析的过程
          resolvePromise(myPromise2, y, resolve, reject);
        }, r => {
          called = true;
          reject(r);
        });
      } else {
        // 如果 x.then 是个普通值就直接返回 resolve 作为结果
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};

class MyPromise {
  constructor(executor) {
    // 默认状态 PANDING
    this.status = PANDING;
    // 存放成功状态的值 默认 undefined
    this.value = undefined;
    // 存放失败状态的值 默认 undefinde
    this.reason = undefined;
    // 存放成功回调
    this.onResolvedCallbacks = [];
    // 存放失败回调
    this.onRejectedCallbacks = [];

    // 调用此方法就是成功
    const resolve = value => {
      if (this.status === PANDING) { // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
        this.status = FULFILLED;
        this.value = value;
        // 依次触发成功回调
        this.onResolvedCallbacks.forEach(fn => fn()); // 发布订阅模式，这种收集依赖(padding) -> 触发通知(resolve/reject) -> 取出依赖执行的方式，
      }
    };

    // 调用此方法就是失败
    const reject = reason => {
      if (this.status === PANDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      // 立即执行，将 resolve 和 reject 函数传给使用者
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // 包含一个 then 方法，并接收两个参数 onFulfilled、onRejected
  then(onFulfilled, onRejected) {
    // 解决 onFufilled，onRejected 没有传值的问题
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    // 因为错误的值要让后面访问到，所以这里也要跑出个错误，不然会在之后 then 的 resolve 中捕获
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err; };

    // 每次调用 then 都返回一个新的 promise
    const myPromise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            // x可能是一个proimise
            resolvePromise(myPromise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(myPromise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }

      if (this.status === PANDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(myPromise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(myPromise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return myPromise2;
  }
}
// test
const promise = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    reject('失败');
  }, 3000);
});
promise.then().then().then(data => {
  console.log('data--->', data);
}, err => {
  console.log('err--->', err);
}).then(data => {
  console.log('222--->data', data); // undefined
}, err => {
  console.log('222--->err', err);
});

// 对比
const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('失败'); // eslint-disable-line prefer-promise-reject-errors
  }, 3000);
});
promise2.then().then().then(data => {
  console.log('Promise-data--->', data);
}, err => {
  console.log('Promise-err--->', err);
}).then(data => {
  console.log('Promise-222--->data', data); // undefined
}, err => {
  console.log('Promise-222--->err', err);
});
