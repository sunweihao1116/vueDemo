<template>
  <div>
    dataPicker
    <el-date-picker
      v-model="time"
      type="daterange"
      value-format=''
      range-separator="至"
      start-placeholder="开始日期"
      :picker-options="pickerOptions"
      end-placeholder="结束日期">
    </el-date-picker>
    <iframe id="iframe" name="iframe" src="https://dev.10010sh.cn/qrCode/CardBussiness/LoadingPage?developer_code=3111154720&user_code=AGT042997&channel_code=31b1wia&activity_uuid=0CKnEA3lQvyTQBW90uHPAvQ&commodity_id=580000001211336962&is_test=1"></iframe>
  </div>
</template>

<script>
import { DatePicker } from 'element-ui';

export default {
  name: 'Picker',
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => { // eslint-disable-line
          if (this._date) return time.getTime() > this._date.getTime() + 30 * 24 * 60 * 60 * 1000 || time.getTime() < this._date.getTime() - 30 * 24 * 60 * 60 * 1000;
        },
        onPick: (t) => {
          if (!this._date) this._date = t.minDate;
          if (t.minDate && t.maxDate) this._date = null;
        },
      },
      time: [],
      arr: [], // 棋子位置数组
      N: 0, // 棋盘长度
      frequency: 0, //次数
      selectIndex: 0, //选中棋子数组所在位置
      count: 0,
    };
  },
  components: {
    elDatePicker: DatePicker,
  },
  mounted() {
    window.addEventListener('message', message => {
      const { data } = message;
      if (data === 'true') {
        console.log('message from child:', data);
      }
      // document.body.style.background = 'red';
    }, false);
    // this.initCheckerboard();
    // this.initPiece();
  },
  methods: {
    rend(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    initCheckerboard() {
      this.N = this.rend(10, 30);
    },
    initPiece() { // 初始化棋子位置
      const num = this.rend(1, this.N / 2); // 棋子数
      for (let i = 1; i <= num; i += 1) { // index 为 0 清楚
        this.position(num); // 获取棋子位置数组
      }
      const arr = JSON.parse(JSON.stringify(this.arr));
      arr.sort((a, b) => { // eslint-disable-line
        return a - b;
      });
      console.log('-------------------------------------------------------->');
      let sum = 0;
      arr.forEach(item => {
        sum += item;
      });
      // console.log('棋盘数组---', JSON.stringify(this.arr));
      // console.log('最大值', JSON.stringify(arr[arr.length - 1]));
      // console.log('棋子个数', arr.length);
      // console.log('棋子个数 + 最大值', arr[arr.length - 1] + arr.length);
      console.log('棋子位置总和', sum);
      this.gamePlayer();
    },
    position(num) { // 位置信息
      const position = this.rend(1, this.N);
      if (this.arr.indexOf(position) !== -1) {
        this.position(num);
        return;
      }
      this.arr.push(position);
    },
    gamePlayer() {
      setTimeout(() => {
        if (this.arr.length > 0) {
          this.frequency += 1;
          let selectPiece = this.selectPieceFn(); // 获取选中棋子位置；
          // console.log('选中棋子所在数组里的index---', this.selectIndex, selectPiece);
          ////////////////////////////// 1. 右无子可走1步           2.右1有子 右2无子 可走2步
          // if (this.arr.indexOf(selectPiece - 1) !== -1) { // 右1有子，走两步
          //   selectPiece -= 2;
          // } else { // 右1无子，走一步  if (this.arr.indexOf(selectPiece - 1) === -1);
          //   selectPiece -= 1;
          // }
          ////////////////////////////// 1. 右无子可走1步           2.右1有子 右2有子 可走3步
          if (this.arr.indexOf(selectPiece - 1) === -1) { // 右1无子，走1步
            selectPiece -= 1;
          } else { // 右1有子 右2有子 走3步
            selectPiece -= 3;
          }
          this.arr[this.selectIndex] = selectPiece;
          if (selectPiece === 0) {
            this.arr.splice(this.selectIndex, 1);
          }
          this.gamePlayer();
          // console.log('每次数组变化--->', JSON.stringify(this.arr));
        } else {
          console.log('总次数---', this.frequency);
          this.frequency = 0;
          this.count += 1;
          if (this.count >= 10) return; // 10次循环
          this.initCheckerboard();
          this.initPiece();
        }
      }, 10);
    },
    selectPieceFn() { // 选择棋子
      this.selectIndex = this.rend(0, this.arr.length - 1); // 随机获取一个棋子位置
      const selectPiece = this.arr[this.selectIndex];
      ////////////////////////////// 1. 右无子可走1步           2.右1有子 右2无子 可走2步
      // if ((this.arr.indexOf(selectPiece - 1) !== -1 && this.arr.indexOf(selectPiece - 2) !== -1 && selectPiece >= 3) || (this.arr.indexOf(selectPiece - 1) !== -1 && selectPiece < 2)) {
      //   // 1 --- 没法走棋 右1 右2均有棋子; 2 --- 右1有子 且 选中棋子位置小于3 即无法走棋;
      //   return this.selectPieceFn();
      // }
      ////////////////////////////// 1. 右无子可走1步           2.右1有子 右2有子 可走3步
      if ((this.arr.indexOf(selectPiece - 1) !== -1 && this.arr.indexOf(selectPiece - 2) === -1 && selectPiece >= 3)) { // 右1有子右2无子 并且位置大于等于3时， 无法走棋
        return this.selectPieceFn();
      }
      if (this.arr.indexOf(selectPiece - 1) !== -1 && this.arr.indexOf(selectPiece - 2) !== -1 && this.arr.indexOf(selectPiece - 3) !== -1 && selectPiece > 3) { // 右1到右3都有子 并且位置大于3时 无法走棋
        return this.selectPieceFn();
      }
      if (selectPiece === 2 && this.arr.indexOf(selectPiece - 1) !== -1) { // 等于2 并且有1 无法走棋
        return this.selectPieceFn();
      }
      return selectPiece;
    },
  },
};
</script>

<style lang="less">
  #iframe {
    width: 100%;
    height: 500px;
  }
</style>