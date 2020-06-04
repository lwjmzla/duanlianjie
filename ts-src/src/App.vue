<template>
  <div id="page-box">
    <!-- 标题 -->
    <h3 class="damiao-title" ref="damiaoTitle">短链接生成平台</h3>
    <!-- 输入表单组件 -->
    <InputBox></InputBox>

    <ResultBox></ResultBox>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import InputBox from './components/input-box.vue';
import ResultBox from './components/result-box.vue';
interface ColorConfig {
  fontColor: string;
  shadowColor: string;
}

@Component({
  components: {
    InputBox,
    ResultBox
  }
})
export default class App extends Vue {
  mounted() {
    this.init();
    class Animal {
      name: string;
      age: number = 18;
      constructor(name: string) {
        this.name = name;
      }
      move(distance: number = 0) {
        console.log(`move ${distance}m`);
      }
    }

    class Dog extends Animal {
      constructor(name: string) {
        super(name);
      }
      move(distance: number = 5) {
        console.log(`move ${distance}m`);
        super.move(distance);
        console.log(super.age);
        console.log(this);
      }
    }
    new Dog('xue').move();

    class Employee {
      private _name: string;
      constructor(name: string) {
        this._name = name;
      }
      get name(): string {
        return this._name;
      }
      set name(newName) {
        this._name = newName;
      }
    }
    let employer = new Employee('lwj');
    console.log(employer.name);
    employer.name = 'abc';
    console.log(employer.name);

    class Greeter {
      static standardGreeter = '1';
    }
    console.log(Greeter.standardGreeter);
    let greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeter = '2';
    console.log(Greeter.standardGreeter);

    let x = {
      a: 1,
      b: 2
    };
    function getProperty<T, K extends keyof T>(obj: T, key: K) {
      return obj[key];
    }
    console.log(getProperty(x, 'a'));
    // ----------------
    // interface ClockConstructor {
    //   new (hour: number, minute: number): ClockInterface;
    // }

    // interface ClockInterface {
    //   tick(): void;
    //   currentTime: Date;
    // }

    // const Clock: ClockConstructor = class Clock implements ClockInterface {
    //   currentTime: Date = new Date();
    //   constructor(h: number, m: number) {}
    //   tick() {
    //     console.log('beep beep');
    //   }
    // };
    // const clock = new Clock(10, 20);
    // console.log(clock.currentTime);

    interface ClockConstructor {
      new (hour: number, minute: number): ClockInterface;
    }
    interface ClockInterface {
      tick(): void;
    }

    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
      return new ctor(hour, minute);
    }

    class DigitalClock implements ClockInterface {
      constructor(h: number, m: number) {}
      tick() {
        console.log('beep beep');
      }
    }
    class AnalogClock implements ClockInterface {
      constructor(h: number, m: number) {}
      tick() {
        console.log('tick tock');
      }
    }

    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);
    // ---------------

    function go(meter: number = 20) {
      console.log('go ' + meter + ' m');
    }
    go();

    class Clock {
      currentTime: Date = new Date();
      constructor() {}
    }
    // function createConstru<T>(ctor: new () => T): T {
    function createConstru<T>(ctor: { new (): T }): T {
      return new ctor();
    }
    createConstru(Clock);

    window.onmousedown = function(ev: any) {
      console.log(ev.clickTime);
    };

    let odiv = document.getElementById('page-box');
    //(<any>odiv).style.color = 'red';
    (odiv as any).style.color = 'red';

    interface Age {
      age: number;
    }
    interface Name {
      name: string;
    }
    function extend<T, U>(first: T, second: U): T & U {
      return {
        ...(first as any),
        ...(second as any)
      };
    }
    let obja: Age = { age: 18 };
    let objb: Name = { name: 'lwj' };
    let obj = extend(obja, objb);
    console.log(obj);

    let a: number;

    type Method = 'get' | 'post';
    let method: Method = 'get';
  }

  //methods
  init() {
    const oTitle: any = this.$refs.damiaoTitle;
    let texts: string = '';

    // 定义颜色
    let fontColors: ColorConfig[] = [
      // 或者Array<ColorConfig>
      { fontColor: '#c44032', shadowColor: '#5e1f18' },
      { fontColor: '#c93929', shadowColor: '#872e24' },
      { fontColor: '#c14234', shadowColor: '#832c23' },
      { fontColor: '#cd4f41', shadowColor: '#923228' },
      { fontColor: '#da5d4f', shadowColor: '#ac3e31' },
      { fontColor: '#ea6252', shadowColor: '#bd4537' },
      { fontColor: '#f46655', shadowColor: '#bf4334' }
    ];

    function setColor(fontColors: ColorConfig[]) {
      texts = '';
      Array.from(oTitle.innerText).forEach((text: any, index: number): void => {
        // !text: any 这个值自己当然知道是什么类型，但是系统是不知道类型的，所以any
        texts += `<span style="color:${fontColors[index].fontColor};text-shadow:0 0 0  ${fontColors[index].shadowColor},0 0 3px  ${fontColors[index].shadowColor},0 0 6px  ${fontColors[index].shadowColor},0 0 9px  ${fontColors[index].shadowColor},0 0 12px  ${fontColors[index].shadowColor};">${text}</span>`;
      });
      oTitle.innerHTML = texts;
    }
    setColor(fontColors);

    // 循环跑马灯 定时器
    setInterval(() => {
      let obj: ColorConfig | any = fontColors.pop();
      fontColors.unshift(obj);
      setColor(fontColors);
    }, 100);
  }
}
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
