'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _recharts = require('recharts');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import * as recharts from 'recharts';

var DynamicChart = function (_Component) {
  (0, _inherits3.default)(DynamicChart, _Component);

  function DynamicChart(props) {
    (0, _classCallCheck3.default)(this, DynamicChart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DynamicChart.__proto__ || (0, _getPrototypeOf2.default)(DynamicChart)).call(this, props));

    _this.getRenderedComponent = _AppLayoutMap.getRenderedComponent.bind(_this);
    _this.state = (0, _assign2.default)({}, props.chartProps, _this.props.getState().dynamic);
    return _this;
  }

  (0, _createClass3.default)(DynamicChart, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState((0, _assign2.default)({}, nextProps.chartProps, this.props.getState().dynamic));
    }
  }, {
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        _recharts.ResponsiveContainer,
        (0, _extends3.default)({ key: new Date().valueOf() + '-' + Math.random() }, this.props.passProps),
        this.getRenderedComponent({
          component: 'recharts.' + this.props.chartComponent,
          props: (0, _assign2.default)({}, this.props.chartProps, this.state),
          children: this.props.children
        })
      );
    }
  }]);
  return DynamicChart;
}(_react.Component);

exports.default = DynamicChart;