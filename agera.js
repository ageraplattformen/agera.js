/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 598:
/***/ (() => {

// agera-sync.0.0.4.js 23-06-28 12:21
// Data attributes: data-crm, data-redirect-utm, data-counter-update,
// data-action-id, data-sign-method

function ageraSync(form) {
    const params = {
        thisUrl: new URL(window.location.href),
        wfSiteId: document.querySelector("html").dataset.wfSite,
        wfUrl: new URL(
            document.querySelector("html").dataset.wfSite,
            "https://webflow.com/api/v1/form/"
        ),
        backendUrl: "https://utils-api.vercel.app",
        niceUtms: Array.from(
            new URLSearchParams(window.location.search),
            ([key, value]) => `${key}: ${value}`
        ).join(", "),
        redirect: form.getAttribute("redirect") || false,
        endpoint: form.getAttribute("action")
            ? new URL(form.getAttribute("action")).toString()
            : null,
        addUtm: Boolean(form.dataset.redirectUtm) || true,
        utmSource:
            new URLSearchParams(window.location.search).get("utm_source") ||
            new URLSearchParams(window.location.search).get("source"),
        submitButton: form.querySelector('input[type="submit"]') || undefined,
    };
    params.submitText = (params.submitButton && params.submitButton.value) || "";

    // REMAP FORM DATA
    function remapFormData(form, keyMapping) {
        var remappedFormData = new FormData();

        for (var [key, value] of new FormData(form)) {
            if (keyMapping.hasOwnProperty(key)) {
                remappedFormData.append(keyMapping[key], value);
            } else {
                remappedFormData.append(key, value);
            }
        }
        return remappedFormData;
    }
    // PREP DATA FOR EACH CRM
    const prepData = {
        baseData: {
            url: params.endpoint,
            method: "POST",
            headers: { "Content-Type": "application/json" },
        },

        webFlow(form) {
            const formData = new FormData(form);
            formData.append("UTM", params.niceUtms);
            const uriBody = new URLSearchParams({
                name: form.getAttribute("name"),
                source: window.location.href,
            });

            for (const pair of formData.entries()) {
                const fieldName = `fields[${pair[0]}]`;
                uriBody.append(fieldName, pair[1]);
            }
            return {
                ...prepData.baseData,
                url: params.wfUrl.href,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: uriBody.toString(),
            };
        },

        mailChimp(form) {
            const keyMapping = {
                given_name: "FNAME",
                family_name: "LNAME",
                email: "EMAIL",
                tel: "PHONE",
                street_adress: "ADDRESS",
                postal_code: "POSTALCODE",
                adress_level2: "REGION",
                country: "COUNTRY",
            };
            const formData = remapFormData(form, keyMapping);
            const uriBody = new URLSearchParams(formData);
            uriBody.append("UTM", params.niceUtms);
            return {
                ...prepData.baseData,
                url: params.endpoint.replace("post?", "post-json?") + "&c=?",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                dataType: "jsonp",
                body: uriBody.toString(),
            };
        },

        zapier(form) {
            return {
                ...prepData.baseData,
                body: JSON.stringify({
                    [form.getAttribute("name")]: Object.fromEntries(new FormData(form)),
                    source: params.thisUrl.hostname + params.thisUrl.pathname,
                    time: new Date().toISOString(),
                    UTM: params.niceUtms,
                }),
            };
        },

        amnesty(form) {
            return {
                ...prepData.baseData,
                url: new URL("/api/amnesty", params.backendUrl).toString(),
                body: JSON.stringify({
                    form: {
                        ...Object.fromEntries(new FormData(form)),
                        action_id: form.dataset.actionId || "9999",
                        sign_method: form.dataset.signMethod || "agera-default",
                    },
                    UTM: params.niceUtms,
                    site_id: params.wfSiteId,
                }),
            };
        },

        counter(counterName) {
            return {
                ...prepData.baseData,
                url: new URL("api/counter/" + counterName, params.backendUrl).toString(),
                body: JSON.stringify({
                    form: "default",
                    site_id: params.wfSiteId,
                }),
            };
        },

        actionNetwork(form) {
            const formData = new FormData(form);
            return {
                ...prepData.baseData,
                body: JSON.stringify({
                    person: {
                        given_name: formData.get("given-name"),
                        family_name: formData.get("family-name"),
                        email_addresses: [{ address: formData.get("email") }],
                        phone_numbers: [{ number: formData.get("tel") || "" }],
                        postal_addresses: [
                            {
                                postal_code: formData.get("postal-code") || "",
                                address_lines: formData.get("street-address") || "",
                                region: formData.get("adress-level2") || "",
                                country: formData.get("country") || "",
                            },
                        ],
                    },
                    add_tags: [formData.getAll("tags") || ""],
                    "action_network:referrer_data": {
                        source: params.utmSource ? params.utmSource.toString() : "",
                        website: params.thisUrl.hostname + params.thisUrl.pathname,
                    },
                }),
            };
        },
    };

    function formStatus(form, ok) {
        const parent = form.parentNode;
        const doneElement = parent.querySelector(".w-form-done");
        const failElement = parent.querySelector(".w-form-fail");

        if (ok) {
            doneElement.style.display = "block"; // Show the success element
            failElement.style.display = "none"; // Hide the failure element
        } else {
            doneElement.style.display = "none";
            failElement.style.display = "block";
            params.submitButton.value = params.submitText;
        }
    }

    function redirect() {
        if (params.redirect) {
            console.log("Redirecting...");
            if (params.addUtm) {
                const redirectUrl = new URL(params.redirect, params.thisUrl);
                const utmParams = new URLSearchParams(window.location.search);

                redirectUrl.searchParams.forEach((value, param) => {
                    if (!utmParams.has(param)) {
                        utmParams.set(param, value);
                    }
                });

                const updatedRedirectUrl =
                    redirectUrl.origin +
                    redirectUrl.pathname +
                    (utmParams.toString() ? "?" + utmParams.toString() : "");

                window.location.href = updatedRedirectUrl;
            } else {
                window.location.href = params.redirect;
            }
        } else {
            console.log("No redirect defined");
        }
    }

    async function ajaxCall(request) {
        try {
            const result = await $.ajax({
                url: request.url,
                type: request.method,
                headers: request.headers,
                data: request.body,
                dataType: request.dataType,
            });

            return result;
        } catch (error) {
            console.error(error);
            throw new Error(error);
        }
    }

    async function handleFetchRequests(requestList, form) {
        try {
            const promises = requestList.map(async (request) => {
                if (!request.dataType) {
                    const response = await fetch(request.url, {
                        method: request.method,
                        headers: request.headers,
                        body: request.body,
                    });

                    if (!response.ok) {
                        formStatus(form, false);
                        throw new Error("Response error");
                    }
                    return response.json();
                }
                if (request.dataType === "jsonp") {
                    return await ajaxCall(request);
                }
            });

            const responses = await Promise.all(promises);

            // All responses are OK
            formStatus(form, true);
            redirect();
        } catch (error) {
            formStatus(form, false);
            console.error("An error occurred:", error);
        }
    }

    async function handleForm(form) {
        const crm = form.dataset.crm.toLowerCase();

        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            event.stopPropagation();
            params.submitButton.value = params.submitButton.dataset.wait || "Sending...";

            // list with all request DATA:
            let requestList = [];

            const crms = {
                webflow: "webFlow",
                actionnetwork: "actionNetwork",
                mailchimp: "mailChimp",
                zapier: "zapier",
                amnesty: "amnesty",
            };

            const counterUpdateName = form.dataset.counterUpdate;

            if (crms.hasOwnProperty(crm)) {
                const method = crms[crm];
                requestList.push(prepData[method](form));
            } else {
                console.log("no crm defined");
                requestList.push(prepData.webFlow(form));
            }
            if (counterUpdateName && counterUpdateName !== "default") {
                requestList.push(prepData.counter(counterUpdateName));
            }
            if (requestList.length > 0) {
                await handleFetchRequests(requestList, form);
            }
        });
    }
    return {
        handleForm,
    };
}

