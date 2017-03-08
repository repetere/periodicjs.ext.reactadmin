'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = {
  notifications: [],
  modals: []
};

var notificationReducer = function notificationReducer(state, action) {
  switch (action.type) {
    case _constants2.default.notification.SHOW_TIMED_NOTIFICATION:
    case _constants2.default.notification.SHOW_STATIC_NOTIFICATION:
      var newNotification = action.payload;
      var newArrayOfNotices = (0, _assign2.default)([], state.notifications);
      newArrayOfNotices.push(newNotification);
      return (0, _assign2.default)({}, state, {
        notifications: newArrayOfNotices
      });
    case _constants2.default.notification.HIDE_NOTIFICATION:
      var removeNotificationId = action.payload.id;
      // console.debug({ removeNotificationId });  
      // console.log(state.notifications.filter(notification => notification.id !== removeNotificationId));  
      if (removeNotificationId === 'last') {
        return (0, _assign2.default)({}, state, {
          notifications: state.notifications.pop()
        });
      } else {
        return (0, _assign2.default)({}, state, {
          notifications: state.notifications.filter(function (notification) {
            return notification.id !== removeNotificationId;
          })
        });
      }
    case _constants2.default.notification.SHOW_MODAL:
      var newModal = action.payload;
      var newArrayOfModals = (0, _assign2.default)([], state.modals);
      newArrayOfModals.push(newModal);
      return (0, _assign2.default)({}, state, {
        modals: newArrayOfModals
      });
    case _constants2.default.notification.HIDE_MODAL:
      var removeModalId = action.payload.id;
      if (removeModalId === 'last') {
        return (0, _assign2.default)({}, state, {
          modals: state.modals.pop()
        });
      } else {
        return (0, _assign2.default)({}, state, {
          modals: state.modals.filter(function (modal) {
            return modal.id !== removeModalId;
          })
        });
      }
    default:
      return (0, _assign2.default)(initialState, state);
  }
};

exports.default = notificationReducer;