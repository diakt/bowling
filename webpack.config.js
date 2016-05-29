var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';

module.exports = {
    entry: isProd ? './js/index.js' : [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/dev-server',
        './js/index.js'
    ],
    devtool: !isProd && 'source-map',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            components: 'js/components',
            actions: 'js/actions',
            consts: 'js/consts',
            dispatcher: 'js/dispatcher',
            store: 'js/store',
            utils: 'js/utils'
        },
        modulesDirectories: ['', 'node_modules'],
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loaders: ['babel']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract(
                    'style-loader',
                    'css-loader?camelCase&sourceMap&modules&localIdentName=[local]_[hash:base64:5]'
                )
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
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('bundle.css')
    ]
};

