'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.get404Error = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppError = require('../components/AppError404');

var _AppError2 = _interopRequireDefault(_AppError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var get404Error = exports.get404Error = function _get404Error(options) {
  var getState = options.getState,
      _handleFetchPaths = options._handleFetchPaths,
      state = options.state,
      custom404Error = options.custom404Error,
      componentData = options.componentData,
      windowTitle = options.windowTitle,
      navLabel = options.navLabel,
      errorComponents = options.errorComponents,
      errorCode = options.errorCode,
      resources = options.resources,
      e = options.e;

  var customErrorComponent = void 0;
  if (e && !state.settings.ui.notifications.supressResourceErrors && this.props && typeof this.props.errorNotification === 'function') {
    this.props.errorNotification(e.message || e.toString());
  }
  if (errorComponents && errorComponents[errorCode]) {
    customErrorComponent = errorComponents[errorCode];
  } else if (errorComponents && errorComponents['404']) {
    customErrorComponent = errorComponents['404'];
  }
  if (customErrorComponent) {
    componentData = customErrorComponent;
    //TODO: Jan, this was broken because the custom error component had layout nested under settings
    if (!componentData.layout && componentData.settings) {
      componentData.layout = componentData.settings.layout;
      componentData.resources = componentData.settings.resources;
    }
    // console.debug({componentData})
    windowTitle = componentData && componentData.pageData && componentData.pageData.title ? componentData.pageData.title : 'Page Not Found';
    navLabel = componentData && componentData.pageData && componentData.pageData.navLabel ? componentData.pageData.navLabel : 'Error';
    if (typeof componentData.status === 'undefined' || componentData.status === 'undefined' || componentData.status === 'uninitialized') {
      custom404Error = false;
    } else {
      if (componentData.resources && (0, _keys2.default)(componentData.resources).length) {
        return _handleFetchPaths.call(this, componentData.layout, componentData.resources, {
          onError: function (e) {
            // console.debug('fetch call eror')
            window.document.title = windowTitle;
            if (this.props && this.props.setNavLabel) this.props.setNavLabel(navLabel);
            this.uiLayout = _react2.default.createElement(_AppError2.default, { error: e });
            this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
          }.bind(this),
          getState: getState
        });
      } else {
        // console.debug('error page has no resources')
        custom404Error = this.getRenderedComponent(componentData.layout, resources);
      }
    }
  }
  // console.log({ custom404Error });
  this.uiLayout = custom404Error ? custom404Error : _react2.default.createElement(_AppError2.default, null);
  window.document.title = windowTitle;
  if (this.props && this.props.setNavLabel) this.props.setNavLabel(navLabel);
  this.setState({ ui_is_loaded: true, async_data_is_loaded: true });
};
// import utilities from './index';