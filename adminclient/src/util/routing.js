import constants from '../constants';

export const isLoggedIn = () => {
  return window && !!window.localStorage[ constants.jwt_token.TOKEN_NAME ];
};

export const requireAuth = (nextState, replaceState) => {
  console.log('requireauth');
  // console.log({ nextState, replaceState });
  // console.log("nextState.location.pathname.indexOf('p-admin')!==-1",nextState.location.pathname.indexOf('p-admin')!==-1)
  if (!isLoggedIn()) {
    replaceState({
      pathname: (nextState.location.pathname.indexOf('p-admin')!==-1)?`/p-admin/login?return_url=${nextState.location.pathname}`:`/login?return_url=${nextState.location.pathname}`,
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
  }
};
