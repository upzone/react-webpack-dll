const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackBase = require('./webpack.base');
const config = require('./config');

const devConfig = merge(webpackBase, {
    module: {
        rules: [
            {
                test: /\.js|.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less|css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', `less-loader?{"sourceMap":true}`]
                }),
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]',
                        // useRelativePath: true,
                        // publicPath: `http://localhost:${scriptConfig.port}/images/`
                    }
                }]
            }
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: config.dev.port
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "public/index.html",
            filename: "index.html"
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new ExtractTextPlugin({
            filename: '[name].css'
        })
    ]
})

module.exports = devConfig;