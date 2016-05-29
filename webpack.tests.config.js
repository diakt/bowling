var nodeExternals = require('webpack-node-externals');
var config = require('./webpack.config');

module.exports = {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()],
    resolve: {
        alias: config.resolve.alias,
        root: config.resolve.root,
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel']
            }
        ]
    },
    devServer: {
        host: 'localhost',
        port: '8080'
    }
};
