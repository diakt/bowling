var hostname = 'localhost';
var port = '8080';

module.exports = {
    entry: 'mocha!./src/js/__test__/gameFunctions.js',
    output: {
        filename: 'test.build.js',
        path: 'tests/',
        publicPath: 'http://' + hostname + ':' + port + '/tests'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader']
            }
        ]
    },
    devServer: {
        host: hostname,
        port: port
    }
};
