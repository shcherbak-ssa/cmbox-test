'use strict';

/** node modules */
const {join: joinPaths, resolve: resolvePath} = require('path');

/** constants */
const SRC_DIRNAME = joinPaths(__dirname, 'src');
const currentMode = (isDev) => isDev ? 'development' : 'production';
const currentDevtool = (isDev) => isDev ? 'eval-source-map' : false;

/** webpack plugins */
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/** postcss plugins */
const postcssShort = require('postcss-short');

/** webpack config */
const webpackConfig = (env = {}) => {
  const isDev = env.isDev || false;
  return {
    mode: currentMode(isDev),
    watch: isDev,
    devtool: currentDevtool(isDev),
    entry: joinPaths(SRC_DIRNAME, 'index.js'),
    output: {
      path: resolvePath(__dirname, 'public'),
      filename: `js/index.js`,
    },
    module: {
      rules: [
        {
          test: /\.pug$/,
          loader: 'pug-loader',
          options: {
            pretty: isDev
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: []
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                url: false,
                importLoaders: 1,
                sourceMap: isDev
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  postcssShort({ prefix: 'x', skip: 'x' })
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isDev
              }
            }
          ]
        },
        {
          test: /\.ttf$/,
          loader: 'file-loader',
          options: {
            name: '[name].ttf',
            outputPath: 'fonts'
          }
        },
        {
          test: /\.(jpg|png)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images'
          }
        },
      ]
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        //favicon: joinPaths(SRC_DIRNAME, 'assets', 'favicon.ico'),
        template: joinPaths(SRC_DIRNAME, 'index.pug')
      }),
      new MiniCssExtractPlugin({
        filename: `css/main.css`
      })
    ]
  }
};

/** export */
module.exports = webpackConfig;