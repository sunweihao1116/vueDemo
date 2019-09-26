<template>
  <div class="address">
    <div class="show" @click="showPicker(true)"></div>
    <input id="district" type="text" readonly placeholder="请选择区/县" v-model="shippingDistrict">
    <div v-show="pickerShow" class="mask" @click.self="showPicker(false)" @touchmove.prevent></div>
    <div v-show="pickerShow" class="picker-box">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      <p class="cancel" @click="showPicker(false)">取消</p>
      <p class="confirm" @click="showPicker(false)">确认</p>
    </div>
  </div>
</template>

<script>
import { Picker } from 'mint-ui';
import city from '../assets/js/city';

const provlevel = [...new Set(city.map(item => item.name))]; // 获取省

export default {
  name: 'address',
  data() {
    return {
      pickerShow: false,
      values: [],
      index0: 0,
      index1: 0,
      index2: 0,
      slots: [
        {
          flex: 1,
          values: provlevel,
          className: 'slot1',
          textAlign: 'center',
        },
        {
          divider: true,
          content: '-',
          className: 'slot2',
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center',
        },
        {
          divider: true,
          content: '-',
          className: 'slot4',
        },
        {
          flex: 1,
          values: [],
          className: 'slot3',
          textAlign: 'center',
        },
      ],
    };
  },
  computed: {
    // 地址信息
    shippingDistrict() {
      return `${this.values[0]}-${this.values[1]}-${this.values[2]}`;
    },
    // 获取市
    citylevel() {
      return [...new Set(city[this.index0].city.map(item => item.name))] || [];
    },
    // 获取区
    arealevel() {
      return city[this.index0].city[this.index1].area || [];
    },
  },
  components: {
    mtPicker: Picker,
  },
  created() {
    this.slots[2].values = this.citylevel;
    this.slots[4].values = this.arealevel;
  },
  methods: {
    showPicker(bol) {
      this.pickerShow = bol;
    },
    onValuesChange(picker, values) {
      this.index0 = provlevel.indexOf(values[0]);
      this.index1 = this.citylevel.indexOf(values[1]) === -1 ? 0 : this.citylevel.indexOf(values[1]);
      this.values = values;
      picker.setSlotValues(1, this.citylevel);
      picker.setSlotValues(2, this.arealevel);
    },
  },
};
</script>

<style lang="less" scoped>
.address {
  .show {
    width: 100px;
    height: 30px;
    color: #fff;
    background: #0ac50b;
    border-radius: 8px;
  }
  .mask {
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);
    overflow: hidden;
    z-index: 10;
  }
  .picker-box {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 99;
    height: 220/20rem;
    padding: 28/20rem 0 20/20rem;
    text-align: center;
    background-color: #fff;
  }
  .cancel,
  .confirm {
    height: 30/20rem;
    line-height: 30/20rem;
    width: 50/20rem;
    text-align: center;
    position: absolute;
    top: 0;
    z-index: 20;
    font-size: 15/20rem;
  }
  .cancel {
    left: 10/20rem;
  }
  .confirm {
    right: 10/20rem;
    color: #0ac50b;
  }
}
</style>
