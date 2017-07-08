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
// import AppSectionLoading from '../AppSectionLoading';
import AppSectionLoadingOverlay from '../AppSectionLoading/overlay';
import AppOverlay from '../AppOverlay';
// import utilities from '../../util';

class MainApp extends Component{
  constructor(props/*, context*/) {
    super(props);
    this.state = props;
    // this.previousRoute = {};
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps', nextProps);
    this.setState(nextProps);
    if (document && document.body && document.body.setAttribute) {
      document.body.setAttribute('id', encodeURIComponent(nextProps.location.pathname));
    } 
  }
  componentDidMount() {
    if (this.state.settings.noauth) {
      this.props.fetchUnauthenticatedManifest()
        .then(() => {
          this.props.setUILoadedState(true);
        })
        .catch((error) => {
          this.props.errorNotification(error);
          this.props.setUILoadedState(true);
        });
    } else {
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
            } else {
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
    if (document && document.body && document.body.classList && document.body.classList.add) {
      document.body.classList.add('__ra_mc_loaded');
    } else if (document && document.body && document.body.className) {
      document.body.className = document.body.className += ' __ra_mc_loaded';
    }
    if(window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf('Trident') !== -1) {
      document.body.style.zoom = 1;
    }
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

    let overlay = (this.props.ui.sidebar_is_open && this.state.settings.ui.initialization.show_sidebar_overlay)
      ? (<div style={styles.sidebarOverlay} className="__ra_show_sidebar_overlay"
        onClick={this.props.toggleUISidebar} ></div>)
      : null;
    
    return (<div className="reactadmin__app_div_content">
      <AppSectionLoadingOverlay display={!this.state.ui.ui_is_loaded} wrapperstyle={
        Object.assign({}, {
          position: 'fixed',
          height: '100%',
          width: '100%',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          // opacity:0.8,
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex:100,
        }, this.overlayUIWrapperStyle)} ui={this.state.ui}/> 
      <AppOverlay className="reactadmin__app_overlay" {...this.state} />
      {headerNav}
      <main style={styles.fullHeight} className="reactadmin__main">
        <Columns className="reactadmin__main_container" style={Object.assign({}, styles.fullMinHeight, styles.fullHeight)}>
          {sidebarColumn}
          {overlay}
          <Column className="reactadmin__main_content" style={styles.fullMinHeight}>
            {(this.state.ui.app_container_ui_is_loaded === false)?null:this.props.children}
          </Column>
        </Columns>
      </main>
      {footerNav}
    </div>);

  }
}
MainApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default MainApp;
