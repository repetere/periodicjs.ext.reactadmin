import React, { Component, PropTypes, } from 'react';
import { Column, Columns, } from 're-bulma';
import {  AsyncStorage,  } from 'react-native';
import moment from 'moment';
import styles from '../../styles';
import constants from '../../constants';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import AppSidebar from '../AppSidebar';
import FloatingNav from '../AppSidebar/FloatingNav';
import AppSectionLoading from '../AppSectionLoading';
import AppOverlay from '../AppOverlay';
import utilities from '../../util';

class MainApp extends Component{
  constructor(props/*, context*/) {
    super(props);
    this.state = props;
    // this.previousRoute = {};
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps', nextProps);
    this.setState(nextProps);
  }
  componentDidMount() {
    Promise.all([
      AsyncStorage.getItem(constants.jwt_token.TOKEN_NAME),
      AsyncStorage.getItem(constants.jwt_token.TOKEN_DATA),
      AsyncStorage.getItem(constants.jwt_token.PROFILE_JSON),
      this.props.fetchMainComponent(),
      this.props.fetchErrorComponents(),
      this.props.fetchUnauthenticatedManifest(),
      AsyncStorage.getItem(constants.user.MFA_AUTHENTICATED),
      //AsyncStorage.getItem(constants.async_token.TABBAR_TOKEN),
    ])
      .then((results) => {
        try {
          if (results[results.length - 1] === 'true') {
            this.props.authenticatedMFA();
          }
          let jwt_token = results[ 0 ];
          let jwt_token_data = JSON.parse(results[ 1 ]);
          let jwt_user_profile = JSON.parse(results[ 2 ]);
          if (jwt_token_data && jwt_user_profile) {
            let url = '/api/jwt/token';
            let response = {};
            let json = {
              token: jwt_token_data.token,
              expires: jwt_token_data.expires,
              timeout: jwt_token_data.timeout,
              user: jwt_user_profile,
            };
            let currentTime = new Date();
            
            if (moment(jwt_token_data.expires).isBefore(currentTime)) {
              let expiredTokenError = new Error(`Access Token Expired ${moment(jwt_token_data.expires).format('LLLL')}`);
              this.props.logoutUser();
              throw expiredTokenError;
            } else {
              this.props.saveUserProfile(url, response, json);
              this.props.initializeAuthenticatedUser(json.token, false);
            }
          } else if (jwt_token) {
            this.props.getUserProfile(jwt_token);
            this.props.initializeAuthenticatedUser(jwt_token, false);
            this.props.createNotification({ text: 'welcome back', timeout:4000,  });
          }
          else {
            console.log('MAIN componentDidMount USER IS NOT LOGGED IN');
          }
          this.props.setUILoadedState(true);  
        } catch (e) {
          this.props.errorNotification(e);
          // console.log(e);
        }
        
      })
      .catch((error) => {
        this.props.errorNotification(error);
        // console.error('MAIN componentDidMount: JWT USER Login Error.', error);
        this.props.logoutUser();
        this.props.setUILoadedState(true);
      });
  }
  render() {
    // console.log('this.state', this.state);
    let fixedSider = (this.state.settings.ui.fixedSidebar) ? { position: 'fixed', zIndex:1000, } : {};
    let sidebarColumn = (this.state.settings.ui.sidebar.use_floating_nav && this.state.ui.sidebar_is_open)
      ? (<FloatingNav className="reactadmin__app_floating_sidebar" {...this.state} />)
      : (this.state.ui.sidebar_is_open)
        ? (<Column className="reactadmin__app_container_sidebar" size="isNarrow" style={Object.assign({}, fixedSider, styles.fullMinHeight, styles.fullHeight)}>
          <AppSidebar className="reactadmin__app_sidebar" {...this.state} />
        </Column>)
        : null;
    
    let headerNav = (this.state.settings.ui.initialization.show_header || this.state.user.isLoggedIn)
      ? (<AppHeader className="reactadmin__app_header" {...this.state} />)
    : null;
    let footerNav = (this.state.settings.ui.initialization.show_footer || this.state.user.isLoggedIn)
      ? (<AppFooter className="reactadmin__app_footer" {...this.state} />)
    : null;  

    let overlay = (this.props.ui.sidebar_is_open && this.state.settings.ui.initialization.show_sidebar_overlay)?(<div style={styles.sidebarOverlay} onClick={this.props.toggleUISidebar} ></div>):null;

    return (
      (this.state.ui.ui_is_loaded === false)
        ? (<AppSectionLoading><AppOverlay {...this.state}/></AppSectionLoading>)
        : (<div className="reactadmin__app_div_content">
          {/*<div style={styles.redBkgrd}>*/}
          <AppOverlay className="reactadmin__app_overlay" {...this.state}/>
          {headerNav}
          <main style={styles.fullHeight} className="reactadmin__main">
            {/*DEBUG HERE */}
            <Columns className="reactadmin__main_container" style={Object.assign({}, styles.fullMinHeight, styles.fullHeight)}>
              {sidebarColumn}
              {overlay}
              <Column  className="reactadmin__main_content" style={styles.fullMinHeight}>
                {this.props.children}
              </Column>
            </Columns>
          </main>
          {footerNav}
        </div>)
    );
  }
}
MainApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default MainApp;
