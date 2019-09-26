<template>
  <div class="echarts">
    <!-- <mt-swipe :auto="4000" @change="handleChange" :showIndicators="false">
      <mt-swipe-item>
        <div class="echart" style="width: 100vw; height: 500px" id="dom2"></div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div class="echart" style="width: 100vw; height: 500px" id="dom1"></div>
      </mt-swipe-item>
    </mt-swipe> -->
    <!-- element -->
    <el-carousel trigger="click" height="500px" indicator-position="outside" arrow="always">
      <el-carousel-item v-for="item in 3" :key="item" :label='`示例${item}`'>
        <div class="echart" style="width: 100vw; height: 500px" :id="`dom${item}`">{{item}}{{lala}}</div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import echarts from 'echarts';

export default {
  name: 'echarts',
  data() {
    return {
      // eslint-disable-next-line
      lala: BigInt(1234567878987654321345678765431),
      option1: {
        backgroundColor: '#2c343c',
        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1],
          },
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 274, name: '联盟广告' },
              { value: 235, name: '视频广告' },
              { value: 400, name: '搜索引擎' },
              // eslint-disable-next-line
            ].sort((a, b) => { return a.value - b.value; }),
            roseType: 'radius',
            label: {
              normal: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)',
                },
                smooth: 0.2,
                length: 10,
                length2: 20,
              },
            },
            itemStyle: {
              normal: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            // eslint-disable-next-line
            animationDelay: () => {
              return Math.random() * 200;
            },
          },
        ],
      },
      option2: {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {},
        }],
      },
    };
  },
  components: {
    mtSwipe: Swipe,
    mtSwipeItem: SwipeItem,
    elCarousel: Carousel,
    elCarouselItem: CarouselItem,
  },
  mounted() {
    const dom1 = document.getElementById('dom1');
    const myChart1 = echarts.init(dom1);
    myChart1.setOption(this.option1);
    const dom3 = document.getElementById('dom3');
    const myChart3 = echarts.init(dom3);
    myChart3.setOption(this.option2);
  },
  methods: {
    // handleChange(index) {
    //   console.log(index);
    // },
  },
};
</script>

<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 100%;
  background: red;
  .echart {
    height: 300px;
    
  }
}
</style>

