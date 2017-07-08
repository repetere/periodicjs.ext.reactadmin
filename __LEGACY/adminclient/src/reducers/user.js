import constants from '../constants';
// import Immutable from 'immutable';

const initialState = {
  isFetching: false,
  updatedAt: new Date(),
  loginURL: null,
  isLoggedIn:false,
  userdata: false,
  username: null,
  email: null,
  firstname: null,
  lastname: null,
  profile_image_preview: null,
  jwt_token: null,
  jwt_token_expires:null,
  jwt_token_timeout:null,
  error: null,
  isMFAAuthenticated: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
  case constants.user.LOGOUT_FAILURE:
    var logoutFailurePayload = action.payload;
    return Object.assign({}, state, {
      isFetching: false,
      error: logoutFailurePayload.error,
      timestamp: logoutFailurePayload.timestamp,
      updatedAt: logoutFailurePayload.updatedAt,
    });
  case constants.user.LOGOUT_SUCCESS:
    var logoutSuccessPayload = action.payload;
    return Object.assign({}, state, {
      isFetching: false,
      isLoggedIn: false,
      error: null,
      email: null,
      firstname: null,
      lastname: null,
      profile_image_preview: null,
      jwt_token: null,
      jwt_token_expires: null,
      jwt_token_timeout: null,
      userdata: false,
      timestamp: logoutSuccessPayload.timestamp,
      updatedAt: logoutSuccessPayload.updatedAt,
    });
  case constants.user.LOGIN_DATA_REQUEST:
    // var requestPayload = action.payload;
    return Object.assign({}, state, {
      isFetching: true,
      loginURL: action.payload.url,
      updatedAt: new Date(),
    });
  case constants.user.UPDATE_PROFILE_SUCCESS:
    var profilePayload = action.payload;
    if (profilePayload.profile.userdata && profilePayload.profile.userdata.password) {
      delete profilePayload.profile.userdata.password;
    }
    return Object.assign({}, state, {
      isFetching: false,
      // userdata: profilePayload.profile.userdata,
      // username: profilePayload.profile.username,
      // email: profilePayload.profile.email,
      // firstname: profilePayload.profile.firstname,
      // lastname: profilePayload.profile.lastname,
      // profile_image_preview: profilePayload.profile.profile_image_preview,
      updatedAt: new Date(),
    }, profilePayload.profile);
  case constants.user.LOGIN_DATA_SUCCESS:
    var loginSuccessPayload = action.payload;
    if (loginSuccessPayload.json && loginSuccessPayload.json.user && loginSuccessPayload.json.user.password) {
      delete loginSuccessPayload.json.user.password;
    }
    return {
      isFetching: false,
      loginURL: loginSuccessPayload.url,
      isLoggedIn: true,
      error: null,
      email: loginSuccessPayload.json.user.email,
      firstname: loginSuccessPayload.json.user.firstname,
      lastname: loginSuccessPayload.json.user.lastname,
      profile_image_preview: (loginSuccessPayload.json.user.primaryasset && loginSuccessPayload.json.user.primaryasset.attributes) ? loginSuccessPayload.json.user.primaryasset.attributes.location : null,
      jwt_token: loginSuccessPayload.json.token,
      jwt_token_expires: loginSuccessPayload.json.expires,
      jwt_token_timeout: loginSuccessPayload.json.timeout,
      userdata: loginSuccessPayload.json.user,
      updatedAt: loginSuccessPayload.updatedAt,
    };
  case constants.user.SAVE_DATA_SUCCESS:
    var successPayload = action.payload;
    if (successPayload.json && successPayload.json.user && successPayload.json.user.password) {
      delete successPayload.json.user.password;
    }
    return {
      isFetching: false,
      loginURL: successPayload.url,
      isLoggedIn: true,
      error: null,
      email: successPayload.json.user.email,
      firstname: successPayload.json.user.firstname,
      lastname: successPayload.json.user.lastname,
      profile_image_preview: (successPayload.json.user.primaryasset && successPayload.json.user.primaryasset.attributes) ? successPayload.json.user.primaryasset.attributes.location : null,
      jwt_token: successPayload.json.token,
      jwt_token_expires: successPayload.json.expires,
      jwt_token_timeout: successPayload.json.timeout,
      userdata: successPayload.json.user,
      updatedAt: successPayload.updatedAt,
      isMFAAuthenticated: (typeof successPayload.json.isMFAAuthenticated === 'boolean')  ? successPayload.json.isMFAAuthenticated
        : state.isMFAAuthenticated,
    };
  case constants.user.USER_DATA_FAILURE:
    var failurePayload = action.payload;
    return Object.assign({}, state, {
      isFetching: false,
      loginURL: failurePayload.url,
      error: failurePayload.error,
      updatedAt: new Date(),
    });
  case constants.user.MFA_AUTHENTICATED:
    return Object.assign({}, state, action.payload);
  default:
    return Object.assign(initialState, state);
  }
};

export default userReducer;