import containers from '../containers';

function getRoutes(appContainer){
  return {
    path: '/',
    component: appContainer,
    indexRoute: { 
      component: containers.PageComponents.HomePage,
    },
    childRoutes:[{
      path:'home',
      component: containers.PageComponents.HomePage, 
    }, {
      path:'documentation',
      component: containers.PageComponents.DocumentationPage, 
    }, {
      path:'blog',
      component: containers.PageComponents.BlogPage, 
      indexRoute: { 
        component: containers.PageComponents.BlogIndex,
      },
      childRoutes: [{
        path:':id',
        component: containers.PageComponents.BlogItem, 
      }]
    }, {
      path:'*',
      component: containers.PageComponents.Error404, 
    }],
  }
};

exports.getRoutes = getRoutes;

export default getRoutes;
//https://github.com/ReactTraining/react-router/blob/efac1a8ff4c26d6b7379adf2ab903f1892276362/examples/auth-flow/app.js#L122

/* DECLARATIVE routes
  <Router routes={routes} />

  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={MainAppContainer}>
        <IndexRoute component={pages.PageComponents.HomePage}/>
        <Route path="home" component={pages.PageComponents.HomePage} />
        <Route path="documentation" component={pages.PageComponents.DocumentationPage} />
        <Route path="blog" component={pages.PageComponents.BlogPage}>
          <IndexRoute component={pages.PageComponents.BlogIndex}/>
          <Route path=":id" component={pages.PageComponents.BlogItem}/>
        </Route>
        <Route path="*" component={pages.PageComponents.Error404} passProps={{ test: 'testdata' }} />
      </Route>  
    </Router>
  </Provider>

  function requireAuth(nextState, replace) {
    if (!auth.loggedIn()) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
 
  <Router history={withExampleBasename(browserHistory, __dirname)}>
    <Route path="/" component={App}>
      <Route path="login" component={Login} />
      <Route path="logout" component={Logout} />
      <Route path="about" component={About} />
      <Route path="dashboard" component={Dashboard} onEnter={requireAuth} />
    </Route>
  </Router>
*/


/* IMPERATIVE routes
  const routes = {
    path: '/',
    component: App,
    indexRoute: { component: Dashboard },
    childRoutes: [
      { path: 'about', component: About },
      {
        path: 'inbox',
        component: Inbox,
        childRoutes: [{
          path: 'messages/:id',
          onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
        }]
      },
      {
        component: Inbox,
        childRoutes: [{
          path: 'messages/:id', component: Message
        }]
      }
    ]
  }

 */



// let routes = {
//   path: '/',
//   component: App,
//   indexRoute: { component: Dashboard },
//   childRoutes: [
//     { path: 'about', component: About },
//     {
//       path: 'inbox',
//       component: Inbox,
//       childRoutes: [{
//         path: 'messages/:id',
//         onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
//       }]
//     },
//     {
//       component: Inbox,
//       childRoutes: [{
//         path: 'messages/:id', component: Message
//       }]
//     }
//   ]
// }