// Usage
document.addEventListener("DOMContentLoaded", function () {
    const crmForms = document.querySelectorAll("[data-crm]");
    for (let form of crmForms) {
        const submitter = ageraSync(form);
        submitter.handleForm(form);
    }
});


/***/ }),

/***/ 555:
/***/ (() => {

// Counter 0.1.6 230626 - 13.30
// data attributes: data-counter-name,
// data-counter-target=0, data-counter-hide-below=0, data-counter-auto-target=true, data-counter-locale="none"/"sv-SE", data-counter-compact="compact"
// css: .counter-target-value, .counter-current-value, .counter_container

function ageraCounter() {
    const apiUrl = "https://utils-api-git-experimental-vrejf.vercel.app/api/counter/"; // beta version

    function calcPercent(current, target) {
        if (current >= target) {
            return 100;
        }
        return Math.round((current / target) * 100);
    }

    function roundUp(number) {
        const breakPoints = {
            350: 50,
            500: 100,
            2_000: 250,
            5_000: 500,
            20_000: 2_500,
            50_000: 5_000,
            100_000: 10_000,
            200_000: 25_000,
            500_000: 50_000,
            1_000_000: 100_000,
        };
        const more = 250_000;
        let keys = Object.keys(breakPoints);

        let key = keys.find((k) => k >= number);

        let value = key ? breakPoints[key] : more;
        return Math.ceil((number * 1.05) / value) * value;
    }

    function setTarget(number, options) {
        if (number * 1.05 < options.target || !options.autoTarget) {
            return options.target;
        } else {
            return roundUp(number);
        }
    }

    async function fetchCounter(name) {
        console.log("fetching...");
        const url = new URL(name, apiUrl);

        try {
            let data;
            const response = await fetch(url);
            if (!response.ok) {
                data = await response.json();
                console.log(data);
                console.log(response.statusText);
            }
            data = await response.json();
            if (Number.isInteger(data.count)) {
                return data.count;
            } else {
                console.log("Count not Int");
                console.log(data);
                return 0;
            }
        } catch (e) {
            console.log("Catch error: ", e);
            return 0;
        }
    }

    function updateLimiterWidth(element, value, target) {
        element.style.width = calcPercent(value, target) + "%";
    }

    function updateElementValue(element, value, options) {
        try {
            const localeNotation = new Intl.NumberFormat(
                options.locale,
                options.compactDisplay
            ).format(value);
            element.textContent = localeNotation;
        } catch {
            options.compactDisplay.useGrouping = false;
            const localeNotation = new Intl.NumberFormat(
                undefined,
                options.compactDisplay
            ).format(value);
            element.textContent = localeNotation;
        }
    }

    function showElement(element, current, options) {
        if (current >= options.hideBelow) {
            element.style.opacity = 1;
        }
    }

    async function processCounterElement(element) {
        const counterName = element.dataset.counterName || "default";
        const options = {
            target: element.dataset.counterTarget || 0,
            hideBelow: element.dataset.counterHideBelow || 0,
            autoTarget: element.dataset.counterAutoTarget || true,
            locale:
                element.dataset.counterLocale ||
                document.documentElement.lang ||
                "undefined", //"sv-SE",
            compact: element.dataset.counterCompact || false,
            compactDisplay: {
                notation:
                    element.dataset.counterCompact === undefined ? "standard" : "compact",
            },
        };

        // get value from backend:
        let currentValue;
        if (counterName.toLowerCase() === "default") {
            currentValue = 125;
        } else {
            currentValue = await fetchCounter(counterName);
        }

        // the selected element is also the current value:
        if (element.classList.contains("counter-current-value")) {
            updateElementValue(element, currentValue, options);
            showElement(element, currentValue, options);
        } else {
            // Update all the CURRENT VALUES:
            const currentValueElements = element.querySelectorAll(".counter-current-value");
            for (let currentValueElement of currentValueElements) {
                updateElementValue(currentValueElement, currentValue, options);
                showElement(currentValueElement, currentValue, options);
            }
        }

        // Update all TARGETS:
        const targetValue = setTarget(currentValue, options);
        const targetValuesElement = element.querySelectorAll(".counter-target-value");
        for (let targetValueElement of targetValuesElement) {
            updateElementValue(targetValueElement, targetValue, options);
            showElement(targetValueElement, currentValue, options);
        }

        // Update all LIMITER
        let limiters = element.querySelectorAll(".counterbar-limiter");
        for (let limiter of limiters) {
            updateLimiterWidth(limiter, currentValue, targetValue);
        }

        showElement(element, currentValue, options);
    }
    return {
        processCounterElement,
    };
}

(function initAgeraCounter() {
    {
        // Run before DOM load:
        const hideCss = `
        .counter-target-value,
        .counter-current-value,
        .counter_container {
            opacity: 0;
            transition: opacity 0.7s;
        }
    `;

        const styleTag = document.createElement("style");
        styleTag.textContent = hideCss;
        document.head.appendChild(styleTag);
    }

    // Run after DOM load:
    document.addEventListener("DOMContentLoaded", function () {
        const counterElements = document.querySelectorAll("[data-counter-name]");
        const counter = ageraCounter();
        for (let element of counterElements) {
            counter.processCounterElement(element);
        }
    });
})();


/***/ }),

