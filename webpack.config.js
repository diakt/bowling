var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: [
        'webpack-dev-server/?http://0.0.0.0:8080',
        './js/app.js'
    ],
    cache: false,
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'js'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js']
    },
    externals: [nodeExternals()],
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
        contentBase: "./",
        noInfo: true,
        inline: true,
        progress: true,
        colors: true
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};
