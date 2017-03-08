'use strict';

// const PathRegExp = require('path-to-regexp');
// const ssr_manifest = require('ssr_manifest');
//babel utility/ssr_manifest_es6.js > utility/ssr_manifest.js
//babel adminclient/src -d adminclient/_src --ignore adminclient/src/components/RACodeMirror/
import React from 'react';
import { renderToString } from 'react-dom/server'
import SSR from '../adminclient/_src/containers/SSR';

module.exports = function (manifest){
  return new Promise((resolve, reject) => {
    try {
      if (manifest && manifest.layout) {
        const body = renderToString(<SSR {...manifest} />);
        resolve(body, manifest.pageData ? manifest.pageData : {});
      }
      else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};