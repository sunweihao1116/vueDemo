import EXIF from 'exif-js';

// 图片压缩
export const compress = (img, width, height, ratio) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);
  const img64 = canvas.toDataURL('image/jpeg', ratio);
  return img64;
};

// 判断base64大小
export const showSize = (base64url) => {
  let str = base64url.replace('data:image/jpeg;base64,', '');
  const equalIndex = str.indexOf('=');
  if (str.indexOf('=') > 0) {
    str = str.substring(0, equalIndex);
  }
  const strLength = str.length;
  const fileLength = parseInt(strLength - (strLength / 8) * 2);
  // 由字节转换为KB
  let size = '';
  size = (fileLength / 1024).toFixed(2);
  const sizeStr = `${size} `; // 转成字符串
  const index = sizeStr.indexOf('.'); // 获取小数点处的索引
  const dou = sizeStr.substr(index + 1, 2); // 获取小数点后两位的值
  if (dou === '00') {
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2);
  }
  return parseInt(size);
};

// 图片压缩
export const imgChange = (file, dataurl, item) => { // eslint-disable-line
  if (file.size <= 122400) {
    if (!dataurl.split('data:image/jpeg;base64,')[1]) {
      // return showToast('请上传jpg格式图片');
    }
    item.base64 = dataurl.split('data:image/jpeg;base64,')[1];
  } else {
    const imgObj = new Image();
    imgObj.src = dataurl;
    imgObj.onload = function() { // eslint-disable-line
      const ratio = Number(Math.sqrt(this.width * this.height / 10000 / 48).toFixed(2));
      let img64 = compress(imgObj, this.width / ratio, this.height / ratio, 0.9);
      if (Number(showSize(img64)) >= 150) {
        const effect = 1 / (showSize(img64) / 130);
        img64 = compress(imgObj, this.width / ratio, this.height / ratio, effect);
      }
      item.src = img64;
      item.base64 = img64.split('data:image/jpeg;base64,')[1];
    };
  }
  item.success = true;
};

// 解决ios及三星拍照问题
export const fileFun = (Orientation, file, item) => {
  const reader = new FileReader();
  const image = new Image();
  reader.readAsDataURL(file);
  reader.onload = function (ev) { // eslint-disable-line
    image.src = ev.target.result;
    image.onload = function () { // eslint-disable-line
      const imgWidth = this.width;
      const imgHeight = this.height; // 获取图片宽高
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = imgWidth;
      canvas.height = imgHeight;
      ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
      if (Orientation && Orientation !== 1) {
        switch (Orientation) { // eslint-disable-line
          case 6: // 旋转90度
            canvas.width = imgHeight;
            canvas.height = imgWidth;
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(this, 0, -imgHeight, imgWidth, imgHeight);
            break;
          case 3: // 旋转180度
            ctx.rotate(Math.PI);
            ctx.drawImage(this, -imgWidth, -imgHeight, imgWidth, imgHeight);
            break;
          case 8: // 旋转-90度
            canvas.width = imgHeight;
            canvas.height = imgWidth;
            ctx.rotate(3 * Math.PI / 2);
            ctx.drawImage(this, -imgWidth, 0, imgWidth, imgHeight);
            break;
        }
      } else {
        ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
      }
      const dataurl = canvas.toDataURL('image/jpeg', 0.8);// canvase 转为base64
      imgChange(file, dataurl, item);
    };
  };
};

export const takePhoto = (e, item) => { // 拍照
  if (!FileReader) {
    // showToast('抱歉，你的浏览器不支持 FileReader，请使用现代浏览器操作！');
    return;
  }
  const file = e.target.files[0];
  EXIF.getData(file, function() { // eslint-disable-line
    const Orientation = EXIF.getTag(this, 'Orientation');
    if (Orientation && Orientation !== 1) { // 图片角度不正确
      fileFun(Orientation, file, item);
    } else {
      e.target.value = '';
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() { // eslint-disable-line
        imgChange(file, this.result, item); // 正常压缩
      };
    }
  });
};
