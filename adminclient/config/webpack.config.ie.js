'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, '../src/index'),
  output: {
    path: path.resolve(__dirname, '../../public'),
    // filename: 'bundle-ie.js',
    filename: 'static/js/bundle-ie.[name].[chunkhash:8].js',
    chunkFilename: 'static/js/bundle-ie.[name].[chunkhash:8].chunk.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
  },
  module: {
    rules: [
      // { test: /\.js$/, 
      //   loader: 'babel-loader', 
      //   exclude: /node_modules/, 
      // },
      // { test: /\.(js|jsx)$/, 
      //   loader: 'babel-loader', 
      //   exclude: /node_modules/,
      //   options: {
      //     babelrc: false,
      //     presets: [
      //       require.resolve('babel-preset-react'),
      //       require.resolve('babel-preset-es2015'),
      //       require.resolve('babel-preset-es2016'),
      //       require.resolve('babel-preset-es2017'),
      //       require.resolve('babel-preset-es2015-ie'),
      //     ],
      //     plugins: [
      //       require.resolve('babel-plugin-transform-runtime'),
      //     ],
      //     cacheDirectory:  false,
      //   },
      // },
      { test: /\.(js|jsx)$/, 
        loader: 'babel-loader', 
        include:[path.resolve(__dirname, '../src')],
        // exclude: /(node_modules)/,
        options: {
          babelrc: false,
          presets: [
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-es2015-ie'),
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-es2016'),
            require.resolve('babel-preset-es2017'),
          ],
          plugins: [
            // 'transform-runtime',
            require.resolve('babel-plugin-transform-runtime'),
          ],
          cacheDirectory:  false,
        },
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.(jpg|jpeg|gif|png|ico|svg)$/,
        ],
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: 'dist/media/[name].[hash:8].[ext]'
          name: '[name].[hash:8].[ext]',
          mimetype: 'application/font-woff'
        }
      }, 
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.(jpg|jpeg|gif|png|ico|svg)$/,
        ],
        test: /\.(ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: 'dist/media/[name].[hash:8].[ext]'
          name: '[name].[hash:8].[ext]',
          mimetype: 'application/octet-stream'
        }
      },
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.css$/,
          /\.json$/,
          /\.(jpg|jpeg|gif|png|ico|svg)$/,
        ],
        test: /\.(eot)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // name: 'dist/media/[name].[hash:8].[ext]'
          name: '[name].[hash:8].[ext]',
          mimetype: 'application/vnd.ms-fontobject'
        }
      }, 
      {
        test: /\.css$/,
        use: [{
          loader: 'css-loader',
          options: {
            importLoaders: 1
            // modules:true,
          }
        }, {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
            plugins: function () {
              return [
                // require('precss'),
                // require('postcss-import'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 2 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ]
                })
              ]
            }
          }
        }]
      },
      {        
        test: /\.(jpg|jpeg|gif|png|ico|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]'
        }
      }
    ],
  },
  plugins:[
    new webpack.optimize.OccurrenceOrderPlugin(),
    // // Try to dedupe duplicated modules, if any:
    // new webpack.optimize.DedupePlugin(),
    // // Minify the code.
    // new webpack.optimize.UglifyJsPlugin({
    //   // sourceMap: true,
    //   compress: {
    //     screw_ie8: true, // React doesn't support IE8
    //     warnings: false
    //   },
    //   mangle: {
    //     screw_ie8: true
    //   },
    //   output: {
    //     comments: false,
    //     screw_ie8: true
    //   }
    // }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};