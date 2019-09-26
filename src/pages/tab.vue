<template>
  <div class="box">
    <div class="tabs">
      <div 
        v-for="(item, index) in tab" 
        :key="index" 
        @click="selectIndex = index" 
        :class="index === selectIndex ? 'active':''">{{item}}</div>
    </div>
    <div>{{tab[selectIndex]}}</div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  data() {
    return {
      selectIndex: 0,
      tab: ['tab1', 'tab2', 'tab3'],
    };
  },
};
</script>

<style lang="less" scoped>
.tabs {
  display: flex;
  div {
    flex: 1;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border-bottom: 2px solid #fff;
    background: #f0f;
  }
  div.active {
    border-bottom: 2px solid #f00;
  }
}
</style>