<template>
  <div class="box">
    <div class="content">
      <div class="type" :style="{width: `${types.length * 20}vw`}">
        <div 
          class="list" 
          v-for="(item, index) in types" 
          :key="index" 
          :class="Number(selectIndex) === index ? 'active': ''" 
          @click="selectIndex = index">
          {{item}}</div>
      </div>
    </div>
    <div>type-----{{types[selectIndex]}}</div>
  </div>
</template>

<script>
export default {
  name: 'scrollLeft',
  data() {
    return {
      types: ['HBS1', 'HBS2', 'HBS3', 'HBS4', 'HBS5', 'HBS6', 'HBS7', 'HBS8', 'HBS9', 'HBS10', 'HBS11', 'HBS12'],
      selectIndex: 0,
    };
  },
  mounted() {
    this.selectIndex = this.$route.query.index || 0;
    document.getElementsByClassName('content')[0].scrollLeft = document.getElementsByClassName('type')[0].children[this.selectIndex].offsetLeft;
  },
};
</script>

<style lang="less" scoped>
.content {
  overflow-x: auto;
  .type {
    > div {
      display: inline-block;
      width: 20vw;
      height: 40px;
      text-align: center;
      line-height: 40px;
    }
    > div.active {
      border-bottom: 2px solid #0ff;
    }
  }
}
</style>