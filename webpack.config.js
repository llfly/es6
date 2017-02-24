var path = require('path');
var webpack = require('webpack');

var config = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ["es2015"],
                    plugins:["add-module-exports"]
                }
            }
        ]
    }
}


module.exports = config;