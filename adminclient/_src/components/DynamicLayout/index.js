'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppLayoutMap = require('../AppLayoutMap');

var _reBulma = require('re-bulma');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DynamicLayout = function (_Component) {
  (0, _inherits3.default)(DynamicLayout, _Component);

  function DynamicLayout(props) {
    (0, _classCallCheck3.default)(this, DynamicLayout);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DynamicLayout.__proto__ || (0, _getPrototypeOf2.default)(DynamicLayout)).call(this, props));

    var dynamicItems = _this.props.dynamicProp ? _this.props.getState().dynamic[_this.props.dynamicProp] : [];
    var Items = {
      items: (0, _assign2.default)([], props.items, dynamicItems)
    };
    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    _this.state = Items;
    // console.debug({props})
    return _this;
  }

  (0, _createClass3.default)(DynamicLayout, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var dynamicItems = this.props.dynamicProp ? this.props.getState().dynamic[this.props.dynamicProp] : [];
      var Items = {
        items: (0, _assign2.default)(nextProps.items, dynamicItems)
      };
      this.setState(Items);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      try {
        var mappedItemLayout = this.state.items && Array.isArray(this.state.items) && this.state.items.length ? this.state.items.map(function (item) {
          var mergedLayout = (0, _assign2.default)({}, _this2.props.layout, {
            props: (0, _assign2.default)({}, _this2.props.layout.props, item)
          });
          // console.debug({ mergedLayout });
          return _this2.getRenderedComponent(mergedLayout);
        }) : null;

        var dynamicComponentLayout = this.props.isColumns ? _react2.default.createElement(
          _reBulma.Columns,
          this.props.columnsProps,
          mappedItemLayout
        ) : _react2.default.createElement(
          'div',
          { style: (0, _assign2.default)({
              flexDirection: 'rows',
              display: 'flex'
            }, this.props.style) },
          mappedItemLayout
        );
        // console.debug({dynamicComponentLayout})
        return dynamicComponentLayout;
      } catch (e) {
        console.debug(e, 'this.state', this.state, 'this.props', this.props);
        return null;
      }
      // console.debug('this.state.items', this.state.items,'Array.isArray(this.state.items)',Array.isArray(this.state.items));
    }
  }]);
  return DynamicLayout;
}(_react.Component);

exports.default = DynamicLayout;