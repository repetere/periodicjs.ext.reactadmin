import React, { Component, PropTypes } from 'react';
// import { Notification } from 're-bulma';
import styles from '../../styles';
import AppHeader from '../AppHeader';
import AppFooter from '../AppFooter';

class MainApp extends Component{
  constructor(props,context) {
    super(props);
    console.log({ props, context });
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
    this.setState(nextProps);
    console.log('componentWillReceiveProps nextProps', nextProps);
  }
  componentDidMount() {
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
    // setLayoutHandler.call(this);
    // // console.log('componentDidMount this.props', this.props);
    // Promise.all([
    //   AsyncStorage.getItem(constants.jwt_token.TOKEN_NAME),
    //   AsyncStorage.getItem(constants.jwt_token.TOKEN_DATA),
    //   AsyncStorage.getItem(constants.jwt_token.PROFILE_JSON),
    //   AsyncStorage.getItem(constants.async_token.TABBAR_TOKEN),
    // ])
    //   .then((results) => {
    //     let jwt_token = results[ 0 ];
    //     let jwt_token_data = JSON.parse(results[ 1 ]);
    //     let jwt_user_profile = JSON.parse(results[ 2 ]);
    //     let appTabs = (results[ 3 ]) ? JSON.parse(results[ 3 ]) : false;
    //     // console.log('main apptabs',{ appTabs });
    //     if (jwt_token_data && jwt_user_profile) {
    //       let url = AppLoginSettings[this.props.page.runtime.environment].login.url;
    //       let response = {};
    //       let json = {
    //         token: jwt_token_data.token,
    //         expires: jwt_token_data.expires,
    //         timeout: jwt_token_data.timeout,
    //         user: jwt_user_profile,
    //       };
    //       let currentTime = new Date();
          
    //       if (moment(jwt_token_data.expires).isBefore(currentTime)) {
    //         let expiredTokenError = new Error(`Access Token Expired ${moment(jwt_token_data.expires).format('LLLL')}`);
    //         setTimeout(() => {
    //           this.handleErrorNotification({ message: 'Access Token Expired' + expiredTokenError, }, expiredTokenError);
    //         }, 1000);
    //         throw expiredTokenError;
    //       } else {
    //         this.props.saveUserProfile(url, response, json);
    //         if (appTabs) {
    //           this.props.setTabExtensions(appTabs);
    //         }
    //       }
    //     } else if (jwt_token) {
    //       this.props.getUserProfile(jwt_token);
    //     }
    //     else {
    //       console.log('MAIN componentDidMount USER IS NOT LOGGED IN');
    //     }      
    //     this.props.initialAppLoaded();
    //   })
    //   .catch((error) => {
    //     console.log('MAIN componentDidMount: JWT USER Login Error.', error);
    //     this.props.logoutUser();
    //   });
    // setImmediate(() => {
    //   // MessageBarManager.hideAlert();
    //   MessageBarManager.registerMessageBar(this.refs.AlertNotification);
    //   // MessageBarManager.hideAlert();
    // });
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
    console.log('this.props', this.props);
    
    return (
      <div>
      {/*<div style={styles.redBkgrd}>*/}
        <AppHeader {...this.props}/>
        <main style={styles.mainContainer}>
          {/*DEBUG HERE */}
          {this.props.children}
        </main>  
        <AppFooter  {...this.props}/>
      </div>
    );
  }
}
MainApp.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default MainApp;