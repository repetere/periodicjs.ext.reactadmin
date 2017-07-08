'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RawOutput = function RawOutput(props) {
  // console.debug('GOT TO RAWOUTPUT')
  var displayProp = '';
  var displayData = '';
  try {
    var propData = (0, _assign2.default)({}, props, undefined.props.getState());
    // console.debug({propData})
    if (props.flattenRawData) {
      var flattenedProps = Object({}, (0, _flat2.default)(propData));
      displayProp = props.select ? flattenedProps[props.select] : flattenedProps;
    } else {
      displayProp = props.select ? propData[props.select] : propData;
    }
    displayData = props.display ? displayProp.toString() : (0, _stringify2.default)(displayProp, null, 2);

    console.debug({ props: props, displayData: displayData, displayProp: displayProp });
  } catch (e) {
    if (!global) {
      console.error(e);
    }
  }
  switch (props.type) {
    case 'inline':
      return _react2.default.createElement(
        'span',
        { style: props.style },
        displayData
      );
    case 'block':
      return _react2.default.createElement(
        'div',
        { style: props.style },
        displayData
      );
    default:
      return _react2.default.createElement(
        'pre',
        { style: props.style },
        displayData
      );
  }
};

exports.default = RawOutput;