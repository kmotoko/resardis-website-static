'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
          test: /bootstrap\.native/,
          use: {
            loader: 'bootstrap.native-loader'
        }
      },
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
      filename: '[name].[hash].min.css',
    }),
    new CopyWebpackPlugin([
      {
          from: path.resolve(__dirname, 'src', 'img'),
          to: path.resolve(__dirname, 'build', 'static', 'img'),
          toType: 'dir'
      },
      {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'build'),
          toType: 'dir'
      },
    ]),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'build', 'index.html'),
      template: path.resolve(__dirname, 'public', 'index.html'),
      chunks: ['performance', 'base', 'analytics'],
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: false,
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        terserOptions: {
          // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
          warnings: false,
        },
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  output: {
    filename: '[name].[hash].min.js',
    path: path.resolve(__dirname, 'build', 'static/'),
  },
};
