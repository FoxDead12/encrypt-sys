import {LitElement, html, css} from 'lit';

export class SaltPageComp extends LitElement {

  static properties = {
    hash: { type: String },
    salt: { type: String },
    show: { type: Boolean }
  }

  static styles = css `

    :host {
      display: grid;
      grid-template-rows: 1fr;
      margin-top: 24px;
      padding-bottom: 24px;
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
  `

  constructor () {
    super();

    this.hash = null;
    this.salt = null;
    this.show = false;
  }

  render () {
    return html `
      <h1>Algoritmo Hash com Sal 🧂</h1>
      <p>O algoritmo transforma o conteudo da mensagem mais o salt (🧂) em um hash utilizando o algoritmo SHA256 adicionado e depois convertendo para base hexadecimal.</p>

      <textarea
        rows="10"
        placeholder="Place your data here..."
        id="data"
      ></textarea>

      <textarea
        rows="1"
        placeholder="Your salt..."
        id="salt"
        ?hidden=${!this.show}
      ></textarea>

      <div class="show-container">
        <input type="checkbox" id="show" ?checked=${this.show} @change=${() => this.show = !this.show}>
        <label for="show">Utilizar um (salt) customizado?</label><br>
      </div>

      <button id="button" @click=${this.generateHash.bind(this)}>
        <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
        <p>Gerar Hash</p>
      </button>

      ${this.hash ?
        html `
          <h5>Hash:</h5>
          <div class="result">${this.hash}</div>
          <h5>Slat:</h5>
          <div class="result">${this.salt}</div>
        `
      : ''}
    `
  }

  firstUpdated () {
    this.button = this.shadowRoot.getElementById("button")
  }

  async generateHash () {
    this.button.setAttribute("disabled", true);

    try {

      var result = await app.execute_request("/salt", "POST", {
        data: this.shadowRoot.getElementById("data").value,
        salt: this.show ? this.shadowRoot.getElementById("salt").value : null
      })

      result = JSON.parse(result);

      this.hash = result.hash
      this.salt = result.salt

    } catch (e) {
      console.error(e)
    }

    this.button.removeAttribute("disabled");
  }
}

customElements.define("salt-page-comp", SaltPageComp);
