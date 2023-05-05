"use strict";
(() => {
var exports = {};
exports.id = 344;
exports.ids = [344];
exports.modules = {

/***/ 5299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ login)
});

// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
// EXTERNAL MODULE: ./layout/AppConfig.tsx
var AppConfig = __webpack_require__(5895);
;// CONCATENATED MODULE: external "primereact/checkbox"
const checkbox_namespaceObject = require("primereact/checkbox");
// EXTERNAL MODULE: external "primereact/button"
var button_ = __webpack_require__(1088);
;// CONCATENATED MODULE: external "primereact/password"
const password_namespaceObject = require("primereact/password");
// EXTERNAL MODULE: ./layout/context/layoutcontext.tsx
var layoutcontext = __webpack_require__(6057);
;// CONCATENATED MODULE: external "primereact/inputtext"
const inputtext_namespaceObject = require("primereact/inputtext");
// EXTERNAL MODULE: external "primereact/utils"
var utils_ = __webpack_require__(4355);
;// CONCATENATED MODULE: ./pages/auth/login/index.tsx
/* eslint-disable @next/next/no-img-element */ 









const LoginPage = ()=>{
    const [password, setPassword] = (0,external_react_.useState)("");
    const [checked, setChecked] = (0,external_react_.useState)(false);
    const { layoutConfig  } = (0,external_react_.useContext)(layoutcontext/* LayoutContext */.V);
    const router = (0,router_.useRouter)();
    const containerClassName = (0,utils_.classNames)("surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden", {
        "p-input-filled": layoutConfig.inputStyle === "filled"
    });
    return /*#__PURE__*/ jsx_runtime.jsx("div", {
        className: containerClassName,
        children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
            className: "flex flex-column align-items-center justify-content-center",
            children: [
                /*#__PURE__*/ jsx_runtime.jsx("img", {
                    src: `/layout/images/logo-${layoutConfig.colorScheme === "light" ? "dark" : "white"}.svg`,
                    alt: "Sakai logo",
                    className: "mb-5 w-6rem flex-shrink-0"
                }),
                /*#__PURE__*/ jsx_runtime.jsx("div", {
                    style: {
                        borderRadius: "56px",
                        padding: "0.3rem",
                        background: "linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
                    },
                    children: /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                        className: "w-full surface-card py-8 px-5 sm:px-8",
                        style: {
                            borderRadius: "53px"
                        },
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                className: "text-center mb-5",
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("img", {
                                        src: "/demo/images/login/avatar.png",
                                        alt: "Image",
                                        height: "50",
                                        className: "mb-3"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("div", {
                                        className: "text-900 text-3xl font-medium mb-3",
                                        children: "Welcome, Isabel!"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("span", {
                                        className: "text-600 font-medium",
                                        children: "Sign in to continue"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                children: [
                                    /*#__PURE__*/ jsx_runtime.jsx("label", {
                                        htmlFor: "email1",
                                        className: "block text-900 text-xl font-medium mb-2",
                                        children: "Email"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(inputtext_namespaceObject.InputText, {
                                        id: "email1",
                                        type: "text",
                                        placeholder: "Email address",
                                        className: "w-full md:w-30rem mb-5",
                                        style: {
                                            padding: "1rem"
                                        }
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx("label", {
                                        htmlFor: "password1",
                                        className: "block text-900 font-medium text-xl mb-2",
                                        children: "Password"
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(password_namespaceObject.Password, {
                                        inputId: "password1",
                                        value: password,
                                        onChange: (e)=>setPassword(e.target.value),
                                        placeholder: "Password",
                                        toggleMask: true,
                                        className: "w-full mb-5",
                                        inputClassName: "w-full p-3 md:w-30rem"
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                        className: "flex align-items-center justify-content-between mb-5 gap-5",
                                        children: [
                                            /*#__PURE__*/ (0,jsx_runtime.jsxs)("div", {
                                                className: "flex align-items-center",
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime.jsx(checkbox_namespaceObject.Checkbox, {
                                                        inputId: "rememberme1",
                                                        checked: checked,
                                                        onChange: (e)=>setChecked(e.checked ?? false),
                                                        className: "mr-2"
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime.jsx("label", {
                                                        htmlFor: "rememberme1",
                                                        children: "Remember me"
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx_runtime.jsx("a", {
                                                className: "font-medium no-underline ml-2 text-right cursor-pointer",
                                                style: {
                                                    color: "var(--primary-color)"
                                                },
                                                children: "Forgot password?"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx_runtime.jsx(button_.Button, {
                                        label: "Sign In",
                                        className: "w-full p-3 text-xl",
                                        onClick: ()=>router.push("/")
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        })
    });
};
LoginPage.getLayout = function getLayout(page) {
    return /*#__PURE__*/ (0,jsx_runtime.jsxs)((external_react_default()).Fragment, {
        children: [
            page,
            /*#__PURE__*/ jsx_runtime.jsx(AppConfig/* default */.Z, {
                simple: true
            })
        ]
    });
};
/* harmony default export */ const login = (LoginPage);


/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 2250:
/***/ ((module) => {

module.exports = require("primereact/api");

/***/ }),

/***/ 1088:
/***/ ((module) => {

module.exports = require("primereact/button");

/***/ }),

/***/ 5452:
/***/ ((module) => {

module.exports = require("primereact/inputswitch");

/***/ }),

/***/ 2948:
/***/ ((module) => {

module.exports = require("primereact/radiobutton");

/***/ }),

/***/ 2720:
/***/ ((module) => {

module.exports = require("primereact/sidebar");

/***/ }),

/***/ 4355:
/***/ ((module) => {

module.exports = require("primereact/utils");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [893,895], () => (__webpack_exec__(5299)));
module.exports = __webpack_exports__;

})();