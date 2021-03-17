import Clipboard from 'clipboard';

/* <div id="operate"  data-clipboard-text="copy-content" > </div> */
// https://clipboardjs.com/

const copy = (id) => {
  const e = document.getElementById(id);
  const clipboard = new Clipboard(e);
  clipboard.on('success', () => {
    // showToast('复制成功');
    clipboard.destroy();
  });
  clipboard.on('error', () => {
    // showToast('该浏览器不支持自动复制');
    clipboard.destroy();
  });
  e.click();
};

export default {
  copy,
};
