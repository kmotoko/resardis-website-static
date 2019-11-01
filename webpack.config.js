'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    base: path.resolve(__dirname, 'src', 'base.js'),
    performance: path.resolve(__dirname, 'src', 'performance.js'),
    analytics: path.resolve(__dirname, 'src', 'analytics.js'),
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        // apply rule for images
        test: /\.(png|jpe?g|gif|webp)$/,
        use: [
          {
            // Using file-loader for these files
            loader: 'file-loader',

            options: {
              name: '[name].[ext]',
              outputPath: 'img',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'base.min.css',
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src', 'img'), to: 'img' },
      { from: path.resolve(__dirname, 'src', 'css', 'main-nojs.css'), to: 'css' },
    ]),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        sourceMap: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'static'),
  },
};
