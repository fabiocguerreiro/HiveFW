/*! hivefw-integration-panel v1.14.16 */
let e,t,i,s,a,r,n,o,l,c,d,h,p,u,g,A,f,m,_,v,w,b,y,x,E,C,B,S,k,I,R,M,D,F,T,Q,P,O,U,z,H,$,N,L,G,Y,K,j,W,J,q,V,Z,X,ee,te,ie,se,ae,re,ne,oe,le,ce,de,he,pe,ue,ge,Ae,fe,me,_e,ve,we,be,ye,xe,Ee,Ce,Be,Se,ke,Ie,Re,Me,De,Fe,Te,Qe,Pe,Oe,Ue,ze,He,$e,Ne,Le,Ge,Ye,Ke,je,We,Je,qe,Ve,Ze,Xe,et,tt,it,st,at,rt,nt,ot,lt,ct,dt,ht,pt,ut,gt,At,ft,mt,_t,vt,wt,bt,yt,xt,Et,Ct,Bt,St,kt,It,Rt,Mt,Dt,Ft,Tt,Qt,Pt,Ot,Ut,zt,Ht,$t,Nt,Lt,Gt,Yt,Kt,jt,Wt,Jt,qt,Vt,Zt,Xt,ei,ti,ii,si,ai,ri,ni,oi,li,ci,di,hi,pi,ui,gi,Ai,fi,mi,_i,vi,wi,bi,yi,xi,Ei,Ci,Bi,Si,ki,Ii,Ri,Mi,Di,Fi,Ti,Qi,Pi,Oi,Ui,zi,Hi,$i,Ni,Li,Gi,Yi,Ki,ji,Wi,Ji,qi,Vi,Zi,Xi,es,ts,is,ss,as,rs,ns,os,ls,cs,ds,hs,ps,us,gs,As,fs,ms,_s,vs,ws,bs,ys,xs,Es,Cs,Bs,Ss,ks,Is,Rs,Ms,Ds,Fs,Ts,Qs,Ps,Os,Us,zs,Hs,$s,Ns,Ls,Gs,Ys,Ks,js,Ws,Js,qs,Vs,Zs,Xs,ea,ta,ia,sa,aa,ra,na,oa,la,ca,da,ha,pa,ua,ga,Aa,fa,ma,_a,va,wa,ba,ya,xa,Ea,Ca,Ba,Sa,ka,Ia,Ra,Ma,Da,Fa,Ta,Qa,Pa,Oa,Ua,za,Ha,$a,Na,La,Ga,Ya,Ka,ja,Wa,Ja,qa,Va,Za,Xa,er,tr,ir,sr,ar,rr,nr,or,lr,cr,dr,hr,pr,ur,gr,Ar,fr,mr,_r,vr,wr,br,yr,xr,Er,Cr,Br,Sr,kr,Ir,Rr,Mr,Dr,Fr,Tr,Qr,Pr,Or,Ur,zr,Hr,$r,Nr,Lr,Gr,Yr,Kr,jr,Wr,Jr,qr,Vr,Zr,Xr,en,tn,sn,an,rn,nn,on=e=>e;function ln(e,t,i,s){var a,r=arguments.length,n=r<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,s);else for(var o=e.length-1;o>=0;o--)(a=e[o])&&(n=(r<3?a(n):r>3?a(t,i,n):a(t,i))||n);return r>3&&n&&Object.defineProperty(t,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const cn=globalThis,dn=cn.ShadowRoot&&(void 0===cn.ShadyCSS||cn.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,hn=Symbol(),pn=new WeakMap;let un=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==hn)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(dn&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=pn.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&pn.set(t,e))}return e}toString(){return this.cssText}};const gn=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new un(i,e,hn)},An=dn?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new un("string"==typeof e?e:e+"",void 0,hn))(t)})(e):e,{is:fn,defineProperty:mn,getOwnPropertyDescriptor:_n,getOwnPropertyNames:vn,getOwnPropertySymbols:wn,getPrototypeOf:bn}=Object,yn=globalThis,xn=yn.trustedTypes,En=xn?xn.emptyScript:"",Cn=yn.reactiveElementPolyfillSupport,Bn=(e,t)=>e,Sn={toAttribute(e,t){switch(t){case Boolean:e=e?En:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},kn=(e,t)=>!fn(e,t),In={attribute:!0,type:String,converter:Sn,reflect:!1,useDefault:!1,hasChanged:kn};null!==(e=Symbol.metadata)&&void 0!==e||(Symbol.metadata=Symbol("metadata")),null!==(t=yn.litPropertyMetadata)&&void 0!==t||(yn.litPropertyMetadata=new WeakMap);let Rn=class extends HTMLElement{static addInitializer(e){var t;this._$Ei(),(null!==(t=this.l)&&void 0!==t?t:this.l=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=In){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&mn(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){var s;const{get:a,set:r}=null!==(s=_n(this.prototype,e))&&void 0!==s?s:{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const s=null==a?void 0:a.call(this);null!=r&&r.call(this,t),this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){var t;return null!==(t=this.elementProperties.get(e))&&void 0!==t?t:In}static _$Ei(){if(this.hasOwnProperty(Bn("elementProperties")))return;const e=bn(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Bn("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Bn("properties"))){const e=this.properties,t=[...vn(e),...wn(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(An(e))}else void 0!==e&&t.push(An(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$EO)&&void 0!==t?t:this._$EO=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$EO)||void 0===t||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(dn)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),s=cn.litNonce;void 0!==s&&t.setAttribute("nonce",s),t.textContent=i.cssText,e.appendChild(t)}})(t,this.constructor.elementStyles),t}connectedCallback(){var e,t;null!==(e=this.renderRoot)&&void 0!==e||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$EO)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$EO)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){var a;const r=(void 0!==(null===(a=i.converter)||void 0===a?void 0:a.toAttribute)?i.converter:Sn).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){var a,r,n;const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(a=e.converter)||void 0===a?void 0:a.fromAttribute)?e.converter:Sn;this._$Em=s;const l=o.fromAttribute(t,e.type);this[s]=null!==(r=null!=l?l:null===(n=this._$Ej)||void 0===n?void 0:n.get(s))&&void 0!==r?r:l,this._$Em=null}}requestUpdate(e,t,i,s=!1,a){if(void 0!==e){var r,n;const o=this.constructor;if(!1===s&&(a=this[e]),null!=i||(i=o.getPropertyOptions(e)),!((null!==(r=i.hasChanged)&&void 0!==r?r:kn)(a,t)||i.useDefault&&i.reflect&&a===(null===(n=this._$Ej)||void 0===n?void 0:n.get(e))&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:a},r){var n,o,l;i&&!(null!==(n=this._$Ej)&&void 0!==n?n:this._$Ej=new Map).has(e)&&(this._$Ej.set(e,null!==(o=null!=r?r:t)&&void 0!==o?o:this[e]),!0!==a||void 0!==r)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(null!==(l=this._$Eq)&&void 0!==l?l:this._$Eq=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){var e;if(null!==(e=this.renderRoot)&&void 0!==e||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const i=this._$AL;try{var s;t=this.shouldUpdate(i),t?(this.willUpdate(i),null!==(s=this._$EO)&&void 0!==s&&s.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null!==(t=this._$EO)&&void 0!==t&&t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}};Rn.elementStyles=[],Rn.shadowRootOptions={mode:"open"},Rn[Bn("elementProperties")]=new Map,Rn[Bn("finalized")]=new Map,null!=Cn&&Cn({ReactiveElement:Rn}),(null!==(i=yn.reactiveElementVersions)&&void 0!==i?i:yn.reactiveElementVersions=[]).push("2.1.2");const Mn=globalThis,Dn=e=>e,Fn=Mn.trustedTypes,Tn=Fn?Fn.createPolicy("lit-html",{createHTML:e=>e}):void 0,Qn="$lit$",Pn=`lit$${Math.random().toFixed(9).slice(2)}$`,On="?"+Pn,Un=`<${On}>`,zn=document,Hn=()=>zn.createComment(""),$n=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Nn=Array.isArray,Ln="[ \t\n\f\r]",Gn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Yn=/-->/g,Kn=/>/g,jn=RegExp(`>|${Ln}(?:([^\\s"'>=/]+)(${Ln}*=${Ln}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Wn=/'/g,Jn=/"/g,qn=/^(?:script|style|textarea|title)$/i,Vn=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),Zn=Vn(1),Xn=Vn(2),eo=Symbol.for("lit-noChange"),to=Symbol.for("lit-nothing"),io=new WeakMap,so=zn.createTreeWalker(zn,129);function ao(e,t){if(!Nn(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Tn?Tn.createHTML(t):t}let ro=class e{constructor({strings:t,_$litType$:i},s){let a;this.parts=[];let r=0,n=0;const o=t.length-1,l=this.parts,[c,d]=((e,t)=>{const i=e.length-1,s=[];let a,r=2===t?"<svg>":3===t?"<math>":"",n=Gn;for(let t=0;t<i;t++){const i=e[t];let o,l,c=-1,d=0;for(;d<i.length&&(n.lastIndex=d,l=n.exec(i),null!==l);)d=n.lastIndex,n===Gn?"!--"===l[1]?n=Yn:void 0!==l[1]?n=Kn:void 0!==l[2]?(qn.test(l[2])&&(a=RegExp("</"+l[2],"g")),n=jn):void 0!==l[3]&&(n=jn):n===jn?">"===l[0]?(n=null!=a?a:Gn,c=-1):void 0===l[1]?c=-2:(c=n.lastIndex-l[2].length,o=l[1],n=void 0===l[3]?jn:'"'===l[3]?Jn:Wn):n===Jn||n===Wn?n=jn:n===Yn||n===Kn?n=Gn:(n=jn,a=void 0);const h=n===jn&&e[t+1].startsWith("/>")?" ":"";r+=n===Gn?i+Un:c>=0?(s.push(o),i.slice(0,c)+Qn+i.slice(c)+Pn+h):i+Pn+(-2===c?t:h)}return[ao(e,r+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]})(t,i);if(this.el=e.createElement(c,s),so.currentNode=this.el.content,2===i||3===i){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=so.nextNode())&&l.length<o;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(Qn)){const t=d[n++],i=a.getAttribute(e).split(Pn),s=/([.?@])?(.*)/.exec(t);l.push({type:1,index:r,name:s[2],strings:i,ctor:"."===s[1]?ho:"?"===s[1]?po:"@"===s[1]?uo:co}),a.removeAttribute(e)}else e.startsWith(Pn)&&(l.push({type:6,index:r}),a.removeAttribute(e));if(qn.test(a.tagName)){const e=a.textContent.split(Pn),t=e.length-1;if(t>0){a.textContent=Fn?Fn.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],Hn()),so.nextNode(),l.push({type:2,index:++r});a.append(e[t],Hn())}}}else if(8===a.nodeType)if(a.data===On)l.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(Pn,e+1));)l.push({type:7,index:r}),e+=Pn.length-1}r++}}static createElement(e,t){const i=zn.createElement("template");return i.innerHTML=e,i}};function no(e,t,i=e,s){var a,r,n,o,l;if(t===eo)return t;let c=void 0!==s?null===(a=i._$Co)||void 0===a?void 0:a[s]:i._$Cl;const d=$n(t)?void 0:t._$litDirective$;return(null===(r=c)||void 0===r?void 0:r.constructor)!==d&&(null!==(n=c)&&void 0!==n&&null!==(o=n._$AO)&&void 0!==o&&o.call(n,!1),void 0===d?c=void 0:(c=new d(e),c._$AT(e,i,s)),void 0!==s?(null!==(l=i._$Co)&&void 0!==l?l:i._$Co=[])[s]=c:i._$Cl=c),void 0!==c&&(t=no(e,c._$AS(e,t.values),c,s)),t}let oo=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,a=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:zn).importNode(i,!0);so.currentNode=a;let r=so.nextNode(),n=0,o=0,l=s[0];for(;void 0!==l;){var c;if(n===l.index){let t;2===l.type?t=new lo(r,r.nextSibling,this,e):1===l.type?t=new l.ctor(r,l.name,l.strings,this,e):6===l.type&&(t=new go(r,this,e)),this._$AV.push(t),l=s[++o]}n!==(null===(c=l)||void 0===c?void 0:c.index)&&(r=so.nextNode(),n++)}return so.currentNode=zn,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},lo=class e{get _$AU(){var e,t;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cv}constructor(e,t,i,s){var a;this.type=2,this._$AH=to,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=null===(a=null==s?void 0:s.isConnected)||void 0===a||a}get parentNode(){var e;let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null===(e=t)||void 0===e?void 0:e.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=no(this,e,t),$n(e)?e===to||null==e||""===e?(this._$AH!==to&&this._$AR(),this._$AH=to):e!==this._$AH&&e!==eo&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>Nn(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==to&&$n(this._$AH)?this._$AA.nextSibling.data=e:this.T(zn.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:s}=e,a="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=ro.createElement(ao(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===a)this._$AH.p(i);else{const e=new oo(a,this),t=e.u(this.options);e.p(i),this.T(t),this._$AH=e}}_$AC(e){let t=io.get(e.strings);return void 0===t&&io.set(e.strings,t=new ro(e)),t}k(t){Nn(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,a=0;for(const r of t)a===i.length?i.push(s=new e(this.O(Hn()),this.O(Hn()),this,this.options)):s=i[a],s._$AI(r),a++;a<i.length&&(this._$AR(s&&s._$AB.nextSibling,a),i.length=a)}_$AR(e=this._$AA.nextSibling,t){for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e!==this._$AB;){var i;const t=Dn(e).nextSibling;Dn(e).remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cv=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}},co=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,a){this.type=1,this._$AH=to,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=a,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=to}_$AI(e,t=this,i,s){const a=this.strings;let r=!1;if(void 0===a)e=no(this,e,t,0),r=!$n(e)||e!==this._$AH&&e!==eo,r&&(this._$AH=e);else{const s=e;let n,o;for(e=a[0],n=0;n<a.length-1;n++)o=no(this,s[i+n],t,n),o===eo&&(o=this._$AH[n]),r||(r=!$n(o)||o!==this._$AH[n]),o===to?e=to:e!==to&&(e+=(null!=o?o:"")+a[n+1]),this._$AH[n]=o}r&&!s&&this.j(e)}j(e){e===to?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}},ho=class extends co{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===to?void 0:e}},po=class extends co{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==to)}},uo=class extends co{constructor(e,t,i,s,a){super(e,t,i,s,a),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=no(this,e,t,0))&&void 0!==i?i:to)===eo)return;const s=this._$AH,a=e===to&&s!==to||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==to&&(s===to||a);a&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(t=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==t?t:this.element,e):this._$AH.handleEvent(e)}},go=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){no(this,e)}};const Ao=Mn.litHtmlPolyfillSupport;null!=Ao&&Ao(ro,lo),(null!==(s=Mn.litHtmlVersions)&&void 0!==s?s:Mn.litHtmlVersions=[]).push("3.3.2");const fo=globalThis;let mo=class extends Rn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s;const a=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let r=a._$litPart$;if(void 0===r){var n;const e=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;a._$litPart$=r=new lo(t.insertBefore(Hn(),e),e,void 0,null!=i?i:{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return eo}};mo._$litElement$=!0,mo.finalized=!0,null===(a=fo.litElementHydrateSupport)||void 0===a||a.call(fo,{LitElement:mo});const _o=fo.litElementPolyfillSupport;null==_o||_o({LitElement:mo}),(null!==(r=fo.litElementVersions)&&void 0!==r?r:fo.litElementVersions=[]).push("4.2.2");const vo=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},wo={attribute:!0,type:String,converter:Sn,reflect:!1,hasChanged:kn},bo=(e=wo,t,i)=>{const{kind:s,metadata:a}=i;let r=globalThis.litPropertyMetadata.get(a);if(void 0===r&&globalThis.litPropertyMetadata.set(a,r=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),r.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const a=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,a,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const a=this[s];t.call(this,i),this.requestUpdate(s,a,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function yo(e){return(t,i)=>"object"==typeof i?bo(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function xo(e){return yo({...e,state:!0,attribute:!1})}const Eo=gn(n||(n=on`
  :host {
    display: block;
    width: 100%;
    height: 100vh;
    /* HiveFW high-contrast cockpit: secondary/muted text is intentionally
       promoted to white so labels and metadata remain readable in the
       integration's dark UI. */
    --secondary-text-color: #fff;
    --chat-bg: var(--chat-card-bg, var(--card-background-color, #fff));
    --bubble-incoming-bg: var(
      --chat-card-bubble-incoming-bg,
      var(--secondary-background-color, #e8e8e8)
    );
    --bubble-outgoing-bg: var(--chat-card-bubble-outgoing-bg, var(--primary-color, #03a9f4));
    --bubble-incoming-text: var(
      --chat-card-bubble-incoming-text,
      var(--primary-text-color, #212121)
    );
    --bubble-outgoing-text: var(--chat-card-bubble-outgoing-text, #fff);
    --sender-color: var(--chat-card-sender-color, var(--primary-color, #03a9f4));
    --timestamp-color: var(--chat-card-timestamp-color, var(--secondary-text-color, #727272));
    --mention-bg: var(--chat-card-mention-bg, rgba(3, 169, 244, 0.15));
    --mention-text: var(--chat-card-mention-text, var(--primary-color, #03a9f4));
    --date-separator-color: var(
      --chat-card-date-separator-color,
      var(--secondary-text-color, #727272)
    );
    --unread-badge-bg: var(--chat-card-unread-badge-bg, var(--primary-color, #03a9f4));
    --input-bg: var(--chat-card-input-bg, var(--card-background-color, #fff));
    --input-border: var(--chat-card-input-border, var(--divider-color, #e0e0e0));
    --scrollbar-thumb: var(--chat-card-scrollbar-thumb, var(--scrollbar-thumb-color, #c1c1c1));
    --system-msg-color: var(--chat-card-system-msg-color, var(--secondary-text-color, #727272));
    --error-color: var(--error-color, #db4437);

    /* ─── Semantic threshold-band colours ───
       Used by the node-summary aggregated card (and any future component
       wanting good/warn/bad/info semantics). The hex defaults match the
       battery / status palette already scattered through this stylesheet
       (#4caf50, #ff9800, #f44336, #2196f3) so no net new palette is
       introduced — these named variables just give the existing colours
       a semantic handle.

       *-bg variants are the translucent fills used by status badges,
       map-link chips, and any chip-style backgrounds the card adds. */
    --good: var(--meshcore-good, #4caf50);
    --warn: var(--meshcore-warn, #ff9800);
    --bad:  var(--meshcore-bad,  #f44336);
    --info: var(--meshcore-info, #2196f3);
    --good-bg: var(--meshcore-good-bg, rgba(76, 175, 80, 0.18));
    --warn-bg: var(--meshcore-warn-bg, rgba(255, 152, 0, 0.18));
    --bad-bg:  var(--meshcore-bad-bg,  rgba(244, 67, 54, 0.18));
    --info-bg: var(--meshcore-info-bg, rgba(33, 150, 243, 0.18));
  }

  /* === Panel Layout === */
  .panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--primary-background-color, #fafafa);
  }

  .panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: var(--card-background-color, #fff);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    flex-shrink: 0;
    gap: 12px;
  }

  .panel-title {
    font-size: 18px;
    font-weight: 500;
    color: var(--primary-text-color);
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .hivefw-wordmark {
    display: inline-block;
    width: 128px;
    height: 13px;
    flex: 0 0 auto;
    background: var(--primary-text-color);
    -webkit-mask: url('/hivefw_integration_panel/hivefw-wordmark.png') center / contain no-repeat;
    mask: url('/hivefw_integration_panel/hivefw-wordmark.png') center / contain no-repeat;
  }

  .panel-product-name {
    white-space: nowrap;
    font-weight: 600;
  }

  .device-switcher {
    padding: 8px 12px;
    border: 1px solid var(--input-border);
    border-radius: 8px;
    background: var(--input-bg);
    color: var(--primary-text-color);
    font-size: 13px;
    box-sizing: border-box;
    height: 39px;
    min-height: 39px;
    line-height: normal;
    appearance: menulist;
    -webkit-appearance: menulist;
    cursor: pointer;
  }

  /* === Tab Bar === */
  .tab-bar {
    display: flex;
    gap: 0;
    padding: 0;
    background: var(--card-background-color, #fff);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    flex-shrink: 0;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .tab-bar::-webkit-scrollbar {
    display: none;
  }

  .tab-bar button {
    flex: 1;
    padding: 12px 16px;
    border: none;
    background: transparent;
    color: var(--secondary-text-color, #727272);
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 3px solid transparent;
    min-height: 48px;
  }

  .tab-bar button:hover {
    color: var(--primary-text-color);
    background: rgba(0, 0, 0, 0.02);
  }

  .tab-bar button.active {
    color: var(--primary-color, #03a9f4);
    border-bottom-color: var(--primary-color, #03a9f4);
  }

  /* === Page Container === */
  .page-container {
    flex: 1;
    overflow: hidden;
    display: flex;
  }

  .page {
    display: none;
    flex: 1;
    overflow: hidden;
  }

  .page.active {
    display: flex;
  }

  /* === Chat Page (with sidebar) === */
  .chat-layout {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 0;
  }

  /* === Message Bubble Styles === */
  .bubble {
    max-width: 85%;
    padding: 8px 12px;
    border-radius: 16px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    position: relative;
    cursor: pointer;
    transition: opacity 0.15s;
    line-height: 1.4;
    font-size: 14px;
  }

  .bubble:active {
    opacity: 0.7;
  }

  .bubble + .bubble {
    margin-top: 2px;
  }

  .bubble.incoming {
    background: var(--bubble-incoming-bg);
    color: var(--bubble-incoming-text);
    border-bottom-left-radius: 4px;
  }

  .bubble.incoming:first-of-type {
    border-top-left-radius: 16px;
  }

  .bubble.outgoing {
    background: var(--bubble-outgoing-bg);
    color: var(--bubble-outgoing-text);
    border-bottom-right-radius: 4px;
  }

  .bubble.outgoing:first-of-type {
    border-top-right-radius: 16px;
  }

  .bubble.system {
    background: transparent;
    color: var(--system-msg-color);
    font-style: italic;
    font-size: 13px;
    text-align: center;
    cursor: default;
    padding: 4px 12px;
  }

  .message-text {
    white-space: pre-wrap;
  }

  .message-text .mention {
    background: var(--mention-bg);
    color: var(--mention-text);
    font-weight: 600;
    padding: 1px 4px;
    border-radius: 4px;
  }

  .bubble.outgoing .message-text .mention {
    background: rgba(255, 255, 255, 0.25);
    color: #fff;
  }

  .timestamp {
    font-size: 11px;
    color: var(--timestamp-color);
    margin-top: 2px;
    padding: 0 4px;
    opacity: 0.8;
  }

  /* === Sender Label === */
  .sender {
    font-size: 12px;
    font-weight: 600;
    color: var(--sender-color);
    margin-bottom: 2px;
    padding: 0 4px;
    max-width: 85%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* === Message Group === */
  .message-group {
    margin-bottom: 8px;
    display: flex;
    flex-direction: column;
  }

  .message-group.outgoing {
    align-items: flex-end;
  }

  .message-group.incoming {
    align-items: flex-start;
  }

  .message-group.system {
    align-items: center;
  }

  /* === Date Separator === */
  .date-separator {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 16px 0 12px;
    color: var(--date-separator-color);
    font-size: 12px;
    font-weight: 500;
  }

  .date-separator::before,
  .date-separator::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--divider-color, #e0e0e0);
  }

  /* === Contact Card === */
  .contact-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    cursor: pointer;
    transition: background 0.15s;
  }

  .contact-card:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  .contact-card.active {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
    border-left: 3px solid var(--primary-color, #03a9f4);
  }

  .contact-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary-color, #03a9f4);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 14px;
    flex-shrink: 0;
  }

  .contact-info {
    flex: 1;
    overflow: hidden;
  }

  .contact-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .contact-prefix {
    font-size: 12px;
    color: var(--secondary-text-color);
    font-family: monospace;
  }

  .contact-status {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .contact-status.online {
    background: #4caf50;
  }

  .contact-status.offline {
    background: var(--secondary-text-color);
  }

  /* === Conversation Sidebar === */
  .conversation-sidebar {
    width: 330px;
    border-right: 1px solid var(--divider-color, #e0e0e0);
    display: flex;
    flex-direction: column;
    background: var(--card-background-color, #fff);
    flex-shrink: 0;
  }

  .sidebar-search {
    padding: 12px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .sidebar-search input {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid var(--input-border);
    border-radius: 20px;
    background: var(--input-bg);
    color: var(--primary-text-color);
    font-size: 13px;
    outline: none;
  }

  .sidebar-search input:focus {
    border-color: var(--primary-color);
  }

  .conversation-list {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .conversation-list::-webkit-scrollbar {
    width: 6px;
  }

  .conversation-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .conversation-list::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 3px;
  }

  /* === Chat Container === */
  .chat-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 8px 12px;
    background: var(--chat-bg);
    position: relative;
  }

  .chat-container::-webkit-scrollbar {
    width: 6px;
  }

  .chat-container::-webkit-scrollbar-track {
    background: transparent;
  }

  .chat-container::-webkit-scrollbar-thumb {
    background: var(--scrollbar-thumb);
    border-radius: 3px;
  }

  /* === Input Area === */
  .input-area {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 8px 12px 12px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    background: var(--input-bg);
    flex-shrink: 0;
  }

  .input-area textarea {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid var(--input-border);
    border-radius: 20px;
    background: var(--chat-bg);
    color: var(--primary-text-color);
    font-size: 14px;
    font-family: inherit;
    resize: none;
    outline: none;
    max-height: 120px;
    min-height: 40px;
    line-height: 1.4;
    transition: border-color 0.2s;
  }

  .input-area textarea:focus {
    border-color: var(--primary-color);
  }

  .input-area textarea::placeholder {
    color: var(--timestamp-color);
  }

  .input-area textarea:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .send-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: none;
    border-radius: 50%;
    background: var(--primary-color, #03a9f4);
    color: #fff;
    cursor: pointer;
    flex-shrink: 0;
    transition: opacity 0.15s, transform 0.15s;
  }

  .send-button:hover {
    opacity: 0.9;
  }

  .send-button:active {
    transform: scale(0.95);
  }

  .send-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .send-button svg {
    width: 20px;
    height: 20px;
  }

  /* === Empty State === */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px 16px;
    color: var(--secondary-text-color);
    text-align: center;
  }

  .empty-state .empty-icon {
    font-size: 32px;
    margin-bottom: 8px;
    opacity: 0.5;
  }

  .empty-state .empty-text {
    font-size: 14px;
  }

  /* === Loading State === */
  .loading-state {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    color: var(--secondary-text-color);
    font-size: 14px;
    gap: 8px;
  }

  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--divider-color, #e0e0e0);
    border-top-color: var(--primary-color, #03a9f4);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* === Error State === */
  .error-state {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    color: var(--error-color);
    font-size: 13px;
    background: rgba(219, 68, 55, 0.08);
    border-radius: 8px;
    margin: 8px 12px;
  }

  /* === Delivery Status === */
  .delivery-status {
    font-size: 11px;
    color: var(--timestamp-color);
    margin-top: 2px;
    padding: 0 4px;
    opacity: 0.8;
  }

  .delivery-waiting {
    color: var(--timestamp-color);
  }

  .delivery-sent {
    color: var(--primary-color, #03a9f4);
  }

  .delivery-delivered {
    color: #4caf50;
  }

  .delivery-failed {
    color: var(--error-color, #db4437);
  }

  /* === Route Info Inline === */
  .route-info-inline {
    font-size: 11px;
    color: var(--timestamp-color);
    font-family: monospace;
    margin-top: 2px;
    padding: 0 4px;
    opacity: 0.7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* === Device Cards === */
  .device-card {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 12px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    background: var(--card-background-color, #fff);
    cursor: pointer;
    transition: all 0.15s;
  }

  .device-card:hover {
    background: rgba(0, 0, 0, 0.02);
    border-color: var(--primary-color, #03a9f4);
  }

  .device-card.active {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
    border-color: var(--primary-color, #03a9f4);
  }

  .device-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .device-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .device-type {
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 4px;
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
    color: var(--primary-color, #03a9f4);
    font-weight: 500;
  }

  .device-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .device-stat {
    font-size: 12px;
    color: var(--secondary-text-color);
  }

  .device-stat-label {
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .device-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }

  .device-action-btn {
    padding: 6px 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }

  .device-action-btn:hover {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
    border-color: var(--primary-color, #03a9f4);
    color: var(--primary-color, #03a9f4);
  }

  .device-action-btn:active {
    transform: scale(0.98);
  }

  /* === Settings Page === */
  .settings-section {
    padding: 16px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .settings-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: 12px 0;
    user-select: none;
  }

  .settings-header:hover {
    color: var(--primary-color, #03a9f4);
  }

  .settings-header-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .settings-header-icon {
    font-size: 18px;
    transition: transform 0.2s;
  }

  .settings-header.collapsed .settings-header-icon {
    transform: rotate(-90deg);
  }

  .settings-content {
    display: none;
    padding: 12px 0;
  }

  .settings-content.expanded {
    display: block;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .form-group:last-child {
    margin-bottom: 0;
  }

  .form-label {
    display: block;
    font-size: 13px;
    font-weight: 500;
    color: var(--primary-text-color);
    margin-bottom: 6px;
  }

  .form-label.required::after {
    content: ' *';
    color: var(--error-color, #db4437);
  }

  .form-input,
  .form-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--input-border);
    border-radius: 6px;
    background: var(--input-bg);
    color: var(--primary-text-color);
    font-size: 13px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
    box-sizing: border-box;
  }

  .form-select {
    height: 39px;
    min-height: 39px;
    line-height: normal;
    appearance: menulist;
    -webkit-appearance: menulist;
  }

  .form-input:focus,
  .form-select:focus {
    border-color: var(--primary-color, #03a9f4);
  }

  .form-input:disabled,
  .form-select:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .form-toggle {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .form-toggle input[type='checkbox'] {
    width: 18px;
    height: 18px;
    cursor: pointer;
  }

  .form-toggle-label {
    font-size: 13px;
    color: var(--primary-text-color);
    cursor: pointer;
  }

  .form-description {
    font-size: 12px;
    color: var(--secondary-text-color);
    margin-top: 4px;
  }

  .apply-button {
    padding: 10px 20px;
    border: none;
    border-radius: 6px;
    background: var(--primary-color, #03a9f4);
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }

  .apply-button:hover {
    opacity: 0.9;
  }

  .apply-button:active {
    transform: scale(0.98);
  }

  .apply-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* === Dialog Components === */
  .dialog-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 16px;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    max-height: 80vh;
    border-radius: 12px;
    background: var(--card-background-color, #fff);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }

  .dialog-header {
    padding: 16px;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    flex-shrink: 0;
  }

  .dialog-header-title {
    font-size: 16px;
    font-weight: 600;
    color: var(--primary-text-color);
  }

  .dialog-body {
    flex: 1;
    overflow-y: auto;
    padding: 16px;
  }

  .dialog-footer {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    padding: 16px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    flex-shrink: 0;
  }

  .dialog-button {
    padding: 8px 16px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 6px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }

  .dialog-button:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  .dialog-button.primary {
    background: var(--primary-color, #03a9f4);
    color: #fff;
    border-color: var(--primary-color, #03a9f4);
  }

  .dialog-button.primary:hover {
    opacity: 0.9;
  }

  /* === Command Dialog === */
  .command-select {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid var(--input-border);
    border-radius: 6px;
    background: var(--input-bg);
    color: var(--primary-text-color);
    font-size: 13px;
    outline: none;
    box-sizing: border-box;
    height: 39px;
    min-height: 39px;
    line-height: normal;
    appearance: menulist;
    -webkit-appearance: menulist;
  }

  .command-description {
    font-size: 12px;
    color: var(--secondary-text-color);
    margin-top: 8px;
    padding: 8px;
    border-left: 2px solid var(--primary-color, #03a9f4);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.05);
    border-radius: 4px;
  }

  .command-params {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
  }

  .command-response {
    font-size: 12px;
    font-family: monospace;
    background: var(--input-bg);
    border: 1px solid var(--input-border);
    border-radius: 6px;
    padding: 12px;
    margin-top: 12px;
    /* normal (not pre-wrap): the structured/grid render path is built from
       indented template literals; pre-wrap would render that indentation as
       blank lines. The plain-text fallback wraps itself in a pre-wrap span to
       preserve multi-line CLI output. */
    white-space: normal;
    word-wrap: break-word;
    max-height: 200px;
    overflow-y: auto;
    color: var(--primary-text-color);
  }

  /* === Channel Management === */
  .channel-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .channel-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 6px;
    background: var(--card-background-color, #fff);
    transition: all 0.15s;
  }

  .channel-item:hover {
    background: rgba(0, 0, 0, 0.02);
    border-color: var(--primary-color, #03a9f4);
  }

  .channel-item-info {
    flex: 1;
  }

  .channel-item-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .channel-item-idx {
    font-size: 12px;
    color: var(--secondary-text-color);
    font-family: monospace;
  }

  .channel-item-actions {
    display: flex;
    gap: 6px;
  }

  .channel-action-btn {
    padding: 6px 10px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 4px;
    background: var(--card-background-color, #fff);
    color: var(--primary-text-color);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.15s;
  }

  .channel-action-btn:hover {
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
    border-color: var(--primary-color, #03a9f4);
    color: var(--primary-color, #03a9f4);
  }

  .channel-add-button {
    padding: 10px 16px;
    border: 2px dashed var(--divider-color, #e0e0e0);
    border-radius: 6px;
    background: transparent;
    color: var(--primary-color, #03a9f4);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }

  .channel-add-button:hover {
    border-color: var(--primary-color, #03a9f4);
    background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.05);
  }

  /* === Danger Zone === */
  .danger-zone {
    padding: 12px;
    border: 2px solid var(--error-color, #db4437);
    border-radius: 8px;
    background: rgba(219, 68, 55, 0.05);
  }

  .danger-zone-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--error-color, #db4437);
    margin-bottom: 8px;
  }

  .danger-button {
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background: var(--error-color, #db4437);
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.15s;
  }

  .danger-button:hover {
    opacity: 0.9;
  }

  .danger-button:active {
    transform: scale(0.98);
  }

  .danger-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* === Neighbor Info === */
  .neighbor-chart-container {
    width: 100%;
    height: 300px;
    border: 1px solid var(--divider-color, #e0e0e0);
    border-radius: 8px;
    background: var(--input-bg);
  }

  .neighbor-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
  }

  .neighbor-table th {
    padding: 10px 12px;
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: var(--primary-text-color);
    border-bottom: 2px solid var(--divider-color, #e0e0e0);
    background: rgba(0, 0, 0, 0.02);
  }

  .neighbor-table td {
    padding: 10px 12px;
    font-size: 12px;
    color: var(--primary-text-color);
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .neighbor-table tr:hover {
    background: rgba(0, 0, 0, 0.02);
  }

  /* === Narrow Mode Responsive === */
  :host([narrow]) .device-card {
    border-radius: 0;
    border-left: none;
    border-right: none;
  }

  :host([narrow]) .dialog {
    max-width: 100%;
    border-radius: 0;
  }

  :host([narrow]) .device-stats {
    grid-template-columns: 1fr;
  }

  :host([narrow]) .dialog-overlay {
    padding: 0;
  }

  :host([narrow]) .tab-bar button {
    flex: 0 0 auto;
    min-width: 88px;
    font-size: 12px;
    padding: 10px 12px;
  }

  @media (max-width: 900px) and (min-width: 601px) {
    .conversation-sidebar {
      width: 300px;
    }
  }

  :host([narrow]) .conversation-sidebar {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
    max-height: 40%;
  }

  :host([narrow]) .chat-layout {
    flex-direction: column;
  }

  /* === Sender Colors === */
  .sender-color-1 {
    --sender-color: #FF6B6B;
  }

  .sender-color-2 {
    --sender-color: #4ECDC4;
  }

  .sender-color-3 {
    --sender-color: #FFE66D;
  }

  .sender-color-4 {
    --sender-color: #95E1D3;
  }

  .sender-color-5 {
    --sender-color: #C7CEEA;
  }

  .sender-color-6 {
    --sender-color: #FF8B94;
  }

  .sender-color-7 {
    --sender-color: #B5EAD7;
  }

  .sender-color-8 {
    --sender-color: #FFB7B2;
  }

  /* === Accessibility === */
  .bubble:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .send-button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .dialog-button:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .form-input:focus-visible,
  .form-select:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
`)),Co=/^<[^>]+>\s*/,Bo=/@\[([^\]]+)\]/g,So=/@(\w+)/g,ko={recipient_type_entity:"select.hivefw_recipient_type",channel_entity:"select.hivefw_channel",contact_entity:"select.hivefw_contact",channel_entity_pattern:"binary_sensor.hivefw_{prefix}_ch_{idx}_messages",contact_entity_pattern:"binary_sensor.hivefw_{prefix}_{contact}_messages",domain_filter:"hivefw"},Io={...ko,hours_to_show:48,initial_hours:1,max_messages:500,show_date_separators:!0,group_messages:!0,group_timeout:300,timestamp_format:"time",update_mode:"auto",refresh_interval:30,enable_cache:!0,cache_ttl:86400,cache_max_size:5242880};async function Ro(e){try{return(await e.callWS({type:"hivefw_integration/get_devices"})).devices||[]}catch(e){return[]}}async function Mo(e,t){try{const i={type:"hivefw_integration/get_contacts"};return t&&(i.entry_id=t),(await e.callWS(i)).contacts||[]}catch(e){return[]}}async function Do(e,t){try{const i={type:"hivefw_integration/get_channels"};return t&&(i.entry_id=t),(await e.callWS(i)).channels||[]}catch(e){return[]}}async function Fo(e,t){try{const i={type:"hivefw_integration/get_device_config"};return t&&(i.entry_id=t),await e.callWS(i)}catch(e){throw new Error("Failed to get device configuration")}}async function To(e,t,i){try{const s={type:"hivefw_integration/set_device_config",settings:t};return i&&(s.entry_id=i),await e.callWS(s)}catch(e){const t=e;return{success:!1,changed:[],error:t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e)}}}async function Qo(e,t){try{const i={type:"hivefw_integration/get_flood_scopes"};t&&(i.entry_id=t);const s=await e.callWS(i);return{scopes:s.scopes||[],global:!!s.global}}catch(e){return{scopes:[],global:!1}}}async function Po(e,t){const i={type:"hivefw_integration/get_local_repeater_status"};return t&&(i.entry_id=t),e.callWS(i)}async function Oo(e,t){const i={type:"hivefw_integration/get_local_regions"};return t&&(i.entry_id=t),e.callWS(i)}async function Uo(e,t,i="",s="",a){const r={type:"hivefw_integration/set_local_region",operation:t,name:i,parent:s};return a&&(r.entry_id=a),e.callWS(r)}async function zo(e,t,i=!1){const s={type:"hivefw_integration/get_firmware_ota_status"};return t&&(s.entry_id=t),i&&(s.force=!0),e.callWS(s)}async function Ho(e,t,i,s){try{const a={type:"hivefw_integration/add_contact",public_key:t};return i&&(a.name=i),s&&(a.entry_id=s),await e.callWS(a)}catch(e){return{success:!1}}}async function $o(e,t,i){try{const s={type:"hivefw_integration/remove_contact",public_key:t};return i&&(s.entry_id=i),await e.callWS(s)}catch(e){return{success:!1}}}async function No(e,t,i){try{const s={type:"hivefw_integration/mark_conversation_read",entity_id:t};return i&&(s.entry_id=i),await e.callWS(s)}catch(e){return{success:!1}}}async function Lo(e,t,i){try{const s={type:"hivefw_integration/set_location_source",source:t};return i&&(s.entry_id=i),await e.callWS(s)}catch(e){return{success:!1}}}class Go{constructor(){this._counts={},this._lastRead={},this._subscribers=new Set,this._markReadRequestedHandler=null,this._readProgress=null,this._postSwitchTimerHandler=null}subscribe(e){return this._subscribers.add(e),()=>{this._subscribers.delete(e)}}onMarkReadRequested(e){this._markReadRequestedHandler=e}onPostSwitchTimerFire(e){this._postSwitchTimerHandler=e}requestMarkRead(e){e&&this._markReadRequestedHandler&&this._markReadRequestedHandler(e)}_notify(){for(const e of[...this._subscribers])try{e()}catch(e){console.error("[UnreadController] subscriber callback threw",e)}}ingestBackendData(e,t){var i,s;this._counts={...null!==(i=null==e?void 0:e.unread)&&void 0!==i?i:{}},this._lastRead={...null!==(s=null==e?void 0:e.last_read)&&void 0!==s?s:{}},this._notify()}clearEntity(e){e&&this._counts[e]&&(this._counts={...this._counts,[e]:0},this._notify())}get counts(){return this._counts}get lastRead(){return this._lastRead}beginConversation(e,t){var i;this._clearPostSwitchTimer();const s={entityId:e,anchorId:e&&null!==(i=this._lastRead[e])&&void 0!==i?i:null,unreadCountAtSelection:t,graceUntil:Date.now()+1e3,postSwitchTimer:null,markReadFired:!1,lastMarkReadIdSent:null};this._readProgress=s,s.postSwitchTimer=setTimeout(()=>{var e;this._readProgress===s&&(s.postSwitchTimer=null,null===(e=this._postSwitchTimerHandler)||void 0===e||e.call(this))},1e3)}endConversation(){this._clearPostSwitchTimer(),this._readProgress=null}_clearPostSwitchTimer(){const e=this._readProgress;null!=e&&e.postSwitchTimer&&(clearTimeout(e.postSwitchTimer),e.postSwitchTimer=null)}resetUnreadCountAtSelection(){this._readProgress&&(this._readProgress.unreadCountAtSelection=0)}maybeReanchorOnLateData(e){const t=this._readProgress;if(!t||t.entityId!==e)return!1;if(null!==t.anchorId)return!1;if(t.markReadFired)return!1;const i=this._lastRead[e];return!!i&&(t.anchorId=i,!0)}onScrollState(e){return this._tryAdvanceCursor(e.entityId,e.lastMessageVisible,e.hasNewerMessages,e.bufferTailId,!1)}onPillJump(e){return this._tryAdvanceCursor(e.entityId,!0,!1,e.bufferTailId,!0)}_tryAdvanceCursor(e,t,i,s,a){if(!e)return!1;const r=this._readProgress;return!(!r||r.entityId!==e||!a&&Date.now()<r.graceUntil||i||!t||null!==s&&s===r.lastMarkReadIdSent||(r.lastMarkReadIdSent=s,r.markReadFired=!0,this.requestMarkRead(e),0))}badgeCount(e,t,i){if(!e)return 0;const s=this._counts;if(i&&s[i])return s[i];const a=/^\d+$/.test(e),r=t?`hivefw_${t}_ch_${e}_messages`:null;for(const[t,i]of Object.entries(s))if(!(i<=0))if(a){if(r){if(t.endsWith(r))return i}else if(t.endsWith(`_ch_${e}_messages`))return i}else{const s=e.substring(0,6);if(t.endsWith(`_${s}_messages`))return i}return 0}dividerAfterGroupIdx(e){const t=this._readProgress;if(!t)return null;let i=null;if(t.anchorId){let s=0;for(const a of e)if("date-separator"!==a.type){if(a.group.messages.some(e=>e.id===t.anchorId)){i=s;break}s++}}if(null!==i){let t=0;for(const s of e)if("date-separator"!==s.type){if(t>i&&!s.group.isOutgoing)return t;t++}return null}if(t.unreadCountAtSelection>0){const i=e.filter(e=>"date-separator"!==e.type).length-t.unreadCountAtSelection;return i>=0?i:0}return null}cursorAtTail(e,t){return!(!e||null===t)&&this._lastRead[e]===t}}const Yo=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function Ko(e){const t=(new TextEncoder).encode(e),i=t.length,s=8*i,a=i+9+63&-64,r=new Uint8Array(a);r.set(t),r[i]=128;const n=new DataView(r.buffer);n.setUint32(a-4,s,!1);let o=1779033703,l=3144134277,c=1013904242,d=2773480762,h=1359893119,p=2600822924,u=528734635,g=1541459225;const A=new Int32Array(64);for(let e=0;e<a;e+=64){for(let t=0;t<16;t++)A[t]=n.getInt32(e+4*t,!1);for(let e=16;e<64;e++){const t=(A[e-15]>>>7|A[e-15]<<25)^(A[e-15]>>>18|A[e-15]<<14)^A[e-15]>>>3,i=(A[e-2]>>>17|A[e-2]<<15)^(A[e-2]>>>19|A[e-2]<<13)^A[e-2]>>>10;A[e]=A[e-16]+t+A[e-7]+i|0}let t=o,i=l,s=c,a=d,r=h,f=p,m=u,_=g;for(let e=0;e<64;e++){const n=_+((r>>>6|r<<26)^(r>>>11|r<<21)^(r>>>25|r<<7))+(r&f^~r&m)+Yo[e]+A[e]|0,o=t&i^t&s^i&s;_=m,m=f,f=r,r=a+n|0,a=s,s=i,i=t,t=n+(((t>>>2|t<<30)^(t>>>13|t<<19)^(t>>>22|t<<10))+o|0)|0}o=o+t|0,l=l+i|0,c=c+s|0,d=d+a|0,h=h+r|0,p=p+f|0,u=u+m|0,g=g+_|0}const f=e=>(e>>>0).toString(16).padStart(8,"0");return f(o)+f(l)+f(c)+f(d)+f(h)+f(p)+f(u)+f(g)}function jo(e){const t=[],i=new Set;let s;const a=new RegExp(Bo.source,"g");for(;null!==(s=a.exec(e));){const e=s[1];i.has(e)||(i.add(e),t.push(e))}const r=new RegExp(So.source,"g");for(;null!==(s=r.exec(e));){const e=s[1];i.has(e)||(i.add(e),t.push(e))}return t}function Wo(e){if(!e||0===e.length)return{};let t,i;for(const s of e)void 0===t&&"string"==typeof s.flood_scope&&(t=s.flood_scope),void 0===i&&"boolean"==typeof s.region_scope&&(i=s.region_scope);return{floodScope:t,regionScope:i}}function Jo(e){var t,i;const s=Wo(e.rx_log_data);return{id:e.id,sender:e.sender,text:e.text,timestamp:new Date(e.timestamp),isOutgoing:e.outgoing,isSystem:!1,raw:e.text,mentions:jo(e.text),rxLogData:e.rx_log_data,deliveryStatus:e.delivery_status?{status:e.delivery_status,ackReceived:e.ack_received,repeaterCount:e.repeater_count,roundTripMs:e.round_trip_ms}:void 0,repeaterCount:e.repeater_count,floodScope:null!==(t=e.flood_scope)&&void 0!==t?t:s.floodScope,regionScope:null!==(i=e.region_scope)&&void 0!==i?i:s.regionScope}}function qo(e,t){return e.getFullYear()!==t.getFullYear()||e.getMonth()!==t.getMonth()||e.getDate()!==t.getDate()}function Vo(e){const t=new Date,i=new Date(t.getFullYear(),t.getMonth(),t.getDate()),s=new Date(e.getFullYear(),e.getMonth(),e.getDate()),a=Math.floor((i.getTime()-s.getTime())/864e5);return 0===a?"Today":1===a?"Yesterday":a<7?e.toLocaleDateString(void 0,{weekday:"long"}):e.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}class Zo{constructor(e){this._messages=[],this._loading=!1,this._error=null,this._entityId=null,this._hass=null,this._pollTimer=null,this._realtimeSubscriptions=[],this._retryCount=0,this._onChange=null,this._fetchDebounce=null,this._active=!1,this._hasOlderMessages=!0,this._loadingOlder=!1,this._hasNewerMessages=!1,this._loadingNewer=!1,this._newMessagesWhileAway=0,this._userAtBottom=!1,this._config=e}get messages(){return this._messages}get loading(){return this._loading}get error(){return this._error}get entityId(){return this._entityId}get loadingOlder(){return this._loadingOlder}get hasOlderMessages(){return this._hasOlderMessages}get loadingNewer(){return this._loadingNewer}get hasNewerMessages(){return this._hasNewerMessages}get newMessagesWhileAway(){return this._newMessagesWhileAway}setUserAtBottom(e){this._userAtBottom!==e&&(this._userAtBottom=e,e&&!this._hasNewerMessages&&this._newMessagesWhileAway>0&&(this._newMessagesWhileAway=0,this._notify()))}resetNewMessagesCounter(){0!==this._newMessagesWhileAway&&(this._newMessagesWhileAway=0,this._notify())}setOnChange(e){this._onChange=e}setHass(e){this._hass=e}setConfig(e){this._config=e}async switchEntity(e,t=null){if(e!==this._entityId){if(this._stopUpdates(),this._entityId=e,this._messages=[],this._error=null,this._retryCount=0,this._hasOlderMessages=!0,this._loadingOlder=!1,this._hasNewerMessages=!1,this._loadingNewer=!1,this._newMessagesWhileAway=0,this._userAtBottom=!1,!e)return this._active=!1,void this._notify();this._active=!0,this._startUpdates(e),t?await this._fetchAroundAnchor(e,t):await this._fetchMessages(e)}}async refresh(){this._entityId&&await this._fetchMessages(this._entityId)}addOptimisticMessage(e,t){const i=new Date,s={id:`optimistic_${i.getTime()}_${Math.random().toString(36).slice(2,8)}`,sender:e,text:t,timestamp:i,isOutgoing:!0,isSystem:!1,raw:`${e}: ${t}`,mentions:[]};this._messages=[...this._messages,s],this._notify()}async loadOlderMessages(){if(!this._loadingOlder&&this._hasOlderMessages&&this._hass&&this._entityId){this._loadingOlder=!0,this._notify();try{const e=this._messages.find(e=>!e.id.startsWith("rt_")&&!e.id.startsWith("optimistic_")),t={type:"hivefw_integration/get_stored_messages",entity_id:this._entityId,limit:50};e&&(t.before=e.id);const i=await this._hass.callWS(t),s=i.messages.map(Jo);this._hasOlderMessages=i.has_more;const a=new Set(this._messages.map(e=>e.id)),r=s.filter(e=>!a.has(e.id));r.length>0&&(this._messages=[...r,...this._messages],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime()))}catch(e){}finally{this._loadingOlder=!1,this._notify()}}}async loadNewerMessages(){if(!this._loadingNewer&&this._hasNewerMessages&&this._hass&&this._entityId){this._loadingNewer=!0,this._notify();try{let t;for(let e=this._messages.length-1;e>=0;e--){const i=this._messages[e].id;if(!i.startsWith("rt_")&&!i.startsWith("optimistic_")){t=i;break}}const i={type:"hivefw_integration/get_stored_messages",entity_id:this._entityId,limit:50};t&&(i.after=t);const s=await this._hass.callWS(i),a=s.messages.map(Jo);this._hasNewerMessages=s.has_more;const r=new Set(a.map(e=>e.id));this._messages=this._messages.filter(e=>!e.id.startsWith("rt_")||!r.has(e.id.substring(3)));const n=new Set(this._messages.map(e=>e.id)),o=a.filter(e=>!n.has(e.id));if(o.length>0){var e;this._messages=[...this._messages,...o],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime());const t=null!==(e=this._config.max_messages)&&void 0!==e?e:500;this._messages.length>t&&(this._messages=this._messages.slice(-t),this._hasOlderMessages=!0)}}catch(e){}finally{this._loadingNewer=!1,this._notify()}}}async fetchAroundTimestamp(e){const t=new Date(e).getTime(),i=this._messages.find(e=>Math.abs(e.timestamp.getTime()-t)<2e3);if(i)return!0;let s=0;for(;this._hasOlderMessages&&s<20;){await this.loadOlderMessages(),s++;const e=this._messages.find(e=>Math.abs(e.timestamp.getTime()-t)<2e3);if(e)return!0}return!1}pause(){this._stopUpdates(),this._active=!1,this._fetchDebounce&&(clearTimeout(this._fetchDebounce),this._fetchDebounce=null)}async resume(){this._entityId&&!this._active&&(this._active=!0,this._startUpdates(this._entityId),await this._fetchMessages(this._entityId))}destroy(){this._stopUpdates(),this._active=!1,this._fetchDebounce&&(clearTimeout(this._fetchDebounce),this._fetchDebounce=null),this._onChange=null}async _fetchMessages(e){if(this._hass){this._loading=!0,this._notify();try{var t;const i=50,s=await this._hass.callWS({type:"hivefw_integration/get_stored_messages",entity_id:e,limit:i}),a=s.messages.map(Jo);this._hasOlderMessages=s.has_more;const r=new Set(a.map(e=>e.id)),n=this._messages.filter(e=>{if(e.id.startsWith("optimistic_")){const t=a.some(t=>t.sender===e.sender&&t.text===e.text);return!t}if(e.id.startsWith("rt_")){const t=e.id.substring(3);return!r.has(t)}return!1});this._messages=[...a,...n],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime());const o=null!==(t=this._config.max_messages)&&void 0!==t?t:500;this._messages.length>o&&(this._messages=this._messages.slice(-o),this._hasOlderMessages=!0),this._error=null,this._retryCount=0}catch(e){const t=e instanceof Error?e.message:String(e);this._error=`Failed to fetch messages: ${t}`,this._retryCount++}finally{this._loading=!1,this._notify()}}}async _fetchAroundAnchor(e,t){if(this._hass){this._loading=!0,this._notify();try{var i;const s=await async function(e,t,i,s=25,a=50){return e.callWS({type:"hivefw_integration/get_messages_around",entity_id:t,anchor_id:i,before_limit:s,after_limit:a})}(this._hass,e,t),a=s.messages.map(Jo);this._hasOlderMessages=s.has_more_before,this._hasNewerMessages=s.has_more_after;const r=new Set(a.map(e=>e.id)),n=this._messages.filter(e=>{if(e.id.startsWith("optimistic_")){const t=a.some(t=>t.sender===e.sender&&t.text===e.text);return!t}if(e.id.startsWith("rt_")){const t=e.id.substring(3);return!r.has(t)}return!1});this._messages=[...a,...n],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime());const o=null!==(i=this._config.max_messages)&&void 0!==i?i:500;this._messages.length>o&&(this._messages=this._messages.slice(-o),this._hasOlderMessages=!0),this._error=null,this._retryCount=0}catch(e){const t=e instanceof Error?e.message:String(e);this._error=`Failed to fetch messages: ${t}`,this._retryCount++}finally{this._loading=!1,this._notify()}}}_startUpdates(e){this._startPolling(e),this._subscribeRealtime(e).catch(()=>{})}async _subscribeRealtime(e){if(!this._hass)return;const t=[];try{const i=await this._hass.connection.subscribeEvents(t=>{t.data.entity_id===e&&this._handleRealtimeMessage(t.data)},"hivefw_message");t.push(i);const s=await this._hass.connection.subscribeEvents(t=>{t.data.entity_id===e&&this._handleDeliveryUpdate(t.data)},"hivefw_delivery_update");t.push(s),this._realtimeSubscriptions=t}catch(e){throw t.forEach(e=>e()),e}}_handleRealtimeMessage(e){var t,i;const s=null!==(t=e.sender_name)&&void 0!==t?t:e.sender,a=null!==(i=e.message)&&void 0!==i?i:e.text;if(s===this._config.node_name){if(s&&a){const t=e.ack_received,i=e.repeater_count,n=e.rx_log_data,o=e.message_type;let l;var r;if("dm"===o||"direct"===o)l={status:!0===t?"delivered":"sent",ackReceived:null!=t?t:void 0};else l={status:"sent",repeaterCount:null!=i?i:null!==(r=null==n?void 0:n.length)&&void 0!==r?r:0};for(let e=this._messages.length-1;e>=0;e--){const t=this._messages[e];if(t.id.startsWith("optimistic_")&&t.sender===s&&t.text===a){t.deliveryStatus=l,n&&(t.rxLogData=n),this._notify();break}}}!this._entityId||this._hasNewerMessages||this._hasOlderMessages||this._debouncedFetch(this._entityId)}else{if(s&&a){let t=a.replace(Co,"");const i=s+": ";t.startsWith(i)&&(t=t.substring(i.length));const r=e.timestamp||(new Date).toISOString(),n=new Date(r),o=function(e,t,i){return Ko(`${e}|${t}|${i}`).substring(0,12)}(r,s,t),l=`rt_${o}`,c=this._messages.some(e=>e.id===l||e.id===o);if(!c){const i=jo(t),r=e.rx_log_data,o={id:l,sender:s,text:t,timestamp:n,isOutgoing:!1,isSystem:!1,raw:a,mentions:i,rxLogData:r&&r.length>0?r:void 0,...Wo(r)};this._messages.push(o),this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime()),this._userAtBottom&&!this._hasNewerMessages||this._newMessagesWhileAway++,this._notify()}}!this._entityId||this._hasNewerMessages||this._hasOlderMessages||this._debouncedFetch(this._entityId)}}_debouncedFetch(e){this._fetchDebounce&&clearTimeout(this._fetchDebounce),this._fetchDebounce=setTimeout(async()=>{if(this._fetchDebounce=null,this._active)try{await this._fetchMessages(e)}catch(e){}},500)}_handleDeliveryUpdate(e){const t=e.rx_log_data;if(e.progressive&&t&&t.length>0){const i=e.sender_name,s=e.message,a=e.timestamp;if(i&&s){const e=a?new Date(a).getTime():0;for(let a=this._messages.length-1;a>=0;a--){const r=this._messages[a];if(!r.isOutgoing&&r.sender===i&&r.text===s&&(!e||Math.abs(r.timestamp.getTime()-e)<1e4))return r.rxLogData=t,r.repeaterCount=t.length,void this._notify()}}}const i=e.send_id,s=e.status,a=e.repeater_count,r=e.ack_received,n=e.round_trip_ms,o=e.progressive;if(!i)return;let l,c;l=s||(!0===r?"delivered":!o||void 0!==a&&0!==a?"sent":"waiting");for(let e=this._messages.length-1;e>=0;e--)if(this._messages[e].isOutgoing){c=this._messages[e];break}c&&(c.deliveryStatus={status:l,repeaterCount:a,ackReceived:r,roundTripMs:n},void 0!==a&&(c.repeaterCount=a),this._notify())}async _pollFetch(e){if(this._hass&&!this._hasNewerMessages)try{let i;for(let e=this._messages.length-1;e>=0;e--){const t=this._messages[e].id;if(!t.startsWith("rt_")&&!t.startsWith("optimistic_")){i=t;break}}const s={type:"hivefw_integration/get_stored_messages",entity_id:e,limit:50};i&&(s.after=i);const a=await this._hass.callWS(s);if(0===a.messages.length)return this._error=null,void(this._retryCount=0);const r=a.messages.map(Jo),n=new Set(this._messages.map(e=>e.id)),o=r.filter(e=>!n.has(e.id));if(o.length>0){var t;const e=new Set(o.map(e=>e.id));this._messages=this._messages.filter(t=>!t.id.startsWith("rt_")||!e.has(t.id.substring(3))),this._messages=this._messages.filter(e=>!e.id.startsWith("optimistic_")||!o.some(t=>t.sender===e.sender&&t.text===e.text)),this._messages=[...this._messages,...o],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime());const i=null!==(t=this._config.max_messages)&&void 0!==t?t:500;this._messages.length>i&&(this._messages=this._messages.slice(-i),this._hasOlderMessages=!0),this._notify()}this._error=null,this._retryCount=0}catch(e){this._retryCount++}}_startPolling(e){const t=()=>{if(!this._active)return;const i=this._retryCount>=5?6e4:3e4;this._pollTimer=setTimeout(async()=>{if(this._active){try{await this._pollFetch(e)}catch(e){}t()}},i)};t()}_stopUpdates(){this._pollTimer&&(clearTimeout(this._pollTimer),this._pollTimer=null);for(const e of this._realtimeSubscriptions)e();this._realtimeSubscriptions=[]}_notify(){this._onChange&&this._onChange()}}let Xo=class extends mo{constructor(){super(...arguments),this.conversations=[],this.activeId=null,this.unreadCounts={},this.nodePrefix=null,this._activeFilter="all",this._filteredConversations=[],this._appsChannelId=null,this._appsPickerOpen=!1}connectedCallback(){super.connectedCallback(),this._loadAppsChannelPreference()}updated(e){e.has("nodePrefix")&&this._loadAppsChannelPreference(),(e.has("conversations")||e.has("_activeFilter")||e.has("_appsChannelId"))&&this._updateFiltered()}render(){const e=this._getAppsChannel(),t=this._channelConversations();return Zn(o||(o=on`
      <section class="apps-section" aria-label="Canal APPS/SOS">
        <div class="sidebar-header">
          <span class="sidebar-title">Canal APPS/SOS</span>

        </div>

        <div class="apps-channel-slot" role="listbox" aria-label="Canal APPS/SOS selecionado">
          ${0}
        </div>

        ${0}
      </section>

      <div class="sidebar-header main-section-header">
        <span class="sidebar-title main-section-title">Canais</span>
        <div class="apps-header-actions">
          <button
            class="compose-btn"
            title="Marcar todas as mensagens como lidas"
            aria-label="Marcar todas as mensagens como lidas"
            ?disabled=${0}
            @click=${0}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
          </button>
          <button
            class="compose-btn"
            title="Atualizar canais do rádio"
            aria-label="Atualizar canais do rádio"
            @click=${0}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.09 0-7.19 3.72-6.39 7.69l-2.08.68C2.47 7.11 6.48 2 12 2c2.76 0 5.26 1.12 7.07 2.93L22 2v8h-8l3.65-3.65zM6.35 17.65C7.8 19.1 9.79 20 12 20c4.09 0 7.19-3.72 6.39-7.69l2.08-.68C21.53 16.89 17.52 22 12 22c-2.76 0-5.26-1.12-7.07-2.93L2 22v-8h8l-3.65 3.65z"/>
            </svg>
          </button>
          <button
            class="compose-btn"
            title="Gerir canais"
            aria-label="Gerir canais"
            @click=${0}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
              <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
            </svg>
          </button>
        </div>
      </div>
      <div
        class="conversation-list"
        role="listbox"
        aria-label="Canais e chats"
        @keydown=${0}>
        ${0}
      </div>
    `),e?Zn(l||(l=on`
                <div class="apps-channel-selected">
                  ${0}
                  <button
                    class="compose-btn"
                    title="Selecionar canal APPS/SOS"
                    aria-label="Selecionar canal APPS/SOS"
                    aria-expanded=${0}
                    @click=${0}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
                    </svg>
                  </button>
                </div>
              `),this._renderConversation(e,0),this._appsPickerOpen?"true":"false",e=>{e.stopPropagation(),this._appsPickerOpen=!this._appsPickerOpen}):Zn(c||(c=on`<div class="apps-empty">Seleciona o canal usado por APPS/SOS na roda dentada.</div>`)),this._appsPickerOpen?Zn(d||(d=on`
          <div class="apps-picker" role="menu" aria-label="Selecionar canal APPS/SOS">
            <div class="apps-picker-title">Canal apresentado</div>
            <button
              class="apps-picker-item ${0}"
              @click=${0}>
              <span class="apps-picker-check">${0}</span>
              <span class="apps-picker-channel">Nenhum</span>
            </button>
            ${0}
          </div>
        `),null===this._appsChannelId?"active":"",()=>this._setAppsChannel(null),null===this._appsChannelId?"✓":"",t.map(e=>{const t=String(e.channel_idx),i=t===this._appsChannelId;return Zn(h||(h=on`
                <button
                  class="apps-picker-item ${0}"
                  @click=${0}>
                  <span class="apps-picker-check">${0}</span>
                  <span class="apps-picker-channel">${0}</span>
                </button>
              `),i?"active":"",()=>this._setAppsChannel(t),i?"✓":"",e.name||`Channel ${e.channel_idx}`)})):"",!this._hasUnreadMessages(),()=>this._markAllRead(),()=>this.dispatchEvent(new CustomEvent("refresh-channels-requested",{bubbles:!0,composed:!0})),()=>this.dispatchEvent(new CustomEvent("manage-requested",{detail:{tab:"channels"},bubbles:!0,composed:!0})),this._onListKeyDown,this._filteredConversations.length>0?this._filteredConversations.map((e,t)=>this._renderConversation(e,t)):Zn(p||(p=on`
              <div class="empty-state">
                <div class="empty-text">
                  ${0}
                </div>
              </div>
            `),this._emptyMessage()))}_onListKeyDown(e){var t;const i=e.key;if("ArrowDown"!==i&&"ArrowUp"!==i&&"Home"!==i&&"End"!==i&&"Enter"!==i&&" "!==i)return;const s=this.shadowRoot;if(!s)return;const a=Array.from(s.querySelectorAll(".conversation-item"));if(0===a.length)return;const r=s.activeElement;let n=r?a.indexOf(r):-1;"Enter"!==i&&" "!==i?(e.preventDefault(),"Home"===i?n=0:"End"===i?n=a.length-1:"ArrowDown"===i?n=n<0?0:Math.min(n+1,a.length-1):"ArrowUp"===i&&(n=n<0?a.length-1:Math.max(n-1,0)),null===(t=a[n])||void 0===t||t.focus()):r&&n>=0&&(e.preventDefault(),r.click())}_appsStorageKey(){return`hivefw.apps_sos_channel.${this.nodePrefix||"default"}`}_loadAppsChannelPreference(){try{const e=window.localStorage.getItem(this._appsStorageKey());this._appsChannelId=e&&e.length?e:null}catch(e){this._appsChannelId=null}}_setAppsChannel(e){this._appsChannelId=e,this._appsPickerOpen=!1;try{null===e?window.localStorage.removeItem(this._appsStorageKey()):window.localStorage.setItem(this._appsStorageKey(),e)}catch(e){}this._updateFiltered()}_channelConversations(){return this.conversations.filter(e=>!("pubkey_prefix"in e))}_getAppsChannel(){var e;return null===this._appsChannelId?null:null!==(e=this._channelConversations().find(e=>String(e.channel_idx)===this._appsChannelId))&&void 0!==e?e:null}_isAppsChannel(e){return null!==this._appsChannelId&&!("pubkey_prefix"in e)&&String(e.channel_idx)===this._appsChannelId}_renderFilterBtn(e,t){const i=this._activeFilter===e;return Zn(u||(u=on`
      <button
        class="filter-btn ${0}"
        role="tab"
        aria-selected=${0}
        @click=${0}>
        ${0}
      </button>
    `),i?"active":"",i?"true":"false",()=>{this._activeFilter=e},t)}_hasUnreadMessages(){var e,t,i;const s=null!==(e=null!==(t=null===(i=this.unread)||void 0===i?void 0:i.counts)&&void 0!==t?t:this.unreadCounts)&&void 0!==e?e:{};return Object.values(s).some(e=>Number(e)>0)}_markAllRead(){this.dispatchEvent(new CustomEvent("mark-all-read-requested",{bubbles:!0,composed:!0}))}_emptyMessage(){switch(this._activeFilter){case"unread":return"No unread conversations";case"dms":return"No direct messages";case"channels":return"No channels";default:return"No conversations yet"}}_renderConversation(e,t){const i="pubkey_prefix"in e,s=i?e.pubkey_prefix:String(e.channel_idx),a=i?e.adv_name:e.name,r=i?e.pubkey_prefix:`Channel ${e.channel_idx}`,n=i?e.pubkey_prefix.substring(0,2).toUpperCase():`#${e.channel_idx}`,o=this.activeId===s,l=this._getUnreadCount(s),c=l>0?`${a}, ${r}, ${l} unread`:`${a}, ${r}`,d=this._filteredConversations.some(e=>("pubkey_prefix"in e?e.pubkey_prefix:String(e.channel_idx))===this.activeId);return Zn(g||(g=on`
      <div
        class=${0}
        role="option"
        tabindex=${0}
        aria-selected=${0}
        aria-label=${0}
        @click=${0}>
        <div class="conversation-avatar ${0}">${0}</div>
        <div class="conversation-info">
          <div class="conversation-name">${0}</div>
          <div class="conversation-detail">${0}</div>
        </div>
        ${0}
      </div>
    `),o?"conversation-item active":"conversation-item",o||!d&&0===t?"0":"-1",o?"true":"false",c,()=>this.dispatchEvent(new CustomEvent("conversation-selected",{detail:{id:s,isContact:i}})),i?"":"channel",n,a,r,l>0?Zn(A||(A=on`<div class="unread-badge" aria-hidden="true">${0}</div>`),l):Zn(f||(f=on`<span class="chevron" aria-hidden="true">›</span>`)))}_getUnreadCount(e){return this.unread?this.unread.badgeCount(e,this.nodePrefix):0}_updateFiltered(){const e=this.conversations.filter(e=>!this._isAppsChannel(e));switch(this._activeFilter){case"all":this._filteredConversations=[...e];break;case"unread":this._filteredConversations=e.filter(e=>{const t="pubkey_prefix"in e?e.pubkey_prefix:String(e.channel_idx);return this._getUnreadCount(t)>0});break;case"dms":this._filteredConversations=e.filter(e=>"pubkey_prefix"in e);break;case"channels":this._filteredConversations=e.filter(e=>!("pubkey_prefix"in e))}}};Xo.styles=gn(m||(m=on`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-height: 0;
      width: 280px;
      border-right: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      flex-shrink: 0;
    }

    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 12px 8px;
      gap: 8px;
      min-width: 0;
    }

    .apps-section {
      position: relative;
      flex: 0 0 auto;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .apps-channel-slot {
      min-height: 65px;
    }

    .apps-channel-selected {
      display:grid;
      grid-template-columns:minmax(0,1fr) auto;
      align-items:center;
      gap:6px;
    }

    .apps-channel-selected .compose-btn {
      flex:0 0 auto;
    }

    .apps-empty {
      padding: 12px;
      color: var(--secondary-text-color, #727272);
      font-size: 12px;
    }

    .apps-picker {
      position: absolute;
      top: 48px;
      left: 8px;
      right: 8px;
      z-index: 20;
      padding: 8px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 10px;
      background: var(--card-background-color, #fff);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
      max-height: min(360px, 55vh);
      overflow-y: auto;
    }

    .apps-picker-title {
      padding: 4px 8px 8px;
      color: var(--secondary-text-color, #727272);
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .04em;
    }

    .apps-picker-item,
    .apps-picker-manage {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 8px;
      padding: 9px 10px;
      border: 0;
      border-radius: 7px;
      background: transparent;
      color: var(--primary-text-color);
      font: inherit;
      font-size: 13px;
      text-align: left;
      cursor: pointer;
      box-sizing: border-box;
    }

    .apps-picker-item:hover,
    .apps-picker-manage:hover {
      background: rgba(0, 0, 0, 0.04);
    }

    .apps-picker-item.active {
      color: var(--primary-color, #03a9f4);
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
      font-weight: 600;
    }

    .apps-picker-divider {
      height: 1px;
      margin: 6px 2px;
      background: var(--divider-color, #e0e0e0);
    }

    .apps-picker-channel {
      min-width: 0;
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .apps-picker-check {
      flex: 0 0 auto;
      width: 16px;
      text-align: center;
    }

    .main-section-header {
      padding-bottom: 6px;
    }

    .main-section-title {
      font-size: 14px;
    }

    .sidebar-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--primary-text-color);
      flex: 1;
    }

    .compose-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      transition: all 0.15s;
      flex-shrink: 0;
    }

    .compose-btn:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--primary-text-color);
    }

    .compose-btn:disabled {
      opacity: 0.35;
      cursor: default;
      background: transparent;
      color: var(--secondary-text-color);
    }

    .apps-header-actions {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
    }

    .filter-bar {
      display: flex;
      padding: 12px 12px 8px;
      gap: 4px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .filter-btn {
      flex: 1;
      padding: 6px 4px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 16px;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .filter-btn:hover {
      background: rgba(0, 0, 0, 0.03);
      color: var(--primary-text-color);
    }

    .filter-btn.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }

    .conversation-list {
      flex: 1 1 auto;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    .conversation-list::-webkit-scrollbar {
      width: 6px;
    }

    .conversation-list::-webkit-scrollbar-track {
      background: transparent;
    }

    .conversation-list::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb, var(--scrollbar-thumb-color, #c1c1c1));
      border-radius: 3px;
    }

    .conversation-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      transition: background 0.15s;
      outline: none;
    }

    .conversation-item:hover,
    .conversation-item:focus-visible {
      background: rgba(0, 0, 0, 0.02);
    }

    .conversation-item:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -2px;
    }

    .conversation-item.active {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
      border-left: 3px solid var(--primary-color, #03a9f4);
    }

    .conversation-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      flex-shrink: 0;
    }

    .conversation-avatar.channel {
      background: var(--accent-color, #ff9800);
    }

    .conversation-info {
      flex: 1;
      overflow: hidden;
    }

    .conversation-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .conversation-detail {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .chevron {
      flex-shrink: 0;
      color: var(--secondary-text-color, #727272);
      font-size: 18px;
      line-height: 1;
      opacity: 0.5;
    }

    .unread-badge {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
      flex-shrink: 0;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--secondary-text-color, #727272);
      text-align: center;
      padding: 24px;
    }

    .empty-icon {
      font-size: 32px;
      margin-bottom: 8px;
      opacity: 0.5;
    }

    .empty-text {
      font-size: 13px;
    }
  `)),ln([yo({type:Array})],Xo.prototype,"conversations",void 0),ln([yo({type:String})],Xo.prototype,"activeId",void 0),ln([yo({attribute:!1})],Xo.prototype,"unread",void 0),ln([yo({type:Object})],Xo.prototype,"unreadCounts",void 0),ln([yo({type:String})],Xo.prototype,"nodePrefix",void 0),ln([xo()],Xo.prototype,"_activeFilter",void 0),ln([xo()],Xo.prototype,"_filteredConversations",void 0),ln([xo()],Xo.prototype,"_appsChannelId",void 0),ln([xo()],Xo.prototype,"_appsPickerOpen",void 0),Xo=ln([vo("meshcore-conversation-list")],Xo);const el=["a[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),tl=[];let il=!1;function sl(){il||(il=!0,document.addEventListener("keydown",al,!0))}function al(e){0!==tl.length&&tl[tl.length-1]._handleKeyDown(e)}class rl{constructor(e,t){this.host=e,this.opts=t,this._wasOpen=!1,this._previousActive=null,this._inStack=!1,this.host.addController(this),sl()}hostConnected(){sl()}hostDisconnected(){this._inStack&&this._popStack(),this._previousActive=null,this._wasOpen=!1}hostUpdated(){const e=this.opts.isOpen();if(e&&!this._wasOpen)this._previousActive=this._currentDocumentActive(),this._pushStack(),this._focusFirstSoon();else if(!e&&this._wasOpen){this._popStack();const e=this._previousActive;if(this._previousActive=null,e&&e.isConnected&&"function"==typeof e.focus)try{e.focus()}catch(e){}}this._wasOpen=e}_pushStack(){this._inStack||(tl.push(this),this._inStack=!0)}_popStack(){const e=tl.indexOf(this);e>=0&&tl.splice(e,1),this._inStack=!1}_getFocusables(){var e,t,i;const s=null!==(e=null===(t=(i=this.opts).getScope)||void 0===t?void 0:t.call(i))&&void 0!==e?e:this.host.shadowRoot;return s?Array.from(s.querySelectorAll(el)).filter(e=>!(e.hasAttribute("aria-hidden")||e.hidden||null===e.offsetParent&&0===e.getClientRects().length)):[]}_focusFirstSoon(){queueMicrotask(()=>{var e,t,i;if(!this.opts.isOpen())return;const s=null!==(e=null===(t=(i=this.opts).getScope)||void 0===t?void 0:t.call(i))&&void 0!==e?e:this.host.shadowRoot;if(s&&this._scopeContainsFocus(s))return;const a=this._getFocusables();if(0!==a.length)try{a[0].focus()}catch(e){}})}_scopeContainsFocus(e){let t=document.activeElement;for(;t;){if(t===e)return!0;if(e.host===t)return!0;if("contains"in e&&e.contains(t))return!0;const i=t.shadowRoot;if(!i||!i.activeElement)break;t=i.activeElement}return!1}_currentDocumentActive(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_handleKeyDown(e){var t,i,s;if(!this.opts.isOpen())return;if("Escape"===e.key)return e.preventDefault(),e.stopPropagation(),void this.opts.onEscape();if("Tab"!==e.key)return;const a=this._getFocusables();if(0===a.length)return;const r=null!==(t=null===(i=(s=this.opts).getScope)||void 0===i?void 0:i.call(s))&&void 0!==t?t:this.host.shadowRoot,n=r?this._findFocusedInScope(r):null,o=n?a.indexOf(n):-1;let l;l=e.shiftKey?o<=0?a.length-1:o-1:-1===o||o>=a.length-1?0:o+1,e.preventDefault(),e.stopPropagation();try{a[l].focus()}catch(e){}}_findFocusedInScope(e){let t=document.activeElement;for(;t;){if(e===t||"contains"in e&&e.contains(t)){if(t.shadowRoot&&t.shadowRoot.activeElement){t=t.shadowRoot.activeElement;continue}return t}if(e.host===t){t=e.activeElement;continue}const i=t.shadowRoot;if(!i||!i.activeElement)break;t=i.activeElement}return null}}function nl(e,t){new rl(e,t)}let ol=class extends mo{constructor(){super(),this.open=!1,this.narrow=!1,this.editMode=!1,this.initialChannelIdx=0,this.initialChannelName="",this.initialScope="",this.initialKey="",this.availableIndices=[],this._channelIdx=0,this._channelName="",this._customKey="",this._autoKey=!0,this._scope="",this._availableScopes=null,this._globalAllowed=!1,this._saving=!1,this._error=null,this._initialized=!1,nl(this,{isOpen:()=>this.open,onEscape:()=>this._onCancel()})}willUpdate(e){if(e.has("open")&&this.open&&!this._initialized){if(this.editMode){this._channelIdx=this.initialChannelIdx,this._channelName=this.initialChannelName,this._scope=this.initialScope;const e=Ko(this.initialChannelName).slice(0,32);this.initialKey&&this.initialKey.toLowerCase()!==e?(this._autoKey=!1,this._customKey=this.initialKey.toLowerCase()):(this._autoKey=!0,this._customKey="")}else{this._channelIdx=this.availableIndices.length>0?this.availableIndices[0]:0,this._channelName=this.initialChannelName||"",this._scope=this.initialScope||"";const e=this._channelName?Ko(this._channelName).slice(0,32):"";this.initialKey&&this.initialKey.toLowerCase()!==e?(this._autoKey=!1,this._customKey=this.initialKey.toLowerCase()):(this._autoKey=!0,this._customKey="")}this._initialized=!0,this._loadScopes()}e.has("open")&&!this.open&&(this._initialized=!1),!this.editMode&&this.open&&e.has("availableIndices")&&this.availableIndices.length>0&&!this.availableIndices.includes(this._channelIdx)&&(this._channelIdx=this.availableIndices[0])}async _loadScopes(){if(this._availableScopes=null,!this.hass)return this._availableScopes=[],void(this._globalAllowed=!1);const e=await Qo(this.hass,this.entryId);this._availableScopes=e.scopes,this._globalAllowed=e.global}render(){if(!this.open)return;const e=this._customKey.length,t=32===e||0===e||this._autoKey;return Zn(_||(_=on`
      <div
        class="dialog-overlay"
        @click=${0}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${0}>
          <div class="dialog-header">
            <div class="dialog-header-title">${0}</div>
          </div>
          <div class="dialog-body">
            ${0}

            <!-- Channel Index -->
            <div class="form-group">
              <label class="form-label required">Channel Index</label>
              ${0}
              <div class="form-description">${0}</div>
            </div>

            <!-- Channel Name -->
            <div class="form-group">
              <label class="form-label required">Channel Name</label>
              <input
                type="text"
                class="form-input"
                placeholder="e.g., general, alerts"
                .value=${0}
                @input=${0}
              />
              <div class="form-description">Friendly name for the channel</div>
            </div>

            <!-- Region Scope -->
            <div class="form-group">
              <label class="form-label">Region scope</label>
              ${0}
            </div>

            <!-- Auto Key Toggle -->
            <div class="form-group">
              <label class="form-toggle">
                <input
                  type="checkbox"
                  ?checked=${0}
                  @change=${0}
                />
                <span class="form-toggle-label">Auto-generate key from name</span>
              </label>
              <div class="form-description">
                Auto-key generates SHA256 hash of the channel name
              </div>
            </div>

            <!-- Custom Key (if not auto) -->
            ${0}
          </div>
          <div class="dialog-footer">
            <button
              class="dialog-button"
              ?disabled=${0}
              @click=${0}>
              Cancel
            </button>
            <button
              class="dialog-button primary"
              ?disabled=${0}
              @click=${0}>
              ${0}
            </button>
          </div>
        </div>
      </div>
    `),this._onOverlayClick,this.editMode?"Edit channel":"Add channel",this.editMode?"Edit Channel":"Add Channel",this._error?Zn(v||(v=on`<div style="padding: 12px; background: rgba(219, 68, 55, 0.1); border-radius: 6px; color: var(--error-color, #db4437); font-size: 13px; margin-bottom: 16px;">
                  ${0}
                </div>`),this._error):"",this.editMode?Zn(w||(w=on`
                    <select class="form-select" disabled>
                      <option value=${0} selected>${0}</option>
                    </select>`),this._channelIdx,this._channelIdx):Zn(b||(b=on`
                    <select
                      class="form-select"
                      @change=${0}>
                      ${0}
                    </select>`),e=>{this._channelIdx=parseInt(e.target.value,10)},this.availableIndices.map(e=>Zn(y||(y=on`
                        <option value=${0} ?selected=${0}>${0}</option>
                      `),e,e===this._channelIdx,e))),this.editMode?"Channel index cannot be changed":"Select an available channel slot",this._channelName,e=>{this._channelName=e.target.value},this._renderScopeField(),this._autoKey,e=>{this._autoKey=e.target.checked},this._autoKey?"":Zn(x||(x=on`
                  <div class="form-group">
                    <label class="form-label required">Custom Key</label>
                    <input
                      type="text"
                      class="form-input hex-input"
                      placeholder="32 hex characters (a-f, 0-9)"
                      .value=${0}
                      @input=${0}
                    />
                    <div class="hex-counter">${0} / 32 hex characters</div>
                    <div class="form-description">
                      ${0}
                    </div>
                  </div>
                `),this._customKey,e=>{const t=e.target.value.toLowerCase().replace(/[^a-f0-9]/g,"");this._customKey=t.slice(0,32)},this._customKey.length,t?"Valid hex key (16 bytes / 128-bit AES)":`Invalid: expected 32 characters, got ${e}`),this._saving,this._onCancel,!this._channelName||this._saving||!this._autoKey&&!t||!this.editMode&&0===this.availableIndices.length,this._onSave,this._saving?"Saving...":"Save")}_renderScopeField(){const e=this._availableScopes;if(null===e)return Zn(E||(E=on`
        <select class="form-select scope-select" disabled>
          <option selected>Loading…</option>
        </select>
      `));const t=this._globalAllowed?"*":"",i=!this._scope||"*"===this._scope,s=!!this._scope&&"*"!==this._scope&&!e.includes(this._scope);return 0!==e.length||s||this._globalAllowed?Zn(B||(B=on`
      <select
        class="form-select scope-select"
        @change=${0}>
        <option value=${0} ?selected=${0}>All regions (global flood)</option>
        ${0}
        ${0}
      </select>
      <div class="form-description">
        Send this channel's messages only through repeaters configured
        for the selected region. "All regions" floods the whole mesh.
      </div>
    `),e=>{this._scope=e.target.value},t,i,s?Zn(S||(S=on`<option value=${0} selected>${0} (not in allowlist)</option>`),this._scope,this._scope):"",e.map(e=>Zn(k||(k=on`
            <option value=${0} ?selected=${0}>${0}</option>
          `),e,e===this._scope,e))):Zn(C||(C=on`
        <select class="form-select scope-select" disabled>
          <option selected>All regions (global flood)</option>
        </select>
        <div class="form-description scope-empty-hint">
          No region scopes are configured yet. Add them in HiveFW
          (Dispositivo → Global Settings → Flood Scope Allowlist), then
          reopen this dialog. Region names are agreed within your local
          mesh community.
        </div>
      `))}async _onSave(){if(this.hass&&this._channelName){this._saving=!0,this._error=null;try{(await async function(e,t,i,s,a,r){try{const n={type:"hivefw_integration/set_channel",channel_idx:t,name:i};return s&&(n.key=s),a&&(n.entry_id=a),void 0!==r&&(n.scope=r),await e.callWS(n)}catch(e){return{success:!1}}}(this.hass,this._channelIdx,this._channelName,this._autoKey?void 0:this._customKey,this.entryId,this._scope)).success?(this.dispatchEvent(new CustomEvent("channel-saved",{detail:{channelIdx:this._channelIdx,name:this._channelName,scope:this._scope},bubbles:!0})),this._reset()):this._error="Failed to save channel"}catch(e){this._error=`Error: ${String(e)}`}finally{this._saving=!1}}}_onCancel(){this._reset(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0}))}_onOverlayClick(e){e.target===e.currentTarget&&this._onCancel()}_reset(){this._channelIdx=0,this._channelName="",this._customKey="",this._autoKey=!0,this._scope="",this._availableScopes=null,this._globalAllowed=!1,this._error=null}};ol.styles=[Eo,gn(I||(I=on`
      :host {
        display: block;
      }

      :host([narrow]) .dialog {
        max-width: 100%;
      }

      .dialog {
        max-width: 500px;
      }

      .hex-input {
        font-family: monospace;
        letter-spacing: 1px;
      }

      .hex-counter {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-top: 4px;
      }
    `))],ln([yo({type:Boolean})],ol.prototype,"open",void 0),ln([yo({type:Object})],ol.prototype,"hass",void 0),ln([yo({type:String})],ol.prototype,"entryId",void 0),ln([yo({type:Boolean})],ol.prototype,"narrow",void 0),ln([yo({type:Boolean})],ol.prototype,"editMode",void 0),ln([yo({type:Number})],ol.prototype,"initialChannelIdx",void 0),ln([yo({type:String})],ol.prototype,"initialChannelName",void 0),ln([yo({type:String})],ol.prototype,"initialScope",void 0),ln([yo({type:String})],ol.prototype,"initialKey",void 0),ln([yo({type:Array})],ol.prototype,"availableIndices",void 0),ln([xo()],ol.prototype,"_channelIdx",void 0),ln([xo()],ol.prototype,"_channelName",void 0),ln([xo()],ol.prototype,"_customKey",void 0),ln([xo()],ol.prototype,"_autoKey",void 0),ln([xo()],ol.prototype,"_scope",void 0),ln([xo()],ol.prototype,"_availableScopes",void 0),ln([xo()],ol.prototype,"_globalAllowed",void 0),ln([xo()],ol.prototype,"_saving",void 0),ln([xo()],ol.prototype,"_error",void 0),ol=ln([vo("meshcore-channel-dialog")],ol);let ll=class extends mo{willUpdate(){this._tabInitialized||(this._tabInitialized=!0,this.initialTab&&(this._activeTab=this.initialTab))}constructor(){super(),this.narrow=!1,this._tabInitialized=!1,this._activeTab="contacts",this._contacts=[],this._channels=[],this._searchQuery="",this._categoryFilter="all",this._typeFilter="all",this._loading=!1,this._actionInProgress=null,this._confirmingRemoveContact=null,this._confirmingRemoveChannel=null,this._channelDialogOpen=!1,this._editingChannel=null,this._suggestedChannelName="",this._suggestedChannelKey="",this._maxChannels=4,nl(this,{isOpen:()=>!0,onEscape:()=>this._close()})}connectedCallback(){super.connectedCallback(),this._loadData()}render(){var e,t,i,s,a,r,n,o;return Zn(R||(R=on`
      <div
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Manage contacts and channels"
        @click=${0}>
        <div class="dialog-header">
          <span class="dialog-title">Manage</span>
          <button class="close-btn" aria-label="Close" @click=${0}>✕</button>
        </div>

        <div class="tab-bar">
          <button
            class=${0}
            @click=${0}>
            Contacts
          </button>
          <button
            class=${0}
            @click=${0}>
            Channels
          </button>
        </div>

        ${0}

        <div class="list-area">
          ${0}
        </div>
      </div>

      ${0}
    `),e=>e.stopPropagation(),this._close,"contacts"===this._activeTab?"active":"",()=>this._switchTab("contacts"),"channels"===this._activeTab?"active":"",()=>this._switchTab("channels"),"contacts"===this._activeTab?Zn(M||(M=on`
              <div class="filter-bar">
                <span class="filter-bar-label">Show</span>
                <div class="filter-bar-group">
                  ${0}
                </div>
                <span class="filter-bar-label">Type</span>
                <div class="filter-bar-group">
                  ${0}
                </div>
              </div>
              <div class="search-bar">
                <input
                  type="text"
                  aria-label="Search contacts"
                  placeholder="Search contacts..."
                  .value=${0}
                  @input=${0}
                />
              </div>
            `),["all","added","discovered"].map(e=>Zn(D||(D=on`
                      <button
                        class="filter-chip ${0}"
                        @click=${0}
                      >
                        ${0}
                      </button>
                    `),this._categoryFilter===e?"active":"",()=>{this._categoryFilter=e},"all"===e?"All":"added"===e?"Added":"Discovered")),["all","clients","repeaters"].map(e=>Zn(F||(F=on`
                      <button
                        class="filter-chip ${0}"
                        @click=${0}
                      >
                        ${0}
                      </button>
                    `),this._typeFilter===e?"active":"",()=>{this._typeFilter=e},"all"===e?"All":"clients"===e?"Clients":"Repeaters")),this._searchQuery,e=>{this._searchQuery=e.target.value}):"",this._loading?Zn(T||(T=on`<div class="loading-state">
                <div class="loading-spinner"></div>
                Loading...
              </div>`)):"contacts"===this._activeTab?this._renderContacts():this._renderChannels(),this._channelDialogOpen?Zn(Q||(Q=on`
            <meshcore-channel-dialog
              .open=${0}
              .hass=${0}
              .entryId=${0}
              .narrow=${0}
              .editMode=${0}
              .initialChannelIdx=${0}
              .initialChannelName=${0}
              .initialScope=${0}
              .initialKey=${0}
              .availableIndices=${0}
              @channel-saved=${0}
              @close=${0}
            ></meshcore-channel-dialog>
          `),!0,this.hass,this.entryId,this.narrow,!!this._editingChannel,null!==(e=null===(t=this._editingChannel)||void 0===t?void 0:t.channel_idx)&&void 0!==e?e:0,null!==(i=null===(s=this._editingChannel)||void 0===s?void 0:s.name)&&void 0!==i?i:this._suggestedChannelName,null!==(a=null===(r=this._editingChannel)||void 0===r?void 0:r.scope)&&void 0!==a?a:"",null!==(n=null===(o=this._editingChannel)||void 0===o||null===(o=o.settings)||void 0===o?void 0:o.channel_secret)&&void 0!==n?n:this._suggestedChannelKey,this._getAvailableIndices(),this._onChannelSaved,()=>{this._channelDialogOpen=!1,this._editingChannel=null,this._suggestedChannelName="",this._suggestedChannelKey=""}):"")}_renderContacts(){const e=this._filterContacts();if(0===e.length){const e=!!this._searchQuery||"all"!==this._categoryFilter||"all"!==this._typeFilter;return Zn(P||(P=on`
        <div class="empty-state">
          <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg></div>
          <div class="empty-text">
            ${0}
          </div>
        </div>
      `),e?"No contacts match":"No contacts discovered")}const t=[...e].sort((e,t)=>e.added_to_node!==t.added_to_node?e.added_to_node?-1:1:e.adv_name.localeCompare(t.adv_name));return t.map(e=>this._renderContactItem(e))}_renderContactItem(e){const t=e.pubkey_prefix.substring(0,2).toUpperCase(),i=e.added_to_node,s=this._confirmingRemoveContact===e.public_key,a=this._actionInProgress===e.public_key;return Zn(O||(O=on`
      <div class="contact-item">
        <div class="contact-avatar">${0}</div>
        <div class="contact-info">
          <div class="contact-name">${0}</div>
          <div class="contact-meta">
            <span class="contact-prefix">${0}</span>
            <span class="badge ${0}">
              ${0}
            </span>
          </div>
        </div>
        ${0}
      </div>
    `),t,e.adv_name||"Unknown",e.pubkey_prefix,i?"added":"discovered",i?Zn(U||(U=on`<svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style="vertical-align: -1px; margin-right: 2px;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>Added`)):"Discovered",s?Zn(z||(z=on`
              <div class="confirm-inline">
                <span class="confirm-text">Remove?</span>
                <button class="confirm-btn yes" @click=${0}>Yes</button>
                <button class="confirm-btn no" @click=${0}>No</button>
              </div>
            `),()=>this._doRemoveContact(e),()=>{this._confirmingRemoveContact=null}):i?Zn(H||(H=on`
                <button
                  class="action-btn remove"
                  ?disabled=${0}
                  @click=${0}>
                  ${0}
                </button>
              `),a,()=>{this._confirmingRemoveContact=e.public_key},a?"...":"Remove"):Zn($||($=on`
                <button
                  class="action-btn add"
                  ?disabled=${0}
                  @click=${0}>
                  ${0}
                </button>
              `),a,()=>this._doAddContact(e),a?"...":Zn(N||(N=on`<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="vertical-align: -1px; margin-right: 4px;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>Add`))))}_renderChannels(){if(0===this._channels.length)return Zn(L||(L=on`
        <div class="empty-state">
          <div class="empty-icon">#</div>
          <div class="empty-text">No channels configured</div>
        </div>
        <button class="add-channel-btn" @click=${0}>
          + Add Channel
        </button>
      `),this._openAddChannel);const e=this._confirmingRemoveChannel;return Zn(G||(G=on`
      ${0}
      <button class="add-channel-btn" @click=${0}>
        + Add Channel
      </button>
    `),this._channels.map(t=>{const i=e===t.channel_idx,s=this._actionInProgress===`ch-${t.channel_idx}`;return Zn(Y||(Y=on`
          <div class="channel-item">
            <div class="channel-icon">#</div>
            <div class="channel-info">
              <div class="channel-name">${0}</div>
              <div class="channel-idx">Index ${0}${0}</div>
            </div>
            ${0}
          </div>
        `),t.name,t.channel_idx,t.scope?Zn(K||(K=on` · scope: ${0}`),t.scope):"",i?Zn(j||(j=on`
                  <div class="confirm-inline">
                    <span class="confirm-text">Remove?</span>
                    <button class="confirm-btn yes" @click=${0}>Yes</button>
                    <button class="confirm-btn no" @click=${0}>No</button>
                  </div>
                `),()=>this._doRemoveChannel(t),()=>{this._confirmingRemoveChannel=null}):Zn(W||(W=on`
                  <div class="channel-actions">
                    <button
                      class="action-btn"
                      ?disabled=${0}
                      @click=${0}>
                      Edit
                    </button>
                    <button
                      class="action-btn remove"
                      ?disabled=${0}
                      @click=${0}>
                      ${0}
                    </button>
                  </div>
                `),s,()=>this._openEditChannel(t),s,()=>{this._confirmingRemoveChannel=t.channel_idx},s?"...":"Remove"))}),this._openAddChannel)}async _loadData(){if(this.hass){this._loading=!0;try{const[e,t]=await Promise.all([Mo(this.hass,this.entryId),Do(this.hass,this.entryId)]);this._contacts=e,this._channels=t;try{const e=await Fo(this.hass,this.entryId);null!=e&&e.max_channels&&(this._maxChannels=e.max_channels)}catch(e){}}finally{this._loading=!1}}}_switchTab(e){this._activeTab=e,this._searchQuery="",this._categoryFilter="all",this._typeFilter="all",this._confirmingRemoveContact=null,this._confirmingRemoveChannel=null}_filterContacts(){let e=this._contacts;if("added"===this._categoryFilter?e=e.filter(e=>e.added_to_node):"discovered"===this._categoryFilter&&(e=e.filter(e=>!e.added_to_node)),"clients"===this._typeFilter?e=e.filter(e=>{var t;const i=null!==(t=e.type)&&void 0!==t?t:0;return 0===i||1===i}):"repeaters"===this._typeFilter&&(e=e.filter(e=>2===e.type)),this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(e=>(e.adv_name||"").toLowerCase().includes(t)||(e.pubkey_prefix||"").toLowerCase().includes(t))}return e}async _doAddContact(e){if(this.hass){this._actionInProgress=e.public_key;try{if((await Ho(this.hass,e.public_key,e.adv_name,this.entryId)).success){const e=await Mo(this.hass,this.entryId);this._contacts=e,this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0}))}}finally{this._actionInProgress=null}}}async _doRemoveContact(e){if(this.hass){this._confirmingRemoveContact=null,this._actionInProgress=e.public_key;try{if((await $o(this.hass,e.public_key,this.entryId)).success){const e=await Mo(this.hass,this.entryId);this._contacts=e,this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0}))}}finally{this._actionInProgress=null}}}_openAddChannel(){this._editingChannel=null,this._suggestedChannelName="",this._suggestedChannelKey="",this._channelDialogOpen=!0}openSuggestedChannel(e,t){this._activeTab="channels",this._editingChannel=null,this._suggestedChannelName=String(e||""),this._suggestedChannelKey=String(t||"").toLowerCase(),this._channelDialogOpen=!0}_openEditChannel(e){this._editingChannel=e,this._channelDialogOpen=!0}_getAvailableIndices(){const e=new Set(this._channels.map(e=>e.channel_idx)),t=[];for(let i=0;i<this._maxChannels;i++)e.has(i)||t.push(i);return t}async _doRemoveChannel(e){if(this.hass){this._confirmingRemoveChannel=null,this._actionInProgress=`ch-${e.channel_idx}`;try{if((await async function(e,t,i){try{const s={type:"hivefw_integration/remove_channel",channel_idx:t};return i&&(s.entry_id=i),await e.callWS(s)}catch(e){return{success:!1}}}(this.hass,e.channel_idx,this.entryId)).success){const e=await Do(this.hass,this.entryId);this._channels=e,this.dispatchEvent(new CustomEvent("channels-changed",{bubbles:!0,composed:!0}))}}finally{this._actionInProgress=null}}}async _onChannelSaved(){if(this._channelDialogOpen=!1,this._editingChannel=null,this._suggestedChannelName="",this._suggestedChannelKey="",this.hass){const e=await Do(this.hass,this.entryId);this._channels=e,this.dispatchEvent(new CustomEvent("channels-changed",{bubbles:!0,composed:!0}))}}_close(){this.dispatchEvent(new CustomEvent("manage-closed",{bubbles:!0,composed:!0}))}};ll.styles=gn(J||(J=on`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      padding: 16px;
    }

    .dialog {
      display: flex;
      flex-direction: column;
      max-width: 500px;
      width: 100%;
      max-height: 80vh;
      border-radius: 12px;
      background: var(--card-background-color, #fff);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
      animation: slideUp 0.2s ease-out;
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    :host([narrow]) .dialog {
      max-width: 100%;
      max-height: 100vh;
      border-radius: 0;
      height: 100%;
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      flex-shrink: 0;
    }

    .dialog-title {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .close-btn {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 20px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.15s;
    }

    .close-btn:hover {
      color: var(--primary-text-color);
      background: rgba(0, 0, 0, 0.05);
    }

    /* Tab bar */
    .tab-bar {
      display: flex;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      flex-shrink: 0;
    }

    .tab-bar button {
      flex: 1;
      padding: 12px 16px;
      border: none;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border-bottom: 3px solid transparent;
    }

    .tab-bar button:hover {
      color: var(--primary-text-color);
      background: rgba(0, 0, 0, 0.02);
    }

    .tab-bar button.active {
      color: var(--primary-color, #03a9f4);
      border-bottom-color: var(--primary-color, #03a9f4);
    }

    /* Filter chips (Contacts tab) */
    .filter-bar {
      display: flex;
      gap: 8px;
      padding: 10px 16px 6px 16px;
      flex-wrap: wrap;
      flex-shrink: 0;
      align-items: center;
    }

    .filter-bar-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color, #727272);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      flex-shrink: 0;
    }

    .filter-bar-group {
      display: flex;
      gap: 4px;
      flex-wrap: wrap;
    }

    .filter-chip {
      padding: 4px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
    }

    .filter-chip:hover {
      border-color: var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
    }

    .filter-chip.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }

    /* Search */
    .search-bar {
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      flex-shrink: 0;
    }

    .search-bar input {
      width: 100%;
      box-sizing: border-box;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 20px;
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color);
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-bar input:focus {
      border-color: var(--primary-color, #03a9f4);
    }

    .search-bar input::placeholder {
      color: var(--secondary-text-color, #727272);
    }

    /* List area */
    .list-area {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .list-area::-webkit-scrollbar {
      width: 6px;
    }

    .list-area::-webkit-scrollbar-track {
      background: transparent;
    }

    .list-area::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb-color, #c1c1c1);
      border-radius: 3px;
    }

    /* Contact items */
    .contact-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      transition: background 0.15s;
    }

    .contact-item:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .contact-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      flex-shrink: 0;
    }

    .contact-info {
      flex: 1;
      overflow: hidden;
    }

    .contact-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .contact-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 2px;
    }

    .contact-prefix {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      font-family: monospace;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .badge {
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
    }

    .badge.added {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
      color: var(--primary-color, #03a9f4);
    }

    .badge.discovered {
      background: rgba(0, 0, 0, 0.06);
      color: var(--secondary-text-color, #727272);
    }

    /* Action buttons */
    .action-btn {
      padding: 6px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .action-btn:hover {
      border-color: var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
    }

    .action-btn.add {
      border-color: var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
    }

    .action-btn.add:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
    }

    .action-btn.remove {
      border-color: var(--error-color, #db4437);
      color: var(--error-color, #db4437);
    }

    .action-btn.remove:hover {
      background: var(--error-color, #db4437);
      color: #fff;
    }

    .action-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Confirm inline */
    .confirm-inline {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .confirm-inline .confirm-text {
      font-size: 12px;
      color: var(--error-color, #db4437);
      font-weight: 500;
    }

    .confirm-inline .confirm-btn {
      padding: 4px 10px;
      border: none;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      cursor: pointer;
    }

    .confirm-inline .confirm-btn.yes {
      background: var(--error-color, #db4437);
      color: #fff;
    }

    .confirm-inline .confirm-btn.no {
      background: var(--divider-color, #e0e0e0);
      color: var(--primary-text-color);
    }

    /* Channel items */
    .channel-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      transition: background 0.15s;
    }

    .channel-item:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .channel-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.1);
      color: var(--primary-color, #03a9f4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 16px;
      flex-shrink: 0;
    }

    .channel-info {
      flex: 1;
      overflow: hidden;
    }

    .channel-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .channel-idx {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      font-family: monospace;
    }

    .channel-actions {
      display: flex;
      gap: 6px;
      flex-shrink: 0;
    }

    /* Add channel button at bottom */
    .add-channel-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      margin: 12px 16px;
      padding: 10px 16px;
      border: 2px dashed var(--divider-color, #e0e0e0);
      border-radius: 8px;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    .add-channel-btn:hover {
      border-color: var(--primary-color, #03a9f4);
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.05);
    }

    /* Empty state */
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 48px 24px;
      color: var(--secondary-text-color, #727272);
      text-align: center;
    }

    .empty-icon {
      font-size: 32px;
      margin-bottom: 8px;
      opacity: 0.5;
    }

    .empty-text {
      font-size: 13px;
    }

    /* Loading */
    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 32px;
      color: var(--secondary-text-color);
      font-size: 13px;
      gap: 8px;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid var(--divider-color, #e0e0e0);
      border-top-color: var(--primary-color, #03a9f4);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `)),ln([yo({type:Object})],ll.prototype,"hass",void 0),ln([yo({type:String})],ll.prototype,"entryId",void 0),ln([yo({type:Boolean})],ll.prototype,"narrow",void 0),ln([yo({type:String})],ll.prototype,"initialTab",void 0),ln([xo()],ll.prototype,"_activeTab",void 0),ln([xo()],ll.prototype,"_contacts",void 0),ln([xo()],ll.prototype,"_channels",void 0),ln([xo()],ll.prototype,"_searchQuery",void 0),ln([xo()],ll.prototype,"_categoryFilter",void 0),ln([xo()],ll.prototype,"_typeFilter",void 0),ln([xo()],ll.prototype,"_loading",void 0),ln([xo()],ll.prototype,"_actionInProgress",void 0),ln([xo()],ll.prototype,"_confirmingRemoveContact",void 0),ln([xo()],ll.prototype,"_confirmingRemoveChannel",void 0),ln([xo()],ll.prototype,"_channelDialogOpen",void 0),ln([xo()],ll.prototype,"_editingChannel",void 0),ln([xo()],ll.prototype,"_suggestedChannelName",void 0),ln([xo()],ll.prototype,"_suggestedChannelKey",void 0),ln([xo()],ll.prototype,"_maxChannels",void 0),ll=ln([vo("meshcore-manage-dialog")],ll);let cl=class extends mo{constructor(){super(),this.timestampFormat="relative",this._selectedMessage=null,nl(this,{isOpen:()=>null!==this._selectedMessage,onEscape:()=>{this._selectedMessage=null},getScope:()=>{var e;return null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".message-dialog")}})}render(){return this.group?Zn(q||(q=on`
        ${0}
        ${0}
      `),this._renderGroup(),this._selectedMessage?this._renderMessageDialog(this._selectedMessage):Zn(V||(V=on``))):Zn(Z||(Z=on``))}_renderGroup(){if(!this.group)return Zn(X||(X=on``));const e=this.group,t={"message-group":!0,incoming:!e.isOutgoing&&!e.isSystem,outgoing:e.isOutgoing,system:e.isSystem};let i;return e.messages.length>0&&(i=e.messages[0].senderColor||function(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i);const i=["#e57373","#64b5f6","#81c784","#ffb74d","#ba68c8","#4dd0e1","#fff176","#a1887f"];return i[Math.abs(t)%i.length]}(e.sender)),Zn(ee||(ee=on`
      <div class=${0} style=${0}>
        ${0}
        ${0}
      </div>
    `),this._classMap(t),i?`--sender-color: ${i}`:"",e.isSystem||e.isOutgoing?Zn(ie||(ie=on``)):Zn(te||(te=on`<div class="sender">${0}</div>`),e.sender),e.messages.map(e=>this._renderBubble(e)))}_renderBubble(e){var t,i;const s={bubble:!0,incoming:!e.isOutgoing&&!e.isSystem,outgoing:e.isOutgoing,system:e.isSystem},a=e.isOutgoing&&e.deliveryStatus?this._getStatusLabel(e.deliveryStatus):"",r=function(e,t){switch(t){case"relative":default:return function(e){const t=Date.now()-e.getTime(),i=Math.floor(t/1e3),s=Math.floor(i/60),a=Math.floor(s/60);return i<60?"now":s<60?`${s}m`:a<24?`${a}h`:e.toLocaleDateString(void 0,{month:"short",day:"numeric"})}(e);case"time":return e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"});case"datetime":return e.toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}}(e.timestamp,this.timestampFormat),n=e.isOutgoing||e.isSystem||!e.floodScope?"":"*"===e.floodScope?"🌐 all regions":e.floodScope,o=e.isOutgoing||e.isSystem||null===(t=e.rxLogData)||void 0===t||!t.length?void 0:e.rxLogData[e.rxLogData.length-1],l=null==o?void 0:o.path_nodes,c=Number(null==o?void 0:o.hop_count),d=Number.isFinite(c)?c:null!==(i=null==l?void 0:l.length)&&void 0!==i?i:0,h=Number(null==o?void 0:o.rssi),p=Number(null==o?void 0:o.snr),u=o?[`${d} hop${1===d?"":"s"}`,Number.isFinite(h)?`RSSI ${Math.round(h)} dBm`:"",Number.isFinite(p)?`SNR ${p.toFixed(1)} dB`:""].filter(Boolean):[];return Zn(se||(se=on`
      <div class=${0} data-msg-id=${0} @click=${0}>
        <div class="message-text">${0}</div>
        <div class="timestamp">${0}${0}${0}</div>
        ${0}
      </div>
    `),this._classMap(s),e.id,t=>{t.stopPropagation(),this._selectedMessage=e},this._renderTextWithMentions(e.text,e.mentions),a?Zn(ae||(ae=on`<span class="delivery-status">${0}</span> · `),a):"",r,n?Zn(re||(re=on` · <span class="flood-scope">${0}</span>`),n):"",u.length?Zn(ne||(ne=on`<div class="route-info-inline">${0}</div>`),u.join(" · ")):Zn(oe||(oe=on``)))}_getStatusLabel(e){var t;const i=e.status,s=null!==(t=e.repeaterCount)&&void 0!==t?t:0;switch(i){case"pending":case"waiting":return"Waiting...";case"sent":return s>0?"Repeated":"Unheard";case"delivered":return"Delivered";case"failed":return"Failed";default:return"Sent"}}_renderTextWithMentions(e,t){if(0===t.length)return e;const i=t.map(e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),s=new RegExp(`@\\[(${i.join("|")})\\]|@(${i.join("|")})\\b`,"g"),a=[];let r,n=0;for(;null!==(r=s.exec(e));){var o;r.index>n&&a.push(e.slice(n,r.index));const t=null!==(o=r[1])&&void 0!==o?o:r[2];a.push(Zn(le||(le=on`<span class="mention">@${0}</span>`),t)),n=r.index+r[0].length}return n<e.length&&a.push(e.slice(n)),a}_renderMessageDialog(e){var t;const i=e.rxLogData&&e.rxLogData.length>0,s=i?e.rxLogData.map(e=>{const t=e.path_nodes,i=e.hop_count,s=e.snr,a=e.rssi,r=[];return t&&t.length>0?r.push(t.map(e=>e.substring(0,4).toUpperCase()).join(" > ")):void 0!==i?r.push(`${i} hop${1!==i?"s":""}`):r.push("0 hops"),void 0!==s&&r.push(`SNR: ${s}`),void 0!==a&&r.push(`RSSI: ${a}`),r.join(" · ")}).join(" | "):"",a=e.timestamp.toLocaleString(void 0,{weekday:"short",month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"}),r="padding: 8px 16px; font-size: 12px; color: var(--secondary-text-color); border-top: 1px solid var(--divider-color, #e0e0e0);";return Zn(ce||(ce=on`
      <div class="message-dialog-overlay" @click=${0}>
        <div class="message-dialog"
             role="dialog" aria-modal="true" aria-label="Message actions"
             @click=${0}>
          <div class="message-dialog-preview">${0}</div>
          <button class="message-dialog-action" @click=${0}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align: -2px; margin-right: 4px;"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>Copy Text
          </button>
          ${0}
          ${0}
          <div style=${0}>
            ${0}: ${0}
          </div>
          ${0}
        </div>
      </div>
    `),()=>{this._selectedMessage=null},e=>e.stopPropagation(),e.text,()=>this._copyText(e.text),e.isOutgoing||e.isSystem?Zn(he||(he=on``)):Zn(de||(de=on`
                <button class="message-dialog-action" @click=${0}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align: -2px; margin-right: 4px;"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>Reply
                </button>
              `),()=>this._replyToSender(e.sender)),i?Zn(pe||(pe=on`
                <div class="message-dialog-route" @click=${0}>
                  Route: ${0}
                </div>
                <button class="message-dialog-action" @click=${0}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align: -2px; margin-right: 4px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/></svg>
                  Mostrar no mapa
                </button>
              `),()=>this._copyText(s),s,()=>this._showRouteOnMap(e)):Zn(ue||(ue=on``)),r,e.isOutgoing?"Sent":"Received",a,e.isOutgoing&&e.deliveryStatus?Zn(ge||(ge=on`
                <div style=${0}>
                  ${0}${0}${0}
                </div>
              `),r,(null!==(t=e.deliveryStatus.repeaterCount)&&void 0!==t?t:0)>0?`${e.deliveryStatus.repeaterCount} repeater${1===e.deliveryStatus.repeaterCount?"":"s"} responded`:"No repeaters responded",e.deliveryStatus.ackReceived?" · ACK received":"",e.deliveryStatus.roundTripMs?` · ${e.deliveryStatus.roundTripMs}ms RTT`:""):Zn(Ae||(Ae=on``)))}async _copyText(e){try{await navigator.clipboard.writeText(e)}catch(t){const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select(),document.execCommand("copy"),document.body.removeChild(i)}this._selectedMessage=null}_showRouteOnMap(e){this.dispatchEvent(new CustomEvent("show-message-route",{detail:{message:e},bubbles:!0,composed:!0})),this._selectedMessage=null}_replyToSender(e){this.dispatchEvent(new CustomEvent("reply-to-sender",{detail:{mention:`@[${e}] `},bubbles:!0,composed:!0})),this._selectedMessage=null}_classMap(e){return Object.entries(e).filter(([,e])=>e).map(([e])=>e).join(" ")}};cl.styles=gn(fe||(fe=on`
    :host {
      display: block;
    }

    .message-group {
      margin-bottom: 8px;
      display: flex;
      flex-direction: column;
    }

    .message-group.outgoing {
      align-items: flex-end;
    }

    .message-group.incoming {
      align-items: flex-start;
    }

    .message-group.system {
      align-items: center;
    }

    .sender {
      font-size: 12px;
      font-weight: 600;
      color: var(--sender-color, var(--primary-color, #03a9f4));
      margin-bottom: 2px;
      padding: 0 4px;
      max-width: 85%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .message-group.outgoing .sender {
      display: none;
    }

    .bubble {
      max-width: 85%;
      padding: 8px 12px;
      border-radius: 16px;
      word-wrap: break-word;
      overflow-wrap: break-word;
      position: relative;
      cursor: pointer;
      transition: opacity 0.15s;
      line-height: 1.4;
      font-size: 14px;
    }

    .bubble:active {
      opacity: 0.7;
    }

    .bubble.search-highlight {
      animation: highlight-flash 2.5s ease-out;
    }

    @keyframes highlight-flash {
      0%, 20% {
        box-shadow: 0 0 0 3px rgba(var(--rgb-primary-color, 3, 169, 244), 0.6);
      }
      100% {
        box-shadow: 0 0 0 3px transparent;
      }
    }

    .bubble + .bubble {
      margin-top: 2px;
    }

    .bubble.incoming {
      background: var(--bubble-incoming-bg, var(--secondary-background-color, #e8e8e8));
      color: var(--bubble-incoming-text, var(--primary-text-color, #212121));
      border-bottom-left-radius: 4px;
    }

    .bubble.incoming:first-of-type {
      border-top-left-radius: 16px;
    }

    .bubble.outgoing {
      background: var(--bubble-outgoing-bg, var(--primary-color, #03a9f4));
      color: var(--bubble-outgoing-text, #fff);
      border-bottom-right-radius: 4px;
    }

    .bubble.outgoing:first-of-type {
      border-top-right-radius: 16px;
    }

    .bubble.system {
      background: transparent;
      color: var(--system-msg-color, var(--secondary-text-color, #727272));
      font-style: italic;
      font-size: 13px;
      text-align: center;
      cursor: default;
      padding: 4px 12px;
    }

    .message-text {
      white-space: pre-wrap;
    }

    .message-text .mention {
      background: var(--mention-bg, rgba(3, 169, 244, 0.15));
      color: var(--mention-text, var(--primary-color, #03a9f4));
      font-weight: 600;
      padding: 1px 4px;
      border-radius: 4px;
    }

    .bubble.outgoing .message-text .mention {
      background: rgba(255, 255, 255, 0.25);
      color: #fff;
    }

    .timestamp {
      font-size: 11px;
      color: var(--timestamp-color, var(--secondary-text-color, #727272));
      margin-top: 2px;
      padding: 0 4px;
    }

    .bubble.outgoing .timestamp {
      color: rgba(255, 255, 255, 0.6);
    }

    .bubble.incoming .timestamp {
      color: var(--secondary-text-color, #727272);
    }

    .message-group.outgoing .timestamp {
      text-align: right;
    }

    .route-info {
      font-size: 10px;
      color: var(--timestamp-color, var(--secondary-text-color, #727272));
      padding: 2px 4px;
      font-family: monospace;
    }

    .route-info-inline {
      font-size: 11px;
      color: var(--timestamp-color, var(--secondary-text-color, #727272));
      font-family: monospace;
      margin-top: 2px;
      padding: 0 4px;
      opacity: 0.7;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .delivery-status {
      color: inherit;
    }

    .flood-scope {
      color: inherit;
      opacity: 0.85;
      white-space: nowrap;
    }

    .message-dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.85);
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .message-dialog {
      background: #333;
      border: 2px solid var(--primary-color, #03a9f4);
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(var(--rgb-primary-color, 3, 169, 244), 0.3);
      min-width: 240px;
      max-width: 300px;
      overflow: hidden;
      z-index: 21;
    }

    .message-dialog-preview {
      padding: 12px 16px;
      font-size: 13px;
      color: var(--secondary-text-color);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 280px;
    }

    .message-dialog-action {
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      padding: 14px 16px;
      border: none;
      background: transparent;
      color: var(--primary-text-color);
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      text-align: left;
      min-height: 48px;
      transition: background 0.15s;
    }

    .message-dialog-action:hover,
    .message-dialog-action:active {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
    }

    .message-dialog-action + .message-dialog-action {
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .message-dialog-route {
      padding: 12px 16px;
      font-size: 12px;
      color: var(--secondary-text-color);
      border-top: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      font-family: monospace;
      word-break: break-all;
      transition: background 0.15s;
    }

    .message-dialog-route:hover,
    .message-dialog-route:active {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.15);
    }
  `)),ln([yo({type:Object})],cl.prototype,"group",void 0),ln([yo({type:Object})],cl.prototype,"message",void 0),ln([yo({type:String})],cl.prototype,"timestampFormat",void 0),ln([xo()],cl.prototype,"_selectedMessage",void 0),cl=ln([vo("meshcore-message-bubble")],cl);let dl=class extends mo{constructor(){super(),this._query="",this._fromDate="",this._toDate="",this._results=[],this._totalCount=0,this._searching=!1,this._hasSearched=!1,this._showFilters=!1,this._debounceTimer=null,nl(this,{isOpen:()=>!0,onEscape:()=>this.dispatchEvent(new CustomEvent("search-close",{bubbles:!0,composed:!0}))})}render(){return Zn(me||(me=on`
      <div class="search-header">
        <div class="search-row">
          <input
            class="search-input"
            type="text"
            aria-label="Search messages"
            placeholder="Search messages..."
            .value=${0}
            @input=${0}
          />
          <button
            class="filter-toggle ${0}"
            @click=${0}>
            Filters
          </button>
        </div>
        ${0}
        ${0}
      </div>

      <div class="results">
        ${0}
      </div>
    `),this._query,this._onQueryInput,this._showFilters?"active":"",()=>{this._showFilters=!this._showFilters},this._showFilters?Zn(_e||(_e=on`
              <div class="filters">
                <input
                  class="filter-input"
                  type="date"
                  placeholder="From"
                  .value=${0}
                  @change=${0}
                />
                <input
                  class="filter-input"
                  type="date"
                  placeholder="To"
                  .value=${0}
                  @change=${0}
                />
              </div>
            `),this._fromDate,e=>{this._fromDate=e.target.value,this._doSearch()},this._toDate,e=>{this._toDate=e.target.value,this._doSearch()}):"",this._hasSearched?Zn(ve||(ve=on`<div class="result-count">${0} result${0}</div>`),this._totalCount,1!==this._totalCount?"s":""):"",this._searching?Zn(we||(we=on`<div class="loading-state">Searching...</div>`)):this._hasSearched?0===this._results.length?Zn(ye||(ye=on`
                  <div class="empty-state">
                    <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H4V8h4v2c0 1.1.9 2 2 2h6v2h-2v2h2v2h-2v2h6V10h-4v10h2z"/></svg></div>
                    <div class="empty-text">No messages found</div>
                  </div>
                `)):this._results.map(e=>this._renderResult(e)):Zn(be||(be=on`
                <div class="empty-state">
                  <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>
                  <div class="empty-text">Search your message history</div>
                </div>
              `)))}_renderResult(e){const t=new Date(e.timestamp),i=t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),s=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),a=this._highlightQuery(e.text);return Zn(xe||(xe=on`
      <div class="result-item" @click=${0}>
        <div class="result-meta">
          <span class="result-sender">${0}</span>
          <span class="result-conversation">${0}</span>
          <span>${0} ${0}</span>
        </div>
        <div class="result-text">${0}</div>
      </div>
    `),()=>this._onResultClick(e),e.sender,e.conversation_name,i,s,a)}_highlightQuery(e){if(!this._query.trim())return e;const t=this._query.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),i=new RegExp(`(${t})`,"gi"),s=e.split(i),a=this._query.toLowerCase();return s.map(e=>e.toLowerCase()===a?Zn(Ee||(Ee=on`<mark>${0}</mark>`),e):e)}_onQueryInput(e){this._query=e.target.value,null!==this._debounceTimer&&clearTimeout(this._debounceTimer);const t=this._query.trim().length,i=t>=2,s=0===t,a=!(!this._fromDate&&!this._toDate);i||s&&a?this._debounceTimer=window.setTimeout(()=>this._doSearch(),400):(this._results=[],this._hasSearched=!1)}async _doSearch(){if(!this.hass||!this.entityId)return;const e=this._query.trim(),t=e.length>0,i=!(!this._fromDate&&!this._toDate);if(!t&&!i)return this._results=[],this._totalCount=0,void(this._hasSearched=!1);this._searching=!0,this._hasSearched=!0;try{const t={type:"hivefw_integration/search_stored_messages",query:e,entity_id:this.entityId,limit:100};this._fromDate&&(t.from_date=`${this._fromDate}T00:00:00`),this._toDate&&(t.to_date=`${this._toDate}T23:59:59.999999`);const i=await this.hass.callWS(t);this._results=i.results||[],this._totalCount=this._results.length}catch(e){this._results=[],this._totalCount=0}finally{this._searching=!1}}_onResultClick(e){this.dispatchEvent(new CustomEvent("result-selected",{detail:{entityId:e.entity_id,messageId:e.id,conversationName:e.conversation_name,timestamp:e.timestamp},bubbles:!0,composed:!0}))}};dl.styles=gn(Ce||(Ce=on`
    :host {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
    }

    .search-header {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      flex-shrink: 0;
    }

    .search-row {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .search-input {
      flex: 1;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 20px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 13px;
      outline: none;
      transition: border-color 0.2s;
    }

    .search-input:focus {
      border-color: var(--primary-color, #03a9f4);
    }

    .search-input::placeholder {
      color: var(--secondary-text-color, #727272);
    }

    .filter-toggle {
      padding: 6px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: transparent;
      color: var(--secondary-text-color);
      font-size: 12px;
      cursor: pointer;
      flex-shrink: 0;
      transition: all 0.15s;
    }

    .filter-toggle:hover,
    .filter-toggle.active {
      border-color: var(--primary-color, #03a9f4);
      color: var(--primary-color, #03a9f4);
    }

    .filters {
      display: flex;
      gap: 8px;
    }

    .filter-input {
      flex: 1;
      padding: 6px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font-size: 12px;
      outline: none;
    }

    .filter-input:focus {
      border-color: var(--primary-color, #03a9f4);
    }

    .result-count {
      font-size: 12px;
      color: var(--secondary-text-color);
      padding: 0 4px;
    }

    .results {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .results::-webkit-scrollbar {
      width: 6px;
    }

    .results::-webkit-scrollbar-track {
      background: transparent;
    }

    .results::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb, var(--scrollbar-thumb-color, #c1c1c1));
      border-radius: 3px;
    }

    .result-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 10px 12px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      cursor: pointer;
      transition: background 0.15s;
    }

    .result-item:hover {
      background: rgba(0, 0, 0, 0.02);
    }

    .result-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }

    .result-sender {
      font-weight: 600;
      color: var(--primary-text-color);
    }

    .result-conversation {
      font-style: italic;
    }

    .result-text {
      font-size: 13px;
      color: var(--primary-text-color);
      line-height: 1.4;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .result-text mark {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.2);
      color: inherit;
      border-radius: 2px;
      padding: 0 2px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--secondary-text-color);
      text-align: center;
      padding: 24px;
    }

    .empty-icon {
      font-size: 32px;
      margin-bottom: 8px;
      opacity: 0.5;
    }

    .empty-text {
      font-size: 13px;
    }

    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      color: var(--secondary-text-color);
      font-size: 13px;
      gap: 8px;
    }
  `)),ln([yo({type:Object})],dl.prototype,"hass",void 0),ln([yo({type:String})],dl.prototype,"entryId",void 0),ln([yo({type:String})],dl.prototype,"entityId",void 0),ln([yo({type:String})],dl.prototype,"meshNodeName",void 0),ln([xo()],dl.prototype,"_query",void 0),ln([xo()],dl.prototype,"_fromDate",void 0),ln([xo()],dl.prototype,"_toDate",void 0),ln([xo()],dl.prototype,"_results",void 0),ln([xo()],dl.prototype,"_totalCount",void 0),ln([xo()],dl.prototype,"_searching",void 0),ln([xo()],dl.prototype,"_hasSearched",void 0),ln([xo()],dl.prototype,"_showFilters",void 0),dl=ln([vo("meshcore-message-search")],dl);let hl=class extends mo{constructor(){super(...arguments),this.conversations=[],this.selectedId=null,this.narrow=!1,this.lastRead={},this._messageStore=null,this._unsubUnread=null,this._inputText="",this._sending=!1,this._viewportNarrow=!1,this._mediaQuery=null,this._mediaHandler=null,this._narrowShowMessages=!1,this._manageOpen=!1,this._manageInitialTab="contacts",this._searchOpen=!1,this._currentEntityId=null,this._conversationResolved=!1,this._pendingScroll=null,this._scrollInFlight=!1,this._scrollGuardUntil=0,this._lastMessageCount=0}get _isNarrow(){return this.narrow||this._viewportNarrow}connectedCallback(){super.connectedCallback(),this.config&&!this._messageStore&&(this._messageStore=new Zo(this.config),this._messageStore.setOnChange(()=>this.requestUpdate())),this.unread&&!this._unsubUnread&&(this._unsubUnread=this.unread.subscribe(()=>{this.lastRead=this.unread.lastRead,this.requestUpdate()}),this.lastRead=this.unread.lastRead,this.unread.onPostSwitchTimerFire(()=>this._checkAndMarkReadIfAtBottom())),this._mediaQuery=window.matchMedia("(max-width: 870px)"),this._viewportNarrow=this._mediaQuery.matches,this._mediaHandler=e=>{this._viewportNarrow=e.matches},this._mediaQuery.addEventListener("change",this._mediaHandler)}disconnectedCallback(){var e;super.disconnectedCallback(),this._messageStore&&(this._messageStore.destroy(),this._messageStore=null),this._unsubUnread&&(this._unsubUnread(),this._unsubUnread=null),null===(e=this.unread)||void 0===e||e.endConversation(),this._mediaQuery&&this._mediaHandler&&(this._mediaQuery.removeEventListener("change",this._mediaHandler),this._mediaQuery=null,this._mediaHandler=null)}updated(e){if(e.has("hass")&&this.hass&&this._messageStore&&this._messageStore.setHass(this.hass),e.has("config")&&this.config&&this._messageStore){this._messageStore.setConfig(this.config);const t=e.get("config");t&&t.entry_id!==this.config.entry_id&&(this.selectedId=null,this._currentEntityId=null,this._conversationResolved=!1,this._pendingScroll=null,this._lastMessageCount=0,this.unread.endConversation(),this._messageStore.switchEntity(null),this.dispatchEvent(new CustomEvent("active-entity-changed",{detail:{entityId:null},bubbles:!0,composed:!0})))}if(e.has("selectedId")&&this._onConversationSelected(),e.has("lastRead")&&this._currentEntityId&&this._conversationResolved&&null===this._pendingScroll&&this.unread.maybeReanchorOnLateData(this._currentEntityId)&&(this._pendingScroll="last-read"),this._pendingScroll){const e=this._messageStore,t=e&&!e.loading;t&&e.messages.length>0?(this._executeScroll(this._pendingScroll),this._pendingScroll=null,this._lastMessageCount=e.messages.length):t&&0===e.messages.length&&(this._pendingScroll=null)}else if(this._messageStore){const e=this._messageStore.messages.length;e>this._lastMessageCount&&this._lastMessageCount>0&&this._scrollToBottomIfNearEnd(),this._lastMessageCount=e}}render(){var e,t,i,s,a,r;return this._isNarrow?this._narrowShowMessages?Zn(Be||(Be=on`
          <div class="chat-layout">
            <div class="chat-main narrow-full">
              <div class="narrow-header">
                <button class="back-button" @click=${0}>← Back</button>
                <span class="narrow-conv-name">${0}${0}</span>
                <div class="chat-header-actions">
                  <button class="header-action-btn" title="Search messages" aria-label="Search messages" @click=${0}><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>
                </div>
              </div>
              ${0}
            </div>
          </div>
        `),()=>this._narrowShowMessages=!1,this._getConversationName(),this._renderScopeChip(),()=>{this._searchOpen=!this._searchOpen},this._renderChatArea()):Zn(Se||(Se=on`
          <div class="chat-layout narrow-list-only">
            <meshcore-conversation-list
              .conversations=${0}
              .activeId=${0}
              .unread=${0}
              .unreadCounts=${0}
              .nodePrefix=${0}
              @conversation-selected=${0}
              @manage-requested=${0}></meshcore-conversation-list>
            <aside
              class="hive-observed-column"
              data-hive-observed-host
              aria-label="Canais Observados 48H">
            </aside>
            ${0}
          </div>
        `),this.conversations,this.selectedId,this.unread,this.unread.counts,(null===(a=this.config)||void 0===a?void 0:a.node_prefix)||null,e=>{const t=e.detail.id;t===this.selectedId&&(this.unread.resetUnreadCountAtSelection(),this._pendingScroll="bottom"),this.selectedId=t,this._narrowShowMessages=!0},e=>this._onManageRequested(e),this._manageOpen?Zn(ke||(ke=on`
              <meshcore-manage-dialog
                .hass=${0}
                .entryId=${0}
                .narrow=${0}
                .initialTab=${0}
                @manage-closed=${0}
                @contacts-changed=${0}
                @channels-changed=${0}
              ></meshcore-manage-dialog>
            `),this.hass,null===(r=this.config)||void 0===r?void 0:r.entry_id,this.narrow,this._manageInitialTab,()=>this._manageOpen=!1,this._onContactsChanged,this._onChannelsChanged):Zn(Ie||(Ie=on``))):Zn(Re||(Re=on`
      <div class="chat-layout">
        <meshcore-conversation-list
          .conversations=${0}
          .activeId=${0}
          .unread=${0}
          .unreadCounts=${0}
          .nodePrefix=${0}
          @conversation-selected=${0}
          @manage-requested=${0}></meshcore-conversation-list>
        <div class="chat-main">
          ${0}
          ${0}
        </div>
        <aside
          class="hive-observed-column"
          data-hive-observed-host
          aria-label="Canais Observados 48H">
        </aside>
        ${0}
        ${0}
      </div>
    `),this.conversations,this.selectedId,this.unread,this.unread.counts,(null===(e=this.config)||void 0===e?void 0:e.node_prefix)||null,e=>{const t=e.detail.id;t===this.selectedId&&(this.unread.resetUnreadCountAtSelection(),this._pendingScroll="bottom"),this.selectedId=t},e=>this._onManageRequested(e),this.selectedId?Zn(Me||(Me=on`
            <div class="narrow-header" style="display: flex; align-items: center; padding: 8px 16px;">
              <div style="flex: 1; font-size: 14px; font-weight: 500; color: var(--primary-text-color);">
                ${0}${0}
              </div>
              <div class="chat-header-actions">
                <button class="header-action-btn" title="Search messages" aria-label="Search messages" @click=${0}><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>
              </div>
            </div>
          `),this._getConversationName(),this._renderScopeChip(),()=>{this._searchOpen=!this._searchOpen}):"",this._renderChatArea(),this._searchOpen?Zn(De||(De=on`
          <div class="search-panel">
            <meshcore-message-search
              .hass=${0}
              .entryId=${0}
              .entityId=${0}
              .meshNodeName=${0}
              @result-selected=${0}
              @search-close=${0}
            ></meshcore-message-search>
          </div>
        `),this.hass,null===(t=this.config)||void 0===t?void 0:t.entry_id,this._currentEntityId||void 0,null===(i=this.config)||void 0===i?void 0:i.node_name,this._onSearchResultSelected,()=>{this._searchOpen=!1}):"",this._manageOpen?Zn(Fe||(Fe=on`
          <meshcore-manage-dialog
            .hass=${0}
            .entryId=${0}
            .narrow=${0}
            .initialTab=${0}
            @manage-closed=${0}
            @contacts-changed=${0}
            @channels-changed=${0}
          ></meshcore-manage-dialog>
        `),this.hass,null===(s=this.config)||void 0===s?void 0:s.entry_id,this.narrow,this._manageInitialTab,()=>this._manageOpen=!1,this._onContactsChanged,this._onChannelsChanged):Zn(Te||(Te=on``)))}_renderChatArea(){var e,t,i,s,a,r;if(!this._messageStore||!this.selectedId)return Zn(Qe||(Qe=on`
        <div class="empty-state">
          <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg></div>
          <div class="empty-text">Select a conversation to start</div>
          <div class="empty-subtext">Choose a channel or contact from the list</div>
        </div>
      `));if(!this._conversationResolved)return Zn(Pe||(Pe=on`
        <div class="empty-state">
          <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></div>
          <div class="empty-text">Conversation unavailable</div>
          <div class="empty-subtext">This contact may no longer be added to the node</div>
        </div>
      `));const n=this._messageStore.messages,o=function(e,t){var i;const s=null!==(i=t.group_timeout)&&void 0!==i?i:300,a=!1!==t.group_messages?function(e,t){if(0===e.length)return[];const i=[];let s=null;for(const a of e)!s||a.isSystem||s.isSystem||a.sender!==s.sender||(a.timestamp.getTime()-s.endTime.getTime())/1e3>t?(s={sender:a.sender,isOutgoing:a.isOutgoing,isSystem:a.isSystem,messages:[a],startTime:a.timestamp,endTime:a.timestamp},i.push(s)):(s.messages.push(a),s.endTime=a.timestamp);return i}(e,s):e.map(e=>({sender:e.sender,isOutgoing:e.isOutgoing,isSystem:e.isSystem,messages:[e],startTime:e.timestamp,endTime:e.timestamp}));if(0===a.length)return[];const r=[];let n=null;for(const e of a){const i=e.startTime;!1===t.show_date_separators||n&&!qo(n,i)||r.push({type:"date-separator",date:i,label:Vo(i)}),r.push({type:"group",group:e}),n=i}return r}(n,{group_messages:null===(e=null===(t=this.config)||void 0===t?void 0:t.group_messages)||void 0===e||e,group_timeout:null!==(i=null===(s=this.config)||void 0===s?void 0:s.group_timeout)&&void 0!==i?i:300,show_date_separators:null===(a=null===(r=this.config)||void 0===r?void 0:r.show_date_separators)||void 0===a||a});return Zn(Oe||(Oe=on`
      <div class="chat-container" @reply-to-sender=${0} @scroll=${0}>
        ${0}
        ${0}
        ${0}
        ${0}
        ${0}
        ${0}
      </div>
      <div class="input-area">
        <textarea
          placeholder="Type a message..."
          aria-label="Message text. Press Enter to send, Shift+Enter for newline."
          .value=${0}
          @input=${0}
          @keydown=${0}
          ?disabled=${0}></textarea>
        <button
          class="send-button"
          aria-label="Send message"
          @click=${0}
          ?disabled=${0}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 L4.13399899,1.16151496 C3.34915502,0.9 2.40734225,0.9 1.77946707,1.4429026 C0.994623095,2.0752101 0.837654326,3.00778453 1.15159189,3.98029867 L3.03521743,10.4212916 C3.03521743,10.5783889 3.19218622,10.7354863 3.50612381,10.7354863 L16.6915026,11.5209733 C16.6915026,11.5209733 17.1624089,11.5209733 17.1624089,12.0492776 C17.1624089,12.5775818 16.6915026,12.4744748 16.6915026,12.4744748 Z"/>
          </svg>
        </button>
      </div>
    `),this._onReplyToSender,this._onChatScroll,this._messageStore.loadingOlder?Zn(Ue||(Ue=on`<div class="loading-older"><div class="loading-spinner"></div></div>`)):Zn(ze||(ze=on``)),this._messageStore.error?Zn(He||(He=on`
              <div class="error-state">
                <span><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg></span>
                <span>${0}</span>
              </div>
            `),this._messageStore.error):Zn($e||($e=on``)),this._messageStore.loading&&0===n.length?Zn(Ne||(Ne=on`
              <div class="loading-state">
                <div class="loading-spinner"></div>
                Loading messages...
              </div>
            `)):Zn(Le||(Le=on``)),0!==o.length||this._messageStore.loading?Zn(Ye||(Ye=on``)):Zn(Ge||(Ge=on`
              <div class="empty-state">
                <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/></svg></div>
                <div class="empty-text">No messages yet</div>
                <div class="empty-subtext">Be the first to send a message!</div>
              </div>
            `)),this._renderItemsWithDivider(o),this._renderNewMessagesIndicator(),this._inputText,e=>{const t=e.target;this._inputText=t.value},e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),this._sendMessage())},this._sending||!this.selectedId,()=>this._sendMessage(),this._sending||!this.selectedId||!this._inputText.trim())}_renderItemsWithDivider(e){const t=[];let i=0,s=!1;const a=this.unread.dividerAfterGroupIdx(e);for(const o of e){var r,n;"date-separator"!==o.type?(s||null===a||i!==a||(t.push(Zn(je||(je=on`
          <div class="unread-divider">
            <span>New messages</span>
          </div>
        `))),s=!0),t.push(Zn(We||(We=on`
        <meshcore-message-bubble
          .group=${0}
          .timestampFormat=${0}></meshcore-message-bubble>
      `),o.group,null!==(r=null===(n=this.config)||void 0===n?void 0:n.timestamp_format)&&void 0!==r?r:"relative")),i++):t.push(Zn(Ke||(Ke=on`
          <div class="date-separator">
            <span>${0}</span>
          </div>
        `),o.label))}return t}_renderNewMessagesIndicator(){const e=this._messageStore;if(!e)return Zn(Je||(Je=on``));const t=e.newMessagesWhileAway,i=e.hasNewerMessages;if(null!==this._pendingScroll||this._scrollInFlight)return Zn(qe||(qe=on``));const s=(a={counter:t,hasNewer:i,hasContentBelow:this._hasContentBelowViewport(),cursorAtTail:this.unread.cursorAtTail(this._currentEntityId,this._latestNonTempMessageId())}).counter>0?`↓ ${a.counter} new`:a.hasNewer||a.hasContentBelow?a.cursorAtTail&&!a.hasNewer?"↓ latest":"↓ unread":null;var a;return null===s?Zn(Ve||(Ve=on``)):Zn(Ze||(Ze=on`
      <button class="new-messages-indicator" @click=${0}>
        ${0}
      </button>
    `),this._jumpToBottom,s)}_onConversationSelected(){if(this.selectedId&&this._messageStore&&this.config&&this.hass){var e;const t=this.conversations.find(e=>"pubkey_prefix"in e?e.pubkey_prefix===this.selectedId:String(e.channel_idx)===this.selectedId);if(!t)return this._conversationResolved=!1,this._currentEntityId=null,void(this._messageStore&&this._messageStore.switchEntity(null));this._conversationResolved=!0;let i=null;if("pubkey_prefix"in t){const e=t.pubkey_prefix;i=function(e,t,i){const s=i.substring(0,6);if(t.contact_entity_pattern&&t.node_prefix){const i=t.contact_entity_pattern.replace("{prefix}",t.node_prefix).replace("{contact}",s);if(e.states[i])return i}const a=`_${s}_messages`,r=t.node_prefix?`_${t.node_prefix}_`:"";for(const t of Object.keys(e.states))if(t.startsWith("binary_sensor.")&&t.endsWith(a)&&(!r||t.includes(r)))return t;return null}(this.hass,this.config,e)}else{const e=t.channel_idx;i=function(e,t,i){if(t.channel_entity_pattern&&t.node_prefix){const s=t.channel_entity_pattern.replace("{prefix}",t.node_prefix).replace("{idx}",String(i));if(e.states[s])return s}const s=`_ch_${i}_messages`,a=t.node_prefix?`_${t.node_prefix}_`:"";for(const t of Object.keys(e.states))if(t.startsWith("binary_sensor.")&&t.endsWith(s)&&(!a||t.includes(a)))return t;return null}(this.hass,this.config,e)}this._currentEntityId=i,this.dispatchEvent(new CustomEvent("active-entity-changed",{detail:{entityId:i},bubbles:!0,composed:!0}));const s=this._getUnreadCountForSelected(),a=i&&(null===(e=this.lastRead)||void 0===e?void 0:e[i])||null;this._pendingScroll=a||s>0?"last-read":"bottom",this._lastMessageCount=0,this.unread.beginConversation(i,s),this._messageStore.switchEntity(i,a)}}async _sendMessage(){if(this._sending||!this._inputText.trim()||!this.selectedId||!this.hass||!this.config)return;if(!this._conversationResolved)return void console.warn("Cannot send — conversation not resolved");this._sending=!0;const e=this._inputText.trim();this._inputText="";try{var t;this._messageStore&&(this._messageStore.addOptimisticMessage(this.config.node_name,e),this._pendingScroll="bottom");const s=null===(t=this.config)||void 0===t?void 0:t.entry_id;if(this._isContact())await async function(e,t,i,s){try{const a={pubkey_prefix:t,message:i};s&&(a.entry_id=s),await e.callService("hivefw_integration","send_message",a)}catch(e){throw new Error(`Failed to send direct message: ${String(e)}`)}}(this.hass,this.selectedId,e,s);else{var i;const t=parseInt(this.selectedId,10);if(isNaN(t)||t<0||t>255)return console.error("Invalid channel index:",this.selectedId),void(this._inputText=e);await async function(e,t,i,s,a){try{const r={channel_idx:t,message:i};s&&(r.entry_id=s),a&&(r.scope=a),await e.callService("hivefw_integration","send_channel_message",r)}catch(e){throw new Error(`Failed to send channel message: ${String(e)}`)}}(this.hass,t,e,s,null!==(i=this._getActiveChannelScope())&&void 0!==i?i:void 0)}}catch(t){console.error("Failed to send message:",t),this._inputText=e}finally{this._sending=!1}}_latestNonTempMessageId(){var e,t;const i=null!==(e=null===(t=this._messageStore)||void 0===t?void 0:t.messages)&&void 0!==e?e:[];for(let e=i.length-1;e>=0;e--){const t=i[e].id;if(!t.startsWith("rt_")&&!t.startsWith("optimistic_"))return t}return null}_isContact(){return!!this.selectedId&&!/^\d+$/.test(this.selectedId)}_onManageRequested(e){var t;this._manageInitialTab="channels"===(null==e||null===(t=e.detail)||void 0===t?void 0:t.tab)?"channels":"contacts",this._manageOpen=!0}_onContactsChanged(){this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0}))}_onChannelsChanged(){this.dispatchEvent(new CustomEvent("channels-changed",{bubbles:!0,composed:!0}))}_onReplyToSender(e){const{mention:t}=e.detail;t&&(this._inputText=t+this._inputText,this.requestUpdate())}_getConversationName(){if(!this.selectedId)return"";const e=this.conversations.find(e=>"pubkey_prefix"in e?e.pubkey_prefix===this.selectedId:String(e.channel_idx)===this.selectedId);return e?"pubkey_prefix"in e?e.adv_name:e.name:this.selectedId}_getActiveChannelScope(){if(!this.selectedId||this._isContact())return null;const e=this.conversations.find(e=>!("pubkey_prefix"in e)&&String(e.channel_idx)===this.selectedId);return e&&e.scope||null}_renderScopeChip(){const e=this._getActiveChannelScope();return e?Zn(Xe||(Xe=on`<button
      class="scope-chip"
      title="Region scope: messages on this channel flood only through '${0}' repeaters. Click to manage."
      aria-label="Region scope ${0} — manage channels"
      @click=${0}>🌐 ${0}</button>`),e,e,()=>{this._manageInitialTab="channels",this._manageOpen=!0},e):""}_getChatContainer(){var e;return null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(".chat-container")}_isScrollGuarded(){return this._scrollInFlight||Date.now()<this._scrollGuardUntil}_executeScroll(e){this._scrollInFlight=!0,"last-read"===e&&(this._scrollGuardUntil=Date.now()+2e3),this._doScrollWithRetry(e,0)}_doScrollWithRetry(e,t){this.updateComplete.then(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{const i=this._getChatContainer();if(!i)return void(this._scrollInFlight=!1);if("bottom"===e)return i.scrollTop=i.scrollHeight,void(this._scrollInFlight=!1);const s=i.querySelector(".unread-divider");if(s){const e=i.getBoundingClientRect(),t=s.getBoundingClientRect();i.scrollTop+=t.top-e.top,this._scrollInFlight=!1}else t<10?setTimeout(()=>this._doScrollWithRetry(e,t+1),50):(i.scrollTop=i.scrollHeight,this._scrollInFlight=!1)})})})}_scrollToBottomIfNearEnd(){if(this._isScrollGuarded())return;const e=this._messageStore;null!=e&&e.hasNewerMessages||this.updateComplete.then(()=>{requestAnimationFrame(()=>{if(this._isScrollGuarded())return;const e=this._getChatContainer();e&&e.scrollHeight-e.scrollTop-e.clientHeight<150&&(e.scrollTop=e.scrollHeight,this._checkAndMarkReadIfAtBottom())})})}_onChatScroll(e){const t=e.target,i=this._messageStore;if(!t||!i)return;const s=t.scrollTop,a=t.scrollHeight-t.scrollTop-t.clientHeight<150;if(i.setUserAtBottom(a),s<150&&i.hasOlderMessages&&!i.loadingOlder&&!this._isScrollGuarded()){const e=t.scrollHeight;i.loadOlderMessages().then(()=>{this.updateComplete.then(()=>{requestAnimationFrame(()=>{const i=t.scrollHeight-e;i>0&&(t.scrollTop+=i)})})})}a&&(i.hasNewerMessages&&!i.loadingNewer?i.loadNewerMessages():i.hasNewerMessages||this._checkAndMarkReadIfAtBottom())}_isLastMessageVisible(){const e=this._getChatContainer();if(!e)return!1;const t=e.querySelectorAll("meshcore-message-bubble"),i=t[t.length-1];if(!i)return!1;const s=e.getBoundingClientRect().bottom;return i.getBoundingClientRect().bottom<=s+5}_hasContentBelowViewport(){var e,t;return!!this._getChatContainer()&&(0!==(null!==(e=null===(t=this._messageStore)||void 0===t?void 0:t.messages.length)&&void 0!==e?e:0)&&!this._isLastMessageVisible())}_checkAndMarkReadIfAtBottom(){const e=this._messageStore;this._currentEntityId&&e&&this.unread.onScrollState({entityId:this._currentEntityId,lastMessageVisible:this._isLastMessageVisible(),hasNewerMessages:e.hasNewerMessages,bufferTailId:this._latestNonTempMessageId()})&&e.resetNewMessagesCounter()}async _jumpToBottom(){const e=this._messageStore;if(e){for(;e.hasNewerMessages&&!e.loadingNewer;)await e.loadNewerMessages();await this.updateComplete,requestAnimationFrame(()=>{const t=this._getChatContainer();t&&(t.scrollTop=t.scrollHeight,this._currentEntityId&&this.unread.onPillJump({entityId:this._currentEntityId,bufferTailId:this._latestNonTempMessageId()})&&e.resetNewMessagesCounter())})}}_getUnreadCountForSelected(){var e,t;return this.selectedId&&this.unread?this.unread.badgeCount(this.selectedId,null!==(e=null===(t=this.config)||void 0===t?void 0:t.node_prefix)&&void 0!==e?e:null,this._currentEntityId):0}_onSearchResultSelected(e){const{entityId:t,messageId:i,timestamp:s}=e.detail;t&&this._messageStore&&(this._messageStore.switchEntity(t),this._currentEntityId=t),i&&this._scrollToAndHighlight(i,s)}_scrollToAndHighlight(e,t){this.updateComplete.then(()=>{requestAnimationFrame(()=>{this._findAndHighlightBubble(e)||t&&this._messageStore&&this._messageStore.fetchAroundTimestamp(t).then(t=>{t&&this.updateComplete.then(()=>{requestAnimationFrame(()=>{this._findAndHighlightBubble(e)})})})})})}_findAndHighlightBubble(e){var t;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".chat-container");if(!i)return!1;const s=i.querySelectorAll("meshcore-message-bubble");for(const t of Array.from(s)){var a;const i=null===(a=t.shadowRoot)||void 0===a?void 0:a.querySelector(`[data-msg-id="${e}"]`);if(i)return i.scrollIntoView({behavior:"smooth",block:"center"}),i.classList.add("search-highlight"),setTimeout(()=>i.classList.remove("search-highlight"),2500),!0}return!1}};hl.styles=gn(et||(et=on`
    :host {
      display: flex;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .chat-layout {
      display: flex;
      width: 100%;
      height: 100%;
      gap: 0;
    }

    .chat-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--chat-bg);
    }

    .chat-container {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 8px 12px;
      background: var(--chat-bg);
      position: relative;
      /* Disable browser-level scroll anchoring. The lazy-load-older
       * path in _onChatScroll manually preserves scroll position by
       * adding the prepended content height to scrollTop. With the
       * default (overflow-anchor: auto), the browser ALSO shifts
       * scrollTop by the prepended height -- and the two
       * compensations stack, landing the viewport past the divider
       * at the new buffer tail. That misfires mark-read on channel
       * re-entry. See 2026-05-15 unread-clearing investigation. */
      overflow-anchor: none;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }

    .chat-container::-webkit-scrollbar {
      width: 6px;
    }

    .chat-container::-webkit-scrollbar-track {
      background: transparent;
    }

    .chat-container::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb, var(--scrollbar-thumb-color, #c1c1c1));
      border-radius: 3px;
    }

    .input-area {
      display: flex;
      align-items: flex-end;
      gap: 8px;
      padding: 8px 12px 12px;
      border-top: 1px solid var(--divider-color, #e0e0e0);
      background: var(--input-bg);
      flex-shrink: 0;
    }

    .input-area textarea {
      flex: 1;
      padding: 10px 14px;
      border: 1px solid var(--input-border);
      border-radius: 20px;
      background: var(--chat-bg);
      color: var(--primary-text-color);
      font-size: 14px;
      font-family: inherit;
      resize: none;
      outline: none;
      max-height: 120px;
      min-height: 40px;
      line-height: 1.4;
      transition: border-color 0.2s;
      box-sizing: border-box;
    }

    .input-area textarea:focus {
      border-color: var(--primary-color, #03a9f4);
    }

    .input-area textarea::placeholder {
      color: var(--secondary-text-color, #727272);
    }

    .input-area textarea:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .send-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border: none;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      cursor: pointer;
      flex-shrink: 0;
      transition: opacity 0.15s, transform 0.15s;
    }

    .send-button:hover {
      opacity: 0.9;
    }

    .send-button:active {
      transform: scale(0.95);
    }

    .send-button:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    .send-button svg {
      width: 20px;
      height: 20px;
      /* Optical centering: the right-pointing icon's visual mass sits
         ~2px left of its bounding-box center at this size, so a
         geometrically centered glyph reads as shifted left. */
      transform: translateX(2px);
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--secondary-text-color, #727272);
      text-align: center;
      padding: 32px 16px;
    }

    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    .empty-text {
      font-size: 16px;
      margin-bottom: 8px;
    }

    .empty-subtext {
      font-size: 13px;
      opacity: 0.7;
    }

    .error-state {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      color: var(--error-color, #db4437);
      font-size: 13px;
      background: rgba(219, 68, 55, 0.08);
      border-radius: 8px;
      margin: 8px 12px;
    }

    .loading-state {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      color: var(--secondary-text-color, #727272);
      font-size: 14px;
      gap: 8px;
    }

    .loading-older {
      display: flex;
      justify-content: center;
      padding: 12px;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid var(--divider-color, #e0e0e0);
      border-top-color: var(--primary-color, #03a9f4);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .date-separator {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 16px 0 12px;
      color: var(--secondary-text-color, #727272);
      font-size: 12px;
      font-weight: 500;
    }

    .date-separator::before,
    .date-separator::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--divider-color, #e0e0e0);
    }

    .unread-divider {
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 12px 0;
      color: var(--error-color, #db4437);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.3px;
    }

    .unread-divider::before,
    .unread-divider::after {
      content: '';
      flex: 1;
      height: 1px;
      background: var(--error-color, #db4437);
      opacity: 0.5;
    }

    .narrow-header {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      flex-shrink: 0;
    }

    .back-button {
      padding: 8px 12px;
      border: none;
      background: transparent;
      color: var(--primary-color, #03a9f4);
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    .back-button:hover {
      background: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
    }

    .narrow-conv-name {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    /* Region-scope indicator next to the channel name in the thread
       header. Always visible while a scoped channel is active so the
       user knows what scope they're sending under without opening the
       channel-edit dialog. */
    .scope-chip {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-left: 8px;
      padding: 1px 8px;
      border: none;
      border-radius: 10px;
      background: var(--secondary-background-color, rgba(127, 127, 127, 0.15));
      color: var(--secondary-text-color);
      font-size: 12px;
      line-height: 18px;
      vertical-align: middle;
      cursor: pointer;
      white-space: nowrap;
    }

    .scope-chip:hover {
      color: var(--primary-text-color);
    }

    .narrow-full {
      width: 100% !important;
    }

    .narrow-list-only {
      width: 100% !important;
      min-height: 0;
      flex-direction: column;
      overflow: hidden;
    }

    .narrow-list-only meshcore-conversation-list {
      width: 100% !important;
      min-height: 0;
      flex: 1 1 auto;
      flex-shrink: 1;
    }

    .narrow-list-only .hive-observed-column {
      width: 100%;
      min-width: 0;
      height: min(32vh, 280px);
      min-height: 180px;
      max-height: 280px;
      flex: 0 0 auto;
      border-left: 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }

    .chat-header-actions {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-left: auto;
    }

    .header-action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background: transparent;
      color: var(--secondary-text-color);
      cursor: pointer;
      transition: all 0.15s;
      font-size: 16px;
    }

    .header-action-btn:hover {
      background: rgba(0, 0, 0, 0.05);
      color: var(--primary-text-color);
    }

    .hive-observed-column {
      width: 330px;
      min-width: 330px;
      min-height: 0;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      border-left: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      box-sizing: border-box;
    }

    @media (max-width: 900px) {
      .hive-observed-column {
        width: 300px;
        min-width: 300px;
      }
    }

    .search-panel {
      width: 300px;
      border-left: 1px solid var(--divider-color, #e0e0e0);
      background: var(--card-background-color, #fff);
      flex-shrink: 0;
      overflow: hidden;
    }

    /* "↓ N new" indicator. Shown when new messages
       arrived while scrolled away from the bottom OR when the buffer
       tail isn't yet the conversation's newest message. Click loads
       any unloaded newer messages, scrolls to bottom, and fires
       mark-read. Sticky-positioned at the bottom of the chat
       container so it sits above the input area while scrolled. */
    .new-messages-indicator {
      position: sticky;
      bottom: 12px;
      /* 'align-self: center' requires a flex parent (chat-
         container is 'display: block'); 'margin: 0 auto' requires a
         block-level element with finite width (button defaults to
         'inline-block'). Both were no-ops. Using left + transform
         works with sticky positioning regardless of parent layout. */
      left: 50%;
      transform: translateX(-50%);
      padding: 6px 14px;
      border: none;
      border-radius: 16px;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
      transition: opacity 0.15s, transform 0.15s;
      z-index: 2;
    }

    .new-messages-indicator:hover {
      opacity: 0.92;
    }

    .new-messages-indicator:active {
      /* Combine the centering transform with the press
         offset. A single 'transform' declaration replaces any prior
         one, so ':active' must restate both. */
      transform: translateX(-50%) translateY(1px);
    }
  `)),ln([yo({type:Object})],hl.prototype,"hass",void 0),ln([yo({type:Object})],hl.prototype,"config",void 0),ln([yo({type:Array})],hl.prototype,"conversations",void 0),ln([yo({type:String})],hl.prototype,"selectedId",void 0),ln([yo({type:Boolean})],hl.prototype,"narrow",void 0),ln([yo({attribute:!1})],hl.prototype,"unread",void 0),ln([yo({type:Object})],hl.prototype,"lastRead",void 0),ln([xo()],hl.prototype,"_messageStore",void 0),ln([xo()],hl.prototype,"_inputText",void 0),ln([xo()],hl.prototype,"_sending",void 0),ln([xo()],hl.prototype,"_viewportNarrow",void 0),ln([xo()],hl.prototype,"_narrowShowMessages",void 0),ln([xo()],hl.prototype,"_manageOpen",void 0),ln([xo()],hl.prototype,"_manageInitialTab",void 0),ln([xo()],hl.prototype,"_searchOpen",void 0),ln([xo()],hl.prototype,"_currentEntityId",void 0),ln([xo()],hl.prototype,"_conversationResolved",void 0),ln([xo()],hl.prototype,"_pendingScroll",void 0),hl=ln([vo("hivefw-integration-page")],hl);let pl=class extends mo{constructor(){super(...arguments),this.selected=!1}render(){if(!this.contact)return Zn(tt||(tt=on``));const e=this.contact,t=this._getTypeClass(e.type),{label:i,cls:s}=this._getCategoryBadge(e),a=`contact-card ${e.age_bucket?`age-${e.age_bucket}`:"age-stale"}${this.selected?" selected":""}`,r=Array.isArray(e.tags)?e.tags:[];return Zn(it||(it=on`
      <div class=${0}>
        <div class="contact-avatar ${0}">
          ${0}
        </div>
        <div class="contact-info">
          <div class="contact-name">${0}${0}</div>
          <div class="contact-prefix">${0}</div>
          <div class="contact-meta">
            ${0}
          </div>
          ${0}
        </div>
        <span class="category-badge ${0}">${0}</span>
      </div>
    `),a,t,this._getTypeIcon(e.type),e.favorite?"★ ":"",e.adv_name,e.pubkey_prefix,e.lastmod?`Last heard ${new Date(1e3*e.lastmod).toLocaleString()}`:"",r.length?Zn(st||(st=on`<div class="contact-tags">
                ${0}
              </div>`),r.slice(0,3).map(e=>Zn(at||(at=on`<span class="contact-tag">#${0}</span>`),e))):Zn(rt||(rt=on``)),s,i)}_getCategoryBadge(e){return e.added_to_node?{label:"Added",cls:"added"}:{label:"Discovered",cls:"discovered"}}_getTypeClass(e){switch(e){case 1:return"client";case 2:return"repeater";case 3:return"room-server";case 4:return"sensor";default:return"unknown"}}_getTypeIcon(e){switch(e){case 0:case 1:return Zn(nt||(nt=on`<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`));case 2:return Zn(ot||(ot=on`<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11zm0 8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`));case 3:return Zn(lt||(lt=on`<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>`));case 4:return Zn(ct||(ct=on`<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`));default:return Zn(dt||(dt=on`<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`))}}};pl.styles=gn(ht||(ht=on`
    :host {
      display: block;
      height: 100%;
    }

    .contact-card {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s;
      background: var(--card-background-color, #fff);
      height: 100%;
      box-sizing: border-box;
    }

    .contact-card:hover {
      background: rgba(0, 0, 0, 0.02);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
    }

    .contact-card.selected {
      background: rgba(var(--rgb-primary-color, 3, 169, 244), 0.08);
      border-color: var(--primary-color, #03a9f4);
    }
    .contact-card.age-lt1h { border-left: 4px solid #2e7d32; }
    .contact-card.age-lt6h { border-left: 4px solid #66a832; }
    .contact-card.age-lt24h { border-left: 4px solid #f9a825; }
    .contact-card.age-lt7d { border-left: 4px solid #ef6c00; }
    .contact-card.age-stale { border-left: 4px solid #757575; opacity: .78; }

    .contact-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    /* Scale down the inline 20px SVG icons inside avatars so the
       glyph reads as a tag-glyph, not a primary visual. */
    .contact-avatar svg { width: 16px; height: 16px; }

    /* Translucent backgrounds + saturated icon colour. Mirrors the
       category-badge treatment below so the avatar reads as a tag,
       not a brand-bright disc. */
    .contact-avatar.client      { background: rgba(76, 175, 80, 0.15);  color: #388e3c; }
    .contact-avatar.repeater    { background: rgba(255, 152, 0, 0.15);  color: #f57c00; }
    .contact-avatar.room-server { background: rgba(156, 39, 176, 0.15); color: #7b1fa2; }
    .contact-avatar.sensor      { background: rgba(96, 125, 139, 0.15); color: #455a64; }
    .contact-avatar.unknown     { background: rgba(3, 169, 244, 0.15);  color: #0288d1; }

    .contact-info {
      flex: 1;
      overflow: hidden;
    }

    .contact-name {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .contact-prefix {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      font-family: monospace;
    }

    .contact-meta {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
      margin-top: 2px;
    }
    .contact-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-top: 4px;
    }
    .contact-tag {
      padding: 1px 5px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
      color: var(--primary-color);
      font-size: 9px;
      line-height: 1.4;
    }

    .category-badge {
      font-size: 10px;
      font-weight: 500;
      padding: 2px 8px;
      border-radius: 10px;
      white-space: nowrap;
      flex-shrink: 0;
      align-self: center;
    }
    .category-badge.added {
      background: rgba(3, 169, 244, 0.15);
      color: #0277bd;
    }
    .category-badge.discovered {
      background: rgba(76, 175, 80, 0.15);
      color: #2e7d32;
    }
  `)),ln([yo({type:Object})],pl.prototype,"contact",void 0),ln([yo({type:Boolean})],pl.prototype,"selected",void 0),pl=ln([vo("meshcore-contact-card")],pl);let ul=class extends mo{constructor(){super(),this.open=!1,this.pendingAction=null,this._confirming=!1,this._confirmAction=null,nl(this,{isOpen:()=>this.open,onEscape:()=>{this._confirming?(this._confirming=!1,this._confirmAction=null):this._close()}})}render(){if(!this.open||!this.node)return Zn(pt||(pt=on``));const e="adv_name"in this.node,t=e?2===this.node.type:"repeater"===this.node.type,i=e&&3===this.node.type,s=e?1===this.node.type:"client"===this.node.type,a=e&&4===this.node.type,r=e?this.node.adv_name:this.node.name,n=this.node.pubkey_prefix;let o=Zn(ut||(ut=on`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`)),l="Contact",c="";return t?(o=Zn(gt||(gt=on`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 5c-3.87 0-7 3.13-7 7h2c0-2.76 2.24-5 5-5s5 2.24 5 5h2c0-3.87-3.13-7-7-7zm0-4C5.93 1 1 5.93 1 12h2c0-4.97 4.03-9 9-9s9 4.03 9 9h2c0-6.07-4.93-11-11-11zm0 8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>`)),l="Repeater",c="repeater"):i?(o=Zn(At||(At=on`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>`)),l="Room Server",c="room-server"):a?(o=Zn(ft||(ft=on`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>`)),l="Sensor",c="sensor"):s&&(o=Zn(mt||(mt=on`<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>`)),l="Client",c="client"),Zn(_t||(_t=on`
      <div class="dialog-backdrop" @click=${0}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Node detail — ${0}"
          @click=${0}>
          <div class="dialog-header">
            <div class=${0}>${0}</div>
            <div class="dialog-title">
              <div class="dialog-name">${0}</div>
              <div class="dialog-type">${0}</div>
            </div>
            <button class="dialog-close" aria-label="Close" @click=${0}>✕</button>
          </div>

          <div class="dialog-content">
            ${0}
          </div>
        </div>
      </div>
    `),this._close,r,e=>e.stopPropagation(),`dialog-avatar ${c}`,o,r,l,this._close,this._confirming?Zn(vt||(vt=on`
                  <div class="confirm-section">
                    <div class="confirm-text">
                      ${0}
                    </div>
                    ${0}
                    <div class="confirm-actions">
                      <button class="confirm-btn yes" @click=${0}>Yes</button>
                      <button class="confirm-btn no" @click=${0}>Cancel</button>
                    </div>
                  </div>
                `),"remove-contact"===this._confirmAction?"Remove this as an Added Contact?":"","remove-contact"===this._confirmAction?Zn(wt||(wt=on`
                      <div class="confirm-description">Removing the contact will make it a Discovered Contact.</div>
                    `)):Zn(bt||(bt=on``)),()=>this._confirmAction_exec(),()=>{this._confirming=!1,this._confirmAction=null}):Zn(yt||(yt=on`
                  <div class="section">
                    <div class="section-header">Quick Actions</div>
                    <div class="quick-actions ${0}">
                      ${0}
                      ${0}
                      ${0}
                    </div>
                  </div>

                  <div class="section">
                    <div class="section-header">Information</div>
                    <div class="info-grid">
                      <div class="info-item">
                        <div class="info-label">Public Key Prefix</div>
                        <div class="info-value">${0}</div>
                      </div>
                      <div class="info-item">
                        <div class="info-label">Type</div>
                        <div class="info-value">${0}</div>
                      </div>
                      ${0}
                    </div>
                  </div>

                  ${0}

                  ${0}

                `),e?"":"full",e&&this.node.added_to_node&&(s||i)?Zn(xt||(xt=on`
                        <button class="action-btn" @click=${0}><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg>Message</button>
                      `),()=>this._dispatchEvent("message")):Zn(Et||(Et=on``)),n&&!s?Zn(Ct||(Ct=on`
                        <button class="action-btn" @click=${0}><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M2 12a2 2 0 104 0 2 2 0 10-4 0zM10 12a2 2 0 104 0 2 2 0 10-4 0zM18 12a2 2 0 104 0 2 2 0 10-4 0zM7 10l3 2-3 2zM15 10l3 2-3 2z"/></svg>Trace</button>
                      `),()=>this._dispatchEvent("trace")):Zn(Bt||(Bt=on``)),e&&this.node.added_to_node?Zn(St||(St=on`<button class="action-btn warning"
                            ?disabled=${0}
                            @click=${0}>${0}</button>`),"remove-contact"===this.pendingAction,()=>{this._confirming=!0,this._confirmAction="remove-contact"},"remove-contact"===this.pendingAction?"Removing…":"Remove Contact"):e?Zn(kt||(kt=on`<button class="action-btn"
                            ?disabled=${0}
                            @click=${0}>${0}</button>`),"add-contact"===this.pendingAction,()=>this._dispatchEvent("add-contact"),"add-contact"===this.pendingAction?Zn(It||(It=on`Adding…`)):Zn(Rt||(Rt=on`<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>Add Contact`))):Zn(Mt||(Mt=on``)),n,l,e?Zn(Dt||(Dt=on`
                        <div class="info-item">
                          <div class="info-label">Last Advert</div>
                          <div class="info-value">
                            ${0}
                          </div>
                        </div>
                        <div class="info-item">
                          <div class="info-label">Status</div>
                          <div class="info-value">${0}</div>
                        </div>
                      `),this.node.last_advert?new Date(1e3*this.node.last_advert).toLocaleString():"Unknown",this.node.added_to_node?"Added Contact":"Discovered Contact"):Zn(Ft||(Ft=on``)),!e||0===this.node.adv_lat&&0===this.node.adv_lon?Zn(Qt||(Qt=on``)):Zn(Tt||(Tt=on`
                        <div class="section">
                          <div class="section-header">Location</div>
                          <div class="info-grid">
                            <div class="info-item">
                              <div class="info-label">Latitude</div>
                              <div class="info-value">${0}</div>
                            </div>
                            <div class="info-item">
                              <div class="info-label">Longitude</div>
                              <div class="info-value">${0}</div>
                            </div>
                          </div>
                        </div>
                      `),this.node.adv_lat.toFixed(6),this.node.adv_lon.toFixed(6)),e&&this.node.out_path?Zn(Pt||(Pt=on`
                        <div class="section">
                          <div class="section-header">Network</div>
                          <div class="info-item">
                            <div class="info-label">Route (Outgoing Path)</div>
                            <div class="info-value">${0}</div>
                          </div>
                          ${0}
                        </div>
                      `),this.node.out_path,this.node.out_path_len?Zn(Ot||(Ot=on`
                                <div class="info-item" style="margin-top: 8px;">
                                  <div class="info-label">Path Length</div>
                                  <div class="info-value">${0} hops</div>
                                </div>
                              `),this.node.out_path_len):Zn(Ut||(Ut=on``))):Zn(zt||(zt=on``))))}_close(){this.open=!1,this._confirming=!1,this._confirmAction=null,this.dispatchEvent(new CustomEvent("node-detail-closed",{bubbles:!0,composed:!0}))}_dispatchEvent(e){this.dispatchEvent(new CustomEvent(`node-${e}`,{detail:{node:this.node},bubbles:!0,composed:!0}))}_confirmAction_exec(){this._confirmAction&&this._dispatchEvent(this._confirmAction),this._close()}};ul.styles=gn(Ht||(Ht=on`
    :host {
      display: contents;
    }

    .dialog-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dialog {
      background: var(--card-background-color, #fff);
      border-radius: 8px;
      max-width: 500px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
      animation: slideUp 0.3s;
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .dialog-header {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .dialog-avatar {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--primary-color, #03a9f4);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 24px;
      flex-shrink: 0;
    }

    .dialog-avatar.repeater { background: #ff9800; }
    .dialog-avatar.room-server { background: #9c27b0; }
    .dialog-avatar.sensor { background: #607d8b; }
    .dialog-avatar.client { background: #4caf50; }

    .dialog-title { flex: 1; overflow: hidden; }

    .dialog-name {
      font-size: 18px;
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .dialog-type {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      margin-top: 2px;
    }

    .dialog-close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .dialog-close:hover { color: var(--primary-text-color); }

    .dialog-content { padding: 16px; }

    .section { margin-bottom: 16px; }

    .section-header {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      color: var(--secondary-text-color, #727272);
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 6px;
    }

    .quick-actions.full { grid-template-columns: 1fr; }

    .action-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      padding: 8px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: transparent;
      color: var(--primary-text-color);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
    }

    .action-btn:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-color: var(--primary-color, #03a9f4);
    }

    .action-btn.warning {
      color: #ff9800;
      border-color: rgba(255, 152, 0, 0.4);
    }

    .action-btn.warning:hover {
      background: #ff9800;
      color: #fff;
      border-color: #ff9800;
    }

    .action-btn.danger {
      color: var(--error-color, #db4437);
      border-color: rgba(219, 68, 55, 0.3);
    }

    .action-btn.danger:hover {
      background: var(--error-color, #db4437);
      color: #fff;
      border-color: var(--error-color, #db4437);
    }

    .action-btn:disabled {
      opacity: 0.6;
      cursor: wait;
      pointer-events: none;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .info-item {
      padding: 8px;
      background: var(--primary-background-color, #fafafa);
      border-radius: 6px;
    }

    .info-label {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .info-value {
      font-size: 13px;
      color: var(--primary-text-color);
      margin-top: 4px;
      word-break: break-all;
      font-family: monospace;
    }

    .confirm-section {
      padding: 12px;
      background: rgba(219, 68, 55, 0.08);
      border: 1px solid rgba(219, 68, 55, 0.2);
      border-radius: 6px;
      margin-bottom: 12px;
    }

    .confirm-text {
      font-size: 13px;
      color: var(--primary-text-color);
      margin-bottom: 8px;
    }

    .confirm-description {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      margin-bottom: 10px;
    }

    .confirm-actions { display: flex; gap: 6px; }

    .confirm-btn {
      padding: 6px 10px;
      border: none;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }

    .confirm-btn.yes { background: var(--error-color, #db4437); color: #fff; }
    .confirm-btn.no { background: var(--divider-color, #e0e0e0); color: var(--primary-text-color); }

  `)),ln([yo({type:Object})],ul.prototype,"node",void 0),ln([yo({type:Boolean})],ul.prototype,"open",void 0),ln([yo({type:Object})],ul.prototype,"hass",void 0),ln([yo({type:String})],ul.prototype,"pendingAction",void 0),ln([xo()],ul.prototype,"_confirming",void 0),ln([xo()],ul.prototype,"_confirmAction",void 0),ul=ln([vo("meshcore-node-detail-dialog")],ul);const gl={clients:1,repeaters:2,room_servers:3,sensors:4},Al={clients:"Clients",repeaters:"Repeaters",room_servers:"Room Servers",sensors:"Sensors"};let fl=class extends mo{constructor(){super(...arguments),this.contacts=[],this.channels=[],this.narrow=!1,this._viewportNarrow=!1,this._mapReady=void 0!==customElements.get("ha-map"),this._mapFocusId="",this._mapMarkerElements=new Map,this._primaryFilter="all",this._typeFilter=null,this._searchQuery="",this._activityFilter="all",this._displayedContacts=[],this._totalCount=0,this._typeCounts={clients:0,repeaters:0,room_servers:0,sensors:0},this._l1Counts={all:0,added:0,discovered:0},this._loading=!1,this._nodeDetailDialogOpen=!1,this._pendingAction=null,this._sortBy="last_heard",this._onMediaChange=e=>{this._viewportNarrow=e.matches},this._onImportFile=async e=>{var t;if(!this.hass)return;const i=e.target,s=null===(t=i.files)||void 0===t?void 0:t[0];if(s)try{var a;const e=JSON.parse(await s.text());if(!Array.isArray(e.discovered_contacts))return void window.alert("Ficheiro inválido: falta discovered_contacts.");const t=await async function(e,t,i){const s={type:"hivefw_integration/import_contacts",contacts:t};return i&&(s.entry_id=i),e.callWS(s)}(this.hass,e.discovered_contacts,null===(a=this.config)||void 0===a?void 0:a.entry_id);await Promise.all([this._loadPage(!0),this._loadCounts()]),this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0})),window.alert(`Importação concluída: ${t.imported} novos, ${t.skipped_existing} já existentes`+(t.invalid?`, ${t.invalid} inválidos.`:"."))}catch(e){console.error("Failed to import contacts:",e),window.alert("Não foi possível importar este ficheiro.")}finally{i.value=""}}}connectedCallback(){super.connectedCallback(),this._mediaQuery=window.matchMedia("(max-width: 870px)"),this._viewportNarrow=this._mediaQuery.matches,this._mediaQuery.addEventListener("change",this._onMediaChange),this._loadCounts(),this._loadPage(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._mediaQuery)||void 0===e||e.removeEventListener("change",this._onMediaChange),this._searchTimer&&(clearTimeout(this._searchTimer),this._searchTimer=void 0)}get _isNarrow(){return this.narrow||this._viewportNarrow}updated(e){super.updated(e),this._isNarrow?this.setAttribute("narrow",""):this.removeAttribute("narrow"),e.has("config")&&(this._displayedContacts=[],this._totalCount=0,this._loadCounts(),this._loadPage(!0))}render(){return Zn($t||($t=on`
      <div class="nodes-layout">
        <div class="nodes-header">
          <div class="l1-filters">
            ${0}
            ${0}
            ${0}
          </div>

          ${0}

          <div class="header-actions">
            <div class="search-bar">
              <span class="search-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>
              <input
                type="text"
                placeholder=${0}
                .value=${0}
                @input=${0}>
              ${0}
            </div>
            <select class="sort-select"
              .value=${0}
              @change=${0}>
              <option value="last_heard">Last Heard</option>
              <option value="name">Name</option>
              <option value="prefix">Pub Prefix</option>
            </select>
            <button class="clear-btn"
              @click=${0}
              title="Remove discovered contacts older than the configured threshold">
              Clear Stale
            </button>
            <button class="sync-btn" @click=${0}>⟳ Sync</button>
          </div>
        </div>

        <div class="content-area">
          ${0}
        </div>

        <section class="nodes-map-pane" aria-label="Mapa de nós"></section>
        <aside class="nodes-transfer-pane" aria-label="Importar e exportar contactos"></aside>
        <aside class="nodes-activity-pane" aria-label="Atividade dos nós"></aside>
      </div>

      <meshcore-node-detail-dialog
        .hass=${0}
        .node=${0}
        .pendingAction=${0}
        ?open=${0}
        @node-detail-closed=${0}
        @node-message=${0}
        @node-trace=${0}
        @node-add-contact=${0}
        @node-remove-contact=${0}>
      </meshcore-node-detail-dialog>
    `),this._renderL1Button("all","All"),this._renderL1Button("added","★ Added"),this._renderL1Button("discovered","Discovered"),"all"!==this._primaryFilter?Zn(Nt||(Nt=on`
            <div class="l2-bar">
              ${0}
            </div>
          `),this._renderL2Buttons()):to,this._getSearchPlaceholder(),this._searchQuery,this._onSearchInput,this._searchQuery?Zn(Lt||(Lt=on`<button class="clear-search" @click=${0}>✕</button>`),()=>{this._searchQuery="",this._loadPage(!0)}):to,this._sortBy,e=>{this._sortBy=e.target.value,this._loadPage(!0)},()=>this._clearStaleContacts(),()=>this._syncAll(),this._renderContactsContent(),this.hass,this._selectedNode,this._pendingAction,this._nodeDetailDialogOpen,()=>{this._nodeDetailDialogOpen=!1},()=>this._dispatchNodeAction("message"),()=>this._dispatchNodeAction("trace"),()=>this._dispatchNodeAction("add-contact"),()=>this._dispatchNodeAction("remove-contact"))}async _ensureMapComponent(){if(customElements.get("ha-map"))this._mapReady=!0;else try{const t=window.loadCardHelpers;if(t){var e;const i=await t();null===(e=i.createCardElement)||void 0===e||e.call(i,{type:"map",entities:[]})}await Promise.race([customElements.whenDefined("ha-map"),new Promise(e=>window.setTimeout(e,1500))]),this._mapReady=void 0!==customElements.get("ha-map"),this.requestUpdate()}catch(e){this._mapReady=!1}}_allMapSourceContacts(){return this.contacts.length?this.contacts:this._displayedContacts}_contactCoords(e){var t,i,s,a,r,n,o,l,c,d,h,p,u,g,A;const f=e,m=Number(null!==(t=null!==(i=null!==(s=null!==(a=f.adv_lat)&&void 0!==a?a:f.latitude)&&void 0!==s?s:f.lat)&&void 0!==i?i:null===(r=f.location)||void 0===r?void 0:r.latitude)&&void 0!==t?t:null===(n=f.location)||void 0===n?void 0:n.lat),_=Number(null!==(o=null!==(l=null!==(c=null!==(d=null!==(h=null!==(p=f.adv_lon)&&void 0!==p?p:f.longitude)&&void 0!==h?h:f.lon)&&void 0!==d?d:f.lng)&&void 0!==c?c:null===(u=f.location)||void 0===u?void 0:u.longitude)&&void 0!==l?l:null===(g=f.location)||void 0===g?void 0:g.lon)&&void 0!==o?o:null===(A=f.location)||void 0===A?void 0:A.lng);return Number.isFinite(m)&&Number.isFinite(_)?m<-90||m>90||_<-180||_>180||0===m&&0===_?null:[m,_]:null}_mapContacts(){return this._allMapSourceContacts().filter(e=>null!==this._contactCoords(e))}_contactId(e){return e.public_key||e.pubkey_prefix}_styleMapMarker(e,t){e.style.width="30px",e.style.height="30px",e.style.borderRadius="50%",e.style.display="grid",e.style.placeItems="center",e.style.fontSize="10px",e.style.fontWeight="700",e.style.background=t?"var(--warning-color, #ff9800)":"var(--primary-color, #03a9f4)",e.style.color="white",e.style.border=t?"3px solid white":"2px solid white",e.style.boxShadow=t?"0 0 0 3px rgba(255,152,0,.35), 0 2px 7px rgba(0,0,0,.35)":"0 1px 5px rgba(0,0,0,.35)"}_mapEntities(){return this._mapContacts().map(e=>e.map_entity_id).filter(e=>{var t;return Boolean(e&&(null===(t=this.hass)||void 0===t||null===(t=t.states)||void 0===t?void 0:t[e]))})}_mapLocations(){const e=new Set,t=this._mapContacts().filter(e=>{var t;const i=e.map_entity_id;return!i||!(null!==(t=this.hass)&&void 0!==t&&null!==(t=t.states)&&void 0!==t&&t[i])}).map(t=>{const i=this._contactId(t),s=this._contactCoords(t);e.add(i);let a=this._mapMarkerElements.get(i);return a||(a=document.createElement("div"),this._mapMarkerElements.set(i,a)),this._styleMapMarker(a,i===this._mapFocusId),a.textContent=(t.adv_name||t.pubkey_prefix||"?").slice(0,2).toUpperCase(),{id:i,location:s,element:a,elementSize:[36,36],title:t.adv_name||t.pubkey_prefix,locationEditable:!1,activatable:!0}});for(const t of this._mapMarkerElements.keys())e.has(t)||this._mapMarkerElements.delete(t);return t}_onMapNodeClicked(e){const t=this._mapContacts().find(t=>{var i;return this._contactId(t)===(null===(i=e.detail)||void 0===i?void 0:i.id)});t&&this._selectNode(t,!1)}_selectNode(e,t=!0){this._mapFocusId=this._contactId(e);const i=this._contactCoords(e);this.requestUpdate(),this.updateComplete.then(()=>{if(i){var e;const t=this.renderRoot.querySelector("ha-map");null==t||null===(e=t.setView)||void 0===e||e.call(t,i,15)}}),t&&(this._selectedNode=e,this._nodeDetailDialogOpen=!0)}_renderMapPane(){const e=this._mapContacts(),t=this._allMapSourceContacts().length;return this._mapReady?e.length?Zn(Kt||(Kt=on`
      <div class="map-count">${0} nós com localização - CENTRAR</div>
      <ha-map
        .entities=${0}
        .editableLocations=${0}
        .autoFit=${0}
        .clusterMarkers=${0}
        .scaleRuler=${0}
        @editable-location-clicked=${0}>
      </ha-map>
    `),e.length,this._mapEntities(),this._mapLocations(),!0,!0,!0,this._onMapNodeClicked):Zn(Yt||(Yt=on`<div class="map-note">0 nós com localização · ${0} nós no total.<br>Os nós sem GPS anunciado permanecem na lista à esquerda.</div>`),t):Zn(Gt||(Gt=on`<div class="map-note">A carregar o mapa do Home Assistant…</div>`))}_renderL1Button(e,t){const i=this._l1Counts[e],s=this._primaryFilter===e,a=`l1-btn ${e} ${s?"active":""}`;return Zn(jt||(jt=on`
      <button
        class=${0}
        @click=${0}>
        ${0} <span class="l1-count">(${0})</span>
      </button>
    `),a,()=>this._setPrimaryFilter(e),t,i)}_renderL2Buttons(){return["clients","repeaters","room_servers","sensors"].filter(e=>this._typeCounts[e]>0).map(e=>{const t=this._typeFilter===e;return Zn(Wt||(Wt=on`
          <button
            class=${0}
            @click=${0}>
            ${0} <span class="l2-count">(${0})</span>
          </button>
        `),`l2-btn ${e} ${t?"active":""}`,()=>this._setTypeFilter(e),Al[e],this._typeCounts[e])})}_setPrimaryFilter(e){this._primaryFilter!==e&&(this._primaryFilter=e,this._typeFilter=null,this._displayedContacts=[],this._totalCount=0,this._loadPage(!0))}_setActivityFilter(e){this._activityFilter=this._activityFilter===e?"all":e,this._displayedContacts=[],this._totalCount=0,this._loadPage(!0)}_setTypeFilter(e){this._typeFilter===e?this._typeFilter=null:this._typeFilter=e,this._displayedContacts=[],this._totalCount=0,this._loadPage(!0)}_onSearchInput(e){this._searchQuery=e.target.value,this._searchTimer&&clearTimeout(this._searchTimer),this._searchTimer=setTimeout(()=>this._loadPage(!0),300)}_getSearchPlaceholder(){const e=this._primaryFilter,t=this._typeFilter?Al[this._typeFilter].toLowerCase():"nodes";return"all"===e?"Search name, public key or tag...":`Search ${e} ${t}...`}async _loadPage(e=!1){if(this.hass){this._loading=!0;try{var t;const i=e?0:this._displayedContacts.length,s=this._typeFilter?gl[this._typeFilter]:void 0,a=this._searchQuery.trim()||void 0,r=await async function(e,t="all",i={}){try{var s,a;const r={type:"hivefw_integration/get_contacts_paginated",category:t,limit:null!==(s=i.limit)&&void 0!==s?s:50,offset:null!==(a=i.offset)&&void 0!==a?a:0};return void 0!==i.nodeType&&(r.node_type=i.nodeType),i.search&&(r.search=i.search),i.activity&&"all"!==i.activity&&(r.activity=i.activity),i.entryId&&(r.entry_id=i.entryId),i.sortBy&&(r.sort_by=i.sortBy),await e.callWS(r)}catch(e){return{contacts:[],total:0,counts:{clients:0,repeaters:0,room_servers:0,sensors:0}}}}(this.hass,this._primaryFilter,{nodeType:s,search:a,activity:this._activityFilter,limit:50,offset:i,entryId:null===(t=this.config)||void 0===t?void 0:t.entry_id,sortBy:this._sortBy});this._displayedContacts=e?r.contacts:[...this._displayedContacts,...r.contacts],this._totalCount=r.total,this._typeCounts=r.counts}catch(e){console.error("Failed to load contacts:",e)}finally{this._loading=!1}}}async _loadCounts(){if(this.hass)try{var e;this._l1Counts=await async function(e,t){try{const i={type:"hivefw_integration/get_node_counts"};return t&&(i.entry_id=t),await e.callWS(i)}catch(e){return{all:0,added:0,discovered:0}}}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id)}catch(e){console.error("Failed to load node counts:",e)}}async _clearStaleContacts(){var e;if(!this.hass)return;const t=prompt("Remove discovered contacts older than how many days?","30");if(!t)return;const i=parseInt(t,10);isNaN(i)||i<1||i>365||(await async function(e,t,i){try{const s={type:"hivefw_integration/clear_discovered_contacts"};return void 0!==t&&(s.days_threshold=t),i&&(s.entry_id=i),await e.callWS(s)}catch(e){return{removed:0}}}(this.hass,i,null===(e=this.config)||void 0===e?void 0:e.entry_id)).removed>0&&(this._loadPage(!0),this._loadCounts(),this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0})))}_exportPath(e){var t,i,s,a;const r=e.advert_path_list;if(Array.isArray(r))return r.map(e=>String(null!=e?e:"").trim().replace(/^0x/i,"").toLowerCase()).filter(Boolean).join(",");if("string"==typeof r&&r.includes(","))return r.split(",").map(e=>e.trim().replace(/^0x/i,"").toLowerCase()).filter(Boolean).join(",");const n=String(null!==(t=null!==(i=null!==(s=e.out_path)&&void 0!==s?s:e.path)&&void 0!==i?i:r)&&void 0!==t?t:"").replace(/[^0-9a-f]/gi,"").toLowerCase(),o=Number(e.out_path_len);if(!n||!Number.isInteger(o)||o<=0)return"";const l=Number(null!==(a=e.out_path_hash_mode)&&void 0!==a?a:e.path_hash_mode);let c=Number.isInteger(l)&&l>=0&&l<=2?2*(l+1):0;if(n.length%o===0){const e=n.length/o;![2,4,6].includes(e)||c&&c*o===n.length||(c=e)}if(!c||c*o!==n.length)return"";const d=[];for(let e=0;e<o;e++)d.push(n.slice(e*c,(e+1)*c));return d.join(",")}_exportCoord(e){const t=Number(e);return Number.isFinite(t)&&0!==t?String(t):"0.0"}async _exportContacts(){var e;if(!this.hass)return;const t=await Mo(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),i=new Map;for(const e of t){var s,a,r,n,o,l,c,d,h,p;const t=String(e.public_key||"").trim().toLowerCase();if(!/^[0-9a-f]{64}$/.test(t))continue;const u={type:Number(null!==(s=e.type)&&void 0!==s?s:0)||0,name:String(null!==(a=null!==(r=e.adv_name)&&void 0!==r?r:e.name)&&void 0!==a?a:""),public_key:t,flags:Number(null!==(n=e.flags)&&void 0!==n?n:0)||0,latitude:this._exportCoord(null!==(o=e.adv_lat)&&void 0!==o?o:e.latitude),longitude:this._exportCoord(null!==(l=e.adv_lon)&&void 0!==l?l:e.longitude),last_advert:Math.trunc(Number(null!==(c=e.last_advert)&&void 0!==c?c:0))||0,last_modified:Math.trunc(Number(null!==(d=null!==(h=e.lastmod)&&void 0!==h?h:e.last_modified)&&void 0!==d?d:0))||0,advert_path_list:this._exportPath(e)},g=i.get(t);(!g||Number(u.last_modified)>=Number(null!==(p=g.last_modified)&&void 0!==p?p:0))&&i.set(t,u)}const u=[...i.values()].sort((e,t)=>{var i,s;return Number(null!==(i=t.last_modified)&&void 0!==i?i:0)-Number(null!==(s=e.last_modified)&&void 0!==s?s:0)}),g=new Blob([JSON.stringify({discovered_contacts:u},null,2)],{type:"application/json;charset=utf-8"}),A=URL.createObjectURL(g),f=document.createElement("a");f.href=A,f.download="hivefw_discovered_contacts.json",document.body.appendChild(f),f.click(),f.remove(),window.setTimeout(()=>URL.revokeObjectURL(A),1e3)}_pickImportFile(){const e=this.renderRoot.querySelector("#contact-import-file");e&&(e.value="",e.click())}_syncAll(){this._loadPage(!0),this._loadCounts(),this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0}))}_renderContactsContent(){return this._loading&&0===this._displayedContacts.length?Zn(Jt||(Jt=on`
        <div class="empty-state">
          <div class="empty-text">Loading...</div>
        </div>
      `)):0===this._displayedContacts.length?this._renderEmptyState():Zn(qt||(qt=on`
      <div class="nodes-grid">
        ${0}
      </div>
      ${0}
    `),this._displayedContacts.map(e=>Zn(Vt||(Vt=on`
          <div @click=${0}>
            <meshcore-contact-card
              .contact=${0}
              .selected=${0}>
            </meshcore-contact-card>
          </div>
        `),()=>this._selectNode(e,!1),e,this._contactId(e)===this._mapFocusId)),this._displayedContacts.length<this._totalCount?Zn(Zt||(Zt=on`
        <div class="load-more">
          <button ?disabled=${0} @click=${0}>
            ${0}
          </button>
        </div>
      `),this._loading,()=>this._loadPage(),this._loading?"Loading...":`Load More (${this._displayedContacts.length} of ${this._totalCount})`):to)}_renderEmptyState(){const e=this._primaryFilter,t=this._typeFilter;let i=Zn(Xt||(Xt=on`<svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`)),s="No nodes found",a="";return this._searchQuery?(s="No matching nodes",a=`No results for "${this._searchQuery}"`):"added"===e?(s="No added contacts",a=t?`No added ${Al[t].toLowerCase()}`:"Add discovered contacts to see them here"):"discovered"===e?(s="No discovered nodes",a=t?`No discovered ${Al[t].toLowerCase()}`:"Nodes seen on the mesh will appear here"):"all"===e&&(s="No nodes",a="No contacts or discovered nodes yet"),Zn(ei||(ei=on`
      <div class="empty-state">
        <div class="empty-icon">${0}</div>
        <div class="empty-text">${0}</div>
        ${0}
      </div>
    `),i,s,a?Zn(ti||(ti=on`<div class="empty-subtext">${0}</div>`),a):to)}_openNodeDetail(e){this._selectNode(e,!0)}_dispatchNodeAction(e){"add-contact"!==e&&"remove-contact"!==e||(this._pendingAction=e),this.dispatchEvent(new CustomEvent("node-action",{detail:{action:e,node:this._selectedNode},bubbles:!0,composed:!0})),"message"!==e&&"delete"!==e||(this._nodeDetailDialogOpen=!1)}clearPendingAction(){this._pendingAction=null}async refreshAfterMutation(e){if(await Promise.all([this._loadPage(!0),this._loadCounts()]),this._nodeDetailDialogOpen&&this._selectedNode&&e){const t=this._displayedContacts.find(t=>!(!t.public_key||t.public_key!==e)||!(!t.pubkey_prefix||!e.startsWith(t.pubkey_prefix)));t?this._selectedNode={...t}:this._nodeDetailDialogOpen=!1}}};function ml(e){var t,i,s;const a=e.entity_id,r=null!==(t=null!==(i=null!==(s=e.original_device_class)&&void 0!==s?s:e.device_class)&&void 0!==i?i:e._stateDeviceClass)&&void 0!==t?t:null;if(a.startsWith("binary_sensor.hivefw_")&&/_err_(pool_full|cad_timeout|rx_timeout)_/.test(a)){const e=a.includes("err_pool_full")?"Radio Fault: Packet Pool":a.includes("err_cad_timeout")?"Radio Fault: CAD Timeout":"Radio Fault: RX-Start Timeout";return{entity_id:a,label:e,icon:"alert",colorScheme:"neutral",sortOrder:13,booleanProblem:!0}}if(a.startsWith("binary_sensor.hivefw_")&&"connectivity"===r)return null;if(a.startsWith("binary_sensor.hivefw_"))return null;if(a.includes("_rate_"))return null;if(a.includes("full_evts"))return null;if(a.includes("node_status")||a.includes("companion_prefix")||a.includes("request_rate")&&!a.includes("request_rate_limiter")||a.includes("delivery")||a.includes("path_")||a.includes("neighbor_"))return null;if("battery"===r||a.includes("battery_percentage"))return{entity_id:a,label:"Battery",icon:"battery",colorScheme:"battery",sortOrder:1,metricKey:"battery_pct"};if("voltage"===r||a.includes("battery_voltage")||a.includes("_voltage")||a.includes("cv_voltage"))return{entity_id:a,label:"Voltage",icon:"power",colorScheme:"neutral",sortOrder:2};if("duration"===r||a.includes("uptime"))return{entity_id:a,label:"Uptime",icon:"clock",colorScheme:"neutral",sortOrder:3,metricKey:"uptime_hours"};if("signal_strength"===r||a.includes("tx_power"))return{entity_id:a,label:"TX Power",icon:"power",colorScheme:"neutral",sortOrder:6};if("temperature"===r||a.includes("_temperature"))return{entity_id:a,label:"Temperature",icon:"thermometer",colorScheme:"neutral",sortOrder:7,metricKey:"temperature",staticTooltip:"Ambient temperature reported by the node. Informational; no threshold band -- expected ranges depend heavily on where the device is mounted."};if(a.includes("rx_airtime_utilization"))return{entity_id:a,label:"RX Airtime Util",icon:"chart",colorScheme:"neutral",sortOrder:10,metricKey:"rx_airtime_util"};if(a.includes("airtime_utilization"))return{entity_id:a,label:"TX Airtime Util",icon:"chart",colorScheme:"neutral",sortOrder:10,metricKey:"tx_airtime_util"};if(a.includes("rx_airtime"))return{entity_id:a,label:"RX Airtime",icon:"chart",colorScheme:"neutral",sortOrder:9};if(a.includes("airtime"))return{entity_id:a,label:"Airtime",icon:"chart",colorScheme:"neutral",sortOrder:9};if(a.includes("snr")&&!a.includes("neighbor"))return{entity_id:a,label:"SNR",icon:"signal",colorScheme:"signal",sortOrder:4,metricKey:"snr"};if(a.includes("rssi"))return{entity_id:a,label:"RSSI",icon:"signal",colorScheme:"signal",sortOrder:5,metricKey:"rssi"};if(a.includes("noise_floor"))return{entity_id:a,label:"Noise Floor",icon:"signal",colorScheme:"signal",sortOrder:11,metricKey:"noise_floor"};if(a.includes("tx_queue_len"))return{entity_id:a,label:"TX Queue Length",icon:"counter",colorScheme:"neutral",sortOrder:12,metricKey:"tx_queue_len"};if(a.includes("contact_count"))return{entity_id:a,label:"Contacts",icon:"counter",colorScheme:"neutral",sortOrder:8};if(a.includes("discovered_contacts"))return{entity_id:a,label:"Discovered Contacts",icon:"counter",colorScheme:"neutral",sortOrder:8};if(a.includes("request_rate_limiter"))return{entity_id:a,label:"Request Tokens",icon:"counter",colorScheme:"neutral",sortOrder:13};if(a.includes("channel_util"))return{entity_id:a,label:"Channel Util",icon:"chart",colorScheme:"neutral",sortOrder:10,metricKey:"channel_util"};if(a.startsWith("sensor.hivefw_")){const t=e.original_name||e.name||a.split(".")[1];return{entity_id:a,label:t,icon:"",colorScheme:"neutral",sortOrder:99}}return null}async function _l(e){const[t,i]=await Promise.all([e.callWS({type:"config/device_registry/list"}),e.callWS({type:"config/entity_registry/list"})]),s={};for(const e of t)if(e.identifiers)for(const[t,i]of e.identifiers)"hivefw_integration"===t&&(s[i]=e.id);const a={};for(const t of i){var r;if(!t.device_id||t.disabled_by)continue;if(!t.entity_id.startsWith("sensor.hivefw_")&&!t.entity_id.startsWith("binary_sensor.hivefw_"))continue;const i=null===(r=e.states)||void 0===r||null===(r=r[t.entity_id])||void 0===r||null===(r=r.attributes)||void 0===r?void 0:r.device_class,s=ml(i?{...t,_stateDeviceClass:i}:t);s&&(a[t.device_id]||(a[t.device_id]=[]),a[t.device_id].push(s))}for(const e of Object.keys(a))a[e].sort((e,t)=>e.sortOrder-t.sortOrder);return{meshcoreDeviceMap:s,deviceEntities:a}}fl.styles=gn(ii||(ii=on`
    :host {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .nodes-layout {
      /* Give the node list a little more room; Activity stays compact and the map owns the remainder. */
      --nodes-list-width: 380px;
      --nodes-activity-width: 340px;
      display: grid;
      grid-template-columns: var(--nodes-list-width) minmax(0, 1fr) var(--nodes-activity-width);
      grid-template-rows: auto minmax(0, 1fr);
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }

    .nodes-header {
      grid-column: 1;
      grid-row: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px;
      background: var(--card-background-color, #fff);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      flex-shrink: 0;
    }

    .nodes-map-pane {
      grid-column: 2;
      grid-row: 1 / 3;
      position: relative;
      min-width: 0;
      min-height: 0;
      overflow: hidden;
      background: var(--card-background-color, #fff);
      border-left: 1px solid var(--divider-color, #e0e0e0);
    }

    .nodes-map-pane ha-map {
      display: block;
      width: 100%;
      height: 100%;
      min-height: 420px;
    }

    .nodes-transfer-pane {
      grid-column: 3;
      grid-row: 1;
      min-width: 0;
      padding: 12px 12px 0;
      box-sizing: border-box;
      background: var(--card-background-color, #fff);
      border-left: 1px solid var(--divider-color, #e0e0e0);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .nodes-activity-pane {
      grid-column: 3;
      grid-row: 2;
      min-width: 0;
      margin-top: -28px;
      min-height: 0;
      overflow: hidden;
      background: var(--card-background-color, #fff);
      border-left: 1px solid var(--divider-color, #e0e0e0);
      display: flex;
      flex-direction: column;
    }

    .map-note {
      display:flex;
      align-items:center;
      justify-content:center;
      height:100%;
      min-height:320px;
      color:var(--secondary-text-color);
      text-align:center;
      padding:24px;
      box-sizing:border-box;
    }

    .map-count {
      position:absolute;
      top:10px;
      right:10px;
      z-index:30;
      padding:6px 9px;
      border-radius:14px;
      background:color-mix(in srgb, var(--card-background-color) 90%, transparent);
      color:var(--primary-text-color);
      border:1px solid var(--divider-color);
      font-size:11px;
      font-weight:600;
      box-shadow:0 1px 4px rgba(0,0,0,.18);
      pointer-events:none;
    }

    .map-selection {
      position:absolute;
      left:10px;
      bottom:10px;
      z-index:30;
      max-width:calc(100% - 20px);
      padding:6px 9px;
      border-radius:7px;
      background:color-mix(in srgb, var(--card-background-color) 92%, transparent);
      color:var(--primary-text-color);
      border:1px solid var(--divider-color);
      font-size:11px;
      box-shadow:0 1px 4px rgba(0,0,0,.18);
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
      pointer-events:none;
    }

        /* ─── Level 1 filter buttons ────────────────────────────────────── */

    .l1-filters {
      display: flex;
      gap: 6px;
    }

    .l1-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 8px 14px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 20px;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      border-left: 3px solid transparent;
    }

    .l1-btn:hover {
      background: rgba(0, 0, 0, 0.03);
      color: var(--primary-text-color);
    }

    /* Inactive left-edge accent — same alpha as the active border
       below, so the active/inactive transition doesn't visibly jump
       in saturation. */
    .l1-btn.added,
    .l1-btn.all         { border-left-color: rgba(3, 169, 244, 0.5); }
    .l1-btn.discovered  { border-left-color: rgba(76, 175, 80, 0.5); }

    /* Active state: translucent category background + saturated text,
       matching the per-card category-badge treatment so the filter
       reads as the same tag concept. Normalize border-left-width back
       to 1px so the filled active button isn't visibly chunkier on the
       left than the other three sides (the 3px accent only makes
       sense as an inactive-state visual cue). */
    .l1-btn.active {
      border-left-width: 1px;
    }
    .l1-btn.active.all,
    .l1-btn.active.added {
      background: rgba(3, 169, 244, 0.15);
      color: #0277bd;
      border-color: rgba(3, 169, 244, 0.5);
      border-left-color: rgba(3, 169, 244, 0.5);
    }
    .l1-btn.active.discovered {
      background: rgba(76, 175, 80, 0.15);
      color: #2e7d32;
      border-color: rgba(76, 175, 80, 0.5);
      border-left-color: rgba(76, 175, 80, 0.5);
    }

    .l1-count {
      font-size: 11px;
      opacity: 0.8;
    }

    /* ─── Level 2 filter buttons ────────────────────────────────────── */

    .l2-bar {
      display: flex;
      gap: 6px;
      align-items: center;
    }

    .l2-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px 10px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 14px;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .l2-btn:hover {
      background: rgba(0, 0, 0, 0.03);
      color: var(--primary-text-color);
    }

    /* Inactive L2 left-edge accent — same alpha as the active border
       below for a clean active/inactive transition. */
    .l2-btn.clients      { border-left: 2px solid rgba(76, 175, 80, 0.5); }
    .l2-btn.repeaters    { border-left: 2px solid rgba(255, 152, 0, 0.5); }
    .l2-btn.room_servers { border-left: 2px solid rgba(156, 39, 176, 0.5); }
    .l2-btn.sensors      { border-left: 2px solid rgba(96, 125, 139, 0.5); }

    /* When active, normalize the left edge back to 1px so the filled
       button doesn't have a chunkier left border than its other edges. */
    .l2-btn.active {
      border-left-width: 1px;
    }

    /* Active L2: same translucent treatment as L1 active and the
       per-card avatar/category-badge. */
    .l2-btn.active.clients {
      background: rgba(76, 175, 80, 0.15);
      color: #388e3c;
      border-color: rgba(76, 175, 80, 0.5);
    }
    .l2-btn.active.repeaters {
      background: rgba(255, 152, 0, 0.15);
      color: #f57c00;
      border-color: rgba(255, 152, 0, 0.5);
    }
    .l2-btn.active.room_servers {
      background: rgba(156, 39, 176, 0.15);
      color: #7b1fa2;
      border-color: rgba(156, 39, 176, 0.5);
    }
    .l2-btn.active.sensors {
      background: rgba(96, 125, 139, 0.15);
      color: #455a64;
      border-color: rgba(96, 125, 139, 0.5);
    }

    .l2-count {
      font-size: 10px;
      opacity: 0.8;
    }

    .l2-spacer {
      flex: 1;
    }

    /* ─── Search bar ────────────────────────────────────────────────── */

    .search-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      background: var(--primary-background-color, #fafafa);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      padding: 6px 10px;
    }

    .search-icon {
      flex-shrink: 0;
      color: var(--secondary-text-color, #727272);
      display: flex;
    }

    .search-bar input {
      flex: 1;
      border: none;
      background: transparent;
      font-size: 13px;
      color: var(--primary-text-color);
      outline: none;
    }

    .clear-search {
      border: none;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color, #727272);
      font-size: 16px;
      padding: 0 2px;
    }

    .header-actions {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto auto;
      align-items: center;
      gap: 8px;
      width: 100%;
    }

    .header-actions .search-bar {
      grid-column: 1 / -1;
      width: 100%;
      max-width: none;
      min-width: 0;
      box-sizing: border-box;
    }

    .header-actions .sort-select {
      width: 100%;
      min-width: 0;
    }

    .export-btn {
      margin-left: auto;
      white-space: nowrap;
    }

    .sync-btn {
      padding: 6px 12px;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      background: transparent;
      color: var(--secondary-text-color, #727272);
      font-size: 12px;
      cursor: pointer;
      transition: all 0.15s;
    }
    .sync-btn:hover {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      border-color: var(--primary-color, #03a9f4);
    }

    .sort-select {
      padding: 4px 8px; border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px; background: var(--card-background-color, #fff);
      color: var(--primary-text-color); font-size: 11px; cursor: pointer;
      box-sizing: border-box;
      height: 28px;
      min-height: 28px;
      line-height: normal;
      appearance: menulist;
      -webkit-appearance: menulist;
    }

    /* ─── Content area ──────────────────────────────────────────────── */

    .content-area {
      grid-column: 1;
      grid-row: 2;
      min-width: 0;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 12px;
      background: var(--primary-background-color, #fafafa);
    }

    .content-area::-webkit-scrollbar { width: 6px; }
    .content-area::-webkit-scrollbar-track { background: transparent; }
    .content-area::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb, var(--scrollbar-thumb-color, #c1c1c1));
      border-radius: 3px;
    }

    .nodes-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8px;
    }

    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--secondary-text-color, #727272);
      text-align: center;
    }
    .empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.5; }
    .empty-text { font-size: 16px; margin-bottom: 8px; }
    .empty-subtext { font-size: 13px; opacity: 0.7; max-width: 300px; }

    .clear-btn {
      padding: 4px 10px; border: 1px solid rgba(219, 68, 55, 0.3);
      border-radius: 4px; background: transparent;
      color: var(--error-color, #db4437); font-size: 11px;
      font-weight: 500; cursor: pointer; transition: all 0.15s;
    }
    .clear-btn:hover {
      background: var(--error-color, #db4437); color: #fff;
      border-color: var(--error-color, #db4437);
    }

    .confirm-bar {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 12px; background: rgba(219, 68, 55, 0.08);
      border: 1px solid rgba(219, 68, 55, 0.2); border-radius: 6px;
      margin-bottom: 12px; font-size: 12px;
    }
    .confirm-bar button {
      padding: 4px 10px; border: none; border-radius: 4px;
      font-size: 11px; font-weight: 600; cursor: pointer;
    }
    .confirm-bar .yes { background: var(--error-color, #db4437); color: #fff; }
    .confirm-bar .no { background: var(--divider-color, #e0e0e0); color: var(--primary-text-color); }

    .category-badge {
      font-size: 10px; font-weight: 500; padding: 2px 8px;
      border-radius: 10px; white-space: nowrap; flex-shrink: 0; align-self: center;
    }

    .load-more {
      display: flex; justify-content: center; padding: 12px;
    }
    .load-more button {
      padding: 8px 20px; border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px; background: transparent;
      color: var(--primary-text-color); font-size: 12px;
      cursor: pointer; transition: all 0.15s;
    }
    .load-more button:hover {
      background: var(--primary-color, #03a9f4); color: #fff;
      border-color: var(--primary-color, #03a9f4);
    }

    /* ─── Narrow overrides ──────────────────────────────────────────── */

    :host([narrow]) .l1-filters { gap: 4px; flex-wrap: wrap; }
    :host([narrow]) .l1-btn { font-size: 11px; padding: 5px 10px; }
    :host([narrow]) .l2-btn { font-size: 11px; padding: 5px 10px; }
    :host([narrow]) .nodes-grid { grid-template-columns: 1fr; }
    :host([narrow]) .nodes-layout {
      --nodes-list-width: 100%;
      --nodes-activity-width: 100%;
      grid-template-columns: 1fr;
      grid-template-rows: auto minmax(280px, 34%) minmax(320px, 42%) auto minmax(260px, 24%);
      overflow-y: auto;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      overscroll-behavior-y: contain;
    }
    :host([narrow]) .nodes-header {
      grid-column: 1;
      grid-row: 1;
    }
    :host([narrow]) .content-area {
      grid-column: 1;
      grid-row: 2;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }
    :host([narrow]) .nodes-map-pane {
      grid-column: 1;
      grid-row: 3;
      border-left: none;
    }
    :host([narrow]) .nodes-transfer-pane {
      grid-column: 1;
      grid-row: 4;
      border-left: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
    :host([narrow]) .nodes-activity-pane {
      grid-column: 1;
      grid-row: 5;
      border-left: none;
      border-top: 1px solid var(--divider-color, #e0e0e0);
    }
  `)),ln([yo({type:Array})],fl.prototype,"contacts",void 0),ln([yo({type:Array})],fl.prototype,"channels",void 0),ln([yo({type:Boolean})],fl.prototype,"narrow",void 0),ln([yo({type:Object})],fl.prototype,"hass",void 0),ln([yo({type:Object})],fl.prototype,"config",void 0),ln([xo()],fl.prototype,"_viewportNarrow",void 0),ln([xo()],fl.prototype,"_mapReady",void 0),ln([xo()],fl.prototype,"_mapFocusId",void 0),ln([xo()],fl.prototype,"_primaryFilter",void 0),ln([xo()],fl.prototype,"_typeFilter",void 0),ln([xo()],fl.prototype,"_searchQuery",void 0),ln([xo()],fl.prototype,"_activityFilter",void 0),ln([xo()],fl.prototype,"_displayedContacts",void 0),ln([xo()],fl.prototype,"_totalCount",void 0),ln([xo()],fl.prototype,"_typeCounts",void 0),ln([xo()],fl.prototype,"_l1Counts",void 0),ln([xo()],fl.prototype,"_loading",void 0),ln([xo()],fl.prototype,"_selectedNode",void 0),ln([xo()],fl.prototype,"_nodeDetailDialogOpen",void 0),ln([xo()],fl.prototype,"_pendingAction",void 0),ln([xo()],fl.prototype,"_sortBy",void 0),fl=ln([vo("meshcore-nodes-page")],fl);const vl={battery_pct:{displayMin:0,displayMax:100,direction:"higher_better",classify:e=>e<20?"bad":e<50?"warn":"good",tooltip:"Green ≥ 50%, Yellow 20–50%, Red < 20% (critical < 10%). Home Assistant low-battery convention.",source:"https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664"},rssi:{displayMin:-130,displayMax:-30,direction:"higher_better",classify:e=>e<-115?"bad":e<-100?"warn":"good",tooltip:"Green > −100 dBm, Yellow −100 to −115 dBm, Red < −115 dBm. Lower (more negative) RSSI means a weaker received signal.",source:"https://www.thethingsnetwork.org/docs/lorawan/rssi-and-snr/"},snr:{displayMin:-20,displayMax:20,direction:"higher_better",classify:e=>e<-7?"bad":e<0?"warn":"good",tooltip:"Green > 0 dB, Yellow −7 to 0 dB, Red < −7 dB. Demodulation floor is spreading-factor dependent (Semtech AN1200.13).",source:"https://www.openhacks.com/uploadsproductos/loradesignguide_std.pdf"},noise_floor:{displayMin:-130,displayMax:-90,direction:"lower_better",classify:e=>e>-105?"bad":e>-115?"warn":"good",tooltip:"Green < −115 dBm, Yellow −115 to −105 dBm, Red > −105 dBm. Above −105 dBm typically indicates man-made RF interference, not thermal noise.",source:"https://www.openhacks.com/uploadsproductos/loradesignguide_std.pdf"},tx_airtime_util:{displayMin:0,displayMax:20,direction:"lower_better",classify:e=>e>10?"bad":e>2?"warn":"good",tooltip:"Green < 2%, Yellow 2–10%, Red > 10%. EU868 sub-band 1% / general 10% duty-cycle ceiling (ETSI EN 300 220-2; eCFR 47 CFR 15.247).",source:"https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.03.01_60/en_30022002v030301p.pdf"},rx_airtime_util:{displayMin:0,displayMax:100,direction:"lower_better",classify:e=>e>50?"bad":e>25?"warn":"good",tooltip:"Green < 25%, Yellow 25–50%, Red > 50%. High RX utilisation usually means heavy mesh traffic or environmental interference saturating the receiver."},channel_util:{displayMin:0,displayMax:100,direction:"lower_better",classify:e=>e>50?"bad":e>25?"warn":"good",tooltip:"Green < 25%, Yellow 25–50%, Red > 50%. Channel utilisation aggregates all activity on the radio channel."},hop_count:{displayMin:0,displayMax:32,direction:"lower_better",classify:e=>e>=16?"bad":e>=7?"warn":"good",tooltip:"Green ≤ 6, Yellow 7–15, Red ≥ 16. MeshCore allows up to 64 hops; community-recommended meshes run well under 32. Each hop adds airtime cost and latency.",source:"https://nodakmesh.org/blog/meshcore-path-hash-explained"},uptime_hours:{displayMin:0,displayMax:168,direction:"higher_better",classify:e=>e<1?"bad":e<24?"warn":"good",tooltip:"Green > 24 h, Yellow 1–24 h, Red < 1 h. Very recent reboot suggests a watchdog reset or brownout."},last_seen_hours:{displayMin:0,displayMax:6,direction:"lower_better",classify:e=>e>4?"bad":e>2?"warn":"good",tooltip:"Green < 2 h, Yellow 2–4 h, Red > 4 h. Should be tuned to the node’s advertising interval; nodes that advertise hourly should appear far more often than nodes that advertise every 6 hours."},request_success_rate:{displayMin:0,displayMax:100,direction:"higher_better",classify:e=>e<70?"bad":e<90?"warn":"good",tooltip:'Green > 90%, Yellow 70–90%, Red < 70%. Caller is responsible for the min-sample floor — bars should render with band="info" until at least 50 attempts have accumulated.'},duplicate_ratio:{displayMin:0,displayMax:100,direction:"lower_better",classify:()=>"info",tooltip:""},tx_queue_len:{displayMin:0,displayMax:30,direction:"lower_better",classify:e=>e>10?"bad":e>5?"warn":"good",tooltip:"Number of messages queued for transmission. Healthy nodes drain the queue quickly. Sustained backlog (> 10) indicates channel saturation or a stuck transmitter."},temperature:{displayMin:-20,displayMax:140,direction:"higher_better",classify:e=>e<0||e>125?"bad":"good",tooltip:"Red below 0°F (≈ −18°C) or above 125°F (≈ 52°C); green otherwise. Extreme ambient temperatures risk damage to the radio, battery, or enclosure."}};function wl(e,t){const i=t.displayMax-t.displayMin;if(i<=0)return 0;const s=(e-t.displayMin)/i,a="higher_better"===t.direction?s:1-s;return Math.max(0,Math.min(100,100*a))}function bl(e,t){if(!Number.isFinite(t))return{band:"info",fillPct:0,tooltip:""};const i=vl[e];return i?{band:i.classify(t),fillPct:wl(t,i),tooltip:i.tooltip,source:i.source}:{band:"info",fillPct:0,tooltip:""}}let yl=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const xl=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends yl{constructor(e){if(super(e),this._timer=null,this._startX=0,this._startY=0,this._attached=!1,this._callback=null,this._element=null,this._onPointerDown=e=>this._handleDown(e),this._onPointerUp=()=>this._cancelTimer(),this._onPointerMove=e=>this._handleMove(e),this._onContextMenu=e=>{null!==this._timer&&e.preventDefault()},6!==e.type)throw new Error("longPress directive must be used on an element")}render(e){}update(e,[t]){if(this._callback=t,!this._attached){this._element=e.element;const t=this._element;t.addEventListener("pointerdown",this._onPointerDown),t.addEventListener("pointerup",this._onPointerUp),t.addEventListener("pointercancel",this._onPointerUp),t.addEventListener("pointermove",this._onPointerMove),t.addEventListener("contextmenu",this._onContextMenu),this._attached=!0}return this.render(t)}_handleDown(e){0===e.button&&(this._startX=e.clientX,this._startY=e.clientY,this._cancelTimer(),this._timer=setTimeout(()=>{var e;this._timer=null,null===(e=this._callback)||void 0===e||e.call(this)},500))}_handleMove(e){if(null===this._timer)return;const t=e.clientX-this._startX,i=e.clientY-this._startY;t*t+i*i>100&&this._cancelTimer()}_cancelTimer(){null!==this._timer&&(clearTimeout(this._timer),this._timer=null)}});let El=class extends mo{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.band="info"}render(){const e=this.max-this.min;let t=0;return Number.isFinite(this.value)&&e>0&&(t=(this.value-this.min)/e*100,t=Math.max(0,Math.min(100,t))),Zn(si||(si=on`
      <div class="stat-bar"
           role="progressbar"
           aria-valuenow="${0}"
           aria-valuemin="${0}"
           aria-valuemax="${0}">
        <div class="stat-bar-fill ${0}"
             style="width: ${0}%"></div>
      </div>
    `),this.value,this.min,this.max,this.band,t)}};El.styles=gn(ai||(ai=on`
    :host {
      display: block;
      width: 100%;
    }
    .stat-bar {
      position: relative;
      height: 8px;
      width: 100%;
      background: var(--divider-color, #e0e0e0);
      border-radius: 4px;
      overflow: hidden;
    }
    .stat-bar-fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.4s ease;
    }
    .stat-bar-fill.good { background: var(--good, #4caf50); }
    .stat-bar-fill.warn { background: var(--warn, #ff9800); }
    .stat-bar-fill.bad  { background: var(--bad,  #f44336); }
    .stat-bar-fill.info { background: var(--info, #2196f3); }
  `)),ln([yo({type:Number})],El.prototype,"value",void 0),ln([yo({type:Number})],El.prototype,"min",void 0),ln([yo({type:Number})],El.prototype,"max",void 0),ln([yo({type:String})],El.prototype,"band",void 0),El=ln([vo("meshcore-stat-bar")],El);let Cl=class extends mo{constructor(){super(...arguments),this.segments=[],this.legend="below"}_denom(){if(void 0!==this.total&&this.total>0)return this.total;const e=this.segments.reduce((e,t)=>e+(Number.isFinite(t.value)?t.value:0),0);return e>0?e:1}render(){if(!this.segments.length)return to;const e=this._denom();return Zn(ri||(ri=on`
      <div class="stat-bar"
           role="img"
           aria-label="${0}">
        ${0}
      </div>
      ${0}
    `),this.segments.map(e=>`${e.label} ${e.value}`).join(", "),this.segments.map(t=>{const i=Number.isFinite(t.value)?Math.max(0,t.value):0;if(0===i)return to;const s=i/e*100;return Zn(ni||(ni=on`<div class="stat-bar-segment ${0}"
                           style="width: ${0}%"
                           title="${0}: ${0}"></div>`),t.kind,s,t.label,t.value)}),"none"!==this.legend?Zn(oi||(oi=on`
          <div class="stat-bar-legend ${0}">
            ${0}
            ${0}
          </div>`),"inline"===this.legend?"inline":"",this.segments.filter(e=>Number.isFinite(e.value)&&e.value>=0).map(e=>Zn(li||(li=on`<span><span class="legend-swatch ${0}"></span>${0}</span>`),e.kind,e.label)),this.extraLegendText?Zn(ci||(ci=on`<span class="legend-extra">${0}</span>`),this.extraLegendText):to):to)}};Cl.styles=gn(di||(di=on`
    :host { display: block; width: 100%; }

    .stat-bar {
      position: relative;
      height: 8px;
      width: 100%;
      background: var(--divider-color, #e0e0e0);
      border-radius: 4px;
      overflow: hidden;
      display: flex;
      gap: 1px;
    }
    .stat-bar-segment {
      height: 100%;
      transition: width 0.4s ease;
      cursor: help;
    }
    .stat-bar-segment.flood   { background: var(--info, #2196f3); }
    .stat-bar-segment.direct  { background: var(--good, #4caf50); }
    .stat-bar-segment.other   { background: var(--secondary-text-color); opacity: 0.55; }
    .stat-bar-segment.success { background: var(--good, #4caf50); }
    .stat-bar-segment.failure { background: var(--bad,  #f44336); }
    .stat-bar-segment.tx      { background: var(--info, #2196f3); }
    .stat-bar-segment.rx      { background: var(--good, #4caf50); }
    .stat-bar-segment.idle    { background: transparent; }

    .stat-bar-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 12px;
      margin-top: 4px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .stat-bar-legend > span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .legend-swatch {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .legend-swatch.flood   { background: var(--info, #2196f3); }
    .legend-swatch.direct  { background: var(--good, #4caf50); }
    .legend-swatch.other   { background: var(--secondary-text-color); opacity: 0.55; }
    .legend-swatch.success { background: var(--good, #4caf50); }
    .legend-swatch.failure { background: var(--bad,  #f44336); }
    .legend-swatch.tx      { background: var(--info, #2196f3); }
    .legend-swatch.rx      { background: var(--good, #4caf50); }
    .legend-swatch.idle    {
      background: var(--divider-color, #e0e0e0);
      border: 1px solid var(--secondary-text-color);
    }

    .stat-bar-legend.inline {
      gap: 4px 8px;
      margin-top: 2px;
      font-size: 10px;
    }
  `)),ln([yo({type:Array})],Cl.prototype,"segments",void 0),ln([yo({type:Number})],Cl.prototype,"total",void 0),ln([yo({type:String})],Cl.prototype,"legend",void 0),ln([yo({type:String})],Cl.prototype,"extraLegendText",void 0),Cl=ln([vo("meshcore-stacked-bar")],Cl);let Bl=class extends mo{constructor(){super(...arguments),this.content="",this._open=!1,this._onOpen=()=>{this._open||(this._open=!0,window.addEventListener("scroll",this._onScroll,!0))},this._onClose=()=>{this._open&&(this._open=!1,window.removeEventListener("scroll",this._onScroll,!0))},this._onScroll=()=>this._onClose()}render(){return this.content?Zn(hi||(hi=on`
      <button class="info-tip"
              type="button"
              aria-label="More information"
              @mouseenter=${0}
              @mouseleave=${0}
              @focus=${0}
              @blur=${0}
              @click=${0}>
        <svg viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="7" cy="4" r="1.2" fill="currentColor"></circle>
          <rect x="6.1" y="6.2" width="1.8" height="5.2" rx="0.6" fill="currentColor"></rect>
        </svg>
        <span class="info-tip-content ${0}" role="tooltip">
          ${0}
          ${0}
        </span>
      </button>
    `),this._onOpen,this._onClose,this._onOpen,this._onClose,this._stopPropagation,this._open?"open":"",this.content,this.source?Zn(pi||(pi=on`<span class="src">${0}</span>`),this.source):to):to}updated(){this._open&&this._positionPopover()}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll,!0),super.disconnectedCallback()}_stopPropagation(e){e.stopPropagation()}_positionPopover(){const e=this.shadowRoot;if(!e)return;const t=e.querySelector(".info-tip"),i=e.querySelector(".info-tip-content");if(!t||!i)return;const s=t.getBoundingClientRect(),a=i.getBoundingClientRect(),r=window.innerWidth,n=window.innerHeight;let o=s.left+s.width/2-a.width/2,l=s.bottom+6;o<8?o=8:o+a.width>r-8&&(o=Math.max(8,r-8-a.width)),l+a.height>n-8&&(l=s.top-6-a.height,l<8&&(l=8)),i.style.left=`${o}px`,i.style.top=`${l}px`}};Bl.styles=gn(ui||(ui=on`
    :host {
      display: inline-flex;
      vertical-align: middle;
    }
    button.info-tip {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 14px;
      height: 14px;
      margin-left: 4px;
      border-radius: 50%;
      color: var(--secondary-text-color);
      background: var(--divider-color, #e0e0e0);
      cursor: help;
      user-select: none;
      flex-shrink: 0;
      border: none;
      padding: 0;
    }
    /* The "i" glyph is drawn as inline SVG (not a Unicode character) so
       its dot + stem sit on the geometric center of the 14×14 button
       regardless of font metrics. Using a Unicode glyph here previously
       produced two stacked, optically-misaligned rings — the CSS-drawn
       button background plus the glyph's own circled-i ring. */
    button.info-tip svg {
      display: block;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }
    button.info-tip:hover,
    button.info-tip:focus {
      color: var(--card-background-color, #fff);
      background: var(--primary-color, #03a9f4);
      outline: none;
    }
    /* Popover is position: fixed so we can clamp it to the viewport on
       open (see _positionPopover). top / left are set by JS each time
       the popover opens; visibility is toggled by the .open class
       rather than :hover/:focus so we control the timing of the
       measurement that drives the clamp. */
    .info-tip-content {
      position: fixed;
      top: 0;
      left: 0;
      display: none;
      width: 260px;
      max-width: calc(100vw - 16px);
      padding: 10px 12px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
      font-size: 11px;
      font-weight: normal;
      color: var(--primary-text-color);
      text-align: left;
      line-height: 1.45;
      z-index: 100;
      white-space: normal;
      pointer-events: none;
    }
    .info-tip-content.open {
      display: block;
    }
    .info-tip-content .src {
      display: block;
      margin-top: 6px;
      font-size: 10px;
      color: var(--secondary-text-color);
      word-break: break-all;
    }
  `)),ln([yo({type:String})],Bl.prototype,"content",void 0),ln([yo({type:String})],Bl.prototype,"source",void 0),ln([xo()],Bl.prototype,"_open",void 0),Bl=ln([vo("meshcore-info-tip")],Bl);const Sl=[{key:"sent_flood",label:"Sent · Flood",color:"var(--info, #2196f3)",dash:!1},{key:"sent_direct",label:"Sent · Direct",color:"var(--info, #2196f3)",dash:!0},{key:"recv_flood",label:"Recv · Flood",color:"var(--good, #4caf50)",dash:!1},{key:"recv_direct",label:"Recv · Direct",color:"var(--good, #4caf50)",dash:!0},{key:"errors",label:"Errors",color:"var(--bad, #f44336)",dash:!1}];let kl=class extends mo{constructor(){super(...arguments),this.data=[],this.width=700,this.height=170,this.timeRange=48,this._hoverIndex=null,this._onPointerMove=e=>{const t=this._indexFromEvent(e);null!=t&&t!==this._hoverIndex&&(this._hoverIndex=t)},this._onPointerDown=e=>{const t=this._indexFromEvent(e);null!=t&&(this._hoverIndex=t===this._hoverIndex?null:t)},this._onPointerLeave=e=>{"mouse"===e.pointerType&&(this._hoverIndex=null)}}render(){return this.data&&0!==this.data.length?Zn(gi||(gi=on`
      <div class="chart-container">
        <div class="plot">
          ${0}
          ${0}
        </div>
        <div class="legend">
          ${0}
        </div>
      </div>
    `),this._renderChart(),null!=this._hoverIndex?this._renderTooltip():to,Sl.map(e=>Zn(Ai||(Ai=on`<div class="legend-item">
              <span class="legend-line ${0}"
                    style="border-top-color:${0}"></span>${0}
            </div>`),e.dash?"dashed":"",e.color,e.label))):to}_timeLabel(e,t){const i=Math.round((t-e)/36e5);return i<=0?"now":`-${i}h`}_fmtValue(e){return"number"==typeof e&&isFinite(e)?0===e?"0":e<1?e.toFixed(2):e.toFixed(1):"—"}_geom(){const e=this.width,t=this.height,i=e-40-12,s=t-12-22;let a=0;for(const e of this.data)for(const t of Sl){const i=e.values[t.key];"number"==typeof i&&isFinite(i)&&(a=Math.max(a,i))}a<=0&&(a=1);const r=Date.now(),n=36e5*this.timeRange,o=r-n;return{padL:40,padR:12,padT:12,padB:22,w:e,h:t,cw:i,ch:s,maxV:a,now:r,range:n,oldest:o,xScale:e=>40+(e-o)/n*i,yScale:e=>12+s-e/a*s}}_nearestBucket(e){const{xScale:t}=this._geom();let i=-1,s=1/0;for(let a=0;a<this.data.length;a++){const r=Math.abs(t(this.data[a].timestamp)-e);r<s&&(s=r,i=a)}return i}_indexFromEvent(e){const t=this.renderRoot.querySelector("svg");if(!t||0===this.data.length)return null;const i=t.getBoundingClientRect();if(0===i.width)return null;const s=(e.clientX-i.left)/i.width*this.width;return this._nearestBucket(s)}_renderChart(){const e=this._geom(),{padL:t,padR:i,padT:s,padB:a,w:r,h:n,ch:o,maxV:l,now:c,range:d,oldest:h,xScale:p,yScale:u}=e,g=[0,l/2,l].map(e=>{const s=u(e);return Xn(fi||(fi=on`
        <line x1="${0}" y1="${0}" x2="${0}" y2="${0}"
          stroke="var(--divider-color,#e0e0e0)" stroke-dasharray="4,4" opacity="0.3" />
        <text x="${0}" y="${0}" font-size="9" text-anchor="end"
          fill="var(--secondary-text-color,#727272)">${0}</text>`),t,s,r-i,s,t-6,s+3,e<1?e.toFixed(1):Math.round(e))}),A=[h,h+d/2,c].map(e=>Xn(mi||(mi=on`
        <text x="${0}" y="${0}" font-size="9" text-anchor="middle"
          fill="var(--secondary-text-color,#727272)">${0}</text>`),p(e),n-a+14,this._timeLabel(e,c))),f=Sl.map(e=>{const t=this.data.filter(t=>"number"==typeof t.values[e.key]&&isFinite(t.values[e.key])).map(t=>`${p(t.timestamp).toFixed(1)},${u(t.values[e.key]).toFixed(1)}`);if(0===t.length)return Xn(_i||(_i=on``));if(1===t.length){const[i,s]=t[0].split(",");return Xn(vi||(vi=on`<circle cx="${0}" cy="${0}" r="2" fill="${0}" />`),i,s,e.color)}return Xn(wi||(wi=on`<polyline points="${0}" fill="none" stroke="${0}"
        stroke-width="1.5" stroke-dasharray="${0}"
        stroke-linecap="round" stroke-linejoin="round" />`),t.join(" "),e.color,e.dash?"5,3":"none")});let m=Xn(bi||(bi=on``));if(null!=this._hoverIndex&&this._hoverIndex<this.data.length){const e=this.data[this._hoverIndex],t=p(e.timestamp),i=Sl.map(i=>{const s=e.values[i.key];return"number"==typeof s&&isFinite(s)?Xn(xi||(xi=on`<circle cx="${0}" cy="${0}" r="3" fill="${0}"
          stroke="var(--card-background-color,#fff)" stroke-width="1" />`),t,u(s),i.color):Xn(yi||(yi=on``))});m=Xn(Ei||(Ei=on`
        <line x1="${0}" y1="${0}" x2="${0}" y2="${0}"
          stroke="var(--primary-text-color,#888)" stroke-width="1" opacity="0.35" />
        ${0}`),t,s,t,n-a,i)}return Xn(Ci||(Ci=on`
      <svg viewBox="0 0 ${0} ${0}" xmlns="http://www.w3.org/2000/svg" role="img"
           aria-label="Message rate over the last ${0} hours"
           @pointermove="${0}"
           @pointerdown="${0}"
           @pointerleave="${0}">
        ${0}
        <line x1="${0}" y1="${0}" x2="${0}" y2="${0}"
          stroke="var(--divider-color,#e0e0e0)" stroke-width="1" />
        <line x1="${0}" y1="${0}" x2="${0}" y2="${0}"
          stroke="var(--divider-color,#e0e0e0)" stroke-width="1" />
        ${0}
        ${0}
        ${0}
        <text x="${0}" y="${0}" font-size="9"
          fill="var(--secondary-text-color,#727272)">msg/min</text>
        <rect x="${0}" y="${0}" width="${0}" height="${0}"
          fill="transparent" style="pointer-events:all" />
      </svg>`),r,n,this.timeRange,this._onPointerMove,this._onPointerDown,this._onPointerLeave,g,t,s,t,n-a,t,n-a,r-i,n-a,f,m,A,t,s-2,t,s,e.cw,o)}_renderTooltip(){const e=this._hoverIndex;if(null==e||e>=this.data.length)return to;const t=this._geom(),i=this.data[e],s=t.xScale(i.timestamp)/t.w*100,a=s>55,r=new Date(i.timestamp).toLocaleString([],{weekday:"short",hour:"2-digit",minute:"2-digit"}),n=a?`left:${s}%; transform:translateX(calc(-100% - 8px));`:`left:${s}%; transform:translateX(8px);`;return Zn(Bi||(Bi=on`
      <div class="tooltip" style="${0}">
        <div class="tt-head">${0} · msg/min</div>
        ${0}
      </div>
    `),n,r,Sl.map(e=>Zn(Si||(Si=on`<div class="tt-row">
            <span class="sw ${0}" style="border-top-color:${0}"></span>
            <span class="lbl">${0}</span>
            <span class="val">${0}</span>
          </div>`),e.dash?"dashed":"",e.color,e.label,this._fmtValue(i.values[e.key]))))}};kl.styles=gn(ki||(ki=on`
    :host { display: block; width: 100%; }
    svg { width: 100%; height: auto; display: block; touch-action: pan-y; }
    .chart-container {
      width: 100%;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 8px;
      background: var(--input-bg);
      padding: 10px 12px;
      box-sizing: border-box;
    }
    /* Shrink-wraps the SVG so the tooltip can be positioned in % of the SVG
       box — percentages map exactly because the SVG fills this wrapper, with
       no dependence on the rendered scale factor. */
    .plot { position: relative; }
    .tooltip {
      position: absolute;
      top: 4px;
      z-index: 2;
      pointer-events: none;
      background: var(--card-background-color, var(--input-bg, #fff));
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 6px;
      padding: 6px 8px;
      font-size: 11px;
      color: var(--primary-text-color, #212121);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
      white-space: nowrap;
    }
    .tt-head {
      font-weight: 600;
      margin-bottom: 4px;
      color: var(--secondary-text-color, #727272);
    }
    .tt-row { display: flex; align-items: center; gap: 6px; line-height: 1.5; }
    .tt-row .sw {
      display: inline-block;
      width: 12px;
      height: 0;
      border-top: 2px solid;
      flex-shrink: 0;
    }
    .tt-row .sw.dashed { border-top-style: dashed; }
    .tt-row .lbl { flex: 1; padding-right: 8px; }
    .tt-row .val { font-variant-numeric: tabular-nums; text-align: right; }
    .legend {
      display: flex;
      flex-wrap: wrap;
      gap: 14px;
      margin-top: 6px;
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .legend-line {
      display: inline-block;
      width: 16px;
      height: 0;
      border-top: 2px solid;
      flex-shrink: 0;
    }
    .legend-line.dashed { border-top-style: dashed; }
  `)),ln([yo({type:Array})],kl.prototype,"data",void 0),ln([yo({type:Number})],kl.prototype,"width",void 0),ln([yo({type:Number})],kl.prototype,"height",void 0),ln([yo({type:Number})],kl.prototype,"timeRange",void 0),ln([xo()],kl.prototype,"_hoverIndex",void 0),kl=ln([vo("meshcore-message-rate-chart")],kl);let Il=class extends mo{constructor(){super(...arguments),this.entities=[],this.hiddenCount=0,this.knownNodeCount=0,this.contactCount=0,this.channelCount=0,this._rateHistory=[],this._rateHistoryKey=null}render(){if(!this.hass||!this.device)return to;const e=new Set,t=this._renderHeroTiles(e),i=this._buildGroups(e);return Zn(Ii||(Ii=on`
      <div class="hero-row">
        ${0}
      </div>

      ${0}

      ${0}
    `),t,this._renderMessageActivityCard(),i.length>0?Zn(Ri||(Ri=on`
          ${0}

          <div class="sensor-grid">
            ${0}
          </div>`),"companion"!==this.device.type?Zn(Mi||(Mi=on`
              <div class="subsection-label">
                Sensors${0}
              </div>`),this.hiddenCount>0?Zn(Di||(Di=on`<span class="hidden-suffix">(${0} hidden)</span>`),this.hiddenCount):to):to,i.map(e=>this._renderGroup(e))):to)}updated(e){var t;if(!this.hass||!this.device)return;if(!e.has("hass")&&!e.has("device")&&!e.has("entities"))return;const i=this._findEntityIdMatching("nb_sent"),s=null!==(t=null==i?void 0:i.entity_id)&&void 0!==t?t:null;s&&s!==this._rateHistoryKey?(this._rateHistoryKey=s,this._fetchRateHistory()):s||null===this._rateHistoryKey||(this._rateHistoryKey=null,this._rateHistory=[])}_deriveRateId(e,t){return e.replace(`_${t}_`,`_${t}_rate_`)}async _fetchRateHistory(){if(!this.hass)return;const e=[["sent_flood","sent_flood"],["sent_direct","sent_direct"],["recv_flood","recv_flood"],["recv_direct","recv_direct"],["errors","recv_errors"]],t=[];for(const[i,s]of e){const e=this._findEntityIdMatching(s);e&&t.push([i,this._deriveRateId(e.entity_id,s)])}if(0!==t.length)try{const e=await this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-1728e5).toISOString(),end_time:(new Date).toISOString(),statistic_ids:t.map(([,e])=>e),period:"hour"}),s={};for(const[a,r]of t){const t=e[r];if(Array.isArray(t))for(const e of t){var i;if(null==e.start||null==e.mean)continue;const t=new Date(e.start).getTime();(null!==(i=s[t])&&void 0!==i?i:s[t]={})[a]=e.mean}}this._rateHistory=Object.entries(s).map(([e,t])=>({timestamp:parseInt(e,10),values:t})).sort((e,t)=>e.timestamp-t.timestamp)}catch(e){this._rateHistory=[]}else this._rateHistory=[]}_renderMessageActivityCard(){return this._rateHistory.length?Zn(Fi||(Fi=on`
      <div class="subsection-label">Message activity (48h)</div>
      <meshcore-message-rate-chart .data=${0}></meshcore-message-rate-chart>
    `),this._rateHistory):to}_renderHeroTiles(e){const t=this.device;return"companion"===t.type?this._renderCompanionHero(e):"repeater"===t.type?this._renderRepeaterHero(e):this._renderClientHero(e)}_renderRepeaterHero(e){return Zn(Ti||(Ti=on`
      ${0}
      ${0}
      ${0}
      ${0}
      ${0}
      ${0}
    `),this._renderBatteryTile(),this._renderSignalTile(),this._renderRadioActivityTile(),this._renderMessagesSentTile(e),this._renderMessagesReceivedTile(e),this._renderRequestsTile(e))}_renderClientHero(e){return Zn(Qi||(Qi=on`
      ${0}
      ${0}
      ${0}
    `),this._renderBatteryTile(),this._renderSignalTile(),this._renderRequestsTile(e))}_renderCompanionHero(e){const t=this._findByMetric("noise_floor");return t&&e.add(t.entity_id),Zn(Pi||(Pi=on`
      ${0}
      ${0}
      ${0}
      ${0}

      ${0}
      ${0}
      ${0}
      ${0}
      ${0}

      ${0}
      ${0}
      ${0}
      ${0}
      ${0}
      ${0}
      ${0}

      ${0}
      ${0}
      ${0}

      ${0}
      ${0}
    `),this._renderRepeaterStateTile(),this._renderCompanionRadioActivityTile(),this._renderMessagesSentTile(e),this._renderMessagesReceivedTile(e),this._renderUptimeTile(e),this._renderBatteryTile(),this._renderTemperatureTile(e),this._renderSignalTile(),this._renderDeviceClockTile(),this._renderHardwareInfoTile(),this._renderFirmwareInfoTile(),this._renderConnectionInfoTile(),this._renderKnownNodesTile(),this._renderProtocolInfoTile(),this._renderRepeatFrequenciesTile(),this._renderQueueTile(e),this._renderCapacityInfoTile(),this._renderStorageTile(),this._renderLocationTile(),this._renderRequestTokensTile(e),this._renderDiscoveredContactsTile(e))}_renderHardwareInfoTile(){var e,t,i,s,a;const r=null===(e=this.repeaterStatus)||void 0===e?void 0:e.device_info,n="companion"===(null===(t=this.device)||void 0===t?void 0:t.type)?this.device.hardware_model||(null==r?void 0:r.model)||(null===(i=this.repeaterStatus)||void 0===i?void 0:i.model):(null==r?void 0:r.model)||(null===(s=this.repeaterStatus)||void 0===s?void 0:s.model);if(!n)return to;const o=null===(a=this.device)||void 0===a?void 0:a.name;return Zn(Oi||(Oi=on`
      <div class="hero-tile" data-repeater-extra="hardware">
        <div class="hero-tile-head">
          <span>Identidade</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          ${0}
          <span class="secondary">${0}</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),o?Zn(Ui||(Ui=on`<span class="primary compact">${0}</span>`),o):to,n,100,0,100,"info")}_renderFirmwareInfoTile(){var e,t,i;if("companion"!==(null===(e=this.device)||void 0===e?void 0:e.type))return to;const s=null===(t=this.repeaterStatus)||void 0===t?void 0:t.device_info,a=this.device.firmware||(null==s?void 0:s.version)||(null===(i=this.repeaterStatus)||void 0===i?void 0:i.firmware),r=null==s?void 0:s.firmware_build;return a||r?Zn(zi||(zi=on`
      <div class="hero-tile" data-repeater-extra="firmware">
        <div class="hero-tile-head">
          <span>Firmware</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary compact">HiveFW${0}</span>
          ${0}
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),a?Zn(Hi||(Hi=on` · ${0}`),a):to,r?Zn($i||($i=on`<span class="secondary">Compilado: ${0}</span>`),r):to,100,0,100,"info"):to}_renderConnectionInfoTile(){var e,t;if("companion"!==(null===(e=this.device)||void 0===e?void 0:e.type))return to;const i=null===(t=this.device.connection_type)||void 0===t?void 0:t.toUpperCase(),s=this.device.connection_address;return i||s?Zn(Ni||(Ni=on`
      <div class="hero-tile" data-repeater-extra="connection">
        <div class="hero-tile-head">
          <span>Ligação</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary compact">${0}</span>
          ${0}
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),this.device.connected?"good":"bad",s||i||"—",i&&s?Zn(Li||(Li=on`<span class="secondary">${0}</span>`),i):to,this.device.connected?100:0,0,100,this.device.connected?"good":"bad"):to}_renderKnownNodesTile(){var e;return"companion"!==(null===(e=this.device)||void 0===e?void 0:e.type)?to:Zn(Gi||(Gi=on`
      <div class="hero-tile" data-repeater-extra="known-nodes">
        <div class="hero-tile-head">
          <span>Nós conhecidos</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),this.knownNodeCount,100,0,100,"info")}_renderProtocolInfoTile(){var e,t;const i=null===(e=this.repeaterStatus)||void 0===e?void 0:e.device_info;if(!i)return to;const s=null!=i.protocol_version?`v${i.protocol_version}`:"—",a=null==i.path_hash_mode?"—":null!==(t=["1 byte","2 bytes","3 bytes"][Number(i.path_hash_mode)])&&void 0!==t?t:String(i.path_hash_mode);return Zn(Yi||(Yi=on`
      <div class="hero-tile" data-repeater-extra="protocol">
        <div class="hero-tile-head">
          <span>Protocolo / Caminho</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
          <span class="secondary">· ${0}</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),s,a,100,0,100,"info")}_renderCapacityInfoTile(){var e,t,i;const s=null===(e=this.repeaterStatus)||void 0===e?void 0:e.device_info;return null==(null==s?void 0:s.max_contacts)&&null==(null==s?void 0:s.max_channels)?to:Zn(Ki||(Ki=on`
      <div class="hero-tile" data-repeater-extra="capacity">
        <div class="hero-tile-head">
          <span>Capacidade</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary compact">Contactos: ${0}/${0}</span>
          <span class="secondary">Canais: ${0}/${0}</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),this.contactCount,null!==(t=s.max_contacts)&&void 0!==t?t:"—",this.channelCount,null!==(i=s.max_channels)&&void 0!==i?i:"—",100,0,100,"info")}_renderRepeatFrequenciesTile(){var e;const t=(null===(e=this.repeaterStatus)||void 0===e?void 0:e.allowed_repeat_frequencies)||[];if(!t.length)return to;const i=t.map(e=>{const t=Number(e.min)/1e3,i=Number(e.max)/1e3;return t===i?`${t.toFixed(3)}`:`${t.toFixed(3)}–${i.toFixed(3)}`});return Zn(ji||(ji=on`
      <div class="hero-tile" data-repeater-extra="repeat-frequencies">
        <div class="hero-tile-head">
          <span>Frequências Repeater</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary compact">${0} MHz</span>
          ${0}
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),i[0],i.length>1?Zn(Wi||(Wi=on`<span class="secondary">· ${0} MHz</span>`),i.slice(1).join(" · ")):to,100,0,100,"info")}_renderTemperatureTile(e){var t,i;const s=this._findByMetric("temperature");if(!s)return to;const a=this._readNumber(s.entity_id);if(!Number.isFinite(a))return to;e.add(s.entity_id);const r=(null!==(t=null===(i=this.hass)||void 0===i||null===(i=i.states[s.entity_id])||void 0===i||null===(i=i.attributes)||void 0===i?void 0:i.unit_of_measurement)&&void 0!==t?t:"°C").includes("F")?5*(a-32)/9:a,n=bl("temperature",9*r/5+32);return Zn(Ji||(Ji=on`
      <div class="hero-tile" data-repeater-extra="temperature"
           @click=${0}>
        <div class="hero-tile-head">
          <span>Temperatura${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}<span class="unit">°C</span></span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),()=>this._fireMoreInfo(s.entity_id),this._renderInfoTip(n),n.band,r.toFixed(1),r,-20,60,n.band)}_renderDeviceClockTile(){var e,t,i;const s=Number(null===(e=this.repeaterStatus)||void 0===e||null===(e=e.clock)||void 0===e?void 0:e.timestamp);if(!Number.isFinite(s)||s<=0)return to;const a=Number(null!==(t=null===(i=this.repeaterStatus)||void 0===i||null===(i=i.clock)||void 0===i?void 0:i.drift_seconds)&&void 0!==t?t:0),r=Math.abs(a),n=r<=2?"good":r<=30?"warn":"bad",o=new Date(1e3*s).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),l=r<=2?"· synchronized":`· drift ${a>0?"+":""}${a}s`;return Zn(qi||(qi=on`
      <div class="hero-tile" data-repeater-extra="clock">
        <div class="hero-tile-head">
          <span>Relógio do dispositivo</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
          <span class="secondary">${0}</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),n,o,l,Math.min(r,120),0,120,n)}_renderRequestTokensTile(e){const t=this.entities.find(e=>e.entity_id.includes("request_rate_limiter"));if(!t)return to;const i=this._readNumber(t.entity_id);if(!Number.isFinite(i))return to;e.add(t.entity_id);const s=i<5?"bad":i<10?"warn":"good";return Zn(Vi||(Vi=on`
      <div class="hero-tile" data-repeater-extra="request-tokens"
           @click=${0}>
        <div class="hero-tile-head">
          <span>Tokens de pedidos</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
          <span class="secondary">available</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),()=>this._fireMoreInfo(t.entity_id),s,this._formatNumber(i,1),i,0,20,s)}_renderDiscoveredContactsTile(e){const t=this.entities.find(e=>e.entity_id.includes("discovered_contacts"));if(!t)return to;const i=this._readNumber(t.entity_id);return Number.isFinite(i)?(e.add(t.entity_id),Zn(Zi||(Zi=on`
      <div class="hero-tile" data-repeater-extra="contacts"
           @click=${0}>
        <div class="hero-tile-head">
          <span>Contactos descobertos</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
          <span class="secondary">seen</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),()=>this._fireMoreInfo(t.entity_id),this._formatCount(i),Math.min(i,1e3),0,1e3,"info")):to}_renderStorageTile(){var e,t;const i=Number(null===(e=this.repeaterStatus)||void 0===e||null===(e=e.battery)||void 0===e?void 0:e.used_kb),s=Number(null===(t=this.repeaterStatus)||void 0===t||null===(t=t.battery)||void 0===t?void 0:t.total_kb);if(!Number.isFinite(i)||!Number.isFinite(s)||s<=0)return to;const a=Math.max(0,Math.min(100,i/s*100)),r=a>=90?"bad":a>=70?"warn":"good";return Zn(Xi||(Xi=on`
      <div class="hero-tile" data-repeater-extra="storage">
        <div class="hero-tile-head">
          <span>Armazenamento</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}<span class="unit">%</span></span>
          <span class="secondary">· ${0} / ${0} KB</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),r,a.toFixed(0),i,s,a,0,100,r)}_renderRepeaterStateTile(){const e=this.repeaterStatus;if(null==e||!e.supported)return to;const t=Boolean(e.repeat);return Zn(es||(es=on`
      <div class="hero-tile" data-repeater-extra="state">
        <div class="hero-tile-head">
          <span>Modo Repeater</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
          <span class="secondary">· Companion always on</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),t?"good":"info",t?"Active":"Off",t?100:0,0,100,t?"good":"info")}_renderUptimeTile(e){const t=this._findByMetric("uptime_hours");let i=NaN;if(t){const s=this._readUptimeMinutes(t);i=Number.isFinite(s)?s/60:NaN,e.add(t.entity_id)}if(!Number.isFinite(i)){var s;const e=null===(s=this.repeaterStatus)||void 0===s||null===(s=s.stats.core)||void 0===s?void 0:s.uptime_secs;null!=e&&(i=Number(e)/3600)}if(!Number.isFinite(i))return to;const a=bl("uptime_hours",i),r=i>=48?`${Math.floor(i/24)}d ${Math.floor(i%24)}h`:i>=1?`${Math.floor(i)}h ${Math.floor(i%1*60)}m`:`${Math.max(0,Math.floor(60*i))}m`;return Zn(ts||(ts=on`
      <div class="hero-tile" data-repeater-extra="uptime" @click=${0}>
        <div class="hero-tile-head">
          <span>Tempo ligado${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value"><span class="primary">${0}</span></div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),()=>t&&this._fireMoreInfo(t.entity_id),this._renderInfoTip(a),a.band,r,Math.min(i,168),0,168,a.band)}_renderNoiseFloorTile(e){const t=this._findByMetric("noise_floor");let i=t?this._readNumber(t.entity_id):NaN;if(t&&e.add(t.entity_id),!Number.isFinite(i)){var s;const e=null===(s=this.repeaterStatus)||void 0===s||null===(s=s.stats.radio)||void 0===s?void 0:s.noise_floor;null!=e&&(i=Number(e))}if(!Number.isFinite(i))return to;const a=bl("noise_floor",i);return Zn(is||(is=on`
      <div class="hero-tile" data-repeater-extra="noise" @click=${0}>
        <div class="hero-tile-head">
          <span>Ruído de fundo${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value"><span class="primary">${0}<span class="unit">dBm</span></span></div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),()=>t&&this._fireMoreInfo(t.entity_id),this._renderInfoTip(a),a.band,this._formatNumber(i,0),i,-130,-90,a.band)}_renderQueueTile(e){const t=this._findByMetric("tx_queue_len");let i=t?this._readNumber(t.entity_id):NaN;if(t&&e.add(t.entity_id),!Number.isFinite(i)){var s;const e=null===(s=this.repeaterStatus)||void 0===s||null===(s=s.stats.core)||void 0===s?void 0:s.queue_len;null!=e&&(i=Number(e))}if(!Number.isFinite(i))return to;const a=bl("tx_queue_len",i);return Zn(ss||(ss=on`
      <div class="hero-tile" data-repeater-extra="queue" @click=${0}>
        <div class="hero-tile-head">
          <span>Fila TX${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
          <span class="secondary">queued</span>
        </div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),()=>t&&this._fireMoreInfo(t.entity_id),this._renderInfoTip(a),a.band,this._formatCount(i),Math.min(Math.max(i,0),30),0,30,a.band)}_renderBatteryTile(){var e;const t=this._findByMetric("battery_pct");if(!t)return to;const i=this._readNumber(t.entity_id),s=null!==(e=this._findEntityIdMatching("battery_voltage"))&&void 0!==e?e:this._findEntityByLabel("Voltage"),a=s?this._readNumber(s.entity_id):NaN,r=bl("battery_pct",i);return Zn(as||(as=on`
      <div class="hero-tile" @click=${0}>
        <div class="hero-tile-head">
          <span>Bateria${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">
            ${0}<span class="unit">%</span>
          </span>
          ${0}
        </div>
        <meshcore-stat-bar
          .value=${0}
          .min=${0}
          .max=${0}
          .band=${0}>
        </meshcore-stat-bar>
      </div>
    `),()=>this._fireMoreInfo(t.entity_id),this._renderInfoTip(r),r.band,this._formatNumber(i,0),Number.isFinite(a)?Zn(rs||(rs=on`<span class="secondary">· ${0} V</span>`),a.toFixed(3)):to,i,0,100,r.band)}_renderSignalTile(){const e=this._findByMetric("rssi");if(!e)return to;const t=this._readNumber(e.entity_id),i=this._findByMetric("snr"),s=i?this._readNumber(i.entity_id):NaN,a=bl("rssi",t);return Zn(ns||(ns=on`
      <div class="hero-tile" @click=${0}>
        <div class="hero-tile-head">
          <span>Sinal da última mensagem${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">
            ${0}<span class="unit">dBm</span>
          </span>
          ${0}
        </div>
        <meshcore-stat-bar
          .value=${0}
          .min=${0}
          .max=${0}
          .band=${0}>
        </meshcore-stat-bar>
      </div>
    `),()=>this._fireMoreInfo(e.entity_id),this._renderInfoTip(a),a.band,this._formatNumber(t,0),Number.isFinite(s)?Zn(os||(os=on`<span class="secondary">· SNR ${0} dB</span>`),s.toFixed(1)):to,t,-130,-30,a.band)}_renderRadioActivityTile(){const e=this._findByMetric("tx_airtime_util"),t=this._findByMetric("rx_airtime_util");if(!e&&!t)return to;const i=e?this._readNumber(e.entity_id):0,s=t?this._readNumber(t.entity_id):0,a=Number.isFinite(i)?Math.max(0,i):0,r=Number.isFinite(s)?Math.max(0,s):0,n=Math.max(0,100-a-r),o=bl("tx_airtime_util",a).band,l=bl("rx_airtime_util",r).band,c=this._worseBand(o,l),d=[{value:a,label:`TX ${a.toFixed(1)}%`,kind:"tx"},{value:r,label:`RX ${r.toFixed(1)}%`,kind:"rx"},{value:n,label:`Idle ${n.toFixed(1)}%`,kind:"idle"}],h=a+r;return Zn(ls||(ls=on`
      <div class="hero-tile"
           @click=${0}>
        <div class="hero-tile-head">
          <span>Atividade de rádio${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}<span class="unit">%</span></span>
        </div>
        <div class="ra-bar-wrap">
          <meshcore-stacked-bar
            .segments=${0}
            .total=${0}
            .legend=${0}>
          </meshcore-stacked-bar>
          <div class="ra-legend">
            ${0}
            ${0}
            <span class="ra-legend-item">
              <span class="legend-swatch idle"></span>Idle ${0}%
            </span>
          </div>
        </div>
      </div>
    `),()=>e&&this._fireMoreInfo(e.entity_id),this._renderInfoTip({band:c,fillPct:0,tooltip:"Half-duplex composition over the last reporting interval. The radio can transmit OR receive, never both. TX above 10% indicates duty-cycle pressure; sustained TX+RX above 30% means the channel is congested."}),c,h.toFixed(1),d,100,"none",e?Zn(cs||(cs=on`<span class="ra-legend-item" @click=${0}>
                  <span class="legend-swatch tx"></span>TX ${0}%
                </span>`),t=>{t.stopPropagation(),e&&this._fireMoreInfo(e.entity_id)},a.toFixed(1)):Zn(ds||(ds=on`<span class="ra-legend-item">
                  <span class="legend-swatch tx"></span>TX ${0}%
                </span>`),a.toFixed(1)),t?Zn(hs||(hs=on`<span class="ra-legend-item" @click=${0}>
                  <span class="legend-swatch rx"></span>RX ${0}%
                </span>`),e=>{e.stopPropagation(),t&&this._fireMoreInfo(t.entity_id)},r.toFixed(1)):Zn(ps||(ps=on`<span class="ra-legend-item">
                  <span class="legend-swatch rx"></span>RX ${0}%
                </span>`),r.toFixed(1)),n.toFixed(1))}_renderMessagesSentTile(e){const t=this._findEntityIdMatching("nb_sent"),i=this._findEntityIdMatching("sent_flood"),s=this._findEntityIdMatching("sent_direct");if(!t||!i&&!s)return to;const a=this._readNumber(t.entity_id),r=i?this._readNumber(i.entity_id):0,n=s?this._readNumber(s.entity_id):0,o=[{value:r,label:`Flood ${r}`,kind:"flood"},{value:n,label:`Direct ${n}`,kind:"direct"}];return e.add(t.entity_id),i&&e.add(i.entity_id),s&&e.add(s.entity_id),Zn(us||(us=on`
      <div class="hero-tile" @click=${0}>
        <div class="hero-tile-head">
          <span>Mensagens enviadas${0}</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
        </div>
        <meshcore-stacked-bar
          .segments=${0}
          .legend=${0}>
        </meshcore-stacked-bar>
      </div>
    `),()=>this._fireMoreInfo(t.entity_id),this._renderInfoTip({band:"info",fillPct:0,tooltip:"Messages sent (lifetime), split by send mode:\n• Flood — broadcast retransmits visible to all neighbours.\n• Direct — routed point-to-point along a path."}),this._formatCount(a),o,"inline")}_renderMessagesReceivedTile(e){const t=this._findEntityIdMatching("nb_recv"),i=this._findEntityIdMatching("recv_flood"),s=this._findEntityIdMatching("recv_direct"),a=this._findEntityIdMatching("flood_dups"),r=this._findEntityIdMatching("direct_dups");if(!t||!i&&!s)return to;const n=this._readNumber(t.entity_id),o=i?this._readNumber(i.entity_id):0,l=s?this._readNumber(s.entity_id):0,c=[{value:o,label:`Flood ${o}`,kind:"flood"},{value:l,label:`Direct ${l}`,kind:"direct"}],d=a?this._readNumber(a.entity_id):0,h=r?this._readNumber(r.entity_id):0,p=(Number.isFinite(d)?d:0)+(Number.isFinite(h)?h:0),u=n>0?p/n*100:0;e.add(t.entity_id),i&&e.add(i.entity_id),s&&e.add(s.entity_id),a&&e.add(a.entity_id),r&&e.add(r.entity_id);const g=this._findEntityIdMatching("recv_errors"),A=g?this._readNumber(g.entity_id):NaN,f=Number.isFinite(A)?A:0,m=n+f,_=m>0?f/m*100:0;return g&&e.add(g.entity_id),Zn(gs||(gs=on`
      <div class="hero-tile" @click=${0}>
        <div class="hero-tile-head">
          <span>Mensagens recebidas${0}</span>
          <span class="status-dot info"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
        </div>
        <meshcore-stacked-bar
          .segments=${0}
          .legend=${0}>
        </meshcore-stacked-bar>
        ${0}
        ${0}
        <div class="msg-legend">
          <span><span class="msg-swatch flood"></span>Flood ${0}</span>
          <span><span class="msg-swatch direct"></span>Direct ${0}</span>
          ${0}
          ${0}
        </div>
      </div>
    `),()=>this._fireMoreInfo(t.entity_id),this._renderInfoTip({band:"info",fillPct:0,tooltip:"Messages received (lifetime), split by receive mode:\n• Flood — broadcast packets received from neighbours.\n• Direct — routed packets where this node is on the path.\n\nEach bar below is a percentage of its own total:\n• Red = receive errors (CRC failures), as a share of all reception attempts (received + errors) — i.e. the error rate.\n• Amber = duplicate receptions, as a share of received messages (duplicates are a subset of received).\n\nBoth are context only, not banded — in a flooding mesh every active neighbour retransmits the same flood once, so a high duplicate ratio is normal (a 2-neighbour repeater sees ~50%, a 3-neighbour ~67%, etc.)."}),this._formatCount(n),c,"none",f>0?Zn(As||(As=on`<div class="err-line"
                      title="Receive errors (CRC failures): ${0} — ${0}% of reception attempts (received + errors)">
              <div class="err-line-fill" style="width:${0}%"></div>
            </div>`),f,_.toFixed(1),Math.min(100,_).toFixed(1)):to,p>0?Zn(fs||(fs=on`<div class="dup-line"
                      title="Duplicate receptions: ${0} — ${0}% of received messages">
              <div class="dup-line-fill" style="width:${0}%"></div>
            </div>`),p,u.toFixed(1),Math.min(100,u).toFixed(1)):to,o,l,f>0?Zn(ms||(ms=on`<span><span class="msg-swatch error"></span>Error ${0}</span>`),f):to,p>0?Zn(_s||(_s=on`<span><span class="msg-swatch dup"></span>Dup ${0}</span>`),p):to)}_renderRequestsTile(e){const t=this._findEntityIdMatching("request_succ"),i=this._findEntityIdMatching("request_fail");if(!t||!i)return to;const s=this._readNumber(t.entity_id),a=this._readNumber(i.entity_id),r=s+a,n=r>0?s/r*100:0,o=r>=50?bl("request_success_rate",n):{band:"info",fillPct:0,tooltip:""},l=[{value:s,label:`OK ${s}`,kind:"success"},{value:a,label:`Fail ${a}`,kind:"failure"}];return e.add(t.entity_id),e.add(i.entity_id),Zn(vs||(vs=on`
      <div class="hero-tile" @click=${0}>
        <div class="hero-tile-head">
          <span>Pedidos${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}</span>
          ${0}
        </div>
        <meshcore-stacked-bar
          .segments=${0}
          .legend=${0}>
        </meshcore-stacked-bar>
      </div>
    `),()=>this._fireMoreInfo(t.entity_id),this._renderInfoTip({...o,tooltip:"Outgoing requests this node initiated (login, telemetry, neighbour query) and how they resolved. Success rate bands: Green > 90%, Yellow 70–90%, Red < 70%, with a minimum sample of 50 attempts to colour. Below the floor, the bar stays neutral — too few samples to judge."}),o.band,r>0?`${n.toFixed(0)}%`:"—",r>0?Zn(ws||(ws=on`<span class="secondary">· ${0} attempt${0}</span>`),r,1===r?"":"s"):to,l,"inline")}_formatCount(e){return Number.isFinite(e)?Math.round(e).toLocaleString():"—"}_renderLocationTile(){const e=this._findEntityIdMatching("latitude"),t=this._findEntityIdMatching("longitude");let i=e?this._readNumber(e.entity_id):NaN,s=t?this._readNumber(t.entity_id):NaN,a="entity";!Number.isFinite(i)&&Number.isFinite(this.fallbackLatitude)&&(i=this.fallbackLatitude,a="fallback"),!Number.isFinite(s)&&Number.isFinite(this.fallbackLongitude)&&(s=this.fallbackLongitude,a="fallback");const r=Number.isFinite(i)&&Number.isFinite(s)&&(0!==i||0!==s);if(!r)return to;let n=null;if("entity"===a&&e){var o;const t=null===(o=this.hass)||void 0===o||null===(o=o.states[e.entity_id])||void 0===o?void 0:o.last_updated;if(t){const e=new Date(t);Number.isNaN(e.getTime())||(n=e)}}else"fallback"===a&&Number.isFinite(this.fallbackUpdated)&&(n=new Date(1e3*this.fallbackUpdated));const l=r&&n?this._formatRelativeTime(n):"";return Zn(bs||(bs=on`
      <div class="hero-tile" @click=${0}>
        <div class="hero-tile-head">
          <span>Localização${0}</span>
        </div>
        <div class="hero-tile-value">
          ${0}
        </div>
        ${0}
      </div>
    `),()=>{e&&this._fireMoreInfo(e.entity_id)},"fallback"===a?Zn(ys||(ys=on`<span style="opacity:0.55;text-transform:none;letter-spacing:0;font-size:10px;margin-left:4px;">via contact</span>`)):to,r?Zn(xs||(xs=on`<span class="coord-pair">
                ${0}, ${0}
              </span>`),i.toFixed(4),s.toFixed(4)):Zn(Es||(Es=on`<span class="primary">—</span>`)),l?Zn(Cs||(Cs=on`<div class="loc-updated">Updated ${0}</div>`),l):to)}_formatRelativeTime(e){const t=(Date.now()-e.getTime())/1e3;return!Number.isFinite(t)||t<0||t<60?"just now":t<3600?`${Math.floor(t/60)} min ago`:t<86400?`${Math.floor(t/3600)} h ago`:`${Math.floor(t/86400)} d ago`}_renderCompanionRadioActivityTile(){const e=this._findEntityIdMatching("tx_airtime"),t=this._findEntityIdMatching("rx_airtime"),i=this._findByMetric("uptime_hours");if(!e&&!t||!i)return to;const s=this._readUptimeMinutes(i);if(!Number.isFinite(s)||s<=0)return to;const a=e?this._readNumber(e.entity_id):0,r=t?this._readNumber(t.entity_id):0;if(!Number.isFinite(a)&&!Number.isFinite(r))return to;const n=e=>Number.isFinite(e)?Math.min(100,Math.max(0,e/s*100)):0,o=n(a),l=n(r),c=Math.max(0,100-o-l),d=bl("tx_airtime_util",o).band,h=bl("rx_airtime_util",l).band,p=this._worseBand(d,h),u=[{value:o,label:`TX ${o.toFixed(1)}%`,kind:"tx"},{value:l,label:`RX ${l.toFixed(1)}%`,kind:"rx"},{value:c,label:`Idle ${c.toFixed(1)}%`,kind:"idle"}],g=o+l;return Zn(Bs||(Bs=on`
      <div class="hero-tile"
           @click=${0}>
        <div class="hero-tile-head">
          <span>Atividade de rádio${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value">
          <span class="primary">${0}<span class="unit">%</span></span>
        </div>
        <div class="ra-bar-wrap">
          <meshcore-stacked-bar
            .segments=${0}
            .total=${0}
            .legend=${0}>
          </meshcore-stacked-bar>
          <div class="ra-legend">
            ${0}
            ${0}
            <span class="ra-legend-item">
              <span class="legend-swatch idle"></span>Idle ${0}%
            </span>
          </div>
        </div>
      </div>
    `),()=>e&&this._fireMoreInfo(e.entity_id),this._renderInfoTip({band:p,fillPct:0,tooltip:"Lifetime-average half-duplex composition: cumulative TX / RX airtime divided by uptime since the node last booted. The radio can transmit OR receive, never both. Unlike a managed repeater (which reports utilisation over the last interval), the companion exposes only cumulative airtime, so this is a long-run average and will not reflect short recent bursts."}),p,g.toFixed(1),u,100,"none",e?Zn(Ss||(Ss=on`<span class="ra-legend-item" @click=${0}>
                  <span class="legend-swatch tx"></span>TX ${0}%
                </span>`),t=>{t.stopPropagation(),e&&this._fireMoreInfo(e.entity_id)},o.toFixed(1)):Zn(ks||(ks=on`<span class="ra-legend-item">
                  <span class="legend-swatch tx"></span>TX ${0}%
                </span>`),o.toFixed(1)),t?Zn(Is||(Is=on`<span class="ra-legend-item" @click=${0}>
                  <span class="legend-swatch rx"></span>RX ${0}%
                </span>`),e=>{e.stopPropagation(),t&&this._fireMoreInfo(t.entity_id)},l.toFixed(1)):Zn(Rs||(Rs=on`<span class="ra-legend-item">
                  <span class="legend-swatch rx"></span>RX ${0}%
                </span>`),l.toFixed(1)),c.toFixed(1))}_readUptimeMinutes(e){var t,i;const s=this._readNumber(e.entity_id);if(!Number.isFinite(s))return NaN;switch(null!==(t=null===(i=this.hass)||void 0===i||null===(i=i.states[e.entity_id])||void 0===i||null===(i=i.attributes)||void 0===i?void 0:i.unit_of_measurement)&&void 0!==t?t:""){case"d":return 1440*s;case"h":return 60*s;case"min":return s;default:return s/60}}_buildGroups(e){var t;const i={"Radio · live":[],"Radio · configuration":[],Status:[],Identity:[]};for(const t of this.entities)e.has(t.entity_id)||this._isHeroDuplicate(t)||i[this._groupOf(t)].push(this._renderRow(t));const s="companion"===(null===(t=this.device)||void 0===t?void 0:t.type),a=["Radio · live","Radio · configuration","Identity"];return Object.entries(i).filter(([e,t])=>!(0===t.length||s&&a.includes(e))).map(([e,t])=>({name:e,rows:t}))}_isHeroDuplicate(e){return"battery_pct"===e.metricKey||2===e.sortOrder||"snr"===e.metricKey||"rssi"===e.metricKey||"temperature"===e.metricKey||"uptime_hours"===e.metricKey||"tx_airtime_util"===e.metricKey||"rx_airtime_util"===e.metricKey||"Airtime"===e.label||"RX Airtime"===e.label}_groupOf(e){const t=e.entity_id,i=e.sortOrder;return e.booleanProblem||2===i?"Status":6===i?"Radio · configuration":4===i||5===i||9===i||10===i||11===i||12===i||t.includes("noise_floor")||t.includes("tx_queue")?"Radio · live":t.includes("frequency")||t.includes("bandwidth")||t.includes("spreading_factor")||t.includes("rate_limiter")?"Radio · configuration":t.includes("hop_count")||t.includes("out_path")||t.includes("last_seen")||t.includes("last_advert")||3===i||8===i||7===i?"Status":"Identity"}_renderGroup(e){return Zn(Ms||(Ms=on`
      <div class="group-label">${0}</div>
      ${0}
    `),e.name,e.rows)}_renderRow(e){var t,i,s,a,r;if(e.booleanProblem){var n;const t=null===(n=this.hass)||void 0===n||null===(n=n.states[e.entity_id])||void 0===n?void 0:n.state,i=void 0===t||"unknown"===t||"unavailable"===t,s="on"===t,a=i?"info":s?"bad":"good";return Zn(Ds||(Ds=on`
        <div class="sensor-item"
             @click=${0}
             @contextmenu=${0}
             ${0}>
          <span class="status-dot ${0}"></span>
          <span class="si-label">${0}</span>
          <span class="si-value">${0}</span>
          <span class="si-bar"></span>
        </div>
      `),()=>this._fireMoreInfo(e.entity_id),t=>this._fireContextMenu(t,e),xl(()=>this._fireContextMenu(void 0,e)),a,e.label,i?"—":s?"Detected":"OK")}const o=this._readNumber(e.entity_id),l=null===(t=this.hass)||void 0===t?void 0:t.states[e.entity_id],c=null!==(i=null==l||null===(s=l.attributes)||void 0===s?void 0:s.unit_of_measurement)&&void 0!==i?i:"",d=e.metricKey?this._evaluateForRow(e.metricKey,o,e):null,h=null!==(a=null==d?void 0:d.band)&&void 0!==a?a:"info",p=e.staticTooltip||(null==d?void 0:d.tooltip)||"",u=p?{band:h,fillPct:null!==(r=null==d?void 0:d.fillPct)&&void 0!==r?r:0,tooltip:p,source:null==d?void 0:d.source}:null,g=this._formatRowValue(e,o,null==l?void 0:l.state);return Zn(Fs||(Fs=on`
      <div class="sensor-item"
           @click=${0}
           @contextmenu=${0}
           ${0}>
        <span class="status-dot ${0}"></span>
        <span class="si-label">
          ${0}${0}
        </span>
        <span class="si-value">
          ${0}${0}
        </span>
        <span class="si-bar">
          ${0}
        </span>
      </div>
    `),()=>this._fireMoreInfo(e.entity_id),t=>this._fireContextMenu(t,e),xl(()=>this._fireContextMenu(void 0,e)),h,e.label,u?this._renderInfoTip(u):to,g,c?Zn(Ts||(Ts=on`<span class="unit">${0}</span>`),c):to,d&&e.metricKey?Zn(Qs||(Qs=on`<meshcore-stat-bar
                .value=${0}
                .min=${0}
                .max=${0}
                .band=${0}>
              </meshcore-stat-bar>`),d.fillPct,0,100,h):to)}_evaluateForRow(e,t,i){if("uptime_hours"===e){var s,a;let r=t;switch(null!==(s=null===(a=this.hass)||void 0===a||null===(a=a.states[i.entity_id])||void 0===a||null===(a=a.attributes)||void 0===a?void 0:a.unit_of_measurement)&&void 0!==s?s:""){case"d":r=24*t;break;case"h":r=t;break;case"min":r=t/60;break;default:r=t/3600}return bl(e,r)}var r,n;return bl(e,"temperature"===e&&(null!==(r=null===(n=this.hass)||void 0===n||null===(n=n.states[i.entity_id])||void 0===n||null===(n=n.attributes)||void 0===n?void 0:n.unit_of_measurement)&&void 0!==r?r:"").includes("C")?9*t/5+32:t)}_findByMetric(e){return this.entities.find(t=>t.metricKey===e)}_findEntityIdMatching(e){return this.entities.find(t=>t.entity_id.includes(e))}_findEntityByLabel(e){return this.entities.find(t=>t.label===e)}_readNumber(e){var t;const i=null===(t=this.hass)||void 0===t?void 0:t.states[e];if(!i||"unavailable"===i.state||"unknown"===i.state)return NaN;const s=parseFloat(i.state);return Number.isFinite(s)?s:NaN}_formatNumber(e,t){return Number.isFinite(e)?e.toFixed(t):"—"}_formatRowValue(e,t,i){var s;if("unavailable"===i||"unknown"===i)return"—";if(!Number.isFinite(t))return null!=i?i:"—";const a=null===(s=this.hass)||void 0===s||null===(s=s.entities)||void 0===s||null===(s=s[e.entity_id])||void 0===s?void 0:s.display_precision;return null!=a&&a>=0?t.toFixed(a):i&&i.includes(".")?i:t.toString()}_renderInfoTip(e){var t;return e.tooltip?Zn(Ps||(Ps=on`<meshcore-info-tip
      .content=${0}
      .source=${0}>
    </meshcore-info-tip>`),e.tooltip,null!==(t=e.source)&&void 0!==t?t:""):to}_worseBand(e,t){const i={good:0,info:0,warn:1,bad:2};return i[e]>=i[t]?e:t}_fireMoreInfo(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}_fireContextMenu(e,t){null==e||e.preventDefault(),this.dispatchEvent(new CustomEvent("tile-context-menu",{detail:{entityId:t.entity_id,label:t.label},bubbles:!0,composed:!0}))}};Il.styles=gn(Os||(Os=on`
    /* container-type lets the sensor grid's @container query react to this
       card's own width rather than the raw viewport. */
    :host { display: block; container-type: inline-size; }

    /* ─── Hero row ─── */
    .hero-row {
      display: grid;
      grid-template-columns: repeat(6, minmax(0, 1fr));
      grid-auto-flow: dense;
      gap: 7px;
      margin-bottom: 10px;
      align-items: stretch;
    }
    .hero-row > .hero-tile,
    .hero-row > .hero-tile.hive-metric-compact {
      grid-column: span 1;
      min-width: 0;
    }
    .hero-row > .hero-tile[data-repeater-extra="repeat-frequencies"] {
      grid-column: span 1;
    }
    .hero-tile {
      background: var(--secondary-background-color, #f0f0f0);
      border-radius: 10px;
      padding: 8px 9px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: border-color 0.15s, transform 0.15s;
      min-height: 70px;
      height: 100%;
      box-sizing: border-box;
    }
    @container (max-width: 1050px) {
      .hero-row { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    }
    @container (max-width: 650px) {
      .hero-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .hero-row > .hero-tile[data-repeater-extra="repeat-frequencies"] { grid-column: span 1; }
    }
    @container (max-width: 390px) {
      .hero-row { grid-template-columns: 1fr; }
      .hero-row > .hero-tile,
      .hero-row > .hero-tile.hive-metric-compact,
      .hero-row > .hero-tile[data-repeater-extra="repeat-frequencies"] { grid-column: 1; }
    }
    .hero-tile:hover { border-color: var(--primary-color, #03a9f4); }
    .hero-tile-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: var(--secondary-text-color);
    }
    .hero-tile-value {
      display: flex;
      align-items: baseline;
      gap: 3px;
      flex-wrap: wrap;
    }
    .hero-tile-value .primary {
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-text-color);
      line-height: 1;
    }
    .hero-tile-value .secondary {
      font-size: 10px;
      color: var(--secondary-text-color);
    }
    .hero-tile-value .compact {
      font-size: 14px;
      font-weight: 500;
      color: var(--primary-text-color);
    }
    /* Clickable TX/RX segments inside Radio activity hero tile */
    .ra-segment {
      cursor: pointer;
      border-radius: 3px;
      padding: 0 2px;
      transition: background 0.15s;
    }
    .ra-segment:hover {
      background: rgba(127, 127, 127, 0.18);
    }

    /* Bar + custom legend wrapper — keeps the legend tight to the bar
       (4px) regardless of the hero-tile's 8px flex-column gap, matching
       the spacing inside Messages Sent / Received tiles. */
    .ra-bar-wrap { display: block; }

    /* Radio activity legend (matches the stacked-bar inline legend
       layout used by Messages Sent / Received) */
    .ra-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 12px;
      margin-top: 4px;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .ra-legend-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .ra-legend-item:hover {
      color: var(--primary-text-color);
      cursor: pointer;
    }
    .legend-swatch {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .legend-swatch.tx   { background: var(--info, #2196f3); }
    .legend-swatch.rx   { background: var(--good, #4caf50); }
    .legend-swatch.idle {
      background: var(--divider-color, #e0e0e0);
      border: 1px solid var(--secondary-text-color);
    }

    /* ─── Status dots ─── */
    .status-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
      display: inline-block;
    }
    .status-dot.good { background: var(--good, #4caf50); }
    .status-dot.warn { background: var(--warn, #ff9800); }
    .status-dot.bad  { background: var(--bad,  #f44336); }
    .status-dot.info { background: var(--info, #2196f3); }

    /* ─── Subsection label ─── */
    .subsection-label {
      font-size: 11px;
      font-weight: 600;
      color: var(--secondary-text-color);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      margin-top: 16px;
    }
    .hidden-suffix {
      font-weight: 400;
      text-transform: none;
      opacity: 0.6;
      margin-left: 6px;
    }

    /* ─── Sensor grid ─── responsive: one column on a narrow card, two
       once the card is wide. The breakpoint is a @container query keyed on
       :host's inline-size, so it reacts to the card width (panel layout,
       sidebar state) rather than just the raw viewport. Category headers
       span the full width so paired sensors stay within their category. */
    .sensor-grid {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 28px;
    }
    @container (min-width: 620px) {
      .sensor-grid { grid-template-columns: 1fr 1fr; }
    }
    .group-label {
      grid-column: 1 / -1;
      padding: 12px 4px 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--secondary-text-color);
    }
    .sensor-item {
      display: grid;
      grid-template-columns: 14px minmax(0, 1fr) auto minmax(72px, 120px);
      align-items: center;
      gap: 10px;
      padding: 8px 4px;
      border-top: 1px solid var(--divider-color);
      font-size: 13px;
      cursor: pointer;
    }
    .sensor-item:hover { background: rgba(127, 127, 127, 0.06); }
    .si-label {
      color: var(--secondary-text-color);
      min-width: 0;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .si-value {
      color: var(--primary-text-color);
      font-weight: 500;
      text-align: right;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }
    .si-bar { min-width: 0; }
    .si-bar meshcore-stat-bar { width: 100%; }

    .unit {
      font-size: 11px;
      font-weight: 400;
      color: var(--secondary-text-color);
      margin-left: 2px;
    }

    .map-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 10px;
      border-radius: 12px;
      background: var(--info-bg, rgba(33, 150, 243, 0.18));
      color: var(--info, #2196f3);
      font-size: 11px;
      font-weight: 500;
      text-decoration: none;
      cursor: pointer;
    }
    .coord-pair {
      font-family: ui-monospace, 'SF Mono', Menlo, monospace;
      font-size: 13px;
      color: var(--primary-text-color);
    }
    .loc-updated {
      font-size: 11px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }

    .dup-annotation {
      font-size: 11px;
      color: var(--secondary-text-color);
      font-style: italic;
      margin-top: 2px;
    }
    .dup-annotation .num {
      font-weight: 500;
      color: var(--primary-text-color);
      font-style: normal;
    }
    /* Thin red line beneath the Messages Received composition bar showing
       the lifetime receive-error share. */
    .err-line {
      height: 3px;
      width: 100%;
      margin-top: 3px;
      background: var(--divider-color, #e0e0e0);
      border-radius: 2px;
      overflow: hidden;
      cursor: help;
    }
    .err-line-fill {
      height: 100%;
      background: var(--bad, #f44336);
    }
    /* Duplicates line — same thin track, amber fill, stacked under the
       error line. */
    .dup-line {
      height: 3px;
      width: 100%;
      margin-top: 2px;
      background: var(--divider-color, #e0e0e0);
      border-radius: 2px;
      overflow: hidden;
      cursor: help;
    }
    .dup-line-fill {
      height: 100%;
      background: var(--warning, #ff9800);
    }
    /* Unified legend beneath the Messages Received bar stack. */
    .msg-legend {
      display: flex;
      flex-wrap: wrap;
      gap: 4px 10px;
      margin-top: 5px;
      font-size: 10px;
      color: var(--secondary-text-color);
    }
    .msg-legend > span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      white-space: nowrap;
    }
    .msg-swatch {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex-shrink: 0;
    }
    .msg-swatch.flood  { background: var(--info, #2196f3); }
    .msg-swatch.direct { background: var(--good, #4caf50); }
    .msg-swatch.error  { background: var(--bad, #f44336); }
    .msg-swatch.dup    { background: var(--warning, #ff9800); }
  `)),ln([yo({type:Object})],Il.prototype,"hass",void 0),ln([yo({type:Object})],Il.prototype,"device",void 0),ln([yo({type:Array})],Il.prototype,"entities",void 0),ln([yo({type:Number})],Il.prototype,"hiddenCount",void 0),ln([yo({type:Number})],Il.prototype,"knownNodeCount",void 0),ln([yo({type:Number})],Il.prototype,"contactCount",void 0),ln([yo({type:Number})],Il.prototype,"channelCount",void 0),ln([yo({type:Number})],Il.prototype,"fallbackLatitude",void 0),ln([yo({type:Number})],Il.prototype,"fallbackLongitude",void 0),ln([yo({type:Number})],Il.prototype,"fallbackUpdated",void 0),ln([yo({type:Object})],Il.prototype,"repeaterStatus",void 0),ln([xo()],Il.prototype,"_rateHistory",void 0),Il=ln([vo("meshcore-node-summary")],Il);let Rl=class extends mo{constructor(){super(...arguments),this.narrow=!1,this.knownNodeCount=0,this.contactCount=0,this.channelCount=0,this._repeaterStatus=null,this._deviceConfig=null,this._deviceEntities={},this._meshcoreDeviceMap={},this._hiddenSensors={},this._contextMenu=null,this._statusMessage=null,this._hiddenSensorsOpen=!1,this._loadedEntry=null,this._statusMessageTimeout=null,this._trace=()=>{var e;this.dispatchEvent(new CustomEvent("companion-trace-requested",{detail:{entryId:null===(e=this.selectedDevice)||void 0===e?void 0:e.entry_id},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this._loadHiddenSensors()}updated(){var e;const t=(null===(e=this.selectedDevice)||void 0===e?void 0:e.entry_id)||null;t&&t!==this._loadedEntry&&(this._loadedEntry=t,this._loadData())}async _loadData(){if(this.hass)try{var e,t;const[{meshcoreDeviceMap:i,deviceEntities:s},a,r]=await Promise.all([_l(this.hass),Po(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id).catch(()=>null),Fo(this.hass,null===(t=this.config)||void 0===t?void 0:t.entry_id).catch(()=>null)]);this._meshcoreDeviceMap=i,this._deviceEntities=s,this._repeaterStatus=a,this._deviceConfig=r}catch(e){this._repeaterStatus=null}}_deviceKey(){var e;return(null===(e=this.selectedDevice)||void 0===e?void 0:e.entry_id)||"companion"}_entities(){var e;if(!this.hass||!this.selectedDevice)return[];const t=new Set(this._hiddenSensors[this._deviceKey()]||[]),i=this.selectedDevice.entry_id,s=this._meshcoreDeviceMap[i];if(s&&this._deviceEntities[s])return this._deviceEntities[s].filter(e=>!t.has(e.entity_id));const a=(null===(e=this.selectedDevice.pubkey_prefix)||void 0===e||null===(e=e.substring(0,6))||void 0===e?void 0:e.toLowerCase())||"";if(!a)return[];const r=[];for(const[e,i]of Object.entries(this._deviceEntities))if(!Object.entries(this._meshcoreDeviceMap).some(([t,i])=>i===e&&(t.includes("_repeater_")||t.includes("_client_"))))for(const e of i)e.entity_id.toLowerCase().includes(a)&&!t.has(e.entity_id)&&r.push(e);return r.sort((e,t)=>e.sortOrder-t.sortOrder)}_descriptor(e){var t,i,s,a;return{type:"companion",name:e.name,pubkey_prefix:e.pubkey_prefix,connected:e.connected,firmware:e.firmware||(null===(t=this._deviceConfig)||void 0===t?void 0:t.firmware_version),hardware_model:null===(i=this._deviceConfig)||void 0===i?void 0:i.hardware_model,connection_type:null===(s=this._deviceConfig)||void 0===s?void 0:s.connection_type,connection_address:null===(a=this._deviceConfig)||void 0===a?void 0:a.connection_address,entry_id:e.entry_id}}_loadHiddenSensors(){try{this._hiddenSensors=JSON.parse(localStorage.getItem("meshcore-hidden-sensors")||"{}")}catch(e){this._hiddenSensors={}}}_saveHiddenSensors(){try{localStorage.setItem("meshcore-hidden-sensors",JSON.stringify(this._hiddenSensors))}catch(e){}}_hideSensor(e,t){const i=this._deviceKey(),s=this._hiddenSensors[i]||[];s.includes(e)||(this._hiddenSensors={...this._hiddenSensors,[i]:[...s,e]}),this._saveHiddenSensors(),this._contextMenu=null,this._showStatus("Oculto: "+t,"success")}_unhideSensor(e){const t=this._deviceKey(),i=(this._hiddenSensors[t]||[]).filter(t=>t!==e),s={...this._hiddenSensors};i.length?s[t]=i:delete s[t],this._hiddenSensors=s,this._saveHiddenSensors()}async _action(e,t,i){if(this.hass)try{var s;const a=await async function(e,t,i,s){try{const a={type:"hivefw_integration/execute_local",command:t};return i&&(a.args=i),s&&(a.entry_id=s),await e.callWS(a)}catch(e){const t=e;return{response:t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e),success:!1,timestamp:(new Date).toISOString()}}}(this.hass,e,t,null===(s=this.config)||void 0===s?void 0:s.entry_id);this._showStatus("Companion: "+(i||e)+" → "+(a.response||"OK"),"success"),"set_time"===e&&this._loadData()}catch(t){this._showStatus("Companion: "+(i||e)+" — "+String(t),"error")}}async _copyPublicKey(e){if(e){try{await navigator.clipboard.writeText(e)}catch(t){const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select(),document.execCommand("copy"),i.remove()}this._showStatus("Public Key copiada","success")}}_showStatus(e,t){this._statusMessage={text:e,type:t},null!==this._statusMessageTimeout&&window.clearTimeout(this._statusMessageTimeout),this._statusMessageTimeout=window.setTimeout(()=>{this._statusMessage=null,this._statusMessageTimeout=null},5e3)}render(){var e;const t=this.selectedDevice;if(!t)return Zn(Us||(Us=on`<div class="page"><div class="wrap">Sem Companion selecionado.</div></div>`));const i=this._entities(),s=this._hiddenSensors[this._deviceKey()]||[];return Zn(zs||(zs=on`
      <div class="page"><div class="wrap">
        <div class="device-section">
          <div class="companion-header">
            <div class="section-title">
              <div class="section-icon"><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9,2A1,1 0 0,0 8,3C8,8.67 8,14.33 8,20C8,21.11 8.89,22 10,22H15C16.11,22 17,21.11 17,20V9C17,7.89 16.11,7 15,7H10V3A1,1 0 0,0 9,2M10,9H15V13H10V9Z"/></svg></div>
              <div>
                <div class="device-name">${0}</div>
                <div class="device-meta">
                  <span>Public Key: ${0}</span>
                  <button class="pubkey-copy" @click=${0}>Copiar</button>
                </div>
              </div>
            </div>
            ${0}
          </div>

          ${0}

          <div class="actions-row">
            <button class="action" ?disabled=${0} @click=${0}>Local Advert</button>
            <button class="action" ?disabled=${0} @click=${0}>Flood Advert</button>
            <button class="action" ?disabled=${0} @click=${0}>Sync Clock</button>
            <button class="action" ?disabled=${0} @click=${0}>Trace</button>
            <button class="danger" ?disabled=${0} @click=${0}>Reboot</button>
          </div>
        </div>
      </div></div>

      ${0}

      ${0}

      ${0}
    `),t.name,(null===(e=this._deviceConfig)||void 0===e?void 0:e.pubkey)||t.pubkey||t.pubkey_prefix,()=>{var e;this._copyPublicKey((null===(e=this._deviceConfig)||void 0===e?void 0:e.pubkey)||t.pubkey||t.pubkey_prefix)},s.length?Zn(Hs||(Hs=on`<button class="minor" @click=${0}>Sensores ocultos (${0})</button>`),()=>this._hiddenSensorsOpen=!0,s.length):to,i.length?Zn($s||($s=on`<meshcore-node-summary
            data-hive-native-cockpit="1"
            .hass=${0}
            .device=${0}
            .entities=${0}
            .hiddenCount=${0}
            .knownNodeCount=${0}
            .contactCount=${0}
            .channelCount=${0}
            .repeaterStatus=${0}
            @tile-context-menu=${0}>
          </meshcore-node-summary>`),this.hass,this._descriptor(t),i,s.length,this.knownNodeCount,this.contactCount,this.channelCount,this._repeaterStatus,e=>{this._contextMenu={...e.detail,deviceKey:this._deviceKey()}}):to,!t.connected,()=>this._action("send_advert",void 0,"Local Advert"),!t.connected,()=>this._action("send_advert",{flood:!0},"Flood Advert"),!t.connected,()=>this._action("set_time",{val:Math.floor(Date.now()/1e3)},"Sync Clock"),!t.connected,this._trace,!t.connected,()=>{window.confirm("Reiniciar agora o HiveFW?")&&this._action("reboot",void 0,"Reboot")},this._contextMenu?Zn(Ns||(Ns=on`<div class="overlay" @click=${0}><div class="dialog" @click=${0}>
        <div class="dialog-head"><div class="dialog-title">${0}</div><button class="minor" @click=${0}>Fechar</button></div>
        <button class="danger" @click=${0}>Ocultar sensor</button>
      </div></div>`),()=>this._contextMenu=null,e=>e.stopPropagation(),this._contextMenu.label,()=>this._contextMenu=null,()=>this._hideSensor(this._contextMenu.entityId,this._contextMenu.label)):to,this._hiddenSensorsOpen?Zn(Ls||(Ls=on`<div class="overlay" @click=${0}><div class="dialog" @click=${0}>
        <div class="dialog-head"><div class="dialog-title">Sensores ocultos</div><button class="minor" @click=${0}>Fechar</button></div>
        ${0}
      </div></div>`),()=>this._hiddenSensorsOpen=!1,e=>e.stopPropagation(),()=>this._hiddenSensorsOpen=!1,s.map(e=>{var t;return Zn(Gs||(Gs=on`<div class="sensor-row"><div><div>${0}</div><div class="sensor-id">${0}</div></div><button class="minor" @click=${0}>Mostrar</button></div>`),(null===(t=Object.values(this._deviceEntities).flat().find(t=>t.entity_id===e))||void 0===t?void 0:t.label)||e,e,()=>this._unhideSensor(e))})):to,this._statusMessage?Zn(Ys||(Ys=on`<div class="toast ${0}">${0}</div>`),this._statusMessage.type,this._statusMessage.text):to)}};Rl.styles=gn(Ks||(Ks=on`
    :host{display:block;width:100%;height:100%;min-height:0;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch;overscroll-behavior-y:contain;background:var(--primary-background-color)}
    .page{box-sizing:border-box;width:100%;padding:20px}
    .wrap{width:100%;max-width:none;margin:0}
    .device-section{box-sizing:border-box;width:100%;padding:16px;border:1px solid var(--divider-color);border-radius:12px;background:var(--card-background-color)}
    .companion-header{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:14px}
    .section-title{display:flex;align-items:flex-start;gap:10px;min-width:0}
    .section-icon{width:36px;height:36px;display:grid;place-items:center;border-radius:10px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color);flex:0 0 auto}
    .device-name{font-size:16px;font-weight:700;color:var(--primary-text-color)}
    .device-meta{display:flex;flex-wrap:wrap;align-items:center;gap:7px 10px;margin-top:5px;font-size:11px;color:var(--secondary-text-color)}
    .device-meta span{overflow-wrap:anywhere;word-break:break-word}
    .pubkey-copy{min-height:26px;padding:3px 8px;border:1px solid var(--divider-color);border-radius:6px;background:var(--secondary-background-color);color:var(--primary-text-color);font-size:10px;font-weight:600}
    .actions-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}
    button{font:inherit;cursor:pointer}
    .action,.danger,.minor{min-height:38px;padding:8px 12px;border-radius:8px}
    .action{border:0;background:var(--primary-color);color:var(--text-primary-color,#fff);font-weight:600}
    .danger{border:1px solid var(--error-color,#db4437);background:var(--error-color,#db4437);color:#fff;font-weight:700}
    .danger:hover:not(:disabled){filter:brightness(.92)}
    .minor{border:1px solid var(--divider-color);background:var(--secondary-background-color);color:var(--primary-text-color)}
    button:disabled{opacity:.55;cursor:not-allowed}
    .toast{position:fixed;right:20px;bottom:20px;z-index:20;max-width:min(420px,calc(100vw - 40px));padding:10px 14px;border-radius:9px;background:var(--card-background-color);box-shadow:0 4px 20px rgba(0,0,0,.2)}
    .toast.success{border-left:4px solid var(--success-color,#4caf50)} .toast.error{border-left:4px solid var(--error-color,#f44336)}
    .overlay{position:fixed;inset:0;z-index:30;display:grid;place-items:center;padding:16px;background:rgba(0,0,0,.45)}
    .dialog{width:min(520px,100%);max-height:80vh;overflow:auto;padding:16px;border-radius:12px;background:var(--card-background-color);color:var(--primary-text-color)}
    .dialog-head{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:12px}
    .dialog-title{font-size:16px;font-weight:700}.sensor-row{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:9px 0;border-top:1px solid var(--divider-color)}
    .sensor-id{font-size:10px;color:var(--secondary-text-color);overflow-wrap:anywhere}
    @media(max-width:870px){.page{padding:12px}.companion-header{align-items:stretch}.actions-row>*{flex:1 1 140px}.device-meta{flex-direction:column;gap:3px}}
  `)),ln([yo({type:Object})],Rl.prototype,"hass",void 0),ln([yo({type:Object})],Rl.prototype,"config",void 0),ln([yo({type:Boolean})],Rl.prototype,"narrow",void 0),ln([yo({type:Object})],Rl.prototype,"selectedDevice",void 0),ln([yo({type:Number})],Rl.prototype,"knownNodeCount",void 0),ln([yo({type:Number})],Rl.prototype,"contactCount",void 0),ln([yo({type:Number})],Rl.prototype,"channelCount",void 0),ln([xo()],Rl.prototype,"_repeaterStatus",void 0),ln([xo()],Rl.prototype,"_deviceConfig",void 0),ln([xo()],Rl.prototype,"_deviceEntities",void 0),ln([xo()],Rl.prototype,"_meshcoreDeviceMap",void 0),ln([xo()],Rl.prototype,"_hiddenSensors",void 0),ln([xo()],Rl.prototype,"_contextMenu",void 0),ln([xo()],Rl.prototype,"_statusMessage",void 0),ln([xo()],Rl.prototype,"_hiddenSensorsOpen",void 0),Rl=ln([vo("meshcore-status-page")],Rl);let Ml=class extends mo{constructor(){super(),this.open=!1,this.title="Confirm",this.message="",this.confirmLabel="Confirm",this.cancelLabel="Cancel",this.dangerous=!1,this._typedValue="",nl(this,{isOpen:()=>this.open,onEscape:()=>this._onCancel()})}render(){if(!this.open)return;const e=this.requireTyped&&this._typedValue!==this.requireTyped;return Zn(js||(js=on`
      <div class="dialog-overlay" @click=${0}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-label=${0}>
          <div class="dialog-header">
            <div class="dialog-header-title">${0}</div>
          </div>
          <div class="dialog-body">
            <div style="margin-bottom: 16px;">${0}</div>
            ${0}
          </div>
          <div class="dialog-footer">
            <button
              class="dialog-button"
              @click=${0}>
              ${0}
            </button>
            <button
              class="dialog-button primary ${0}"
              ?disabled=${0}
              @click=${0}>
              ${0}
            </button>
          </div>
        </div>
      </div>
    `),this._onOverlayClick,this.title,this.title,this.message,this.requireTyped?Zn(Ws||(Ws=on`
                  <div class="form-group">
                    <label class="form-label">Type to confirm</label>
                    <input
                      type="text"
                      class="form-input"
                      placeholder="Type '${0}'"
                      .value=${0}
                      @input=${0}
                    />
                    <div class="form-description">
                      Type '${0}' to enable confirmation
                    </div>
                  </div>
                `),this.requireTyped,this._typedValue,e=>{this._typedValue=e.target.value},this.requireTyped):"",this._onCancel,this.cancelLabel,this.dangerous?"danger-button":"",e,this._onConfirm,this.confirmLabel)}_onOverlayClick(e){e.target===e.currentTarget&&this._onCancel()}_onCancel(){this._typedValue="",this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0}))}_onConfirm(){this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0})),this._typedValue=""}};Ml.styles=[Eo,gn(Js||(Js=on`
      :host {
        display: block;
      }
    `))],ln([yo({type:Boolean})],Ml.prototype,"open",void 0),ln([yo({type:String})],Ml.prototype,"title",void 0),ln([yo({type:String})],Ml.prototype,"message",void 0),ln([yo({type:String})],Ml.prototype,"confirmLabel",void 0),ln([yo({type:String})],Ml.prototype,"cancelLabel",void 0),ln([yo({type:Boolean})],Ml.prototype,"dangerous",void 0),ln([yo({type:String})],Ml.prototype,"requireTyped",void 0),ln([xo()],Ml.prototype,"_typedValue",void 0),Ml=ln([vo("meshcore-confirm-dialog")],Ml);const Dl=-2;function Fl(e){return Tl(e.map(([e,t])=>Array(e).fill(t,0,e)))}function Tl(e){return e.reduce((e,t)=>e.concat(Array.isArray(t)?Tl(t):t),[])}const Ql=[0,1,2,3].concat(...Fl([[2,4],[2,5],[4,6],[4,7],[8,8],[8,9],[16,10],[16,11],[32,12],[32,13],[64,14],[64,15],[2,0],[1,16],[1,17],[2,18],[2,19],[4,20],[4,21],[8,22],[8,23],[16,24],[16,25],[32,26],[32,27],[64,28],[64,29]]));function Pl(){const e=this;function t(e,t){let i=0;do{i|=1&e,e>>>=1,i<<=1}while(--t>0);return i>>>1}e.build_tree=i=>{const s=e.dyn_tree,a=e.stat_desc.static_tree,r=e.stat_desc.elems;let n,o,l,c=-1;for(i.heap_len=0,i.heap_max=573,n=0;r>n;n++)0!==s[2*n]?(i.heap[++i.heap_len]=c=n,i.depth[n]=0):s[2*n+1]=0;for(;2>i.heap_len;)l=i.heap[++i.heap_len]=2>c?++c:0,s[2*l]=1,i.depth[l]=0,i.opt_len--,a&&(i.static_len-=a[2*l+1]);for(e.max_code=c,n=Math.floor(i.heap_len/2);n>=1;n--)i.pqdownheap(s,n);l=r;do{n=i.heap[1],i.heap[1]=i.heap[i.heap_len--],i.pqdownheap(s,1),o=i.heap[1],i.heap[--i.heap_max]=n,i.heap[--i.heap_max]=o,s[2*l]=s[2*n]+s[2*o],i.depth[l]=Math.max(i.depth[n],i.depth[o])+1,s[2*n+1]=s[2*o+1]=l,i.heap[1]=l++,i.pqdownheap(s,1)}while(i.heap_len>=2);i.heap[--i.heap_max]=i.heap[1],(t=>{const i=e.dyn_tree,s=e.stat_desc.static_tree,a=e.stat_desc.extra_bits,r=e.stat_desc.extra_base,n=e.stat_desc.max_length;let o,l,c,d,h,p,u=0;for(d=0;15>=d;d++)t.bl_count[d]=0;for(i[2*t.heap[t.heap_max]+1]=0,o=t.heap_max+1;573>o;o++)l=t.heap[o],d=i[2*i[2*l+1]+1]+1,d>n&&(d=n,u++),i[2*l+1]=d,l>e.max_code||(t.bl_count[d]++,h=0,r>l||(h=a[l-r]),p=i[2*l],t.opt_len+=p*(d+h),s&&(t.static_len+=p*(s[2*l+1]+h)));if(0!==u){do{for(d=n-1;0===t.bl_count[d];)d--;t.bl_count[d]--,t.bl_count[d+1]+=2,t.bl_count[n]--,u-=2}while(u>0);for(d=n;0!==d;d--)for(l=t.bl_count[d];0!==l;)c=t.heap[--o],c>e.max_code||(i[2*c+1]!=d&&(t.opt_len+=(d-i[2*c+1])*i[2*c],i[2*c+1]=d),l--)}})(i),((e,i,s)=>{const a=[];let r,n,o,l=0;for(r=1;15>=r;r++)a[r]=l=l+s[r-1]<<1;for(n=0;i>=n;n++)o=e[2*n+1],0!==o&&(e[2*n]=t(a[o]++,o))})(s,e.max_code,i.bl_count)}}function Ol(e,t,i,s,a){const r=this;r.static_tree=e,r.extra_bits=t,r.extra_base=i,r.elems=s,r.max_length=a}Pl._length_code=[0,1,2,3,4,5,6,7].concat(...Fl([[2,8],[2,9],[2,10],[2,11],[4,12],[4,13],[4,14],[4,15],[8,16],[8,17],[8,18],[8,19],[16,20],[16,21],[16,22],[16,23],[32,24],[32,25],[32,26],[31,27],[1,28]])),Pl.base_length=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],Pl.base_dist=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],Pl.d_code=e=>256>e?Ql[e]:Ql[256+(e>>>7)],Pl.extra_lbits=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],Pl.extra_dbits=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Pl.extra_blbits=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],Pl.bl_order=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];const Ul=Fl([[144,8],[112,9],[24,7],[8,8]]);Ol.static_ltree=Tl([12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,19,275,147,403,83,339,211,467,51,307,179,435,115,371,243,499,11,267,139,395,75,331,203,459,43,299,171,427,107,363,235,491,27,283,155,411,91,347,219,475,59,315,187,443,123,379,251,507,7,263,135,391,71,327,199,455,39,295,167,423,103,359,231,487,23,279,151,407,87,343,215,471,55,311,183,439,119,375,247,503,15,271,143,399,79,335,207,463,47,303,175,431,111,367,239,495,31,287,159,415,95,351,223,479,63,319,191,447,127,383,255,511,0,64,32,96,16,80,48,112,8,72,40,104,24,88,56,120,4,68,36,100,20,84,52,116,3,131,67,195,35,163,99,227].map((e,t)=>[e,Ul[t]]));const zl=Fl([[30,5]]);function Hl(e,t,i,s,a){const r=this;r.good_length=e,r.max_lazy=t,r.nice_length=i,r.max_chain=s,r.func=a}Ol.static_dtree=Tl([0,16,8,24,4,20,12,28,2,18,10,26,6,22,14,30,1,17,9,25,5,21,13,29,3,19,11,27,7,23].map((e,t)=>[e,zl[t]])),Ol.static_l_desc=new Ol(Ol.static_ltree,Pl.extra_lbits,257,286,15),Ol.static_d_desc=new Ol(Ol.static_dtree,Pl.extra_dbits,0,30,15),Ol.static_bl_desc=new Ol(null,Pl.extra_blbits,0,19,7);const $l=[new Hl(0,0,0,0,0),new Hl(4,4,8,4,1),new Hl(4,5,16,8,1),new Hl(4,6,32,32,1),new Hl(4,4,16,16,2),new Hl(8,16,32,32,2),new Hl(8,16,128,128,2),new Hl(8,32,128,256,2),new Hl(32,128,258,1024,2),new Hl(32,258,258,4096,2)],Nl=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],Ll=113,Gl=666,Yl=262;function Kl(e,t,i,s){const a=e[2*t],r=e[2*i];return r>a||a==r&&s[t]<=s[i]}function jl(){const e=this;let t,i,s,a,r,n,o,l,c,d,h,p,u,g,A,f,m,_,v,w,b,y,x,E,C,B,S,k,I,R,M,D,F;const T=new Pl,Q=new Pl,P=new Pl;let O,U,z,H,$,N;function L(){let t;for(t=0;286>t;t++)M[2*t]=0;for(t=0;30>t;t++)D[2*t]=0;for(t=0;19>t;t++)F[2*t]=0;M[512]=1,e.opt_len=e.static_len=0,U=z=0}function G(e,t){let i,s=-1,a=e[1],r=0,n=7,o=4;0===a&&(n=138,o=3),e[2*(t+1)+1]=65535;for(let l=0;t>=l;l++)i=a,a=e[2*(l+1)+1],++r<n&&i==a||(o>r?F[2*i]+=r:0!==i?(i!=s&&F[2*i]++,F[32]++):r>10?F[36]++:F[34]++,r=0,s=i,0===a?(n=138,o=3):i==a?(n=6,o=3):(n=7,o=4))}function Y(t){e.pending_buf[e.pending++]=t}function K(e){Y(255&e),Y(e>>>8&255)}function j(e,t){let i;const s=t;N>16-s?(i=e,$|=i<<N&65535,K($),$=i>>>16-N,N+=s-16):($|=e<<N&65535,N+=s)}function W(e,t){const i=2*e;j(65535&t[i],65535&t[i+1])}function J(e,t){let i,s,a=-1,r=e[1],n=0,o=7,l=4;for(0===r&&(o=138,l=3),i=0;t>=i;i++)if(s=r,r=e[2*(i+1)+1],++n>=o||s!=r){if(l>n)do{W(s,F)}while(0!=--n);else 0!==s?(s!=a&&(W(s,F),n--),W(16,F),j(n-3,2)):n>10?(W(18,F),j(n-11,7)):(W(17,F),j(n-3,3));n=0,a=s,0===r?(o=138,l=3):s==r?(o=6,l=3):(o=7,l=4)}}function q(){16==N?(K($),$=0,N=0):8>N||(Y(255&$),$>>>=8,N-=8)}function V(t,i){let s,a,r;if(e.dist_buf[U]=t,e.lc_buf[U]=255&i,U++,0===t?M[2*i]++:(z++,t--,M[2*(Pl._length_code[i]+256+1)]++,D[2*Pl.d_code(t)]++),!(8191&U)&&S>2){for(s=8*U,a=b-m,r=0;30>r;r++)s+=D[2*r]*(5+Pl.extra_dbits[r]);if(s>>>=3,Math.floor(U/2)>z&&Math.floor(a/2)>s)return!0}return U==O-1}function Z(t,i){let s,a,r,n,o=0;if(0!==U)do{s=e.dist_buf[o],a=e.lc_buf[o],o++,0===s?W(a,t):(r=Pl._length_code[a],W(r+256+1,t),n=Pl.extra_lbits[r],0!==n&&(a-=Pl.base_length[r],j(a,n)),s--,r=Pl.d_code(s),W(r,i),n=Pl.extra_dbits[r],0!==n&&(s-=Pl.base_dist[r],j(s,n)))}while(U>o);W(256,t),H=t[513]}function X(){N>8?K($):N>0&&Y(255&$),$=0,N=0}function ee(t,i,s){j(0+(s?1:0),3),((t,i)=>{X(),H=8,K(i),K(~i),e.pending_buf.set(l.subarray(t,t+i),e.pending),e.pending+=i})(t,i)}function te(i){((t,i,s)=>{let a,r,n=0;S>0?(T.build_tree(e),Q.build_tree(e),n=(()=>{let t;for(G(M,T.max_code),G(D,Q.max_code),P.build_tree(e),t=18;t>=3&&0===F[2*Pl.bl_order[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t})(),a=e.opt_len+3+7>>>3,r=e.static_len+3+7>>>3,r>a||(a=r)):a=r=i+5,i+4>a||-1==t?r==a?(j(2+(s?1:0),3),Z(Ol.static_ltree,Ol.static_dtree)):(j(4+(s?1:0),3),((e,t,i)=>{let s;for(j(e-257,5),j(t-1,5),j(i-4,4),s=0;i>s;s++)j(F[2*Pl.bl_order[s]+1],3);J(M,e-1),J(D,t-1)})(T.max_code+1,Q.max_code+1,n+1),Z(M,D)):ee(t,i,s),L(),s&&X()})(0>m?-1:m,b-m,i),m=b,t.flush_pending()}function ie(){let e,i,s,a;do{if(a=c-x-b,0===a&&0===b&&0===x)a=r;else if(-1==a)a--;else if(b>=r+r-Yl){l.set(l.subarray(r,r+r),0),y-=r,b-=r,m-=r,e=u,s=e;do{i=65535&h[--s],h[s]=r>i?0:i-r}while(0!=--e);e=r,s=e;do{i=65535&d[--s],d[s]=r>i?0:i-r}while(0!=--e);a+=r}if(0===t.avail_in)return;e=t.read_buf(l,b+x,a),x+=e,3>x||(p=255&l[b],p=(p<<f^255&l[b+1])&A)}while(Yl>x&&0!==t.avail_in)}function se(e){let t,i,s=C,a=b,n=E;const c=b>r-Yl?b-(r-Yl):0;let h=R;const p=o,u=b+258;let g=l[a+n-1],A=l[a+n];I>E||(s>>=2),h>x&&(h=x);do{if(t=e,l[t+n]==A&&l[t+n-1]==g&&l[t]==l[a]&&l[++t]==l[a+1]){a+=2,t++;do{}while(l[++a]==l[++t]&&l[++a]==l[++t]&&l[++a]==l[++t]&&l[++a]==l[++t]&&l[++a]==l[++t]&&l[++a]==l[++t]&&l[++a]==l[++t]&&l[++a]==l[++t]&&u>a);if(i=258-(u-a),a=u-258,i>n){if(y=e,n=i,i>=h)break;g=l[a+n-1],A=l[a+n]}}}while((e=65535&d[e&p])>c&&0!=--s);return n>x?x:n}e.depth=[],e.bl_count=[],e.heap=[],M=[],D=[],F=[],e.pqdownheap=(t,i)=>{const s=e.heap,a=s[i];let r=i<<1;for(;r<=e.heap_len&&(r<e.heap_len&&Kl(t,s[r+1],s[r],e.depth)&&r++,!Kl(t,a,s[r],e.depth));)s[i]=s[r],i=r,r<<=1;s[i]=a},e.deflateInit=(t,v,y,U,z,G)=>{return U||(U=8),z||(z=8),G||(G=0),t.msg=null,-1==v&&(v=6),1>z||z>9||8!=U||9>y||y>15||0>v||v>9||0>G||G>2?Dl:(t.dstate=e,n=y,r=1<<n,o=r-1,g=z+7,u=1<<g,A=u-1,f=Math.floor((g+3-1)/3),l=new Uint8Array(2*r),d=[],h=[],O=1<<z+6,e.pending_buf=new Uint8Array(4*O),s=4*O,e.dist_buf=new Uint16Array(O),e.lc_buf=new Uint8Array(O),S=v,k=G,(Y=t).total_in=Y.total_out=0,Y.msg=null,e.pending=0,e.pending_out=0,i=Ll,a=0,T.dyn_tree=M,T.stat_desc=Ol.static_l_desc,Q.dyn_tree=D,Q.stat_desc=Ol.static_d_desc,P.dyn_tree=F,P.stat_desc=Ol.static_bl_desc,$=0,N=0,H=8,L(),(()=>{c=2*r,h[u-1]=0;for(let e=0;u-1>e;e++)h[e]=0;B=$l[S].max_lazy,I=$l[S].good_length,R=$l[S].nice_length,C=$l[S].max_chain,b=0,m=0,x=0,_=E=2,w=0,p=0})(),0);var Y},e.deflateEnd=()=>42!=i&&i!=Ll&&i!=Gl?Dl:(e.lc_buf=null,e.dist_buf=null,e.pending_buf=null,h=null,d=null,l=null,e.dstate=null,i==Ll?-3:0),e.deflateParams=(e,t,i)=>{let s=0;return-1==t&&(t=6),0>t||t>9||0>i||i>2?Dl:($l[S].func!=$l[t].func&&0!==e.total_in&&(s=e.deflate(1)),S!=t&&(S=t,B=$l[S].max_lazy,I=$l[S].good_length,R=$l[S].nice_length,C=$l[S].max_chain),k=i,s)},e.deflateSetDictionary=(e,t,s)=>{let a,n=s,c=0;if(!t||42!=i)return Dl;if(3>n)return 0;for(n>r-Yl&&(n=r-Yl,c=s-n),l.set(t.subarray(c,c+n),0),b=n,m=n,p=255&l[0],p=(p<<f^255&l[1])&A,a=0;n-3>=a;a++)p=(p<<f^255&l[a+2])&A,d[a&o]=h[p],h[p]=a;return 0},e.deflate=(c,g)=>{let C,I,R,M,D;if(g>4||0>g)return Dl;if(!c.next_out||!c.next_in&&0!==c.avail_in||i==Gl&&4!=g)return c.msg=Nl[4],Dl;if(0===c.avail_out)return c.msg=Nl[7],-5;var F;if(t=c,M=a,a=g,42==i&&(I=8+(n-8<<4)<<8,R=(S-1&255)>>1,R>3&&(R=3),I|=R<<6,0!==b&&(I|=32),I+=31-I%31,i=Ll,Y((F=I)>>8&255),Y(255&F)),0!==e.pending){if(t.flush_pending(),0===t.avail_out)return a=-1,0}else if(0===t.avail_in&&M>=g&&4!=g)return t.msg=Nl[7],-5;if(i==Gl&&0!==t.avail_in)return c.msg=Nl[7],-5;if(0!==t.avail_in||0!==x||0!=g&&i!=Gl){switch(D=-1,$l[S].func){case 0:D=(e=>{let i,a=65535;for(a>s-5&&(a=s-5);;){if(1>=x){if(ie(),0===x&&0==e)return 0;if(0===x)break}if(b+=x,x=0,i=m+a,(0===b||b>=i)&&(x=b-i,b=i,te(!1),0===t.avail_out))return 0;if(b-m>=r-Yl&&(te(!1),0===t.avail_out))return 0}return te(4==e),0===t.avail_out?4==e?2:0:4==e?3:1})(g);break;case 1:D=(e=>{let i,s=0;for(;;){if(Yl>x){if(ie(),Yl>x&&0==e)return 0;if(0===x)break}if(3>x||(p=(p<<f^255&l[b+2])&A,s=65535&h[p],d[b&o]=h[p],h[p]=b),0===s||(b-s&65535)>r-Yl||2!=k&&(_=se(s)),3>_)i=V(0,255&l[b]),x--,b++;else if(i=V(b-y,_-3),x-=_,_>B||3>x)b+=_,_=0,p=255&l[b],p=(p<<f^255&l[b+1])&A;else{_--;do{b++,p=(p<<f^255&l[b+2])&A,s=65535&h[p],d[b&o]=h[p],h[p]=b}while(0!=--_);b++}if(i&&(te(!1),0===t.avail_out))return 0}return te(4==e),0===t.avail_out?4==e?2:0:4==e?3:1})(g);break;case 2:D=(e=>{let i,s,a=0;for(;;){if(Yl>x){if(ie(),Yl>x&&0==e)return 0;if(0===x)break}if(3>x||(p=(p<<f^255&l[b+2])&A,a=65535&h[p],d[b&o]=h[p],h[p]=b),E=_,v=y,_=2,0!==a&&B>E&&r-Yl>=(b-a&65535)&&(2!=k&&(_=se(a)),5>=_&&(1==k||3==_&&b-y>4096)&&(_=2)),3>E||_>E)if(0!==w){if(i=V(0,255&l[b-1]),i&&te(!1),b++,x--,0===t.avail_out)return 0}else w=1,b++,x--;else{s=b+x-3,i=V(b-1-v,E-3),x-=E-1,E-=2;do{++b>s||(p=(p<<f^255&l[b+2])&A,a=65535&h[p],d[b&o]=h[p],h[p]=b)}while(0!=--E);if(w=0,_=2,b++,i&&(te(!1),0===t.avail_out))return 0}}return 0!==w&&(i=V(0,255&l[b-1]),w=0),te(4==e),0===t.avail_out?4==e?2:0:4==e?3:1})(g)}if(2!=D&&3!=D||(i=Gl),0==D||2==D)return 0===t.avail_out&&(a=-1),0;if(1==D){if(1==g)j(2,3),W(256,Ol.static_ltree),q(),9>1+H+10-N&&(j(2,3),W(256,Ol.static_ltree),q()),H=7;else if(ee(0,0,!1),3==g)for(C=0;u>C;C++)h[C]=0;if(t.flush_pending(),0===t.avail_out)return a=-1,0}}return 4!=g?0:1}}function Wl(){const e=this;e.next_in_index=0,e.next_out_index=0,e.avail_in=0,e.total_in=0,e.avail_out=0,e.total_out=0}Wl.prototype={deflateInit(e,t){const i=this;return i.dstate=new jl,t||(t=15),i.dstate.deflateInit(i,e,t)},deflate(e){const t=this;return t.dstate?t.dstate.deflate(t,e):Dl},deflateEnd(){const e=this;if(!e.dstate)return Dl;const t=e.dstate.deflateEnd();return e.dstate=null,t},deflateParams(e,t){const i=this;return i.dstate?i.dstate.deflateParams(i,e,t):Dl},deflateSetDictionary(e,t){const i=this;return i.dstate?i.dstate.deflateSetDictionary(i,e,t):Dl},read_buf(e,t,i){const s=this;let a=s.avail_in;return a>i&&(a=i),0===a?0:(s.avail_in-=a,e.set(s.next_in.subarray(s.next_in_index,s.next_in_index+a),t),s.next_in_index+=a,s.total_in+=a,a)},flush_pending(){const e=this;let t=e.dstate.pending;t>e.avail_out&&(t=e.avail_out),0!==t&&(e.next_out.set(e.dstate.pending_buf.subarray(e.dstate.pending_out,e.dstate.pending_out+t),e.next_out_index),e.next_out_index+=t,e.dstate.pending_out+=t,e.total_out+=t,e.avail_out-=t,e.dstate.pending-=t,0===e.dstate.pending&&(e.dstate.pending_out=0))}};const Jl=-2,ql=-3,Vl=-5,Zl=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],Xl=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],ec=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],tc=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],ic=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],sc=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],ac=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];function rc(){let e,t,i,s,a,r;function n(e,t,n,o,l,c,d,h,p,u,g){let A,f,m,_,v,w,b,y,x,E,C,B,S,k,I;E=0,v=n;do{i[e[t+E]]++,E++,v--}while(0!==v);if(i[0]==n)return d[0]=-1,h[0]=0,0;for(y=h[0],w=1;15>=w&&0===i[w];w++);for(b=w,w>y&&(y=w),v=15;0!==v&&0===i[v];v--);for(m=v,y>v&&(y=v),h[0]=y,k=1<<w;v>w;w++,k<<=1)if(0>(k-=i[w]))return ql;if(0>(k-=i[v]))return ql;for(i[v]+=k,r[1]=w=0,E=1,S=2;0!=--v;)r[S]=w+=i[E],S++,E++;v=0,E=0;do{0!==(w=e[t+E])&&(g[r[w]++]=v),E++}while(++v<n);for(n=r[m],r[0]=v=0,E=0,_=-1,B=-y,a[0]=0,C=0,I=0;m>=b;b++)for(A=i[b];0!=A--;){for(;b>B+y;){if(_++,B+=y,I=m-B,I=I>y?y:I,(f=1<<(w=b-B))>A+1&&(f-=A+1,S=b,I>w))for(;++w<I&&(f<<=1)>i[++S];)f-=i[S];if(I=1<<w,u[0]+I>1440)return ql;a[_]=C=u[0],u[0]+=I,0!==_?(r[_]=v,s[0]=w,s[1]=y,w=v>>>B-y,s[2]=C-a[_-1]-w,p.set(s,3*(a[_-1]+w))):d[0]=C}for(s[1]=b-B,n>E?g[E]<o?(s[0]=256>g[E]?0:96,s[2]=g[E++]):(s[0]=c[g[E]-o]+16+64,s[2]=l[g[E++]-o]):s[0]=192,f=1<<b-B,w=v>>>B;I>w;w+=f)p.set(s,3*(C+w));for(w=1<<b-1;v&w;w>>>=1)v^=w;for(v^=w,x=(1<<B)-1;(v&x)!=r[_];)_--,B-=y,x=(1<<B)-1}return 0!==k&&1!=m?Vl:0}function o(n){let o;for(e||(e=[],t=[],i=new Int32Array(16),s=[],a=new Int32Array(15),r=new Int32Array(16)),t.length<n&&(t=[]),o=0;n>o;o++)t[o]=0;for(o=0;16>o;o++)i[o]=0;for(o=0;3>o;o++)s[o]=0;a.set(i.subarray(0,15),0),r.set(i.subarray(0,16),0)}this.inflate_trees_bits=(i,s,a,r,l)=>{let c;return o(19),e[0]=0,c=n(i,0,19,19,null,null,a,s,r,e,t),c==ql?l.msg="oversubscribed dynamic bit lengths tree":c!=Vl&&0!==s[0]||(l.msg="incomplete dynamic bit lengths tree",c=ql),c},this.inflate_trees_dynamic=(i,s,a,r,l,c,d,h,p)=>{let u;return o(288),e[0]=0,u=n(a,0,i,257,tc,ic,c,r,h,e,t),0!=u||0===r[0]?(u==ql?p.msg="oversubscribed literal/length tree":-4!=u&&(p.msg="incomplete literal/length tree",u=ql),u):(o(288),u=n(a,i,s,0,sc,ac,d,l,h,e,t),0!=u||0===l[0]&&i>257?(u==ql?p.msg="oversubscribed distance tree":u==Vl?(p.msg="incomplete distance tree",u=ql):-4!=u&&(p.msg="empty distance tree with lengths",u=ql),u):0)}}function nc(){const e=this;let t,i,s,a,r=0,n=0,o=0,l=0,c=0,d=0,h=0,p=0,u=0,g=0;function A(e,t,i,s,a,r,n,o){let l,c,d,h,p,u,g,A,f,m,_,v,w,b,y,x;g=o.next_in_index,A=o.avail_in,p=n.bitb,u=n.bitk,f=n.write,m=f<n.read?n.read-f-1:n.end-f,_=Zl[e],v=Zl[t];do{for(;20>u;)A--,p|=(255&o.read_byte(g++))<<u,u+=8;if(l=p&_,c=i,d=s,x=3*(d+l),0!==(h=c[x]))for(;;){if(p>>=c[x+1],u-=c[x+1],16&h){for(h&=15,w=c[x+2]+(p&Zl[h]),p>>=h,u-=h;15>u;)A--,p|=(255&o.read_byte(g++))<<u,u+=8;for(l=p&v,c=a,d=r,x=3*(d+l),h=c[x];;){if(p>>=c[x+1],u-=c[x+1],16&h){for(h&=15;h>u;)A--,p|=(255&o.read_byte(g++))<<u,u+=8;if(b=c[x+2]+(p&Zl[h]),p>>=h,u-=h,m-=w,b>f){y=f-b;do{y+=n.end}while(0>y);if(h=n.end-y,w>h){if(w-=h,f-y>0&&h>f-y)do{n.win[f++]=n.win[y++]}while(0!=--h);else n.win.set(n.win.subarray(y,y+h),f),f+=h,y+=h,h=0;y=0}}else y=f-b,f-y>0&&2>f-y?(n.win[f++]=n.win[y++],n.win[f++]=n.win[y++],w-=2):(n.win.set(n.win.subarray(y,y+2),f),f+=2,y+=2,w-=2);if(f-y>0&&w>f-y)do{n.win[f++]=n.win[y++]}while(0!=--w);else n.win.set(n.win.subarray(y,y+w),f),f+=w,y+=w,w=0;break}if(64&h)return o.msg="invalid distance code",w=o.avail_in-A,w=w>u>>3?u>>3:w,A+=w,g-=w,u-=w<<3,n.bitb=p,n.bitk=u,o.avail_in=A,o.total_in+=g-o.next_in_index,o.next_in_index=g,n.write=f,ql;l+=c[x+2],l+=p&Zl[h],x=3*(d+l),h=c[x]}break}if(64&h)return 32&h?(w=o.avail_in-A,w=w>u>>3?u>>3:w,A+=w,g-=w,u-=w<<3,n.bitb=p,n.bitk=u,o.avail_in=A,o.total_in+=g-o.next_in_index,o.next_in_index=g,n.write=f,1):(o.msg="invalid literal/length code",w=o.avail_in-A,w=w>u>>3?u>>3:w,A+=w,g-=w,u-=w<<3,n.bitb=p,n.bitk=u,o.avail_in=A,o.total_in+=g-o.next_in_index,o.next_in_index=g,n.write=f,ql);if(l+=c[x+2],l+=p&Zl[h],x=3*(d+l),0===(h=c[x])){p>>=c[x+1],u-=c[x+1],n.win[f++]=c[x+2],m--;break}}else p>>=c[x+1],u-=c[x+1],n.win[f++]=c[x+2],m--}while(m>=258&&A>=10);return w=o.avail_in-A,w=w>u>>3?u>>3:w,A+=w,g-=w,u-=w<<3,n.bitb=p,n.bitk=u,o.avail_in=A,o.total_in+=g-o.next_in_index,o.next_in_index=g,n.write=f,0}e.init=(e,r,n,o,l,c)=>{t=0,h=e,p=r,s=n,u=o,a=l,g=c,i=null},e.proc=(e,f,m)=>{let _,v,w,b,y,x,E,C=0,B=0,S=0;for(S=f.next_in_index,b=f.avail_in,C=e.bitb,B=e.bitk,y=e.write,x=y<e.read?e.read-y-1:e.end-y;;)switch(t){case 0:if(x>=258&&b>=10&&(e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,m=A(h,p,s,u,a,g,e,f),S=f.next_in_index,b=f.avail_in,C=e.bitb,B=e.bitk,y=e.write,x=y<e.read?e.read-y-1:e.end-y,0!=m)){t=1==m?7:9;break}o=h,i=s,n=u,t=1;case 1:for(_=o;_>B;){if(0===b)return e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);m=0,b--,C|=(255&f.read_byte(S++))<<B,B+=8}if(v=3*(n+(C&Zl[_])),C>>>=i[v+1],B-=i[v+1],w=i[v],0===w){l=i[v+2],t=6;break}if(16&w){c=15&w,r=i[v+2],t=2;break}if(!(64&w)){o=w,n=v/3+i[v+2];break}if(32&w){t=7;break}return t=9,f.msg="invalid literal/length code",m=ql,e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);case 2:for(_=c;_>B;){if(0===b)return e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);m=0,b--,C|=(255&f.read_byte(S++))<<B,B+=8}r+=C&Zl[_],C>>=_,B-=_,o=p,i=a,n=g,t=3;case 3:for(_=o;_>B;){if(0===b)return e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);m=0,b--,C|=(255&f.read_byte(S++))<<B,B+=8}if(v=3*(n+(C&Zl[_])),C>>=i[v+1],B-=i[v+1],w=i[v],16&w){c=15&w,d=i[v+2],t=4;break}if(!(64&w)){o=w,n=v/3+i[v+2];break}return t=9,f.msg="invalid distance code",m=ql,e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);case 4:for(_=c;_>B;){if(0===b)return e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);m=0,b--,C|=(255&f.read_byte(S++))<<B,B+=8}d+=C&Zl[_],C>>=_,B-=_,t=5;case 5:for(E=y-d;0>E;)E+=e.end;for(;0!==r;){if(0===x&&(y==e.end&&0!==e.read&&(y=0,x=y<e.read?e.read-y-1:e.end-y),0===x&&(e.write=y,m=e.inflate_flush(f,m),y=e.write,x=y<e.read?e.read-y-1:e.end-y,y==e.end&&0!==e.read&&(y=0,x=y<e.read?e.read-y-1:e.end-y),0===x)))return e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);e.win[y++]=e.win[E++],x--,E==e.end&&(E=0),r--}t=0;break;case 6:if(0===x&&(y==e.end&&0!==e.read&&(y=0,x=y<e.read?e.read-y-1:e.end-y),0===x&&(e.write=y,m=e.inflate_flush(f,m),y=e.write,x=y<e.read?e.read-y-1:e.end-y,y==e.end&&0!==e.read&&(y=0,x=y<e.read?e.read-y-1:e.end-y),0===x)))return e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);m=0,e.win[y++]=l,x--,t=0;break;case 7:if(B>7&&(B-=8,b++,S--),e.write=y,m=e.inflate_flush(f,m),y=e.write,x=y<e.read?e.read-y-1:e.end-y,e.read!=e.write)return e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);t=8;case 8:return m=1,e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);case 9:return m=ql,e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m);default:return m=Jl,e.bitb=C,e.bitk=B,f.avail_in=b,f.total_in+=S-f.next_in_index,f.next_in_index=S,e.write=y,e.inflate_flush(f,m)}},e.free=()=>{}}rc.inflate_trees_fixed=(e,t,i,s)=>(e[0]=9,t[0]=5,i[0]=Xl,s[0]=ec,0);const oc=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function lc(e,t){const i=this;let s,a=0,r=0,n=0,o=0;const l=[0],c=[0],d=new nc;let h=0,p=new Int32Array(4320);const u=new rc;i.bitk=0,i.bitb=0,i.win=new Uint8Array(t),i.end=t,i.read=0,i.write=0,i.reset=(e,t)=>{t&&(t[0]=0),6==a&&d.free(e),a=0,i.bitk=0,i.bitb=0,i.read=i.write=0},i.reset(e,null),i.inflate_flush=(e,t)=>{let s,a,r;return a=e.next_out_index,r=i.read,s=(r>i.write?i.end:i.write)-r,s>e.avail_out&&(s=e.avail_out),0!==s&&t==Vl&&(t=0),e.avail_out-=s,e.total_out+=s,e.next_out.set(i.win.subarray(r,r+s),a),a+=s,r+=s,r==i.end&&(r=0,i.write==i.end&&(i.write=0),s=i.write-r,s>e.avail_out&&(s=e.avail_out),0!==s&&t==Vl&&(t=0),e.avail_out-=s,e.total_out+=s,e.next_out.set(i.win.subarray(r,r+s),a),a+=s,r+=s),e.next_out_index=a,i.read=r,t},i.proc=(e,t)=>{let g,A,f,m,_,v,w,b;for(m=e.next_in_index,_=e.avail_in,A=i.bitb,f=i.bitk,v=i.write,w=v<i.read?i.read-v-1:i.end-v;;){let y,x,E,C,B,S,k,I;switch(a){case 0:for(;3>f;){if(0===_)return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);t=0,_--,A|=(255&e.read_byte(m++))<<f,f+=8}switch(g=7&A,h=1&g,g>>>1){case 0:A>>>=3,f-=3,g=7&f,A>>>=g,f-=g,a=1;break;case 1:y=[],x=[],E=[[]],C=[[]],rc.inflate_trees_fixed(y,x,E,C),d.init(y[0],x[0],E[0],0,C[0],0),A>>>=3,f-=3,a=6;break;case 2:A>>>=3,f-=3,a=3;break;case 3:return A>>>=3,f-=3,a=9,e.msg="invalid block type",t=ql,i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t)}break;case 1:for(;32>f;){if(0===_)return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);t=0,_--,A|=(255&e.read_byte(m++))<<f,f+=8}if((~A>>>16&65535)!=(65535&A))return a=9,e.msg="invalid stored block lengths",t=ql,i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);r=65535&A,A=f=0,a=0!==r?2:0!==h?7:0;break;case 2:if(0===_)return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);if(0===w&&(v==i.end&&0!==i.read&&(v=0,w=v<i.read?i.read-v-1:i.end-v),0===w&&(i.write=v,t=i.inflate_flush(e,t),v=i.write,w=v<i.read?i.read-v-1:i.end-v,v==i.end&&0!==i.read&&(v=0,w=v<i.read?i.read-v-1:i.end-v),0===w)))return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);if(t=0,g=r,g>_&&(g=_),g>w&&(g=w),i.win.set(e.read_buf(m,g),v),m+=g,_-=g,v+=g,w-=g,0!=(r-=g))break;a=0!==h?7:0;break;case 3:for(;14>f;){if(0===_)return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);t=0,_--,A|=(255&e.read_byte(m++))<<f,f+=8}if(n=g=16383&A,(31&g)>29||(g>>5&31)>29)return a=9,e.msg="too many length or distance symbols",t=ql,i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);if(g=258+(31&g)+(g>>5&31),!s||s.length<g)s=[];else for(b=0;g>b;b++)s[b]=0;A>>>=14,f-=14,o=0,a=4;case 4:for(;4+(n>>>10)>o;){for(;3>f;){if(0===_)return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);t=0,_--,A|=(255&e.read_byte(m++))<<f,f+=8}s[oc[o++]]=7&A,A>>>=3,f-=3}for(;19>o;)s[oc[o++]]=0;if(l[0]=7,g=u.inflate_trees_bits(s,l,c,p,e),0!=g)return(t=g)==ql&&(s=null,a=9),i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);o=0,a=5;case 5:for(;g=n,258+(31&g)+(g>>5&31)>o;){let r,d;for(g=l[0];g>f;){if(0===_)return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);t=0,_--,A|=(255&e.read_byte(m++))<<f,f+=8}if(g=p[3*(c[0]+(A&Zl[g]))+1],d=p[3*(c[0]+(A&Zl[g]))+2],16>d)A>>>=g,f-=g,s[o++]=d;else{for(b=18==d?7:d-14,r=18==d?11:3;g+b>f;){if(0===_)return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);t=0,_--,A|=(255&e.read_byte(m++))<<f,f+=8}if(A>>>=g,f-=g,r+=A&Zl[b],A>>>=b,f-=b,b=o,g=n,b+r>258+(31&g)+(g>>5&31)||16==d&&1>b)return s=null,a=9,e.msg="invalid bit length repeat",t=ql,i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);d=16==d?s[b-1]:0;do{s[b++]=d}while(0!=--r);o=b}}if(c[0]=-1,B=[],S=[],k=[],I=[],B[0]=9,S[0]=6,g=n,g=u.inflate_trees_dynamic(257+(31&g),1+(g>>5&31),s,B,S,k,I,p,e),0!=g)return g==ql&&(s=null,a=9),t=g,i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);d.init(B[0],S[0],p,k[0],p,I[0]),a=6;case 6:if(i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,1!=(t=d.proc(i,e,t)))return i.inflate_flush(e,t);if(t=0,d.free(e),m=e.next_in_index,_=e.avail_in,A=i.bitb,f=i.bitk,v=i.write,w=v<i.read?i.read-v-1:i.end-v,0===h){a=0;break}a=7;case 7:if(i.write=v,t=i.inflate_flush(e,t),v=i.write,w=v<i.read?i.read-v-1:i.end-v,i.read!=i.write)return i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);a=8;case 8:return t=1,i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);case 9:return t=ql,i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t);default:return t=Jl,i.bitb=A,i.bitk=f,e.avail_in=_,e.total_in+=m-e.next_in_index,e.next_in_index=m,i.write=v,i.inflate_flush(e,t)}}},i.free=e=>{i.reset(e,null),i.win=null,p=null},i.set_dictionary=(e,t,s)=>{i.win.set(e.subarray(t,t+s),0),i.read=i.write=s},i.sync_point=()=>1==a?1:0}const cc=13,dc=[0,0,255,255];function hc(){const e=this;function t(e){return e&&e.istate?(e.total_in=e.total_out=0,e.msg=null,e.istate.mode=7,e.istate.blocks.reset(e,null),0):Jl}e.mode=0,e.method=0,e.was=[0],e.need=0,e.marker=0,e.wbits=0,e.inflateEnd=t=>(e.blocks&&e.blocks.free(t),e.blocks=null,0),e.inflateInit=(i,s)=>(i.msg=null,e.blocks=null,8>s||s>15?(e.inflateEnd(i),Jl):(e.wbits=s,i.istate.blocks=new lc(i,1<<s),t(i),0)),e.inflate=(e,t)=>{let i,s;if(!e||!e.istate||!e.next_in)return Jl;const a=e.istate;for(t=4==t?Vl:0,i=Vl;;)switch(a.mode){case 0:if(0===e.avail_in)return i;if(i=t,e.avail_in--,e.total_in++,8!=(15&(a.method=e.read_byte(e.next_in_index++)))){a.mode=cc,e.msg="unknown compression method",a.marker=5;break}if(8+(a.method>>4)>a.wbits){a.mode=cc,e.msg="invalid win size",a.marker=5;break}a.mode=1;case 1:if(0===e.avail_in)return i;if(i=t,e.avail_in--,e.total_in++,s=255&e.read_byte(e.next_in_index++),((a.method<<8)+s)%31!=0){a.mode=cc,e.msg="incorrect header check",a.marker=5;break}if(!(32&s)){a.mode=7;break}a.mode=2;case 2:if(0===e.avail_in)return i;i=t,e.avail_in--,e.total_in++,a.need=(255&e.read_byte(e.next_in_index++))<<24&4278190080,a.mode=3;case 3:if(0===e.avail_in)return i;i=t,e.avail_in--,e.total_in++,a.need+=(255&e.read_byte(e.next_in_index++))<<16&16711680,a.mode=4;case 4:if(0===e.avail_in)return i;i=t,e.avail_in--,e.total_in++,a.need+=(255&e.read_byte(e.next_in_index++))<<8&65280,a.mode=5;case 5:return 0===e.avail_in?i:(i=t,e.avail_in--,e.total_in++,a.need+=255&e.read_byte(e.next_in_index++),a.mode=6,2);case 6:return a.mode=cc,e.msg="need dictionary",a.marker=0,Jl;case 7:if(i=a.blocks.proc(e,i),i==ql){a.mode=cc,a.marker=0;break}if(0==i&&(i=t),1!=i)return i;i=t,a.blocks.reset(e,a.was),a.mode=12;case 12:return e.avail_in=0,1;case cc:return ql;default:return Jl}},e.inflateSetDictionary=(e,t,i)=>{let s=0,a=i;if(!e||!e.istate||6!=e.istate.mode)return Jl;const r=e.istate;return a<1<<r.wbits||(a=(1<<r.wbits)-1,s=i-a),r.blocks.set_dictionary(t,s,a),r.mode=7,0},e.inflateSync=e=>{let i,s,a,r,n;if(!e||!e.istate)return Jl;const o=e.istate;if(o.mode!=cc&&(o.mode=cc,o.marker=0),0===(i=e.avail_in))return Vl;for(s=e.next_in_index,a=o.marker;0!==i&&4>a;)e.read_byte(s)==dc[a]?a++:a=0!==e.read_byte(s)?0:4-a,s++,i--;return e.total_in+=s-e.next_in_index,e.next_in_index=s,e.avail_in=i,o.marker=a,4!=a?ql:(r=e.total_in,n=e.total_out,t(e),e.total_in=r,e.total_out=n,o.mode=7,0)},e.inflateSyncPoint=e=>e&&e.istate&&e.istate.blocks?e.istate.blocks.sync_point():Jl}function pc(){}pc.prototype={inflateInit(e){const t=this;return t.istate=new hc,e||(e=15),t.istate.inflateInit(t,e)},inflate(e){const t=this;return t.istate?t.istate.inflate(t,e):Jl},inflateEnd(){const e=this;if(!e.istate)return Jl;const t=e.istate.inflateEnd(e);return e.istate=null,t},inflateSync(){const e=this;return e.istate?e.istate.inflateSync(e):Jl},inflateSetDictionary(e,t){const i=this;return i.istate?i.istate.inflateSetDictionary(i,e,t):Jl},read_byte(e){return this.next_in[e]},read_buf(e,t){return this.next_in.subarray(e,e+t)}};const uc=4294967295,gc=65535,Ac=33639248,fc=101075792,mc=void 0,_c="undefined",vc="function";let wc=class{constructor(e){return class extends TransformStream{constructor(t,i){const s=new e(i);super({transform(e,t){t.enqueue(s.append(e))},flush(e){const t=s.flush();t&&e.enqueue(t)}})}}}},bc=2;try{typeof navigator!=_c&&navigator.hardwareConcurrency&&(bc=navigator.hardwareConcurrency)}catch(e){}const yc={chunkSize:524288,maxWorkers:bc,terminateWorkerTimeout:5e3,useWebWorkers:!0,useCompressionStream:!0,workerScripts:mc,CompressionStreamNative:typeof CompressionStream!=_c&&CompressionStream,DecompressionStreamNative:typeof DecompressionStream!=_c&&DecompressionStream},xc=Object.assign({},yc);function Ec(e){const{baseURL:t,chunkSize:i,maxWorkers:s,terminateWorkerTimeout:a,useCompressionStream:r,useWebWorkers:n,Deflate:o,Inflate:l,CompressionStream:c,DecompressionStream:d,workerScripts:h}=e;if(Cc("baseURL",t),Cc("chunkSize",i),Cc("maxWorkers",s),Cc("terminateWorkerTimeout",a),Cc("useCompressionStream",r),Cc("useWebWorkers",n),o&&(xc.CompressionStream=new wc(o)),l&&(xc.DecompressionStream=new wc(l)),Cc("CompressionStream",c),Cc("DecompressionStream",d),h!==mc){const{deflate:e,inflate:t}=h;if((e||t)&&(xc.workerScripts||(xc.workerScripts={})),e){if(!Array.isArray(e))throw Error("workerScripts.deflate must be an array");xc.workerScripts.deflate=e}if(t){if(!Array.isArray(t))throw Error("workerScripts.inflate must be an array");xc.workerScripts.inflate=t}}}function Cc(e,t){t!==mc&&(xc[e]=t)}const Bc={application:{"andrew-inset":"ez",annodex:"anx","atom+xml":"atom","atomcat+xml":"atomcat","atomserv+xml":"atomsrv",bbolin:"lin","cu-seeme":"cu","davmount+xml":"davmount",dsptype:"tsp",ecmascript:["es","ecma"],futuresplash:"spl",hta:"hta","java-archive":"jar","java-serialized-object":"ser","java-vm":"class",m3g:"m3g","mac-binhex40":"hqx",mathematica:["nb","ma","mb"],msaccess:"mdb",msword:["doc","dot","wiz"],mxf:"mxf",oda:"oda",ogg:"ogx",pdf:"pdf","pgp-keys":"key","pgp-signature":["asc","sig"],"pics-rules":"prf",postscript:["ps","ai","eps","epsi","epsf","eps2","eps3"],rar:"rar","rdf+xml":"rdf","rss+xml":"rss",rtf:"rtf","xhtml+xml":["xhtml","xht"],xml:["xml","xsl","xsd","xpdl"],"xspf+xml":"xspf",zip:"zip","vnd.android.package-archive":"apk","vnd.cinderella":"cdy","vnd.google-earth.kml+xml":"kml","vnd.google-earth.kmz":"kmz","vnd.mozilla.xul+xml":"xul","vnd.ms-excel":["xls","xlb","xlt","xlm","xla","xlc","xlw"],"vnd.ms-pki.seccat":"cat","vnd.ms-pki.stl":"stl","vnd.ms-powerpoint":["ppt","pps","pot","ppa","pwz"],"vnd.oasis.opendocument.chart":"odc","vnd.oasis.opendocument.database":"odb","vnd.oasis.opendocument.formula":"odf","vnd.oasis.opendocument.graphics":"odg","vnd.oasis.opendocument.graphics-template":"otg","vnd.oasis.opendocument.image":"odi","vnd.oasis.opendocument.presentation":"odp","vnd.oasis.opendocument.presentation-template":"otp","vnd.oasis.opendocument.spreadsheet":"ods","vnd.oasis.opendocument.spreadsheet-template":"ots","vnd.oasis.opendocument.text":"odt","vnd.oasis.opendocument.text-master":["odm","otm"],"vnd.oasis.opendocument.text-template":"ott","vnd.oasis.opendocument.text-web":"oth","vnd.openxmlformats-officedocument.spreadsheetml.sheet":"xlsx","vnd.openxmlformats-officedocument.spreadsheetml.template":"xltx","vnd.openxmlformats-officedocument.presentationml.presentation":"pptx","vnd.openxmlformats-officedocument.presentationml.slideshow":"ppsx","vnd.openxmlformats-officedocument.presentationml.template":"potx","vnd.openxmlformats-officedocument.wordprocessingml.document":"docx","vnd.openxmlformats-officedocument.wordprocessingml.template":"dotx","vnd.smaf":"mmf","vnd.stardivision.calc":"sdc","vnd.stardivision.chart":"sds","vnd.stardivision.draw":"sda","vnd.stardivision.impress":"sdd","vnd.stardivision.math":["sdf","smf"],"vnd.stardivision.writer":["sdw","vor"],"vnd.stardivision.writer-global":"sgl","vnd.sun.xml.calc":"sxc","vnd.sun.xml.calc.template":"stc","vnd.sun.xml.draw":"sxd","vnd.sun.xml.draw.template":"std","vnd.sun.xml.impress":"sxi","vnd.sun.xml.impress.template":"sti","vnd.sun.xml.math":"sxm","vnd.sun.xml.writer":"sxw","vnd.sun.xml.writer.global":"sxg","vnd.sun.xml.writer.template":"stw","vnd.symbian.install":["sis","sisx"],"vnd.visio":["vsd","vst","vss","vsw","vsdx","vssx","vstx","vssm","vstm"],"vnd.wap.wbxml":"wbxml","vnd.wap.wmlc":"wmlc","vnd.wap.wmlscriptc":"wmlsc","vnd.wordperfect":"wpd","vnd.wordperfect5.1":"wp5","x-123":"wk","x-7z-compressed":"7z","x-abiword":"abw","x-apple-diskimage":"dmg","x-bcpio":"bcpio","x-bittorrent":"torrent","x-cbr":["cbr","cba","cbt","cb7"],"x-cbz":"cbz","x-cdf":["cdf","cda"],"x-cdlink":"vcd","x-chess-pgn":"pgn","x-cpio":"cpio","x-csh":"csh","x-director":["dir","dxr","cst","cct","cxt","w3d","fgd","swa"],"x-dms":"dms","x-doom":"wad","x-dvi":"dvi","x-httpd-eruby":"rhtml","x-font":"pcf.Z","x-freemind":"mm","x-gnumeric":"gnumeric","x-go-sgf":"sgf","x-graphing-calculator":"gcf","x-gtar":["gtar","taz"],"x-hdf":"hdf","x-httpd-php":["phtml","pht","php"],"x-httpd-php-source":"phps","x-httpd-php3":"php3","x-httpd-php3-preprocessed":"php3p","x-httpd-php4":"php4","x-httpd-php5":"php5","x-ica":"ica","x-info":"info","x-internet-signup":["ins","isp"],"x-iphone":"iii","x-iso9660-image":"iso","x-java-jnlp-file":"jnlp","x-jmol":"jmz","x-killustrator":"kil","x-latex":"latex","x-lyx":"lyx","x-lzx":"lzx","x-maker":["frm","fb","fbdoc"],"x-ms-wmd":"wmd","x-msdos-program":["com","exe","bat","dll"],"x-netcdf":["nc"],"x-ns-proxy-autoconfig":["pac","dat"],"x-nwc":"nwc","x-object":"o","x-oz-application":"oza","x-pkcs7-certreqresp":"p7r","x-python-code":["pyc","pyo"],"x-qgis":["qgs","shp","shx"],"x-quicktimeplayer":"qtl","x-redhat-package-manager":["rpm","rpa"],"x-ruby":"rb","x-sh":"sh","x-shar":"shar","x-shockwave-flash":["swf","swfl"],"x-silverlight":"scr","x-stuffit":"sit","x-sv4cpio":"sv4cpio","x-sv4crc":"sv4crc","x-tar":"tar","x-tex-gf":"gf","x-tex-pk":"pk","x-texinfo":["texinfo","texi"],"x-trash":["~","%","bak","old","sik"],"x-ustar":"ustar","x-wais-source":"src","x-wingz":"wz","x-x509-ca-cert":["crt","der","cer"],"x-xcf":"xcf","x-xfig":"fig","x-xpinstall":"xpi",applixware:"aw","atomsvc+xml":"atomsvc","ccxml+xml":"ccxml","cdmi-capability":"cdmia","cdmi-container":"cdmic","cdmi-domain":"cdmid","cdmi-object":"cdmio","cdmi-queue":"cdmiq","docbook+xml":"dbk","dssc+der":"dssc","dssc+xml":"xdssc","emma+xml":"emma","epub+zip":"epub",exi:"exi","font-tdpfr":"pfr","gml+xml":"gml","gpx+xml":"gpx",gxf:"gxf",hyperstudio:"stk","inkml+xml":["ink","inkml"],ipfix:"ipfix","jsonml+json":"jsonml","lost+xml":"lostxml","mads+xml":"mads",marc:"mrc","marcxml+xml":"mrcx","mathml+xml":["mathml","mml"],mbox:"mbox","mediaservercontrol+xml":"mscml","metalink+xml":"metalink","metalink4+xml":"meta4","mets+xml":"mets","mods+xml":"mods",mp21:["m21","mp21"],mp4:"mp4s","oebps-package+xml":"opf","omdoc+xml":"omdoc",onenote:["onetoc","onetoc2","onetmp","onepkg"],oxps:"oxps","patch-ops-error+xml":"xer","pgp-encrypted":"pgp",pkcs10:"p10","pkcs7-mime":["p7m","p7c"],"pkcs7-signature":"p7s",pkcs8:"p8","pkix-attr-cert":"ac","pkix-crl":"crl","pkix-pkipath":"pkipath",pkixcmp:"pki","pls+xml":"pls","prs.cww":"cww","pskc+xml":"pskcxml","reginfo+xml":"rif","relax-ng-compact-syntax":"rnc","resource-lists+xml":"rl","resource-lists-diff+xml":"rld","rls-services+xml":"rs","rpki-ghostbusters":"gbr","rpki-manifest":"mft","rpki-roa":"roa","rsd+xml":"rsd","sbml+xml":"sbml","scvp-cv-request":"scq","scvp-cv-response":"scs","scvp-vp-request":"spq","scvp-vp-response":"spp",sdp:"sdp","set-payment-initiation":"setpay","set-registration-initiation":"setreg","shf+xml":"shf","sparql-query":"rq","sparql-results+xml":"srx",srgs:"gram","srgs+xml":"grxml","sru+xml":"sru","ssdl+xml":"ssdl","ssml+xml":"ssml","tei+xml":["tei","teicorpus"],"thraud+xml":"tfi","timestamped-data":"tsd","vnd.3gpp.pic-bw-large":"plb","vnd.3gpp.pic-bw-small":"psb","vnd.3gpp.pic-bw-var":"pvb","vnd.3gpp2.tcap":"tcap","vnd.3m.post-it-notes":"pwn","vnd.accpac.simply.aso":"aso","vnd.accpac.simply.imp":"imp","vnd.acucobol":"acu","vnd.acucorp":["atc","acutc"],"vnd.adobe.air-application-installer-package+zip":"air","vnd.adobe.formscentral.fcdt":"fcdt","vnd.adobe.fxp":["fxp","fxpl"],"vnd.adobe.xdp+xml":"xdp","vnd.adobe.xfdf":"xfdf","vnd.ahead.space":"ahead","vnd.airzip.filesecure.azf":"azf","vnd.airzip.filesecure.azs":"azs","vnd.amazon.ebook":"azw","vnd.americandynamics.acc":"acc","vnd.amiga.ami":"ami","vnd.anser-web-certificate-issue-initiation":"cii","vnd.anser-web-funds-transfer-initiation":"fti","vnd.antix.game-component":"atx","vnd.apple.installer+xml":"mpkg","vnd.apple.mpegurl":"m3u8","vnd.aristanetworks.swi":"swi","vnd.astraea-software.iota":"iota","vnd.audiograph":"aep","vnd.blueice.multipass":"mpm","vnd.bmi":"bmi","vnd.businessobjects":"rep","vnd.chemdraw+xml":"cdxml","vnd.chipnuts.karaoke-mmd":"mmd","vnd.claymore":"cla","vnd.cloanto.rp9":"rp9","vnd.clonk.c4group":["c4g","c4d","c4f","c4p","c4u"],"vnd.cluetrust.cartomobile-config":"c11amc","vnd.cluetrust.cartomobile-config-pkg":"c11amz","vnd.commonspace":"csp","vnd.contact.cmsg":"cdbcmsg","vnd.cosmocaller":"cmc","vnd.crick.clicker":"clkx","vnd.crick.clicker.keyboard":"clkk","vnd.crick.clicker.palette":"clkp","vnd.crick.clicker.template":"clkt","vnd.crick.clicker.wordbank":"clkw","vnd.criticaltools.wbs+xml":"wbs","vnd.ctc-posml":"pml","vnd.cups-ppd":"ppd","vnd.curl.car":"car","vnd.curl.pcurl":"pcurl","vnd.dart":"dart","vnd.data-vision.rdz":"rdz","vnd.dece.data":["uvf","uvvf","uvd","uvvd"],"vnd.dece.ttml+xml":["uvt","uvvt"],"vnd.dece.unspecified":["uvx","uvvx"],"vnd.dece.zip":["uvz","uvvz"],"vnd.denovo.fcselayout-link":"fe_launch","vnd.dna":"dna","vnd.dolby.mlp":"mlp","vnd.dpgraph":"dpg","vnd.dreamfactory":"dfac","vnd.ds-keypoint":"kpxx","vnd.dvb.ait":"ait","vnd.dvb.service":"svc","vnd.dynageo":"geo","vnd.ecowin.chart":"mag","vnd.enliven":"nml","vnd.epson.esf":"esf","vnd.epson.msf":"msf","vnd.epson.quickanime":"qam","vnd.epson.salt":"slt","vnd.epson.ssf":"ssf","vnd.eszigno3+xml":["es3","et3"],"vnd.ezpix-album":"ez2","vnd.ezpix-package":"ez3","vnd.fdf":"fdf","vnd.fdsn.mseed":"mseed","vnd.fdsn.seed":["seed","dataless"],"vnd.flographit":"gph","vnd.fluxtime.clip":"ftc","vnd.framemaker":["fm","frame","maker","book"],"vnd.frogans.fnc":"fnc","vnd.frogans.ltf":"ltf","vnd.fsc.weblaunch":"fsc","vnd.fujitsu.oasys":"oas","vnd.fujitsu.oasys2":"oa2","vnd.fujitsu.oasys3":"oa3","vnd.fujitsu.oasysgp":"fg5","vnd.fujitsu.oasysprs":"bh2","vnd.fujixerox.ddd":"ddd","vnd.fujixerox.docuworks":"xdw","vnd.fujixerox.docuworks.binder":"xbd","vnd.fuzzysheet":"fzs","vnd.genomatix.tuxedo":"txd","vnd.geogebra.file":"ggb","vnd.geogebra.tool":"ggt","vnd.geometry-explorer":["gex","gre"],"vnd.geonext":"gxt","vnd.geoplan":"g2w","vnd.geospace":"g3w","vnd.gmx":"gmx","vnd.grafeq":["gqf","gqs"],"vnd.groove-account":"gac","vnd.groove-help":"ghf","vnd.groove-identity-message":"gim","vnd.groove-injector":"grv","vnd.groove-tool-message":"gtm","vnd.groove-tool-template":"tpl","vnd.groove-vcard":"vcg","vnd.hal+xml":"hal","vnd.handheld-entertainment+xml":"zmm","vnd.hbci":"hbci","vnd.hhe.lesson-player":"les","vnd.hp-hpgl":"hpgl","vnd.hp-hpid":"hpid","vnd.hp-hps":"hps","vnd.hp-jlyt":"jlt","vnd.hp-pcl":"pcl","vnd.hp-pclxl":"pclxl","vnd.hydrostatix.sof-data":"sfd-hdstx","vnd.ibm.minipay":"mpy","vnd.ibm.modcap":["afp","listafp","list3820"],"vnd.ibm.rights-management":"irm","vnd.ibm.secure-container":"sc","vnd.iccprofile":["icc","icm"],"vnd.igloader":"igl","vnd.immervision-ivp":"ivp","vnd.immervision-ivu":"ivu","vnd.insors.igm":"igm","vnd.intercon.formnet":["xpw","xpx"],"vnd.intergeo":"i2g","vnd.intu.qbo":"qbo","vnd.intu.qfx":"qfx","vnd.ipunplugged.rcprofile":"rcprofile","vnd.irepository.package+xml":"irp","vnd.is-xpr":"xpr","vnd.isac.fcs":"fcs","vnd.jam":"jam","vnd.jcp.javame.midlet-rms":"rms","vnd.jisp":"jisp","vnd.joost.joda-archive":"joda","vnd.kahootz":["ktz","ktr"],"vnd.kde.karbon":"karbon","vnd.kde.kchart":"chrt","vnd.kde.kformula":"kfo","vnd.kde.kivio":"flw","vnd.kde.kontour":"kon","vnd.kde.kpresenter":["kpr","kpt"],"vnd.kde.kspread":"ksp","vnd.kde.kword":["kwd","kwt"],"vnd.kenameaapp":"htke","vnd.kidspiration":"kia","vnd.kinar":["kne","knp"],"vnd.koan":["skp","skd","skt","skm"],"vnd.kodak-descriptor":"sse","vnd.las.las+xml":"lasxml","vnd.llamagraphics.life-balance.desktop":"lbd","vnd.llamagraphics.life-balance.exchange+xml":"lbe","vnd.lotus-1-2-3":"123","vnd.lotus-approach":"apr","vnd.lotus-freelance":"pre","vnd.lotus-notes":"nsf","vnd.lotus-organizer":"org","vnd.lotus-screencam":"scm","vnd.lotus-wordpro":"lwp","vnd.macports.portpkg":"portpkg","vnd.mcd":"mcd","vnd.medcalcdata":"mc1","vnd.mediastation.cdkey":"cdkey","vnd.mfer":"mwf","vnd.mfmp":"mfm","vnd.micrografx.flo":"flo","vnd.micrografx.igx":"igx","vnd.mif":"mif","vnd.mobius.daf":"daf","vnd.mobius.dis":"dis","vnd.mobius.mbk":"mbk","vnd.mobius.mqy":"mqy","vnd.mobius.msl":"msl","vnd.mobius.plc":"plc","vnd.mobius.txf":"txf","vnd.mophun.application":"mpn","vnd.mophun.certificate":"mpc","vnd.ms-artgalry":"cil","vnd.ms-cab-compressed":"cab","vnd.ms-excel.addin.macroenabled.12":"xlam","vnd.ms-excel.sheet.binary.macroenabled.12":"xlsb","vnd.ms-excel.sheet.macroenabled.12":"xlsm","vnd.ms-excel.template.macroenabled.12":"xltm","vnd.ms-fontobject":"eot","vnd.ms-htmlhelp":"chm","vnd.ms-ims":"ims","vnd.ms-lrm":"lrm","vnd.ms-officetheme":"thmx","vnd.ms-powerpoint.addin.macroenabled.12":"ppam","vnd.ms-powerpoint.presentation.macroenabled.12":"pptm","vnd.ms-powerpoint.slide.macroenabled.12":"sldm","vnd.ms-powerpoint.slideshow.macroenabled.12":"ppsm","vnd.ms-powerpoint.template.macroenabled.12":"potm","vnd.ms-project":["mpp","mpt"],"vnd.ms-word.document.macroenabled.12":"docm","vnd.ms-word.template.macroenabled.12":"dotm","vnd.ms-works":["wps","wks","wcm","wdb"],"vnd.ms-wpl":"wpl","vnd.ms-xpsdocument":"xps","vnd.mseq":"mseq","vnd.musician":"mus","vnd.muvee.style":"msty","vnd.mynfc":"taglet","vnd.neurolanguage.nlu":"nlu","vnd.nitf":["ntf","nitf"],"vnd.noblenet-directory":"nnd","vnd.noblenet-sealer":"nns","vnd.noblenet-web":"nnw","vnd.nokia.n-gage.data":"ngdat","vnd.nokia.n-gage.symbian.install":"n-gage","vnd.nokia.radio-preset":"rpst","vnd.nokia.radio-presets":"rpss","vnd.novadigm.edm":"edm","vnd.novadigm.edx":"edx","vnd.novadigm.ext":"ext","vnd.oasis.opendocument.chart-template":"otc","vnd.oasis.opendocument.formula-template":"odft","vnd.oasis.opendocument.image-template":"oti","vnd.olpc-sugar":"xo","vnd.oma.dd2+xml":"dd2","vnd.openofficeorg.extension":"oxt","vnd.openxmlformats-officedocument.presentationml.slide":"sldx","vnd.osgeo.mapguide.package":"mgp","vnd.osgi.dp":"dp","vnd.osgi.subsystem":"esa","vnd.palm":["pdb","pqa","oprc"],"vnd.pawaafile":"paw","vnd.pg.format":"str","vnd.pg.osasli":"ei6","vnd.picsel":"efif","vnd.pmi.widget":"wg","vnd.pocketlearn":"plf","vnd.powerbuilder6":"pbd","vnd.previewsystems.box":"box","vnd.proteus.magazine":"mgz","vnd.publishare-delta-tree":"qps","vnd.pvi.ptid1":"ptid","vnd.quark.quarkxpress":["qxd","qxt","qwd","qwt","qxl","qxb"],"vnd.realvnc.bed":"bed","vnd.recordare.musicxml":"mxl","vnd.recordare.musicxml+xml":"musicxml","vnd.rig.cryptonote":"cryptonote","vnd.rn-realmedia":"rm","vnd.rn-realmedia-vbr":"rmvb","vnd.route66.link66+xml":"link66","vnd.sailingtracker.track":"st","vnd.seemail":"see","vnd.sema":"sema","vnd.semd":"semd","vnd.semf":"semf","vnd.shana.informed.formdata":"ifm","vnd.shana.informed.formtemplate":"itp","vnd.shana.informed.interchange":"iif","vnd.shana.informed.package":"ipk","vnd.simtech-mindmapper":["twd","twds"],"vnd.smart.teacher":"teacher","vnd.solent.sdkm+xml":["sdkm","sdkd"],"vnd.spotfire.dxp":"dxp","vnd.spotfire.sfs":"sfs","vnd.stepmania.package":"smzip","vnd.stepmania.stepchart":"sm","vnd.sus-calendar":["sus","susp"],"vnd.svd":"svd","vnd.syncml+xml":"xsm","vnd.syncml.dm+wbxml":"bdm","vnd.syncml.dm+xml":"xdm","vnd.tao.intent-module-archive":"tao","vnd.tcpdump.pcap":["pcap","cap","dmp"],"vnd.tmobile-livetv":"tmo","vnd.trid.tpt":"tpt","vnd.triscape.mxs":"mxs","vnd.trueapp":"tra","vnd.ufdl":["ufd","ufdl"],"vnd.uiq.theme":"utz","vnd.umajin":"umj","vnd.unity":"unityweb","vnd.uoml+xml":"uoml","vnd.vcx":"vcx","vnd.visionary":"vis","vnd.vsf":"vsf","vnd.webturbo":"wtb","vnd.wolfram.player":"nbp","vnd.wqd":"wqd","vnd.wt.stf":"stf","vnd.xara":"xar","vnd.xfdl":"xfdl","vnd.yamaha.hv-dic":"hvd","vnd.yamaha.hv-script":"hvs","vnd.yamaha.hv-voice":"hvp","vnd.yamaha.openscoreformat":"osf","vnd.yamaha.openscoreformat.osfpvg+xml":"osfpvg","vnd.yamaha.smaf-audio":"saf","vnd.yamaha.smaf-phrase":"spf","vnd.yellowriver-custom-menu":"cmp","vnd.zul":["zir","zirz"],"vnd.zzazz.deck+xml":"zaz","voicexml+xml":"vxml",widget:"wgt",winhlp:"hlp","wsdl+xml":"wsdl","wspolicy+xml":"wspolicy","x-ace-compressed":"ace","x-authorware-bin":["aab","x32","u32","vox"],"x-authorware-map":"aam","x-authorware-seg":"aas","x-blorb":["blb","blorb"],"x-bzip":"bz","x-bzip2":["bz2","boz"],"x-cfs-compressed":"cfs","x-chat":"chat","x-conference":"nsc","x-dgc-compressed":"dgc","x-dtbncx+xml":"ncx","x-dtbook+xml":"dtb","x-dtbresource+xml":"res","x-eva":"eva","x-font-bdf":"bdf","x-font-ghostscript":"gsf","x-font-linux-psf":"psf","x-font-pcf":"pcf","x-font-snf":"snf","x-font-ttf":["ttf","ttc"],"x-font-type1":["pfa","pfb","pfm","afm"],"x-freearc":"arc","x-gca-compressed":"gca","x-glulx":"ulx","x-gramps-xml":"gramps","x-install-instructions":"install","x-lzh-compressed":["lzh","lha"],"x-mie":"mie","x-mobipocket-ebook":["prc","mobi"],"x-ms-application":"application","x-ms-shortcut":"lnk","x-ms-xbap":"xbap","x-msbinder":"obd","x-mscardfile":"crd","x-msclip":"clp","application/x-ms-installer":"msi","x-msmediaview":["mvb","m13","m14"],"x-msmetafile":["wmf","wmz","emf","emz"],"x-msmoney":"mny","x-mspublisher":"pub","x-msschedule":"scd","x-msterminal":"trm","x-mswrite":"wri","x-nzb":"nzb","x-pkcs12":["p12","pfx"],"x-pkcs7-certificates":["p7b","spc"],"x-research-info-systems":"ris","x-silverlight-app":"xap","x-sql":"sql","x-stuffitx":"sitx","x-subrip":"srt","x-t3vm-image":"t3","x-tex-tfm":"tfm","x-tgif":"obj","x-xliff+xml":"xlf","x-xz":"xz","x-zmachine":["z1","z2","z3","z4","z5","z6","z7","z8"],"xaml+xml":"xaml","xcap-diff+xml":"xdf","xenc+xml":"xenc","xml-dtd":"dtd","xop+xml":"xop","xproc+xml":"xpl","xslt+xml":"xslt","xv+xml":["mxml","xhvml","xvml","xvm"],yang:"yang","yin+xml":"yin",envoy:"evy",fractals:"fif","internet-property-stream":"acx",olescript:"axs","vnd.ms-outlook":"msg","vnd.ms-pkicertstore":"sst","x-compress":"z","x-perfmon":["pma","pmc","pmr","pmw"],"ynd.ms-pkipko":"pko",gzip:["gz","tgz"],"smil+xml":["smi","smil"],"vnd.debian.binary-package":["deb","udeb"],"vnd.hzn-3d-crossword":"x3d","vnd.sqlite3":["db","sqlite","sqlite3","db-wal","sqlite-wal","db-shm","sqlite-shm"],"vnd.wap.sic":"sic","vnd.wap.slc":"slc","x-krita":["kra","krz"],"x-perl":["pm","pl"],yaml:["yaml","yml"]},audio:{amr:"amr","amr-wb":"awb",annodex:"axa",basic:["au","snd"],flac:"flac",midi:["mid","midi","kar","rmi"],mpeg:["mpga","mpega","mp3","m4a","mp2a","m2a","m3a"],mpegurl:"m3u",ogg:["oga","ogg","spx"],"prs.sid":"sid","x-aiff":"aifc","x-gsm":"gsm","x-ms-wma":"wma","x-ms-wax":"wax","x-pn-realaudio":"ram","x-realaudio":"ra","x-sd2":"sd2",adpcm:"adp",mp4:"mp4a",s3m:"s3m",silk:"sil","vnd.dece.audio":["uva","uvva"],"vnd.digital-winds":"eol","vnd.dra":"dra","vnd.dts":"dts","vnd.dts.hd":"dtshd","vnd.lucent.voice":"lvp","vnd.ms-playready.media.pya":"pya","vnd.nuera.ecelp4800":"ecelp4800","vnd.nuera.ecelp7470":"ecelp7470","vnd.nuera.ecelp9600":"ecelp9600","vnd.rip":"rip",webm:"weba","x-caf":"caf","x-matroska":"mka","x-pn-realaudio-plugin":"rmp",xm:"xm",aac:"aac",aiff:["aiff","aif","aff"],opus:"opus",wav:"wav"},chemical:{"x-alchemy":"alc","x-cache":["cac","cache"],"x-cache-csf":"csf","x-cactvs-binary":["cbin","cascii","ctab"],"x-cdx":"cdx","x-chem3d":"c3d","x-cif":"cif","x-cmdf":"cmdf","x-cml":"cml","x-compass":"cpa","x-crossfire":"bsd","x-csml":["csml","csm"],"x-ctx":"ctx","x-cxf":["cxf","cef"],"x-embl-dl-nucleotide":["emb","embl"],"x-gamess-input":["inp","gam","gamin"],"x-gaussian-checkpoint":["fch","fchk"],"x-gaussian-cube":"cub","x-gaussian-input":["gau","gjc","gjf"],"x-gaussian-log":"gal","x-gcg8-sequence":"gcg","x-genbank":"gen","x-hin":"hin","x-isostar":["istr","ist"],"x-jcamp-dx":["jdx","dx"],"x-kinemage":"kin","x-macmolecule":"mcm","x-macromodel-input":"mmod","x-mdl-molfile":"mol","x-mdl-rdfile":"rd","x-mdl-rxnfile":"rxn","x-mdl-sdfile":"sd","x-mdl-tgf":"tgf","x-mmcif":"mcif","x-mol2":"mol2","x-molconn-Z":"b","x-mopac-graph":"gpt","x-mopac-input":["mop","mopcrt","zmt"],"x-mopac-out":"moo","x-ncbi-asn1":"asn","x-ncbi-asn1-ascii":["prt","ent"],"x-ncbi-asn1-binary":"val","x-rosdal":"ros","x-swissprot":"sw","x-vamas-iso14976":"vms","x-vmd":"vmd","x-xtel":"xtel","x-xyz":"xyz"},font:{otf:"otf",woff:"woff",woff2:"woff2"},image:{gif:"gif",ief:"ief",jpeg:["jpeg","jpg","jpe","jfif","jfif-tbnl","jif"],pcx:"pcx",png:"png","svg+xml":["svg","svgz"],tiff:["tiff","tif"],"vnd.djvu":["djvu","djv"],"vnd.wap.wbmp":"wbmp","x-canon-cr2":"cr2","x-canon-crw":"crw","x-cmu-raster":"ras","x-coreldraw":"cdr","x-coreldrawpattern":"pat","x-coreldrawtemplate":"cdt","x-corelphotopaint":"cpt","x-epson-erf":"erf","x-icon":"ico","x-jg":"art","x-jng":"jng","x-nikon-nef":"nef","x-olympus-orf":"orf","x-portable-anymap":"pnm","x-portable-bitmap":"pbm","x-portable-graymap":"pgm","x-portable-pixmap":"ppm","x-rgb":"rgb","x-xbitmap":"xbm","x-xpixmap":"xpm","x-xwindowdump":"xwd",bmp:"bmp",cgm:"cgm",g3fax:"g3",ktx:"ktx","prs.btif":"btif",sgi:"sgi","vnd.dece.graphic":["uvi","uvvi","uvg","uvvg"],"vnd.dwg":"dwg","vnd.dxf":"dxf","vnd.fastbidsheet":"fbs","vnd.fpx":"fpx","vnd.fst":"fst","vnd.fujixerox.edmics-mmr":"mmr","vnd.fujixerox.edmics-rlc":"rlc","vnd.ms-modi":"mdi","vnd.ms-photo":"wdp","vnd.net-fpx":"npx","vnd.xiff":"xif",webp:"webp","x-3ds":"3ds","x-cmx":"cmx","x-freehand":["fh","fhc","fh4","fh5","fh7"],"x-pict":["pic","pct"],"x-tga":"tga","cis-cod":"cod",avif:"avifs",heic:["heif","heic"],pjpeg:["pjpg"],"vnd.adobe.photoshop":"psd","x-adobe-dng":"dng","x-fuji-raf":"raf","x-icns":"icns","x-kodak-dcr":"dcr","x-kodak-k25":"k25","x-kodak-kdc":"kdc","x-minolta-mrw":"mrw","x-panasonic-raw":["raw","rw2","rwl"],"x-pentax-pef":["pef","ptx"],"x-sigma-x3f":"x3f","x-sony-arw":"arw","x-sony-sr2":"sr2","x-sony-srf":"srf"},message:{rfc822:["eml","mime","mht","mhtml","nws"]},model:{iges:["igs","iges"],mesh:["msh","mesh","silo"],vrml:["wrl","vrml"],"x3d+vrml":["x3dv","x3dvz"],"x3d+xml":"x3dz","x3d+binary":["x3db","x3dbz"],"vnd.collada+xml":"dae","vnd.dwf":"dwf","vnd.gdl":"gdl","vnd.gtw":"gtw","vnd.mts":"mts","vnd.usdz+zip":"usdz","vnd.vtu":"vtu"},text:{"cache-manifest":["manifest","appcache"],calendar:["ics","icz","ifb"],css:"css",csv:"csv",h323:"323",html:["html","htm","shtml","stm"],iuls:"uls",plain:["txt","text","brf","conf","def","list","log","in","bas","diff","ksh"],richtext:"rtx",scriptlet:["sct","wsc"],texmacs:"tm","tab-separated-values":"tsv","vnd.sun.j2me.app-descriptor":"jad","vnd.wap.wml":"wml","vnd.wap.wmlscript":"wmls","x-bibtex":"bib","x-boo":"boo","x-c++hdr":["h++","hpp","hxx","hh"],"x-c++src":["c++","cpp","cxx","cc"],"x-component":"htc","x-dsrc":"d","x-diff":"patch","x-haskell":"hs","x-java":"java","x-literate-haskell":"lhs","x-moc":"moc","x-pascal":["p","pas","pp","inc"],"x-pcs-gcd":"gcd","x-python":"py","x-scala":"scala","x-setext":"etx","x-tcl":["tcl","tk"],"x-tex":["tex","ltx","sty","cls"],"x-vcalendar":"vcs","x-vcard":"vcf",n3:"n3","prs.lines.tag":"dsc",sgml:["sgml","sgm"],troff:["t","tr","roff","man","me","ms"],turtle:"ttl","uri-list":["uri","uris","urls"],vcard:"vcard","vnd.curl":"curl","vnd.curl.dcurl":"dcurl","vnd.curl.scurl":"scurl","vnd.curl.mcurl":"mcurl","vnd.dvb.subtitle":"sub","vnd.fly":"fly","vnd.fmi.flexstor":"flx","vnd.graphviz":"gv","vnd.in3d.3dml":"3dml","vnd.in3d.spot":"spot","x-asm":["s","asm"],"x-c":["c","h","dic"],"x-fortran":["f","for","f77","f90"],"x-opml":"opml","x-nfo":"nfo","x-sfv":"sfv","x-uuencode":"uu",webviewhtml:"htt",javascript:"js",json:"json",markdown:["md","markdown","mdown","markdn"],"vnd.wap.si":"si","vnd.wap.sl":"sl"},video:{avif:"avif","3gpp":"3gp",annodex:"axv",dl:"dl",dv:["dif","dv"],fli:"fli",gl:"gl",mpeg:["mpeg","mpg","mpe","m1v","m2v","mp2","mpa","mpv2"],mp4:["mp4","mp4v","mpg4"],quicktime:["qt","mov"],ogg:"ogv","vnd.mpegurl":["mxu","m4u"],"x-flv":"flv","x-la-asf":["lsf","lsx"],"x-mng":"mng","x-ms-asf":["asf","asx","asr"],"x-ms-wm":"wm","x-ms-wmv":"wmv","x-ms-wmx":"wmx","x-ms-wvx":"wvx","x-msvideo":"avi","x-sgi-movie":"movie","x-matroska":["mpv","mkv","mk3d","mks"],"3gpp2":"3g2",h261:"h261",h263:"h263",h264:"h264",jpeg:"jpgv",jpm:["jpm","jpgm"],mj2:["mj2","mjp2"],"vnd.dece.hd":["uvh","uvvh"],"vnd.dece.mobile":["uvm","uvvm"],"vnd.dece.pd":["uvp","uvvp"],"vnd.dece.sd":["uvs","uvvs"],"vnd.dece.video":["uvv","uvvv"],"vnd.dvb.file":"dvb","vnd.fvt":"fvt","vnd.ms-playready.media.pyv":"pyv","vnd.uvvu.mp4":["uvu","uvvu"],"vnd.vivo":"viv",webm:"webm","x-f4v":"f4v","x-m4v":"m4v","x-ms-vob":"vob","x-smv":"smv",mp2t:"ts"},"x-conference":{"x-cooltalk":"ice"},"x-world":{"x-vrml":["vrm","flr","wrz","xaf","xof"]}};(()=>{const e={};for(const t of Object.keys(Bc))for(const i of Object.keys(Bc[t])){const s=Bc[t][i];if("string"==typeof s)e[s]=t+"/"+i;else for(let a=0;a<s.length;a++)e[s[a]]=t+"/"+i}})();const Sc=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;Sc[e]=t}let kc=class{constructor(e){this.crc=e||-1}append(e){let t=0|this.crc;for(let i=0,s=0|e.length;s>i;i++)t=t>>>8^Sc[255&(t^e[i])];this.crc=t}get(){return~this.crc}},Ic=class extends TransformStream{constructor(){let e;const t=new kc;super({transform(e,i){t.append(e),i.enqueue(e)},flush(){const i=new Uint8Array(4);new DataView(i.buffer).setUint32(0,t.get()),e.value=i}}),e=this}};const Rc={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const i=e[e.length-1],s=Rc.getPartial(i);return 32===s?e.concat(t):Rc._shiftRight(t,s,0|i,e.slice(0,e.length-1))},bitLength(e){const t=e.length;if(0===t)return 0;const i=e[t-1];return 32*(t-1)+Rc.getPartial(i)},clamp(e,t){if(32*e.length<t)return e;const i=(e=e.slice(0,Math.ceil(t/32))).length;return t&=31,i>0&&t&&(e[i-1]=Rc.partial(t,e[i-1]&2147483648>>t-1,1)),e},partial:(e,t,i)=>32===e?t:(i?0|t:t<<32-e)+1099511627776*e,getPartial:e=>Math.round(e/1099511627776)||32,_shiftRight(e,t,i,s){for(void 0===s&&(s=[]);t>=32;t-=32)s.push(i),i=0;if(0===t)return s.concat(e);for(let a=0;a<e.length;a++)s.push(i|e[a]>>>t),i=e[a]<<32-t;const a=e.length?e[e.length-1]:0,r=Rc.getPartial(a);return s.push(Rc.partial(t+r&31,t+r>32?i:s.pop(),1)),s}},Mc={bytes:{fromBits(e){const t=Rc.bitLength(e)/8,i=new Uint8Array(t);let s;for(let a=0;t>a;a++)3&a||(s=e[a/4]),i[a]=s>>>24,s<<=8;return i},toBits(e){const t=[];let i,s=0;for(i=0;i<e.length;i++)s=s<<8|e[i],3&~i||(t.push(s),s=0);return 3&i&&t.push(Rc.partial(8*(3&i),s)),t}}},Dc=class{constructor(e){const t=this;t.blockSize=512,t._init=[1732584193,4023233417,2562383102,271733878,3285377520],t._key=[1518500249,1859775393,2400959708,3395469782],e?(t._h=e._h.slice(0),t._buffer=e._buffer.slice(0),t._length=e._length):t.reset()}reset(){const e=this;return e._h=e._init.slice(0),e._buffer=[],e._length=0,e}update(e){const t=this;"string"==typeof e&&(e=Mc.utf8String.toBits(e));const i=t._buffer=Rc.concat(t._buffer,e),s=t._length,a=t._length=s+Rc.bitLength(e);if(a>9007199254740991)throw Error("Cannot hash more than 2^53 - 1 bits");const r=new Uint32Array(i);let n=0;for(let e=t.blockSize+s-(t.blockSize+s&t.blockSize-1);a>=e;e+=t.blockSize)t._block(r.subarray(16*n,16*(n+1))),n+=1;return i.splice(0,16*n),t}finalize(){const e=this;let t=e._buffer;const i=e._h;t=Rc.concat(t,[Rc.partial(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(Math.floor(e._length/4294967296)),t.push(0|e._length);t.length;)e._block(t.splice(0,16));return e.reset(),i}_f(e,t,i,s){return e>19?e>39?e>59?e>79?void 0:t^i^s:t&i|t&s|i&s:t^i^s:t&i|~t&s}_S(e,t){return t<<e|t>>>32-e}_block(e){const t=this,i=t._h,s=Array(80);for(let t=0;16>t;t++)s[t]=e[t];let a=i[0],r=i[1],n=i[2],o=i[3],l=i[4];for(let e=0;79>=e;e++){16>e||(s[e]=t._S(1,s[e-3]^s[e-8]^s[e-14]^s[e-16]));const i=t._S(5,a)+t._f(e,r,n,o)+l+s[e]+t._key[Math.floor(e/20)]|0;l=o,o=n,n=t._S(30,r),r=a,a=i}i[0]=i[0]+a|0,i[1]=i[1]+r|0,i[2]=i[2]+n|0,i[3]=i[3]+o|0,i[4]=i[4]+l|0}},Fc={getRandomValues(e){const t=new Uint32Array(e.buffer),i=e=>{let t=987654321;const i=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&i,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&i)&i)/4294967296+.5)*(Math.random()>.5?1:-1))};for(let s,a=0;a<e.length;a+=4){const e=i(4294967296*(s||Math.random()));s=987654071*e(),t[a/4]=4294967296*e()|0}return e}},Tc={importKey:e=>new Tc.hmacSha1(Mc.bytes.toBits(e)),pbkdf2(e,t,i,s){if(i=i||1e4,0>s||0>i)throw Error("invalid params to pbkdf2");const a=1+(s>>5)<<2;let r,n,o,l,c;const d=new ArrayBuffer(a),h=new DataView(d);let p=0;const u=Rc;for(t=Mc.bytes.toBits(t),c=1;(a||1)>p;c++){for(r=n=e.encrypt(u.concat(t,[c])),o=1;i>o;o++)for(n=e.encrypt(n),l=0;l<n.length;l++)r[l]^=n[l];for(o=0;(a||1)>p&&o<r.length;o++)h.setInt32(p,r[o]),p+=4}return d.slice(0,s/8)},hmacSha1:class{constructor(e){const t=this,i=t._hash=Dc,s=[[],[]];t._baseHash=[new i,new i];const a=t._baseHash[0].blockSize/32;e.length>a&&(e=(new i).update(e).finalize());for(let t=0;a>t;t++)s[0][t]=909522486^e[t],s[1][t]=1549556828^e[t];t._baseHash[0].update(s[0]),t._baseHash[1].update(s[1]),t._resultHash=new i(t._baseHash[0])}reset(){const e=this;e._resultHash=new e._hash(e._baseHash[0]),e._updated=!1}update(e){this._updated=!0,this._resultHash.update(e)}digest(){const e=this,t=e._resultHash.finalize(),i=new e._hash(e._baseHash[1]).update(t).finalize();return e.reset(),i}encrypt(e){if(this._updated)throw Error("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},Qc=typeof crypto!=_c&&typeof crypto.getRandomValues==vc,Pc="Invalid password",Oc="Invalid signature",Uc="zipjs-abort-check-password";function zc(e){return Qc?crypto.getRandomValues(e):Fc.getRandomValues(e)}const Hc=16,$c={name:"PBKDF2"},Nc=Object.assign({hash:{name:"HMAC"}},$c),Lc=Object.assign({iterations:1e3,hash:{name:"SHA-1"}},$c),Gc=["deriveBits"],Yc=[8,12,16],Kc=[16,24,32],jc=10,Wc=[0,0,0,0],Jc=typeof crypto!=_c,qc=Jc&&crypto.subtle,Vc=Jc&&typeof qc!=_c,Zc=Mc.bytes,Xc=class{constructor(e){const t=this;t._tables=[[[],[],[],[],[]],[[],[],[],[],[]]],t._tables[0][0][0]||t._precompute();const i=t._tables[0][4],s=t._tables[1],a=e.length;let r,n,o,l=1;if(4!==a&&6!==a&&8!==a)throw Error("invalid aes key size");for(t._key=[n=e.slice(0),o=[]],r=a;4*a+28>r;r++){let e=n[r-1];(r%a==0||8===a&&r%a==4)&&(e=i[e>>>24]<<24^i[e>>16&255]<<16^i[e>>8&255]<<8^i[255&e],r%a==0&&(e=e<<8^e>>>24^l<<24,l=l<<1^283*(l>>7))),n[r]=n[r-a]^e}for(let e=0;r;e++,r--){const t=n[3&e?r:r-4];o[e]=4>=r||4>e?t:s[0][i[t>>>24]]^s[1][i[t>>16&255]]^s[2][i[t>>8&255]]^s[3][i[255&t]]}}encrypt(e){return this._crypt(e,0)}decrypt(e){return this._crypt(e,1)}_precompute(){const e=this._tables[0],t=this._tables[1],i=e[4],s=t[4],a=[],r=[];let n,o,l,c;for(let e=0;256>e;e++)r[(a[e]=e<<1^283*(e>>7))^e]=e;for(let d=n=0;!i[d];d^=o||1,n=r[n]||1){let r=n^n<<1^n<<2^n<<3^n<<4;r=r>>8^255&r^99,i[d]=r,s[r]=d,c=a[l=a[o=a[d]]];let h=16843009*c^65537*l^257*o^16843008*d,p=257*a[r]^16843008*r;for(let i=0;4>i;i++)e[i][d]=p=p<<24^p>>>8,t[i][r]=h=h<<24^h>>>8}for(let i=0;5>i;i++)e[i]=e[i].slice(0),t[i]=t[i].slice(0)}_crypt(e,t){if(4!==e.length)throw Error("invalid aes block size");const i=this._key[t],s=i.length/4-2,a=[0,0,0,0],r=this._tables[t],n=r[0],o=r[1],l=r[2],c=r[3],d=r[4];let h,p,u,g=e[0]^i[0],A=e[t?3:1]^i[1],f=e[2]^i[2],m=e[t?1:3]^i[3],_=4;for(let e=0;s>e;e++)h=n[g>>>24]^o[A>>16&255]^l[f>>8&255]^c[255&m]^i[_],p=n[A>>>24]^o[f>>16&255]^l[m>>8&255]^c[255&g]^i[_+1],u=n[f>>>24]^o[m>>16&255]^l[g>>8&255]^c[255&A]^i[_+2],m=n[m>>>24]^o[g>>16&255]^l[A>>8&255]^c[255&f]^i[_+3],_+=4,g=h,A=p,f=u;for(let e=0;4>e;e++)a[t?3&-e:e]=d[g>>>24]<<24^d[A>>16&255]<<16^d[f>>8&255]<<8^d[255&m]^i[_++],h=g,g=A,A=f,f=m,m=h;return a}},ed=class{constructor(e,t){this._prf=e,this._initIv=t,this._iv=t}reset(){this._iv=this._initIv}update(e){return this.calculate(this._prf,e,this._iv)}incWord(e){if(255&~(e>>24))e+=1<<24;else{let t=e>>16&255,i=e>>8&255,s=255&e;255===t?(t=0,255===i?(i=0,255===s?s=0:++s):++i):++t,e=0,e+=t<<16,e+=i<<8,e+=s}return e}incCounter(e){0===(e[0]=this.incWord(e[0]))&&(e[1]=this.incWord(e[1]))}calculate(e,t,i){let s;if(!(s=t.length))return[];const a=Rc.bitLength(t);for(let a=0;s>a;a+=4){this.incCounter(i);const s=e.encrypt(i);t[a]^=s[0],t[a+1]^=s[1],t[a+2]^=s[2],t[a+3]^=s[3]}return Rc.clamp(t,a)}},td=Tc.hmacSha1;let id=Jc&&Vc&&typeof qc.importKey==vc,sd=Jc&&Vc&&typeof qc.deriveBits==vc;class ad extends TransformStream{constructor({password:e,rawPassword:t,signed:i,encryptionStrength:s,checkPasswordOnly:a}){super({start(){Object.assign(this,{ready:new Promise(e=>this.resolveReady=e),password:ld(e,t),signed:i,strength:s-1,pending:new Uint8Array})},async transform(e,t){const i=this,{password:s,strength:r,resolveReady:n,ready:o}=i;s?(await(async(e,t,i,s)=>{const a=await od(e,t,i,dd(s,0,Yc[t])),r=dd(s,Yc[t]);if(a[0]!=r[0]||a[1]!=r[1])throw Error(Pc)})(i,r,s,dd(e,0,Yc[r]+2)),e=dd(e,Yc[r]+2),a?t.error(Error(Uc)):n()):await o;const l=new Uint8Array(e.length-jc-(e.length-jc)%Hc);t.enqueue(nd(i,e,l,0,jc,!0))},async flush(e){const{signed:t,ctr:i,hmac:s,pending:a,ready:r}=this;if(s&&i){await r;const n=dd(a,0,a.length-jc),o=dd(a,a.length-jc);let l=new Uint8Array;if(n.length){const e=pd(Zc,n);s.update(e);const t=i.update(e);l=hd(Zc,t)}if(t){const e=dd(hd(Zc,s.digest()),0,jc);for(let t=0;jc>t;t++)if(e[t]!=o[t])throw Error(Oc)}e.enqueue(l)}}})}}let rd=class extends TransformStream{constructor({password:e,rawPassword:t,encryptionStrength:i}){let s;super({start(){Object.assign(this,{ready:new Promise(e=>this.resolveReady=e),password:ld(e,t),strength:i-1,pending:new Uint8Array})},async transform(e,t){const i=this,{password:s,strength:a,resolveReady:r,ready:n}=i;let o=new Uint8Array;s?(o=await(async(e,t,i)=>{const s=zc(new Uint8Array(Yc[t]));return cd(s,await od(e,t,i,s))})(i,a,s),r()):await n;const l=new Uint8Array(o.length+e.length-e.length%Hc);l.set(o,0),t.enqueue(nd(i,e,l,o.length,0))},async flush(e){const{ctr:t,hmac:i,pending:a,ready:r}=this;if(i&&t){await r;let n=new Uint8Array;if(a.length){const e=t.update(pd(Zc,a));i.update(e),n=hd(Zc,e)}s.signature=hd(Zc,i.digest()).slice(0,jc),e.enqueue(cd(n,s.signature))}}}),s=this}};function nd(e,t,i,s,a,r){const{ctr:n,hmac:o,pending:l}=e,c=t.length-a;let d;for(l.length&&(t=cd(l,t),i=((e,t)=>{if(t&&t>e.length){const i=e;(e=new Uint8Array(t)).set(i,0)}return e})(i,c-c%Hc)),d=0;c-Hc>=d;d+=Hc){const e=pd(Zc,dd(t,d,d+Hc));r&&o.update(e);const a=n.update(e);r||o.update(a),i.set(hd(Zc,a),d+s)}return e.pending=dd(t,d),i}async function od(e,t,i,s){e.password=null;const a=await(async(e,t,i,s,a)=>{if(!id)return Tc.importKey(t);try{return await qc.importKey("raw",t,i,!1,a)}catch(e){return id=!1,Tc.importKey(t)}})(0,i,Nc,0,Gc),r=await(async(e,t,i)=>{if(!sd)return Tc.pbkdf2(t,e.salt,Lc.iterations,i);try{return await qc.deriveBits(e,t,i)}catch(s){return sd=!1,Tc.pbkdf2(t,e.salt,Lc.iterations,i)}})(Object.assign({salt:s},Lc),a,8*(2*Kc[t]+2)),n=new Uint8Array(r),o=pd(Zc,dd(n,0,Kc[t])),l=pd(Zc,dd(n,Kc[t],2*Kc[t])),c=dd(n,2*Kc[t]);return Object.assign(e,{keys:{key:o,authentication:l,passwordVerification:c},ctr:new ed(new Xc(o),Array.from(Wc)),hmac:new td(l)}),c}function ld(e,t){return t===mc?function(e){if(typeof TextEncoder==_c){e=unescape(encodeURIComponent(e));const t=new Uint8Array(e.length);for(let i=0;i<t.length;i++)t[i]=e.charCodeAt(i);return t}return(new TextEncoder).encode(e)}(e):t}function cd(e,t){let i=e;return e.length+t.length&&(i=new Uint8Array(e.length+t.length),i.set(e,0),i.set(t,e.length)),i}function dd(e,t,i){return e.subarray(t,i)}function hd(e,t){return e.fromBits(t)}function pd(e,t){return e.toBits(t)}let ud=class extends TransformStream{constructor({password:e,passwordVerification:t,checkPasswordOnly:i}){super({start(){Object.assign(this,{password:e,passwordVerification:t}),md(this,e)},transform(e,t){const s=this;if(s.password){const t=Ad(s,e.subarray(0,12));if(s.password=null,t[11]!=s.passwordVerification)throw Error(Pc);e=e.subarray(12)}i?t.error(Error(Uc)):t.enqueue(Ad(s,e))}})}},gd=class extends TransformStream{constructor({password:e,passwordVerification:t}){super({start(){Object.assign(this,{password:e,passwordVerification:t}),md(this,e)},transform(e,t){const i=this;let s,a;if(i.password){i.password=null;const t=zc(new Uint8Array(12));t[11]=i.passwordVerification,s=new Uint8Array(e.length+t.length),s.set(fd(i,t),0),a=12}else s=new Uint8Array(e.length),a=0;s.set(fd(i,e),a),t.enqueue(s)}})}};function Ad(e,t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=vd(e)^t[s],_d(e,i[s]);return i}function fd(e,t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=vd(e)^t[s],_d(e,t[s]);return i}function md(e,t){const i=[305419896,591751049,878082192];Object.assign(e,{keys:i,crcKey0:new kc(i[0]),crcKey2:new kc(i[2])});for(let i=0;i<t.length;i++)_d(e,t.charCodeAt(i))}function _d(e,t){let[i,s,a]=e.keys;e.crcKey0.append([t]),i=~e.crcKey0.get(),s=bd(Math.imul(bd(s+wd(i)),134775813)+1),e.crcKey2.append([s>>>24]),a=~e.crcKey2.get(),e.keys=[i,s,a]}function vd(e){const t=2|e.keys[2];return wd(Math.imul(t,1^t)>>>8)}function wd(e){return 255&e}function bd(e){return 4294967295&e}const yd="deflate-raw";let xd=class extends TransformStream{constructor(e,{chunkSize:t,CompressionStream:i,CompressionStreamNative:s}){super({});const{compressed:a,encrypted:r,useCompressionStream:n,zipCrypto:o,signed:l,level:c}=e,d=this;let h,p,u=Cd(super.readable);r&&!o||!l||(h=new Ic,u=kd(u,h)),a&&(u=Sd(u,n,{level:c,chunkSize:t},s,i)),r&&(o?u=kd(u,new gd(e)):(p=new rd(e),u=kd(u,p))),Bd(d,u,()=>{let e;r&&!o&&(e=p.signature),r&&!o||!l||(e=new DataView(h.value.buffer).getUint32(0)),d.signature=e})}},Ed=class extends TransformStream{constructor(e,{chunkSize:t,DecompressionStream:i,DecompressionStreamNative:s}){super({});const{zipCrypto:a,encrypted:r,signed:n,signature:o,compressed:l,useCompressionStream:c}=e;let d,h,p=Cd(super.readable);r&&(a?p=kd(p,new ud(e)):(h=new ad(e),p=kd(p,h))),l&&(p=Sd(p,c,{chunkSize:t},s,i)),r&&!a||!n||(d=new Ic,p=kd(p,d)),Bd(this,p,()=>{if((!r||a)&&n){const e=new DataView(d.value.buffer);if(o!=e.getUint32(0,!1))throw Error(Oc)}})}};function Cd(e){return kd(e,new TransformStream({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function Bd(e,t,i){t=kd(t,new TransformStream({flush:i})),Object.defineProperty(e,"readable",{get:()=>t})}function Sd(e,t,i,s,a){try{e=kd(e,new(t&&s?s:a)(yd,i))}catch(s){if(!t)return e;try{e=kd(e,new a(yd,i))}catch(t){return e}}return e}function kd(e,t){return e.pipeThrough(t)}const Id="data",Rd="close",Md="inflate";let Dd=class extends TransformStream{constructor(e,t){super({});const i=this,{codecType:s}=e;let a;s.startsWith("deflate")?a=xd:s.startsWith(Md)&&(a=Ed);let r=0,n=0;const o=new a(e,t),l=super.readable,c=new TransformStream({transform(e,t){e&&e.length&&(n+=e.length,t.enqueue(e))},flush(){Object.assign(i,{inputSize:n})}}),d=new TransformStream({transform(e,t){e&&e.length&&(r+=e.length,t.enqueue(e))},flush(){const{signature:e}=o;Object.assign(i,{signature:e,outputSize:r,inputSize:n})}});Object.defineProperty(i,"readable",{get:()=>l.pipeThrough(c).pipeThrough(o).pipeThrough(d)})}},Fd=class extends TransformStream{constructor(e){let t;super({transform:function i(s,a){if(t){const e=new Uint8Array(t.length+s.length);e.set(t),e.set(s,t.length),s=e,t=null}s.length>e?(a.enqueue(s.slice(0,e)),i(s.slice(e),a)):t=s},flush(e){t&&t.length&&e.enqueue(t)}})}},Td=typeof Worker!=_c,Qd=class{constructor(e,{readable:t,writable:i},{options:s,config:a,streamOptions:r,useWebWorkers:n,transferStreams:o,scripts:l},c){const{signal:d}=r;return Object.assign(e,{busy:!0,readable:t.pipeThrough(new Fd(a.chunkSize)).pipeThrough(new Pd(t,r),{signal:d}),writable:i,options:Object.assign({},s),scripts:l,transferStreams:o,terminate:()=>new Promise(t=>{const{worker:i,busy:s}=e;i?(s?e.resolveTerminated=t:(i.terminate(),t()),e.interface=null):t()}),onTaskFinished(){const{resolveTerminated:t}=e;t&&(e.resolveTerminated=null,e.terminated=!0,e.worker.terminate(),t()),e.busy=!1,c(e)}}),(n&&Td?zd:Ud)(e,a)}},Pd=class extends TransformStream{constructor(e,{onstart:t,onprogress:i,size:s,onend:a}){let r=0;super({async start(){t&&await Od(t,s)},async transform(e,t){r+=e.length,i&&await Od(i,r,s),t.enqueue(e)},async flush(){e.size=r,a&&await Od(a,r)}})}};async function Od(e,...t){try{await e(...t)}catch(e){}}function Ud(e,t){return{run:()=>(async({options:e,readable:t,writable:i,onTaskFinished:s},a)=>{try{const s=new Dd(e,a);await t.pipeThrough(s).pipeTo(i,{preventClose:!0,preventAbort:!0});const{signature:r,inputSize:n,outputSize:o}=s;return{signature:r,inputSize:n,outputSize:o}}finally{s()}})(e,t)}}function zd(e,t){const{baseURL:i,chunkSize:s}=t;if(!e.interface){let a;try{a=((e,t,i)=>{const s={type:"module"};let a,r;typeof e==vc&&(e=e());try{a=new URL(e,t)}catch(t){a=e}if(Hd)try{r=new Worker(a)}catch(e){Hd=!1,r=new Worker(a,s)}else r=new Worker(a,s);return r.addEventListener("message",e=>(async({data:e},t)=>{const{type:i,value:s,messageId:a,result:r,error:n}=e,{reader:o,writer:l,resolveResult:c,rejectResult:d,onTaskFinished:h}=t;try{if(n){const{message:e,stack:t,code:i,name:s}=n,a=Error(e);Object.assign(a,{stack:t,code:i,name:s}),p(a)}else{if("pull"==i){const{value:e,done:i}=await o.read();Nd({type:Id,value:e,done:i,messageId:a},t)}i==Id&&(await l.ready,await l.write(new Uint8Array(s)),Nd({type:"ack",messageId:a},t)),i==Rd&&p(null,r)}}catch(n){Nd({type:Rd,messageId:a},t),p(n)}function p(e,t){e?d(e):c(t),l&&l.releaseLock(),h()}})(e,i)),r})(e.scripts[0],i,e)}catch(i){return Td=!1,Ud(e,t)}Object.assign(e,{worker:a,interface:{run:()=>(async(e,t)=>{let i,s;const a=new Promise((e,t)=>{i=e,s=t});Object.assign(e,{reader:null,writer:null,resolveResult:i,rejectResult:s,result:a});const{readable:r,options:n,scripts:o}=e,{writable:l,closed:c}=(e=>{let t;const i=new Promise(e=>t=e);return{writable:new WritableStream({async write(t){const i=e.getWriter();await i.ready,await i.write(t),i.releaseLock()},close(){t()},abort:t=>e.getWriter().abort(t)}),closed:i}})(e.writable),d=Nd({type:"start",scripts:o.slice(1),options:n,config:t,readable:r,writable:l},e);d||Object.assign(e,{reader:r.getReader(),writer:l.getWriter()});const h=await a;return d||await l.getWriter().close(),await c,h})(e,{chunkSize:s})}})}return e.interface}let Hd=!0,$d=!0;function Nd(e,{worker:t,writer:i,onTaskFinished:s,transferStreams:a}){try{const{value:s,readable:r,writable:n}=e,o=[];if(s&&(s.byteLength<s.buffer.byteLength?e.value=s.buffer.slice(0,s.byteLength):e.value=s.buffer,o.push(e.value)),a&&$d?(r&&o.push(r),n&&o.push(n)):e.readable=e.writable=null,o.length)try{return t.postMessage(e,o),!0}catch(i){$d=!1,e.readable=e.writable=null,t.postMessage(e)}else t.postMessage(e)}catch(e){throw i&&i.releaseLock(),s(),e}}let Ld=[];const Gd=[];let Yd=0;function Kd(e){const{terminateTimeout:t}=e;t&&(clearTimeout(t),e.terminateTimeout=null)}const jd=65536,Wd="writable";let Jd=class{constructor(){this.size=0}init(){this.initialized=!0}},qd=class extends Jd{get readable(){const e=this,{chunkSize:t=jd}=e,i=new ReadableStream({start(){this.chunkOffset=0},async pull(s){const{offset:a=0,size:r,diskNumberStart:n}=i,{chunkOffset:o}=this;s.enqueue(await nh(e,a+o,Math.min(t,r-o),n)),o+t>r?s.close():this.chunkOffset+=t}});return i}},Vd=class extends Jd{constructor(){super();const e=this,t=new WritableStream({write:t=>e.writeUint8Array(t)});Object.defineProperty(e,Wd,{get:()=>t})}writeUint8Array(){}},Zd=class extends qd{constructor(e){super(),Object.assign(this,{blob:e,size:e.size})}async readUint8Array(e,t){const i=this,s=e+t,a=e||s<i.size?i.blob.slice(e,s):i.blob;let r=await a.arrayBuffer();return r.byteLength>t&&(r=r.slice(e,s)),new Uint8Array(r)}},Xd=class extends Jd{constructor(e){super();const t=new TransformStream,i=[];e&&i.push(["Content-Type",e]),Object.defineProperty(this,Wd,{get:()=>t.writable}),this.blob=new Response(t.readable,{headers:i}).blob()}getData(){return this.blob}},eh=class extends Xd{constructor(e){super(e),Object.assign(this,{encoding:e,utf8:!e||"utf-8"==e.toLowerCase()})}async getData(){const{encoding:e,utf8:t}=this,i=await super.getData();if(i.text&&t)return i.text();{const t=new FileReader;return new Promise((s,a)=>{Object.assign(t,{onload:({target:e})=>s(e.result),onerror:()=>a(t.error)}),t.readAsText(i,e)})}}};class th extends Vd{init(e=0){Object.assign(this,{offset:0,array:new Uint8Array(e)}),super.init()}writeUint8Array(e){const t=this;if(t.offset+e.length>t.array.length){const i=t.array;t.array=new Uint8Array(i.length+e.length),t.array.set(i)}t.array.set(e,t.offset),t.offset+=e.length}getData(){return this.array}}class ih extends qd{constructor(e){super(),this.readers=e}async init(){const e=this,{readers:t}=e;e.lastDiskNumber=0,e.lastDiskOffset=0,await Promise.all(t.map(async(i,s)=>{await i.init(),s!=t.length-1&&(e.lastDiskOffset+=i.size),e.size+=i.size})),super.init()}async readUint8Array(e,t,i=0){const s=this,{readers:a}=this;let r,n=i;-1==n&&(n=a.length-1);let o=e;for(;o>=a[n].size;)o-=a[n].size,n++;const l=a[n],c=l.size;if(o+t>c){const a=c-o;r=new Uint8Array(t),r.set(await nh(l,o,a)),r.set(await s.readUint8Array(e+a,t-a,i),a)}else r=await nh(l,o,t);return s.lastDiskNumber=Math.max(n,s.lastDiskNumber),r}}class sh extends Jd{constructor(e,t=4294967295){super();const i=this;let s,a,r;Object.assign(i,{diskNumber:0,diskOffset:0,size:0,maxSize:t,availableSize:t});const n=new WritableStream({async write(t){const{availableSize:n}=i;if(r)t.length<n?await o(t):(await o(t.slice(0,n)),await l(),i.diskOffset+=s.size,i.diskNumber++,r=null,await this.write(t.slice(n)));else{const{value:n,done:o}=await e.next();if(o&&!n)throw Error("Writer iterator completed too soon");s=n,s.size=0,s.maxSize&&(i.maxSize=s.maxSize),i.availableSize=i.maxSize,await ah(s),a=n.writable,r=a.getWriter(),await this.write(t)}},async close(){await r.ready,await l()}});async function o(e){const t=e.length;t&&(await r.ready,await r.write(e),s.size+=t,i.size+=t,i.availableSize-=t)}async function l(){a.size=s.size,await r.close()}Object.defineProperty(i,Wd,{get:()=>n})}}async function ah(e,t){if(!e.init||e.initialized)return Promise.resolve();await e.init(t)}function rh(e){return Array.isArray(e)&&(e=new ih(e)),e instanceof ReadableStream&&(e={readable:e}),e}function nh(e,t,i,s){return e.readUint8Array(t,i,s)}const oh="\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ".split("");function lh(e,t){return t&&"cp437"==t.trim().toLowerCase()?(e=>{{let t="";for(let i=0;i<e.length;i++)t+=oh[e[i]];return t}})(e):new TextDecoder(t).decode(e)}const ch="filename",dh="rawFilename",hh="comment",ph="rawComment",uh="uncompressedSize",gh="compressedSize",Ah="offset",fh="diskNumberStart",mh="lastModDate",_h="rawLastModDate",vh="lastAccessDate",wh="creationDate",bh=[ch,dh,gh,uh,mh,_h,hh,ph,vh,wh,Ah,fh,fh,"internalFileAttribute","internalFileAttributes","externalFileAttribute","externalFileAttributes","msDosCompatible","zip64","encrypted","version","versionMadeBy","zipCrypto","directory","executable","bitFlag","signature","filenameUTF8","commentUTF8","compressionMethod","extraField","rawExtraField","extraFieldZip64","extraFieldUnicodePath","extraFieldUnicodeComment","extraFieldAES","extraFieldNTFS","extraFieldExtendedTimestamp"];class yh{constructor(e){bh.forEach(t=>this[t]=e[t])}}const xh="File format is not recognized",Eh="Compression method not supported",Ch="Split zip file",Bh="utf-8",Sh="cp437",kh=[[uh,uc],[gh,uc],[Ah,uc],[fh,gc]],Ih={[gc]:{getValue:$h,bytes:4},[uc]:{getValue:Nh,bytes:8}};class Rh{constructor(e,t={}){Object.assign(this,{reader:rh(e),options:t,config:xc})}async*getEntriesGenerator(e={}){const t=this;let{reader:i}=t;const{config:s}=t;if(await ah(i),i.size!==mc&&i.readUint8Array||(i=new Zd(await new Response(i.readable).blob()),await ah(i)),i.size<22)throw Error(xh);i.chunkSize=function(e){return Math.max(e.chunkSize,64)}(s);const a=await(async(e,t,i)=>{const s=new Uint8Array(4);return Lh(s).setUint32(0,101010256,!0),await a(22)||await a(Math.min(1048582,i));async function a(t){const a=i-t,r=await nh(e,a,t);for(let e=r.length-22;e>=0;e--)if(r[e]==s[0]&&r[e+1]==s[1]&&r[e+2]==s[2]&&r[e+3]==s[3])return{offset:a+e,buffer:r.slice(e,e+22).buffer}}})(i,0,i.size);if(!a)throw 134695760==$h(Lh(await nh(i,0,4)))?Error(Ch):Error("End of central directory not found");const r=Lh(a);let n=$h(r,12),o=$h(r,16);const l=a.offset,c=Hh(r,20),d=l+22+c;let h=Hh(r,4);const p=i.lastDiskNumber||0;let u=Hh(r,6),g=Hh(r,8),A=0,f=0;if(o==uc||n==uc||g==gc||u==gc){const e=Lh(await nh(i,a.offset-20,20));if(117853008==$h(e,0)){o=Nh(e,8);let t=await nh(i,o,56,-1),s=Lh(t);const r=a.offset-20-56;if($h(s,0)!=fc&&o!=r){const e=o;o=r,A=o-e,t=await nh(i,o,56,-1),s=Lh(t)}if($h(s,0)!=fc)throw Error("End of Zip64 central directory locator not found");h==gc&&(h=$h(s,16)),u==gc&&(u=$h(s,20)),g==gc&&(g=Nh(s,32)),n==uc&&(n=Nh(s,40)),o-=n}}if(o<i.size||(A=i.size-o-n-22,o=i.size-n-22),p!=h)throw Error(Ch);if(0>o)throw Error(xh);let m=0,_=await nh(i,o,n,u),v=Lh(_);if(n){const e=a.offset-n;if($h(v,m)!=Ac&&o!=e){const t=o;o=e,A+=o-t,_=await nh(i,o,n,u),v=Lh(_)}}const w=a.offset-o-(i.lastDiskOffset||0);if(n==w||0>w||(n=w,_=await nh(i,o,n,u),v=Lh(_)),0>o||o>=i.size)throw Error(xh);const b=Ph(t,e,"filenameEncoding"),y=Ph(t,e,"commentEncoding");for(let a=0;g>a;a++){const r=new Dh(i,s,t.options);if($h(v,m)!=Ac)throw Error("Central directory header not found");Fh(r,v,m+6);const n=!!r.bitFlag.languageEncodingFlag,o=m+46,l=o+r.filenameLength,c=l+r.extraFieldLength,d=Hh(v,m+4),h=!(d>>8),p=d>>8==3,u=_.subarray(o,l),w=Hh(v,m+32),x=c+w,E=_.subarray(c,x),C=n,B=n,S=$h(v,m+38),k=h&&!(16&~zh(v,m+38))||p&&!(16384&~(S>>16))||u.length&&47==u[u.length-1],I=p&&!(73&~(S>>16)),R=$h(v,m+42)+A;Object.assign(r,{versionMadeBy:d,msDosCompatible:h,compressedSize:0,uncompressedSize:0,commentLength:w,directory:k,offset:R,diskNumberStart:Hh(v,m+34),internalFileAttributes:Hh(v,m+36),externalFileAttributes:S,rawFilename:u,filenameUTF8:C,commentUTF8:B,rawExtraField:_.subarray(l,c),executable:I}),r.internalFileAttribute=r.internalFileAttributes,r.externalFileAttribute=r.externalFileAttributes;const M=Ph(t,e,"decodeText")||lh,D=C?Bh:b||Sh,F=B?Bh:y||Sh;let T=M(u,D);T===mc&&(T=lh(u,D));let Q=M(E,F);Q===mc&&(Q=lh(E,F)),Object.assign(r,{rawComment:E,filename:T,comment:Q,directory:k||T.endsWith("/")}),f=Math.max(R,f),Th(r,r,v,m+6),r.zipCrypto=r.encrypted&&!r.extraFieldAES;const P=new yh(r);P.getData=(e,t)=>r.getData(e,P,t),m=x;const{onprogress:O}=e;if(O)try{await O(a+1,g,new yh(r))}catch(e){}yield P}const x=Ph(t,e,"extractPrependedData"),E=Ph(t,e,"extractAppendedData");return x&&(t.prependedData=f>0?await nh(i,0,f):new Uint8Array),t.comment=c?await nh(i,l+22,c):new Uint8Array,E&&(t.appendedData=d<i.size?await nh(i,d,i.size-d):new Uint8Array),!0}async getEntries(e={}){const t=[];for await(const i of this.getEntriesGenerator(e))t.push(i);return t}async close(){}}let Mh,Dh=class{constructor(e,t,i){Object.assign(this,{reader:e,config:t,options:i})}async getData(e,t,i={}){const s=this,{reader:a,offset:r,diskNumberStart:n,extraFieldAES:o,compressionMethod:l,config:c,bitFlag:d,signature:h,rawLastModDate:p,uncompressedSize:u,compressedSize:g}=s,A=t.localDirectory={},f=Lh(await nh(a,r,30,n));let m=Ph(s,i,"password"),_=Ph(s,i,"rawPassword");const v=Ph(s,i,"passThrough");if(m=m&&m.length&&m,_=_&&_.length&&_,o&&99!=o.originalCompressionMethod)throw Error(Eh);if(0!=l&&8!=l&&!v)throw Error(Eh);if(67324752!=$h(f,0))throw Error("Local file header not found");Fh(A,f,4),A.rawExtraField=A.extraFieldLength?await nh(a,r+30+A.filenameLength,A.extraFieldLength,n):new Uint8Array,Th(s,A,f,4,!0),Object.assign(t,{lastAccessDate:A.lastAccessDate,creationDate:A.creationDate});const w=s.encrypted&&A.encrypted&&!v,b=w&&!o;if(v||(t.zipCrypto=b),w){if(!b&&o.strength===mc)throw Error("Encryption method not supported");if(!m&&!_)throw Error("File contains encrypted entry")}const y=r+30+A.filenameLength+A.extraFieldLength,x=g,E=a.readable;Object.assign(E,{diskNumberStart:n,offset:y,size:x});const C=Ph(s,i,"signal"),B=Ph(s,i,"checkPasswordOnly");B&&(e=new WritableStream),e=function(e){e.writable===mc&&typeof e.next==vc&&(e=new sh(e)),e instanceof WritableStream&&(e={writable:e});const{writable:t}=e;return t.size===mc&&(t.size=0),e instanceof sh||Object.assign(e,{diskNumber:0,diskOffset:0,availableSize:1/0,maxSize:1/0}),e}(e),await ah(e,v?g:u);const{writable:S}=e,{onstart:k,onprogress:I,onend:R}=i,M={options:{codecType:Md,password:m,rawPassword:_,zipCrypto:b,encryptionStrength:o&&o.strength,signed:Ph(s,i,"checkSignature")&&!v,passwordVerification:b&&(d.dataDescriptor?p>>>8&255:h>>>24&255),signature:h,compressed:0!=l&&!v,encrypted:s.encrypted&&!v,useWebWorkers:Ph(s,i,"useWebWorkers"),useCompressionStream:Ph(s,i,"useCompressionStream"),transferStreams:Ph(s,i,"transferStreams"),checkPasswordOnly:B},config:c,streamOptions:{signal:C,size:x,onstart:k,onprogress:I,onend:R}};let D=0;try{({outputSize:D}=await async function(e,t){const{options:i,config:s}=t,{transferStreams:a,useWebWorkers:r,useCompressionStream:n,codecType:o,compressed:l,signed:c,encrypted:d}=i,{workerScripts:h,maxWorkers:p}=s;t.transferStreams=a||a===mc;const u=!(l||c||d||t.transferStreams);return t.useWebWorkers=!u&&(r||r===mc&&s.useWebWorkers),t.scripts=t.useWebWorkers&&h?h[o]:[],i.useCompressionStream=n||n===mc&&s.useCompressionStream,(await(async()=>{const i=Ld.find(e=>!e.busy);if(i)return Kd(i),new Qd(i,e,t,g);if(Ld.length<p){const i={indexWorker:Yd};return Yd++,Ld.push(i),new Qd(i,e,t,g)}return new Promise(i=>Gd.push({resolve:i,stream:e,workerOptions:t}))})()).run();function g(e){if(Gd.length){const[{resolve:t,stream:i,workerOptions:s}]=Gd.splice(0,1);t(new Qd(e,i,s,g))}else e.worker?(Kd(e),((e,t)=>{const{config:i}=t,{terminateWorkerTimeout:s}=i;Number.isFinite(s)&&s>=0&&(e.terminated?e.terminated=!1:e.terminateTimeout=setTimeout(async()=>{Ld=Ld.filter(t=>t!=e);try{await e.terminate()}catch(e){}},s))})(e,t)):Ld=Ld.filter(t=>t!=e)}}({readable:E,writable:S},M))}catch(e){if(!B||e.message!=Uc)throw e}finally{const e=Ph(s,i,"preventClose");S.size+=D,e||S.locked||await S.getWriter().close()}return B?mc:e.getData?e.getData():S}};function Fh(e,t,i){const s=e.rawBitFlag=Hh(t,i+2),a=!(1&~s),r=$h(t,i+6);Object.assign(e,{encrypted:a,version:Hh(t,i),bitFlag:{level:(6&s)>>1,dataDescriptor:!(8&~s),languageEncodingFlag:!(2048&~s)},rawLastModDate:r,lastModDate:Oh(r),filenameLength:Hh(t,i+22),extraFieldLength:Hh(t,i+24)})}function Th(e,t,i,s,a){const{rawExtraField:r}=t,n=t.extraField=new Map,o=Lh(new Uint8Array(r));let l=0;try{for(;l<r.length;){const e=Hh(o,l),t=Hh(o,l+2);n.set(e,{type:e,data:r.slice(l+4,l+4+t)}),l+=4+t}}catch(e){}const c=Hh(i,s+4);Object.assign(t,{signature:$h(i,s+10),uncompressedSize:$h(i,s+18),compressedSize:$h(i,s+14)});const d=n.get(1);d&&(((e,t)=>{t.zip64=!0;const i=Lh(e.data),s=kh.filter(([e,i])=>t[e]==i);for(let a=0,r=0;a<s.length;a++){const[n,o]=s[a];if(t[n]==o){const s=Ih[o];t[n]=e[n]=s.getValue(i,r),r+=s.bytes}else if(e[n])throw Error("Zip64 extra field not found")}})(d,t),t.extraFieldZip64=d);const h=n.get(28789);h&&(Qh(h,ch,dh,t,e),t.extraFieldUnicodePath=h);const p=n.get(25461);p&&(Qh(p,hh,ph,t,e),t.extraFieldUnicodeComment=p);const u=n.get(39169);u?(((e,t,i)=>{const s=Lh(e.data),a=zh(s,4);Object.assign(e,{vendorVersion:zh(s,0),vendorId:zh(s,2),strength:a,originalCompressionMethod:i,compressionMethod:Hh(s,5)}),t.compressionMethod=e.compressionMethod})(u,t,c),t.extraFieldAES=u):t.compressionMethod=c;const g=n.get(10);g&&(((e,t)=>{const i=Lh(e.data);let s,a=4;try{for(;a<e.data.length&&!s;){const t=Hh(i,a),r=Hh(i,a+2);1==t&&(s=e.data.slice(a+4,a+4+r)),a+=4+r}}catch(e){}try{if(s&&24==s.length){const i=Lh(s),a=i.getBigUint64(0,!0),r=i.getBigUint64(8,!0),n=i.getBigUint64(16,!0);Object.assign(e,{rawLastModDate:a,rawLastAccessDate:r,rawCreationDate:n});const o={lastModDate:Uh(a),lastAccessDate:Uh(r),creationDate:Uh(n)};Object.assign(e,o),Object.assign(t,o)}}catch(e){}})(g,t),t.extraFieldNTFS=g);const A=n.get(21589);A&&(((e,t,i)=>{const s=Lh(e.data),a=zh(s,0),r=[],n=[];i?(1&~a||(r.push(mh),n.push(_h)),2&~a||(r.push(vh),n.push("rawLastAccessDate")),4&~a||(r.push(wh),n.push("rawCreationDate"))):5>e.data.length||(r.push(mh),n.push(_h));let o=1;r.forEach((i,a)=>{if(e.data.length>=o+4){const r=$h(s,o);t[i]=e[i]=new Date(1e3*r);const l=n[a];e[l]=r}o+=4})})(A,t,a),t.extraFieldExtendedTimestamp=A);const f=n.get(6534);f&&(t.extraFieldUSDZ=f)}function Qh(e,t,i,s,a){const r=Lh(e.data),n=new kc;n.append(a[i]);const o=Lh(new Uint8Array(4));o.setUint32(0,n.get(),!0);const l=$h(r,1);Object.assign(e,{version:zh(r,0),[t]:lh(e.data.subarray(5)),valid:!a.bitFlag.languageEncodingFlag&&l==$h(o,0)}),e.valid&&(s[t]=e[t],s[t+"UTF8"]=!0)}function Ph(e,t,i){return t[i]===mc?e.options[i]:t[i]}function Oh(e){const t=(4294901760&e)>>16,i=65535&e;try{return new Date(1980+((65024&t)>>9),((480&t)>>5)-1,31&t,(63488&i)>>11,(2016&i)>>5,2*(31&i),0)}catch(e){}}function Uh(e){return new Date(Number(e/BigInt(1e4)-BigInt(116444736e5)))}function zh(e,t){return e.getUint8(t)}function Hh(e,t){return e.getUint16(t,!0)}function $h(e,t){return e.getUint32(t,!0)}function Nh(e,t){return Number(e.getBigUint64(t,!0))}function Lh(e){return new DataView(e.buffer)}try{Mh=import.meta.url}catch(e){}Ec({baseURL:Mh}),((e,t={})=>{const i='const{Array:e,Object:t,Number:n,Math:r,Error:s,Uint8Array:i,Uint16Array:o,Uint32Array:c,Int32Array:f,Map:a,DataView:l,Promise:u,TextEncoder:w,crypto:h,postMessage:d,TransformStream:p,ReadableStream:y,WritableStream:m,CompressionStream:b,DecompressionStream:g}=self,k=void 0,v="undefined",S="function";class z{constructor(e){return class extends p{constructor(t,n){const r=new e(n);super({transform(e,t){t.enqueue(r.append(e))},flush(e){const t=r.flush();t&&e.enqueue(t)}})}}}}const C=[];for(let e=0;256>e;e++){let t=e;for(let e=0;8>e;e++)1&t?t=t>>>1^3988292384:t>>>=1;C[e]=t}class x{constructor(e){this.t=e||-1}append(e){let t=0|this.t;for(let n=0,r=0|e.length;r>n;n++)t=t>>>8^C[255&(t^e[n])];this.t=t}get(){return~this.t}}class A extends p{constructor(){let e;const t=new x;super({transform(e,n){t.append(e),n.enqueue(e)},flush(){const n=new i(4);new l(n.buffer).setUint32(0,t.get()),e.value=n}}),e=this}}const _={concat(e,t){if(0===e.length||0===t.length)return e.concat(t);const n=e[e.length-1],r=_.i(n);return 32===r?e.concat(t):_.o(t,r,0|n,e.slice(0,e.length-1))},l(e){const t=e.length;if(0===t)return 0;const n=e[t-1];return 32*(t-1)+_.i(n)},u(e,t){if(32*e.length<t)return e;const n=(e=e.slice(0,r.ceil(t/32))).length;return t&=31,n>0&&t&&(e[n-1]=_.h(t,e[n-1]&2147483648>>t-1,1)),e},h:(e,t,n)=>32===e?t:(n?0|t:t<<32-e)+1099511627776*e,i:e=>r.round(e/1099511627776)||32,o(e,t,n,r){for(void 0===r&&(r=[]);t>=32;t-=32)r.push(n),n=0;if(0===t)return r.concat(e);for(let s=0;s<e.length;s++)r.push(n|e[s]>>>t),n=e[s]<<32-t;const s=e.length?e[e.length-1]:0,i=_.i(s);return r.push(_.h(t+i&31,t+i>32?n:r.pop(),1)),r}},I={bytes:{p(e){const t=_.l(e)/8,n=new i(t);let r;for(let s=0;t>s;s++)3&s||(r=e[s/4]),n[s]=r>>>24,r<<=8;return n},m(e){const t=[];let n,r=0;for(n=0;n<e.length;n++)r=r<<8|e[n],3&~n||(t.push(r),r=0);return 3&n&&t.push(_.h(8*(3&n),r)),t}}},P=class{constructor(e){const t=this;t.blockSize=512,t.k=[1732584193,4023233417,2562383102,271733878,3285377520],t.v=[1518500249,1859775393,2400959708,3395469782],e?(t.S=e.S.slice(0),t.C=e.C.slice(0),t.A=e.A):t.reset()}reset(){const e=this;return e.S=e.k.slice(0),e.C=[],e.A=0,e}update(e){const t=this;"string"==typeof e&&(e=I._.m(e));const n=t.C=_.concat(t.C,e),r=t.A,i=t.A=r+_.l(e);if(i>9007199254740991)throw new s("Cannot hash more than 2^53 - 1 bits");const o=new c(n);let f=0;for(let e=t.blockSize+r-(t.blockSize+r&t.blockSize-1);i>=e;e+=t.blockSize)t.I(o.subarray(16*f,16*(f+1))),f+=1;return n.splice(0,16*f),t}P(){const e=this;let t=e.C;const n=e.S;t=_.concat(t,[_.h(1,1)]);for(let e=t.length+2;15&e;e++)t.push(0);for(t.push(r.floor(e.A/4294967296)),t.push(0|e.A);t.length;)e.I(t.splice(0,16));return e.reset(),n}D(e,t,n,r){return e>19?e>39?e>59?e>79?void 0:t^n^r:t&n|t&r|n&r:t^n^r:t&n|~t&r}V(e,t){return t<<e|t>>>32-e}I(t){const n=this,s=n.S,i=e(80);for(let e=0;16>e;e++)i[e]=t[e];let o=s[0],c=s[1],f=s[2],a=s[3],l=s[4];for(let e=0;79>=e;e++){16>e||(i[e]=n.V(1,i[e-3]^i[e-8]^i[e-14]^i[e-16]));const t=n.V(5,o)+n.D(e,c,f,a)+l+i[e]+n.v[r.floor(e/20)]|0;l=a,a=f,f=n.V(30,c),c=o,o=t}s[0]=s[0]+o|0,s[1]=s[1]+c|0,s[2]=s[2]+f|0,s[3]=s[3]+a|0,s[4]=s[4]+l|0}},D={getRandomValues(e){const t=new c(e.buffer),n=e=>{let t=987654321;const n=4294967295;return()=>(t=36969*(65535&t)+(t>>16)&n,(((t<<16)+(e=18e3*(65535&e)+(e>>16)&n)&n)/4294967296+.5)*(r.random()>.5?1:-1))};for(let s,i=0;i<e.length;i+=4){const e=n(4294967296*(s||r.random()));s=987654071*e(),t[i/4]=4294967296*e()|0}return e}},V={importKey:e=>new V.R(I.bytes.m(e)),B(e,t,n,r){if(n=n||1e4,0>r||0>n)throw new s("invalid params to pbkdf2");const i=1+(r>>5)<<2;let o,c,f,a,u;const w=new ArrayBuffer(i),h=new l(w);let d=0;const p=_;for(t=I.bytes.m(t),u=1;(i||1)>d;u++){for(o=c=e.encrypt(p.concat(t,[u])),f=1;n>f;f++)for(c=e.encrypt(c),a=0;a<c.length;a++)o[a]^=c[a];for(f=0;(i||1)>d&&f<o.length;f++)h.setInt32(d,o[f]),d+=4}return w.slice(0,r/8)},R:class{constructor(e){const t=this,n=t.M=P,r=[[],[]];t.U=[new n,new n];const s=t.U[0].blockSize/32;e.length>s&&(e=(new n).update(e).P());for(let t=0;s>t;t++)r[0][t]=909522486^e[t],r[1][t]=1549556828^e[t];t.U[0].update(r[0]),t.U[1].update(r[1]),t.K=new n(t.U[0])}reset(){const e=this;e.K=new e.M(e.U[0]),e.N=!1}update(e){this.N=!0,this.K.update(e)}digest(){const e=this,t=e.K.P(),n=new e.M(e.U[1]).update(t).P();return e.reset(),n}encrypt(e){if(this.N)throw new s("encrypt on already updated hmac called!");return this.update(e),this.digest(e)}}},R=typeof h!=v&&typeof h.getRandomValues==S,B="Invalid password",E="Invalid signature",M="zipjs-abort-check-password";function U(e){return R?h.getRandomValues(e):D.getRandomValues(e)}const K=16,N={name:"PBKDF2"},O=t.assign({hash:{name:"HMAC"}},N),T=t.assign({iterations:1e3,hash:{name:"SHA-1"}},N),W=["deriveBits"],j=[8,12,16],H=[16,24,32],L=10,F=[0,0,0,0],q=typeof h!=v,G=q&&h.subtle,J=q&&typeof G!=v,Q=I.bytes,X=class{constructor(e){const t=this;t.O=[[[],[],[],[],[]],[[],[],[],[],[]]],t.O[0][0][0]||t.T();const n=t.O[0][4],r=t.O[1],i=e.length;let o,c,f,a=1;if(4!==i&&6!==i&&8!==i)throw new s("invalid aes key size");for(t.v=[c=e.slice(0),f=[]],o=i;4*i+28>o;o++){let e=c[o-1];(o%i==0||8===i&&o%i==4)&&(e=n[e>>>24]<<24^n[e>>16&255]<<16^n[e>>8&255]<<8^n[255&e],o%i==0&&(e=e<<8^e>>>24^a<<24,a=a<<1^283*(a>>7))),c[o]=c[o-i]^e}for(let e=0;o;e++,o--){const t=c[3&e?o:o-4];f[e]=4>=o||4>e?t:r[0][n[t>>>24]]^r[1][n[t>>16&255]]^r[2][n[t>>8&255]]^r[3][n[255&t]]}}encrypt(e){return this.W(e,0)}decrypt(e){return this.W(e,1)}T(){const e=this.O[0],t=this.O[1],n=e[4],r=t[4],s=[],i=[];let o,c,f,a;for(let e=0;256>e;e++)i[(s[e]=e<<1^283*(e>>7))^e]=e;for(let l=o=0;!n[l];l^=c||1,o=i[o]||1){let i=o^o<<1^o<<2^o<<3^o<<4;i=i>>8^255&i^99,n[l]=i,r[i]=l,a=s[f=s[c=s[l]]];let u=16843009*a^65537*f^257*c^16843008*l,w=257*s[i]^16843008*i;for(let n=0;4>n;n++)e[n][l]=w=w<<24^w>>>8,t[n][i]=u=u<<24^u>>>8}for(let n=0;5>n;n++)e[n]=e[n].slice(0),t[n]=t[n].slice(0)}W(e,t){if(4!==e.length)throw new s("invalid aes block size");const n=this.v[t],r=n.length/4-2,i=[0,0,0,0],o=this.O[t],c=o[0],f=o[1],a=o[2],l=o[3],u=o[4];let w,h,d,p=e[0]^n[0],y=e[t?3:1]^n[1],m=e[2]^n[2],b=e[t?1:3]^n[3],g=4;for(let e=0;r>e;e++)w=c[p>>>24]^f[y>>16&255]^a[m>>8&255]^l[255&b]^n[g],h=c[y>>>24]^f[m>>16&255]^a[b>>8&255]^l[255&p]^n[g+1],d=c[m>>>24]^f[b>>16&255]^a[p>>8&255]^l[255&y]^n[g+2],b=c[b>>>24]^f[p>>16&255]^a[y>>8&255]^l[255&m]^n[g+3],g+=4,p=w,y=h,m=d;for(let e=0;4>e;e++)i[t?3&-e:e]=u[p>>>24]<<24^u[y>>16&255]<<16^u[m>>8&255]<<8^u[255&b]^n[g++],w=p,p=y,y=m,m=b,b=w;return i}},Y=class{constructor(e,t){this.j=e,this.H=t,this.L=t}reset(){this.L=this.H}update(e){return this.F(this.j,e,this.L)}q(e){if(255&~(e>>24))e+=1<<24;else{let t=e>>16&255,n=e>>8&255,r=255&e;255===t?(t=0,255===n?(n=0,255===r?r=0:++r):++n):++t,e=0,e+=t<<16,e+=n<<8,e+=r}return e}G(e){0===(e[0]=this.q(e[0]))&&(e[1]=this.q(e[1]))}F(e,t,n){let r;if(!(r=t.length))return[];const s=_.l(t);for(let s=0;r>s;s+=4){this.G(n);const r=e.encrypt(n);t[s]^=r[0],t[s+1]^=r[1],t[s+2]^=r[2],t[s+3]^=r[3]}return _.u(t,s)}},Z=V.R;let $=q&&J&&typeof G.importKey==S,ee=q&&J&&typeof G.deriveBits==S;class te extends p{constructor({password:e,rawPassword:n,signed:r,encryptionStrength:o,checkPasswordOnly:c}){super({start(){t.assign(this,{ready:new u((e=>this.J=e)),password:ie(e,n),signed:r,X:o-1,pending:new i})},async transform(e,t){const n=this,{password:r,X:o,J:f,ready:a}=n;r?(await(async(e,t,n,r)=>{const i=await se(e,t,n,ce(r,0,j[t])),o=ce(r,j[t]);if(i[0]!=o[0]||i[1]!=o[1])throw new s(B)})(n,o,r,ce(e,0,j[o]+2)),e=ce(e,j[o]+2),c?t.error(new s(M)):f()):await a;const l=new i(e.length-L-(e.length-L)%K);t.enqueue(re(n,e,l,0,L,!0))},async flush(e){const{signed:t,Y:n,Z:r,pending:o,ready:c}=this;if(r&&n){await c;const f=ce(o,0,o.length-L),a=ce(o,o.length-L);let l=new i;if(f.length){const e=ae(Q,f);r.update(e);const t=n.update(e);l=fe(Q,t)}if(t){const e=ce(fe(Q,r.digest()),0,L);for(let t=0;L>t;t++)if(e[t]!=a[t])throw new s(E)}e.enqueue(l)}}})}}class ne extends p{constructor({password:e,rawPassword:n,encryptionStrength:r}){let s;super({start(){t.assign(this,{ready:new u((e=>this.J=e)),password:ie(e,n),X:r-1,pending:new i})},async transform(e,t){const n=this,{password:r,X:s,J:o,ready:c}=n;let f=new i;r?(f=await(async(e,t,n)=>{const r=U(new i(j[t]));return oe(r,await se(e,t,n,r))})(n,s,r),o()):await c;const a=new i(f.length+e.length-e.length%K);a.set(f,0),t.enqueue(re(n,e,a,f.length,0))},async flush(e){const{Y:t,Z:n,pending:r,ready:o}=this;if(n&&t){await o;let c=new i;if(r.length){const e=t.update(ae(Q,r));n.update(e),c=fe(Q,e)}s.signature=fe(Q,n.digest()).slice(0,L),e.enqueue(oe(c,s.signature))}}}),s=this}}function re(e,t,n,r,s,o){const{Y:c,Z:f,pending:a}=e,l=t.length-s;let u;for(a.length&&(t=oe(a,t),n=((e,t)=>{if(t&&t>e.length){const n=e;(e=new i(t)).set(n,0)}return e})(n,l-l%K)),u=0;l-K>=u;u+=K){const e=ae(Q,ce(t,u,u+K));o&&f.update(e);const s=c.update(e);o||f.update(s),n.set(fe(Q,s),u+r)}return e.pending=ce(t,u),n}async function se(n,r,s,o){n.password=null;const c=await(async(e,t,n,r,s)=>{if(!$)return V.importKey(t);try{return await G.importKey("raw",t,n,!1,s)}catch(e){return $=!1,V.importKey(t)}})(0,s,O,0,W),f=await(async(e,t,n)=>{if(!ee)return V.B(t,e.salt,T.iterations,n);try{return await G.deriveBits(e,t,n)}catch(r){return ee=!1,V.B(t,e.salt,T.iterations,n)}})(t.assign({salt:o},T),c,8*(2*H[r]+2)),a=new i(f),l=ae(Q,ce(a,0,H[r])),u=ae(Q,ce(a,H[r],2*H[r])),w=ce(a,2*H[r]);return t.assign(n,{keys:{key:l,$:u,passwordVerification:w},Y:new Y(new X(l),e.from(F)),Z:new Z(u)}),w}function ie(e,t){return t===k?(e=>{if(typeof w==v){const t=new i((e=unescape(encodeURIComponent(e))).length);for(let n=0;n<t.length;n++)t[n]=e.charCodeAt(n);return t}return(new w).encode(e)})(e):t}function oe(e,t){let n=e;return e.length+t.length&&(n=new i(e.length+t.length),n.set(e,0),n.set(t,e.length)),n}function ce(e,t,n){return e.subarray(t,n)}function fe(e,t){return e.p(t)}function ae(e,t){return e.m(t)}class le extends p{constructor({password:e,passwordVerification:n,checkPasswordOnly:r}){super({start(){t.assign(this,{password:e,passwordVerification:n}),de(this,e)},transform(e,t){const n=this;if(n.password){const t=we(n,e.subarray(0,12));if(n.password=null,t[11]!=n.passwordVerification)throw new s(B);e=e.subarray(12)}r?t.error(new s(M)):t.enqueue(we(n,e))}})}}class ue extends p{constructor({password:e,passwordVerification:n}){super({start(){t.assign(this,{password:e,passwordVerification:n}),de(this,e)},transform(e,t){const n=this;let r,s;if(n.password){n.password=null;const t=U(new i(12));t[11]=n.passwordVerification,r=new i(e.length+t.length),r.set(he(n,t),0),s=12}else r=new i(e.length),s=0;r.set(he(n,e),s),t.enqueue(r)}})}}function we(e,t){const n=new i(t.length);for(let r=0;r<t.length;r++)n[r]=ye(e)^t[r],pe(e,n[r]);return n}function he(e,t){const n=new i(t.length);for(let r=0;r<t.length;r++)n[r]=ye(e)^t[r],pe(e,t[r]);return n}function de(e,n){const r=[305419896,591751049,878082192];t.assign(e,{keys:r,ee:new x(r[0]),te:new x(r[2])});for(let t=0;t<n.length;t++)pe(e,n.charCodeAt(t))}function pe(e,t){let[n,s,i]=e.keys;e.ee.append([t]),n=~e.ee.get(),s=be(r.imul(be(s+me(n)),134775813)+1),e.te.append([s>>>24]),i=~e.te.get(),e.keys=[n,s,i]}function ye(e){const t=2|e.keys[2];return me(r.imul(t,1^t)>>>8)}function me(e){return 255&e}function be(e){return 4294967295&e}const ge="deflate-raw";class ke extends p{constructor(e,{chunkSize:t,CompressionStream:n,CompressionStreamNative:r}){super({});const{compressed:s,encrypted:i,useCompressionStream:o,zipCrypto:c,signed:f,level:a}=e,u=this;let w,h,d=Se(super.readable);i&&!c||!f||(w=new A,d=xe(d,w)),s&&(d=Ce(d,o,{level:a,chunkSize:t},r,n)),i&&(c?d=xe(d,new ue(e)):(h=new ne(e),d=xe(d,h))),ze(u,d,(()=>{let e;i&&!c&&(e=h.signature),i&&!c||!f||(e=new l(w.value.buffer).getUint32(0)),u.signature=e}))}}class ve extends p{constructor(e,{chunkSize:t,DecompressionStream:n,DecompressionStreamNative:r}){super({});const{zipCrypto:i,encrypted:o,signed:c,signature:f,compressed:a,useCompressionStream:u}=e;let w,h,d=Se(super.readable);o&&(i?d=xe(d,new le(e)):(h=new te(e),d=xe(d,h))),a&&(d=Ce(d,u,{chunkSize:t},r,n)),o&&!i||!c||(w=new A,d=xe(d,w)),ze(this,d,(()=>{if((!o||i)&&c){const e=new l(w.value.buffer);if(f!=e.getUint32(0,!1))throw new s(E)}}))}}function Se(e){return xe(e,new p({transform(e,t){e&&e.length&&t.enqueue(e)}}))}function ze(e,n,r){n=xe(n,new p({flush:r})),t.defineProperty(e,"readable",{get:()=>n})}function Ce(e,t,n,r,s){try{e=xe(e,new(t&&r?r:s)(ge,n))}catch(r){if(!t)return e;try{e=xe(e,new s(ge,n))}catch(t){return e}}return e}function xe(e,t){return e.pipeThrough(t)}const Ae="data",_e="close";class Ie extends p{constructor(e,n){super({});const r=this,{codecType:s}=e;let i;s.startsWith("deflate")?i=ke:s.startsWith("inflate")&&(i=ve);let o=0,c=0;const f=new i(e,n),a=super.readable,l=new p({transform(e,t){e&&e.length&&(c+=e.length,t.enqueue(e))},flush(){t.assign(r,{inputSize:c})}}),u=new p({transform(e,t){e&&e.length&&(o+=e.length,t.enqueue(e))},flush(){const{signature:e}=f;t.assign(r,{signature:e,outputSize:o,inputSize:c})}});t.defineProperty(r,"readable",{get:()=>a.pipeThrough(l).pipeThrough(f).pipeThrough(u)})}}class Pe extends p{constructor(e){let t;super({transform:function n(r,s){if(t){const e=new i(t.length+r.length);e.set(t),e.set(r,t.length),r=e,t=null}r.length>e?(s.enqueue(r.slice(0,e)),n(r.slice(e),s)):t=r},flush(e){t&&t.length&&e.enqueue(t)}})}}const De=new a,Ve=new a;let Re,Be=0,Ee=!0;async function Me(e){try{const{options:t,scripts:r,config:s}=e;if(r&&r.length)try{Ee?importScripts.apply(k,r):await Ue(r)}catch(e){Ee=!1,await Ue(r)}self.initCodec&&self.initCodec(),s.CompressionStreamNative=self.CompressionStream,s.DecompressionStreamNative=self.DecompressionStream,self.Deflate&&(s.CompressionStream=new z(self.Deflate)),self.Inflate&&(s.DecompressionStream=new z(self.Inflate));const i={highWaterMark:1},o=e.readable||new y({async pull(e){const t=new u((e=>De.set(Be,e)));Ke({type:"pull",messageId:Be}),Be=(Be+1)%n.MAX_SAFE_INTEGER;const{value:r,done:s}=await t;e.enqueue(r),s&&e.close()}},i),c=e.writable||new m({async write(e){let t;const r=new u((e=>t=e));Ve.set(Be,t),Ke({type:Ae,value:e,messageId:Be}),Be=(Be+1)%n.MAX_SAFE_INTEGER,await r}},i),f=new Ie(t,s);Re=new AbortController;const{signal:a}=Re;await o.pipeThrough(f).pipeThrough(new Pe(s.chunkSize)).pipeTo(c,{signal:a,preventClose:!0,preventAbort:!0}),await c.getWriter().close();const{signature:l,inputSize:w,outputSize:h}=f;Ke({type:_e,result:{signature:l,inputSize:w,outputSize:h}})}catch(e){Ne(e)}}async function Ue(e){for(const t of e)await import(t)}function Ke(e){let{value:t}=e;if(t)if(t.length)try{t=new i(t),e.value=t.buffer,d(e,[e.value])}catch(t){d(e)}else d(e);else d(e)}function Ne(e=new s("Unknown error")){const{message:t,stack:n,code:r,name:i}=e;d({error:{message:t,stack:n,code:r,name:i}})}addEventListener("message",(({data:e})=>{const{type:t,messageId:n,value:r,done:s}=e;try{if("start"==t&&Me(e),t==Ae){const e=De.get(n);De.delete(n),e({value:new i(r),done:s})}if("ack"==t){const e=Ve.get(n);Ve.delete(n),e()}t==_e&&Re.abort()}catch(e){Ne(e)}}));const Oe=-2;function Te(t){return We(t.map((([t,n])=>new e(t).fill(n,0,t))))}function We(t){return t.reduce(((t,n)=>t.concat(e.isArray(n)?We(n):n)),[])}const je=[0,1,2,3].concat(...Te([[2,4],[2,5],[4,6],[4,7],[8,8],[8,9],[16,10],[16,11],[32,12],[32,13],[64,14],[64,15],[2,0],[1,16],[1,17],[2,18],[2,19],[4,20],[4,21],[8,22],[8,23],[16,24],[16,25],[32,26],[32,27],[64,28],[64,29]]));function He(){const e=this;function t(e,t){let n=0;do{n|=1&e,e>>>=1,n<<=1}while(--t>0);return n>>>1}e.ne=n=>{const s=e.re,i=e.ie.se,o=e.ie.oe;let c,f,a,l=-1;for(n.ce=0,n.fe=573,c=0;o>c;c++)0!==s[2*c]?(n.ae[++n.ce]=l=c,n.le[c]=0):s[2*c+1]=0;for(;2>n.ce;)a=n.ae[++n.ce]=2>l?++l:0,s[2*a]=1,n.le[a]=0,n.ue--,i&&(n.we-=i[2*a+1]);for(e.he=l,c=r.floor(n.ce/2);c>=1;c--)n.de(s,c);a=o;do{c=n.ae[1],n.ae[1]=n.ae[n.ce--],n.de(s,1),f=n.ae[1],n.ae[--n.fe]=c,n.ae[--n.fe]=f,s[2*a]=s[2*c]+s[2*f],n.le[a]=r.max(n.le[c],n.le[f])+1,s[2*c+1]=s[2*f+1]=a,n.ae[1]=a++,n.de(s,1)}while(n.ce>=2);n.ae[--n.fe]=n.ae[1],(t=>{const n=e.re,r=e.ie.se,s=e.ie.pe,i=e.ie.ye,o=e.ie.me;let c,f,a,l,u,w,h=0;for(l=0;15>=l;l++)t.be[l]=0;for(n[2*t.ae[t.fe]+1]=0,c=t.fe+1;573>c;c++)f=t.ae[c],l=n[2*n[2*f+1]+1]+1,l>o&&(l=o,h++),n[2*f+1]=l,f>e.he||(t.be[l]++,u=0,i>f||(u=s[f-i]),w=n[2*f],t.ue+=w*(l+u),r&&(t.we+=w*(r[2*f+1]+u)));if(0!==h){do{for(l=o-1;0===t.be[l];)l--;t.be[l]--,t.be[l+1]+=2,t.be[o]--,h-=2}while(h>0);for(l=o;0!==l;l--)for(f=t.be[l];0!==f;)a=t.ae[--c],a>e.he||(n[2*a+1]!=l&&(t.ue+=(l-n[2*a+1])*n[2*a],n[2*a+1]=l),f--)}})(n),((e,n,r)=>{const s=[];let i,o,c,f=0;for(i=1;15>=i;i++)s[i]=f=f+r[i-1]<<1;for(o=0;n>=o;o++)c=e[2*o+1],0!==c&&(e[2*o]=t(s[c]++,c))})(s,e.he,n.be)}}function Le(e,t,n,r,s){const i=this;i.se=e,i.pe=t,i.ye=n,i.oe=r,i.me=s}He.ge=[0,1,2,3,4,5,6,7].concat(...Te([[2,8],[2,9],[2,10],[2,11],[4,12],[4,13],[4,14],[4,15],[8,16],[8,17],[8,18],[8,19],[16,20],[16,21],[16,22],[16,23],[32,24],[32,25],[32,26],[31,27],[1,28]])),He.ke=[0,1,2,3,4,5,6,7,8,10,12,14,16,20,24,28,32,40,48,56,64,80,96,112,128,160,192,224,0],He.ve=[0,1,2,3,4,6,8,12,16,24,32,48,64,96,128,192,256,384,512,768,1024,1536,2048,3072,4096,6144,8192,12288,16384,24576],He.Se=e=>256>e?je[e]:je[256+(e>>>7)],He.ze=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],He.Ce=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],He.xe=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],He.Ae=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];const Fe=Te([[144,8],[112,9],[24,7],[8,8]]);Le._e=We([12,140,76,204,44,172,108,236,28,156,92,220,60,188,124,252,2,130,66,194,34,162,98,226,18,146,82,210,50,178,114,242,10,138,74,202,42,170,106,234,26,154,90,218,58,186,122,250,6,134,70,198,38,166,102,230,22,150,86,214,54,182,118,246,14,142,78,206,46,174,110,238,30,158,94,222,62,190,126,254,1,129,65,193,33,161,97,225,17,145,81,209,49,177,113,241,9,137,73,201,41,169,105,233,25,153,89,217,57,185,121,249,5,133,69,197,37,165,101,229,21,149,85,213,53,181,117,245,13,141,77,205,45,173,109,237,29,157,93,221,61,189,125,253,19,275,147,403,83,339,211,467,51,307,179,435,115,371,243,499,11,267,139,395,75,331,203,459,43,299,171,427,107,363,235,491,27,283,155,411,91,347,219,475,59,315,187,443,123,379,251,507,7,263,135,391,71,327,199,455,39,295,167,423,103,359,231,487,23,279,151,407,87,343,215,471,55,311,183,439,119,375,247,503,15,271,143,399,79,335,207,463,47,303,175,431,111,367,239,495,31,287,159,415,95,351,223,479,63,319,191,447,127,383,255,511,0,64,32,96,16,80,48,112,8,72,40,104,24,88,56,120,4,68,36,100,20,84,52,116,3,131,67,195,35,163,99,227].map(((e,t)=>[e,Fe[t]])));const qe=Te([[30,5]]);function Ge(e,t,n,r,s){const i=this;i.Ie=e,i.Pe=t,i.De=n,i.Ve=r,i.Re=s}Le.Be=We([0,16,8,24,4,20,12,28,2,18,10,26,6,22,14,30,1,17,9,25,5,21,13,29,3,19,11,27,7,23].map(((e,t)=>[e,qe[t]]))),Le.Ee=new Le(Le._e,He.ze,257,286,15),Le.Me=new Le(Le.Be,He.Ce,0,30,15),Le.Ue=new Le(null,He.xe,0,19,7);const Je=[new Ge(0,0,0,0,0),new Ge(4,4,8,4,1),new Ge(4,5,16,8,1),new Ge(4,6,32,32,1),new Ge(4,4,16,16,2),new Ge(8,16,32,32,2),new Ge(8,16,128,128,2),new Ge(8,32,128,256,2),new Ge(32,128,258,1024,2),new Ge(32,258,258,4096,2)],Qe=["need dictionary","stream end","","","stream error","data error","","buffer error","",""],Xe=113,Ye=666,Ze=262;function $e(e,t,n,r){const s=e[2*t],i=e[2*n];return i>s||s==i&&r[t]<=r[n]}function et(){const e=this;let t,n,s,c,f,a,l,u,w,h,d,p,y,m,b,g,k,v,S,z,C,x,A,_,I,P,D,V,R,B,E,M,U;const K=new He,N=new He,O=new He;let T,W,j,H,L,F;function q(){let t;for(t=0;286>t;t++)E[2*t]=0;for(t=0;30>t;t++)M[2*t]=0;for(t=0;19>t;t++)U[2*t]=0;E[512]=1,e.ue=e.we=0,W=j=0}function G(e,t){let n,r=-1,s=e[1],i=0,o=7,c=4;0===s&&(o=138,c=3),e[2*(t+1)+1]=65535;for(let f=0;t>=f;f++)n=s,s=e[2*(f+1)+1],++i<o&&n==s||(c>i?U[2*n]+=i:0!==n?(n!=r&&U[2*n]++,U[32]++):i>10?U[36]++:U[34]++,i=0,r=n,0===s?(o=138,c=3):n==s?(o=6,c=3):(o=7,c=4))}function J(t){e.Ke[e.pending++]=t}function Q(e){J(255&e),J(e>>>8&255)}function X(e,t){let n;const r=t;F>16-r?(n=e,L|=n<<F&65535,Q(L),L=n>>>16-F,F+=r-16):(L|=e<<F&65535,F+=r)}function Y(e,t){const n=2*e;X(65535&t[n],65535&t[n+1])}function Z(e,t){let n,r,s=-1,i=e[1],o=0,c=7,f=4;for(0===i&&(c=138,f=3),n=0;t>=n;n++)if(r=i,i=e[2*(n+1)+1],++o>=c||r!=i){if(f>o)do{Y(r,U)}while(0!=--o);else 0!==r?(r!=s&&(Y(r,U),o--),Y(16,U),X(o-3,2)):o>10?(Y(18,U),X(o-11,7)):(Y(17,U),X(o-3,3));o=0,s=r,0===i?(c=138,f=3):r==i?(c=6,f=3):(c=7,f=4)}}function $(){16==F?(Q(L),L=0,F=0):8>F||(J(255&L),L>>>=8,F-=8)}function ee(t,n){let s,i,o;if(e.Ne[W]=t,e.Oe[W]=255&n,W++,0===t?E[2*n]++:(j++,t--,E[2*(He.ge[n]+256+1)]++,M[2*He.Se(t)]++),!(8191&W)&&D>2){for(s=8*W,i=C-k,o=0;30>o;o++)s+=M[2*o]*(5+He.Ce[o]);if(s>>>=3,j<r.floor(W/2)&&s<r.floor(i/2))return!0}return W==T-1}function te(t,n){let r,s,i,o,c=0;if(0!==W)do{r=e.Ne[c],s=e.Oe[c],c++,0===r?Y(s,t):(i=He.ge[s],Y(i+256+1,t),o=He.ze[i],0!==o&&(s-=He.ke[i],X(s,o)),r--,i=He.Se(r),Y(i,n),o=He.Ce[i],0!==o&&(r-=He.ve[i],X(r,o)))}while(W>c);Y(256,t),H=t[513]}function ne(){F>8?Q(L):F>0&&J(255&L),L=0,F=0}function re(t,n,r){X(0+(r?1:0),3),((t,n)=>{ne(),H=8,Q(n),Q(~n),e.Ke.set(u.subarray(t,t+n),e.pending),e.pending+=n})(t,n)}function se(n){((t,n,r)=>{let s,i,o=0;D>0?(K.ne(e),N.ne(e),o=(()=>{let t;for(G(E,K.he),G(M,N.he),O.ne(e),t=18;t>=3&&0===U[2*He.Ae[t]+1];t--);return e.ue+=14+3*(t+1),t})(),s=e.ue+3+7>>>3,i=e.we+3+7>>>3,i>s||(s=i)):s=i=n+5,n+4>s||-1==t?i==s?(X(2+(r?1:0),3),te(Le._e,Le.Be)):(X(4+(r?1:0),3),((e,t,n)=>{let r;for(X(e-257,5),X(t-1,5),X(n-4,4),r=0;n>r;r++)X(U[2*He.Ae[r]+1],3);Z(E,e-1),Z(M,t-1)})(K.he+1,N.he+1,o+1),te(E,M)):re(t,n,r),q(),r&&ne()})(0>k?-1:k,C-k,n),k=C,t.Te()}function ie(){let e,n,r,s;do{if(s=w-A-C,0===s&&0===C&&0===A)s=f;else if(-1==s)s--;else if(C>=f+f-Ze){u.set(u.subarray(f,f+f),0),x-=f,C-=f,k-=f,e=y,r=e;do{n=65535&d[--r],d[r]=f>n?0:n-f}while(0!=--e);e=f,r=e;do{n=65535&h[--r],h[r]=f>n?0:n-f}while(0!=--e);s+=f}if(0===t.We)return;e=t.je(u,C+A,s),A+=e,3>A||(p=255&u[C],p=(p<<g^255&u[C+1])&b)}while(Ze>A&&0!==t.We)}function oe(e){let t,n,r=I,s=C,i=_;const o=C>f-Ze?C-(f-Ze):0;let c=B;const a=l,w=C+258;let d=u[s+i-1],p=u[s+i];R>_||(r>>=2),c>A&&(c=A);do{if(t=e,u[t+i]==p&&u[t+i-1]==d&&u[t]==u[s]&&u[++t]==u[s+1]){s+=2,t++;do{}while(u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&u[++s]==u[++t]&&w>s);if(n=258-(w-s),s=w-258,n>i){if(x=e,i=n,n>=c)break;d=u[s+i-1],p=u[s+i]}}}while((e=65535&h[e&a])>o&&0!=--r);return i>A?A:i}e.le=[],e.be=[],e.ae=[],E=[],M=[],U=[],e.de=(t,n)=>{const r=e.ae,s=r[n];let i=n<<1;for(;i<=e.ce&&(i<e.ce&&$e(t,r[i+1],r[i],e.le)&&i++,!$e(t,s,r[i],e.le));)r[n]=r[i],n=i,i<<=1;r[n]=s},e.He=(t,S,x,W,j,G)=>(W||(W=8),j||(j=8),G||(G=0),t.Le=null,-1==S&&(S=6),1>j||j>9||8!=W||9>x||x>15||0>S||S>9||0>G||G>2?Oe:(t.Fe=e,a=x,f=1<<a,l=f-1,m=j+7,y=1<<m,b=y-1,g=r.floor((m+3-1)/3),u=new i(2*f),h=[],d=[],T=1<<j+6,e.Ke=new i(4*T),s=4*T,e.Ne=new o(T),e.Oe=new i(T),D=S,V=G,(t=>(t.qe=t.Ge=0,t.Le=null,e.pending=0,e.Je=0,n=Xe,c=0,K.re=E,K.ie=Le.Ee,N.re=M,N.ie=Le.Me,O.re=U,O.ie=Le.Ue,L=0,F=0,H=8,q(),(()=>{w=2*f,d[y-1]=0;for(let e=0;y-1>e;e++)d[e]=0;P=Je[D].Pe,R=Je[D].Ie,B=Je[D].De,I=Je[D].Ve,C=0,k=0,A=0,v=_=2,z=0,p=0})(),0))(t))),e.Qe=()=>42!=n&&n!=Xe&&n!=Ye?Oe:(e.Oe=null,e.Ne=null,e.Ke=null,d=null,h=null,u=null,e.Fe=null,n==Xe?-3:0),e.Xe=(e,t,n)=>{let r=0;return-1==t&&(t=6),0>t||t>9||0>n||n>2?Oe:(Je[D].Re!=Je[t].Re&&0!==e.qe&&(r=e.Ye(1)),D!=t&&(D=t,P=Je[D].Pe,R=Je[D].Ie,B=Je[D].De,I=Je[D].Ve),V=n,r)},e.Ze=(e,t,r)=>{let s,i=r,o=0;if(!t||42!=n)return Oe;if(3>i)return 0;for(i>f-Ze&&(i=f-Ze,o=r-i),u.set(t.subarray(o,o+i),0),C=i,k=i,p=255&u[0],p=(p<<g^255&u[1])&b,s=0;i-3>=s;s++)p=(p<<g^255&u[s+2])&b,h[s&l]=d[p],d[p]=s;return 0},e.Ye=(r,i)=>{let o,w,m,I,R;if(i>4||0>i)return Oe;if(!r.$e||!r.et&&0!==r.We||n==Ye&&4!=i)return r.Le=Qe[4],Oe;if(0===r.tt)return r.Le=Qe[7],-5;var B;if(t=r,I=c,c=i,42==n&&(w=8+(a-8<<4)<<8,m=(D-1&255)>>1,m>3&&(m=3),w|=m<<6,0!==C&&(w|=32),w+=31-w%31,n=Xe,J((B=w)>>8&255),J(255&B)),0!==e.pending){if(t.Te(),0===t.tt)return c=-1,0}else if(0===t.We&&I>=i&&4!=i)return t.Le=Qe[7],-5;if(n==Ye&&0!==t.We)return r.Le=Qe[7],-5;if(0!==t.We||0!==A||0!=i&&n!=Ye){switch(R=-1,Je[D].Re){case 0:R=(e=>{let n,r=65535;for(r>s-5&&(r=s-5);;){if(1>=A){if(ie(),0===A&&0==e)return 0;if(0===A)break}if(C+=A,A=0,n=k+r,(0===C||C>=n)&&(A=C-n,C=n,se(!1),0===t.tt))return 0;if(C-k>=f-Ze&&(se(!1),0===t.tt))return 0}return se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i);break;case 1:R=(e=>{let n,r=0;for(;;){if(Ze>A){if(ie(),Ze>A&&0==e)return 0;if(0===A)break}if(3>A||(p=(p<<g^255&u[C+2])&b,r=65535&d[p],h[C&l]=d[p],d[p]=C),0===r||(C-r&65535)>f-Ze||2!=V&&(v=oe(r)),3>v)n=ee(0,255&u[C]),A--,C++;else if(n=ee(C-x,v-3),A-=v,v>P||3>A)C+=v,v=0,p=255&u[C],p=(p<<g^255&u[C+1])&b;else{v--;do{C++,p=(p<<g^255&u[C+2])&b,r=65535&d[p],h[C&l]=d[p],d[p]=C}while(0!=--v);C++}if(n&&(se(!1),0===t.tt))return 0}return se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i);break;case 2:R=(e=>{let n,r,s=0;for(;;){if(Ze>A){if(ie(),Ze>A&&0==e)return 0;if(0===A)break}if(3>A||(p=(p<<g^255&u[C+2])&b,s=65535&d[p],h[C&l]=d[p],d[p]=C),_=v,S=x,v=2,0!==s&&P>_&&f-Ze>=(C-s&65535)&&(2!=V&&(v=oe(s)),5>=v&&(1==V||3==v&&C-x>4096)&&(v=2)),3>_||v>_)if(0!==z){if(n=ee(0,255&u[C-1]),n&&se(!1),C++,A--,0===t.tt)return 0}else z=1,C++,A--;else{r=C+A-3,n=ee(C-1-S,_-3),A-=_-1,_-=2;do{++C>r||(p=(p<<g^255&u[C+2])&b,s=65535&d[p],h[C&l]=d[p],d[p]=C)}while(0!=--_);if(z=0,v=2,C++,n&&(se(!1),0===t.tt))return 0}}return 0!==z&&(n=ee(0,255&u[C-1]),z=0),se(4==e),0===t.tt?4==e?2:0:4==e?3:1})(i)}if(2!=R&&3!=R||(n=Ye),0==R||2==R)return 0===t.tt&&(c=-1),0;if(1==R){if(1==i)X(2,3),Y(256,Le._e),$(),9>1+H+10-F&&(X(2,3),Y(256,Le._e),$()),H=7;else if(re(0,0,!1),3==i)for(o=0;y>o;o++)d[o]=0;if(t.Te(),0===t.tt)return c=-1,0}}return 4!=i?0:1}}function tt(){const e=this;e.nt=0,e.rt=0,e.We=0,e.qe=0,e.tt=0,e.Ge=0}function nt(e){const t=new tt,n=(o=e&&e.chunkSize?e.chunkSize:65536)+5*(r.floor(o/16383)+1);var o;const c=new i(n);let f=e?e.level:-1;void 0===f&&(f=-1),t.He(f),t.$e=c,this.append=(e,r)=>{let o,f,a=0,l=0,u=0;const w=[];if(e.length){t.nt=0,t.et=e,t.We=e.length;do{if(t.rt=0,t.tt=n,o=t.Ye(0),0!=o)throw new s("deflating: "+t.Le);t.rt&&(t.rt==n?w.push(new i(c)):w.push(c.subarray(0,t.rt))),u+=t.rt,r&&t.nt>0&&t.nt!=a&&(r(t.nt),a=t.nt)}while(t.We>0||0===t.tt);return w.length>1?(f=new i(u),w.forEach((e=>{f.set(e,l),l+=e.length}))):f=w[0]?new i(w[0]):new i,f}},this.flush=()=>{let e,r,o=0,f=0;const a=[];do{if(t.rt=0,t.tt=n,e=t.Ye(4),1!=e&&0!=e)throw new s("deflating: "+t.Le);n-t.tt>0&&a.push(c.slice(0,t.rt)),f+=t.rt}while(t.We>0||0===t.tt);return t.Qe(),r=new i(f),a.forEach((e=>{r.set(e,o),o+=e.length})),r}}tt.prototype={He(e,t){const n=this;return n.Fe=new et,t||(t=15),n.Fe.He(n,e,t)},Ye(e){const t=this;return t.Fe?t.Fe.Ye(t,e):Oe},Qe(){const e=this;if(!e.Fe)return Oe;const t=e.Fe.Qe();return e.Fe=null,t},Xe(e,t){const n=this;return n.Fe?n.Fe.Xe(n,e,t):Oe},Ze(e,t){const n=this;return n.Fe?n.Fe.Ze(n,e,t):Oe},je(e,t,n){const r=this;let s=r.We;return s>n&&(s=n),0===s?0:(r.We-=s,e.set(r.et.subarray(r.nt,r.nt+s),t),r.nt+=s,r.qe+=s,s)},Te(){const e=this;let t=e.Fe.pending;t>e.tt&&(t=e.tt),0!==t&&(e.$e.set(e.Fe.Ke.subarray(e.Fe.Je,e.Fe.Je+t),e.rt),e.rt+=t,e.Fe.Je+=t,e.Ge+=t,e.tt-=t,e.Fe.pending-=t,0===e.Fe.pending&&(e.Fe.Je=0))}};const rt=-2,st=-3,it=-5,ot=[0,1,3,7,15,31,63,127,255,511,1023,2047,4095,8191,16383,32767,65535],ct=[96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,192,80,7,10,0,8,96,0,8,32,0,9,160,0,8,0,0,8,128,0,8,64,0,9,224,80,7,6,0,8,88,0,8,24,0,9,144,83,7,59,0,8,120,0,8,56,0,9,208,81,7,17,0,8,104,0,8,40,0,9,176,0,8,8,0,8,136,0,8,72,0,9,240,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,200,81,7,13,0,8,100,0,8,36,0,9,168,0,8,4,0,8,132,0,8,68,0,9,232,80,7,8,0,8,92,0,8,28,0,9,152,84,7,83,0,8,124,0,8,60,0,9,216,82,7,23,0,8,108,0,8,44,0,9,184,0,8,12,0,8,140,0,8,76,0,9,248,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,196,81,7,11,0,8,98,0,8,34,0,9,164,0,8,2,0,8,130,0,8,66,0,9,228,80,7,7,0,8,90,0,8,26,0,9,148,84,7,67,0,8,122,0,8,58,0,9,212,82,7,19,0,8,106,0,8,42,0,9,180,0,8,10,0,8,138,0,8,74,0,9,244,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,204,81,7,15,0,8,102,0,8,38,0,9,172,0,8,6,0,8,134,0,8,70,0,9,236,80,7,9,0,8,94,0,8,30,0,9,156,84,7,99,0,8,126,0,8,62,0,9,220,82,7,27,0,8,110,0,8,46,0,9,188,0,8,14,0,8,142,0,8,78,0,9,252,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,194,80,7,10,0,8,97,0,8,33,0,9,162,0,8,1,0,8,129,0,8,65,0,9,226,80,7,6,0,8,89,0,8,25,0,9,146,83,7,59,0,8,121,0,8,57,0,9,210,81,7,17,0,8,105,0,8,41,0,9,178,0,8,9,0,8,137,0,8,73,0,9,242,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,202,81,7,13,0,8,101,0,8,37,0,9,170,0,8,5,0,8,133,0,8,69,0,9,234,80,7,8,0,8,93,0,8,29,0,9,154,84,7,83,0,8,125,0,8,61,0,9,218,82,7,23,0,8,109,0,8,45,0,9,186,0,8,13,0,8,141,0,8,77,0,9,250,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,198,81,7,11,0,8,99,0,8,35,0,9,166,0,8,3,0,8,131,0,8,67,0,9,230,80,7,7,0,8,91,0,8,27,0,9,150,84,7,67,0,8,123,0,8,59,0,9,214,82,7,19,0,8,107,0,8,43,0,9,182,0,8,11,0,8,139,0,8,75,0,9,246,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,206,81,7,15,0,8,103,0,8,39,0,9,174,0,8,7,0,8,135,0,8,71,0,9,238,80,7,9,0,8,95,0,8,31,0,9,158,84,7,99,0,8,127,0,8,63,0,9,222,82,7,27,0,8,111,0,8,47,0,9,190,0,8,15,0,8,143,0,8,79,0,9,254,96,7,256,0,8,80,0,8,16,84,8,115,82,7,31,0,8,112,0,8,48,0,9,193,80,7,10,0,8,96,0,8,32,0,9,161,0,8,0,0,8,128,0,8,64,0,9,225,80,7,6,0,8,88,0,8,24,0,9,145,83,7,59,0,8,120,0,8,56,0,9,209,81,7,17,0,8,104,0,8,40,0,9,177,0,8,8,0,8,136,0,8,72,0,9,241,80,7,4,0,8,84,0,8,20,85,8,227,83,7,43,0,8,116,0,8,52,0,9,201,81,7,13,0,8,100,0,8,36,0,9,169,0,8,4,0,8,132,0,8,68,0,9,233,80,7,8,0,8,92,0,8,28,0,9,153,84,7,83,0,8,124,0,8,60,0,9,217,82,7,23,0,8,108,0,8,44,0,9,185,0,8,12,0,8,140,0,8,76,0,9,249,80,7,3,0,8,82,0,8,18,85,8,163,83,7,35,0,8,114,0,8,50,0,9,197,81,7,11,0,8,98,0,8,34,0,9,165,0,8,2,0,8,130,0,8,66,0,9,229,80,7,7,0,8,90,0,8,26,0,9,149,84,7,67,0,8,122,0,8,58,0,9,213,82,7,19,0,8,106,0,8,42,0,9,181,0,8,10,0,8,138,0,8,74,0,9,245,80,7,5,0,8,86,0,8,22,192,8,0,83,7,51,0,8,118,0,8,54,0,9,205,81,7,15,0,8,102,0,8,38,0,9,173,0,8,6,0,8,134,0,8,70,0,9,237,80,7,9,0,8,94,0,8,30,0,9,157,84,7,99,0,8,126,0,8,62,0,9,221,82,7,27,0,8,110,0,8,46,0,9,189,0,8,14,0,8,142,0,8,78,0,9,253,96,7,256,0,8,81,0,8,17,85,8,131,82,7,31,0,8,113,0,8,49,0,9,195,80,7,10,0,8,97,0,8,33,0,9,163,0,8,1,0,8,129,0,8,65,0,9,227,80,7,6,0,8,89,0,8,25,0,9,147,83,7,59,0,8,121,0,8,57,0,9,211,81,7,17,0,8,105,0,8,41,0,9,179,0,8,9,0,8,137,0,8,73,0,9,243,80,7,4,0,8,85,0,8,21,80,8,258,83,7,43,0,8,117,0,8,53,0,9,203,81,7,13,0,8,101,0,8,37,0,9,171,0,8,5,0,8,133,0,8,69,0,9,235,80,7,8,0,8,93,0,8,29,0,9,155,84,7,83,0,8,125,0,8,61,0,9,219,82,7,23,0,8,109,0,8,45,0,9,187,0,8,13,0,8,141,0,8,77,0,9,251,80,7,3,0,8,83,0,8,19,85,8,195,83,7,35,0,8,115,0,8,51,0,9,199,81,7,11,0,8,99,0,8,35,0,9,167,0,8,3,0,8,131,0,8,67,0,9,231,80,7,7,0,8,91,0,8,27,0,9,151,84,7,67,0,8,123,0,8,59,0,9,215,82,7,19,0,8,107,0,8,43,0,9,183,0,8,11,0,8,139,0,8,75,0,9,247,80,7,5,0,8,87,0,8,23,192,8,0,83,7,51,0,8,119,0,8,55,0,9,207,81,7,15,0,8,103,0,8,39,0,9,175,0,8,7,0,8,135,0,8,71,0,9,239,80,7,9,0,8,95,0,8,31,0,9,159,84,7,99,0,8,127,0,8,63,0,9,223,82,7,27,0,8,111,0,8,47,0,9,191,0,8,15,0,8,143,0,8,79,0,9,255],ft=[80,5,1,87,5,257,83,5,17,91,5,4097,81,5,5,89,5,1025,85,5,65,93,5,16385,80,5,3,88,5,513,84,5,33,92,5,8193,82,5,9,90,5,2049,86,5,129,192,5,24577,80,5,2,87,5,385,83,5,25,91,5,6145,81,5,7,89,5,1537,85,5,97,93,5,24577,80,5,4,88,5,769,84,5,49,92,5,12289,82,5,13,90,5,3073,86,5,193,192,5,24577],at=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],lt=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,112,112],ut=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],wt=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];function ht(){let e,t,n,r,s,i;function o(e,t,o,c,f,a,l,u,w,h,d){let p,y,m,b,g,k,v,S,z,C,x,A,_,I,P;C=0,g=o;do{n[e[t+C]]++,C++,g--}while(0!==g);if(n[0]==o)return l[0]=-1,u[0]=0,0;for(S=u[0],k=1;15>=k&&0===n[k];k++);for(v=k,k>S&&(S=k),g=15;0!==g&&0===n[g];g--);for(m=g,S>g&&(S=g),u[0]=S,I=1<<k;g>k;k++,I<<=1)if(0>(I-=n[k]))return st;if(0>(I-=n[g]))return st;for(n[g]+=I,i[1]=k=0,C=1,_=2;0!=--g;)i[_]=k+=n[C],_++,C++;g=0,C=0;do{0!==(k=e[t+C])&&(d[i[k]++]=g),C++}while(++g<o);for(o=i[m],i[0]=g=0,C=0,b=-1,A=-S,s[0]=0,x=0,P=0;m>=v;v++)for(p=n[v];0!=p--;){for(;v>A+S;){if(b++,A+=S,P=m-A,P=P>S?S:P,(y=1<<(k=v-A))>p+1&&(y-=p+1,_=v,P>k))for(;++k<P&&(y<<=1)>n[++_];)y-=n[_];if(P=1<<k,h[0]+P>1440)return st;s[b]=x=h[0],h[0]+=P,0!==b?(i[b]=g,r[0]=k,r[1]=S,k=g>>>A-S,r[2]=x-s[b-1]-k,w.set(r,3*(s[b-1]+k))):l[0]=x}for(r[1]=v-A,o>C?d[C]<c?(r[0]=256>d[C]?0:96,r[2]=d[C++]):(r[0]=a[d[C]-c]+16+64,r[2]=f[d[C++]-c]):r[0]=192,y=1<<v-A,k=g>>>A;P>k;k+=y)w.set(r,3*(x+k));for(k=1<<v-1;g&k;k>>>=1)g^=k;for(g^=k,z=(1<<A)-1;(g&z)!=i[b];)b--,A-=S,z=(1<<A)-1}return 0!==I&&1!=m?it:0}function c(o){let c;for(e||(e=[],t=[],n=new f(16),r=[],s=new f(15),i=new f(16)),t.length<o&&(t=[]),c=0;o>c;c++)t[c]=0;for(c=0;16>c;c++)n[c]=0;for(c=0;3>c;c++)r[c]=0;s.set(n.subarray(0,15),0),i.set(n.subarray(0,16),0)}this.st=(n,r,s,i,f)=>{let a;return c(19),e[0]=0,a=o(n,0,19,19,null,null,s,r,i,e,t),a==st?f.Le="oversubscribed dynamic bit lengths tree":a!=it&&0!==r[0]||(f.Le="incomplete dynamic bit lengths tree",a=st),a},this.it=(n,r,s,i,f,a,l,u,w)=>{let h;return c(288),e[0]=0,h=o(s,0,n,257,at,lt,a,i,u,e,t),0!=h||0===i[0]?(h==st?w.Le="oversubscribed literal/length tree":-4!=h&&(w.Le="incomplete literal/length tree",h=st),h):(c(288),h=o(s,n,r,0,ut,wt,l,f,u,e,t),0!=h||0===f[0]&&n>257?(h==st?w.Le="oversubscribed distance tree":h==it?(w.Le="incomplete distance tree",h=st):-4!=h&&(w.Le="empty distance tree with lengths",h=st),h):0)}}function dt(){const e=this;let t,n,r,s,i=0,o=0,c=0,f=0,a=0,l=0,u=0,w=0,h=0,d=0;function p(e,t,n,r,s,i,o,c){let f,a,l,u,w,h,d,p,y,m,b,g,k,v,S,z;d=c.nt,p=c.We,w=o.ot,h=o.ct,y=o.write,m=y<o.read?o.read-y-1:o.end-y,b=ot[e],g=ot[t];do{for(;20>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;if(f=w&b,a=n,l=r,z=3*(l+f),0!==(u=a[z]))for(;;){if(w>>=a[z+1],h-=a[z+1],16&u){for(u&=15,k=a[z+2]+(w&ot[u]),w>>=u,h-=u;15>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;for(f=w&g,a=s,l=i,z=3*(l+f),u=a[z];;){if(w>>=a[z+1],h-=a[z+1],16&u){for(u&=15;u>h;)p--,w|=(255&c.ft(d++))<<h,h+=8;if(v=a[z+2]+(w&ot[u]),w>>=u,h-=u,m-=k,v>y){S=y-v;do{S+=o.end}while(0>S);if(u=o.end-S,k>u){if(k-=u,y-S>0&&u>y-S)do{o.lt[y++]=o.lt[S++]}while(0!=--u);else o.lt.set(o.lt.subarray(S,S+u),y),y+=u,S+=u,u=0;S=0}}else S=y-v,y-S>0&&2>y-S?(o.lt[y++]=o.lt[S++],o.lt[y++]=o.lt[S++],k-=2):(o.lt.set(o.lt.subarray(S,S+2),y),y+=2,S+=2,k-=2);if(y-S>0&&k>y-S)do{o.lt[y++]=o.lt[S++]}while(0!=--k);else o.lt.set(o.lt.subarray(S,S+k),y),y+=k,S+=k,k=0;break}if(64&u)return c.Le="invalid distance code",k=c.We-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.We=p,c.qe+=d-c.nt,c.nt=d,o.write=y,st;f+=a[z+2],f+=w&ot[u],z=3*(l+f),u=a[z]}break}if(64&u)return 32&u?(k=c.We-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.We=p,c.qe+=d-c.nt,c.nt=d,o.write=y,1):(c.Le="invalid literal/length code",k=c.We-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.We=p,c.qe+=d-c.nt,c.nt=d,o.write=y,st);if(f+=a[z+2],f+=w&ot[u],z=3*(l+f),0===(u=a[z])){w>>=a[z+1],h-=a[z+1],o.lt[y++]=a[z+2],m--;break}}else w>>=a[z+1],h-=a[z+1],o.lt[y++]=a[z+2],m--}while(m>=258&&p>=10);return k=c.We-p,k=k>h>>3?h>>3:k,p+=k,d-=k,h-=k<<3,o.ot=w,o.ct=h,c.We=p,c.qe+=d-c.nt,c.nt=d,o.write=y,0}e.init=(e,i,o,c,f,a)=>{t=0,u=e,w=i,r=o,h=c,s=f,d=a,n=null},e.ut=(e,y,m)=>{let b,g,k,v,S,z,C,x=0,A=0,_=0;for(_=y.nt,v=y.We,x=e.ot,A=e.ct,S=e.write,z=S<e.read?e.read-S-1:e.end-S;;)switch(t){case 0:if(z>=258&&v>=10&&(e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,m=p(u,w,r,h,s,d,e,y),_=y.nt,v=y.We,x=e.ot,A=e.ct,S=e.write,z=S<e.read?e.read-S-1:e.end-S,0!=m)){t=1==m?7:9;break}c=u,n=r,o=h,t=1;case 1:for(b=c;b>A;){if(0===v)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,x|=(255&y.ft(_++))<<A,A+=8}if(g=3*(o+(x&ot[b])),x>>>=n[g+1],A-=n[g+1],k=n[g],0===k){f=n[g+2],t=6;break}if(16&k){a=15&k,i=n[g+2],t=2;break}if(!(64&k)){c=k,o=g/3+n[g+2];break}if(32&k){t=7;break}return t=9,y.Le="invalid literal/length code",m=st,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 2:for(b=a;b>A;){if(0===v)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,x|=(255&y.ft(_++))<<A,A+=8}i+=x&ot[b],x>>=b,A-=b,c=w,n=s,o=d,t=3;case 3:for(b=c;b>A;){if(0===v)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,x|=(255&y.ft(_++))<<A,A+=8}if(g=3*(o+(x&ot[b])),x>>=n[g+1],A-=n[g+1],k=n[g],16&k){a=15&k,l=n[g+2],t=4;break}if(!(64&k)){c=k,o=g/3+n[g+2];break}return t=9,y.Le="invalid distance code",m=st,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 4:for(b=a;b>A;){if(0===v)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,v--,x|=(255&y.ft(_++))<<A,A+=8}l+=x&ot[b],x>>=b,A-=b,t=5;case 5:for(C=S-l;0>C;)C+=e.end;for(;0!==i;){if(0===z&&(S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z&&(e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z)))return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);e.lt[S++]=e.lt[C++],z--,C==e.end&&(C=0),i--}t=0;break;case 6:if(0===z&&(S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z&&(e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,S==e.end&&0!==e.read&&(S=0,z=S<e.read?e.read-S-1:e.end-S),0===z)))return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);m=0,e.lt[S++]=f,z--,t=0;break;case 7:if(A>7&&(A-=8,v++,_--),e.write=S,m=e.wt(y,m),S=e.write,z=S<e.read?e.read-S-1:e.end-S,e.read!=e.write)return e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);t=8;case 8:return m=1,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);case 9:return m=st,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m);default:return m=rt,e.ot=x,e.ct=A,y.We=v,y.qe+=_-y.nt,y.nt=_,e.write=S,e.wt(y,m)}},e.ht=()=>{}}ht.dt=(e,t,n,r)=>(e[0]=9,t[0]=5,n[0]=ct,r[0]=ft,0);const pt=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];function yt(e,t){const n=this;let r,s=0,o=0,c=0,a=0;const l=[0],u=[0],w=new dt;let h=0,d=new f(4320);const p=new ht;n.ct=0,n.ot=0,n.lt=new i(t),n.end=t,n.read=0,n.write=0,n.reset=(e,t)=>{t&&(t[0]=0),6==s&&w.ht(e),s=0,n.ct=0,n.ot=0,n.read=n.write=0},n.reset(e,null),n.wt=(e,t)=>{let r,s,i;return s=e.rt,i=n.read,r=(i>n.write?n.end:n.write)-i,r>e.tt&&(r=e.tt),0!==r&&t==it&&(t=0),e.tt-=r,e.Ge+=r,e.$e.set(n.lt.subarray(i,i+r),s),s+=r,i+=r,i==n.end&&(i=0,n.write==n.end&&(n.write=0),r=n.write-i,r>e.tt&&(r=e.tt),0!==r&&t==it&&(t=0),e.tt-=r,e.Ge+=r,e.$e.set(n.lt.subarray(i,i+r),s),s+=r,i+=r),e.rt=s,n.read=i,t},n.ut=(e,t)=>{let i,f,y,m,b,g,k,v;for(m=e.nt,b=e.We,f=n.ot,y=n.ct,g=n.write,k=g<n.read?n.read-g-1:n.end-g;;){let S,z,C,x,A,_,I,P;switch(s){case 0:for(;3>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}switch(i=7&f,h=1&i,i>>>1){case 0:f>>>=3,y-=3,i=7&y,f>>>=i,y-=i,s=1;break;case 1:S=[],z=[],C=[[]],x=[[]],ht.dt(S,z,C,x),w.init(S[0],z[0],C[0],0,x[0],0),f>>>=3,y-=3,s=6;break;case 2:f>>>=3,y-=3,s=3;break;case 3:return f>>>=3,y-=3,s=9,e.Le="invalid block type",t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t)}break;case 1:for(;32>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if((~f>>>16&65535)!=(65535&f))return s=9,e.Le="invalid stored block lengths",t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);o=65535&f,f=y=0,s=0!==o?2:0!==h?7:0;break;case 2:if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(0===k&&(g==n.end&&0!==n.read&&(g=0,k=g<n.read?n.read-g-1:n.end-g),0===k&&(n.write=g,t=n.wt(e,t),g=n.write,k=g<n.read?n.read-g-1:n.end-g,g==n.end&&0!==n.read&&(g=0,k=g<n.read?n.read-g-1:n.end-g),0===k)))return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(t=0,i=o,i>b&&(i=b),i>k&&(i=k),n.lt.set(e.je(m,i),g),m+=i,b-=i,g+=i,k-=i,0!=(o-=i))break;s=0!==h?7:0;break;case 3:for(;14>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(c=i=16383&f,(31&i)>29||(i>>5&31)>29)return s=9,e.Le="too many length or distance symbols",t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);if(i=258+(31&i)+(i>>5&31),!r||r.length<i)r=[];else for(v=0;i>v;v++)r[v]=0;f>>>=14,y-=14,a=0,s=4;case 4:for(;4+(c>>>10)>a;){for(;3>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}r[pt[a++]]=7&f,f>>>=3,y-=3}for(;19>a;)r[pt[a++]]=0;if(l[0]=7,i=p.st(r,l,u,d,e),0!=i)return(t=i)==st&&(r=null,s=9),n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);a=0,s=5;case 5:for(;i=c,258+(31&i)+(i>>5&31)>a;){let o,w;for(i=l[0];i>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(i=d[3*(u[0]+(f&ot[i]))+1],w=d[3*(u[0]+(f&ot[i]))+2],16>w)f>>>=i,y-=i,r[a++]=w;else{for(v=18==w?7:w-14,o=18==w?11:3;i+v>y;){if(0===b)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);t=0,b--,f|=(255&e.ft(m++))<<y,y+=8}if(f>>>=i,y-=i,o+=f&ot[v],f>>>=v,y-=v,v=a,i=c,v+o>258+(31&i)+(i>>5&31)||16==w&&1>v)return r=null,s=9,e.Le="invalid bit length repeat",t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);w=16==w?r[v-1]:0;do{r[v++]=w}while(0!=--o);a=v}}if(u[0]=-1,A=[],_=[],I=[],P=[],A[0]=9,_[0]=6,i=c,i=p.it(257+(31&i),1+(i>>5&31),r,A,_,I,P,d,e),0!=i)return i==st&&(r=null,s=9),t=i,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);w.init(A[0],_[0],d,I[0],d,P[0]),s=6;case 6:if(n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,1!=(t=w.ut(n,e,t)))return n.wt(e,t);if(t=0,w.ht(e),m=e.nt,b=e.We,f=n.ot,y=n.ct,g=n.write,k=g<n.read?n.read-g-1:n.end-g,0===h){s=0;break}s=7;case 7:if(n.write=g,t=n.wt(e,t),g=n.write,k=g<n.read?n.read-g-1:n.end-g,n.read!=n.write)return n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);s=8;case 8:return t=1,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);case 9:return t=st,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t);default:return t=rt,n.ot=f,n.ct=y,e.We=b,e.qe+=m-e.nt,e.nt=m,n.write=g,n.wt(e,t)}}},n.ht=e=>{n.reset(e,null),n.lt=null,d=null},n.yt=(e,t,r)=>{n.lt.set(e.subarray(t,t+r),0),n.read=n.write=r},n.bt=()=>1==s?1:0}const mt=13,bt=[0,0,255,255];function gt(){const e=this;function t(e){return e&&e.gt?(e.qe=e.Ge=0,e.Le=null,e.gt.mode=7,e.gt.kt.reset(e,null),0):rt}e.mode=0,e.method=0,e.vt=[0],e.St=0,e.marker=0,e.zt=0,e.Ct=t=>(e.kt&&e.kt.ht(t),e.kt=null,0),e.xt=(n,r)=>(n.Le=null,e.kt=null,8>r||r>15?(e.Ct(n),rt):(e.zt=r,n.gt.kt=new yt(n,1<<r),t(n),0)),e.At=(e,t)=>{let n,r;if(!e||!e.gt||!e.et)return rt;const s=e.gt;for(t=4==t?it:0,n=it;;)switch(s.mode){case 0:if(0===e.We)return n;if(n=t,e.We--,e.qe++,8!=(15&(s.method=e.ft(e.nt++)))){s.mode=mt,e.Le="unknown compression method",s.marker=5;break}if(8+(s.method>>4)>s.zt){s.mode=mt,e.Le="invalid win size",s.marker=5;break}s.mode=1;case 1:if(0===e.We)return n;if(n=t,e.We--,e.qe++,r=255&e.ft(e.nt++),((s.method<<8)+r)%31!=0){s.mode=mt,e.Le="incorrect header check",s.marker=5;break}if(!(32&r)){s.mode=7;break}s.mode=2;case 2:if(0===e.We)return n;n=t,e.We--,e.qe++,s.St=(255&e.ft(e.nt++))<<24&4278190080,s.mode=3;case 3:if(0===e.We)return n;n=t,e.We--,e.qe++,s.St+=(255&e.ft(e.nt++))<<16&16711680,s.mode=4;case 4:if(0===e.We)return n;n=t,e.We--,e.qe++,s.St+=(255&e.ft(e.nt++))<<8&65280,s.mode=5;case 5:return 0===e.We?n:(n=t,e.We--,e.qe++,s.St+=255&e.ft(e.nt++),s.mode=6,2);case 6:return s.mode=mt,e.Le="need dictionary",s.marker=0,rt;case 7:if(n=s.kt.ut(e,n),n==st){s.mode=mt,s.marker=0;break}if(0==n&&(n=t),1!=n)return n;n=t,s.kt.reset(e,s.vt),s.mode=12;case 12:return e.We=0,1;case mt:return st;default:return rt}},e._t=(e,t,n)=>{let r=0,s=n;if(!e||!e.gt||6!=e.gt.mode)return rt;const i=e.gt;return s<1<<i.zt||(s=(1<<i.zt)-1,r=n-s),i.kt.yt(t,r,s),i.mode=7,0},e.It=e=>{let n,r,s,i,o;if(!e||!e.gt)return rt;const c=e.gt;if(c.mode!=mt&&(c.mode=mt,c.marker=0),0===(n=e.We))return it;for(r=e.nt,s=c.marker;0!==n&&4>s;)e.ft(r)==bt[s]?s++:s=0!==e.ft(r)?0:4-s,r++,n--;return e.qe+=r-e.nt,e.nt=r,e.We=n,c.marker=s,4!=s?st:(i=e.qe,o=e.Ge,t(e),e.qe=i,e.Ge=o,c.mode=7,0)},e.Pt=e=>e&&e.gt&&e.gt.kt?e.gt.kt.bt():rt}function kt(){}function vt(e){const t=new kt,n=e&&e.chunkSize?r.floor(2*e.chunkSize):131072,o=new i(n);let c=!1;t.xt(),t.$e=o,this.append=(e,r)=>{const f=[];let a,l,u=0,w=0,h=0;if(0!==e.length){t.nt=0,t.et=e,t.We=e.length;do{if(t.rt=0,t.tt=n,0!==t.We||c||(t.nt=0,c=!0),a=t.At(0),c&&a===it){if(0!==t.We)throw new s("inflating: bad input")}else if(0!==a&&1!==a)throw new s("inflating: "+t.Le);if((c||1===a)&&t.We===e.length)throw new s("inflating: bad input");t.rt&&(t.rt===n?f.push(new i(o)):f.push(o.subarray(0,t.rt))),h+=t.rt,r&&t.nt>0&&t.nt!=u&&(r(t.nt),u=t.nt)}while(t.We>0||0===t.tt);return f.length>1?(l=new i(h),f.forEach((e=>{l.set(e,w),w+=e.length}))):l=f[0]?new i(f[0]):new i,l}},this.flush=()=>{t.Ct()}}kt.prototype={xt(e){const t=this;return t.gt=new gt,e||(e=15),t.gt.xt(t,e)},At(e){const t=this;return t.gt?t.gt.At(t,e):rt},Ct(){const e=this;if(!e.gt)return rt;const t=e.gt.Ct(e);return e.gt=null,t},It(){const e=this;return e.gt?e.gt.It(e):rt},_t(e,t){const n=this;return n.gt?n.gt._t(n,e,t):rt},ft(e){return this.et[e]},je(e,t){return this.et.subarray(e,e+t)}},self.initCodec=()=>{self.Deflate=nt,self.Inflate=vt};\n',s=()=>t.useDataURI?"data:text/javascript,"+encodeURIComponent(i):URL.createObjectURL(new Blob([i],{type:"text/javascript"}));Ec({workerScripts:{inflate:[s],deflate:[s]}})})(),Ec({Deflate:function(e){const t=new Wl,i=(s=e&&e.chunkSize?e.chunkSize:65536)+5*(Math.floor(s/16383)+1);var s;const a=new Uint8Array(i);let r=e?e.level:-1;void 0===r&&(r=-1),t.deflateInit(r),t.next_out=a,this.append=(e,s)=>{let r,n,o=0,l=0,c=0;const d=[];if(e.length){t.next_in_index=0,t.next_in=e,t.avail_in=e.length;do{if(t.next_out_index=0,t.avail_out=i,r=t.deflate(0),0!=r)throw Error("deflating: "+t.msg);t.next_out_index&&(t.next_out_index==i?d.push(new Uint8Array(a)):d.push(a.subarray(0,t.next_out_index))),c+=t.next_out_index,s&&t.next_in_index>0&&t.next_in_index!=o&&(s(t.next_in_index),o=t.next_in_index)}while(t.avail_in>0||0===t.avail_out);return d.length>1?(n=new Uint8Array(c),d.forEach(e=>{n.set(e,l),l+=e.length})):n=d[0]?new Uint8Array(d[0]):new Uint8Array,n}},this.flush=()=>{let e,s,r=0,n=0;const o=[];do{if(t.next_out_index=0,t.avail_out=i,e=t.deflate(4),1!=e&&0!=e)throw Error("deflating: "+t.msg);i-t.avail_out>0&&o.push(a.slice(0,t.next_out_index)),n+=t.next_out_index}while(t.avail_in>0||0===t.avail_out);return t.deflateEnd(),s=new Uint8Array(n),o.forEach(e=>{s.set(e,r),r+=e.length}),s}},Inflate:function(e){const t=new pc,i=e&&e.chunkSize?Math.floor(2*e.chunkSize):131072,s=new Uint8Array(i);let a=!1;t.inflateInit(),t.next_out=s,this.append=(e,r)=>{const n=[];let o,l,c=0,d=0,h=0;if(0!==e.length){t.next_in_index=0,t.next_in=e,t.avail_in=e.length;do{if(t.next_out_index=0,t.avail_out=i,0!==t.avail_in||a||(t.next_in_index=0,a=!0),o=t.inflate(0),a&&o===Vl){if(0!==t.avail_in)throw Error("inflating: bad input")}else if(0!==o&&1!==o)throw Error("inflating: "+t.msg);if((a||1===o)&&t.avail_in===e.length)throw Error("inflating: bad input");t.next_out_index&&(t.next_out_index===i?n.push(new Uint8Array(s)):n.push(s.subarray(0,t.next_out_index))),h+=t.next_out_index,r&&t.next_in_index>0&&t.next_in_index!=c&&(r(t.next_in_index),c=t.next_in_index)}while(t.avail_in>0||0===t.avail_out);return n.length>1?(l=new Uint8Array(h),n.forEach(e=>{l.set(e,d),d+=e.length})):l=n[0]?new Uint8Array(n[0]):new Uint8Array,l}},this.flush=()=>{t.inflateEnd()}}});const Gh=4096;function Yh(e){const t=new ArrayBuffer(4);return new DataView(t).setUint32(0,e,!0),new Uint8Array(t)}function Kh(e){const t=new ArrayBuffer(2);return new DataView(t).setUint16(0,e,!0),new Uint8Array(t)}function jh(e){return new Promise(t=>setTimeout(t,e))}class Wh{constructor(e){Wh.sequenceNumber=(Wh.sequenceNumber+1)%8;let t=[];const i=function(e,t,i,s,a){const r=new Uint8Array(4);return r[0]=192|(e|(e+1)%8<<3),r[1]=14|(15&a)<<4,r[2]=(4080&a)>>4,r[3]=1+~(r[0]+r[1]+r[2])&255,r}(Wh.sequenceNumber,0,0,0,e.length);t=t.concat(Array.from(i)),t=t.concat(Array.from(e));const s=function(e,t=65535){if(!(e instanceof Uint8Array))throw new Error("calcCrc16 requires Uint8Array input");for(let i=0;i<e.length;i++)t=t>>8&255|t<<8&65280,t^=e[i],t^=(255&t)>>4,t^=t<<8<<4,t^=(255&t)<<4<<1;return 65535&t}(new Uint8Array(t));t.push(255&s),t.push((65280&s)>>8);const a=function(e){const t=[];for(const i of e)192===i?t.push(219,220):219===i?t.push(219,221):t.push(i);return new Uint8Array(t)}(new Uint8Array(t));this.data=new Uint8Array([192,...a,192])}}!function(e,t){(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var i=t.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:0,enumerable:!0,configurable:!0,writable:!0}):e[t]=0}(Wh,"sequenceNumber");class Jh{constructor(e,t=!1){this.port=e,this.transferInProgress=!1,this.lastAck=-1,this.eraseBeforeUpdate=t}getReader(){const e=this.port.readable.getReader();return{read:()=>new Promise((t,i)=>{const s=setTimeout(()=>{e.releaseLock(),i(new Error("Read timeout"))},5e3);e.read().then(e=>{clearTimeout(s),t(e)})}),releaseLock:()=>e.releaseLock()}}async sendPacket(e){if(!this.port||!this.port.writable)throw new Error("Serial port not open or not writable.");const t=this.port.writable.getWriter();try{await t.write(e.data),console.debug("Sent packet:",e.data.length)}finally{t.releaseLock()}await this.getAck()}async getAck(){if(!this.port||!this.port.readable)throw new Error("Serial port not open or not readable.");const e=this.getReader();let t=[],i=0;try{for(Date.now();i<2;){const{value:s,done:a}=await e.read();if(a)throw new Error("Stream closed before receiving full ACK.");if(s)for(const e of s)t.push(e),192===e&&i++}}catch(e){throw Wh.sequenceNumber=0,e}finally{e.releaseLock()}const s=t.indexOf(192),a=t.indexOf(192,s+1);if(-1===s||-1===a)throw new Error("Received incomplete ACK.");const r=this.decodeSlip(t.slice(s+1,a));if(r.length<2)throw new Error("Received incomplete ACK.");const n=r[0]>>3&7;if(-1!==this.lastAck&&n!==(this.lastAck+1)%8)throw Wh.sequenceNumber=0,new Error(`Invalid ACK sequence. Expected ${(this.lastAck+1)%8}, got ${n}`);return this.lastAck=n,n}decodeSlip(e){const t=[];let i=0;for(;i<e.length;){if(219===e[i]){if(i++,i>=e.length)throw new Error("Invalid SLIP escape sequence: incomplete.");if(220===e[i])t.push(192);else{if(221!==e[i])throw new Error(`Invalid SLIP escape sequence: DB followed by ${e[i].toString(16)}`);t.push(219)}}else 192===e[i]||t.push(e[i]);i++}return new Uint8Array(t)}async sendInitPacket(e){const t=new Uint8Array([...Yh(1),...e,...Kh(0)]),i=new Wh(t);await this.sendPacket(i)}static async forceDfuMode(e){await e.open({baudRate:1200}),await jh(100),await e.close(),await jh(1500)}async sendStartDfu(e,t=0,i=0,s=0){const a=new Uint8Array([...Yh(3),...Yh(e),...Yh(t),...Yh(i),...Yh(s)]),r=new Wh(a);await this.sendPacket(r);const n=t+i+s,o=Math.max(.5,.0897*(n/Gh+1));await jh(1e3*o)}async sendErasePage(e){const t=new Uint8Array([...Yh(6),...Yh(e)]),i=new Wh(t);await this.sendPacket(i),await jh(89.7)}async eraseFlash(e){console.log("Erasing flash...");const t=Math.ceil(e/Gh);for(let e=0;e<t;e++){const t=0+e*Gh;console.log(`Erasing page ${e} at address 0x${t.toString(16)}`),await this.sendErasePage(t)}console.log("Flash erase complete.")}async sendFirmware(e,t){const i=[];let s=e.length;for(let t=0;t<e.length;t+=512){const s=e.subarray(t,t+512),a=new Uint8Array([...Yh(4),...s]),r=new Wh(a);i.push(r)}let a=0;await jh(102.4);for(const[e,r]of i.entries())await this.sendPacket(r),a+=r.data.length-6,t&&t(Math.min(100,Math.round(a/s*100))),(e+1)%8==0&&await jh(102.4);await jh(102.4);const r=new Wh(Yh(5));await this.sendPacket(r)}async dfuUpdate(e,t){if(this.transferInProgress)throw new Error("DFU update already in progress.");this.transferInProgress=!0,this.lastAck=-1,Wh.sequenceNumber=0;const i=new TextDecoder;try{await this.port.open({baudRate:115200});const s=new Rh(new Zd(e)),a=await s.getEntries();let r=null,n={};for(const e of a){const t=i.decode(e.rawFilename);if(console.debug("Found zip filename: ",t),"manifest.json"===t){const t=await e.getData(new eh);r=JSON.parse(t)}else(t.endsWith(".bin")||t.endsWith(".dat"))&&(n[t]=await e.getData(new th))}if(await s.close(),!r)throw new Error("manifest.json not found in the ZIP file.");if(!n[r.manifest.application.bin_file]||!n[r.manifest.application.dat_file])throw new Error("Application .bin or .dat file not found.");const o=n[r.manifest.application.bin_file],l=n[r.manifest.application.dat_file],c=o.length;this.eraseBeforeUpdate&&await this.eraseFlash(c),await this.sendStartDfu(4,0,0,c),await this.sendInitPacket(l),await this.sendFirmware(o,t),console.log("DFU update complete.")}catch(e){throw console.error("DFU Update failed:",e),e}finally{if(this.transferInProgress=!1,this.port&&this.port.readable)try{const e=this.port.readable.getReader();await e.cancel(),e.releaseLock()}catch(e){console.debug(`Error: closing reader: ${e}`)}if(this.port&&this.port.writable)try{const e=this.port.writable.getWriter();await e.close(),e.releaseLock()}catch(e){console.debug(`Error: closing writer: ${e}`)}if(this.port)try{await this.port.close()}catch(e){console.debug(`Error: closing port: ${e}`)}}}}class qh extends Error{}/*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) */function Vh(e){let t=e.length;for(;--t>=0;)e[t]=0}const Zh=new Uint8Array([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0]),Xh=new Uint8Array([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13]),ep=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7]),tp=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),ip=new Array(576);Vh(ip);const sp=new Array(60);Vh(sp);const ap=new Array(512);Vh(ap);const rp=new Array(256);Vh(rp);const np=new Array(29);Vh(np);const op=new Array(30);function lp(e,t,i,s,a){this.static_tree=e,this.extra_bits=t,this.extra_base=i,this.elems=s,this.max_length=a,this.has_stree=e&&e.length}let cp,dp,hp;function pp(e,t){this.dyn_tree=e,this.max_code=0,this.stat_desc=t}Vh(op);const up=e=>e<256?ap[e]:ap[256+(e>>>7)],gp=(e,t)=>{e.pending_buf[e.pending++]=255&t,e.pending_buf[e.pending++]=t>>>8&255},Ap=(e,t,i)=>{e.bi_valid>16-i?(e.bi_buf|=t<<e.bi_valid&65535,gp(e,e.bi_buf),e.bi_buf=t>>16-e.bi_valid,e.bi_valid+=i-16):(e.bi_buf|=t<<e.bi_valid&65535,e.bi_valid+=i)},fp=(e,t,i)=>{Ap(e,i[2*t],i[2*t+1])},mp=(e,t)=>{let i=0;do{i|=1&e,e>>>=1,i<<=1}while(--t>0);return i>>>1},_p=(e,t,i)=>{const s=new Array(16);let a,r,n=0;for(a=1;a<=15;a++)n=n+i[a-1]<<1,s[a]=n;for(r=0;r<=t;r++){let t=e[2*r+1];0!==t&&(e[2*r]=mp(s[t]++,t))}},vp=e=>{let t;for(t=0;t<286;t++)e.dyn_ltree[2*t]=0;for(t=0;t<30;t++)e.dyn_dtree[2*t]=0;for(t=0;t<19;t++)e.bl_tree[2*t]=0;e.dyn_ltree[512]=1,e.opt_len=e.static_len=0,e.sym_next=e.matches=0},wp=e=>{e.bi_valid>8?gp(e,e.bi_buf):e.bi_valid>0&&(e.pending_buf[e.pending++]=e.bi_buf),e.bi_buf=0,e.bi_valid=0},bp=(e,t,i,s)=>{const a=2*t,r=2*i;return e[a]<e[r]||e[a]===e[r]&&s[t]<=s[i]},yp=(e,t,i)=>{const s=e.heap[i];let a=i<<1;for(;a<=e.heap_len&&(a<e.heap_len&&bp(t,e.heap[a+1],e.heap[a],e.depth)&&a++,!bp(t,s,e.heap[a],e.depth));)e.heap[i]=e.heap[a],i=a,a<<=1;e.heap[i]=s},xp=(e,t,i)=>{let s,a,r,n,o=0;if(0!==e.sym_next)do{s=255&e.pending_buf[e.sym_buf+o++],s+=(255&e.pending_buf[e.sym_buf+o++])<<8,a=e.pending_buf[e.sym_buf+o++],0===s?fp(e,a,t):(r=rp[a],fp(e,r+256+1,t),n=Zh[r],0!==n&&(a-=np[r],Ap(e,a,n)),s--,r=up(s),fp(e,r,i),n=Xh[r],0!==n&&(s-=op[r],Ap(e,s,n)))}while(o<e.sym_next);fp(e,256,t)},Ep=(e,t)=>{const i=t.dyn_tree,s=t.stat_desc.static_tree,a=t.stat_desc.has_stree,r=t.stat_desc.elems;let n,o,l,c=-1;for(e.heap_len=0,e.heap_max=573,n=0;n<r;n++)0!==i[2*n]?(e.heap[++e.heap_len]=c=n,e.depth[n]=0):i[2*n+1]=0;for(;e.heap_len<2;)l=e.heap[++e.heap_len]=c<2?++c:0,i[2*l]=1,e.depth[l]=0,e.opt_len--,a&&(e.static_len-=s[2*l+1]);for(t.max_code=c,n=e.heap_len>>1;n>=1;n--)yp(e,i,n);l=r;do{n=e.heap[1],e.heap[1]=e.heap[e.heap_len--],yp(e,i,1),o=e.heap[1],e.heap[--e.heap_max]=n,e.heap[--e.heap_max]=o,i[2*l]=i[2*n]+i[2*o],e.depth[l]=(e.depth[n]>=e.depth[o]?e.depth[n]:e.depth[o])+1,i[2*n+1]=i[2*o+1]=l,e.heap[1]=l++,yp(e,i,1)}while(e.heap_len>=2);e.heap[--e.heap_max]=e.heap[1],((e,t)=>{const i=t.dyn_tree,s=t.max_code,a=t.stat_desc.static_tree,r=t.stat_desc.has_stree,n=t.stat_desc.extra_bits,o=t.stat_desc.extra_base,l=t.stat_desc.max_length;let c,d,h,p,u,g,A=0;for(p=0;p<=15;p++)e.bl_count[p]=0;for(i[2*e.heap[e.heap_max]+1]=0,c=e.heap_max+1;c<573;c++)d=e.heap[c],p=i[2*i[2*d+1]+1]+1,p>l&&(p=l,A++),i[2*d+1]=p,d>s||(e.bl_count[p]++,u=0,d>=o&&(u=n[d-o]),g=i[2*d],e.opt_len+=g*(p+u),r&&(e.static_len+=g*(a[2*d+1]+u)));if(0!==A){do{for(p=l-1;0===e.bl_count[p];)p--;e.bl_count[p]--,e.bl_count[p+1]+=2,e.bl_count[l]--,A-=2}while(A>0);for(p=l;0!==p;p--)for(d=e.bl_count[p];0!==d;)h=e.heap[--c],h>s||(i[2*h+1]!==p&&(e.opt_len+=(p-i[2*h+1])*i[2*h],i[2*h+1]=p),d--)}})(e,t),_p(i,c,e.bl_count)},Cp=(e,t,i)=>{let s,a,r=-1,n=t[1],o=0,l=7,c=4;for(0===n&&(l=138,c=3),t[2*(i+1)+1]=65535,s=0;s<=i;s++)a=n,n=t[2*(s+1)+1],++o<l&&a===n||(o<c?e.bl_tree[2*a]+=o:0!==a?(a!==r&&e.bl_tree[2*a]++,e.bl_tree[32]++):o<=10?e.bl_tree[34]++:e.bl_tree[36]++,o=0,r=a,0===n?(l=138,c=3):a===n?(l=6,c=3):(l=7,c=4))},Bp=(e,t,i)=>{let s,a,r=-1,n=t[1],o=0,l=7,c=4;for(0===n&&(l=138,c=3),s=0;s<=i;s++)if(a=n,n=t[2*(s+1)+1],!(++o<l&&a===n)){if(o<c)do{fp(e,a,e.bl_tree)}while(0!=--o);else 0!==a?(a!==r&&(fp(e,a,e.bl_tree),o--),fp(e,16,e.bl_tree),Ap(e,o-3,2)):o<=10?(fp(e,17,e.bl_tree),Ap(e,o-3,3)):(fp(e,18,e.bl_tree),Ap(e,o-11,7));o=0,r=a,0===n?(l=138,c=3):a===n?(l=6,c=3):(l=7,c=4)}};let Sp=!1;const kp=(e,t,i,s)=>{Ap(e,0+(s?1:0),3),wp(e),gp(e,i),gp(e,~i),i&&e.pending_buf.set(e.window.subarray(t,t+i),e.pending),e.pending+=i};var Ip={_tr_init:e=>{Sp||((()=>{let e,t,i,s,a;const r=new Array(16);for(i=0,s=0;s<28;s++)for(np[s]=i,e=0;e<1<<Zh[s];e++)rp[i++]=s;for(rp[i-1]=s,a=0,s=0;s<16;s++)for(op[s]=a,e=0;e<1<<Xh[s];e++)ap[a++]=s;for(a>>=7;s<30;s++)for(op[s]=a<<7,e=0;e<1<<Xh[s]-7;e++)ap[256+a++]=s;for(t=0;t<=15;t++)r[t]=0;for(e=0;e<=143;)ip[2*e+1]=8,e++,r[8]++;for(;e<=255;)ip[2*e+1]=9,e++,r[9]++;for(;e<=279;)ip[2*e+1]=7,e++,r[7]++;for(;e<=287;)ip[2*e+1]=8,e++,r[8]++;for(_p(ip,287,r),e=0;e<30;e++)sp[2*e+1]=5,sp[2*e]=mp(e,5);cp=new lp(ip,Zh,257,286,15),dp=new lp(sp,Xh,0,30,15),hp=new lp(new Array(0),ep,0,19,7)})(),Sp=!0),e.l_desc=new pp(e.dyn_ltree,cp),e.d_desc=new pp(e.dyn_dtree,dp),e.bl_desc=new pp(e.bl_tree,hp),e.bi_buf=0,e.bi_valid=0,vp(e)},_tr_stored_block:kp,_tr_flush_block:(e,t,i,s)=>{let a,r,n=0;e.level>0?(2===e.strm.data_type&&(e.strm.data_type=(e=>{let t,i=4093624447;for(t=0;t<=31;t++,i>>>=1)if(1&i&&0!==e.dyn_ltree[2*t])return 0;if(0!==e.dyn_ltree[18]||0!==e.dyn_ltree[20]||0!==e.dyn_ltree[26])return 1;for(t=32;t<256;t++)if(0!==e.dyn_ltree[2*t])return 1;return 0})(e)),Ep(e,e.l_desc),Ep(e,e.d_desc),n=(e=>{let t;for(Cp(e,e.dyn_ltree,e.l_desc.max_code),Cp(e,e.dyn_dtree,e.d_desc.max_code),Ep(e,e.bl_desc),t=18;t>=3&&0===e.bl_tree[2*tp[t]+1];t--);return e.opt_len+=3*(t+1)+5+5+4,t})(e),a=e.opt_len+3+7>>>3,r=e.static_len+3+7>>>3,r<=a&&(a=r)):a=r=i+5,i+4<=a&&-1!==t?kp(e,t,i,s):4===e.strategy||r===a?(Ap(e,2+(s?1:0),3),xp(e,ip,sp)):(Ap(e,4+(s?1:0),3),((e,t,i,s)=>{let a;for(Ap(e,t-257,5),Ap(e,i-1,5),Ap(e,s-4,4),a=0;a<s;a++)Ap(e,e.bl_tree[2*tp[a]+1],3);Bp(e,e.dyn_ltree,t-1),Bp(e,e.dyn_dtree,i-1)})(e,e.l_desc.max_code+1,e.d_desc.max_code+1,n+1),xp(e,e.dyn_ltree,e.dyn_dtree)),vp(e),s&&wp(e)},_tr_tally:(e,t,i)=>(e.pending_buf[e.sym_buf+e.sym_next++]=t,e.pending_buf[e.sym_buf+e.sym_next++]=t>>8,e.pending_buf[e.sym_buf+e.sym_next++]=i,0===t?e.dyn_ltree[2*i]++:(e.matches++,t--,e.dyn_ltree[2*(rp[i]+256+1)]++,e.dyn_dtree[2*up(t)]++),e.sym_next===e.sym_end),_tr_align:e=>{Ap(e,2,3),fp(e,256,ip),(e=>{16===e.bi_valid?(gp(e,e.bi_buf),e.bi_buf=0,e.bi_valid=0):e.bi_valid>=8&&(e.pending_buf[e.pending++]=255&e.bi_buf,e.bi_buf>>=8,e.bi_valid-=8)})(e)}},Rp=(e,t,i,s)=>{let a=65535&e,r=e>>>16&65535,n=0;for(;0!==i;){n=i>2e3?2e3:i,i-=n;do{a=a+t[s++]|0,r=r+a|0}while(--n);a%=65521,r%=65521}return a|r<<16};const Mp=new Uint32Array((()=>{let e,t=[];for(var i=0;i<256;i++){e=i;for(var s=0;s<8;s++)e=1&e?3988292384^e>>>1:e>>>1;t[i]=e}return t})());var Dp=(e,t,i,s)=>{const a=Mp,r=s+i;e^=-1;for(let i=s;i<r;i++)e=e>>>8^a[255&(e^t[i])];return~e},Fp={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"},Tp={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_MEM_ERROR:-4,Z_BUF_ERROR:-5,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_UNKNOWN:2,Z_DEFLATED:8};const{_tr_init:Qp,_tr_stored_block:Pp,_tr_flush_block:Op,_tr_tally:Up,_tr_align:zp}=Ip,{Z_NO_FLUSH:Hp,Z_PARTIAL_FLUSH:$p,Z_FULL_FLUSH:Np,Z_FINISH:Lp,Z_BLOCK:Gp,Z_OK:Yp,Z_STREAM_END:Kp,Z_STREAM_ERROR:jp,Z_DATA_ERROR:Wp,Z_BUF_ERROR:Jp,Z_DEFAULT_COMPRESSION:qp,Z_FILTERED:Vp,Z_HUFFMAN_ONLY:Zp,Z_RLE:Xp,Z_FIXED:eu,Z_DEFAULT_STRATEGY:tu,Z_UNKNOWN:iu,Z_DEFLATED:su}=Tp,au=258,ru=262,nu=42,ou=113,lu=666,cu=(e,t)=>(e.msg=Fp[t],t),du=e=>2*e-(e>4?9:0),hu=e=>{let t=e.length;for(;--t>=0;)e[t]=0},pu=e=>{let t,i,s,a=e.w_size;t=e.hash_size,s=t;do{i=e.head[--s],e.head[s]=i>=a?i-a:0}while(--t);t=a,s=t;do{i=e.prev[--s],e.prev[s]=i>=a?i-a:0}while(--t)};let uu=(e,t,i)=>(t<<e.hash_shift^i)&e.hash_mask;const gu=e=>{const t=e.state;let i=t.pending;i>e.avail_out&&(i=e.avail_out),0!==i&&(e.output.set(t.pending_buf.subarray(t.pending_out,t.pending_out+i),e.next_out),e.next_out+=i,t.pending_out+=i,e.total_out+=i,e.avail_out-=i,t.pending-=i,0===t.pending&&(t.pending_out=0))},Au=(e,t)=>{Op(e,e.block_start>=0?e.block_start:-1,e.strstart-e.block_start,t),e.block_start=e.strstart,gu(e.strm)},fu=(e,t)=>{e.pending_buf[e.pending++]=t},mu=(e,t)=>{e.pending_buf[e.pending++]=t>>>8&255,e.pending_buf[e.pending++]=255&t},_u=(e,t,i,s)=>{let a=e.avail_in;return a>s&&(a=s),0===a?0:(e.avail_in-=a,t.set(e.input.subarray(e.next_in,e.next_in+a),i),1===e.state.wrap?e.adler=Rp(e.adler,t,a,i):2===e.state.wrap&&(e.adler=Dp(e.adler,t,a,i)),e.next_in+=a,e.total_in+=a,a)},vu=(e,t)=>{let i,s,a=e.max_chain_length,r=e.strstart,n=e.prev_length,o=e.nice_match;const l=e.strstart>e.w_size-ru?e.strstart-(e.w_size-ru):0,c=e.window,d=e.w_mask,h=e.prev,p=e.strstart+au;let u=c[r+n-1],g=c[r+n];e.prev_length>=e.good_match&&(a>>=2),o>e.lookahead&&(o=e.lookahead);do{if(i=t,c[i+n]===g&&c[i+n-1]===u&&c[i]===c[r]&&c[++i]===c[r+1]){r+=2,i++;do{}while(c[++r]===c[++i]&&c[++r]===c[++i]&&c[++r]===c[++i]&&c[++r]===c[++i]&&c[++r]===c[++i]&&c[++r]===c[++i]&&c[++r]===c[++i]&&c[++r]===c[++i]&&r<p);if(s=au-(p-r),r=p-au,s>n){if(e.match_start=t,n=s,s>=o)break;u=c[r+n-1],g=c[r+n]}}}while((t=h[t&d])>l&&0!=--a);return n<=e.lookahead?n:e.lookahead},wu=e=>{const t=e.w_size;let i,s,a;do{if(s=e.window_size-e.lookahead-e.strstart,e.strstart>=t+(t-ru)&&(e.window.set(e.window.subarray(t,t+t-s),0),e.match_start-=t,e.strstart-=t,e.block_start-=t,e.insert>e.strstart&&(e.insert=e.strstart),pu(e),s+=t),0===e.strm.avail_in)break;if(i=_u(e.strm,e.window,e.strstart+e.lookahead,s),e.lookahead+=i,e.lookahead+e.insert>=3)for(a=e.strstart-e.insert,e.ins_h=e.window[a],e.ins_h=uu(e,e.ins_h,e.window[a+1]);e.insert&&(e.ins_h=uu(e,e.ins_h,e.window[a+3-1]),e.prev[a&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=a,a++,e.insert--,!(e.lookahead+e.insert<3)););}while(e.lookahead<ru&&0!==e.strm.avail_in)},bu=(e,t)=>{let i,s,a,r=e.pending_buf_size-5>e.w_size?e.w_size:e.pending_buf_size-5,n=0,o=e.strm.avail_in;do{if(i=65535,a=e.bi_valid+42>>3,e.strm.avail_out<a)break;if(a=e.strm.avail_out-a,s=e.strstart-e.block_start,i>s+e.strm.avail_in&&(i=s+e.strm.avail_in),i>a&&(i=a),i<r&&(0===i&&t!==Lp||t===Hp||i!==s+e.strm.avail_in))break;n=t===Lp&&i===s+e.strm.avail_in?1:0,Pp(e,0,0,n),e.pending_buf[e.pending-4]=i,e.pending_buf[e.pending-3]=i>>8,e.pending_buf[e.pending-2]=~i,e.pending_buf[e.pending-1]=~i>>8,gu(e.strm),s&&(s>i&&(s=i),e.strm.output.set(e.window.subarray(e.block_start,e.block_start+s),e.strm.next_out),e.strm.next_out+=s,e.strm.avail_out-=s,e.strm.total_out+=s,e.block_start+=s,i-=s),i&&(_u(e.strm,e.strm.output,e.strm.next_out,i),e.strm.next_out+=i,e.strm.avail_out-=i,e.strm.total_out+=i)}while(0===n);return o-=e.strm.avail_in,o&&(o>=e.w_size?(e.matches=2,e.window.set(e.strm.input.subarray(e.strm.next_in-e.w_size,e.strm.next_in),0),e.strstart=e.w_size,e.insert=e.strstart):(e.window_size-e.strstart<=o&&(e.strstart-=e.w_size,e.window.set(e.window.subarray(e.w_size,e.w_size+e.strstart),0),e.matches<2&&e.matches++,e.insert>e.strstart&&(e.insert=e.strstart)),e.window.set(e.strm.input.subarray(e.strm.next_in-o,e.strm.next_in),e.strstart),e.strstart+=o,e.insert+=o>e.w_size-e.insert?e.w_size-e.insert:o),e.block_start=e.strstart),e.high_water<e.strstart&&(e.high_water=e.strstart),n?4:t!==Hp&&t!==Lp&&0===e.strm.avail_in&&e.strstart===e.block_start?2:(a=e.window_size-e.strstart,e.strm.avail_in>a&&e.block_start>=e.w_size&&(e.block_start-=e.w_size,e.strstart-=e.w_size,e.window.set(e.window.subarray(e.w_size,e.w_size+e.strstart),0),e.matches<2&&e.matches++,a+=e.w_size,e.insert>e.strstart&&(e.insert=e.strstart)),a>e.strm.avail_in&&(a=e.strm.avail_in),a&&(_u(e.strm,e.window,e.strstart,a),e.strstart+=a,e.insert+=a>e.w_size-e.insert?e.w_size-e.insert:a),e.high_water<e.strstart&&(e.high_water=e.strstart),a=e.bi_valid+42>>3,a=e.pending_buf_size-a>65535?65535:e.pending_buf_size-a,r=a>e.w_size?e.w_size:a,s=e.strstart-e.block_start,(s>=r||(s||t===Lp)&&t!==Hp&&0===e.strm.avail_in&&s<=a)&&(i=s>a?a:s,n=t===Lp&&0===e.strm.avail_in&&i===s?1:0,Pp(e,e.block_start,i,n),e.block_start+=i,gu(e.strm)),n?3:1)},yu=(e,t)=>{let i,s;for(;;){if(e.lookahead<ru){if(wu(e),e.lookahead<ru&&t===Hp)return 1;if(0===e.lookahead)break}if(i=0,e.lookahead>=3&&(e.ins_h=uu(e,e.ins_h,e.window[e.strstart+3-1]),i=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),0!==i&&e.strstart-i<=e.w_size-ru&&(e.match_length=vu(e,i)),e.match_length>=3)if(s=Up(e,e.strstart-e.match_start,e.match_length-3),e.lookahead-=e.match_length,e.match_length<=e.max_lazy_match&&e.lookahead>=3){e.match_length--;do{e.strstart++,e.ins_h=uu(e,e.ins_h,e.window[e.strstart+3-1]),i=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart}while(0!=--e.match_length);e.strstart++}else e.strstart+=e.match_length,e.match_length=0,e.ins_h=e.window[e.strstart],e.ins_h=uu(e,e.ins_h,e.window[e.strstart+1]);else s=Up(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++;if(s&&(Au(e,!1),0===e.strm.avail_out))return 1}return e.insert=e.strstart<2?e.strstart:2,t===Lp?(Au(e,!0),0===e.strm.avail_out?3:4):e.sym_next&&(Au(e,!1),0===e.strm.avail_out)?1:2},xu=(e,t)=>{let i,s,a;for(;;){if(e.lookahead<ru){if(wu(e),e.lookahead<ru&&t===Hp)return 1;if(0===e.lookahead)break}if(i=0,e.lookahead>=3&&(e.ins_h=uu(e,e.ins_h,e.window[e.strstart+3-1]),i=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart),e.prev_length=e.match_length,e.prev_match=e.match_start,e.match_length=2,0!==i&&e.prev_length<e.max_lazy_match&&e.strstart-i<=e.w_size-ru&&(e.match_length=vu(e,i),e.match_length<=5&&(e.strategy===Vp||3===e.match_length&&e.strstart-e.match_start>4096)&&(e.match_length=2)),e.prev_length>=3&&e.match_length<=e.prev_length){a=e.strstart+e.lookahead-3,s=Up(e,e.strstart-1-e.prev_match,e.prev_length-3),e.lookahead-=e.prev_length-1,e.prev_length-=2;do{++e.strstart<=a&&(e.ins_h=uu(e,e.ins_h,e.window[e.strstart+3-1]),i=e.prev[e.strstart&e.w_mask]=e.head[e.ins_h],e.head[e.ins_h]=e.strstart)}while(0!=--e.prev_length);if(e.match_available=0,e.match_length=2,e.strstart++,s&&(Au(e,!1),0===e.strm.avail_out))return 1}else if(e.match_available){if(s=Up(e,0,e.window[e.strstart-1]),s&&Au(e,!1),e.strstart++,e.lookahead--,0===e.strm.avail_out)return 1}else e.match_available=1,e.strstart++,e.lookahead--}return e.match_available&&(s=Up(e,0,e.window[e.strstart-1]),e.match_available=0),e.insert=e.strstart<2?e.strstart:2,t===Lp?(Au(e,!0),0===e.strm.avail_out?3:4):e.sym_next&&(Au(e,!1),0===e.strm.avail_out)?1:2};function Eu(e,t,i,s,a){this.good_length=e,this.max_lazy=t,this.nice_length=i,this.max_chain=s,this.func=a}const Cu=[new Eu(0,0,0,0,bu),new Eu(4,4,8,4,yu),new Eu(4,5,16,8,yu),new Eu(4,6,32,32,yu),new Eu(4,4,16,16,xu),new Eu(8,16,32,32,xu),new Eu(8,16,128,128,xu),new Eu(8,32,128,256,xu),new Eu(32,128,258,1024,xu),new Eu(32,258,258,4096,xu)];function Bu(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=su,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new Uint16Array(1146),this.dyn_dtree=new Uint16Array(122),this.bl_tree=new Uint16Array(78),hu(this.dyn_ltree),hu(this.dyn_dtree),hu(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new Uint16Array(16),this.heap=new Uint16Array(573),hu(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new Uint16Array(573),hu(this.depth),this.sym_buf=0,this.lit_bufsize=0,this.sym_next=0,this.sym_end=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}const Su=e=>{if(!e)return 1;const t=e.state;return!t||t.strm!==e||t.status!==nu&&57!==t.status&&69!==t.status&&73!==t.status&&91!==t.status&&103!==t.status&&t.status!==ou&&t.status!==lu?1:0},ku=e=>{const t=(e=>{if(Su(e))return cu(e,jp);e.total_in=e.total_out=0,e.data_type=iu;const t=e.state;return t.pending=0,t.pending_out=0,t.wrap<0&&(t.wrap=-t.wrap),t.status=2===t.wrap?57:t.wrap?nu:ou,e.adler=2===t.wrap?0:1,t.last_flush=-2,Qp(t),Yp})(e);var i;return t===Yp&&((i=e.state).window_size=2*i.w_size,hu(i.head),i.max_lazy_match=Cu[i.level].max_lazy,i.good_match=Cu[i.level].good_length,i.nice_match=Cu[i.level].nice_length,i.max_chain_length=Cu[i.level].max_chain,i.strstart=0,i.block_start=0,i.lookahead=0,i.insert=0,i.match_length=i.prev_length=2,i.match_available=0,i.ins_h=0),t};var Iu=(e,t,i,s,a,r)=>{if(!e)return jp;let n=1;if(t===qp&&(t=6),s<0?(n=0,s=-s):s>15&&(n=2,s-=16),a<1||a>9||i!==su||s<8||s>15||t<0||t>9||r<0||r>eu||8===s&&1!==n)return cu(e,jp);8===s&&(s=9);const o=new Bu;return e.state=o,o.strm=e,o.status=nu,o.wrap=n,o.gzhead=null,o.w_bits=s,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=a+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+3-1)/3),o.window=new Uint8Array(2*o.w_size),o.head=new Uint16Array(o.hash_size),o.prev=new Uint16Array(o.w_size),o.lit_bufsize=1<<a+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new Uint8Array(o.pending_buf_size),o.sym_buf=o.lit_bufsize,o.sym_end=3*(o.lit_bufsize-1),o.level=t,o.strategy=r,o.method=i,ku(e)},Ru=(e,t)=>{if(Su(e)||t>Gp||t<0)return e?cu(e,jp):jp;const i=e.state;if(!e.output||0!==e.avail_in&&!e.input||i.status===lu&&t!==Lp)return cu(e,0===e.avail_out?Jp:jp);const s=i.last_flush;if(i.last_flush=t,0!==i.pending){if(gu(e),0===e.avail_out)return i.last_flush=-1,Yp}else if(0===e.avail_in&&du(t)<=du(s)&&t!==Lp)return cu(e,Jp);if(i.status===lu&&0!==e.avail_in)return cu(e,Jp);if(i.status===nu&&0===i.wrap&&(i.status=ou),i.status===nu){let t=su+(i.w_bits-8<<4)<<8,s=-1;if(s=i.strategy>=Zp||i.level<2?0:i.level<6?1:6===i.level?2:3,t|=s<<6,0!==i.strstart&&(t|=32),t+=31-t%31,mu(i,t),0!==i.strstart&&(mu(i,e.adler>>>16),mu(i,65535&e.adler)),e.adler=1,i.status=ou,gu(e),0!==i.pending)return i.last_flush=-1,Yp}if(57===i.status)if(e.adler=0,fu(i,31),fu(i,139),fu(i,8),i.gzhead)fu(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),fu(i,255&i.gzhead.time),fu(i,i.gzhead.time>>8&255),fu(i,i.gzhead.time>>16&255),fu(i,i.gzhead.time>>24&255),fu(i,9===i.level?2:i.strategy>=Zp||i.level<2?4:0),fu(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(fu(i,255&i.gzhead.extra.length),fu(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(e.adler=Dp(e.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69;else if(fu(i,0),fu(i,0),fu(i,0),fu(i,0),fu(i,0),fu(i,9===i.level?2:i.strategy>=Zp||i.level<2?4:0),fu(i,3),i.status=ou,gu(e),0!==i.pending)return i.last_flush=-1,Yp;if(69===i.status){if(i.gzhead.extra){let t=i.pending,s=(65535&i.gzhead.extra.length)-i.gzindex;for(;i.pending+s>i.pending_buf_size;){let a=i.pending_buf_size-i.pending;if(i.pending_buf.set(i.gzhead.extra.subarray(i.gzindex,i.gzindex+a),i.pending),i.pending=i.pending_buf_size,i.gzhead.hcrc&&i.pending>t&&(e.adler=Dp(e.adler,i.pending_buf,i.pending-t,t)),i.gzindex+=a,gu(e),0!==i.pending)return i.last_flush=-1,Yp;t=0,s-=a}let a=new Uint8Array(i.gzhead.extra);i.pending_buf.set(a.subarray(i.gzindex,i.gzindex+s),i.pending),i.pending+=s,i.gzhead.hcrc&&i.pending>t&&(e.adler=Dp(e.adler,i.pending_buf,i.pending-t,t)),i.gzindex=0}i.status=73}if(73===i.status){if(i.gzhead.name){let t,s=i.pending;do{if(i.pending===i.pending_buf_size){if(i.gzhead.hcrc&&i.pending>s&&(e.adler=Dp(e.adler,i.pending_buf,i.pending-s,s)),gu(e),0!==i.pending)return i.last_flush=-1,Yp;s=0}t=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,fu(i,t)}while(0!==t);i.gzhead.hcrc&&i.pending>s&&(e.adler=Dp(e.adler,i.pending_buf,i.pending-s,s)),i.gzindex=0}i.status=91}if(91===i.status){if(i.gzhead.comment){let t,s=i.pending;do{if(i.pending===i.pending_buf_size){if(i.gzhead.hcrc&&i.pending>s&&(e.adler=Dp(e.adler,i.pending_buf,i.pending-s,s)),gu(e),0!==i.pending)return i.last_flush=-1,Yp;s=0}t=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,fu(i,t)}while(0!==t);i.gzhead.hcrc&&i.pending>s&&(e.adler=Dp(e.adler,i.pending_buf,i.pending-s,s))}i.status=103}if(103===i.status){if(i.gzhead.hcrc){if(i.pending+2>i.pending_buf_size&&(gu(e),0!==i.pending))return i.last_flush=-1,Yp;fu(i,255&e.adler),fu(i,e.adler>>8&255),e.adler=0}if(i.status=ou,gu(e),0!==i.pending)return i.last_flush=-1,Yp}if(0!==e.avail_in||0!==i.lookahead||t!==Hp&&i.status!==lu){let s=0===i.level?bu(i,t):i.strategy===Zp?((e,t)=>{let i;for(;;){if(0===e.lookahead&&(wu(e),0===e.lookahead)){if(t===Hp)return 1;break}if(e.match_length=0,i=Up(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++,i&&(Au(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,t===Lp?(Au(e,!0),0===e.strm.avail_out?3:4):e.sym_next&&(Au(e,!1),0===e.strm.avail_out)?1:2})(i,t):i.strategy===Xp?((e,t)=>{let i,s,a,r;const n=e.window;for(;;){if(e.lookahead<=au){if(wu(e),e.lookahead<=au&&t===Hp)return 1;if(0===e.lookahead)break}if(e.match_length=0,e.lookahead>=3&&e.strstart>0&&(a=e.strstart-1,s=n[a],s===n[++a]&&s===n[++a]&&s===n[++a])){r=e.strstart+au;do{}while(s===n[++a]&&s===n[++a]&&s===n[++a]&&s===n[++a]&&s===n[++a]&&s===n[++a]&&s===n[++a]&&s===n[++a]&&a<r);e.match_length=au-(r-a),e.match_length>e.lookahead&&(e.match_length=e.lookahead)}if(e.match_length>=3?(i=Up(e,1,e.match_length-3),e.lookahead-=e.match_length,e.strstart+=e.match_length,e.match_length=0):(i=Up(e,0,e.window[e.strstart]),e.lookahead--,e.strstart++),i&&(Au(e,!1),0===e.strm.avail_out))return 1}return e.insert=0,t===Lp?(Au(e,!0),0===e.strm.avail_out?3:4):e.sym_next&&(Au(e,!1),0===e.strm.avail_out)?1:2})(i,t):Cu[i.level].func(i,t);if(3!==s&&4!==s||(i.status=lu),1===s||3===s)return 0===e.avail_out&&(i.last_flush=-1),Yp;if(2===s&&(t===$p?zp(i):t!==Gp&&(Pp(i,0,0,!1),t===Np&&(hu(i.head),0===i.lookahead&&(i.strstart=0,i.block_start=0,i.insert=0))),gu(e),0===e.avail_out))return i.last_flush=-1,Yp}return t!==Lp?Yp:i.wrap<=0?Kp:(2===i.wrap?(fu(i,255&e.adler),fu(i,e.adler>>8&255),fu(i,e.adler>>16&255),fu(i,e.adler>>24&255),fu(i,255&e.total_in),fu(i,e.total_in>>8&255),fu(i,e.total_in>>16&255),fu(i,e.total_in>>24&255)):(mu(i,e.adler>>>16),mu(i,65535&e.adler)),gu(e),i.wrap>0&&(i.wrap=-i.wrap),0!==i.pending?Yp:Kp)},Mu=e=>{if(Su(e))return jp;const t=e.state.status;return e.state=null,t===ou?cu(e,Wp):Yp};const Du=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var Fu=function(e){const t=Array.prototype.slice.call(arguments,1);for(;t.length;){const i=t.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(const t in i)Du(i,t)&&(e[t]=i[t])}}return e},Tu=e=>{let t=0;for(let i=0,s=e.length;i<s;i++)t+=e[i].length;const i=new Uint8Array(t);for(let t=0,s=0,a=e.length;t<a;t++){let a=e[t];i.set(a,s),s+=a.length}return i};let Qu=!0;try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(qh){Qu=!1}const Pu=new Uint8Array(256);for(let e=0;e<256;e++)Pu[e]=e>=252?6:e>=248?5:e>=240?4:e>=224?3:e>=192?2:1;Pu[254]=Pu[254]=1;var Ou=e=>{if("function"==typeof TextEncoder&&TextEncoder.prototype.encode)return(new TextEncoder).encode(e);let t,i,s,a,r,n=e.length,o=0;for(a=0;a<n;a++)i=e.charCodeAt(a),55296==(64512&i)&&a+1<n&&(s=e.charCodeAt(a+1),56320==(64512&s)&&(i=65536+(i-55296<<10)+(s-56320),a++)),o+=i<128?1:i<2048?2:i<65536?3:4;for(t=new Uint8Array(o),r=0,a=0;r<o;a++)i=e.charCodeAt(a),55296==(64512&i)&&a+1<n&&(s=e.charCodeAt(a+1),56320==(64512&s)&&(i=65536+(i-55296<<10)+(s-56320),a++)),i<128?t[r++]=i:i<2048?(t[r++]=192|i>>>6,t[r++]=128|63&i):i<65536?(t[r++]=224|i>>>12,t[r++]=128|i>>>6&63,t[r++]=128|63&i):(t[r++]=240|i>>>18,t[r++]=128|i>>>12&63,t[r++]=128|i>>>6&63,t[r++]=128|63&i);return t},Uu=(e,t)=>{const i=t||e.length;if("function"==typeof TextDecoder&&TextDecoder.prototype.decode)return(new TextDecoder).decode(e.subarray(0,t));let s,a;const r=new Array(2*i);for(a=0,s=0;s<i;){let t=e[s++];if(t<128){r[a++]=t;continue}let n=Pu[t];if(n>4)r[a++]=65533,s+=n-1;else{for(t&=2===n?31:3===n?15:7;n>1&&s<i;)t=t<<6|63&e[s++],n--;n>1?r[a++]=65533:t<65536?r[a++]=t:(t-=65536,r[a++]=55296|t>>10&1023,r[a++]=56320|1023&t)}}return((e,t)=>{if(t<65534&&e.subarray&&Qu)return String.fromCharCode.apply(null,e.length===t?e:e.subarray(0,t));let i="";for(let s=0;s<t;s++)i+=String.fromCharCode(e[s]);return i})(r,a)},zu=(e,t)=>{(t=t||e.length)>e.length&&(t=e.length);let i=t-1;for(;i>=0&&128==(192&e[i]);)i--;return i<0||0===i?t:i+Pu[e[i]]>t?i:t},Hu=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0};const $u=Object.prototype.toString,{Z_NO_FLUSH:Nu,Z_SYNC_FLUSH:Lu,Z_FULL_FLUSH:Gu,Z_FINISH:Yu,Z_OK:Ku,Z_STREAM_END:ju,Z_DEFAULT_COMPRESSION:Wu,Z_DEFAULT_STRATEGY:Ju,Z_DEFLATED:qu}=Tp;function Vu(e){this.options=Fu({level:Wu,method:qu,chunkSize:16384,windowBits:15,memLevel:8,strategy:Ju},e||{});let t=this.options;t.raw&&t.windowBits>0?t.windowBits=-t.windowBits:t.gzip&&t.windowBits>0&&t.windowBits<16&&(t.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Hu,this.strm.avail_out=0;let i=Iu(this.strm,t.level,t.method,t.windowBits,t.memLevel,t.strategy);if(i!==Ku)throw new Error(Fp[i]);if(t.header&&((e,t)=>{Su(e)||2!==e.state.wrap||(e.state.gzhead=t)})(this.strm,t.header),t.dictionary){let e;if(e="string"==typeof t.dictionary?Ou(t.dictionary):"[object ArrayBuffer]"===$u.call(t.dictionary)?new Uint8Array(t.dictionary):t.dictionary,i=((e,t)=>{let i=t.length;if(Su(e))return jp;const s=e.state,a=s.wrap;if(2===a||1===a&&s.status!==nu||s.lookahead)return jp;if(1===a&&(e.adler=Rp(e.adler,t,i,0)),s.wrap=0,i>=s.w_size){0===a&&(hu(s.head),s.strstart=0,s.block_start=0,s.insert=0);let e=new Uint8Array(s.w_size);e.set(t.subarray(i-s.w_size,i),0),t=e,i=s.w_size}const r=e.avail_in,n=e.next_in,o=e.input;for(e.avail_in=i,e.next_in=0,e.input=t,wu(s);s.lookahead>=3;){let e=s.strstart,t=s.lookahead-2;do{s.ins_h=uu(s,s.ins_h,s.window[e+3-1]),s.prev[e&s.w_mask]=s.head[s.ins_h],s.head[s.ins_h]=e,e++}while(--t);s.strstart=e,s.lookahead=2,wu(s)}return s.strstart+=s.lookahead,s.block_start=s.strstart,s.insert=s.lookahead,s.lookahead=0,s.match_length=s.prev_length=2,s.match_available=0,e.next_in=n,e.input=o,e.avail_in=r,s.wrap=a,Yp})(this.strm,e),i!==Ku)throw new Error(Fp[i]);this._dict_set=!0}}Vu.prototype.push=function(e,t){const i=this.strm,s=this.options.chunkSize;let a,r;if(this.ended)return!1;for(r=t===~~t?t:!0===t?Yu:Nu,"string"==typeof e?i.input=Ou(e):"[object ArrayBuffer]"===$u.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;;)if(0===i.avail_out&&(i.output=new Uint8Array(s),i.next_out=0,i.avail_out=s),(r===Lu||r===Gu)&&i.avail_out<=6)this.onData(i.output.subarray(0,i.next_out)),i.avail_out=0;else{if(a=Ru(i,r),a===ju)return i.next_out>0&&this.onData(i.output.subarray(0,i.next_out)),a=Mu(this.strm),this.onEnd(a),this.ended=!0,a===Ku;if(0!==i.avail_out){if(r>0&&i.next_out>0)this.onData(i.output.subarray(0,i.next_out)),i.avail_out=0;else if(0===i.avail_in)break}else this.onData(i.output)}return!0},Vu.prototype.onData=function(e){this.chunks.push(e)},Vu.prototype.onEnd=function(e){e===Ku&&(this.result=Tu(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg};var Zu={deflate:function(e,t){const i=new Vu(t);if(i.push(e,!0),i.err)throw i.msg||Fp[i.err];return i.result}};const Xu=16209;var eg=function(e,t){let i,s,a,r,n,o,l,c,d,h,p,u,g,A,f,m,_,v,w,b,y,x,E,C;const B=e.state;i=e.next_in,E=e.input,s=i+(e.avail_in-5),a=e.next_out,C=e.output,r=a-(t-e.avail_out),n=a+(e.avail_out-257),o=B.dmax,l=B.wsize,c=B.whave,d=B.wnext,h=B.window,p=B.hold,u=B.bits,g=B.lencode,A=B.distcode,f=(1<<B.lenbits)-1,m=(1<<B.distbits)-1;e:do{u<15&&(p+=E[i++]<<u,u+=8,p+=E[i++]<<u,u+=8),_=g[p&f];t:for(;;){if(v=_>>>24,p>>>=v,u-=v,v=_>>>16&255,0===v)C[a++]=65535&_;else{if(!(16&v)){if(64&v){if(32&v){B.mode=16191;break e}e.msg="invalid literal/length code",B.mode=Xu;break e}_=g[(65535&_)+(p&(1<<v)-1)];continue t}for(w=65535&_,v&=15,v&&(u<v&&(p+=E[i++]<<u,u+=8),w+=p&(1<<v)-1,p>>>=v,u-=v),u<15&&(p+=E[i++]<<u,u+=8,p+=E[i++]<<u,u+=8),_=A[p&m];;){if(v=_>>>24,p>>>=v,u-=v,v=_>>>16&255,16&v){if(b=65535&_,v&=15,u<v&&(p+=E[i++]<<u,u+=8,u<v&&(p+=E[i++]<<u,u+=8)),b+=p&(1<<v)-1,b>o){e.msg="invalid distance too far back",B.mode=Xu;break e}if(p>>>=v,u-=v,v=a-r,b>v){if(v=b-v,v>c&&B.sane){e.msg="invalid distance too far back",B.mode=Xu;break e}if(y=0,x=h,0===d){if(y+=l-v,v<w){w-=v;do{C[a++]=h[y++]}while(--v);y=a-b,x=C}}else if(d<v){if(y+=l+d-v,v-=d,v<w){w-=v;do{C[a++]=h[y++]}while(--v);if(y=0,d<w){v=d,w-=v;do{C[a++]=h[y++]}while(--v);y=a-b,x=C}}}else if(y+=d-v,v<w){w-=v;do{C[a++]=h[y++]}while(--v);y=a-b,x=C}for(;w>2;)C[a++]=x[y++],C[a++]=x[y++],C[a++]=x[y++],w-=3;w&&(C[a++]=x[y++],w>1&&(C[a++]=x[y++]))}else{y=a-b;do{C[a++]=C[y++],C[a++]=C[y++],C[a++]=C[y++],w-=3}while(w>2);w&&(C[a++]=C[y++],w>1&&(C[a++]=C[y++]))}break}if(64&v){e.msg="invalid distance code",B.mode=Xu;break e}_=A[(65535&_)+(p&(1<<v)-1)]}}break}}while(i<s&&a<n);w=u>>3,i-=w,u-=w<<3,p&=(1<<u)-1,e.next_in=i,e.next_out=a,e.avail_in=i<s?s-i+5:5-(i-s),e.avail_out=a<n?n-a+257:257-(a-n),B.hold=p,B.bits=u};const tg=new Uint16Array([3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0]),ig=new Uint8Array([16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78]),sg=new Uint16Array([1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0]),ag=new Uint8Array([16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64]);var rg=(e,t,i,s,a,r,n,o)=>{const l=o.bits;let c,d,h,p,u,g,A=0,f=0,m=0,_=0,v=0,w=0,b=0,y=0,x=0,E=0,C=null;const B=new Uint16Array(16),S=new Uint16Array(16);let k,I,R,M=null;for(A=0;A<=15;A++)B[A]=0;for(f=0;f<s;f++)B[t[i+f]]++;for(v=l,_=15;_>=1&&0===B[_];_--);if(v>_&&(v=_),0===_)return a[r++]=20971520,a[r++]=20971520,o.bits=1,0;for(m=1;m<_&&0===B[m];m++);for(v<m&&(v=m),y=1,A=1;A<=15;A++)if(y<<=1,y-=B[A],y<0)return-1;if(y>0&&(0===e||1!==_))return-1;for(S[1]=0,A=1;A<15;A++)S[A+1]=S[A]+B[A];for(f=0;f<s;f++)0!==t[i+f]&&(n[S[t[i+f]]++]=f);if(0===e?(C=M=n,g=20):1===e?(C=tg,M=ig,g=257):(C=sg,M=ag,g=0),E=0,f=0,A=m,u=r,w=v,b=0,h=-1,x=1<<v,p=x-1,1===e&&x>852||2===e&&x>592)return 1;for(;;){k=A-b,n[f]+1<g?(I=0,R=n[f]):n[f]>=g?(I=M[n[f]-g],R=C[n[f]-g]):(I=96,R=0),c=1<<A-b,d=1<<w,m=d;do{d-=c,a[u+(E>>b)+d]=k<<24|I<<16|R}while(0!==d);for(c=1<<A-1;E&c;)c>>=1;if(0!==c?(E&=c-1,E+=c):E=0,f++,0==--B[A]){if(A===_)break;A=t[i+n[f]]}if(A>v&&(E&p)!==h){for(0===b&&(b=v),u+=m,w=A-b,y=1<<w;w+b<_&&(y-=B[w+b],!(y<=0));)w++,y<<=1;if(x+=1<<w,1===e&&x>852||2===e&&x>592)return 1;h=E&p,a[h]=v<<24|w<<16|u-r}}return 0!==E&&(a[u+E]=A-b<<24|64<<16),o.bits=v,0};const{Z_FINISH:ng,Z_BLOCK:og,Z_TREES:lg,Z_OK:cg,Z_STREAM_END:dg,Z_NEED_DICT:hg,Z_STREAM_ERROR:pg,Z_DATA_ERROR:ug,Z_MEM_ERROR:gg,Z_BUF_ERROR:Ag,Z_DEFLATED:fg}=Tp,mg=16180,_g=16190,vg=16191,wg=16192,bg=16194,yg=16199,xg=16200,Eg=16206,Cg=16209,Bg=e=>(e>>>24&255)+(e>>>8&65280)+((65280&e)<<8)+((255&e)<<24);function Sg(){this.strm=null,this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new Uint16Array(320),this.work=new Uint16Array(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}const kg=e=>{if(!e)return 1;const t=e.state;return!t||t.strm!==e||t.mode<mg||t.mode>16211?1:0},Ig=e=>{if(kg(e))return pg;const t=e.state;return t.wsize=0,t.whave=0,t.wnext=0,(e=>{if(kg(e))return pg;const t=e.state;return e.total_in=e.total_out=t.total=0,e.msg="",t.wrap&&(e.adler=1&t.wrap),t.mode=mg,t.last=0,t.havedict=0,t.flags=-1,t.dmax=32768,t.head=null,t.hold=0,t.bits=0,t.lencode=t.lendyn=new Int32Array(852),t.distcode=t.distdyn=new Int32Array(592),t.sane=1,t.back=-1,cg})(e)};let Rg,Mg,Dg=!0;const Fg=e=>{if(Dg){Rg=new Int32Array(512),Mg=new Int32Array(32);let t=0;for(;t<144;)e.lens[t++]=8;for(;t<256;)e.lens[t++]=9;for(;t<280;)e.lens[t++]=7;for(;t<288;)e.lens[t++]=8;for(rg(1,e.lens,0,288,Rg,0,e.work,{bits:9}),t=0;t<32;)e.lens[t++]=5;rg(2,e.lens,0,32,Mg,0,e.work,{bits:5}),Dg=!1}e.lencode=Rg,e.lenbits=9,e.distcode=Mg,e.distbits=5},Tg=(e,t,i,s)=>{let a;const r=e.state;return null===r.window&&(r.wsize=1<<r.wbits,r.wnext=0,r.whave=0,r.window=new Uint8Array(r.wsize)),s>=r.wsize?(r.window.set(t.subarray(i-r.wsize,i),0),r.wnext=0,r.whave=r.wsize):(a=r.wsize-r.wnext,a>s&&(a=s),r.window.set(t.subarray(i-s,i-s+a),r.wnext),(s-=a)?(r.window.set(t.subarray(i-s,i),0),r.wnext=s,r.whave=r.wsize):(r.wnext+=a,r.wnext===r.wsize&&(r.wnext=0),r.whave<r.wsize&&(r.whave+=a))),0};var Qg=Ig,Pg=(e,t)=>{if(!e)return pg;const i=new Sg;e.state=i,i.strm=e,i.window=null,i.mode=mg;const s=((e,t)=>{let i;if(kg(e))return pg;const s=e.state;return t<0?(i=0,t=-t):(i=5+(t>>4),t<48&&(t&=15)),t&&(t<8||t>15)?pg:(null!==s.window&&s.wbits!==t&&(s.window=null),s.wrap=i,s.wbits=t,Ig(e))})(e,t);return s!==cg&&(e.state=null),s},Og=(e,t)=>{let i,s,a,r,n,o,l,c,d,h,p,u,g,A,f,m,_,v,w,b,y,x,E=0;const C=new Uint8Array(4);let B,S;const k=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]);if(kg(e)||!e.output||!e.input&&0!==e.avail_in)return pg;i=e.state,i.mode===vg&&(i.mode=wg),n=e.next_out,a=e.output,l=e.avail_out,r=e.next_in,s=e.input,o=e.avail_in,c=i.hold,d=i.bits,h=o,p=l,x=cg;e:for(;;)switch(i.mode){case mg:if(0===i.wrap){i.mode=wg;break}for(;d<16;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(2&i.wrap&&35615===c){0===i.wbits&&(i.wbits=15),i.check=0,C[0]=255&c,C[1]=c>>>8&255,i.check=Dp(i.check,C,2,0),c=0,d=0,i.mode=16181;break}if(i.head&&(i.head.done=!1),!(1&i.wrap)||(((255&c)<<8)+(c>>8))%31){e.msg="incorrect header check",i.mode=Cg;break}if((15&c)!==fg){e.msg="unknown compression method",i.mode=Cg;break}if(c>>>=4,d-=4,y=8+(15&c),0===i.wbits&&(i.wbits=y),y>15||y>i.wbits){e.msg="invalid window size",i.mode=Cg;break}i.dmax=1<<i.wbits,i.flags=0,e.adler=i.check=1,i.mode=512&c?16189:vg,c=0,d=0;break;case 16181:for(;d<16;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(i.flags=c,(255&i.flags)!==fg){e.msg="unknown compression method",i.mode=Cg;break}if(57344&i.flags){e.msg="unknown header flags set",i.mode=Cg;break}i.head&&(i.head.text=c>>8&1),512&i.flags&&4&i.wrap&&(C[0]=255&c,C[1]=c>>>8&255,i.check=Dp(i.check,C,2,0)),c=0,d=0,i.mode=16182;case 16182:for(;d<32;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}i.head&&(i.head.time=c),512&i.flags&&4&i.wrap&&(C[0]=255&c,C[1]=c>>>8&255,C[2]=c>>>16&255,C[3]=c>>>24&255,i.check=Dp(i.check,C,4,0)),c=0,d=0,i.mode=16183;case 16183:for(;d<16;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}i.head&&(i.head.xflags=255&c,i.head.os=c>>8),512&i.flags&&4&i.wrap&&(C[0]=255&c,C[1]=c>>>8&255,i.check=Dp(i.check,C,2,0)),c=0,d=0,i.mode=16184;case 16184:if(1024&i.flags){for(;d<16;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}i.length=c,i.head&&(i.head.extra_len=c),512&i.flags&&4&i.wrap&&(C[0]=255&c,C[1]=c>>>8&255,i.check=Dp(i.check,C,2,0)),c=0,d=0}else i.head&&(i.head.extra=null);i.mode=16185;case 16185:if(1024&i.flags&&(u=i.length,u>o&&(u=o),u&&(i.head&&(y=i.head.extra_len-i.length,i.head.extra||(i.head.extra=new Uint8Array(i.head.extra_len)),i.head.extra.set(s.subarray(r,r+u),y)),512&i.flags&&4&i.wrap&&(i.check=Dp(i.check,s,u,r)),o-=u,r+=u,i.length-=u),i.length))break e;i.length=0,i.mode=16186;case 16186:if(2048&i.flags){if(0===o)break e;u=0;do{y=s[r+u++],i.head&&y&&i.length<65536&&(i.head.name+=String.fromCharCode(y))}while(y&&u<o);if(512&i.flags&&4&i.wrap&&(i.check=Dp(i.check,s,u,r)),o-=u,r+=u,y)break e}else i.head&&(i.head.name=null);i.length=0,i.mode=16187;case 16187:if(4096&i.flags){if(0===o)break e;u=0;do{y=s[r+u++],i.head&&y&&i.length<65536&&(i.head.comment+=String.fromCharCode(y))}while(y&&u<o);if(512&i.flags&&4&i.wrap&&(i.check=Dp(i.check,s,u,r)),o-=u,r+=u,y)break e}else i.head&&(i.head.comment=null);i.mode=16188;case 16188:if(512&i.flags){for(;d<16;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(4&i.wrap&&c!==(65535&i.check)){e.msg="header crc mismatch",i.mode=Cg;break}c=0,d=0}i.head&&(i.head.hcrc=i.flags>>9&1,i.head.done=!0),e.adler=i.check=0,i.mode=vg;break;case 16189:for(;d<32;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}e.adler=i.check=Bg(c),c=0,d=0,i.mode=_g;case _g:if(0===i.havedict)return e.next_out=n,e.avail_out=l,e.next_in=r,e.avail_in=o,i.hold=c,i.bits=d,hg;e.adler=i.check=1,i.mode=vg;case vg:if(t===og||t===lg)break e;case wg:if(i.last){c>>>=7&d,d-=7&d,i.mode=Eg;break}for(;d<3;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}switch(i.last=1&c,c>>>=1,d-=1,3&c){case 0:i.mode=16193;break;case 1:if(Fg(i),i.mode=yg,t===lg){c>>>=2,d-=2;break e}break;case 2:i.mode=16196;break;case 3:e.msg="invalid block type",i.mode=Cg}c>>>=2,d-=2;break;case 16193:for(c>>>=7&d,d-=7&d;d<32;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if((65535&c)!=(c>>>16^65535)){e.msg="invalid stored block lengths",i.mode=Cg;break}if(i.length=65535&c,c=0,d=0,i.mode=bg,t===lg)break e;case bg:i.mode=16195;case 16195:if(u=i.length,u){if(u>o&&(u=o),u>l&&(u=l),0===u)break e;a.set(s.subarray(r,r+u),n),o-=u,r+=u,l-=u,n+=u,i.length-=u;break}i.mode=vg;break;case 16196:for(;d<14;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(i.nlen=257+(31&c),c>>>=5,d-=5,i.ndist=1+(31&c),c>>>=5,d-=5,i.ncode=4+(15&c),c>>>=4,d-=4,i.nlen>286||i.ndist>30){e.msg="too many length or distance symbols",i.mode=Cg;break}i.have=0,i.mode=16197;case 16197:for(;i.have<i.ncode;){for(;d<3;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}i.lens[k[i.have++]]=7&c,c>>>=3,d-=3}for(;i.have<19;)i.lens[k[i.have++]]=0;if(i.lencode=i.lendyn,i.lenbits=7,B={bits:i.lenbits},x=rg(0,i.lens,0,19,i.lencode,0,i.work,B),i.lenbits=B.bits,x){e.msg="invalid code lengths set",i.mode=Cg;break}i.have=0,i.mode=16198;case 16198:for(;i.have<i.nlen+i.ndist;){for(;E=i.lencode[c&(1<<i.lenbits)-1],f=E>>>24,m=E>>>16&255,_=65535&E,!(f<=d);){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(_<16)c>>>=f,d-=f,i.lens[i.have++]=_;else{if(16===_){for(S=f+2;d<S;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(c>>>=f,d-=f,0===i.have){e.msg="invalid bit length repeat",i.mode=Cg;break}y=i.lens[i.have-1],u=3+(3&c),c>>>=2,d-=2}else if(17===_){for(S=f+3;d<S;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}c>>>=f,d-=f,y=0,u=3+(7&c),c>>>=3,d-=3}else{for(S=f+7;d<S;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}c>>>=f,d-=f,y=0,u=11+(127&c),c>>>=7,d-=7}if(i.have+u>i.nlen+i.ndist){e.msg="invalid bit length repeat",i.mode=Cg;break}for(;u--;)i.lens[i.have++]=y}}if(i.mode===Cg)break;if(0===i.lens[256]){e.msg="invalid code -- missing end-of-block",i.mode=Cg;break}if(i.lenbits=9,B={bits:i.lenbits},x=rg(1,i.lens,0,i.nlen,i.lencode,0,i.work,B),i.lenbits=B.bits,x){e.msg="invalid literal/lengths set",i.mode=Cg;break}if(i.distbits=6,i.distcode=i.distdyn,B={bits:i.distbits},x=rg(2,i.lens,i.nlen,i.ndist,i.distcode,0,i.work,B),i.distbits=B.bits,x){e.msg="invalid distances set",i.mode=Cg;break}if(i.mode=yg,t===lg)break e;case yg:i.mode=xg;case xg:if(o>=6&&l>=258){e.next_out=n,e.avail_out=l,e.next_in=r,e.avail_in=o,i.hold=c,i.bits=d,eg(e,p),n=e.next_out,a=e.output,l=e.avail_out,r=e.next_in,s=e.input,o=e.avail_in,c=i.hold,d=i.bits,i.mode===vg&&(i.back=-1);break}for(i.back=0;E=i.lencode[c&(1<<i.lenbits)-1],f=E>>>24,m=E>>>16&255,_=65535&E,!(f<=d);){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(m&&!(240&m)){for(v=f,w=m,b=_;E=i.lencode[b+((c&(1<<v+w)-1)>>v)],f=E>>>24,m=E>>>16&255,_=65535&E,!(v+f<=d);){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}c>>>=v,d-=v,i.back+=v}if(c>>>=f,d-=f,i.back+=f,i.length=_,0===m){i.mode=16205;break}if(32&m){i.back=-1,i.mode=vg;break}if(64&m){e.msg="invalid literal/length code",i.mode=Cg;break}i.extra=15&m,i.mode=16201;case 16201:if(i.extra){for(S=i.extra;d<S;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}i.length+=c&(1<<i.extra)-1,c>>>=i.extra,d-=i.extra,i.back+=i.extra}i.was=i.length,i.mode=16202;case 16202:for(;E=i.distcode[c&(1<<i.distbits)-1],f=E>>>24,m=E>>>16&255,_=65535&E,!(f<=d);){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(!(240&m)){for(v=f,w=m,b=_;E=i.distcode[b+((c&(1<<v+w)-1)>>v)],f=E>>>24,m=E>>>16&255,_=65535&E,!(v+f<=d);){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}c>>>=v,d-=v,i.back+=v}if(c>>>=f,d-=f,i.back+=f,64&m){e.msg="invalid distance code",i.mode=Cg;break}i.offset=_,i.extra=15&m,i.mode=16203;case 16203:if(i.extra){for(S=i.extra;d<S;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}i.offset+=c&(1<<i.extra)-1,c>>>=i.extra,d-=i.extra,i.back+=i.extra}if(i.offset>i.dmax){e.msg="invalid distance too far back",i.mode=Cg;break}i.mode=16204;case 16204:if(0===l)break e;if(u=p-l,i.offset>u){if(u=i.offset-u,u>i.whave&&i.sane){e.msg="invalid distance too far back",i.mode=Cg;break}u>i.wnext?(u-=i.wnext,g=i.wsize-u):g=i.wnext-u,u>i.length&&(u=i.length),A=i.window}else A=a,g=n-i.offset,u=i.length;u>l&&(u=l),l-=u,i.length-=u;do{a[n++]=A[g++]}while(--u);0===i.length&&(i.mode=xg);break;case 16205:if(0===l)break e;a[n++]=i.length,l--,i.mode=xg;break;case Eg:if(i.wrap){for(;d<32;){if(0===o)break e;o--,c|=s[r++]<<d,d+=8}if(p-=l,e.total_out+=p,i.total+=p,4&i.wrap&&p&&(e.adler=i.check=i.flags?Dp(i.check,a,p,n-p):Rp(i.check,a,p,n-p)),p=l,4&i.wrap&&(i.flags?c:Bg(c))!==i.check){e.msg="incorrect data check",i.mode=Cg;break}c=0,d=0}i.mode=16207;case 16207:if(i.wrap&&i.flags){for(;d<32;){if(0===o)break e;o--,c+=s[r++]<<d,d+=8}if(4&i.wrap&&c!==(4294967295&i.total)){e.msg="incorrect length check",i.mode=Cg;break}c=0,d=0}i.mode=16208;case 16208:x=dg;break e;case Cg:x=ug;break e;case 16210:return gg;default:return pg}return e.next_out=n,e.avail_out=l,e.next_in=r,e.avail_in=o,i.hold=c,i.bits=d,(i.wsize||p!==e.avail_out&&i.mode<Cg&&(i.mode<Eg||t!==ng))&&Tg(e,e.output,e.next_out,p-e.avail_out),h-=e.avail_in,p-=e.avail_out,e.total_in+=h,e.total_out+=p,i.total+=p,4&i.wrap&&p&&(e.adler=i.check=i.flags?Dp(i.check,a,p,e.next_out-p):Rp(i.check,a,p,e.next_out-p)),e.data_type=i.bits+(i.last?64:0)+(i.mode===vg?128:0)+(i.mode===yg||i.mode===bg?256:0),(0===h&&0===p||t===ng)&&x===cg&&(x=Ag),x},Ug=e=>{if(kg(e))return pg;let t=e.state;return t.window&&(t.window=null),e.state=null,cg},zg=(e,t)=>{const i=t.length;let s,a,r;return kg(e)?pg:(s=e.state,0!==s.wrap&&s.mode!==_g?pg:s.mode===_g&&(a=1,a=Rp(a,t,i,0),a!==s.check)?ug:(r=Tg(e,t,i,i),r?(s.mode=16210,gg):(s.havedict=1,cg)))},Hg=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1};const $g=Object.prototype.toString,{Z_NO_FLUSH:Ng,Z_FINISH:Lg,Z_OK:Gg,Z_STREAM_END:Yg,Z_NEED_DICT:Kg,Z_STREAM_ERROR:jg,Z_DATA_ERROR:Wg,Z_MEM_ERROR:Jg}=Tp;function qg(e){this.options=Fu({chunkSize:65536,windowBits:15,to:""},e||{});const t=this.options;t.raw&&t.windowBits>=0&&t.windowBits<16&&(t.windowBits=-t.windowBits,0===t.windowBits&&(t.windowBits=-15)),!(t.windowBits>=0&&t.windowBits<16)||e&&e.windowBits||(t.windowBits+=32),t.windowBits>15&&t.windowBits<48&&(15&t.windowBits||(t.windowBits|=15)),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new Hu,this.strm.avail_out=0;let i=Pg(this.strm,t.windowBits);if(i!==Gg)throw new Error(Fp[i]);if(this.header=new Hg,((e,t)=>{if(kg(e))return pg;const i=e.state;2&i.wrap&&(i.head=t,t.done=!1)})(this.strm,this.header),t.dictionary&&("string"==typeof t.dictionary?t.dictionary=Ou(t.dictionary):"[object ArrayBuffer]"===$g.call(t.dictionary)&&(t.dictionary=new Uint8Array(t.dictionary)),t.raw&&(i=zg(this.strm,t.dictionary),i!==Gg)))throw new Error(Fp[i])}qg.prototype.push=function(e,t){const i=this.strm,s=this.options.chunkSize,a=this.options.dictionary;let r,n,o;if(this.ended)return!1;for(n=t===~~t?t:!0===t?Lg:Ng,"[object ArrayBuffer]"===$g.call(e)?i.input=new Uint8Array(e):i.input=e,i.next_in=0,i.avail_in=i.input.length;;){for(0===i.avail_out&&(i.output=new Uint8Array(s),i.next_out=0,i.avail_out=s),r=Og(i,n),r===Kg&&a&&(r=zg(i,a),r===Gg?r=Og(i,n):r===Wg&&(r=Kg));i.avail_in>0&&r===Yg&&i.state.wrap>0&&0!==e[i.next_in];)Qg(i),r=Og(i,n);switch(r){case jg:case Wg:case Kg:case Jg:return this.onEnd(r),this.ended=!0,!1}if(o=i.avail_out,i.next_out&&(0===i.avail_out||r===Yg))if("string"===this.options.to){let e=zu(i.output,i.next_out),t=i.next_out-e,a=Uu(i.output,e);i.next_out=t,i.avail_out=s-t,t&&i.output.set(i.output.subarray(e,e+t),0),this.onData(a)}else this.onData(i.output.length===i.next_out?i.output:i.output.subarray(0,i.next_out));if(r!==Gg||0!==o){if(r===Yg)return r=Ug(this.strm),this.onEnd(r),this.ended=!0,!0;if(0===i.avail_in)break}}return!0},qg.prototype.onData=function(e){this.chunks.push(e)},qg.prototype.onEnd=function(e){e===Gg&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=Tu(this.chunks)),this.chunks=[],this.err=e,this.msg=this.strm.msg};var Vg={Inflate:qg};const{deflate:Zg}=Zu,{Inflate:Xg}=Vg;var eA=Zg,tA=Xg;class iA{constructor(e,t=!1,i=!0){this.device=e,this.tracing=t,this.slipReaderEnabled=!1,this.baudrate=0,this.traceLog="",this.lastTraceTime=Date.now(),this.buffer=new Uint8Array(0),this.SLIP_END=192,this.SLIP_ESC=219,this.SLIP_ESC_END=220,this.SLIP_ESC_ESC=221,this._DTR_state=!1,this.slipReaderEnabled=i}getInfo(){const e=this.device.getInfo();return e.usbVendorId&&e.usbProductId?`WebSerial VendorID 0x${e.usbVendorId.toString(16)} ProductID 0x${e.usbProductId.toString(16)}`:""}getPid(){return this.device.getInfo().usbProductId}trace(e){const t=`TRACE ${(Date.now()-this.lastTraceTime).toFixed(3)} ${e}`;console.log(t),this.traceLog+=t+"\n"}async returnTrace(){try{await navigator.clipboard.writeText(this.traceLog),console.log("Text copied to clipboard!")}catch(e){console.error("Failed to copy text:",e)}}hexify(e){return Array.from(e).map(e=>e.toString(16).padStart(2,"0")).join("").padEnd(16," ")}hexConvert(e,t=!0){if(t&&e.length>16){let t="",i=e;for(;i.length>0;){const e=i.slice(0,16),s=String.fromCharCode(...e).split("").map(e=>" "===e||e>=" "&&e<="~"&&"  "!==e?e:".").join("");i=i.slice(16),t+=`\n    ${this.hexify(e.slice(0,8))} ${this.hexify(e.slice(8))} | ${s}`}return t}return this.hexify(e)}slipWriter(e){const t=[];t.push(192);for(let i=0;i<e.length;i++)219===e[i]?t.push(219,221):192===e[i]?t.push(219,220):t.push(e[i]);return t.push(192),new Uint8Array(t)}async write(e){const t=this.slipWriter(e);if(this.device.writable){const e=this.device.writable.getWriter();this.tracing&&(console.log("Write bytes"),this.trace(`Write ${t.length} bytes: ${this.hexConvert(t)}`)),await e.write(t),e.releaseLock()}}appendArray(e,t){const i=new Uint8Array(e.length+t.length);return i.set(e),i.set(t,e.length),i}async*readLoop(e){if(this.reader)try{for(;;){const t=new Promise((t,i)=>setTimeout(()=>i(new Error("Read timeout exceeded")),e)),i=await Promise.race([this.reader.read(),t]);if(null===i)break;const{value:s,done:a}=i;if(a||!s)break;yield s}}catch(e){console.error("Error reading from serial port:",e)}finally{this.buffer=new Uint8Array(0)}}async newRead(e,t){if(this.buffer.length>=e){const t=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),t}for(;this.buffer.length<e;){const e=this.readLoop(t),{value:i,done:s}=await e.next();if(s||!i)break;this.buffer=this.appendArray(this.buffer,i)}const i=this.buffer.slice(0,e);return this.buffer=this.buffer.slice(e),i}async flushInput(){var e;this.reader&&!await this.reader.closed&&(await this.reader.cancel(),this.reader.releaseLock(),this.reader=null===(e=this.device.readable)||void 0===e?void 0:e.getReader())}async flushOutput(){var e,t;this.buffer=new Uint8Array(0),await(null===(e=this.device.writable)||void 0===e?void 0:e.getWriter().close()),null===(t=this.device.writable)||void 0===t||t.getWriter().releaseLock()}inWaiting(){return this.buffer.length}detectPanicHandler(e){const t=new TextDecoder("utf-8").decode(e),i=t.match(/G?uru Meditation Error: (?:Core \d panic'ed \(([a-zA-Z ]*)\))?/)||t.match(/F?atal exception \(\d+\): (?:([a-zA-Z ]*)?.*epc)?/);if(i){const e=i[1]||i[2];throw new Error("Guru Meditation Error detected"+(e?` (${e})`:""))}}async*read(e){var t;this.reader||(this.reader=null===(t=this.device.readable)||void 0===t?void 0:t.getReader());let i=null,s=!1,a=!1;for(;;){const t=this.inWaiting(),r=await this.newRead(t>0?t:1,e);if(!r||0===r.length){const e=null===i?a?"Serial data stream stopped: Possible serial noise or corruption.":"No serial data received.":"Packet content transfer stopped";throw this.trace(e),new Error(e)}this.trace(`Read ${r.length} bytes: ${this.hexConvert(r)}`);let n=0;for(;n<r.length;){const t=r[n++];if(null===i){if(t!==this.SLIP_END){this.trace(`Read invalid data: ${this.hexConvert(r)}`);const i=await this.newRead(this.inWaiting(),e);throw this.trace(`Remaining data in serial buffer: ${this.hexConvert(i)}`),this.detectPanicHandler(new Uint8Array([...r,...i||[]])),new Error(`Invalid head of packet (0x${t.toString(16)}): Possible serial noise or corruption.`)}i=new Uint8Array(0)}else if(s)if(s=!1,t===this.SLIP_ESC_END)i=this.appendArray(i,new Uint8Array([this.SLIP_END]));else{if(t!==this.SLIP_ESC_ESC){this.trace(`Read invalid data: ${this.hexConvert(r)}`);const i=await this.newRead(this.inWaiting(),e);throw this.trace(`Remaining data in serial buffer: ${this.hexConvert(i)}`),this.detectPanicHandler(new Uint8Array([...r,...i||[]])),new Error(`Invalid SLIP escape (0xdb, 0x${t.toString(16)})`)}i=this.appendArray(i,new Uint8Array([this.SLIP_ESC]))}else t===this.SLIP_ESC?s=!0:t===this.SLIP_END?(this.trace(`Received full packet: ${this.hexConvert(i)}`),this.buffer=this.appendArray(this.buffer,r.slice(n)),yield i,i=null,a=!0):i=this.appendArray(i,new Uint8Array([t]))}}}async*rawRead(){if(this.reader)try{for(;;){const{value:e,done:t}=await this.reader.read();if(t||!e)break;this.tracing&&(console.log("Raw Read bytes"),this.trace(`Read ${e.length} bytes: ${this.hexConvert(e)}`)),yield e}}catch(e){console.error("Error reading from serial port:",e)}finally{this.buffer=new Uint8Array(0)}}async setRTS(e){await this.device.setSignals({requestToSend:e}),await this.setDTR(this._DTR_state)}async setDTR(e){this._DTR_state=e,await this.device.setSignals({dataTerminalReady:e})}async connect(e=115200,t={}){var i;await this.device.open({baudRate:e,dataBits:null==t?void 0:t.dataBits,stopBits:null==t?void 0:t.stopBits,bufferSize:null==t?void 0:t.bufferSize,parity:null==t?void 0:t.parity,flowControl:null==t?void 0:t.flowControl}),this.baudrate=e,this.reader=null===(i=this.device.readable)||void 0===i?void 0:i.getReader()}async sleep(e){return new Promise(t=>setTimeout(t,e))}async waitForUnlock(e){for(;this.device.readable&&this.device.readable.locked||this.device.writable&&this.device.writable.locked;)await this.sleep(e)}async disconnect(){var e,t;(null===(e=this.device.readable)||void 0===e?void 0:e.locked)&&await(null===(t=this.reader)||void 0===t?void 0:t.cancel()),await this.waitForUnlock(400),await this.device.close(),this.reader=void 0}}function sA(e){return new Promise(t=>setTimeout(t,e))}class aA{constructor(e,t){this.resetDelay=t,this.transport=e}async reset(){await this.transport.setDTR(!1),await this.transport.setRTS(!0),await sA(100),await this.transport.setDTR(!0),await this.transport.setRTS(!1),await sA(this.resetDelay),await this.transport.setDTR(!1)}}class rA{constructor(e){this.transport=e}async reset(){await this.transport.setRTS(!1),await this.transport.setDTR(!1),await sA(100),await this.transport.setDTR(!0),await this.transport.setRTS(!1),await sA(100),await this.transport.setRTS(!0),await this.transport.setDTR(!1),await this.transport.setRTS(!0),await sA(100),await this.transport.setRTS(!1),await this.transport.setDTR(!1)}}class nA{constructor(e,t=!1){this.transport=e,this.usingUsbOtg=t,this.transport=e}async reset(){this.usingUsbOtg?(await sA(200),await this.transport.setRTS(!1),await sA(200)):(await sA(100),await this.transport.setRTS(!1))}}class oA{constructor(e,t){this.transport=e,this.sequenceString=t,this.transport=e}async reset(){const e={D:async e=>await this.transport.setDTR(e),R:async e=>await this.transport.setRTS(e),W:async e=>await sA(e)};try{if(!function(e){const t=["D","R","W"],i=e.split("|");for(const e of i){const i=e[0],s=e.slice(1);if(!t.includes(i))return!1;if("D"===i||"R"===i){if("0"!==s&&"1"!==s)return!1}else if("W"===i){const e=parseInt(s);if(isNaN(e)||e<=0)return!1}}return!0}(this.sequenceString))return;const t=this.sequenceString.split("|");for(const i of t){const t=i[0],s=i.slice(1);"W"===t?await e.W(Number(s)):"D"!==t&&"R"!==t||await e[t]("1"===s)}}catch(e){throw new Error("Invalid custom reset sequence")}}}async function lA(e){let t;switch(e){case"ESP32":t=await Promise.resolve().then(function(){return wA});break;case"ESP32-C2":t=await Promise.resolve().then(function(){return kA});break;case"ESP32-C3":t=await Promise.resolve().then(function(){return PA});break;case"ESP32-C5":t=await Promise.resolve().then(function(){return GA});break;case"ESP32-C6":t=await Promise.resolve().then(function(){return ZA});break;case"ESP32-C61":t=await Promise.resolve().then(function(){return of});break;case"ESP32-H2":t=await Promise.resolve().then(function(){return Af});break;case"ESP32-P4":t=await Promise.resolve().then(function(){return xf});break;case"ESP32-S2":t=await Promise.resolve().then(function(){return Mf});break;case"ESP32-S3":t=await Promise.resolve().then(function(){return zf});break;case"ESP8266":t=await Promise.resolve().then(function(){return jf})}if(t)return{bss_start:t.bss_start,data:t.data,data_start:t.data_start,entry:t.entry,text:t.text,text_start:t.text_start,decodedData:cA(t.data),decodedText:cA(t.text)}}function cA(e){const t=atob(e).split("").map(function(e){return e.charCodeAt(0)});return new Uint8Array(t)}function dA(e,t,i=255){const s=e.length%t;if(0!==s){const a=new Uint8Array(t-s).fill(i),r=new Uint8Array(e.length+a.length);return r.set(e),r.set(a,e.length),r}return e}class hA{constructor(e){var t,i,s,a,r,n,o,l;this.ESP_RAM_BLOCK=6144,this.ESP_FLASH_BEGIN=2,this.ESP_FLASH_DATA=3,this.ESP_FLASH_END=4,this.ESP_MEM_BEGIN=5,this.ESP_MEM_END=6,this.ESP_MEM_DATA=7,this.ESP_WRITE_REG=9,this.ESP_READ_REG=10,this.ESP_SPI_ATTACH=13,this.ESP_CHANGE_BAUDRATE=15,this.ESP_FLASH_DEFL_BEGIN=16,this.ESP_FLASH_DEFL_DATA=17,this.ESP_FLASH_DEFL_END=18,this.ESP_SPI_FLASH_MD5=19,this.ESP_ERASE_FLASH=208,this.ESP_ERASE_REGION=209,this.ESP_READ_FLASH=210,this.ESP_RUN_USER_CODE=211,this.ESP_IMAGE_MAGIC=233,this.ESP_CHECKSUM_MAGIC=239,this.ROM_INVALID_RECV_MSG=5,this.DEFAULT_TIMEOUT=3e3,this.ERASE_REGION_TIMEOUT_PER_MB=3e4,this.ERASE_WRITE_TIMEOUT_PER_MB=4e4,this.MD5_TIMEOUT_PER_MB=8e3,this.CHIP_ERASE_TIMEOUT=12e4,this.FLASH_READ_TIMEOUT=1e5,this.MAX_TIMEOUT=2*this.CHIP_ERASE_TIMEOUT,this.CHIP_DETECT_MAGIC_REG_ADDR=1073745920,this.DETECTED_FLASH_SIZES={18:"256KB",19:"512KB",20:"1MB",21:"2MB",22:"4MB",23:"8MB",24:"16MB"},this.DETECTED_FLASH_SIZES_NUM={18:256,19:512,20:1024,21:2048,22:4096,23:8192,24:16384},this.USB_JTAG_SERIAL_PID=4097,this.romBaudrate=115200,this.debugLogging=!1,this.syncStubDetected=!1,this.flashSizeBytes=function(e){let t=-1;return-1!==e.indexOf("KB")?t=1024*parseInt(e.slice(0,e.indexOf("KB"))):-1!==e.indexOf("MB")&&(t=1024*parseInt(e.slice(0,e.indexOf("MB")))*1024),t},this.IS_STUB=!1,this.FLASH_WRITE_SIZE=16384,this.transport=e.transport,this.baudrate=e.baudrate,this.resetConstructors={classicReset:(e,t)=>new aA(e,t),customReset:(e,t)=>new oA(e,t),hardReset:(e,t)=>new nA(e,t),usbJTAGSerialReset:e=>new rA(e)},e.serialOptions&&(this.serialOptions=e.serialOptions),e.romBaudrate&&(this.romBaudrate=e.romBaudrate),e.terminal&&(this.terminal=e.terminal,this.terminal.clean()),void 0!==e.debugLogging&&(this.debugLogging=e.debugLogging),e.port&&(this.transport=new iA(e.port)),void 0!==e.enableTracing&&(this.transport.tracing=e.enableTracing),(null===(t=e.resetConstructors)||void 0===t?void 0:t.classicReset)&&(this.resetConstructors.classicReset=null===(i=e.resetConstructors)||void 0===i?void 0:i.classicReset),(null===(s=e.resetConstructors)||void 0===s?void 0:s.customReset)&&(this.resetConstructors.customReset=null===(a=e.resetConstructors)||void 0===a?void 0:a.customReset),(null===(r=e.resetConstructors)||void 0===r?void 0:r.hardReset)&&(this.resetConstructors.hardReset=null===(n=e.resetConstructors)||void 0===n?void 0:n.hardReset),(null===(o=e.resetConstructors)||void 0===o?void 0:o.usbJTAGSerialReset)&&(this.resetConstructors.usbJTAGSerialReset=null===(l=e.resetConstructors)||void 0===l?void 0:l.usbJTAGSerialReset),this.info("esptool.js"),this.info("Serial port "+this.transport.getInfo())}_sleep(e){return new Promise(t=>setTimeout(t,e))}write(e,t=!0){this.terminal?t?this.terminal.writeLine(e):this.terminal.write(e):console.log(e)}error(e,t=!0){this.write(`Error: ${e}`,t)}info(e,t=!0){this.write(e,t)}debug(e,t=!0){this.debugLogging&&this.write(`Debug: ${e}`,t)}_shortToBytearray(e){return new Uint8Array([255&e,e>>8&255])}_intToByteArray(e){return new Uint8Array([255&e,e>>8&255,e>>16&255,e>>24&255])}_byteArrayToShort(e,t){return e|t>>8}_byteArrayToInt(e,t,i,s){return e|t<<8|i<<16|s<<24}_appendBuffer(e,t){const i=new Uint8Array(e.byteLength+t.byteLength);return i.set(new Uint8Array(e),0),i.set(new Uint8Array(t),e.byteLength),i.buffer}_appendArray(e,t){const i=new Uint8Array(e.length+t.length);return i.set(e,0),i.set(t,e.length),i}ui8ToBstr(e){let t="";for(let i=0;i<e.length;i++)t+=String.fromCharCode(e[i]);return t}bstrToUi8(e){const t=new Uint8Array(e.length);for(let i=0;i<e.length;i++)t[i]=e.charCodeAt(i);return t}async flushInput(){try{await this.transport.flushInput()}catch(e){this.error(e.message)}}async readPacket(e=null,t=this.DEFAULT_TIMEOUT){for(let i=0;i<100;i++){const{value:i}=await this.transport.read(t).next();if(!i||i.length<8)continue;const s=i[0];if(1!==s)continue;const a=i[1],r=this._byteArrayToInt(i[4],i[5],i[6],i[7]),n=i.slice(8);if(1==s){if(null==e||a==e)return[r,n];if(0!=n[0]&&n[1]==this.ROM_INVALID_RECV_MSG)throw await this.flushInput(),new qh("unsupported command error")}}throw new qh("invalid response")}async command(e=null,t=new Uint8Array(0),i=0,s=!0,a=this.DEFAULT_TIMEOUT){if(null!=e){this.transport.tracing&&this.transport.trace(`command op:0x${e.toString(16).padStart(2,"0")} data len=${t.length} wait_response=${s?1:0} timeout=${(a/1e3).toFixed(3)} data=${this.transport.hexConvert(t)}`);const r=new Uint8Array(8+t.length);let n;for(r[0]=0,r[1]=e,r[2]=this._shortToBytearray(t.length)[0],r[3]=this._shortToBytearray(t.length)[1],r[4]=this._intToByteArray(i)[0],r[5]=this._intToByteArray(i)[1],r[6]=this._intToByteArray(i)[2],r[7]=this._intToByteArray(i)[3],n=0;n<t.length;n++)r[8+n]=t[n];await this.transport.write(r)}return s?this.readPacket(e,a):[0,new Uint8Array(0)]}async readReg(e,t=this.DEFAULT_TIMEOUT){const i=this._intToByteArray(e);return(await this.command(this.ESP_READ_REG,i,void 0,void 0,t))[0]}async writeReg(e,t,i=4294967295,s=0,a=0){let r=this._appendArray(this._intToByteArray(e),this._intToByteArray(t));r=this._appendArray(r,this._intToByteArray(i)),r=this._appendArray(r,this._intToByteArray(s)),a>0&&(r=this._appendArray(r,this._intToByteArray(this.chip.UART_DATE_REG_ADDR)),r=this._appendArray(r,this._intToByteArray(0)),r=this._appendArray(r,this._intToByteArray(0)),r=this._appendArray(r,this._intToByteArray(a))),await this.checkCommand("write target memory",this.ESP_WRITE_REG,r)}async sync(){this.debug("Sync");const e=new Uint8Array(36);let t;for(e[0]=7,e[1]=7,e[2]=18,e[3]=32,t=0;t<32;t++)e[4+t]=85;try{let t=await this.command(8,e,void 0,void 0,100);this.syncStubDetected=0===t[0];for(let e=0;e<7;e++)t=await this.command(),this.syncStubDetected=this.syncStubDetected&&0===t[0];return t}catch(e){throw this.debug("Sync err "+e),e}}async _connectAttempt(e="default_reset",t){this.debug("_connect_attempt "+e),t&&await t.reset();const i=this.transport.inWaiting(),s=await this.transport.newRead(i>0?i:1,this.DEFAULT_TIMEOUT),a=Array.from(s,e=>String.fromCharCode(e)).join("").match(/boot:(0x[0-9a-fA-F]+)(.*waiting for download)?/);let r=!1,n="",o=!1;a&&(r=!0,n=a[1],o=!!a[2]);let l="";for(let t=0;t<5;t++)try{this.debug(`Sync connect attempt ${t}`);const e=await this.sync();return this.debug(e[0].toString()),"success"}catch(e){this.debug(`Error at sync ${e}`),l=e instanceof Error?e.message:"string"==typeof e?e:JSON.stringify(e)}return r&&(l=`Wrong boot mode detected (${n}).\n        This chip needs to be in download mode.`,o&&(l="Download mode successfully detected, but getting no sync reply:\n           The serial TX path seems to be down.")),l}constructResetSequence(e){if("no_reset"!==e)if("usb_reset"===e||this.transport.getPid()===this.USB_JTAG_SERIAL_PID){if(this.resetConstructors.usbJTAGSerialReset)return this.debug("using USB JTAG Serial Reset"),[this.resetConstructors.usbJTAGSerialReset(this.transport)]}else{const e=50,t=e+500;if(this.resetConstructors.classicReset)return this.debug("using Classic Serial Reset"),[this.resetConstructors.classicReset(this.transport,e),this.resetConstructors.classicReset(this.transport,t)]}return[]}async connect(e="default_reset",t=7,i=!1){let s;this.info("Connecting...",!1),await this.transport.connect(this.romBaudrate,this.serialOptions);const a=this.constructResetSequence(e);for(let i=0;i<t;i++){const t=a.length>0?a[i%a.length]:null;if(s=await this._connectAttempt(e,t),"success"===s)break}if("success"!==s)throw new qh("Failed to connect with the device");if(this.debug("Connect attempt successful."),this.info("\n\r",!1),!i){const e=await this.readReg(this.CHIP_DETECT_MAGIC_REG_ADDR)>>>0;this.debug("Chip Magic "+e.toString(16));const t=await async function(e){switch(e){case 15736195:{const{ESP32ROM:e}=await Promise.resolve().then(function(){return Jf});return new e}case 1867591791:case 2084675695:{const{ESP32C2ROM:e}=await Promise.resolve().then(function(){return Zf});return new e}case 1763790959:case 456216687:case 1216438383:case 1130455151:{const{ESP32C3ROM:e}=await Promise.resolve().then(function(){return Vf});return new e}case 752910447:{const{ESP32C6ROM:e}=await Promise.resolve().then(function(){return em});return new e}case 606167151:case 871374959:case 1333878895:{const{ESP32C61ROM:e}=await Promise.resolve().then(function(){return tm});return new e}case 285294703:case 1675706479:{const{ESP32C5ROM:e}=await Promise.resolve().then(function(){return im});return new e}case 3619110528:{const{ESP32H2ROM:e}=await Promise.resolve().then(function(){return sm});return new e}case 9:{const{ESP32S3ROM:e}=await Promise.resolve().then(function(){return am});return new e}case 1990:{const{ESP32S2ROM:e}=await Promise.resolve().then(function(){return rm});return new e}case 4293968129:{const{ESP8266ROM:e}=await Promise.resolve().then(function(){return nm});return new e}case 0:case 182303440:case 117676761:{const{ESP32P4ROM:e}=await Promise.resolve().then(function(){return om});return new e}default:return null}}(e);if(null===this.chip)throw new qh(`Unexpected CHIP magic value ${e}. Failed to autodetect chip type.`);this.chip=t}}async detectChip(e="default_reset"){await this.connect(e,this.romBaudrate),this.info("Detecting chip type... ",!1),null!=this.chip?this.info(this.chip.CHIP_NAME):this.info("unknown!")}async checkCommand(e="",t=null,i=new Uint8Array(0),s=0,a=this.DEFAULT_TIMEOUT){this.debug("check_command "+e);const r=await this.command(t,i,s,void 0,a);return r[1].length>4?r[1]:r[0]}async memBegin(e,t,i,s){if(this.IS_STUB){const t=s,i=s+e,a=await lA(this.chip.CHIP_NAME);if(a){const e=[[a.bss_start||a.data_start,a.data_start+a.decodedData.length],[a.text_start,a.text_start+a.decodedText.length]];for(const[s,a]of e)if(t<a&&i>s)throw new qh(`Software loader is resident at 0x${s.toString(16).padStart(8,"0")}-0x${a.toString(16).padStart(8,"0")}.\n            Can't load binary at overlapping address range 0x${t.toString(16).padStart(8,"0")}-0x${i.toString(16).padStart(8,"0")}.\n            Either change binary loading address, or use the no-stub option to disable the software loader.`)}}this.debug("mem_begin "+e+" "+t+" "+i+" "+s.toString(16));let a=this._appendArray(this._intToByteArray(e),this._intToByteArray(t));a=this._appendArray(a,this._intToByteArray(i)),a=this._appendArray(a,this._intToByteArray(s)),await this.checkCommand("enter RAM download mode",this.ESP_MEM_BEGIN,a)}checksum(e,t=this.ESP_CHECKSUM_MAGIC){for(let i=0;i<e.length;i++)t^=e[i];return t}async memBlock(e,t){let i=this._appendArray(this._intToByteArray(e.length),this._intToByteArray(t));i=this._appendArray(i,this._intToByteArray(0)),i=this._appendArray(i,this._intToByteArray(0)),i=this._appendArray(i,e);const s=this.checksum(e);await this.checkCommand("write to target RAM",this.ESP_MEM_DATA,i,s)}async memFinish(e){const t=0===e?1:0,i=this._appendArray(this._intToByteArray(t),this._intToByteArray(e));await this.checkCommand("leave RAM download mode",this.ESP_MEM_END,i,void 0,200)}async flashSpiAttach(e){const t=this._intToByteArray(e);await this.checkCommand("configure SPI flash pins",this.ESP_SPI_ATTACH,t)}timeoutPerMb(e,t){const i=e*(t/1e6);return i<3e3?3e3:i}async flashBegin(e,t){const i=Math.floor((e+this.FLASH_WRITE_SIZE-1)/this.FLASH_WRITE_SIZE),s=this.chip.getEraseSize(t,e),a=new Date,r=a.getTime();let n=3e3;0==this.IS_STUB&&(n=this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB,e)),this.debug("flash begin "+s+" "+i+" "+this.FLASH_WRITE_SIZE+" "+t+" "+e);let o=this._appendArray(this._intToByteArray(s),this._intToByteArray(i));o=this._appendArray(o,this._intToByteArray(this.FLASH_WRITE_SIZE)),o=this._appendArray(o,this._intToByteArray(t)),0==this.IS_STUB&&(o=this._appendArray(o,this._intToByteArray(0))),await this.checkCommand("enter Flash download mode",this.ESP_FLASH_BEGIN,o,void 0,n);const l=a.getTime();return 0!=e&&0==this.IS_STUB&&this.info("Took "+(l-r)/1e3+"."+(l-r)%1e3+"s to erase flash block"),i}async flashDeflBegin(e,t,i){const s=Math.floor((t+this.FLASH_WRITE_SIZE-1)/this.FLASH_WRITE_SIZE),a=Math.floor((e+this.FLASH_WRITE_SIZE-1)/this.FLASH_WRITE_SIZE),r=new Date,n=r.getTime();let o,l;this.IS_STUB?(o=e,l=this.DEFAULT_TIMEOUT):(o=a*this.FLASH_WRITE_SIZE,l=this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB,o)),this.info("Compressed "+e+" bytes to "+t+"...");let c=this._appendArray(this._intToByteArray(o),this._intToByteArray(s));c=this._appendArray(c,this._intToByteArray(this.FLASH_WRITE_SIZE)),c=this._appendArray(c,this._intToByteArray(i)),"ESP32-S2"!==this.chip.CHIP_NAME&&"ESP32-S3"!==this.chip.CHIP_NAME&&"ESP32-C3"!==this.chip.CHIP_NAME&&"ESP32-C2"!==this.chip.CHIP_NAME||!1!==this.IS_STUB||(c=this._appendArray(c,this._intToByteArray(0))),await this.checkCommand("enter compressed flash mode",this.ESP_FLASH_DEFL_BEGIN,c,void 0,l);const d=r.getTime();return 0!=e&&!1===this.IS_STUB&&this.info("Took "+(d-n)/1e3+"."+(d-n)%1e3+"s to erase flash block"),s}async flashBlock(e,t,i){let s=this._appendArray(this._intToByteArray(e.length),this._intToByteArray(t));s=this._appendArray(s,this._intToByteArray(0)),s=this._appendArray(s,this._intToByteArray(0)),s=this._appendArray(s,e);const a=this.checksum(e);await this.checkCommand("write to target Flash after seq "+t,this.ESP_FLASH_DATA,s,a,i)}async flashDeflBlock(e,t,i){let s=this._appendArray(this._intToByteArray(e.length),this._intToByteArray(t));s=this._appendArray(s,this._intToByteArray(0)),s=this._appendArray(s,this._intToByteArray(0)),s=this._appendArray(s,e);const a=this.checksum(e);this.debug("flash_defl_block "+e[0].toString(16)+" "+e[1].toString(16)),await this.checkCommand("write compressed data to flash after seq "+t,this.ESP_FLASH_DEFL_DATA,s,a,i)}async flashFinish(e=!1){const t=e?0:1,i=this._intToByteArray(t);await this.checkCommand("leave Flash mode",this.ESP_FLASH_END,i)}async flashDeflFinish(e=!1){const t=e?0:1,i=this._intToByteArray(t);await this.checkCommand("leave compressed flash mode",this.ESP_FLASH_DEFL_END,i)}async runSpiflashCommand(e,t,i){const s=this.chip.SPI_REG_BASE,a=s+0,r=s+this.chip.SPI_USR_OFFS,n=s+this.chip.SPI_USR1_OFFS,o=s+this.chip.SPI_USR2_OFFS,l=s+this.chip.SPI_W0_OFFS;let c;c=null!=this.chip.SPI_MOSI_DLEN_OFFS?async(e,t)=>{const i=s+this.chip.SPI_MOSI_DLEN_OFFS,a=s+this.chip.SPI_MISO_DLEN_OFFS;e>0&&await this.writeReg(i,e-1),t>0&&await this.writeReg(a,t-1)}:async(e,t)=>{const i=n,s=(0===t?0:t-1)<<8|(0===e?0:e-1)<<17;await this.writeReg(i,s)};const d=1<<18;if(i>32)throw new qh("Reading more than 32 bits back from a SPI flash operation is unsupported");if(t.length>64)throw new qh("Writing more than 64 bytes of data with one SPI command is unsupported");const h=8*t.length,p=await this.readReg(r),u=await this.readReg(o);let g,A=1<<31;i>0&&(A|=268435456),h>0&&(A|=134217728),await c(h,i),await this.writeReg(r,A);let f=7<<28|e;if(await this.writeReg(o,f),0==h)await this.writeReg(l,0);else{if(t.length%4!=0){const e=new Uint8Array(t.length%4);t=this._appendArray(t,e)}let e=l;for(g=0;g<t.length-4;g+=4)f=this._byteArrayToInt(t[g],t[g+1],t[g+2],t[g+3]),await this.writeReg(e,f),e+=4}for(await this.writeReg(a,d),g=0;g<10&&(f=await this.readReg(a)&d,0!=f);g++);if(10===g)throw new qh("SPI command did not complete in time");const m=await this.readReg(l);return await this.writeReg(r,p),await this.writeReg(o,u),m}async readFlashId(){const e=new Uint8Array(0);return await this.runSpiflashCommand(159,e,24)}async eraseFlash(){this.info("Erasing flash (this may take a while)...");let e=new Date;const t=e.getTime(),i=await this.checkCommand("erase flash",this.ESP_ERASE_FLASH,void 0,void 0,this.CHIP_ERASE_TIMEOUT);e=new Date;const s=e.getTime();return this.info("Chip erase completed successfully in "+(s-t)/1e3+"s"),i}toHex(e){return Array.prototype.map.call(e,e=>("00"+e.toString(16)).slice(-2)).join("")}async flashMd5sum(e,t){const i=this.timeoutPerMb(this.MD5_TIMEOUT_PER_MB,t);let s=this._appendArray(this._intToByteArray(e),this._intToByteArray(t));s=this._appendArray(s,this._intToByteArray(0)),s=this._appendArray(s,this._intToByteArray(0));let a=await this.checkCommand("calculate md5sum",this.ESP_SPI_FLASH_MD5,s,void 0,i);return a instanceof Uint8Array&&a.length>16&&(a=a.slice(0,16)),this.toHex(a)}async readFlash(e,t,i=null){let s=this._appendArray(this._intToByteArray(e),this._intToByteArray(t));s=this._appendArray(s,this._intToByteArray(4096)),s=this._appendArray(s,this._intToByteArray(1024));const a=await this.checkCommand("read flash",this.ESP_READ_FLASH,s);if(0!=a)throw new qh("Failed to read memory: "+a);let r=new Uint8Array(0);for(;r.length<t;){const{value:e}=await this.transport.read(this.FLASH_READ_TIMEOUT).next();if(!(e instanceof Uint8Array))throw new qh("Failed to read memory: "+e);e.length>0&&(r=this._appendArray(r,e),await this.transport.write(this._intToByteArray(r.length)),i&&i(e,r.length,t))}return r}async runStub(){if(this.syncStubDetected)return this.info("Stub is already running. No upload is necessary."),this.chip;this.info("Uploading stub...");const e=await lA(this.chip.CHIP_NAME);if(void 0===e)throw this.debug("Error loading Stub json"),new Error("Error loading Stub json");const t=[e.decodedText,e.decodedData];for(let i=0;i<t.length;i++)if(t[i]){const s=0===i?e.text_start:e.data_start,a=t[i].length,r=Math.floor((a+this.ESP_RAM_BLOCK-1)/this.ESP_RAM_BLOCK);await this.memBegin(a,r,this.ESP_RAM_BLOCK,s);for(let e=0;e<r;e++){const s=e*this.ESP_RAM_BLOCK,a=s+this.ESP_RAM_BLOCK;await this.memBlock(t[i].slice(s,a),e)}}this.info("Running stub..."),await this.memFinish(e.entry);const{value:i}=await this.transport.read(this.DEFAULT_TIMEOUT).next(),s=String.fromCharCode(...i);if("OHAI"!==s)throw new qh(`Failed to start stub. Unexpected response ${s}`);return this.info("Stub running..."),this.IS_STUB=!0,this.chip}async changeBaud(){this.info("Changing baudrate to "+this.baudrate);const e=this.IS_STUB?this.romBaudrate:0,t=this._appendArray(this._intToByteArray(this.baudrate),this._intToByteArray(e));await this.command(this.ESP_CHANGE_BAUDRATE,t),this.info("Changed"),await this.transport.disconnect(),await this._sleep(50),await this.transport.connect(this.baudrate,this.serialOptions)}async main(e="default_reset"){await this.detectChip(e);const t=await this.chip.getChipDescription(this);return this.info("Chip is "+t),this.info("Features: "+await this.chip.getChipFeatures(this)),this.info("Crystal is "+await this.chip.getCrystalFreq(this)+"MHz"),this.info("MAC: "+await this.chip.readMac(this)),await this.chip.readMac(this),void 0!==this.chip.postConnect&&await this.chip.postConnect(this),await this.runStub(),this.romBaudrate!==this.baudrate&&await this.changeBaud(),t}parseFlashSizeArg(e){if(void 0===this.chip.FLASH_SIZES[e])throw new qh("Flash size "+e+" is not supported by this chip type. Supported sizes: "+this.chip.FLASH_SIZES);return this.chip.FLASH_SIZES[e]}_updateImageFlashParams(e,t,i,s,a){if(this.debug("_update_image_flash_params "+i+" "+s+" "+a),e.length<8)return e;if(t!=this.chip.BOOTLOADER_FLASH_OFFSET)return e;if("keep"===i&&"keep"===s&&"keep"===a)return this.info("Not changing the image"),e;const r=parseInt(e[0]);let n=parseInt(e[2]);const o=parseInt(e[3]);if(r!==this.ESP_IMAGE_MAGIC)return this.info("Warning: Image file at 0x"+t.toString(16)+" doesn't look like an image file, so not changing any flash settings."),e;"keep"!==s&&(n={qio:0,qout:1,dio:2,dout:3}[s]);let l=15&o;"keep"!==a&&(l={"40m":0,"26m":1,"20m":2,"80m":15}[a]);let c=240&o;"keep"!==i&&(c=this.parseFlashSizeArg(i));const d=n<<8|l+c;return this.info("Flash params set to "+d.toString(16)),parseInt(e[2])!==n<<8&&(e=e.substring(0,2)+(n<<8).toString()+e.substring(3)),parseInt(e[3])!==l+c&&(e=e.substring(0,3)+(l+c).toString()+e.substring(4)),e}async writeFlash(e){if(this.debug("EspLoader program"),"keep"!==e.flashSize){const t=this.flashSizeBytes(e.flashSize);for(let i=0;i<e.fileArray.length;i++)if(e.fileArray[i].data.length+e.fileArray[i].address>t)throw new qh(`File ${i+1} doesn't fit in the available flash`)}let t,i;!0===this.IS_STUB&&!0===e.eraseAll&&await this.eraseFlash();for(let s=0;s<e.fileArray.length;s++){if(this.debug("Data Length "+e.fileArray[s].data.length),t=e.fileArray[s].data,this.debug("Image Length "+t.length),0===t.length){this.debug("Warning: File is empty");continue}t=this.ui8ToBstr(dA(this.bstrToUi8(t),4)),i=e.fileArray[s].address,t=this._updateImageFlashParams(t,i,e.flashSize,e.flashMode,e.flashFreq);let a=null;e.calculateMD5Hash&&(a=e.calculateMD5Hash(t),this.debug("Image MD5 "+a));const r=t.length;let n;if(e.compress){const e=this.bstrToUi8(t);t=this.ui8ToBstr(eA(e,{level:9})),n=await this.flashDeflBegin(r,t.length,i)}else n=await this.flashBegin(r,i);let o=0,l=0;const c=t.length;e.reportProgress&&e.reportProgress(s,0,c);let d=new Date;const h=d.getTime();let p=5e3;const u=new tA({chunkSize:1});let g=0;for(u.onData=function(e){g+=e.byteLength};t.length>0;){this.debug("Write loop "+i+" "+o+" "+n),this.info("Writing at 0x"+(i+g).toString(16)+"... ("+Math.floor(100*(o+1)/n)+"%)");const a=this.bstrToUi8(t.slice(0,this.FLASH_WRITE_SIZE));if(!e.compress)throw new qh("Yet to handle Non Compressed writes");{const e=g;u.push(a,!1);const t=g-e;let i=3e3;this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB,t)>3e3&&(i=this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB,t)),!1===this.IS_STUB&&(p=i),await this.flashDeflBlock(a,o,p),this.IS_STUB&&(p=i)}l+=a.length,t=t.slice(this.FLASH_WRITE_SIZE,t.length),o++,e.reportProgress&&e.reportProgress(s,l,c)}this.IS_STUB&&await this.readReg(this.CHIP_DETECT_MAGIC_REG_ADDR,p),d=new Date;const A=d.getTime()-h;if(e.compress&&this.info("Wrote "+r+" bytes ("+l+" compressed) at 0x"+i.toString(16)+" in "+A/1e3+" seconds."),a){const e=await this.flashMd5sum(i,r);if(new String(e).valueOf()!=new String(a).valueOf())throw this.info("File  md5: "+a),this.info("Flash md5: "+e),new qh("MD5 of file does not match data in flash!");this.info("Hash of data verified.")}}this.info("Leaving..."),this.IS_STUB&&(await this.flashBegin(0,0),e.compress?await this.flashDeflFinish():await this.flashFinish())}async flashId(){this.debug("flash_id");const e=await this.readFlashId();this.info("Manufacturer: "+(255&e).toString(16));const t=e>>16&255;this.info("Device: "+(e>>8&255).toString(16)+t.toString(16)),this.info("Detected flash size: "+this.DETECTED_FLASH_SIZES[t])}async getFlashSize(){this.debug("flash_id");const e=await this.readFlashId()>>16&255;return this.DETECTED_FLASH_SIZES_NUM[e]}async softReset(e){if(this.IS_STUB){if("ESP8266"!=this.chip.CHIP_NAME)throw new qh("Soft resetting is currently only supported on ESP8266");e?(await this.flashBegin(0,0),await this.flashFinish(!0)):await this.command(this.ESP_RUN_USER_CODE,void 0,void 0,!1)}else{if(e)return;await this.flashBegin(0,0),await this.flashFinish(!1)}}async after(e="hard_reset",t){switch(e){case"hard_reset":if(this.resetConstructors.hardReset){this.info("Hard resetting via RTS pin...");const e=this.resetConstructors.hardReset(this.transport,t);await e.reset()}break;case"soft_reset":this.info("Soft resetting..."),await this.softReset(!1);break;case"no_reset_stub":this.info("Staying in flasher stub.");break;default:this.info("Staying in bootloader."),this.IS_STUB&&this.softReset(!0)}}}class pA{getEraseSize(e,t){return t}}const uA=1074521580,gA="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",AA=1074520064,fA="DMD8P+znC0B/6AtAZ+0LQAbpC0Cf6AtABukLQGXpC0CC6gtA9OoLQJ3qC0CV5wtAGuoLQHTqC0CI6QtAGOsLQLDpC0AY6wtAbegLQMroC0AG6QtAZekLQIXoC0DI6wtAKe0LQLjmC0BL7QtAuOYLQLjmC0C45gtAuOYLQLjmC0C45gtAuOYLQLjmC0Bv6wtAuOYLQEnsC0Ap7QtA",mA=1073605544,_A=1073528832;var vA={entry:uA,text:gA,text_start:AA,data:fA,data_start:mA,bss_start:_A},wA=Object.freeze({__proto__:null,bss_start:_A,data:fA,data_start:mA,default:vA,entry:uA,text:gA,text_start:AA});const bA=1077413304,yA="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",xA=1077411840,EA="DEDKP+AIOEAsCThAhAk4QFIKOEC+CjhAbAo4QKgHOEAOCjhATgo4QJgJOEBYBzhAzAk4QFgHOEC6CDhA/gg4QCwJOECECThAzAg4QBIIOEBCCDhAyAg4QBYNOEAsCThA1gs4QMoMOECkBjhA9Aw4QKQGOECkBjhApAY4QKQGOECkBjhApAY4QKQGOECkBjhAcgs4QKQGOEDyCzhAygw4QA==",CA=1070295976,BA=1070219264;var SA={entry:bA,text:yA,text_start:xA,data:EA,data_start:CA,bss_start:BA},kA=Object.freeze({__proto__:null,bss_start:BA,data:EA,data_start:CA,default:SA,entry:bA,text:yA,text_start:xA});const IA=1077413584,RA="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",MA=1077411840,DA="GEDIP8AKOEAQCzhAaAs4QDYMOECiDDhAUAw4QHIJOEDyCzhAMgw4QHwLOEAiCThAsAs4QCIJOECaCjhA4Ao4QBALOEBoCzhArAo4QNYJOEAgCjhAqAo4QPoOOEAQCzhAug04QLIOOEBiCDhA2g44QGIIOEBiCDhAYgg4QGIIOEBiCDhAYgg4QGIIOEBiCDhAVg04QGIIOEDYDThAsg44QA==",FA=1070164916,TA=1070088192;var QA={entry:IA,text:RA,text_start:MA,data:DA,data_start:FA,bss_start:TA},PA=Object.freeze({__proto__:null,bss_start:TA,data:DA,data_start:FA,default:QA,entry:IA,text:RA,text_start:MA});const OA=1082132164,UA="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",zA=1082130432,HA="FACEQG4KgEC+CoBAFguAQOQLgEBQDIBA/guAQDoJgECgC4BA4AuAQCoLgEDqCIBAXguAQOoIgEBICoBAjgqAQL4KgEAWC4BAWgqAQJ4JgEDOCYBAVgqAQKgOgEC+CoBAaA2AQGAOgEAqCIBAiA6AQCoIgEAqCIBAKgiAQCoIgEAqCIBAKgiAQCoIgEAqCIBABA2AQCoIgECGDYBAYA6AQA==",$A=1082469296,NA=1082392576;var LA={entry:OA,text:UA,text_start:zA,data:HA,data_start:$A,bss_start:NA},GA=Object.freeze({__proto__:null,bss_start:NA,data:HA,data_start:$A,default:LA,entry:OA,text:UA,text_start:zA});const YA=1082132164,KA="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",jA=1082130432,WA="FACEQHIKgEDCCoBAGguAQOgLgEBUDIBAAgyAQD4JgECkC4BA5AuAQC4LgEDuCIBAYguAQO4IgEBMCoBAkgqAQMIKgEAaC4BAXgqAQKIJgEDSCYBAWgqAQKwOgEDCCoBAbA2AQGQOgEAuCIBAjA6AQC4IgEAuCIBALgiAQC4IgEAuCIBALgiAQC4IgEAuCIBACA2AQC4IgECKDYBAZA6AQA==",JA=1082469296,qA=1082392576;var VA={entry:YA,text:KA,text_start:jA,data:WA,data_start:JA,bss_start:qA},ZA=Object.freeze({__proto__:null,bss_start:qA,data:WA,data_start:JA,default:VA,entry:YA,text:KA,text_start:jA});const XA=1082132164,ef="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",tf=1082130432,sf="FECAQHQKgEDECoBAHAuAQOoLgEBWDIBABAyAQEAJgECmC4BA5guAQDALgEDwCIBAZAuAQPAIgEBOCoBAlAqAQMQKgEAcC4BAYAqAQKQJgEDUCYBAXAqAQK4OgEDECoBAbg2AQGYOgEAwCIBAjg6AQDAIgEAwCIBAMAiAQDAIgEAwCIBAMAiAQDAIgEAwCIBACg2AQDAIgECMDYBAZg6AQA==",af=1082223536,rf=1082146816;var nf={entry:XA,text:ef,text_start:tf,data:sf,data_start:af,bss_start:rf},of=Object.freeze({__proto__:null,bss_start:rf,data:sf,data_start:af,default:nf,entry:XA,text:ef,text_start:tf});const lf=1082132164,cf="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",df=1082130432,hf="FACDQHIKgEDCCoBAGguAQOgLgEBUDIBAAgyAQD4JgECkC4BA5AuAQC4LgEDuCIBAYguAQO4IgEBMCoBAkgqAQMIKgEAaC4BAXgqAQKIJgEDSCYBAWgqAQKwOgEDCCoBAbA2AQGQOgEAuCIBAjA6AQC4IgEAuCIBALgiAQC4IgEAuCIBALgiAQC4IgEAuCIBACA2AQC4IgECKDYBAZA6AQA==",pf=1082403760,uf=1082327040;var gf={entry:lf,text:cf,text_start:df,data:hf,data_start:pf,bss_start:uf},Af=Object.freeze({__proto__:null,bss_start:uf,data:hf,data_start:pf,default:gf,entry:lf,text:cf,text_start:df});const ff=1341195918,mf="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",_f=1341194240,vf="EAD1TwYK8U9WCvFPrgrxT4QL8U/wC/FPngvxT9QI8U9AC/FPgAvxT8IK8U+ECPFP9grxT4QI8U/gCfFPJgrxT1YK8U+uCvFP8gnxTzgJ8U9oCfFP7gnxT0AO8U9WCvFPCA3xTwAO8U/EB/FPJA7xT8QH8U/EB/FPxAfxT8QH8U/EB/FPxAfxT8QH8U/EB/FPpAzxT8QH8U8mDfFPAA7xTw==",wf=1341533100,bf=1341456384;var yf={entry:ff,text:mf,text_start:_f,data:vf,data_start:wf,bss_start:bf},xf=Object.freeze({__proto__:null,bss_start:bf,data:vf,data_start:wf,default:yf,entry:ff,text:mf,text_start:_f});const Ef=1073907716,Cf="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",Bf=1073905664,Sf="WAD9P0uLAkDdiwJA8pACQGaMAkD+iwJAZowCQMWMAkDejQJAUY4CQPmNAkDVigJAd40CQNCNAkDojAJAdI4CQBCNAkB0jgJAy4sCQCqMAkBmjAJAxYwCQOOLAkAXiwJAN48CQKqQAkDqiQJA0ZACQOqJAkDqiQJA6okCQOqJAkDqiQJA6okCQOqJAkDqiQJA1I4CQOqJAkDJjwJAqpACQA==",kf=1073622012,If=1073545216;var Rf={entry:Ef,text:Cf,text_start:Bf,data:Sf,data_start:kf,bss_start:If},Mf=Object.freeze({__proto__:null,bss_start:If,data:Sf,data_start:kf,default:Rf,entry:Ef,text:Cf,text_start:Bf});const Df=1077381760,Ff="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",Tf=1077379072,Qf="XADKP16ON0AzjzdAR5Q3QL2PN0BTjzdAvY83QB2QN0A6kTdArJE3QFWRN0DpjTdA0JA3QCyRN0BAkDdA0JE3QGiQN0DQkTdAIY83QH6PN0C9jzdAHZA3QDmPN0AqjjdAkJI3QA2UN0AAjTdALZQ3QACNN0AAjTdAAI03QACNN0AAjTdAAI03QACNN0AAjTdAKpI3QACNN0AlkzdADZQ3QAQInwAAAAAAAAAYAQQIBQAAAAAAAAAIAQQIBgAAAAAAAAAAAQQIIQAAAAAAIAAAEQQI3AAAAAAAIAAAEQQIDAAAAAAAIAAAAQQIEgAAAAAAIAAAESAoDAAQAQAA",Pf=1070279676,Of=1070202880;var Uf={entry:Df,text:Ff,text_start:Tf,data:Qf,data_start:Pf,bss_start:Of},zf=Object.freeze({__proto__:null,bss_start:Of,data:Qf,data_start:Pf,default:Uf,entry:Df,text:Ff,text_start:Tf});const Hf=1074843652,$f="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",Nf=1074843648,Lf="CIH+PwUFBAACAwcAAwMLANTXEEAL2BBAOdgQQNbYEECF5xBAOtkQQJDZEEDc2RBAhecQQKLaEEAf2xBA4NsQQIXnEECF5xBAeNwQQIXnEEBV3xBAHOAQQFfgEECF5xBAhecQQPPgEECF5xBA2+EQQIHiEEDA4xBAf+QQQFDlEECF5xBAhecQQIXnEECF5xBAfuYQQIXnEEB05xBAsN0QQKnYEEDC5RBAydoQQBvaEECF5xBACOcQQE/nEECF5xBAhecQQIXnEECF5xBAhecQQIXnEECF5xBAhecQQELaEEB/2hBA2uUQQAEAAAACAAAAAwAAAAQAAAAFAAAABwAAAAkAAAANAAAAEQAAABkAAAAhAAAAMQAAAEEAAABhAAAAgQAAAMEAAAABAQAAgQEAAAECAAABAwAAAQQAAAEGAAABCAAAAQwAAAEQAAABGAAAASAAAAEwAAABQAAAAWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAgAAAAIAAAADAAAAAwAAAAQAAAAEAAAABQAAAAUAAAAGAAAABgAAAAcAAAAHAAAACAAAAAgAAAAJAAAACQAAAAoAAAAKAAAACwAAAAsAAAAMAAAADAAAAA0AAAANAAAAAAAAAAAAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAANAAAADwAAABEAAAATAAAAFwAAABsAAAAfAAAAIwAAACsAAAAzAAAAOwAAAEMAAABTAAAAYwAAAHMAAACDAAAAowAAAMMAAADjAAAAAgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAQAAAAEAAAABAAAAAgAAAAIAAAACAAAAAgAAAAMAAAADAAAAAwAAAAMAAAAEAAAABAAAAAQAAAAEAAAABQAAAAUAAAAFAAAABQAAAAAAAAAAAAAAAAAAABAREgAIBwkGCgULBAwDDQIOAQ8AAQEAAAEAAAAEAAAA",Gf=1073720488,Yf=1073643776;var Kf={entry:Hf,text:$f,text_start:Nf,data:Lf,data_start:Gf,bss_start:Yf},jf=Object.freeze({__proto__:null,bss_start:Yf,data:Lf,data_start:Gf,default:Kf,entry:Hf,text:$f,text_start:Nf});class Wf extends pA{constructor(){super(...arguments),this.CHIP_NAME="ESP32",this.IMAGE_CHIP_ID=0,this.EFUSE_RD_REG_BASE=1073061888,this.DR_REG_SYSCON_BASE=1073111040,this.UART_CLKDIV_REG=1072955412,this.UART_CLKDIV_MASK=1048575,this.UART_DATE_REG_ADDR=1610612856,this.XTAL_CLK_DIVIDER=1,this.FLASH_SIZES={"1MB":0,"2MB":16,"4MB":32,"8MB":48,"16MB":64},this.FLASH_WRITE_SIZE=1024,this.BOOTLOADER_FLASH_OFFSET=4096,this.SPI_REG_BASE=1072963584,this.SPI_USR_OFFS=28,this.SPI_USR1_OFFS=32,this.SPI_USR2_OFFS=36,this.SPI_W0_OFFS=128,this.SPI_MOSI_DLEN_OFFS=40,this.SPI_MISO_DLEN_OFFS=44}async readEfuse(e,t){const i=this.EFUSE_RD_REG_BASE+4*t;return e.debug("Read efuse "+i),await e.readReg(i)}async getPkgVersion(e){const t=await this.readEfuse(e,3);let i=t>>9&7;return i+=(t>>2&1)<<3,i}async getChipRevision(e){const t=await this.readEfuse(e,3),i=await this.readEfuse(e,5),s=await e.readReg(this.DR_REG_SYSCON_BASE+124);return t>>15&1?i>>20&1?s>>31&1?3:2:1:0}async getChipDescription(e){const t=["ESP32-D0WDQ6","ESP32-D0WD","ESP32-D2WD","","ESP32-U4WDH","ESP32-PICO-D4","ESP32-PICO-V3-02"];let i="";const s=await this.getPkgVersion(e),a=await this.getChipRevision(e),r=3==a;return!!(1&await this.readEfuse(e,3))&&(t[0]="ESP32-S0WDQ6",t[1]="ESP32-S0WD"),r&&(t[5]="ESP32-PICO-V3"),i=s>=0&&s<=6?t[s]:"Unknown ESP32",!r||0!==s&&1!==s||(i+="-V3"),i+" (revision "+a+")"}async getChipFeatures(e){const t=["Wi-Fi"],i=await this.readEfuse(e,3);!(2&i)&&t.push(" BT"),1&i?t.push(" Single Core"):t.push(" Dual Core"),8192&i&&(4096&i?t.push(" 160MHz"):t.push(" 240MHz"));const s=await this.getPkgVersion(e);-1!==[2,4,5,6].indexOf(s)&&t.push(" Embedded Flash"),6===s&&t.push(" Embedded PSRAM"),await this.readEfuse(e,4)>>8&31&&t.push(" VRef calibration in efuse"),i>>14&1&&t.push(" BLK3 partially reserved");const a=3&await this.readEfuse(e,6);return t.push(" Coding Scheme "+["None","3/4","Repeat (UNSUPPORTED)","Invalid"][a]),t}async getCrystalFreq(e){const t=await e.readReg(this.UART_CLKDIV_REG)&this.UART_CLKDIV_MASK,i=e.transport.baudrate*t/1e6/this.XTAL_CLK_DIVIDER;let s;return s=i>33?40:26,Math.abs(s-i)>1&&e.info("WARNING: Unsupported crystal in use"),s}_d2h(e){const t=(+e).toString(16);return 1===t.length?"0"+t:t}async readMac(e){let t=await this.readEfuse(e,1);t>>>=0;let i=await this.readEfuse(e,2);i>>>=0;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}}var Jf=Object.freeze({__proto__:null,ESP32ROM:Wf});class qf extends pA{constructor(){super(...arguments),this.CHIP_NAME="ESP32-C3",this.IMAGE_CHIP_ID=5,this.EFUSE_BASE=1610647552,this.MAC_EFUSE_REG=this.EFUSE_BASE+68,this.UART_CLKDIV_REG=1072955412,this.UART_CLKDIV_MASK=1048575,this.UART_DATE_REG_ADDR=1610612860,this.FLASH_WRITE_SIZE=1024,this.BOOTLOADER_FLASH_OFFSET=0,this.FLASH_SIZES={"1MB":0,"2MB":16,"4MB":32,"8MB":48,"16MB":64},this.SPI_REG_BASE=1610620928,this.SPI_USR_OFFS=24,this.SPI_USR1_OFFS=28,this.SPI_USR2_OFFS=32,this.SPI_MOSI_DLEN_OFFS=36,this.SPI_MISO_DLEN_OFFS=40,this.SPI_W0_OFFS=88}async getPkgVersion(e){const t=this.EFUSE_BASE+68+12;return await e.readReg(t)>>21&7}async getChipRevision(e){const t=this.EFUSE_BASE+68+12;return(await e.readReg(t)&7<<18)>>18}async getChipDescription(e){let t;return t=0===await this.getPkgVersion(e)?"ESP32-C3":"unknown ESP32-C3",t+=" (revision "+await this.getChipRevision(e)+")",t}async getFlashCap(e){const t=this.EFUSE_BASE+68+12;return await e.readReg(t)>>27&7}async getFlashVendor(e){const t=this.EFUSE_BASE+68+16;return{1:"XMC",2:"GD",3:"FM",4:"TT",5:"ZBIT"}[7&await e.readReg(t)]||""}async getChipFeatures(e){const t=["Wi-Fi","BLE"],i=await this.getFlashCap(e),s=await this.getFlashVendor(e),a={0:null,1:"Embedded Flash 4MB",2:"Embedded Flash 2MB",3:"Embedded Flash 1MB",4:"Embedded Flash 8MB"}[i],r=void 0!==a?a:"Unknown Embedded Flash";return null!==a&&t.push(`${r} (${s})`),t}async getCrystalFreq(e){return 40}_d2h(e){const t=(+e).toString(16);return 1===t.length?"0"+t:t}async readMac(e){let t=await e.readReg(this.MAC_EFUSE_REG);t>>>=0;let i=await e.readReg(this.MAC_EFUSE_REG+4);i=i>>>0&65535;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}getEraseSize(e,t){return t}}var Vf=Object.freeze({__proto__:null,ESP32C3ROM:qf}),Zf=Object.freeze({__proto__:null,ESP32C2ROM:class extends qf{constructor(){super(...arguments),this.CHIP_NAME="ESP32-C2",this.IMAGE_CHIP_ID=12,this.EFUSE_BASE=1610647552,this.MAC_EFUSE_REG=this.EFUSE_BASE+64,this.UART_CLKDIV_REG=1610612756,this.UART_CLKDIV_MASK=1048575,this.UART_DATE_REG_ADDR=1610612860,this.XTAL_CLK_DIVIDER=1,this.FLASH_WRITE_SIZE=1024,this.BOOTLOADER_FLASH_OFFSET=0,this.FLASH_SIZES={"1MB":0,"2MB":16,"4MB":32,"8MB":48,"16MB":64},this.SPI_REG_BASE=1610620928,this.SPI_USR_OFFS=24,this.SPI_USR1_OFFS=28,this.SPI_USR2_OFFS=32,this.SPI_MOSI_DLEN_OFFS=36,this.SPI_MISO_DLEN_OFFS=40,this.SPI_W0_OFFS=88}async getPkgVersion(e){const t=this.EFUSE_BASE+64+4;return await e.readReg(t)>>22&7}async getChipRevision(e){const t=this.EFUSE_BASE+64+4;return(await e.readReg(t)&3<<20)>>20}async getChipDescription(e){let t;const i=await this.getPkgVersion(e);return t=0===i||1===i?"ESP32-C2":"unknown ESP32-C2",t+=" (revision "+await this.getChipRevision(e)+")",t}async getChipFeatures(e){return["Wi-Fi","BLE"]}async getCrystalFreq(e){const t=await e.readReg(this.UART_CLKDIV_REG)&this.UART_CLKDIV_MASK,i=e.transport.baudrate*t/1e6/this.XTAL_CLK_DIVIDER;let s;return s=i>33?40:26,Math.abs(s-i)>1&&e.info("WARNING: Unsupported crystal in use"),s}async changeBaudRate(e){26===await this.getCrystalFreq(e)&&e.changeBaud()}_d2h(e){const t=(+e).toString(16);return 1===t.length?"0"+t:t}async readMac(e){let t=await e.readReg(this.MAC_EFUSE_REG);t>>>=0;let i=await e.readReg(this.MAC_EFUSE_REG+4);i=i>>>0&65535;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}getEraseSize(e,t){return t}}});class Xf extends pA{constructor(){super(...arguments),this.CHIP_NAME="ESP32-C6",this.IMAGE_CHIP_ID=13,this.EFUSE_BASE=1611335680,this.MAC_EFUSE_REG=this.EFUSE_BASE+68,this.UART_CLKDIV_REG=1072955412,this.UART_CLKDIV_MASK=1048575,this.UART_DATE_REG_ADDR=1610612860,this.FLASH_WRITE_SIZE=1024,this.BOOTLOADER_FLASH_OFFSET=0,this.FLASH_SIZES={"1MB":0,"2MB":16,"4MB":32,"8MB":48,"16MB":64},this.SPI_REG_BASE=1610620928,this.SPI_USR_OFFS=24,this.SPI_USR1_OFFS=28,this.SPI_USR2_OFFS=32,this.SPI_MOSI_DLEN_OFFS=36,this.SPI_MISO_DLEN_OFFS=40,this.SPI_W0_OFFS=88}async getPkgVersion(e){const t=this.EFUSE_BASE+68+12;return await e.readReg(t)>>21&7}async getChipRevision(e){const t=this.EFUSE_BASE+68+12;return(await e.readReg(t)&7<<18)>>18}async getChipDescription(e){let t;return t=0===await this.getPkgVersion(e)?"ESP32-C6":"unknown ESP32-C6",t+=" (revision "+await this.getChipRevision(e)+")",t}async getChipFeatures(e){return["Wi-Fi 6","BT 5","IEEE802.15.4"]}async getCrystalFreq(e){return 40}_d2h(e){const t=(+e).toString(16);return 1===t.length?"0"+t:t}async readMac(e){let t=await e.readReg(this.MAC_EFUSE_REG);t>>>=0;let i=await e.readReg(this.MAC_EFUSE_REG+4);i=i>>>0&65535;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}getEraseSize(e,t){return t}}var em=Object.freeze({__proto__:null,ESP32C6ROM:Xf}),tm=Object.freeze({__proto__:null,ESP32C61ROM:class extends Xf{constructor(){super(...arguments),this.CHIP_NAME="ESP32-C61",this.IMAGE_CHIP_ID=20,this.CHIP_DETECT_MAGIC_VALUE=[871374959,606167151],this.UART_DATE_REG_ADDR=1610612860,this.EFUSE_BASE=1611352064,this.EFUSE_BLOCK1_ADDR=this.EFUSE_BASE+68,this.MAC_EFUSE_REG=this.EFUSE_BASE+68,this.EFUSE_RD_REG_BASE=this.EFUSE_BASE+48,this.EFUSE_PURPOSE_KEY0_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY0_SHIFT=0,this.EFUSE_PURPOSE_KEY1_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY1_SHIFT=4,this.EFUSE_PURPOSE_KEY2_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY2_SHIFT=8,this.EFUSE_PURPOSE_KEY3_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY3_SHIFT=12,this.EFUSE_PURPOSE_KEY4_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY4_SHIFT=16,this.EFUSE_PURPOSE_KEY5_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY5_SHIFT=20,this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG=this.EFUSE_RD_REG_BASE,this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT=1<<20,this.EFUSE_SPI_BOOT_CRYPT_CNT_REG=this.EFUSE_BASE+48,this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK=7<<23,this.EFUSE_SECURE_BOOT_EN_REG=this.EFUSE_BASE+52,this.EFUSE_SECURE_BOOT_EN_MASK=1<<26,this.FLASH_FREQUENCY={"80m":15,"40m":0,"20m":2},this.MEMORY_MAP=[[0,65536,"PADDING"],[1098907648,1107296256,"DROM"],[1082130432,1082523648,"DRAM"],[1082130432,1082523648,"BYTE_ACCESSIBLE"],[1074048e3,1074069504,"DROM_MASK"],[1073741824,1074048e3,"IROM_MASK"],[1090519040,1098907648,"IROM"],[1082130432,1082523648,"IRAM"],[1342177280,1342193664,"RTC_IRAM"],[1342177280,1342193664,"RTC_DRAM"],[1611653120,1611661312,"MEM_INTERNAL2"]],this.UF2_FAMILY_ID=2010665156,this.EFUSE_MAX_KEY=5,this.KEY_PURPOSES={0:"USER/EMPTY",1:"ECDSA_KEY",2:"XTS_AES_256_KEY_1",3:"XTS_AES_256_KEY_2",4:"XTS_AES_128_KEY",5:"HMAC_DOWN_ALL",6:"HMAC_DOWN_JTAG",7:"HMAC_DOWN_DIGITAL_SIGNATURE",8:"HMAC_UP",9:"SECURE_BOOT_DIGEST0",10:"SECURE_BOOT_DIGEST1",11:"SECURE_BOOT_DIGEST2",12:"KM_INIT_KEY",13:"XTS_AES_256_KEY_1_PSRAM",14:"XTS_AES_256_KEY_2_PSRAM",15:"XTS_AES_128_KEY_PSRAM"}}async getPkgVersion(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+8)>>26&7}async getMinorChipVersion(e){return 15&await e.readReg(this.EFUSE_BLOCK1_ADDR+8)}async getMajorChipVersion(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+8)>>4&3}async getChipDescription(e){let t;return t=0===await this.getPkgVersion(e)?"ESP32-C61":"unknown ESP32-C61",`${t} (revision v${await this.getMajorChipVersion(e)}.${await this.getMinorChipVersion(e)})`}async getChipFeatures(e){return["WiFi 6","BT 5"]}async readMac(e){let t=await e.readReg(this.MAC_EFUSE_REG);t>>>=0;let i=await e.readReg(this.MAC_EFUSE_REG+4);i=i>>>0&65535;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}}}),im=Object.freeze({__proto__:null,ESP32C5ROM:class extends Xf{constructor(){super(...arguments),this.CHIP_NAME="ESP32-C5",this.IMAGE_CHIP_ID=23,this.EFUSE_BASE=1611352064,this.EFUSE_BLOCK1_ADDR=this.EFUSE_BASE+68,this.MAC_EFUSE_REG=this.EFUSE_BASE+68,this.UART_CLKDIV_REG=1610612756,this.EFUSE_RD_REG_BASE=this.EFUSE_BASE+48,this.EFUSE_PURPOSE_KEY0_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY0_SHIFT=24,this.EFUSE_PURPOSE_KEY1_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY1_SHIFT=28,this.EFUSE_PURPOSE_KEY2_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY2_SHIFT=0,this.EFUSE_PURPOSE_KEY3_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY3_SHIFT=4,this.EFUSE_PURPOSE_KEY4_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY4_SHIFT=8,this.EFUSE_PURPOSE_KEY5_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY5_SHIFT=12,this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG=this.EFUSE_RD_REG_BASE,this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT=1<<20,this.EFUSE_SPI_BOOT_CRYPT_CNT_REG=this.EFUSE_BASE+52,this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK=7<<18,this.EFUSE_SECURE_BOOT_EN_REG=this.EFUSE_BASE+56,this.EFUSE_SECURE_BOOT_EN_MASK=1<<20,this.IROM_MAP_START=1107296256,this.IROM_MAP_END=1115684864,this.DROM_MAP_START=1115684864,this.DROM_MAP_END=1124073472,this.PCR_SYSCLK_CONF_REG=1611227408,this.PCR_SYSCLK_XTAL_FREQ_V=127<<24,this.PCR_SYSCLK_XTAL_FREQ_S=24,this.XTAL_CLK_DIVIDER=1,this.UARTDEV_BUF_NO=1082520860,this.CHIP_DETECT_MAGIC_VALUE=[285294703],this.FLASH_FREQUENCY={"80m":15,"40m":0,"20m":2},this.MEMORY_MAP=[[0,65536,"PADDING"],[1115684864,1124073472,"DROM"],[1082130432,1082523648,"DRAM"],[1082130432,1082523648,"BYTE_ACCESSIBLE"],[1073979392,1074003968,"DROM_MASK"],[1073741824,1073979392,"IROM_MASK"],[1107296256,1115684864,"IROM"],[1082130432,1082523648,"IRAM"],[1342177280,1342193664,"RTC_IRAM"],[1342177280,1342193664,"RTC_DRAM"],[1611653120,1611661312,"MEM_INTERNAL2"]],this.UF2_FAMILY_ID=4145808195,this.EFUSE_MAX_KEY=5,this.KEY_PURPOSES={0:"USER/EMPTY",1:"ECDSA_KEY",2:"XTS_AES_256_KEY_1",3:"XTS_AES_256_KEY_2",4:"XTS_AES_128_KEY",5:"HMAC_DOWN_ALL",6:"HMAC_DOWN_JTAG",7:"HMAC_DOWN_DIGITAL_SIGNATURE",8:"HMAC_UP",9:"SECURE_BOOT_DIGEST0",10:"SECURE_BOOT_DIGEST1",11:"SECURE_BOOT_DIGEST2",12:"KM_INIT_KEY"}}async getPkgVersion(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+8)>>26&7}async getMinorChipVersion(e){return 15&await e.readReg(this.EFUSE_BLOCK1_ADDR+8)}async getMajorChipVersion(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+8)>>4&3}async getChipDescription(e){let t;return t=0===await this.getPkgVersion(e)?"ESP32-C5":"unknown ESP32-C5",`${t} (revision v${await this.getMajorChipVersion(e)}.${await this.getMinorChipVersion(e)})`}async getCrystalFreq(e){const t=await e.readReg(this.UART_CLKDIV_REG)&this.UART_CLKDIV_MASK,i=e.transport.baudrate*t/1e6/this.XTAL_CLK_DIVIDER;let s;return s=i>45?48:i>33?40:26,Math.abs(s-i)>1&&e.info("WARNING: Unsupported crystal in use"),s}async getCrystalFreqRomExpect(e){return(await e.readReg(this.PCR_SYSCLK_CONF_REG)&this.PCR_SYSCLK_XTAL_FREQ_V)>>this.PCR_SYSCLK_XTAL_FREQ_S}}}),sm=Object.freeze({__proto__:null,ESP32H2ROM:class extends pA{constructor(){super(...arguments),this.CHIP_NAME="ESP32-H2",this.IMAGE_CHIP_ID=16,this.EFUSE_BASE=1610647552,this.MAC_EFUSE_REG=this.EFUSE_BASE+68,this.UART_CLKDIV_REG=1072955412,this.UART_CLKDIV_MASK=1048575,this.UART_DATE_REG_ADDR=1610612860,this.FLASH_WRITE_SIZE=1024,this.BOOTLOADER_FLASH_OFFSET=0,this.FLASH_SIZES={"1MB":0,"2MB":16,"4MB":32,"8MB":48,"16MB":64},this.SPI_REG_BASE=1610620928,this.SPI_USR_OFFS=24,this.SPI_USR1_OFFS=28,this.SPI_USR2_OFFS=32,this.SPI_MOSI_DLEN_OFFS=36,this.SPI_MISO_DLEN_OFFS=40,this.SPI_W0_OFFS=88,this.USB_RAM_BLOCK=2048,this.UARTDEV_BUF_NO_USB=3,this.UARTDEV_BUF_NO=1070526796}async getChipDescription(e){return this.CHIP_NAME}async getChipFeatures(e){return["BLE","IEEE802.15.4"]}async getCrystalFreq(e){return 32}_d2h(e){const t=(+e).toString(16);return 1===t.length?"0"+t:t}async postConnect(e){const t=255&await e.readReg(this.UARTDEV_BUF_NO);e.debug("In _post_connect "+t),t==this.UARTDEV_BUF_NO_USB&&(e.ESP_RAM_BLOCK=this.USB_RAM_BLOCK)}async readMac(e){let t=await e.readReg(this.MAC_EFUSE_REG);t>>>=0;let i=await e.readReg(this.MAC_EFUSE_REG+4);i=i>>>0&65535;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}getEraseSize(e,t){return t}}}),am=Object.freeze({__proto__:null,ESP32S3ROM:class extends pA{constructor(){super(...arguments),this.CHIP_NAME="ESP32-S3",this.IMAGE_CHIP_ID=9,this.EFUSE_BASE=1610641408,this.MAC_EFUSE_REG=this.EFUSE_BASE+68,this.EFUSE_BLOCK1_ADDR=this.EFUSE_BASE+68,this.EFUSE_BLOCK2_ADDR=this.EFUSE_BASE+92,this.UART_CLKDIV_REG=1610612756,this.UART_CLKDIV_MASK=1048575,this.UART_DATE_REG_ADDR=1610612864,this.FLASH_WRITE_SIZE=1024,this.BOOTLOADER_FLASH_OFFSET=0,this.FLASH_SIZES={"1MB":0,"2MB":16,"4MB":32,"8MB":48,"16MB":64},this.SPI_REG_BASE=1610620928,this.SPI_USR_OFFS=24,this.SPI_USR1_OFFS=28,this.SPI_USR2_OFFS=32,this.SPI_MOSI_DLEN_OFFS=36,this.SPI_MISO_DLEN_OFFS=40,this.SPI_W0_OFFS=88,this.USB_RAM_BLOCK=2048,this.UARTDEV_BUF_NO_USB=3,this.UARTDEV_BUF_NO=1070526796}async getChipDescription(e){const t=await this.getMajorChipVersion(e),i=await this.getMinorChipVersion(e);return`${{0:"ESP32-S3 (QFN56)",1:"ESP32-S3-PICO-1 (LGA56)"}[await this.getPkgVersion(e)]||"unknown ESP32-S3"} (revision v${t}.${i})`}async getPkgVersion(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+12)>>21&7}async getRawMinorChipVersion(e){return((await e.readReg(this.EFUSE_BLOCK1_ADDR+20)>>23&1)<<3)+(await e.readReg(this.EFUSE_BLOCK1_ADDR+12)>>18&7)}async getMinorChipVersion(e){const t=await this.getRawMinorChipVersion(e);return await this.isEco0(e,t)?0:this.getRawMinorChipVersion(e)}async getRawMajorChipVersion(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+20)>>24&3}async getMajorChipVersion(e){const t=await this.getRawMinorChipVersion(e);return await this.isEco0(e,t)?0:this.getRawMajorChipVersion(e)}async getBlkVersionMajor(e){return 3&await e.readReg(this.EFUSE_BLOCK2_ADDR+16)}async getBlkVersionMinor(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+12)>>24&7}async isEco0(e,t){return!(7&t)&&1===await this.getBlkVersionMajor(e)&&1===await this.getBlkVersionMinor(e)}async getFlashCap(e){const t=this.EFUSE_BASE+68+12;return await e.readReg(t)>>27&7}async getFlashVendor(e){const t=this.EFUSE_BASE+68+16;return{1:"XMC",2:"GD",3:"FM",4:"TT",5:"BY"}[7&await e.readReg(t)]||""}async getPsramCap(e){const t=this.EFUSE_BASE+68+16;return await e.readReg(t)>>3&3}async getPsramVendor(e){const t=this.EFUSE_BASE+68+16;return{1:"AP_3v3",2:"AP_1v8"}[await e.readReg(t)>>7&3]||""}async getChipFeatures(e){const t=["Wi-Fi","BLE"],i=await this.getFlashCap(e),s=await this.getFlashVendor(e),a={0:null,1:"Embedded Flash 8MB",2:"Embedded Flash 4MB"}[i],r=void 0!==a?a:"Unknown Embedded Flash";null!==a&&t.push(`${r} (${s})`);const n=await this.getPsramCap(e),o=await this.getPsramVendor(e),l={0:null,1:"Embedded PSRAM 8MB",2:"Embedded PSRAM 2MB"}[n],c=void 0!==l?l:"Unknown Embedded PSRAM";return null!==l&&t.push(`${c} (${o})`),t}async getCrystalFreq(e){return 40}_d2h(e){const t=(+e).toString(16);return 1===t.length?"0"+t:t}async postConnect(e){const t=255&await e.readReg(this.UARTDEV_BUF_NO);e.debug("In _post_connect "+t),t==this.UARTDEV_BUF_NO_USB&&(e.ESP_RAM_BLOCK=this.USB_RAM_BLOCK)}async readMac(e){let t=await e.readReg(this.MAC_EFUSE_REG);t>>>=0;let i=await e.readReg(this.MAC_EFUSE_REG+4);i=i>>>0&65535;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}getEraseSize(e,t){return t}}}),rm=Object.freeze({__proto__:null,ESP32S2ROM:class extends pA{constructor(){super(...arguments),this.CHIP_NAME="ESP32-S2",this.IMAGE_CHIP_ID=2,this.IROM_MAP_START=1074266112,this.IROM_MAP_END=1085800448,this.DROM_MAP_START=1056964608,this.DROM_MAP_END=1061093376,this.CHIP_DETECT_MAGIC_VALUE=[1990],this.SPI_REG_BASE=1061167104,this.SPI_USR_OFFS=24,this.SPI_USR1_OFFS=28,this.SPI_USR2_OFFS=32,this.SPI_MOSI_DLEN_OFFS=36,this.SPI_MISO_DLEN_OFFS=40,this.SPI_W0_OFFS=88,this.SPI_ADDR_REG_MSB=!1,this.MAC_EFUSE_REG=1061265476,this.UART_CLKDIV_REG=1061158932,this.SUPPORTS_ENCRYPTED_FLASH=!0,this.FLASH_ENCRYPTED_WRITE_ALIGN=16,this.EFUSE_BASE=1061265408,this.EFUSE_RD_REG_BASE=this.EFUSE_BASE+48,this.EFUSE_BLOCK1_ADDR=this.EFUSE_BASE+68,this.EFUSE_BLOCK2_ADDR=this.EFUSE_BASE+92,this.EFUSE_PURPOSE_KEY0_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY0_SHIFT=24,this.EFUSE_PURPOSE_KEY1_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY1_SHIFT=28,this.EFUSE_PURPOSE_KEY2_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY2_SHIFT=0,this.EFUSE_PURPOSE_KEY3_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY3_SHIFT=4,this.EFUSE_PURPOSE_KEY4_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY4_SHIFT=8,this.EFUSE_PURPOSE_KEY5_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY5_SHIFT=12,this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG=this.EFUSE_RD_REG_BASE,this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT=1<<19,this.EFUSE_SPI_BOOT_CRYPT_CNT_REG=this.EFUSE_BASE+52,this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK=7<<18,this.EFUSE_SECURE_BOOT_EN_REG=this.EFUSE_BASE+56,this.EFUSE_SECURE_BOOT_EN_MASK=1<<20,this.EFUSE_RD_REPEAT_DATA3_REG=this.EFUSE_BASE+60,this.EFUSE_RD_REPEAT_DATA3_REG_FLASH_TYPE_MASK=512,this.PURPOSE_VAL_XTS_AES256_KEY_1=2,this.PURPOSE_VAL_XTS_AES256_KEY_2=3,this.PURPOSE_VAL_XTS_AES128_KEY=4,this.UARTDEV_BUF_NO=1073741076,this.UARTDEV_BUF_NO_USB_OTG=2,this.USB_RAM_BLOCK=2048,this.GPIO_STRAP_REG=1061175352,this.GPIO_STRAP_SPI_BOOT_MASK=8,this.GPIO_STRAP_VDDSPI_MASK=16,this.RTC_CNTL_OPTION1_REG=1061191976,this.RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK=1,this.RTCCNTL_BASE_REG=1061191680,this.RTC_CNTL_WDTCONFIG0_REG=this.RTCCNTL_BASE_REG+148,this.RTC_CNTL_WDTCONFIG1_REG=this.RTCCNTL_BASE_REG+152,this.RTC_CNTL_WDTWPROTECT_REG=this.RTCCNTL_BASE_REG+172,this.RTC_CNTL_WDT_WKEY=1356348065,this.MEMORY_MAP=[[0,65536,"PADDING"],[1056964608,1073217536,"DROM"],[1062207488,1073217536,"EXTRAM_DATA"],[1073340416,1073348608,"RTC_DRAM"],[1073340416,1073741824,"BYTE_ACCESSIBLE"],[1073340416,1074208768,"MEM_INTERNAL"],[1073414144,1073741824,"DRAM"],[1073741824,1073848576,"IROM_MASK"],[1073872896,1074200576,"IRAM"],[1074200576,1074208768,"RTC_IRAM"],[1074266112,1082130432,"IROM"],[1342177280,1342185472,"RTC_DATA"]],this.EFUSE_VDD_SPI_REG=this.EFUSE_BASE+52,this.VDD_SPI_XPD=16,this.VDD_SPI_TIEH=32,this.VDD_SPI_FORCE=64,this.UF2_FAMILY_ID=3218951918,this.EFUSE_MAX_KEY=5,this.KEY_PURPOSES={0:"USER/EMPTY",1:"RESERVED",2:"XTS_AES_256_KEY_1",3:"XTS_AES_256_KEY_2",4:"XTS_AES_128_KEY",5:"HMAC_DOWN_ALL",6:"HMAC_DOWN_JTAG",7:"HMAC_DOWN_DIGITAL_SIGNATURE",8:"HMAC_UP",9:"SECURE_BOOT_DIGEST0",10:"SECURE_BOOT_DIGEST1",11:"SECURE_BOOT_DIGEST2"},this.UART_CLKDIV_MASK=1048575,this.UART_DATE_REG_ADDR=1610612856,this.FLASH_WRITE_SIZE=1024,this.BOOTLOADER_FLASH_OFFSET=4096,this.FLASH_SIZES={"1MB":0,"2MB":16,"4MB":32,"8MB":48,"16MB":64}}async getPkgVersion(e){const t=this.EFUSE_BLOCK1_ADDR+16;return 15&await e.readReg(t)}async getMinorChipVersion(e){return((await e.readReg(this.EFUSE_BLOCK1_ADDR+12)>>20&1)<<3)+(await e.readReg(this.EFUSE_BLOCK1_ADDR+16)>>4&7)}async getMajorChipVersion(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+12)>>18&3}async getFlashVersion(e){return await e.readReg(this.EFUSE_BLOCK1_ADDR+12)>>21&15}async getChipDescription(e){const t=await this.getFlashCap(e)+100*await this.getPsramCap(e),i=await this.getMajorChipVersion(e),s=await this.getMinorChipVersion(e);return`${{0:"ESP32-S2",1:"ESP32-S2FH2",2:"ESP32-S2FH4",102:"ESP32-S2FNR2",100:"ESP32-S2R2"}[t]||"unknown ESP32-S2"} (revision v${i}.${s})`}async getFlashCap(e){return await this.getFlashVersion(e)}async getPsramVersion(e){const t=this.EFUSE_BLOCK1_ADDR+12;return await e.readReg(t)>>28&15}async getPsramCap(e){return await this.getPsramVersion(e)}async getBlock2Version(e){const t=this.EFUSE_BLOCK2_ADDR+16;return await e.readReg(t)>>4&7}async getChipFeatures(e){const t=["Wi-Fi"],i={0:"No Embedded Flash",1:"Embedded Flash 2MB",2:"Embedded Flash 4MB"}[await this.getFlashCap(e)]||"Unknown Embedded Flash";t.push(i);const s={0:"No Embedded Flash",1:"Embedded PSRAM 2MB",2:"Embedded PSRAM 4MB"}[await this.getPsramCap(e)]||"Unknown Embedded PSRAM";t.push(s);const a={0:"No calibration in BLK2 of efuse",1:"ADC and temperature sensor calibration in BLK2 of efuse V1",2:"ADC and temperature sensor calibration in BLK2 of efuse V2"}[await this.getBlock2Version(e)]||"Unknown Calibration in BLK2";return t.push(a),t}async getCrystalFreq(e){return 40}_d2h(e){const t=(+e).toString(16);return 1===t.length?"0"+t:t}async readMac(e){let t=await e.readReg(this.MAC_EFUSE_REG);t>>>=0;let i=await e.readReg(this.MAC_EFUSE_REG+4);i=i>>>0&65535;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}getEraseSize(e,t){return t}async usingUsbOtg(e){return(255&await e.readReg(this.UARTDEV_BUF_NO))===this.UARTDEV_BUF_NO_USB_OTG}async postConnect(e){const t=await this.usingUsbOtg(e);e.debug("In _post_connect using USB OTG ?"+t),t&&(e.ESP_RAM_BLOCK=this.USB_RAM_BLOCK)}}}),nm=Object.freeze({__proto__:null,ESP8266ROM:class extends pA{constructor(){super(...arguments),this.CHIP_NAME="ESP8266",this.CHIP_DETECT_MAGIC_VALUE=[4293968129],this.EFUSE_RD_REG_BASE=1072693328,this.UART_CLKDIV_REG=1610612756,this.UART_CLKDIV_MASK=1048575,this.XTAL_CLK_DIVIDER=2,this.FLASH_WRITE_SIZE=16384,this.BOOTLOADER_FLASH_OFFSET=0,this.UART_DATE_REG_ADDR=0,this.FLASH_SIZES={"512KB":0,"256KB":16,"1MB":32,"2MB":48,"4MB":64,"2MB-c1":80,"4MB-c1":96,"8MB":128,"16MB":144},this.SPI_REG_BASE=1610613248,this.SPI_USR_OFFS=28,this.SPI_USR1_OFFS=32,this.SPI_USR2_OFFS=36,this.SPI_MOSI_DLEN_OFFS=0,this.SPI_MISO_DLEN_OFFS=0,this.SPI_W0_OFFS=64,this.getChipFeatures=async e=>{const t=["WiFi"];return"ESP8285"==await this.getChipDescription(e)&&t.push("Embedded Flash"),t}}async readEfuse(e,t){const i=this.EFUSE_RD_REG_BASE+4*t;return e.debug("Read efuse "+i),await e.readReg(i)}async getChipDescription(e){const t=await this.readEfuse(e,2);return 16&await this.readEfuse(e,0)|65536&t?"ESP8285":"ESP8266EX"}async getCrystalFreq(e){const t=await e.readReg(this.UART_CLKDIV_REG)&this.UART_CLKDIV_MASK,i=e.transport.baudrate*t/1e6/this.XTAL_CLK_DIVIDER;let s;return s=i>33?40:26,Math.abs(s-i)>1&&e.info("WARNING: Detected crystal freq "+i+"MHz is quite different to normalized freq "+s+"MHz. Unsupported crystal in use?"),s}_d2h(e){const t=(+e).toString(16);return 1===t.length?"0"+t:t}async readMac(e){let t=await this.readEfuse(e,0);t>>>=0;let i=await this.readEfuse(e,1);i>>>=0;let s=await this.readEfuse(e,3);s>>>=0;const a=new Uint8Array(6);return 0!=s?(a[0]=s>>16&255,a[1]=s>>8&255,a[2]=255&s):i>>16&255?1==(i>>16&255)?(a[0]=172,a[1]=208,a[2]=116):e.error("Unknown OUI"):(a[0]=24,a[1]=254,a[2]=52),a[3]=i>>8&255,a[4]=255&i,a[5]=t>>24&255,this._d2h(a[0])+":"+this._d2h(a[1])+":"+this._d2h(a[2])+":"+this._d2h(a[3])+":"+this._d2h(a[4])+":"+this._d2h(a[5])}getEraseSize(e,t){return t}}}),om=Object.freeze({__proto__:null,ESP32P4ROM:class extends Wf{constructor(){super(...arguments),this.CHIP_NAME="ESP32-P4",this.IMAGE_CHIP_ID=18,this.IROM_MAP_START=1073741824,this.IROM_MAP_END=1275068416,this.DROM_MAP_START=1073741824,this.DROM_MAP_END=1275068416,this.BOOTLOADER_FLASH_OFFSET=8192,this.CHIP_DETECT_MAGIC_VALUE=[0,182303440],this.UART_DATE_REG_ADDR=1343004812,this.EFUSE_BASE=1343410176,this.EFUSE_BLOCK1_ADDR=this.EFUSE_BASE+68,this.MAC_EFUSE_REG=this.EFUSE_BASE+68,this.SPI_REG_BASE=1342754816,this.SPI_USR_OFFS=24,this.SPI_USR1_OFFS=28,this.SPI_USR2_OFFS=32,this.SPI_MOSI_DLEN_OFFS=36,this.SPI_MISO_DLEN_OFFS=40,this.SPI_W0_OFFS=88,this.EFUSE_RD_REG_BASE=this.EFUSE_BASE+48,this.EFUSE_PURPOSE_KEY0_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY0_SHIFT=24,this.EFUSE_PURPOSE_KEY1_REG=this.EFUSE_BASE+52,this.EFUSE_PURPOSE_KEY1_SHIFT=28,this.EFUSE_PURPOSE_KEY2_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY2_SHIFT=0,this.EFUSE_PURPOSE_KEY3_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY3_SHIFT=4,this.EFUSE_PURPOSE_KEY4_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY4_SHIFT=8,this.EFUSE_PURPOSE_KEY5_REG=this.EFUSE_BASE+56,this.EFUSE_PURPOSE_KEY5_SHIFT=12,this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG=this.EFUSE_RD_REG_BASE,this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT=1<<20,this.EFUSE_SPI_BOOT_CRYPT_CNT_REG=this.EFUSE_BASE+52,this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK=7<<18,this.EFUSE_SECURE_BOOT_EN_REG=this.EFUSE_BASE+56,this.EFUSE_SECURE_BOOT_EN_MASK=1<<20,this.PURPOSE_VAL_XTS_AES256_KEY_1=2,this.PURPOSE_VAL_XTS_AES256_KEY_2=3,this.PURPOSE_VAL_XTS_AES128_KEY=4,this.SUPPORTS_ENCRYPTED_FLASH=!0,this.FLASH_ENCRYPTED_WRITE_ALIGN=16,this.MEMORY_MAP=[[0,65536,"PADDING"],[1073741824,1275068416,"DROM"],[1341128704,1341784064,"DRAM"],[1341128704,1341784064,"BYTE_ACCESSIBLE"],[1337982976,1338114048,"DROM_MASK"],[1337982976,1338114048,"IROM_MASK"],[1073741824,1275068416,"IROM"],[1341128704,1341784064,"IRAM"],[1343258624,1343291392,"RTC_IRAM"],[1343258624,1343291392,"RTC_DRAM"],[1611653120,1611661312,"MEM_INTERNAL2"]],this.UF2_FAMILY_ID=1026592404,this.EFUSE_MAX_KEY=5,this.KEY_PURPOSES={0:"USER/EMPTY",1:"ECDSA_KEY",2:"XTS_AES_256_KEY_1",3:"XTS_AES_256_KEY_2",4:"XTS_AES_128_KEY",5:"HMAC_DOWN_ALL",6:"HMAC_DOWN_JTAG",7:"HMAC_DOWN_DIGITAL_SIGNATURE",8:"HMAC_UP",9:"SECURE_BOOT_DIGEST0",10:"SECURE_BOOT_DIGEST1",11:"SECURE_BOOT_DIGEST2",12:"KM_INIT_KEY"}}async getPkgVersion(e){const t=this.EFUSE_BLOCK1_ADDR+8;return await e.readReg(t)>>27&7}async getMinorChipVersion(e){const t=this.EFUSE_BLOCK1_ADDR+8;return 15&await e.readReg(t)}async getMajorChipVersion(e){const t=this.EFUSE_BLOCK1_ADDR+8;return await e.readReg(t)>>4&3}async getChipDescription(e){return`${0===await this.getPkgVersion(e)?"ESP32-P4":"unknown ESP32-P4"} (revision v${await this.getMajorChipVersion(e)}.${await this.getMinorChipVersion(e)})`}async getChipFeatures(e){return["High-Performance MCU"]}async getCrystalFreq(e){return 40}async getFlashVoltage(e){}async overrideVddsdio(e){e.debug("VDD_SDIO overrides are not supported for ESP32-P4")}async readMac(e){let t=await e.readReg(this.MAC_EFUSE_REG);t>>>=0;let i=await e.readReg(this.MAC_EFUSE_REG+4);i=i>>>0&65535;const s=new Uint8Array(6);return s[0]=i>>8&255,s[1]=255&i,s[2]=t>>24&255,s[3]=t>>16&255,s[4]=t>>8&255,s[5]=255&t,this._d2h(s[0])+":"+this._d2h(s[1])+":"+this._d2h(s[2])+":"+this._d2h(s[3])+":"+this._d2h(s[4])+":"+this._d2h(s[5])}async getFlashCryptConfig(e){}async getSecureBootEnabled(e){return await e.readReg(this.EFUSE_SECURE_BOOT_EN_REG)&this.EFUSE_SECURE_BOOT_EN_MASK}async getKeyBlockPurpose(e,t){if(t<0||t>this.EFUSE_MAX_KEY)return void e.debug(`Valid key block numbers must be in range 0-${this.EFUSE_MAX_KEY}`);const i=[[this.EFUSE_PURPOSE_KEY0_REG,this.EFUSE_PURPOSE_KEY0_SHIFT],[this.EFUSE_PURPOSE_KEY1_REG,this.EFUSE_PURPOSE_KEY1_SHIFT],[this.EFUSE_PURPOSE_KEY2_REG,this.EFUSE_PURPOSE_KEY2_SHIFT],[this.EFUSE_PURPOSE_KEY3_REG,this.EFUSE_PURPOSE_KEY3_SHIFT],[this.EFUSE_PURPOSE_KEY4_REG,this.EFUSE_PURPOSE_KEY4_SHIFT],[this.EFUSE_PURPOSE_KEY5_REG,this.EFUSE_PURPOSE_KEY5_SHIFT]],[s,a]=i[t];return await e.readReg(s)>>a&15}async isFlashEncryptionKeyValid(e){const t=[];for(let i=0;i<=this.EFUSE_MAX_KEY;i++){const s=await this.getKeyBlockPurpose(e,i);t.push(s)}if(void 0!==typeof t.find(e=>e===this.PURPOSE_VAL_XTS_AES128_KEY))return!0;const i=t.find(e=>e===this.PURPOSE_VAL_XTS_AES256_KEY_1),s=t.find(e=>e===this.PURPOSE_VAL_XTS_AES256_KEY_2);return void 0!==typeof i&&void 0!==typeof s}}});function lm(){const e=navigator.serial;if(!e)throw new Error("Web Serial não está disponível neste browser. Usa Chrome/Edge por HTTPS.");return e}function cm(){return Boolean(navigator.serial)}function dm(e,t,i){var s;null===(s=e.onProgress)||void 0===s||s.call(e,Math.max(0,Math.min(100,t)),i)}function hm(e,t){var i;null===(i=e.onLog)||void 0===i||i.call(e,t)}async function pm(){const e=await fetch("https://api.github.com/repos/fabiocguerreiro/HiveFW/releases/latest",{headers:{Accept:"application/vnd.github+json"},cache:"no-store"});if(!e.ok)throw new Error(`Não foi possível consultar a última release HiveFW (HTTP ${e.status}).`);return e.json()}async function um(e){const t=await fetch(e.browser_download_url,{cache:"no-store"});if(!t.ok)throw new Error(`Falha ao descarregar ${e.name} (HTTP ${t.status}).`);return t.blob()}async function gm(e){const t=new Uint8Array(await e.arrayBuffer());let i="";for(let e=0;e<t.length;e+=32768)i+=String.fromCharCode(...t.subarray(e,e+32768));return i}async function Am(e,t,i,s,a){const r=await lm().requestPort({}),n=new Jh(r,!1);await n.dfuUpdate(t,t=>dm(e,i+t/100*s,a),6e4)}async function fm(e){if(!cm())throw new Error("Web Serial indisponível. Usa Chrome/Edge num contexto HTTPS.");let t,i,s=null;if("latest"===e.source){const a=await async function(e){dm(e,2,"A consultar a última release…");const t=await pm(),i=function(e,t,i,s){const a=e.assets||[];if("heltec-t114"===t){if("ble"!==i)throw new Error("O Heltec T114 não possui variante Wi-Fi. Seleciona BLE.");const e=a.find(e=>/^Heltec_t114_companion_radio_ble-.*\.zip$/i.test(e.name));if(!e)throw new Error("A última release não contém o ZIP DFU do Heltec T114 BLE.");return e}const r="wifi"===i?"Heltec_v3_companion_radio_wifi-":"Heltec_v3_companion_radio_ble-",n=a.filter(e=>e.name.startsWith(r)&&e.name.toLowerCase().endsWith(".bin")),o=s?n.find(e=>e.name.toLowerCase().endsWith("-merged.bin")):n.find(e=>!e.name.toLowerCase().endsWith("-merged.bin"));if(!o)throw new Error(s?`A última release não contém a imagem merged para ${i.toUpperCase()} do Heltec V3.`:`A última release não contém a imagem de aplicação para ${i.toUpperCase()} do Heltec V3.`);return o}(t,e.hardware,e.variant,e.erase);return hm(e,`Release: ${t.tag_name} · ${i.name}`),dm(e,6,"A descarregar firmware…"),{blob:await um(i),name:i.name,release:t}}(e);t=a.blob,i=a.name,s=a.release}else{const s=function(e){const t=e.file;if(!t)throw new Error("Seleciona primeiro um ficheiro de firmware.");const i=t.name.toLowerCase();if("heltec-v3"===e.hardware){if(!i.endsWith(".bin"))throw new Error("Para o Heltec V3 seleciona um ficheiro .bin.");if(e.erase&&!i.endsWith("-merged.bin"))throw new Error("Com “Apagar flash” ativo, o V3 necessita de um *-merged.bin que inclua bootloader, partições e aplicação.")}else{if("ble"!==e.variant)throw new Error("O Heltec T114 não possui variante Wi-Fi. Seleciona BLE.");if(!i.endsWith(".zip"))throw new Error("Para o Heltec T114 seleciona o ZIP DFU (.zip).")}return t}(e);t=s,i=s.name}return"heltec-v3"===e.hardware?await async function(e,t,i){const s=lm(),a=await s.requestPort({});let r=null;const n=i.toLowerCase().endsWith("-merged.bin");if(e.erase&&!n)throw new Error("O apagamento total do V3 exige uma imagem merged.");try{dm(e,10,"A ligar ao Heltec V3…"),r=new iA(a,!0);const i={terminal:{clean:()=>{},write:t=>hm(e,String(t)),writeLine:t=>hm(e,String(t))},transport:r,compress:!0,eraseAll:e.erase,flashSize:"keep",flashMode:"keep",flashFreq:"keep",baudrate:115200,romBaudrate:115200,enableTracing:!1,fileArray:[{data:await gm(t),address:n?0:65536}],reportProgress:async(t,i,s)=>{dm(e,15+.82*(s>0?i/s*100:0),e.erase?"A apagar e instalar no V3…":"A instalar no V3…")}},s=new hA(i);s.hr=new nA(r),await s.main(),await s.flashId(),await s.writeFlash(i),dm(e,98,"A reiniciar o Heltec V3…"),await s.after("hard_reset"),await new Promise(e=>window.setTimeout(e,120)),await async function(e){try{await e.setRTS(!0),await new Promise(e=>window.setTimeout(e,100)),await e.setRTS(!1)}catch(e){}}(r)}finally{if(r)try{await r.disconnect()}catch(e){}}}(e,t,i):await async function(e,t,i){if(e.erase){i||(i=await pm()),dm(e,8,"A preparar apagamento do T114…");const t=await async function(e){const t=(e.assets||[]).find(e=>"FLASH_ERASE_nrf52_softdevice_v6.zip"===e.name);if(!t)throw new Error("A release não contém o formatter de flash do T114. Atualiza para uma release HiveFW que inclua o asset de erase.");return um(t)}(i);hm(e,"T114 erase: seleciona a porta DFU para executar o formatter."),await Am(e,t,10,32,"A apagar dados do T114…"),dm(e,44,"Formatter concluído. Volta a colocar o T114 em DFU e seleciona a porta."),hm(e,"Formatter concluído. O T114 reinicia; entra novamente em DFU para instalar a firmware.")}await Am(e,t,e.erase?48:10,e.erase?50:88,"A instalar firmware no T114…")}(e,t,s),dm(e,100,"Instalação concluída."),{source:e.source,filename:i,...s?{release:s.tag_name}:{}}}const mm=[{step:"generating",label:"Generating new key"},{step:"importing",label:"Sending key to device"},{step:"rebooting",label:"Rebooting device"},{step:"reconnecting",label:"Waiting for device reconnect"},{step:"reloading",label:"Reloading HiveFW integration"},{step:"verifying",label:"Verifying new identity"}];let _m=class extends mo{constructor(){super(),this.narrow=!1,this.contactCount=0,this.channelCount=0,this._deviceConfig=null,this._repeaterStatus=null,this._managedDevices={repeaters:[],clients:[]},this._scopeDraft="",this._scopeGlobal=!1,this._scopeSaving=!1,this._regionTarget="",this._regionText="",this._regionBusy=!1,this._localRegions=null,this._localRegionBusy=!1,this._localRegionAction="put",this._localRegionName="",this._localRegionParent="",this._regionAction="allowf",this._regionName="",this._loading=!0,this._error=null,this._editValues={},this._saving=!1,this._firmwareOtaStatus=null,this._firmwareFile=null,this._firmwareBusy=!1,this._firmwareChecking=!1,this._firmwareUploadStage=null,this._usbFlashHardware="heltec-v3",this._usbFlashVariant="wifi",this._usbFlashSource="latest",this._usbFlashErase=!1,this._usbFlashFile=null,this._usbFlashBusy=!1,this._usbFlashProgress=0,this._usbFlashStage="",this._usbFlashLog="",this._dutyCycleValue=10,this._dutyCycleBusy=null,this._adminPasswordDraft="",this._guestPasswordDraft="",this._repeaterAccessBusy=null,this._repeaterReadBusy=!1,this._repeaterQuickBusy=null,this._aclNewPublicKey="",this._aclNewPermissions=1,this._backupBusy=null,this._confirmAction=null,this._confirmDialogOpen=!1,this._locationSource="manual",this._importKeyValue="",this._identityFlowState={kind:"closed"},this._identityFlowUnsubscribe=null,this._settingsWriteQueue=Promise.resolve(),this._renameSuccess=null,this._statusMessage=null,this._statusMessageTimeout=null,this._enterT114Dfu=async()=>{if(!this._usbFlashBusy){this._usbFlashBusy=!0,this._usbFlashStage="A colocar o T114 em DFU…",this._usbFlashProgress=0,this._usbFlashLog="";try{await async function(){const e=await lm().requestPort({});await Jh.forceDfuMode(e)}(),this._usbFlashStage="DFU solicitado. Aguarda a porta USB reaparecer.",this._appendUsbFlashLog("DFU: touch 1200 baud enviado."),this._showStatusMessage("T114 colocado em modo DFU.","success")}catch(e){this._usbFlashStage="Falha ao entrar em DFU.",this._appendUsbFlashLog(String(e)),this._showStatusMessage(`Falha ao entrar em DFU: ${String(e)}`,"error")}finally{this._usbFlashBusy=!1}}},this._startUsbFlash=async()=>{if(!this._usbFlashBusy){if(this._usbFlashErase&&!window.confirm("Apagar flash antes de instalar remove configurações, identidade e outros dados guardados no equipamento. Continuar?"))return;this._usbFlashBusy=!0,this._usbFlashProgress=0,this._usbFlashStage="A preparar flasher USB…",this._usbFlashLog="";try{const e=await fm({hardware:this._usbFlashHardware,variant:this._usbFlashVariant,source:this._usbFlashSource,erase:this._usbFlashErase,file:this._usbFlashFile,onProgress:(e,t)=>{this._usbFlashProgress=e,this._usbFlashStage=t},onLog:e=>this._appendUsbFlashLog(e)});this._usbFlashProgress=100,this._usbFlashStage="Instalação USB concluída.",this._appendUsbFlashLog(`Concluído: ${e.filename}${e.release?` · ${e.release}`:""}`),this._showStatusMessage("Firmware instalado por USB com sucesso.","success")}catch(e){const t=e instanceof Error?e.message:String(e);this._usbFlashStage="Falha no flash USB.",this._appendUsbFlashLog(t),this._showStatusMessage(`Flash USB falhou: ${t}`,"error")}finally{this._usbFlashBusy=!1}}},this._readDutyCycle=async()=>{if(this.hass&&!this._dutyCycleBusy){this._dutyCycleBusy="read";try{var e;const t=await async function(e,t){const i={type:"hivefw_integration/get_duty_cycle"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),i=Number(t.duty_cycle);if(!Number.isFinite(i))throw new Error("Valor de Duty Cycle inválido.");this._dutyCycleValue=Math.max(10,Math.min(50,Math.round(i))),this.requestUpdate(),this._showStatusMessage(`Duty Cycle lido do Companion: ${this._dutyCycleValue}%`,"success")}catch(e){const t=e,i=null!=t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e);this._showStatusMessage(`Duty Cycle: ${i}`,"error")}finally{this._dutyCycleBusy=null}}},nl(this,{isOpen:()=>"closed"!==this._identityFlowState.kind,onEscape:()=>{"success"!==this._identityFlowState.kind&&"failure"!==this._identityFlowState.kind||this._closeIdentityFlowModal()},getScope:()=>{var e;return null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector('[data-a11y="identity-flow"]')}}),nl(this,{isOpen:()=>null!==this._renameSuccess,onEscape:()=>this._closeRenameSuccessModal(),getScope:()=>{var e;return null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector('[data-a11y="rename-success"]')}})}connectedCallback(){super.connectedCallback(),this._loadDeviceConfig()}disconnectedCallback(){super.disconnectedCallback(),null!==this._statusMessageTimeout&&(clearTimeout(this._statusMessageTimeout),this._statusMessageTimeout=null)}updated(e){e.has("config")&&this._loadDeviceConfig()}async _loadDeviceConfig(){if(this.hass){this._loading=!0,this._error=null;try{var e,t,i,s,a;if(this._deviceConfig=await Fo(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),await this._readRepeaterStatus(!1,!1),this._deviceConfig&&null!==(t=this._repeaterStatus)&&void 0!==t&&t.radio){var r,n,o,l,c,d,h;const e=this._repeaterStatus.radio;this._deviceConfig={...this._deviceConfig,frequency:null!==(r=e.frequency)&&void 0!==r?r:this._deviceConfig.frequency,bandwidth:null!==(n=e.bandwidth)&&void 0!==n?n:this._deviceConfig.bandwidth,spreading_factor:null!==(o=e.spreading_factor)&&void 0!==o?o:this._deviceConfig.spreading_factor,coding_rate:null!==(l=e.coding_rate)&&void 0!==l?l:this._deviceConfig.coding_rate,tx_power:null!==(c=e.tx_power)&&void 0!==c?c:this._deviceConfig.tx_power,path_hash_mode:null!==(d=null===(h=this._repeaterStatus.device_info)||void 0===h?void 0:h.path_hash_mode)&&void 0!==d?d:this._deviceConfig.path_hash_mode}}try{var p;this._localRegions=await Oo(this.hass,null===(p=this.config)||void 0===p?void 0:p.entry_id)}catch(e){this._localRegions=null}try{var u;this._firmwareOtaStatus=await zo(this.hass,null===(u=this.config)||void 0===u?void 0:u.entry_id)}catch(e){this._firmwareOtaStatus=null}this._managedDevices=await async function(e,t){try{const i={type:"hivefw_integration/get_managed_devices"};t&&(i.entry_id=t);const s=await e.callWS(i);return{repeaters:s.repeaters||[],clients:s.clients||[]}}catch(e){return{repeaters:[],clients:[]}}}(this.hass,null===(i=this.config)||void 0===i?void 0:i.entry_id);const g=await Qo(this.hass,null===(s=this.config)||void 0===s?void 0:s.entry_id);this._scopeDraft=g.scopes.join(", "),this._scopeGlobal=g.global,!this._regionTarget&&this._managedDevices.repeaters.length&&(this._regionTarget=this._managedDevices.repeaters[0].pubkey_prefix),null!==(a=this._deviceConfig)&&void 0!==a&&a.location_source&&(this._locationSource=this._deviceConfig.location_source)}catch(e){this._error=`Failed to load device configuration: ${String(e)}`}finally{this._loading=!1}}}render(){var e,t,i,s;return this._loading?Zn(qs||(qs=on`
        <div class="settings-page">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--secondary-text-color);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="loading-spinner"></div>
              <span>Loading settings...</span>
            </div>
          </div>
        </div>
      `)):this._error?Zn(Vs||(Vs=on`
        <div class="settings-page">
          <div style="padding: 16px; color: var(--error-color); font-size: 14px;">
            ${0}
          </div>
        </div>
      `),this._error):this._deviceConfig?Zn(Xs||(Xs=on`
      <div class="settings-page">
        <div class="settings-container" data-hive-native-layout="device-v2">
          <!-- Definições owns all configuration/maintenance cards. -->
          <!-- Full-width Repeater setup. -->
          ${0}

          <!-- Firmware manager is the third full-width card. -->
          ${0}

          ${0}

          <!-- Two-column grid for the remaining device settings cards -->
          <div class="settings-grid">
            <!-- Device identity belongs to Definições, not Estado. -->
            <div class="device-section">
              <div class="card-title">Identidade</div>
              ${0}
            </div>

            <!-- Local observability/RX hosts are part of the native layout so
                 HiveFW can populate them without inserting cards after first paint. -->
            <div id="hive-rxlog-card" class="device-section" data-hive-native-host="rx-log">
              <div class="card-title">RX Log</div>
            </div>

            <div id="hive-observability-settings-card" class="device-section" data-hive-native-host="observability">
              <div class="card-title">Alertas &amp; automações</div>
            </div>

            <!-- Console belongs to Definições as a normal grid card. -->
            <div id="hive-console-settings-card"
                 class="device-section"
                 data-hive-native-host="console">
              <div class="card-title">Consola</div>
              <div style="font-size:12px;line-height:1.45;color:var(--secondary-text-color);margin-bottom:14px;">
                Executa comandos diretamente no rádio ligado ao Home Assistant. Os comandos locais não geram tráfego LoRa, exceto quando o próprio comando envia dados para a mesh.
              </div>
              <div class="hive-console-settings-host"></div>
            </div>

            <!-- Location -->
            <div class="device-section">
              <div class="card-title">Location</div>
              ${0}
            </div>

          </div>

        </div>
      </div>

      <!-- Modals & Dialogs -->
      <!-- Identity Flow Modal (streaming progress) -->
      ${0}

      <!-- Rename Success Modal (persistent dialog) -->
      ${0}

      <!-- Status Toast -->
      ${0}

      <!-- Dialogs -->
      <meshcore-confirm-dialog
        .open=${0}
        .title=${0}
        .message=${0}
        .requireTyped=${0}
        ?dangerous=${0}
        @confirm=${0}
        @cancel=${0}>
      </meshcore-confirm-dialog>

    `),this.selectedDevice?Zn(ea||(ea=on`
            <div id="hive-repeater-settings-card"
                 class="device-section"
                 data-hive-native="repeater"
                 style="margin-bottom:16px;">
              <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;">
                <div class="card-title" style="margin:0;">Repeater Setup</div>
                <button
                  class="action-btn"
                  style="white-space:nowrap;"
                  ?disabled=${0}
                  @click=${0}>
                  ${0}
                </button>
              </div>
              ${0}
              <div style="height:1px;background:var(--divider-color);margin:16px 0;"></div>
              <div style="font-size:13px;font-weight:600;margin-bottom:10px;">Regions &amp; Scopes</div>
              ${0}
            </div>
          `),this._repeaterReadBusy||this._saving,()=>this._readRepeaterStatus(!0,!0),this._repeaterReadBusy?"A ler…":"↻ Ler configuração",this._renderRepeaterSettings(),this._renderRegionsScopes()):to,this.selectedDevice?this._renderFirmwareOta():to,this.selectedDevice?this._renderBackupRestore():to,this._renderIdentityManagement(),this._renderLocation(),this._renderIdentityFlowModal(),this._renderRenameSuccessModal(),this._statusMessage?Zn(ta||(ta=on`
        <div class="status-toast ${0}">
          ${0}
        </div>
      `),this._statusMessage.type,this._statusMessage.text):to,this._confirmDialogOpen,(null===(e=this._confirmAction)||void 0===e?void 0:e.title)||"",(null===(t=this._confirmAction)||void 0===t?void 0:t.message)||"",null===(i=this._confirmAction)||void 0===i?void 0:i.requireTyped,!(null===(s=this._confirmAction)||void 0===s||!s.requireTyped),this._onConfirmAction,this._onConfirmCancel):Zn(Zs||(Zs=on`<div>No device config loaded</div>`))}_renderFirmwareOta(){var e;const t=this._firmwareOtaStatus,i=(null==t?void 0:t.installed_version)||(null===(e=this.selectedDevice)||void 0===e?void 0:e.firmware)||"—",s=(null==t?void 0:t.latest_version)||"—",a=Boolean((null==t?void 0:t.supported)&&(null==t?void 0:t.secure_ota)&&!(null!=t&&t.bootstrap_required));return Zn(ia||(ia=on`
      <div class="device-section firmware-manager">
        <div class="firmware-manager-header">
          <div class="section-title">
            <div class="section-icon firmware">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M5 20h14v-2H5v2zm7-18l-5.5 5.5 1.42 1.42L11 5.83V16h2V5.83l3.08 3.09 1.42-1.42L12 2z"/>
              </svg>
            </div>
            <div>
              <div class="device-name">Gestor de Firmware</div>
              <div class="device-meta">
                <span>Firmware reportado: ${0}</span>
                ${0}
              </div>
            </div>
          </div>
          ${0}
        </div>

        ${0}

        <div class="firmware-actions-grid">
          <div class="firmware-action-card">
            <div class="firmware-action-title">Release oficial</div>
            <div class="firmware-action-text">
              Consulta agora o GitHub e, quando existir uma Release, permite
              flashar diretamente a versão mais recente disponível.
            </div>

            <button
              class="apply-button"
              ?disabled=${0}
              @click=${0}>
              ${0}
            </button>

            ${0}
          </div>

          <div class="firmware-action-card">
            <div class="firmware-action-title">Flash manual</div>
            <div class="firmware-action-text">
              Seleciona um <strong>firmware.bin</strong> de aplicação. Imagens
              <strong>merged</strong> / factory não são aceites pelo OTA.
            </div>

            <label class="firmware-file-picker">
              <span>${0}</span>
              <input
                type="file"
                accept=".bin,application/octet-stream"
                ?disabled=${0}
                @change=${0}
              />
            </label>

            <button
              class="apply-button firmware-primary-action"
              ?disabled=${0}
              @click=${0}>
              ${0}
            </button>
          </div>
        </div>

        <div class="firmware-usb-card">
          <div class="firmware-action-title">Flasher USB</div>
          <div class="firmware-action-text" style="min-height:0;margin-bottom:0;">
            Instala HiveFW diretamente num Heltec ligado por USB. Podes usar um ficheiro local
            ou a última build publicada. O flash ocorre no browser; o Home Assistant não recebe acesso à porta USB.
          </div>

          ${0}

          <div class="firmware-usb-controls">
            <div class="firmware-usb-field">
              <label>Equipamento</label>
              <select class="form-select"
                .value=${0}
                ?disabled=${0}
                @change=${0}>
                <option value="heltec-v3">Heltec V3</option>
                <option value="heltec-t114">Heltec T114</option>
              </select>
            </div>

            <div class="firmware-usb-field">
              <label>Firmware</label>
              <select class="form-select"
                .value=${0}
                ?disabled=${0}
                @change=${0}>
                <option value="ble">Companion BLE</option>
                ${0}
              </select>
            </div>

            <div class="firmware-usb-field">
              <label>Origem</label>
              <select class="form-select"
                .value=${0}
                ?disabled=${0}
                @change=${0}>
                <option value="latest">Última build publicada</option>
                <option value="manual">Ficheiro manual</option>
              </select>
            </div>
          </div>

          ${0}

          <label class="firmware-usb-erase">
            <input
              type="checkbox"
              .checked=${0}
              ?disabled=${0}
              @change=${0}
            />
            <span>
              <strong>Apagar flash antes de instalar</strong><br />
              Remove configurações e dados guardados. No V3 usa uma imagem merged completa;
              no T114 executa primeiro o formatter nRF52 e depois instala a firmware.
            </span>
          </label>

          <div class="firmware-usb-actions">
            ${0}
            <button class="apply-button"
              style="width:auto;margin:0;"
              ?disabled=${0}
              @click=${0}>
              ${0}
            </button>
          </div>

          ${0}

          ${0}
        </div>

        ${0}
      </div>
    `),i,null!=t&&t.release_available?Zn(sa||(sa=on`<span>Última Release: ${0}</span>`),s):Zn(aa||(aa=on`<span>Release: por verificar</span>`)),null!=t&&t.host?Zn(ra||(ra=on`<span class="firmware-host">${0}</span>`),t.host):to,t?t.supported?t.bootstrap_required?Zn(la||(la=on`
                  <div class="firmware-notice warning">
                    Este firmware ainda requer o bootstrap OTA seguro.
                  </div>
                `)):Zn(ca||(ca=on`
                  <div class="firmware-security">
                    <span class="firmware-status-dot"></span>
                    OTA seguro ativo · credencial efémera gerida apenas pelo backend
                  </div>
                `)):Zn(oa||(oa=on`
                <div class="firmware-notice warning">
                  O gestor OTA requer ligação TCP/Wi-Fi ao HiveFW.
                </div>
              `)):Zn(na||(na=on`
              <div class="firmware-notice">
                O estado OTA ainda não foi carregado. Usa “Verificar Releases”.
              </div>
            `)),this._firmwareBusy||this._firmwareChecking,this._checkFirmwareUpdates,this._firmwareChecking?"A verificar Releases…":"Verificar Releases",null!=t&&t.release_available?Zn(da||(da=on`
                  <div class="firmware-release-row">
                    <div>
                      <div class="firmware-release-label">Última versão publicada</div>
                      <div class="firmware-release-version">${0}</div>
                    </div>
                    ${0}
                  </div>

                  <button
                    class="apply-button firmware-primary-action"
                    ?disabled=${0}
                    @click=${0}>
                    ${0}
                  </button>
                `),s,t.release_url?Zn(ha||(ha=on`
                          <a
                            class="firmware-release-link"
                            href=${0}
                            target="_blank"
                            rel="noopener">
                            Ver Release
                          </a>
                        `),t.release_url):to,this._firmwareBusy||!a,this._installLatestFirmware,this._firmwareBusy?"A processar firmware…":`Flash da última Release (${s})`):Zn(pa||(pa=on`
                  <div class="firmware-empty">
                    Ainda não foi encontrada uma Release OTA pública.
                  </div>
                `)),this._firmwareFile?this._firmwareFile.name:"Selecionar ficheiro .bin",this._firmwareBusy,e=>{var t;const i=e.target;this._firmwareFile=(null===(t=i.files)||void 0===t?void 0:t[0])||null},this._firmwareBusy||!this._firmwareFile||!a,this._uploadFirmwareFile,this._firmwareBusy?"A processar firmware…":"Flash do ficheiro selecionado",cm()?to:Zn(ua||(ua=on`
            <div class="firmware-notice warning" style="margin:12px 0 0;">
              Web Serial não está disponível neste browser. Usa Chrome/Edge por HTTPS num computador com o rádio ligado por USB.
            </div>
          `)),this._usbFlashHardware,this._usbFlashBusy,e=>{this._usbFlashHardware=e.target.value,"heltec-t114"===this._usbFlashHardware&&(this._usbFlashVariant="ble"),this._usbFlashFile=null},this._usbFlashVariant,this._usbFlashBusy||"heltec-t114"===this._usbFlashHardware,e=>{this._usbFlashVariant=e.target.value,this._usbFlashFile=null},"heltec-v3"===this._usbFlashHardware?Zn(ga||(ga=on`<option value="wifi">Companion Wi-Fi</option>`)):to,this._usbFlashSource,this._usbFlashBusy,e=>{this._usbFlashSource=e.target.value,this._usbFlashFile=null},"manual"===this._usbFlashSource?Zn(Aa||(Aa=on`
            <label class="firmware-file-picker" style="margin-top:12px;">
              <span>${0}</span>
              <input
                type="file"
                accept=${0}
                ?disabled=${0}
                @change=${0}
              />
            </label>
          `),this._usbFlashFile?this._usbFlashFile.name:"heltec-v3"===this._usbFlashHardware?"Selecionar .bin":"Selecionar ZIP DFU (.zip)","heltec-v3"===this._usbFlashHardware?".bin,application/octet-stream":".zip,application/zip",this._usbFlashBusy,e=>{var t;const i=e.target;this._usbFlashFile=(null===(t=i.files)||void 0===t?void 0:t[0])||null}):to,this._usbFlashErase,this._usbFlashBusy,e=>{this._usbFlashErase=e.target.checked},"heltec-t114"===this._usbFlashHardware?Zn(fa||(fa=on`
              <button class="action-btn"
                ?disabled=${0}
                @click=${0}>
                Entrar em DFU
              </button>
            `),this._usbFlashBusy||!cm(),this._enterT114Dfu):to,this._usbFlashBusy||!cm()||"manual"===this._usbFlashSource&&!this._usbFlashFile,this._startUsbFlash,this._usbFlashBusy?"A instalar…":"Selecionar USB e instalar",this._usbFlashStage?Zn(ma||(ma=on`
            <div class="firmware-usb-progress" aria-label="Progresso do flash USB">
              <div style=${0}></div>
            </div>
            <div style="margin-top:6px;font-size:11px;color:var(--secondary-text-color);">
              ${0}% · ${0}
            </div>
          `),`width:${this._usbFlashProgress}%`,Math.round(this._usbFlashProgress),this._usbFlashStage):to,this._usbFlashLog?Zn(_a||(_a=on`<div class="firmware-usb-log">${0}</div>`),this._usbFlashLog):to,this._firmwareUploadStage?Zn(va||(va=on`
              <div class="firmware-progress-state">
                <div class="loading-spinner"></div>
                <div>
                  <strong>
                    ${0}
                  </strong>
                  <div>
                    ${0}
                  </div>
                </div>
              </div>
            `),"uploading"===this._firmwareUploadStage?"A enviar firmware":"rebooting"===this._firmwareUploadStage?"Firmware aceite · a reiniciar":"A aguardar reconexão","uploading"===this._firmwareUploadStage?"O Home Assistant está a enviar e validar a imagem OTA.":"rebooting"===this._firmwareUploadStage?"O rádio recebeu a imagem e está a arrancar novamente.":"A ligação TCP/Wi-Fi será retomada automaticamente."):to)}_appendUsbFlashLog(e){const t=[this._usbFlashLog,e].filter(Boolean).join("\n");this._usbFlashLog=t.split("\n").slice(-60).join("\n")}async _checkFirmwareUpdates(){if(this.hass){this._firmwareChecking=!0;try{var e;const t=await zo(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id,!0);this._firmwareOtaStatus=t,t.release_available?this._showStatusMessage(`Última Release encontrada: ${t.latest_version||"desconhecida"}.`,"success"):this._showStatusMessage("Ainda não existe uma Release OTA pública.","success")}catch(e){this._showStatusMessage(`Verificação de firmware: ${e instanceof Error?e.message:String(e)}`,"error")}finally{this._firmwareChecking=!1}}}async _refreshFirmwareOtaStatus(){if(this.hass)try{var e;this._firmwareOtaStatus=await zo(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id)}catch(e){}}async _uploadFirmwareFile(){var e;if(!this.hass||!this._firmwareFile||null===(e=this.config)||void 0===e||!e.entry_id)return;if(!this.hass.fetchWithAuth)return void this._showStatusMessage("Esta versão do Home Assistant não disponibiliza upload autenticado para o painel.","error");const t=this._firmwareFile;if(t.name.toLowerCase().endsWith(".bin")&&!t.name.toLowerCase().includes("merged")){this._firmwareBusy=!0,this._firmwareUploadStage="uploading";try{const e=new FormData;e.append("entry_id",this.config.entry_id),e.append("firmware",t,t.name);const i=await this.hass.fetchWithAuth("/api/hivefw_integration/firmware",{method:"POST",body:e});let s={};try{s=await i.json()}catch(e){s={}}if(!i.ok||!s.success)throw new Error(s.error||`HTTP ${i.status}`);this._firmwareUploadStage="rebooting",this._firmwareFile=null,this._showStatusMessage("Firmware enviado. O HiveFW está a reiniciar.","success"),window.setTimeout(()=>{this._firmwareUploadStage="reconnecting",this._refreshFirmwareOtaStatus().finally(()=>{window.setTimeout(()=>{this._firmwareUploadStage=null,this._firmwareBusy=!1},2500)})},5e3)}catch(e){this._firmwareUploadStage=null,this._firmwareBusy=!1,this._showStatusMessage(`Firmware OTA: ${e instanceof Error?e.message:String(e)}`,"error")}}else this._showStatusMessage("Seleciona o firmware .bin OTA, não o ficheiro merged.","error")}async _installLatestFirmware(){if(this.hass){this._firmwareBusy=!0,this._firmwareUploadStage="uploading";try{var e;const t=await async function(e,t){const i={type:"hivefw_integration/install_latest_firmware"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id);if(!t.success)throw new Error("A atualização não foi aceite.");this._firmwareUploadStage="rebooting",this._showStatusMessage(`Firmware ${t.version||""} enviado. O HiveFW está a reiniciar.`,"success"),window.setTimeout(()=>{this._firmwareUploadStage="reconnecting",this._refreshFirmwareOtaStatus().finally(()=>{this._firmwareUploadStage=null})},5e3)}catch(e){const t=e;this._showStatusMessage(`Firmware OTA: ${(null==t?void 0:t.message)||String(e)}`,"error")}finally{"uploading"===this._firmwareUploadStage&&(this._firmwareUploadStage=null),this._firmwareBusy=!1}}}_backupFileName(e,t){const i=String(t||"HiveFW").normalize("NFKD").replace(/[^\w.-]+/g,"_").replace(/^_+|_+$/g,"").slice(0,48)||"HiveFW",s=new Date,a=e=>String(e).padStart(2,"0");return`${e}_${i}_${String(s.getFullYear())+a(s.getMonth()+1)+a(s.getDate())+"_"+a(s.getHours())+a(s.getMinutes())+a(s.getSeconds())}.json`}_downloadJson(e,t){const i=new Blob([JSON.stringify(e,null,2)+"\n"],{type:"application/json;charset=utf-8"}),s=URL.createObjectURL(i),a=document.createElement("a");a.href=s,a.download=t,document.body.appendChild(a),a.click(),a.remove(),window.setTimeout(()=>URL.revokeObjectURL(s),1e3)}async _exportCompanionBackup(){if(this.hass&&!this._backupBusy){this._backupBusy="companion-export";try{var e;const t=await async function(e,t){const i={type:"hivefw_integration/export_backup"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),i=t.backup;if(!i)throw new Error("O rádio não devolveu um backup Companion válido.");this._downloadJson(i,this._backupFileName("meshcore_backup",i.name)),this._showStatusMessage(`Backup Companion criado: ${Number(t.channel_count||0)} canais, ${Number(t.contact_count||0)} contactos.`,"success")}catch(e){this._showStatusMessage("Backup Companion: "+String(e),"error")}finally{this._backupBusy=null}}}async _exportRepeaterBackup(){if(this.hass&&!this._backupBusy){this._backupBusy="repeater-export";try{var e;const t=await async function(e,t){const i={type:"hivefw_integration/export_repeater_backup"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),i=t.backup;if(!i||"hivefw_repeater_backup"!==i.format)throw new Error("O rádio não devolveu um backup Repeater válido.");this._downloadJson(i,this._backupFileName("hivefw_repeater_backup",i.device_name)),this._showStatusMessage(`Backup Repeater criado: ${Number(t.region_count||0)} regiões, ${Number(t.acl_count||0)} ACL.`,"success")}catch(e){this._showStatusMessage("Backup Repeater: "+String(e),"error")}finally{this._backupBusy=null}}}async _restoreBackupFile(e,t){if(this.hass&&!this._backupBusy)try{const a=JSON.parse(await t.text());if("companion"===e){var i;const e=["name","public_key","private_key","radio_settings","position_settings","other_settings","auto_add_settings","channels","contacts"].filter(e=>!(e in a));if(e.length)throw new Error("Ficheiro Companion inválido. Falta: "+e.join(", "));const t=Array.isArray(a.channels)?a.channels.length:0,s=Array.isArray(a.contacts)?a.contacts.length:0;if(!window.confirm(`Restaurar o backup Companion vai substituir identidade, rádio, posição, canais e contactos.\n\nCanais: ${t}\nContactos: ${s}\n\nPretendes continuar?`))return;this._backupBusy="companion-restore";const r=await async function(e,t,i){const s={type:"hivefw_integration/restore_backup",backup:t};return i&&(s.entry_id=i),e.callWS(s)}(this.hass,a,null===(i=this.config)||void 0===i?void 0:i.entry_id);if(!r.success)throw new Error("O restauro Companion não foi concluído.");await this._loadDeviceConfig(),this._showStatusMessage("Backup Companion restaurado.","success")}else{var s;if("hivefw_repeater_backup"!==a.format||"object"!=typeof a.repeater)throw new Error("Ficheiro HiveFW Repeater inválido.");const e=a.repeater,t=e.access||{},i=Array.isArray(t.acl)?t.acl.length:0,r=e.regions||{},n=Array.isArray(r.regions)?r.regions.length:0;if(!window.confirm(`Restaurar o backup Repeater vai substituir Owner Info, RX Gain, ADC, routing, RF avançado, RegionMap e ACL persistente.\n\nAs passwords Admin/Guest NÃO são exportadas nem alteradas.\n\nACL: ${i}\nRegiões: ${n}\n\nPretendes continuar?`))return;this._backupBusy="repeater-restore";const o=await async function(e,t,i){const s={type:"hivefw_integration/restore_repeater_backup",backup:t};return i&&(s.entry_id=i),e.callWS(s)}(this.hass,a,null===(s=this.config)||void 0===s?void 0:s.entry_id);if(!o.success)throw new Error("O restauro Repeater não foi concluído.");await this._readRepeaterStatus(!1,!0),await this._refreshLocalRegions(),this._showStatusMessage("Backup Repeater restaurado. As passwords Admin/Guest foram mantidas.","success")}}catch(t){this._showStatusMessage(`Restauro ${"companion"===e?"Companion":"Repeater"}: ${String(t)}`,"error")}finally{this._backupBusy=null}}_renderBackupRestore(){const e=null!==this._backupBusy;return Zn(wa||(wa=on`
      <div class="device-section backup-restore-card" style="margin-bottom:16px;">
        <div class="card-title">Backup &amp; Restore</div>
        <div style="font-size:12px;line-height:1.45;color:var(--secondary-text-color);margin-bottom:12px;">
          Companion e Repeater são guardados separadamente para distinguir os dados de identidade/app da configuração específica do serviço Repeater.
        </div>

        <div class="backup-restore-grid">
          <div class="backup-restore-panel">
            <div style="font-size:13px;font-weight:650;">Companion</div>
            <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;margin:4px 0 9px;">
              Identidade/chave privada, nome, rádio, posição, auto-add, canais e contactos. Formato compatível com MeshCore.
            </div>
            <div style="font-size:10px;color:var(--warning-color,#ff9800);margin-bottom:9px;">
              Contém a chave privada do dispositivo: trata o ficheiro como credencial sensível.
            </div>
            <div class="actions-row">
              <button class="action-btn" ?disabled=${0} @click=${0}>
                ${0}
              </button>
              <button class="action-btn" ?disabled=${0}
                @click=${0}>
                ${0}
              </button>
              <input id="companion-backup-input" type="file" accept=".json,application/json" hidden
                @change=${0} />
            </div>
          </div>

          <div class="backup-restore-panel">
            <div style="font-size:13px;font-weight:650;">Repeater</div>
            <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;margin:4px 0 9px;">
              Owner Info, RX Gain, ADC, modo Repeater, Path Hash, Multi ACK, Smart Advert, RTC Mesh, Duty Cycle, routing, RF avançado, RegionMap e ACL.
            </div>
            <div style="font-size:10px;color:var(--secondary-text-color);margin-bottom:9px;">
              Passwords Admin/Guest são write-only: nunca entram no backup e são mantidas durante o restore.
            </div>
            <div class="actions-row">
              <button class="action-btn" ?disabled=${0} @click=${0}>
                ${0}
              </button>
              <button class="action-btn" ?disabled=${0}
                @click=${0}>
                ${0}
              </button>
              <input id="repeater-backup-input" type="file" accept=".json,application/json" hidden
                @change=${0} />
            </div>
          </div>
        </div>
      </div>
    `),e,this._exportCompanionBackup,"companion-export"===this._backupBusy?"A criar…":"Backup Companion",e,()=>{var e;return null===(e=this.shadowRoot)||void 0===e||null===(e=e.querySelector("#companion-backup-input"))||void 0===e?void 0:e.click()},"companion-restore"===this._backupBusy?"A restaurar…":"Restaurar Companion",e=>{var t;const i=e.target,s=null===(t=i.files)||void 0===t?void 0:t[0];i.value="",s&&this._restoreBackupFile("companion",s)},e,this._exportRepeaterBackup,"repeater-export"===this._backupBusy?"A criar…":"Backup Repeater",e,()=>{var e;return null===(e=this.shadowRoot)||void 0===e||null===(e=e.querySelector("#repeater-backup-input"))||void 0===e?void 0:e.click()},"repeater-restore"===this._backupBusy?"A restaurar…":"Restaurar Repeater",e=>{var t;const i=e.target,s=null===(t=i.files)||void 0===t?void 0:t[0];i.value="",s&&this._restoreBackupFile("repeater",s)})}_applyImmediateSetting(e,t,i){this.hass&&(this._settingsWriteQueue=this._settingsWriteQueue.then(async()=>{this._saving=!0;try{var s,a,r;const u=await To(this.hass,{[e]:t},null===(s=this.config)||void 0===s?void 0:s.entry_id);if(!u.success)throw new Error(u.error||`Falha ao aplicar ${i}`);if(this._deviceConfig=await Fo(this.hass,null===(a=this.config)||void 0===a?void 0:a.entry_id),await this._readRepeaterStatus(!1,!0),this._deviceConfig&&null!==(r=this._repeaterStatus)&&void 0!==r&&r.radio){var n,o,l,c,d,h,p;const e=this._repeaterStatus.radio;this._deviceConfig={...this._deviceConfig,frequency:null!==(n=e.frequency)&&void 0!==n?n:this._deviceConfig.frequency,bandwidth:null!==(o=e.bandwidth)&&void 0!==o?o:this._deviceConfig.bandwidth,spreading_factor:null!==(l=e.spreading_factor)&&void 0!==l?l:this._deviceConfig.spreading_factor,coding_rate:null!==(c=e.coding_rate)&&void 0!==c?c:this._deviceConfig.coding_rate,tx_power:null!==(d=e.tx_power)&&void 0!==d?d:this._deviceConfig.tx_power,path_hash_mode:null!==(h=null===(p=this._repeaterStatus.device_info)||void 0===p?void 0:p.path_hash_mode)&&void 0!==h?h:this._deviceConfig.path_hash_mode}}delete this._editValues[e],this._editValues={...this._editValues},this.requestUpdate(),this._showStatusMessage(`${i} atualizado no Companion.`,"success")}catch(e){try{var u;this._deviceConfig=await Fo(this.hass,null===(u=this.config)||void 0===u?void 0:u.entry_id),await this._readRepeaterStatus(!1,!0)}catch(e){}this._showStatusMessage(`${i}: ${e instanceof Error?e.message:String(e)}`,"error")}finally{this._saving=!1}}))}_renderRadioSettings(){var e,t,i,s,a,r,n,o,l,c,d,h,p,u,g,A,f;if(!this._deviceConfig)return;const m=null===(e=this._repeaterStatus)||void 0===e?void 0:e.repeater_profile,_=null===(t=this._repeaterStatus)||void 0===t?void 0:t.radio,v=Number(null!==(i=null!==(s=null==_?void 0:_.tx_power)&&void 0!==s?s:this._deviceConfig.tx_power)&&void 0!==i?i:17),w=Number(null!==(a=null!==(r=null==_?void 0:_.frequency)&&void 0!==r?r:this._deviceConfig.frequency)&&void 0!==a?a:0),b=Number(null!==(n=null!==(o=null==_?void 0:_.bandwidth)&&void 0!==o?o:this._deviceConfig.bandwidth)&&void 0!==n?n:250),y=Number(null!==(l=null!==(c=null==_?void 0:_.spreading_factor)&&void 0!==c?c:this._deviceConfig.spreading_factor)&&void 0!==l?l:10),x=Number(null!==(d=null!==(h=null==_?void 0:_.coding_rate)&&void 0!==h?h:this._deviceConfig.coding_rate)&&void 0!==d?d:5),E=Number(null!==(p=null!==(u=null===(g=this._repeaterStatus)||void 0===g||null===(g=g.device_info)||void 0===g?void 0:g.path_hash_mode)&&void 0!==u?u:this._deviceConfig.path_hash_mode)&&void 0!==p?p:0),C=Boolean(null!==(A=null==m?void 0:m.rx_boosted_gain)&&void 0!==A&&A),B=Number(null!==(f=null==m?void 0:m.adc_multiplier)&&void 0!==f?f:0);return Zn(ba||(ba=on`
      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">TX Power (dBm)</label>
          <input
            type="number"
            class="form-input"
            min="2"
            max="22"
            .value=${0}
            ?disabled=${0}
            @change=${0}
          />
        </div>
        <div class="form-group-inline">
          <label class="form-label">Frequency (MHz)</label>
          <input
            type="number"
            class="form-input"
            step="0.001"
            .value=${0}
            ?disabled=${0}
            @change=${0}
          />
        </div>
      </div>

      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">Bandwidth (kHz)</label>
          <select
            class="form-select"
            .value=${0}
            ?disabled=${0}
            @change=${0}>
            ${0}
          </select>
        </div>
        <div class="form-group-inline">
          <label class="form-label">Spreading Factor</label>
          <select
            class="form-select"
            .value=${0}
            ?disabled=${0}
            @change=${0}>
            ${0}
          </select>
        </div>
      </div>

      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">Coding Rate</label>
          <select
            class="form-select"
            .value=${0}
            ?disabled=${0}
            @change=${0}>
            ${0}
          </select>
        </div>
        <div class="form-group-inline">
          <label class="form-label">Path Hash Mode</label>
          <select
            class="form-select"
            .value=${0}
            ?disabled=${0}
            @change=${0}>
            <option value="0">0 - 1 byte</option>
            <option value="1">1 - 2 byte</option>
            <option value="2">2 - 3 byte</option>
          </select>
        </div>
      </div>

      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">RX Boosted Gain</label>
          <select
            class="form-select"
            .value=${0}
            ?disabled=${0}
            @change=${0}>
            <option value="0">Desligado</option>
            <option value="1">Ligado</option>
          </select>
          <div style="font-size:11px;color:var(--secondary-text-color);margin-top:4px;">
            Aumenta a sensibilidade RX do SX126x, com algum aumento de consumo.
          </div>
        </div>
        <div class="form-group-inline">
          <label class="form-label">ADC multiplier</label>
          <input
            type="number"
            class="form-input"
            min="0"
            max="10"
            step="0.001"
            .value=${0}
            ?disabled=${0}
            @change=${0}
          />
          <div style="font-size:11px;color:var(--secondary-text-color);margin-top:4px;">
            Corrige a calibração da tensão da bateria. 0 usa o valor padrão da placa; intervalo aceite 0–10.
          </div>
        </div>
      </div>

      <div style="margin-top:12px;padding:8px;background:rgba(0,0,0,0.02);border-radius:6px;font-size:12px;color:var(--secondary-text-color);">
        Cada alteração é enviada imediatamente e confirmada por leitura direta do Companion.
        Parâmetros RF que exigem reboot continuam a ser persistidos no rádio no momento da seleção.
      </div>
    `),String(v),this._saving,e=>{this._applyImmediateSetting("tx_power",Number(e.target.value),"TX Power")},String(w),this._saving,e=>{this._applyImmediateSetting("frequency",Number(e.target.value),"Frequência")},String(b),this._saving,e=>{this._applyImmediateSetting("bandwidth",Number(e.target.value),"Bandwidth")},[7.8,10.4,15.6,20.8,31.25,41.7,62.5,125,250,500].map(e=>Zn(ya||(ya=on`<option value=${0}>${0}</option>`),String(e),e)),String(y),this._saving,e=>{this._applyImmediateSetting("spreading_factor",Number(e.target.value),"Spreading Factor")},[7,8,9,10,11,12].map(e=>Zn(xa||(xa=on`<option value=${0}>${0}</option>`),String(e),e)),String(x),this._saving,e=>{this._applyImmediateSetting("coding_rate",Number(e.target.value),"Coding Rate")},[5,6,7,8].map(e=>Zn(Ea||(Ea=on`<option value=${0}>${0}</option>`),String(e),e)),String(E),this._saving,e=>{this._applyImmediateSetting("path_hash_mode",Number(e.target.value),"Path Hash Mode")},C?"1":"0",!(null!=m&&m.supported)||this._saving,e=>{this._applyImmediateSetting("rx_boosted_gain","1"===e.target.value,"RX Boosted Gain")},String(B),!(null!=m&&m.supported)||this._saving,e=>{this._applyImmediateSetting("adc_multiplier",Number(e.target.value),"ADC multiplier")})}_applyImmediateCoordinates(e,t){this.hass&&(this._settingsWriteQueue=this._settingsWriteQueue.then(async()=>{this._saving=!0;try{var i,s;const a=await To(this.hass,{latitude:e,longitude:t},null===(i=this.config)||void 0===i?void 0:i.entry_id);if(!a.success)throw new Error(a.error||"Falha ao atualizar coordenadas");this._deviceConfig=await Fo(this.hass,null===(s=this.config)||void 0===s?void 0:s.entry_id),this.requestUpdate(),this._showStatusMessage("Localização atualizada no Companion.","success")}catch(e){this._showStatusMessage("Localização: "+String(e),"error")}finally{this._saving=!1}}))}_applyImmediateLocationSource(e){this.hass&&(this._settingsWriteQueue=this._settingsWriteQueue.then(async()=>{this._saving=!0;try{var t,i;if(!(await Lo(this.hass,e,null===(t=this.config)||void 0===t?void 0:t.entry_id)).success)throw new Error("Falha ao atualizar Location Source");if("ha_location"===e){var s;const e=null===(s=this.hass)||void 0===s?void 0:s.states["zone.home"];if(e){var a,r,n;const t=await To(this.hass,{latitude:Number(null!==(a=e.attributes.latitude)&&void 0!==a?a:0),longitude:Number(null!==(r=e.attributes.longitude)&&void 0!==r?r:0)},null===(n=this.config)||void 0===n?void 0:n.entry_id);if(!t.success)throw new Error(t.error||"Falha ao enviar coordenadas do Home Assistant")}}this._deviceConfig=await Fo(this.hass,null===(i=this.config)||void 0===i?void 0:i.entry_id),this._locationSource=e,this.requestUpdate(),this._showStatusMessage("Location Source atualizado.","success")}catch(e){this._showStatusMessage("Location Source: "+String(e),"error")}finally{this._saving=!1}}))}_renderLocation(){var e,t,i,s,a,r,n;if(!this._deviceConfig)return;const o="ha_location"===this._locationSource,l=o?null===(e=this.hass)||void 0===e?void 0:e.states["zone.home"]:null;this._locationSource,this._deviceConfig.location_source,this._hasChanges("location",["latitude","longitude"]);const c=String(o&&l?null!==(t=l.attributes.latitude)&&void 0!==t?t:0:null!==(i=null!==(s=this._editValues.latitude)&&void 0!==s?s:this._deviceConfig.latitude)&&void 0!==i?i:0),d=String(o&&l?null!==(a=l.attributes.longitude)&&void 0!==a?a:0:null!==(r=null!==(n=this._editValues.longitude)&&void 0!==n?n:this._deviceConfig.longitude)&&void 0!==r?r:0);return Zn(Ca||(Ca=on`
      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">Latitude</label>
          <input
            type="number"
            class="form-input"
            step="0.000001"
            min="-90"
            max="90"
            .value=${0}
            ?disabled=${0}
            @change=${0}
          />
        </div>
        <div class="form-group-inline">
          <label class="form-label">Longitude</label>
          <input
            type="number"
            class="form-input"
            step="0.000001"
            min="-180"
            max="180"
            .value=${0}
            ?disabled=${0}
            @change=${0}
          />
        </div>
      </div>
      ${0}

      <div class="section-row">
        <div class="form-group-inline">
          <label class="form-label">Location Source</label>
          <select
            class="form-select"
            .value=${0}
            @change=${0}>
            <option value="manual">Manual (coordinates above)</option>
            <option value="gps">GPS (device hardware)</option>
            <option value="ha_location">Home Assistant Zone</option>
          </select>
          <div style="font-size: 11px; color: var(--secondary-text-color); margin-top: 4px;">
            How the device determines its coordinates
          </div>
        </div>
      </div>

      <div style="font-size:11px;color:var(--secondary-text-color);margin-top:10px;">
        Alterações de localização são aplicadas automaticamente.
      </div>
    `),c,o,e=>{var t,i;const s=Number(e.target.value),a=Number(null!==(t=null===(i=this._deviceConfig)||void 0===i?void 0:i.longitude)&&void 0!==t?t:0);this._applyImmediateCoordinates(s,a)},d,o,e=>{var t,i;const s=Number(null!==(t=null===(i=this._deviceConfig)||void 0===i?void 0:i.latitude)&&void 0!==t?t:0),a=Number(e.target.value);this._applyImmediateCoordinates(s,a)},o?Zn(Ba||(Ba=on`
        <div style="font-size: 11px; color: var(--secondary-text-color); margin-top: -8px; margin-bottom: 8px;">
          Using coordinates from Home Assistant zone.home
        </div>
      `)):"",this._locationSource,e=>{const t=e.target.value;this._locationSource=t,this._applyImmediateLocationSource(t)})}_renderRegionsScopes(){const e=this._localRegions,t="clear_default"!==this._localRegionAction,i="put"===this._localRegionAction;return Zn(Sa||(Sa=on`
      <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.5;margin-bottom:12px;">
        A RegionMap abaixo é a configuração RF real do HiveFW. Nada é criado ou alterado automaticamente:
        o estado atual do rádio é preservado até aplicares uma operação.
      </div>
      <div style="padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);margin-bottom:12px;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:10px;">
          <div>
            <div style="font-size:13px;font-weight:600;">RegionMap local</div>
            <div style="font-size:10px;color:var(--secondary-text-color);margin-top:2px;">Companion local · não gera tráfego LoRa</div>
          </div>
          <button class="action-btn" ?disabled=${0} @click=${0}>
            ${0}
          </button>
        </div>
        ${0}
      </div>
      <div style="font-size:12px;font-weight:600;margin-bottom:4px;">Scopes do Home Assistant</div>
      <div style="font-size:10px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
        Estes scopes são locais à integração. Não alteram a RegionMap nem o forwarding RF do Repeater.
      </div>

      <div class="form-group-inline" style="margin-bottom:8px;">
        <label class="form-label">Flood scopes</label>
        <input
          class="form-input"
          type="text"
          placeholder="ex.: pt-setubal, pt-lisboa"
          .value=${0}
          @input=${0}
        />
      </div>
      <label style="display:flex;align-items:center;gap:7px;font-size:12px;margin:8px 0 10px;">
        <input
          type="checkbox"
          .checked=${0}
          @change=${0}
        />
        Permitir scope global (*)
      </label>
      <button class="apply-button" style="width:100%;" ?disabled=${0}
        @click=${0}>
        ${0}
      </button>

    `),this._localRegionBusy,this._refreshLocalRegions,this._localRegionBusy?"A ler…":"Atualizar",null!=e&&e.supported?Zn(ka||(ka=on`
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">
            <span class="managed-devices-chip">${0} regions</span>
            <span class="managed-devices-chip">Home: ${0}</span>
            <span class="managed-devices-chip">Default: ${0}</span>
          </div>
          <div style="overflow:auto;border:1px solid var(--divider-color);border-radius:7px;margin-bottom:10px;">
            <table style="width:100%;border-collapse:collapse;font-size:11px;">
              <thead><tr style="background:var(--primary-background-color);text-align:left;">
                <th style="padding:7px 8px;">Region</th><th style="padding:7px 8px;">Parent</th>
                <th style="padding:7px 8px;">Flood</th><th style="padding:7px 8px;">Flags</th>
              </tr></thead>
              <tbody>
                ${0}
              </tbody>
            </table>
          </div>
          <div class="repeater-region-form">
            <div class="form-group-inline">
              <label class="form-label">Operação</label>
              <select class="form-select" .value=${0}
                @change=${0}>
                <option value="put">Criar / atualizar Region</option>
                <option value="allow">Permitir flood</option>
                <option value="deny">Bloquear flood</option>
                <option value="home">Definir HOME</option>
                <option value="default">Definir Default scope</option>
                <option value="clear_default">Limpar Default scope</option>
                <option value="remove">Remover Region</option>
              </select>
            </div>
            <div class="form-group-inline">
              <label class="form-label">Region</label>
              <input class="form-input" type="text" maxlength="30" placeholder="ex.: #pt-setubal"
                .value=${0} ?disabled=${0}
                @input=${0} />
            </div>
            <div class="form-group-inline">
              <label class="form-label">Parent</label>
              <input class="form-input" type="text" maxlength="30" placeholder="ex.: #pt-lisboa-vale-do-tejo"
                .value=${0} ?disabled=${0}
                @input=${0} />
            </div>
          </div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <button class="apply-button" style="flex:1;min-width:150px;margin:0;"
              ?disabled=${0}
              @click=${0}>${0}</button>
            <button class="action-btn" style="flex:1;min-width:150px;" ?disabled=${0}
              @click=${0}>Guardar Regions</button>
          </div>
          <div style="font-size:10px;color:var(--secondary-text-color);margin-top:7px;line-height:1.45;">
            Criar/remover/allow/deny/HOME ficam em RAM até “Guardar Regions”. Default scope segue o comportamento oficial e é persistido imediatamente.
          </div>
        `),e.count,e.home||"*",e.default||"<null>",e.regions.map(e=>Zn(Ia||(Ia=on`
                  <tr style="border-top:1px solid var(--divider-color);">
                    <td style="padding:7px 8px;font-family:monospace;">${0}</td>
                    <td style="padding:7px 8px;font-family:monospace;color:var(--secondary-text-color);">${0}</td>
                    <td style="padding:7px 8px;">${0}</td>
                    <td style="padding:7px 8px;color:var(--secondary-text-color);">${0}${0}</td>
                  </tr>
                `),e.name,e.parent||"—",e.allow_flood?"Permitido":"Bloqueado",e.home?"HOME ":"",e.default?"DEFAULT":"")),this._localRegionAction,e=>{this._localRegionAction=e.target.value},this._localRegionName,!t,e=>{this._localRegionName=e.target.value},this._localRegionParent,!i,e=>{this._localRegionParent=e.target.value},this._localRegionBusy||t&&!this._localRegionName.trim(),this._applyLocalRegion,this._localRegionBusy?"A aplicar…":"Aplicar operação",this._localRegionBusy,this._saveLocalRegions):Zn(Ra||(Ra=on`
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
            ${0}
          </div>
        `),(null==e?void 0:e.error)||"Este firmware ainda não expõe a RegionMap local pelo Companion Protocol."),this._scopeDraft,e=>{this._scopeDraft=e.target.value},this._scopeGlobal,e=>{this._scopeGlobal=e.target.checked},this._scopeSaving,this._saveFloodScopes,this._scopeSaving?"A guardar…":"Guardar Scopes HA")}async _refreshLocalRegions(){if(this.hass){this._localRegionBusy=!0;try{var e;this._localRegions=await Oo(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),this._localRegions.supported||this._showStatusMessage(this._localRegions.error||"RegionMap local indisponível","error")}catch(e){this._showStatusMessage("RegionMap local: "+String(e),"error")}finally{this._localRegionBusy=!1}}}async _applyLocalRegion(){var e;if(!this.hass||null===(e=this._localRegions)||void 0===e||!e.supported)return;const t=this._localRegionAction,i="clear_default"===t?"":this._localRegionName.trim(),s="put"===t?this._localRegionParent.trim():"";if("clear_default"===t||i){this._localRegionBusy=!0;try{var a;const e=await Uo(this.hass,t,i,s,null===(a=this.config)||void 0===a?void 0:a.entry_id);this._localRegions=e,"put"!==t&&"remove"!==t||(this._localRegionName="",this._localRegionParent=""),this._showStatusMessage("RegionMap atualizada em "+("default"===t||"clear_default"===t?"flash":"RAM"),"success")}catch(e){const t=e;this._showStatusMessage("RegionMap: "+((null==t?void 0:t.message)||String(e)),"error")}finally{this._localRegionBusy=!1}}}async _saveLocalRegions(){var e;if(this.hass&&null!==(e=this._localRegions)&&void 0!==e&&e.supported){this._localRegionBusy=!0;try{var t;const e=await Uo(this.hass,"save","","",null===(t=this.config)||void 0===t?void 0:t.entry_id);this._localRegions=e,this._showStatusMessage("Regions guardadas no HiveFW","success")}catch(e){const t=e;this._showStatusMessage("Guardar Regions: "+((null==t?void 0:t.message)||String(e)),"error")}finally{this._localRegionBusy=!1}}}async _saveFloodScopes(){if(this.hass){this._scopeSaving=!0;try{var e;const t=this._scopeDraft.split(",").map(e=>e.trim()).filter(Boolean),i=await async function(e,t,i,s){const a={type:"hivefw_integration/set_flood_scopes",scopes:t,global:i};return s&&(a.entry_id=s),e.callWS(a)}(this.hass,t,this._scopeGlobal,null===(e=this.config)||void 0===e?void 0:e.entry_id);this._scopeDraft=i.scopes.join(", "),this._scopeGlobal=i.global,this._showStatusMessage("Scopes guardados","success")}catch(e){this._showStatusMessage(`Erro ao guardar scopes: ${String(e)}`,"error")}finally{this._scopeSaving=!1}}}async _readRemoteRegions(){if(this.hass&&this._regionTarget){this._regionBusy=!0;try{var e;this._regionText=await async function(e,t,i){const s={type:"hivefw_integration/get_remote_regions",target_prefix:t};return i&&(s.entry_id=i),(await e.callWS(s)).regions||""}(this.hass,this._regionTarget,null===(e=this.config)||void 0===e?void 0:e.entry_id)}catch(e){this._showStatusMessage(`Regions: ${String(e)}`,"error")}finally{this._regionBusy=!1}}}async _sendRemoteRegionCommand(e){if(this.hass&&this._regionTarget){this._regionBusy=!0;try{var t;const i=await async function(e,t,i,s){try{const a={type:"hivefw_integration/execute_remote",target_prefix:t,command:i};return s&&(a.entry_id=s),await e.callWS(a)}catch(e){const t=e;return{response:t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e),success:!1,timestamp:(new Date).toISOString()}}}(this.hass,this._regionTarget,e,null===(t=this.config)||void 0===t?void 0:t.entry_id);if(!i.success)return void this._showStatusMessage(i.response||"Region command failed","error");this._showStatusMessage(i.response||"Region command sent","success"),this._regionBusy=!1,await this._readRemoteRegions()}finally{this._regionBusy=!1}}}async _applyRemoteRegion(){let e=this._regionName.trim();"default"!==this._regionAction||e||(e="<null>"),e&&await this._sendRemoteRegionCommand(`region ${this._regionAction} ${e}`)}_requestManagedAdmin(e){this.dispatchEvent(new CustomEvent("hivefw-open-remote-admin",{detail:{device:e},bubbles:!0,composed:!0}))}_renderManagedDevices(){const e=this._managedDevices.repeaters||[],t=this._managedDevices.clients||[],i=[...e,...t];if(0===i.length)return Zn(Ma||(Ma=on`
        <div style="font-size:12px;color:var(--secondary-text-color);line-height:1.5;">
          Nenhum equipamento remoto está configurado no meshcore-ha.
          O HiveFW local acima é o equipamento principal desta integração.
        </div>
      `));const s=i.filter(e=>e.connected||"online"===e.status).length;return Zn(Da||(Da=on`
      <div class="managed-devices-summary">
        <span class="managed-devices-chip">${0} equipamentos</span>
        <span class="managed-devices-chip">${0} repeaters</span>
        <span class="managed-devices-chip">${0} clients</span>
        <span class="managed-devices-chip">${0} online</span>
      </div>

      <div class="managed-device-list">
        ${0}
      </div>
    `),i.length,e.length,t.length,s,i.map(e=>{var t;const i=e.connected||"online"===e.status,s="repeater"===e.type?"Repeater":"Client";return Zn(Fa||(Fa=on`
            <div class="managed-device-row">
              <div class="managed-device-icon">${0}</div>
              <div>
                <div class="managed-device-name">${0}</div>
                <div class="managed-device-meta">
                  ${0} · ${0}
                  ${0}
                  ${0}
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:7px;">
                <div class="managed-device-state ${0}">
                  <span>●</span>
                  <span>${0}</span>
                </div>
                ${0}
              </div>
            </div>
          `),"repeater"===e.type?"R":"C",e.name,s,(null===(t=e.pubkey_prefix)||void 0===t?void 0:t.toUpperCase())||"sem chave",e.firmware_version?Zn(Ta||(Ta=on` · FW ${0}`),e.firmware_version):to,e.neighbors_enabled?Zn(Qa||(Qa=on` · vizinhos monitorizados`)):to,i?"online":"offline",i?"Online":"Offline","repeater"===e.type?Zn(Pa||(Pa=on`<button class="action-btn" @click=${0}>Admin</button>`),()=>this._requestManagedAdmin(e)):to)}))}async _applyRepeaterQuickSetting(e,t){var i;if(this.hass&&null!==(i=this._repeaterStatus)&&void 0!==i&&i.supported&&!this._repeaterQuickBusy){"repeat"===e?Boolean(this._repeaterStatus.repeat):"auto_advert"===e?Boolean(this._repeaterStatus.auto_advert):Boolean(this._repeaterStatus.mesh_time_sync),this._repeaterQuickBusy=e;try{var s;const i=await To(this.hass,{[e]:t},null===(s=this.config)||void 0===s?void 0:s.entry_id);if(!i.success)throw new Error(i.error||"Não foi possível aplicar a alteração.");await this._readRepeaterStatus(!1,!0);const a="repeat"===e?"Modo Repetidor":"auto_advert"===e?"Auto Advert":"Sincronização RTC via Mesh";this._showStatusMessage(`${a}: ${t?"ativado":"desativado"}.`,"success")}catch(e){await this._readRepeaterStatus(!1,!0),this._showStatusMessage("Configuração imediata do Repeater: "+String(e),"error")}finally{this._repeaterQuickBusy=null}}}_renderRepeaterSettings(){var e,t,i,s,a,r,n,o,l,c,d,h,p,u,g,A,f,m,_,v,w,b,y,x,E,C,B,S,k;const I=this._repeaterStatus;if(null==I||!I.supported)return Zn(Oa||(Oa=on`
        <div style="font-size: 12px; color: var(--secondary-text-color); line-height: 1.5;">
          O Companion está disponível, mas esta versão não anuncia o modo Repeater integrado.
        </div>
      `));const R=Boolean(I.repeat),M=Boolean(I.auto_advert_supported),D=Boolean(I.auto_advert),F=Boolean(I.neighbor_advert_supported),T=Number(null!==(e=I.neighbor_advert_interval)&&void 0!==e?e:240),Q=Boolean(I.mesh_time_sync_supported),P=Boolean(I.mesh_time_sync),O=Number(null!==(t=null!==(i=this._editValues.multi_acks)&&void 0!==i?i:I.radio.multi_acks)&&void 0!==t?t:0),U=Number(null!==(s=null!==(a=this._editValues.rx_delay)&&void 0!==a?a:I.tuning.rx_delay)&&void 0!==s?s:0),z=I.routing,H=I.radio_guard,$=I.repeater_profile,N=String(null!==(r=null!==(n=this._editValues.owner_info)&&void 0!==n?n:null==$?void 0:$.owner_info)&&void 0!==r?r:""),L=Number(null!==(o=null!==(l=this._editValues.flood_max)&&void 0!==l?l:null==z?void 0:z.flood_max)&&void 0!==o?o:64),G=Number(null!==(c=null!==(d=this._editValues.flood_max_unscoped)&&void 0!==d?d:null==z?void 0:z.flood_max_unscoped)&&void 0!==c?c:64),Y=Number(null!==(h=null!==(p=this._editValues.flood_max_advert)&&void 0!==p?p:null==z?void 0:z.flood_max_advert)&&void 0!==h?h:8),K=Number(null!==(u=null!==(g=this._editValues.loop_detect)&&void 0!==g?g:null==z?void 0:z.loop_detect)&&void 0!==u?u:0),j=Boolean(null!==(A=null!==(f=this._editValues.cad_enabled)&&void 0!==f?f:null==H?void 0:H.cad_enabled)&&void 0!==A&&A),W=Number(null!==(m=null!==(_=this._editValues.interference_threshold)&&void 0!==_?_:null==H?void 0:H.interference_threshold)&&void 0!==m?m:0),J=Number(null!==(v=null!==(w=this._editValues.agc_reset_interval)&&void 0!==w?w:null==H?void 0:H.agc_reset_interval)&&void 0!==v?v:0),q=Number(null!==(b=null!==(y=this._editValues.flood_tx_delay)&&void 0!==y?y:null==H?void 0:H.flood_tx_delay)&&void 0!==b?b:.5),V=Number(null!==(x=null!==(E=this._editValues.direct_tx_delay)&&void 0!==E?E:null==H?void 0:H.direct_tx_delay)&&void 0!==x?x:.3);return Zn(Ua||(Ua=on`
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;padding:10px 12px;border-radius:8px;background:var(--secondary-background-color);">
        <div>
          <div style="font-size:13px;font-weight:600;">Modo Repetidor</div>
          <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;">
            ${0}
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;font-size:12px;">
          <input
            type="checkbox"
            .checked=${0}
            ?disabled=${0}
            @change=${0}
          />
          ${0}
        </label>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;padding:10px 12px;border-radius:8px;background:var(--secondary-background-color);">
        <div>
          <div style="font-size:13px;font-weight:600;">Auto Advert</div>
          <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;">
            ${0}
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;font-size:12px;">
          <input
            type="checkbox"
            .checked=${0}
            ?disabled=${0}
            @change=${0}
          />
          ${0}
        </label>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:14px;padding:8px 12px;border-radius:8px;background:var(--secondary-background-color);">
        <div style="min-width:0;flex:1;">
          <div style="font-size:13px;font-weight:600;">Neighbour Advert zero-hop</div>
          <div style="font-size:10px;color:var(--secondary-text-color);margin-top:2px;line-height:1.35;">
            Zero-hop local · 0 desativa · 60–240 min, passo 2
          </div>
        </div>
        <div style="min-width:132px;">
          <div style="position:relative;">
            <input
              class="form-input"
              style="padding-right:34px;box-sizing:border-box;"
              type="number"
              min="0"
              max="240"
              step="2"
              .value=${0}
              ?disabled=${0}
              @change=${0}
            />
            <span style="position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:11px;color:var(--secondary-text-color);pointer-events:none;">
              min
            </span>
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px;padding:10px 12px;border-radius:8px;background:var(--secondary-background-color);">
        <div>
          <div style="font-size:13px;font-weight:600;">Sincronização RTC via Mesh</div>
          <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;line-height:1.45;">
            Fonte secundária: adverts assinados pelo Timekeeper português
            (01B2F5DA…1734D462). APP/GPS mantêm prioridade.
          </div>
        </div>
        <label style="display:flex;align-items:center;gap:8px;font-size:12px;">
          <input
            type="checkbox"
            .checked=${0}
            ?disabled=${0}
            @change=${0}
          />
          ${0}
        </label>
      </div>

      <div class="repeater-setup-grid" style="margin-bottom:14px;">
        <div
          style="margin:0 0 10px;padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);"
          data-hive-repeater-access>
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px;">
            <div>
              <div style="font-size:13px;font-weight:600;">Acesso remoto</div>
              <div style="font-size:11px;color:var(--secondary-text-color);margin-top:2px;line-height:1.45;">
                Credenciais do servidor Repeater. As passwords são write-only: o HiveFW apenas indica se estão configuradas.
              </div>
            </div>
            <div style="font-size:11px;color:var(--secondary-text-color);white-space:nowrap;">
              ACL: ${0}
            </div>
          </div>

          ${0}

          <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--divider-color);">
            <div style="font-size:12px;font-weight:600;">Owner Info</div>
            <div style="font-size:10px;color:var(--secondary-text-color);margin:2px 0 7px;line-height:1.4;">
              Texto livre anunciado pelo Repeater. Máximo 119 bytes UTF-8.
            </div>
            <textarea
              class="form-input"
              style="width:100%;min-height:64px;resize:vertical;box-sizing:border-box;"
              .value=${0}
              ?disabled=${0}
              @change=${0}></textarea>
          </div>

          <div
            id="hive-companion-settings-card"
            data-hive-native="companion"
            style="margin:0 0 10px;padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);">
            <div style="font-size:13px;font-weight:600;margin-bottom:4px;">Rádio Setup</div>
            <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
              Parâmetros RF base do HiveFW. O modo Repeater usa esta mesma configuração do Companion.
            </div>
            ${0}
          </div>
        </div>
      </div>

      <div class="repeater-setup-grid">
        <div style="padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);">
          <div style="font-size:13px;font-weight:600;margin-bottom:4px;">Routing &amp; Flood</div>
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
            Limites oficiais do Repeater para flood e deteção de loops.
          </div>

          ${0}
        </div>

        <div style="padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);">
          <div style="font-size:13px;font-weight:600;margin-bottom:4px;">RF &amp; Retransmissão</div>
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
            Proteção contra canal ocupado, AGC e timings de retransmissão do Repeater.
          </div>

          ${0}



        </div>

      </div>

      <div style="margin-top:10px;font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
        Todas as alterações deste painel são enviadas imediatamente ao Companion e confirmadas por read-back.
      </div>
    `),I.repeat?"Ativo no HiveFW":"Desligado — Companion apenas",R,null!==this._repeaterQuickBusy,e=>{this._applyRepeaterQuickSetting("repeat",e.target.checked)},R?"Ativo":"Desligado",M?D?"Ativo — Smart Advert automático":"Desligado":"Requer firmware HiveFW com controlo remoto de AutoAdvert",D,!M||null!==this._repeaterQuickBusy,e=>{this._applyRepeaterQuickSetting("auto_advert",e.target.checked)},D?"Ativo":"Desligado",String(T),!F||this._saving,e=>{this._applyImmediateSetting("neighbor_advert_interval",Number(e.target.value),"Neighbour Advert")},P,!Q||null!==this._repeaterQuickBusy,e=>{this._applyRepeaterQuickSetting("mesh_time_sync",e.target.checked)},Q?P?"Ativo":"Desligado":"Não suportada",null!==(C=null===(B=I.server_auth)||void 0===B?void 0:B.acl_count)&&void 0!==C?C:"—",null!==(S=I.server_auth)&&void 0!==S&&S.supported?Zn(za||(za=on`
            <div style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px 10px;align-items:end;">
              <div>
                <label class="form-label">
                  Admin password
                  <span style="margin-left:6px;font-size:10px;color:${0};">
                    ${0}
                  </span>
                </label>
                <input
                  class="form-input"
                  type="password"
                  maxlength="15"
                  autocomplete="new-password"
                  placeholder=${0}
                  .value=${0}
                  ?disabled=${0}
                  @input=${0}
                />
              </div>
              <div style="display:flex;gap:6px;">
                <button
                  class="apply-button"
                  style="width:auto;min-width:76px;padding:7px 12px;margin:0;"
                  ?disabled=${0}
                  @click=${0}>
                  ${0}
                </button>
                <button
                  class="action-btn"
                  style="min-width:66px;"
                  ?disabled=${0}
                  @click=${0}>
                  Limpar
                </button>
              </div>

              <div>
                <label class="form-label">
                  Guest password
                  <span style="margin-left:6px;font-size:10px;color:${0};">
                    ${0}
                  </span>
                </label>
                <input
                  class="form-input"
                  type="password"
                  maxlength="15"
                  autocomplete="new-password"
                  placeholder=${0}
                  .value=${0}
                  ?disabled=${0}
                  @input=${0}
                />
              </div>
              <div style="display:flex;gap:6px;">
                <button
                  class="apply-button"
                  style="width:auto;min-width:76px;padding:7px 12px;margin:0;"
                  ?disabled=${0}
                  @click=${0}>
                  ${0}
                </button>
                <button
                  class="action-btn"
                  style="min-width:66px;"
                  ?disabled=${0}
                  @click=${0}>
                  Limpar
                </button>
              </div>
            </div>

            ${0}

            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:12px;padding-top:10px;border-top:1px solid var(--divider-color);">
              <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.4;">
                Admin permite remote CLI e gestão completa. Guest permite operações limitadas ao perfil Guest.
              </div>
              <button
                class="danger-button"
                style="white-space:nowrap;"
                ?disabled=${0}
                @click=${0}>
                ${0}
              </button>
            </div>
          `),I.server_auth.admin_password_set?"var(--success-color, #2e7d32)":"var(--secondary-text-color)",I.server_auth.admin_password_set?"configurada":"não configurada",I.server_auth.admin_password_set?"••••••••":"Definir password",this._adminPasswordDraft,null!==this._repeaterAccessBusy,e=>{this._adminPasswordDraft=e.target.value},null!==this._repeaterAccessBusy||!this._adminPasswordDraft,()=>this._saveRepeaterPassword("admin"),"admin"===this._repeaterAccessBusy?"A guardar...":"Guardar",null!==this._repeaterAccessBusy||!I.server_auth.admin_password_set,()=>this._clearRepeaterPassword("admin"),I.server_auth.guest_password_set?"var(--success-color, #2e7d32)":"var(--secondary-text-color)",I.server_auth.guest_password_set?"configurada":"não configurada",I.server_auth.guest_password_set?"••••••••":"Definir password",this._guestPasswordDraft,null!==this._repeaterAccessBusy,e=>{this._guestPasswordDraft=e.target.value},null!==this._repeaterAccessBusy||!this._guestPasswordDraft,()=>this._saveRepeaterPassword("guest"),"guest"===this._repeaterAccessBusy?"A guardar...":"Guardar",null!==this._repeaterAccessBusy||!I.server_auth.guest_password_set,()=>this._clearRepeaterPassword("guest"),this._renderRepeaterAcl(I),null!==this._repeaterAccessBusy||!(null!==(k=I.server_auth.acl_count)&&void 0!==k&&k),this._confirmClearRepeaterAcl,"acl"===this._repeaterAccessBusy?"A limpar...":"Limpar ACL"):Zn(Ha||(Ha=on`
            <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
              Atualiza o firmware HiveFW para ativar passwords Admin/Guest e gestão da ACL local.
            </div>
          `)),N,!(null!=$&&$.supported),e=>{this._applyImmediateSetting("owner_info",e.target.value,"Owner Info")},this._renderRadioSettings(),null!=z&&z.supported?Zn($a||($a=on`
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 10px;">
              <div>
                <label class="form-label">Flood Max</label>
                <input class="form-input" type="number" min="0" max="64"
                  .value=${0}
                  @change=${0} />
              </div>
              <div>
                <label class="form-label">Flood Max Unscoped</label>
                <input class="form-input" type="number" min="0" max="64"
                  .value=${0}
                  @change=${0} />
              </div>
              <div>
                <label class="form-label">Flood Max Adverts</label>
                <input class="form-input" type="number" min="0" max="64"
                  .value=${0}
                  @change=${0} />
              </div>
              <div>
                <label class="form-label">Loop Detect</label>
                <select class="form-select"
                  .value=${0}
                  @change=${0}>
                  <option value="0">Off</option>
                  <option value="1">Minimal</option>
                  <option value="2">Moderate</option>
                  <option value="3">Strict</option>
                </select>
              </div>
              <div>
                <label class="form-label">Multi ACK</label>
                <select class="form-select"
                  .value=${0}
                  @change=${0}>
                  <option value="0">Desligado</option>
                  <option value="1">Ligado</option>
                </select>
              </div>
            </div>
          `),String(L),e=>{this._applyImmediateSetting("flood_max",Number(e.target.value),"Flood Max")},String(G),e=>{this._applyImmediateSetting("flood_max_unscoped",Number(e.target.value),"Flood Max Unscoped")},String(Y),e=>{this._applyImmediateSetting("flood_max_advert",Number(e.target.value),"Flood Max Adverts")},String(K),e=>{this._applyImmediateSetting("loop_detect",Number(e.target.value),"Loop Detect")},String(O),e=>{this._applyImmediateSetting("multi_acks",Number(e.target.value),"Multi ACK")}):Zn(Na||(Na=on`
            <div style="font-size:11px;color:var(--secondary-text-color);">
              Este firmware não expõe Flood Limits / Loop Detect pelo Companion.
            </div>
          `)),null!=H&&H.supported?Zn(La||(La=on`
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px 10px;">
              <div>
                <label class="form-label">RX Delay</label>
                <input
                  class="form-input"
                  type="number"
                  min="0"
                  max="20"
                  step="0.001"
                  .value=${0}
                  @change=${0}
                />
                <div style="font-size:10px;color:var(--secondary-text-color);margin-top:3px;line-height:1.35;">
                  Atraso base de receção/retransmissão.
                </div>
              </div>
              <div>
                <label class="form-label">CAD</label>
                <select class="form-select"
                  .value=${0}
                  @change=${0}>
                  <option value="0">Desligado</option>
                  <option value="1">Ligado</option>
                </select>
              </div>
              <div>
                <label class="form-label">Interference Threshold</label>
                <input class="form-input" type="number" min="0" max="255"
                  .value=${0}
                  @change=${0} />
              </div>
              <div>
                <label class="form-label">AGC Reset (s)</label>
                <input class="form-input" type="number" min="0" max="1020" step="4"
                  .value=${0}
                  @change=${0} />
              </div>
              <div>
                <label class="form-label">Flood TX Delay</label>
                <input class="form-input" type="number" min="0" max="2" step="0.001"
                  .value=${0}
                  @change=${0} />
              </div>
              <div>
                <label class="form-label">Direct TX Delay</label>
                <input class="form-input" type="number" min="0" max="2" step="0.001"
                  .value=${0}
                  @change=${0} />
              </div>
              <div data-hive-duty-cycle-control style="grid-column:1 / -1;">
                <label class="form-label">Duty Cycle</label>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                  <select
                    class="form-select"
                    style="width:72px;min-width:72px;flex:0 0 72px;"
                    .value=${0}
                    ?disabled=${0}
                    @change=${0}>
                    ${0}
                  </select>
                  <button
                    class="action-btn"
                    style="min-width:58px;"
                    ?disabled=${0}
                    @click=${0}>
                    ${0}
                  </button>
                  <button
                    class="apply-button"
                    style="width:auto;min-width:66px;margin:0;padding:7px 12px;"
                    ?disabled=${0}
                    @click=${0}>
                    ${0}
                  </button>
                </div>
              </div>
            </div>
          `),String(U),e=>{this._applyImmediateSetting("rx_delay",Number(e.target.value),"RX Delay")},j?"1":"0",e=>{this._applyImmediateSetting("cad_enabled","1"===e.target.value,"CAD")},String(W),e=>{this._applyImmediateSetting("interference_threshold",Number(e.target.value),"Interference Threshold")},String(J),e=>{this._applyImmediateSetting("agc_reset_interval",Number(e.target.value),"AGC Reset")},String(q),e=>{this._applyImmediateSetting("flood_tx_delay",Number(e.target.value),"Flood TX Delay")},String(V),e=>{this._applyImmediateSetting("direct_tx_delay",Number(e.target.value),"Direct TX Delay")},String(this._dutyCycleValue),null!==this._dutyCycleBusy,e=>{this._dutyCycleValue=Number(e.target.value)},Array.from({length:41},(e,t)=>t+10).map(e=>Zn(Ga||(Ga=on`<option value=${0}>${0}%</option>`),String(e),e)),null!==this._dutyCycleBusy,this._readDutyCycle,"read"===this._dutyCycleBusy?"A ler…":"Ler",null!==this._dutyCycleBusy,()=>this._applyDutyCycle(),"apply"===this._dutyCycleBusy?"A aplicar…":"Aplicar"):Zn(Ya||(Ya=on`
            <div style="font-size:11px;color:var(--secondary-text-color);">
              Atualiza o firmware HiveFW para ativar os controlos locais de CAD, AGC e delays.
            </div>
          `)))}_renderRepeaterAcl(e){const t=e.server_auth,i=Array.isArray(null==t?void 0:t.acl_entries)?t.acl_entries:[];return Zn(Ka||(Ka=on`
      <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--divider-color);">
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
          <div>
            <div style="font-size:12px;font-weight:600;">ACL persistente</div>
            <div style="font-size:10px;color:var(--secondary-text-color);margin-top:2px;">
              Read Only, Read Write e Admin são identidades guardadas. Guest é transitório e não é persistido.
            </div>
          </div>
          <span style="font-size:11px;color:var(--secondary-text-color);">
            ${0} entrada${0}
          </span>
        </div>

        ${0}

        ${0}
      </div>
    `),i.length,1===i.length?"":"s",null!=t&&t.acl_entries_error?Zn(ja||(ja=on`
          <div style="font-size:11px;color:var(--error-color);margin-bottom:8px;">
            Não foi possível ler a ACL: ${0}
          </div>
        `),t.acl_entries_error):to,i.length?Zn(Wa||(Wa=on`
          <div style="display:flex;flex-direction:column;gap:7px;">
            ${0}
          </div>
        `),i.map(e=>{var t;const i=`acl_perm_${e.public_key}`,s=Number(null!==(t=this._editValues[i])&&void 0!==t?t:e.permissions);return Zn(Ja||(Ja=on`
                <div style="display:grid;grid-template-columns:minmax(115px,1fr) minmax(120px,150px) auto auto;gap:7px;align-items:center;padding:7px;border:1px solid var(--divider-color);border-radius:7px;">
                  <div style="min-width:0;">
                    <div style="font:11px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;overflow-wrap:anywhere;">
                      ${0}
                      <div style="margin-top:10px;padding-top:10px;border-top:1px dashed var(--divider-color);">
          <div style="font-size:11px;font-weight:600;margin-bottom:6px;">Adicionar identidade</div>
          <div style="display:grid;grid-template-columns:minmax(180px,1fr) minmax(120px,150px) auto;gap:7px;align-items:center;">
            <input
              class="form-input"
              type="text"
              maxlength="64"
              placeholder="Public key completa (64 hex)"
              .value=${0}
              ?disabled=${0}
              @input=${0}
            />
            <select
              class="form-select"
              .value=${0}
              ?disabled=${0}
              @change=${0}>
              <option value="1">Read Only</option>
              <option value="2">Read Write</option>
              <option value="3">Admin</option>
            </select>
            <button
              class="action-btn"
              ?disabled=${0}
              @click=${0}>
              Adicionar
            </button>
          </div>
        </div>
      </div>
                    <div style="font-size:9px;color:var(--secondary-text-color);overflow-wrap:anywhere;">
                      ${0}
                    </div>
                  </div>
                  <select
                    class="form-select"
                    .value=${0}
                    ?disabled=${0}
                    @change=${0}>
                    <option value="1">Read Only</option>
                    <option value="2">Read Write</option>
                    <option value="3">Admin</option>
                  </select>
                  <button
                    class="action-btn"
                    ?disabled=${0}
                    @click=${0}>
                    Guardar
                  </button>
                  <button
                    class="danger-button"
                    ?disabled=${0}
                    @click=${0}>
                    Remover
                  </button>
                </div>
              `),e.pubkey_prefix.toUpperCase(),this._aclNewPublicKey,null!==this._repeaterAccessBusy,e=>{this._aclNewPublicKey=e.target.value.trim().replace(/\s+/g,"").toLowerCase()},String(this._aclNewPermissions),null!==this._repeaterAccessBusy,e=>{this._aclNewPermissions=Number(e.target.value)},null!==this._repeaterAccessBusy||!/^[0-9a-f]{64}$/.test(this._aclNewPublicKey),this._addRepeaterAclEntry,e.public_key,String(s),null!==this._repeaterAccessBusy,e=>{this._editValues[i]=Number(e.target.value),this._editValues={...this._editValues}},null!==this._repeaterAccessBusy||s===e.permissions,()=>this._setRepeaterAclEntry(e.public_key,s),null!==this._repeaterAccessBusy,()=>this._confirmRemoveRepeaterAclEntry(e.public_key,e.pubkey_prefix))})):Zn(qa||(qa=on`
          <div style="font-size:11px;color:var(--secondary-text-color);">
            Nenhuma identidade persistida na ACL.
          </div>
        `)))}async _addRepeaterAclEntry(){var e;const t=this._aclNewPublicKey.trim().toLowerCase();/^[0-9a-f]{64}$/.test(t)?(await this._setRepeaterAclEntry(t,this._aclNewPermissions),null!==(e=this._repeaterStatus)&&void 0!==e&&null!==(e=e.server_auth)&&void 0!==e&&null!==(e=e.acl_entries)&&void 0!==e&&e.some(e=>e.public_key===t)&&(this._aclNewPublicKey="",this._aclNewPermissions=1)):this._showStatusMessage("ACL: public key inválida.","error")}async _setRepeaterAclEntry(e,t){if(this.hass){this._repeaterAccessBusy="acl-entry";try{var i;const s=await To(this.hass,{acl_public_key:e,acl_permissions:t},null===(i=this.config)||void 0===i?void 0:i.entry_id);if(!s.success)return void this._showStatusMessage(s.error||"Não foi possível atualizar a ACL.","error");delete this._editValues[`acl_perm_${e}`],this._editValues={...this._editValues},await this._readRepeaterStatus(!1,!1),this._showStatusMessage(0===t?"Entrada ACL removida.":"Permissão ACL atualizada.","success")}catch(e){this._showStatusMessage("ACL: "+String(e),"error")}finally{this._repeaterAccessBusy=null}}}_confirmRemoveRepeaterAclEntry(e,t){this._confirmAction={title:"Remover identidade da ACL",message:`Remover ${t.toUpperCase()} da ACL persistente do Repeater? Esta operação não altera as passwords Admin/Guest.`,onConfirm:()=>this._setRepeaterAclEntry(e,0)},this._confirmDialogOpen=!0}async _readRepeaterStatus(e=!1,t=!1){if(this.hass&&!this._repeaterReadBusy){this._repeaterReadBusy=!0;try{var i;const s=await Po(this.hass,null===(i=this.config)||void 0===i?void 0:i.entry_id);if(this._repeaterStatus=s,void 0!==(null==s?void 0:s.duty_cycle)&&(this._dutyCycleValue=Number(s.duty_cycle)),t){for(const e of["repeat","auto_advert","mesh_time_sync","owner_info","rx_boosted_gain","adc_multiplier","multi_acks","rx_delay","flood_max","flood_max_unscoped","flood_max_advert","loop_detect","cad_enabled","interference_threshold","agc_reset_interval","flood_tx_delay","direct_tx_delay"])delete this._editValues[e];this._editValues={...this._editValues}}this.requestUpdate(),e&&this._showStatusMessage("Configuração do Repeater relida diretamente do rádio.","success")}catch(t){this._repeaterStatus=null,e&&this._showStatusMessage("Leitura da configuração do Repeater: "+String(t),"error")}finally{this._repeaterReadBusy=!1}}}async _refreshRepeaterAccessStatus(){await this._readRepeaterStatus(!1,!1)}async _saveRepeaterPassword(e){var t;if(!this.hass||null===(t=this._repeaterStatus)||void 0===t||null===(t=t.server_auth)||void 0===t||!t.supported)return;const i="admin"===e,s=i?this._adminPasswordDraft:this._guestPasswordDraft;if(s){this._repeaterAccessBusy=e;try{var a;const e=await To(this.hass,{[i?"admin_password":"guest_password"]:s},null===(a=this.config)||void 0===a?void 0:a.entry_id);if(!e.success)return void this._showStatusMessage(e.error||"Não foi possível guardar a password.","error");i?this._adminPasswordDraft="":this._guestPasswordDraft="",await this._refreshRepeaterAccessStatus(),this._showStatusMessage((i?"Admin":"Guest")+" password guardada e verificada.","success")}catch(e){this._showStatusMessage("Acesso remoto: "+String(e),"error")}finally{this._repeaterAccessBusy=null}}}async _clearRepeaterPassword(e){var t;if(!this.hass||null===(t=this._repeaterStatus)||void 0===t||null===(t=t.server_auth)||void 0===t||!t.supported)return;const i="admin"===e;this._repeaterAccessBusy=e;try{var s;const e=await To(this.hass,{[i?"admin_password":"guest_password"]:""},null===(s=this.config)||void 0===s?void 0:s.entry_id);if(!e.success)return void this._showStatusMessage(e.error||"Não foi possível limpar a password.","error");i?this._adminPasswordDraft="":this._guestPasswordDraft="",await this._refreshRepeaterAccessStatus(),this._showStatusMessage((i?"Admin":"Guest")+" password removida.","success")}catch(e){this._showStatusMessage("Acesso remoto: "+String(e),"error")}finally{this._repeaterAccessBusy=null}}_confirmClearRepeaterAcl(){var e,t;const i=null!==(e=null===(t=this._repeaterStatus)||void 0===t||null===(t=t.server_auth)||void 0===t?void 0:t.acl_count)&&void 0!==e?e:0;i&&(this._confirmAction={title:"Limpar ACL do Repeater",message:"Isto remove "+i+" identidade(s) autorizada(s) da ACL persistente. As passwords Admin/Guest não são alteradas. Os clientes terão de autenticar-se novamente.",onConfirm:()=>this._clearRepeaterAcl()},this._confirmDialogOpen=!0)}async _clearRepeaterAcl(){var e;if(this.hass&&null!==(e=this._repeaterStatus)&&void 0!==e&&null!==(e=e.server_auth)&&void 0!==e&&e.supported){this._repeaterAccessBusy="acl";try{var t;const e=await To(this.hass,{clear_acl:!0},null===(t=this.config)||void 0===t?void 0:t.entry_id);if(!e.success)return void this._showStatusMessage(e.error||"Não foi possível limpar a ACL.","error");await this._refreshRepeaterAccessStatus(),this._showStatusMessage("ACL do Repeater limpa e verificada.","success")}catch(e){this._showStatusMessage("ACL: "+String(e),"error")}finally{this._repeaterAccessBusy=null}}}async _applyDutyCycle(e){if(!this.hass)return;const t=Math.max(10,Math.min(50,Math.round(null!=e?e:this._dutyCycleValue)));this._dutyCycleValue=t,this._dutyCycleBusy="apply";try{var i;const e=await async function(e,t,i){const s={type:"hivefw_integration/set_duty_cycle",duty_cycle:t};return i&&(s.entry_id=i),e.callWS(s)}(this.hass,t,null===(i=this.config)||void 0===i?void 0:i.entry_id);this._dutyCycleValue=Number(e.duty_cycle),await this._readRepeaterStatus(!1,!0),this.requestUpdate(),this._showStatusMessage(`Duty Cycle aplicado e confirmado: ${e.duty_cycle}%`,"success")}catch(e){const t=e,i=null!=t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e);this._showStatusMessage(`Duty Cycle: ${i}`,"error")}finally{this._dutyCycleBusy=null}}async _applyRepeaterSettings(){var e,t;if(!this.hass||null===(e=this._repeaterStatus)||void 0===e||!e.supported)return;const i=this._repeaterStatus,s={};void 0!==this._editValues.multi_acks&&(s.multi_acks=Number(this._editValues.multi_acks)),void 0!==this._editValues.rx_delay&&(s.rx_delay=Number(this._editValues.rx_delay)),null!==(t=i.repeater_profile)&&void 0!==t&&t.supported&&void 0!==this._editValues.owner_info&&(s.owner_info=String(this._editValues.owner_info));for(const e of["path_hash_mode","flood_max","flood_max_unscoped","flood_max_advert","loop_detect","interference_threshold","agc_reset_interval","flood_tx_delay","direct_tx_delay"])void 0!==this._editValues[e]&&(s[e]=Number(this._editValues[e]));if(void 0!==this._editValues.cad_enabled&&(s.cad_enabled=Boolean(this._editValues.cad_enabled)),0!==Object.keys(s).length){this._saving=!0;try{var a;const e=await To(this.hass,s,null===(a=this.config)||void 0===a?void 0:a.entry_id);if(!e.success)return void this._showStatusMessage(e.error||"Failed to apply Repeater settings","error");for(const e of["owner_info","rx_boosted_gain","adc_multiplier","multi_acks","rx_delay","flood_max","flood_max_unscoped","flood_max_advert","loop_detect","cad_enabled","interference_threshold","agc_reset_interval","flood_tx_delay","direct_tx_delay"])delete this._editValues[e];this._editValues={...this._editValues},await this._loadDeviceConfig(),this._showStatusMessage("Repeater settings applied and verified","success")}catch(e){this._showStatusMessage(`Repeater settings: ${String(e)}`,"error")}finally{this._saving=!1}}else this._showStatusMessage("No Repeater settings changed","success")}_renderIdentityManagement(){var e;return this._deviceConfig?Zn(Va||(Va=on`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div class="danger-zone" style="margin-top: 0;">
          <div class="danger-zone-title">Rename Device</div>
          <div style="font-size: 12px; color: var(--secondary-text-color); margin-bottom: 8px;">
            Changing the device name will change all entity IDs. Automations, scripts, and dashboards using current entity IDs will need to be updated.
          </div>
          <div style="display: flex; gap: 8px;">
            <input
              type="text"
              class="form-input"
              style="flex: 1;"
              .value=${0}
              @input=${0}
            />
            <button class="danger-button"
              ?disabled=${0}
              @click=${0}>
              Rename
            </button>
          </div>
        </div>
        <div class="danger-zone" style="margin-top: 0;">
          <div class="danger-zone-title">Regenerate Identity</div>
          <div style="font-size: 12px; color: var(--secondary-text-color); margin-bottom: 8px;">
            Creates a new key pair. All contacts will need to re-add you. This will change all entity IDs — automations, scripts, and dashboards using current entity IDs will need to be updated.
          </div>
          <button class="danger-button" @click=${0}>
            Regenerate Identity
          </button>
        </div>
        <div class="danger-zone" style="margin-top: 0;">
          <div class="danger-zone-title">Import Private Key</div>
          <div style="font-size: 12px; color: var(--secondary-text-color); margin-bottom: 8px;">
            Importing a key changes the device identity. This will change all entity IDs — automations, scripts, and dashboards using current entity IDs will need to be updated.
          </div>
          <div style="display: flex; gap: 8px;">
            <input
              type="text"
              class="form-input"
              style="flex: 1; font-family: monospace;"
              placeholder="Hex private key"
              .value=${0}
              @input=${0}
            />
            <button
              class="danger-button"
              ?disabled=${0}
              @click=${0}>
              Import
            </button>
          </div>
        </div>
      </div>
    `),null!==(e=this._editValues.name)&&void 0!==e?e:this._deviceConfig.name,e=>{this._editValues.name=e.target.value},!this._editValues.name||this._editValues.name===this._deviceConfig.name,this._handleNameSave,this._showRegenIdentityConfirm,this._importKeyValue,e=>{this._importKeyValue=e.target.value},!this._importKeyValue.trim(),this._handleImportKeyConfirm):to}_hasChanges(e,t){return!!this._deviceConfig&&t.some(e=>void 0!==this._editValues[e]&&this._editValues[e]!==this._deviceConfig[e])}async _handleApply(e){if(!this.hass||!this._deviceConfig)return;let t=[];switch(e){case"device-name":t=["name"];break;case"radio-settings":t=["tx_power","frequency","bandwidth","spreading_factor","coding_rate","path_hash_mode","rx_boosted_gain","adc_multiplier"]}const i={};for(const e of t)void 0!==this._editValues[e]&&(i[e]=this._editValues[e]);this._saving=!0;try{var s;const a=await To(this.hass,i,null===(s=this.config)||void 0===s?void 0:s.entry_id);if(a.success){this._deviceConfig&&(this._deviceConfig={...this._deviceConfig,...i});for(const e of t)delete this._editValues[e];this._editValues={...this._editValues},"radio-settings"===e&&("rx_boosted_gain"in i||"adc_multiplier"in i)&&await this._readRepeaterStatus(!1,!1),a.rename?this._renameSuccess=a.rename:this._showStatusMessage(`Saved: ${t.join(", ")}`,"success")}else this._showStatusMessage("Save failed","error")}catch(e){this._showStatusMessage(`Error: ${String(e)}`,"error")}finally{this._saving=!1}}async _copyToClipboard(e){try{await navigator.clipboard.writeText(e),this._showStatusMessage("Copied to clipboard","success")}catch(e){this._showStatusMessage("Failed to copy","error")}}_showStatusMessage(e,t){this._statusMessage={text:e,type:t},null!==this._statusMessageTimeout&&clearTimeout(this._statusMessageTimeout),this._statusMessageTimeout=window.setTimeout(()=>{this._statusMessage=null,this._statusMessageTimeout=null},5e3)}_handleNameSave(){var e;const t=this._editValues.name,i=null===(e=this._deviceConfig)||void 0===e?void 0:e.name;if(void 0===t||t===i)return;const s=e=>(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,""),a=s(null!=i?i:""),r=s(String(t));this._confirmAction={title:"Rename Device",message:`Renaming the device will rename all entity IDs ending in _${a} to _${r}. Any automations, scripts, or dashboards referencing entity IDs by the old name will need updating. A repair issue will list every renamed entity. Continue?`,onConfirm:async()=>{await this._handleApply("device-name")}},this._confirmDialogOpen=!0}async _applyLocation(){if(this.hass&&this._deviceConfig){this._saving=!0;try{var e;const i=["latitude","longitude"],s={};if("ha_location"===this._locationSource){const e=this.hass.states["zone.home"];if(!e||null==e.attributes.latitude||null==e.attributes.longitude)return void this._showStatusMessage("Could not read zone.home coordinates from Home Assistant","error");s.latitude=e.attributes.latitude,s.longitude=e.attributes.longitude}else for(const e of i)void 0!==this._editValues[e]&&(s[e]=this._editValues[e]);if(Object.keys(s).length>0){var t;if(!(await To(this.hass,s,null===(t=this.config)||void 0===t?void 0:t.entry_id)).success)return void this._showStatusMessage("Failed to save coordinates","error");this._deviceConfig&&(this._deviceConfig={...this._deviceConfig,...s});for(const e of i)delete this._editValues[e];this._editValues={...this._editValues}}if(!(await Lo(this.hass,this._locationSource,null===(e=this.config)||void 0===e?void 0:e.entry_id)).success)return void this._showStatusMessage("Failed to update location source","error");await this._loadDeviceConfig(),this._showStatusMessage("Location settings applied","success")}catch(e){this._showStatusMessage(`Error: ${String(e)}`,"error")}finally{this._saving=!1}}}_showRegenIdentityConfirm(){this._confirmAction={title:"Regenerate Identity",message:"This will create a new cryptographic identity, reboot the device, and migrate all entity IDs to the new key prefix. Existing automations referencing entity IDs by the old prefix will need updating. All contacts must re-add this device. This cannot be undone.",requireTyped:"REGENERATE",onConfirm:async()=>{var e;this.hass&&this._startIdentityFlow("regenerate",{type:"hivefw_integration/regenerate_identity",payload:null!==(e=this.config)&&void 0!==e&&e.entry_id?{entry_id:this.config.entry_id}:{}})}},this._confirmDialogOpen=!0}_handleImportKeyConfirm(){const e=this._importKeyValue.trim().replace(/\s+/g,"");e&&(64===e.length||128===e.length?/^[0-9a-fA-F]+$/.test(e)?(this._confirmAction={title:"Import Private Key",message:"Importing a private key will replace the device identity, reboot the device, and migrate all entity IDs to the new key prefix. Existing automations referencing entity IDs by the old prefix will need updating. All contacts must re-add this device.",requireTyped:"IMPORT",onConfirm:()=>this._importIdentityKey()},this._confirmDialogOpen=!0):this._showStatusMessage("Private key must be hex (0-9, a-f)","error"):this._showStatusMessage("Private key must be 64 or 128 hex characters","error"))}async _importIdentityKey(){var e;if(!this.hass||!this._importKeyValue.trim())return;const t=this._importKeyValue.trim().replace(/\s+/g,"");this._importKeyValue="";const i={private_key:t};null!==(e=this.config)&&void 0!==e&&e.entry_id&&(i.entry_id=this.config.entry_id),this._startIdentityFlow("import",{type:"hivefw_integration/import_identity",payload:i})}_startIdentityFlow(e,t){if(!this.hass)return;this._identityFlowUnsubscribe&&(this._identityFlowUnsubscribe(),this._identityFlowUnsubscribe=null),this._identityFlowState={kind:"progress",flow:e,currentStep:"generating",completedSteps:new Set};const{unsubscribe:i}=function(e,t,i,s){let a,r=null;const n=new Promise(e=>{a=e});let o={success:!1,code:"unknown",message:"Identity flow terminated without a result event."};return e.connection.subscribeMessage(e=>{if("done"===e.step&&e.success&&e.old_pubkey&&e.new_pubkey){const t={success:!0,old_pubkey:e.old_pubkey,new_pubkey:e.new_pubkey,warning:e.warning};o=t,s({type:"result",data:t})}else"done"!==e.step&&s({type:"progress",step:e.step})},{type:t,...i}).then(e=>{r=e,a(o)}).catch(e=>{const t={success:!1,code:e.code||"error",message:e.message||"Identity flow failed."};s({type:"error",data:t}),a(t)}),{unsubscribe:()=>{r&&r()},done:n}}(this.hass,t.type,t.payload,t=>{if("progress"===t.type){if("progress"!==this._identityFlowState.kind)return;const e=new Set(this._identityFlowState.completedSteps);e.add(this._identityFlowState.currentStep),this._identityFlowState={...this._identityFlowState,currentStep:t.step,completedSteps:e}}else"result"===t.type?this._identityFlowState={kind:"success",flow:e,oldPubkey:t.data.old_pubkey,newPubkey:t.data.new_pubkey,warning:t.data.warning}:"error"===t.type&&(this._identityFlowState={kind:"failure",flow:e,code:t.data.code,message:t.data.message})});this._identityFlowUnsubscribe=i}_closeIdentityFlowModal(){this._identityFlowUnsubscribe&&(this._identityFlowUnsubscribe(),this._identityFlowUnsubscribe=null);const e="success"===this._identityFlowState.kind;this._identityFlowState={kind:"closed"},e&&this._loadDeviceConfig()}_renderIdentityFlowModal(){const e=this._identityFlowState;if("closed"===e.kind)return to;const t="regenerate"===e.flow?"Regenerate Identity":"Import Private Key",i="regenerate"===e.flow?"Regenerating Identity":"Importing Identity",s="regenerate"===e.flow?"Identity Regenerated":"Identity Imported",a="regenerate"===e.flow?"Identity Regeneration Failed":"Identity Import Failed";let r,n;"progress"===e.kind?(r=Zn(Za||(Za=on`
        <div style="font-size: 13px; color: var(--secondary-text-color); margin-bottom: 16px;">
          This typically takes 5–10 seconds. Please don't close this dialog.
        </div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
          ${0}
        </ul>
      `),mm.map(t=>{const i=e.completedSteps.has(t.step),s=e.currentStep===t.step;let a="○",r="var(--secondary-text-color)";return i?(a="✓",r="var(--success-color, #28a745)"):s&&(a="⏳",r="var(--primary-color)"),Zn(Xa||(Xa=on`
              <li style="display: flex; align-items: center; gap: 8px; color: ${0}; font-size: 14px;">
                <span style="font-family: monospace; width: 1em;">${0}</span>
                <span>${0}</span>
              </li>
            `),r,a,t.label)})),n=to):"success"===e.kind?(r=Zn(er||(er=on`
        <div style="font-size: 32px; text-align: center; margin-bottom: 8px;">✅</div>
        <div style="font-size: 14px; margin-bottom: 16px;">
          The device's identity has been replaced and verified.
        </div>
        <div style="font-family: monospace; font-size: 12px; background: var(--card-background-color, #f5f5f5); padding: 8px 12px; border-radius: 4px; margin-bottom: 12px;">
          <div><span style="color: var(--secondary-text-color);">Old key:</span> ${0}…</div>
          <div><span style="color: var(--secondary-text-color);">New key:</span> ${0}… <span style="color: var(--success-color, #28a745); font-size: 11px;">(verified after reload)</span></div>
        </div>
        ${0}
      `),e.oldPubkey.slice(0,12),e.newPubkey.slice(0,12),e.warning?Zn(tr||(tr=on`
          <div style="font-size: 13px; color: var(--secondary-text-color); margin-top: 12px; padding: 8px 12px; border-left: 3px solid var(--warning-color, #f0ad4e); background: var(--warning-color-bg, rgba(240, 173, 78, 0.08));">
            <strong>Follow-up:</strong>
            <ul style="margin: 4px 0 0 16px; padding: 0;">
              <li>${0}</li>
              <li>Check Settings → Repairs for the entity-ID migration list.</li>
            </ul>
          </div>
        `),e.warning):to),n=Zn(ir||(ir=on`
        <button class="modal-action" @click=${0}>Close</button>
      `),this._closeIdentityFlowModal)):(r=Zn(sr||(sr=on`
        <div style="font-size: 32px; text-align: center; margin-bottom: 8px;">❌</div>
        <div style="font-size: 14px; margin-bottom: 12px;">
          ${0}
        </div>
        <div style="font-family: monospace; font-size: 12px; background: var(--card-background-color, #f5f5f5); padding: 8px 12px; border-radius: 4px;">
          <div><span style="color: var(--secondary-text-color);">Error code:</span> ${0}</div>
          <div style="margin-top: 4px; word-break: break-word;"><span style="color: var(--secondary-text-color);">Message:</span> ${0}</div>
        </div>
      `),"regenerate"===e.flow?"The device firmware rejected the new key. Your device identity is unchanged.":"The import did not take effect. Your device identity may be unchanged.",e.code,e.message),n=Zn(ar||(ar=on`
        <button class="modal-action" @click=${0}>Close</button>
      `),this._closeIdentityFlowModal));const o="progress"===e.kind?i:"success"===e.kind?s:a;return Zn(rr||(rr=on`
      <div class="modal-overlay">
        <div class="modal-card" data-a11y="identity-flow"
             role="dialog" aria-modal="true" aria-label=${0}
             style="max-width: 480px;"
             @click=${0}>
          <div class="modal-header">
            <span class="modal-title">${0}</span>
            ${0}
          </div>
          <div class="modal-body" style="padding: 20px;">
            ${0}
            ${0}
          </div>
        </div>
      </div>
    `),t,e=>e.stopPropagation(),o,"progress"===e.kind?to:Zn(nr||(nr=on`
              <button class="modal-close" aria-label="Close" @click=${0}>&times;</button>
            `),this._closeIdentityFlowModal),r,n?Zn(or||(or=on`<div style="margin-top: 20px; display: flex; justify-content: flex-end;">${0}</div>`),n):to)}_closeRenameSuccessModal(){this._renameSuccess=null,this._loadDeviceConfig(),this.dispatchEvent(new CustomEvent("device-renamed",{bubbles:!0,composed:!0}))}_renderRenameSuccessModal(){const e=this._renameSuccess;return e?Zn(lr||(lr=on`
      <div class="dialog-overlay">
        <div class="dialog"
             role="dialog" aria-modal="true" aria-label="Device renamed"
             data-a11y="rename-success"
             @click=${0}>
          <div class="dialog-header">
            <div class="dialog-header-title">Device renamed</div>
          </div>
          <div class="dialog-body">
            <p style="margin: 0 0 12px 0;">
              The HiveFW device was renamed from
              <code>${0}</code> to <code>${0}</code>.
            </p>
            <p style="margin: 0 0 12px 0;">
              ${0}
              ${0}
              automatically migrated from the
              <code>_${0}</code> suffix to
              <code>_${0}</code>.
            </p>
            <p style="margin: 0 0 12px 0;">
              If you have automations, scripts, or dashboards
              referencing the old entity IDs, you will need to
              update them manually to use the new suffix.
            </p>
            <p style="margin: 0; color: var(--secondary-text-color); font-size: 13px;">
              The full list of renamed entity IDs is available in
              Settings → Repairs.
            </p>
          </div>
          <div class="dialog-footer">
            <button class="dialog-button primary"
                    @click=${0}>Close</button>
          </div>
        </div>
      </div>
    `),e=>e.stopPropagation(),e.old_name,e.new_name,e.count,1===e.count?"entity ID was":"entity IDs were",e.old_suffix,e.new_suffix,this._closeRenameSuccessModal):to}async _onConfirmAction(){if(this._confirmDialogOpen=!1,this._confirmAction)try{await this._confirmAction.onConfirm()}catch(e){this._error=`Error: ${String(e)}`}this._confirmAction=null}_onConfirmCancel(){this._confirmDialogOpen=!1,this._confirmAction=null}};_m.styles=[Eo,gn(cr||(cr=on`
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      .settings-page {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--primary-background-color, #fafafa);
      }

      .settings-container {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-y: contain;
      }

      .settings-container::-webkit-scrollbar {
        width: 6px;
      }

      .settings-container::-webkit-scrollbar-track {
        background: transparent;
      }

      .settings-container::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb, var(--scrollbar-thumb-color, #c1c1c1));
        border-radius: 3px;
      }

      .section-row {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
      }

      .section-row.full {
        flex: 1;
      }

      .form-group-inline {
        flex: 1 1 0;
        min-width: 0;
        max-width: 100%;
      }

      .danger-zone {
        margin-top: 16px;
        padding: 12px;
        border: 2px solid var(--error-color, #db4437);
        border-radius: 8px;
        background: rgba(219, 68, 55, 0.05);
      }

      .danger-zone-title {
        font-size: 13px;
        font-weight: 600;
        color: var(--error-color, #db4437);
        margin-bottom: 12px;
      }

      .danger-zone-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .info-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .info-row:last-child {
        border-bottom: none;
      }

      .info-label {
        font-size: 13px;
        color: var(--secondary-text-color);
        font-weight: 500;
      }

      .info-value {
        font-size: 13px;
        color: var(--primary-text-color);
        font-family: monospace;
        font-weight: 500;
        word-break: break-all;
      }

      .settings-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px;
        margin-bottom: 16px;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
      }

      .settings-grid > *,
      .device-section,
      .section-row,
      .managed-device-row {
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
      }

      .settings-grid > .device-section {
        margin-bottom: 0;
      }

      .managed-devices-card {
        grid-column: 1 / -1;
      }

      .managed-devices-summary {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 12px;
      }

      .managed-devices-chip {
        padding: 5px 9px;
        border-radius: 999px;
        background: var(--secondary-background-color, #f5f5f5);
        color: var(--secondary-text-color);
        font-size: 11px;
        font-weight: 600;
      }

      .managed-device-list {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .repeater-setup-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: 10px;
      }

      .backup-restore-card {
        grid-column: 1 / -1;
        width: 100%;
      }

      .backup-restore-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
        width: 100%;
      }

      .backup-restore-panel {
        width: 100%;
        min-width: 0;
        height: 100%;
        box-sizing: border-box;
        padding: 12px;
        border: 1px solid var(--divider-color);
        border-radius: 8px;
      }

      .repeater-region-form {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px 10px;
        margin-bottom: 8px;
      }

      .managed-device-row {
        display: grid;
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
        gap: 10px;
        padding: 11px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 10px;
        background: var(--primary-background-color);
      }

      .managed-device-icon {
        width: 34px;
        height: 34px;
        display: grid;
        place-items: center;
        border-radius: 9px;
        background: color-mix(in srgb, var(--primary-color) 10%, transparent);
        color: var(--primary-color);
        font-size: 16px;
        font-weight: 700;
      }

      .managed-device-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        font-weight: 600;
      }

      .managed-device-meta {
        margin-top: 3px;
        color: var(--secondary-text-color);
        font-size: 10px;
      }

      .managed-device-state {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
        font-size: 10px;
        font-weight: 650;
      }

      .managed-device-state.online { color: #2e7d32; }
      .managed-device-state.offline { color: var(--secondary-text-color); }

      @media (max-width: 870px) {
        .managed-device-list,
        .repeater-setup-grid,
        .repeater-region-form,
        .backup-restore-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 870px) {
        .settings-container {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .settings-grid {
          grid-template-columns: minmax(0, 1fr);
          gap: 12px;
          width: 100%;
          min-width: 0;
        }

        .device-section {
          padding: 14px;
          width: 100%;
          min-width: 0;
          max-width: 100%;
          overflow-x: hidden;
          box-sizing: border-box;
        }

        .device-section > *,
        .settings-grid > *,
        .managed-device-list,
        .managed-device-row,
        .companion-header,
        .actions-row,
        .danger-zone {
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .device-section input:not([type="checkbox"]):not([type="radio"]),
        .device-section select,
        .device-section textarea {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .device-meta,
        .managed-device-meta,
        .info-value,
        .form-label {
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .section-row {
          flex-direction: column;
          align-items: stretch;
          gap: 8px;
          width: 100%;
        }

        .form-group-inline,
        .form-input,
        .form-select,
        .apply-button {
          width: 100%;
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
        }

        .info-row {
          align-items: flex-start;
          gap: 8px;
          flex-wrap: wrap;
        }

        .info-label,
        .info-value {
          min-width: 0;
          max-width: 100%;
        }

        .info-value {
          margin-left: auto;
          text-align: right;
          overflow-wrap: anywhere;
        }

        .managed-device-row {
          grid-template-columns: auto minmax(0, 1fr);
          align-items: start;
        }

        .managed-device-row > div:last-child {
          grid-column: 2;
          display: flex !important;
          flex-wrap: wrap;
          justify-content: flex-start;
          min-width: 0;
        }

        .action-btn {
          max-width: 100%;
          white-space: normal;
          text-align: center;
        }

        .danger-zone,
        pre {
          min-width: 0;
          max-width: 100%;
          box-sizing: border-box;
          overflow-wrap: anywhere;
        }

        .modal-card {
          width: calc(100vw - 24px);
          min-width: 0;
          max-width: 400px;
          box-sizing: border-box;
        }
      }

      .card-title {
        font-size: 15px;
        font-weight: 600;
        color: var(--primary-text-color);
        margin-bottom: 16px;
      }

      /* ─── Standalone Firmware Manager ─── */

      .firmware-manager {
        margin-top: 0;
        margin-bottom: 20px;
      }

      .firmware-manager-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
        flex-wrap: wrap;
        margin-bottom: 12px;
      }

      .section-icon.firmware {
        background: color-mix(in srgb, var(--primary-color) 12%, transparent);
        color: var(--primary-color);
      }

      .firmware-host {
        padding: 5px 9px;
        border-radius: 999px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font: 11px ui-monospace, SFMono-Regular, Menlo, monospace;
      }

      .firmware-security {
        display: flex;
        align-items: center;
        gap: 7px;
        padding: 9px 11px;
        border-radius: 9px;
        background: color-mix(in srgb, #2e7d32 9%, transparent);
        color: var(--primary-text-color);
        font-size: 11px;
        margin-bottom: 14px;
      }

      .firmware-status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #2e7d32;
        flex: 0 0 auto;
      }

      .firmware-notice {
        padding: 10px 12px;
        border-radius: 9px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.45;
        margin-bottom: 14px;
      }

      .firmware-notice.warning {
        background: color-mix(in srgb, var(--warning-color, #ff9800) 12%, transparent);
        color: var(--primary-text-color);
      }

      .firmware-actions-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;
      }

      .firmware-action-card {
        min-width: 0;
        padding: 14px;
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        background: var(--primary-background-color);
      }

      .firmware-action-title {
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 5px;
        color: var(--primary-text-color);
      }

      .firmware-action-text {
        min-height: 44px;
        margin-bottom: 12px;
        color: var(--secondary-text-color);
        font-size: 11px;
        line-height: 1.45;
      }

      .firmware-release-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        margin-top: 12px;
        padding: 10px 11px;
        border-radius: 8px;
        background: var(--secondary-background-color);
      }

      .firmware-release-label {
        color: var(--secondary-text-color);
        font-size: 10px;
      }

      .firmware-release-version {
        margin-top: 2px;
        font-size: 14px;
        font-weight: 700;
      }

      .firmware-release-link {
        color: var(--primary-color);
        font-size: 11px;
        font-weight: 600;
        text-decoration: none;
        white-space: nowrap;
      }

      .firmware-primary-action {
        width: 100%;
        margin-top: 10px;
      }

      .firmware-file-picker {
        min-height: 38px;
        display: flex;
        align-items: center;
        width: 100%;
        min-width: 0;
        padding: 8px 10px;
        border: 1px dashed var(--divider-color);
        border-radius: 8px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font-size: 11px;
        cursor: pointer;
        box-sizing: border-box;
        overflow: hidden;
      }

      .firmware-file-picker span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .firmware-file-picker input {
        display: none;
      }

      .firmware-empty {
        margin-top: 12px;
        padding: 10px;
        border-radius: 8px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        font-size: 11px;
      }

      .firmware-progress-state {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 12px;
        padding: 11px 12px;
        border-radius: 9px;
        background: color-mix(in srgb, var(--primary-color) 9%, transparent);
        font-size: 11px;
        line-height: 1.4;
      }

      .firmware-progress-state strong {
        display: block;
        margin-bottom: 2px;
        font-size: 12px;
      }

      .firmware-usb-card {
        margin-top: 14px;
        padding: 14px;
        border: 1px solid var(--divider-color);
        border-radius: 10px;
        background: var(--primary-background-color);
      }

      .firmware-usb-controls {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 10px;
        margin-top: 12px;
      }

      .firmware-usb-field {
        min-width: 0;
      }

      .firmware-usb-field label {
        display: block;
        margin-bottom: 5px;
        color: var(--secondary-text-color);
        font-size: 10px;
        font-weight: 600;
      }

      .firmware-usb-field select {
        width: 100%;
        min-width: 0;
        box-sizing: border-box;
      }

      .firmware-usb-erase {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        margin-top: 12px;
        padding: 10px 11px;
        border-radius: 8px;
        background: color-mix(in srgb, var(--warning-color, #ff9800) 9%, transparent);
        font-size: 11px;
        line-height: 1.4;
      }

      .firmware-usb-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }

      .firmware-usb-progress {
        height: 7px;
        margin-top: 10px;
        overflow: hidden;
        border-radius: 999px;
        background: var(--secondary-background-color);
      }

      .firmware-usb-progress > div {
        height: 100%;
        background: var(--primary-color);
        transition: width .15s ease;
      }

      .firmware-usb-log {
        max-height: 112px;
        overflow: auto;
        margin-top: 10px;
        padding: 9px 10px;
        border-radius: 8px;
        background: var(--secondary-background-color);
        color: var(--secondary-text-color);
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        font: 10px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;
      }

      @media (max-width: 870px) {
        .firmware-actions-grid,
        .firmware-usb-controls {
          grid-template-columns: minmax(0, 1fr);
        }

        .firmware-action-text {
          min-height: 0;
        }
      }

            /* ─── Companion Device Card Styles ─── */

      .device-section {
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 16px;
        width: 100%;
        min-width: 0;
        max-width: 100%;
        box-sizing: border-box;
        overflow: hidden;
      }

      .companion-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 16px;
        gap: 8px;
        flex-wrap: wrap;
      }

      .section-title {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        flex: 1 1 auto;
      }

      .section-title > div:last-child {
        min-width: 0;
        flex: 1 1 auto;
      }

      .section-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        flex-shrink: 0;
      }

      .section-icon.companion {
        background: rgba(3, 169, 244, 0.12);
        color: #0288d1;
      }

      .device-name {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .device-meta {
        font-size: 12px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .device-meta span {
        margin-right: 12px;
      }

      .status-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 600;
        flex-shrink: 0;
        white-space: nowrap;
        max-width: 100%;
      }

      .status-badge.online {
        background: rgba(76, 175, 80, 0.12);
        color: #2e7d32;
      }

      .status-badge.offline {
        background: rgba(114, 114, 114, 0.12);
        color: #616161;
      }

      .status-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
      }

      .status-dot.online {
        background: #4caf50;
      }

      .status-dot.offline {
        background: #9e9e9e;
      }

      .subsection-label {
        font-size: 12px;
        font-weight: 600;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
        margin-top: 16px;
      }

      .sensor-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
        gap: 8px;
      }

      .actions-row {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-top: 16px;
      }

      .action-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        padding: 6px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 6px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        white-space: nowrap;
      }

      .action-btn:hover:not(:disabled) {
        background: var(--secondary-background-color, #f5f5f5);
        border-color: var(--primary-color, #03a9f4);
      }

      .action-btn:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .settings-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        transition: all 0.2s;
        margin-left: 8px;
        flex-shrink: 0;
      }

      .settings-btn:hover {
        background: var(--secondary-background-color, #f0f0f0);
        color: var(--primary-text-color);
      }

      /* Modal overlay */
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.15s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .modal-card {
        background: var(--card-background-color, #fff);
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        width: min(400px, calc(100vw - 24px));
        min-width: 0;
        max-width: 400px;
        max-height: 80vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .modal-title {
        font-size: 16px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .modal-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border: none;
        border-radius: 6px;
        background: transparent;
        color: var(--secondary-text-color);
        cursor: pointer;
        font-size: 18px;
      }

      .modal-close:hover {
        background: var(--secondary-background-color, #f0f0f0);
      }

      .modal-body {
        padding: 8px 0;
        overflow-y: auto;
      }

      .modal-action {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 12px 20px;
        cursor: pointer;
        transition: background 0.15s;
        color: var(--primary-text-color);
        font-size: 14px;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
      }

      .modal-action:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .modal-action.danger {
        color: var(--error-color, #db4437);
      }

      .modal-action-icon {
        display: flex;
        align-items: center;
        color: var(--secondary-text-color);
        flex-shrink: 0;
      }

      .modal-action.danger .modal-action-icon {
        color: var(--error-color, #db4437);
      }

      .modal-action:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      .modal-action:disabled:hover {
        background: none;
      }

      .modal-divider {
        height: 1px;
        background: var(--divider-color, #e0e0e0);
        margin: 4px 0;
      }

      /* Hidden sensors list */
      .hidden-sensor-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .hidden-sensor-item:last-child {
        border-bottom: none;
      }

      .hidden-sensor-name {
        font-size: 13px;
        color: var(--primary-text-color);
      }

      .hidden-sensor-id {
        font-size: 11px;
        color: var(--secondary-text-color);
        margin-top: 2px;
      }

      .unhide-btn {
        padding: 4px 10px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 4px;
        background: var(--card-background-color, #fff);
        color: var(--primary-color, #03a9f4);
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        white-space: nowrap;
      }

      .unhide-btn:hover {
        background: var(--secondary-background-color, #f5f5f5);
      }

      .modal-footer {
        padding: 12px 20px;
        border-top: 1px solid var(--divider-color, #e0e0e0);
        display: flex;
        justify-content: flex-end;
      }

      .empty-hidden {
        padding: 20px;
        text-align: center;
        color: var(--secondary-text-color);
        font-size: 13px;
      }

      /* Status toast */
      .status-toast {
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 8px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font-size: 13px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
      }

      .status-toast.success {
        border-left: 4px solid #4caf50;
      }

      .status-toast.error {
        border-left: 4px solid var(--error-color, #db4437);
        color: var(--error-color, #db4437);
      }

      @keyframes slideIn {
        from {
          transform: translateY(100%);
          opacity: 0;
        }
        to {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `))],ln([yo({type:Object})],_m.prototype,"hass",void 0),ln([yo({type:Object})],_m.prototype,"config",void 0),ln([yo({type:Boolean})],_m.prototype,"narrow",void 0),ln([yo({type:Object})],_m.prototype,"selectedDevice",void 0),ln([yo({type:Number})],_m.prototype,"contactCount",void 0),ln([yo({type:Number})],_m.prototype,"channelCount",void 0),ln([xo()],_m.prototype,"_deviceConfig",void 0),ln([xo()],_m.prototype,"_repeaterStatus",void 0),ln([xo()],_m.prototype,"_managedDevices",void 0),ln([xo()],_m.prototype,"_scopeDraft",void 0),ln([xo()],_m.prototype,"_scopeGlobal",void 0),ln([xo()],_m.prototype,"_scopeSaving",void 0),ln([xo()],_m.prototype,"_regionTarget",void 0),ln([xo()],_m.prototype,"_regionText",void 0),ln([xo()],_m.prototype,"_regionBusy",void 0),ln([xo()],_m.prototype,"_localRegions",void 0),ln([xo()],_m.prototype,"_localRegionBusy",void 0),ln([xo()],_m.prototype,"_localRegionAction",void 0),ln([xo()],_m.prototype,"_localRegionName",void 0),ln([xo()],_m.prototype,"_localRegionParent",void 0),ln([xo()],_m.prototype,"_regionAction",void 0),ln([xo()],_m.prototype,"_regionName",void 0),ln([xo()],_m.prototype,"_loading",void 0),ln([xo()],_m.prototype,"_error",void 0),ln([xo()],_m.prototype,"_editValues",void 0),ln([xo()],_m.prototype,"_saving",void 0),ln([xo()],_m.prototype,"_firmwareOtaStatus",void 0),ln([xo()],_m.prototype,"_firmwareFile",void 0),ln([xo()],_m.prototype,"_firmwareBusy",void 0),ln([xo()],_m.prototype,"_firmwareChecking",void 0),ln([xo()],_m.prototype,"_firmwareUploadStage",void 0),ln([xo()],_m.prototype,"_usbFlashHardware",void 0),ln([xo()],_m.prototype,"_usbFlashVariant",void 0),ln([xo()],_m.prototype,"_usbFlashSource",void 0),ln([xo()],_m.prototype,"_usbFlashErase",void 0),ln([xo()],_m.prototype,"_usbFlashFile",void 0),ln([xo()],_m.prototype,"_usbFlashBusy",void 0),ln([xo()],_m.prototype,"_usbFlashProgress",void 0),ln([xo()],_m.prototype,"_usbFlashStage",void 0),ln([xo()],_m.prototype,"_usbFlashLog",void 0),ln([xo()],_m.prototype,"_dutyCycleValue",void 0),ln([xo()],_m.prototype,"_dutyCycleBusy",void 0),ln([xo()],_m.prototype,"_adminPasswordDraft",void 0),ln([xo()],_m.prototype,"_guestPasswordDraft",void 0),ln([xo()],_m.prototype,"_repeaterAccessBusy",void 0),ln([xo()],_m.prototype,"_repeaterReadBusy",void 0),ln([xo()],_m.prototype,"_repeaterQuickBusy",void 0),ln([xo()],_m.prototype,"_aclNewPublicKey",void 0),ln([xo()],_m.prototype,"_aclNewPermissions",void 0),ln([xo()],_m.prototype,"_backupBusy",void 0),ln([xo()],_m.prototype,"_confirmAction",void 0),ln([xo()],_m.prototype,"_confirmDialogOpen",void 0),ln([xo()],_m.prototype,"_locationSource",void 0),ln([xo()],_m.prototype,"_importKeyValue",void 0),ln([xo()],_m.prototype,"_identityFlowState",void 0),ln([xo()],_m.prototype,"_renameSuccess",void 0),ln([xo()],_m.prototype,"_statusMessage",void 0),_m=ln([vo("meshcore-settings-page")],_m);let vm=class extends mo{constructor(){super(),this.open=!1,this.contactName="",this.result=null,this.error="",this.availableRepeaters=[],this.targetContact=null,this.pathMode="discovery",this.pathHops=[],this.enteredPath="",this._repeaterFilter="",this._running=!1,this._onPathModeChange=e=>{this.pathMode=e.target.value},this._onExplicitPathInput=e=>{this.enteredPath=e.target.value},this._onRunTrace=()=>{if(!this._canRunTrace())return;const e="discovery"===this.pathMode?void 0:this._buildPathString();this._running=!0,this.dispatchEvent(new CustomEvent("trace-requested",{detail:{pathMode:this.pathMode,path:e},bubbles:!0,composed:!0}))},nl(this,{isOpen:()=>this.open,onEscape:()=>this._close()})}willUpdate(e){if(e.has("open")&&this.open&&!e.get("open")){const e=this.targetContact;if(!e||2!==e.type&&3!==e.type&&4!==e.type)this.pathMode="discovery",this.pathHops=[];else{this.pathMode="select";const t=this._resolveCachedHops(e);this.pathHops=t||[]}this.enteredPath="",this._repeaterFilter="",this._running=!1}(e.has("result")&&this.result||e.has("error")&&this.error)&&(this._running=!1)}_resolveCachedHops(e){var t,i;if(1!==(null!==(t=e.out_path_hash_mode)&&void 0!==t?t:0))return null;const s=(e.out_path||"").toLowerCase(),a=null!==(i=e.out_path_len)&&void 0!==i?i:0;if(!s||a<=0)return null;if(s.length<4*a)return null;const r=[];for(let e=0;e<a;e++){const t=s.substring(4*e,4*(e+1)),i=this.availableRepeaters.find(e=>(e.pubkey_prefix||"").toLowerCase().startsWith(t));if(!i)return null;r.push(i)}return r}render(){return this.open?Zn(hr||(hr=on`
      <div class="dialog-backdrop" @click=${0}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Trace ${0}"
          @click=${0}>
          <div class="dialog-header">
            <div class="dialog-title">Trace ${0}</div>
            <button class="dialog-close" aria-label="Close" @click=${0}>✕</button>
          </div>
          <div class="dialog-content">
            ${0}
          </div>
        </div>
      </div>
    `),this._close,this.contactName,e=>e.stopPropagation(),this.contactName,this._close,this._renderBody()):Zn(dr||(dr=on``))}_renderBody(){return this.error?Zn(pr||(pr=on`<div class="error-box">${0}</div>`),this.error):this.result?this._renderResult(this.result):this._running?Zn(ur||(ur=on`<div class="info-value">Tracing…</div>`)):this._renderInput()}_renderInput(){return Zn(gr||(gr=on`
      <div class="form-group">
        <label class="form-label">Path Type</label>
        <select
          class="form-select"
          .value=${0}
          @change=${0}
        >
          <option value="discovery">Path discovery (auto)</option>
          <option value="select">Select repeaters</option>
          <option value="explicit">Enter path</option>
        </select>
      </div>

      ${0}

      ${0}

      <div class="dialog-actions">
        <button
          class="btn-primary"
          ?disabled=${0}
          @click=${0}
        >
          Run Trace
        </button>
      </div>
    `),this.pathMode,this._onPathModeChange,"discovery"===this.pathMode?Zn(Ar||(Ar=on`<div class="info-item path-hint">
            Flood path discovery will find a route automatically. May time
            out if the target is many hops away or unreachable by flood.
          </div>`)):"select"===this.pathMode?this._renderRepeaterPicker():this._renderExplicitInput(),"discovery"!==this.pathMode&&this._canRunTrace()?Zn(fr||(fr=on`<div class="info-item">
            <div class="info-label">Resolved Path</div>
            <div class="resolved-path">${0}</div>
          </div>`),this._buildPathString()):Zn(mr||(mr=on``)),!this._canRunTrace(),this._onRunTrace)}_renderRepeaterPicker(){var e,t,i;const s=new Set(this.pathHops.map(e=>e.public_key)),a=this._repeaterFilter.trim().toLowerCase(),r=[...this.availableRepeaters].filter(e=>!s.has(e.public_key)).filter(e=>{if(!a)return!0;const t=(e.adv_name||"").toLowerCase(),i=(e.pubkey_prefix||"").toLowerCase();return t.includes(a)||i.startsWith(a)}).sort((e,t)=>(e.adv_name||"").localeCompare(t.adv_name||"")),n=(null===(e=this.targetContact)||void 0===e?void 0:e.adv_name)||(null===(t=this.targetContact)||void 0===t?void 0:t.pubkey_prefix)||"(no target)",o=(null===(i=this.targetContact)||void 0===i||null===(i=i.pubkey_prefix)||void 0===i?void 0:i.substring(0,2).toUpperCase())||"--";return Zn(_r||(_r=on`
      <div class="info-item">
        <div class="info-label">Repeaters (in order, source → target)</div>
        <div class="repeater-picker">
          <div class="picker-column">
            <div class="picker-column-label">Available</div>
            <input
              type="text"
              class="form-input picker-search"
              placeholder="Filter by name or pubkey prefix…"
              .value=${0}
              @input=${0}
              autocomplete="off"
              spellcheck="false"
            />
            <div class="picker-list">
              ${0}
            </div>
          </div>
          <div class="picker-column">
            <div class="picker-column-label">Path</div>
            <div class="picker-list">
              ${0}
            </div>
          </div>
        </div>
      </div>

      <div class="info-item">
        <div class="info-label">Target</div>
        <div class="target-row">
          <span class="target-name">${0}</span>
          <span class="target-hex">${0}</span>
        </div>
      </div>
    `),this._repeaterFilter,e=>{this._repeaterFilter=e.target.value},0===r.length?Zn(vr||(vr=on`<div class="picker-empty">${0}</div>`),a?"No matches":"No repeaters available"):r.map(e=>Zn(wr||(wr=on`
                      <div
                        class="picker-item"
                        @click=${0}
                        title="Add ${0}"
                      >
                        <span class="name">${0}</span>
                        <span class="hop-hex">${0}</span>
                      </div>
                    `),()=>this._addRepeater(e),e.adv_name,e.adv_name||e.pubkey_prefix,e.pubkey_prefix.substring(0,2).toUpperCase())),0===this.pathHops.length?Zn(br||(br=on`<div class="picker-empty">Click a repeater to add (or leave empty for direct-neighbor)</div>`)):this.pathHops.map((e,t)=>Zn(yr||(yr=on`
                      <div class="picker-item">
                        <span class="ordinal">${0}</span>
                        <span class="name">${0}</span>
                        <span class="hop-hex">${0}</span>
                        <button
                          class="picker-item-btn"
                          ?disabled=${0}
                          @click=${0}
                          title="Move up"
                        >▲</button>
                        <button
                          class="picker-item-btn"
                          ?disabled=${0}
                          @click=${0}
                          title="Move down"
                        >▼</button>
                        <button
                          class="picker-item-btn"
                          @click=${0}
                          title="Remove"
                        >✕</button>
                      </div>
                    `),t+1,e.adv_name||e.pubkey_prefix,e.pubkey_prefix.substring(0,2).toUpperCase(),0===t,()=>this._moveRepeater(t,-1),t===this.pathHops.length-1,()=>this._moveRepeater(t,1),()=>this._removeRepeater(t))),n,o)}_renderExplicitInput(){var e,t,i;const s=!!this.enteredPath&&!this._isValidExplicitHops(),a=(null===(e=this.targetContact)||void 0===e?void 0:e.adv_name)||(null===(t=this.targetContact)||void 0===t?void 0:t.pubkey_prefix)||"(no target)",r=(null===(i=this.targetContact)||void 0===i||null===(i=i.pubkey_prefix)||void 0===i?void 0:i.substring(0,2).toUpperCase())||"--";return Zn(xr||(xr=on`
      <div class="info-item">
        <div class="info-label">Outbound Hops (comma-separated hex)</div>
        <input
          type="text"
          class="form-input"
          placeholder="AE  (or AE,CD for multiple hops, or empty for direct neighbor)"
          .value=${0}
          @input=${0}
          autocomplete="off"
          spellcheck="false"
        />
        <div class="path-hint">
          Enter outbound hops only — the target and return hops are added
          automatically.  For a direct-neighbor target, leave this empty.
          Each hop is 2, 4, or 8 hex chars (1, 2, or 4 bytes); all hops
          must be the same width.  1 byte is recommended — 2-byte and
          4-byte hashes may not complete round-trip in some meshes.
        </div>
        ${0}
      </div>
      <div class="info-item">
        <div class="info-label">Target</div>
        <div class="target-row">
          <span class="target-name">${0}</span>
          <span class="target-hex">${0}</span>
        </div>
      </div>
    `),this.enteredPath,this._onExplicitPathInput,Zn(s?Er||(Er=on`<div class="path-error">
              Invalid format — hex pairs separated by commas, all
              the same width (2, 4, or 8 chars).
            </div>`):Cr||(Cr=on``)),a,r)}_addRepeater(e){this.pathHops=[...this.pathHops,e]}_removeRepeater(e){this.pathHops=this.pathHops.filter((t,i)=>i!==e)}_moveRepeater(e,t){const i=e+t;if(i<0||i>=this.pathHops.length)return;const s=[...this.pathHops];[s[e],s[i]]=[s[i],s[e]],this.pathHops=s}_isValidExplicitHops(){const e=this.enteredPath.trim();if(!e)return!0;const t=e.split(",").map(e=>e.trim());if(0===t.length)return!1;const i=t[0].length;if(![2,4,8].includes(i))return!1;const s=/^[0-9a-fA-F]+$/;return t.every(e=>e.length===i&&s.test(e))}_canRunTrace(){return"discovery"===this.pathMode||("select"===this.pathMode?!!this.targetContact:"explicit"===this.pathMode&&!!this.targetContact&&this._isValidExplicitHops())}_buildPathString(){if("select"===this.pathMode){if(!this.targetContact)return"";const e=this.targetContact.pubkey_prefix.substring(0,2).toUpperCase(),t=this.pathHops.map(e=>e.pubkey_prefix.substring(0,2).toUpperCase());return 0===t.length?e:[...t,e,...[...t].reverse()].join(",")}if("explicit"===this.pathMode){if(!this.targetContact)return"";const e=this.targetContact.pubkey_prefix.substring(0,2).toUpperCase(),t=this.enteredPath.trim();if(!t)return e;const i=t.split(",").map(e=>e.trim().toUpperCase());return[...i,e,...[...i].reverse()].join(",")}return""}_renderResult(e){const t=(e.path||[]).filter(e=>e.hash);return Zn(Br||(Br=on`
      <div class="info-item">
        <div class="info-label">Round Trip</div>
        <div class="info-value rtt-value">${0}</div>
      </div>

      <div class="info-item">
        <div class="info-label">Hops</div>
        <div class="info-value">
          ${0}
        </div>
      </div>

      ${0}

      ${0}
    `),e.response_time,0===e.hops?"Direct (0 hops)":`${e.hops}`,null!==e.final_snr&&void 0!==e.final_snr?Zn(Sr||(Sr=on`
            <div class="info-item">
              <div class="info-label">Final SNR (at this device)</div>
              <div class="info-value">${0} dB</div>
            </div>
          `),e.final_snr.toFixed(2)):Zn(kr||(kr=on``)),t.length>0?Zn(Ir||(Ir=on`
            <div class="info-item">
              <div class="info-label">Return Path (per-hop SNR)</div>
              <div class="hop-list">
                ${0}
              </div>
            </div>
          `),t.map((e,t)=>Zn(Rr||(Rr=on`
                    <div class="hop-row">
                      <span>Hop ${0}: ${0}</span>
                      <span>${0} dB</span>
                    </div>
                  `),t+1,e.hash,e.snr.toFixed(2)))):Zn(Mr||(Mr=on``)))}_close(){this.open=!1,this.dispatchEvent(new CustomEvent("trace-dialog-closed",{bubbles:!0,composed:!0}))}};vm.styles=[Eo,gn(Dr||(Dr=on`
    :host { display: contents; }

    .dialog-backdrop {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      animation: fadeIn 0.2s;
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

    .dialog {
      background: var(--card-background-color, #fff);
      border-radius: 8px;
      max-width: 700px;
      width: 90%;
      max-height: 85vh;
      overflow-y: auto;
      box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
      animation: slideUp 0.3s;
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .dialog-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px;
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
    }

    .dialog-title { font-size: 18px; font-weight: 600; color: var(--primary-text-color); }

    .dialog-close {
      background: none; border: none; font-size: 20px; cursor: pointer;
      color: var(--secondary-text-color); padding: 0;
      width: 32px; height: 32px;
      display: flex; align-items: center; justify-content: center;
    }

    .dialog-close:hover { color: var(--primary-text-color); }

    .dialog-content { padding: 16px; }

    .info-item {
      padding: 8px;
      background: var(--primary-background-color, #fafafa);
      border-radius: 6px;
      margin-bottom: 8px;
    }

    .info-label {
      font-size: 11px; color: var(--secondary-text-color, #727272);
      text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;
    }

    .info-value {
      font-size: 13px; color: var(--primary-text-color);
      margin-top: 4px; font-family: monospace;
    }

    .rtt-value {
      font-size: 24px; font-weight: 600;
      font-family: inherit;
      color: var(--primary-color, #03a9f4);
    }

    .hop-list {
      margin-top: 4px;
      font-family: monospace;
      font-size: 12px;
    }

    .hop-row {
      display: flex;
      justify-content: space-between;
      padding: 2px 0;
    }

    .hop-row + .hop-row {
      border-top: 1px dashed var(--divider-color, #e0e0e0);
    }

    .error-box {
      padding: 12px;
      background: rgba(219, 68, 55, 0.08);
      border: 1px solid rgba(219, 68, 55, 0.2);
      border-radius: 6px;
      color: var(--error-color, #db4437);
      font-size: 13px;
    }

    /* Input phase */

    select, input[type="text"] {
      width: 100%;
      padding: 8px 10px;
      margin-top: 4px;
      font-size: 14px;
      color: var(--primary-text-color);
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
      box-sizing: border-box;
      font-family: inherit;
    }

    select:focus, input[type="text"]:focus {
      outline: none;
      border-color: var(--primary-color, #03a9f4);
    }

    input[type="text"] {
      font-family: monospace;
    }

    .path-hint {
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      font-style: italic;
      padding: 8px;
    }

    .path-error {
      margin-top: 6px;
      font-size: 12px;
      color: var(--error-color, #db4437);
    }

    .repeater-picker {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .picker-column {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .picker-column-label {
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 0.5px;
      margin-bottom: 2px;
    }

    .picker-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
      min-height: 60px;
      max-height: 200px;
      overflow-y: auto;
      padding: 4px;
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 4px;
    }

    /* Picker-search uses .form-input for sizing / padding
       / border / border-radius (panel-wide form convention).  Local
       .picker-search only supplies picker-column-specific spacing. */
    .picker-search {
      margin-bottom: 4px;
    }

    .picker-item {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 8px;
      background: var(--primary-background-color, #fafafa);
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      user-select: none;
    }

    .picker-item:hover {
      background: var(--secondary-background-color, #eef);
    }

    .picker-item[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .picker-item .name {
      flex: 1;
      font-family: inherit;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .picker-item .hop-hex {
      font-family: monospace;
      font-size: 11px;
      color: var(--secondary-text-color, #727272);
    }

    .picker-item .ordinal {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 20px;
      height: 20px;
      border-radius: 10px;
      background: var(--primary-color, #03a9f4);
      color: var(--text-primary-color, #fff);
      font-size: 11px;
      font-weight: 600;
      font-family: inherit;
    }

    .picker-item-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      padding: 2px 4px;
      font-size: 14px;
      line-height: 1;
    }

    .picker-item-btn:hover:not(:disabled) {
      color: var(--primary-text-color);
    }

    .picker-item-btn:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }

    .picker-empty {
      padding: 12px 8px;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
      font-style: italic;
      text-align: center;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      padding-top: 8px;
    }

    .btn-primary {
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-primary-color, #fff);
      background: var(--primary-color, #03a9f4);
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-primary:hover:not(:disabled) {
      filter: brightness(0.95);
    }

    .btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .resolved-path {
      margin-top: 4px;
      font-family: monospace;
      font-size: 12px;
      color: var(--primary-text-color);
      background: var(--primary-background-color, #fafafa);
      padding: 6px 8px;
      border-radius: 4px;
      word-break: break-all;
    }

    /* Target row for both Select and Enter-path modes. */
    .target-row {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 10px 12px;
      background: rgba(3, 169, 244, 0.08);
      border: 1px solid rgba(3, 169, 244, 0.25);
      border-radius: 6px;
      font-size: 13px;
      margin-top: 4px;
    }

    .target-row .target-name {
      flex: 1;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .target-row .target-hex {
      font-family: monospace;
      font-size: 12px;
      color: var(--secondary-text-color, #727272);
    }
  `))],ln([yo({type:Boolean})],vm.prototype,"open",void 0),ln([yo({type:String})],vm.prototype,"contactName",void 0),ln([yo({type:Object})],vm.prototype,"result",void 0),ln([yo({type:String})],vm.prototype,"error",void 0),ln([yo({type:Array})],vm.prototype,"availableRepeaters",void 0),ln([yo({type:Object})],vm.prototype,"targetContact",void 0),ln([xo()],vm.prototype,"pathMode",void 0),ln([xo()],vm.prototype,"pathHops",void 0),ln([xo()],vm.prototype,"enteredPath",void 0),ln([xo()],vm.prototype,"_repeaterFilter",void 0),ln([xo()],vm.prototype,"_running",void 0),vm=ln([vo("meshcore-trace-dialog")],vm);let wm=class extends mo{constructor(){super(),this.open=!1,this.contacts=[],this._typeFilter="all",this._search="",this._onTypeChange=e=>{this._typeFilter=e.target.value},this._onSearchInput=e=>{this._search=e.target.value},this._close=()=>{this.dispatchEvent(new CustomEvent("target-picker-closed",{bubbles:!0,composed:!0}))},nl(this,{isOpen:()=>this.open,onEscape:()=>this._close()})}willUpdate(e){e.has("open")&&this.open&&!e.get("open")&&(this._typeFilter="all",this._search="")}render(){if(!this.open)return Zn(Fr||(Fr=on``));const e=this._search.trim().toLowerCase(),t=this.contacts.filter(e=>{switch(this._typeFilter){case"all":default:return!0;case"client":return 1===e.type;case"repeater":return 2===e.type;case"room_server":return 3===e.type;case"sensor":return 4===e.type}}).filter(t=>{if(!e)return!0;const i=(t.adv_name||"").toLowerCase(),s=(t.pubkey_prefix||"").toLowerCase();return i.includes(e)||s.startsWith(e)}).sort((e,t)=>(e.adv_name||"").localeCompare(t.adv_name||""));return Zn(Tr||(Tr=on`
      <div class="dialog-backdrop" @click=${0}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          aria-label="Choose trace target"
          @click=${0}>
          <div class="dialog-header">
            <div class="dialog-title">Choose Trace Target</div>
            <button class="dialog-close" aria-label="Close" @click=${0} title="Close">✕</button>
          </div>
          <div class="dialog-content">
            <div class="filter-row">
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Type</label>
                <select
                  class="form-select"
                  .value=${0}
                  @change=${0}
                >
                  <option value="all">All</option>
                  <option value="client">Companion / Client</option>
                  <option value="repeater">Repeater</option>
                  <option value="room_server">Room Server</option>
                  <option value="sensor">Sensor</option>
                </select>
              </div>
              <div class="form-group" style="margin: 0;">
                <label class="form-label">Search</label>
                <input
                  class="form-input"
                  type="text"
                  placeholder="Name or pubkey prefix…"
                  .value=${0}
                  @input=${0}
                  autocomplete="off"
                  spellcheck="false"
                />
              </div>
            </div>
            <div class="results-list">
              ${0}
            </div>
          </div>
        </div>
      </div>
    `),this._close,e=>e.stopPropagation(),this._close,this._typeFilter,this._onTypeChange,this._search,this._onSearchInput,0===t.length?Zn(Qr||(Qr=on`<div class="empty">No matching contacts</div>`)):t.map(e=>Zn(Pr||(Pr=on`
                    <div
                      class="result-row"
                      @click=${0}
                      title="Trace to ${0}"
                    >
                      <span class="result-icon">${0}</span>
                      <span class="result-name">${0}</span>
                      <span class="result-hex">${0}</span>
                    </div>
                  `),()=>this._select(e),e.adv_name||e.pubkey_prefix,this._iconFor(e.type),e.adv_name||e.pubkey_prefix,(e.pubkey_prefix||"").substring(0,2).toUpperCase())))}_iconFor(e){switch(e){case 2:return Zn(Or||(Or=on`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V10h4.27c.15-.86.45-1.66.87-2.36l-1.82-1.06a.5.5 0 01-.18-.68l.5-.87a.5.5 0 01.68-.18l1.81 1.05C19.66 4.66 20.78 4 22 4v2c-.8 0-1.54.32-2.08.84l1.5 2.6a.5.5 0 01-.18.68l-.87.5a.5.5 0 01-.68-.18L18.2 7.92c-.14.65-.2 1.33-.2 2.08 0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6z"/></svg>`));case 3:return Zn(Ur||(Ur=on`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 6h16v4H4V6zm0 8h16v4H4v-4zm2-6.5A.5.5 0 116 7a.5.5 0 010 .5zm0 8A.5.5 0 116 15a.5.5 0 010 .5z"/></svg>`));case 4:return Zn(zr||(zr=on`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a4 4 0 00-4 4v7.55A5.5 5.5 0 1015.5 20a5.47 5.47 0 00.5-2.45V6a4 4 0 00-4-4zm0 2a2 2 0 012 2v8.1a3.5 3.5 0 11-4 0V6a2 2 0 012-2z"/></svg>`));default:return Zn(Hr||(Hr=on`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`))}}_select(e){this.dispatchEvent(new CustomEvent("target-selected",{detail:e,bubbles:!0,composed:!0}))}};wm.styles=[Eo,gn($r||($r=on`
      :host { display: contents; }

      .dialog-backdrop {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.2s;
      }

      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

      .dialog {
        background: var(--card-background-color, #fff);
        border-radius: 8px;
        max-width: 560px;
        width: 90%;
        max-height: 85vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 5px 25px rgba(0, 0, 0, 0.15);
        animation: slideUp 0.3s;
      }

      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }

      .dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px;
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
      }

      .dialog-title {
        font-size: 18px;
        font-weight: 600;
        color: var(--primary-text-color);
      }

      .dialog-close {
        background: none; border: none; font-size: 20px; cursor: pointer;
        color: var(--secondary-text-color); padding: 0;
        width: 32px; height: 32px;
        display: flex; align-items: center; justify-content: center;
      }

      .dialog-close:hover { color: var(--primary-text-color); }

      .dialog-content {
        padding: 16px;
        overflow-y: auto;
      }

      .filter-row {
        display: grid;
        grid-template-columns: minmax(140px, 200px) 1fr;
        gap: 8px;
        margin-bottom: 12px;
      }

      @media (max-width: 520px) {
        .filter-row { grid-template-columns: 1fr; }
      }

      .results-list {
        display: flex;
        flex-direction: column;
        gap: 4px;
        max-height: 50vh;
        overflow-y: auto;
        padding: 4px;
        background: var(--primary-background-color, #fafafa);
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 6px;
      }

      .result-row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px;
        background: var(--card-background-color, #fff);
        border-radius: 6px;
        cursor: pointer;
        user-select: none;
        font-size: 14px;
        transition: background 0.15s;
      }

      .result-row:hover {
        background: var(--secondary-background-color, #eef);
      }

      .result-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        color: var(--primary-color, #03a9f4);
        flex-shrink: 0;
      }

      .result-name {
        flex: 1;
        color: var(--primary-text-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .result-hex {
        font-family: monospace;
        font-size: 12px;
        color: var(--secondary-text-color, #727272);
        flex-shrink: 0;
      }

      .empty {
        padding: 24px 12px;
        text-align: center;
        color: var(--secondary-text-color, #727272);
        font-style: italic;
        font-size: 13px;
      }
    `))],ln([yo({type:Boolean})],wm.prototype,"open",void 0),ln([yo({type:Array})],wm.prototype,"contacts",void 0),ln([xo()],wm.prototype,"_typeFilter",void 0),ln([xo()],wm.prototype,"_search",void 0),wm=ln([vo("meshcore-target-picker")],wm);let bm=class extends mo{constructor(){super(),this.narrow=!1,this._config=null,this._activeTab="state",this._devices=[],this._contacts=[],this._channels=[],this._selectedEntryId=null,this._loading=!0,this._loadingStarted=!1,this._error=null,this._unsubscribeList=[],this._unread=new Go,this._pendingChatTarget=null,this._activeChatEntityId=null,this._deviceDropdownOpen=!1,this._onDocClickForDropdown=e=>{var t;const i=e.composedPath?e.composedPath():[],s=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".device-info-wrap");s&&i.includes(s)||this._closeDeviceDropdown()},this._onDocKeyForDropdown=e=>{"Escape"===e.key&&this._closeDeviceDropdown()},this._traceDialogOpen=!1,this._traceDialogContactName="",this._traceDialogResult=null,this._traceDialogError="",this._traceDialogPubkeyPrefix="",this._traceDialogEntryId=void 0,this._traceDialogTargetContact=null,this._targetPickerOpen=!1,this._pendingTraceEntryId=void 0,this._onTraceRequested=async e=>{if(!this.hass)return;const{pathMode:t,path:i}=e.detail;try{const e=await async function(e,t,i,s="discovery",a){const r={type:"hivefw_integration/trace",pubkey_prefix:t};return i&&(r.entry_id=i),"select"!==s&&"explicit"!==s||!a||(r.path=a),e.callWS(r)}(this.hass,this._traceDialogPubkeyPrefix,this._traceDialogEntryId,t,i);this._traceDialogResult=e}catch(e){this._traceDialogError=(null==e?void 0:e.message)||(null==e?void 0:e.code)||"Unknown error"}},this._onCompanionTraceRequested=e=>{var t,i,s;this._pendingTraceEntryId=null!==(t=null!==(i=null===(s=e.detail)||void 0===s?void 0:s.entryId)&&void 0!==i?i:this._selectedEntryId)&&void 0!==t?t:void 0,this._targetPickerOpen=!0},this._onTargetPicked=e=>{const t=e.detail;this._targetPickerOpen=!1,t&&(this._traceDialogPubkeyPrefix=t.pubkey_prefix,this._traceDialogEntryId=this._pendingTraceEntryId,this._traceDialogContactName=t.adv_name||t.pubkey_prefix,this._traceDialogTargetContact=t,this._traceDialogResult=null,this._traceDialogError="",this._traceDialogOpen=!0)},this._unread.onMarkReadRequested(e=>{this._handleMarkReadRequested(e)})}connectedCallback(){super.connectedCallback(),this._loadData(),this._setupSubscriptions()}disconnectedCallback(){super.disconnectedCallback(),this._teardownSubscriptions(),this._closeDeviceDropdown()}_toggleDeviceDropdown(){this._deviceDropdownOpen?this._closeDeviceDropdown():this._openDeviceDropdown()}_openDeviceDropdown(){this._deviceDropdownOpen||(this._deviceDropdownOpen=!0,setTimeout(()=>{document.addEventListener("click",this._onDocClickForDropdown,!0),document.addEventListener("keydown",this._onDocKeyForDropdown,!0)},0))}_closeDeviceDropdown(){this._deviceDropdownOpen&&(this._deviceDropdownOpen=!1,document.removeEventListener("click",this._onDocClickForDropdown,!0),document.removeEventListener("keydown",this._onDocKeyForDropdown,!0))}_selectDevice(e){e!==this._selectedEntryId&&(this._selectedEntryId=e,this._pendingChatTarget=null,Promise.all([this._loadDeviceData(),this._loadUnreadCounts()])),this._closeDeviceDropdown()}_setupSubscriptions(){var e;this._teardownSubscriptions(),null!==(e=this.hass)&&void 0!==e&&null!==(e=e.connection)&&void 0!==e&&e.subscribeEvents&&(this.hass.connection.subscribeEvents(e=>{e.data.entry_id===this._selectedEntryId&&this._loadDeviceData()},"hivefw_channels_updated").then(e=>{this._unsubscribeList.push(e)}),this.hass.connection.subscribeEvents(e=>{e.data.entry_id===this._selectedEntryId&&this._loadDeviceData()},"hivefw_channel_removed").then(e=>{this._unsubscribeList.push(e)}),this.hass.connection.subscribeEvents(e=>{var t;this._activeChatEntityId&&(null===(t=e.data)||void 0===t?void 0:t.entity_id)===this._activeChatEntityId||this._loadUnreadCounts()},"hivefw_unread_updated").then(e=>{this._unsubscribeList.push(e)}))}_teardownSubscriptions(){this._unsubscribeList.length>0&&(this._unsubscribeList.forEach(e=>{try{e()}catch(e){}}),this._unsubscribeList=[])}updated(e){e.has("hass")&&this.hass&&!this._config&&!this._loadingStarted&&this._loadData()}get _selectedDevice(){return this._devices.find(e=>e.entry_id===this._selectedEntryId)}render(){var e;if(this._loading)return Zn(Nr||(Nr=on`
        <div class="panel">
          <div class="center-message">
            <div class="spinner"></div>
          </div>
        </div>
      `));if(this._error&&!this._config){const e="No HiveFW devices found"===this._error;return Zn(Lr||(Lr=on`
        <div class="panel">
          <div class="center-message">
            <div>
              <p>${0}</p>
              <p style="font-size: 12px; margin-top: 8px;">
                ${0}
              </p>
            </div>
          </div>
        </div>
      `),this._error,e?Zn(Gr||(Gr=on`Open <a href="/config/repairs">Settings &rarr; System &rarr; Repairs</a>
                         for setup guidance, or reconfigure HiveFW via
                         <a href="/config/integrations">Settings &rarr; Devices &amp; Services</a>.`)):"Check that HiveFW is configured and the radio is connected.")}const t=this._selectedDevice;return Zn(Yr||(Yr=on`
      <div class="panel">
        <div class="panel-header">
          <div class="header-left">
            ${0}
            <div class="panel-title" aria-label=${0}>
              <span class="panel-product-name">${0}</span>
              </div>
          </div>
          <div class="header-right">
            ${0}
            ${0}
            <span class="hivefw-header-brand-white" aria-label="HiveFW" title="HiveFW"></span>
          </div>
        </div>

        ${0}

        <div class="tab-bar">
          <button
            class=${0}
            @click=${0}>
            Estado
          </button>
          <button
            class=${0}
            @click=${0}>
            Canais
          </button>
          <button
            class=${0}
            @click=${0}>
            Nós
          </button>
          <button
            class=${0}
            @click=${0}>
            Rede
          </button>
          <button
            class=${0}
            @click=${0}>
            Definições
          </button>
        </div>

        <div class="page-container">
          ${0}
        </div>

        <meshcore-trace-dialog
          ?open=${0}
          .contactName=${0}
          .result=${0}
          .error=${0}
          .availableRepeaters=${0}
          .targetContact=${0}
          @trace-requested=${0}
          @trace-dialog-closed=${0}>
        </meshcore-trace-dialog>

        <meshcore-target-picker
          ?open=${0}
          .contacts=${0}
          @target-selected=${0}
          @target-picker-closed=${0}>
        </meshcore-target-picker>
      </div>
    `),this.narrow||"always_hidden"===(null===(e=this.hass)||void 0===e?void 0:e.dockedSidebar)?Zn(Kr||(Kr=on`<button class="menu-icon" @click=${0} aria-label="Toggle sidebar">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                </button>`),this._toggleMenu):Zn(jr||(jr=on``)),(null==t?void 0:t.name)||"HiveFW",(null==t?void 0:t.name)||"HiveFW",t&&null!==this._getNodeStatus(t)?Zn(Wr||(Wr=on`
                  <span class="connection-status ${0}">
                    <span class="status-dot ${0}"></span>
                    ${0}
                  </span>`),"online"===this._getNodeStatus(t)?"online":"offline","online"===this._getNodeStatus(t)?"online":"offline","online"===this._getNodeStatus(t)?"Ligado":"Desligado"):Zn(Jr||(Jr=on``)),t&&null!==this._getBatteryLevel(t)?Zn(qr||(qr=on`
                  <span class="battery-indicator">
                    <span class="battery-icon">
                      <span class="battery-fill ${0}"
                            style="width: ${0}%"></span>
                    </span>
                    <span class="battery-pct">${0}%</span>
                  </span>`),this._getBatteryLevel(t)>50?"high":this._getBatteryLevel(t)>20?"medium":"low",this._getBatteryLevel(t),this._getBatteryLevel(t)):Zn(Vr||(Vr=on``)),this._error?Zn(Zr||(Zr=on`<div class="error-banner">${0}</div>`),this._error):Zn(Xr||(Xr=on``)),"state"===this._activeTab?"active":"",()=>this._activeTab="state","chat"===this._activeTab?"active":"",()=>this._activeTab="chat","nodes"===this._activeTab?"active":"",()=>this._activeTab="nodes","network"===this._activeTab?"active":"",()=>this._activeTab="network","settings"===this._activeTab?"active":"",()=>this._activeTab="settings",this._renderActivePage(),this._traceDialogOpen,this._traceDialogContactName,this._traceDialogResult,this._traceDialogError,this._contacts.filter(e=>2===e.type||3===e.type||4===e.type),this._traceDialogTargetContact,this._onTraceRequested,()=>{this._traceDialogOpen=!1},this._targetPickerOpen,this._contacts,this._onTargetPicked,()=>{this._targetPickerOpen=!1})}_renderActivePage(){switch(this._activeTab){case"chat":return Zn(en||(en=on`
          <hivefw-integration-page
            .hass=${0}
            .config=${0}
            .conversations=${0}
            .unread=${0}
            .selectedId=${0}
            .narrow=${0}
            @active-entity-changed=${0}
            @contacts-changed=${0}
            @channels-changed=${0}
            @refresh-channels-requested=${0}
            @mark-all-read-requested=${0}></hivefw-integration-page>`),this.hass,this._config,[...this._channels,...this._contacts.filter(e=>e.added_to_node)],this._unread,this._pendingChatTarget,this.narrow,this._onActiveEntityChanged,()=>this._loadDeviceData(),()=>this._loadDeviceData(),()=>this._refreshChannelsFromRadio(),this._handleMarkAllReadRequested);case"nodes":return Zn(tn||(tn=on`
          <meshcore-nodes-page
            .hass=${0}
            .config=${0}
            .contacts=${0}
            .channels=${0}
            .narrow=${0}
            @node-action=${0}
            @contacts-changed=${0}></meshcore-nodes-page>`),this.hass,this._config,this._contacts,this._channels,this.narrow,this._handleNodeAction,()=>this._loadDeviceData());case"network":return Zn(sn||(sn=on``));case"state":return Zn(an||(an=on`
          <meshcore-status-page
            .hass=${0}
            .config=${0}
            .selectedDevice=${0}
            .knownNodeCount=${0}
            .contactCount=${0}
            .channelCount=${0}
            .narrow=${0}
            @companion-trace-requested=${0}></meshcore-status-page>`),this.hass,this._config,this._selectedDevice,this._contacts.length,this._contacts.filter(e=>e.added_to_node).length,this._channels.length,this.narrow,this._onCompanionTraceRequested);case"settings":return Zn(rn||(rn=on`
          <meshcore-settings-page
            .hass=${0}
            .config=${0}
            .selectedDevice=${0}
            .contactCount=${0}
            .channelCount=${0}
            .narrow=${0}
            @companion-trace-requested=${0}
            @device-renamed=${0}></meshcore-settings-page>`),this.hass,this._config,this._selectedDevice,this._contacts.length,this._channels.length,this.narrow,this._onCompanionTraceRequested,this._onDeviceRenamed)}}_toggleMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_deviceEntitySuffix(e){return{prefix:(e.pubkey_prefix||e.pubkey||"").substring(0,6).toLowerCase(),name:(e.name||"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}}_getNodeStatus(e){if(!this.hass)return null;const{prefix:t,name:i}=this._deviceEntitySuffix(e),s=`sensor.hivefw_${t}_node_status_${i}`,a=this.hass.states[s];return a?a.state:null}_getBatteryLevel(e){if(!this.hass)return null;const{prefix:t,name:i}=this._deviceEntitySuffix(e),s=`sensor.hivefw_${t}_battery_percentage_${i}`,a=this.hass.states[s];if(!a||"unknown"===a.state||"unavailable"===a.state)return null;const r=parseFloat(a.state);return isNaN(r)?null:Math.round(r)}async _loadData(){if(this.hass&&!this._loadingStarted){this._loadingStarted=!0,this._loading=!0,this._error=null;try{var e;const t=await Ro(this.hass);if(this._devices=t,0===t.length)return this._error="No HiveFW devices found",void(this._loading=!1);const i=t.find(e=>e.connected);this._selectedEntryId=(i||t[0]).entry_id;const s=i||t[0];this._config={node_name:s.name,node_prefix:(null===(e=s.pubkey_prefix)||void 0===e?void 0:e.substring(0,6))||"",entry_id:s.entry_id,...ko,...Io},await this._loadDeviceData(),await this._loadUnreadCounts()}catch(e){const t=e instanceof Error?e.message:String(e);this._error=`Failed to load: ${t}`,console.error("HiveFW panel load error:",e)}finally{this._loading=!1}}}async _refreshChannelsFromRadio(){if(this.hass&&this._selectedEntryId)try{const e=await async function(e,t){const i={type:"hivefw_integration/refresh_channels"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,this._selectedEntryId);await this._loadDeviceData(),console.info(`HiveFW channels refreshed: ${e.configured_channels}/${e.max_channels}`)}catch(e){console.error("Failed to refresh channels from radio:",e)}}async _loadDeviceData(){if(this.hass&&this._selectedEntryId)try{const[t,i]=await Promise.all([Mo(this.hass,this._selectedEntryId),Do(this.hass,this._selectedEntryId)]);this._contacts=t,this._channels=i;const s=this._selectedDevice;var e;s&&this._config&&(this._config={...this._config,node_name:s.name,node_prefix:(null===(e=s.pubkey_prefix)||void 0===e?void 0:e.substring(0,6))||"",entry_id:s.entry_id})}catch(e){console.error("Failed to load device data:",e)}}_onActiveEntityChanged(e){var t;this._activeChatEntityId=(null===(t=e.detail)||void 0===t?void 0:t.entityId)||null}async _onDeviceRenamed(){if(this.hass)try{this._devices=await Ro(this.hass);const t=this._selectedDevice;var e;t&&this._config&&(this._config={...this._config,node_name:t.name,node_prefix:(null===(e=t.pubkey_prefix)||void 0===e?void 0:e.substring(0,6))||"",entry_id:t.entry_id})}catch(e){console.error("Failed to refresh devices after rename:",e)}}async _loadUnreadCounts(){if(this.hass)try{const e=await async function(e,t){try{const i={type:"hivefw_integration/get_unread_counts"};t&&(i.entry_id=t);const s=await e.callWS(i);return{unread:s.unread||{},last_read:s.last_read||{}}}catch(e){return{unread:{},last_read:{}}}}(this.hass,this._selectedEntryId||void 0);this._unread.ingestBackendData(e,this._activeChatEntityId)}catch(e){}}_handleMarkReadRequested(e){e&&this.hass&&(No(this.hass,e,this._selectedEntryId||void 0).catch(()=>{}),this._unread.clearEntity(e),this._loadUnreadCounts())}async _handleMarkAllReadRequested(){if(!this.hass)return;const e=Object.entries(this._unread.counts).filter(([e,t])=>Boolean(e)&&Number(t)>0);if(0===e.length)return;for(const[t]of e)this._unread.clearEntity(t);const t=this._selectedEntryId||void 0;await Promise.allSettled(e.map(([e])=>No(this.hass,e,t))),await this._loadUnreadCounts()}async _handleNodeAction(e){const{action:t,node:i}=e.detail;if(!this.hass||!i)return;const s=i.public_key||"",a=i.pubkey_prefix||"",r=this._selectedEntryId||void 0;switch(t){case"message":a&&(this._pendingChatTarget=a,this._activeTab="chat");break;case"remove-contact":if(s)try{await $o(this.hass,s,r),await this._loadDeviceData(),await this._refreshNodesPageAfterMutation(s)}finally{this._clearNodesPagePending()}break;case"add-contact":if(s)try{await Ho(this.hass,s,i.adv_name||void 0,r),await this._loadDeviceData(),await this._refreshNodesPageAfterMutation(s)}finally{this._clearNodesPagePending()}break;case"trace":a&&(this._traceDialogPubkeyPrefix=a,this._traceDialogEntryId=r,this._traceDialogContactName=i.adv_name||a,this._traceDialogTargetContact="adv_name"in i?i:null,this._traceDialogResult=null,this._traceDialogError="",this._traceDialogOpen=!0);break;case"delete":case"remove":s&&(await $o(this.hass,s,r),await this._loadDeviceData());break;default:console.warn("Unhandled node action:",t)}}async _refreshNodesPageAfterMutation(e){var t;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector("meshcore-nodes-page");if(i&&"function"==typeof i.refreshAfterMutation)try{await i.refreshAfterMutation(e)}catch(e){console.error("Failed to refresh nodes-page after mutation:",e)}}_clearNodesPagePending(){var e;const t=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("meshcore-nodes-page");t&&"function"==typeof t.clearPendingAction&&t.clearPendingAction()}};bm.styles=[Eo,gn(nn||(nn=on`
      :host {
        display: block;
        width: 100%;
        height: 100vh;
      }

      .panel {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: var(--primary-background-color, #fafafa);
      }

      .panel-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: var(--card-background-color, #fff);
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        flex-shrink: 0;
        gap: 12px;
      }

      .panel-title {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-size: 18px;
        font-weight: 500;
        color: var(--primary-text-color);
        min-width: 0;
      }

      .hivefw-header-brand-white {
        display: inline-block;
        width: 152px;
        height: 38px;
        flex: 0 0 auto;
        background: transparent url('/hivefw_integration_panel/hivefw-wordmark.png?v=dark-2') center / contain no-repeat;
      }

      .hivefw-header-brand-white::before,
      .hivefw-header-brand-white::after {
        content: none;
      }

      :host([narrow]) .hivefw-header-brand-white {
        width: 132px;
        height: 33px;
      }

      .device-info {
        font-size: 13px;
        color: var(--secondary-text-color);
      }

      /* The multi-entry device switcher is a custom dropdown (button +
         listbox) instead of a native <select>, so each option can
         render name + pubkey-prefix as separate visual lines and so the
         collapsed display does not duplicate the prefix. The
         single-entry case shares the same wrap class and same
         name+prefix sibling layout. node_name and identity keys are
         independent fields by firmware design; showing both makes the
         distinction visible to the user. */
      .device-info-wrap {
        position: relative; /* anchor for the absolutely-positioned menu */
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-width: 0; /* allow children to shrink in narrow header */
      }

      .device-switcher {
        position: relative; /* anchor for absolute caret in column mode */
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 8px 12px;
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
        background: var(--card-background-color, #fff);
        color: var(--primary-text-color);
        font: inherit;
        font-size: 13px;
        text-align: left;
        box-sizing: border-box;
        min-height: 39px;
        line-height: normal;
        cursor: pointer;
        max-width: 250px;
      }

      .device-switcher:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
      }

      .device-switcher-caret {
        margin-left: 4px;
        opacity: 0.6;
        font-size: 11px;
      }

      .device-prefix {
        font-size: 0.85em;
        opacity: 0.75;
        white-space: nowrap;
      }

      .device-switcher-menu {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        z-index: 10;
        margin: 0;
        padding: 4px 0;
        list-style: none;
        width: max-content; /* size to widest item, not parent button */
        min-width: 140px; /* small floor so the menu never gets skinny */
        max-width: 280px;
        background: var(--card-background-color, #fff);
        border: 1px solid var(--divider-color, #e0e0e0);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .device-switcher-menu li {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 8px 12px;
        cursor: pointer;
        gap: 0;
      }

      .device-switcher-menu li:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.05));
      }

      .device-switcher-menu li.active {
        background: rgba(3, 169, 244, 0.1);
      }

      .device-switcher-menu li .device-name {
        font-size: 13px;
        line-height: 1.2;
      }

      .device-switcher-menu li .device-prefix {
        line-height: 1.1;
      }

      /* Mobile / narrow header: stack name and prefix vertically inside
         the button (multi-entry) and inside the wrap (single-entry).
         The caret is pulled out of the flex column flow and pinned to
         the right edge of the button so it doesn't end up as a third
         row below the prefix. Extra right-padding leaves room for it.
         Two gates fire this: the panel's own [narrow] attribute (set by
         HA's responsive sidebar via the reflected 'narrow' property)
         and a viewport media query as a fallback for desktop browsers
         in narrow viewports. The :host([narrow]) and @media blocks are
         duplicated rather than comma-combined because CSS does not
         allow mixing a selector with an at-rule in a single rule list. */
      :host([narrow]) .device-info-wrap,
      :host([narrow]) .device-switcher {
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
        gap: 0;
      }

      :host([narrow]) .device-switcher {
        padding-right: 28px; /* room for the absolutely-positioned caret */
      }

      :host([narrow]) .device-switcher-caret {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 0;
      }

      :host([narrow]) .device-prefix {
        line-height: 1.1;
      }

      @media (max-width: 480px) {
        .device-info-wrap,
        .device-switcher {
          flex-direction: column;
          align-items: flex-end;
          justify-content: center;
          gap: 0;
        }
        .device-switcher {
          padding-right: 28px;
        }
        .device-switcher-caret {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translateY(-50%);
          margin-left: 0;
        }
        .device-prefix {
          line-height: 1.1;
        }
      }

      .menu-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 36px;
        height: 36px;
        border: none;
        background: none;
        cursor: pointer;
        color: var(--primary-text-color);
        border-radius: 50%;
        padding: 0;
        flex-shrink: 0;
      }

      .menu-icon:hover {
        background: var(--secondary-background-color, rgba(0, 0, 0, 0.1));
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .header-right {
        display: flex;
        align-items: center;
        gap: 12px;
        flex-shrink: 0;
      }

      .connection-status {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 12px;
        font-weight: 500;
        border: 1px solid;
      }

      .connection-status.online {
        color: #4caf50;
        border-color: rgba(76, 175, 80, 0.4);
        background: rgba(76, 175, 80, 0.08);
      }

      .connection-status.offline {
        color: var(--error-color, #db4437);
        border-color: rgba(219, 68, 55, 0.4);
        background: rgba(219, 68, 55, 0.08);
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .status-dot.online {
        background: #4caf50;
      }

      .status-dot.offline {
        background: var(--error-color, #db4437);
      }

      .battery-indicator {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }

      .battery-icon {
        position: relative;
        width: 18px;
        height: 10px;
        border: 1.5px solid var(--secondary-text-color, #888);
        border-radius: 2px;
        display: flex;
        align-items: center;
        padding: 1px;
      }

      .battery-icon::after {
        content: '';
        position: absolute;
        right: -4px;
        top: 50%;
        transform: translateY(-50%);
        width: 2px;
        height: 5px;
        background: var(--secondary-text-color, #888);
        border-radius: 0 1px 1px 0;
      }

      .battery-fill {
        height: 100%;
        border-radius: 1px;
        transition: width 0.3s ease;
      }

      .battery-fill.high {
        background: #4caf50;
      }

      .battery-fill.medium {
        background: #ff9800;
      }

      .battery-fill.low {
        background: var(--error-color, #db4437);
      }

      .battery-pct {
        min-width: 28px;
        text-align: right;
      }

      /* Mobile: compact header indicators */
      @media (max-width: 870px) {
        .connection-status {
          padding: 0;
          border: none;
          background: none !important;
          gap: 0;
          font-size: 0;
        }

        .connection-status .status-dot {
          width: 8px;
          height: 8px;
        }

        .battery-pct {
          display: none;
        }

        .battery-indicator {
          gap: 0;
        }

        .battery-icon {
          width: 13.5px;
          height: 7.5px;
          border-width: 1.25px;
        }

        .battery-icon::after {
          right: -3px;
          width: 1.5px;
          height: 4px;
        }
      }

      .tab-bar {
        display: flex;
        background: var(--card-background-color, #fff);
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        flex-shrink: 0;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
      }

      .tab-bar::-webkit-scrollbar {
        display: none;
      }

      .tab-bar button {
        flex: 1;
        padding: 12px 16px;
        border: none;
        background: transparent;
        color: var(--secondary-text-color, #727272);
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
        border-bottom: 3px solid transparent;
        min-height: 48px;
      }

      .tab-bar button:hover {
        color: var(--primary-text-color);
        background: rgba(0, 0, 0, 0.02);
      }

      .tab-bar button.active {
        color: var(--primary-color, #03a9f4);
        border-bottom-color: var(--primary-color, #03a9f4);
      }

      .page-container {
        flex: 1;
        min-width: 0;
        min-height: 0;
        overflow: hidden;
        display: flex;
      }

      /* Let each page own its scrolling model. Forcing overflow:hidden on
         every custom-element host prevented mobile pages whose :host uses
         overflow:auto from ever receiving a usable scroll container. */
      .page-container > * {
        flex: 1;
        min-width: 0;
        min-height: 0;
      }

      @media (max-width: 870px) {
        .tab-bar {
          justify-content: flex-start;
        }

        .tab-bar button {
          flex: 0 0 auto;
          min-width: 96px;
          padding-left: 12px;
          padding-right: 12px;
        }
      }

      .error-banner {
        padding: 12px 16px;
        background: rgba(219, 68, 55, 0.08);
        color: var(--error-color, #db4437);
        border-bottom: 1px solid var(--divider-color, #e0e0e0);
        font-size: 13px;
      }

      .center-message {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: var(--secondary-text-color);
        padding: 24px;
      }

      .spinner {
        width: 32px;
        height: 32px;
        border: 3px solid var(--divider-color, #e0e0e0);
        border-top-color: var(--primary-color, #03a9f4);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `))],ln([yo({type:Object})],bm.prototype,"hass",void 0),ln([yo({type:Boolean,reflect:!0})],bm.prototype,"narrow",void 0),ln([yo({type:Object})],bm.prototype,"panel",void 0),ln([xo()],bm.prototype,"_config",void 0),ln([xo()],bm.prototype,"_activeTab",void 0),ln([xo()],bm.prototype,"_devices",void 0),ln([xo()],bm.prototype,"_contacts",void 0),ln([xo()],bm.prototype,"_channels",void 0),ln([xo()],bm.prototype,"_selectedEntryId",void 0),ln([xo()],bm.prototype,"_loading",void 0),ln([xo()],bm.prototype,"_loadingStarted",void 0),ln([xo()],bm.prototype,"_error",void 0),ln([xo()],bm.prototype,"_unsubscribeList",void 0),ln([xo()],bm.prototype,"_pendingChatTarget",void 0),ln([xo()],bm.prototype,"_deviceDropdownOpen",void 0),ln([xo()],bm.prototype,"_traceDialogOpen",void 0),ln([xo()],bm.prototype,"_traceDialogContactName",void 0),ln([xo()],bm.prototype,"_traceDialogResult",void 0),ln([xo()],bm.prototype,"_traceDialogError",void 0),ln([xo()],bm.prototype,"_traceDialogPubkeyPrefix",void 0),ln([xo()],bm.prototype,"_traceDialogEntryId",void 0),ln([xo()],bm.prototype,"_traceDialogTargetContact",void 0),ln([xo()],bm.prototype,"_targetPickerOpen",void 0),ln([xo()],bm.prototype,"_pendingTraceEntryId",void 0),bm=ln([vo("hivefw-integration-panel")],bm);export{bm as MeshCorePanel};
