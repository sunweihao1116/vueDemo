<template>
  <div class="hello" :class="{'hide': flag}">
    <div class="code">
      <span>请输入验证码：</span>
      <input type="text" v-model="verificationCode">
      <VerificationCode
      :width='100'
      :height='30'
      @getCode='getCode'
      ></VerificationCode>
    </div>
    <p>*请区分大小写</p>
    <div class="button">
      <div @click='verification' >确定</div>
    </div>
    <div class="mask" v-show="flag" ></div>
    <div class="picker-box" :class="{'active': flag}">
      <div class="picker-header">
        <p @click="pickerButton(false)">取消</p>
        <h3>安装时间</h3>
        <p @click="pickerButton(true)" style="color: green">确定</p>
      </div>
      <mt-picker :slots="slots" @change="onValuesChange" :valueKey="'value'" ></mt-picker>
    </div>
    <div @click="toLogin">toLogin</div>
    <img hidden ref="imgFile" src="../assets/logo.png" alt="">
    <!-- <mt-datetime-picker
      ref="picker"
      type="date"
      v-model="pickerValue"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker> -->
  </div>
</template>

<script>
import { DatetimePicker, Picker } from 'mint-ui';
import VerificationCode from '../components/VerificationCode.vue';

export default {
  name: 'Code',
  data() {
    return {
      flag: false,
      code: '',
      verificationCode: '',
      pickerValue: '',
      dateTime: [],
      slots: [
        {
          flex: 1,
          values: ['9月10日', '9月11日', '9月12日', '9月13日', '9月14日', '9月15日'],
          className: 'slot1',
          textAlign: 'center',
        }, {
          divider: true,
          content: '-',
          className: 'slot2',
        }, {
          flex: 1,
          values: [
            {
              type: 1,
              value: '9:00-12:00',
            },
            {
              type: 2,
              value: '12:00-18:00',
            },
            {
              type: 3,
              value: '18:00-20:00',
            },
          ],
          className: 'slot3',
          textAlign: 'center',
        },
      ],
    };
  },
  components: {
    VerificationCode,
    mtDatetimePicker: DatetimePicker,
    mtPicker: Picker,
  },
  mounted() {
    const file = this.$refs.imgFile;
    console.dir(this.dataURLtoFile(file.src, 'file'));
  },
  methods: {
    dataURLtoFile(dataurl, filename) {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) { // eslint-disable-line
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    onValuesChange(picker, values) {
      this.dateTime = values;
    },
    getCode(code) {
      this.code = code;
    },
    pickerButton(boor) {
      if (!boor) {
        this.dateTime = [];
      }
      this.flag = false;
    },
    verification() {
      this.flag = true;
      // if (this.verificationCode === this.code) {
      //   console.log('success')
      // } else {
      //   console.log('error')
      // }
    },
    toLogin() {
      this.$router.replace({ path: 'Login', query: { url: this.$route.fullPath } });
    },
  },
};
</script>

<style scoped>
.hide {
  overflow: hidden;
}
.mask {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, .5);
}
.picker-box {
  position: fixed;
  height: 210px;
  width: 100vw;
  background: #666;
  left: 0;
  bottom: -210px;
  opacity: 0;
  transition: all 0.4s;
  background: #fff;
}
.picker-box .picker-header {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
  padding: 4px 20px;
}
.picker-box .picker-header p {
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.active {
  opacity: 1;
  bottom: 0;
}
.hello {
  background: #f5f5f5;
  height: 200vh;
  padding: 20px;
}
.code {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
.code span {
  font-size: 16px;
}
.code input {
  width: 70px;
  padding-left: 10px;
  margin-right: 10px;
  outline: none;
}
p {
  color: red;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
}
.button {
  width: 100%;
  height: 30px;
  text-align: center;
}
.button div{
  margin: 0 auto;
  width: 100px;
  height: 100%;
  line-height: 30px;
  background: red;
  border-radius: 5px;
  color: #fff;
  font-size: 14px;

}
</style>
