'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var generateNotificationID = function generateNotificationID() {
  return (Math.random() * 1000000).toFixed(0) + '' + new Date().valueOf();
};

var notification = {
  hideNotification: function hideNotification(id) {
    return {
      type: _constants2.default.notification.HIDE_NOTIFICATION,
      payload: { id: id }
    };
  },
  showNotification: function showNotification(options) {
    // options.text = options.text + '+' + options.id;
    return {
      type: options.timeout ? _constants2.default.notification.SHOW_TIMED_NOTIFICATION : _constants2.default.notification.SHOW_STATIC_NOTIFICATION,
      payload: options
    };
  },
  errorNotification: function errorNotification(error, timeout) {
    var _this = this;

    return function (dispatch, getState) {
      var errorTimeout = getState().settings.ui.notifications.error_timeout;
      var options = {
        type: 'error',
        text: error && error.data && error.data.error ? error.data.error : error && error.data && error.data ? error.data : error.toString(),
        meta: error,
        timeout: typeof timeout === 'boolean' && timeout === false ? false : errorTimeout
      };
      dispatch(_this.createNotification(options));
    };
  },
  createNotification: function createNotification() {
    var _this2 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var ID = generateNotificationID();
    if (typeof options === 'string') {
      console.warn('please pass text as {text:noficationtext}');
      options = { text: options };
    }
    return function (dispatch /*, getState*/) {
      if (options.timeout) {
        var t = setTimeout(function () {
          dispatch(_this2.hideNotification(ID));
          clearTimeout(t);
        }, options.timeout);
      }
      dispatch(_this2.showNotification((0, _assign2.default)({}, options, { id: ID })));
    };
  },
  hideModal: function hideModal(id) {
    return {
      type: _constants2.default.notification.HIDE_MODAL,
      payload: { id: id }
    };
  },
  showModal: function showModal(options) {
    return {
      type: _constants2.default.notification.SHOW_MODAL,
      payload: options
    };
  },
  createModal: function createModal() {
    var _this3 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var ID = generateNotificationID();
    if (typeof options === 'string') {
      console.warn('please pass text as {text:modalText}');
      options = { text: options };
    }
    return function (dispatch /*, getState*/) {
      if (options.timeout) {
        var t = setTimeout(function () {
          dispatch(_this3.hideModal(ID));
          clearTimeout(t);
        }, options.timeout);
      }
      dispatch(_this3.showModal((0, _assign2.default)({}, options, { id: ID })));
    };
  }
};

exports.default = notification;