<template>
  <transition>
    <div class="indicator" v-show="visible">
      <div class="indicator-box">
        <div class="indicator-text" v-show="text">{{ text }}</div>
      </div>
      <div class="indicator-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
      };
    },
    props: {
      text: String,
    },
  };
</script>
<style scoped lang="less">
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    z-index: 10000;
    .indicator-box {
      margin: 300px auto 0;
    }
    .indicator-text {
      width: 160px;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      margin: auto;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }
  }
</style>>
