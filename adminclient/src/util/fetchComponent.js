
import { _invokeWebhooks } from './webhooks';

export const checkStatus = function (response) {
  return new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      resolve(response);
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      try{
      // console.debug({response})
        response.json()
          .then(res=>{
            if(res.data.error){
              reject(res.data.error);
            } else if(res.data){
              reject(JSON.stringify(res.data));
            } else{
              reject(error);
            }
          })
          .catch(()=>{
            reject(error);
          })
      } catch(e){
        reject(error);
      }
    }
  });
};

export const fetchComponent = function (url, options = {}) {  
  return function () {
    // console.debug({ url, options });
    return fetch(url, Object.assign({}, options))
      .then(checkStatus)
      .then(res => res.json())
      .catch(e => Promise.reject(e));
  };
};

export const fetchPaths = function (basename, data = {}, headers) {
  let result = {};
  let finished = Object.keys(data).map(key => {
    let val;
    if (typeof data[key] === 'string') val = [data[key], ];
    else val = [data[key].url, data[key].options, ];
    let additionalParams = '';
    additionalParams = (typeof window !== 'undefined' && Object.keys(window).length)
      ?  (window.location.search.charAt(0) === '?')
        ? window.location.search.substr(1)
        : window.location.search
      : '';
    let route = val[0] || '';
    let fetchOptions = Object.assign({}, val[1], { headers, });
    let { onSuccess, onError, blocking, renderOnError } = fetchOptions;
    delete fetchOptions.onSuccess;
    delete fetchOptions.onError;
    return fetchComponent(`${ basename }${ route }${ (route && route.indexOf('?') === -1) ? '?' : '' }${ (route && route.indexOf('?') !== -1) ? '&' : '' }${additionalParams}`, fetchOptions)()
      .then(response => {
        result[key] = response;
        if (typeof onSuccess === 'string' || (Array.isArray(onSuccess) && onSuccess.length)) {
          if (blocking) {
            return _invokeWebhooks.call(this, onSuccess, response);
          } else {
            _invokeWebhooks.call(this, onSuccess, response);
          }
        } 
      }, e => {
        if (typeof onError === 'string' || (Array.isArray(onError) && onError.length)) {
          if (renderOnError === false) result.__hasError = true;
          if (blocking) {
            return _invokeWebhooks.call(this, onError, e);
          } else {
            _invokeWebhooks.call(this, onError, e);
          }
        } 
        else return Promise.reject(e);
      })
      .catch(e => Promise.reject(e));
  });
  return Promise.all(finished)
    .then(() => result)
    .catch(e => Promise.reject(e));
};