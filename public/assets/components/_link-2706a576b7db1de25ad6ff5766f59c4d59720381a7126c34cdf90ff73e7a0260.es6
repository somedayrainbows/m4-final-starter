var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      var title = this.state.editable ? React.createElement('input', { type: 'text', ref: 'title', defaultValue: this.props.link.title }) : React.createElement(
        'h4',
        null,
        this.props.link.title
      );
      var url = this.state.editable ? React.createElement('input', { type: 'text', ref: 'url', defaultValue: this.props.link.url }) : React.createElement(
        'p',
        null,
        this.props.link.url
      );
      var read = this.state.editable ? React.createElement('input', { type: 'text', ref: 'read', defaultValue: this.props.link.read }) : React.createElement(
        'p',
        null,
        this.props.link.read
      );
      return React.createElement(
        'div',
        null,
        title,
        url,
        read,
        React.createElement(
          'button',
          { onClick: this.props.handleMarkRead },
          'Change Read Status'
        ),
        React.createElement(
          'button',
          { onClick: this.props.handleDelete },
          'Delete'
        ),
        React.createElement(
          'button',
          { onClick: this.handleEdit },
          ' ',
          this.state.editable ? 'Submit' : 'Edit',
          ' '
        )
      );
    }
  }]);

  return Link;
})(React.Component);