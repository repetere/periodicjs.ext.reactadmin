import constants from '../constants';
import LoginSettings from '../content/config/login.json';
// import AppConfigSettings from '../content/config/settings.json';
import { AsyncStorage, } from 'react-native';
import pageActions from './pages';
// import { Platform, } from 'react-web';

// import Immutable from 'immutable';

const checkStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const user = {
  /**
   * @param {string} url restful resource
   */
  loginRequest(url) {
    return {
      type: constants.user.LOGIN_DATA_REQUEST,
      payload: {
        url,
      },
    };
  },
  /**
   * @param {string} location name of extension to load
   * @param {object} options what-wg fetch options
   */
  recievedLoginUser(url, response, json) {
    return {
      type: constants.user.LOGIN_DATA_SUCCESS,
      payload: {
        url,
        response,
        json,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
    /**
   * @param {string} location name of extension to load
   * @param {object} options what-wg fetch options
   */
  saveUserProfile(url, response, json) {
    return {
      type: constants.user.SAVE_DATA_SUCCESS,
      payload: {
        url,
        response,
        json,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  /**
  * @param {string} location name of extension to load
  */
  failedUserRequest(url, error) {
    return {
      type: constants.user.USER_DATA_FAILURE,
      payload: {
        url,
        error,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  logoutUserSuccess() { 
    return {
      type: constants.user.LOGOUT_SUCCESS,
      payload: {
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  failedLogoutRequest(error) { 
    return {
      type: constants.user.LOGOUT_FAILURE,
      payload: {
        error,
        updatedAt: new Date(),
        timestamp: Date.now(),
      },
    };
  },
  logoutUser() {
    return (dispatch) => {
      dispatch(pageActions.resetAppLoadedState());
      Promise.all([
        AsyncStorage.removeItem(constants.jwt_token.TOKEN_NAME),
        AsyncStorage.removeItem(constants.jwt_token.TOKEN_DATA),
        AsyncStorage.removeItem(constants.jwt_token.PROFILE_JSON),
        AsyncStorage.removeItem(constants.pages.ASYNCSTORAGE_KEY),
      ])
        .then(results => {
          // console.log('logout user results', results);
          dispatch(this.logoutUserSuccess());
          dispatch(pageActions.initialAppLoaded());
        })
        .catch(error => { 
          dispatch(this.failedLogoutRequest(error));
          dispatch(pageActions.initialAppLoaded());
        });
    };
  },
  getUserProfile(jwt_token, responseFormatter) {
    return (dispatch, getState) => {
      let fetchResponse;
      let url = LoginSettings[ getState().page.runtime.environment ].userprofile.url;
      dispatch(this.loginRequest(url));
      fetch(url, {
        method: LoginSettings[getState().page.runtime.environment].userprofile.method || 'POST',
        headers: Object.assign({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, LoginSettings[getState().page.runtime.environment].userprofile.options.headers, {
          'x-access-token': jwt_token,
        }),
        // body: JSON.stringify({
        //   username: loginData.username,
        //   password: loginData.password,
        // })
      })
        .then(checkStatus)
        .then((response) => {
          fetchResponse = response;
          if (responseFormatter) {
            let formatterPromise = responseFormatter(response);
            if (formatterPromise instanceof Promise) {
              return formatterPromise;
            } else {
              throw new Error('responseFormatter must return a Promise');
            }
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          // AsyncStorage.setItem(constants.jwt_token.PROFILE_JSON, JSON.stringify(responseData.user));
          dispatch(this.saveUserProfile(url, fetchResponse, responseData));
        })
        .catch((error) => {
          dispatch(this.failedUserRequest(url, error));
        });
    }
  },
  /**
  * @param {string} url url for fetch request
  * @param {object} options what-wg fetch options
  * @param {function} responseFormatter custom reponse formatter, must be a function that returns a promise that resolves to json/javascript object
  */
  loginUser(loginData, responseFormatter) {
    return (dispatch, getState) => {
      let fetchResponse;
      let cachedResponseData;
      let url = getState().settings.login.url;
      console.log({ url }, 'headers',
      Object.assign({
          'Accept': 'application/json',
          // 'Content-Type': 'application/json',
        }, getState().settings.login.options.headers, {
          username: loginData.username,
          password: loginData.password,
        })
      );

      dispatch(this.loginRequest(url));
      fetch(url, {
        method: getState().settings.login.method || 'POST',
        headers: Object.assign({
          'Accept': 'application/json',
          // 'Content-Type': 'application/json',
        }, getState().settings.login.options.headers, {
          username: loginData.username,
          password: loginData.password,
        }),
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
        })
      })
        .then(checkStatus)
        .then((response) => {
          fetchResponse = response;
          if (responseFormatter) {
            let formatterPromise = responseFormatter(response);
            if (formatterPromise instanceof Promise) {
              return formatterPromise;
            } else {
              throw new Error('responseFormatter must return a Promise');
            }
          } else {
            return response.json();
          }
        })
        .then((responseData) => {
          console.log('login USER responseData', responseData);
          cachedResponseData = responseData;
          return Promise.all([
            AsyncStorage.setItem(constants.jwt_token.TOKEN_NAME, responseData.token),
            AsyncStorage.setItem(constants.jwt_token.TOKEN_DATA, JSON.stringify({
              expires: responseData.expires,
              timeout: responseData.timeout,
              token: responseData.token,
            })),
            AsyncStorage.setItem(constants.jwt_token.PROFILE_JSON, JSON.stringify(responseData.user)),
          ]);
        })
        .then(() => {
          dispatch(this.recievedLoginUser(url, fetchResponse, cachedResponseData));
          
        })
        .catch((error) => {
          dispatch(this.failedUserRequest(url, error));
        });
    };
  },
};

export default user;