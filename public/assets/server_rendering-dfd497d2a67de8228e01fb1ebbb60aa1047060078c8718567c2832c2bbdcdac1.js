(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"), require("react-dom/server"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom", "react-dom/server"], factory);
	else if(typeof exports === 'object')
		exports["ReactRailsUJS"] = factory(require("react"), require("react-dom"), require("react-dom/server"));
	else
		root["ReactRailsUJS"] = factory(root["React"], root["ReactDOM"], root["ReactDOMServer"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// Assume className is simple and can be found at top-level (window).
// Fallback to eval to handle cases like 'My.React.ComponentName'.
// Also, try to gracefully import Babel 6 style default exports
var topLevel = typeof window === "undefined" ? this : window;

module.exports = function(className) {
  var constructor;
  // Try to access the class globally first
  constructor = topLevel[className];

  // If that didn't work, try eval
  if (!constructor) {
    constructor = eval(className);
  }

  // Lastly, if there is a default attribute try that
  if (constructor && constructor['default']) {
    constructor = constructor['default'];
  }

  return constructor;
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var nativeEvents = __webpack_require__(7)
var pjaxEvents = __webpack_require__(8)
var turbolinksEvents = __webpack_require__(9)
var turbolinksClassicDeprecatedEvents = __webpack_require__(11)
var turbolinksClassicEvents = __webpack_require__(10)

// see what things are globally available
// and setup event handlers to those things
module.exports = function(ujs) {
  if (ujs.handleEvent) {
    // We're calling this a second time -- remove previous handlers
    if (typeof Turbolinks.EVENTS !== "undefined") {
      turbolinksClassicEvents.teardown(ujs);
    }
    turbolinksEvents.teardown(ujs);
    turbolinksClassicDeprecatedEvents.teardown(ujs);
    pjaxEvents.teardown(ujs);
    nativeEvents.teardown(ujs);
  }

  if (ujs.jQuery) {
    ujs.handleEvent = function(eventName, callback) {
      ujs.jQuery(document).on(eventName, callback);
    };
    ujs.removeEvent = function(eventName, callback) {
      ujs.jQuery(document).off(eventName, callback);
    }
  } else if ('addEventListener' in window) {
    ujs.handleEvent = function(eventName, callback) {
      document.addEventListener(eventName, callback);
    };
    ujs.removeEvent = function(eventName, callback) {
      document.removeEventListener(eventName, callback);
    };
  } else {
    ujs.handleEvent = function(eventName, callback) {
      window.attachEvent(eventName, callback);
    };
    ujs.removeEvent = function(eventName, callback) {
      window.detachEvent(eventName, callback);
    };
  }

  // Detect which kind of events to set up:
  if (typeof Turbolinks !== 'undefined' && Turbolinks.supported) {
    if (typeof Turbolinks.EVENTS !== 'undefined') {
      // Turbolinks.EVENTS is in classic version 2.4.0+
      turbolinksClassicEvents.setup(ujs)
    } else if (typeof Turbolinks.controller !== "undefined") {
      // Turbolinks.controller is in version 5+
      turbolinksEvents.setup(ujs);
    } else {
      turbolinksClassicDeprecatedEvents.setup(ujs);
    }
  } else if (typeof $ !== "undefined" && typeof $.pjax === 'function') {
    pjaxEvents.setup(ujs);
  } else {
    nativeEvents.setup(ujs);
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Make a function which:
// - First tries to require the name
// - Then falls back to global lookup
var fromGlobal = __webpack_require__(0)
var fromRequireContext = __webpack_require__(12)

module.exports = function(reqctx) {
  var fromCtx = fromRequireContext(reqctx)
  return function(className) {
    var component;
    try {
      // `require` will raise an error if this className isn't found:
      component = fromCtx(className)
    } catch (firstErr) {
      // fallback to global:
      try {
        component = fromGlobal(className)
      } catch (secondErr) {
        console.error(firstErr)
        console.error(secondErr)
      }
    }
    return component
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var React = __webpack_require__(3)
var ReactDOM = __webpack_require__(4)
var ReactDOMServer = __webpack_require__(5)

var detectEvents = __webpack_require__(1)
var constructorFromGlobal = __webpack_require__(0)
var constructorFromRequireContextWithGlobalFallback = __webpack_require__(2)

var ReactRailsUJS = {
  // This attribute holds the name of component which should be mounted
  // example: `data-react-class="MyApp.Items.EditForm"`
  CLASS_NAME_ATTR: 'data-react-class',

  // This attribute holds JSON stringified props for initializing the component
  // example: `data-react-props="{\"item\": { \"id\": 1, \"name\": \"My Item\"} }"`
  PROPS_ATTR: 'data-react-props',

  // If jQuery is detected, save a reference to it for event handlers
  jQuery: (typeof window !== 'undefined') && (typeof window.jQuery !== 'undefined') && window.jQuery,

  // helper method for the mount and unmount methods to find the
  // `data-react-class` DOM elements
  findDOMNodes: function(searchSelector) {
    var classNameAttr = ReactRailsUJS.CLASS_NAME_ATTR
    // we will use fully qualified paths as we do not bind the callbacks
    var selector, parent;

    switch (typeof searchSelector) {
      case 'undefined':
        selector = '[' + classNameAttr + ']';
        parent = document;
        break;
      case 'object':
        selector = '[' + classNameAttr + ']';
        parent = searchSelector;
        break;
      case 'string':
        selector = searchSelector + '[' + classNameAttr + '], ' +
                   searchSelector + ' [' + classNameAttr + ']';
        parent = document;
        break
      default:
        break;
    }

    if (ReactRailsUJS.jQuery) {
      return ReactRailsUJS.jQuery(selector, parent);
    } else {
      return parent.querySelectorAll(selector);
    }
  },

  // Get the constructor for a className (returns a React class)
  // Override this function to lookup classes in a custom way,
  // the default is ReactRailsUJS.ComponentGlobal
  getConstructor: constructorFromGlobal,

  // Given a Webpack `require.context`,
  // try finding components with `require`,
  // then falling back to global lookup.
  useContext: function(requireContext) {
    this.getConstructor = constructorFromRequireContextWithGlobalFallback(requireContext)
  },

  // Render `componentName` with `props` to a string,
  // using the specified `renderFunction` from `react-dom/server`.
  serverRender: function(renderFunction, componentName, props) {
    var componentClass = this.getConstructor(componentName)
    var element = React.createElement(componentClass, props)
    return ReactDOMServer[renderFunction](element)
  },

  // Within `searchSelector`, find nodes which should have React components
  // inside them, and mount them with their props.
  mountComponents: function(searchSelector) {
    var ujs = ReactRailsUJS
    var nodes = ujs.findDOMNodes(searchSelector);

    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      var className = node.getAttribute(ujs.CLASS_NAME_ATTR);
      var constructor = ujs.getConstructor(className);
      var propsJson = node.getAttribute(ujs.PROPS_ATTR);
      var props = propsJson && JSON.parse(propsJson);

      if (!constructor) {
        var message = "Cannot find component: '" + className + "'"
        if (console && console.log) {
          console.log("%c[react-rails] %c" + message + " for element", "font-weight: bold", "", node)
        }
        throw new Error(message + ". Make sure your component is available to render.")
      } else {
        ReactDOM.render(React.createElement(constructor, props), node);
      }
    }
  },

  // Within `searchSelector`, find nodes which have React components
  // inside them, and unmount those components.
  unmountComponents: function(searchSelector) {
    var nodes = ReactRailsUJS.findDOMNodes(searchSelector);

    for (var i = 0; i < nodes.length; ++i) {
      var node = nodes[i];
      ReactDOM.unmountComponentAtNode(node);
    }
  },

  // Check the global context for installed libraries
  // and figure out which library to hook up to (pjax, Turbolinks, jQuery)
  // This is called on load, but you can call it again if needed
  // (It will unmount itself)
  detectEvents: function() {
    detectEvents(this)
  },
}

// These stable references are so that handlers can be added and removed:
ReactRailsUJS.handleMount = function(e) {
  var target = undefined;
  if (e && e.target) {
    target = e.target;
  }
  ReactRailsUJS.mountComponents(target);
}
ReactRailsUJS.handleUnmount = function(e) {
  var target = undefined;
  if (e && e.target) {
    target = e.target;
  }
  ReactRailsUJS.unmountComponents(target);
}


if (typeof window !== "undefined") {
  // Only setup events for browser (not server-rendering)
  ReactRailsUJS.detectEvents()
}

// It's a bit of a no-no to populate the global namespace,
// but we really need it!
// We need access to this object for server rendering, and
// we can't do a dynamic `require`, so we'll grab it from here:
self.ReactRailsUJS = ReactRailsUJS

module.exports = ReactRailsUJS


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = {
  // Attach handlers to browser events to mount
  // (There are no unmount handlers since the page is destroyed on navigation)
  setup: function(ujs) {
    if (ujs.jQuery) {
      // Use jQuery if it's present:
      ujs.handleEvent("ready", ujs.handleMount);
    } else if ('addEventListener' in window) {
      ujs.handleEvent('DOMContentLoaded', ujs.handleMount);
    } else {
      // add support to IE8 without jQuery
      ujs.handleEvent('onload', ujs.handleMount);
    }
  },

  teardown: function(ujs) {
    ujs.removeEvent("ready", ujs.handleMount);
    ujs.removeEvent('DOMContentLoaded', ujs.handleMount);
    ujs.removeEvent('onload', ujs.handleMount);
  }
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
  // pjax support
  setup: function(ujs) {
    ujs.handleEvent('ready', ujs.handleMount);
    ujs.handleEvent('pjax:end', ujs.handleMount);
    ujs.handleEvent('pjax:beforeReplace', ujs.handleUnmount);
  },

  teardown: function(ujs) {
    ujs.removeEvent('ready', ujs.handleMount);
    ujs.removeEvent('pjax:end', ujs.handleMount);
    ujs.removeEvent('pjax:beforeReplace', ujs.handleUnmount);
  },
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = {
  // Turbolinks 5+ got rid of named events (?!)
  setup: function(ujs) {
    ujs.handleEvent('DOMContentLoaded', ujs.handleMount)
    ujs.handleEvent('turbolinks:render', ujs.handleMount)
    ujs.handleEvent('turbolinks:before-render', ujs.handleUnmount)
  },

  teardown: function(ujs) {
    ujs.removeEvent('DOMContentLoaded', ujs.handleMount)
    ujs.removeEvent('turbolinks:render', ujs.handleMount)
    ujs.removeEvent('turbolinks:before-render', ujs.handleUnmount)
  },
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = {
  // Attach handlers to Turbolinks-Classic events
  // for mounting and unmounting components
  setup: function(ujs) {
    ujs.handleEvent(Turbolinks.EVENTS.CHANGE, ujs.handleMount);
    ujs.handleEvent(Turbolinks.EVENTS.BEFORE_UNLOAD, ujs.handleUnmount);
  },
  teardown: function(ujs) {
    ujs.removeEvent(Turbolinks.EVENTS.CHANGE, ujs.handleMount);
    ujs.removeEvent(Turbolinks.EVENTS.BEFORE_UNLOAD, ujs.handleUnmount);
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = {
  // Before Turbolinks 2.4.0, Turbolinks didn't
  // have named events and didn't have a before-unload event.
  // Also, it didn't work with the Turbolinks cache, see
  // https://github.com/reactjs/react-rails/issues/87
  setup: function(ujs) {
    Turbolinks.pagesCached(0)
    ujs.handleEvent('page:change', ujs.handleMount);
    ujs.handleEvent('page:receive', ujs.handleUnmount);
  },
  teardown: function(ujs) {
    ujs.removeEvent('page:change', ujs.handleMount);
    ujs.removeEvent('page:receive', ujs.handleUnmount);
  }
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// Load React components by requiring them from "components/", for example:
//
// - "pages/index" -> `require("components/pages/index")`
// - "pages/show.Header" -> `require("components/pages/show").Header`
// - "pages/show.Body.Content" -> `require("components/pages/show").Body.Content`
//
module.exports = function(reqctx) {
  return function(className) {
    var parts = className.split(".")
    var filename = parts.shift()
    var keys = parts
    // Load the module:
    var component = reqctx("./" + filename)
    // Then access each key:
    keys.forEach(function(k) {
      component = component[k]
    })
    // support `export default`
    if (component.__esModule) {
      component = component["default"]
    }
    return component
  }
}


/***/ })
/******/ ]);
});
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var AllLinks = (function (_React$Component) {
  _inherits(AllLinks, _React$Component);

  function AllLinks(props) {
    _classCallCheck(this, AllLinks);

    _get(Object.getPrototypeOf(AllLinks.prototype), "constructor", this).call(this, props);

    this.onUpdate = this.onUpdate.bind(this);
  }

  _createClass(AllLinks, [{
    key: "handleDelete",
    value: function handleDelete(id) {
      this.props.handleDelete(id);
    }
  }, {
    key: "handleMarkRead",
    value: function handleMarkRead(link) {
      this.props.handleMarkRead(link);
    }
  }, {
    key: "handleEdit",
    value: function handleEdit() {}
  }, {
    key: "onUpdate",
    value: function onUpdate(link) {
      this.props.onUpdate(link);
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var links = this.props.links.map(function (link) {
        return React.createElement("div", { className: "links", key: link.id }, React.createElement(Link, {
          link: link,
          handleDelete: _this.handleDelete.bind(_this, link.id),
          filterText: _this.props.filterText,
          handleMarkRead: _this.handleMarkRead.bind(_this, link),
          handleUpdate: _this.onUpdate }));
      });
      return React.createElement("div", null, links);
    }
  }]);

  return AllLinks;
})(React.Component);
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Body = (function (_React$Component) {
  _inherits(Body, _React$Component);

  function Body(props) {
    _classCallCheck(this, Body);

    _get(Object.getPrototypeOf(Body.prototype), 'constructor', this).call(this, props);

    this.state = {
      filterText: '',
      links: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateLinks = this.updateLinks.bind(this);
    // this.sendToHotReads = this.sendToHotReads.bind(this)
    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
  }

  _createClass(Body, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this = this;

      $.getJSON('/api/v1/links', function (links) {
        return _this.setState({ links: links });
      });
    }
  }, {
    key: 'handleFilterTextInput',
    value: function handleFilterTextInput(filterText) {
      this.setState({
        filterText: filterText
      });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(link) {
      var newState = this.state.links.concat(link);
      this.setState({ links: newState });
    }
  }, {
    key: 'handleDelete',
    value: function handleDelete(id) {
      var _this2 = this;

      $.ajax({
        url: '/api/v1/links/' + id,
        type: 'DELETE',
        success: function success() {
          return _this2.removeLink(id);
        }
      });
    }
  }, {
    key: 'removeLink',
    value: function removeLink(id) {
      var newLinks = this.state.links.filter(function (link) {
        return link.id != id;
      });
      this.setState({ links: newLinks });
    }
  }, {
    key: 'handleMarkRead',
    value: function handleMarkRead(link) {
      $.ajax({
        url: '/api/v1/links/' + link.id,
        type: 'PATCH',
        data: { read: true }
      }).success(function (data) {
        this.sendToHotReads.bind(this);
      });
    }
  }, {
    key: 'sendToHotReads',
    value: function sendToHotReads(link) {
      $.ajax({
        url: 'https://guarded-reef-14770.herokuapp.com/api/v1/links',
        type: 'POST',
        data: { link: url },
        success: console.log("success!")
      });
    }
  }, {
    key: 'displayFailure',
    value: function displayFailure(failureData) {
      console.log("FAILED attempt to update Link: " + failureData.responseText);
    }
  }, {
    key: 'handleUpdate',
    value: function handleUpdate(link) {
      var _this3 = this;

      $.ajax({
        url: '/api/v1/links/' + link.id,
        type: 'PUT',
        data: { link: link },
        success: function success() {
          return _this3.updateLinks(link);
        }
      });
    }
  }, {
    key: 'updateLinks',
    value: function updateLinks(link) {
      var links = this.state.links.filter(function (i) {
        return i.id != link.id;
      });
      links.push(link);
      this.setState({ links: links });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', null, React.createElement(NewLink, { handleSubmit: this.handleSubmit }), React.createElement(Search, { filterText: this.state.filterText, onFilterTextInput: this.handleFilterTextInput }), React.createElement(AllLinks, { links: this.state.links, filterText: this.state.filterText, handleDelete: this.handleDelete, handleMarkRead: this.handleMarkRead, onUpdate: this.handleUpdate }));
    }
  }]);

  return Body;
})(React.Component);
"use strict";

var Header = React.createClass({
  displayName: "Header",

  render: function render() {
    return React.createElement("div", null, React.createElement("h1", null));
  }
});
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Link = (function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link(props) {
    _classCallCheck(this, Link);

    _get(Object.getPrototypeOf(Link.prototype), 'constructor', this).call(this, props);

    this.state = { editable: false, title: this.props.link.title, url: this.props.link.url, read: this.props.link.read };
    this.handleEdit = this.handleEdit.bind(this);
  }

  _createClass(Link, [{
    key: 'handleEdit',
    value: function handleEdit() {
      if (this.state.editable) {
        var id = this.props.link.id;
        var title = this.refs.title.value;
        var url = this.refs.url.value;
        var read = this.refs.read.value;
        var link = { id: id, title: title, url: url, read: read };
        this.props.handleUpdate(link);
      }
      this.setState({ editable: !this.state.editable });
    }
  }, {
    key: 'render',
    value: function render() {
      var title = this.state.editable ? React.createElement('input', { type: 'text', ref: 'title', defaultValue: this.props.link.title }) : React.createElement('h4', null, this.props.link.title);
      var url = this.state.editable ? React.createElement('input', { type: 'text', ref: 'url', defaultValue: this.props.link.url }) : React.createElement('p', null, this.props.link.url);
      var read = this.state.editable ? React.createElement('input', { type: 'text', ref: 'read', defaultValue: this.props.link.read }) : React.createElement('p', null, this.props.link.read);
      return React.createElement('div', null, title, url, read, React.createElement('button', { onClick: this.props.handleMarkRead }, 'Change Read Status'), React.createElement('button', { onClick: this.props.handleDelete }, 'Delete'), React.createElement('button', { onClick: this.handleEdit }, ' ', this.state.editable ? 'Submit' : 'Edit', ' '));
    }
  }]);

  return Link;
})(React.Component);
"use strict";

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Main = (function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main() {
    _classCallCheck(this, Main);

    _get(Object.getPrototypeOf(Main.prototype), "constructor", this).apply(this, arguments);
  }

  _createClass(Main, [{
    key: "render",
    value: function render() {
      return React.createElement("div", null, React.createElement(Header, null), React.createElement(Body, null));
    }
  }]);

  return Main;
})(React.Component);
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var NewLink = (function (_React$Component) {
  _inherits(NewLink, _React$Component);

  function NewLink(props) {
    _classCallCheck(this, NewLink);

    _get(Object.getPrototypeOf(NewLink.prototype), 'constructor', this).call(this, props);

    this.state = { url: '', title: '' };
    this.handleClick = this.handleClick.bind(this);
  }

  _createClass(NewLink, [{
    key: 'handleClick',
    value: function handleClick() {
      var _this = this;

      var url = this.refs.url.value;
      var title = this.refs.title.value;
      $.ajax({
        url: '/api/v1/links',
        type: 'POST',
        data: { link: { url: url, title: title, title: title } },
        success: function success(link) {
          return _this.props.handleSubmit(link);
        }
      });
      this.setState({ url: '', title: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('div', null, React.createElement('input', { ref: 'url', placeholder: 'Enter the url of the link' }), React.createElement('input', { ref: 'title', placeholder: 'Enter a title' }), React.createElement('button', { onClick: this.handleClick }, 'Add Link'));
    }
  }]);

  return NewLink;
})(React.Component);
'use strict';

var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
})();

var _get = function get(_x, _x2, _x3) {
  var _again = true;_function: while (_again) {
    var object = _x,
        property = _x2,
        receiver = _x3;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);if (parent === null) {
        return undefined;
      } else {
        _x = parent;_x2 = property;_x3 = receiver;_again = true;desc = parent = undefined;continue _function;
      }
    } else if ('value' in desc) {
      return desc.value;
    } else {
      var getter = desc.get;if (getter === undefined) {
        return undefined;
      }return getter.call(receiver);
    }
  }
};

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Search = (function (_React$Component) {
  _inherits(Search, _React$Component);

  function Search(props) {
    _classCallCheck(this, Search);

    _get(Object.getPrototypeOf(Search.prototype), 'constructor', this).call(this, props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
  }

  _createClass(Search, [{
    key: 'handleFilterTextInputChange',
    value: function handleFilterTextInputChange(e) {
      this.props.onFilterTextInput(e.target.value);
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement('form', null, React.createElement('input', { type: 'text',
        placeholder: 'Start typing to filter...',
        value: this.props.filterText,
        onChange: this.handleFilterTextInputChange
      }));
    }
  }]);

  return Search;
})(React.Component);


//
// By default, this file is loaded for server-side rendering.
// It should require your components and any dependencies.
;
