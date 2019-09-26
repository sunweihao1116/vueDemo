<template>
  <div class="Toast">
    <div class="mask" @touchmove="noScroll"></div>
    <div class="toast-box bounceInDown">
      <div class="detail" :style=" mergeDetail.image ? {} : { 'justifyContent': 'center'}">
        <img class="image" v-if="mergeDetail.image" :src="mergeDetail.image" alt="">
        <div v-if="mergeDetail.title" class="title" :style="mergeDetail.titleStyles">{{mergeDetail.title}}</div>
        <div v-if="mergeDetail.info" class="info" :style="mergeDetail.infoStyles" v-html="mergeDetail.info"></div>
      </div>
      <div v-if="mergeDetail.buttonShow" class="button" :style="mergeDetail.buttonStyles" @click="confirm">{{mergeDetail.button}}</div>
      <div @click="close" class="cancel">
        <img :src="$icons.cancel" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  props: ['toastInfo'],
  data() {
    return {
      default: {
        image: '', // 图片路径
        button: '确定', // 按钮名称
        buttonShow: true, // 按钮显示隐藏
        title: '', // 标题名称
        info: '', // 提示内容
        titleStyles: {}, // 标题样式
        infoStyles: {}, // 提示样式
        buttonStyles: {}, // 按钮样式
      },
    };
  },
  computed: {
    mergeDetail() {
      return this.extend(this.default, this.toastInfo || {});
    },
  },
  methods: {
    extend(defaultConfig, obj) { // 合并对象
      Object.keys(defaultConfig).forEach(key => {
        // console.log(key);
        if (defaultConfig[key] instanceof Object) {
          if (defaultConfig[key] instanceof Array) {
            obj[key] = defaultConfig[key].concat(obj[key] || []);
          } else {
            obj[key] = Object.assign(defaultConfig[key], obj[key] || {});
          }
        }
      });
      return Object.assign(defaultConfig, obj);
    },
    confirm() {
      this.$emit('confirm');
    },
    close() {
      this.$emit('close');
    },
    noScroll(e) {
      e.preventDefault();
    },
  },
};
</script>

<style lang="less" scoped>
.Toast {
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  text-align: center;
  .mask {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    position: absolute;
  }
}
.toast-box {
  display: inline-flex;
  margin-top: 40%;
  width: 300/20rem;
  min-height: 252/20rem;
  max-height: 60%;
  padding-bottom: 30/20rem;
  background: #fff;
  border-radius: 8/20rem;
  position: relative;
  flex-direction: column;
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div {
      width: 100%;
      padding: 0 20/20rem;
    }
    .title {
      margin-bottom: 10/20rem;
      color: #333333;
      font-size: 1rem;
      font-weight: 500;
    }
    .info {
      overflow-y: auto;
      min-height: 60/20rem;
      color: #333;
      font-size: 0.7rem;
      line-height: 1.6rem;
    }
    .image {
      width: 100%;
      margin-bottom: 10/20rem;
    }
  }
  .button {
    width: 80%;
    height: 44/20rem;
    text-align: center;
    line-height: 44/20rem;
    border-radius: 100px;
    margin: 10/20rem auto 0;
    color: #fff;
    background: #F93F42;
    font-size: 0.7rem;
  }
}
.cancel {
  position: absolute;
  z-index: 999;
  bottom: -68/20rem;
  left: 0;
  right: 0;
  margin: auto;
  img {
    width: 38/20rem;
    height: 38/20rem;
  }
}
</style>
