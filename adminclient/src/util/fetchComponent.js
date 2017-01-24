export const checkStatus = function (response) {
  return new Promise((resolve, reject) => {
    if (response.status >= 200 && response.status < 300) {
      resolve(response);
    } else {
      let error = new Error(response.statusText);
      error.response = response;
      reject(error);
    }
  })
};

export const fetchComponent = function (url, options = {}) {
  return function () {
    return fetch(url, Object.assign({}, options))
      .then(checkStatus)  
      .then(res => res.json())
      .catch(e => {
        Promise.reject(e);
      });
  };
};