"use strict";(()=>{async function k(t){return new Promise((e,n)=>{$.ajax({url:t.url,type:t.method,data:t.body,dataType:"jsonp",success:o=>{e(o)},error:(o,r,a)=>{n(a instanceof Error?a:new Error(a))}})})}function j(t,e){let n=t["data.name_id"];t&&n&&e?.push(["name_id",n.toString()])}function q(t){if(typeof t["data.redirect_url"]=="string"){let e=new URL(t["data.redirect_url"]);window.location.href=e.href}else console.error("Invalid redirect URL provided in Profundo response.")}var C=(t,{parentKey:e=""}={})=>{let n={};return Object.keys(t).forEach(o=>{let r=t[o],a=e?`${e}.${o}`:o;typeof r=="object"&&r!==null&&!Array.isArray(r)?Object.assign(n,C(r,{parentKey:a})):n[a]=r}),n};function Ft(){let t=localStorage.getItem("crm_data");return t?JSON.parse(t):(localStorage.removeItem("crm_data"),{})}function N(t){let e=C(Ft());Object.keys(e).length!==0&&j(e,t)}function v(t){let e=C(t);q(e)}function I(t){return typeof t=="object"&&t.hasOwnProperty("count")&&typeof t.count=="number"&&t.hasOwnProperty("name")&&typeof t.name=="string"}async function A(t,e){let n={method:t.method,headers:t.headers,body:t.body},o=e?.waitForResponse?.toLowerCase()!=="false",r=Number(e?.waitForResponseDelay)||500;try{if(t.dataType==="jsonp")return await k(t);if(!o)return"keepalive"in new Request("")?await fetch(t.url,{...n,keepalive:!0}):(console.warn("Using sendBeacon..."),navigator.sendBeacon(t.url,n.body)),new Promise(s=>setTimeout(s,r));let a=await fetch(t.url,n);if(!a.ok)throw new Error(`Error fetching ${t.url}: ${a.statusText}`);return a.headers.get("Content-Type")?.includes("application/json")?await a.json():await a.text()}catch(a){throw console.error(a),a}}var f={apiUrl:document.currentScript?.getAttribute("api-url")??atob("aHR0cHM6Ly91dGlscy1hcGkudmVyY2VsLmFwcC9hcGkv"),counterPath:"counter/",jsDelivrUrl:"https://data.jsdelivr.com/v1/packages/gh/ageraplattformen/agera.js/resolved?specifier=latest",wfSiteId:document.querySelector("html")?.dataset.wfSite??"0000",postalCodeUrl:atob("aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2FnZXJhcGxhdHRmb3JtZW4vanMtbW9kdWxlc0BtYWluL3ppcC8=")},p={method:"POST",headers:{"Content-Type":"application/json"},critical:!0,waitForResponse:!0};async function B(t,e,n,o,r,a,i){let s=new URL("fcrm/",f.apiUrl).toString();i?.waitForResponse||(i={...i,waitForResponse:"false"});let c={method:a.toUpperCase(),headers:{"Content-Type":"application/json"},url:s,body:JSON.stringify({crm:t,...e?{client:e}:{},crm_endpoint:n["data-crm-endpoint"]||"",attributes:n,response:r?JSON.parse(r):{},body:o?{...Object.fromEntries(o)}:{},...x.size>0?{query_params:{...Object.fromEntries(x)}}:{},source:window.location.href,...E?{...E}:{}})};return A(c,i)}function V(){let t=localStorage.getItem("crm_data")||"{}",e=[...document.querySelectorAll("[data-crm-patch]"),...document.querySelectorAll("[data-profundo-client]")];if(e.length===0)return;async function n(o){let r=o.currentTarget,a=r.getAttribute("data-crm-patch")??(r.getAttribute("data-profundo-client")?"profundo":""),i=r.getAttribute("data-client")??r.getAttribute("data-profundo-client")??"",s=r.getAttribute("data-crm-patch-method")??"POST",c={};[...r.attributes].forEach(m=>{m.name.startsWith("data-")&&(c[m.name]=m.value)});let l=document.querySelector("[data-load-petition]")??r.closest("form")??null,u=l?new FormData(l):new FormData;if(!R.hasOwnProperty(a)){let m=await B(a,i,c,u,t,s,l?.dataset);m&&(localStorage.setItem("crm_data",JSON.stringify(m)),v(m));return}a==="djurensratt"&&l&&await J(l,c,t)}e.forEach(o=>{o.addEventListener("click",r=>{try{n(r).then(()=>{}).catch(a=>{console.error("Error handling patch:",a)})}catch(a){console.error("Error handling patch:",a)}}),o.style.cursor="pointer"})}function z(t,e){let n=new FormData;for(let[o,r]of new FormData(t))e.hasOwnProperty(o)?n.append(e[o],r):n.append(o,r);return n}var x=new URLSearchParams(window.location.search);function Dt(){function t(n){let o=[...x.keys()].find(r=>r.toLowerCase().includes(n));return o?x.get(o)??"":""}return{source:t("source").toLowerCase(),campaign:t("campaign").toLowerCase(),medium:t("medium").toLowerCase(),content:t("content").toLowerCase()}}var w=Dt(),y=Array.from(x,([t,e])=>`${t.toLowerCase()}: ${e.toLowerCase()}`).join(", "),E={utms:{...w.campaign?{utm_campaign:w.campaign}:{},...w.source?{utm_source:w.source}:{},...w.medium?{utm_medium:w.medium}:{},...w.content?{utm_content:w.content}:{}}};function W(t){let e=new FormData(t),n=[],o=[],r={};for(let[a,i]of e.entries())a.startsWith("tags")?n.push(i):a.startsWith("language")?o.push(i):["given-name","family-name","email","tel","postal-code","street-address","address-level2","country"].includes(a)||(r[a]=i);return{...p,url:t.getAttribute("action")??"",body:JSON.stringify({person:{given_name:e.get("given-name"),family_name:e.get("family-name"),email_addresses:[{address:e.get("email")}],phone_numbers:[{number:e.get("tel")??""}],postal_addresses:[{postal_code:e.get("postal-code")??"",address_lines:e.get("street-address")??"",region:e.get("adress-level2")??"",country:e.get("country")??""}]},add_tags:[...n],"action_network:referrer_data":{source:w.source?w.source.toString():"",website:window.location.hostname+window.location.pathname},languages_spoken:[...o],custom_fields:r})}}function Z(t){let e=t?.getAttribute("data-country-code")||"";return{...p,url:new URL("amnesty/",f.apiUrl).toString(),body:JSON.stringify({form:{...Object.fromEntries(new FormData(t)),action_id:t.dataset.actionId||"9999",sign_method:t.dataset.signMethod||"agera-default"},UTM:y,site_id:f.wfSiteId,source:window.location.href,...e?{country_code:e}:{}})}}function P(t,e=!1,n,o){let r=new FormData(t),a="data-action-id",i=t.getAttribute(a)||"No ActionID Provided",s=atob("aHR0cHM6Ly9hY3QuZGp1cmVuc3JhdHQuc2UvcmVmb3JtLXNvY2lldHkvYXBpLw==");if(e){let l=JSON.parse(o||"{}"),u=!!(n&&n["data-recruit-me"]==="true");return{...p,url:s+"update",body:JSON.stringify({partId:l.partId||"",recruitMe:u,signature:{actionId:n&&n[a]||"No ActionID Provided",source:y?y:"reform-campaign"}})}}let c=!!r.get("updates");return{...p,url:s+"register",body:JSON.stringify({person:{first:r.get("given-name")||"",last:r.get("family-name")||"",email:r.get("email")||"",mobile:r.get("tel")||""},acquisition:{actionId:i?i.toString():"",source:y?y:"",marketingPermission:c}})}}async function J(t,e,n){async function o(r){try{let a=await fetch(r.url,{method:r.method,headers:r.headers,body:r.body,keepalive:!0});if(!a.ok)throw new Error(`Request failed with status ${a.status}`);await a.json()}catch(a){throw a}}await o(P(t,!0,e,n))}function Q(t){let e=new FormData(t),n={};return t&&Array.from(t.attributes).forEach(r=>{r.name.startsWith("data-")&&(n[r.name]=r.value)}),{...p,url:new URL("fcrm/",f.apiUrl).toString(),body:JSON.stringify({crm:t?.dataset.crm??"",...t?.dataset.client?{client:t.dataset.client}:{},...t?.dataset.crmEndpoint||t?.action?{crm_endpoint:t?.dataset.crmEndpoint??t?.action}:{},body:{...Object.fromEntries(e)},...E?{...E}:{},...x.size>0?{query_params:{...Object.fromEntries(x)}}:{},source:window.location.href,...n?{attributes:{...n}}:{}})}}function G(t){let n=z(t,{"given-name":"FNAME","family-name":"LNAME",email:"EMAIL",tel:"PHONE","street-adress":"ADDRESS","postal-code":"POSTALCODE","adress-level2":"REGION",country:"COUNTRY"}),o=t?.getAttribute("data-mailchimp-tags")||"";o!==""&&n.append("tags",o);let r=new URLSearchParams;for(let[a,i]of n.entries())(typeof i=="string"||typeof i=="number")&&r.append(a,i.toString());return r.append("UTM",y),{...p,url:t.getAttribute("action")?.replace("post?","post-json?")+"&c=?",headers:{"Content-Type":"application/x-www-form-urlencoded"},dataType:"jsonp",body:r.toString()}}function K(t){let e=new URL(document.querySelector("html")?.dataset.wfSite??"0000","https://webflow.com/api/v1/form/"),n=new FormData(t);n.append("UTM",y);let o=new URLSearchParams({name:t?.getAttribute("name")??"form",source:window.location.href});for(let r of n.entries()){let a=`fields[${r[0]}]`;o.append(a,r[1])}return{...p,url:e.href,headers:{"Content-Type":"application/x-www-form-urlencoded"},body:o.toString()}}function Y(t){return{...p,url:t.getAttribute("action")||"",body:JSON.stringify({[t.getAttribute("name")||"form"]:Object.fromEntries(new FormData(t)),source:window.location.href,time:new Date().toISOString(),UTM:y})}}var R={actionnetwork:W,amnesty:Z,djurensratt:P,mailchimp:G,webflow:K,zapier:Y,none:""};async function X(t,e,n){try{let o=e.dataset,r=await Promise.allSettled(t.map(i=>A(i,o)));r.some((i,s)=>i.status==="rejected"&&t[s].critical)?F(!1,!1,e,n):(Ot(r),F(!0,!0,e,n))}catch(o){console.error("Error in Promise.allSettled:",o),F(!1,!1,e,n)}}function Ot(t){let e=[];if(t.forEach((n,o)=>{if(n.status==="fulfilled"&&n.value!==null){let r=n.value;if(typeof n.value=="object"&&!I(r)){let a=n.value;e.push(a)}else typeof n.value=="string"&&e.push({[o.toString()]:n.value})}}),e.length>0){let n={};e.forEach(o=>{Object.assign(n,o)}),localStorage.setItem("crm_data",JSON.stringify(n)),v(n)}}function F(t,e,n,o){let r=n.parentNode,a=r?.querySelector(".w-form-done"),i=r?.querySelector(".w-form-fail");t?(a?.style.setProperty("display","block"),i?.style.setProperty("display","none"),e&&_t(n,o)):(a?.style.setProperty("display","none"),i?.style.setProperty("display","block"),o.submitButton&&(o.submitButton.value=o.submitText))}function _t(t,e){let n=t.getAttribute("redirect")??null;if(n)if(e.addUtm){let o=new URL(n,e.thisUrl),r=new URLSearchParams(window.location.search);o.searchParams.forEach((i,s)=>{r.has(s)||r.set(s,i)});let a=o.origin+o.pathname+(r.toString()?`?${r.toString()}`:"");window.location.href=a}else window.location.href=n;else t.style.display="none",console.warn("No redirect defined")}function tt(t){let e=/^data-counter(\d+)?-update$/;return Array.from(t.attributes).filter(o=>e.test(o.name)).map(o=>{let r=o.name.match(/\d+/),a=r?r[0]:null,i=o.value,s=`data-counter${a||""}-add-amount`,c=t.querySelector(`[${s}]`),l=c?Number(c.value||c.getAttribute(s)):null;return kt(i,t,l)})}function kt(t,e,n){let o=new FormData(e);return{...p,critical:!1,url:new URL(f.counterPath+t,f.apiUrl).toString(),body:JSON.stringify({form:"default",site_id:f.wfSiteId,last_person:o.get("given-name")||"",form_url:window.location.href,...n?{add_amount:n}:{}})}}function et(t){let e={thisUrl:new URL(window.location.href),addUtm:t.dataset.redirectUtm??!0,submitButton:t.querySelector('input[type="submit"]'),submitText:t.querySelector('input[type="submit"]')?.value??""};async function n(o){o.preventDefault(),o.stopPropagation(),e.submitButton&&(e.submitButton.value=e.submitButton.dataset.wait??e.submitButton.value);let r=[],a=t.dataset.crm?.toLowerCase()??"webflow";if(a!=="none"){let i=R[a]??Q;r.push(i(t))}r.push(...tt(t)),r.length&&await X(r,t,e)}t.addEventListener("submit",o=>{o.preventDefault(),n(o).catch(r=>console.error(r))})}function rt(){document.querySelectorAll("[data-crm]").forEach(e=>{et(e)})}var D=class{constructor(){this.counters=new Map}async getCounter(e){if(this.counters.has(e))return this.counters.get(e);let n=new URL(f.counterPath+e,f.apiUrl),o=(async()=>{try{let a=await fetch(n);if(!a.ok)throw new Error("Error fetching counter data");return await a.json()}catch(a){throw new Error("Error fetching counter data: "+String(a))}})();this.counters.set(e,o);let r=await o;return this.counters.delete(e),r}},T=new D;async function ot(){try{let t=await fetch(f.jsDelivrUrl);if(!t.ok)return"latest";let e=await t.json();return e?.version?`v${e.version}`:"latest"}catch(t){return console.error(t),"latest"}}function H(t){t&&t.classList.contains("cloak")&&t.classList.remove("cloak")}function nt(){{let t=`.cloak { 
			opacity: 0;
			height: 0px;
      overflow: hidden;
			margin: 0;
      padding-top: 0;
      padding-bottom: 0;
		}`,e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}}function jt(){function t(s,c){return s>=c?100:Math.round(s/c*100)}function e(s){let c={350:50,500:100,2e3:250,5e3:500,2e4:2500,5e4:5e3,1e5:1e4,2e5:25e3,5e5:5e4,1e6:1e5},l=25e4,m=Object.keys(c).map(Number).find(g=>g>=s),d=m?c[m]:l;return Math.ceil(s*1.05/d)*d}function n(s,c){return s*1.05<c.target||!c.autoTarget?c.target:e(s)}function o(s,c,l){s.style.width=t(c,l)+"%"}function r(s,c,l){try{let u=new Intl.NumberFormat(l.locale,l.notation).format(c);s.textContent=u}catch{l.notation.useGrouping=!1,l.notation.notation="standard";let u=new Intl.NumberFormat(void 0,l.notation).format(c);s.textContent=u}}function a(s,c,l){c<=l.removeBelow&&(s.style.display="none"),c>=l.hideBelow&&(s.style.opacity="1")}async function i(s){let c=s.dataset.counterName||"default",l={target:parseInt(s.dataset.counterTarget||"0",10),hideBelow:parseInt(s.dataset.counterHideBelow||"0"),removeBelow:parseInt(s.dataset.counterRemoveBelow||"0"),autoTarget:!!s.dataset.counterAutoTarget||!0,locale:s.dataset.counterLocale||document.documentElement.lang||"undefined",notation:{notation:s.dataset.counterNotation?.toLowerCase()||"standard",useGrouping:!0}},u;if(c.toLowerCase()==="default")u=125;else{let h=await T.getCounter(c);h?(u=h.count,(typeof window.agera!="object"||window.agera===null)&&(window.agera={counterValues:{}}),window.agera.counterValues[c]=u):u=0}if(s.classList.contains("counter-current-value"))r(s,u,l),a(s,u,l);else{let h=s.querySelectorAll(".counter-current-value");for(let S of h)r(S,u,l),a(S,u,l)}let m=n(u,l),d=s.querySelectorAll(".counter-target-value");for(let h of d)r(h,m,l),a(h,u,l);let g=s.querySelectorAll(".counterbar-limiter");for(let h of g)o(h,u,m);a(s,u,l)}return{processCounterElement:i}}function at(){let t=`
      .counter-target-value,
      .counter-current-value,
      .counter_container {
          opacity: 0;
          transition: opacity 0.7s;
      }
  `,e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}function st(){let t=document.querySelectorAll("[data-counter-name]"),e=jt();for(let n of t)e.processCounterElement(n)}var O=(t,e=!0)=>t.cloneNode(e);function it(){let t=document.querySelectorAll("[data-counter-name]"),n=Array.from(t).find(s=>s.dataset.counterLocale)?.dataset.counterLocale??(document.documentElement.lang||"en");n.toLowerCase()==="none"&&(n=document.documentElement.lang||"en");function o(s,c){let l=O(c),u=l.querySelector('[data-template="last-person-name"]'),m=l.querySelector('[data-template="last-person-time"]');return u&&m&&(u.innerText=s.name,m.innerText=r(s.date,n)),l}function r(s,c){let l=new Date,u=new Date(s),m=new Date(u.getTime()-u.getTimezoneOffset()*6e4),d=Math.floor((l.getTime()-m.getTime())/1e3),g=new Intl.RelativeTimeFormat(c,{numeric:"auto"});if(d<60)return g.format(-d,"second");let h=Math.floor(d/60);if(h<60)return g.format(-h,"minute");let S=Math.floor(d/3600);if(S<12)return g.format(-S,"hour");let Pt=Math.floor(d/86400);return g.format(-Pt,"day")}function a(s){let c=s.last_person.names;return c.reverse(),c.filter((u,m,d)=>d.findIndex(g=>g.name===u.name)===m)}async function i(s,c){let l=c.querySelector('[data-template="last-person"]');if(!l)return;let u=l.parentElement;l.remove();let m=await T.getCounter(s);if(!m||!m.last_person?.names||m.last_person.names.length<2){u?.remove();return}let g=a(m).map(h=>o(h,l));g.length>0&&u&&(H(u),u.append(...g)),g.forEach(h=>{setTimeout(function(){H(h)},100)})}t.forEach(s=>{let c=s.dataset.counterName??"default";i(c,s)})}function L(t){return JSON.parse(localStorage.getItem(t)??"{}")}function ct(){let t="data-clear-localstorage",e=document.querySelector(`[${t}]`)?.getAttribute(t);e?.toLowerCase()==="all"?(console.log("Clearing all local storage"),localStorage.clear()):e&&(console.log("Clearing local storage key:",e),localStorage.removeItem(e))}function lt(){function t(r){let a=L("forwardedform");N(Object.entries(a));function i(l){let u=Array.from(new URLSearchParams(window.location.search),([m,d])=>`${m}: ${d}`).join(", ");return l.utm=u,l}let s=i(a);function c(l){Object.entries(l).forEach(([u,m])=>{let d=document.createTextNode(m).textContent,g=`<input type="hidden" id="${u}" name="${u}" value="${d}">`;r.insertAdjacentHTML("afterbegin",g)})}c(s)}function e(r){let a=new URLSearchParams(window.location.search),i=Array.from(a,([l,u])=>`${l}: ${u}`),s=r.getAttribute("redirect");if(s){let l=s+(s?.includes("?")?"&":"?")+a.toString();r.setAttribute("redirect",l),r.setAttribute("data-redirect",l)}r.addEventListener("change",()=>{c(r)}),r.addEventListener("input",()=>{c(r)}),window.addEventListener("beforeunload",()=>{c(r)});function c(l){if(l instanceof HTMLFormElement){let u=new FormData(l),m=i.join(", ");u.set("utm",m),localStorage.setItem("forwardedform",JSON.stringify(Object.fromEntries(u)))}}}let n=document.querySelectorAll("[data-crm]");n.length>0&&n.forEach(function(r){e(r)});let o=document.querySelectorAll('[data-load-petition="true"]');o.length>0&&o.forEach(function(r){t(r)})}function ut(){let t=document.querySelector("form[data-auto-submit]");if(t&&t.getAttribute("data-auto-submit")?.toLowerCase()==="true"){if(!t.checkValidity()){console.warn("Form validation failed.");return}let e=new Event("submit",{bubbles:!0,cancelable:!0});t.dispatchEvent(e)}}function mt(){document.querySelectorAll("[data-copy]").forEach(e=>{e.addEventListener("mouseover",function(){e.style.cursor="pointer"}),e.addEventListener("click",async function(){let n="",o=e.getAttribute("data-copy")||"";if(o?.toLowerCase()==="url")n=window.location.href;else if(o?.toLowerCase()==="prev-url")n=document.referrer||"";else{let r=document.getElementById(o);r?.textContent?n=r.textContent:n=o||""}try{await navigator.clipboard.writeText(n),console.log("Copied to clipboard:",n.toString())}catch(r){console.error("Failed to copy: ",r)}})})}async function dt(){let t=document.querySelectorAll("[data-js-version]");if(t.length<1)return;let e=document.querySelector('script[src$="agera.js"]'),n="";if(e){let{src:o}=e,r=/@([^/]+)/.exec(o);if(r){let[,a]=r;n=a,n.toLowerCase().includes("latest")&&(n=await ot())}}n!==""&&t.forEach(o=>{o.innerText=n})}function ft(){document.querySelectorAll("[data-hide-if-data], [data-show-if-data]").forEach(t=>{let e=t.getAttribute("data-hide-if-data")??t.getAttribute("data-show-if-data");if(!e)return;let n=!!t.getAttribute("data-hide-if-data"),o=e?new URLSearchParams(window.location.search).get(e)??"":"",r=e&&L("forwardedform")[e]||"",a=!!(o||r);t.style.display=n===a?"none":""})}function pt(){let t=document.querySelectorAll("a[href]"),e=new URLSearchParams(window.location.search);t.forEach(n=>{if(!n.href.includes("#")){let o=new URL(n.href,window.location.href);o.searchParams.forEach((a,i)=>{e.has(i)||e.append(i,a)});let r=e.toString();n.href+=`${o.search?"&":"?"}${r}${o.hash}`}})}var gt="data-insert-name";function Jt(t,e){let n="",o=["first_name","first-name","firstname","fn","first","fname","f-name","n","given_name","given-name","givenname","gn","g-n","given"];[...Object.entries(t),...Array.from(e.entries())].forEach(([a,i])=>{o.includes(a.toLowerCase())&&(n=i)});let r=document.querySelectorAll(`[${gt}]`);r.length>0&&n!==""&&zt(r,n)}function zt(t,e){let n={"no-space":e,"leading-space":"&nbsp;"+e,"trailing-space":e+"&nbsp;","double-space":"&nbsp;"+e+"&nbsp;","":"&nbsp;"+e};t.forEach(o=>{let r=o.getAttribute(gt)||"leading-space";n.hasOwnProperty(r)&&(o.innerHTML=n[r])})}function ht(){let t=L("forwardedform"),e=new URLSearchParams(window.location.search);Jt(t,e)}var _=typeof Buffer=="function",yt=typeof TextDecoder=="function"?new TextDecoder:void 0,Yr=typeof TextEncoder=="function"?new TextEncoder:void 0,Zt="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",Qt=Array.prototype.slice.call(Zt),U=(t=>{let e={};return t.forEach((n,o)=>e[n]=o),e})(Qt),Gt=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,b=String.fromCharCode.bind(String),wt=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):t=>new Uint8Array(Array.prototype.slice.call(t,0));var xt=t=>t.replace(/[^A-Za-z0-9\+\/]/g,"");var Kt=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,Yt=t=>{switch(t.length){case 4:var e=(7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3),n=e-65536;return b((n>>>10)+55296)+b((n&1023)+56320);case 3:return b((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return b((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},Xt=t=>t.replace(Kt,Yt),te=t=>{if(t=t.replace(/\s+/g,""),!Gt.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(t.length&3));let e,n="",o,r;for(let a=0;a<t.length;)e=U[t.charAt(a++)]<<18|U[t.charAt(a++)]<<12|(o=U[t.charAt(a++)])<<6|(r=U[t.charAt(a++)]),n+=o===64?b(e>>16&255):r===64?b(e>>16&255,e>>8&255):b(e>>16&255,e>>8&255,e&255);return n},bt=typeof atob=="function"?t=>atob(xt(t)):_?t=>Buffer.from(t,"base64").toString("binary"):te,ee=_?t=>wt(Buffer.from(t,"base64")):t=>wt(bt(t).split("").map(e=>e.charCodeAt(0)));var re=_?t=>Buffer.from(t,"base64").toString("utf8"):yt?t=>yt.decode(ee(t)):t=>Xt(bt(t)),oe=t=>xt(t.replace(/[-_]/g,e=>e=="-"?"+":"/")),Et=t=>re(oe(t));function Lt(){document.querySelectorAll("[data-insert-query]").forEach(e=>{let n=e.getAttribute("data-insert-query");if(n){let o=new URLSearchParams(window.location.search).get(n);o!==null&&(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement?e.value=o.toString():e.textContent=o.toString())}})}function St(){document.querySelectorAll("[data-insert-b64-query]").forEach(e=>{let n=e.getAttribute("data-insert-b64-query");if(n){let o=Et(new URLSearchParams(window.location.search).get(n)??"");o&&(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement?e.value=o.toString():e.textContent=o.toString())}})}var M={DK:/^\d{4}$/,FI:/^(FI-|AX-)?\d{5}$/,NO:/^\d{4}$/,SE:/^(SE-)?\d{3}[ ]?\d{2}$/};function Ct(){async function t(o){let r=`${f.postalCodeUrl}${o}.js`;if(!M.hasOwnProperty(o))throw new Error("Unsupported country code");return(await import(r))[o]}async function e(o){if(!(o.getAttribute("data-postalcode-place-autofill")?.toLowerCase()==="true"))return;let a=o.querySelector('[name="postal-code"]'),i=o.querySelector('[name="address-level2"]'),s=o.dataset.countryCode?.toUpperCase()??"";if(!i||!a||s===""||!M.hasOwnProperty(s)){console.error("Postal code input, city output, or supported country not found");return}try{let c=await t(s),l=!1;i.addEventListener("input",()=>{l=!0}),a.addEventListener("input",()=>{let u=a.value.replaceAll(" ",""),m=M[s];u.length>3&&m.test(u)&&!l&&(i.value=c[u]||i.value)})}catch(c){console.error("Error loading postal codes:",c)}}async function n(){let o=document.querySelectorAll("[data-postalcode-place-autofill]");for(let r of o)await e(r)}n().catch(o=>{console.error("Postcode Place Autofill Error:",o)})}function vt(){let t=new URLSearchParams(window.location.search);document.querySelectorAll("[data-redirect]").forEach(n=>{let o=n.getAttribute("data-redirect");try{if(o){let r=new URL(o,document.baseURI),a=new URL(r.toString()),i=a.searchParams;t.forEach((s,c)=>{i.has(c)||i.set(c,s)}),n.setAttribute("data-redirect",a.toString())}}catch(r){console.error("An error occurred:",r)}})}function At(){Object.entries({"[data-share-whatsapp-text]":e=>`https://wa.me/?text=${encodeURIComponent(e)}`,"[data-share-facebook-url]":e=>`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(e)}`,"[data-share-linkedin-url]":e=>`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(e)}`,"[data-share-twitter-text]":e=>`https://twitter.com/intent/tweet?text=${encodeURIComponent(e)}`,"[data-share-email-subject], [data-share-email-body]":(e,n)=>`mailto:?subject=${encodeURIComponent(e)}&body=${encodeURIComponent(n)}`}).forEach(([e,n])=>{document.querySelectorAll(e).forEach(o=>{o.addEventListener("click",r=>{r.preventDefault();let a=e.includes("email"),i=o.getAttribute(a?"data-share-email-subject":e.slice(1,-1))??"",s=a?o.getAttribute("data-share-email-body")??"":"",c=n(i,s);window.open(c,a?"_self":"_blank")})})})}function Rt(){let t=document.querySelectorAll("*"),e=[],n=!0;if(t.forEach(o=>{let{attributes:r}=o;for(let a=0;a<r.length;a++){let i=r[a];i.name.startsWith("data-splitter-url")?e.push(i.value):i.name==="data-splitter-keep-query"&&i.value==="false"&&(n=!1)}}),e.length){let o=e[Math.floor(Math.random()*e.length)],r=window.location,a=n?new URL(o,r.origin).href+r.search:o;window.location.href=a}}function Tt(){let t=[document.documentElement.lang||"en","en"];document.querySelectorAll("[data-insert-time]").forEach(o=>{o.innerText=le(o,t)}),document.querySelectorAll("[data-remaining-days-to]").forEach(o=>{o.innerText=ue(o,t)})}function le(t,e){let n=new Date,o=t.getAttribute("data-insert-time"),r="";if(o?.toLowerCase()==="year")r=n.getFullYear().toString();else if(o?.toLowerCase()==="month")r=(n.getMonth()+1).toString();else if(o?.toLowerCase()==="day")r=n.getDate().toString();else if(o?.toLowerCase()==="date")r=n.toLocaleDateString(e);else if(o?.toLowerCase()==="datetime")r=n.toLocaleString(e);else if(o?.toLowerCase()==="time")r=n.toLocaleTimeString(e);else return"";return r}function ue(t,e){let n=new Date,o=t.getAttribute("data-remaining-days-to");try{if(o){let r=new Date(o),a=Math.round((r.getTime()-n.getTime())/(1e3*60*60*24));return new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(a,"day")}}catch(r){console.error("remainingDays error:",r)}return""}function Ut(){function t(){let a=window.location.pathname.split("/").filter(s=>s.length===2),i=a.length>0?a[0]:"";return i!==""?"/"+i:i}function e(r){try{return new URL(r),!0}catch{return!1}}function n(r,a){if(r===null)return"";if(e(r)){let i=new URL(r);return i.pathname=a+i.pathname,i.toString()}return a+r}let o=document.querySelectorAll('[data-linguana-redirect="true"]');for(let r of o)r.getAttribute("redirect")&&r.setAttribute("redirect",n(r.getAttribute("redirect"),t())),r.getAttribute("data-redirect")&&r.setAttribute("data-redirect",n(r.getAttribute("data-redirect"),t()))}async function Mt(){pt(),ct(),mt(),await dt(),St(),ht(),Lt(),vt(),Rt(),Tt(),At(),ut(),Ct(),ft()}function fe(){at(),nt();async function t(){Ut(),lt(),st(),rt(),it(),V(),await Mt()}document.addEventListener("DOMContentLoaded",async()=>{try{await t()}catch(e){console.error("Error during DOMContentLoaded:",e)}})}window.agera||(window.agera=!0,fe());})();
