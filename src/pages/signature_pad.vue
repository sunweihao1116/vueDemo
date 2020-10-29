<template>
  <div class="content">
    <div class="canvas-box">
      <canvas :width="width" :height="height"></canvas>
    </div>
    <div class="operation">
      <div class="save" @click="save">save</div>
      <div class="clear" @click="clear">clear</div>
    </div>
  </div>
</template>

<script>
// 无纸化
import SignaturePad from 'signature_pad';

export default {
  name: 'signaturePad',
  data() {
    return {
      width: '',
      height: '',
      signaturePad: '',
      base64: '',
    };
  },
  mounted() {
    const canvas = document.querySelector('canvas');
    this.height = document.getElementsByClassName('canvas-box')[0].offsetHeight;
    this.width = document.getElementsByClassName('canvas-box')[0].offsetWidth;
    this.signaturePad = new SignaturePad(canvas);
    window.addEventListener('resize', this.resizeCanvas);
    this.resizeCanvas();
  },
  methods: {
    resizeCanvas() {
      console.log('window.devicePixelRatio', window.devicePixelRatio);
      const canvas = document.querySelector('canvas');
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext('2d').scale(ratio, ratio);
      this.signaturePad.clear();
    },
    save() {
      if (this.signaturePad.isEmpty()) {
        this.$Indicator.open('请签名');
      } else {
        this.base64 = this.signaturePad.toDataURL();
        console.log(this.signaturePad.toDataURL());
        this.signaturePad.off();
      }
    },
    clear() {
      this.signaturePad.clear();
      this.signaturePad.on();
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  padding: 20px;
}
.canvas-box {
  width: 100%;
  height: 500px;
}
canvas {
  border: 1px solid #0084ff;
  // box-shadow: 2px 6px 100px #0084ff;
}
.operation {
  margin-top: 20px; 
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  > div {
    padding: 4px 10px;
    border: 1px solid #0084ff;
  }
}
</style>