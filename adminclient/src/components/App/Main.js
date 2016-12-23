import React, { Component, PropTypes } from 'react';
import { Column, Columns } from 're-bulma';
import {  AsyncStorage,  } from 'react-native';
import moment from 'moment';
import styles from '../../styles';
import constants from '../../constants';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';
import AppSidebar from '../AppSidebar';
import AppSectionLoading from '../AppSectionLoading';

let testNavigation = () => {
  // setTimeout(() => {
  //   this.props.reduxRouter.push('/blog/234');
  //   setTimeout(() => {
  //     this.props.reduxRouter.push('/documentation');
  //     setTimeout(() => {
  //       this.props.reduxRouter.goBack();
  //       setTimeout(() => {
  //         this.props.reduxRouter.goForward();
  //       }, 1000);
  //     }, 1000);
  //   }, 1000);
  // }, 1000);
}

class MainApp extends Component{
  constructor(props,context) {
    super(props);
    // console.log({ props, context });
    this.state = props;
    // this.previousRoute = {};
  }
  componentWillMount() {
    // // console.log('componentWillMount this.props',this.props)
    // /**
    //  *THIS IS FOR LANDING ON A DIFFERENT PAGE
    // */
    // let pageLocation = this.props.location.pathname;
    // if (pageLocation !== defaultExtensionRoute) {
    //   this.props.onChangePage(pageLocation,{config:{onAppStart:true,}});
    // }
  }
  componentWillReceiveProps(nextProps) {
    // console.log('componentWillReceiveProps nextProps', nextProps);
    this.setState(nextProps);
  }
  componentDidMount() {
    testNavigation();
    // setLayoutHandler.call(this);
    // console.log('componentDidMount this.props', this.props);
    Promise.all([
      AsyncStorage.getItem(constants.jwt_token.TOKEN_NAME),
      AsyncStorage.getItem(constants.jwt_token.TOKEN_DATA),
      AsyncStorage.getItem(constants.jwt_token.PROFILE_JSON),
      // AsyncStorage.getItem(constants.async_token.TABBAR_TOKEN),
    ])
      .then((results) => {
        // console.log({ results });
        let jwt_token = results[ 0 ];
        let jwt_token_data = JSON.parse(results[ 1 ]);
        let jwt_user_profile = JSON.parse(results[ 2 ]);
        // let appTabs = (results[ 3 ]) ? JSON.parse(results[ 3 ]) : false;
        // console.log('main apptabs',{ appTabs });
        if (jwt_token_data && jwt_user_profile) {
          let url = '/api/jwt/token';//AppLoginSettings[this.props.page.runtime.environment].login.url;
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
            setTimeout(() => {
              this.handleErrorNotification({ message: 'Access Token Expired' + expiredTokenError, }, expiredTokenError);
            }, 1000);
            throw expiredTokenError;
          } else {
            this.props.saveUserProfile(url, response, json);
            // if (appTabs) {
            //   this.props.setTabExtensions(appTabs);
            // }
          }
        } else if (jwt_token) {
          this.props.getUserProfile(jwt_token);
        }
        else {
          console.log('MAIN componentDidMount USER IS NOT LOGGED IN');
        }      
        this.props.setUILoadedState(true);
      })
      .catch((error) => {
        console.log('MAIN componentDidMount: JWT USER Login Error.', error);
        this.props.logoutUser();
        this.props.setUILoadedState(true);
      });
  }
  componentWillUnmount() {
  }
  componentWillUpdate(nextProps, nextState) {
    // console.log('COMPONENT WILL UPDATE');
    // console.log('COMPONENT WILL UPDATE',{refs:this.refs}, { nextProps }, { nextState })
    // this.loadExtensionRoute(nextProps.location.pathname);
    // perform any preparations for an upcoming update
  }
  render() {
    // console.log('this.state', this.state);
    let sidebarColumn = (this.state.ui.sidebar_is_open)
      ? (<Column size="isNarrow">
        <AppSidebar {...this.state} />
      </Column>) : null;
    // return (<AppSectionLoading/>);
    return (
      (this.state.ui.ui_is_loaded ===false)? <AppSectionLoading/> :
      <div>
        {/*<div style={styles.redBkgrd}>*/}
        <AppHeader {...this.state} />
          <main style={styles.fullHeight}>
            {/*DEBUG HERE */}
            <Columns  style={styles.fullHeight}>
              {sidebarColumn}
              <Column  style={styles.fullMinHeight}>
                {this.props.children}
              </Column>  
            </Columns> 
          </main>   
        <AppFooter  {...this.state}/>
      </div>
    );
  }
}
MainApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default MainApp;