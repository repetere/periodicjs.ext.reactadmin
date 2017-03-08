'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RawOutput = function RawOutput(props) {
  var displayProp = '';
  var displayData = '';
  try {
    if (props.flattenRawData) {
      var flattenedProps = Object({}, (0, _flat2.default)(props));
      displayProp = props.select ? flattenedProps[props.select] : flattenedProps;
    } else {
      displayProp = props.select ? props[props.select] : props;
    }
    displayData = props.display ? displayProp.toString() : (0, _stringify2.default)(displayProp, null, 2);

    // console.debug({ props, displayData, displayProp, });
  } catch (e) {
    if (!global) {
      console.error(e);
    }
  }
  switch (props.type) {
    case 'inline':
      return _react2.default.createElement(
        'span',
        null,
        displayData
      );
    case 'block':
      return _react2.default.createElement(
        'div',
        null,
        displayData
      );
    default:
      return _react2.default.createElement(
        'pre',
        null,
        displayData
      );
  }
};

exports.default = RawOutput;