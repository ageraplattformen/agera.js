"use strict";(()=>{async function V(t){return new Promise((e,n)=>{$.ajax({url:t.url,type:t.method,data:t.body,dataType:"jsonp",success:r=>{e(r)},error:(r,o,a)=>{n(a instanceof Error?a:new Error(a))}})})}var p={apiUrl:document.currentScript?.getAttribute("api-url")??atob("aHR0cHM6Ly91dGlscy1hcGkudmVyY2VsLmFwcC9hcGkv"),counterPath:"counter/",jsDelivrUrl:"https://data.jsdelivr.com/v1/packages/gh/ageraplattformen/agera.js/resolved?specifier=latest",wfSiteId:document.querySelector("html")?.dataset.wfSite??"0000",postalCodeUrl:atob("aHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L2doL2FnZXJhcGxhdHRmb3JtZW4vanMtbW9kdWxlc0BtYWluL3ppcC8=")},g={method:"POST",headers:{"Content-Type":"application/json"},critical:!0,waitForResponse:!0};function Ot(t){document.querySelectorAll("[data-profundo-client]").forEach(r=>{r.addEventListener("click",async()=>{let o=r.dataset.activitytypeId||"",a=r.dataset.classificationId||"",i=r.dataset.profundoText||"",s=It(void 0,{client:r.dataset.profundoClient||"not_provided",client_url:r.dataset.profundoUrl||r.dataset.crmEndpoint||"not_provided",country_code:r.dataset.countryCode||"",name:{name_id:Number(t)},register_id:r.dataset.registerId||"",campaign_id:Number(r.dataset.campaignId)||void 0,activity:{...o?{activitytype_id:o}:{activitytype_id:""},...a?{classification_id:a}:{},...i?{shortText:i}:{},shorttext:r.dataset.profundoText||""}});await n(s)})});async function n(r){try{let o=await fetch(r.url,{method:r.method,headers:r.headers,body:r.body});return o.ok?await o.json():void 0}catch(o){console.warn("Profundo error: ",o);return}}}function J(t,e){let n=t["data.name_id"];t&&n&&(Ot(n.toString()),e?.push(["name_id",n.toString()]))}function z(t){if(typeof t["data.redirect_url"]=="string"){let e=new URL(t["data.redirect_url"]);window.location.href=e.href}else console.error("Invalid redirect URL provided in Profundo response.")}function It(t,e){let r=t?T(t,{"given-name":"firstname","family-name":"lastname",email:"email",tel:"mobile","street-address":"address","postal-code":"zip",country:"country_id"}):void 0,o=e?.name.name_id;r||(r=new FormData);let a=[];for(let[E,_]of r.entries())if(E.startsWith("infotype")){let C=parseInt(_);isNaN(C)||a.push(C),r.delete(E)}let i=t?.getAttribute("data-country-code")||e?.country_code||"";!r?.get("country")&&i&&r.append("country_id",i);let s=e?.activity.shorttext||t?.dataset.profundoText,c=t?.dataset.registerId||e?.register_id,l=t?.dataset.campaignId||e?.campaign_id,u=t?.dataset.crmEndpoint||t?.getAttribute("action")||e?.client_url||"";function d(E,_,C){let B=`text${E}`,H=_.dataset[B]?.toLowerCase();if(H?.startsWith("utm_")){let kt=H.slice(4);return y[kt]||""}return H||C.get(B)||""}let m={};t&&(m={text1:d(1,t,r),text2:d(2,t,r),text3:d(3,t,r),text4:d(4,t,r)});let h=["text1","text2","text3","text4"];for(let E of h)r.delete(E);let f=t?.dataset.classificationId||e?.activity.classification_id||"SI",b=r&&{...Object.fromEntries(r)};return o&&(b.name_id=Number(o)),{...g,critical:!o,url:new URL("profundo/",p.apiUrl).toString(),body:JSON.stringify({client:t?.dataset.client||e?.client||"not_provided",client_url:u,...i?{country_code:i}:{},referrer:window.location.href,body:{name:b,...c?{register_id:c}:{},...l?{campaign_id:l}:{},...a?{infotype_id:a[0]}:{},activity:{...m.text1?{text1:m.text1}:{},...m.text2?{text2:m.text2}:{},...m.text3?{text3:m.text3}:{},...m.text4?{text4:m.text4}:{text4:y.content||""},...s?{shorttext:s}:{},activitytype_id:t?.dataset.activitytypeId||e?.activity.activitytype_id||"UN",...f?{classification_id:f}:{}}}})}}var A=(t,{parentKey:e=""}={})=>{let n={};return Object.keys(t).forEach(r=>{let o=t[r],a=e?`${e}.${r}`:r;typeof o=="object"&&o!==null&&!Array.isArray(o)?Object.assign(n,A(o,{parentKey:a})):n[a]=o}),n};function jt(){let t=localStorage.getItem("crm_data");return t?JSON.parse(t):(localStorage.removeItem("crm_data"),{})}function W(t){let e=A(jt());Object.keys(e).length!==0&&J(e,t)}function R(t){let e=A(t);z(e)}function Z(t){return typeof t=="object"&&t.hasOwnProperty("count")&&typeof t.count=="number"&&t.hasOwnProperty("name")&&typeof t.name=="string"}async function U(t,e){let n={method:t.method,headers:t.headers,body:t.body},r=e?.waitForResponse?.toLowerCase()!=="false",o=Number(e?.waitForResponseDelay)||500;try{if(t.dataType==="jsonp")return await V(t);if(!r){if("keepalive"in new Request("")){console.log("doing fetch with keepalive"),console.log("url",t.url);let s=await fetch(t.url,{...n,keepalive:!0});console.log("response code",s.status),console.log("response text",await s.text())}else console.warn("Using sendBeacon..."),navigator.sendBeacon(t.url,n.body);return new Promise(s=>setTimeout(s,o))}let a=await fetch(t.url,n);if(!a.ok)throw new Error(`Error fetching ${t.url}: ${a.statusText}`);return a.headers.get("Content-Type")?.includes("application/json")?await a.json():await a.text()}catch(a){throw console.error(a),a}}async function K(t,e,n,r,o,a,i){let s=new URL("fcrm/",p.apiUrl).toString();i?.waitForResponse||(i={...i,waitForResponse:"false"});let c={method:a.toUpperCase(),headers:{"Content-Type":"application/json"},url:s,body:JSON.stringify({crm:t,...e?{client:e}:{},crm_endpoint:n["data-crm-endpoint"]||"",attributes:n,response:o?JSON.parse(o):{},body:r?{...Object.fromEntries(r)}:{},...x.size>0?{query_params:{...Object.fromEntries(x)}}:{},source:window.location.href,...S?{...S}:{}})};return U(c,i)}function Q(){let t=localStorage.getItem("crm_data")||"{}",e=[...document.querySelectorAll("[data-crm-patch]"),...document.querySelectorAll("[data-profundo-client]")];if(e.length===0)return;async function n(r){let o=r.currentTarget,a=o.getAttribute("data-crm-patch")??(o.getAttribute("data-profundo-client")?"profundo":""),i=o.getAttribute("data-client")??o.getAttribute("data-profundo-client")??"",s=o.getAttribute("data-crm-patch-method")??"POST";console.log("crmToPatch:",a,"client:",i,"method:",s);let c={};[...o.attributes].forEach(d=>{d.name.startsWith("data-")&&(c[d.name]=d.value)});let l=document.querySelector("[data-load-petition]")??o.closest("form")??null,u=l?new FormData(l):new FormData;if(!M.hasOwnProperty(a)){let d=await K(a,i,c,u,t,s,l?.dataset);d&&(localStorage.setItem("crm_data",JSON.stringify(d)),R(d));return}a==="djurensratt"&&l&&await G(l,c,t)}e.forEach(r=>{r.addEventListener("click",o=>{try{n(o).then(()=>{}).catch(a=>{console.error("Error handling patch:",a)})}catch(a){console.error("Error handling patch:",a)}}),r.style.cursor="pointer"})}function T(t,e){let n=new FormData;for(let[r,o]of new FormData(t))e.hasOwnProperty(r)?n.append(e[r],o):n.append(r,o);return n}var x=new URLSearchParams(window.location.search);function Nt(){function t(n){let r=[...x.keys()].find(o=>o.toLowerCase().includes(n));return r?x.get(r)??"":""}return{source:t("source").toLowerCase(),campaign:t("campaign").toLowerCase(),medium:t("medium").toLowerCase(),content:t("content").toLowerCase()}}var y=Nt(),w=Array.from(x,([t,e])=>`${t.toLowerCase()}: ${e.toLowerCase()}`).join(", "),S={utms:{...y.campaign?{utm_campaign:y.campaign}:{},...y.source?{utm_source:y.source}:{},...y.medium?{utm_medium:y.medium}:{},...y.content?{utm_content:y.content}:{}}};function Y(t){let e=new FormData(t),n=[],r=[],o={};for(let[a,i]of e.entries())a.startsWith("tags")?n.push(i):a.startsWith("language")?r.push(i):["given-name","family-name","email","tel","postal-code","street-address","address-level2","country"].includes(a)||(o[a]=i);return{...g,url:t.getAttribute("action")??"",body:JSON.stringify({person:{given_name:e.get("given-name"),family_name:e.get("family-name"),email_addresses:[{address:e.get("email")}],phone_numbers:[{number:e.get("tel")??""}],postal_addresses:[{postal_code:e.get("postal-code")??"",address_lines:e.get("street-address")??"",region:e.get("adress-level2")??"",country:e.get("country")??""}]},add_tags:[...n],"action_network:referrer_data":{source:y.source?y.source.toString():"",website:window.location.hostname+window.location.pathname},languages_spoken:[...r],custom_fields:o})}}function X(t){let e=t?.getAttribute("data-country-code")||"";return{...g,url:new URL("amnesty/",p.apiUrl).toString(),body:JSON.stringify({form:{...Object.fromEntries(new FormData(t)),action_id:t.dataset.actionId||"9999",sign_method:t.dataset.signMethod||"agera-default"},UTM:w,site_id:p.wfSiteId,source:window.location.href,...e?{country_code:e}:{}})}}function k(t,e=!1,n,r){let o=new FormData(t),a="data-action-id",i=t.getAttribute(a)||"No ActionID Provided",s=atob("aHR0cHM6Ly9hY3QuZGp1cmVuc3JhdHQuc2UvcmVmb3JtLXNvY2lldHkvYXBpLw==");if(e){let l=JSON.parse(r||"{}"),u=!!(n&&n["data-recruit-me"]==="true");return{...g,url:s+"update",body:JSON.stringify({partId:l.partId||"",recruitMe:u,signature:{actionId:n&&n[a]||"No ActionID Provided",source:w?w:"reform-campaign"}})}}let c=!!o.get("updates");return{...g,url:s+"register",body:JSON.stringify({person:{first:o.get("given-name")||"",last:o.get("family-name")||"",email:o.get("email")||"",mobile:o.get("tel")||""},acquisition:{actionId:i?i.toString():"",source:w?w:"",marketingPermission:c}})}}async function G(t,e,n){async function r(o){try{let a=await fetch(o.url,{method:o.method,headers:o.headers,body:o.body,keepalive:!0});if(!a.ok)throw new Error(`Request failed with status ${a.status}`);await a.json()}catch(a){throw a}}await r(k(t,!0,e,n))}function tt(t){let e=new FormData(t),n={};return t&&Array.from(t.attributes).forEach(o=>{o.name.startsWith("data-")&&(n[o.name]=o.value)}),{...g,url:new URL("fcrm/",p.apiUrl).toString(),body:JSON.stringify({crm:t?.dataset.crm??"",...t?.dataset.client?{client:t.dataset.client}:{},...t?.dataset.crmEndpoint||t?.action?{crm_endpoint:t?.dataset.crmEndpoint??t?.action}:{},body:{...Object.fromEntries(e)},...S?{...S}:{},...x.size>0?{query_params:{...Object.fromEntries(x)}}:{},source:window.location.href,...n?{attributes:{...n}}:{}})}}function et(t){let n=T(t,{"given-name":"FNAME","family-name":"LNAME",email:"EMAIL",tel:"PHONE","street-adress":"ADDRESS","postal-code":"POSTALCODE","adress-level2":"REGION",country:"COUNTRY"}),r=t?.getAttribute("data-mailchimp-tags")||"";r!==""&&n.append("tags",r);let o=new URLSearchParams;for(let[a,i]of n.entries())(typeof i=="string"||typeof i=="number")&&o.append(a,i.toString());return o.append("UTM",w),{...g,url:t.getAttribute("action")?.replace("post?","post-json?")+"&c=?",headers:{"Content-Type":"application/x-www-form-urlencoded"},dataType:"jsonp",body:o.toString()}}function rt(t){let e=new URL(document.querySelector("html")?.dataset.wfSite??"0000","https://webflow.com/api/v1/form/"),n=new FormData(t);n.append("UTM",w);let r=new URLSearchParams({name:t?.getAttribute("name")??"form",source:window.location.href});for(let o of n.entries()){let a=`fields[${o[0]}]`;r.append(a,o[1])}return{...g,url:e.href,headers:{"Content-Type":"application/x-www-form-urlencoded"},body:r.toString()}}function ot(t){return{...g,url:t.getAttribute("action")||"",body:JSON.stringify({[t.getAttribute("name")||"form"]:Object.fromEntries(new FormData(t)),source:window.location.href,time:new Date().toISOString(),UTM:w})}}var M={actionnetwork:Y,amnesty:X,djurensratt:k,mailchimp:et,webflow:rt,zapier:ot,none:""};async function nt(t,e,n){try{let r=e.dataset,o=await Promise.allSettled(t.map(i=>U(i,r)));o.some((i,s)=>i.status==="rejected"&&t[s].critical)?O(!1,!1,e,n):(Bt(o),O(!0,!0,e,n))}catch(r){console.error("Error in Promise.allSettled:",r),O(!1,!1,e,n)}}function Bt(t){let e=[];if(t.forEach((n,r)=>{if(n.status==="fulfilled"&&n.value!==null){let o=n.value;if(typeof n.value=="object"&&!Z(o)){let a=n.value;e.push(a)}else typeof n.value=="string"&&e.push({[r.toString()]:n.value})}}),e.length>0){let n={};e.forEach(r=>{Object.assign(n,r)}),localStorage.setItem("crm_data",JSON.stringify(n)),R(n)}}function O(t,e,n,r){let o=n.parentNode,a=o?.querySelector(".w-form-done"),i=o?.querySelector(".w-form-fail");t?(a?.style.setProperty("display","block"),i?.style.setProperty("display","none"),e&&Vt(n,r)):(a?.style.setProperty("display","none"),i?.style.setProperty("display","block"),r.submitButton&&(r.submitButton.value=r.submitText))}function Vt(t,e){let n=t.getAttribute("redirect")??null;if(n)if(e.addUtm){let r=new URL(n,e.thisUrl),o=new URLSearchParams(window.location.search);r.searchParams.forEach((i,s)=>{o.has(s)||o.set(s,i)});let a=r.origin+r.pathname+(o.toString()?`?${o.toString()}`:"");window.location.href=a}else window.location.href=n;else t.style.display="none",console.warn("No redirect defined")}function at(t){let e=/^data-counter(\d+)?-update$/;return Array.from(t.attributes).filter(r=>e.test(r.name)).map(r=>{let o=r.name.match(/\d+/),a=o?o[0]:null,i=r.value,s=`data-counter${a||""}-add-amount`,c=t.querySelector(`[${s}]`),l=c?Number(c.value||c.getAttribute(s)):null;return $t(i,t,l)})}function $t(t,e,n){let r=new FormData(e);return{...g,critical:!1,url:new URL(p.counterPath+t,p.apiUrl).toString(),body:JSON.stringify({form:"default",site_id:p.wfSiteId,last_person:r.get("given-name")||"",form_url:window.location.href,...n?{add_amount:n}:{}})}}function st(t){let e={thisUrl:new URL(window.location.href),addUtm:t.dataset.redirectUtm??!0,submitButton:t.querySelector('input[type="submit"]'),submitText:t.querySelector('input[type="submit"]')?.value??""};async function n(r){r.preventDefault(),r.stopPropagation(),e.submitButton&&(e.submitButton.value=e.submitButton.dataset.wait??e.submitButton.value);let o=[],a=t.dataset.crm?.toLowerCase()??"webflow";if(a!=="none"){let i=M[a]??tt;o.push(i(t))}o.push(...at(t)),o.length&&await nt(o,t,e)}t.addEventListener("submit",r=>{r.preventDefault(),n(r).catch(o=>console.error(o))})}function it(){document.querySelectorAll("[data-crm]").forEach(e=>{st(e)})}var I=class{constructor(){this.counters=new Map}async getCounter(e){if(this.counters.has(e))return this.counters.get(e);let n=new URL(p.counterPath+e,p.apiUrl),r=(async()=>{try{let a=await fetch(n);if(!a.ok)throw new Error("Error fetching counter data");return await a.json()}catch(a){throw new Error("Error fetching counter data: "+String(a))}})();this.counters.set(e,r);let o=await r;return this.counters.delete(e),o}},P=new I;async function ct(){try{let t=await fetch(p.jsDelivrUrl);if(!t.ok)return"latest";let e=await t.json();return e?.version?`v${e.version}`:"latest"}catch(t){return console.error(t),"latest"}}function j(t){t&&t.classList.contains("cloak")&&t.classList.remove("cloak")}function lt(){{let t=`.cloak { 
			opacity: 0;
			height: 0px;
      overflow: hidden;
			margin: 0;
      padding-top: 0;
      padding-bottom: 0;
		}`,e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}}function Jt(){function t(s,c){return s>=c?100:Math.round(s/c*100)}function e(s){let c={350:50,500:100,2e3:250,5e3:500,2e4:2500,5e4:5e3,1e5:1e4,2e5:25e3,5e5:5e4,1e6:1e5},l=25e4,d=Object.keys(c).map(Number).find(h=>h>=s),m=d?c[d]:l;return Math.ceil(s*1.05/m)*m}function n(s,c){return s*1.05<c.target||!c.autoTarget?c.target:e(s)}function r(s,c,l){s.style.width=t(c,l)+"%"}function o(s,c,l){try{let u=new Intl.NumberFormat(l.locale,l.notation).format(c);s.textContent=u}catch{l.notation.useGrouping=!1,l.notation.notation="standard";let u=new Intl.NumberFormat(void 0,l.notation).format(c);s.textContent=u}}function a(s,c,l){c<=l.removeBelow&&(s.style.display="none"),c>=l.hideBelow&&(s.style.opacity="1")}async function i(s){let c=s.dataset.counterName||"default",l={target:parseInt(s.dataset.counterTarget||"0",10),hideBelow:parseInt(s.dataset.counterHideBelow||"0"),removeBelow:parseInt(s.dataset.counterRemoveBelow||"0"),autoTarget:!!s.dataset.counterAutoTarget||!0,locale:s.dataset.counterLocale||document.documentElement.lang||"undefined",notation:{notation:s.dataset.counterNotation?.toLowerCase()||"standard",useGrouping:!0}},u;if(c.toLowerCase()==="default")u=125;else{let f=await P.getCounter(c);f?(u=f.count,(typeof window.agera!="object"||window.agera===null)&&(window.agera={counterValues:{}}),window.agera.counterValues[c]=u):u=0}if(s.classList.contains("counter-current-value"))o(s,u,l),a(s,u,l);else{let f=s.querySelectorAll(".counter-current-value");for(let b of f)o(b,u,l),a(b,u,l)}let d=n(u,l),m=s.querySelectorAll(".counter-target-value");for(let f of m)o(f,d,l),a(f,u,l);let h=s.querySelectorAll(".counterbar-limiter");for(let f of h)r(f,u,d);a(s,u,l)}return{processCounterElement:i}}function ut(){let t=`
      .counter-target-value,
      .counter-current-value,
      .counter_container {
          opacity: 0;
          transition: opacity 0.7s;
      }
  `,e=document.createElement("style");e.textContent=t,document.head.appendChild(e)}function dt(){let t=document.querySelectorAll("[data-counter-name]"),e=Jt();for(let n of t)e.processCounterElement(n)}var N=(t,e=!0)=>t.cloneNode(e);function mt(){let t=document.querySelectorAll("[data-counter-name]"),n=Array.from(t).find(s=>s.dataset.counterLocale)?.dataset.counterLocale??(document.documentElement.lang||"en");n.toLowerCase()==="none"&&(n=document.documentElement.lang||"en");function r(s,c){let l=N(c),u=l.querySelector('[data-template="last-person-name"]'),d=l.querySelector('[data-template="last-person-time"]');return u&&d&&(u.innerText=s.name,d.innerText=o(s.date,n)),l}function o(s,c){let l=new Date,u=new Date(s),d=new Date(u.getTime()-u.getTimezoneOffset()*6e4),m=Math.floor((l.getTime()-d.getTime())/1e3),h=new Intl.RelativeTimeFormat(c,{numeric:"auto"});if(m<60)return h.format(-m,"second");let f=Math.floor(m/60);if(f<60)return h.format(-f,"minute");let b=Math.floor(m/3600);if(b<12)return h.format(-b,"hour");let E=Math.floor(m/86400);return h.format(-E,"day")}function a(s){let c=s.last_person.names;return c.reverse(),c.filter((u,d,m)=>m.findIndex(h=>h.name===u.name)===d)}async function i(s,c){let l=c.querySelector('[data-template="last-person"]');if(!l)return;let u=l.parentElement;l.remove();let d=await P.getCounter(s);if(!d||!d.last_person?.names||d.last_person.names.length<2){u?.remove();return}let h=a(d).map(f=>r(f,l));h.length>0&&u&&(j(u),u.append(...h)),h.forEach(f=>{setTimeout(function(){j(f)},100)})}t.forEach(s=>{let c=s.dataset.counterName??"default";i(c,s)})}function v(t){return JSON.parse(localStorage.getItem(t)??"{}")}function ft(){let t="data-clear-localstorage",e=document.querySelector(`[${t}]`)?.getAttribute(t);e?.toLowerCase()==="all"?(console.log("Clearing all local storage"),localStorage.clear()):e&&(console.log("Clearing local storage key:",e),localStorage.removeItem(e))}function pt(){function t(o){let a=v("forwardedform");W(Object.entries(a));function i(l){let u=Array.from(new URLSearchParams(window.location.search),([d,m])=>`${d}: ${m}`).join(", ");return l.utm=u,l}let s=i(a);function c(l){Object.entries(l).forEach(([u,d])=>{let m=document.createTextNode(d).textContent,h=`<input type="hidden" id="${u}" name="${u}" value="${m}">`;o.insertAdjacentHTML("afterbegin",h)})}c(s)}function e(o){let a=new URLSearchParams(window.location.search),i=Array.from(a,([l,u])=>`${l}: ${u}`),s=o.getAttribute("redirect");if(s){let l=s+(s?.includes("?")?"&":"?")+a.toString();o.setAttribute("redirect",l),o.setAttribute("data-redirect",l)}o.addEventListener("change",()=>{c(o)}),o.addEventListener("input",()=>{c(o)}),window.addEventListener("beforeunload",()=>{c(o)});function c(l){if(l instanceof HTMLFormElement){let u=new FormData(l),d=i.join(", ");u.set("utm",d),localStorage.setItem("forwardedform",JSON.stringify(Object.fromEntries(u)))}}}let n=document.querySelectorAll("[data-crm]");n.length>0&&n.forEach(function(o){e(o)});let r=document.querySelectorAll('[data-load-petition="true"]');r.length>0&&r.forEach(function(o){t(o)})}function gt(){let t=document.querySelector("form[data-auto-submit]");if(t&&t.getAttribute("data-auto-submit")?.toLowerCase()==="true"){if(!t.checkValidity()){console.warn("Form validation failed.");return}let e=new Event("submit",{bubbles:!0,cancelable:!0});t.dispatchEvent(e)}}function ht(){document.querySelectorAll("[data-copy]").forEach(e=>{e.addEventListener("mouseover",function(){e.style.cursor="pointer"}),e.addEventListener("click",async function(){let n="",r=e.getAttribute("data-copy")||"";if(r?.toLowerCase()==="url")n=window.location.href;else if(r?.toLowerCase()==="prev-url")n=document.referrer||"";else{let o=document.getElementById(r);o?.textContent?n=o.textContent:n=r||""}try{await navigator.clipboard.writeText(n),console.log("Copied to clipboard:",n.toString())}catch(o){console.error("Failed to copy: ",o)}})})}async function yt(){let t=document.querySelectorAll("[data-js-version]");if(t.length<1)return;let e=document.querySelector('script[src$="agera.js"]'),n="";if(e){let{src:r}=e,o=/@([^/]+)/.exec(r);if(o){let[,a]=o;n=a,n.toLowerCase().includes("latest")&&(n=await ct())}}n!==""&&t.forEach(r=>{r.innerText=n})}function wt(){document.querySelectorAll("[data-hide-if-data], [data-show-if-data]").forEach(t=>{let e=t.getAttribute("data-hide-if-data")??t.getAttribute("data-show-if-data");if(!e)return;let n=!!t.getAttribute("data-hide-if-data"),r=e?new URLSearchParams(window.location.search).get(e)??"":"",o=e&&v("forwardedform")[e]||"",a=!!(r||o);t.style.display=n===a?"none":""})}function xt(){let t=document.querySelectorAll("a[href]"),e=new URLSearchParams(window.location.search);t.forEach(n=>{if(!n.href.includes("#")){let r=new URL(n.href,window.location.href);r.searchParams.forEach((a,i)=>{e.has(i)||e.append(i,a)});let o=e.toString();n.href+=`${r.search?"&":"?"}${o}${r.hash}`}})}var bt="data-insert-name";function Yt(t,e){let n="",r=["first_name","first-name","firstname","fn","first","fname","f-name","n","given_name","given-name","givenname","gn","g-n","given"];[...Object.entries(t),...Array.from(e.entries())].forEach(([a,i])=>{r.includes(a.toLowerCase())&&(n=i)});let o=document.querySelectorAll(`[${bt}]`);o.length>0&&n!==""&&Xt(o,n)}function Xt(t,e){let n={"no-space":e,"leading-space":"&nbsp;"+e,"trailing-space":e+"&nbsp;","double-space":"&nbsp;"+e+"&nbsp;","":"&nbsp;"+e};t.forEach(r=>{let o=r.getAttribute(bt)||"leading-space";n.hasOwnProperty(o)&&(r.innerHTML=n[o])})}function Et(){let t=v("forwardedform"),e=new URLSearchParams(window.location.search);Yt(t,e)}var q=typeof Buffer=="function",Lt=typeof TextDecoder=="function"?new TextDecoder:void 0,io=typeof TextEncoder=="function"?new TextEncoder:void 0,ee="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",re=Array.prototype.slice.call(ee),F=(t=>{let e={};return t.forEach((n,r)=>e[n]=r),e})(re),oe=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,L=String.fromCharCode.bind(String),St=typeof Uint8Array.from=="function"?Uint8Array.from.bind(Uint8Array):t=>new Uint8Array(Array.prototype.slice.call(t,0));var vt=t=>t.replace(/[^A-Za-z0-9\+\/]/g,"");var ne=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,ae=t=>{switch(t.length){case 4:var e=(7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3),n=e-65536;return L((n>>>10)+55296)+L((n&1023)+56320);case 3:return L((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return L((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},se=t=>t.replace(ne,ae),ie=t=>{if(t=t.replace(/\s+/g,""),!oe.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(t.length&3));let e,n="",r,o;for(let a=0;a<t.length;)e=F[t.charAt(a++)]<<18|F[t.charAt(a++)]<<12|(r=F[t.charAt(a++)])<<6|(o=F[t.charAt(a++)]),n+=r===64?L(e>>16&255):o===64?L(e>>16&255,e>>8&255):L(e>>16&255,e>>8&255,e&255);return n},Ct=typeof atob=="function"?t=>atob(vt(t)):q?t=>Buffer.from(t,"base64").toString("binary"):ie,ce=q?t=>St(Buffer.from(t,"base64")):t=>St(Ct(t).split("").map(e=>e.charCodeAt(0)));var le=q?t=>Buffer.from(t,"base64").toString("utf8"):Lt?t=>Lt.decode(ce(t)):t=>se(Ct(t)),ue=t=>vt(t.replace(/[-_]/g,e=>e=="-"?"+":"/")),Tt=t=>le(ue(t));function At(){document.querySelectorAll("[data-insert-query]").forEach(e=>{let n=e.getAttribute("data-insert-query");if(n){let r=new URLSearchParams(window.location.search).get(n);r!==null&&(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement?e.value=r.toString():e.textContent=r.toString())}})}function Rt(){document.querySelectorAll("[data-insert-b64-query]").forEach(e=>{let n=e.getAttribute("data-insert-b64-query");if(n){let r=Tt(new URLSearchParams(window.location.search).get(n)??"");r&&(e instanceof HTMLInputElement||e instanceof HTMLSelectElement||e instanceof HTMLTextAreaElement?e.value=r.toString():e.textContent=r.toString())}})}var D={DK:/^\d{4}$/,FI:/^(FI-|AX-)?\d{5}$/,NO:/^\d{4}$/,SE:/^(SE-)?\d{3}[ ]?\d{2}$/};function Ut(){async function t(r){let o=`${p.postalCodeUrl}${r}.js`;if(!D.hasOwnProperty(r))throw new Error("Unsupported country code");return(await import(o))[r]}async function e(r){if(!(r.getAttribute("data-postalcode-place-autofill")?.toLowerCase()==="true"))return;let a=r.querySelector('[name="postal-code"]'),i=r.querySelector('[name="address-level2"]'),s=r.dataset.countryCode?.toUpperCase()??"";if(!i||!a||s===""||!D.hasOwnProperty(s)){console.error("Postal code input, city output, or supported country not found");return}try{let c=await t(s),l=!1;i.addEventListener("input",()=>{l=!0}),a.addEventListener("input",()=>{let u=a.value.replaceAll(" ",""),d=D[s];u.length>3&&d.test(u)&&!l&&(i.value=c[u]||i.value)})}catch(c){console.error("Error loading postal codes:",c)}}async function n(){let r=document.querySelectorAll("[data-postalcode-place-autofill]");for(let o of r)await e(o)}n().catch(r=>{console.error("Postcode Place Autofill Error:",r)})}function Mt(){let t=new URLSearchParams(window.location.search);document.querySelectorAll("[data-redirect]").forEach(n=>{let r=n.getAttribute("data-redirect");try{if(r){let o=new URL(r,document.baseURI),a=new URL(o.toString()),i=a.searchParams;t.forEach((s,c)=>{i.has(c)||i.set(c,s)}),n.setAttribute("data-redirect",a.toString())}}catch(o){console.error("An error occurred:",o)}})}function Pt(){Object.entries({"[data-share-whatsapp-text]":e=>`https://wa.me/?text=${encodeURIComponent(e)}`,"[data-share-facebook-url]":e=>`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(e)}`,"[data-share-linkedin-url]":e=>`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(e)}`,"[data-share-twitter-text]":e=>`https://twitter.com/intent/tweet?text=${encodeURIComponent(e)}`,"[data-share-email-subject], [data-share-email-body]":(e,n)=>`mailto:?subject=${encodeURIComponent(e)}&body=${encodeURIComponent(n)}`}).forEach(([e,n])=>{document.querySelectorAll(e).forEach(r=>{r.addEventListener("click",o=>{o.preventDefault();let a=e.includes("email"),i=r.getAttribute(a?"data-share-email-subject":e.slice(1,-1))??"",s=a?r.getAttribute("data-share-email-body")??"":"",c=n(i,s);window.open(c,a?"_self":"_blank")})})})}function Ft(){let t=document.querySelectorAll("*"),e=[],n=!0;if(t.forEach(r=>{let{attributes:o}=r;for(let a=0;a<o.length;a++){let i=o[a];i.name.startsWith("data-splitter-url")?e.push(i.value):i.name==="data-splitter-keep-query"&&i.value==="false"&&(n=!1)}}),e.length){let r=e[Math.floor(Math.random()*e.length)],o=window.location,a=n?new URL(r,o.origin).href+o.search:r;window.location.href=a}}function Dt(){let t=[document.documentElement.lang||"en","en"];document.querySelectorAll("[data-insert-time]").forEach(r=>{r.innerText=he(r,t)}),document.querySelectorAll("[data-remaining-days-to]").forEach(r=>{r.innerText=ye(r,t)})}function he(t,e){let n=new Date,r=t.getAttribute("data-insert-time"),o="";if(r?.toLowerCase()==="year")o=n.getFullYear().toString();else if(r?.toLowerCase()==="month")o=(n.getMonth()+1).toString();else if(r?.toLowerCase()==="day")o=n.getDate().toString();else if(r?.toLowerCase()==="date")o=n.toLocaleDateString(e);else if(r?.toLowerCase()==="datetime")o=n.toLocaleString(e);else if(r?.toLowerCase()==="time")o=n.toLocaleTimeString(e);else return"";return o}function ye(t,e){let n=new Date,r=t.getAttribute("data-remaining-days-to");try{if(r){let o=new Date(r),a=Math.round((o.getTime()-n.getTime())/(1e3*60*60*24));return new Intl.RelativeTimeFormat(e,{numeric:"auto"}).format(a,"day")}}catch(o){console.error("remainingDays error:",o)}return""}function _t(){function t(){let a=window.location.pathname.split("/").filter(s=>s.length===2),i=a.length>0?a[0]:"";return i!==""?"/"+i:i}function e(o){try{return new URL(o),!0}catch{return!1}}function n(o,a){if(o===null)return"";if(e(o)){let i=new URL(o);return i.pathname=a+i.pathname,i.toString()}return a+o}let r=document.querySelectorAll('[data-linguana-redirect="true"]');for(let o of r)o.getAttribute("redirect")&&o.setAttribute("redirect",n(o.getAttribute("redirect"),t())),o.getAttribute("data-redirect")&&o.setAttribute("data-redirect",n(o.getAttribute("data-redirect"),t()))}async function Ht(){xt(),ft(),ht(),await yt(),Rt(),Et(),At(),Mt(),Ft(),Dt(),Pt(),gt(),Ut(),wt()}function be(){ut(),lt();async function t(){_t(),pt(),dt(),it(),mt(),Q(),await Ht()}document.addEventListener("DOMContentLoaded",async()=>{try{await t()}catch(e){console.error("Error during DOMContentLoaded:",e)}})}window.agera||(window.agera=!0,be());})();
