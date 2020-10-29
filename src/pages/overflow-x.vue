<template>
  <div class="overflow-x">
    <ul>
      <li v-for="(item, index) in 30" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  // 横向滚动
  export default {
    name: 'overflowX',
    data() {
      return {
      };
    },
    mounted() {
    },
  };
</script>

<style lang="less" scoped>
.overflow-x {
  overflow: hidden;
  // ul {
  //   width: 100%;
  //   display: flex;
  //   flex-wrap: wrap;
  //   overflow-x: auto;
  //   li {
  //     flex-shrink: 0;
  //     flex-basis: 100px;
  //     list-style: none;
  //     text-align: center;
  //     border: 1px solid #e5e5e5;
  //   }
  // }
  ul {
      overflow-y: hidden;
      white-space: nowrap;
  }
  li {
      display: inline-block;
      width: 90px;
  }
}
</style>