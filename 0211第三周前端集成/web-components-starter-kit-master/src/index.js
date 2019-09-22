import './components/hello-world.js';
import './components/button'

const template = document.createElement('template');

template.innerHTML = `
  <style>
    :host {
      font-family: sans-serif;
    }
  </style>

  <div>
    <hello-world
      title="2019前端面试技巧"
      text="掌握最新面试技巧，面试题，让你在前端面试中脱颖而出。"
      img="url(http://img.mukewang.com/595228110001155208000480.jpg)"
    ></hello-world>
    <hello-world
      title="一气呵成！Python开发一站式学习"
      text="从入门到开发，学习 好玩 好用 好未来的Python语言。"
      img="url(http://img.mukewang.com/58f9c48d00019e1a08000480.jpg)"
    ></hello-world>
    <hello-world
      title="站上微信小程序风口，实现职业华丽转身"
      text="入门技能+项目开发，逐步深入学习微信小程序开发！"
      img="url(http://img.mukewang.com/58f9cb2e000191ff08000480.jpg)"
    ></hello-world>
    <hello-world
      title="Java SSM框架快速入门到精通"
      text="准备了多个项目案例带你深入学习Java SSM框架，先技术，载思想，实战出真知。"
      img="url(http://img.mukewang.com/595228110001155208000480.jpg)"
    ></hello-world>

    <my-button></my-button>
  </div>
`;

class App extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    //获取helloWorldTemplate节点之后，克隆他所有子元素。
    //因为可能有多个自定义元素的实例，这个模板还要留给其他实例使用，所以不能直接移动它的子元素。
  }

}

window.customElements.define('my-app', App);
