import constants from '../constants';
// import navigationSettings from '../content/config/navigation';
// let windowState = (window && window.__padmin && window.__padmin.navigation) ? window.__padmin.navigation : {};
//TODO - if we want to use default navigation move to navigation reducer
const initialState = {
  sidebar_is_open: false,
  ui_is_loaded: false,
  nav_ui_is_loaded: false,
  custom_ui_layout: undefined,
  app_container_ui_is_loaded: false,
  login_ui_is_loaded: false,
  header_ui_is_loaded: false,
  footer_ui_is_loaded: false,
  error_ui_is_loaded: false,
  nav_label: '',
  app_data: {},
  selected_nav: undefined,
};

var containers;
var components;

const uiReducer = (state, action) => {
  switch (action.type) {
  case constants.ui.SET_UI_LOADED:
    var uiStatePayload = action.payload;
    var appContainerUIState = (uiStatePayload.loaded || uiStatePayload)
      ? {
        app_container_ui_is_loaded:true,
      }
      : {};  
    return Object.assign({}, state, appContainerUIState, (uiStatePayload.customLayout)
      ? {
        ui_is_loaded: uiStatePayload.loaded,
        custom_ui_layout: uiStatePayload.customLayout,
      }
      : {
        ui_is_loaded: uiStatePayload,
        custom_ui_layout: undefined,
      });  
  case constants.ui.SET_NAV_LABEL:
    var navLabelPaylod = action.payload;
    return Object.assign({}, state, {
      nav_label: navLabelPaylod.label,
    });
  case constants.ui.TOGGLE_SIDEBAR:
      // var logoutFailurePayload = action.payload;
    return Object.assign({}, state, {
      sidebar_is_open: !state.sidebar_is_open,
    });
  case constants.ui.OPEN_SIDEBAR:
      // var logoutFailurePayload = action.payload;
    return Object.assign({}, state, {
      sidebar_is_open: true,
    });
  case constants.ui.CLOSE_SIDEBAR:
      // var failurePayload = action.payload;
    return Object.assign({}, state, {
      sidebar_is_open: false,
    });
  case `INIT_${ constants.ui.LOGIN_COMPONENT }`:
    containers = Object.assign({}, state.containers);
    containers.login = {};
    return Object.assign({}, state, { containers, });
  case `INIT_${ constants.ui.MAIN_COMPONENT }`:
    components = Object.assign({}, state.components, { header: {}, footer: {}, });
    return Object.assign({}, state, { components, });
  case constants.ui.LOGIN_COMPONENT:
    if (!action.payload.success) {
      console.log('There was an error retrieving login component', action.error);
      return state;
    } else {
      containers = Object.assign({}, state.containers, { login: action.payload.settings, });
      return Object.assign({}, state, { containers, login_ui_is_loaded: true });
    }
  case constants.ui.MAIN_COMPONENT:
    if (!action.payload.success) {
      console.log('There was an error retrieving main component', action.payload.error);
      return state;
    } else {
      components = Object.assign({}, state.components);
      components.header = action.payload.settings.header || {};
      components.footer = action.payload.settings.footer || {};
      return Object.assign({}, state, { components, header_ui_is_loaded: true, footer_ui_is_loaded: true });
    }
  case `INIT_${ constants.ui.ERROR_COMPONENTS }`:
    components = Object.assign({}, state.components, { error: {}, });
    return Object.assign({}, state, { components, });
  case constants.ui.ERROR_COMPONENTS:
    if (!action.payload.success) {
      console.log('There was an error retrieving error components', action.payload.error);
      return state;
    } else {
      components = Object.assign({}, state.components, { error: action.payload.settings });
      return Object.assign({}, state, { components, error_ui_is_loaded: true });
    }
  case constants.ui.SET_SELECTED_NAV_STATE:
    return Object.assign({}, state, { 
      // sidebar_is_open: false,
      selected_nav: action.payload.id
     });
  default:
    return Object.assign(initialState, state);
  }
};

export default uiReducer;