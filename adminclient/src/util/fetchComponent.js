// import qs from 'querystring';
// window.qs = qs;
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
    console.debug({ url, options });
    return fetch(url, Object.assign({}, options))
      .then(checkStatus)
      .then(res => res.json())
      .catch(e => Promise.reject(e));
  };
};

export const fetchPaths = function (basename, data = {}, headers) {
  // console.log('fetchPaths', { basename, data, headers });
  let result = {};
  let finished = Object.keys(data).map(key => {
    let val;
    if (typeof data[key] === 'string') val = [data[key], ];
    else val = [ data[ key ].url, data[ key ].options, ];
    let additionalParams = '';
    additionalParams = (typeof window !== 'undefined' && Object.keys(window).length)
      ?  (window.location.search.charAt(0) === '?')
        ? window.location.search.substr(1)
        : window.location.search
      :''
    let route = val[ 0 ]||'';
    // console.log({ data, key, val, },this);
    // console.log(qs.parse(additionalParams),val[0])
    let fetchOptions = Object.assign({}, val[ 1 ], { headers, });
    
    return fetchComponent(`${ basename }${ route }${ (route && route.indexOf('?')===-1) ? '?' : '' }${ (route && route.indexOf('?')!==-1) ? '&' : '' }${additionalParams}`, fetchOptions)()
      .then(response => {
        result[key] = response;
      }, e => Promise.reject(e));
  });
  return Promise.all(finished)
    .then(() => result)
    .catch(e => Promise.reject(e));
};