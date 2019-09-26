<template>
  <div class="hello">
    <button @click="show">{{msg}}</button>
    <div>
      <Toast v-show="showToast" :toast-info='toastInfo' @close='close' @confirm='confirm'></Toast>
    </div>
    <header class="">
      <div class="box">
        <div class="box1"><div></div></div>
        <div class="box2"><div></div></div>
      </div>
      <div class="content"></div>
    </header>
  </div>
</template>

<script>
import Toast from '../components/Toast.vue';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      showToast: false,
      toastInfo: {
        title: '商品已售完',
        image: '../../static/images/activity/商品已售完.png',
      },
    };
  },
  components: {
    Toast,
  },
  methods: {
    show() {
      this.showToast = true;
    },
    close() {
      this.showToast = false;
      // console.log('close-------->', '关闭');
    },
    confirm() {
      this.showToast = false;
      // console.log('helloWord-------->', '确定')
      // window.location.href = 'https://www.csdn.net/nav/web'
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
header {
  width: 100%;
  height: 40px;
  display: flex;
  background: #9c27b0;
  .box {
    background: #EEE;
    > div {
      width: 20px;
      height: 20px;
      overflow: hidden;
      > div {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .box1 {
      background: #9c27b0;
      div {
        left: -29px; top: 0px;
        background: #EEE;
      }
    }
    .box2 {
      left: 20px; top: 0px;
      position: relative;
      background: #EEE;
      div {
        left: 0px; top: -29px;
        background: #9c27b0;
      }
    }
  }
  .content {
    flex: 1;
    justify-content: end;
    height: 100%;
    // background: #42b983;
  }
}
</style>
