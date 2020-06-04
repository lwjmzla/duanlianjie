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
    <my-select v-model="checked"></my-select>
    <my-select1 v-model="checked1"></my-select1>
    <my-selectmul v-model="checkedArr"></my-selectmul>
    <div class="slideTxtBox">
      <div class="hd">
        <!-- 下面是前/后按钮代码，如果不需要删除即可 -->
        <span class="arrow"><a class="next"></a><a class="prev"></a></span>

        <ul>
          <li>教育</li>
          <li>培训</li>
          <li>出国</li>
        </ul>
      </div>
      <div class="bd">
        <ul>
          <li><span class="date">2011-11-11</span><a href="http://www.SuperSlide2.com" target="_blank">中国打破了世界软件巨头规则</a></li>
        </ul>
        <ul>
          <li><span class="date">2011-11-11</span><a href="http://www.SuperSlide2.com" target="_blank">名师教作文：３妙招巧写高分</a></li>
        </ul>
        <ul>
          <li><span class="date">2011-11-11</span><a href="http://www.SuperSlide2.com" target="_blank">澳大利亚八大名校招生说明会</a></li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import QRCode from 'QRCode';
import $ from '$';
import jQuery from 'jQuery';
import MySelect from './MySelect.vue';
import MySelect1 from './MySelect1.vue';
import MySelectmul from './MySelectmul.vue';
export default {
  components: {
    MySelect,
    MySelect1,
    MySelectmul
  },
  props: ['propa'],
  data() {
    return {
      message: '提示信息 error',
      status: '', // error loading successed
      longUrl: '',
      shortUrl: '',
      checked: 1,
      checked1: 0,
      checkedArr: ['b']
    };
  },
  computed: {
    syncPropa: {
      get() {
        return this.propa;
      },
      set(value) {
        this.$emit('update:propa', value);
      }
    }
  },
  watch: {
    propa(val) {
      console.log(val);
    }
  },
  methods: {
    init() {
      console.log(this.syncPropa);
      this.syncPropa = 'c';
      console.log($);
      console.log(jQuery);
      console.log($('.damiao-conten'));
      $('.slideTxtBox').slide();
      this.$bus.$on('sendLongUrl', (config) => {
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
    },
    requestShortUrl() {
      // 进入loading加载状态
      this.status = 'loading';
      // 清除旧的二维码
      this.$refs.qrcode.innerHTML = '';

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
    },
    createQRcode() {
      new QRCode(this.$refs.qrcode, this.shortUrl);
    }
  },
  mounted() {
    this.init();
  }
};
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
