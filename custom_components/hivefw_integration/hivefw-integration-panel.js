/*! hivefw-integration-panel v1.14.33 */
let e,t,i,a,o,s,r,n,l,d,c,p,h,u,g,v,m,f,_,b,y,x,w,$,k,S,C,M,R,A,T,z,I,N,F,D,E,O,P,B,L,H,U,q,j,V,W,K,G,X,Q,Y,J,Z,ee,te,ie,ae,oe,se,re,ne,le,de,ce,pe,he,ue,ge,ve,me,fe,_e,be,ye,xe,we,$e,ke,Se,Ce,Me,Re,Ae,Te,ze,Ie,Ne,Fe,De,Ee,Oe,Pe,Be,Le,He,Ue,qe,je,Ve,We,Ke,Ge,Xe,Qe,Ye,Je,Ze,et,tt,it,at,ot,st,rt,nt,lt,dt,ct,pt,ht,ut,gt,vt,mt,ft,_t,bt,yt,xt,wt,$t,kt,St,Ct,Mt,Rt,At,Tt,zt,It,Nt,Ft,Dt,Et,Ot,Pt,Bt,Lt,Ht,Ut,qt,jt,Vt,Wt,Kt,Gt,Xt,Qt,Yt,Jt,Zt,ei,ti,ii,ai,oi,si,ri,ni,li,di,ci,pi,hi,ui,gi,vi,mi,fi,_i,bi,yi,xi,wi,$i,ki,Si,Ci,Mi,Ri,Ai,Ti,zi,Ii,Ni,Fi,Di,Ei,Oi,Pi,Bi,Li,Hi,Ui,qi,ji,Vi,Wi,Ki,Gi,Xi,Qi,Yi,Ji,Zi,ea,ta,ia,aa,oa,sa,ra,na,la,da,ca,pa,ha,ua,ga,va,ma,fa,_a,ba,ya,xa,wa,$a,ka,Sa,Ca,Ma,Ra,Aa,Ta,za,Ia,Na,Fa,Da,Ea,Oa,Pa,Ba,La,Ha,Ua,qa,ja,Va,Wa,Ka,Ga,Xa,Qa,Ya,Ja,Za,eo,to,io,ao,oo,so,ro,no,lo,co,po,ho,uo,go,vo,mo,fo,_o,bo,yo,xo,wo,$o,ko,So,Co,Mo,Ro,Ao,To,zo,Io,No,Fo,Do,Eo,Oo,Po,Bo,Lo,Ho,Uo,qo,jo,Vo,Wo,Ko,Go,Xo,Qo,Yo,Jo,Zo,es,ts,is,as,os,ss,rs,ns,ls,ds=e=>e;function cs(e,t,i,a){var o,s=arguments.length,r=s<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,i):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,a);else for(var n=e.length-1;n>=0;n--)(o=e[n])&&(r=(s<3?o(r):s>3?o(t,i,r):o(t,i))||r);return s>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const ps=globalThis,hs=ps.ShadowRoot&&(void 0===ps.ShadyCSS||ps.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,us=Symbol(),gs=new WeakMap;let vs=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==us)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(hs&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=gs.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&gs.set(t,e))}return e}toString(){return this.cssText}};const ms=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new vs(i,e,us)},fs=hs?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new vs("string"==typeof e?e:e+"",void 0,us))(t)})(e):e,{is:_s,defineProperty:bs,getOwnPropertyDescriptor:ys,getOwnPropertyNames:xs,getOwnPropertySymbols:ws,getPrototypeOf:$s}=Object,ks=globalThis,Ss=ks.trustedTypes,Cs=Ss?Ss.emptyScript:"",Ms=ks.reactiveElementPolyfillSupport,Rs=(e,t)=>e,As={toAttribute(e,t){switch(t){case Boolean:e=e?Cs:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},Ts=(e,t)=>!_s(e,t),zs={attribute:!0,type:String,converter:As,reflect:!1,useDefault:!1,hasChanged:Ts};null!==(e=Symbol.metadata)&&void 0!==e||(Symbol.metadata=Symbol("metadata")),null!==(t=ks.litPropertyMetadata)&&void 0!==t||(ks.litPropertyMetadata=new WeakMap);let Is=class extends HTMLElement{static addInitializer(e){var t;this._$Ei(),(null!==(t=this.l)&&void 0!==t?t:this.l=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=zs){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&bs(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){var a;const{get:o,set:s}=null!==(a=ys(this.prototype,e))&&void 0!==a?a:{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const a=null==o?void 0:o.call(this);null!=s&&s.call(this,t),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){var t;return null!==(t=this.elementProperties.get(e))&&void 0!==t?t:zs}static _$Ei(){if(this.hasOwnProperty(Rs("elementProperties")))return;const e=$s(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Rs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Rs("properties"))){const e=this.properties,t=[...xs(e),...ws(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(fs(e))}else void 0!==e&&t.push(fs(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$EO)&&void 0!==t?t:this._$EO=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$EO)||void 0===t||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{if(hs)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),a=ps.litNonce;void 0!==a&&t.setAttribute("nonce",a),t.textContent=i.cssText,e.appendChild(t)}})(t,this.constructor.elementStyles),t}connectedCallback(){var e,t;null!==(e=this.renderRoot)&&void 0!==e||(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$EO)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$EO)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){var o;const s=(void 0!==(null===(o=i.converter)||void 0===o?void 0:o.toAttribute)?i.converter:As).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(a):this.setAttribute(a,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){var o,s,r;const e=i.getPropertyOptions(a),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(o=e.converter)||void 0===o?void 0:o.fromAttribute)?e.converter:As;this._$Em=a;const l=n.fromAttribute(t,e.type);this[a]=null!==(s=null!=l?l:null===(r=this._$Ej)||void 0===r?void 0:r.get(a))&&void 0!==s?s:l,this._$Em=null}}requestUpdate(e,t,i,a=!1,o){if(void 0!==e){var s,r;const n=this.constructor;if(!1===a&&(o=this[e]),null!=i||(i=n.getPropertyOptions(e)),!((null!==(s=i.hasChanged)&&void 0!==s?s:Ts)(o,t)||i.useDefault&&i.reflect&&o===(null===(r=this._$Ej)||void 0===r?void 0:r.get(e))&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:o},s){var r,n,l;i&&!(null!==(r=this._$Ej)&&void 0!==r?r:this._$Ej=new Map).has(e)&&(this._$Ej.set(e,null!==(n=null!=s?s:t)&&void 0!==n?n:this[e]),!0!==o||void 0!==s)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(null!==(l=this._$Eq)&&void 0!==l?l:this._$Eq=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){var e;if(null!==(e=this.renderRoot)&&void 0!==e||(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,a=this[e];!0!==t||this._$AL.has(e)||void 0===a||this.C(e,void 0,i,a)}}let t=!1;const i=this._$AL;try{var a;t=this.shouldUpdate(i),t?(this.willUpdate(i),null!==(a=this._$EO)&&void 0!==a&&a.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null!==(t=this._$EO)&&void 0!==t&&t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(e){}firstUpdated(e){}};Is.elementStyles=[],Is.shadowRootOptions={mode:"open"},Is[Rs("elementProperties")]=new Map,Is[Rs("finalized")]=new Map,null!=Ms&&Ms({ReactiveElement:Is}),(null!==(i=ks.reactiveElementVersions)&&void 0!==i?i:ks.reactiveElementVersions=[]).push("2.1.2");const Ns=globalThis,Fs=e=>e,Ds=Ns.trustedTypes,Es=Ds?Ds.createPolicy("lit-html",{createHTML:e=>e}):void 0,Os="$lit$",Ps=`lit$${Math.random().toFixed(9).slice(2)}$`,Bs="?"+Ps,Ls=`<${Bs}>`,Hs=document,Us=()=>Hs.createComment(""),qs=e=>null===e||"object"!=typeof e&&"function"!=typeof e,js=Array.isArray,Vs="[ \t\n\f\r]",Ws=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ks=/-->/g,Gs=/>/g,Xs=RegExp(`>|${Vs}(?:([^\\s"'>=/]+)(${Vs}*=${Vs}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Qs=/'/g,Ys=/"/g,Js=/^(?:script|style|textarea|title)$/i,Zs=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),er=Zs(1),tr=Zs(2),ir=Symbol.for("lit-noChange"),ar=Symbol.for("lit-nothing"),or=new WeakMap,sr=Hs.createTreeWalker(Hs,129);function rr(e,t){if(!js(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==Es?Es.createHTML(t):t}const nr=(e,t)=>{const i=e.length-1,a=[];let o,s=2===t?"<svg>":3===t?"<math>":"",r=Ws;for(let t=0;t<i;t++){const i=e[t];let n,l,d=-1,c=0;for(;c<i.length&&(r.lastIndex=c,l=r.exec(i),null!==l);)c=r.lastIndex,r===Ws?"!--"===l[1]?r=Ks:void 0!==l[1]?r=Gs:void 0!==l[2]?(Js.test(l[2])&&(o=RegExp("</"+l[2],"g")),r=Xs):void 0!==l[3]&&(r=Xs):r===Xs?">"===l[0]?(r=null!=o?o:Ws,d=-1):void 0===l[1]?d=-2:(d=r.lastIndex-l[2].length,n=l[1],r=void 0===l[3]?Xs:'"'===l[3]?Ys:Qs):r===Ys||r===Qs?r=Xs:r===Ks||r===Gs?r=Ws:(r=Xs,o=void 0);const p=r===Xs&&e[t+1].startsWith("/>")?" ":"";s+=r===Ws?i+Ls:d>=0?(a.push(n),i.slice(0,d)+Os+i.slice(d)+Ps+p):i+Ps+(-2===d?t:p)}return[rr(e,s+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class lr{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let o=0,s=0;const r=e.length-1,n=this.parts,[l,d]=nr(e,t);if(this.el=lr.createElement(l,i),sr.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=sr.nextNode())&&n.length<r;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(Os)){const t=d[s++],i=a.getAttribute(e).split(Ps),r=/([.?@])?(.*)/.exec(t);n.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?ur:"?"===r[1]?gr:"@"===r[1]?vr:hr}),a.removeAttribute(e)}else e.startsWith(Ps)&&(n.push({type:6,index:o}),a.removeAttribute(e));if(Js.test(a.tagName)){const e=a.textContent.split(Ps),t=e.length-1;if(t>0){a.textContent=Ds?Ds.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],Us()),sr.nextNode(),n.push({type:2,index:++o});a.append(e[t],Us())}}}else if(8===a.nodeType)if(a.data===Bs)n.push({type:2,index:o});else{let e=-1;for(;-1!==(e=a.data.indexOf(Ps,e+1));)n.push({type:7,index:o}),e+=Ps.length-1}o++}}static createElement(e,t){const i=Hs.createElement("template");return i.innerHTML=e,i}}function dr(e,t,i=e,a){var o,s,r,n,l;if(t===ir)return t;let d=void 0!==a?null===(o=i._$Co)||void 0===o?void 0:o[a]:i._$Cl;const c=qs(t)?void 0:t._$litDirective$;return(null===(s=d)||void 0===s?void 0:s.constructor)!==c&&(null!==(r=d)&&void 0!==r&&null!==(n=r._$AO)&&void 0!==n&&n.call(r,!1),void 0===c?d=void 0:(d=new c(e),d._$AT(e,i,a)),void 0!==a?(null!==(l=i._$Co)&&void 0!==l?l:i._$Co=[])[a]=d:i._$Cl=d),void 0!==d&&(t=dr(e,d._$AS(e,t.values),d,a)),t}class cr{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:a}=this._$AD,o=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:Hs).importNode(i,!0);sr.currentNode=o;let s=sr.nextNode(),r=0,n=0,l=a[0];for(;void 0!==l;){var d;if(r===l.index){let t;2===l.type?t=new pr(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new mr(s,this,e)),this._$AV.push(t),l=a[++n]}r!==(null===(d=l)||void 0===d?void 0:d.index)&&(s=sr.nextNode(),r++)}return sr.currentNode=Hs,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class pr{get _$AU(){var e,t;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cv}constructor(e,t,i,a){var o;this.type=2,this._$AH=ar,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=null===(o=null==a?void 0:a.isConnected)||void 0===o||o}get parentNode(){var e;let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===(null===(e=t)||void 0===e?void 0:e.nodeType)&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=dr(this,e,t),qs(e)?e===ar||null==e||""===e?(this._$AH!==ar&&this._$AR(),this._$AH=ar):e!==this._$AH&&e!==ir&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>js(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==ar&&qs(this._$AH)?this._$AA.nextSibling.data=e:this.T(Hs.createTextNode(e)),this._$AH=e}$(e){var t;const{values:i,_$litType$:a}=e,o="number"==typeof a?this._$AC(e):(void 0===a.el&&(a.el=lr.createElement(rr(a.h,a.h[0]),this.options)),a);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===o)this._$AH.p(i);else{const e=new cr(o,this),t=e.u(this.options);e.p(i),this.T(t),this._$AH=e}}_$AC(e){let t=or.get(e.strings);return void 0===t&&or.set(e.strings,t=new lr(e)),t}k(e){js(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const o of e)a===t.length?t.push(i=new pr(this.O(Us()),this.O(Us()),this,this.options)):i=t[a],i._$AI(o),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e!==this._$AB;){var i;const t=Fs(e).nextSibling;Fs(e).remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cv=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class hr{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,o){this.type=1,this._$AH=ar,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ar}_$AI(e,t=this,i,a){const o=this.strings;let s=!1;if(void 0===o)e=dr(this,e,t,0),s=!qs(e)||e!==this._$AH&&e!==ir,s&&(this._$AH=e);else{const a=e;let r,n;for(e=o[0],r=0;r<o.length-1;r++)n=dr(this,a[i+r],t,r),n===ir&&(n=this._$AH[r]),s||(s=!qs(n)||n!==this._$AH[r]),n===ar?e=ar:e!==ar&&(e+=(null!=n?n:"")+o[r+1]),this._$AH[r]=n}s&&!a&&this.j(e)}j(e){e===ar?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ur extends hr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ar?void 0:e}}class gr extends hr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==ar)}}class vr extends hr{constructor(e,t,i,a,o){super(e,t,i,a,o),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=dr(this,e,t,0))&&void 0!==i?i:ar)===ir)return;const a=this._$AH,o=e===ar&&a!==ar||e.capture!==a.capture||e.once!==a.once||e.passive!==a.passive,s=e!==ar&&(a===ar||o);o&&this.element.removeEventListener(this.name,this,a),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(t=null===(i=this.options)||void 0===i?void 0:i.host)&&void 0!==t?t:this.element,e):this._$AH.handleEvent(e)}}class mr{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){dr(this,e)}}const fr=Ns.litHtmlPolyfillSupport;null!=fr&&fr(lr,pr),(null!==(a=Ns.litHtmlVersions)&&void 0!==a?a:Ns.litHtmlVersions=[]).push("3.3.2");const _r=globalThis;let br=class extends Is{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var a;const o=null!==(a=null==i?void 0:i.renderBefore)&&void 0!==a?a:t;let s=o._$litPart$;if(void 0===s){var r;const e=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;o._$litPart$=s=new pr(t.insertBefore(Us(),e),e,void 0,null!=i?i:{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return ir}};br._$litElement$=!0,br.finalized=!0,null===(o=_r.litElementHydrateSupport)||void 0===o||o.call(_r,{LitElement:br});const yr=_r.litElementPolyfillSupport;null==yr||yr({LitElement:br}),(null!==(s=_r.litElementVersions)&&void 0!==s?s:_r.litElementVersions=[]).push("4.2.2");const xr=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},wr={attribute:!0,type:String,converter:As,reflect:!1,hasChanged:Ts},$r=(e=wr,t,i)=>{const{kind:a,metadata:o}=i;let s=globalThis.litPropertyMetadata.get(o);if(void 0===s&&globalThis.litPropertyMetadata.set(o,s=new Map),"setter"===a&&((e=Object.create(e)).wrapped=!0),s.set(i.name,e),"accessor"===a){const{name:a}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(a,o,e,!0,i)},init(t){return void 0!==t&&this.C(a,void 0,e,t),t}}}if("setter"===a){const{name:a}=i;return function(i){const o=this[a];t.call(this,i),this.requestUpdate(a,o,e,!0,i)}}throw Error("Unsupported decorator location: "+a)};function kr(e){return(t,i)=>"object"==typeof i?$r(e,t,i):((e,t,i)=>{const a=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),a?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function Sr(e){return kr({...e,state:!0,attribute:!1})}const Cr=ms(r||(r=ds`
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
`)),Mr=/^<[^>]+>\s*/,Rr=/@\[([^\]]+)\]/g,Ar=/@(\w+)/g,Tr={recipient_type_entity:"select.hivefw_recipient_type",channel_entity:"select.hivefw_channel",contact_entity:"select.hivefw_contact",channel_entity_pattern:"binary_sensor.hivefw_{prefix}_ch_{idx}_messages",contact_entity_pattern:"binary_sensor.hivefw_{prefix}_{contact}_messages",domain_filter:"hivefw"},zr={...Tr,hours_to_show:48,initial_hours:1,max_messages:500,show_date_separators:!0,group_messages:!0,group_timeout:300,timestamp_format:"time",update_mode:"auto",refresh_interval:30,enable_cache:!0,cache_ttl:86400,cache_max_size:5242880};async function Ir(e){try{return(await e.callWS({type:"hivefw_integration/get_devices"})).devices||[]}catch(e){return[]}}async function Nr(e,t){try{const i={type:"hivefw_integration/get_contacts"};return t&&(i.entry_id=t),(await e.callWS(i)).contacts||[]}catch(e){return[]}}async function Fr(e,t){try{const i={type:"hivefw_integration/get_channels"};return t&&(i.entry_id=t),(await e.callWS(i)).channels||[]}catch(e){return[]}}async function Dr(e,t){try{const i={type:"hivefw_integration/get_device_config"};return t&&(i.entry_id=t),await e.callWS(i)}catch(e){throw new Error("Failed to get device configuration")}}async function Er(e,t,i){try{const a={type:"hivefw_integration/set_device_config",settings:t};return i&&(a.entry_id=i),await e.callWS(a)}catch(e){const t=e;return{success:!1,changed:[],error:t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e)}}}async function Or(e,t){try{const i={type:"hivefw_integration/get_flood_scopes"};t&&(i.entry_id=t);const a=await e.callWS(i);return{scopes:a.scopes||[],global:!!a.global}}catch(e){return{scopes:[],global:!1}}}async function Pr(e,t){const i={type:"hivefw_integration/get_local_repeater_status"};return t&&(i.entry_id=t),e.callWS(i)}async function Br(e,t){const i={type:"hivefw_integration/get_local_regions"};return t&&(i.entry_id=t),e.callWS(i)}async function Lr(e,t,i="",a="",o){const s={type:"hivefw_integration/set_local_region",operation:t,name:i,parent:a};return o&&(s.entry_id=o),e.callWS(s)}async function Hr(e,t,i=!1){const a={type:"hivefw_integration/get_firmware_ota_status"};return t&&(a.entry_id=t),i&&(a.force=!0),e.callWS(a)}async function Ur(e,t,i,a){try{const o={type:"hivefw_integration/add_contact",public_key:t};return i&&(o.name=i),a&&(o.entry_id=a),await e.callWS(o)}catch(e){return{success:!1}}}async function qr(e,t,i){try{const a={type:"hivefw_integration/remove_contact",public_key:t};return i&&(a.entry_id=i),await e.callWS(a)}catch(e){return{success:!1}}}async function jr(e,t,i){try{const a={type:"hivefw_integration/mark_conversation_read",entity_id:t};return i&&(a.entry_id=i),await e.callWS(a)}catch(e){return{success:!1}}}async function Vr(e,t,i){try{const a={type:"hivefw_integration/set_location_source",source:t};return i&&(a.entry_id=i),await e.callWS(a)}catch(e){return{success:!1}}}class Wr{constructor(){this._counts={},this._lastRead={},this._subscribers=new Set,this._markReadRequestedHandler=null,this._readProgress=null,this._postSwitchTimerHandler=null}subscribe(e){return this._subscribers.add(e),()=>{this._subscribers.delete(e)}}onMarkReadRequested(e){this._markReadRequestedHandler=e}onPostSwitchTimerFire(e){this._postSwitchTimerHandler=e}requestMarkRead(e){e&&this._markReadRequestedHandler&&this._markReadRequestedHandler(e)}_notify(){for(const e of[...this._subscribers])try{e()}catch(e){console.error("[UnreadController] subscriber callback threw",e)}}ingestBackendData(e,t){var i,a;this._counts={...null!==(i=null==e?void 0:e.unread)&&void 0!==i?i:{}},this._lastRead={...null!==(a=null==e?void 0:e.last_read)&&void 0!==a?a:{}},this._notify()}clearEntity(e){e&&this._counts[e]&&(this._counts={...this._counts,[e]:0},this._notify())}get counts(){return this._counts}get lastRead(){return this._lastRead}beginConversation(e,t){var i;this._clearPostSwitchTimer();const a={entityId:e,anchorId:e&&null!==(i=this._lastRead[e])&&void 0!==i?i:null,unreadCountAtSelection:t,graceUntil:Date.now()+1e3,postSwitchTimer:null,markReadFired:!1,lastMarkReadIdSent:null};this._readProgress=a,a.postSwitchTimer=setTimeout(()=>{var e;this._readProgress===a&&(a.postSwitchTimer=null,null===(e=this._postSwitchTimerHandler)||void 0===e||e.call(this))},1e3)}endConversation(){this._clearPostSwitchTimer(),this._readProgress=null}_clearPostSwitchTimer(){const e=this._readProgress;null!=e&&e.postSwitchTimer&&(clearTimeout(e.postSwitchTimer),e.postSwitchTimer=null)}resetUnreadCountAtSelection(){this._readProgress&&(this._readProgress.unreadCountAtSelection=0)}maybeReanchorOnLateData(e){const t=this._readProgress;if(!t||t.entityId!==e)return!1;if(null!==t.anchorId)return!1;if(t.markReadFired)return!1;const i=this._lastRead[e];return!!i&&(t.anchorId=i,!0)}onScrollState(e){return this._tryAdvanceCursor(e.entityId,e.lastMessageVisible,e.hasNewerMessages,e.bufferTailId,!1)}onPillJump(e){return this._tryAdvanceCursor(e.entityId,!0,!1,e.bufferTailId,!0)}_tryAdvanceCursor(e,t,i,a,o){if(!e)return!1;const s=this._readProgress;return!(!s||s.entityId!==e||!o&&Date.now()<s.graceUntil||i||!t||null!==a&&a===s.lastMarkReadIdSent||(s.lastMarkReadIdSent=a,s.markReadFired=!0,this.requestMarkRead(e),0))}badgeCount(e,t,i){if(!e)return 0;const a=this._counts;if(i&&a[i])return a[i];const o=/^\d+$/.test(e),s=t?`hivefw_${t}_ch_${e}_messages`:null;for(const[t,i]of Object.entries(a))if(!(i<=0))if(o){if(s){if(t.endsWith(s))return i}else if(t.endsWith(`_ch_${e}_messages`))return i}else{const a=e.substring(0,6);if(t.endsWith(`_${a}_messages`))return i}return 0}dividerAfterGroupIdx(e){const t=this._readProgress;if(!t)return null;let i=null;if(t.anchorId){let a=0;for(const o of e)if("date-separator"!==o.type){if(o.group.messages.some(e=>e.id===t.anchorId)){i=a;break}a++}}if(null!==i){let t=0;for(const a of e)if("date-separator"!==a.type){if(t>i&&!a.group.isOutgoing)return t;t++}return null}if(t.unreadCountAtSelection>0){const i=e.filter(e=>"date-separator"!==e.type).length,a=i-t.unreadCountAtSelection;return a>=0?a:0}return null}cursorAtTail(e,t){return!(!e||null===t)&&this._lastRead[e]===t}}const Kr=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function Gr(e){const t=(new TextEncoder).encode(e),i=t.length,a=8*i,o=i+9+63&-64,s=new Uint8Array(o);s.set(t),s[i]=128;const r=new DataView(s.buffer);r.setUint32(o-4,a,!1);let n=1779033703,l=3144134277,d=1013904242,c=2773480762,p=1359893119,h=2600822924,u=528734635,g=1541459225;const v=new Int32Array(64);for(let e=0;e<o;e+=64){for(let t=0;t<16;t++)v[t]=r.getInt32(e+4*t,!1);for(let e=16;e<64;e++){const t=(v[e-15]>>>7|v[e-15]<<25)^(v[e-15]>>>18|v[e-15]<<14)^v[e-15]>>>3,i=(v[e-2]>>>17|v[e-2]<<15)^(v[e-2]>>>19|v[e-2]<<13)^v[e-2]>>>10;v[e]=v[e-16]+t+v[e-7]+i|0}let t=n,i=l,a=d,o=c,s=p,m=h,f=u,_=g;for(let e=0;e<64;e++){const r=_+((s>>>6|s<<26)^(s>>>11|s<<21)^(s>>>25|s<<7))+(s&m^~s&f)+Kr[e]+v[e]|0,n=t&i^t&a^i&a;_=f,f=m,m=s,s=o+r|0,o=a,a=i,i=t,t=r+(((t>>>2|t<<30)^(t>>>13|t<<19)^(t>>>22|t<<10))+n|0)|0}n=n+t|0,l=l+i|0,d=d+a|0,c=c+o|0,p=p+s|0,h=h+m|0,u=u+f|0,g=g+_|0}const m=e=>(e>>>0).toString(16).padStart(8,"0");return m(n)+m(l)+m(d)+m(c)+m(p)+m(h)+m(u)+m(g)}function Xr(e){const t=[],i=new Set;let a;const o=new RegExp(Rr.source,"g");for(;null!==(a=o.exec(e));){const e=a[1];i.has(e)||(i.add(e),t.push(e))}const s=new RegExp(Ar.source,"g");for(;null!==(a=s.exec(e));){const e=a[1];i.has(e)||(i.add(e),t.push(e))}return t}function Qr(e){if(!e||0===e.length)return{};let t,i;for(const a of e)void 0===t&&"string"==typeof a.flood_scope&&(t=a.flood_scope),void 0===i&&"boolean"==typeof a.region_scope&&(i=a.region_scope);return{floodScope:t,regionScope:i}}function Yr(e){var t,i;const a=Qr(e.rx_log_data);return{id:e.id,sender:e.sender,text:e.text,timestamp:new Date(e.timestamp),isOutgoing:e.outgoing,isSystem:!1,raw:e.text,mentions:Xr(e.text),rxLogData:e.rx_log_data,deliveryStatus:e.delivery_status?{status:e.delivery_status,ackReceived:e.ack_received,repeaterCount:e.repeater_count,roundTripMs:e.round_trip_ms}:void 0,repeaterCount:e.repeater_count,floodScope:null!==(t=e.flood_scope)&&void 0!==t?t:a.floodScope,regionScope:null!==(i=e.region_scope)&&void 0!==i?i:a.regionScope}}function Jr(e,t){return e.getFullYear()!==t.getFullYear()||e.getMonth()!==t.getMonth()||e.getDate()!==t.getDate()}function Zr(e){const t=new Date,i=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),o=Math.floor((i.getTime()-a.getTime())/864e5);return 0===o?"Today":1===o?"Yesterday":o<7?e.toLocaleDateString(void 0,{weekday:"long"}):e.toLocaleDateString(void 0,{weekday:"long",month:"long",day:"numeric"})}class en{constructor(e){this._messages=[],this._loading=!1,this._error=null,this._entityId=null,this._hass=null,this._pollTimer=null,this._realtimeSubscriptions=[],this._retryCount=0,this._onChange=null,this._fetchDebounce=null,this._active=!1,this._hasOlderMessages=!0,this._loadingOlder=!1,this._hasNewerMessages=!1,this._loadingNewer=!1,this._newMessagesWhileAway=0,this._userAtBottom=!1,this._config=e}get messages(){return this._messages}get loading(){return this._loading}get error(){return this._error}get entityId(){return this._entityId}get loadingOlder(){return this._loadingOlder}get hasOlderMessages(){return this._hasOlderMessages}get loadingNewer(){return this._loadingNewer}get hasNewerMessages(){return this._hasNewerMessages}get newMessagesWhileAway(){return this._newMessagesWhileAway}setUserAtBottom(e){this._userAtBottom!==e&&(this._userAtBottom=e,e&&!this._hasNewerMessages&&this._newMessagesWhileAway>0&&(this._newMessagesWhileAway=0,this._notify()))}resetNewMessagesCounter(){0!==this._newMessagesWhileAway&&(this._newMessagesWhileAway=0,this._notify())}setOnChange(e){this._onChange=e}setHass(e){this._hass=e}setConfig(e){this._config=e}async switchEntity(e,t=null){if(e!==this._entityId){if(this._stopUpdates(),this._entityId=e,this._messages=[],this._error=null,this._retryCount=0,this._hasOlderMessages=!0,this._loadingOlder=!1,this._hasNewerMessages=!1,this._loadingNewer=!1,this._newMessagesWhileAway=0,this._userAtBottom=!1,!e)return this._active=!1,void this._notify();this._active=!0,this._startUpdates(e),t?await this._fetchAroundAnchor(e,t):await this._fetchMessages(e)}}async refresh(){this._entityId&&await this._fetchMessages(this._entityId)}addOptimisticMessage(e,t){const i=new Date,a={id:`optimistic_${i.getTime()}_${Math.random().toString(36).slice(2,8)}`,sender:e,text:t,timestamp:i,isOutgoing:!0,isSystem:!1,raw:`${e}: ${t}`,mentions:[]};this._messages=[...this._messages,a],this._notify()}async loadOlderMessages(){if(!this._loadingOlder&&this._hasOlderMessages&&this._hass&&this._entityId){this._loadingOlder=!0,this._notify();try{const e=this._messages.find(e=>!e.id.startsWith("rt_")&&!e.id.startsWith("optimistic_")),t={type:"hivefw_integration/get_stored_messages",entity_id:this._entityId,limit:50};e&&(t.before=e.id);const i=await this._hass.callWS(t),a=i.messages.map(Yr);this._hasOlderMessages=i.has_more;const o=new Set(this._messages.map(e=>e.id)),s=a.filter(e=>!o.has(e.id));s.length>0&&(this._messages=[...s,...this._messages],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime()))}catch(e){}finally{this._loadingOlder=!1,this._notify()}}}async loadNewerMessages(){if(!this._loadingNewer&&this._hasNewerMessages&&this._hass&&this._entityId){this._loadingNewer=!0,this._notify();try{let t;for(let e=this._messages.length-1;e>=0;e--){const i=this._messages[e].id;if(!i.startsWith("rt_")&&!i.startsWith("optimistic_")){t=i;break}}const i={type:"hivefw_integration/get_stored_messages",entity_id:this._entityId,limit:50};t&&(i.after=t);const a=await this._hass.callWS(i),o=a.messages.map(Yr);this._hasNewerMessages=a.has_more;const s=new Set(o.map(e=>e.id));this._messages=this._messages.filter(e=>!e.id.startsWith("rt_")||!s.has(e.id.substring(3)));const r=new Set(this._messages.map(e=>e.id)),n=o.filter(e=>!r.has(e.id));if(n.length>0){var e;this._messages=[...this._messages,...n],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime());const t=null!==(e=this._config.max_messages)&&void 0!==e?e:500;this._messages.length>t&&(this._messages=this._messages.slice(-t),this._hasOlderMessages=!0)}}catch(e){}finally{this._loadingNewer=!1,this._notify()}}}async fetchAroundTimestamp(e){const t=new Date(e).getTime(),i=this._messages.find(e=>Math.abs(e.timestamp.getTime()-t)<2e3);if(i)return!0;let a=0;for(;this._hasOlderMessages&&a<20;){await this.loadOlderMessages(),a++;const e=this._messages.find(e=>Math.abs(e.timestamp.getTime()-t)<2e3);if(e)return!0}return!1}pause(){this._stopUpdates(),this._active=!1,this._fetchDebounce&&(clearTimeout(this._fetchDebounce),this._fetchDebounce=null)}async resume(){this._entityId&&!this._active&&(this._active=!0,this._startUpdates(this._entityId),await this._fetchMessages(this._entityId))}destroy(){this._stopUpdates(),this._active=!1,this._fetchDebounce&&(clearTimeout(this._fetchDebounce),this._fetchDebounce=null),this._onChange=null}async _fetchMessages(e){if(this._hass){this._loading=!0,this._notify();try{var t;const i=50,a=await this._hass.callWS({type:"hivefw_integration/get_stored_messages",entity_id:e,limit:i}),o=a.messages.map(Yr);this._hasOlderMessages=a.has_more;const s=new Set(o.map(e=>e.id)),r=this._messages.filter(e=>{if(e.id.startsWith("optimistic_")){const t=o.some(t=>t.sender===e.sender&&t.text===e.text);return!t}if(e.id.startsWith("rt_")){const t=e.id.substring(3);return!s.has(t)}return!1});this._messages=[...o,...r],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime());const n=null!==(t=this._config.max_messages)&&void 0!==t?t:500;this._messages.length>n&&(this._messages=this._messages.slice(-n),this._hasOlderMessages=!0),this._error=null,this._retryCount=0}catch(e){const t=e instanceof Error?e.message:String(e);this._error=`Failed to fetch messages: ${t}`,this._retryCount++}finally{this._loading=!1,this._notify()}}}async _fetchAroundAnchor(e,t){if(this._hass){this._loading=!0,this._notify();try{var i;const a=await async function(e,t,i,a=25,o=50){return e.callWS({type:"hivefw_integration/get_messages_around",entity_id:t,anchor_id:i,before_limit:a,after_limit:o})}(this._hass,e,t),o=a.messages.map(Yr);this._hasOlderMessages=a.has_more_before,this._hasNewerMessages=a.has_more_after;const s=new Set(o.map(e=>e.id)),r=this._messages.filter(e=>{if(e.id.startsWith("optimistic_")){const t=o.some(t=>t.sender===e.sender&&t.text===e.text);return!t}if(e.id.startsWith("rt_")){const t=e.id.substring(3);return!s.has(t)}return!1});this._messages=[...o,...r],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime());const n=null!==(i=this._config.max_messages)&&void 0!==i?i:500;this._messages.length>n&&(this._messages=this._messages.slice(-n),this._hasOlderMessages=!0),this._error=null,this._retryCount=0}catch(e){const t=e instanceof Error?e.message:String(e);this._error=`Failed to fetch messages: ${t}`,this._retryCount++}finally{this._loading=!1,this._notify()}}}_startUpdates(e){this._startPolling(e),this._subscribeRealtime(e).catch(()=>{})}async _subscribeRealtime(e){if(!this._hass)return;const t=[];try{const i=await this._hass.connection.subscribeEvents(t=>{t.data.entity_id===e&&this._handleRealtimeMessage(t.data)},"hivefw_message");t.push(i);const a=await this._hass.connection.subscribeEvents(t=>{t.data.entity_id===e&&this._handleDeliveryUpdate(t.data)},"hivefw_delivery_update");t.push(a),this._realtimeSubscriptions=t}catch(e){throw t.forEach(e=>e()),e}}_handleRealtimeMessage(e){var t,i;const a=null!==(t=e.sender_name)&&void 0!==t?t:e.sender,o=null!==(i=e.message)&&void 0!==i?i:e.text;if(a===this._config.node_name){if(a&&o){const t=e.ack_received,i=e.repeater_count,r=e.rx_log_data,n=e.message_type;let l;var s;if("dm"===n||"direct"===n)l={status:!0===t?"delivered":"sent",ackReceived:null!=t?t:void 0};else l={status:"sent",repeaterCount:null!=i?i:null!==(s=null==r?void 0:r.length)&&void 0!==s?s:0};for(let e=this._messages.length-1;e>=0;e--){const t=this._messages[e];if(t.id.startsWith("optimistic_")&&t.sender===a&&t.text===o){t.deliveryStatus=l,r&&(t.rxLogData=r),this._notify();break}}}!this._entityId||this._hasNewerMessages||this._hasOlderMessages||this._debouncedFetch(this._entityId)}else{if(a&&o){let t=o.replace(Mr,"");const i=a+": ";t.startsWith(i)&&(t=t.substring(i.length));const s=e.timestamp||(new Date).toISOString(),r=new Date(s),n=function(e,t,i){return Gr(`${e}|${t}|${i}`).substring(0,12)}(s,a,t),l=`rt_${n}`,d=this._messages.some(e=>e.id===l||e.id===n);if(!d){const i=Xr(t),s=e.rx_log_data,n={id:l,sender:a,text:t,timestamp:r,isOutgoing:!1,isSystem:!1,raw:o,mentions:i,rxLogData:s&&s.length>0?s:void 0,...Qr(s)};this._messages.push(n),this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime()),this._userAtBottom&&!this._hasNewerMessages||this._newMessagesWhileAway++,this._notify()}}!this._entityId||this._hasNewerMessages||this._hasOlderMessages||this._debouncedFetch(this._entityId)}}_debouncedFetch(e){this._fetchDebounce&&clearTimeout(this._fetchDebounce),this._fetchDebounce=setTimeout(async()=>{if(this._fetchDebounce=null,this._active)try{await this._fetchMessages(e)}catch(e){}},500)}_handleDeliveryUpdate(e){const t=e.rx_log_data;if(e.progressive&&t&&t.length>0){const i=e.sender_name,a=e.message,o=e.timestamp;if(i&&a){const e=o?new Date(o).getTime():0;for(let o=this._messages.length-1;o>=0;o--){const s=this._messages[o];if(!s.isOutgoing&&s.sender===i&&s.text===a&&(!e||Math.abs(s.timestamp.getTime()-e)<1e4))return s.rxLogData=t,s.repeaterCount=t.length,void this._notify()}}}const i=e.send_id,a=e.status,o=e.repeater_count,s=e.ack_received,r=e.round_trip_ms,n=e.progressive;if(!i)return;let l,d;l=a||(!0===s?"delivered":!n||void 0!==o&&0!==o?"sent":"waiting");for(let e=this._messages.length-1;e>=0;e--)if(this._messages[e].isOutgoing){d=this._messages[e];break}d&&(d.deliveryStatus={status:l,repeaterCount:o,ackReceived:s,roundTripMs:r},void 0!==o&&(d.repeaterCount=o),this._notify())}async _pollFetch(e){if(this._hass&&!this._hasNewerMessages)try{let i;for(let e=this._messages.length-1;e>=0;e--){const t=this._messages[e].id;if(!t.startsWith("rt_")&&!t.startsWith("optimistic_")){i=t;break}}const a={type:"hivefw_integration/get_stored_messages",entity_id:e,limit:50};i&&(a.after=i);const o=await this._hass.callWS(a);if(0===o.messages.length)return this._error=null,void(this._retryCount=0);const s=o.messages.map(Yr),r=new Set(this._messages.map(e=>e.id)),n=s.filter(e=>!r.has(e.id));if(n.length>0){var t;const e=new Set(n.map(e=>e.id));this._messages=this._messages.filter(t=>!t.id.startsWith("rt_")||!e.has(t.id.substring(3))),this._messages=this._messages.filter(e=>!e.id.startsWith("optimistic_")||!n.some(t=>t.sender===e.sender&&t.text===e.text)),this._messages=[...this._messages,...n],this._messages.sort((e,t)=>e.timestamp.getTime()-t.timestamp.getTime());const i=null!==(t=this._config.max_messages)&&void 0!==t?t:500;this._messages.length>i&&(this._messages=this._messages.slice(-i),this._hasOlderMessages=!0),this._notify()}this._error=null,this._retryCount=0}catch(e){this._retryCount++}}_startPolling(e){const t=()=>{if(!this._active)return;const i=this._retryCount>=5?6e4:3e4;this._pollTimer=setTimeout(async()=>{if(this._active){try{await this._pollFetch(e)}catch(e){}t()}},i)};t()}_stopUpdates(){this._pollTimer&&(clearTimeout(this._pollTimer),this._pollTimer=null);for(const e of this._realtimeSubscriptions)e();this._realtimeSubscriptions=[]}_notify(){this._onChange&&this._onChange()}}let tn=class extends br{constructor(){super(...arguments),this.conversations=[],this.activeId=null,this.unreadCounts={},this.nodePrefix=null,this._activeFilter="all",this._filteredConversations=[],this._appsChannelId=null,this._appsPickerOpen=!1}connectedCallback(){super.connectedCallback(),this._loadAppsChannelPreference()}updated(e){e.has("nodePrefix")&&this._loadAppsChannelPreference(),(e.has("conversations")||e.has("_activeFilter")||e.has("_appsChannelId"))&&this._updateFiltered()}render(){const e=this._getAppsChannel(),t=this._channelConversations();return er(n||(n=ds`
      <section class="apps-section" aria-label="Canal APPS/SOS">
        <div class="sidebar-header">
          <span class="sidebar-title">Canal APPS/SOS</span>

        </div>

        <div class="apps-channel-slot" role="listbox" aria-label="Canal APPS/SOS selecionado">
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
        </div>

        ${0}
      </section>

      <div class="conversation-sections">
        <section class="channels-section" aria-label="Canais">
          <div class="sidebar-header main-section-header">
            <div style="display:flex;align-items:center;gap:7px;min-width:0;">
              <span class="sidebar-title main-section-title">Canais</span>
              ${0}
            </div>
            <div class="apps-header-actions">
              <button class="compose-btn" title="Marcar todas as mensagens como lidas" aria-label="Marcar todas as mensagens como lidas"
                ?disabled=${0} @click=${0}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
              </button>
              <button class="compose-btn" title="Atualizar canais do rádio" aria-label="Atualizar canais do rádio"
                @click=${0}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.09 0-7.19 3.72-6.39 7.69l-2.08.68C2.47 7.11 6.48 2 12 2c2.76 0 5.26 1.12 7.07 2.93L22 2v8h-8l3.65-3.65zM6.35 17.65C7.8 19.1 9.79 20 12 20c4.09 0 7.19-3.72 6.39-7.69l2.08-.68C21.53 16.89 17.52 22 12 22c-2.76 0-5.26-1.12-7.07-2.93L2 22v-8h8l-3.65 3.65z"/></svg>
              </button>
              <button class="compose-btn" title="Gerir canais" aria-label="Gerir canais"
                @click=${0}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
              </button>
            </div>
          </div>
          <div class="conversation-list" role="listbox" aria-label="Canais" @keydown=${0}>
            ${0}
          </div>
        </section>
        <section class="contacts-section" aria-label="Contactos">
          <div class="sidebar-header main-section-header">
            <span class="sidebar-title main-section-title">Contactos</span>
            <button class="compose-btn" title="Gerir contactos" aria-label="Gerir contactos"
              @click=${0}>
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.49.49 0 00-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
            </button>
          </div>
          <div class="conversation-list" role="listbox" aria-label="Contactos adicionados" @keydown=${0}>
            ${0}
          </div>
        </section>
      </div>
    `),e?this._renderConversation(e,0):er(l||(l=ds`<div class="apps-empty">Seleciona o canal usado por APPS/SOS.</div>`)),this._appsPickerOpen?"true":"false",e=>{e.stopPropagation(),this._appsPickerOpen=!this._appsPickerOpen},this._appsPickerOpen?er(d||(d=ds`
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
        `),null===this._appsChannelId?"active":"",()=>this._setAppsChannel(null),null===this._appsChannelId?"✓":"",t.map(e=>{const t=String(e.channel_idx),i=t===this._appsChannelId;return er(c||(c=ds`
                <button
                  class="apps-picker-item ${0}"
                  @click=${0}>
                  <span class="apps-picker-check">${0}</span>
                  <span class="apps-picker-channel">${0}</span>
                </button>
              `),i?"active":"",()=>this._setAppsChannel(t),i?"✓":"",e.name||`Channel ${e.channel_idx}`)})):"",this._totalChannelUnreadCount()>0?er(p||(p=ds`<div class="unread-badge" aria-label="${0} mensagens por ler">${0}</div>`),this._totalChannelUnreadCount(),this._totalChannelUnreadCount()):ar,!this._hasUnreadMessages(),()=>this._markAllRead(),()=>this.dispatchEvent(new CustomEvent("refresh-channels-requested",{bubbles:!0,composed:!0})),()=>this.dispatchEvent(new CustomEvent("manage-requested",{detail:{tab:"channels"},bubbles:!0,composed:!0})),this._onListKeyDown,this._channelConversations().filter(e=>!this._isAppsChannel(e)).length?this._channelConversations().filter(e=>!this._isAppsChannel(e)).map((e,t)=>this._renderConversation(e,t)):er(h||(h=ds`<div class="empty-state"><div class="empty-text">Sem canais configurados</div></div>`)),()=>this.dispatchEvent(new CustomEvent("manage-requested",{detail:{tab:"contacts"},bubbles:!0,composed:!0})),this._onListKeyDown,this._addedContactConversations().length?this._addedContactConversations().map((e,t)=>this._renderConversation(e,t)):er(u||(u=ds`<div class="empty-state"><div class="empty-text">Sem contactos adicionados ao Companion</div></div>`)))}_onListKeyDown(e){var t;const i=e.key;if("ArrowDown"!==i&&"ArrowUp"!==i&&"Home"!==i&&"End"!==i&&"Enter"!==i&&" "!==i)return;const a=this.shadowRoot;if(!a)return;const o=Array.from(a.querySelectorAll(".conversation-item"));if(0===o.length)return;const s=a.activeElement;let r=s?o.indexOf(s):-1;"Enter"!==i&&" "!==i?(e.preventDefault(),"Home"===i?r=0:"End"===i?r=o.length-1:"ArrowDown"===i?r=r<0?0:Math.min(r+1,o.length-1):"ArrowUp"===i&&(r=r<0?o.length-1:Math.max(r-1,0)),null===(t=o[r])||void 0===t||t.focus()):s&&r>=0&&(e.preventDefault(),s.click())}_appsStorageKey(){return`hivefw.apps_sos_channel.${this.nodePrefix||"default"}`}_loadAppsChannelPreference(){try{const e=window.localStorage.getItem(this._appsStorageKey());this._appsChannelId=e&&e.length?e:null}catch(e){this._appsChannelId=null}}_setAppsChannel(e){this._appsChannelId=e,this._appsPickerOpen=!1;try{null===e?window.localStorage.removeItem(this._appsStorageKey()):window.localStorage.setItem(this._appsStorageKey(),e)}catch(e){}this._updateFiltered()}_channelConversations(){return this.conversations.filter(e=>!("pubkey_prefix"in e))}_addedContactConversations(){return this.conversations.filter(e=>"pubkey_prefix"in e&&!1!==e.added_to_node)}_getAppsChannel(){var e;return null===this._appsChannelId?null:null!==(e=this._channelConversations().find(e=>String(e.channel_idx)===this._appsChannelId))&&void 0!==e?e:null}_isAppsChannel(e){return null!==this._appsChannelId&&!("pubkey_prefix"in e)&&String(e.channel_idx)===this._appsChannelId}_renderFilterBtn(e,t){const i=this._activeFilter===e;return er(g||(g=ds`
      <button
        class="filter-btn ${0}"
        role="tab"
        aria-selected=${0}
        @click=${0}>
        ${0}
      </button>
    `),i?"active":"",i?"true":"false",()=>{this._activeFilter=e},t)}_totalChannelUnreadCount(){return this._channelConversations().reduce((e,t)=>e+this._getUnreadCount(String(t.channel_idx)),0)}_hasUnreadMessages(){var e,t,i;const a=null!==(e=null!==(t=null===(i=this.unread)||void 0===i?void 0:i.counts)&&void 0!==t?t:this.unreadCounts)&&void 0!==e?e:{};return Object.values(a).some(e=>Number(e)>0)}_markAllRead(){this.dispatchEvent(new CustomEvent("mark-all-read-requested",{bubbles:!0,composed:!0}))}_emptyMessage(){switch(this._activeFilter){case"unread":return"No unread conversations";case"dms":return"No direct messages";case"channels":return"No channels";default:return"No conversations yet"}}_renderConversation(e,t){const i="pubkey_prefix"in e,a=i?e.pubkey_prefix:String(e.channel_idx),o=i?e.adv_name:e.name,s=i?e.pubkey_prefix:`Channel ${e.channel_idx}`,r=i?e.pubkey_prefix.substring(0,2).toUpperCase():`#${e.channel_idx}`,n=this.activeId===a,l=this._getUnreadCount(a),d=l>0?`${o}, ${s}, ${l} unread`:`${o}, ${s}`,c=this._filteredConversations.some(e=>("pubkey_prefix"in e?e.pubkey_prefix:String(e.channel_idx))===this.activeId);return er(v||(v=ds`
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
    `),n?"conversation-item active":"conversation-item",n||!c&&0===t?"0":"-1",n?"true":"false",d,()=>this.dispatchEvent(new CustomEvent("conversation-selected",{detail:{id:a,isContact:i}})),i?"":"channel",r,o,s,l>0?er(m||(m=ds`<div class="unread-badge" aria-hidden="true">${0}</div>`),l):er(f||(f=ds`<span class="chevron" aria-hidden="true">›</span>`)))}_getUnreadCount(e){return this.unread?this.unread.badgeCount(e,this.nodePrefix):0}_updateFiltered(){const e=this.conversations.filter(e=>!this._isAppsChannel(e));switch(this._activeFilter){case"all":this._filteredConversations=[...e];break;case"unread":this._filteredConversations=e.filter(e=>{const t="pubkey_prefix"in e?e.pubkey_prefix:String(e.channel_idx);return this._getUnreadCount(t)>0});break;case"dms":this._filteredConversations=e.filter(e=>"pubkey_prefix"in e);break;case"channels":this._filteredConversations=e.filter(e=>!("pubkey_prefix"in e))}}};tn.styles=ms(_||(_=ds`
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
      padding-right:12px;
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

    .conversation-sections {
      flex: 1 1 auto;
      min-height: 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .channels-section,
    .contacts-section {
      min-height: 0;
      display: flex;
      flex-direction: column;
    }
    .channels-section { flex: 6 1 0; }
    .contacts-section {
      flex: 4 1 0;
      border-top: 1px solid var(--divider-color, #e0e0e0);
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
  `)),cs([kr({type:Array})],tn.prototype,"conversations",void 0),cs([kr({type:String})],tn.prototype,"activeId",void 0),cs([kr({attribute:!1})],tn.prototype,"unread",void 0),cs([kr({type:Object})],tn.prototype,"unreadCounts",void 0),cs([kr({type:String})],tn.prototype,"nodePrefix",void 0),cs([Sr()],tn.prototype,"_activeFilter",void 0),cs([Sr()],tn.prototype,"_filteredConversations",void 0),cs([Sr()],tn.prototype,"_appsChannelId",void 0),cs([Sr()],tn.prototype,"_appsPickerOpen",void 0),tn=cs([xr("meshcore-conversation-list")],tn);const an=["a[href]","button:not([disabled])",'input:not([disabled]):not([type="hidden"])',"select:not([disabled])","textarea:not([disabled])",'[tabindex]:not([tabindex="-1"])'].join(","),on=[];let sn=!1;function rn(){sn||(sn=!0,document.addEventListener("keydown",nn,!0))}function nn(e){0!==on.length&&on[on.length-1]._handleKeyDown(e)}class ln{constructor(e,t){this.host=e,this.opts=t,this._wasOpen=!1,this._previousActive=null,this._inStack=!1,this.host.addController(this),rn()}hostConnected(){rn()}hostDisconnected(){this._inStack&&this._popStack(),this._previousActive=null,this._wasOpen=!1}hostUpdated(){const e=this.opts.isOpen();if(e&&!this._wasOpen)this._previousActive=this._currentDocumentActive(),this._pushStack(),this._focusFirstSoon();else if(!e&&this._wasOpen){this._popStack();const e=this._previousActive;if(this._previousActive=null,e&&e.isConnected&&"function"==typeof e.focus)try{e.focus()}catch(e){}}this._wasOpen=e}_pushStack(){this._inStack||(on.push(this),this._inStack=!0)}_popStack(){const e=on.indexOf(this);e>=0&&on.splice(e,1),this._inStack=!1}_getFocusables(){var e,t,i;const a=null!==(e=null===(t=(i=this.opts).getScope)||void 0===t?void 0:t.call(i))&&void 0!==e?e:this.host.shadowRoot;return a?Array.from(a.querySelectorAll(an)).filter(e=>!(e.hasAttribute("aria-hidden")||e.hidden||null===e.offsetParent&&0===e.getClientRects().length)):[]}_focusFirstSoon(){queueMicrotask(()=>{var e,t,i;if(!this.opts.isOpen())return;const a=null!==(e=null===(t=(i=this.opts).getScope)||void 0===t?void 0:t.call(i))&&void 0!==e?e:this.host.shadowRoot;if(a&&this._scopeContainsFocus(a))return;const o=this._getFocusables();if(0!==o.length)try{o[0].focus()}catch(e){}})}_scopeContainsFocus(e){let t=document.activeElement;for(;t;){if(t===e)return!0;if(e.host===t)return!0;if("contains"in e&&e.contains(t))return!0;const i=t.shadowRoot;if(!i||!i.activeElement)break;t=i.activeElement}return!1}_currentDocumentActive(){let e=document.activeElement;for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement;return e}_handleKeyDown(e){var t,i,a;if(!this.opts.isOpen())return;if("Escape"===e.key)return e.preventDefault(),e.stopPropagation(),void this.opts.onEscape();if("Tab"!==e.key)return;const o=this._getFocusables();if(0===o.length)return;const s=null!==(t=null===(i=(a=this.opts).getScope)||void 0===i?void 0:i.call(a))&&void 0!==t?t:this.host.shadowRoot,r=s?this._findFocusedInScope(s):null,n=r?o.indexOf(r):-1;let l;l=e.shiftKey?n<=0?o.length-1:n-1:-1===n||n>=o.length-1?0:n+1,e.preventDefault(),e.stopPropagation();try{o[l].focus()}catch(e){}}_findFocusedInScope(e){let t=document.activeElement;for(;t;){if(e===t||"contains"in e&&e.contains(t)){if(t.shadowRoot&&t.shadowRoot.activeElement){t=t.shadowRoot.activeElement;continue}return t}if(e.host===t){t=e.activeElement;continue}const i=t.shadowRoot;if(!i||!i.activeElement)break;t=i.activeElement}return null}}function dn(e,t){new ln(e,t)}let cn=class extends br{constructor(){super(),this.open=!1,this.narrow=!1,this.editMode=!1,this.initialChannelIdx=0,this.initialChannelName="",this.initialScope="",this.initialKey="",this.availableIndices=[],this._channelIdx=0,this._channelName="",this._customKey="",this._autoKey=!0,this._scope="",this._availableScopes=null,this._globalAllowed=!1,this._saving=!1,this._error=null,this._initialized=!1,dn(this,{isOpen:()=>this.open,onEscape:()=>this._onCancel()})}willUpdate(e){if(e.has("open")&&this.open&&!this._initialized){if(this.editMode){this._channelIdx=this.initialChannelIdx,this._channelName=this.initialChannelName,this._scope=this.initialScope;const e=Gr(this.initialChannelName).slice(0,32);this.initialKey&&this.initialKey.toLowerCase()!==e?(this._autoKey=!1,this._customKey=this.initialKey.toLowerCase()):(this._autoKey=!0,this._customKey="")}else{this._channelIdx=this.availableIndices.length>0?this.availableIndices[0]:0,this._channelName=this.initialChannelName||"",this._scope=this.initialScope||"";const e=this._channelName?Gr(this._channelName).slice(0,32):"";this.initialKey&&this.initialKey.toLowerCase()!==e?(this._autoKey=!1,this._customKey=this.initialKey.toLowerCase()):(this._autoKey=!0,this._customKey="")}this._initialized=!0,this._loadScopes()}e.has("open")&&!this.open&&(this._initialized=!1),!this.editMode&&this.open&&e.has("availableIndices")&&this.availableIndices.length>0&&!this.availableIndices.includes(this._channelIdx)&&(this._channelIdx=this.availableIndices[0])}async _loadScopes(){if(this._availableScopes=null,!this.hass)return this._availableScopes=[],void(this._globalAllowed=!1);const e=await Or(this.hass,this.entryId);this._availableScopes=e.scopes,this._globalAllowed=e.global}render(){if(!this.open)return;const e=this._customKey.length,t=32===e||0===e||this._autoKey;return er(b||(b=ds`
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
    `),this._onOverlayClick,this.editMode?"Edit channel":"Add channel",this.editMode?"Edit Channel":"Add Channel",this._error?er(y||(y=ds`<div style="padding: 12px; background: rgba(219, 68, 55, 0.1); border-radius: 6px; color: var(--error-color, #db4437); font-size: 13px; margin-bottom: 16px;">
                  ${0}
                </div>`),this._error):"",this.editMode?er(x||(x=ds`
                    <select class="form-select" disabled>
                      <option value=${0} selected>${0}</option>
                    </select>`),this._channelIdx,this._channelIdx):er(w||(w=ds`
                    <select
                      class="form-select"
                      @change=${0}>
                      ${0}
                    </select>`),e=>{this._channelIdx=parseInt(e.target.value,10)},this.availableIndices.map(e=>er($||($=ds`
                        <option value=${0} ?selected=${0}>${0}</option>
                      `),e,e===this._channelIdx,e))),this.editMode?"Channel index cannot be changed":"Select an available channel slot",this._channelName,e=>{this._channelName=e.target.value},this._renderScopeField(),this._autoKey,e=>{this._autoKey=e.target.checked},this._autoKey?"":er(k||(k=ds`
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
                `),this._customKey,e=>{const t=e.target.value.toLowerCase().replace(/[^a-f0-9]/g,"");this._customKey=t.slice(0,32)},this._customKey.length,t?"Valid hex key (16 bytes / 128-bit AES)":`Invalid: expected 32 characters, got ${e}`),this._saving,this._onCancel,!this._channelName||this._saving||!this._autoKey&&!t||!this.editMode&&0===this.availableIndices.length,this._onSave,this._saving?"Saving...":"Save")}_renderScopeField(){const e=this._availableScopes;if(null===e)return er(S||(S=ds`
        <select class="form-select scope-select" disabled>
          <option selected>Loading…</option>
        </select>
      `));const t=this._globalAllowed?"*":"",i=!this._scope||"*"===this._scope,a=!!this._scope&&"*"!==this._scope&&!e.includes(this._scope);return 0!==e.length||a||this._globalAllowed?er(M||(M=ds`
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
    `),e=>{this._scope=e.target.value},t,i,a?er(R||(R=ds`<option value=${0} selected>${0} (not in allowlist)</option>`),this._scope,this._scope):"",e.map(e=>er(A||(A=ds`
            <option value=${0} ?selected=${0}>${0}</option>
          `),e,e===this._scope,e))):er(C||(C=ds`
        <select class="form-select scope-select" disabled>
          <option selected>All regions (global flood)</option>
        </select>
        <div class="form-description scope-empty-hint">
          No region scopes are configured yet. Add them in HiveFW
          (Dispositivo → Global Settings → Flood Scope Allowlist), then
          reopen this dialog. Region names are agreed within your local
          mesh community.
        </div>
      `))}async _onSave(){if(this.hass&&this._channelName){this._saving=!0,this._error=null;try{(await async function(e,t,i,a,o,s){try{const r={type:"hivefw_integration/set_channel",channel_idx:t,name:i};return a&&(r.key=a),o&&(r.entry_id=o),void 0!==s&&(r.scope=s),await e.callWS(r)}catch(e){return{success:!1}}}(this.hass,this._channelIdx,this._channelName,this._autoKey?void 0:this._customKey,this.entryId,this._scope)).success?(this.dispatchEvent(new CustomEvent("channel-saved",{detail:{channelIdx:this._channelIdx,name:this._channelName,scope:this._scope},bubbles:!0})),this._reset()):this._error="Failed to save channel"}catch(e){this._error=`Error: ${String(e)}`}finally{this._saving=!1}}}_onCancel(){this._reset(),this.dispatchEvent(new CustomEvent("close",{bubbles:!0}))}_onOverlayClick(e){e.target===e.currentTarget&&this._onCancel()}_reset(){this._channelIdx=0,this._channelName="",this._customKey="",this._autoKey=!0,this._scope="",this._availableScopes=null,this._globalAllowed=!1,this._error=null}};cn.styles=[Cr,ms(T||(T=ds`
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
    `))],cs([kr({type:Boolean})],cn.prototype,"open",void 0),cs([kr({type:Object})],cn.prototype,"hass",void 0),cs([kr({type:String})],cn.prototype,"entryId",void 0),cs([kr({type:Boolean})],cn.prototype,"narrow",void 0),cs([kr({type:Boolean})],cn.prototype,"editMode",void 0),cs([kr({type:Number})],cn.prototype,"initialChannelIdx",void 0),cs([kr({type:String})],cn.prototype,"initialChannelName",void 0),cs([kr({type:String})],cn.prototype,"initialScope",void 0),cs([kr({type:String})],cn.prototype,"initialKey",void 0),cs([kr({type:Array})],cn.prototype,"availableIndices",void 0),cs([Sr()],cn.prototype,"_channelIdx",void 0),cs([Sr()],cn.prototype,"_channelName",void 0),cs([Sr()],cn.prototype,"_customKey",void 0),cs([Sr()],cn.prototype,"_autoKey",void 0),cs([Sr()],cn.prototype,"_scope",void 0),cs([Sr()],cn.prototype,"_availableScopes",void 0),cs([Sr()],cn.prototype,"_globalAllowed",void 0),cs([Sr()],cn.prototype,"_saving",void 0),cs([Sr()],cn.prototype,"_error",void 0),cn=cs([xr("meshcore-channel-dialog")],cn);let pn=class extends br{willUpdate(){this._tabInitialized||(this._tabInitialized=!0,this.initialTab&&(this._activeTab=this.initialTab))}constructor(){super(),this.narrow=!1,this.lockedTab=!1,this._tabInitialized=!1,this._activeTab="contacts",this._contacts=[],this._channels=[],this._searchQuery="",this._categoryFilter="all",this._typeFilter="all",this._loading=!1,this._actionInProgress=null,this._confirmingRemoveContact=null,this._confirmingRemoveChannel=null,this._channelDialogOpen=!1,this._editingChannel=null,this._suggestedChannelName="",this._suggestedChannelKey="",this._maxChannels=4,dn(this,{isOpen:()=>!0,onEscape:()=>this._close()})}connectedCallback(){super.connectedCallback(),this._loadData()}render(){var e,t,i,a,o,s,r,n;return er(z||(z=ds`
      <div
        class="dialog"
        role="dialog"
        aria-modal="true"
        aria-label="Manage contacts and channels"
        @click=${0}>
        <div class="dialog-header">
          <span class="dialog-title">${0}</span>
          <button class="close-btn" aria-label="Close" @click=${0}>✕</button>
        </div>

        ${0}

        ${0}

        <div class="list-area">
          ${0}
        </div>
      </div>

      ${0}
    `),e=>e.stopPropagation(),this.lockedTab?"contacts"===this._activeTab?"Contactos":"Canais":"Manage",this._close,this.lockedTab?er(N||(N=ds``)):er(I||(I=ds`
          <div class="tab-bar">
            <button class=${0} @click=${0}>Contacts</button>
            <button class=${0} @click=${0}>Channels</button>
          </div>
        `),"contacts"===this._activeTab?"active":"",()=>this._switchTab("contacts"),"channels"===this._activeTab?"active":"",()=>this._switchTab("channels")),"contacts"===this._activeTab?er(F||(F=ds`
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
            `),["all","added","discovered"].map(e=>er(D||(D=ds`
                      <button
                        class="filter-chip ${0}"
                        @click=${0}
                      >
                        ${0}
                      </button>
                    `),this._categoryFilter===e?"active":"",()=>{this._categoryFilter=e},"all"===e?"All":"added"===e?"Added":"Discovered")),["all","clients","repeaters"].map(e=>er(E||(E=ds`
                      <button
                        class="filter-chip ${0}"
                        @click=${0}
                      >
                        ${0}
                      </button>
                    `),this._typeFilter===e?"active":"",()=>{this._typeFilter=e},"all"===e?"All":"clients"===e?"Clients":"Repeaters")),this._searchQuery,e=>{this._searchQuery=e.target.value}):"",this._loading?er(O||(O=ds`<div class="loading-state">
                <div class="loading-spinner"></div>
                Loading...
              </div>`)):"contacts"===this._activeTab?this._renderContacts():this._renderChannels(),this._channelDialogOpen?er(P||(P=ds`
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
          `),!0,this.hass,this.entryId,this.narrow,!!this._editingChannel,null!==(e=null===(t=this._editingChannel)||void 0===t?void 0:t.channel_idx)&&void 0!==e?e:0,null!==(i=null===(a=this._editingChannel)||void 0===a?void 0:a.name)&&void 0!==i?i:this._suggestedChannelName,null!==(o=null===(s=this._editingChannel)||void 0===s?void 0:s.scope)&&void 0!==o?o:"",null!==(r=null===(n=this._editingChannel)||void 0===n||null===(n=n.settings)||void 0===n?void 0:n.channel_secret)&&void 0!==r?r:this._suggestedChannelKey,this._getAvailableIndices(),this._onChannelSaved,()=>{this._channelDialogOpen=!1,this._editingChannel=null,this._suggestedChannelName="",this._suggestedChannelKey=""}):"")}_renderContacts(){const e=this._filterContacts();if(0===e.length){const e=!!this._searchQuery||"all"!==this._categoryFilter||"all"!==this._typeFilter;return er(B||(B=ds`
        <div class="empty-state">
          <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg></div>
          <div class="empty-text">
            ${0}
          </div>
        </div>
      `),e?"No contacts match":"No contacts discovered")}const t=[...e].sort((e,t)=>e.added_to_node!==t.added_to_node?e.added_to_node?-1:1:e.adv_name.localeCompare(t.adv_name));return t.map(e=>this._renderContactItem(e))}_renderContactItem(e){const t=e.pubkey_prefix.substring(0,2).toUpperCase(),i=e.added_to_node,a=this._confirmingRemoveContact===e.public_key,o=this._actionInProgress===e.public_key;return er(L||(L=ds`
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
    `),t,e.adv_name||"Unknown",e.pubkey_prefix,i?"added":"discovered",i?er(H||(H=ds`<svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor" style="vertical-align: -1px; margin-right: 2px;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>Added`)):"Discovered",a?er(U||(U=ds`
              <div class="confirm-inline">
                <span class="confirm-text">Remove?</span>
                <button class="confirm-btn yes" @click=${0}>Yes</button>
                <button class="confirm-btn no" @click=${0}>No</button>
              </div>
            `),()=>this._doRemoveContact(e),()=>{this._confirmingRemoveContact=null}):i?er(q||(q=ds`
                <button
                  class="action-btn remove"
                  ?disabled=${0}
                  @click=${0}>
                  ${0}
                </button>
              `),o,()=>{this._confirmingRemoveContact=e.public_key},o?"...":"Remove"):er(j||(j=ds`
                <button
                  class="action-btn add"
                  ?disabled=${0}
                  @click=${0}>
                  ${0}
                </button>
              `),o,()=>this._doAddContact(e),o?"...":er(V||(V=ds`<svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" style="vertical-align: -1px; margin-right: 4px;"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>Add`))))}_renderChannels(){if(0===this._channels.length)return er(W||(W=ds`
        <div class="empty-state">
          <div class="empty-icon">#</div>
          <div class="empty-text">No channels configured</div>
        </div>
        <button class="add-channel-btn" @click=${0}>
          + Add Channel
        </button>
      `),this._openAddChannel);const e=this._confirmingRemoveChannel;return er(K||(K=ds`
      ${0}
      <button class="add-channel-btn" @click=${0}>
        + Add Channel
      </button>
    `),this._channels.map(t=>{const i=e===t.channel_idx,a=this._actionInProgress===`ch-${t.channel_idx}`;return er(G||(G=ds`
          <div class="channel-item">
            <div class="channel-icon">#</div>
            <div class="channel-info">
              <div class="channel-name">${0}</div>
              <div class="channel-idx">Index ${0}${0}</div>
            </div>
            ${0}
          </div>
        `),t.name,t.channel_idx,t.scope?er(X||(X=ds` · scope: ${0}`),t.scope):"",i?er(Q||(Q=ds`
                  <div class="confirm-inline">
                    <span class="confirm-text">Remove?</span>
                    <button class="confirm-btn yes" @click=${0}>Yes</button>
                    <button class="confirm-btn no" @click=${0}>No</button>
                  </div>
                `),()=>this._doRemoveChannel(t),()=>{this._confirmingRemoveChannel=null}):er(Y||(Y=ds`
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
                `),a,()=>this._openEditChannel(t),a,()=>{this._confirmingRemoveChannel=t.channel_idx},a?"...":"Remove"))}),this._openAddChannel)}async _loadData(){if(this.hass){this._loading=!0;try{const[e,t]=await Promise.all([Nr(this.hass,this.entryId),Fr(this.hass,this.entryId)]);this._contacts=e,this._channels=t;try{const e=await Dr(this.hass,this.entryId);null!=e&&e.max_channels&&(this._maxChannels=e.max_channels)}catch(e){}}finally{this._loading=!1}}}_switchTab(e){this._activeTab=e,this._searchQuery="",this._categoryFilter="all",this._typeFilter="all",this._confirmingRemoveContact=null,this._confirmingRemoveChannel=null}_filterContacts(){let e=this._contacts;if("added"===this._categoryFilter?e=e.filter(e=>e.added_to_node):"discovered"===this._categoryFilter&&(e=e.filter(e=>!e.added_to_node)),"clients"===this._typeFilter?e=e.filter(e=>{var t;const i=null!==(t=e.type)&&void 0!==t?t:0;return 0===i||1===i}):"repeaters"===this._typeFilter&&(e=e.filter(e=>2===e.type)),this._searchQuery){const t=this._searchQuery.toLowerCase();e=e.filter(e=>(e.adv_name||"").toLowerCase().includes(t)||(e.pubkey_prefix||"").toLowerCase().includes(t))}return e}async _doAddContact(e){if(this.hass){this._actionInProgress=e.public_key;try{if((await Ur(this.hass,e.public_key,e.adv_name,this.entryId)).success){const e=await Nr(this.hass,this.entryId);this._contacts=e,this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0}))}}finally{this._actionInProgress=null}}}async _doRemoveContact(e){if(this.hass){this._confirmingRemoveContact=null,this._actionInProgress=e.public_key;try{if((await qr(this.hass,e.public_key,this.entryId)).success){const e=await Nr(this.hass,this.entryId);this._contacts=e,this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0}))}}finally{this._actionInProgress=null}}}_openAddChannel(){this._editingChannel=null,this._suggestedChannelName="",this._suggestedChannelKey="",this._channelDialogOpen=!0}openSuggestedChannel(e,t){this._activeTab="channels",this._editingChannel=null,this._suggestedChannelName=String(e||""),this._suggestedChannelKey=String(t||"").toLowerCase(),this._channelDialogOpen=!0}_openEditChannel(e){this._editingChannel=e,this._channelDialogOpen=!0}_getAvailableIndices(){const e=new Set(this._channels.map(e=>e.channel_idx)),t=[];for(let i=0;i<this._maxChannels;i++)e.has(i)||t.push(i);return t}async _doRemoveChannel(e){if(this.hass){this._confirmingRemoveChannel=null,this._actionInProgress=`ch-${e.channel_idx}`;try{if((await async function(e,t,i){try{const a={type:"hivefw_integration/remove_channel",channel_idx:t};return i&&(a.entry_id=i),await e.callWS(a)}catch(e){return{success:!1}}}(this.hass,e.channel_idx,this.entryId)).success){const e=await Fr(this.hass,this.entryId);this._channels=e,this.dispatchEvent(new CustomEvent("channels-changed",{bubbles:!0,composed:!0}))}}finally{this._actionInProgress=null}}}async _onChannelSaved(){if(this._channelDialogOpen=!1,this._editingChannel=null,this._suggestedChannelName="",this._suggestedChannelKey="",this.hass){const e=await Fr(this.hass,this.entryId);this._channels=e,this.dispatchEvent(new CustomEvent("channels-changed",{bubbles:!0,composed:!0}))}}_close(){this.dispatchEvent(new CustomEvent("manage-closed",{bubbles:!0,composed:!0}))}};pn.styles=ms(J||(J=ds`
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
  `)),cs([kr({type:Object})],pn.prototype,"hass",void 0),cs([kr({type:String})],pn.prototype,"entryId",void 0),cs([kr({type:Boolean})],pn.prototype,"narrow",void 0),cs([kr({type:String})],pn.prototype,"initialTab",void 0),cs([kr({type:Boolean})],pn.prototype,"lockedTab",void 0),cs([Sr()],pn.prototype,"_activeTab",void 0),cs([Sr()],pn.prototype,"_contacts",void 0),cs([Sr()],pn.prototype,"_channels",void 0),cs([Sr()],pn.prototype,"_searchQuery",void 0),cs([Sr()],pn.prototype,"_categoryFilter",void 0),cs([Sr()],pn.prototype,"_typeFilter",void 0),cs([Sr()],pn.prototype,"_loading",void 0),cs([Sr()],pn.prototype,"_actionInProgress",void 0),cs([Sr()],pn.prototype,"_confirmingRemoveContact",void 0),cs([Sr()],pn.prototype,"_confirmingRemoveChannel",void 0),cs([Sr()],pn.prototype,"_channelDialogOpen",void 0),cs([Sr()],pn.prototype,"_editingChannel",void 0),cs([Sr()],pn.prototype,"_suggestedChannelName",void 0),cs([Sr()],pn.prototype,"_suggestedChannelKey",void 0),cs([Sr()],pn.prototype,"_maxChannels",void 0),pn=cs([xr("meshcore-manage-dialog")],pn);let hn=class extends br{constructor(){super(),this.timestampFormat="relative",this._selectedMessage=null,dn(this,{isOpen:()=>null!==this._selectedMessage,onEscape:()=>{this._selectedMessage=null},getScope:()=>{var e;return null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".message-dialog")}})}render(){return this.group?er(Z||(Z=ds`
        ${0}
        ${0}
      `),this._renderGroup(),this._selectedMessage?this._renderMessageDialog(this._selectedMessage):er(ee||(ee=ds``))):er(te||(te=ds``))}_renderGroup(){if(!this.group)return er(ie||(ie=ds``));const e=this.group,t={"message-group":!0,incoming:!e.isOutgoing&&!e.isSystem,outgoing:e.isOutgoing,system:e.isSystem};let i;return e.messages.length>0&&(i=e.messages[0].senderColor||function(e){let t=0;for(let i=0;i<e.length;i++)t=(t<<5)-t+e.charCodeAt(i);const i=["#e57373","#64b5f6","#81c784","#ffb74d","#ba68c8","#4dd0e1","#fff176","#a1887f"];return i[Math.abs(t)%i.length]}(e.sender)),er(ae||(ae=ds`
      <div class=${0} style=${0}>
        ${0}
        ${0}
      </div>
    `),this._classMap(t),i?`--sender-color: ${i}`:"",e.isSystem||e.isOutgoing?er(se||(se=ds``)):er(oe||(oe=ds`<div class="sender">${0}</div>`),e.sender),e.messages.map(e=>this._renderBubble(e)))}_renderBubble(e){var t,i;const a={bubble:!0,incoming:!e.isOutgoing&&!e.isSystem,outgoing:e.isOutgoing,system:e.isSystem},o=e.isOutgoing&&e.deliveryStatus?this._getStatusLabel(e.deliveryStatus):"",s=function(e,t){switch(t){case"relative":default:return function(e){const t=Date.now()-e.getTime(),i=Math.floor(t/1e3),a=Math.floor(i/60),o=Math.floor(a/60);return i<60?"now":a<60?`${a}m`:o<24?`${o}h`:e.toLocaleDateString(void 0,{month:"short",day:"numeric"})}(e);case"time":return e.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit",second:"2-digit"});case"datetime":return e.toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"2-digit"})}}(e.timestamp,this.timestampFormat),r=e.isOutgoing||e.isSystem||!e.floodScope?"":"*"===e.floodScope?"🌐 all regions":e.floodScope,n=e.isOutgoing||e.isSystem||null===(t=e.rxLogData)||void 0===t||!t.length?void 0:e.rxLogData[e.rxLogData.length-1],l=null==n?void 0:n.path_nodes,d=Number(null==n?void 0:n.hop_count),c=Number.isFinite(d)?d:null!==(i=null==l?void 0:l.length)&&void 0!==i?i:0,p=Number(null==n?void 0:n.rssi),h=Number(null==n?void 0:n.snr),u=n?[`${c} hop${1===c?"":"s"}`,Number.isFinite(p)?`RSSI ${Math.round(p)} dBm`:"",Number.isFinite(h)?`SNR ${h.toFixed(1)} dB`:""].filter(Boolean):[];return er(re||(re=ds`
      <div class=${0} data-msg-id=${0} @click=${0}>
        <div class="message-text">${0}</div>
        <div class="timestamp">${0}${0}${0}</div>
        ${0}
      </div>
    `),this._classMap(a),e.id,t=>{t.stopPropagation(),this._selectedMessage=e},this._renderTextWithMentions(e.text,e.mentions),o?er(ne||(ne=ds`<span class="delivery-status">${0}</span> · `),o):"",s,r?er(le||(le=ds` · <span class="flood-scope">${0}</span>`),r):"",u.length?er(de||(de=ds`<div class="route-info-inline">${0}</div>`),u.join(" · ")):er(ce||(ce=ds``)))}_getStatusLabel(e){var t;const i=e.status,a=null!==(t=e.repeaterCount)&&void 0!==t?t:0;switch(i){case"pending":case"waiting":return"Waiting...";case"sent":return a>0?"Repeated":"Unheard";case"delivered":return"Delivered";case"failed":return"Failed";default:return"Sent"}}_renderTextWithMentions(e,t){if(0===t.length)return e;const i=t.map(e=>e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),a=new RegExp(`@\\[(${i.join("|")})\\]|@(${i.join("|")})\\b`,"g"),o=[];let s,r=0;for(;null!==(s=a.exec(e));){var n;s.index>r&&o.push(e.slice(r,s.index));const t=null!==(n=s[1])&&void 0!==n?n:s[2];o.push(er(pe||(pe=ds`<span class="mention">@${0}</span>`),t)),r=s.index+s[0].length}return r<e.length&&o.push(e.slice(r)),o}_renderMessageDialog(e){var t;const i=e.rxLogData&&e.rxLogData.length>0,a=i?e.rxLogData.map(e=>{const t=e.path_nodes,i=e.hop_count,a=e.snr,o=e.rssi,s=[];return t&&t.length>0?s.push(t.map(e=>e.substring(0,4).toUpperCase()).join(" > ")):void 0!==i?s.push(`${i} hop${1!==i?"s":""}`):s.push("0 hops"),void 0!==a&&s.push(`SNR: ${a}`),void 0!==o&&s.push(`RSSI: ${o}`),s.join(" · ")}).join(" | "):"",o=e.timestamp.toLocaleString(void 0,{weekday:"short",month:"short",day:"numeric",year:"numeric",hour:"numeric",minute:"2-digit",second:"2-digit"}),s="padding: 8px 16px; font-size: 12px; color: var(--secondary-text-color); border-top: 1px solid var(--divider-color, #e0e0e0);";return er(he||(he=ds`
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
    `),()=>{this._selectedMessage=null},e=>e.stopPropagation(),e.text,()=>this._copyText(e.text),e.isOutgoing||e.isSystem?er(ge||(ge=ds``)):er(ue||(ue=ds`
                <button class="message-dialog-action" @click=${0}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align: -2px; margin-right: 4px;"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>Reply
                </button>
              `),()=>this._replyToSender(e.sender)),i?er(ve||(ve=ds`
                <div class="message-dialog-route" @click=${0}>
                  Route: ${0}
                </div>
                <button class="message-dialog-action" @click=${0}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align: -2px; margin-right: 4px;"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"/></svg>
                  Mostrar no mapa
                </button>
              `),()=>this._copyText(a),a,()=>this._showRouteOnMap(e)):er(me||(me=ds``)),s,e.isOutgoing?"Sent":"Received",o,e.isOutgoing&&e.deliveryStatus?er(fe||(fe=ds`
                <div style=${0}>
                  ${0}${0}${0}
                </div>
              `),s,(null!==(t=e.deliveryStatus.repeaterCount)&&void 0!==t?t:0)>0?`${e.deliveryStatus.repeaterCount} repeater${1===e.deliveryStatus.repeaterCount?"":"s"} responded`:"No repeaters responded",e.deliveryStatus.ackReceived?" · ACK received":"",e.deliveryStatus.roundTripMs?` · ${e.deliveryStatus.roundTripMs}ms RTT`:""):er(_e||(_e=ds``)))}async _copyText(e){try{await navigator.clipboard.writeText(e)}catch(t){const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select(),document.execCommand("copy"),document.body.removeChild(i)}this._selectedMessage=null}_showRouteOnMap(e){this.dispatchEvent(new CustomEvent("show-message-route",{detail:{message:e},bubbles:!0,composed:!0})),this._selectedMessage=null}_replyToSender(e){this.dispatchEvent(new CustomEvent("reply-to-sender",{detail:{mention:`@[${e}] `},bubbles:!0,composed:!0})),this._selectedMessage=null}_classMap(e){return Object.entries(e).filter(([,e])=>e).map(([e])=>e).join(" ")}};hn.styles=ms(be||(be=ds`
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
  `)),cs([kr({type:Object})],hn.prototype,"group",void 0),cs([kr({type:Object})],hn.prototype,"message",void 0),cs([kr({type:String})],hn.prototype,"timestampFormat",void 0),cs([Sr()],hn.prototype,"_selectedMessage",void 0),hn=cs([xr("meshcore-message-bubble")],hn);let un=class extends br{constructor(){super(),this._query="",this._fromDate="",this._toDate="",this._results=[],this._totalCount=0,this._searching=!1,this._hasSearched=!1,this._showFilters=!1,this._debounceTimer=null,dn(this,{isOpen:()=>!0,onEscape:()=>this.dispatchEvent(new CustomEvent("search-close",{bubbles:!0,composed:!0}))})}render(){return er(ye||(ye=ds`
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
    `),this._query,this._onQueryInput,this._showFilters?"active":"",()=>{this._showFilters=!this._showFilters},this._showFilters?er(xe||(xe=ds`
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
            `),this._fromDate,e=>{this._fromDate=e.target.value,this._doSearch()},this._toDate,e=>{this._toDate=e.target.value,this._doSearch()}):"",this._hasSearched?er(we||(we=ds`<div class="result-count">${0} result${0}</div>`),this._totalCount,1!==this._totalCount?"s":""):"",this._searching?er($e||($e=ds`<div class="loading-state">Searching...</div>`)):this._hasSearched?0===this._results.length?er(Se||(Se=ds`
                  <div class="empty-state">
                    <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M20 6H10v6H8V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 14H4V8h4v2c0 1.1.9 2 2 2h6v2h-2v2h2v2h-2v2h6V10h-4v10h2z"/></svg></div>
                    <div class="empty-text">No messages found</div>
                  </div>
                `)):this._results.map(e=>this._renderResult(e)):er(ke||(ke=ds`
                <div class="empty-state">
                  <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></div>
                  <div class="empty-text">Search your message history</div>
                </div>
              `)))}_renderResult(e){const t=new Date(e.timestamp),i=t.toLocaleDateString(void 0,{month:"short",day:"numeric"}),a=t.toLocaleTimeString(void 0,{hour:"2-digit",minute:"2-digit"}),o=this._highlightQuery(e.text);return er(Ce||(Ce=ds`
      <div class="result-item" @click=${0}>
        <div class="result-meta">
          <span class="result-sender">${0}</span>
          <span class="result-conversation">${0}</span>
          <span>${0} ${0}</span>
        </div>
        <div class="result-text">${0}</div>
      </div>
    `),()=>this._onResultClick(e),e.sender,e.conversation_name,i,a,o)}_highlightQuery(e){if(!this._query.trim())return e;const t=this._query.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),i=new RegExp(`(${t})`,"gi"),a=e.split(i),o=this._query.toLowerCase();return a.map(e=>e.toLowerCase()===o?er(Me||(Me=ds`<mark>${0}</mark>`),e):e)}_onQueryInput(e){this._query=e.target.value,null!==this._debounceTimer&&clearTimeout(this._debounceTimer);const t=this._query.trim().length,i=t>=2,a=0===t,o=!(!this._fromDate&&!this._toDate);i||a&&o?this._debounceTimer=window.setTimeout(()=>this._doSearch(),400):(this._results=[],this._hasSearched=!1)}async _doSearch(){if(!this.hass||!this.entityId)return;const e=this._query.trim(),t=e.length>0,i=!(!this._fromDate&&!this._toDate);if(!t&&!i)return this._results=[],this._totalCount=0,void(this._hasSearched=!1);this._searching=!0,this._hasSearched=!0;try{const t={type:"hivefw_integration/search_stored_messages",query:e,entity_id:this.entityId,limit:100};this._fromDate&&(t.from_date=`${this._fromDate}T00:00:00`),this._toDate&&(t.to_date=`${this._toDate}T23:59:59.999999`);const i=await this.hass.callWS(t);this._results=i.results||[],this._totalCount=this._results.length}catch(e){this._results=[],this._totalCount=0}finally{this._searching=!1}}_onResultClick(e){this.dispatchEvent(new CustomEvent("result-selected",{detail:{entityId:e.entity_id,messageId:e.id,conversationName:e.conversation_name,timestamp:e.timestamp},bubbles:!0,composed:!0}))}};un.styles=ms(Re||(Re=ds`
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
  `)),cs([kr({type:Object})],un.prototype,"hass",void 0),cs([kr({type:String})],un.prototype,"entryId",void 0),cs([kr({type:String})],un.prototype,"entityId",void 0),cs([kr({type:String})],un.prototype,"meshNodeName",void 0),cs([Sr()],un.prototype,"_query",void 0),cs([Sr()],un.prototype,"_fromDate",void 0),cs([Sr()],un.prototype,"_toDate",void 0),cs([Sr()],un.prototype,"_results",void 0),cs([Sr()],un.prototype,"_totalCount",void 0),cs([Sr()],un.prototype,"_searching",void 0),cs([Sr()],un.prototype,"_hasSearched",void 0),cs([Sr()],un.prototype,"_showFilters",void 0),un=cs([xr("meshcore-message-search")],un);let gn=class extends br{constructor(){super(...arguments),this.conversations=[],this.selectedId=null,this.narrow=!1,this.lastRead={},this._messageStore=null,this._unsubUnread=null,this._inputText="",this._sending=!1,this._viewportNarrow=!1,this._mediaQuery=null,this._mediaHandler=null,this._narrowShowMessages=!1,this._manageOpen=!1,this._manageInitialTab="contacts",this._searchOpen=!1,this._currentEntityId=null,this._conversationResolved=!1,this._pendingScroll=null,this._scrollInFlight=!1,this._scrollGuardUntil=0,this._lastMessageCount=0}get _isNarrow(){return this.narrow||this._viewportNarrow}connectedCallback(){super.connectedCallback(),this.config&&!this._messageStore&&(this._messageStore=new en(this.config),this._messageStore.setOnChange(()=>this.requestUpdate())),this.unread&&!this._unsubUnread&&(this._unsubUnread=this.unread.subscribe(()=>{this.lastRead=this.unread.lastRead,this.requestUpdate()}),this.lastRead=this.unread.lastRead,this.unread.onPostSwitchTimerFire(()=>this._checkAndMarkReadIfAtBottom())),this._mediaQuery=window.matchMedia("(max-width: 870px)"),this._viewportNarrow=this._mediaQuery.matches,this._mediaHandler=e=>{this._viewportNarrow=e.matches},this._mediaQuery.addEventListener("change",this._mediaHandler)}disconnectedCallback(){var e;super.disconnectedCallback(),this._messageStore&&(this._messageStore.destroy(),this._messageStore=null),this._unsubUnread&&(this._unsubUnread(),this._unsubUnread=null),null===(e=this.unread)||void 0===e||e.endConversation(),this._mediaQuery&&this._mediaHandler&&(this._mediaQuery.removeEventListener("change",this._mediaHandler),this._mediaQuery=null,this._mediaHandler=null)}updated(e){if(e.has("hass")&&this.hass&&this._messageStore&&this._messageStore.setHass(this.hass),e.has("config")&&this.config&&this._messageStore){this._messageStore.setConfig(this.config);const t=e.get("config");t&&t.entry_id!==this.config.entry_id&&(this.selectedId=null,this._currentEntityId=null,this._conversationResolved=!1,this._pendingScroll=null,this._lastMessageCount=0,this.unread.endConversation(),this._messageStore.switchEntity(null),this.dispatchEvent(new CustomEvent("active-entity-changed",{detail:{entityId:null},bubbles:!0,composed:!0})))}if(e.has("selectedId")&&this._onConversationSelected(),e.has("lastRead")&&this._currentEntityId&&this._conversationResolved&&null===this._pendingScroll&&this.unread.maybeReanchorOnLateData(this._currentEntityId)&&(this._pendingScroll="last-read"),this._pendingScroll){const e=this._messageStore,t=e&&!e.loading;t&&e.messages.length>0?(this._executeScroll(this._pendingScroll),this._pendingScroll=null,this._lastMessageCount=e.messages.length):t&&0===e.messages.length&&(this._pendingScroll=null)}else if(this._messageStore){const e=this._messageStore.messages.length;e>this._lastMessageCount&&this._lastMessageCount>0&&this._scrollToBottomIfNearEnd(),this._lastMessageCount=e}}render(){var e,t,i,a,o,s;return this._isNarrow?this._narrowShowMessages?er(Ae||(Ae=ds`
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
        `),()=>this._narrowShowMessages=!1,this._getConversationName(),this._renderScopeChip(),()=>{this._searchOpen=!this._searchOpen},this._renderChatArea()):er(Te||(Te=ds`
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
        `),this.conversations,this.selectedId,this.unread,this.unread.counts,(null===(o=this.config)||void 0===o?void 0:o.node_prefix)||null,e=>{const t=e.detail.id;t===this.selectedId&&(this.unread.resetUnreadCountAtSelection(),this._pendingScroll="bottom"),this.selectedId=t,this._narrowShowMessages=!0},e=>this._onManageRequested(e),this._manageOpen?er(ze||(ze=ds`
              <meshcore-manage-dialog
                .hass=${0}
                .entryId=${0}
                .narrow=${0}
                .initialTab=${0}
                .lockedTab=${0}
                @manage-closed=${0}
                @contacts-changed=${0}
                @channels-changed=${0}
              ></meshcore-manage-dialog>
            `),this.hass,null===(s=this.config)||void 0===s?void 0:s.entry_id,this.narrow,this._manageInitialTab,!0,()=>this._manageOpen=!1,this._onContactsChanged,this._onChannelsChanged):er(Ie||(Ie=ds``))):er(Ne||(Ne=ds`
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
    `),this.conversations,this.selectedId,this.unread,this.unread.counts,(null===(e=this.config)||void 0===e?void 0:e.node_prefix)||null,e=>{const t=e.detail.id;t===this.selectedId&&(this.unread.resetUnreadCountAtSelection(),this._pendingScroll="bottom"),this.selectedId=t},e=>this._onManageRequested(e),this.selectedId?er(Fe||(Fe=ds`
            <div class="narrow-header" style="display: flex; align-items: center; padding: 8px 16px;">
              <div style="flex: 1; font-size: 14px; font-weight: 500; color: var(--primary-text-color);">
                ${0}${0}
              </div>
              <div class="chat-header-actions">
                <button class="header-action-btn" title="Search messages" aria-label="Search messages" @click=${0}><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></button>
              </div>
            </div>
          `),this._getConversationName(),this._renderScopeChip(),()=>{this._searchOpen=!this._searchOpen}):"",this._renderChatArea(),this._searchOpen?er(De||(De=ds`
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
        `),this.hass,null===(t=this.config)||void 0===t?void 0:t.entry_id,this._currentEntityId||void 0,null===(i=this.config)||void 0===i?void 0:i.node_name,this._onSearchResultSelected,()=>{this._searchOpen=!1}):"",this._manageOpen?er(Ee||(Ee=ds`
          <meshcore-manage-dialog
            .hass=${0}
            .entryId=${0}
            .narrow=${0}
            .initialTab=${0}
            .lockedTab=${0}
                @manage-closed=${0}
            @contacts-changed=${0}
            @channels-changed=${0}
          ></meshcore-manage-dialog>
        `),this.hass,null===(a=this.config)||void 0===a?void 0:a.entry_id,this.narrow,this._manageInitialTab,!0,()=>this._manageOpen=!1,this._onContactsChanged,this._onChannelsChanged):er(Oe||(Oe=ds``)))}_renderChatArea(){var e,t,i,a,o,s;if(!this._messageStore||!this.selectedId)return er(Pe||(Pe=ds`
        <div class="empty-state">
          <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/></svg></div>
          <div class="empty-text">Select a conversation to start</div>
          <div class="empty-subtext">Choose a channel or contact from the list</div>
        </div>
      `));if(!this._conversationResolved)return er(Be||(Be=ds`
        <div class="empty-state">
          <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></div>
          <div class="empty-text">Conversation unavailable</div>
          <div class="empty-subtext">This contact may no longer be added to the node</div>
        </div>
      `));const r=this._messageStore.messages,n=function(e,t){var i;const a=null!==(i=t.group_timeout)&&void 0!==i?i:300,o=!1!==t.group_messages?function(e,t){if(0===e.length)return[];const i=[];let a=null;for(const o of e)!a||o.isSystem||a.isSystem||o.sender!==a.sender||(o.timestamp.getTime()-a.endTime.getTime())/1e3>t?(a={sender:o.sender,isOutgoing:o.isOutgoing,isSystem:o.isSystem,messages:[o],startTime:o.timestamp,endTime:o.timestamp},i.push(a)):(a.messages.push(o),a.endTime=o.timestamp);return i}(e,a):e.map(e=>({sender:e.sender,isOutgoing:e.isOutgoing,isSystem:e.isSystem,messages:[e],startTime:e.timestamp,endTime:e.timestamp}));if(0===o.length)return[];const s=[];let r=null;for(const e of o){const i=e.startTime;!1===t.show_date_separators||r&&!Jr(r,i)||s.push({type:"date-separator",date:i,label:Zr(i)}),s.push({type:"group",group:e}),r=i}return s}(r,{group_messages:null===(e=null===(t=this.config)||void 0===t?void 0:t.group_messages)||void 0===e||e,group_timeout:null!==(i=null===(a=this.config)||void 0===a?void 0:a.group_timeout)&&void 0!==i?i:300,show_date_separators:null===(o=null===(s=this.config)||void 0===s?void 0:s.show_date_separators)||void 0===o||o});return er(Le||(Le=ds`
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
    `),this._onReplyToSender,this._onChatScroll,this._messageStore.loadingOlder?er(He||(He=ds`<div class="loading-older"><div class="loading-spinner"></div></div>`)):er(Ue||(Ue=ds``)),this._messageStore.error?er(qe||(qe=ds`
              <div class="error-state">
                <span><svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg></span>
                <span>${0}</span>
              </div>
            `),this._messageStore.error):er(je||(je=ds``)),this._messageStore.loading&&0===r.length?er(Ve||(Ve=ds`
              <div class="loading-state">
                <div class="loading-spinner"></div>
                Loading messages...
              </div>
            `)):er(We||(We=ds``)),0!==n.length||this._messageStore.loading?er(Ge||(Ge=ds``)):er(Ke||(Ke=ds`
              <div class="empty-state">
                <div class="empty-icon"><svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" opacity="0.5"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6z"/></svg></div>
                <div class="empty-text">No messages yet</div>
                <div class="empty-subtext">Be the first to send a message!</div>
              </div>
            `)),this._renderItemsWithDivider(n),this._renderNewMessagesIndicator(),this._inputText,e=>{const t=e.target;this._inputText=t.value},e=>{"Enter"!==e.key||e.shiftKey||(e.preventDefault(),this._sendMessage())},this._sending||!this.selectedId,()=>this._sendMessage(),this._sending||!this.selectedId||!this._inputText.trim())}_renderItemsWithDivider(e){const t=[];let i=0,a=!1;const o=this.unread.dividerAfterGroupIdx(e);for(const n of e){var s,r;"date-separator"!==n.type?(a||null===o||i!==o||(t.push(er(Qe||(Qe=ds`
          <div class="unread-divider">
            <span>New messages</span>
          </div>
        `))),a=!0),t.push(er(Ye||(Ye=ds`
        <meshcore-message-bubble
          .group=${0}
          .timestampFormat=${0}></meshcore-message-bubble>
      `),n.group,null!==(s=null===(r=this.config)||void 0===r?void 0:r.timestamp_format)&&void 0!==s?s:"relative")),i++):t.push(er(Xe||(Xe=ds`
          <div class="date-separator">
            <span>${0}</span>
          </div>
        `),n.label))}return t}_renderNewMessagesIndicator(){const e=this._messageStore;if(!e)return er(Je||(Je=ds``));const t=e.newMessagesWhileAway,i=e.hasNewerMessages;if(null!==this._pendingScroll||this._scrollInFlight)return er(Ze||(Ze=ds``));const a=function(e){return e.counter>0?`↓ ${e.counter} new`:e.hasNewer||e.hasContentBelow?e.cursorAtTail&&!e.hasNewer?"↓ latest":"↓ unread":null}({counter:t,hasNewer:i,hasContentBelow:this._hasContentBelowViewport(),cursorAtTail:this.unread.cursorAtTail(this._currentEntityId,this._latestNonTempMessageId())});return null===a?er(et||(et=ds``)):er(tt||(tt=ds`
      <button class="new-messages-indicator" @click=${0}>
        ${0}
      </button>
    `),this._jumpToBottom,a)}_onConversationSelected(){if(this.selectedId&&this._messageStore&&this.config&&this.hass){var e;const t=this.conversations.find(e=>"pubkey_prefix"in e?e.pubkey_prefix===this.selectedId:String(e.channel_idx)===this.selectedId);if(!t)return this._conversationResolved=!1,this._currentEntityId=null,void(this._messageStore&&this._messageStore.switchEntity(null));this._conversationResolved=!0;let i=null;if("pubkey_prefix"in t){const e=t.pubkey_prefix;i=function(e,t,i){const a=i.substring(0,6);if(t.contact_entity_pattern&&t.node_prefix){const i=t.contact_entity_pattern.replace("{prefix}",t.node_prefix).replace("{contact}",a);if(e.states[i])return i}const o=`_${a}_messages`,s=t.node_prefix?`_${t.node_prefix}_`:"";for(const t of Object.keys(e.states))if(t.startsWith("binary_sensor.")&&t.endsWith(o)&&(!s||t.includes(s)))return t;return null}(this.hass,this.config,e)}else{const e=t.channel_idx;i=function(e,t,i){if(t.channel_entity_pattern&&t.node_prefix){const a=t.channel_entity_pattern.replace("{prefix}",t.node_prefix).replace("{idx}",String(i));if(e.states[a])return a}const a=`_ch_${i}_messages`,o=t.node_prefix?`_${t.node_prefix}_`:"";for(const t of Object.keys(e.states))if(t.startsWith("binary_sensor.")&&t.endsWith(a)&&(!o||t.includes(o)))return t;return null}(this.hass,this.config,e)}this._currentEntityId=i,this.dispatchEvent(new CustomEvent("active-entity-changed",{detail:{entityId:i},bubbles:!0,composed:!0}));const a=this._getUnreadCountForSelected(),o=i&&(null===(e=this.lastRead)||void 0===e?void 0:e[i])||null;this._pendingScroll=o||a>0?"last-read":"bottom",this._lastMessageCount=0,this.unread.beginConversation(i,a),this._messageStore.switchEntity(i,o)}}async _sendMessage(){if(this._sending||!this._inputText.trim()||!this.selectedId||!this.hass||!this.config)return;if(!this._conversationResolved)return void console.warn("Cannot send — conversation not resolved");this._sending=!0;const e=this._inputText.trim();this._inputText="";try{var t;this._messageStore&&(this._messageStore.addOptimisticMessage(this.config.node_name,e),this._pendingScroll="bottom");const a=null===(t=this.config)||void 0===t?void 0:t.entry_id;if(this._isContact())await async function(e,t,i,a){try{const o={pubkey_prefix:t,message:i};a&&(o.entry_id=a),await e.callService("hivefw_integration","send_message",o)}catch(e){throw new Error(`Failed to send direct message: ${String(e)}`)}}(this.hass,this.selectedId,e,a);else{var i;const t=parseInt(this.selectedId,10);if(isNaN(t)||t<0||t>255)return console.error("Invalid channel index:",this.selectedId),void(this._inputText=e);await async function(e,t,i,a,o){try{const s={channel_idx:t,message:i};a&&(s.entry_id=a),o&&(s.scope=o),await e.callService("hivefw_integration","send_channel_message",s)}catch(e){throw new Error(`Failed to send channel message: ${String(e)}`)}}(this.hass,t,e,a,null!==(i=this._getActiveChannelScope())&&void 0!==i?i:void 0)}}catch(t){console.error("Failed to send message:",t),this._inputText=e}finally{this._sending=!1}}_latestNonTempMessageId(){var e,t;const i=null!==(e=null===(t=this._messageStore)||void 0===t?void 0:t.messages)&&void 0!==e?e:[];for(let e=i.length-1;e>=0;e--){const t=i[e].id;if(!t.startsWith("rt_")&&!t.startsWith("optimistic_"))return t}return null}_isContact(){return!!this.selectedId&&!/^\d+$/.test(this.selectedId)}_onManageRequested(e){var t;this._manageInitialTab="channels"===(null==e||null===(t=e.detail)||void 0===t?void 0:t.tab)?"channels":"contacts",this._manageOpen=!0}_onContactsChanged(){this.dispatchEvent(new CustomEvent("contacts-changed",{bubbles:!0,composed:!0}))}_onChannelsChanged(){this.dispatchEvent(new CustomEvent("channels-changed",{bubbles:!0,composed:!0}))}_onReplyToSender(e){const{mention:t}=e.detail;t&&(this._inputText=t+this._inputText,this.requestUpdate())}_getConversationName(){if(!this.selectedId)return"";const e=this.conversations.find(e=>"pubkey_prefix"in e?e.pubkey_prefix===this.selectedId:String(e.channel_idx)===this.selectedId);return e?"pubkey_prefix"in e?e.adv_name:e.name:this.selectedId}_getActiveChannelScope(){if(!this.selectedId||this._isContact())return null;const e=this.conversations.find(e=>!("pubkey_prefix"in e)&&String(e.channel_idx)===this.selectedId);return e&&e.scope||null}_renderScopeChip(){const e=this._getActiveChannelScope();return e?er(it||(it=ds`<button
      class="scope-chip"
      title="Region scope: messages on this channel flood only through '${0}' repeaters. Click to manage."
      aria-label="Region scope ${0} — manage channels"
      @click=${0}>🌐 ${0}</button>`),e,e,()=>{this._manageInitialTab="channels",this._manageOpen=!0},e):""}_getChatContainer(){var e;return null===(e=this.renderRoot)||void 0===e?void 0:e.querySelector(".chat-container")}_isScrollGuarded(){return this._scrollInFlight||Date.now()<this._scrollGuardUntil}_executeScroll(e){this._scrollInFlight=!0,"last-read"===e&&(this._scrollGuardUntil=Date.now()+2e3),this._doScrollWithRetry(e,0)}_doScrollWithRetry(e,t){this.updateComplete.then(()=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{const i=this._getChatContainer();if(!i)return void(this._scrollInFlight=!1);if("bottom"===e)return i.scrollTop=i.scrollHeight,void(this._scrollInFlight=!1);const a=i.querySelector(".unread-divider");if(a){const e=i.getBoundingClientRect(),t=a.getBoundingClientRect();i.scrollTop+=t.top-e.top,this._scrollInFlight=!1}else t<10?setTimeout(()=>this._doScrollWithRetry(e,t+1),50):(i.scrollTop=i.scrollHeight,this._scrollInFlight=!1)})})})}_scrollToBottomIfNearEnd(){if(this._isScrollGuarded())return;const e=this._messageStore;null!=e&&e.hasNewerMessages||this.updateComplete.then(()=>{requestAnimationFrame(()=>{if(this._isScrollGuarded())return;const e=this._getChatContainer();e&&e.scrollHeight-e.scrollTop-e.clientHeight<150&&(e.scrollTop=e.scrollHeight,this._checkAndMarkReadIfAtBottom())})})}_onChatScroll(e){const t=e.target,i=this._messageStore;if(!t||!i)return;const a=t.scrollTop,o=t.scrollHeight-t.scrollTop-t.clientHeight<150;if(i.setUserAtBottom(o),a<150&&i.hasOlderMessages&&!i.loadingOlder&&!this._isScrollGuarded()){const e=t.scrollHeight;i.loadOlderMessages().then(()=>{this.updateComplete.then(()=>{requestAnimationFrame(()=>{const i=t.scrollHeight-e;i>0&&(t.scrollTop+=i)})})})}o&&(i.hasNewerMessages&&!i.loadingNewer?i.loadNewerMessages():i.hasNewerMessages||this._checkAndMarkReadIfAtBottom())}_isLastMessageVisible(){const e=this._getChatContainer();if(!e)return!1;const t=e.querySelectorAll("meshcore-message-bubble"),i=t[t.length-1];if(!i)return!1;const a=e.getBoundingClientRect().bottom;return i.getBoundingClientRect().bottom<=a+5}_hasContentBelowViewport(){var e,t;return!!this._getChatContainer()&&(0!==(null!==(e=null===(t=this._messageStore)||void 0===t?void 0:t.messages.length)&&void 0!==e?e:0)&&!this._isLastMessageVisible())}_checkAndMarkReadIfAtBottom(){const e=this._messageStore;this._currentEntityId&&e&&this.unread.onScrollState({entityId:this._currentEntityId,lastMessageVisible:this._isLastMessageVisible(),hasNewerMessages:e.hasNewerMessages,bufferTailId:this._latestNonTempMessageId()})&&e.resetNewMessagesCounter()}async scrollCurrentConversationToLatest(){await this._jumpToBottom()}async _jumpToBottom(){const e=this._messageStore;if(e){for(;e.hasNewerMessages&&!e.loadingNewer;)await e.loadNewerMessages();await this.updateComplete,requestAnimationFrame(()=>{const t=this._getChatContainer();t&&(t.scrollTop=t.scrollHeight,this._currentEntityId&&this.unread.onPillJump({entityId:this._currentEntityId,bufferTailId:this._latestNonTempMessageId()})&&e.resetNewMessagesCounter())})}}_getUnreadCountForSelected(){var e,t;return this.selectedId&&this.unread?this.unread.badgeCount(this.selectedId,null!==(e=null===(t=this.config)||void 0===t?void 0:t.node_prefix)&&void 0!==e?e:null,this._currentEntityId):0}_onSearchResultSelected(e){const{entityId:t,messageId:i,timestamp:a}=e.detail;t&&this._messageStore&&(this._messageStore.switchEntity(t),this._currentEntityId=t),i&&this._scrollToAndHighlight(i,a)}_scrollToAndHighlight(e,t){this.updateComplete.then(()=>{requestAnimationFrame(()=>{this._findAndHighlightBubble(e)||t&&this._messageStore&&this._messageStore.fetchAroundTimestamp(t).then(t=>{t&&this.updateComplete.then(()=>{requestAnimationFrame(()=>{this._findAndHighlightBubble(e)})})})})})}_findAndHighlightBubble(e){var t;const i=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".chat-container");if(!i)return!1;const a=i.querySelectorAll("meshcore-message-bubble");for(const t of Array.from(a)){var o;const i=null===(o=t.shadowRoot)||void 0===o?void 0:o.querySelector(`[data-msg-id="${e}"]`);if(i)return i.scrollIntoView({behavior:"smooth",block:"center"}),i.classList.add("search-highlight"),setTimeout(()=>i.classList.remove("search-highlight"),2500),!0}return!1}};function vn(e){var t,i,a;const o=e.entity_id,s=null!==(t=null!==(i=null!==(a=e.original_device_class)&&void 0!==a?a:e.device_class)&&void 0!==i?i:e._stateDeviceClass)&&void 0!==t?t:null;if(o.startsWith("binary_sensor.hivefw_")&&/_err_(pool_full|cad_timeout|rx_timeout)_/.test(o)){const e=o.includes("err_pool_full")?"Radio Fault: Packet Pool":o.includes("err_cad_timeout")?"Radio Fault: CAD Timeout":"Radio Fault: RX-Start Timeout";return{entity_id:o,label:e,icon:"alert",colorScheme:"neutral",sortOrder:13,booleanProblem:!0}}if(o.startsWith("binary_sensor.hivefw_")&&"connectivity"===s)return null;if(o.startsWith("binary_sensor.hivefw_"))return null;if(o.includes("_rate_"))return null;if(o.includes("full_evts"))return null;if(o.includes("node_status")||o.includes("companion_prefix")||o.includes("request_rate")&&!o.includes("request_rate_limiter")||o.includes("delivery")||o.includes("path_")||o.includes("neighbor_"))return null;if("battery"===s||o.includes("battery_percentage"))return{entity_id:o,label:"Battery",icon:"battery",colorScheme:"battery",sortOrder:1,metricKey:"battery_pct"};if("voltage"===s||o.includes("battery_voltage")||o.includes("_voltage")||o.includes("cv_voltage"))return{entity_id:o,label:"Voltage",icon:"power",colorScheme:"neutral",sortOrder:2};if("duration"===s||o.includes("uptime"))return{entity_id:o,label:"Uptime",icon:"clock",colorScheme:"neutral",sortOrder:3,metricKey:"uptime_hours"};if("signal_strength"===s||o.includes("tx_power"))return{entity_id:o,label:"TX Power",icon:"power",colorScheme:"neutral",sortOrder:6};if("temperature"===s||o.includes("_temperature"))return{entity_id:o,label:"Temperature",icon:"thermometer",colorScheme:"neutral",sortOrder:7,metricKey:"temperature",staticTooltip:"Ambient temperature reported by the node. Informational; no threshold band -- expected ranges depend heavily on where the device is mounted."};if(o.includes("rx_airtime_utilization"))return{entity_id:o,label:"RX Airtime Util",icon:"chart",colorScheme:"neutral",sortOrder:10,metricKey:"rx_airtime_util"};if(o.includes("airtime_utilization"))return{entity_id:o,label:"TX Airtime Util",icon:"chart",colorScheme:"neutral",sortOrder:10,metricKey:"tx_airtime_util"};if(o.includes("rx_airtime"))return{entity_id:o,label:"RX Airtime",icon:"chart",colorScheme:"neutral",sortOrder:9};if(o.includes("airtime"))return{entity_id:o,label:"Airtime",icon:"chart",colorScheme:"neutral",sortOrder:9};if(o.includes("snr")&&!o.includes("neighbor"))return{entity_id:o,label:"SNR",icon:"signal",colorScheme:"signal",sortOrder:4,metricKey:"snr"};if(o.includes("rssi"))return{entity_id:o,label:"RSSI",icon:"signal",colorScheme:"signal",sortOrder:5,metricKey:"rssi"};if(o.includes("noise_floor"))return{entity_id:o,label:"Noise Floor",icon:"signal",colorScheme:"signal",sortOrder:11,metricKey:"noise_floor"};if(o.includes("tx_queue_len"))return{entity_id:o,label:"TX Queue Length",icon:"counter",colorScheme:"neutral",sortOrder:12,metricKey:"tx_queue_len"};if(o.includes("contact_count"))return{entity_id:o,label:"Contacts",icon:"counter",colorScheme:"neutral",sortOrder:8};if(o.includes("discovered_contacts"))return{entity_id:o,label:"Discovered Contacts",icon:"counter",colorScheme:"neutral",sortOrder:8};if(o.includes("request_rate_limiter"))return{entity_id:o,label:"Request Tokens",icon:"counter",colorScheme:"neutral",sortOrder:13};if(o.includes("dashboard_health"))return{entity_id:o,label:"Saúde",icon:"health",colorScheme:"neutral",sortOrder:13,staticTooltip:"Resumo do estado operacional local. OK significa que não há alertas ativos; quando existem alertas, o valor indica quantos estão ativos e os atributos da entidade identificam as causas."};if(o.includes("channel_util"))return{entity_id:o,label:"Channel Util",icon:"chart",colorScheme:"neutral",sortOrder:10,metricKey:"channel_util"};if(o.startsWith("sensor.hivefw_")){const t=e.original_name||e.name||o.split(".")[1];return{entity_id:o,label:t,icon:"",colorScheme:"neutral",sortOrder:99}}return null}async function mn(e){const[t,i]=await Promise.all([e.callWS({type:"config/device_registry/list"}),e.callWS({type:"config/entity_registry/list"})]),a={};for(const e of t)if(e.identifiers)for(const[t,i]of e.identifiers)"hivefw_integration"===t&&(a[i]=e.id);const o={};for(const t of i){var s;if(!t.device_id||t.disabled_by)continue;if(!t.entity_id.startsWith("sensor.hivefw_")&&!t.entity_id.startsWith("binary_sensor.hivefw_"))continue;const i=null===(s=e.states)||void 0===s||null===(s=s[t.entity_id])||void 0===s||null===(s=s.attributes)||void 0===s?void 0:s.device_class,a=vn(i?{...t,_stateDeviceClass:i}:t);a&&(o[t.device_id]||(o[t.device_id]=[]),o[t.device_id].push(a))}for(const e of Object.keys(o))o[e].sort((e,t)=>e.sortOrder-t.sortOrder);return{meshcoreDeviceMap:a,deviceEntities:o}}gn.styles=ms(at||(at=ds`
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
  `)),cs([kr({type:Object})],gn.prototype,"hass",void 0),cs([kr({type:Object})],gn.prototype,"config",void 0),cs([kr({type:Array})],gn.prototype,"conversations",void 0),cs([kr({type:String})],gn.prototype,"selectedId",void 0),cs([kr({type:Boolean})],gn.prototype,"narrow",void 0),cs([kr({attribute:!1})],gn.prototype,"unread",void 0),cs([kr({type:Object})],gn.prototype,"lastRead",void 0),cs([Sr()],gn.prototype,"_messageStore",void 0),cs([Sr()],gn.prototype,"_inputText",void 0),cs([Sr()],gn.prototype,"_sending",void 0),cs([Sr()],gn.prototype,"_viewportNarrow",void 0),cs([Sr()],gn.prototype,"_narrowShowMessages",void 0),cs([Sr()],gn.prototype,"_manageOpen",void 0),cs([Sr()],gn.prototype,"_manageInitialTab",void 0),cs([Sr()],gn.prototype,"_searchOpen",void 0),cs([Sr()],gn.prototype,"_currentEntityId",void 0),cs([Sr()],gn.prototype,"_conversationResolved",void 0),cs([Sr()],gn.prototype,"_pendingScroll",void 0),gn=cs([xr("hivefw-integration-page")],gn);const fn={battery_pct:{displayMin:0,displayMax:100,direction:"higher_better",classify:e=>e<20?"bad":e<50?"warn":"good",tooltip:"Green ≥ 50%, Yellow 20–50%, Red < 20% (critical < 10%). Home Assistant low-battery convention.",source:"https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664"},rssi:{displayMin:-130,displayMax:-30,direction:"higher_better",classify:e=>e<-115?"bad":e<-100?"warn":"good",tooltip:"Green > −100 dBm, Yellow −100 to −115 dBm, Red < −115 dBm. Lower (more negative) RSSI means a weaker received signal.",source:"https://www.thethingsnetwork.org/docs/lorawan/rssi-and-snr/"},snr:{displayMin:-20,displayMax:20,direction:"higher_better",classify:e=>e<-7?"bad":e<0?"warn":"good",tooltip:"Green > 0 dB, Yellow −7 to 0 dB, Red < −7 dB. Demodulation floor is spreading-factor dependent (Semtech AN1200.13).",source:"https://www.openhacks.com/uploadsproductos/loradesignguide_std.pdf"},noise_floor:{displayMin:-130,displayMax:-90,direction:"lower_better",classify:e=>e>-105?"bad":e>-115?"warn":"good",tooltip:"Green < −115 dBm, Yellow −115 to −105 dBm, Red > −105 dBm. Above −105 dBm typically indicates man-made RF interference, not thermal noise.",source:"https://www.openhacks.com/uploadsproductos/loradesignguide_std.pdf"},tx_airtime_util:{displayMin:0,displayMax:20,direction:"lower_better",classify:e=>e>10?"bad":e>2?"warn":"good",tooltip:"Green < 2%, Yellow 2–10%, Red > 10%. EU868 sub-band 1% / general 10% duty-cycle ceiling (ETSI EN 300 220-2; eCFR 47 CFR 15.247).",source:"https://www.etsi.org/deliver/etsi_en/300200_300299/30022002/03.03.01_60/en_30022002v030301p.pdf"},rx_airtime_util:{displayMin:0,displayMax:100,direction:"lower_better",classify:e=>e>50?"bad":e>25?"warn":"good",tooltip:"Green < 25%, Yellow 25–50%, Red > 50%. High RX utilisation usually means heavy mesh traffic or environmental interference saturating the receiver."},channel_util:{displayMin:0,displayMax:100,direction:"lower_better",classify:e=>e>50?"bad":e>25?"warn":"good",tooltip:"Green < 25%, Yellow 25–50%, Red > 50%. Channel utilisation aggregates all activity on the radio channel."},hop_count:{displayMin:0,displayMax:32,direction:"lower_better",classify:e=>e>=16?"bad":e>=7?"warn":"good",tooltip:"Green ≤ 6, Yellow 7–15, Red ≥ 16. MeshCore allows up to 64 hops; community-recommended meshes run well under 32. Each hop adds airtime cost and latency.",source:"https://nodakmesh.org/blog/meshcore-path-hash-explained"},uptime_hours:{displayMin:0,displayMax:168,direction:"higher_better",classify:e=>e<1?"bad":e<24?"warn":"good",tooltip:"Green > 24 h, Yellow 1–24 h, Red < 1 h. Very recent reboot suggests a watchdog reset or brownout."},last_seen_hours:{displayMin:0,displayMax:6,direction:"lower_better",classify:e=>e>4?"bad":e>2?"warn":"good",tooltip:"Green < 2 h, Yellow 2–4 h, Red > 4 h. Should be tuned to the node’s advertising interval; nodes that advertise hourly should appear far more often than nodes that advertise every 6 hours."},request_success_rate:{displayMin:0,displayMax:100,direction:"higher_better",classify:e=>e<70?"bad":e<90?"warn":"good",tooltip:'Green > 90%, Yellow 70–90%, Red < 70%. Caller is responsible for the min-sample floor — bars should render with band="info" until at least 50 attempts have accumulated.'},duplicate_ratio:{displayMin:0,displayMax:100,direction:"lower_better",classify:()=>"info",tooltip:""},tx_queue_len:{displayMin:0,displayMax:30,direction:"lower_better",classify:e=>e>10?"bad":e>5?"warn":"good",tooltip:"Number of messages queued for transmission. Healthy nodes drain the queue quickly. Sustained backlog (> 10) indicates channel saturation or a stuck transmitter."},temperature:{displayMin:-20,displayMax:140,direction:"higher_better",classify:e=>e<0||e>125?"bad":"good",tooltip:"Red below 0°F (≈ −18°C) or above 125°F (≈ 52°C); green otherwise. Extreme ambient temperatures risk damage to the radio, battery, or enclosure."}};function _n(e,t){const i=t.displayMax-t.displayMin;if(i<=0)return 0;const a=(e-t.displayMin)/i,o="higher_better"===t.direction?a:1-a;return Math.max(0,Math.min(100,100*o))}function bn(e,t){if(!Number.isFinite(t))return{band:"info",fillPct:0,tooltip:""};const i=fn[e];return i?{band:i.classify(t),fillPct:_n(t,i),tooltip:i.tooltip,source:i.source}:{band:"info",fillPct:0,tooltip:""}}class yn{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const xn=(wn=class extends yn{constructor(e){if(super(e),this._timer=null,this._startX=0,this._startY=0,this._attached=!1,this._callback=null,this._element=null,this._onPointerDown=e=>this._handleDown(e),this._onPointerUp=()=>this._cancelTimer(),this._onPointerMove=e=>this._handleMove(e),this._onContextMenu=e=>{null!==this._timer&&e.preventDefault()},6!==e.type)throw new Error("longPress directive must be used on an element")}render(e){}update(e,[t]){if(this._callback=t,!this._attached){this._element=e.element;const t=this._element;t.addEventListener("pointerdown",this._onPointerDown),t.addEventListener("pointerup",this._onPointerUp),t.addEventListener("pointercancel",this._onPointerUp),t.addEventListener("pointermove",this._onPointerMove),t.addEventListener("contextmenu",this._onContextMenu),this._attached=!0}return this.render(t)}_handleDown(e){0===e.button&&(this._startX=e.clientX,this._startY=e.clientY,this._cancelTimer(),this._timer=setTimeout(()=>{var e;this._timer=null,null===(e=this._callback)||void 0===e||e.call(this)},500))}_handleMove(e){if(null===this._timer)return;const t=e.clientX-this._startX,i=e.clientY-this._startY;t*t+i*i>100&&this._cancelTimer()}_cancelTimer(){null!==this._timer&&(clearTimeout(this._timer),this._timer=null)}},(...e)=>({_$litDirective$:wn,values:e}));var wn;let $n=class extends br{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.band="info"}render(){const e=this.max-this.min;let t=0;return Number.isFinite(this.value)&&e>0&&(t=(this.value-this.min)/e*100,t=Math.max(0,Math.min(100,t))),er(ot||(ot=ds`
      <div class="stat-bar"
           role="progressbar"
           aria-valuenow="${0}"
           aria-valuemin="${0}"
           aria-valuemax="${0}">
        <div class="stat-bar-fill ${0}"
             style="width: ${0}%"></div>
      </div>
    `),this.value,this.min,this.max,this.band,t)}};$n.styles=ms(st||(st=ds`
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
  `)),cs([kr({type:Number})],$n.prototype,"value",void 0),cs([kr({type:Number})],$n.prototype,"min",void 0),cs([kr({type:Number})],$n.prototype,"max",void 0),cs([kr({type:String})],$n.prototype,"band",void 0),$n=cs([xr("meshcore-stat-bar")],$n);let kn=class extends br{constructor(){super(...arguments),this.segments=[],this.legend="below"}_denom(){if(void 0!==this.total&&this.total>0)return this.total;const e=this.segments.reduce((e,t)=>e+(Number.isFinite(t.value)?t.value:0),0);return e>0?e:1}render(){if(!this.segments.length)return ar;const e=this._denom();return er(rt||(rt=ds`
      <div class="stat-bar"
           role="img"
           aria-label="${0}">
        ${0}
      </div>
      ${0}
    `),this.segments.map(e=>`${e.label} ${e.value}`).join(", "),this.segments.map(t=>{const i=Number.isFinite(t.value)?Math.max(0,t.value):0;if(0===i)return ar;const a=i/e*100;return er(nt||(nt=ds`<div class="stat-bar-segment ${0}"
                           style="width: ${0}%"
                           title="${0}: ${0}"></div>`),t.kind,a,t.label,t.value)}),"none"!==this.legend?er(lt||(lt=ds`
          <div class="stat-bar-legend ${0}">
            ${0}
            ${0}
          </div>`),"inline"===this.legend?"inline":"",this.segments.filter(e=>Number.isFinite(e.value)&&e.value>=0).map(e=>er(dt||(dt=ds`<span><span class="legend-swatch ${0}"></span>${0}</span>`),e.kind,e.label)),this.extraLegendText?er(ct||(ct=ds`<span class="legend-extra">${0}</span>`),this.extraLegendText):ar):ar)}};kn.styles=ms(pt||(pt=ds`
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
  `)),cs([kr({type:Array})],kn.prototype,"segments",void 0),cs([kr({type:Number})],kn.prototype,"total",void 0),cs([kr({type:String})],kn.prototype,"legend",void 0),cs([kr({type:String})],kn.prototype,"extraLegendText",void 0),kn=cs([xr("meshcore-stacked-bar")],kn);let Sn=class extends br{constructor(){super(...arguments),this.content="",this._open=!1,this._onOpen=()=>{this._open||(this._open=!0,window.addEventListener("scroll",this._onScroll,!0))},this._onClose=()=>{this._open&&(this._open=!1,window.removeEventListener("scroll",this._onScroll,!0))},this._onScroll=()=>this._onClose()}render(){return this.content?er(ht||(ht=ds`
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
    `),this._onOpen,this._onClose,this._onOpen,this._onClose,this._stopPropagation,this._open?"open":"",this.content,this.source?er(ut||(ut=ds`<span class="src">${0}</span>`),this.source):ar):ar}updated(){this._open&&this._positionPopover()}disconnectedCallback(){window.removeEventListener("scroll",this._onScroll,!0),super.disconnectedCallback()}_stopPropagation(e){e.stopPropagation()}_positionPopover(){const e=this.shadowRoot;if(!e)return;const t=e.querySelector(".info-tip"),i=e.querySelector(".info-tip-content");if(!t||!i)return;const a=t.getBoundingClientRect(),o=i.getBoundingClientRect(),s=window.innerWidth,r=window.innerHeight;let n=a.left+a.width/2-o.width/2,l=a.bottom+6;n<8?n=8:n+o.width>s-8&&(n=Math.max(8,s-8-o.width)),l+o.height>r-8&&(l=a.top-6-o.height,l<8&&(l=8)),i.style.left=`${n}px`,i.style.top=`${l}px`}};Sn.styles=ms(gt||(gt=ds`
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
  `)),cs([kr({type:String})],Sn.prototype,"content",void 0),cs([kr({type:String})],Sn.prototype,"source",void 0),cs([Sr()],Sn.prototype,"_open",void 0),Sn=cs([xr("meshcore-info-tip")],Sn);const Cn=[{key:"sent_flood",label:"Sent · Flood",color:"var(--info, #2196f3)",dash:!1},{key:"sent_direct",label:"Sent · Direct",color:"var(--info, #2196f3)",dash:!0},{key:"recv_flood",label:"Recv · Flood",color:"var(--good, #4caf50)",dash:!1},{key:"recv_direct",label:"Recv · Direct",color:"var(--good, #4caf50)",dash:!0},{key:"errors",label:"Errors",color:"var(--bad, #f44336)",dash:!1}];let Mn=class extends br{constructor(){super(...arguments),this.data=[],this.width=700,this.height=170,this.timeRange=48,this._hoverIndex=null,this._onPointerMove=e=>{const t=this._indexFromEvent(e);null!=t&&t!==this._hoverIndex&&(this._hoverIndex=t)},this._onPointerDown=e=>{const t=this._indexFromEvent(e);null!=t&&(this._hoverIndex=t===this._hoverIndex?null:t)},this._onPointerLeave=e=>{"mouse"===e.pointerType&&(this._hoverIndex=null)}}render(){return this.data&&0!==this.data.length?er(vt||(vt=ds`
      <div class="chart-container">
        <div class="plot">
          ${0}
          ${0}
        </div>
        <div class="legend">
          ${0}
        </div>
      </div>
    `),this._renderChart(),null!=this._hoverIndex?this._renderTooltip():ar,Cn.map(e=>er(mt||(mt=ds`<div class="legend-item">
              <span class="legend-line ${0}"
                    style="border-top-color:${0}"></span>${0}
            </div>`),e.dash?"dashed":"",e.color,e.label))):ar}_timeLabel(e,t){const i=Math.round((t-e)/36e5);return i<=0?"now":`-${i}h`}_fmtValue(e){return"number"==typeof e&&isFinite(e)?0===e?"0":e<1?e.toFixed(2):e.toFixed(1):"—"}_geom(){const e=this.width,t=this.height,i=e-40-12,a=t-12-22;let o=0;for(const e of this.data)for(const t of Cn){const i=e.values[t.key];"number"==typeof i&&isFinite(i)&&(o=Math.max(o,i))}o<=0&&(o=1);const s=Date.now(),r=36e5*this.timeRange,n=s-r;return{padL:40,padR:12,padT:12,padB:22,w:e,h:t,cw:i,ch:a,maxV:o,now:s,range:r,oldest:n,xScale:e=>40+(e-n)/r*i,yScale:e=>12+a-e/o*a}}_nearestBucket(e){const{xScale:t}=this._geom();let i=-1,a=1/0;for(let o=0;o<this.data.length;o++){const s=Math.abs(t(this.data[o].timestamp)-e);s<a&&(a=s,i=o)}return i}_indexFromEvent(e){const t=this.renderRoot.querySelector("svg");if(!t||0===this.data.length)return null;const i=t.getBoundingClientRect();if(0===i.width)return null;const a=(e.clientX-i.left)/i.width*this.width;return this._nearestBucket(a)}_renderChart(){const e=this._geom(),{padL:t,padR:i,padT:a,padB:o,w:s,h:r,ch:n,maxV:l,now:d,range:c,oldest:p,xScale:h,yScale:u}=e,g=[0,l/2,l].map(e=>{const a=u(e);return tr(ft||(ft=ds`
        <line x1="${0}" y1="${0}" x2="${0}" y2="${0}"
          stroke="var(--divider-color,#e0e0e0)" stroke-dasharray="4,4" opacity="0.3" />
        <text x="${0}" y="${0}" font-size="9" text-anchor="end"
          fill="var(--secondary-text-color,#727272)">${0}</text>`),t,a,s-i,a,t-6,a+3,e<1?e.toFixed(1):Math.round(e))}),v=[p,p+c/2,d].map(e=>tr(_t||(_t=ds`
        <text x="${0}" y="${0}" font-size="9" text-anchor="middle"
          fill="var(--secondary-text-color,#727272)">${0}</text>`),h(e),r-o+14,this._timeLabel(e,d))),m=Cn.map(e=>{const t=this.data.filter(t=>"number"==typeof t.values[e.key]&&isFinite(t.values[e.key])).map(t=>`${h(t.timestamp).toFixed(1)},${u(t.values[e.key]).toFixed(1)}`);if(0===t.length)return tr(bt||(bt=ds``));if(1===t.length){const[i,a]=t[0].split(",");return tr(yt||(yt=ds`<circle cx="${0}" cy="${0}" r="2" fill="${0}" />`),i,a,e.color)}return tr(xt||(xt=ds`<polyline points="${0}" fill="none" stroke="${0}"
        stroke-width="1.5" stroke-dasharray="${0}"
        stroke-linecap="round" stroke-linejoin="round" />`),t.join(" "),e.color,e.dash?"5,3":"none")});let f=tr(wt||(wt=ds``));if(null!=this._hoverIndex&&this._hoverIndex<this.data.length){const e=this.data[this._hoverIndex],t=h(e.timestamp),i=Cn.map(i=>{const a=e.values[i.key];return"number"==typeof a&&isFinite(a)?tr(kt||(kt=ds`<circle cx="${0}" cy="${0}" r="3" fill="${0}"
          stroke="var(--card-background-color,#fff)" stroke-width="1" />`),t,u(a),i.color):tr($t||($t=ds``))});f=tr(St||(St=ds`
        <line x1="${0}" y1="${0}" x2="${0}" y2="${0}"
          stroke="var(--primary-text-color,#888)" stroke-width="1" opacity="0.35" />
        ${0}`),t,a,t,r-o,i)}return tr(Ct||(Ct=ds`
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
      </svg>`),s,r,this.timeRange,this._onPointerMove,this._onPointerDown,this._onPointerLeave,g,t,a,t,r-o,t,r-o,s-i,r-o,m,f,v,t,a-2,t,a,e.cw,n)}_renderTooltip(){const e=this._hoverIndex;if(null==e||e>=this.data.length)return ar;const t=this._geom(),i=this.data[e],a=t.xScale(i.timestamp)/t.w*100,o=a>55,s=new Date(i.timestamp).toLocaleString([],{weekday:"short",hour:"2-digit",minute:"2-digit"}),r=o?`left:${a}%; transform:translateX(calc(-100% - 8px));`:`left:${a}%; transform:translateX(8px);`;return er(Mt||(Mt=ds`
      <div class="tooltip" style="${0}">
        <div class="tt-head">${0} · msg/min</div>
        ${0}
      </div>
    `),r,s,Cn.map(e=>er(Rt||(Rt=ds`<div class="tt-row">
            <span class="sw ${0}" style="border-top-color:${0}"></span>
            <span class="lbl">${0}</span>
            <span class="val">${0}</span>
          </div>`),e.dash?"dashed":"",e.color,e.label,this._fmtValue(i.values[e.key]))))}};Mn.styles=ms(At||(At=ds`
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
  `)),cs([kr({type:Array})],Mn.prototype,"data",void 0),cs([kr({type:Number})],Mn.prototype,"width",void 0),cs([kr({type:Number})],Mn.prototype,"height",void 0),cs([kr({type:Number})],Mn.prototype,"timeRange",void 0),cs([Sr()],Mn.prototype,"_hoverIndex",void 0),Mn=cs([xr("meshcore-message-rate-chart")],Mn);let Rn=class extends br{constructor(){super(...arguments),this.entities=[],this.hiddenCount=0,this.knownNodeCount=0,this.contactCount=0,this.channelCount=0,this._rateHistory=[],this._rateHistoryKey=null}render(){if(!this.hass||!this.device)return ar;const e=new Set,t=this._renderHeroTiles(e),i=this._buildGroups(e);return er(Tt||(Tt=ds`
      <div class="hero-row">
        ${0}
      </div>

      ${0}

      ${0}
    `),t,this._renderMessageActivityCard(),i.length>0?er(zt||(zt=ds`
          ${0}

          <div class="sensor-grid">
            ${0}
          </div>`),"companion"!==this.device.type?er(It||(It=ds`
              <div class="subsection-label">
                Sensors${0}
              </div>`),this.hiddenCount>0?er(Nt||(Nt=ds`<span class="hidden-suffix">(${0} hidden)</span>`),this.hiddenCount):ar):ar,i.map(e=>this._renderGroup(e))):ar)}updated(e){var t;if(!this.hass||!this.device)return;if(!e.has("hass")&&!e.has("device")&&!e.has("entities"))return;const i=this._findEntityIdMatching("nb_sent"),a=null!==(t=null==i?void 0:i.entity_id)&&void 0!==t?t:null;a&&a!==this._rateHistoryKey?(this._rateHistoryKey=a,this._fetchRateHistory()):a||null===this._rateHistoryKey||(this._rateHistoryKey=null,this._rateHistory=[])}_deriveRateId(e,t){return e.replace(`_${t}_`,`_${t}_rate_`)}async _fetchRateHistory(){if(!this.hass)return;const e=[["sent_flood","sent_flood"],["sent_direct","sent_direct"],["recv_flood","recv_flood"],["recv_direct","recv_direct"],["errors","recv_errors"]],t=[];for(const[i,a]of e){const e=this._findEntityIdMatching(a);e&&t.push([i,this._deriveRateId(e.entity_id,a)])}if(0!==t.length)try{const e=await this.hass.callWS({type:"recorder/statistics_during_period",start_time:new Date(Date.now()-1728e5).toISOString(),end_time:(new Date).toISOString(),statistic_ids:t.map(([,e])=>e),period:"hour"}),a={};for(const[o,s]of t){const t=e[s];if(Array.isArray(t))for(const e of t){var i;if(null==e.start||null==e.mean)continue;const t=new Date(e.start).getTime();(null!==(i=a[t])&&void 0!==i?i:a[t]={})[o]=e.mean}}this._rateHistory=Object.entries(a).map(([e,t])=>({timestamp:parseInt(e,10),values:t})).sort((e,t)=>e.timestamp-t.timestamp)}catch(e){this._rateHistory=[]}else this._rateHistory=[]}_renderMessageActivityCard(){return this._rateHistory.length?er(Ft||(Ft=ds`
      <div class="subsection-label">Message activity (48h)</div>
      <meshcore-message-rate-chart .data=${0}></meshcore-message-rate-chart>
    `),this._rateHistory):ar}_renderHeroTiles(e){const t=this.device;return"companion"===t.type?this._renderCompanionHero(e):"repeater"===t.type?this._renderRepeaterHero(e):this._renderClientHero(e)}_renderRepeaterHero(e){return er(Dt||(Dt=ds`
      ${0}
      ${0}
      ${0}
      ${0}
      ${0}
      ${0}
    `),this._renderBatteryTile(),this._renderSignalTile(),this._renderRadioActivityTile(),this._renderMessagesSentTile(e),this._renderMessagesReceivedTile(e),this._renderRequestsTile(e))}_renderClientHero(e){return er(Et||(Et=ds`
      ${0}
      ${0}
      ${0}
    `),this._renderBatteryTile(),this._renderSignalTile(),this._renderRequestsTile(e))}_renderCompanionHero(e){const t=this._findByMetric("noise_floor");return t&&e.add(t.entity_id),er(Ot||(Ot=ds`
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
    `),this._renderRepeaterStateTile(),this._renderCompanionRadioActivityTile(),this._renderMessagesSentTile(e),this._renderMessagesReceivedTile(e),this._renderUptimeTile(e),this._renderBatteryTile(),this._renderTemperatureTile(e),this._renderSignalTile(),this._renderDeviceClockTile(),this._renderHardwareInfoTile(),this._renderFirmwareInfoTile(),this._renderConnectionInfoTile(),this._renderKnownNodesTile(),this._renderProtocolInfoTile(),this._renderRepeatFrequenciesTile(),this._renderQueueTile(e),this._renderCapacityInfoTile(),this._renderStorageTile(),this._renderLocationTile(),this._renderRequestTokensTile(e),this._renderDiscoveredContactsTile(e))}_renderHardwareInfoTile(){var e,t,i,a,o;const s=null===(e=this.repeaterStatus)||void 0===e?void 0:e.device_info,r="companion"===(null===(t=this.device)||void 0===t?void 0:t.type)?this.device.hardware_model||(null==s?void 0:s.model)||(null===(i=this.repeaterStatus)||void 0===i?void 0:i.model):(null==s?void 0:s.model)||(null===(a=this.repeaterStatus)||void 0===a?void 0:a.model);if(!r)return ar;const n=null===(o=this.device)||void 0===o?void 0:o.name;return er(Pt||(Pt=ds`
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
    `),n?er(Bt||(Bt=ds`<span class="primary compact">${0}</span>`),n):ar,r,100,0,100,"info")}_renderFirmwareInfoTile(){var e,t,i;if("companion"!==(null===(e=this.device)||void 0===e?void 0:e.type))return ar;const a=null===(t=this.repeaterStatus)||void 0===t?void 0:t.device_info,o=this.device.firmware||(null==a?void 0:a.version)||(null===(i=this.repeaterStatus)||void 0===i?void 0:i.firmware),s=null==a?void 0:a.firmware_build;return o||s?er(Lt||(Lt=ds`
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
    `),o?er(Ht||(Ht=ds` · ${0}`),o):ar,s?er(Ut||(Ut=ds`<span class="secondary">Compilado: ${0}</span>`),s):ar,100,0,100,"info"):ar}_renderConnectionInfoTile(){var e,t;if("companion"!==(null===(e=this.device)||void 0===e?void 0:e.type))return ar;const i=null===(t=this.device.connection_type)||void 0===t?void 0:t.toUpperCase(),a=this.device.connection_address;return i||a?er(qt||(qt=ds`
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
    `),this.device.connected?"good":"bad",a||i||"—",i&&a?er(jt||(jt=ds`<span class="secondary">${0}</span>`),i):ar,this.device.connected?100:0,0,100,this.device.connected?"good":"bad"):ar}_renderKnownNodesTile(){var e;return"companion"!==(null===(e=this.device)||void 0===e?void 0:e.type)?ar:er(Vt||(Vt=ds`
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
    `),this.knownNodeCount,100,0,100,"info")}_renderProtocolInfoTile(){var e,t;const i=null===(e=this.repeaterStatus)||void 0===e?void 0:e.device_info;if(!i)return ar;const a=null!=i.protocol_version?`v${i.protocol_version}`:"—",o=null==i.path_hash_mode?"—":null!==(t=["1 byte","2 bytes","3 bytes"][Number(i.path_hash_mode)])&&void 0!==t?t:String(i.path_hash_mode);return er(Wt||(Wt=ds`
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
    `),a,o,100,0,100,"info")}_renderCapacityInfoTile(){var e,t,i;const a=null===(e=this.repeaterStatus)||void 0===e?void 0:e.device_info;return null==(null==a?void 0:a.max_contacts)&&null==(null==a?void 0:a.max_channels)?ar:er(Kt||(Kt=ds`
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
    `),this.contactCount,null!==(t=a.max_contacts)&&void 0!==t?t:"—",this.channelCount,null!==(i=a.max_channels)&&void 0!==i?i:"—",100,0,100,"info")}_renderRepeatFrequenciesTile(){var e;const t=(null===(e=this.repeaterStatus)||void 0===e?void 0:e.allowed_repeat_frequencies)||[];if(!t.length)return ar;const i=t.map(e=>{const t=Number(e.min)/1e3,i=Number(e.max)/1e3;return t===i?`${t.toFixed(3)}`:`${t.toFixed(3)}–${i.toFixed(3)}`});return er(Gt||(Gt=ds`
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
    `),i[0],i.length>1?er(Xt||(Xt=ds`<span class="secondary">· ${0} MHz</span>`),i.slice(1).join(" · ")):ar,100,0,100,"info")}_renderTemperatureTile(e){var t,i;const a=this._findByMetric("temperature");if(!a)return ar;const o=this._readNumber(a.entity_id);if(!Number.isFinite(o))return ar;e.add(a.entity_id);const s=(null!==(t=null===(i=this.hass)||void 0===i||null===(i=i.states[a.entity_id])||void 0===i||null===(i=i.attributes)||void 0===i?void 0:i.unit_of_measurement)&&void 0!==t?t:"°C").includes("F")?5*(o-32)/9:o,r=bn("temperature",9*s/5+32);return er(Qt||(Qt=ds`
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
    `),()=>this._fireMoreInfo(a.entity_id),this._renderInfoTip(r),r.band,s.toFixed(1),s,-20,60,r.band)}_renderDeviceClockTile(){var e,t,i;const a=Number(null===(e=this.repeaterStatus)||void 0===e||null===(e=e.clock)||void 0===e?void 0:e.timestamp);if(!Number.isFinite(a)||a<=0)return ar;const o=Number(null!==(t=null===(i=this.repeaterStatus)||void 0===i||null===(i=i.clock)||void 0===i?void 0:i.drift_seconds)&&void 0!==t?t:0),s=Math.abs(o),r=s<=2?"good":s<=30?"warn":"bad",n=new Date(1e3*a).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit",second:"2-digit"}),l=s<=2?"· synchronized":`· drift ${o>0?"+":""}${o}s`;return er(Yt||(Yt=ds`
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
    `),r,n,l,Math.min(s,120),0,120,r)}_renderRequestTokensTile(e){const t=this.entities.find(e=>e.entity_id.includes("request_rate_limiter"));if(!t)return ar;const i=this._readNumber(t.entity_id);if(!Number.isFinite(i))return ar;e.add(t.entity_id);const a=i<5?"bad":i<10?"warn":"good";return er(Jt||(Jt=ds`
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
    `),()=>this._fireMoreInfo(t.entity_id),a,this._formatNumber(i,1),i,0,20,a)}_renderDiscoveredContactsTile(e){const t=this.entities.find(e=>e.entity_id.includes("discovered_contacts"));if(!t)return ar;const i=this._readNumber(t.entity_id);return Number.isFinite(i)?(e.add(t.entity_id),er(Zt||(Zt=ds`
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
    `),()=>this._fireMoreInfo(t.entity_id),this._formatCount(i),Math.min(i,1e3),0,1e3,"info")):ar}_renderStorageTile(){var e,t;const i=Number(null===(e=this.repeaterStatus)||void 0===e||null===(e=e.battery)||void 0===e?void 0:e.used_kb),a=Number(null===(t=this.repeaterStatus)||void 0===t||null===(t=t.battery)||void 0===t?void 0:t.total_kb);if(!Number.isFinite(i)||!Number.isFinite(a)||a<=0)return ar;const o=Math.max(0,Math.min(100,i/a*100)),s=o>=90?"bad":o>=70?"warn":"good";return er(ei||(ei=ds`
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
    `),s,o.toFixed(0),i,a,o,0,100,s)}_renderRepeaterStateTile(){const e=this.repeaterStatus;if(null==e||!e.supported)return ar;const t=Boolean(e.repeat);return er(ti||(ti=ds`
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
    `),t?"good":"info",t?"Active":"Off",t?100:0,0,100,t?"good":"info")}_renderUptimeTile(e){const t=this._findByMetric("uptime_hours");let i=NaN;if(t){const a=this._readUptimeMinutes(t);i=Number.isFinite(a)?a/60:NaN,e.add(t.entity_id)}if(!Number.isFinite(i)){var a;const e=null===(a=this.repeaterStatus)||void 0===a||null===(a=a.stats.core)||void 0===a?void 0:a.uptime_secs;null!=e&&(i=Number(e)/3600)}if(!Number.isFinite(i))return ar;const o=bn("uptime_hours",i),s=i>=48?`${Math.floor(i/24)}d ${Math.floor(i%24)}h`:i>=1?`${Math.floor(i)}h ${Math.floor(i%1*60)}m`:`${Math.max(0,Math.floor(60*i))}m`;return er(ii||(ii=ds`
      <div class="hero-tile" data-repeater-extra="uptime" @click=${0}>
        <div class="hero-tile-head">
          <span>Tempo ligado${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value"><span class="primary">${0}</span></div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),()=>t&&this._fireMoreInfo(t.entity_id),this._renderInfoTip(o),o.band,s,Math.min(i,168),0,168,o.band)}_renderNoiseFloorTile(e){const t=this._findByMetric("noise_floor");let i=t?this._readNumber(t.entity_id):NaN;if(t&&e.add(t.entity_id),!Number.isFinite(i)){var a;const e=null===(a=this.repeaterStatus)||void 0===a||null===(a=a.stats.radio)||void 0===a?void 0:a.noise_floor;null!=e&&(i=Number(e))}if(!Number.isFinite(i))return ar;const o=bn("noise_floor",i);return er(ai||(ai=ds`
      <div class="hero-tile" data-repeater-extra="noise" @click=${0}>
        <div class="hero-tile-head">
          <span>Ruído de fundo${0}</span>
          <span class="status-dot ${0}"></span>
        </div>
        <div class="hero-tile-value"><span class="primary">${0}<span class="unit">dBm</span></span></div>
        <meshcore-stat-bar .value=${0} .min=${0} .max=${0} .band=${0}></meshcore-stat-bar>
      </div>
    `),()=>t&&this._fireMoreInfo(t.entity_id),this._renderInfoTip(o),o.band,this._formatNumber(i,0),i,-130,-90,o.band)}_renderQueueTile(e){const t=this._findByMetric("tx_queue_len");let i=t?this._readNumber(t.entity_id):NaN;if(t&&e.add(t.entity_id),!Number.isFinite(i)){var a;const e=null===(a=this.repeaterStatus)||void 0===a||null===(a=a.stats.core)||void 0===a?void 0:a.queue_len;null!=e&&(i=Number(e))}if(!Number.isFinite(i))return ar;const o=bn("tx_queue_len",i);return er(oi||(oi=ds`
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
    `),()=>t&&this._fireMoreInfo(t.entity_id),this._renderInfoTip(o),o.band,this._formatCount(i),Math.min(Math.max(i,0),30),0,30,o.band)}_renderBatteryTile(){var e;const t=this._findByMetric("battery_pct");if(!t)return ar;const i=this._readNumber(t.entity_id),a=null!==(e=this._findEntityIdMatching("battery_voltage"))&&void 0!==e?e:this._findEntityByLabel("Voltage"),o=a?this._readNumber(a.entity_id):NaN,s=bn("battery_pct",i);return er(si||(si=ds`
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
    `),()=>this._fireMoreInfo(t.entity_id),this._renderInfoTip(s),s.band,this._formatNumber(i,0),Number.isFinite(o)?er(ri||(ri=ds`<span class="secondary">· ${0} V</span>`),o.toFixed(3)):ar,i,0,100,s.band)}_renderSignalTile(){const e=this._findByMetric("rssi");if(!e)return ar;const t=this._readNumber(e.entity_id),i=this._findByMetric("snr"),a=i?this._readNumber(i.entity_id):NaN,o=bn("rssi",t);return er(ni||(ni=ds`
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
    `),()=>this._fireMoreInfo(e.entity_id),this._renderInfoTip(o),o.band,this._formatNumber(t,0),Number.isFinite(a)?er(li||(li=ds`<span class="secondary">· SNR ${0} dB</span>`),a.toFixed(1)):ar,t,-130,-30,o.band)}_renderRadioActivityTile(){const e=this._findByMetric("tx_airtime_util"),t=this._findByMetric("rx_airtime_util");if(!e&&!t)return ar;const i=e?this._readNumber(e.entity_id):0,a=t?this._readNumber(t.entity_id):0,o=Number.isFinite(i)?Math.max(0,i):0,s=Number.isFinite(a)?Math.max(0,a):0,r=Math.max(0,100-o-s),n=bn("tx_airtime_util",o).band,l=bn("rx_airtime_util",s).band,d=this._worseBand(n,l),c=[{value:o,label:`TX ${o.toFixed(1)}%`,kind:"tx"},{value:s,label:`RX ${s.toFixed(1)}%`,kind:"rx"},{value:r,label:`Idle ${r.toFixed(1)}%`,kind:"idle"}],p=o+s;return er(di||(di=ds`
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
    `),()=>e&&this._fireMoreInfo(e.entity_id),this._renderInfoTip({band:d,fillPct:0,tooltip:"Half-duplex composition over the last reporting interval. The radio can transmit OR receive, never both. TX above 10% indicates duty-cycle pressure; sustained TX+RX above 30% means the channel is congested."}),d,p.toFixed(1),c,100,"none",e?er(ci||(ci=ds`<span class="ra-legend-item" @click=${0}>
                  <span class="legend-swatch tx"></span>TX ${0}%
                </span>`),t=>{t.stopPropagation(),e&&this._fireMoreInfo(e.entity_id)},o.toFixed(1)):er(pi||(pi=ds`<span class="ra-legend-item">
                  <span class="legend-swatch tx"></span>TX ${0}%
                </span>`),o.toFixed(1)),t?er(hi||(hi=ds`<span class="ra-legend-item" @click=${0}>
                  <span class="legend-swatch rx"></span>RX ${0}%
                </span>`),e=>{e.stopPropagation(),t&&this._fireMoreInfo(t.entity_id)},s.toFixed(1)):er(ui||(ui=ds`<span class="ra-legend-item">
                  <span class="legend-swatch rx"></span>RX ${0}%
                </span>`),s.toFixed(1)),r.toFixed(1))}_renderMessagesSentTile(e){const t=this._findEntityIdMatching("nb_sent"),i=this._findEntityIdMatching("sent_flood"),a=this._findEntityIdMatching("sent_direct");if(!t||!i&&!a)return ar;const o=this._readNumber(t.entity_id),s=i?this._readNumber(i.entity_id):0,r=a?this._readNumber(a.entity_id):0,n=[{value:s,label:`Flood ${s}`,kind:"flood"},{value:r,label:`Direct ${r}`,kind:"direct"}];return e.add(t.entity_id),i&&e.add(i.entity_id),a&&e.add(a.entity_id),er(gi||(gi=ds`
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
    `),()=>this._fireMoreInfo(t.entity_id),this._renderInfoTip({band:"info",fillPct:0,tooltip:"Messages sent (lifetime), split by send mode:\n• Flood — broadcast retransmits visible to all neighbours.\n• Direct — routed point-to-point along a path."}),this._formatCount(o),n,"inline")}_renderMessagesReceivedTile(e){const t=this._findEntityIdMatching("nb_recv"),i=this._findEntityIdMatching("recv_flood"),a=this._findEntityIdMatching("recv_direct"),o=this._findEntityIdMatching("flood_dups"),s=this._findEntityIdMatching("direct_dups");if(!t||!i&&!a)return ar;const r=this._readNumber(t.entity_id),n=i?this._readNumber(i.entity_id):0,l=a?this._readNumber(a.entity_id):0,d=[{value:n,label:`Flood ${n}`,kind:"flood"},{value:l,label:`Direct ${l}`,kind:"direct"}],c=o?this._readNumber(o.entity_id):0,p=s?this._readNumber(s.entity_id):0,h=(Number.isFinite(c)?c:0)+(Number.isFinite(p)?p:0),u=r>0?h/r*100:0;e.add(t.entity_id),i&&e.add(i.entity_id),a&&e.add(a.entity_id),o&&e.add(o.entity_id),s&&e.add(s.entity_id);const g=this._findEntityIdMatching("recv_errors"),v=g?this._readNumber(g.entity_id):NaN,m=Number.isFinite(v)?v:0,f=r+m,_=f>0?m/f*100:0;return g&&e.add(g.entity_id),er(vi||(vi=ds`
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
    `),()=>this._fireMoreInfo(t.entity_id),this._renderInfoTip({band:"info",fillPct:0,tooltip:"Messages received (lifetime), split by receive mode:\n• Flood — broadcast packets received from neighbours.\n• Direct — routed packets where this node is on the path.\n\nEach bar below is a percentage of its own total:\n• Red = receive errors (CRC failures), as a share of all reception attempts (received + errors) — i.e. the error rate.\n• Amber = duplicate receptions, as a share of received messages (duplicates are a subset of received).\n\nBoth are context only, not banded — in a flooding mesh every active neighbour retransmits the same flood once, so a high duplicate ratio is normal (a 2-neighbour repeater sees ~50%, a 3-neighbour ~67%, etc.)."}),this._formatCount(r),d,"none",m>0?er(mi||(mi=ds`<div class="err-line"
                      title="Receive errors (CRC failures): ${0} — ${0}% of reception attempts (received + errors)">
              <div class="err-line-fill" style="width:${0}%"></div>
            </div>`),m,_.toFixed(1),Math.min(100,_).toFixed(1)):ar,h>0?er(fi||(fi=ds`<div class="dup-line"
                      title="Duplicate receptions: ${0} — ${0}% of received messages">
              <div class="dup-line-fill" style="width:${0}%"></div>
            </div>`),h,u.toFixed(1),Math.min(100,u).toFixed(1)):ar,n,l,m>0?er(_i||(_i=ds`<span><span class="msg-swatch error"></span>Error ${0}</span>`),m):ar,h>0?er(bi||(bi=ds`<span><span class="msg-swatch dup"></span>Dup ${0}</span>`),h):ar)}_renderRequestsTile(e){const t=this._findEntityIdMatching("request_succ"),i=this._findEntityIdMatching("request_fail");if(!t||!i)return ar;const a=this._readNumber(t.entity_id),o=this._readNumber(i.entity_id),s=a+o,r=s>0?a/s*100:0,n=s>=50?bn("request_success_rate",r):{band:"info",fillPct:0,tooltip:""},l=[{value:a,label:`OK ${a}`,kind:"success"},{value:o,label:`Fail ${o}`,kind:"failure"}];return e.add(t.entity_id),e.add(i.entity_id),er(yi||(yi=ds`
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
    `),()=>this._fireMoreInfo(t.entity_id),this._renderInfoTip({...n,tooltip:"Outgoing requests this node initiated (login, telemetry, neighbour query) and how they resolved. Success rate bands: Green > 90%, Yellow 70–90%, Red < 70%, with a minimum sample of 50 attempts to colour. Below the floor, the bar stays neutral — too few samples to judge."}),n.band,s>0?`${r.toFixed(0)}%`:"—",s>0?er(xi||(xi=ds`<span class="secondary">· ${0} attempt${0}</span>`),s,1===s?"":"s"):ar,l,"inline")}_formatCount(e){return Number.isFinite(e)?Math.round(e).toLocaleString():"—"}_renderLocationTile(){const e=this._findEntityIdMatching("latitude"),t=this._findEntityIdMatching("longitude");let i=e?this._readNumber(e.entity_id):NaN,a=t?this._readNumber(t.entity_id):NaN,o="entity";!Number.isFinite(i)&&Number.isFinite(this.fallbackLatitude)&&(i=this.fallbackLatitude,o="fallback"),!Number.isFinite(a)&&Number.isFinite(this.fallbackLongitude)&&(a=this.fallbackLongitude,o="fallback");const s=Number.isFinite(i)&&Number.isFinite(a)&&(0!==i||0!==a);if(!s)return ar;let r=null;if("entity"===o&&e){var n;const t=null===(n=this.hass)||void 0===n||null===(n=n.states[e.entity_id])||void 0===n?void 0:n.last_updated;if(t){const e=new Date(t);Number.isNaN(e.getTime())||(r=e)}}else"fallback"===o&&Number.isFinite(this.fallbackUpdated)&&(r=new Date(1e3*this.fallbackUpdated));const l=s&&r?this._formatRelativeTime(r):"";return er(wi||(wi=ds`
      <div class="hero-tile" @click=${0}>
        <div class="hero-tile-head">
          <span>Localização${0}</span>
        </div>
        <div class="hero-tile-value">
          ${0}
        </div>
        ${0}
      </div>
    `),()=>{e&&this._fireMoreInfo(e.entity_id)},"fallback"===o?er($i||($i=ds`<span style="opacity:0.55;text-transform:none;letter-spacing:0;font-size:10px;margin-left:4px;">via contact</span>`)):ar,s?er(ki||(ki=ds`<span class="coord-pair">
                ${0}, ${0}
              </span>`),i.toFixed(4),a.toFixed(4)):er(Si||(Si=ds`<span class="primary">—</span>`)),l?er(Ci||(Ci=ds`<div class="loc-updated">Updated ${0}</div>`),l):ar)}_formatRelativeTime(e){const t=(Date.now()-e.getTime())/1e3;return!Number.isFinite(t)||t<0||t<60?"just now":t<3600?`${Math.floor(t/60)} min ago`:t<86400?`${Math.floor(t/3600)} h ago`:`${Math.floor(t/86400)} d ago`}_renderCompanionRadioActivityTile(){const e=this._findEntityIdMatching("tx_airtime"),t=this._findEntityIdMatching("rx_airtime"),i=this._findByMetric("uptime_hours");if(!e&&!t||!i)return ar;const a=this._readUptimeMinutes(i);if(!Number.isFinite(a)||a<=0)return ar;const o=e?this._readNumber(e.entity_id):0,s=t?this._readNumber(t.entity_id):0;if(!Number.isFinite(o)&&!Number.isFinite(s))return ar;const r=e=>Number.isFinite(e)?Math.min(100,Math.max(0,e/a*100)):0,n=r(o),l=r(s),d=Math.max(0,100-n-l),c=bn("tx_airtime_util",n).band,p=bn("rx_airtime_util",l).band,h=this._worseBand(c,p),u=[{value:n,label:`TX ${n.toFixed(1)}%`,kind:"tx"},{value:l,label:`RX ${l.toFixed(1)}%`,kind:"rx"},{value:d,label:`Idle ${d.toFixed(1)}%`,kind:"idle"}],g=n+l;return er(Mi||(Mi=ds`
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
    `),()=>e&&this._fireMoreInfo(e.entity_id),this._renderInfoTip({band:h,fillPct:0,tooltip:"Lifetime-average half-duplex composition: cumulative TX / RX airtime divided by uptime since the node last booted. The radio can transmit OR receive, never both. Unlike a managed repeater (which reports utilisation over the last interval), the companion exposes only cumulative airtime, so this is a long-run average and will not reflect short recent bursts."}),h,g.toFixed(1),u,100,"none",e?er(Ri||(Ri=ds`<span class="ra-legend-item" @click=${0}>
                  <span class="legend-swatch tx"></span>TX ${0}%
                </span>`),t=>{t.stopPropagation(),e&&this._fireMoreInfo(e.entity_id)},n.toFixed(1)):er(Ai||(Ai=ds`<span class="ra-legend-item">
                  <span class="legend-swatch tx"></span>TX ${0}%
                </span>`),n.toFixed(1)),t?er(Ti||(Ti=ds`<span class="ra-legend-item" @click=${0}>
                  <span class="legend-swatch rx"></span>RX ${0}%
                </span>`),e=>{e.stopPropagation(),t&&this._fireMoreInfo(t.entity_id)},l.toFixed(1)):er(zi||(zi=ds`<span class="ra-legend-item">
                  <span class="legend-swatch rx"></span>RX ${0}%
                </span>`),l.toFixed(1)),d.toFixed(1))}_readUptimeMinutes(e){var t,i;const a=this._readNumber(e.entity_id);if(!Number.isFinite(a))return NaN;switch(null!==(t=null===(i=this.hass)||void 0===i||null===(i=i.states[e.entity_id])||void 0===i||null===(i=i.attributes)||void 0===i?void 0:i.unit_of_measurement)&&void 0!==t?t:""){case"d":return 1440*a;case"h":return 60*a;case"min":return a;default:return a/60}}_buildGroups(e){var t;const i={"Radio · live":[],"Radio · configuration":[],Status:[],Identity:[]};for(const t of this.entities)e.has(t.entity_id)||this._isHeroDuplicate(t)||i[this._groupOf(t)].push(this._renderRow(t));const a="companion"===(null===(t=this.device)||void 0===t?void 0:t.type),o=["Radio · live","Radio · configuration","Identity"];return Object.entries(i).filter(([e,t])=>!(0===t.length||a&&o.includes(e))).map(([e,t])=>({name:e,rows:t}))}_isHeroDuplicate(e){return"battery_pct"===e.metricKey||2===e.sortOrder||"snr"===e.metricKey||"rssi"===e.metricKey||"temperature"===e.metricKey||"uptime_hours"===e.metricKey||"tx_airtime_util"===e.metricKey||"rx_airtime_util"===e.metricKey||"Airtime"===e.label||"RX Airtime"===e.label}_groupOf(e){const t=e.entity_id,i=e.sortOrder;return e.booleanProblem||t.includes("dashboard_health")||2===i?"Status":6===i?"Radio · configuration":4===i||5===i||9===i||10===i||11===i||12===i||t.includes("noise_floor")||t.includes("tx_queue")?"Radio · live":t.includes("frequency")||t.includes("bandwidth")||t.includes("spreading_factor")||t.includes("rate_limiter")?"Radio · configuration":t.includes("hop_count")||t.includes("out_path")||t.includes("last_seen")||t.includes("last_advert")||3===i||8===i||7===i?"Status":"Identity"}_renderGroup(e){return er(Ii||(Ii=ds`
      <div class="group-label">${0}</div>
      ${0}
    `),e.name,e.rows)}_renderRow(e){var t,i,a,o,s;if(e.booleanProblem){var r;const t=null===(r=this.hass)||void 0===r||null===(r=r.states[e.entity_id])||void 0===r?void 0:r.state,i=void 0===t||"unknown"===t||"unavailable"===t,a="on"===t,o=i?"info":a?"bad":"good";return er(Ni||(Ni=ds`
        <div class="sensor-item"
             @click=${0}
             @contextmenu=${0}
             ${0}>
          <span class="status-dot ${0}"></span>
          <span class="si-label">${0}</span>
          <span class="si-value">${0}</span>
          <span class="si-bar"></span>
        </div>
      `),()=>this._fireMoreInfo(e.entity_id),t=>this._fireContextMenu(t,e),xn(()=>this._fireContextMenu(void 0,e)),o,e.label,i?"—":a?"Detected":"OK")}const n=this._readNumber(e.entity_id),l=null===(t=this.hass)||void 0===t?void 0:t.states[e.entity_id],d=null!==(i=null==l||null===(a=l.attributes)||void 0===a?void 0:a.unit_of_measurement)&&void 0!==i?i:"",c=e.metricKey?this._evaluateForRow(e.metricKey,n,e):null,p=null!==(o=null==c?void 0:c.band)&&void 0!==o?o:"info",h=e.staticTooltip||(null==c?void 0:c.tooltip)||"",u=h?{band:p,fillPct:null!==(s=null==c?void 0:c.fillPct)&&void 0!==s?s:0,tooltip:h,source:null==c?void 0:c.source}:null,g=this._formatRowValue(e,n,null==l?void 0:l.state);return er(Fi||(Fi=ds`
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
    `),()=>this._fireMoreInfo(e.entity_id),t=>this._fireContextMenu(t,e),xn(()=>this._fireContextMenu(void 0,e)),p,e.label,u?this._renderInfoTip(u):ar,g,d?er(Di||(Di=ds`<span class="unit">${0}</span>`),d):ar,c&&e.metricKey?er(Ei||(Ei=ds`<meshcore-stat-bar
                .value=${0}
                .min=${0}
                .max=${0}
                .band=${0}>
              </meshcore-stat-bar>`),c.fillPct,0,100,p):ar)}_evaluateForRow(e,t,i){if("uptime_hours"===e){var a,o;let s=t;switch(null!==(a=null===(o=this.hass)||void 0===o||null===(o=o.states[i.entity_id])||void 0===o||null===(o=o.attributes)||void 0===o?void 0:o.unit_of_measurement)&&void 0!==a?a:""){case"d":s=24*t;break;case"h":s=t;break;case"min":s=t/60;break;default:s=t/3600}return bn(e,s)}var s,r;return bn(e,"temperature"===e&&(null!==(s=null===(r=this.hass)||void 0===r||null===(r=r.states[i.entity_id])||void 0===r||null===(r=r.attributes)||void 0===r?void 0:r.unit_of_measurement)&&void 0!==s?s:"").includes("C")?9*t/5+32:t)}_findByMetric(e){return this.entities.find(t=>t.metricKey===e)}_findEntityIdMatching(e){return this.entities.find(t=>t.entity_id.includes(e))}_findEntityByLabel(e){return this.entities.find(t=>t.label===e)}_readNumber(e){var t;const i=null===(t=this.hass)||void 0===t?void 0:t.states[e];if(!i||"unavailable"===i.state||"unknown"===i.state)return NaN;const a=parseFloat(i.state);return Number.isFinite(a)?a:NaN}_formatNumber(e,t){return Number.isFinite(e)?e.toFixed(t):"—"}_formatRowValue(e,t,i){var a;if("unavailable"===i||"unknown"===i)return"—";if(!Number.isFinite(t))return null!=i?i:"—";const o=null===(a=this.hass)||void 0===a||null===(a=a.entities)||void 0===a||null===(a=a[e.entity_id])||void 0===a?void 0:a.display_precision;return null!=o&&o>=0?t.toFixed(o):i&&i.includes(".")?i:t.toString()}_renderInfoTip(e){var t;return e.tooltip?er(Oi||(Oi=ds`<meshcore-info-tip
      .content=${0}
      .source=${0}>
    </meshcore-info-tip>`),e.tooltip,null!==(t=e.source)&&void 0!==t?t:""):ar}_worseBand(e,t){const i={good:0,info:0,warn:1,bad:2};return i[e]>=i[t]?e:t}_fireMoreInfo(e){e&&this.dispatchEvent(new CustomEvent("hass-more-info",{detail:{entityId:e},bubbles:!0,composed:!0}))}_fireContextMenu(e,t){null==e||e.preventDefault(),this.dispatchEvent(new CustomEvent("tile-context-menu",{detail:{entityId:t.entity_id,label:t.label},bubbles:!0,composed:!0}))}};Rn.styles=ms(Pi||(Pi=ds`
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

    /* HiveFW Status cockpit: one information matrix instead of a wall of cards.
       The tiles remain individually clickable and keep all existing data. */
    :host([data-hive-native-cockpit="1"]) .hero-row {
      gap: 0;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      overflow: hidden;
      background: var(--card-background-color, #fff);
    }
    :host([data-hive-native-cockpit="1"]) .hero-tile {
      min-height: 66px;
      padding: 10px 12px;
      border: 0;
      border-right: 1px solid var(--divider-color, #e0e0e0);
      border-bottom: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 0;
      background: transparent;
      box-shadow: none;
      transition: background-color .15s ease;
    }
    :host([data-hive-native-cockpit="1"]) .hero-tile:hover {
      border-color: var(--divider-color, #e0e0e0);
      background: color-mix(in srgb, var(--primary-color) 6%, transparent);
      transform: none;
    }
    :host([data-hive-native-cockpit="1"]) .hero-tile-head {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: .055em;
    }
    :host([data-hive-native-cockpit="1"]) .hero-tile-value .primary {
      font-size: 17px;
      font-weight: 700;
      line-height: 1.08;
    }
    :host([data-hive-native-cockpit="1"]) .hero-tile-value .compact {
      font-size: 15px;
      font-weight: 650;
    }
    :host([data-hive-native-cockpit="1"]) .hero-tile-value .secondary {
      font-size: 9px;
    }
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
  `)),cs([kr({type:Object})],Rn.prototype,"hass",void 0),cs([kr({type:Object})],Rn.prototype,"device",void 0),cs([kr({type:Array})],Rn.prototype,"entities",void 0),cs([kr({type:Number})],Rn.prototype,"hiddenCount",void 0),cs([kr({type:Number})],Rn.prototype,"knownNodeCount",void 0),cs([kr({type:Number})],Rn.prototype,"contactCount",void 0),cs([kr({type:Number})],Rn.prototype,"channelCount",void 0),cs([kr({type:Number})],Rn.prototype,"fallbackLatitude",void 0),cs([kr({type:Number})],Rn.prototype,"fallbackLongitude",void 0),cs([kr({type:Number})],Rn.prototype,"fallbackUpdated",void 0),cs([kr({type:Object})],Rn.prototype,"repeaterStatus",void 0),cs([Sr()],Rn.prototype,"_rateHistory",void 0),Rn=cs([xr("meshcore-node-summary")],Rn);let An=class extends br{constructor(){super(...arguments),this.narrow=!1,this.knownNodeCount=0,this.contactCount=0,this.channelCount=0,this._repeaterStatus=null,this._deviceConfig=null,this._deviceEntities={},this._meshcoreDeviceMap={},this._hiddenSensors={},this._contextMenu=null,this._statusMessage=null,this._hiddenSensorsOpen=!1,this._loadedEntry=null,this._statusMessageTimeout=null,this._trace=()=>{var e;this.dispatchEvent(new CustomEvent("companion-trace-requested",{detail:{entryId:null===(e=this.selectedDevice)||void 0===e?void 0:e.entry_id},bubbles:!0,composed:!0}))}}connectedCallback(){super.connectedCallback(),this._loadHiddenSensors()}updated(){var e;const t=(null===(e=this.selectedDevice)||void 0===e?void 0:e.entry_id)||null;t&&t!==this._loadedEntry&&(this._loadedEntry=t,this._loadData())}async _loadData(){if(this.hass)try{var e,t;const[{meshcoreDeviceMap:i,deviceEntities:a},o,s]=await Promise.all([mn(this.hass),Pr(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id).catch(()=>null),Dr(this.hass,null===(t=this.config)||void 0===t?void 0:t.entry_id).catch(()=>null)]);this._meshcoreDeviceMap=i,this._deviceEntities=a,this._repeaterStatus=o,this._deviceConfig=s}catch(e){this._repeaterStatus=null}}_deviceKey(){var e;return(null===(e=this.selectedDevice)||void 0===e?void 0:e.entry_id)||"companion"}_entities(){var e;if(!this.hass||!this.selectedDevice)return[];const t=new Set(this._hiddenSensors[this._deviceKey()]||[]),i=this.selectedDevice.entry_id,a=this._meshcoreDeviceMap[i];if(a&&this._deviceEntities[a])return this._deviceEntities[a].filter(e=>!t.has(e.entity_id));const o=(null===(e=this.selectedDevice.pubkey_prefix)||void 0===e||null===(e=e.substring(0,6))||void 0===e?void 0:e.toLowerCase())||"";if(!o)return[];const s=[];for(const[e,i]of Object.entries(this._deviceEntities))if(!Object.entries(this._meshcoreDeviceMap).some(([t,i])=>i===e&&(t.includes("_repeater_")||t.includes("_client_"))))for(const e of i)e.entity_id.toLowerCase().includes(o)&&!t.has(e.entity_id)&&s.push(e);return s.sort((e,t)=>e.sortOrder-t.sortOrder)}_descriptor(e){var t,i,a,o;return{type:"companion",name:e.name,pubkey_prefix:e.pubkey_prefix,connected:e.connected,firmware:e.firmware||(null===(t=this._deviceConfig)||void 0===t?void 0:t.firmware_version),hardware_model:null===(i=this._deviceConfig)||void 0===i?void 0:i.hardware_model,connection_type:null===(a=this._deviceConfig)||void 0===a?void 0:a.connection_type,connection_address:null===(o=this._deviceConfig)||void 0===o?void 0:o.connection_address,entry_id:e.entry_id}}_loadHiddenSensors(){try{this._hiddenSensors=JSON.parse(localStorage.getItem("meshcore-hidden-sensors")||"{}")}catch(e){this._hiddenSensors={}}}_saveHiddenSensors(){try{localStorage.setItem("meshcore-hidden-sensors",JSON.stringify(this._hiddenSensors))}catch(e){}}_hideSensor(e,t){const i=this._deviceKey(),a=this._hiddenSensors[i]||[];a.includes(e)||(this._hiddenSensors={...this._hiddenSensors,[i]:[...a,e]}),this._saveHiddenSensors(),this._contextMenu=null,this._showStatus("Oculto: "+t,"success")}_unhideSensor(e){const t=this._deviceKey(),i=(this._hiddenSensors[t]||[]).filter(t=>t!==e),a={...this._hiddenSensors};i.length?a[t]=i:delete a[t],this._hiddenSensors=a,this._saveHiddenSensors()}async _action(e,t,i){if(this.hass)try{var a;const o=await async function(e,t,i,a){try{const o={type:"hivefw_integration/execute_local",command:t};return i&&(o.args=i),a&&(o.entry_id=a),await e.callWS(o)}catch(e){const t=e;return{response:t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e),success:!1,timestamp:(new Date).toISOString()}}}(this.hass,e,t,null===(a=this.config)||void 0===a?void 0:a.entry_id);this._showStatus("Companion: "+(i||e)+" → "+(o.response||"OK"),"success"),"set_time"===e&&this._loadData()}catch(t){this._showStatus("Companion: "+(i||e)+" — "+String(t),"error")}}async _copyPublicKey(e){if(e){try{await navigator.clipboard.writeText(e)}catch(t){const i=document.createElement("textarea");i.value=e,i.style.position="fixed",i.style.opacity="0",document.body.appendChild(i),i.select(),document.execCommand("copy"),i.remove()}this._showStatus("Public Key copiada","success")}}_showStatus(e,t){this._statusMessage={text:e,type:t},null!==this._statusMessageTimeout&&window.clearTimeout(this._statusMessageTimeout),this._statusMessageTimeout=window.setTimeout(()=>{this._statusMessage=null,this._statusMessageTimeout=null},5e3)}render(){var e;const t=this.selectedDevice;if(!t)return er(Bi||(Bi=ds`<div class="page"><div class="wrap">Sem Companion selecionado.</div></div>`));const i=this._entities(),a=this._hiddenSensors[this._deviceKey()]||[];return er(Li||(Li=ds`
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
    `),t.name,(null===(e=this._deviceConfig)||void 0===e?void 0:e.pubkey)||t.pubkey||t.pubkey_prefix,()=>{var e;this._copyPublicKey((null===(e=this._deviceConfig)||void 0===e?void 0:e.pubkey)||t.pubkey||t.pubkey_prefix)},a.length?er(Hi||(Hi=ds`<button class="minor" @click=${0}>Sensores ocultos (${0})</button>`),()=>this._hiddenSensorsOpen=!0,a.length):ar,i.length?er(Ui||(Ui=ds`<meshcore-node-summary
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
          </meshcore-node-summary>`),this.hass,this._descriptor(t),i,a.length,this.knownNodeCount,this.contactCount,this.channelCount,this._repeaterStatus,e=>{this._contextMenu={...e.detail,deviceKey:this._deviceKey()}}):ar,!t.connected,()=>this._action("send_advert",void 0,"Local Advert"),!t.connected,()=>this._action("send_advert",{flood:!0},"Flood Advert"),!t.connected,()=>this._action("set_time",{val:Math.floor(Date.now()/1e3)},"Sync Clock"),!t.connected,this._trace,!t.connected,()=>{window.confirm("Reiniciar agora o HiveFW?")&&this._action("reboot",void 0,"Reboot")},this._contextMenu?er(qi||(qi=ds`<div class="overlay" @click=${0}><div class="dialog" @click=${0}>
        <div class="dialog-head"><div class="dialog-title">${0}</div><button class="minor" @click=${0}>Fechar</button></div>
        <button class="danger" @click=${0}>Ocultar sensor</button>
      </div></div>`),()=>this._contextMenu=null,e=>e.stopPropagation(),this._contextMenu.label,()=>this._contextMenu=null,()=>this._hideSensor(this._contextMenu.entityId,this._contextMenu.label)):ar,this._hiddenSensorsOpen?er(ji||(ji=ds`<div class="overlay" @click=${0}><div class="dialog" @click=${0}>
        <div class="dialog-head"><div class="dialog-title">Sensores ocultos</div><button class="minor" @click=${0}>Fechar</button></div>
        ${0}
      </div></div>`),()=>this._hiddenSensorsOpen=!1,e=>e.stopPropagation(),()=>this._hiddenSensorsOpen=!1,a.map(e=>{var t;return er(Vi||(Vi=ds`<div class="sensor-row"><div><div>${0}</div><div class="sensor-id">${0}</div></div><button class="minor" @click=${0}>Mostrar</button></div>`),(null===(t=Object.values(this._deviceEntities).flat().find(t=>t.entity_id===e))||void 0===t?void 0:t.label)||e,e,()=>this._unhideSensor(e))})):ar,this._statusMessage?er(Wi||(Wi=ds`<div class="toast ${0}">${0}</div>`),this._statusMessage.type,this._statusMessage.text):ar)}};An.styles=ms(Ki||(Ki=ds`
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
  `)),cs([kr({type:Object})],An.prototype,"hass",void 0),cs([kr({type:Object})],An.prototype,"config",void 0),cs([kr({type:Boolean})],An.prototype,"narrow",void 0),cs([kr({type:Object})],An.prototype,"selectedDevice",void 0),cs([kr({type:Number})],An.prototype,"knownNodeCount",void 0),cs([kr({type:Number})],An.prototype,"contactCount",void 0),cs([kr({type:Number})],An.prototype,"channelCount",void 0),cs([Sr()],An.prototype,"_repeaterStatus",void 0),cs([Sr()],An.prototype,"_deviceConfig",void 0),cs([Sr()],An.prototype,"_deviceEntities",void 0),cs([Sr()],An.prototype,"_meshcoreDeviceMap",void 0),cs([Sr()],An.prototype,"_hiddenSensors",void 0),cs([Sr()],An.prototype,"_contextMenu",void 0),cs([Sr()],An.prototype,"_statusMessage",void 0),cs([Sr()],An.prototype,"_hiddenSensorsOpen",void 0),An=cs([xr("meshcore-status-page")],An);let Tn=class extends br{constructor(){super(),this.open=!1,this.title="Confirm",this.message="",this.confirmLabel="Confirm",this.cancelLabel="Cancel",this.dangerous=!1,this._typedValue="",dn(this,{isOpen:()=>this.open,onEscape:()=>this._onCancel()})}render(){if(!this.open)return;const e=this.requireTyped&&this._typedValue!==this.requireTyped;return er(Gi||(Gi=ds`
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
    `),this._onOverlayClick,this.title,this.title,this.message,this.requireTyped?er(Xi||(Xi=ds`
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
                `),this.requireTyped,this._typedValue,e=>{this._typedValue=e.target.value},this.requireTyped):"",this._onCancel,this.cancelLabel,this.dangerous?"danger-button":"",e,this._onConfirm,this.confirmLabel)}_onOverlayClick(e){e.target===e.currentTarget&&this._onCancel()}_onCancel(){this._typedValue="",this.dispatchEvent(new CustomEvent("cancel",{bubbles:!0}))}_onConfirm(){this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0})),this._typedValue=""}};Tn.styles=[Cr,ms(Qi||(Qi=ds`
      :host {
        display: block;
      }
    `))],cs([kr({type:Boolean})],Tn.prototype,"open",void 0),cs([kr({type:String})],Tn.prototype,"title",void 0),cs([kr({type:String})],Tn.prototype,"message",void 0),cs([kr({type:String})],Tn.prototype,"confirmLabel",void 0),cs([kr({type:String})],Tn.prototype,"cancelLabel",void 0),cs([kr({type:Boolean})],Tn.prototype,"dangerous",void 0),cs([kr({type:String})],Tn.prototype,"requireTyped",void 0),cs([Sr()],Tn.prototype,"_typedValue",void 0),Tn=cs([xr("meshcore-confirm-dialog")],Tn);const zn=[{step:"generating",label:"Generating new key"},{step:"importing",label:"Sending key to device"},{step:"rebooting",label:"Rebooting device"},{step:"reconnecting",label:"Waiting for device reconnect"},{step:"reloading",label:"Reloading HiveFW integration"},{step:"verifying",label:"Verifying new identity"}];let In=class extends br{constructor(){super(),this.narrow=!1,this.contactCount=0,this.channelCount=0,this._deviceConfig=null,this._repeaterStatus=null,this._managedDevices={repeaters:[],clients:[]},this._scopeDraft="",this._scopeGlobal=!1,this._scopeSaving=!1,this._regionTarget="",this._regionText="",this._regionBusy=!1,this._localRegions=null,this._localRegionBusy=!1,this._localRegionAction="put",this._localRegionName="",this._localRegionParent="",this._regionAction="allowf",this._regionName="",this._loading=!0,this._error=null,this._editValues={},this._saving=!1,this._firmwareOtaStatus=null,this._firmwareFile=null,this._firmwareBusy=!1,this._firmwareChecking=!1,this._firmwareUploadStage=null,this._firmwareDownloadTarget="v3-wifi",this._dutyCycleValue=10,this._dutyCycleBusy=null,this._adminPasswordDraft="",this._guestPasswordDraft="",this._repeaterAccessBusy=null,this._repeaterReadBusy=!1,this._repeaterQuickBusy=null,this._aclNewPublicKey="",this._aclNewPermissions=1,this._backupBusy=null,this._confirmAction=null,this._confirmDialogOpen=!1,this._locationSource="manual",this._locationMode="manual",this._settingsTopic=null,this._importKeyValue="",this._identityFlowState={kind:"closed"},this._identityFlowUnsubscribe=null,this._settingsWriteQueue=Promise.resolve(),this._renameSuccess=null,this._statusMessage=null,this._statusMessageTimeout=null,this._readDutyCycle=async()=>{if(this.hass&&!this._dutyCycleBusy){this._dutyCycleBusy="read";try{var e;const t=await async function(e,t){const i={type:"hivefw_integration/get_duty_cycle"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),i=Number(t.duty_cycle);if(!Number.isFinite(i))throw new Error("Valor de Duty Cycle inválido.");this._dutyCycleValue=Math.max(10,Math.min(50,Math.round(i))),this.requestUpdate(),this._showStatusMessage(`Duty Cycle lido do Companion: ${this._dutyCycleValue}%`,"success")}catch(e){const t=e,i=null!=t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e);this._showStatusMessage(`Duty Cycle: ${i}`,"error")}finally{this._dutyCycleBusy=null}}},dn(this,{isOpen:()=>"closed"!==this._identityFlowState.kind,onEscape:()=>{"success"!==this._identityFlowState.kind&&"failure"!==this._identityFlowState.kind||this._closeIdentityFlowModal()},getScope:()=>{var e;return null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector('[data-a11y="identity-flow"]')}}),dn(this,{isOpen:()=>null!==this._renameSuccess,onEscape:()=>this._closeRenameSuccessModal(),getScope:()=>{var e;return null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector('[data-a11y="rename-success"]')}})}connectedCallback(){super.connectedCallback(),this._loadDeviceConfig()}disconnectedCallback(){super.disconnectedCallback(),null!==this._statusMessageTimeout&&(clearTimeout(this._statusMessageTimeout),this._statusMessageTimeout=null)}updated(e){e.has("config")&&this._loadDeviceConfig(),"location"===this._settingsTopic&&"map"===this._locationMode&&(e.has("_settingsTopic")||e.has("_locationMode")||e.has("_deviceConfig"))&&this._initLocationPickerMap()}async _loadDeviceConfig(){if(this.hass){this._loading=!0,this._error=null;try{var e,t,i,a,o;if(this._deviceConfig=await Dr(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),await this._readRepeaterStatus(!1,!1),this._deviceConfig&&null!==(t=this._repeaterStatus)&&void 0!==t&&t.radio){var s,r,n,l,d,c,p;const e=this._repeaterStatus.radio;this._deviceConfig={...this._deviceConfig,frequency:null!==(s=e.frequency)&&void 0!==s?s:this._deviceConfig.frequency,bandwidth:null!==(r=e.bandwidth)&&void 0!==r?r:this._deviceConfig.bandwidth,spreading_factor:null!==(n=e.spreading_factor)&&void 0!==n?n:this._deviceConfig.spreading_factor,coding_rate:null!==(l=e.coding_rate)&&void 0!==l?l:this._deviceConfig.coding_rate,tx_power:null!==(d=e.tx_power)&&void 0!==d?d:this._deviceConfig.tx_power,path_hash_mode:null!==(c=null===(p=this._repeaterStatus.device_info)||void 0===p?void 0:p.path_hash_mode)&&void 0!==c?c:this._deviceConfig.path_hash_mode}}try{var h;this._localRegions=await Br(this.hass,null===(h=this.config)||void 0===h?void 0:h.entry_id)}catch(e){this._localRegions=null}try{var u;this._firmwareOtaStatus=await Hr(this.hass,null===(u=this.config)||void 0===u?void 0:u.entry_id)}catch(e){this._firmwareOtaStatus=null}this._managedDevices=await async function(e,t){try{const i={type:"hivefw_integration/get_managed_devices"};t&&(i.entry_id=t);const a=await e.callWS(i);return{repeaters:a.repeaters||[],clients:a.clients||[]}}catch(e){return{repeaters:[],clients:[]}}}(this.hass,null===(i=this.config)||void 0===i?void 0:i.entry_id);const g=await Or(this.hass,null===(a=this.config)||void 0===a?void 0:a.entry_id);this._scopeDraft=g.scopes.join(", "),this._scopeGlobal=g.global,!this._regionTarget&&this._managedDevices.repeaters.length&&(this._regionTarget=this._managedDevices.repeaters[0].pubkey_prefix),null!==(o=this._deviceConfig)&&void 0!==o&&o.location_source&&(this._locationSource=this._deviceConfig.location_source,this._locationMode="none"===this._locationSource?"none":"ha_location"===this._locationSource?"ha_location":"manual")}catch(e){this._error=`Failed to load device configuration: ${String(e)}`}finally{this._loading=!1}}}render(){var e,t,i,a;return this._loading?er(Yi||(Yi=ds`
        <div class="settings-page">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: var(--secondary-text-color);">
            <div style="display: flex; align-items: center; gap: 8px;">
              <div class="loading-spinner"></div>
              <span>Loading settings...</span>
            </div>
          </div>
        </div>
      `)):this._error?er(Ji||(Ji=ds`
        <div class="settings-page">
          <div style="padding: 16px; color: var(--error-color); font-size: 14px;">
            ${0}
          </div>
        </div>
      `),this._error):this._deviceConfig?er(ea||(ea=ds`
      <div class="settings-page">
        <div class="settings-container" data-hive-native-layout="device-v2">
          <div class="settings-shortcuts">
            ${0}
          </div>
        </div>
      </div>

      ${0}

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

    `),[["firmware","Gestão Firmware","Releases, OTA, flash manual e downloads","mdi:update"],["users","Utilizadores","Acesso remoto, passwords e ACL","mdi:account-group-outline"],["radio","Configuração Rádio","Frequência, BW, SF, CR, potência e RX","mdi:radio-tower"],["repeater","Configuração Repetidor","Modo, adverts, Timekeeper, routing e retransmissão","mdi:access-point-network"],["wifi","Wi-Fi","Configuração de rede do Companion","mdi:wifi-cog"],["location","Localização","GPS, manual ou Home Assistant","mdi:map-marker-outline"],["regions","Regiões & Scopes","RegionMap e flood scopes","mdi:map-outline"],["identity","Identidade","Nome, identidade e chaves do dispositivo","mdi:card-account-details-outline"],["backup","Backup & Restore","Cópias Companion e Repeater","mdi:backup-restore"],["diagnostics","Diagnóstico","Consola, RX Log, alertas e automações","mdi:stethoscope"]].map(([e,t,i,a])=>er(ta||(ta=ds`
              <button class="settings-shortcut" @click=${0}>
                <span class="settings-shortcut-icon" aria-hidden="true"><ha-icon .icon=${0}></ha-icon></span>
                <span class="settings-shortcut-copy">
                  <span class="settings-shortcut-title">${0}</span>
                  <span class="settings-shortcut-desc">${0}</span>
                </span>
              </button>`),()=>{this._settingsTopic=e},a,t,i)),this._settingsTopic?er(ia||(ia=ds`
        <div class="settings-topic-overlay" @click=${0}>
          <div class="settings-topic-dialog topic-${0}" role="dialog" aria-modal="true">
            <div class="settings-topic-header">
              <strong>${0}</strong>
              <button class="settings-topic-close" aria-label="Fechar" @click=${0}>×</button>
            </div>
            <div class="settings-topic-body">
              ${0}
              ${0}
              <div class="settings-grid">
                <div class="settings-column">
                  <div class="device-section settings-card-identity"><div class="card-title">Identidade</div>${0}</div>
                  ${0}
                  <div id="hive-console-settings-card" class="device-section" data-hive-native-host="console"><div class="card-title">Consola</div><div class="hive-console-settings-host"></div></div>
                </div>
                <div class="settings-column">
                  <div id="hive-rxlog-card" class="device-section" data-hive-native-host="rx-log"><div class="card-title">RX Log</div></div>
                  <div id="hive-observability-settings-card" class="device-section" data-hive-native-host="observability"><div class="card-title">Alertas &amp; automações</div></div>
                  <div class="device-section settings-card-location"><div class="card-title">Location</div>${0}</div>
                </div>
              </div>
            </div>
          </div>
        </div>`),e=>{e.target===e.currentTarget&&(this._settingsTopic=null)},this._settingsTopic,{firmware:"Gestão Firmware",users:"Utilizadores",radio:"Configuração Rádio",repeater:"Configuração Repetidor",wifi:"Wi-Fi",location:"Localização",regions:"Regiões & Scopes",identity:"Identidade",backup:"Backup & Restore",diagnostics:"Diagnóstico"}[this._settingsTopic],()=>{this._settingsTopic=null},this.selectedDevice?er(aa||(aa=ds`
                <div id="hive-repeater-settings-card" class="device-section" data-hive-native="repeater">
                  <div class="repeater-card-header" style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px;">
                    <div class="card-title" style="margin:0;">Repeater Setup</div>
                    <button class="action-btn" style="white-space:nowrap;" ?disabled=${0} @click=${0}>
                      ${0}
                    </button>
                  </div>
                  ${0}
                  <div class="settings-regions-block">
                    <div style="height:1px;background:var(--divider-color);margin:16px 0;"></div>
                    <div style="font-size:13px;font-weight:600;margin-bottom:10px;">Regions &amp; Scopes</div>
                    ${0}
                  </div>
                </div>`),this._repeaterReadBusy||this._saving,()=>this._readRepeaterStatus(!0,!0),this._repeaterReadBusy?"A ler…":"↻ Ler configuração",this._renderRepeaterSettings(),this._renderRegionsScopes()):ar,this.selectedDevice?this._renderFirmwareOta():ar,this._renderIdentityManagement(),this.selectedDevice?this._renderBackupRestore():ar,this._renderLocation()):ar,this._renderIdentityFlowModal(),this._renderRenameSuccessModal(),this._statusMessage?er(oa||(oa=ds`
        <div class="status-toast ${0}">
          ${0}
        </div>
      `),this._statusMessage.type,this._statusMessage.text):ar,this._confirmDialogOpen,(null===(e=this._confirmAction)||void 0===e?void 0:e.title)||"",(null===(t=this._confirmAction)||void 0===t?void 0:t.message)||"",null===(i=this._confirmAction)||void 0===i?void 0:i.requireTyped,!(null===(a=this._confirmAction)||void 0===a||!a.requireTyped),this._onConfirmAction,this._onConfirmCancel):er(Zi||(Zi=ds`<div>No device config loaded</div>`))}_renderFirmwareOta(){var e;const t=this._firmwareOtaStatus,i=(null==t?void 0:t.installed_version)||(null===(e=this.selectedDevice)||void 0===e?void 0:e.firmware)||"—",a=(null==t?void 0:t.latest_version)||"—",o=Boolean((null==t?void 0:t.supported)&&(null==t?void 0:t.secure_ota)&&!(null!=t&&t.bootstrap_required));return er(sa||(sa=ds`
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

        ${0}

        <div class="firmware-actions-grid">
          <div class="firmware-action-card firmware-release-card">
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

          <div class="firmware-action-card firmware-flash-manual-card">
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

        <div class="firmware-action-card firmware-download-card">
          <div class="firmware-action-title">Download da última Release</div>
          <div class="firmware-action-text">
            Escolhe o rádio e descarrega diretamente o firmware correspondente à versão mais recente publicada.
          </div>

          <select
            class="form-select"
            .value=${0}
            @change=${0}>
            <option value="v3-wifi">Heltec V3 · Wi-Fi</option>
            <option value="v3-ble">Heltec V3 · BLE</option>
            <option value="t114-ble">Heltec T114 · BLE</option>
          </select>

          ${0}
        </div>
        </div>
        </div>

      </div>
    `),i,null!=t&&t.release_available?er(ra||(ra=ds`<span>Última Release: ${0}</span>`),a):er(na||(na=ds`<span>Release: por verificar</span>`)),null!=t&&t.host?er(la||(la=ds`<span class="firmware-host">${0}</span>`),t.host):ar,t?t.supported?t.bootstrap_required?er(pa||(pa=ds`
                  <div class="firmware-notice warning">
                    Este firmware ainda requer o bootstrap OTA seguro.
                  </div>
                `)):er(ha||(ha=ds`
                  <div class="firmware-security">
                    <span class="firmware-status-dot"></span>
                    OTA seguro ativo · credencial efémera gerida apenas pelo backend
                  </div>
                `)):er(ca||(ca=ds`
                <div class="firmware-notice warning">
                  O gestor OTA requer ligação TCP/Wi-Fi ao HiveFW.
                </div>
              `)):er(da||(da=ds`
              <div class="firmware-notice">
                O estado OTA ainda não foi carregado. Usa “Verificar Releases”.
              </div>
            `)),this._firmwareUploadStage?er(ua||(ua=ds`
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
            `),"uploading"===this._firmwareUploadStage?"A enviar firmware":"rebooting"===this._firmwareUploadStage?"Firmware aceite · a reiniciar":"A aguardar reconexão","uploading"===this._firmwareUploadStage?"O Home Assistant está a enviar e validar a imagem OTA.":"rebooting"===this._firmwareUploadStage?"O rádio recebeu a imagem e está a arrancar novamente.":"A ligação TCP/Wi-Fi será retomada automaticamente."):ar,this._firmwareBusy||this._firmwareChecking,this._checkFirmwareUpdates,this._firmwareChecking?"A verificar Releases…":"Verificar Releases",null!=t&&t.release_available?er(ga||(ga=ds`
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
                `),a,t.release_url?er(va||(va=ds`
                          <a
                            class="firmware-release-link"
                            href=${0}
                            target="_blank"
                            rel="noopener">
                            Ver Release
                          </a>
                        `),t.release_url):ar,this._firmwareBusy||!o,this._installLatestFirmware,this._firmwareBusy?"A processar firmware…":`Flash da última Release (${a})`):er(ma||(ma=ds`
                  <div class="firmware-empty">
                    Ainda não foi encontrada uma Release OTA pública.
                  </div>
                `)),this._firmwareFile?this._firmwareFile.name:"Selecionar ficheiro .bin",this._firmwareBusy,e=>{var t;const i=e.target;this._firmwareFile=(null===(t=i.files)||void 0===t?void 0:t[0])||null},this._firmwareBusy||!this._firmwareFile||!o,this._uploadFirmwareFile,this._firmwareBusy?"A processar firmware…":"Flash do ficheiro selecionado",this._firmwareDownloadTarget,e=>{this._firmwareDownloadTarget=e.target.value},(e=>{const i=null==t||null===(e=t.downloads)||void 0===e?void 0:e.find(e=>e.target===this._firmwareDownloadTarget);return i?er(_a||(_a=ds`
              <div class="firmware-release-row">
                <div style="min-width:0;">
                  <div class="firmware-release-label">Ficheiro</div>
                  <div class="firmware-release-version"
                       style="font-size:11px;overflow-wrap:anywhere;">${0}</div>
                </div>
              </div>
              <a
                class="apply-button firmware-primary-action firmware-download-action"
                style="text-decoration:none;"
                href=${0}
                target="_blank"
                rel="noopener"
                download>
                Download ${0}
              </a>
            `),i.name,i.url,a):er(fa||(fa=ds`
                <div class="firmware-empty">
                  ${0}
                </div>
              `),null!=t&&t.release_available?"Asset ainda não disponível nesta Release.":"Verifica primeiro a última Release.")})())}async _checkFirmwareUpdates(){if(this.hass){this._firmwareChecking=!0;try{var e;const t=await Hr(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id,!0);this._firmwareOtaStatus=t,t.release_available?this._showStatusMessage(`Última Release encontrada: ${t.latest_version||"desconhecida"}.`,"success"):this._showStatusMessage("Ainda não existe uma Release OTA pública.","success")}catch(e){this._showStatusMessage(`Verificação de firmware: ${e instanceof Error?e.message:String(e)}`,"error")}finally{this._firmwareChecking=!1}}}async _refreshFirmwareOtaStatus(){if(this.hass)try{var e;this._firmwareOtaStatus=await Hr(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id)}catch(e){}}async _uploadFirmwareFile(){var e;if(!this.hass||!this._firmwareFile||null===(e=this.config)||void 0===e||!e.entry_id)return;if(!this.hass.fetchWithAuth)return void this._showStatusMessage("Esta versão do Home Assistant não disponibiliza upload autenticado para o painel.","error");const t=this._firmwareFile;if(t.name.toLowerCase().endsWith(".bin")&&!t.name.toLowerCase().includes("merged")){this._firmwareBusy=!0,this._firmwareUploadStage="uploading";try{const e=new FormData;e.append("entry_id",this.config.entry_id),e.append("firmware",t,t.name);const i=await this.hass.fetchWithAuth("/api/hivefw_integration/firmware",{method:"POST",body:e});let a={};try{a=await i.json()}catch(e){a={}}if(!i.ok||!a.success)throw new Error(a.error||`HTTP ${i.status}`);this._firmwareUploadStage="rebooting",this._firmwareFile=null,this._showStatusMessage("Firmware enviado. O HiveFW está a reiniciar.","success"),window.setTimeout(()=>{this._firmwareUploadStage="reconnecting",this._refreshFirmwareOtaStatus().finally(()=>{window.setTimeout(()=>{this._firmwareUploadStage=null,this._firmwareBusy=!1},2500)})},5e3)}catch(e){this._firmwareUploadStage=null,this._firmwareBusy=!1,this._showStatusMessage(`Firmware OTA: ${e instanceof Error?e.message:String(e)}`,"error")}}else this._showStatusMessage("Seleciona o firmware .bin OTA, não o ficheiro merged.","error")}async _installLatestFirmware(){if(this.hass){this._firmwareBusy=!0,this._firmwareUploadStage="uploading";try{var e;const t=await async function(e,t){const i={type:"hivefw_integration/install_latest_firmware"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id);if(!t.success)throw new Error("A atualização não foi aceite.");this._firmwareUploadStage="rebooting",this._showStatusMessage(`Firmware ${t.version||""} enviado. O HiveFW está a reiniciar.`,"success"),window.setTimeout(()=>{this._firmwareUploadStage="reconnecting",this._refreshFirmwareOtaStatus().finally(()=>{this._firmwareUploadStage=null})},5e3)}catch(e){const t=e;this._showStatusMessage(`Firmware OTA: ${(null==t?void 0:t.message)||String(e)}`,"error")}finally{"uploading"===this._firmwareUploadStage&&(this._firmwareUploadStage=null),this._firmwareBusy=!1}}}_backupFileName(e,t){const i=String(t||"HiveFW").normalize("NFKD").replace(/[^\w.-]+/g,"_").replace(/^_+|_+$/g,"").slice(0,48)||"HiveFW",a=new Date,o=e=>String(e).padStart(2,"0");return`${e}_${i}_${String(a.getFullYear())+o(a.getMonth()+1)+o(a.getDate())+"_"+o(a.getHours())+o(a.getMinutes())+o(a.getSeconds())}.json`}_downloadJson(e,t){const i=new Blob([JSON.stringify(e,null,2)+"\n"],{type:"application/json;charset=utf-8"}),a=URL.createObjectURL(i),o=document.createElement("a");o.href=a,o.download=t,document.body.appendChild(o),o.click(),o.remove(),window.setTimeout(()=>URL.revokeObjectURL(a),1e3)}async _exportCompanionBackup(){if(this.hass&&!this._backupBusy){this._backupBusy="companion-export";try{var e;const t=await async function(e,t){const i={type:"hivefw_integration/export_backup"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),i=t.backup;if(!i)throw new Error("O rádio não devolveu um backup Companion válido.");this._downloadJson(i,this._backupFileName("meshcore_backup",i.name)),this._showStatusMessage(`Backup Companion criado: ${Number(t.channel_count||0)} canais, ${Number(t.contact_count||0)} contactos.`,"success")}catch(e){this._showStatusMessage("Backup Companion: "+String(e),"error")}finally{this._backupBusy=null}}}async _exportRepeaterBackup(){if(this.hass&&!this._backupBusy){this._backupBusy="repeater-export";try{var e;const t=await async function(e,t){const i={type:"hivefw_integration/export_repeater_backup"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),i=t.backup;if(!i||"hivefw_repeater_backup"!==i.format)throw new Error("O rádio não devolveu um backup Repeater válido.");this._downloadJson(i,this._backupFileName("hivefw_repeater_backup",i.device_name)),this._showStatusMessage(`Backup Repeater criado: ${Number(t.region_count||0)} regiões, ${Number(t.acl_count||0)} ACL.`,"success")}catch(e){this._showStatusMessage("Backup Repeater: "+String(e),"error")}finally{this._backupBusy=null}}}async _restoreBackupFile(e,t){if(this.hass&&!this._backupBusy)try{const o=JSON.parse(await t.text());if("companion"===e){var i;const e=["name","public_key","private_key","radio_settings","position_settings","other_settings","auto_add_settings","channels","contacts"].filter(e=>!(e in o));if(e.length)throw new Error("Ficheiro Companion inválido. Falta: "+e.join(", "));const t=Array.isArray(o.channels)?o.channels.length:0,a=Array.isArray(o.contacts)?o.contacts.length:0;if(!window.confirm(`Restaurar o backup Companion vai substituir identidade, rádio, posição, canais e contactos.\n\nCanais: ${t}\nContactos: ${a}\n\nPretendes continuar?`))return;this._backupBusy="companion-restore";const s=await async function(e,t,i){const a={type:"hivefw_integration/restore_backup",backup:t};return i&&(a.entry_id=i),e.callWS(a)}(this.hass,o,null===(i=this.config)||void 0===i?void 0:i.entry_id);if(!s.success)throw new Error("O restauro Companion não foi concluído.");await this._loadDeviceConfig(),this._showStatusMessage("Backup Companion restaurado.","success")}else{var a;if("hivefw_repeater_backup"!==o.format||"object"!=typeof o.repeater)throw new Error("Ficheiro HiveFW Repeater inválido.");const e=o.repeater,t=e.access||{},i=Array.isArray(t.acl)?t.acl.length:0,s=e.regions||{},r=Array.isArray(s.regions)?s.regions.length:0;if(!window.confirm(`Restaurar o backup Repeater vai substituir Owner Info, RX Gain, ADC, routing, RF avançado, RegionMap e ACL persistente.\n\nAs passwords Admin/Guest NÃO são exportadas nem alteradas.\n\nACL: ${i}\nRegiões: ${r}\n\nPretendes continuar?`))return;this._backupBusy="repeater-restore";const n=await async function(e,t,i){const a={type:"hivefw_integration/restore_repeater_backup",backup:t};return i&&(a.entry_id=i),e.callWS(a)}(this.hass,o,null===(a=this.config)||void 0===a?void 0:a.entry_id);if(!n.success)throw new Error("O restauro Repeater não foi concluído.");await this._readRepeaterStatus(!1,!0),await this._refreshLocalRegions(),this._showStatusMessage("Backup Repeater restaurado. As passwords Admin/Guest foram mantidas.","success")}}catch(t){this._showStatusMessage(`Restauro ${"companion"===e?"Companion":"Repeater"}: ${String(t)}`,"error")}finally{this._backupBusy=null}}_renderBackupRestore(){const e=null!==this._backupBusy;return er(ba||(ba=ds`
      <div class="device-section backup-restore-card" style="margin-bottom:16px;">
        <div class="card-title">Backup &amp; Restore</div>
        <div style="font-size:12px;line-height:1.45;color:var(--secondary-text-color);margin-bottom:12px;">
          Backups separados do Companion e do Repeater.
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
    `),e,this._exportCompanionBackup,"companion-export"===this._backupBusy?"A criar…":"Backup Companion",e,()=>{var e;return null===(e=this.shadowRoot)||void 0===e||null===(e=e.querySelector("#companion-backup-input"))||void 0===e?void 0:e.click()},"companion-restore"===this._backupBusy?"A restaurar…":"Restaurar Companion",e=>{var t;const i=e.target,a=null===(t=i.files)||void 0===t?void 0:t[0];i.value="",a&&this._restoreBackupFile("companion",a)},e,this._exportRepeaterBackup,"repeater-export"===this._backupBusy?"A criar…":"Backup Repeater",e,()=>{var e;return null===(e=this.shadowRoot)||void 0===e||null===(e=e.querySelector("#repeater-backup-input"))||void 0===e?void 0:e.click()},"repeater-restore"===this._backupBusy?"A restaurar…":"Restaurar Repeater",e=>{var t;const i=e.target,a=null===(t=i.files)||void 0===t?void 0:t[0];i.value="",a&&this._restoreBackupFile("repeater",a)})}_applyImmediateSetting(e,t,i){this.hass&&(this._settingsWriteQueue=this._settingsWriteQueue.then(async()=>{this._saving=!0;try{var a,o,s;const u=await Er(this.hass,{[e]:t},null===(a=this.config)||void 0===a?void 0:a.entry_id);if(!u.success)throw new Error(u.error||`Falha ao aplicar ${i}`);if(this._deviceConfig=await Dr(this.hass,null===(o=this.config)||void 0===o?void 0:o.entry_id),await this._readRepeaterStatus(!1,!0),this._deviceConfig&&null!==(s=this._repeaterStatus)&&void 0!==s&&s.radio){var r,n,l,d,c,p,h;const e=this._repeaterStatus.radio;this._deviceConfig={...this._deviceConfig,frequency:null!==(r=e.frequency)&&void 0!==r?r:this._deviceConfig.frequency,bandwidth:null!==(n=e.bandwidth)&&void 0!==n?n:this._deviceConfig.bandwidth,spreading_factor:null!==(l=e.spreading_factor)&&void 0!==l?l:this._deviceConfig.spreading_factor,coding_rate:null!==(d=e.coding_rate)&&void 0!==d?d:this._deviceConfig.coding_rate,tx_power:null!==(c=e.tx_power)&&void 0!==c?c:this._deviceConfig.tx_power,path_hash_mode:null!==(p=null===(h=this._repeaterStatus.device_info)||void 0===h?void 0:h.path_hash_mode)&&void 0!==p?p:this._deviceConfig.path_hash_mode}}delete this._editValues[e],this._editValues={...this._editValues},this.requestUpdate(),this._showStatusMessage(`${i} atualizado no Companion.`,"success")}catch(e){try{var u;this._deviceConfig=await Dr(this.hass,null===(u=this.config)||void 0===u?void 0:u.entry_id),await this._readRepeaterStatus(!1,!0)}catch(e){}this._showStatusMessage(`${i}: ${e instanceof Error?e.message:String(e)}`,"error")}finally{this._saving=!1}}))}_renderRadioSettings(){var e,t,i,a,o,s,r,n,l,d,c,p,h,u,g,v,m;if(!this._deviceConfig)return;const f=null===(e=this._repeaterStatus)||void 0===e?void 0:e.repeater_profile,_=null===(t=this._repeaterStatus)||void 0===t?void 0:t.radio,b=Number(null!==(i=null!==(a=null==_?void 0:_.tx_power)&&void 0!==a?a:this._deviceConfig.tx_power)&&void 0!==i?i:17),y=Number(null!==(o=null!==(s=null==_?void 0:_.frequency)&&void 0!==s?s:this._deviceConfig.frequency)&&void 0!==o?o:0),x=Number(null!==(r=null!==(n=null==_?void 0:_.bandwidth)&&void 0!==n?n:this._deviceConfig.bandwidth)&&void 0!==r?r:250),w=Number(null!==(l=null!==(d=null==_?void 0:_.spreading_factor)&&void 0!==d?d:this._deviceConfig.spreading_factor)&&void 0!==l?l:10),$=Number(null!==(c=null!==(p=null==_?void 0:_.coding_rate)&&void 0!==p?p:this._deviceConfig.coding_rate)&&void 0!==c?c:5),k=Number(null!==(h=null!==(u=null===(g=this._repeaterStatus)||void 0===g||null===(g=g.device_info)||void 0===g?void 0:g.path_hash_mode)&&void 0!==u?u:this._deviceConfig.path_hash_mode)&&void 0!==h?h:0),S=Boolean(null!==(v=null==f?void 0:f.rx_boosted_gain)&&void 0!==v&&v),C=Number(null!==(m=null==f?void 0:f.adc_multiplier)&&void 0!==m?m:0);return er(ya||(ya=ds`
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
    `),String(b),this._saving,e=>{this._applyImmediateSetting("tx_power",Number(e.target.value),"TX Power")},String(y),this._saving,e=>{this._applyImmediateSetting("frequency",Number(e.target.value),"Frequência")},String(x),this._saving,e=>{this._applyImmediateSetting("bandwidth",Number(e.target.value),"Bandwidth")},[7.8,10.4,15.6,20.8,31.25,41.7,62.5,125,250,500].map(e=>er(xa||(xa=ds`<option value=${0}>${0}</option>`),String(e),e)),String(w),this._saving,e=>{this._applyImmediateSetting("spreading_factor",Number(e.target.value),"Spreading Factor")},[7,8,9,10,11,12].map(e=>er(wa||(wa=ds`<option value=${0}>${0}</option>`),String(e),e)),String($),this._saving,e=>{this._applyImmediateSetting("coding_rate",Number(e.target.value),"Coding Rate")},[5,6,7,8].map(e=>er($a||($a=ds`<option value=${0}>${0}</option>`),String(e),e)),String(k),this._saving,e=>{this._applyImmediateSetting("path_hash_mode",Number(e.target.value),"Path Hash Mode")},S?"1":"0",!(null!=f&&f.supported)||this._saving,e=>{this._applyImmediateSetting("rx_boosted_gain","1"===e.target.value,"RX Boosted Gain")},String(C),!(null!=f&&f.supported)||this._saving,e=>{this._applyImmediateSetting("adc_multiplier",Number(e.target.value),"ADC multiplier")})}_applyImmediateCoordinates(e,t){this.hass&&(this._settingsWriteQueue=this._settingsWriteQueue.then(async()=>{this._saving=!0;try{var i,a;const o=await Er(this.hass,{latitude:e,longitude:t},null===(i=this.config)||void 0===i?void 0:i.entry_id);if(!o.success)throw new Error(o.error||"Falha ao atualizar coordenadas");this._deviceConfig=await Dr(this.hass,null===(a=this.config)||void 0===a?void 0:a.entry_id),this.requestUpdate(),this._showStatusMessage("Localização atualizada no Companion.","success")}catch(e){this._showStatusMessage("Localização: "+String(e),"error")}finally{this._saving=!1}}))}_applyImmediateLocationSource(e){this.hass&&(this._settingsWriteQueue=this._settingsWriteQueue.then(async()=>{this._saving=!0;try{var t,i;if(!(await Vr(this.hass,e,null===(t=this.config)||void 0===t?void 0:t.entry_id)).success)throw new Error("Falha ao atualizar Location Source");if("ha_location"===e){var a;const e=null===(a=this.hass)||void 0===a?void 0:a.states["zone.home"];if(e){var o,s,r;const t=await Er(this.hass,{latitude:Number(null!==(o=e.attributes.latitude)&&void 0!==o?o:0),longitude:Number(null!==(s=e.attributes.longitude)&&void 0!==s?s:0)},null===(r=this.config)||void 0===r?void 0:r.entry_id);if(!t.success)throw new Error(t.error||"Falha ao enviar coordenadas do Home Assistant")}}this._deviceConfig=await Dr(this.hass,null===(i=this.config)||void 0===i?void 0:i.entry_id),this._locationSource=e,this.requestUpdate(),this._showStatusMessage("Location Source atualizado.","success")}catch(e){this._showStatusMessage("Location Source: "+String(e),"error")}finally{this._saving=!1}}))}_renderLocation(){var e,t,i,a,o;if(!this._deviceConfig)return;const s=null===(e=this.hass)||void 0===e?void 0:e.states["zone.home"],r=Number(null!==(t=this._deviceConfig.latitude)&&void 0!==t?t:0),n=Number(null!==(i=this._deviceConfig.longitude)&&void 0!==i?i:0),l=e=>{this._locationMode=e,"none"===e?(this._locationSource="none",this._applyImmediateLocationSource("none")):"ha_location"===e?(this._locationSource="ha_location",this._applyImmediateLocationSource("ha_location")):(this._locationSource="manual",this._applyImmediateLocationSource("manual"))};return er(ka||(ka=ds`
      <div class="location-mode-grid">
        ${0}
      </div>

      <div class="location-current">
        <span><strong>Latitude:</strong> ${0}</span>
        <span><strong>Longitude:</strong> ${0}</span>
        <span><strong>Partilha:</strong> ${0}</span>
      </div>

      ${0}

      ${0}

      ${0}

      ${0}
    `),[["none","Não partilhar","O Companion não anuncia coordenadas."],["ha_location","Home Assistant","Usa as coordenadas de zone.home."],["manual","Coordenadas","Introduz latitude e longitude diretamente."],["map","Escolher no mapa","Clica num ponto do mapa para definir as coordenadas."]].map(([e,t,i])=>er(Sa||(Sa=ds`
          <button class="location-mode-button ${0}"
            @click=${0}>
            <strong>${0}</strong><span>${0}</span>
          </button>`),this._locationMode===e?"active":"",()=>l(e),t,i)),r.toFixed(6),n.toFixed(6),"none"===this._locationSource?"desativada":"ha_location"===this._locationMode?"Home Assistant":"map"===this._locationMode?"mapa":"coordenadas","none"===this._locationMode?er(Ca||(Ca=ds`
        <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.5;">
          A localização deixa de ser anunciada. As últimas coordenadas podem permanecer guardadas no rádio, mas não são usadas como fonte de localização.
        </div>
      `)):ar,"ha_location"===this._locationMode?er(Ma||(Ma=ds`
        <div style="padding:12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color);">
          <div style="font-size:12px;font-weight:600;margin-bottom:5px;">Home Assistant · zone.home</div>
          <div style="font-size:11px;color:var(--secondary-text-color);">
            ${0}
          </div>
        </div>
      `),s?`${Number(null!==(a=s.attributes.latitude)&&void 0!==a?a:0).toFixed(6)}, ${Number(null!==(o=s.attributes.longitude)&&void 0!==o?o:0).toFixed(6)}`:"zone.home não tem coordenadas disponíveis."):ar,"manual"===this._locationMode?er(Ra||(Ra=ds`
        <div class="section-row">
          <div class="form-group-inline">
            <label class="form-label">Latitude</label>
            <input type="number" class="form-input" step="0.000001" min="-90" max="90"
              .value=${0}
              @change=${0}/>
          </div>
          <div class="form-group-inline">
            <label class="form-label">Longitude</label>
            <input type="number" class="form-input" step="0.000001" min="-180" max="180"
              .value=${0}
              @change=${0}/>
          </div>
        </div>
      `),String(r),e=>{var t,i;this._applyImmediateCoordinates(Number(e.target.value),Number(null!==(t=null===(i=this._deviceConfig)||void 0===i?void 0:i.longitude)&&void 0!==t?t:0))},String(n),e=>{var t,i;this._applyImmediateCoordinates(Number(null!==(t=null===(i=this._deviceConfig)||void 0===i?void 0:i.latitude)&&void 0!==t?t:0),Number(e.target.value))}):ar,"map"===this._locationMode?er(Aa||(Aa=ds`
        <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
          Clica no mapa para mover a localização do Companion. A alteração é aplicada imediatamente.
        </div>
        <div id="location-picker-map" class="location-picker-map"></div>
      `)):ar)}async _initLocationPickerMap(){if("map"!==this._locationMode||!this.hass||!this._deviceConfig)return;const e=this.renderRoot.querySelector("#location-picker-map");if(e&&"1"!==e.dataset.ready)try{var t,i,a,o,s,r,n,l;if(!customElements.get("ha-map")){const e=window.loadCardHelpers;if(e){var d;const t=await e();null==t||null===(d=t.createCardElement)||void 0===d||d.call(t,{type:"map",entities:[]})}await Promise.race([customElements.whenDefined("ha-map"),new Promise(e=>window.setTimeout(e,1500))])}if(!customElements.get("ha-map")||!e.isConnected)return;const c=document.createElement("ha-map");c.hass=this.hass,c.autoFit=!1,c.clusterMarkers=!1,c.scaleRuler=!0,c.themeMode="light",e.replaceChildren(c),e.dataset.ready="1",await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(e)));const p=Number(null!==(t=null===(i=this._deviceConfig)||void 0===i?void 0:i.latitude)&&void 0!==t?t:0),h=Number(null!==(a=null===(o=this._deviceConfig)||void 0===o?void 0:o.longitude)&&void 0!==a?a:0),u=Number.isFinite(p)&&Number.isFinite(h)&&(0!==p||0!==h)?[p,h]:[Number(null!==(s=null===(r=this.hass)||void 0===r||null===(r=r.states["zone.home"])||void 0===r?void 0:r.attributes.latitude)&&void 0!==s?s:0),Number(null!==(n=null===(l=this.hass)||void 0===l||null===(l=l.states["zone.home"])||void 0===l?void 0:l.attributes.longitude)&&void 0!==n?n:0)],g=()=>{var e,t;const i=c.leafletMap;if(!i)return!1;Number.isFinite(u[0])&&Number.isFinite(u[1])&&i.setView(u,13,{animate:!1});let a=null;return null!==(e=c.Leaflet)&&void 0!==e&&e.marker&&Number.isFinite(u[0])&&Number.isFinite(u[1])&&(a=c.Leaflet.marker(u).addTo(i)),i.on("click",e=>{var t,o,s,r;const n=Number(null==e||null===(t=e.latlng)||void 0===t?void 0:t.lat),l=Number(null==e||null===(o=e.latlng)||void 0===o?void 0:o.lng);Number.isFinite(n)&&Number.isFinite(l)&&(null!==(s=a)&&void 0!==s&&s.setLatLng?a.setLatLng([n,l]):null!==(r=c.Leaflet)&&void 0!==r&&r.marker&&(a=c.Leaflet.marker([n,l]).addTo(i)),this._applyImmediateCoordinates(n,l))}),null===(t=i.invalidateSize)||void 0===t||t.call(i,!1),!0};g()||window.setTimeout(()=>g(),500)}catch(t){e.textContent="Não foi possível carregar o mapa do Home Assistant: "+String(t)}}_renderRegionsScopes(){const e=this._localRegions,t="clear_default"!==this._localRegionAction,i="put"===this._localRegionAction;return er(Ta||(Ta=ds`
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

    `),this._localRegionBusy,this._refreshLocalRegions,this._localRegionBusy?"A ler…":"Atualizar",null!=e&&e.supported?er(za||(za=ds`
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
        `),e.count,e.home||"*",e.default||"<null>",e.regions.map(e=>er(Ia||(Ia=ds`
                  <tr style="border-top:1px solid var(--divider-color);">
                    <td style="padding:7px 8px;font-family:monospace;">${0}</td>
                    <td style="padding:7px 8px;font-family:monospace;color:var(--secondary-text-color);">${0}</td>
                    <td style="padding:7px 8px;">${0}</td>
                    <td style="padding:7px 8px;color:var(--secondary-text-color);">${0}${0}</td>
                  </tr>
                `),e.name,e.parent||"—",e.allow_flood?"Permitido":"Bloqueado",e.home?"HOME ":"",e.default?"DEFAULT":"")),this._localRegionAction,e=>{this._localRegionAction=e.target.value},this._localRegionName,!t,e=>{this._localRegionName=e.target.value},this._localRegionParent,!i,e=>{this._localRegionParent=e.target.value},this._localRegionBusy||t&&!this._localRegionName.trim(),this._applyLocalRegion,this._localRegionBusy?"A aplicar…":"Aplicar operação",this._localRegionBusy,this._saveLocalRegions):er(Na||(Na=ds`
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
            ${0}
          </div>
        `),(null==e?void 0:e.error)||"Este firmware ainda não expõe a RegionMap local pelo Companion Protocol."),this._scopeDraft,e=>{this._scopeDraft=e.target.value},this._scopeGlobal,e=>{this._scopeGlobal=e.target.checked},this._scopeSaving,this._saveFloodScopes,this._scopeSaving?"A guardar…":"Guardar Scopes HA")}async _refreshLocalRegions(){if(this.hass){this._localRegionBusy=!0;try{var e;this._localRegions=await Br(this.hass,null===(e=this.config)||void 0===e?void 0:e.entry_id),this._localRegions.supported||this._showStatusMessage(this._localRegions.error||"RegionMap local indisponível","error")}catch(e){this._showStatusMessage("RegionMap local: "+String(e),"error")}finally{this._localRegionBusy=!1}}}async _applyLocalRegion(){var e;if(!this.hass||null===(e=this._localRegions)||void 0===e||!e.supported)return;const t=this._localRegionAction,i="clear_default"===t?"":this._localRegionName.trim(),a="put"===t?this._localRegionParent.trim():"";if("clear_default"===t||i){this._localRegionBusy=!0;try{var o;const e=await Lr(this.hass,t,i,a,null===(o=this.config)||void 0===o?void 0:o.entry_id);this._localRegions=e,"put"!==t&&"remove"!==t||(this._localRegionName="",this._localRegionParent=""),this._showStatusMessage("RegionMap atualizada em "+("default"===t||"clear_default"===t?"flash":"RAM"),"success")}catch(e){const t=e;this._showStatusMessage("RegionMap: "+((null==t?void 0:t.message)||String(e)),"error")}finally{this._localRegionBusy=!1}}}async _saveLocalRegions(){var e;if(this.hass&&null!==(e=this._localRegions)&&void 0!==e&&e.supported){this._localRegionBusy=!0;try{var t;const e=await Lr(this.hass,"save","","",null===(t=this.config)||void 0===t?void 0:t.entry_id);this._localRegions=e,this._showStatusMessage("Regions guardadas no HiveFW","success")}catch(e){const t=e;this._showStatusMessage("Guardar Regions: "+((null==t?void 0:t.message)||String(e)),"error")}finally{this._localRegionBusy=!1}}}async _saveFloodScopes(){if(this.hass){this._scopeSaving=!0;try{var e;const t=this._scopeDraft.split(",").map(e=>e.trim()).filter(Boolean),i=await async function(e,t,i,a){const o={type:"hivefw_integration/set_flood_scopes",scopes:t,global:i};return a&&(o.entry_id=a),e.callWS(o)}(this.hass,t,this._scopeGlobal,null===(e=this.config)||void 0===e?void 0:e.entry_id);this._scopeDraft=i.scopes.join(", "),this._scopeGlobal=i.global,this._showStatusMessage("Scopes guardados","success")}catch(e){this._showStatusMessage(`Erro ao guardar scopes: ${String(e)}`,"error")}finally{this._scopeSaving=!1}}}async _readRemoteRegions(){if(this.hass&&this._regionTarget){this._regionBusy=!0;try{var e;this._regionText=await async function(e,t,i){const a={type:"hivefw_integration/get_remote_regions",target_prefix:t};return i&&(a.entry_id=i),(await e.callWS(a)).regions||""}(this.hass,this._regionTarget,null===(e=this.config)||void 0===e?void 0:e.entry_id)}catch(e){this._showStatusMessage(`Regions: ${String(e)}`,"error")}finally{this._regionBusy=!1}}}async _sendRemoteRegionCommand(e){if(this.hass&&this._regionTarget){this._regionBusy=!0;try{var t;const i=await async function(e,t,i,a){try{const o={type:"hivefw_integration/execute_remote",target_prefix:t,command:i};return a&&(o.entry_id=a),await e.callWS(o)}catch(e){const t=e;return{response:t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e),success:!1,timestamp:(new Date).toISOString()}}}(this.hass,this._regionTarget,e,null===(t=this.config)||void 0===t?void 0:t.entry_id);if(!i.success)return void this._showStatusMessage(i.response||"Region command failed","error");this._showStatusMessage(i.response||"Region command sent","success"),this._regionBusy=!1,await this._readRemoteRegions()}finally{this._regionBusy=!1}}}async _applyRemoteRegion(){let e=this._regionName.trim();"default"!==this._regionAction||e||(e="<null>"),e&&await this._sendRemoteRegionCommand(`region ${this._regionAction} ${e}`)}_requestManagedAdmin(e){this.dispatchEvent(new CustomEvent("hivefw-open-remote-admin",{detail:{device:e},bubbles:!0,composed:!0}))}_renderManagedDevices(){const e=this._managedDevices.repeaters||[],t=this._managedDevices.clients||[],i=[...e,...t];if(0===i.length)return er(Fa||(Fa=ds`
        <div style="font-size:12px;color:var(--secondary-text-color);line-height:1.5;">
          Nenhum equipamento remoto está configurado no meshcore-ha.
          O HiveFW local acima é o equipamento principal desta integração.
        </div>
      `));const a=i.filter(e=>e.connected||"online"===e.status).length;return er(Da||(Da=ds`
      <div class="managed-devices-summary">
        <span class="managed-devices-chip">${0} equipamentos</span>
        <span class="managed-devices-chip">${0} repeaters</span>
        <span class="managed-devices-chip">${0} clients</span>
        <span class="managed-devices-chip">${0} online</span>
      </div>

      <div class="managed-device-list">
        ${0}
      </div>
    `),i.length,e.length,t.length,a,i.map(e=>{var t;const i=e.connected||"online"===e.status,a="repeater"===e.type?"Repeater":"Client";return er(Ea||(Ea=ds`
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
          `),"repeater"===e.type?"R":"C",e.name,a,(null===(t=e.pubkey_prefix)||void 0===t?void 0:t.toUpperCase())||"sem chave",e.firmware_version?er(Oa||(Oa=ds` · FW ${0}`),e.firmware_version):ar,e.neighbors_enabled?er(Pa||(Pa=ds` · vizinhos monitorizados`)):ar,i?"online":"offline",i?"Online":"Offline","repeater"===e.type?er(Ba||(Ba=ds`<button class="action-btn" @click=${0}>Admin</button>`),()=>this._requestManagedAdmin(e)):ar)}))}async _applyRepeaterQuickSetting(e,t){var i;if(this.hass&&null!==(i=this._repeaterStatus)&&void 0!==i&&i.supported&&!this._repeaterQuickBusy){"repeat"===e?Boolean(this._repeaterStatus.repeat):"auto_advert"===e?Boolean(this._repeaterStatus.auto_advert):Boolean(this._repeaterStatus.mesh_time_sync),this._repeaterQuickBusy=e;try{var a;const i=await Er(this.hass,{[e]:t},null===(a=this.config)||void 0===a?void 0:a.entry_id);if(!i.success)throw new Error(i.error||"Não foi possível aplicar a alteração.");await this._readRepeaterStatus(!1,!0);const o="repeat"===e?"Modo Repetidor":"auto_advert"===e?"Auto Advert":"Sincronização RTC via Mesh";this._showStatusMessage(`${o}: ${t?"ativado":"desativado"}.`,"success")}catch(e){await this._readRepeaterStatus(!1,!0),this._showStatusMessage("Configuração imediata do Repeater: "+String(e),"error")}finally{this._repeaterQuickBusy=null}}}_renderRepeaterSettings(){var e,t,i,a,o,s,r,n,l,d,c,p,h,u,g,v,m,f,_,b,y,x,w,$,k,S,C,M,R;const A=this._repeaterStatus;if(null==A||!A.supported)return er(La||(La=ds`
        <div style="font-size: 12px; color: var(--secondary-text-color); line-height: 1.5;">
          O Companion está disponível, mas esta versão não anuncia o modo Repeater integrado.
        </div>
      `));const T=Boolean(A.repeat),z=Boolean(A.auto_advert_supported),I=Boolean(A.auto_advert),N=Boolean(A.neighbor_advert_supported),F=Number(null!==(e=A.neighbor_advert_interval)&&void 0!==e?e:240),D=Boolean(A.mesh_time_sync_supported),E=Boolean(A.mesh_time_sync),O=Number(null!==(t=null!==(i=this._editValues.multi_acks)&&void 0!==i?i:A.radio.multi_acks)&&void 0!==t?t:0),P=Number(null!==(a=null!==(o=this._editValues.rx_delay)&&void 0!==o?o:A.tuning.rx_delay)&&void 0!==a?a:0),B=A.routing,L=A.radio_guard,H=A.repeater_profile,U=String(null!==(s=null!==(r=this._editValues.owner_info)&&void 0!==r?r:null==H?void 0:H.owner_info)&&void 0!==s?s:""),q=Number(null!==(n=null!==(l=this._editValues.flood_max)&&void 0!==l?l:null==B?void 0:B.flood_max)&&void 0!==n?n:64),j=Number(null!==(d=null!==(c=this._editValues.flood_max_unscoped)&&void 0!==c?c:null==B?void 0:B.flood_max_unscoped)&&void 0!==d?d:64),V=Number(null!==(p=null!==(h=this._editValues.flood_max_advert)&&void 0!==h?h:null==B?void 0:B.flood_max_advert)&&void 0!==p?p:8),W=Number(null!==(u=null!==(g=this._editValues.loop_detect)&&void 0!==g?g:null==B?void 0:B.loop_detect)&&void 0!==u?u:0),K=Boolean(null!==(v=null!==(m=this._editValues.cad_enabled)&&void 0!==m?m:null==L?void 0:L.cad_enabled)&&void 0!==v&&v),G=Number(null!==(f=null!==(_=this._editValues.interference_threshold)&&void 0!==_?_:null==L?void 0:L.interference_threshold)&&void 0!==f?f:0),X=Number(null!==(b=null!==(y=this._editValues.agc_reset_interval)&&void 0!==y?y:null==L?void 0:L.agc_reset_interval)&&void 0!==b?b:0),Q=Number(null!==(x=null!==(w=this._editValues.flood_tx_delay)&&void 0!==w?w:null==L?void 0:L.flood_tx_delay)&&void 0!==x?x:.5),Y=Number(null!==($=null!==(k=this._editValues.direct_tx_delay)&&void 0!==k?k:null==L?void 0:L.direct_tx_delay)&&void 0!==$?$:.3);return er(Ha||(Ha=ds`
      <div data-hive-repeater-quick>
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

        </div>



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

          <div data-hive-owner-info style="margin:0 0 14px;padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);">
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

      <div class="repeater-setup-grid">
        <div data-hive-routing style="padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);">
          <div style="font-size:13px;font-weight:600;margin-bottom:4px;">Routing &amp; Flood</div>
          <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;margin-bottom:10px;">
            Limites oficiais do Repeater para flood e deteção de loops.
          </div>

          ${0}
        </div>

        <div data-hive-rf style="padding:12px;border:1px solid var(--divider-color);border-radius:8px;background:var(--secondary-background-color);">
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
    `),A.repeat?"Ativo no HiveFW":"Desligado — Companion apenas",T,null!==this._repeaterQuickBusy,e=>{this._applyRepeaterQuickSetting("repeat",e.target.checked)},T?"Ativo":"Desligado",z?I?"Ativo — Smart Advert automático":"Desligado":"Requer firmware HiveFW com controlo remoto de AutoAdvert",I,!z||null!==this._repeaterQuickBusy,e=>{this._applyRepeaterQuickSetting("auto_advert",e.target.checked)},I?"Ativo":"Desligado",String(F),!N||this._saving,e=>{this._applyImmediateSetting("neighbor_advert_interval",Number(e.target.value),"Neighbour Advert")},E,!D||null!==this._repeaterQuickBusy,e=>{this._applyRepeaterQuickSetting("mesh_time_sync",e.target.checked)},D?E?"Ativo":"Desligado":"Não suportada",null!==(S=null===(C=A.server_auth)||void 0===C?void 0:C.acl_count)&&void 0!==S?S:"—",null!==(M=A.server_auth)&&void 0!==M&&M.supported?er(Ua||(Ua=ds`
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
          `),A.server_auth.admin_password_set?"var(--success-color, #2e7d32)":"var(--secondary-text-color)",A.server_auth.admin_password_set?"configurada":"não configurada",A.server_auth.admin_password_set?"••••••••":"Definir password",this._adminPasswordDraft,null!==this._repeaterAccessBusy,e=>{this._adminPasswordDraft=e.target.value},null!==this._repeaterAccessBusy||!this._adminPasswordDraft,()=>this._saveRepeaterPassword("admin"),"admin"===this._repeaterAccessBusy?"A guardar...":"Guardar",null!==this._repeaterAccessBusy||!A.server_auth.admin_password_set,()=>this._clearRepeaterPassword("admin"),A.server_auth.guest_password_set?"var(--success-color, #2e7d32)":"var(--secondary-text-color)",A.server_auth.guest_password_set?"configurada":"não configurada",A.server_auth.guest_password_set?"••••••••":"Definir password",this._guestPasswordDraft,null!==this._repeaterAccessBusy,e=>{this._guestPasswordDraft=e.target.value},null!==this._repeaterAccessBusy||!this._guestPasswordDraft,()=>this._saveRepeaterPassword("guest"),"guest"===this._repeaterAccessBusy?"A guardar...":"Guardar",null!==this._repeaterAccessBusy||!A.server_auth.guest_password_set,()=>this._clearRepeaterPassword("guest"),this._renderRepeaterAcl(A),null!==this._repeaterAccessBusy||!(null!==(R=A.server_auth.acl_count)&&void 0!==R&&R),this._confirmClearRepeaterAcl,"acl"===this._repeaterAccessBusy?"A limpar...":"Limpar ACL"):er(qa||(qa=ds`
            <div style="font-size:11px;color:var(--secondary-text-color);line-height:1.45;">
              Atualiza o firmware HiveFW para ativar passwords Admin/Guest e gestão da ACL local.
            </div>
          `)),this._renderRadioSettings(),U,!(null!=H&&H.supported),e=>{this._applyImmediateSetting("owner_info",e.target.value,"Owner Info")},null!=B&&B.supported?er(ja||(ja=ds`
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
          `),String(q),e=>{this._applyImmediateSetting("flood_max",Number(e.target.value),"Flood Max")},String(j),e=>{this._applyImmediateSetting("flood_max_unscoped",Number(e.target.value),"Flood Max Unscoped")},String(V),e=>{this._applyImmediateSetting("flood_max_advert",Number(e.target.value),"Flood Max Adverts")},String(W),e=>{this._applyImmediateSetting("loop_detect",Number(e.target.value),"Loop Detect")},String(O),e=>{this._applyImmediateSetting("multi_acks",Number(e.target.value),"Multi ACK")}):er(Va||(Va=ds`
            <div style="font-size:11px;color:var(--secondary-text-color);">
              Este firmware não expõe Flood Limits / Loop Detect pelo Companion.
            </div>
          `)),null!=L&&L.supported?er(Wa||(Wa=ds`
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
                    style="width:100%;min-width:0;max-width:100%;flex:1 1 auto;"
                    .value=${0}
                    ?disabled=${0}
                    @change=${0}>
                    ${0}
                  </select>
                </div>
              </div>
            </div>
          `),String(P),e=>{this._applyImmediateSetting("rx_delay",Number(e.target.value),"RX Delay")},K?"1":"0",e=>{this._applyImmediateSetting("cad_enabled","1"===e.target.value,"CAD")},String(G),e=>{this._applyImmediateSetting("interference_threshold",Number(e.target.value),"Interference Threshold")},String(X),e=>{this._applyImmediateSetting("agc_reset_interval",Number(e.target.value),"AGC Reset")},String(Q),e=>{this._applyImmediateSetting("flood_tx_delay",Number(e.target.value),"Flood TX Delay")},String(Y),e=>{this._applyImmediateSetting("direct_tx_delay",Number(e.target.value),"Direct TX Delay")},String(this._dutyCycleValue),null!==this._dutyCycleBusy,e=>{const t=Number(e.target.value);this._dutyCycleValue=t,this._applyDutyCycle(t)},Array.from({length:41},(e,t)=>t+10).map(e=>er(Ka||(Ka=ds`<option
                        value=${0}
                        ?selected=${0}
                      >${0}%</option>`),String(e),e===this._dutyCycleValue,e))):er(Ga||(Ga=ds`
            <div style="font-size:11px;color:var(--secondary-text-color);">
              Atualiza o firmware HiveFW para ativar os controlos locais de CAD, AGC e delays.
            </div>
          `)))}_renderRepeaterAcl(e){const t=e.server_auth,i=Array.isArray(null==t?void 0:t.acl_entries)?t.acl_entries:[];return er(Xa||(Xa=ds`
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
    `),i.length,1===i.length?"":"s",null!=t&&t.acl_entries_error?er(Qa||(Qa=ds`
          <div style="font-size:11px;color:var(--error-color);margin-bottom:8px;">
            Não foi possível ler a ACL: ${0}
          </div>
        `),t.acl_entries_error):ar,i.length?er(Ya||(Ya=ds`
          <div style="display:flex;flex-direction:column;gap:7px;">
            ${0}
          </div>
        `),i.map(e=>{var t;const i=`acl_perm_${e.public_key}`,a=Number(null!==(t=this._editValues[i])&&void 0!==t?t:e.permissions);return er(Ja||(Ja=ds`
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
              `),e.pubkey_prefix.toUpperCase(),this._aclNewPublicKey,null!==this._repeaterAccessBusy,e=>{this._aclNewPublicKey=e.target.value.trim().replace(/\s+/g,"").toLowerCase()},String(this._aclNewPermissions),null!==this._repeaterAccessBusy,e=>{this._aclNewPermissions=Number(e.target.value)},null!==this._repeaterAccessBusy||!/^[0-9a-f]{64}$/.test(this._aclNewPublicKey),this._addRepeaterAclEntry,e.public_key,String(a),null!==this._repeaterAccessBusy,e=>{this._editValues[i]=Number(e.target.value),this._editValues={...this._editValues}},null!==this._repeaterAccessBusy||a===e.permissions,()=>this._setRepeaterAclEntry(e.public_key,a),null!==this._repeaterAccessBusy,()=>this._confirmRemoveRepeaterAclEntry(e.public_key,e.pubkey_prefix))})):er(Za||(Za=ds`
          <div style="font-size:11px;color:var(--secondary-text-color);">
            Nenhuma identidade persistida na ACL.
          </div>
        `)))}async _addRepeaterAclEntry(){var e;const t=this._aclNewPublicKey.trim().toLowerCase();/^[0-9a-f]{64}$/.test(t)?(await this._setRepeaterAclEntry(t,this._aclNewPermissions),null!==(e=this._repeaterStatus)&&void 0!==e&&null!==(e=e.server_auth)&&void 0!==e&&null!==(e=e.acl_entries)&&void 0!==e&&e.some(e=>e.public_key===t)&&(this._aclNewPublicKey="",this._aclNewPermissions=1)):this._showStatusMessage("ACL: public key inválida.","error")}async _setRepeaterAclEntry(e,t){if(this.hass){this._repeaterAccessBusy="acl-entry";try{var i;const a=await Er(this.hass,{acl_public_key:e,acl_permissions:t},null===(i=this.config)||void 0===i?void 0:i.entry_id);if(!a.success)return void this._showStatusMessage(a.error||"Não foi possível atualizar a ACL.","error");delete this._editValues[`acl_perm_${e}`],this._editValues={...this._editValues},await this._readRepeaterStatus(!1,!1),this._showStatusMessage(0===t?"Entrada ACL removida.":"Permissão ACL atualizada.","success")}catch(e){this._showStatusMessage("ACL: "+String(e),"error")}finally{this._repeaterAccessBusy=null}}}_confirmRemoveRepeaterAclEntry(e,t){this._confirmAction={title:"Remover identidade da ACL",message:`Remover ${t.toUpperCase()} da ACL persistente do Repeater? Esta operação não altera as passwords Admin/Guest.`,onConfirm:()=>this._setRepeaterAclEntry(e,0)},this._confirmDialogOpen=!0}async _readRepeaterStatus(e=!1,t=!1){if(this.hass&&!this._repeaterReadBusy){this._repeaterReadBusy=!0;try{var i;const a=await Pr(this.hass,null===(i=this.config)||void 0===i?void 0:i.entry_id);if(this._repeaterStatus=a,void 0!==(null==a?void 0:a.duty_cycle)&&(this._dutyCycleValue=Number(a.duty_cycle)),t){for(const e of["repeat","auto_advert","mesh_time_sync","owner_info","rx_boosted_gain","adc_multiplier","multi_acks","rx_delay","flood_max","flood_max_unscoped","flood_max_advert","loop_detect","cad_enabled","interference_threshold","agc_reset_interval","flood_tx_delay","direct_tx_delay"])delete this._editValues[e];this._editValues={...this._editValues}}this.requestUpdate(),e&&this._showStatusMessage("Configuração do Repeater relida diretamente do rádio.","success")}catch(t){this._repeaterStatus=null,e&&this._showStatusMessage("Leitura da configuração do Repeater: "+String(t),"error")}finally{this._repeaterReadBusy=!1}}}async _refreshRepeaterAccessStatus(){await this._readRepeaterStatus(!1,!1)}async _saveRepeaterPassword(e){var t;if(!this.hass||null===(t=this._repeaterStatus)||void 0===t||null===(t=t.server_auth)||void 0===t||!t.supported)return;const i="admin"===e,a=i?this._adminPasswordDraft:this._guestPasswordDraft;if(a){this._repeaterAccessBusy=e;try{var o;const e=await Er(this.hass,{[i?"admin_password":"guest_password"]:a},null===(o=this.config)||void 0===o?void 0:o.entry_id);if(!e.success)return void this._showStatusMessage(e.error||"Não foi possível guardar a password.","error");i?this._adminPasswordDraft="":this._guestPasswordDraft="",await this._refreshRepeaterAccessStatus(),this._showStatusMessage((i?"Admin":"Guest")+" password guardada e verificada.","success")}catch(e){this._showStatusMessage("Acesso remoto: "+String(e),"error")}finally{this._repeaterAccessBusy=null}}}async _clearRepeaterPassword(e){var t;if(!this.hass||null===(t=this._repeaterStatus)||void 0===t||null===(t=t.server_auth)||void 0===t||!t.supported)return;const i="admin"===e;this._repeaterAccessBusy=e;try{var a;const e=await Er(this.hass,{[i?"admin_password":"guest_password"]:""},null===(a=this.config)||void 0===a?void 0:a.entry_id);if(!e.success)return void this._showStatusMessage(e.error||"Não foi possível limpar a password.","error");i?this._adminPasswordDraft="":this._guestPasswordDraft="",await this._refreshRepeaterAccessStatus(),this._showStatusMessage((i?"Admin":"Guest")+" password removida.","success")}catch(e){this._showStatusMessage("Acesso remoto: "+String(e),"error")}finally{this._repeaterAccessBusy=null}}_confirmClearRepeaterAcl(){var e,t;const i=null!==(e=null===(t=this._repeaterStatus)||void 0===t||null===(t=t.server_auth)||void 0===t?void 0:t.acl_count)&&void 0!==e?e:0;i&&(this._confirmAction={title:"Limpar ACL do Repeater",message:"Isto remove "+i+" identidade(s) autorizada(s) da ACL persistente. As passwords Admin/Guest não são alteradas. Os clientes terão de autenticar-se novamente.",onConfirm:()=>this._clearRepeaterAcl()},this._confirmDialogOpen=!0)}async _clearRepeaterAcl(){var e;if(this.hass&&null!==(e=this._repeaterStatus)&&void 0!==e&&null!==(e=e.server_auth)&&void 0!==e&&e.supported){this._repeaterAccessBusy="acl";try{var t;const e=await Er(this.hass,{clear_acl:!0},null===(t=this.config)||void 0===t?void 0:t.entry_id);if(!e.success)return void this._showStatusMessage(e.error||"Não foi possível limpar a ACL.","error");await this._refreshRepeaterAccessStatus(),this._showStatusMessage("ACL do Repeater limpa e verificada.","success")}catch(e){this._showStatusMessage("ACL: "+String(e),"error")}finally{this._repeaterAccessBusy=null}}}async _applyDutyCycle(e){if(!this.hass)return;const t=Math.max(10,Math.min(50,Math.round(null!=e?e:this._dutyCycleValue)));this._dutyCycleValue=t,this._dutyCycleBusy="apply";try{var i;const e=await async function(e,t,i){const a={type:"hivefw_integration/set_duty_cycle",duty_cycle:t};return i&&(a.entry_id=i),e.callWS(a)}(this.hass,t,null===(i=this.config)||void 0===i?void 0:i.entry_id);this._dutyCycleValue=Number(e.duty_cycle),await this._readRepeaterStatus(!1,!0),this.requestUpdate(),this._showStatusMessage(`Duty Cycle aplicado e confirmado: ${e.duty_cycle}%`,"success")}catch(e){const t=e,i=null!=t&&t.message?t.code?`${t.message} (${t.code})`:t.message:String(e);this._showStatusMessage(`Duty Cycle: ${i}`,"error")}finally{this._dutyCycleBusy=null}}async _applyRepeaterSettings(){var e,t;if(!this.hass||null===(e=this._repeaterStatus)||void 0===e||!e.supported)return;const i=this._repeaterStatus,a={};void 0!==this._editValues.multi_acks&&(a.multi_acks=Number(this._editValues.multi_acks)),void 0!==this._editValues.rx_delay&&(a.rx_delay=Number(this._editValues.rx_delay)),null!==(t=i.repeater_profile)&&void 0!==t&&t.supported&&void 0!==this._editValues.owner_info&&(a.owner_info=String(this._editValues.owner_info));for(const e of["path_hash_mode","flood_max","flood_max_unscoped","flood_max_advert","loop_detect","interference_threshold","agc_reset_interval","flood_tx_delay","direct_tx_delay"])void 0!==this._editValues[e]&&(a[e]=Number(this._editValues[e]));if(void 0!==this._editValues.cad_enabled&&(a.cad_enabled=Boolean(this._editValues.cad_enabled)),0!==Object.keys(a).length){this._saving=!0;try{var o;const e=await Er(this.hass,a,null===(o=this.config)||void 0===o?void 0:o.entry_id);if(!e.success)return void this._showStatusMessage(e.error||"Failed to apply Repeater settings","error");for(const e of["owner_info","rx_boosted_gain","adc_multiplier","multi_acks","rx_delay","flood_max","flood_max_unscoped","flood_max_advert","loop_detect","cad_enabled","interference_threshold","agc_reset_interval","flood_tx_delay","direct_tx_delay"])delete this._editValues[e];this._editValues={...this._editValues},await this._loadDeviceConfig(),this._showStatusMessage("Repeater settings applied and verified","success")}catch(e){this._showStatusMessage(`Repeater settings: ${String(e)}`,"error")}finally{this._saving=!1}}else this._showStatusMessage("No Repeater settings changed","success")}_renderIdentityManagement(){var e;return this._deviceConfig?er(eo||(eo=ds`
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
    `),null!==(e=this._editValues.name)&&void 0!==e?e:this._deviceConfig.name,e=>{this._editValues.name=e.target.value},!this._editValues.name||this._editValues.name===this._deviceConfig.name,this._handleNameSave,this._showRegenIdentityConfirm,this._importKeyValue,e=>{this._importKeyValue=e.target.value},!this._importKeyValue.trim(),this._handleImportKeyConfirm):ar}_hasChanges(e,t){return!!this._deviceConfig&&t.some(e=>void 0!==this._editValues[e]&&this._editValues[e]!==this._deviceConfig[e])}async _handleApply(e){if(!this.hass||!this._deviceConfig)return;let t=[];switch(e){case"device-name":t=["name"];break;case"radio-settings":t=["tx_power","frequency","bandwidth","spreading_factor","coding_rate","path_hash_mode","rx_boosted_gain","adc_multiplier"]}const i={};for(const e of t)void 0!==this._editValues[e]&&(i[e]=this._editValues[e]);this._saving=!0;try{var a;const o=await Er(this.hass,i,null===(a=this.config)||void 0===a?void 0:a.entry_id);if(o.success){this._deviceConfig&&(this._deviceConfig={...this._deviceConfig,...i});for(const e of t)delete this._editValues[e];this._editValues={...this._editValues},"radio-settings"===e&&("rx_boosted_gain"in i||"adc_multiplier"in i)&&await this._readRepeaterStatus(!1,!1),o.rename?this._renameSuccess=o.rename:this._showStatusMessage(`Saved: ${t.join(", ")}`,"success")}else this._showStatusMessage("Save failed","error")}catch(e){this._showStatusMessage(`Error: ${String(e)}`,"error")}finally{this._saving=!1}}async _copyToClipboard(e){try{await navigator.clipboard.writeText(e),this._showStatusMessage("Copied to clipboard","success")}catch(e){this._showStatusMessage("Failed to copy","error")}}_showStatusMessage(e,t){this._statusMessage={text:e,type:t},null!==this._statusMessageTimeout&&clearTimeout(this._statusMessageTimeout),this._statusMessageTimeout=window.setTimeout(()=>{this._statusMessage=null,this._statusMessageTimeout=null},5e3)}_handleNameSave(){var e;const t=this._editValues.name,i=null===(e=this._deviceConfig)||void 0===e?void 0:e.name;if(void 0===t||t===i)return;const a=e=>(e||"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,""),o=a(null!=i?i:""),s=a(String(t));this._confirmAction={title:"Rename Device",message:`Renaming the device will rename all entity IDs ending in _${o} to _${s}. Any automations, scripts, or dashboards referencing entity IDs by the old name will need updating. A repair issue will list every renamed entity. Continue?`,onConfirm:async()=>{await this._handleApply("device-name")}},this._confirmDialogOpen=!0}async _applyLocation(){if(this.hass&&this._deviceConfig){this._saving=!0;try{var e;const i=["latitude","longitude"],a={};if("ha_location"===this._locationSource){const e=this.hass.states["zone.home"];if(!e||null==e.attributes.latitude||null==e.attributes.longitude)return void this._showStatusMessage("Could not read zone.home coordinates from Home Assistant","error");a.latitude=e.attributes.latitude,a.longitude=e.attributes.longitude}else for(const e of i)void 0!==this._editValues[e]&&(a[e]=this._editValues[e]);if(Object.keys(a).length>0){var t;if(!(await Er(this.hass,a,null===(t=this.config)||void 0===t?void 0:t.entry_id)).success)return void this._showStatusMessage("Failed to save coordinates","error");this._deviceConfig&&(this._deviceConfig={...this._deviceConfig,...a});for(const e of i)delete this._editValues[e];this._editValues={...this._editValues}}if(!(await Vr(this.hass,this._locationSource,null===(e=this.config)||void 0===e?void 0:e.entry_id)).success)return void this._showStatusMessage("Failed to update location source","error");await this._loadDeviceConfig(),this._showStatusMessage("Location settings applied","success")}catch(e){this._showStatusMessage(`Error: ${String(e)}`,"error")}finally{this._saving=!1}}}_showRegenIdentityConfirm(){this._confirmAction={title:"Regenerate Identity",message:"This will create a new cryptographic identity, reboot the device, and migrate all entity IDs to the new key prefix. Existing automations referencing entity IDs by the old prefix will need updating. All contacts must re-add this device. This cannot be undone.",requireTyped:"REGENERATE",onConfirm:async()=>{var e;this.hass&&this._startIdentityFlow("regenerate",{type:"hivefw_integration/regenerate_identity",payload:null!==(e=this.config)&&void 0!==e&&e.entry_id?{entry_id:this.config.entry_id}:{}})}},this._confirmDialogOpen=!0}_handleImportKeyConfirm(){const e=this._importKeyValue.trim().replace(/\s+/g,"");e&&(64===e.length||128===e.length?/^[0-9a-fA-F]+$/.test(e)?(this._confirmAction={title:"Import Private Key",message:"Importing a private key will replace the device identity, reboot the device, and migrate all entity IDs to the new key prefix. Existing automations referencing entity IDs by the old prefix will need updating. All contacts must re-add this device.",requireTyped:"IMPORT",onConfirm:()=>this._importIdentityKey()},this._confirmDialogOpen=!0):this._showStatusMessage("Private key must be hex (0-9, a-f)","error"):this._showStatusMessage("Private key must be 64 or 128 hex characters","error"))}async _importIdentityKey(){var e;if(!this.hass||!this._importKeyValue.trim())return;const t=this._importKeyValue.trim().replace(/\s+/g,"");this._importKeyValue="";const i={private_key:t};null!==(e=this.config)&&void 0!==e&&e.entry_id&&(i.entry_id=this.config.entry_id),this._startIdentityFlow("import",{type:"hivefw_integration/import_identity",payload:i})}_startIdentityFlow(e,t){if(!this.hass)return;this._identityFlowUnsubscribe&&(this._identityFlowUnsubscribe(),this._identityFlowUnsubscribe=null),this._identityFlowState={kind:"progress",flow:e,currentStep:"generating",completedSteps:new Set};const{unsubscribe:i}=function(e,t,i,a){let o,s=null;const r=new Promise(e=>{o=e});let n={success:!1,code:"unknown",message:"Identity flow terminated without a result event."};return e.connection.subscribeMessage(e=>{if("done"===e.step&&e.success&&e.old_pubkey&&e.new_pubkey){const t={success:!0,old_pubkey:e.old_pubkey,new_pubkey:e.new_pubkey,warning:e.warning};n=t,a({type:"result",data:t})}else"done"!==e.step&&a({type:"progress",step:e.step})},{type:t,...i}).then(e=>{s=e,o(n)}).catch(e=>{const t={success:!1,code:e.code||"error",message:e.message||"Identity flow failed."};a({type:"error",data:t}),o(t)}),{unsubscribe:()=>{s&&s()},done:r}}(this.hass,t.type,t.payload,t=>{if("progress"===t.type){if("progress"!==this._identityFlowState.kind)return;const e=new Set(this._identityFlowState.completedSteps);e.add(this._identityFlowState.currentStep),this._identityFlowState={...this._identityFlowState,currentStep:t.step,completedSteps:e}}else"result"===t.type?this._identityFlowState={kind:"success",flow:e,oldPubkey:t.data.old_pubkey,newPubkey:t.data.new_pubkey,warning:t.data.warning}:"error"===t.type&&(this._identityFlowState={kind:"failure",flow:e,code:t.data.code,message:t.data.message})});this._identityFlowUnsubscribe=i}_closeIdentityFlowModal(){this._identityFlowUnsubscribe&&(this._identityFlowUnsubscribe(),this._identityFlowUnsubscribe=null);const e="success"===this._identityFlowState.kind;this._identityFlowState={kind:"closed"},e&&this._loadDeviceConfig()}_renderIdentityFlowModal(){const e=this._identityFlowState;if("closed"===e.kind)return ar;const t="regenerate"===e.flow?"Regenerate Identity":"Import Private Key",i="regenerate"===e.flow?"Regenerating Identity":"Importing Identity",a="regenerate"===e.flow?"Identity Regenerated":"Identity Imported",o="regenerate"===e.flow?"Identity Regeneration Failed":"Identity Import Failed";let s,r;"progress"===e.kind?(s=er(to||(to=ds`
        <div style="font-size: 13px; color: var(--secondary-text-color); margin-bottom: 16px;">
          This typically takes 5–10 seconds. Please don't close this dialog.
        </div>
        <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
          ${0}
        </ul>
      `),zn.map(t=>{const i=e.completedSteps.has(t.step),a=e.currentStep===t.step;let o="○",s="var(--secondary-text-color)";return i?(o="✓",s="var(--success-color, #28a745)"):a&&(o="⏳",s="var(--primary-color)"),er(io||(io=ds`
              <li style="display: flex; align-items: center; gap: 8px; color: ${0}; font-size: 14px;">
                <span style="font-family: monospace; width: 1em;">${0}</span>
                <span>${0}</span>
              </li>
            `),s,o,t.label)})),r=ar):"success"===e.kind?(s=er(ao||(ao=ds`
        <div style="font-size: 32px; text-align: center; margin-bottom: 8px;">✅</div>
        <div style="font-size: 14px; margin-bottom: 16px;">
          The device's identity has been replaced and verified.
        </div>
        <div style="font-family: monospace; font-size: 12px; background: var(--card-background-color, #f5f5f5); padding: 8px 12px; border-radius: 4px; margin-bottom: 12px;">
          <div><span style="color: var(--secondary-text-color);">Old key:</span> ${0}…</div>
          <div><span style="color: var(--secondary-text-color);">New key:</span> ${0}… <span style="color: var(--success-color, #28a745); font-size: 11px;">(verified after reload)</span></div>
        </div>
        ${0}
      `),e.oldPubkey.slice(0,12),e.newPubkey.slice(0,12),e.warning?er(oo||(oo=ds`
          <div style="font-size: 13px; color: var(--secondary-text-color); margin-top: 12px; padding: 8px 12px; border-left: 3px solid var(--warning-color, #f0ad4e); background: var(--warning-color-bg, rgba(240, 173, 78, 0.08));">
            <strong>Follow-up:</strong>
            <ul style="margin: 4px 0 0 16px; padding: 0;">
              <li>${0}</li>
              <li>Check Settings → Repairs for the entity-ID migration list.</li>
            </ul>
          </div>
        `),e.warning):ar),r=er(so||(so=ds`
        <button class="modal-action" @click=${0}>Close</button>
      `),this._closeIdentityFlowModal)):(s=er(ro||(ro=ds`
        <div style="font-size: 32px; text-align: center; margin-bottom: 8px;">❌</div>
        <div style="font-size: 14px; margin-bottom: 12px;">
          ${0}
        </div>
        <div style="font-family: monospace; font-size: 12px; background: var(--card-background-color, #f5f5f5); padding: 8px 12px; border-radius: 4px;">
          <div><span style="color: var(--secondary-text-color);">Error code:</span> ${0}</div>
          <div style="margin-top: 4px; word-break: break-word;"><span style="color: var(--secondary-text-color);">Message:</span> ${0}</div>
        </div>
      `),"regenerate"===e.flow?"The device firmware rejected the new key. Your device identity is unchanged.":"The import did not take effect. Your device identity may be unchanged.",e.code,e.message),r=er(no||(no=ds`
        <button class="modal-action" @click=${0}>Close</button>
      `),this._closeIdentityFlowModal));const n="progress"===e.kind?i:"success"===e.kind?a:o;return er(lo||(lo=ds`
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
    `),t,e=>e.stopPropagation(),n,"progress"===e.kind?ar:er(co||(co=ds`
              <button class="modal-close" aria-label="Close" @click=${0}>&times;</button>
            `),this._closeIdentityFlowModal),s,r?er(po||(po=ds`<div style="margin-top: 20px; display: flex; justify-content: flex-end;">${0}</div>`),r):ar)}_closeRenameSuccessModal(){this._renameSuccess=null,this._loadDeviceConfig(),this.dispatchEvent(new CustomEvent("device-renamed",{bubbles:!0,composed:!0}))}_renderRenameSuccessModal(){const e=this._renameSuccess;return e?er(ho||(ho=ds`
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
    `),e=>e.stopPropagation(),e.old_name,e.new_name,e.count,1===e.count?"entity ID was":"entity IDs were",e.old_suffix,e.new_suffix,this._closeRenameSuccessModal):ar}async _onConfirmAction(){if(this._confirmDialogOpen=!1,this._confirmAction)try{await this._confirmAction.onConfirm()}catch(e){this._error=`Error: ${String(e)}`}this._confirmAction=null}_onConfirmCancel(){this._confirmDialogOpen=!1,this._confirmAction=null}};In.styles=[Cr,ms(uo||(uo=ds`
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
        width: 100%;
      }

      .backup-restore-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 10px;
        width: 100%;
      }

      .settings-column {
        min-width:0;
        display:flex;
        flex-direction:column;
        gap:16px;
      }

      #hive-observability-settings-card {
        padding:12px;
      }

      #hive-observability-settings-card .card-title {
        margin-bottom:8px;
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

      @media (max-width: 1100px) {
        .firmware-actions-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .firmware-release-card,
        .firmware-flash-manual-card,
        .hivefw-manual-ota-card,
        .firmware-download-card { grid-column:auto; grid-row:auto; }
      }

      @media (max-width: 870px) {
        .managed-device-list,
        .repeater-setup-grid,
        .repeater-region-form,
        .backup-restore-grid,
        .firmware-actions-grid {
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

      .settings-shortcuts{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;padding:4px}
      .settings-shortcut{display:grid;grid-template-columns:48px minmax(0,1fr);align-items:center;column-gap:14px;min-height:112px;padding:20px;border:1px solid var(--divider-color);border-radius:14px;background:var(--card-background-color);color:var(--primary-text-color);cursor:pointer;text-align:left;transition:.15s}
      .settings-shortcut:hover{border-color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 5%,var(--card-background-color));transform:translateY(-1px)}
      .settings-shortcut-icon{grid-row:1 / span 2;width:46px;height:46px;display:grid;place-items:center;border-radius:12px;background:color-mix(in srgb,var(--primary-color) 12%,transparent);color:var(--primary-color)}
      .settings-shortcut-icon ha-icon{--mdc-icon-size:26px}
      .settings-shortcut-copy{display:flex;flex-direction:column;gap:5px;min-width:0}
      .settings-shortcut-title{font-size:16px;font-weight:700}.settings-shortcut-desc{font-size:12px;line-height:1.45;color:var(--secondary-text-color)}
      .settings-topic-overlay{position:fixed;inset:0;z-index:10020;display:grid;place-items:center;padding:18px;box-sizing:border-box;background:rgba(0,0,0,.5)}
      .settings-topic-dialog{width:min(1080px,100%);max-height:min(90vh,900px);display:flex;flex-direction:column;overflow:hidden;border-radius:14px;background:var(--primary-background-color);color:var(--primary-text-color);box-shadow:0 14px 42px rgba(0,0,0,.32)}
      .settings-topic-header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-bottom:1px solid var(--divider-color);background:var(--card-background-color);flex:0 0 auto}
      .settings-topic-header strong{font-size:16px}.settings-topic-close{width:34px;height:34px;border:0;border-radius:50%;background:transparent;color:var(--secondary-text-color);font-size:20px;cursor:pointer}.settings-topic-close:hover{background:var(--secondary-background-color);color:var(--primary-text-color)}
      .settings-topic-body{overflow:auto;padding:16px;min-height:0}.settings-topic-body .settings-grid{margin:0}
      .topic-firmware .firmware-manager,.topic-wifi #hive-wifi-portal-card,.topic-location .settings-card-location,.topic-identity .settings-card-identity,.topic-backup .backup-restore-card{width:100%;max-width:none;box-sizing:border-box}
      .settings-topic-body .device-section{margin:0 0 16px;padding:18px;border-radius:12px}
      .settings-topic-body .card-title{margin-bottom:14px}
      .settings-topic-body .section-row{gap:14px;margin-bottom:14px}
      .settings-topic-body .form-group-inline{margin-bottom:10px}
      .settings-topic-body [data-hive-routing],.settings-topic-body [data-hive-rf],.settings-topic-body [data-hive-owner-info]{margin-top:16px!important;padding:16px!important;border-radius:10px!important}
      .topic-firmware .settings-grid,.topic-wifi .settings-grid,.topic-location .settings-grid,.topic-identity .settings-grid,.topic-backup .settings-grid{grid-template-columns:minmax(0,1fr)!important}
      .topic-wifi .settings-column,.topic-location .settings-column,.topic-identity .settings-column,.topic-backup .settings-column{display:contents}
      .settings-topic-dialog #hive-repeater-settings-card,.settings-topic-dialog .firmware-manager,.settings-topic-dialog .settings-card-identity,.settings-topic-dialog .backup-restore-card,.settings-topic-dialog #hive-console-settings-card,.settings-topic-dialog #hive-rxlog-card,.settings-topic-dialog #hive-observability-settings-card,.settings-topic-dialog .settings-card-location,.settings-topic-dialog #hive-wifi-portal-card{display:none}
      .topic-firmware .firmware-manager,.topic-identity .settings-card-identity,.topic-backup .backup-restore-card,.topic-location .settings-card-location,.topic-wifi #hive-wifi-portal-card,.topic-diagnostics #hive-console-settings-card,.topic-diagnostics #hive-rxlog-card,.topic-diagnostics #hive-observability-settings-card,.topic-users #hive-repeater-settings-card,.topic-radio #hive-repeater-settings-card,.topic-repeater #hive-repeater-settings-card,.topic-regions #hive-repeater-settings-card{display:block}
      .topic-users [data-hive-repeater-quick],.topic-users [data-hive-owner-info],.topic-users [data-hive-native="companion"],.topic-users [data-hive-routing],.topic-users [data-hive-rf],.topic-users .settings-regions-block{display:none!important}
      .topic-radio [data-hive-repeater-quick],.topic-radio [data-hive-repeater-access],.topic-radio [data-hive-owner-info],.topic-radio [data-hive-routing],.topic-radio [data-hive-rf],.topic-radio .settings-regions-block{display:none!important}
      .topic-repeater [data-hive-repeater-access],.topic-repeater [data-hive-native="companion"],.topic-repeater .settings-regions-block{display:none!important}
      .topic-regions [data-hive-repeater-quick],.topic-regions [data-hive-repeater-access],.topic-regions [data-hive-owner-info],.topic-regions [data-hive-native="companion"],.topic-regions [data-hive-routing],.topic-regions [data-hive-rf]{display:none!important}
      @media(max-width:870px){.settings-shortcuts{grid-template-columns:1fr}.settings-topic-overlay{padding:0}.settings-topic-dialog{width:100%;height:100%;max-height:none;border-radius:0}}
      @media(max-width:520px){.settings-shortcuts{grid-template-columns:1fr}}

      .location-mode-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:16px}
      .location-mode-button{padding:12px;border:1px solid var(--divider-color);border-radius:10px;background:var(--secondary-background-color);color:var(--primary-text-color);cursor:pointer;text-align:left}
      .location-mode-button.active{border-color:var(--primary-color);background:color-mix(in srgb,var(--primary-color) 10%,var(--card-background-color))}
      .location-mode-button strong{display:block;font-size:12px;margin-bottom:3px}.location-mode-button span{font-size:10px;color:var(--secondary-text-color);line-height:1.35}
      .location-picker-map{height:420px;border:1px solid var(--divider-color);border-radius:12px;overflow:hidden;background:var(--secondary-background-color);margin:12px 0}
      .location-picker-map ha-map{display:block;width:100%;height:100%}
      .location-current{display:flex;gap:14px;flex-wrap:wrap;padding:10px 12px;border-radius:9px;background:var(--secondary-background-color);font-size:11px;margin-bottom:12px}
      @media(max-width:800px){.location-mode-grid{grid-template-columns:1fr 1fr}.location-picker-map{height:360px}}
      @media(max-width:520px){.location-mode-grid{grid-template-columns:1fr}}

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
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 12px;
        align-items: stretch;
      }

      .firmware-release-card { grid-column:1; grid-row:1; }
      .firmware-flash-manual-card { grid-column:2; grid-row:1; }
      .hivefw-manual-ota-card { grid-column:3; grid-row:1; }
      .firmware-download-card { grid-column:4; grid-row:1; }

      .firmware-actions-grid > .firmware-action-card {
        height:100%;
        box-sizing:border-box;
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

      .firmware-download-action {
        display: inline-flex !important;
        width: fit-content;
        max-width: 100%;
        min-width: 0;
        padding-inline: 14px;
        align-items: center;
        justify-content: center;
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

        .firmware-release-card,
        .firmware-flash-manual-card,
        .hivefw-manual-ota-card,
        .firmware-usb-card {
          grid-column:1;
          grid-row:auto;
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
    `))],cs([kr({type:Object})],In.prototype,"hass",void 0),cs([kr({type:Object})],In.prototype,"config",void 0),cs([kr({type:Boolean})],In.prototype,"narrow",void 0),cs([kr({type:Object})],In.prototype,"selectedDevice",void 0),cs([kr({type:Number})],In.prototype,"contactCount",void 0),cs([kr({type:Number})],In.prototype,"channelCount",void 0),cs([Sr()],In.prototype,"_deviceConfig",void 0),cs([Sr()],In.prototype,"_repeaterStatus",void 0),cs([Sr()],In.prototype,"_managedDevices",void 0),cs([Sr()],In.prototype,"_scopeDraft",void 0),cs([Sr()],In.prototype,"_scopeGlobal",void 0),cs([Sr()],In.prototype,"_scopeSaving",void 0),cs([Sr()],In.prototype,"_regionTarget",void 0),cs([Sr()],In.prototype,"_regionText",void 0),cs([Sr()],In.prototype,"_regionBusy",void 0),cs([Sr()],In.prototype,"_localRegions",void 0),cs([Sr()],In.prototype,"_localRegionBusy",void 0),cs([Sr()],In.prototype,"_localRegionAction",void 0),cs([Sr()],In.prototype,"_localRegionName",void 0),cs([Sr()],In.prototype,"_localRegionParent",void 0),cs([Sr()],In.prototype,"_regionAction",void 0),cs([Sr()],In.prototype,"_regionName",void 0),cs([Sr()],In.prototype,"_loading",void 0),cs([Sr()],In.prototype,"_error",void 0),cs([Sr()],In.prototype,"_editValues",void 0),cs([Sr()],In.prototype,"_saving",void 0),cs([Sr()],In.prototype,"_firmwareOtaStatus",void 0),cs([Sr()],In.prototype,"_firmwareFile",void 0),cs([Sr()],In.prototype,"_firmwareBusy",void 0),cs([Sr()],In.prototype,"_firmwareChecking",void 0),cs([Sr()],In.prototype,"_firmwareUploadStage",void 0),cs([Sr()],In.prototype,"_firmwareDownloadTarget",void 0),cs([Sr()],In.prototype,"_dutyCycleValue",void 0),cs([Sr()],In.prototype,"_dutyCycleBusy",void 0),cs([Sr()],In.prototype,"_adminPasswordDraft",void 0),cs([Sr()],In.prototype,"_guestPasswordDraft",void 0),cs([Sr()],In.prototype,"_repeaterAccessBusy",void 0),cs([Sr()],In.prototype,"_repeaterReadBusy",void 0),cs([Sr()],In.prototype,"_repeaterQuickBusy",void 0),cs([Sr()],In.prototype,"_aclNewPublicKey",void 0),cs([Sr()],In.prototype,"_aclNewPermissions",void 0),cs([Sr()],In.prototype,"_backupBusy",void 0),cs([Sr()],In.prototype,"_confirmAction",void 0),cs([Sr()],In.prototype,"_confirmDialogOpen",void 0),cs([Sr()],In.prototype,"_locationSource",void 0),cs([Sr()],In.prototype,"_locationMode",void 0),cs([Sr()],In.prototype,"_settingsTopic",void 0),cs([Sr()],In.prototype,"_importKeyValue",void 0),cs([Sr()],In.prototype,"_identityFlowState",void 0),cs([Sr()],In.prototype,"_renameSuccess",void 0),cs([Sr()],In.prototype,"_statusMessage",void 0),In=cs([xr("meshcore-settings-page")],In);let Nn=class extends br{constructor(){super(),this.open=!1,this.contactName="",this.result=null,this.error="",this.availableRepeaters=[],this.targetContact=null,this.pathMode="discovery",this.pathHops=[],this.enteredPath="",this._repeaterFilter="",this._running=!1,this._onPathModeChange=e=>{this.pathMode=e.target.value},this._onExplicitPathInput=e=>{this.enteredPath=e.target.value},this._onRunTrace=()=>{if(!this._canRunTrace())return;const e="discovery"===this.pathMode?void 0:this._buildPathString();this._running=!0,this.dispatchEvent(new CustomEvent("trace-requested",{detail:{pathMode:this.pathMode,path:e},bubbles:!0,composed:!0}))},dn(this,{isOpen:()=>this.open,onEscape:()=>this._close()})}willUpdate(e){if(e.has("open")&&this.open&&!e.get("open")){const e=this.targetContact;if(!e||2!==e.type&&3!==e.type&&4!==e.type)this.pathMode="discovery",this.pathHops=[];else{this.pathMode="select";const t=this._resolveCachedHops(e);this.pathHops=t||[]}this.enteredPath="",this._repeaterFilter="",this._running=!1}(e.has("result")&&this.result||e.has("error")&&this.error)&&(this._running=!1)}_resolveCachedHops(e){var t,i;if(1!==(null!==(t=e.out_path_hash_mode)&&void 0!==t?t:0))return null;const a=(e.out_path||"").toLowerCase(),o=null!==(i=e.out_path_len)&&void 0!==i?i:0;if(!a||o<=0)return null;if(a.length<4*o)return null;const s=[];for(let e=0;e<o;e++){const t=a.substring(4*e,4*(e+1)),i=this.availableRepeaters.find(e=>(e.pubkey_prefix||"").toLowerCase().startsWith(t));if(!i)return null;s.push(i)}return s}render(){return this.open?er(vo||(vo=ds`
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
    `),this._close,this.contactName,e=>e.stopPropagation(),this.contactName,this._close,this._renderBody()):er(go||(go=ds``))}_renderBody(){return this.error?er(mo||(mo=ds`<div class="error-box">${0}</div>`),this.error):this.result?this._renderResult(this.result):this._running?er(fo||(fo=ds`<div class="info-value">Tracing…</div>`)):this._renderInput()}_renderInput(){return er(_o||(_o=ds`
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
    `),this.pathMode,this._onPathModeChange,"discovery"===this.pathMode?er(bo||(bo=ds`<div class="info-item path-hint">
            Flood path discovery will find a route automatically. May time
            out if the target is many hops away or unreachable by flood.
          </div>`)):"select"===this.pathMode?this._renderRepeaterPicker():this._renderExplicitInput(),"discovery"!==this.pathMode&&this._canRunTrace()?er(yo||(yo=ds`<div class="info-item">
            <div class="info-label">Resolved Path</div>
            <div class="resolved-path">${0}</div>
          </div>`),this._buildPathString()):er(xo||(xo=ds``)),!this._canRunTrace(),this._onRunTrace)}_renderRepeaterPicker(){var e,t,i;const a=new Set(this.pathHops.map(e=>e.public_key)),o=this._repeaterFilter.trim().toLowerCase(),s=[...this.availableRepeaters].filter(e=>!a.has(e.public_key)).filter(e=>{if(!o)return!0;const t=(e.adv_name||"").toLowerCase(),i=(e.pubkey_prefix||"").toLowerCase();return t.includes(o)||i.startsWith(o)}).sort((e,t)=>(e.adv_name||"").localeCompare(t.adv_name||"")),r=(null===(e=this.targetContact)||void 0===e?void 0:e.adv_name)||(null===(t=this.targetContact)||void 0===t?void 0:t.pubkey_prefix)||"(no target)",n=(null===(i=this.targetContact)||void 0===i||null===(i=i.pubkey_prefix)||void 0===i?void 0:i.substring(0,2).toUpperCase())||"--";return er(wo||(wo=ds`
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
    `),this._repeaterFilter,e=>{this._repeaterFilter=e.target.value},0===s.length?er($o||($o=ds`<div class="picker-empty">${0}</div>`),o?"No matches":"No repeaters available"):s.map(e=>er(ko||(ko=ds`
                      <div
                        class="picker-item"
                        @click=${0}
                        title="Add ${0}"
                      >
                        <span class="name">${0}</span>
                        <span class="hop-hex">${0}</span>
                      </div>
                    `),()=>this._addRepeater(e),e.adv_name,e.adv_name||e.pubkey_prefix,e.pubkey_prefix.substring(0,2).toUpperCase())),0===this.pathHops.length?er(So||(So=ds`<div class="picker-empty">Click a repeater to add (or leave empty for direct-neighbor)</div>`)):this.pathHops.map((e,t)=>er(Co||(Co=ds`
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
                    `),t+1,e.adv_name||e.pubkey_prefix,e.pubkey_prefix.substring(0,2).toUpperCase(),0===t,()=>this._moveRepeater(t,-1),t===this.pathHops.length-1,()=>this._moveRepeater(t,1),()=>this._removeRepeater(t))),r,n)}_renderExplicitInput(){var e,t,i;const a=!!this.enteredPath&&!this._isValidExplicitHops(),o=(null===(e=this.targetContact)||void 0===e?void 0:e.adv_name)||(null===(t=this.targetContact)||void 0===t?void 0:t.pubkey_prefix)||"(no target)",s=(null===(i=this.targetContact)||void 0===i||null===(i=i.pubkey_prefix)||void 0===i?void 0:i.substring(0,2).toUpperCase())||"--";return er(Mo||(Mo=ds`
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
    `),this.enteredPath,this._onExplicitPathInput,er(a?Ro||(Ro=ds`<div class="path-error">
              Invalid format — hex pairs separated by commas, all
              the same width (2, 4, or 8 chars).
            </div>`):Ao||(Ao=ds``)),o,s)}_addRepeater(e){this.pathHops=[...this.pathHops,e]}_removeRepeater(e){this.pathHops=this.pathHops.filter((t,i)=>i!==e)}_moveRepeater(e,t){const i=e+t;if(i<0||i>=this.pathHops.length)return;const a=[...this.pathHops];[a[e],a[i]]=[a[i],a[e]],this.pathHops=a}_isValidExplicitHops(){const e=this.enteredPath.trim();if(!e)return!0;const t=e.split(",").map(e=>e.trim());if(0===t.length)return!1;const i=t[0].length;if(![2,4,8].includes(i))return!1;const a=/^[0-9a-fA-F]+$/;return t.every(e=>e.length===i&&a.test(e))}_canRunTrace(){return"discovery"===this.pathMode||("select"===this.pathMode?!!this.targetContact:"explicit"===this.pathMode&&!!this.targetContact&&this._isValidExplicitHops())}_buildPathString(){if("select"===this.pathMode){if(!this.targetContact)return"";const e=this.targetContact.pubkey_prefix.substring(0,2).toUpperCase(),t=this.pathHops.map(e=>e.pubkey_prefix.substring(0,2).toUpperCase());return 0===t.length?e:[...t,e,...[...t].reverse()].join(",")}if("explicit"===this.pathMode){if(!this.targetContact)return"";const e=this.targetContact.pubkey_prefix.substring(0,2).toUpperCase(),t=this.enteredPath.trim();if(!t)return e;const i=t.split(",").map(e=>e.trim().toUpperCase());return[...i,e,...[...i].reverse()].join(",")}return""}_renderResult(e){const t=(e.path||[]).filter(e=>e.hash);return er(To||(To=ds`
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
    `),e.response_time,0===e.hops?"Direct (0 hops)":`${e.hops}`,null!==e.final_snr&&void 0!==e.final_snr?er(zo||(zo=ds`
            <div class="info-item">
              <div class="info-label">Final SNR (at this device)</div>
              <div class="info-value">${0} dB</div>
            </div>
          `),e.final_snr.toFixed(2)):er(Io||(Io=ds``)),t.length>0?er(No||(No=ds`
            <div class="info-item">
              <div class="info-label">Return Path (per-hop SNR)</div>
              <div class="hop-list">
                ${0}
              </div>
            </div>
          `),t.map((e,t)=>er(Fo||(Fo=ds`
                    <div class="hop-row">
                      <span>Hop ${0}: ${0}</span>
                      <span>${0} dB</span>
                    </div>
                  `),t+1,e.hash,e.snr.toFixed(2)))):er(Do||(Do=ds``)))}_close(){this.open=!1,this.dispatchEvent(new CustomEvent("trace-dialog-closed",{bubbles:!0,composed:!0}))}};Nn.styles=[Cr,ms(Eo||(Eo=ds`
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
  `))],cs([kr({type:Boolean})],Nn.prototype,"open",void 0),cs([kr({type:String})],Nn.prototype,"contactName",void 0),cs([kr({type:Object})],Nn.prototype,"result",void 0),cs([kr({type:String})],Nn.prototype,"error",void 0),cs([kr({type:Array})],Nn.prototype,"availableRepeaters",void 0),cs([kr({type:Object})],Nn.prototype,"targetContact",void 0),cs([Sr()],Nn.prototype,"pathMode",void 0),cs([Sr()],Nn.prototype,"pathHops",void 0),cs([Sr()],Nn.prototype,"enteredPath",void 0),cs([Sr()],Nn.prototype,"_repeaterFilter",void 0),cs([Sr()],Nn.prototype,"_running",void 0),Nn=cs([xr("meshcore-trace-dialog")],Nn);let Fn=class extends br{constructor(){super(),this.open=!1,this.contacts=[],this._typeFilter="all",this._search="",this._onTypeChange=e=>{this._typeFilter=e.target.value},this._onSearchInput=e=>{this._search=e.target.value},this._close=()=>{this.dispatchEvent(new CustomEvent("target-picker-closed",{bubbles:!0,composed:!0}))},dn(this,{isOpen:()=>this.open,onEscape:()=>this._close()})}willUpdate(e){e.has("open")&&this.open&&!e.get("open")&&(this._typeFilter="all",this._search="")}render(){if(!this.open)return er(Oo||(Oo=ds``));const e=this._search.trim().toLowerCase(),t=this.contacts.filter(e=>{switch(this._typeFilter){case"all":default:return!0;case"client":return 1===e.type;case"repeater":return 2===e.type;case"room_server":return 3===e.type;case"sensor":return 4===e.type}}).filter(t=>{if(!e)return!0;const i=(t.adv_name||"").toLowerCase(),a=(t.pubkey_prefix||"").toLowerCase();return i.includes(e)||a.startsWith(e)}).sort((e,t)=>(e.adv_name||"").localeCompare(t.adv_name||""));return er(Po||(Po=ds`
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
    `),this._close,e=>e.stopPropagation(),this._close,this._typeFilter,this._onTypeChange,this._search,this._onSearchInput,0===t.length?er(Bo||(Bo=ds`<div class="empty">No matching contacts</div>`)):t.map(e=>er(Lo||(Lo=ds`
                    <div
                      class="result-row"
                      @click=${0}
                      title="Trace to ${0}"
                    >
                      <span class="result-icon">${0}</span>
                      <span class="result-name">${0}</span>
                      <span class="result-hex">${0}</span>
                    </div>
                  `),()=>this._select(e),e.adv_name||e.pubkey_prefix,this._iconFor(e.type),e.adv_name||e.pubkey_prefix,(e.pubkey_prefix||"").substring(0,2).toUpperCase())))}_iconFor(e){switch(e){case 2:return er(Ho||(Ho=ds`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V10h4.27c.15-.86.45-1.66.87-2.36l-1.82-1.06a.5.5 0 01-.18-.68l.5-.87a.5.5 0 01.68-.18l1.81 1.05C19.66 4.66 20.78 4 22 4v2c-.8 0-1.54.32-2.08.84l1.5 2.6a.5.5 0 01-.18.68l-.87.5a.5.5 0 01-.68-.18L18.2 7.92c-.14.65-.2 1.33-.2 2.08 0 3.31-2.69 6-6 6s-6-2.69-6-6 2.69-6 6-6z"/></svg>`));case 3:return er(Uo||(Uo=ds`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 6h16v4H4V6zm0 8h16v4H4v-4zm2-6.5A.5.5 0 116 7a.5.5 0 010 .5zm0 8A.5.5 0 116 15a.5.5 0 010 .5z"/></svg>`));case 4:return er(qo||(qo=ds`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2a4 4 0 00-4 4v7.55A5.5 5.5 0 1015.5 20a5.47 5.47 0 00.5-2.45V6a4 4 0 00-4-4zm0 2a2 2 0 012 2v8.1a3.5 3.5 0 11-4 0V6a2 2 0 012-2z"/></svg>`));default:return er(jo||(jo=ds`<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`))}}_select(e){this.dispatchEvent(new CustomEvent("target-selected",{detail:e,bubbles:!0,composed:!0}))}};Fn.styles=[Cr,ms(Vo||(Vo=ds`
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
    `))],cs([kr({type:Boolean})],Fn.prototype,"open",void 0),cs([kr({type:Array})],Fn.prototype,"contacts",void 0),cs([Sr()],Fn.prototype,"_typeFilter",void 0),cs([Sr()],Fn.prototype,"_search",void 0),Fn=cs([xr("meshcore-target-picker")],Fn);let Dn=class extends br{constructor(){super(),this.narrow=!1,this._config=null,this._activeTab="state",this._devices=[],this._contacts=[],this._channels=[],this._selectedEntryId=null,this._loading=!0,this._loadingStarted=!1,this._error=null,this._unsubscribeList=[],this._unread=new Wr,this._pendingChatTarget=null,this._activeChatEntityId=null,this._deviceDropdownOpen=!1,this._onDocClickForDropdown=e=>{var t;const i=e.composedPath?e.composedPath():[],a=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".device-info-wrap");a&&i.includes(a)||this._closeDeviceDropdown()},this._onDocKeyForDropdown=e=>{"Escape"===e.key&&this._closeDeviceDropdown()},this._traceDialogOpen=!1,this._traceDialogContactName="",this._traceDialogResult=null,this._traceDialogError="",this._traceDialogPubkeyPrefix="",this._traceDialogEntryId=void 0,this._traceDialogTargetContact=null,this._targetPickerOpen=!1,this._pendingTraceEntryId=void 0,this._onTraceRequested=async e=>{if(!this.hass)return;const{pathMode:t,path:i}=e.detail;try{const e=await async function(e,t,i,a="discovery",o){const s={type:"hivefw_integration/trace",pubkey_prefix:t};return i&&(s.entry_id=i),"select"!==a&&"explicit"!==a||!o||(s.path=o),e.callWS(s)}(this.hass,this._traceDialogPubkeyPrefix,this._traceDialogEntryId,t,i);this._traceDialogResult=e}catch(e){this._traceDialogError=(null==e?void 0:e.message)||(null==e?void 0:e.code)||"Unknown error"}},this._onCompanionTraceRequested=e=>{var t,i,a;this._pendingTraceEntryId=null!==(t=null!==(i=null===(a=e.detail)||void 0===a?void 0:a.entryId)&&void 0!==i?i:this._selectedEntryId)&&void 0!==t?t:void 0,this._targetPickerOpen=!0},this._onTargetPicked=e=>{const t=e.detail;this._targetPickerOpen=!1,t&&(this._traceDialogPubkeyPrefix=t.pubkey_prefix,this._traceDialogEntryId=this._pendingTraceEntryId,this._traceDialogContactName=t.adv_name||t.pubkey_prefix,this._traceDialogTargetContact=t,this._traceDialogResult=null,this._traceDialogError="",this._traceDialogOpen=!0)},this._unread.onMarkReadRequested(e=>{this._handleMarkReadRequested(e)})}connectedCallback(){super.connectedCallback(),this._loadData(),this._setupSubscriptions()}disconnectedCallback(){super.disconnectedCallback(),this._teardownSubscriptions(),this._closeDeviceDropdown()}_toggleDeviceDropdown(){this._deviceDropdownOpen?this._closeDeviceDropdown():this._openDeviceDropdown()}_openDeviceDropdown(){this._deviceDropdownOpen||(this._deviceDropdownOpen=!0,setTimeout(()=>{document.addEventListener("click",this._onDocClickForDropdown,!0),document.addEventListener("keydown",this._onDocKeyForDropdown,!0)},0))}_closeDeviceDropdown(){this._deviceDropdownOpen&&(this._deviceDropdownOpen=!1,document.removeEventListener("click",this._onDocClickForDropdown,!0),document.removeEventListener("keydown",this._onDocKeyForDropdown,!0))}_selectDevice(e){e!==this._selectedEntryId&&(this._selectedEntryId=e,this._pendingChatTarget=null,Promise.all([this._loadDeviceData(),this._loadUnreadCounts()])),this._closeDeviceDropdown()}_setupSubscriptions(){var e;this._teardownSubscriptions(),null!==(e=this.hass)&&void 0!==e&&null!==(e=e.connection)&&void 0!==e&&e.subscribeEvents&&(this.hass.connection.subscribeEvents(e=>{e.data.entry_id===this._selectedEntryId&&this._loadDeviceData()},"hivefw_channels_updated").then(e=>{this._unsubscribeList.push(e)}),this.hass.connection.subscribeEvents(e=>{e.data.entry_id===this._selectedEntryId&&this._loadDeviceData()},"hivefw_channel_removed").then(e=>{this._unsubscribeList.push(e)}),this.hass.connection.subscribeEvents(e=>{var t;this._activeChatEntityId&&(null===(t=e.data)||void 0===t?void 0:t.entity_id)===this._activeChatEntityId||this._loadUnreadCounts()},"hivefw_unread_updated").then(e=>{this._unsubscribeList.push(e)}))}_teardownSubscriptions(){this._unsubscribeList.length>0&&(this._unsubscribeList.forEach(e=>{try{e()}catch(e){}}),this._unsubscribeList=[])}updated(e){e.has("hass")&&this.hass&&!this._config&&!this._loadingStarted&&this._loadData()}get _selectedDevice(){return this._devices.find(e=>e.entry_id===this._selectedEntryId)}render(){var e;if(this._loading)return er(Wo||(Wo=ds`
        <div class="panel">
          <div class="center-message">
            <div class="spinner"></div>
          </div>
        </div>
      `));if(this._error&&!this._config){const e="No HiveFW devices found"===this._error;return er(Ko||(Ko=ds`
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
      `),this._error,e?er(Go||(Go=ds`Open <a href="/config/repairs">Settings &rarr; System &rarr; Repairs</a>
                         for setup guidance, or reconfigure HiveFW via
                         <a href="/config/integrations">Settings &rarr; Devices &amp; Services</a>.`)):"Check that HiveFW is configured and the radio is connected.")}const t=this._selectedDevice;return er(Xo||(Xo=ds`
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
    `),this.narrow||"always_hidden"===(null===(e=this.hass)||void 0===e?void 0:e.dockedSidebar)?er(Qo||(Qo=ds`<button class="menu-icon" @click=${0} aria-label="Toggle sidebar">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
                </button>`),this._toggleMenu):er(Yo||(Yo=ds``)),(null==t?void 0:t.name)||"HiveFW",(null==t?void 0:t.name)||"HiveFW",t&&null!==this._getNodeStatus(t)?er(Jo||(Jo=ds`
                  <span class="connection-status ${0}">
                    <span class="status-dot ${0}"></span>
                    ${0}
                  </span>`),"online"===this._getNodeStatus(t)?"online":"offline","online"===this._getNodeStatus(t)?"online":"offline","online"===this._getNodeStatus(t)?"Ligado":"Desligado"):er(Zo||(Zo=ds``)),t&&null!==this._getBatteryLevel(t)?er(es||(es=ds`
                  <span class="battery-indicator">
                    <span class="battery-icon">
                      <span class="battery-fill ${0}"
                            style="width: ${0}%"></span>
                    </span>
                    <span class="battery-pct">${0}%</span>
                  </span>`),this._getBatteryLevel(t)>50?"high":this._getBatteryLevel(t)>20?"medium":"low",this._getBatteryLevel(t),this._getBatteryLevel(t)):er(ts||(ts=ds``)),this._error?er(is||(is=ds`<div class="error-banner">${0}</div>`),this._error):er(as||(as=ds``)),"state"===this._activeTab?"active":"",()=>this._activeTab="state","chat"===this._activeTab?"active":"",()=>this._activeTab="chat","network"===this._activeTab?"active":"",()=>this._activeTab="network","settings"===this._activeTab?"active":"",()=>this._activeTab="settings",this._renderActivePage(),this._traceDialogOpen,this._traceDialogContactName,this._traceDialogResult,this._traceDialogError,this._contacts.filter(e=>2===e.type||3===e.type||4===e.type),this._traceDialogTargetContact,this._onTraceRequested,()=>{this._traceDialogOpen=!1},this._targetPickerOpen,this._contacts,this._onTargetPicked,()=>{this._targetPickerOpen=!1})}_renderActivePage(){switch(this._activeTab){case"chat":return er(os||(os=ds`
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
            @mark-all-read-requested=${0}></hivefw-integration-page>`),this.hass,this._config,[...this._channels,...this._contacts.filter(e=>e.added_to_node)],this._unread,this._pendingChatTarget,this.narrow,this._onActiveEntityChanged,()=>this._loadDeviceData(),()=>this._loadDeviceData(),()=>this._refreshChannelsFromRadio(),this._handleMarkAllReadRequested);case"network":return er(ss||(ss=ds``));case"state":return er(rs||(rs=ds`
          <meshcore-status-page
            .hass=${0}
            .config=${0}
            .selectedDevice=${0}
            .knownNodeCount=${0}
            .contactCount=${0}
            .channelCount=${0}
            .narrow=${0}
            @companion-trace-requested=${0}></meshcore-status-page>`),this.hass,this._config,this._selectedDevice,this._contacts.length,this._contacts.filter(e=>e.added_to_node).length,this._channels.length,this.narrow,this._onCompanionTraceRequested);case"settings":return er(ns||(ns=ds`
          <meshcore-settings-page
            .hass=${0}
            .config=${0}
            .selectedDevice=${0}
            .contactCount=${0}
            .channelCount=${0}
            .narrow=${0}
            @companion-trace-requested=${0}
            @device-renamed=${0}></meshcore-settings-page>`),this.hass,this._config,this._selectedDevice,this._contacts.length,this._channels.length,this.narrow,this._onCompanionTraceRequested,this._onDeviceRenamed)}}_toggleMenu(){this.dispatchEvent(new Event("hass-toggle-menu",{bubbles:!0,composed:!0}))}_deviceEntitySuffix(e){return{prefix:(e.pubkey_prefix||e.pubkey||"").substring(0,6).toLowerCase(),name:(e.name||"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,"")}}_getNodeStatus(e){if(!this.hass)return null;const{prefix:t,name:i}=this._deviceEntitySuffix(e),a=`sensor.hivefw_${t}_node_status_${i}`,o=this.hass.states[a];return o?o.state:null}_getBatteryLevel(e){if(!this.hass)return null;const{prefix:t,name:i}=this._deviceEntitySuffix(e),a=`sensor.hivefw_${t}_battery_percentage_${i}`,o=this.hass.states[a];if(!o||"unknown"===o.state||"unavailable"===o.state)return null;const s=parseFloat(o.state);return isNaN(s)?null:Math.round(s)}async _loadData(){if(this.hass&&!this._loadingStarted){this._loadingStarted=!0,this._loading=!0,this._error=null;try{var e;const t=await Ir(this.hass);if(this._devices=t,0===t.length)return this._error="No HiveFW devices found",void(this._loading=!1);const i=t.find(e=>e.connected);this._selectedEntryId=(i||t[0]).entry_id;const a=i||t[0];this._config={node_name:a.name,node_prefix:(null===(e=a.pubkey_prefix)||void 0===e?void 0:e.substring(0,6))||"",entry_id:a.entry_id,...Tr,...zr},await this._loadDeviceData(),await this._loadUnreadCounts()}catch(e){const t=e instanceof Error?e.message:String(e);this._error=`Failed to load: ${t}`,console.error("HiveFW panel load error:",e)}finally{this._loading=!1}}}async _refreshChannelsFromRadio(){if(this.hass&&this._selectedEntryId)try{const e=await async function(e,t){const i={type:"hivefw_integration/refresh_channels"};return t&&(i.entry_id=t),e.callWS(i)}(this.hass,this._selectedEntryId);await this._loadDeviceData(),console.info(`HiveFW channels refreshed: ${e.configured_channels}/${e.max_channels}`)}catch(e){console.error("Failed to refresh channels from radio:",e)}}async _loadDeviceData(){if(this.hass&&this._selectedEntryId)try{const[t,i]=await Promise.all([Nr(this.hass,this._selectedEntryId),Fr(this.hass,this._selectedEntryId)]);this._contacts=t,this._channels=i;const a=this._selectedDevice;var e;a&&this._config&&(this._config={...this._config,node_name:a.name,node_prefix:(null===(e=a.pubkey_prefix)||void 0===e?void 0:e.substring(0,6))||"",entry_id:a.entry_id})}catch(e){console.error("Failed to load device data:",e)}}_onActiveEntityChanged(e){var t;this._activeChatEntityId=(null===(t=e.detail)||void 0===t?void 0:t.entityId)||null}async _onDeviceRenamed(){if(this.hass)try{this._devices=await Ir(this.hass);const t=this._selectedDevice;var e;t&&this._config&&(this._config={...this._config,node_name:t.name,node_prefix:(null===(e=t.pubkey_prefix)||void 0===e?void 0:e.substring(0,6))||"",entry_id:t.entry_id})}catch(e){console.error("Failed to refresh devices after rename:",e)}}async _loadUnreadCounts(){if(this.hass)try{const e=await async function(e,t){try{const i={type:"hivefw_integration/get_unread_counts"};t&&(i.entry_id=t);const a=await e.callWS(i);return{unread:a.unread||{},last_read:a.last_read||{}}}catch(e){return{unread:{},last_read:{}}}}(this.hass,this._selectedEntryId||void 0);this._unread.ingestBackendData(e,this._activeChatEntityId)}catch(e){}}_handleMarkReadRequested(e){e&&this.hass&&(jr(this.hass,e,this._selectedEntryId||void 0).catch(()=>{}),this._unread.clearEntity(e),this._loadUnreadCounts())}async _handleMarkAllReadRequested(){var e,t,i;if(!this.hass)return;const a=Object.entries(this._unread.counts).filter(([e,t])=>Boolean(e)&&Number(t)>0);if(0===a.length)return;for(const[e]of a)this._unread.clearEntity(e);const o=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector("hivefw-integration-page");await(null==o||null===(t=o.scrollCurrentConversationToLatest)||void 0===t?void 0:t.call(o));const s=this._selectedEntryId||void 0;await Promise.allSettled(a.map(([e])=>jr(this.hass,e,s))),await this._loadUnreadCounts(),await(null==o||null===(i=o.scrollCurrentConversationToLatest)||void 0===i?void 0:i.call(o))}async _handleNodeAction(e){const{action:t,node:i}=e.detail;if(!this.hass||!i)return;const a=i.public_key||"",o=i.pubkey_prefix||"",s=this._selectedEntryId||void 0;switch(t){case"message":o&&(this._pendingChatTarget=o,this._activeTab="chat");break;case"remove-contact":if(a)try{await qr(this.hass,a,s),await this._loadDeviceData()}finally{}break;case"add-contact":if(a)try{await Ur(this.hass,a,i.adv_name||void 0,s),await this._loadDeviceData()}finally{}break;case"trace":o&&(this._traceDialogPubkeyPrefix=o,this._traceDialogEntryId=s,this._traceDialogContactName=i.adv_name||o,this._traceDialogTargetContact="adv_name"in i?i:null,this._traceDialogResult=null,this._traceDialogError="",this._traceDialogOpen=!0);break;case"delete":case"remove":a&&(await qr(this.hass,a,s),await this._loadDeviceData());break;default:console.warn("Unhandled node action:",t)}}};Dn.styles=[Cr,ms(ls||(ls=ds`
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
    `))],cs([kr({type:Object})],Dn.prototype,"hass",void 0),cs([kr({type:Boolean,reflect:!0})],Dn.prototype,"narrow",void 0),cs([kr({type:Object})],Dn.prototype,"panel",void 0),cs([Sr()],Dn.prototype,"_config",void 0),cs([Sr()],Dn.prototype,"_activeTab",void 0),cs([Sr()],Dn.prototype,"_devices",void 0),cs([Sr()],Dn.prototype,"_contacts",void 0),cs([Sr()],Dn.prototype,"_channels",void 0),cs([Sr()],Dn.prototype,"_selectedEntryId",void 0),cs([Sr()],Dn.prototype,"_loading",void 0),cs([Sr()],Dn.prototype,"_loadingStarted",void 0),cs([Sr()],Dn.prototype,"_error",void 0),cs([Sr()],Dn.prototype,"_unsubscribeList",void 0),cs([Sr()],Dn.prototype,"_pendingChatTarget",void 0),cs([Sr()],Dn.prototype,"_deviceDropdownOpen",void 0),cs([Sr()],Dn.prototype,"_traceDialogOpen",void 0),cs([Sr()],Dn.prototype,"_traceDialogContactName",void 0),cs([Sr()],Dn.prototype,"_traceDialogResult",void 0),cs([Sr()],Dn.prototype,"_traceDialogError",void 0),cs([Sr()],Dn.prototype,"_traceDialogPubkeyPrefix",void 0),cs([Sr()],Dn.prototype,"_traceDialogEntryId",void 0),cs([Sr()],Dn.prototype,"_traceDialogTargetContact",void 0),cs([Sr()],Dn.prototype,"_targetPickerOpen",void 0),cs([Sr()],Dn.prototype,"_pendingTraceEntryId",void 0),Dn=cs([xr("hivefw-integration-panel")],Dn);export{Dn as MeshCorePanel};
