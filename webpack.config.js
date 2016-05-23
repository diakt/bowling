var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        './src/js/index.js'
    ],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'src'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['babel']
            },
            {
                test: /\.html$/,
                loader: "html"
            }
        ]
    },
    devServer: {
        contentBase: "./src",
        noInfo: true,
        inline: true
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ]
};
