"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ MyApp; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _layout_context_layoutcontext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../layout/context/layoutcontext */ \"./layout/context/layoutcontext.tsx\");\n/* harmony import */ var _layout_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../layout/layout */ \"./layout/layout.tsx\");\n/* harmony import */ var primereact_resources_primereact_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! primereact/resources/primereact.css */ \"./node_modules/primereact/resources/primereact.css\");\n/* harmony import */ var primereact_resources_primereact_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(primereact_resources_primereact_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var primeflex_primeflex_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! primeflex/primeflex.css */ \"./node_modules/primeflex/primeflex.css\");\n/* harmony import */ var primeflex_primeflex_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(primeflex_primeflex_css__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var primeicons_primeicons_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! primeicons/primeicons.css */ \"./node_modules/primeicons/primeicons.css\");\n/* harmony import */ var primeicons_primeicons_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(primeicons_primeicons_css__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _styles_layout_layout_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/layout/layout.scss */ \"./styles/layout/layout.scss\");\n/* harmony import */ var _styles_layout_layout_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_styles_layout_layout_scss__WEBPACK_IMPORTED_MODULE_6__);\n\nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction MyApp(param) {\n    let { Component , pageProps  } = param;\n    _s();\n    const [projects, setProjects] = useState([]);\n    const addProject = async (name)=>{\n        const newProject = await createProject(name);\n        setProjects([\n            ...projects,\n            newProject\n        ]);\n    };\n    const deleteProject = (id)=>{\n        setProjects(projects.filter((project)=>project.id !== id));\n    };\n    if (Component.getLayout) {\n        return Component.getLayout(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\mein\\\\new\\\\nextjs-blog\\\\pages\\\\_app.tsx\",\n            lineNumber: 28,\n            columnNumber: 36\n        }, this));\n    } else {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_context_layoutcontext__WEBPACK_IMPORTED_MODULE_1__.LayoutProvider, {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_layout_layout__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                    ...pageProps\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\mein\\\\new\\\\nextjs-blog\\\\pages\\\\_app.tsx\",\n                    lineNumber: 33,\n                    columnNumber: 21\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\mein\\\\new\\\\nextjs-blog\\\\pages\\\\_app.tsx\",\n                lineNumber: 32,\n                columnNumber: 17\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\ASUS\\\\Desktop\\\\mein\\\\new\\\\nextjs-blog\\\\pages\\\\_app.tsx\",\n            lineNumber: 31,\n            columnNumber: 13\n        }, this);\n    }\n}\n_s(MyApp, \"lPPzzHsH2OURXf8QVy/+Q714wnQ=\");\n_c = MyApp;\nvar _c;\n$RefreshReg$(_c, \"MyApp\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBaUU7QUFDM0I7QUFDTztBQUNaO0FBQ0U7QUFDRztBQVN2QixTQUFTRSxNQUFNLEtBQStCLEVBQUU7UUFBakMsRUFBRUMsVUFBUyxFQUFFQyxVQUFTLEVBQVMsR0FBL0I7O0lBQzFCLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHQyxTQUFvQixFQUFFO0lBRXRELE1BQU1DLGFBQWEsT0FBT0MsT0FBaUI7UUFDekMsTUFBTUMsYUFBYSxNQUFNQyxjQUFjRjtRQUN2Q0gsWUFBWTtlQUFJRDtZQUFVSztTQUFXO0lBQ3ZDO0lBRUEsTUFBTUUsZ0JBQWdCLENBQUNDLEtBQWU7UUFDcENQLFlBQVlELFNBQVNTLE1BQU0sQ0FBQ0MsQ0FBQUEsVUFBV0EsUUFBUUYsRUFBRSxLQUFLQTtJQUN4RDtJQUVBLElBQUdWLFVBQVVhLFNBQVMsRUFBRTtRQUNwQixPQUFPYixVQUFVYSxTQUFTLGVBQUMsOERBQUNiO1lBQVcsR0FBR0MsU0FBUzs7Ozs7O0lBQ3ZELE9BQU87UUFDSCxxQkFDSSw4REFBQ0oseUVBQWNBO3NCQUNYLDRFQUFDQyxzREFBTUE7MEJBQ0gsNEVBQUNFO29CQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJeEMsQ0FBQztBQUNMLENBQUM7R0F2QnVCRjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9wYWdlcy9fYXBwLnRzeD8yZmJlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExheW91dFByb3ZpZGVyIH0gZnJvbSAnLi4vbGF5b3V0L2NvbnRleHQvbGF5b3V0Y29udGV4dCc7XHJcbmltcG9ydCBMYXlvdXQgZnJvbSAnLi4vbGF5b3V0L2xheW91dCc7XHJcbmltcG9ydCAncHJpbWVyZWFjdC9yZXNvdXJjZXMvcHJpbWVyZWFjdC5jc3MnO1xyXG5pbXBvcnQgJ3ByaW1lZmxleC9wcmltZWZsZXguY3NzJztcclxuaW1wb3J0ICdwcmltZWljb25zL3ByaW1laWNvbnMuY3NzJztcclxuaW1wb3J0ICcuLi9zdHlsZXMvbGF5b3V0L2xheW91dC5zY3NzJztcclxuaW1wb3J0IHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCc7XHJcbmltcG9ydCB0eXBlIHsgUGFnZSB9IGZyb20gJy4uL3R5cGVzL3R5cGVzJztcclxuXHJcblxyXG50eXBlIFByb3BzID0gQXBwUHJvcHMgJiB7XHJcbiAgICBDb21wb25lbnQ6IFBhZ2U7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IFByb3BzKSB7XHJcbiAgICBjb25zdCBbcHJvamVjdHMsIHNldFByb2plY3RzXSA9IHVzZVN0YXRlPFByb2plY3RbXT4oW10pO1xyXG4gIFxyXG4gICAgY29uc3QgYWRkUHJvamVjdCA9IGFzeW5jIChuYW1lOiBzdHJpbmcpID0+IHtcclxuICAgICAgY29uc3QgbmV3UHJvamVjdCA9IGF3YWl0IGNyZWF0ZVByb2plY3QobmFtZSk7XHJcbiAgICAgIHNldFByb2plY3RzKFsuLi5wcm9qZWN0cywgbmV3UHJvamVjdF0pO1xyXG4gICAgfTtcclxuICBcclxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3QgPSAoaWQ6IG51bWJlcikgPT4ge1xyXG4gICAgICBzZXRQcm9qZWN0cyhwcm9qZWN0cy5maWx0ZXIocHJvamVjdCA9PiBwcm9qZWN0LmlkICE9PSBpZCkpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZihDb21wb25lbnQuZ2V0TGF5b3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIENvbXBvbmVudC5nZXRMYXlvdXQoPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxMYXlvdXRQcm92aWRlcj5cclxuICAgICAgICAgICAgICAgIDxMYXlvdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgICAgICAgICAgPC9MYXlvdXQ+XHJcbiAgICAgICAgICAgIDwvTGF5b3V0UHJvdmlkZXI+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuIl0sIm5hbWVzIjpbIkxheW91dFByb3ZpZGVyIiwiTGF5b3V0IiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJwcm9qZWN0cyIsInNldFByb2plY3RzIiwidXNlU3RhdGUiLCJhZGRQcm9qZWN0IiwibmFtZSIsIm5ld1Byb2plY3QiLCJjcmVhdGVQcm9qZWN0IiwiZGVsZXRlUHJvamVjdCIsImlkIiwiZmlsdGVyIiwicHJvamVjdCIsImdldExheW91dCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n"));

/***/ })

});