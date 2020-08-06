<template>
  <div>
    <!-- <vuedraggable class="warp" handle=".handle" v-model="list">
      <transition-group>
        <div class="item" v-for="item in list" :key="item">
          {{item}}
          <div class="handle">drag</div>
        </div>
      </transition-group>
    </vuedraggable> -->
    <vuedraggable class="warp" v-model="list" draggable=".item">
      <transition-group>
        <div class="item" v-for="item in list" :key="item">
          {{item}}
          <div class="handle">drag</div>
        </div>
      </transition-group>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable';

export default {
  name: 'vueDraggable',
  data() {
    return {
      list: [0, 2, 4, 1, 3, 5, 8, 6, 7],
    };
  },
  components: {
    vuedraggable,
  },
};
</script>

<style lang="less" scoped>
.warp {
  margin: 20px auto 0;
  width: 80%;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow-y: auto;
  padding: 20px;
  height: 400px;
 
  font-size: 20px;
  span {
    width: 100%;
     display: flex;
    flex-wrap: wrap;
  }
  .item {
    text-align: center;
    width: 120px;
    height: 70px;
    border: 1px solid #eee;
    border-radius: 10px;
    position: relative;
  }
  .item:not(:last-child) {
    margin-bottom: 10px;
  }
  // .handle {
  //   width: 80px;
  //   height: 30px;
  //   background: #eee;
  //   font-size: 20px;
  //   position: absolute;
  //   right: 0;
  //   bottom: 0;
  // }
}
</style>