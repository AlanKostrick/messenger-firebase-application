// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/components/Header.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Header;

function Header() {
  return "\n           <nav class= 'nav'>\n                <h1 class= 'nav-logo'>MyMessagesApp</h1>\n                <ul class= 'nav-list'>\n                    <li class= 'nav-list__home'>Home</li>\n                    <li class= 'nav-list__messages'>Messages</li>\n                </ul>\n            </nav>\n        ";
}
},{}],"src/components/Footer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Footer;

function Footer() {
  return "\n            <small>&copy 2019</small>\n        ";
}
},{}],"src/components/Home.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Home;

function Home() {
  return "\n        <div class='main-content'>\n        <h1 class='main-content__welcome'>Welcome to my message board</h1>\n        <h3 class='main-content__text'>Using Firebase</h3>\n        <div>\n        ";
}
},{}],"src/components/Messages.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Messages;

function Messages(messages) {
  return "\n      <div>\n      <h1>My Messages </h1>\n      ".concat(messages.docs.map(function (message) {
    var messageData = message.data();
    return "\n              <section class='main-content__messages'>\n                  <h3>Title: ".concat(messageData.title, "</h3>\n                  <p>Content: ").concat(messageData.content, "</p>\n                  <input class='delete-message__id' type='hidden' value=\"").concat(message.id, "\">\n                  <button class='delete-message__submit'>&times</button>\n                  <button class='edit-message__submit'>...</button>\n              </section>\n              ");
  }).join(''), "\n      </div>\n      <section class='add-message'>\n        <input class='add-message__messageTitle' type='text' name='title' placeholder='message title'>\n        <input class='add-message__messageBody type='text' name='content' placeholder='message content'>\n        <button class='add-message__submit'>Submit</button>\n    </section>\n      ");
}
},{}],"src/components/Tags.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Tags;

function Tags(tags) {
  return "\n        <div>\n        <h3>Tags</h3>\n        ".concat(tags.docs.map(function (tag) {
    var tagData = tag.data();
    return "\n                <ul class='main-content__tags'>\n                    <li>".concat(tagData.tagName, "</li>\n                </ul>\n                ");
  }).join(''), "\n        </div>\n        ");
}
},{}],"src/components/Message.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Message;

var _Tags = _interopRequireDefault(require("./Tags"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Message(message) {
  var messageData = message.data();
  loadTags();
  return "\n        <section class='main-content__messages'>\n            <h3>".concat(messageData.title, "</h3>\n            <p>").concat(messageData.content, "</p>\n            <div class=\"tags\"></div>\n        </section>\n            \n        <section class='update-message'>\n            <input class='update-message__messageTitle' type='text' placeholder='edit title'>\n            <input class='update-message__messageBody' type='text' placeholder='edit content'>\n            <button class='update-message__submit'>Edit</button>\n            <input class='update-message__id' type='hidden' value=\"").concat(message.id, "\">\n        </section>\n    \n        ");

  function loadTags() {
    var db = firebase.firestore();
    db.collection('messages').doc(message.id).collection('tags').get().then(function (tags) {
      document.querySelector('.tags').innerHTML = (0, _Tags.default)(tags);
    });
  }
}
},{"./Tags":"src/components/Tags.js"}],"src/components/MessageUpdate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = MessageUpdate;

function MessageUpdate() {
  return "\n      <h2 class='main-content__update'>Message successfully sent</h2>\n      ";
}
},{}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"css/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _Header = _interopRequireDefault(require("./src/components/Header"));

var _Footer = _interopRequireDefault(require("./src/components/Footer"));

var _Home = _interopRequireDefault(require("./src/components/Home"));

var _Messages = _interopRequireDefault(require("./src/components/Messages"));

var _Message = _interopRequireDefault(require("./src/components/Message"));

var _MessageUpdate = _interopRequireDefault(require("./src/components/MessageUpdate"));

require("./css/style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

pageBuild();

function pageBuild() {
  header();
  navHome();
  navMessages();
  footer();
}

function header() {
  var header = document.querySelector('#header');
  header.innerHTML = (0, _Header.default)();
}

function footer() {
  var footer = document.querySelector('#footer');
  footer.innerHTML = (0, _Footer.default)();
}

function navHome() {
  var homeButton = document.querySelector('.nav-list__home');
  homeButton.addEventListener('click', function () {
    getAppContext().innerHTML = (0, _Home.default)();
  });
}

function navMessages() {
  //get request
  var messagesButton = document.querySelector('.nav-list__messages');
  messagesButton.addEventListener('click', function () {
    getDatabaseCollectionContext().get().then(function (messages) {
      getAppContext().innerHTML = (0, _Messages.default)(messages);
    });
    focusOnSingularMessage();
  }); //post request

  getAppContext().addEventListener('click', function () {
    if (event.target.classList.contains('add-message__submit')) {
      var messageTitle = event.target.parentElement.querySelector('.add-message__messageTitle').value;
      var messageContent = event.target.parentElement.querySelector('.add-message__messageBody').value;
      getDatabaseCollectionContext().add({
        title: messageTitle,
        content: messageContent
      });
      getAppContext().innerHTML = (0, _MessageUpdate.default)();
      setTimeout(function () {
        getDatabaseCollectionContext().get().then(function (messages) {
          getAppContext().innerHTML = (0, _Messages.default)(messages);
        });
      }, 3000);
    }
  });
} //allows for focus on the single post


function focusOnSingularMessage() {
  getAppContext().addEventListener('click', function () {
    if (event.target.classList.contains('edit-message__submit')) {
      var messageId = event.target.parentElement.querySelector('.delete-message__id').value;
      getDatabaseItemContext(messageId).get().then(function (message) {
        getAppContext().innerHTML = (0, _Message.default)(message);
      });
    }
  });
}

function getAppContext() {
  var app = document.querySelector('#app');
  return app;
}

function getDatabaseCollectionContext() {
  var db = firebase.firestore();
  var messagesRef = db.collection('messages');
  return messagesRef;
}

function getDatabaseItemContext(id) {
  var db = firebase.firestore();
  var messageRef = db.collection('messages').doc(id);
  return messageRef;
}
},{"./src/components/Header":"src/components/Header.js","./src/components/Footer":"src/components/Footer.js","./src/components/Home":"src/components/Home.js","./src/components/Messages":"src/components/Messages.js","./src/components/Message":"src/components/Message.js","./src/components/MessageUpdate":"src/components/MessageUpdate.js","./css/style.css":"css/style.css"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62299" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/message-poster.e31bb0bc.js.map