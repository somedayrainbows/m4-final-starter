var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
        success: function (link) {
          return _this.props.handleSubmit(link);
        }
      });
      this.setState({ url: '', title: '' });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement('input', { ref: 'url', placeholder: 'Enter the url of the link' }),
        React.createElement('input', { ref: 'title', placeholder: 'Enter a title' }),
        React.createElement(
          'button',
          { onClick: this.handleClick },
          'Add Link'
        )
      );
    }
  }]);

  return NewLink;
})(React.Component);