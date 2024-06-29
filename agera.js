"use strict";
(() => {
  var H,
    N,
    I,
    y = {
      apiUrl:
        ((H = document.currentScript) == null ? void 0 : H.getAttribute("api-url")) ||
        atob("aHR0cHM6Ly91dGlscy1hcGkudmVyY2VsLmFwcC9hcGkv"),
      counterPath: "counter/",
      jsDelivrUrl:
        "https://data.jsdelivr.com/v1/packages/gh/ageraplattformen/agera.js/resolved?specifier=latest",
      wfSiteId:
        (I = (N = document.querySelector("html")) == null ? void 0 : N.dataset.wfSite) !=
        null
          ? I
          : "0000",
    },
    h = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      critical: !0,
      waitForResponse: !0,
    };
  function Tt(t) {
    document.querySelectorAll("[data-profundo-client]").forEach((n) => {
      n.addEventListener("click", async () => {
        let o = n.dataset.activitytypeId || "",
          a = n.dataset.classificationId || "",
          u = n.dataset.profundoText || "",
          i = R(void 0, {
            client: n.dataset.profundoClient || "not_provided",
            client_url: n.dataset.profundoUrl || "not_provided",
            country_code: n.dataset.countryCode || "",
            name: { name_id: Number(t) },
            register_id: n.dataset.registerId || "",
            campaign_id: Number(n.dataset.campaignId) || void 0,
            activity: {
              ...(o ? { activitytype_id: o } : { activitytype_id: "" }),
              ...(a ? { classification_id: a } : {}),
              ...(u ? { shortText: u } : {}),
              shorttext: n.dataset.profundoText || "",
            },
          });
        await r(i);
      });
    });
    async function r(n) {
      try {
        let o = await fetch(n.url, { method: n.method, headers: n.headers, body: n.body });
        return o.ok ? await o.json() : void 0;
      } catch (o) {
        console.log("P error: ", o);
        return;
      }
    }
  }
  function j(t, e) {
    let r = t["data.name_id"];
    t && r && (Tt(r.toString()), e == null || e.push(["name_id", r.toString()]));
  }
  function R(t, e) {
    let n = t
        ? S(t, {
            "given-name": "firstname",
            "family-name": "lastname",
            email: "email",
            tel: "mobile",
            "street-address": "address",
            "postal-code": "zip",
            country: "country_id",
          })
        : void 0,
      o = e == null ? void 0 : e.name.name_id;
    n || (n = new FormData());
    let a = [];
    for (let [g, w] of n.entries())
      if (g.startsWith("infotype")) {
        let E = parseInt(w);
        isNaN(E) || a.push(E), n.delete(g);
      }
    let u =
      (t == null ? void 0 : t.getAttribute("data-country-code")) ||
      (e == null ? void 0 : e.country_code) ||
      "";
    !(n != null && n.get("country")) && u && n.append("country_id", u);
    let i =
        (e == null ? void 0 : e.activity.shorttext) ||
        (t == null ? void 0 : t.dataset.profundoText),
      f =
        (t == null ? void 0 : t.dataset.registerId) || (e == null ? void 0 : e.register_id),
      s =
        (t == null ? void 0 : t.dataset.campaignId) || (e == null ? void 0 : e.campaign_id),
      c = {
        text1: n.get("text1") || "",
        text2: n.get("text2") || "",
        text3: n.get("text3") || "",
      },
      l = ["text1", "text2", "text3", "text4"];
    for (let g of l) n.delete(g);
    let d =
        (t == null ? void 0 : t.dataset.classificationId) ||
        (e == null ? void 0 : e.activity.classification_id) ||
        "SI",
      m = n && { ...Object.fromEntries(n) };
    o && (m.name_id = Number(o));
    let p = { ...(x.content ? { text4: x.content } : "") };
    return {
      ...h,
      critical: !o,
      url: new URL("profundo/", y.apiUrl).toString(),
      body: JSON.stringify({
        client:
          (t == null ? void 0 : t.dataset.client) ||
          (e == null ? void 0 : e.client) ||
          "not_provided",
        client_url:
          (t == null ? void 0 : t.getAttribute("action")) ||
          (e == null ? void 0 : e.client_url) ||
          "",
        ...(u ? { country_code: u } : {}),
        referrer: window.location.href,
        body: {
          name: m,
          ...(f ? { register_id: f } : {}),
          ...(s ? { campaign_id: s } : {}),
          ...(a ? { infotype_id: a[0] } : {}),
          activity: {
            ...(c.text1 ? { text1: c.text1 } : {}),
            ...(c.text2 ? { text2: c.text2 } : {}),
            ...(c.text3 ? { text3: c.text3 } : {}),
            ...(o ? {} : { ...p }),
            ...(i ? { shorttext: i } : {}),
            activitytype_id:
              (t == null ? void 0 : t.dataset.activitytypeId) ||
              (e == null ? void 0 : e.activity.activitytype_id) ||
              "UN",
            ...(d ? { classification_id: d } : {}),
          },
        },
      }),
    };
  }
  var M = (t, e) => {
    let r = {};
    for (let n in t) {
      let o = t[n],
        a = e ? `${e}.${n}` : n;
      typeof o == "object" && o !== null ? Object.assign(r, M(o, a)) : (r[a] = o);
    }
    return r;
  };
  function O(t) {
    function e() {
      let n = localStorage.getItem("crm_data");
      return n || localStorage.removeItem("crm_data"), JSON.parse(n);
    }
    let r = M(e());
    r && j(r, t);
  }
  function q(t) {
    return (
      typeof t == "object" &&
      t.hasOwnProperty("count") &&
      typeof t.count == "number" &&
      t.hasOwnProperty("name") &&
      typeof t.name == "string"
    );
  }
  function B(t) {
    let e = new FormData(t),
      r = [],
      n = [],
      o = {};
    for (let [a, u] of e.entries())
      a.startsWith("tags")
        ? r.push(u)
        : a.startsWith("language")
        ? n.push(u)
        : [
            "given-name",
            "family-name",
            "email",
            "tel",
            "postal-code",
            "street-address",
            "address-level2",
            "country",
          ].includes(a) || (o[a] = u);
    return {
      ...h,
      url: t.getAttribute("action") || "",
      body: JSON.stringify({
        person: {
          given_name: e.get("given-name"),
          family_name: e.get("family-name"),
          email_addresses: [{ address: e.get("email") }],
          phone_numbers: [{ number: e.get("tel") || "" }],
          postal_addresses: [
            {
              postal_code: e.get("postal-code") || "",
              address_lines: e.get("street-address") || "",
              region: e.get("adress-level2") || "",
              country: e.get("country") || "",
            },
          ],
        },
        add_tags: [...r],
        "action_network:referrer_data": {
          source: x.source ? x.source.toString() : "",
          website: window.location.hostname + window.location.pathname,
        },
        languages_spoken: [...n],
        custom_fields: o,
      }),
    };
  }
  function V(t) {
    let e = (t == null ? void 0 : t.getAttribute("data-country-code")) || "";
    return {
      ...h,
      url: new URL("amnesty/", y.apiUrl).toString(),
      body: JSON.stringify({
        form: {
          ...Object.fromEntries(new FormData(t)),
          action_id: t.dataset.actionId || "9999",
          sign_method: t.dataset.signMethod || "agera-default",
        },
        UTM: b,
        site_id: y.wfSiteId,
        source: window.location.href,
        ...(e ? { country_code: e } : {}),
      }),
    };
  }
  function U(t, e = !1, r, n) {
    let o = new FormData(t),
      a = "data-action-id",
      u = t.getAttribute(a) || "No ActionID Provided",
      i = atob("aHR0cHM6Ly9hY3QuZGp1cmVuc3JhdHQuc2UvcmVmb3JtLXNvY2lldHkvYXBpLw==");
    if (e) {
      let s = JSON.parse(n || "{}"),
        c = !!(r && r["data-recruit-me"] === "true");
      return {
        ...h,
        url: i + "update",
        body: JSON.stringify({
          partId: s.partId || "",
          recruitMe: c,
          signature: {
            actionId: (r && r[a]) || "No ActionID Provided",
            source: b ? b : "reform-campaign",
          },
        }),
      };
    }
    let f = !!o.get("updates");
    return {
      ...h,
      url: i + "register",
      body: JSON.stringify({
        person: {
          first: o.get("given-name") || "",
          last: o.get("family-name") || "",
          email: o.get("email") || "",
          mobile: o.get("tel") || "",
        },
        acquisition: {
          actionId: u ? u.toString() : "",
          source: b ? b : "",
          marketingPermission: f,
        },
      }),
    };
  }
  async function J(t, e, r) {
    async function n(o) {
      try {
        let a = await fetch(o.url, {
          method: o.method,
          headers: o.headers,
          body: o.body,
          keepalive: !0,
        });
        if (!a.ok) throw new Error(`Request failed with status ${a.status}`);
        await a.json();
      } catch (a) {
        throw a;
      }
    }
    await n(U(t, !0, e, r));
  }
  function z(t) {
    let e = new FormData(t),
      r = {};
    t &&
      Array.from(t.attributes).forEach((a) => {
        a.name.startsWith("data-") && (r[a.name] = a.value);
      });
    let n = {
      utms: {
        ...(x.campaign ? { utm_campaign: x.campaign } : ""),
        ...(x.source ? { utm_source: x.source } : ""),
        ...(x.medium ? { utm_medium: x.medium } : ""),
        ...(x.content ? { utm_content: x.content } : ""),
      },
    };
    return {
      ...h,
      url: new URL("fcrm/", y.apiUrl).toString(),
      body: JSON.stringify({
        crm: (t == null ? void 0 : t.dataset.crm) || "",
        ...(t != null && t.dataset.crmClient ? { client: t.dataset.crmClient } : {}),
        ...(t != null && t.action ? { endpoint: t.action } : {}),
        body: { ...Object.fromEntries(e) },
        ...(n ? { ...n } : {}),
        source: window.location.href,
        ...(r ? { attributes: { ...r } } : {}),
      }),
    };
  }
  function G(t) {
    var a;
    let r = S(t, {
        "given-name": "FNAME",
        "family-name": "LNAME",
        email: "EMAIL",
        tel: "PHONE",
        "street-adress": "ADDRESS",
        "postal-code": "POSTALCODE",
        "adress-level2": "REGION",
        country: "COUNTRY",
      }),
      n = (t == null ? void 0 : t.getAttribute("data-mailchimp-tags")) || "";
    n !== "" && r.append("tags", n);
    let o = new URLSearchParams();
    for (let [u, i] of r.entries())
      (typeof i == "string" || typeof i == "number") && o.append(u, i.toString());
    return (
      o.append("UTM", b),
      {
        ...h,
        url:
          ((a = t.getAttribute("action")) == null
            ? void 0
            : a.replace("post?", "post-json?")) + "&c=?",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        dataType: "jsonp",
        body: o.toString(),
      }
    );
  }
  function Q(t) {
    var o, a, u;
    let e = new URL(
        (a = (o = document.querySelector("html")) == null ? void 0 : o.dataset.wfSite) !=
        null
          ? a
          : "0000",
        "https://webflow.com/api/v1/form/"
      ),
      r = new FormData(t);
    r.append("UTM", b);
    let n = new URLSearchParams({
      name: (u = t == null ? void 0 : t.getAttribute("name")) != null ? u : "form",
      source: window.location.href,
    });
    for (let i of r.entries()) {
      let f = `fields[${i[0]}]`;
      n.append(f, i[1]);
    }
    return {
      ...h,
      url: e.href,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: n.toString(),
    };
  }
  function W(t) {
    return {
      ...h,
      url: t.getAttribute("action") || "",
      body: JSON.stringify({
        [t.getAttribute("name") || "form"]: Object.fromEntries(new FormData(t)),
        source: window.location.href,
        time: new Date().toISOString(),
        UTM: b,
      }),
    };
  }
  var T = {
    actionnetwork: B,
    amnesty: V,
    djurensratt: U,
    mailchimp: G,
    profundo: R,
    webflow: Q,
    zapier: W,
    none: "",
  };
  async function Z() {
    let t = localStorage.getItem("crm_data"),
      e = document.querySelectorAll("[data-crm-patch]");
    !t ||
      !e ||
      e.forEach((r) => {
        (r.style.cursor = "pointer"),
          r.addEventListener("click", async () => {
            let n = r.getAttribute("data-crm-patch") || "",
              o = r.getAttribute("data-crm-patch-client") || "",
              a = {};
            Array.from(r.attributes).forEach((f) => {
              f.name.startsWith("data-") && (a[f.name] = f.value);
            });
            let u = document.querySelector("[data-load-petition]"),
              i = u ? new FormData(u) : new FormData();
            if (!T.hasOwnProperty(n)) {
              At(n, o, a, i, t);
              return;
            }
            if (n === "djurensratt" && u) {
              J(u, a, t);
              return;
            }
          });
      });
  }
  async function At(t, e, r, n, o) {
    let a = new URL("fcrm/", y.apiUrl).toString(),
      u = {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crm: t,
          ...(e ? { client: e } : {}),
          attributes: r,
          response: JSON.parse(o),
          body: { ...Object.fromEntries(n) },
        }),
      };
    try {
      let i = await fetch(a, { ...u, keepalive: !0 });
      return i.ok ? await i.json() : void 0;
    } catch (i) {
      console.error("P error: ", i);
      return;
    }
  }
  function S(t, e) {
    let r = new FormData();
    for (let [n, o] of new FormData(t))
      e.hasOwnProperty(n) ? r.append(e[n], o) : r.append(n, o);
    return r;
  }
  var _ = new URLSearchParams(window.location.search);
  function Ct() {
    function t(r) {
      let n = [..._.keys()].find((o) => o.toLowerCase().includes(r));
      return (n && _.get(n)) || "";
    }
    return {
      source: t("source").toLowerCase(),
      campaign: t("campaign").toLowerCase(),
      medium: t("medium").toLowerCase(),
      content: t("content").toLowerCase(),
    };
  }
  var x = Ct(),
    b = Array.from(_, ([t, e]) => `${t.toLowerCase()}: ${e.toLowerCase()}`).join(", ");
  function K(t) {
    let e = /^data-counter(\d+)?-update$/;
    return Array.from(t.attributes)
      .filter((n) => e.test(n.name))
      .map((n) => {
        let o = n.name.match(/\d+/),
          a = o ? o[0] : null,
          u = n.value,
          i = `data-counter${a || ""}-add-amount`,
          f = t.querySelector(`[${i}]`),
          s = f ? Number(f.value || f.getAttribute(i)) : null;
        return Rt(u, t, s);
      });
  }
  function Rt(t, e, r) {
    let n = new FormData(e);
    return {
      ...h,
      critical: !1,
      url: new URL(y.counterPath + t, y.apiUrl).toString(),
      body: JSON.stringify({
        form: "default",
        site_id: y.wfSiteId,
        last_person: n.get("given-name") || "",
        form_url: window.location.href,
        ...(r ? { add_amount: r } : {}),
      }),
    };
  }
  function Mt(t) {
    let e = {
      thisUrl: new URL(window.location.href),
      addUtm: !!t.dataset.redirectUtm || !0,
      submitButton: t.querySelector('input[type="submit"]'),
      submitText: "",
    };
    e.submitText = (e.submitButton && e.submitButton.value) || "";
    function r(s, c, l) {
      let d = s.parentNode,
        m = d == null ? void 0 : d.querySelector(".w-form-done"),
        p = d == null ? void 0 : d.querySelector(".w-form-fail");
      c
        ? (m && (m.style.display = "block"), p && (p.style.display = "none"), l && n())
        : (m && (m.style.display = "none"),
          p && (p.style.display = "block"),
          e.submitButton && (e.submitButton.value = e.submitText));
    }
    function n() {
      let s = t.getAttribute("redirect") || null;
      if (s)
        if (e.addUtm && s) {
          let c = new URL(s, e.thisUrl),
            l = new URLSearchParams(window.location.search);
          c.searchParams.forEach((m, p) => {
            l.has(p) || l.set(p, m);
          });
          let d = c.origin + c.pathname + (l.toString() ? "?" + l.toString() : "");
          window.location.href = d;
        } else window.location.href = s;
      else (t.style.display = "none"), console.warn("No redirect defined");
    }
    async function o(s) {
      return new Promise((c, l) => {
        $.ajax({
          url: s.url,
          type: s.method,
          data: s.body,
          dataType: "jsonp",
          success: (d) => {
            c(d);
          },
          error: (d, m, p) => {
            l(p);
          },
        });
      });
    }
    async function a(s) {
      var d;
      let c = { method: s.method, headers: s.headers, body: s.body },
        l =
          ((d = t == null ? void 0 : t.dataset.waitForResponse) == null
            ? void 0
            : d.toLowerCase()) !== "false";
      try {
        if (s.dataType === "jsonp") return o(s);
        if (!l) return fetch(s.url, { ...c, keepalive: !0 }), Promise.resolve(null);
        let m = await fetch(s.url, c);
        if (!m.ok) throw new Error(`Error fetching ${s.url}: ${m.statusText}`);
        if (m.headers.get("Content-Length") === "0") return Promise.resolve(null);
        let p = m.headers.get("Content-Type");
        return p && p.includes("application/json") ? await m.json() : await m.text();
      } catch (m) {
        throw (console.error("An error occurred:", m), m);
      }
    }
    function u(s) {
      let c = [];
      if (
        (s.forEach((l, d) => {
          if (l.status === "fulfilled" && l.value) {
            let m = l.value;
            if (q(m)) return;
            if (typeof l.value == "object") c.push(m);
            else if (typeof l.value == "string") {
              let p = {};
              (p[d.toString()] = l.value), c.push(p);
            }
          }
        }),
        c.length > 0)
      ) {
        let l = c.reduce((d, m) => ({ ...d, ...m }), {});
        localStorage.setItem("crm_data", JSON.stringify(l));
      }
    }
    async function i(s, c) {
      try {
        let l = await Promise.allSettled(s.map((m) => a(m))),
          d = !1;
        l.forEach((m, p) => {
          m.status === "rejected" && s[p].critical && (d = !0);
        }),
          d ? r(c, !1, !1) : (u(l), r(c, !0, !0));
      } catch (l) {
        console.error("Error in Promise.allSettled:", l), r(c, !1, !1);
      }
    }
    async function f(s) {
      s.addEventListener("submit", async function (c) {
        var g;
        c.preventDefault(),
          c.stopPropagation(),
          e.submitButton &&
            (e.submitButton.value = e.submitButton.dataset.wait || e.submitButton.value);
        let l = [],
          d = T,
          m = ((g = s.dataset.crm) == null ? void 0 : g.toLowerCase()) || "webflow";
        if (m !== "none")
          if (m && d.hasOwnProperty(m)) {
            let w = d[m];
            l.push(w(s));
          } else l.push(z(s));
        let p = K(s);
        l.push(...p), l.length > 0 && (await i(l, s));
      });
    }
    return { handleForm: f };
  }
  function Y() {
    let t = document.querySelectorAll("[data-crm]");
    for (let e of t) Mt(e).handleForm(e);
  }
  var P = class {
      constructor() {
        this.counters = new Map();
      }
      async getCounter(e) {
        if (this.counters.has(e)) return this.counters.get(e);
        let r = new URL(y.counterPath + e, y.apiUrl),
          n = (async () => {
            try {
              let a = await fetch(r);
              return a.ok ? await a.json() : void 0;
            } catch {
              return;
            }
          })();
        this.counters.set(e, n);
        let o = await n;
        return this.counters.delete(e), o;
      }
    },
    v = new P();
  async function X() {
    try {
      let t = await fetch(y.jsDelivrUrl);
      return t.ok ? `v${(await t.json()).version}` : "latest";
    } catch {
      return "latest";
    }
  }
  function Ut() {
    function t(i, f) {
      return i >= f ? 100 : Math.round((i / f) * 100);
    }
    function e(i) {
      let f = {
          350: 50,
          500: 100,
          2e3: 250,
          5e3: 500,
          2e4: 2500,
          5e4: 5e3,
          1e5: 1e4,
          2e5: 25e3,
          5e5: 5e4,
          1e6: 1e5,
        },
        s = 25e4,
        l = Object.keys(f)
          .map(Number)
          .find((m) => m >= i),
        d = l ? f[l] : s;
      return Math.ceil((i * 1.05) / d) * d;
    }
    function r(i, f) {
      return i * 1.05 < f.target || !f.autoTarget ? f.target : e(i);
    }
    function n(i, f, s) {
      i.style.width = t(f, s) + "%";
    }
    function o(i, f, s) {
      try {
        let c = new Intl.NumberFormat(s.locale, s.notation).format(f);
        i.textContent = c;
      } catch {
        (s.notation.useGrouping = !1), (s.notation.notation = "standard");
        let c = new Intl.NumberFormat(void 0, s.notation).format(f);
        i.textContent = c;
      }
    }
    function a(i, f, s) {
      f <= s.removeBelow && (i.style.display = "none"),
        f >= s.hideBelow && (i.style.opacity = "1");
    }
    async function u(i) {
      var p;
      let f = i.dataset.counterName || "default",
        s = {
          target: parseInt(i.dataset.counterTarget || "0", 10),
          hideBelow: parseInt(i.dataset.counterHideBelow || "0"),
          removeBelow: parseInt(i.dataset.counterRemoveBelow || "0"),
          autoTarget: !!i.dataset.counterAutoTarget || !0,
          locale: i.dataset.counterLocale || document.documentElement.lang || "undefined",
          notation: {
            notation:
              ((p = i.dataset.counterNotation) == null ? void 0 : p.toLowerCase()) ||
              "standard",
            useGrouping: !0,
          },
        },
        c;
      if (f.toLowerCase() === "default") c = 125;
      else {
        let g = await v.getCounter(f);
        g
          ? ((c = g.count),
            (typeof window.agera != "object" || window.agera === null) &&
              (window.agera = { counterValues: {} }),
            (window.agera.counterValues[f] = c))
          : (c = 0);
      }
      if (i.classList.contains("counter-current-value")) o(i, c, s), a(i, c, s);
      else {
        let g = i.querySelectorAll(".counter-current-value");
        for (let w of g) o(w, c, s), a(w, c, s);
      }
      let l = r(c, s),
        d = i.querySelectorAll(".counter-target-value");
      for (let g of d) o(g, l, s), a(g, c, s);
      let m = i.querySelectorAll(".counterbar-limiter");
      for (let g of m) n(g, c, l);
      a(i, c, s);
    }
    return { processCounterElement: u };
  }
  function tt() {
    let t = `
      .counter-target-value,
      .counter-current-value,
      .counter_container {
          opacity: 0;
          transition: opacity 0.7s;
      }
  `,
      e = document.createElement("style");
    (e.textContent = t), document.head.appendChild(e);
  }
  function et() {
    let t = document.querySelectorAll("[data-counter-name]"),
      e = Ut();
    for (let r of t) e.processCounterElement(r);
  }
  var F = (t, e = !0) => t.cloneNode(e);
  function D(t) {
    t && t.classList.contains("cloak") && t.classList.remove("cloak");
  }
  function nt() {
    {
      let t = `.cloak { 
			opacity: 0;
			height: 0px;
      overflow: hidden;
			margin: 0;
      padding-top: 0;
      padding-bottom: 0;
		}`,
        e = document.createElement("style");
      (e.textContent = t), document.head.appendChild(e);
    }
  }
  function rt() {
    var i, f;
    let t = document.querySelectorAll("[data-counter-name]"),
      r =
        (f =
          (i = Array.from(t).find((s) => s.dataset.counterLocale)) == null
            ? void 0
            : i.dataset.counterLocale) != null
          ? f
          : document.documentElement.lang || "en";
    r.toLowerCase() === "none" && (r = document.documentElement.lang || "en");
    function n(s, c) {
      let l = F(c),
        d = l.querySelector('[data-template="last-person-name"]'),
        m = l.querySelector('[data-template="last-person-time"]');
      return d && m && ((d.innerText = s.name), (m.innerText = o(s.date, r))), l;
    }
    function o(s, c) {
      let l = new Date(),
        d = new Date(s),
        m = new Date(d.getTime() - d.getTimezoneOffset() * 6e4),
        p = Math.floor((l.getTime() - m.getTime()) / 1e3),
        g = new Intl.RelativeTimeFormat(c, { numeric: "auto" });
      if (p < 60) return g.format(-p, "second");
      let w = Math.floor(p / 60);
      if (w < 60) return g.format(-w, "minute");
      let E = Math.floor(p / 3600);
      if (E < 12) return g.format(-E, "hour");
      let St = Math.floor(p / 86400);
      return g.format(-St, "day");
    }
    function a(s) {
      let c = s.last_person.names;
      return (
        c.reverse(), c.filter((d, m, p) => p.findIndex((g) => g.name === d.name) === m)
      );
    }
    async function u(s, c) {
      let l = c.querySelector('[data-template="last-person"]');
      if (!l) return;
      let d = l.parentElement;
      l.remove();
      let m = await v.getCounter(s);
      if (!m || !m.last_person || !m.last_person.names || m.last_person.names.length < 2) {
        d == null || d.remove();
        return;
      }
      let g = a(m).map((w) => n(w, l));
      g.length > 0 && d && (D(d), d.append(...g)),
        g.forEach((w) => {
          setTimeout(function () {
            D(w);
          }, 100);
        });
    }
    t.forEach((s) => {
      let c = s.dataset.counterName || "default";
      u(c, s);
    });
  }
  function A(t) {
    let e = JSON.parse(localStorage.getItem(t) || "{}");
    return Object.entries(e);
  }
  function ot() {
    var r;
    let t = "data-clear-localstorage",
      e = (r = document.querySelector(`[${t}]`)) == null ? void 0 : r.getAttribute(t);
    (e == null ? void 0 : e.toLowerCase()) === "all"
      ? (console.log("Clearing all local storage"), localStorage.clear())
      : e && (console.log("Clearing local storage key:", e), localStorage.removeItem(e));
  }
  function at() {
    function t(a) {
      let u = A("forwardedform");
      O(u);
      function i(l) {
        let d = Array.from(
          new URLSearchParams(window.location.search),
          ([m, p]) => `${m}: ${p}`
        ).join(", ");
        return l.find(([m]) => m === "utm") || l.push(["utm", d]), l;
      }
      let f = i(u);
      function s(l) {
        l.forEach(([d, m]) => {
          let p = document.createTextNode(m).textContent,
            g = `<input type="hidden" id="${d}" name="${d}" value="${p}">`;
          a.insertAdjacentHTML("afterbegin", g);
        });
      }
      s(f);
      function c(l) {
        let d = "",
          m = [
            "first_name",
            "first-name",
            "firstname",
            "first",
            "fname",
            "f-name",
            "given_name",
            "given-name",
            "givenname",
            "given",
          ];
        l.forEach(([g, w]) => {
          m.includes(g.toLowerCase()) && (d = w);
        });
        let p = document.querySelectorAll("[data-insert-name]");
        p.length > 0 && d !== "" && r(p, d);
      }
      c(f);
    }
    function e(a) {
      let u = new URLSearchParams(window.location.search),
        i = Array.from(u, ([c, l]) => `${c}: ${l}`),
        f = a.getAttribute("redirect");
      if (f) {
        let c = f + (f != null && f.includes("?") ? "&" : "?") + u.toString();
        a.setAttribute("redirect", c), a.setAttribute("data-redirect", c);
      }
      a.addEventListener("change", () => {
        s(a);
      }),
        a.addEventListener("input", () => {
          s(a);
        });
      function s(c) {
        let l = new FormData(c),
          d = i.join(", ");
        l.set("utm", d),
          localStorage.setItem("forwardedform", JSON.stringify(Object.fromEntries(l)));
      }
    }
    function r(a, u) {
      let i = {
        "no-space": u,
        "leading-space": "&nbsp;" + u,
        "trailing-space": u + "&nbsp;",
        "double-space": "&nbsp;" + u + "&nbsp;",
      };
      a.forEach((f) => {
        let s = f.getAttribute("data-insert-name") || "leading-space";
        i.hasOwnProperty(s) && (f.innerHTML = i[s]);
      });
    }
    let n = document.querySelectorAll("[data-crm]");
    n.length > 0 &&
      n.forEach(function (a) {
        e(a);
      });
    let o = document.querySelectorAll('[data-load-petition="true"]');
    o.length > 0 &&
      o.forEach(function (a) {
        t(a);
      });
  }
  function st() {
    document.querySelectorAll("[data-copy]").forEach((e) => {
      e.addEventListener("mouseover", function () {
        e.style.cursor = "pointer";
      }),
        e.addEventListener("click", async function () {
          let r = "",
            n = e.getAttribute("data-copy") || "";
          if ((n == null ? void 0 : n.toLowerCase()) === "url") r = window.location.href;
          else if ((n == null ? void 0 : n.toLowerCase()) === "prev-url")
            r = document.referrer || "";
          else {
            let o = document.getElementById(n);
            o != null && o.textContent ? (r = o.textContent) : (r = n || "");
          }
          try {
            await navigator.clipboard.writeText(r),
              console.log("Copied to clipboard:", r.toString());
          } catch (o) {
            console.error("Failed to copy: ", o);
          }
        });
    });
  }
  async function it() {
    let t = document.querySelectorAll("[data-js-version]");
    if (t.length < 1) return;
    let e = document.querySelector('script[src$="agera.js"]'),
      r = "";
    if (e) {
      let { src: n } = e,
        o = n.match(/@([^/]+)/);
      if (o) {
        let [, a] = o;
        (r = a), r.toLowerCase().includes("latest") && (r = await X());
      }
    }
    r !== "" &&
      t.forEach((n) => {
        n.innerText = r;
      });
  }
  function ct() {
    let t = document.querySelectorAll("a[href]"),
      e = new URLSearchParams(window.location.search);
    t.forEach((r) => {
      if (!r.href.includes("#")) {
        let n = new URL(r.href, window.location.href);
        n.searchParams.forEach((a, u) => {
          e.has(u) || e.append(u, a);
        });
        let o = e.toString();
        r.href += `${n.search ? "&" : "?"}${o}${n.hash}`;
      }
    });
  }
  var ut = "data-insert-name";
  function _t(t) {
    let e = "",
      r = [
        "first_name",
        "first-name",
        "firstname",
        "first",
        "fname",
        "f-name",
        "given_name",
        "given-name",
        "givenname",
        "given",
      ];
    t.forEach(([o, a]) => {
      r.includes(o.toLowerCase()) && (e = a);
    });
    let n = document.querySelectorAll(`[${ut}]`);
    n.length > 0 && e !== "" && Pt(n, e);
  }
  function Pt(t, e) {
    let r = {
      "no-space": e,
      "leading-space": "&nbsp;" + e,
      "trailing-space": e + "&nbsp;",
      "double-space": "&nbsp;" + e + "&nbsp;",
    };
    t.forEach((n) => {
      let o = n.getAttribute(ut) || "leading-space";
      r.hasOwnProperty(o) && (n.innerHTML = r[o]);
    });
  }
  function lt() {
    let t = A("forwardedform");
    _t(t);
  }
  var Ft = typeof atob == "function";
  var k = typeof Buffer == "function",
    mt = typeof TextDecoder == "function" ? new TextDecoder() : void 0,
    En = typeof TextEncoder == "function" ? new TextEncoder() : void 0,
    Dt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    kt = Array.prototype.slice.call(Dt),
    C = ((t) => {
      let e = {};
      return t.forEach((r, n) => (e[r] = n)), e;
    })(kt),
    Ht = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,
    L = String.fromCharCode.bind(String),
    dt =
      typeof Uint8Array.from == "function"
        ? Uint8Array.from.bind(Uint8Array)
        : (t) => new Uint8Array(Array.prototype.slice.call(t, 0));
  var ft = (t) => t.replace(/[^A-Za-z0-9\+\/]/g, "");
  var Nt = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,
    It = (t) => {
      switch (t.length) {
        case 4:
          var e =
              ((7 & t.charCodeAt(0)) << 18) |
              ((63 & t.charCodeAt(1)) << 12) |
              ((63 & t.charCodeAt(2)) << 6) |
              (63 & t.charCodeAt(3)),
            r = e - 65536;
          return L((r >>> 10) + 55296) + L((r & 1023) + 56320);
        case 3:
          return L(
            ((15 & t.charCodeAt(0)) << 12) |
              ((63 & t.charCodeAt(1)) << 6) |
              (63 & t.charCodeAt(2))
          );
        default:
          return L(((31 & t.charCodeAt(0)) << 6) | (63 & t.charCodeAt(1)));
      }
    },
    jt = (t) => t.replace(Nt, It),
    Ot = (t) => {
      if (((t = t.replace(/\s+/g, "")), !Ht.test(t)))
        throw new TypeError("malformed base64.");
      t += "==".slice(2 - (t.length & 3));
      let e,
        r = "",
        n,
        o;
      for (let a = 0; a < t.length; )
        (e =
          (C[t.charAt(a++)] << 18) |
          (C[t.charAt(a++)] << 12) |
          ((n = C[t.charAt(a++)]) << 6) |
          (o = C[t.charAt(a++)])),
          (r +=
            n === 64
              ? L((e >> 16) & 255)
              : o === 64
              ? L((e >> 16) & 255, (e >> 8) & 255)
              : L((e >> 16) & 255, (e >> 8) & 255, e & 255));
      return r;
    },
    pt = Ft
      ? (t) => atob(ft(t))
      : k
      ? (t) => Buffer.from(t, "base64").toString("binary")
      : Ot,
    qt = k
      ? (t) => dt(Buffer.from(t, "base64"))
      : (t) =>
          dt(
            pt(t)
              .split("")
              .map((e) => e.charCodeAt(0))
          );
  var Bt = k
      ? (t) => Buffer.from(t, "base64").toString("utf8")
      : mt
      ? (t) => mt.decode(qt(t))
      : (t) => jt(pt(t)),
    Vt = (t) => ft(t.replace(/[-_]/g, (e) => (e == "-" ? "+" : "/"))),
    gt = (t) => Bt(Vt(t));
  function ht() {
    document.querySelectorAll("[data-insert-query]").forEach((e) => {
      let r = e.getAttribute("data-insert-query");
      if (r) {
        let n = new URLSearchParams(window.location.search).get(r);
        n !== null &&
          (e instanceof HTMLInputElement ||
          e instanceof HTMLSelectElement ||
          e instanceof HTMLTextAreaElement
            ? (e.value = n.toString())
            : (e.textContent = n.toString()));
      }
    });
  }
  function yt() {
    document.querySelectorAll("[data-insert-b64-query]").forEach((e) => {
      let r = e.getAttribute("data-insert-b64-query");
      if (r) {
        let n = gt(new URLSearchParams(window.location.search).get(r) || "");
        n &&
          (e instanceof HTMLInputElement ||
          e instanceof HTMLSelectElement ||
          e instanceof HTMLTextAreaElement
            ? (e.value = n.toString())
            : (e.textContent = n.toString()));
      }
    });
  }
  function wt() {
    function t() {
      let a = window.location.pathname.split("/").filter((i) => i.length === 2),
        u = a.length > 0 ? a[0] : "";
      return u !== "" ? "/" + u : u;
    }
    function e(o) {
      try {
        return new URL(o), !0;
      } catch {
        return !1;
      }
    }
    function r(o, a) {
      if (o === null) return "";
      if (e(o)) {
        let u = new URL(o);
        return (u.pathname = a + u.pathname), u.toString();
      }
      return a + o;
    }
    let n = document.querySelectorAll('[data-linguana-redirect="true"]');
    for (let o of n)
      o.getAttribute("redirect") &&
        o.setAttribute("redirect", r(o.getAttribute("redirect"), t())),
        o.getAttribute("data-redirect") &&
          o.setAttribute("data-redirect", r(o.getAttribute("data-redirect"), t()));
  }
  function xt() {
    let t = new URLSearchParams(window.location.search);
    document.querySelectorAll("[data-redirect]").forEach((r) => {
      let n = r.getAttribute("data-redirect");
      try {
        if (n) {
          let o = new URL(n, document.baseURI),
            a = new URL(o.toString()),
            u = a.searchParams;
          t.forEach((i, f) => {
            u.has(f) || u.set(f, i);
          }),
            r.setAttribute("data-redirect", a.toString());
        }
      } catch (o) {
        console.error("An error occurred:", o);
      }
    });
  }
  function bt() {
    function t(e, r) {
      document.querySelectorAll(e).forEach((o) => {
        o.addEventListener("click", () => r(o));
      });
    }
    t("[data-share-whatsapp-text]", (e) => {
      let r = e.getAttribute("data-share-whatsapp-text") || "";
      window.open(`https://wa.me/?text=${encodeURIComponent(r)}`, "_blank");
    }),
      t("[data-share-facebook-url]", (e) => {
        let r = e.getAttribute("data-share-facebook-url") || "";
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(r)}`,
          "_blank"
        );
      }),
      t("[data-share-email-subject], [data-share-email-body]", (e) => {
        let r = e.getAttribute("data-share-email-subject") || "",
          n = e.getAttribute("data-share-email-body") || "",
          o = "mailto:?";
        r && (o += `subject=${encodeURIComponent(r)}`),
          n && (r && (o += "&"), (o += `body=${encodeURIComponent(n)}`)),
          window.open(o, "_self");
      }),
      t("[data-share-linkedin-url]", (e) => {
        let r = e.getAttribute("data-share-linkedin-url") || "";
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(r)}`,
          "_blank"
        );
      }),
      t("[data-share-twitter-text]", (e) => {
        let r = e.getAttribute("data-share-twitter-text") || "";
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(r)}`,
          "_blank"
        );
      });
  }
  function Lt() {
    let t = document.querySelectorAll("*"),
      e = [],
      r = !0;
    if (
      (t.forEach((n) => {
        let { attributes: o } = n;
        for (let a = 0; a < o.length; a++) {
          let u = o[a];
          u.name.startsWith("data-splitter-url")
            ? e.push(u.value)
            : u.name === "data-splitter-keep-query" && u.value === "false" && (r = !1);
        }
      }),
      e.length)
    ) {
      let n = e[Math.floor(Math.random() * e.length)],
        o = window.location,
        a = r ? new URL(n, o.origin).href + o.search : n;
      window.location.href = a;
    }
  }
  function Et() {
    let t = [document.documentElement.lang || "en", "en"];
    document.querySelectorAll("[data-insert-time]").forEach((n) => {
      n.innerText = $t(n, t);
    }),
      document.querySelectorAll("[data-remaining-days-to]").forEach((n) => {
        n.innerText = Jt(n, t);
      });
  }
  function $t(t, e) {
    let r = new Date(),
      n = t.getAttribute("data-insert-time"),
      o = "";
    if ((n == null ? void 0 : n.toLowerCase()) === "year") o = r.getFullYear().toString();
    else if ((n == null ? void 0 : n.toLowerCase()) === "month")
      o = (r.getMonth() + 1).toString();
    else if ((n == null ? void 0 : n.toLowerCase()) === "day") o = r.getDate().toString();
    else if ((n == null ? void 0 : n.toLowerCase()) === "date") o = r.toLocaleDateString(e);
    else if ((n == null ? void 0 : n.toLowerCase()) === "datetime") o = r.toLocaleString(e);
    else if ((n == null ? void 0 : n.toLowerCase()) === "time") o = r.toLocaleTimeString(e);
    else return "";
    return o;
  }
  function Jt(t, e) {
    let r = new Date(),
      n = t.getAttribute("data-remaining-days-to");
    try {
      if (n) {
        let o = new Date(n),
          a = Math.round((o.getTime() - r.getTime()) / (1e3 * 60 * 60 * 24));
        return new Intl.RelativeTimeFormat(e, { numeric: "auto" }).format(a, "day");
      }
    } catch (o) {
      console.error("remainingDays error:", o);
    }
    return "";
  }
  function Gt() {
    tt(),
      nt(),
      document.addEventListener("DOMContentLoaded", () => {
        wt(),
          at(),
          et(),
          Y(),
          rt(),
          Z(),
          ct(),
          ot(),
          st(),
          it(),
          yt(),
          lt(),
          ht(),
          xt(),
          Lt(),
          Et(),
          bt();
      });
  }
  window.agera || ((window.agera = !0), Gt());
})();
