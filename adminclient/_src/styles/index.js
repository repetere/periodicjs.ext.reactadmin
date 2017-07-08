'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

var _nav = require('./nav');

var _nav2 = _interopRequireDefault(_nav);

var _color = require('./color');

var _color2 = _interopRequireDefault(_color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = (0, _assign2.default)({}, _default2.default, _nav2.default, _color2.default);

exports.default = styles;