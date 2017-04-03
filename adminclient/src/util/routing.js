import constants from '../constants';

export const isLoggedIn = () => {
  return typeof window !=='undefined' && !!window.localStorage[ constants.jwt_token.TOKEN_NAME ];
};

export const requireAuth = (nextState, replaceState) => {
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

export const getMFAPath = (state) => {
  let mfapath = (state.manifest.containers[ `${state.settings.adminPath}/mfa` ])
    ? `${state.settings.adminPath}/mfa`
    : '/mfa';
  // console.log({ mfapath });
  return mfapath;
};

export const getMFASetupPath = (state) => {
  let mfasetuppath = (state.manifest.containers[ `${state.settings.adminPath}/auth/login-otp-setup` ])
    ? `${state.settings.adminPath}/auth/login-otp-setup`
    : '/auth/login-otp-setup';
  // console.log({ mfasetuppath });
  return mfasetuppath;
};