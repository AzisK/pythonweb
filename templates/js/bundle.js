/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var Router = __webpack_require__(1).default;
var Layout = __webpack_require__(2).default;
var Page = __webpack_require__(3).default;

const r = new Router(
  {
    add: new Layout(new Page('nav.html'), new Page('add.html')),
    search: new Layout(new Page('nav.html'), new Page('search.html')),
    '#default': new Page('nav.html')
  },
  document.querySelector('main')
);



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Router {
  constructor(routes, el) {
    this.routes = routes;
    this.el = el;
    window.onhashchange = this.hashChanged.bind(this);
    this.hashChanged();
  }

  async hashChanged(ev) {
    if (window.location.hash.length > 0) {
      const pageName = window.location.hash.substr(1);
      this.show(pageName);
    } else if (this.routes['#default']) {
      this.show('#default');
    }
  }

  async show(pageName) {
    const page = this.routes[pageName];
    await page.load();
    this.el.innerHTML = '';
    page.show(this.el);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Router);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Layout {
  constructor(...pages) {
    this.pages = pages;
  }

  load() {
    return Promise.all(this.pages.map(page => page.load()));
  }

  show(el) {
    for (let page of this.pages) {
      const div = document.createElement('div');
      page.show(div);
      el.appendChild(div);
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Layout);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
class Page {
  constructor(url) {
    this.url = 'views/' + url;
  }

  load() {
  	return fetch(this.url)
  		.then(response => response.text())
  		.then(data => this.html = data);
  }  

  show(el) {
    el.innerHTML = this.html;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Page);

/***/ })
/******/ ]);