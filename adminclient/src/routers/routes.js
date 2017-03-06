import containers from '../containers';

function getRoutes(appContainer) {
  let sharedChildRoutes = [{
    path: 'login**',
    component: containers.PageComponents.LoginPage,
    indexRoute: { 
      component: containers.PageComponents.LoginPage,
    },
  }, {
    path: '*',
    component: containers.PageComponents.DynamicPage,
  }, ];
  return {
    childRoutes: [{
      path: (typeof window.__padmin.adminPath !=='undefined') ? window.__padmin.adminPath : '/p-admin',
      component: appContainer,
      // onEnter: requireAuth,
      indexRoute: { 
      // onEnter: requireAuth,
        component: containers.PageComponents.LoginPage,
      },
      childRoutes: sharedChildRoutes,
    }, {
      path: '/',
      component: appContainer,
      // onEnter: requireAuth,
      indexRoute: { 
      // onEnter: requireAuth,
        component: containers.PageComponents.LoginPage,
      },
      childRoutes: sharedChildRoutes,
    }, ],
  };
}

exports.getRoutes = getRoutes;

export default getRoutes;
//https://github.com/ReactTraining/react-router/blob/efac1a8ff4c26d6b7379adf2ab903f1892276362/examples/auth-flow/app.js#L122