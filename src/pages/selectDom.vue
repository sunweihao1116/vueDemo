<template>
  <div class="select">
    <!-- <header>select</header> -->
    <!-- <table border="1">
      <thead>
        <tr>
          <td>
            <input type="checkbox" v-model="allSelect" @change="allSelectChange">
          </td>
          <td>全选</td>
        </tr>
      </thead>
      <tr v-for="(item, index) in userList" :key="index">
        <td>
            <div :class="{red: item.select}" @click="change(item)"></div>
        </td>
        <td>{{item.name}}</td>
      </tr>
    </table>
    <div @click="button">确定</div> -->
    <div class="list" v-for="(item, index) in allList" :key="index" >
      <div class="left">left</div>
      <div class="right">
        <div class="right-content" @click="select(item, index)">right-content</div>
        <div class="label" :class="{active: showLabel && index === selectIndex}">
          label
          <p>sss</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'selectDom',
    data() {
      return {
        allList: [
          {
            id: '1',
            name: 'sss1',
          },
          {
            id: '2',
            name: 'sss2',
          },
          {
            id: '3',
            name: 'sss3',
          },
          {
            id: '4',
            name: 'sss4',
          },
          {
            id: '5',
            name: 'sss5',
          },
          {
            id: '6',
            name: 'sss6',
          },
        ],
        selectIndex: 0,
        showLabel: false,
      };
    },
    methods: {
      select(ittem, index) {
        this.showLabel = true;
        this.selectIndex = index;
      },
    },
  };
</script>

<style lang="less" scoped>
.select {
  font-size: 20px;
  .list {
    display: flex;
    .left {
      width: 100px;
      text-align: center;
      border: 1px solid #eee;
      margin-right: 20px;
    }
    .right {
      .label {
        height: 0;
        max-height: 0;
        overflow: hidden;
        transition: all 0.8s;
      }
      .active {
        height: auto;
        max-height: 200px;
      }
    }
  }
}
</style>