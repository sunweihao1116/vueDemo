<template>
  <div class="water">
    <VirtualCollection
      :cellSizeAndPositionGetter="cellSizeAndPositionGetter"
      :collection="items"
      :height="h"
      :width="w"
    >
      <div slot="cell" slot-scope="props">{{props.data}}</div>
    </VirtualCollection>
  </div>
</template>

<script>
export default {
  name: 'water',
  data() {
    return {
      w: 0,
      h: 0,
      items: new Array(100).fill(0).map((_, index) => ({ data: `#${index}` })),
    };
  },
  mounted() {
    this.w = document.getElementsByClassName('water')[0].clientWidth;
    this.h = document.getElementsByClassName('water')[0].clientHeight;
  },
  methods: {
    rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    cellSizeAndPositionGetter(item, index) {
      const obj = {
        width: 100,
        height: 150,
        x: (index % 3) * 100,
        y: parseInt(index / 3) * 160,
      };
      return obj;
    },
  },
};
</script>

<style>
.cell-container {
  border: 1px solid #ccc;
}
</style>

<style scoped>
.water {
  width: 100%;
  height: 100vh;
  overflow-y: auto;
}
</style>
