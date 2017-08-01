var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        success: function () {
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
        success: function () {
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
      return React.createElement(
        'div',
        null,
        React.createElement(NewLink, { handleSubmit: this.handleSubmit }),
        React.createElement(Search, { filterText: this.state.filterText, onFilterTextInput: this.handleFilterTextInput }),
        React.createElement(AllLinks, { links: this.state.links, filterText: this.state.filterText, handleDelete: this.handleDelete, handleMarkRead: this.handleMarkRead, onUpdate: this.handleUpdate })
      );
    }
  }]);

  return Body;
})(React.Component);