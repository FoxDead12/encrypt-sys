var n=Object.defineProperty;var s=(t,o,r)=>o in t?n(t,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[o]=r;var e=(t,o,r)=>(s(t,typeof o!="symbol"?o+"":o,r),r);import{s as d,i as l,x as i}from"../../lit-element.js";class a extends d{constructor(){super(),this.hash=null}render(){return i`
      <h1>Algoritmo para gerar um Hash!</h1>

      <p>O algoritmo transforma o conteudo da mensagem em um hash utilizando o algoritmo SHA256 e depois convertendo para base hexadecimal.</p>
      <textarea
        rows="10"
        placeholder="Place your data here..."
        id="data"
      ></textarea>

      <button id="button" @click=${this.generateHash.bind(this)}>
        <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>
        <p>Gerar Hash</p>
      </button>

      ${this.hash?i`
          <h5>Hash:</h5>
          <div class="result"> ${this.hash} </div>
        `:""}

    `}firstUpdated(){this.button=this.shadowRoot.getElementById("button")}async generateHash(){this.button.setAttribute("disabled",!0);try{const o=await app.execute_request("/hash","POST",{data:this.shadowRoot.getElementById("data").value});this.hash=o}catch(o){console.error(o)}this.button.removeAttribute("disabled")}}e(a,"properties",{hash:{type:String}}),e(a,"styles",l`

    :host {
      display: grid;
      grid-template-rows: 1fr;
      margin-top: 24px;
      padding-bottom: 24px
    }

    h1 {
      margin: 0px;
      padding: 0px;
      font-family: 'Robot';
      font-weight: 400;
      color: var(--black-color);
    }

    p {
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
  `);customElements.define("hash-page-comp",a);
