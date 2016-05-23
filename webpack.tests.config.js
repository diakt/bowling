var nodeExternals = require('webpack-node-externals');
var hostname = 'localhost';
var port = '8080';

module.exports = {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()],
    resolve: {
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
        host: hostname,
        port: port
    }
};
