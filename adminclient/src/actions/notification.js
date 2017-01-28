import constants from '../constants';

const generateNotificationID = () => {
  return ((Math.random() * 1000000).toFixed(0) + '' + new Date().valueOf());
};

const notification = {
  hideNotification(id) {
    return {
      type: constants.notification.HIDE_NOTIFICATION,
      payload: { id, },
    };
  },
  showNotification(options) {
    // options.text = options.text + '+' + options.id;
    return {
      type: (options.timeout) ? constants.notification.SHOW_TIMED_NOTIFICATION : constants.notification.SHOW_STATIC_NOTIFICATION,
      payload: options,
    };
  },
  errorNotification(error, timeout) {
    return (dispatch, getState) => {
      let errorTimeout = getState().settings.ui.notifications.error_timeout;
      let options = {
        type: 'error',
        text: error.toString(),
        meta: error,
        timeout: timeout || errorTimeout,
      };
      dispatch(this.createNotification(options));
    };
  },
  createNotification(options = {}) {
    const ID = generateNotificationID();
    return (dispatch/*, getState*/) => {
      if (options.timeout) {
        let t = setTimeout(() => {
          dispatch(this.hideNotification(ID));
          clearTimeout(t);
        }, options.timeout);
      }
      dispatch(this.showNotification(Object.assign({}, options, { id: ID, })));
    };
  }
};

export default notification;