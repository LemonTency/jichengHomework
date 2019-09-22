const template = document.createElement('template');

template.innerHTML = `

  <style>

  .container{
    padding: 8px
  }

  button {
    display: block;
    overflow: hidden;
    position: relative;
    padding: 0 16px;
    font-size: 16px;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    width: 100%;
    height: 40px;
    box-sizing: border-box;
    border: 1px solid #a1a1a1;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
    color: #363636;
    cursor: pointer;
  }

  </style>

<div>
<button>label</button>
</div>
`


  //Button 继承于HTMLElement,具有HTML元素的一些属性，同时也拥有生命周期，在相对应的时期可以执行一些回调
  class Button extends HTMLElement {
    constructor() {
      super()

      //shadow Dom用于封装CSS,HTML,JS，对外界隐藏起来，这是可以设置的。
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      this._shadowRoot.appendChild(template.content.cloneNode(true))

      this.$button = this._shadowRoot.querySelector('button');

      this.$button.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('onClick', {
            detail: 'Hello from within the Custom Element',
          })
        );
      });
    }

    get label() {
      return this.getAttribute('label');
    }  

    set label(value) {
      this.setAttribute('label', value);
    }

    static get observedAttributes() {
      return ['label'];
    }

    //只要label属性改变，就会触发attributeChangedCallback函数
    attributeChangedCallback(name, oldVal, newVal) {
      this.render();
    }

    //初始化的label属性可以在button中进行设置
    render() {
      this.$button.innerHTML = this.label;
    }
  }

  //my-button是我们使用web component时的名字。<my-button></my-button>
  window.customElements.define('my-button', Button)

