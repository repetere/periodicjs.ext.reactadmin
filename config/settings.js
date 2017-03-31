'use strict';

const fs = require('fs-extra');
let data_tables_setting = {};
if (fs.existsSync('../utility/index_data_tables')) {
  let index_data_tables = require('../utility/index_data_tables');
  data_tables_setting = {
    data_tables: {
      standard: index_data_tables,
    },
  };
}

function getReactAdminConfig (options, overwrites) {
  return Object.assign({
    'server_side_react':true,
    'hot_reload': false,
    'custom_css_stylesheet':false,
    'basename': options.basename,
    'skip_catch_all_route':false,
    'adminPath':'/r-admin',
    'name':'Admin Panel',
    'title':'Admin Panel',
    'includeCoreData': {
      'manifest': true,
      'navigation': false,
    },
    'navigationLayout':{
      'wrapper':{
        'style':{},
      },
      'container':{
        'style':{},
      },
    },
    'routerHistory':'browserHistory',
    'application':{
      'environment':options.environment,
      'use_offline_cache':options.cache || false,
    },
    'ui':{
      'initialization':{
        'show_header':false,
        'show_footer':false,
        'show_sidebar_overlay':true,
        'refresh_manifests':false,
        'refresh_navigation':false,
        'refresh_components':false,
      },
      'notifications':{
        'error_timeout':10000,
        'timed_timeout':10000,
      },
      'fixedSidebar':true,
      'sidebarBG':'#ffffff',
      'header':{
        'isBold':false,
        'color':'isBlack',
        'buttonColor':'isWhite',
        'useGlobalSearch':false,
        'useHeaderLogout':false,
        'customButton':false,
        'navLabelStyle':{},
        'containerStyle':{},
        'userNameStyle':{},
      },
      'footer':{
        'navStyle':{
        },
      },
      'sidebar':{
        'containerStyle':{},
        'use_floating_nav':false,
      },
    },
    'login':{
      'url':options.loginurl,
      'options':{
        'method':'POST',
        'headers':options.loginheaders,
      },
    },
    'userprofile':{
      'url':options.profileurl,
      'options':{
        'method':'POST',
        'headers':options.profileheaders,
      },
    },   
    // data_tables: {
    //   standard: data_tables,
    // },
    auth:{
      logged_in_homepage:'/r-admin/home',
      logged_out_path:'/r-admin/login',
    },
    data_table_props: {
      standard: {
        asset: {
          flattenRowDataOptions: {
            maxDepth: 2,
          },
        },
      },
    },
  }, data_tables_setting, overwrites);
}

module.exports = {
  test: getReactAdminConfig({
    environment: 'test',
    basename:'http://localhost:8786',
    loginurl:'http://localhost:8786/api/jwt/token',
    loginheaders:{
      'Accept':'application/json',
      'clientid':'CLIENT**ID**NEEDED',
      'entitytype':'account',
    },
    profileurl:'http://localhost:8786/api/jwt/profile',
    profileheaders:{
      'Accept':'application/json',
      'Content-Type':'application/json',
      'clientid':'CLIENT**ID**NEEDED',
      'entitytype':'account',
    },
  }, {}),
  development:getReactAdminConfig({
    environment: 'development',
    basename:'http://localhost:8786',
    loginurl:'http://localhost:8786/api/jwt/token',
    loginheaders:{
      'Accept':'application/json',
      'clientid':'CLIENT**ID**NEEDED',
      'entitytype':'account',
    },
    profileurl:'http://localhost:8786/api/jwt/profile',
    profileheaders:{
      'Accept':'application/json',
      'Content-Type':'application/json',
      'clientid':'CLIENT**ID**NEEDED',
      'entitytype':'account',
    },
  }, {
    hot_reload: true,
  }), 
};