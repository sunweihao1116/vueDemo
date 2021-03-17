<template>
  <section id="app" v-cloak>
    <div class="prize_body">
      <!-- <img class="prize_body_light" src="test/cj_body_light.png" > -->
      <ul>
        <li
          v-for="(item, index) in prizeList"
          :class="'prize_li_' + item.index + (item.index == startKey ? ' curr' : '')"
          :key="index"
        >
          <p>
            <img :src="item.imgsrc" />
          </p>
          <p>{{item.prizeName}}</p>
        </li>
        <li @click="luckyDraw" class="prize_li_btn">立即抽奖</li>
      </ul>
    </div>
  </section>
</template>

<script>
export default {
  name: 'luckyDraw',
  data() {
    return {
      // 页面中奖品信息
      prizeList: [
        {
          id: '001',
          index: 1,
          imgsrc: 'https://www.baidu.com/img/bd_logo1.png',
          prizeName: '积分',
        },
        {
          id: '002',
          index: 2,
          imgsrc: 'https://www.baidu.com/img/bd_logo1.png',
          prizeName: '实物',
        },
        {
          id: '003',
          index: 3,
          imgsrc: 'https://www.baidu.com/img/bd_logo1.png',
          prizeName: '积分',
        },
        {
          id: '004',
          index: 4,
          imgsrc: 'https://www.baidu.com/img/bd_logo1.png',
          prizeName: '谢谢参与',
        },
        {
          id: '005',
          index: 5,
          imgsrc: 'https://www.baidu.com/img/bd_logo1.png',
          prizeName: '积分',
        },
        {
          id: '006',
          index: 6,
          imgsrc: 'https://www.baidu.com/img/bd_logo1.png',
          prizeName: '实物',
        },
        {
          id: '007',
          index: 7,
          imgsrc: 'https://www.baidu.com/img/bd_logo1.png',
          prizeName: '实物',
        },
        {
          id: '008',
          index: 8,
          imgsrc: 'https://www.baidu.com/img/bd_logo1.png',
          prizeName: '谢谢参与',
        },
      ],

      ifChou: null, //是否正在抽奖中
      //抽奖结果类别
      getType: null, //1.积分。2.实物
      getHasPrize: null, //是否中奖品
      //奖品滚动切换所需参数
      startKey: 0, // 展示的奖品切换的 起始 KEY
      afterKye: null, // 最终 抽到的奖品的 KEY
      flag: null, // 为true时,startKey == afterKye停止奖品切换
      timeOutNum: 100, //抽奖时的切换时间(先快，获取到抽奖结果后再慢，然后再停止)
      timer: null,
    };
  },
  mounted() {},
  methods: {
    Initialize() {
      //初始化抽奖所有相关参数
      this.startKey = 0;
      this.afterKye = null;
      this.flag = null;
      this.timeOutNum = 100;
      this.timer = null;
      this.ifChou = null;
    },
    //奖品滚动切换
    prizeChoose() {
      this.startKey += 1;
      this.startKey = this.startKey > 8 ? 1 : this.startKey;
      console.log(this.startKey);
      if (this.startKey === this.afterKye && this.flag) {
        clearTimeout(this.timer);
        // console.log(this.startKey);
        setTimeout(() => {
          if (this.getHasPrize) {
            // 中奖
            if (this.getType === 1) {
              console.log('积分');
              // 积分
            }
            if (this.getType === 2) {
              console.log('实物');
              // 实物
            }
          } else {
            // 未中奖
          }
          // alert('结束');
        }, 800);
        // return;
      }
    },
    //抽奖
    luckyDraw() {
      if (this.ifChou) {
        return;
      }
      this.ifChou = true;
      //初始化抽奖所有相关参数
      this.Initialize();
      const sendData = {
        ticket: null,
        randstr: null,
      };
      clearTimeout(this.timer);
      this.timer = setInterval(this.prizeChoose, this.timeOutNum);
      const captcha1 = new TencentCaptcha('2601855520860', res => {
        //console.log(res);
        if (res.ret === 0) {
          sendData.ticket = res.ticket;
          sendData.randstr = res.randstr;
          // loadingToast('请稍候...');
          /*test*/
          const data = {
            status: 1,
            key: 2, //后端返回：1至8的值
            //haveNubmer:9999, //次数
            hasPrize: true, //是否中奖品
            prizeName: '奖品名称', //奖品名称
            type: 2, //1.积分。2.实物
            info: '提示信息',
          };
          /*test*/
          // getAjax('获得抽奖结果' , 'get' , sendData , function(data){
          if (data.status === 1) {
            //抽奖成功
            clearTimeout(this.timer);
            this.timeOutNum = 150;
            this.timer = setInterval(this.prizeChoose, this.timeOutNum);
            //$('#haveNubmer').html(data.haveNubmer);
            this.getHasPrize = data.hasPrize; // 是否中奖品
            if (this.getHasPrize) {
              this.getType = data.type; // 1.积分。2.实物
            }
            this.afterKye = data.key;
            setTimeout(() => {
              clearTimeout(this.timer);
              this.timeOutNum = 200;
              this.timer = setInterval(this.prizeChoose, this.timeOutNum);
              setTimeout(() => {
                this.flag = true;
              }, 1500);
            }, 2000);
          } else {
            // dialog('温馨提示',data.info);
            this.Initialize();
          }
          // $('#loadingToast').fadeOut('fast');
          // })
        } else if (res.ret === 2) {
          //点击关闭按钮
          this.ifChou = null;
        }
      });
      captcha1.show();
    },
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  cursor: pointer;
}
html {
  max-width: 640px;
  margin: 0 auto;
}
body {
  font-family: "PingFangSC-Regular", "STHeitiSC-Light", "微软雅黑",
    "Microsoft YaHei", "sans-serif";
  font-size: 24px;
  line-height: 1.6;
  color: #000;
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  touch-callout: none;
}
li {
  list-style: none;
}
i {
  font-style: normal;
}
img {
  vertical-align: middle;
}

[v-cloak] {
  display: none;
}

.prize_body {
  width: 540px;
  height: 540px;
  margin: 20px auto;
  padding: 31px 0 0 31px;
  background-size: 100% 100%;
  position: relative;
}
.prize_body_light {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-animation: fadeIn 0.4s both infinite;
  animation: fadeIn 0.4s both infinite;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.prize_body ul {
  width: 478px;
  height: 478px;
  position: relative;
}
.prize_body li {
  width: 152px;
  height: 152px;
  line-height: 38px;
  text-align: center;
  color: #874ccf;
  font-size: 22px;
  border-radius: 18px;
  position: absolute;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.prize_body li:not(.prize_li_btn) {
  background-color: #fff;
}
/* .prize_li_1 , .prize_li_3 , .prize_li_5 , .prize_li_7{ color: #565656; background-color: #fff;}
.prize_li_2 , .prize_li_4 , .prize_li_6 , .prize_li_8{ color: #fff; background-color: #11a8d1;} */
.prize_body li.curr {
  color: #fff;
  background-color: #ff7c92;
}
.prize_li_1,
.prize_li_2,
.prize_li_3 {
  top: 0;
}
.prize_li_4,
.prize_li_8 {
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.prize_li_5,
.prize_li_6,
.prize_li_7 {
  bottom: 0;
}
.prize_li_1,
.prize_li_7,
.prize_li_8 {
  left: 0;
}
.prize_li_2,
.prize_li_6 {
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}
.prize_li_3,
.prize_li_4,
.prize_li_5 {
  right: 0;
}
.prize_body li:not(.prize_li_btn) img {
  width: 116px;
  height: 83px;
  object-fit: contain;
}

.prize_li_btn {
  left: 50%;
  top: 50%;
  padding-top: 5px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
</style>