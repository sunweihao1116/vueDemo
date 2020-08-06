<template>
  <div>
    <div v-show="!showCameraFlag">
      <div @click="showCamera(true)">前置</div>
      <div @click="showCamera(false)">后置</div>
      <img :src="src" alt="">
    </div>
    <div class="camera" v-show="showCameraFlag">
      <img class="mask" src="../../static/images/takePhotoBg1.png" alt="">
      <video id="video" muted autoplay></video> 
      <div @click="takePhoto">拍照</div>
      <div @click="filp">切换摄像头</div>
      <div>{{errMessage}}</div>
      <div>兼容类型：{{type}}</div>
      <!-- <canvas hidden id='canvas' :width='width' :height='height' style="border:1px solid #ccc"></canvas> -->
    </div>
    
  </div>
</template>

<script>

export default {
  name: 'TakePhotoTest',
  data() {
    return {
      showCameraFlag: false,
      src: '',
      video: null,
      width: '',
      height: '',
      type: '1',
      errMessage: '',
      devicePosition: true, // true为前置，false为后置
    };
  },
  mounted() {
    this.video = document.getElementById('video');
    document.getElementById('video').appendChild(this.video);
    // this.initCamera();
  },
  methods: {
    stopTracks() { // 关闭摄像头
      if (this.video.srcObject) {
        this.video.srcObject.getTracks().forEach((track) => {
          track.stop(); // 关闭前一个设备
        });
      }
    },
    showCamera(devicePosition) {
      this.stopTracks();
      this.devicePosition = devicePosition;
      this.initCamera(devicePosition);
      this.showCameraFlag = true;
    },
    initCamera(devicePosition) {
      this.$nextTick(() => {
        const options = {
          audio: false,
          video: {
            facingMode: devicePosition ? 'user' : 'environment',
          },
        };
        this.initVideo(devicePosition, options); // 初始化 前置摄像头
      });
    },
    initVideo(devicePosition, options) {
      window.navigator.getUserMedia = navigator.getUserMedia || navigator.webKitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.type = '1';
        navigator.mediaDevices.getUserMedia(options).then((result) => {
          this.video.srcObject = result;
          this.video.play();
        }).catch((err) => {
          this.errMessage = err.name;
          // showToast(devicePosition ? '前置初始化失败' : '后置初始化失败');
        });
      } else if (navigator.getUserMedia) {
        this.type = '2';
        navigator.getUserMedia(options, result => {
          this.video.srcObject = result;
          this.video.play();
        }, (err) => {
          this.errMessage = err.name;
          // showToast(devicePosition ? '前置初始化失败' : '后置初始化失败');
        });
      } else {
        this.type = '3';
        this.errMessage = '不支持摄像头调用！';
      }
    },
    filp() { // 翻转
      this.showCamera(!this.devicePosition);
    },
    takePhoto() { //将捕获到的画面绘制到canvas上
      this.$nextTick(() => {
        const canvas = document.createElement('canvas');
        canvas.width = this.video.offsetWidth;
        canvas.height = this.video.offsetHeight;
        const context = canvas.getContext('2d');
        context.drawImage(this.video, 0, 0, this.video.offsetWidth, this.video.offsetHeight);
        const newImg = document.createElement('img');
        newImg.setAttribute('crossOrigin', 'anonymous');
        this.src = canvas.toDataURL('image/jpeg');
        this.showCameraFlag = false;
        this.stopTracks();
      });
    },
  },
};
</script>

<style lang="less" scope>
.camera {
  background: #fff;
  position: relative;
  #video, video {
    width: 100%;
    height: 80vh;
  }
  .mask {
    position: absolute;
    width: 100%;
  }
  div {
    text-align: center;
    border: 1px solid #eee;
    padding: 10px;
  }
}
</style>