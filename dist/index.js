'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactMirror = require('react-mirror');

var _reactMirror2 = _interopRequireDefault(_reactMirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Monkey patch for react-mirror


_react2.default.unstable_renderSubtreeIntoContainer = _reactDom.unstable_renderSubtreeIntoContainer;

var MinimapWrapper = function (_Component) {
  _inherits(MinimapWrapper, _Component);

  function MinimapWrapper(props) {
    _classCallCheck(this, MinimapWrapper);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MinimapWrapper).call(this, props));

    _this.onResize = _this.onResize.bind(_this);
    return _this;
  }

  _createClass(MinimapWrapper, [{
    key: 'onResize',
    value: function onResize() {
      this.setState({
        windowWidth: this.window.innerWidth,
        windowHeight: this.window.innerHeight
      });

      this.measure();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.onResize();
    }
  }, {
    key: 'measure',
    value: function measure() {
      if (this.mounted) {
        var surface = _reactDom2.default.findDOMNode(this.props.parent.refs.surface);
        var wrapperStyle = getComputedStyle(this.refs.wrapper);

        this.setState({
          width: parseInt(wrapperStyle.getPropertyValue('width'), 10),
          height: parseInt(wrapperStyle.getPropertyValue('height'), 10),
          scrollWidth: surface.scrollWidth,
          scrollHeight: surface.scrollHeight
        });
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mounted = true;
      this.window.addEventListener('resize', this.onResize);

      this.measure();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.mounted = false;
      this.window.removeEventListener('resize', this.onResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = _extends({}, this.state, { window: this.window });
      var _state = this.state;
      var width = _state.width;
      var height = _state.height;


      var wrapperStyle = {
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      };

      return _react2.default.createElement(
        'div',
        { className: 'react-minimap' },
        _react2.default.createElement(
          'div',
          { ref: 'wrapper', style: wrapperStyle },
          width && height ? _react2.default.cloneElement(this.props.children, props) : null
        )
      );
    }
  }, {
    key: 'window',
    get: function get() {
      return this.props.window || window;
    }
  }]);

  return MinimapWrapper;
}(_react.Component);

var MinimapInner = function (_Component2) {
  _inherits(MinimapInner, _Component2);

  function MinimapInner(props) {
    _classCallCheck(this, MinimapInner);

    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(MinimapInner).call(this, props));

    _this2.onScroll = _this2.onScroll.bind(_this2);
    _this2.scrollTo = _this2.scrollTo.bind(_this2);
    _this2.onDragStart = _this2.onDragStart.bind(_this2);
    _this2.onDrag = _this2.onDrag.bind(_this2);
    _this2.onDragEnd = _this2.onDragEnd.bind(_this2);
    return _this2;
  }

  _createClass(MinimapInner, [{
    key: 'onScroll',
    value: function onScroll() {
      var win = this.window;
      var doc = document.documentElement;

      this.setState({
        scroll: {
          top: win.scrollTop || win.pageYOffset || doc.scrollTop,
          left: win.scrollLeft || win.pageXOffset || doc.scrollLeft
        }
      });
    }
  }, {
    key: 'scrollTo',
    value: function scrollTo(e) {
      var scroll = this.state.scroll;
      var _props = this.props;
      var windowHeight = _props.windowHeight;
      var scrollHeight = _props.scrollHeight;
      var height = _props.height;


      var overlayElement = _reactDom2.default.findDOMNode(this.refs.overlay);

      var halfThumbHeight = windowHeight * this.scaleFactor / 2;

      var y = e.clientY - overlayElement.getBoundingClientRect().top - halfThumbHeight;

      this.window.scroll(scroll.left, y / this.scaleFactor);
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(e) {
      e.preventDefault();

      window.addEventListener('mousemove', this.onDrag);
      window.addEventListener('mouseup', this.onDragEnd);

      this.onDrag(e);
    }
  }, {
    key: 'onDrag',
    value: function onDrag(e) {
      e.preventDefault();
      var windowHeight = this.props.windowHeight;


      this.scrollTo(e);
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd(e) {
      e.preventDefault();

      window.removeEventListener('mousemove', this.onDrag);
      window.removeEventListener('mouseup', this.onDragEnd);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.onScroll();
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.refs.mirror.reflect(this.props.parent.refs.surface);
      this.refs.thumbMirror.reflect(this.props.parent.refs.surface);

      this.window.addEventListener('scroll', this.onScroll);
      this.refs.overlay.addEventListener('mousedown', this.scrollTo);
      this.refs.thumb.addEventListener('mousedown', this.onDragStart);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.window.removeEventListener('scroll', this.onScroll);
      this.refs.overlay.removeEventListener('mousedown', this.scrollTo);
      this.refs.thumb.removeEventListener('mousedown', this.onDragStart);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'div',
          { className: 'minimap-scrollbar', style: this.scrollbarStyle },
          _react2.default.createElement(
            'div',
            { style: this.mirrorStyle },
            _react2.default.createElement(_reactMirror.Mirror, { ref: 'mirror' })
          ),
          _react2.default.createElement('div', { ref: 'overlay', style: this.overlayStyle })
        ),
        _react2.default.createElement(
          'div',
          { ref: 'thumb', className: 'react-minimap-thumb', style: this.thumbStyle },
          _react2.default.createElement(
            'div',
            { style: this.mirrorStyle },
            _react2.default.createElement(_reactMirror.Mirror, { ref: 'thumbMirror' })
          )
        )
      );
    }
  }, {
    key: 'window',
    get: function get() {
      return this.props.window;
    }
  }, {
    key: 'scaleFactor',
    get: function get() {
      return this.props.width / this.props.windowWidth;
    }
  }, {
    key: 'yOffset',
    get: function get() {
      var _props2 = this.props;
      var height = _props2.height;
      var scrollHeight = _props2.scrollHeight;
      var windowHeight = _props2.windowHeight;
      var scroll = this.state.scroll;


      var scrollHeightScaled = scrollHeight * this.scaleFactor;
      var windowHeightScaled = windowHeight * this.scaleFactor;
      var heightScaled = height * this.scaleFactor;

      if (scrollHeightScaled > height) {
        var y = scroll.top * this.scaleFactor;

        var ch = scrollHeightScaled - windowHeightScaled;

        var max_margin = ch - height;

        var factor = y / ch;

        var viewportFactor = windowHeightScaled / ch;

        return factor * max_margin + viewportFactor * y;
      }
      return 0;
    }
  }, {
    key: 'scrollbarStyle',
    get: function get() {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        height: this.props.scrollHeight * this.scaleFactor,
        width: this.props.width,
        transform: 'translate3d(' + 0 + 'px, ' + -this.yOffset + 'px, 0)',
        transformOrigin: '0 0'
      };
    }
  }, {
    key: 'mirrorStyle',
    get: function get() {
      var _props3 = this.props;
      var windowHeight = _props3.windowHeight;
      var windowWidth = _props3.windowWidth;


      return {
        width: windowWidth,
        height: windowHeight,
        transform: 'scale3d(' + this.scaleFactor + ', ' + this.scaleFactor + ', 1)',
        transformOrigin: '0 0'
      };
    }
  }, {
    key: 'thumbStyle',
    get: function get() {
      var _props4 = this.props;
      var windowHeight = _props4.windowHeight;
      var windowWidth = _props4.windowWidth;


      var windowWidthScaled = windowWidth * this.scaleFactor;
      var windowHeightScaled = windowHeight * this.scaleFactor;

      var x = this.state.scroll.left * this.scaleFactor;
      var y = this.state.scroll.top * this.scaleFactor - this.yOffset;

      return {
        position: 'absolute',
        overflow: 'visible',
        top: 0,
        left: 0,
        width: windowWidthScaled,
        height: windowHeightScaled,
        transform: 'translate3d(' + x + 'px, ' + y + 'px, 0)'
      };
    }
  }, {
    key: 'overlayStyle',
    get: function get() {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
      };
    }
  }]);

  return MinimapInner;
}(_react.Component);

var Minimap = function (_Component3) {
  _inherits(Minimap, _Component3);

  function Minimap() {
    _classCallCheck(this, Minimap);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Minimap).apply(this, arguments));
  }

  _createClass(Minimap, [{
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var children = _props5.children;

      var props = _objectWithoutProperties(_props5, ['children']);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _reactMirror2.default,
          { ref: 'surface' },
          _react2.default.createElement(
            'div',
            { className: 'react-minimap-content' },
            children
          )
        ),
        _react2.default.createElement(
          MinimapWrapper,
          _extends({}, props, { parent: this }),
          _react2.default.createElement(MinimapInner, { parent: this })
        )
      );
    }
  }]);

  return Minimap;
}(_react.Component);

exports.default = Minimap;
module.exports = exports['default'];