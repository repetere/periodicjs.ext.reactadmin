'use strict';

// const PathRegExp = require('path-to-regexp');
// const ssr_manifest = require('ssr_manifest');
//babel utility/ssr_manifest_es6.js > utility/ssr_manifest.js
//babel adminclient/src -d adminclient/_src --ignore adminclient/src/components/RACodeMirror/
require('isomorphic-fetch');
import React from 'react';
import { renderToString, } from 'react-dom/server';
import SSR from '../adminclient/_src/containers/SSR';
import utility from '../adminclient/_src/util';
console.debug = console.log;

module.exports = function (options) {
  return new Promise((resolve, reject) => {
    try {
      let { layoutPath, manifest, req_url, basename, } = options;
      if (manifest && manifest.layout) {
        if (Object.keys(manifest.resources).length) {
          let resources = utility._handleDynamicParams(layoutPath, manifest.resources, req_url);
          // console.log({ resources,manifest });

          utility.fetchPaths(basename, resources, {})
            .then(_resources => {
              // console.log({ _resources });
              let dyanmicManifest = Object.assign({}, manifest, { resources: _resources, });
              const body = renderToString(<SSR {...dyanmicManifest} />);
              resolve({ body, pagedata: manifest.pageData, });
            })
            .catch((e) => {
              console.error(e);
              const body = renderToString(<SSR {...manifest} />);
              resolve({ body, pagedata: manifest.pageData, });
            });
        } else {
          const body = renderToString(<SSR {...manifest} />);
          resolve({ body, pagedata:manifest.pageData, });   
        }
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};