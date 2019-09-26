<template>
  <div class="content">
    <div v-for="(item, index) in 10" :key="index">
      <div class="active"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listHover',
  data() {
    return {
      list: [],
    };
  },
};
</script>

<style lang="less">
.content {
  > div {
    display: inline-block;
    width: 200px;
    height: 100px;
    background: red;
    margin: 0 20px 20px 0;
    position: relative;
    cursor: pointer;
    .active {
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      display: none;
    }
  }
  > div:hover .active {
    display: block;
  }
}
</style>