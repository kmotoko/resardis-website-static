const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: {
        app: './src/app.js'
    },
    mode: 'production',
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
            ]
          },
          {
            // apply rule for images
            test: /\.(png|jpe?g|gif|webp)$/,
            use: [
                   {
                     // Using file-loader for these files
                     loader: "file-loader",

                     options: {
                       name: '[name].[ext]',
                       outputPath: 'img'
                     }
                   }
                 ]
          },
          {
            test: /\.(woff|woff2|ttf|otf|eot|svg)$/,
            use: [
                   {
                     loader: "file-loader",
                     options: {
                       name: '[name].[ext]',
                       outputPath: 'fonts'
                     }
                   }
                 ]
          }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'bundle-main.min.css'
        }),
        new CopyWebpackPlugin([
            {from:'src/img',to:'img'},
            {from:'src/js/singular',to:'js'},
            {from:'src/css/resardis-custom-nojs.css',to:'css'}
        ])
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: false,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    output: {
        filename: 'bundle-main.min.js',
        path: path.resolve(__dirname, 'static')
    }
};