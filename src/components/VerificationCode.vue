<template>
  <canvas :width="width" :height="height" id="check" @click="drawCanvas"></canvas>
</template>

<script>
// import { getHaha } from '../service'
export default {
  name: 'VerificationCode',
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    minFontSize: {
      type: Number,
    },
    maxFontSize: {
      type: Number,
    },
  },
  data() {
    return {
      ctx: '',
      ctxW: 0,
      ctxH: 0,
      code: '',
    };
  },
  mounted() {
    this.ctx = document.getElementById('check').getContext('2d');
    this.ctxW = document.getElementById('check').clientWidth;
    this.ctxH = document.getElementById('check').clientHeight;
    this.drawCanvas();
    // getHaha().then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    // 随机数
    ranNum(min, max) {
      return Math.random() * (max - min) + min;
    },
    // 随机颜色
    ranColor(min, max) {
      const r = this.ranNum(min, max);
      const g = this.ranNum(min, max);
      const b = this.ranNum(min, max);
      return `rgb(${r},${g},${b})`;
    },
    // 随机字符串数组
    ranStr() {
      const str = 'qwertyuiopasdfghjklzxcvbnm0123456789';
      // eslint-disable-next-line
      return str.split('').sort(() => {
        return Math.random() - 0.5;
      });
    },
    // 绘制文字
    drawText(canvasId, canvasW, canvasH, num, fsMin, fsMax, frMin, frMax, min, max) {
      let str = '';
      for (let i = 0; i < num; i += 1) {
        const char = this.ranStr()[Math.floor(0, this.ranStr().length)];
        const fs = this.ranNum(fsMin, fsMax);
        canvasId.font = `${fs}px Verdana`;
        canvasId.fillStyle = this.ranColor(min, max);
        // 保存绘制的状态
        canvasId.save();
        // context.translate(x,y);
        // x    添加到水平坐标（x）上的值
        // y    添加到垂直坐标（y）上的值
        // 偏移
        canvasId.translate(canvasW / num * i + canvasW / 20, 0);
        // 变换角度
        canvasId.rotate(this.ranNum(frMin, frMax) * Math.PI / 180);
        // context.fillText(text,x,y,maxWidth);
        // text    规定在画布上输出的文本。
        // x    开始绘制文本的 x 坐标位置（相对于画布）。
        // y    开始绘制文本的 y 坐标位置（相对于画布）。
        // maxWidth    可选。允许的最大文本宽度，以像素计。
        canvasId.fillText(char, 0, (canvasH + fs) / 2.5, canvasW / num);
        // 返回之前保存过的路径状态和属性
        this.ctx.restore();
        str += char;
      }
      return str;
    },
    // 绘制背景
    drawBg(canvasId, canvasW, canvasH, min, max) {
      // 绘制canvas背景
      canvasId.fillStyle = this.ranColor(min, max);
      // 填充颜色
      canvasId.fillRect(0, 0, canvasW, canvasH);
    },
    // 绘制圆
    drawCircle(canvasId, canvasW, canvasH, num, r, min, max) {
      for (let i = 0; i < num; i += 1) {
        // 开始绘制 （拿起笔）
        canvasId.beginPath();
        // context.arc(x,y,r,sAngle,eAngle,counterclockwise); （绘制）
        // x    圆的中心的 x 坐标。
        // y    圆的中心的 y 坐标。
        // r    圆的半径。
        // sAngle    起始角，以弧度计。（弧的圆形的三点钟位置是 0 度）。
        // eAngle    结束角，以弧度计。
        // counterclockwise    可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
        canvasId.arc(this.ranNum(0, canvasW), this.ranNum(0, canvasH), r, 0, 2 * Math.PI);
        // 填充颜色
        canvasId.fillStyle = this.ranColor(min, max);
        // 填充
        canvasId.fill();
        // 闭合绘制 （放开笔）
        canvasId.closePath();
      }
    },
    // 绘制线
    drawLine(canvasId, canvasW, canvasH, num, min, max) {
      for (let i = 0; i < num; i += 1) {
        // 开始绘制 （拿起笔）
        canvasId.beginPath();
        // 绘制开始点
        canvasId.moveTo(this.ranNum(0, canvasW), this.ranNum(0, canvasH));
        // 绘制结束点
        canvasId.lineTo(this.ranNum(0, canvasW), this.ranNum(0, canvasH));
        canvasId.strokeStyle = this.ranColor(min, max);
        canvasId.stroke();
        canvasId.closePath();
      }
    },
    // 绘制验证码
    drawCanvas() {
      const fsMin = this.minFontSize || 14;
      const fsMax = this.maxFontSize || 30;
      // 清空canvas
      this.ctx.clearRect(0, 0, this.ctxW, this.ctxH);
      // 绘制背景
      this.drawBg(this.ctx, this.ctxW, this.ctxH, 200, 255);
      // 绘制干扰圆点
      this.drawCircle(this.ctx, this.ctxW, this.ctxH, 10, 5, 200, 255);
      // 绘制干扰线段
      this.drawLine(this.ctx, this.ctxW, this.ctxH, 10, 0, 255);
      // 绘制验证码
      this.code = this.drawText(this.ctx, this.ctxW, this.ctxH, 4, fsMin, fsMax, -30, 30, 0, 100);
      this.$emit('getCode', this.code);
      return this.code;
    },
  },
};
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>
