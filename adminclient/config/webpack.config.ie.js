'use strict';

const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const GLOBALS = {
  'process.env': {
    'NODE_ENV': JSON.stringify('production'),
  },
};
const publicURL = ( env ) => {
  const environments = {
    dev: {
      NODE_ENV: process.env.NODE_ENV,
      PUBLIC_URL: '/src',
    },
    prod: {
      NODE_ENV: process.env.NODE_ENV,
      PUBLIC_URL: '/src',
    },
  };
  return environments[env] || environments['dev'];
};

module.exports = ( env ) => {
  env = {};
  env.dev = true;
  return {
    devtool: 'source-map',
    entry: env.dev
      ? [
        path.resolve(__dirname, '../src/index'),]
      : [
        path.resolve(__dirname, '../src/index'),
      ],
    output: env.dev
      ? {
        path: path.resolve(__dirname, '../public/build'),
        filename: 'bundle-ie.js',
        publicPath: '/',
      }
      : {
        path: path.resolve(__dirname, '../public/build'),
        filename: 'bundle-ie.js',
        publicPath: '/extensions/periodicjs.ext.reactadmin/',
      }
    ,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, '../src'),
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-es2016'),
              require.resolve('babel-preset-es2017'),
              require.resolve('babel-preset-es2015-ie'),
            ],
            plugins: [
              require.resolve('babel-plugin-transform-runtime'),
            ],
            cacheDirectory: env.dev ? true : false,
          },
        },
      ],
    },
    plugins: env.dev
      ? [
        new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: {
          unused: true,
          dead_code: true,
          warnings: false,
          // drop_debugger: true,
          conditionals: true,
          evaluate: true,
          // drop_console: true,
          sequences: true,
          booleans: true,
        } ,}),
      ]
      : [
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.UglifyJsPlugin({ minimize: true, compress: { warnings: false, }, }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'bundle', filename: 'bundle-ie.js', }),
      ],
    performance: {
      hints: env.dev ? false : 'warning',
    },
  };
};