'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RawOutput = function (_Component) {
  (0, _inherits3.default)(RawOutput, _Component);

  function RawOutput(props) {
    (0, _classCallCheck3.default)(this, RawOutput);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RawOutput.__proto__ || (0, _getPrototypeOf2.default)(RawOutput)).call(this, props));

    _this.state = (0, _assign2.default)({}, props, _this.props.getState());
    return _this;
  }

  (0, _createClass3.default)(RawOutput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      console.debug({ nextProps: nextProps });
      this.setState((0, _assign2.default)({}, nextProps, this.props.getState()));
      // console.log('this.state', this.state);
    }
  }, {
    key: 'render',
    value: function render() {
      // console.debug('this.props.getState()', this.props.getState());
      // console.debug('this.state', this.state);
      var displayProp = '';
      var displayData = '';
      try {
        if (this.props.flattenRawData) {
          var flattenedProps = Object({}, (0, _flat2.default)(this.state));
          displayProp = this.props.select ? flattenedProps[this.props.select] : flattenedProps;
        } else {
          displayProp = this.props.select ? this.state[this.props.select] : this.state;
        }
        displayData = this.props.display ? displayProp.toString() : (0, _stringify2.default)(displayProp, null, 2);

        // console.debug({ this.state, displayData, displayProp, });
      } catch (e) {
        if (!global) {
          console.error(e);
        }
      }
      switch (this.props.type) {
        case 'inline':
          return _react2.default.createElement(
            'span',
            { style: this.props.style },
            displayData
          );
        case 'block':
          return _react2.default.createElement(
            'div',
            { style: this.props.style },
            displayData
          );
        default:
          return _react2.default.createElement(
            'pre',
            { style: this.props.style },
            displayData
          );
      }
    }
  }]);
  return RawOutput;
}(_react.Component);

exports.default = RawOutput;