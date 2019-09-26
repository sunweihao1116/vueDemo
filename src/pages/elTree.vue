<template>
  <div class="content">
    <el-tree
      :data="data"
      :props="defaultProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      :render-content="renderContent">
    </el-tree>
  </div>
</template>

<script>
import Vue from 'vue';
import { Tree, Input, Button } from 'element-ui';

Vue.use(Input);

export default {
  name: 'elT',
  components: {
    elTree: Tree,
    // elInput: Input,
    elButton: Button,
  },
  data() {
    return {
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1',
          }, {
            id: 10,
            label: '三级 1-1-2',
          }],
        }],
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1',
        }, {
          id: 6,
          label: '二级 2-2',
        }],
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1',
        }, {
          id: 8,
          label: '二级 3-2',
        }],
      }],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
    };
  },
  methods: {
    inputChange(value, node) {
      // console.log(node);
      if (node.level === 1) {
        let i = 0;
        // eslint-disable-next-line
        this.data.forEach((element, index) => {
          if (element.id === node.data.id) {
            i = index;
          }
        });
        this.data[i].label = value;
      }
      if (node.level === 2) {
        this.data.forEach(element => {
          element.children.forEach(() => {
            // console.log(e);
          });
        });
      }
    },
    renderContent(h, { node, data }) { // jsx渲染dom树
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px; height: 60px">
          <span>
            <input
              placeholder="请输入内容"
              value={node.label}
              on-input={(e) => this.inputChange(e.target.value, node, data)}
              />
          </span>
        </span>);
    },
  },
};
</script>

<style lang="less" scoped>
.content /deep/ .el-tree-node__content {
  height: 42px;
}
</style>
