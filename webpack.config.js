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
        home: path.resolve(__dirname, 'src', 'home.js'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /bootstrap\.native/,
                use: {
                    loader: 'bootstrap.native-loader',
                },
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
                toType: 'dir',
            },
            {
                from: path.resolve(__dirname, 'public'),
                to: path.resolve(__dirname, 'build'),
                toType: 'dir',
            },
            {
                from: path.resolve(__dirname, 'src', 'js', 'g-analytics.js'),
                to: path.resolve(__dirname, 'build', 'static'),
                toType: 'dir',
            },
        ]),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, 'build', 'index.html'),
            template: path.resolve(__dirname, 'public', 'index.html'),
            chunks: ['base', 'home'],
        }),
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true, /* eslint-disable-line camelcase */
                    },
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Disable file caching
                cache: false,
                sourceMap: false, // Must be set to true if using source-maps in production
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    output: {
        filename: '[name].[hash].min.js',
        path: path.resolve(__dirname, 'build', 'static/'),
    },
};
