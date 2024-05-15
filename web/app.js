import {LitElement, html, css} from 'lit';
import './ui/header'

export class App extends LitElement {

  static styles = css `
    :host {
      width: 100vw;
      height: 100vh;
      max-width: 100vw;
      max-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .container {
      display: flex;
      width: 100%;
      height: 100%;
      overflow-y: scroll;
    }

    .section {
      padding: 12px 24px;
      margin: auto auto;
      width: 100%;
      margin-top: 0px;
      max-width: 1300px;
    }

  `

  constructor () {
    super()

    window.app = this
    this.host = 'http://localhost:3001' // PROD: window.location.origin
  }

  render () {
    return html `
      <app-header .app=${this}></app-header>

      <div class="container">
        <section class="section" id="section"></section>
      </div>
    `
  }

  firstUpdated () {
    this.load_component("sys-encrypt-page-comp")
  }

  async load_component (cmp) {

    this.shadowRoot.getElementById('section').innerHTML = ''

    await import("./ui/encrypt/" + cmp + '.js');
    const element = document.createElement(cmp)

    this.shadowRoot.getElementById('section').appendChild(element);

  }

  async execute_request (url, method, payload = "") {

    var xhr = new XMLHttpRequest();

    xhr.open(method, this.host + url);

    if (payload != "") { xhr.setRequestHeader('Content-Type', 'application/json') }

    xhr.send(JSON.stringify(payload));

    return new Promise ((resolve, reject) => {
      xhr.onreadystatechange = async () => {
        if (xhr.readyState > 3) {
          switch (xhr.status) {
            case 200: resolve(xhr.response); break
            case 201: resolve(xhr.response); break
            default:  reject(xhr.response);
          }
        }
      }

      xhr.onerror = function() {
        reject(new Error('Algo deu errado na comunicação com o servidor, tente novamente mais tarde!'));
      };

      xhr.ontimeout = (e) => {
        reject(new Error('A tarefa demorou mais que o esperado. Tente novamente!'));
      };
    })
  }
}

customElements.define("app-comp", App);