/***/ 868:
/***/ (() => {

// multistep-forward.0.4.js 23-06-22 11.19
// data attributes: data-crm, data-load-petition="true"
{
    function receive(form, entries) {
        // create hidden fields
        entries.forEach(([key, value]) => {
            const sanitizedValue = document.createTextNode(value).textContent;
            const addHtml = `<input type="hidden" id="${key}" name="${key}" value="${sanitizedValue}">`;
            form.insertAdjacentHTML("afterbegin", addHtml);

        });

        // Add UTM to multiple submits, for survey forms
        const utmParams = new URLSearchParams(window.location.search).toString();
        const submitElements = form.querySelectorAll('input[data-redirect]');

        submitElements.forEach((submitElement) => {
            const redirectUrl = submitElement.getAttribute('data-redirect');
            const updatedRedirectUrl = redirectUrl + (redirectUrl.includes('?') ? '&' : '?') + utmParams.toString();
            submitElement.setAttribute('data-redirect', updatedRedirectUrl);
        });

    };

    function send(form) {
        const urlParams = new URLSearchParams(window.location.search);

        const utmArray = [];
        urlParams.forEach((value, key) => {
            utmArray.push(`${key}: ${value}`);
        });

        localStorage.removeItem("multistepforward");
        const existingRedirectUrl = form.getAttribute('redirect');
        const updatedRedirectUrl = existingRedirectUrl + (existingRedirectUrl.includes('?') ? '&' : '?') + urlParams.toString();
        form.setAttribute('redirect', updatedRedirectUrl);
        form.setAttribute('data-redirect', updatedRedirectUrl);

        form.addEventListener("change", e => { saveInputs(form) });
        form.addEventListener("input", e => { saveInputs(form) })

        // Save inputs to localStorage
        function saveInputs(form) {
            let formData = new FormData(form)

            const utmString = utmArray.join(', ');
            formData.set("utm", utmString);

            localStorage.setItem("multistepforward", JSON.stringify(Object.fromEntries(formData)));
        };
    };

    // when DOM is loaded:
    document.addEventListener("DOMContentLoaded", function () {
        // const forwardForms = document.querySelectorAll('[data-form-forward="true"]');
        const forwardForms = document.querySelectorAll("[data-crm]");
        const loadForms = document.querySelectorAll('[data-load-petition="true"]');

        // Forward and save to localStorage:
        if (forwardForms.length > 0) {
            forwardForms.forEach(function (form) {
                console.log("Forward this form:" + form.getAttribute("id"));
                send(form)
            });
        };

        // Load from localStorage:
        if (loadForms.length > 0 && localStorage !== null) {
            loadForms.forEach(function (form) {
                console.log("Load data to this form: " + form.getAttribute("id"));
                const savedInputs = JSON.parse(localStorage.getItem("multistepforward"));

                receive(form, Object.entries(savedInputs));
            })
            localStorage.removeItem("multistepforward");
        };
    });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _modules_agera_sync_0_0_4_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(598);
/* harmony import */ var _modules_agera_sync_0_0_4_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_agera_sync_0_0_4_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_counter_lib_0_1_6_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(555);
/* harmony import */ var _modules_counter_lib_0_1_6_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_counter_lib_0_1_6_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_multistep_forward_0_4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(868);
/* harmony import */ var _modules_multistep_forward_0_4_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_multistep_forward_0_4_js__WEBPACK_IMPORTED_MODULE_2__);




})();

/******/ })()
;