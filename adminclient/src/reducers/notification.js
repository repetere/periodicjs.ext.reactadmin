import constants from '../constants';

const initialState = {
  notifications: [],
  modals:[],
};

const notificationReducer = (state, action) => {
  switch (action.type) {
  case constants.notification.SHOW_TIMED_NOTIFICATION:
  case constants.notification.SHOW_STATIC_NOTIFICATION:
    var newNotification = action.payload;
    var newArrayOfNotices = Object.assign([], state.notifications);
    newArrayOfNotices.push(newNotification);  
    return Object.assign({}, state, {
      notifications: newArrayOfNotices,
    });  
  case constants.notification.HIDE_NOTIFICATION:
    var removeId = action.payload.id;
    // console.log(state.notifications.filter(notification => notification.id !== removeId));  
    return Object.assign({}, state, {
      notifications: state.notifications.filter(notification => notification.id !== removeId),
    });    
  default:
    return Object.assign(initialState, state);
  }
};

export default notificationReducer;