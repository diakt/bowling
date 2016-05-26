var webpack = require('webpack');
var path = require('path');
var isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: isProd ? './js/app.js' : [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/dev-server',
        './js/app.js'
    ],
    devtool: 'source-map',
    output: {
        path: __dirname,
        filename: isProd ? 'bundle.min.js' : 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['', 'node_modules'],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel']
            },
            {
                test: /\.css$/,
                loader: 'style!css?modules'
            }
        ]
    },
    devServer: {
        contentBase: "./",
        noInfo: true,
        inline: !isProd,
        progress: true,
        colors: true
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};

