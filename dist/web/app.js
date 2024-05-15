var y=Object.defineProperty;var v=(s,e,o)=>e in s?y(s,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[e]=o;var m=(s,e,o)=>(v(s,typeof e!="symbol"?e+"":e,o),o);import{s as g,i as E,x}from"./lit-element.js";import"./ui/header.js";const _="modulepreload",R=function(s){return"/"+s},p={},k=function(e,o,d){let t=Promise.resolve();if(o&&o.length>0){const i=document.getElementsByTagName("link"),n=document.querySelector("meta[property=csp-nonce]"),u=(n==null?void 0:n.nonce)||(n==null?void 0:n.getAttribute("nonce"));t=Promise.all(o.map(r=>{if(r=R(r),r in p)return;p[r]=!0;const c=r.endsWith(".css"),w=c?'[rel="stylesheet"]':"";if(!!d)for(let l=i.length-1;l>=0;l--){const h=i[l];if(h.href===r&&(!c||h.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${r}"]${w}`))return;const a=document.createElement("link");if(a.rel=c?"stylesheet":_,c||(a.as="script",a.crossOrigin=""),a.href=r,u&&a.setAttribute("nonce",u),document.head.appendChild(a),c)return new Promise((l,h)=>{a.addEventListener("load",l),a.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${r}`)))})}))}return t.then(()=>e()).catch(i=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i})};class f extends g{constructor(){super(),window.app=this,this.host="http://localhost:3001"}render(){return x`
      <app-header .app=${this}></app-header>

      <div class="container">
        <section class="section" id="section"></section>
      </div>
    `}firstUpdated(){this.load_component("sys-encrypt-page-comp")}async load_component(e){this.shadowRoot.getElementById("section").innerHTML="",await k(()=>import("./ui/encrypt/"+e+".js"),[]);const o=document.createElement(e);this.shadowRoot.getElementById("section").appendChild(o)}async execute_request(e,o,d=""){var t=new XMLHttpRequest;return t.open(o,this.host+e),d!=""&&t.setRequestHeader("Content-Type","application/json"),t.send(JSON.stringify(d)),new Promise((i,n)=>{t.onreadystatechange=async()=>{if(t.readyState>3)switch(t.status){case 200:i(t.response);break;case 201:i(t.response);break;default:n(t.response)}},t.onerror=function(){n(new Error("Algo deu errado na comunicação com o servidor, tente novamente mais tarde!"))},t.ontimeout=u=>{n(new Error("A tarefa demorou mais que o esperado. Tente novamente!"))}})}}m(f,"styles",E`
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

  `);customElements.define("app-comp",f);
