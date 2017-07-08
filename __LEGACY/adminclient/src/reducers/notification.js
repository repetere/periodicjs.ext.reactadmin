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
      var removeNotificationId = action.payload.id;
      // console.debug({ removeNotificationId });  
    // console.log(state.notifications.filter(notification => notification.id !== removeNotificationId));  
    if (removeNotificationId === 'last') {
      return Object.assign({}, state, {
        notifications: state.notifications.pop(),
      });
    } else {
      return Object.assign({}, state, {
        notifications: state.notifications.filter(notification => notification.id !== removeNotificationId),
      });
    }  
  case constants.notification.SHOW_MODAL:
    var newModal = action.payload;
    var newArrayOfModals = Object.assign([], state.modals);
    newArrayOfModals.push(newModal);  
    return Object.assign({}, state, {
      modals: newArrayOfModals,
    });    
  case constants.notification.HIDE_MODAL:
    var removeModalId = action.payload.id;
    if (removeModalId === 'last') {
      return Object.assign({}, state, {
        modals: state.modals.pop(),
      });    
    } else {
      return Object.assign({}, state, {
        modals: state.modals.filter(modal => modal.id !== removeModalId),
      });    
    } 
  default:
    return Object.assign(initialState, state);
  }
};

export default notificationReducer;