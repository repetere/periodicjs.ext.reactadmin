import { fetchComponent, checkStatus, fetchPaths, } from './fetchComponent';
import { traverse, } from './traverse';
import { requireAuth, isLoggedIn, } from './routing';
import { getParameterized, parameterize, setParameters, findMatchingRoute, } from './parameterize';
import { fetchErrorContent, fetchSuccessContent, fetchDynamicContent, fetchAction, } from './dynamics';
import { setCacheConfiguration, getCacheConfiguration, flushCacheConfiguration, loadCacheConfigurations } from './cache_configuration';
import { get404Error, } from './errors';

export default {
  fetchComponent,
  checkStatus,
  fetchPaths,
  traverse,
  requireAuth,
  isLoggedIn,
  getParameterized,
  parameterize,
  setParameters,
  findMatchingRoute,
  fetchAction,
  fetchErrorContent,
  fetchSuccessContent,
  fetchDynamicContent,
  setCacheConfiguration,
  getCacheConfiguration,
  flushCacheConfiguration,
  loadCacheConfigurations,
  get404Error,
};
