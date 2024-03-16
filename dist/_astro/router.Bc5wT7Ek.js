const C="astro:before-preparation",B="astro:after-preparation",W="astro:before-swap",U="astro:after-swap",j=e=>document.dispatchEvent(new Event(e));class k extends Event{from;to;direction;navigationType;sourceElement;info;newDocument;constructor(t,n,r,i,u,d,m,o,f){super(t,n),this.from=r,this.to=i,this.direction=u,this.navigationType=d,this.sourceElement=m,this.info=o,this.newDocument=f,Object.defineProperties(this,{from:{enumerable:!0},to:{enumerable:!0,writable:!0},direction:{enumerable:!0,writable:!0},navigationType:{enumerable:!0},sourceElement:{enumerable:!0},info:{enumerable:!0},newDocument:{enumerable:!0,writable:!0}})}}class V extends k{formData;loader;constructor(t,n,r,i,u,d,m,o,f){super(C,{cancelable:!0},t,n,r,i,u,d,m),this.formData=o,this.loader=f.bind(this,this),Object.defineProperties(this,{formData:{enumerable:!0},loader:{enumerable:!0,writable:!0}})}}class K extends k{direction;viewTransition;swap;constructor(t,n,r){super(W,void 0,t.from,t.to,t.direction,t.navigationType,t.sourceElement,t.info,t.newDocument),this.direction=t.direction,this.viewTransition=n,this.swap=r.bind(this,this),Object.defineProperties(this,{direction:{enumerable:!0},viewTransition:{enumerable:!0},swap:{enumerable:!0,writable:!0}})}}async function z(e,t,n,r,i,u,d,m){const o=new V(e,t,n,r,i,u,window.document,d,m);return document.dispatchEvent(o)&&(await o.loader(),o.defaultPrevented||(j(B),o.navigationType!=="traverse"&&S({scrollX,scrollY}))),o}async function G(e,t,n){const r=new K(e,t,n);return document.dispatchEvent(r),r.swap(),r}const J=history.pushState.bind(history),g=history.replaceState.bind(history),S=e=>{history.state&&(history.scrollRestoration="manual",g({...history.state,...e},""))},O=!!document.startViewTransition,P=()=>!!document.querySelector('[name="astro-view-transitions-enabled"]'),N=(e,t)=>e.pathname===t.pathname&&e.search===t.search;let D,p,x=!1,X;const Y=e=>document.dispatchEvent(new Event(e)),F=()=>Y("astro:page-load"),Q=()=>{let e=document.createElement("div");e.setAttribute("aria-live","assertive"),e.setAttribute("aria-atomic","true"),e.className="astro-route-announcer",document.body.append(e),setTimeout(()=>{let t=document.title||document.querySelector("h1")?.textContent||location.pathname;e.textContent=t},60)},y="data-astro-transition-persist",H="data-astro-transition",M="data-astro-transition-fallback";let I,v=0;history.state?(v=history.state.index,scrollTo({left:history.state.scrollX,top:history.state.scrollY})):P()&&(g({index:v,scrollX,scrollY},""),history.scrollRestoration="manual");async function Z(e,t){try{const n=await fetch(e,t),i=(n.headers.get("content-type")??"").split(";",1)[0].trim();return i!=="text/html"&&i!=="application/xhtml+xml"?null:{html:await n.text(),redirected:n.redirected?n.url:void 0,mediaType:i}}catch{return null}}function _(){const e=document.querySelector('[name="astro-view-transitions-fallback"]');return e?e.getAttribute("content"):"animate"}function ee(){let e=Promise.resolve();for(const t of Array.from(document.scripts)){if(t.dataset.astroExec==="")continue;const n=t.getAttribute("type");if(n&&n!=="module"&&n!=="text/javascript")continue;const r=document.createElement("script");r.innerHTML=t.innerHTML;for(const i of t.attributes){if(i.name==="src"){const u=new Promise(d=>{r.onload=r.onerror=d});e=e.then(()=>u)}r.setAttribute(i.name,i.value)}r.dataset.astroExec="",t.replaceWith(r)}return e}const q=(e,t,n,r,i)=>{const u=N(t,e),d=document.title;document.title=r;let m=!1;if(e.href!==location.href&&!i)if(n.history==="replace"){const o=history.state;g({...n.state,index:o.index,scrollX:o.scrollX,scrollY:o.scrollY},"",e.href)}else J({...n.state,index:++v,scrollX:0,scrollY:0},"",e.href);if(D=e,u||(scrollTo({left:0,top:0,behavior:"instant"}),m=!0),i)scrollTo(i.scrollX,i.scrollY);else{if(e.hash){history.scrollRestoration="auto";const o=history.state;location.href=e.href,history.state||g(o,"")}else m||scrollTo({left:0,top:0,behavior:"instant"});history.scrollRestoration="manual"}document.title=d};function te(e){const t=[];for(const n of e.querySelectorAll("head link[rel=stylesheet]"))if(!document.querySelector(`[${y}="${n.getAttribute(y)}"], link[rel=stylesheet][href="${n.getAttribute("href")}"]`)){const r=document.createElement("link");r.setAttribute("rel","preload"),r.setAttribute("as","style"),r.setAttribute("href",n.getAttribute("href")),t.push(new Promise(i=>{["load","error"].forEach(u=>r.addEventListener(u,i)),document.head.append(r)}))}return t}async function R(e,t,n,r){const i=(s,c)=>{const h=s.getAttribute(y),T=h&&c.head.querySelector(`[${y}="${h}"]`);if(T)return T;if(s.matches("link[rel=stylesheet]")){const A=s.getAttribute("href");return c.head.querySelector(`link[rel=stylesheet][href="${A}"]`)}return null},u=()=>{const s=document.activeElement;if(s?.closest(`[${y}]`)){if(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement){const c=s.selectionStart,h=s.selectionEnd;return{activeElement:s,start:c,end:h}}return{activeElement:s}}else return{activeElement:null}},d=({activeElement:s,start:c,end:h})=>{s&&(s.focus(),(s instanceof HTMLInputElement||s instanceof HTMLTextAreaElement)&&(s.selectionStart=c,s.selectionEnd=h))},m=s=>{const c=s.dataset.astroTransitionPersistProps;return c==null||c==="false"},o=s=>{const c=document.documentElement,h=[...c.attributes].filter(({name:a})=>(c.removeAttribute(a),a.startsWith("data-astro-")));[...s.newDocument.documentElement.attributes,...h].forEach(({name:a,value:l})=>c.setAttribute(a,l));for(const a of document.scripts)for(const l of s.newDocument.scripts)if(!l.hasAttribute("data-astro-rerun")&&(!a.src&&a.textContent===l.textContent||a.src&&a.type===l.type&&a.src===l.src)){l.dataset.astroExec="";break}for(const a of Array.from(document.head.children)){const l=i(a,s.newDocument);l?l.remove():a.remove()}document.head.append(...s.newDocument.head.children);const T=document.body,A=u();document.body.replaceWith(s.newDocument.body);for(const a of T.querySelectorAll(`[${y}]`)){const l=a.getAttribute(y),E=document.querySelector(`[${y}="${l}"]`);E&&(E.replaceWith(a),E.localName==="astro-island"&&m(a)&&(a.setAttribute("ssr",""),a.setAttribute("props",E.getAttribute("props"))))}d(A)};async function f(s){function c(a){const l=a.effect;return!l||!(l instanceof KeyframeEffect)||!l.target?!1:window.getComputedStyle(l.target,l.pseudoElement).animationIterationCount==="infinite"}const h=document.getAnimations();document.documentElement.setAttribute(M,s);const A=document.getAnimations().filter(a=>!h.includes(a)&&!c(a));return Promise.all(A.map(a=>a.finished))}if(!x)document.documentElement.setAttribute(H,e.direction),r==="animate"&&await f("old");else throw new DOMException("Transition was skipped");const b=document.title,w=await G(e,p,o);q(w.to,w.from,t,b,n),Y(U),r==="animate"&&!x&&f("new").then(()=>X())}async function $(e,t,n,r,i){if(!P()||location.origin!==n.origin){location.href=n.href;return}const u=i?"traverse":r.history==="replace"?"replace":"push";if(u!=="traverse"&&S({scrollX,scrollY}),N(t,n)&&(e!=="back"&&n.hash||e==="back"&&t.hash)){q(n,t,r,document.title,i);return}const d=await z(t,n,e,u,r.sourceElement,r.info,r.formData,m);if(d.defaultPrevented){location.href=n.href;return}async function m(o){const f=o.to.href,b={};if(o.formData){b.method="POST";const c=o.sourceElement instanceof HTMLFormElement?o.sourceElement:o.sourceElement instanceof HTMLElement&&"form"in o.sourceElement?o.sourceElement.form:o.sourceElement?.closest("form");b.body=c?.attributes.getNamedItem("enctype")?.value==="application/x-www-form-urlencoded"?new URLSearchParams(o.formData):o.formData}const w=await Z(f,b);if(w===null){o.preventDefault();return}if(w.redirected&&(o.to=new URL(w.redirected)),I??=new DOMParser,o.newDocument=I.parseFromString(w.html,w.mediaType),o.newDocument.querySelectorAll("noscript").forEach(c=>c.remove()),!o.newDocument.querySelector('[name="astro-view-transitions-enabled"]')&&!o.formData){o.preventDefault();return}const s=te(o.newDocument);s.length&&await Promise.all(s)}if(x=!1,O)p=document.startViewTransition(async()=>await R(d,r,i));else{const o=(async()=>{await new Promise(f=>setTimeout(f)),await R(d,r,i,_())})();p={updateCallbackDone:o,ready:o,finished:new Promise(f=>X=f),skipTransition:()=>{x=!0}}}p.ready.then(async()=>{await ee(),F(),Q()}),p.finished.then(()=>{document.documentElement.removeAttribute(H),document.documentElement.removeAttribute(M)}),await p.ready}async function re(e,t){await $("forward",D,new URL(e,location.href),t??{})}function ne(e){if(!P()&&e.state){location.reload();return}if(e.state===null)return;const t=history.state,n=t.index,r=n>v?"forward":"back";v=n,$(r,D,new URL(location.href),{},t)}const L=()=>{(scrollX!==history.state.scrollX||scrollY!==history.state.scrollY)&&S({scrollX,scrollY})};{if(O||_()!=="none")if(D=new URL(location.href),addEventListener("popstate",ne),addEventListener("load",F),"onscrollend"in window)addEventListener("scrollend",L);else{let e,t,n,r;const i=()=>{if(r!==history.state?.index){clearInterval(e),e=void 0;return}if(t===scrollY&&n===scrollX){clearInterval(e),e=void 0,L();return}else t=scrollY,n=scrollX};addEventListener("scroll",()=>{e===void 0&&(r=history.state.index,t=scrollY,n=scrollX,e=window.setInterval(i,50))},{passive:!0})}for(const e of document.scripts)e.dataset.astroExec=""}export{re as n,O as s};
