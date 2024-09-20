// new Promise
const PANDING = 'PANDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';

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
      console.log('run resolve');
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PANDING) {
        this.status = FULFILLED;
        this.value = value;
        // 依次触发成功回调
        this.onResolvedCallbacks.forEach(fn => fn()); // 发布订阅模式，这种收集依赖 -> 触发通知 -> 取出依赖执行的方式，
      }
    };

    // 调用此方法就是失败
    const reject = reason => {
      console.log('run reject');
      // 状态为 PENDING 时才可以更新状态，防止 executor 中调用了两次 resovle/reject 方法
      if (this.status === PANDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 依次触发失败回调
        this.onRejectedCallbacks.forEach(fn => fn()); // 发布订阅模式，这种收集依赖 -> 触发通知 -> 取出依赖执行的方式，
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
    if (this.status === FULFILLED) {
      console.log('run FULFILLED');
      onFulfilled(this.value);
    }

    if (this.status === REJECTED) {
      console.log('run REJECTED');
      onRejected(this.reason);
    }

    if (this.status === PANDING) { // 解决异步问题
      console.log('run PANDING');
      // 如果promise的状态是 pending，需要将 onFulfilled 和 onRejected 函数存放起来，等待状态确定后，再依次将对应的函数执行
      this.onResolvedCallbacks.push(() => {
        onFulfilled(this.value);
      });

      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason);
      });
    }
  }
}

// test run code
const promise = new MyPromise((resolve, reject) => {
  reject('失败');
  // setTimeout(() => {
  //   resolve('成功');
  // }, 3000);
});
promise.then(
  data => {
    console.log('success', data);
  },
  err => {
    console.log('faild', err);
  },
);

