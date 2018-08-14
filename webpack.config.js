const webpack = require('webpack');
const path = require('path');

const DIST_DIR = path.resolve(__dirname, './dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
//var OpenBrowserPlugin = require("open-browser-webpack-plugin");

var config = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: DIST_DIR,
        filename: '[name].[hash].js',
        publicPath: './'
    },
    devtool: 'source-map',
    devServer: {
        historyApiFallback: true,
        compress: true,
        port: 8081,
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [['es2015', {modules: false}]],
                            plugins: ['syntax-dynamic-import', 'transform-class-properties']
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.jsx$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(ico|png|gif|jpg|svg)$/i,
                use: [{
                    loader: 'file-loader'
                }]
            }, {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: [{loader: 'url-loader?limit=100000'}]
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Dental Course',
            filename: 'index.html',
            template: 'index.html'
        }),
        new ExtractTextPlugin({
            filename: "[name].[hash].css",
            allChunks: true
        })
    ]
};

module.exports = config;