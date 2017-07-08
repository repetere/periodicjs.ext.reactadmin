'use strict';

const index_data_tables = require('../utilities/index_data_tables.js');

module.exports = {
  settings: {
    'server_side_react': true,
    'hot_reload': true,
    'custom_css_stylesheet': false,
    'basename': 'http://localhost:8786',
    'skip_catch_all_route': false,
    'adminPath': '/r-admin',
    'name': 'Admin Panel',
    'title': 'Admin Panel',
    include_index_route: true,
    'includeCoreData': {
      'manifest': true,
      'navigation': true,
    },
    'navigationLayout': {
      'wrapper': {
        'style': {},
      },
      'container': {
        'style': {},
      },
    },
    'routerHistory': 'browserHistory',
    'application': {
      'environment': 'development',
      'use_offline_cache': false,
    },
    'ui': {
      'initialization': {
        'show_header': false,
        'show_footer': false,
        'show_sidebar_overlay': true,
        'refresh_manifests': false,
        'refresh_navigation': false,
        'refresh_components': false,
      },
      'notifications': {
        'error_timeout': 10000,
        'timed_timeout': 10000,
        'hide_login_notification': false,
        'supressResourceErrors': false,
      },
      'fixedSidebar': true,
      'sidebarBG': '#ffffff',
      'header': {
        'isBold': false,
        'color': 'isBlack',
        'buttonColor': 'isWhite',
        'useGlobalSearch': false,
        'useHeaderLogout': false,
        'customButton': false,
        'navLabelStyle': {},
        'containerStyle': {},
        'userNameStyle': {},
      },
      'footer': {
        'navStyle': {},
      },
      'sidebar': {
        'containerStyle': {},
        'use_floating_nav': false,
      },
    },
    'login': {
      'url': 'http://localhost:8786/api/jwt/token',
      'options': {
        'method': 'POST',
        'headers': {
          'Accept': 'application/json',
          'clientid': 'CLIENT**ID**NEEDED',
          'entitytype': 'account',
        },
      },
    },
    'userprofile': {
      'url': 'http://localhost:8786/api/jwt/profile',
      'options': {
        'method': 'POST',
        'headers': {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'clientid': 'CLIENT**ID**NEEDED',
          'entitytype': 'account',
        },
      },
    },
    data_tables: {
      standard: index_data_tables,
    },
    auth: {
      logged_in_homepage: '/r-admin/dashboard',
      logged_out_path: '/r-admin/login',
    },
    customIndexButton: {
      asset: {
        onClick: 'func:this.props.createModal',
        onclickProps: {
          title: 'Upload new assets',
          pathname: '/r-admin/standard/content/assets/newmodal',
        },
      },
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
  },
  databases: {},
};