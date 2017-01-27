import constants from '../constants';

const initialState = {
  notifications: [],
};

const notificationReducer = (state, action) => {
  switch (action.type) {
  case constants.notification.SHOW_TIMED_NOTIFICATION:
  case constants.notification.SHOW_STATIC_NOTIFICATION:
    var newNotification = action.payload;
    var newArrayOfNotices = Object.assign([], state.notifications);
    newArrayOfNotices.unshift(newNotification);  
    return {
      notifications: newArrayOfNotices,
    };  
  case constants.notification.HIDE_NOTIFICATION:
    var removeId = action.payload.id;
    return {
      notifications: state.notifications.filter(notification => notification.id !== removeId),
    };  
  default:
    return Object.assign(initialState, state);
  }
};

export default notificationReducer;