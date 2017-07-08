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
        text: (error && error.data && error.data.error)
          ? error.data.error
          : (error && error.data && error.data)
            ? error.data
            : error.toString(),
        meta: error,
        timeout: (typeof timeout === 'boolean' && timeout ===false)? false : errorTimeout,
      };
      dispatch(this.createNotification(options));
    };
  },
  createNotification(options = {}) {
    const ID = generateNotificationID();
    if (typeof options === 'string') {
      console.warn('please pass text as {text:noficationtext}');
      options = { text: options, };
    }
    return (dispatch/*, getState*/) => {
      if (options.timeout) {
        let t = setTimeout(() => {
          dispatch(this.hideNotification(ID));
          clearTimeout(t);
        }, options.timeout);
      }
      dispatch(this.showNotification(Object.assign({}, options, { id: ID, })));
    };
  },
  hideModal(id) {
    return {
      type: constants.notification.HIDE_MODAL,
      payload: { id, },
    };
  },
  showModal(options) {
    return {
      type: constants.notification.SHOW_MODAL,
      payload: options,
    };
  },
  createModal(options = {}) {
    const ID = generateNotificationID();
    if (typeof options === 'string') {
      console.warn('please pass text as {text:modalText}');
      options = { text: options, };
    }
    return (dispatch/*, getState*/) => {
      if (options.timeout) {
        let t = setTimeout(() => {
          dispatch(this.hideModal(ID));
          clearTimeout(t);
        }, options.timeout);
      }
      dispatch(this.showModal(Object.assign({}, options, { id: ID, })));
    };
  },
  // ajaxModal(options = {}) {
  //   return (dispatch, getState) => {
  //     options.title = 'pagedata.title'
  //     options.text = 'layout'
  //     let AppManifest = getState().manifest;
  //     console.log({AppManifest});
  //     // dispatch(this.showModal(Object.assign({}, options, { id: ID, })));
  //   };
  // },
};

export default notification;