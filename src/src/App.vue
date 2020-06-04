<template>
  <div id="page-box">
    <!-- 标题 -->
    <h3 class="damiao-title" ref="damiaoTitle">短链接生成平台</h3>
    <!-- 输入表单组件 -->
    <InputBox></InputBox>
    <!-- 短链接展示盒子组件 -->
    <ResultBox :propa.sync="propa"></ResultBox>
  </div>
</template>

<script>
import InputBox from './components/input-box.vue';
import ResultBox from './components/result-box.vue';

export default {
  name: 'app',
  components: {
    InputBox,
    ResultBox
  },
  data() {
    return {
      propa: 'a'
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const oTitle = this.$refs.damiaoTitle;
      let texts = '';

      // 定义颜色
      let fontColors = [
        { fontColor: '#c44032', shadowColor: '#5e1f18' },
        { fontColor: '#c93929', shadowColor: '#872e24' },
        { fontColor: '#c14234', shadowColor: '#832c23' },
        { fontColor: '#cd4f41', shadowColor: '#923228' },
        { fontColor: '#da5d4f', shadowColor: '#ac3e31' },
        { fontColor: '#ea6252', shadowColor: '#bd4537' },
        { fontColor: '#f46655', shadowColor: '#bf4334' }
      ];

      function setColor(fontColors) {
        texts = '';
        Array.from(oTitle.innerText).forEach((text, index) => {
          texts += `<span style="color:${fontColors[index].fontColor};text-shadow:0 0 0  ${fontColors[index].shadowColor},0 0 3px  ${fontColors[index].shadowColor},0 0 6px  ${fontColors[index].shadowColor},0 0 9px  ${fontColors[index].shadowColor},0 0 12px  ${fontColors[index].shadowColor};">${text}</span>`;
        });
        oTitle.innerHTML = texts;
      }
      setColor(fontColors);

      // 循环跑马灯 定时器
      setInterval(() => {
        fontColors.unshift(fontColors.pop());
        setColor(fontColors);
      }, 100);
    }
  }
};
</script>

<style lang="stylus">
*
	margin:0;padding:0;

html,body
	width 100%
	height 100%

#page-box
	font-family "Avenir", Helvetica, Arial, sans-serif;
	width 100%;
	height 100%;
	position relative;
	background-color #fcd8d4;

.damiao-title
	width:100%;height:80px;line-height:80px;text-align:center;font-size:55px;position:relative;top:10%;letter-spacing:5px;color:#fcd8d4;text-shadow:0 0 0  #b23131,0 0 3px  #b23131,0 0 6px  #b23131,0 0 9px  #b23131,0 0 12px  #b23131;
</style>
