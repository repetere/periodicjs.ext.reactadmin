'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _dynamic = require('./dynamic');

var _dynamic2 = _interopRequireDefault(_dynamic);

var _manifest = require('./manifest');

var _manifest2 = _interopRequireDefault(_manifest);

var _notification = require('./notification');

var _notification2 = _interopRequireDefault(_notification);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _output = require('./output');

var _output2 = _interopRequireDefault(_output);

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

var _settings = require('./settings');

var _settings2 = _interopRequireDefault(_settings);

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReactAdminReducer = (0, _redux.combineReducers)({
  dynamic: _dynamic2.default,
  routing: _reactRouterRedux.routerReducer,
  settings: _settings2.default,
  ui: _ui2.default,
  user: _user2.default,
  output: _output2.default,
  manifest: _manifest2.default,
  notification: _notification2.default
});

exports.default = ReactAdminReducer;