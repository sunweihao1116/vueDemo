<template>
  <div class="piano" tabindex="0" @keydown="kdown($event)">
    piano
    <ul class="key" ref="ul" @mousedown="down" @mouseup="up">
      <li v-for="(item, index) in list" :value="item.key" :key="index" @mouseover="over($event, item.key)" @mousedown="clk($event, item.key)">{{item.num}}<br>{{item.key}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'piano',
  data() {
    return {
      list: [
        {
          key: 49,
          num: 1,
        },
        {
          key: 50,
          num: 2,
        },
        {
          key: 51,
          num: 3,
        },
        {
          key: 52,
          num: 4,
        },
        {
          key: 53,
          num: 5,
        },
        {
          key: 54,
          num: 6,
        },
        {
          key: 55,
          num: 7,
        },
        {
          key: 56,
          num: 8,
        },
        {
          key: 57,
          num: 9,
        },
        {
          key: 48,
          num: 0,
        },
      ],
      keyFlag: false,
    };
  },
  methods: {
    kdown(e) {
      this.list.forEach(element => {
        if (e.keyCode === element.key) {
          // console.log(element.num);
        }
      });
    },
    clk(e, key) {
      const box = this.$refs.ul;
      box.childNodes.forEach(item => {
        // console.dir(item.value === key)
        if (item.value === key) {
          // console.dir(key);
        }
      });
    },
    over(e, key) {
      if (this.keyFlag) {
        // eslint-disable-next-line
        console.log(key);
      }
    },
    down() {
      this.keyFlag = true;
    },
    up() {
      this.keyFlag = false;
    },
  },
};
</script>

<style lang="less" scoped>
.piano {
  height: 100%;
}
ul {
  width: 100%;
  display: flex;
  li {
    flex: 1;
    border: 1px solid #000;
    height: 200px;
    list-style: none;
    text-align: center;
  }
}
</style>
