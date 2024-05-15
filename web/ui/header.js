import {LitElement, html, css} from 'lit';

export class Header extends LitElement {

  static properties = {
    app: { type: Element }
  }

  static styles = css `

    :host {
      background-color: var(--blue-color);
      box-shadow: 0px 10px 10px rgba(0, 0, 0, .1);
    }

    header {
      max-width: 1300px;
      margin: auto;
      padding: 12px 24px;
      display: flex;
      justify-content: space-between;
      color: white;
    }

    h1 {
      padding: 0px;
      margin: 0px;
      font-family: "Robot";
      font-weight: 700;
      text-transform: uppercase;
      font-size: 24px;
      display: flex;
      align-items: center;
      letter-spacing: 1px;
    }

    ul {
      padding: 0px;
      margin: 0px;
      list-style: none;
      display: flex;
      gap: 24px;
      font-family: "Robot";
      font-weight: 500;
      font-size: 14px;
      text-transform: uppercase;
    }

    ul > li {
      position: relative;
      cursor: pointer;
    }

    ul > li::before {
      content: '';
      position: absolute;
      width: 0px;
      height: 2px;
      background-color: var(--yellow-color);
      bottom: 0px;
      transition: 300ms width ease-in-out;
    }

    ul > li:hover::before {
      width: 100%;
    }
  `

  render () {
    return html `
      <header>
        <h1>
          Encrypt System 👽
        </h1>

        <ul>
          <li @click=${() => this.app.load_component("hash-page-comp")}><p>Hash</p></li>
          <li @click=${() => this.app.load_component("salt-page-comp")}><p>Salt</p></li>
          <li @click=${() => this.app.load_component("sys-encrypt-page-comp")}><p>Symmetric Encrypt</p></li>
          <li @click=${() => this.app.load_component("asys-encrypt-page-comp")}><p>Asymmetric Encrypt</p></li>
        </ul>
      </header>
    `
  }

}

customElements.define('app-header', Header);
