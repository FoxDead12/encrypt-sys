import {LitElement, html, css} from 'lit';

export class SysEncryptPageComp extends LitElement {

  static properties = {
    encrypt_v: { type: Object },
    decrypt_v: { type: Object },
  }

  static styles = css `
    :host {
      display: flex;
      align-items: start;
      gap: 24px;
      margin-top: 24px;
      padding-bottom: 24px
    }

    :host > div {
      width: 100%;
      display: grid;
      grid-template-rows: 1fr;
    }

    h1 {
      margin: 0px;
      padding: 0px;
      font-family: 'Robot';
      font-weight: 400;
      color: var(--black-color);
    }

    p, label {
      font-family: 'Robot';
      font-weight: 400;
      color: var(--black-color);
    }

    textarea {
      resize: none;
      outline-color: var(--blue-color);
      padding: 12px;
      border: 2px solid #d6d6d6;
      border-radius: 5px;
      color: var(--black-color);
      margin-top: 24px;
    }

    button {
      position: relative;
      padding: 0px;
      margin: 0px;
      margin-left: auto;
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      padding: 12px 24px;
      background-color: var(--blue-color);
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0px 10px 10px rgba(0, 0, 0, .1);
      border: 2px solid var(--blue-color);
      transition: 300ms background-color ease-in-out;
      outline-color: var(--blue-color);
    }

    button > p,
    button > svg {
      padding: 0px;
      margin: 0px;
      color: white;
      font-size: 16px;
    }

    button:hover {
      background-color: white;
    }

    button:hover > p,
    button:hover > svg {
      color: var(--blue-color);
    }

    button:active {
      transform: translateY(2px);
    }

    button:disabled {
      background-color: #d6d6d6;
      color: white;
      border: 2px solid white;
      cursor: wait;
    }

    button:disabled:hover > p,
    button:disabled:hover > svg {
      color: white;
    }

    button:disabled:active {
      transform: none;
    }

    h5 {
      margin: 0px;
      margin-top: 24px;
      padding: 0px;
      font-family: 'Robot';
      font-weight: 800;
      text-transform: uppercase;
      color: var(--blue-color);
    }

    .result {
      margin-top: 12px;
      background-color: white;
      padding: 12px;
      border: 2px solid #d6d6d6;
      border-radius: 5px;
      color: var(--black-color);
      font-family: monospace;
      overflow: scroll;
    }

    .show-container {
      display: flex;
      flex-direction: row;
      gap: 8px;
      margin: 12px 0px;
    }

    .show-container > label {
      cursor: pointer;
      user-select: none;
      padding: 0px;
      margin: 0px;
    }

    .separator {
      margin: 24px 0px;
    }
  `

  constructor () {
    super();

    this.encrypt_v = null;
    this.decrypt_v = null;
    this.show = false;
  }

  render () {
    return html `
      <div>
        <h1>Criptografia Simétrica</h1>
        <p>Criptografia Simétrica utilizando o algoritmo AES.</p>

        <textarea
          rows="10"
          placeholder="Place your data here..."
          id="encrypt-data"
        ></textarea>

        <textarea
          rows="1"
          placeholder="Your secret..."
          id="encrypt-secret"
        ></textarea>

        <button id="button" @click=${this.encrypt.bind(this)}>
          <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
          <p>Gerar Hash</p>
        </button>

        ${this.encrypt_v ?
          html `
            <h5>Data:</h5>
            <div class="result">${this.encrypt_v.data}</div>
            <h5>Secret:</h5>
            <div class="result">${this.encrypt_v.secret}</div>
          `
        : ''}
      </div>

      <div>
        <h1>Descriptografar</h1>
        <p>Criptografia Simétrica utilizando o algoritmo AES.</p>

        <textarea
          rows="10"
          placeholder="Place your data here..."
          id="decrypt-data"
        ></textarea>

        <textarea
          rows="1"
          placeholder="Your secret..."
          id="decrypt-secret"
        ></textarea>

        <button id="button" @click=${this.decrypt.bind(this)}>
          <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
          <p>Gerar Hash</p>
        </button>

        ${this.decrypt_v ?
          html `
            <h5>Data:</h5>
            <div class="result">${this.decrypt_v.data}</div>
          `
        : ''}
      </div>
    `
  }

  firstUpdated () {
    this.button = this.shadowRoot.getElementById("button")
  }

  async encrypt (e) {
    this.button.setAttribute("disabled", true);

    try {

      var result = await app.execute_request("/sy-encrypt", "POST", {
        data: this.shadowRoot.getElementById("encrypt-data").value,
        secret: this.shadowRoot.getElementById("encrypt-secret")?.value || null
      })

      this.encrypt_v = JSON.parse(result);

    } catch (e) {
      console.error(e)
    }

    this.button.removeAttribute("disabled");
  }

  async decrypt (e) {
    this.button.setAttribute("disabled", true);

    try {

      var result = await app.execute_request("/sy-decrypt", "POST", {
        data: this.shadowRoot.getElementById("decrypt-data").value,
        secret: this.shadowRoot.getElementById("decrypt-secret").value
      })

      this.decrypt_v = JSON.parse(result);

    } catch (e) {
      console.error(e)
    }

    this.button.removeAttribute("disabled");
  }
}

customElements.define('sys-encrypt-page-comp', SysEncryptPageComp)
