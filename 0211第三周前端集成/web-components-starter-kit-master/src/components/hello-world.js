const template = document.createElement('template');
template.setAttribute("id","helloWorldTemplate");


template.innerHTML = `
  <style>
    .container {
      background-size: 100%;
      float: left;
      width: 475px;
      height: 124px;
      border-radius: 6px;
      color: #fff;
      margin: 0 10px 36px 20px;
      box-sizing: border-box;
      padding: 24px 32px 0;
    }
    .detail {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 200;
      color: rgba(240, 20, 20, 0.6);
      line-height: 16px;
    }
    .title {
      font-size: 20px;
      line-height: 24px;
      margin: 2px;
      color: rgba(255, 255, 255, 0.8);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .text {
      font-size: 12px;
      line-height: 24px;
      color: rgba(255, 255, 255, 0.6);
      font-weight: 200;
      margin-top: 5px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  </style>

  <div class="container">
    <p class="title"></p>
    <p class="text"></p>
    <a class="detail">查看详情</p>
  </div>
`;

class HelloWorld extends HTMLElement {
  constructor() {
    super()
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(template.content.cloneNode(true))

    this._shadowRoot.querySelector(
      '.container'
    ).style.backgroundImage = this.getAttribute('img')
    this._shadowRoot.querySelector(
      '.container>.title'
    ).innerText = this.getAttribute('title')
    this._shadowRoot.querySelector(
      '.container>.text'
    ).innerText = this.getAttribute('text')
  }
}

  //使用原生的customElements,define()方法，将<hello-world>与HelloWorld相关联
  window.customElements.define('hello-world', HelloWorld)