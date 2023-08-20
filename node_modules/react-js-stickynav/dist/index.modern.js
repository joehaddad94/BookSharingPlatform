import React from 'react';

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var StickyNav = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(StickyNav, _React$Component);

  function StickyNav(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.listener = null;
    _this.state = {
      nav: false
    };

    _this.handleScroll = function () {
      if (window.pageYOffset > _this.props.length) {
        if (!_this.state.nav) {
          _this.setState({
            nav: true
          });
        }
      } else {
        if (_this.state.nav) {
          _this.setState({
            nav: false
          });
        }
      }
    };

    return _this;
  }

  var _proto = StickyNav.prototype;

  _proto.componentDidMount = function componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  };

  _proto.render = function render() {
    console.log(this.props);
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "nav " + (this.state.nav && 'scrollNav')
    }, this.props.children));
  };

  return StickyNav;
}(React.Component);

export { StickyNav };
//# sourceMappingURL=index.modern.js.map
