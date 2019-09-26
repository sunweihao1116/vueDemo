<template>
  <div class="box">
    <div @click="change" class="verify" :style="{'backgroundImage': '../assets/logo.png'}">
      <span :style="{'color': color1, transform: `rotate(${rotate1}deg)`}">{{a}}</span>
      <span>{{c}}</span>
      <span :style="{'color': color2, transform: `rotate(${rotate2}deg)`}">{{b}}</span>
      <span>=</span>
      <span :style="{'color': color3, transform: `rotate(${rotate3}deg)`}">?</span>
    </div>
    <input class="input" type="number" v-model="sum">
    <button class="button" @click="confirm">确定</button>
  </div>
</template>

<script>
import { rand } from '../utils/random';

export default {
  name: 'verify',
  data() {
    return {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      background: '',
      color1: '',
      color2: '',
      color3: '',
      rotate1: 0,
      rotate2: 0,
      rotate3: 0,
      sum: '',
    };
  },
  created() {
    this.change();
  },
  methods: {
    getColor() {
      return `#${Math.floor(Math.random() * 16770000).toString(16)}`;
    },
    change() {
      this.a = rand(8, 15);
      this.b = rand(0, 8);
      this.c = rand(0, 2);
      this.rotate1 = rand(-45, 45);
      this.rotate2 = rand(-45, 45);
      this.rotate3 = rand(-45, 45);
      if (this.c === 0) {
        this.d = this.a + this.b;
      } else if (this.c === 1) {
        this.d = this.a - this.b;
      } else {
        this.d = this.a * this.b;
      }
      switch (this.c) {
        case 0:
          this.c = '+';
          break;
        case 1:
          this.c = '-';
          break;
        default:
          this.c = '*';
          break;
      }
      this.background = this.getColor();
      this.color1 = this.getColor();
      this.color2 = this.getColor();
    },
    confirm() {
      if (Number(this.sum) === this.d) {
        //eslint-disable-next-line
        console.log('验证成功');
      } else {
        //eslint-disable-next-line
        console.log('验证失败');
        this.change();
      }
    },
  },
};
</script>

<style scoped>
.box {
  display: flex;
  align-items: center;
}
.verify {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
}
.verify span {
  margin: 0 3px;
}
.input {
  width: 80px;
  height: 30px;
  border: 1px solid #eee;
  background: #eee;
  border-radius: 5px;
  outline: none;
  margin: 0 20px 0 10px;
  padding-left: 10px;
}
.button {
  width: 40px;
  height: 30px;
  border-radius: 5px;
  background: #eee;
  outline: none;
}
</style>
