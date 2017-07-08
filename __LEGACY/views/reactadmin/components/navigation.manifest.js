module.exports = (periodic) => {
  const reactadmin = periodic.app.locals.extension.reactadmin;

  let navlinks = [];
  navlinks = navlinks.concat([
    {
      'component': 'MenuAppLink',
      'props': {
        'href': `${reactadmin.manifest_prefix}account/profile`,
        'label': 'My Account',
        'id': 'my-account',
      },
    },
    // {
    //   'component': 'MenuAppLink',
    //   'props': {
    //     'href': '/r-admin/content/testcharts',
    //     'label': 'Test Charts',
    //     'id': 'testcharts',
    //   },
    // },
    // {
    //   'component': 'MenuAppLink',
    //   'props': {
    //     'href': '/r-admin/content/testtables',
    //     'label': 'Test Tables',
    //     'id': 'testtables',
    //   },
    // },
    // {
    //   'component': 'MenuAppLink',
    //   'props': {
    //     'href': '/r-admin/content/testformtables',
    //     'label': 'Test Form Tables',
    //     'id': 'testformtables',
    //   },
    // },
    // {
    //   'component': 'MenuAppLink',
    //   'props': {
    //     'href': '/r-admin/content/testform',
    //     'label': 'Test Form',
    //     'id': 'tforms',
    //   },
    // },
    // {
    //   'component': 'MenuAppLink',
    //   'props': {
    //     'href': '/r-admin/content/dynamics',
    //     'label': 'Dynamics',
    //     'id': 'dynamics',
    //   },
    // },
    // {
    //   'component': 'MenuAppLink',
    //   'props': {
    //     'href': '/r-admin/content/testform_window',
    //     'label': 'Test Form Window',
    //     'id': 'form_window',
    //   },
    // },
    // {
    //   'component': 'MenuAppLink',
    //   'props': {
    //     'href': '/r-admin/content/accounts_sample',
    //     'label': 'TestAccounts',
    //     'id': 'testaccounts',
    //   },
    // },
    // {
    //   'component': 'MenuAppLink',
    //   'props': {
    //     'href': '/r-admin/content/testtables',
    //     'label': 'Test Tables',
    //     'id': 'testtables',
    //   },
    // },
  ]);
  let ra_nav = [
    {
      component: 'SubMenuLinks',
      children: [
        {
          'component': 'MenuLabel',
          'children': 'Reactadmin',
        },
      ].concat(...navlinks),
    },
  ];
  return {
    'wrapper': {
      'style': {},
    },
    'container': {
      'style': {},
    },
    'layout': {
      'component': 'Menu',
      'props': {
        'style': {},
      },
      'children': ra_nav,
    },
  };
};