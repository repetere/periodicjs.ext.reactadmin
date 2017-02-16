import qs from 'querystring';
window.qs = qs;
export const checkStatus = function (response) {
  return new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      resolve(response);
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      reject(error);
    }
  });
};

export const fetchComponent = function (url, options = {}) {
  return function () {
    return fetch(url, Object.assign({}, options))
      .then(checkStatus)
      .then(res => res.json())
      .catch(e => Promise.reject(e));
  };
};

export const fetchPaths = function (basename, data = {}) {
  let result = {};
  let finished = Object.keys(data).map(key => {
    let val;
    if (typeof data[key] === 'string') val = [data[key], ];
    else val = [ data[ key ].url, data[ key ].options, ];
    let additionalParams = (window.location.search.charAt(0) === '?')
      ? window.location.search.substr(1)
      : window.location.search;
    let route = val[ 0 ];
    // console.log({ data, key, val, });
    // console.log(qs.parse(additionalParams),val[0])
    return fetchComponent(`${ basename }${ route }&${additionalParams}`, val[1])()
      .then(response => {
        result[key] = response;
      }, e => Promise.reject(e));
  });
  return Promise.all(finished)
    .then(() => result)
    .catch(e => Promise.reject(e));
};