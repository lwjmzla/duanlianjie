<template>
  <section class="damiao-content">
    <!-- 提示信息 -->
    <section class="damiao-message-text" v-show="status === 'error'">
      {{ message }}
    </section>
    <!-- loading 加载状态 -->
    <img src="images/loading.gif" class="damiao-loading-img" v-show="status === 'loading'" />
    <!-- 显示短链接和二维码 -->
    <section class="damiao-clink" v-show="status === 'successed'">
      <span class="dc-link">
        短链接：<a :href="shortUrl" targt="__blank" class="dc-link-text">{{ shortUrl }}</a>
      </span>
      <span class="dc-qrcode"> 二维码：<i id="qrcode" ref="qrcode"></i> </span>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import QRCode from 'QRCode';
interface ConfigObj {
  status: boolean;
  link: string;
  message: string;
}
@Component({})
export default class ResultBox extends Vue {
  message: string = '提示信息 error';
  status: string = ''; // error loading successed
  longUrl: string = '';
  shortUrl: string = '';
  mounted() {
    this.init();
  }
  init() {
    this.$bus.$on('sendLongUrl', (config: ConfigObj) => {
      this.status = '';
      this.longUrl = config.link;

      if (config.status) {
        // 请求接口 带上长链接
        this.requestShortUrl();
      } else {
        this.status = 'error';
        this.message = config.message;
      }
    });
  }
  requestShortUrl() {
    // 进入loading加载状态
    this.status = 'loading';
    // 清除旧的二维码
    let qrcode: any = this.$refs.qrcode;
    qrcode.innerHTML = '';

    // 请求短链接
    fetch('http://www.damiao.com/api/url/shorten', {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        longUrl: this.longUrl
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        this.status = 'successed';
        this.shortUrl = res.shortUrl;
        // 生成二维码
        this.createQRcode();
      });
  }
  createQRcode() {
    new QRCode(this.$refs.qrcode, this.shortUrl);
  }
}
</script>

<style lang="stylus">
.damiao-content
		width:55%;height:auto;position:absolute;left:52%;top:45%;transform: translate3d(-50%, -50%, 0);display:block;
.damiao-content span
		display: block; width:100%;height:50px;line-height:50px;position: relative;color:#b23131;background-repeat: no-repeat;background-size:20px 20px;text-indent: 30px;background-position: 0 13px;
.damiao-content span em
		font-style: normal;text-decoration: underline;
.damiao-content span a
		color:#333; transition: .5s;
.damiao-content span a:hover
		color:#b23131;
.damiao-content span img
		width:100%;height:100%;border:10px solid #fff;
.damiao-content span #qrcode
		position: absolute;left:95px;top:15px;width:150px;height:150px;
.damiao-content span canvas
		width:150px;height:150px;
.damiao-content span.dc-link
		background-image: url('/images/link_icon.png');
.damiao-content span.dc-qrcode
		background-image: url('/images/qr_code.png');
.damiao-content .damiao-message-text
		width:100%;height:80px;line-height:80px;text-align:center;text-indent:-7%;font-size:22px;position:absolute;left:0;top:0;color:#f37777;
.damiao-content .damiao-loading-img
		position:absolute;left:46%;top:0;transform:translate3d(-50%,0,0);width:30px;
</style>
